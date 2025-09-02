import { Prisma, PrismaClient, Statuses, $Enums  } from "@prisma/client";
import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware";
import { findNextApprover } from "../utils/FindNextApprover";
import { FindRequestSequence, RequestSequenceChecker } from "../utils/RequestHelper";
import { create } from "domain";
import { formatRefId } from "../utils/idConverter";

const prisma = new PrismaClient();

const toNum = (v: unknown): number | undefined => {
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
};

export const addFundTransfer = async (req: AuthRequest, res: Response) => {
  try {
    const userId = toNum(req.user?.id);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { requestContent, requestDate, requestFromId, requestTypeId, requestToId } = req.body ?? {};

    if (!requestContent || !requestFromId || !requestTypeId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Step 1: request type definition
    const reqType = await prisma.requestType.findUnique({
      where: { id: Number(requestTypeId) },
      select: {
        notedBy: { select: { id: true, name: true } },       // 👈 join to user
        checkedBy: { select: { id: true,  name: true} },
        checkedBy2: { select: { id: true, name: true } },
        recomApproval: { select: { id: true, name: true } },
        recomApproval2: { select: { id: true, name: true } },
        approveBy: { select: { id: true, name: true } },
        requestName: true,
      },
    });

    if (!reqType) {
      return res.status(404).json({ message: "RequestType not found" });
    }

    // Step 2: create main request
    const created = await prisma.mainRequest.create({
      data: {
        requestDate: requestDate ? new Date(requestDate) : new Date(),
        requestType: { connect: { id: Number(requestTypeId) } },
        requestFrom: { connect: { id: Number(requestFromId) } },
        referenceCode: "temp",
        requestBy: { connect: { id: userId } },
        fundTransfer: {
          create: {
            requestContent,
            requestToId,
          },
        },
        approval: {
          create: {
            notedBy: reqType.notedBy?.id ? "PENDING" : "EMPTY",
            checkedBy: reqType.checkedBy?.id ? "PENDING" : "EMPTY",
            checkedBy2: reqType.checkedBy2?.id ? "PENDING" : "EMPTY",
            recomApproval: reqType.recomApproval?.id ? "PENDING" : "EMPTY",
            recomApproval2: reqType.recomApproval2?.id ? "PENDING" : "EMPTY",
            approveBy: reqType.approveBy?.id ? "PENDING" : "EMPTY",
            requestLogs: {
                create: {
                  approverId: userId, 
                  checkerType: reqType.requestName,
                  action: "Submit Request",
              }
            } 
          },
        },
        
      },
      include: { fundTransfer: true, approval: true },
    });

      // Step 2: Generate proper reference code
      const referenceCode = formatRefId(created.id, "REF", 6);
      // Step 3: Update the record
      const updateRefCOde = await prisma.mainRequest.update({
        where: { id: created.id },
        data: { referenceCode: referenceCode },
      });

    const io = req.app.get("io");
    const nextApproverId = findNextApprover(reqType, created.approval[0]); // ✅ first approval row

    if (nextApproverId) {
      console.log(`🔔 Emitting new_request to user_${nextApproverId}`);
      io.to(`user_${nextApproverId}`).emit("new_request", {
        receiverId: nextApproverId,
        requestId: created.id,
        content: created.fundTransfer?.requestContent,
      });
      console.log(`sending to user_${nextApproverId}`);
    } else {
      console.log("no sender");
    }

    return res.status(201).json({ message: "Created", data: created });
  } catch (err) {
    console.error("Error creating fund transfer:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};




export const getRequestsForApprover = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    // Fetch requests with all approvals
    const requests = await prisma.mainRequest.findMany({
      where: {
        approval: {
          some: {
            OR: [
              { notedBy: "PENDING" },
              { checkedBy: "PENDING" },
              { checkedBy2: "PENDING" },
              { recomApproval: "PENDING" },
              { recomApproval2: "PENDING" },
              { approveBy: "PENDING" },
            ],
          },
        },
      },
      include: {
        fundTransfer: true,
        approval: true,
        requestFrom: true,
        requestType: {
          include: {
            notedBy: true,
            checkedBy: true,
            checkedBy2: true,
            recomApproval: true,
            recomApproval2: true,
            approveBy: true,
          },
        },
        requestBy: { select: { id: true, name: true } },
      },

      orderBy: {
        id: 'desc',   
      },
    });

    // Filter: only keep requests where the NEXT approver is this user
    const filtered = requests.filter((req) => {
      const approverId = findNextApprover(req.requestType, req.approval[0]); 
      return approverId === userId;
    });
    
    return res.json({ data: filtered });

  } catch (err) {
    console.error("Error fetching approver requests:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};


// ✅ Build a reusable type for mainRequest with relations
type MainRequestWithRelations = Prisma.MainRequestGetPayload<{
  include: {
    status: true,
    referenceCode: true,
    fundTransfer: true;
    approval: true;
    requestFrom: true;
    travelOrder: true;
    requestType: {
      include: {
        notedBy: true;
        checkedBy: true;
        checkedBy2: true;
        recomApproval: true;
        recomApproval2: true;
        approveBy: true;
      };
    };
    requestBy: { select: { id: true; name: true } };
  };
}>;

// ✅ Helper to check if user has already acted

const APPROVAL_FLOW = [
  "notedBy",
  "checkedBy",
  "checkedBy2",
  "recomApproval",
  "recomApproval2",
  "approveBy",
] as const;

type ApprovalKey = typeof APPROVAL_FLOW[number];


function hasUserWithStatus(
  req: MainRequestWithRelations,
  userId: number,
  status: string
): boolean {
  const approval = req.approval[0];
  const type = req.requestType;
  // console.log("approval", approval)
  // console.log("type", type);
  const sequenceNumber = FindRequestSequence(type, userId);
  if(sequenceNumber === null) return false
  // console.log("sequence", APPROVAL_FLOW[sequenceNumber]);
  // console.log("no sequence", sequenceNumber);
  const sequenceNumber1 = RequestSequenceChecker(sequenceNumber, approval, status);
  return sequenceNumber1;
}



// ✅ Controller to get requests where user has already acted (with pagination)
export const getRequestsByUserStatus = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    // --- Query params ---
    const status = (req.query.status as string)?.toUpperCase() || "PENDING";
    const page = parseInt((req.query.page as string) || "1", 10);
    const pageSize = parseInt((req.query.pageSize as string) || "10", 10);

    // Validate status
 
         
    // --- Fetch all requests (could optimize further w/ Prisma filtering) ---
    const requests: MainRequestWithRelations[] = await prisma.mainRequest.findMany({ 
      where: {
            requestType: {
              OR: [
                { notedBy: { id: userId } },
                { checkedBy: { id: userId } },
                { checkedBy2: { id: userId } },
                { recomApproval: { id: userId } },
                { recomApproval2: { id: userId } },
                { approveBy: { id: userId } },
              ],
            },
          },
      
      include: {
        fundTransfer: {
          include: {
            requestTo: 
             {select: {name: true, position: true}},
          }
        },
        approval: {
          include: {
            requestLogs: true
          }
        },
        requestFrom: true,
        travelOrder: true,
        requestType: {
          include: {
            notedBy:{
              select: {
                id: true,
                initial: true,
                name: true,
                position: true,
              }
            },
            checkedBy: true,
            checkedBy2: {
              select: {
                id: true,
                initial: true,
                name: true,
                position: true,
              }
            },
            recomApproval: {
              select: {
                id: true,
                initial: true,
                name: true,
                position: true,
              }
            },
            recomApproval2: {
              select: {
                id: true,
                initial: true,
                name: true,
                position: true,
              }
            },
            approveBy: {
              select: {
                id: true,
                initial: true,
                name: true,
                position: true,
              }
            }
          },
        },
        requestBy: { select: { id: true, name: true, position: true } }, 
        
      },
      orderBy: { id: "desc" },
    });

    // --- Filter user-specific requests ---
    const filtered = requests.filter((r) =>
      hasUserWithStatus(r, userId, status)
    );

    // --- Pagination ---
    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginated = filtered.slice(start, end);

    return res.json({
      data: paginated,
      status,
      pagination: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (err) {
    console.error("Error fetching requests by status:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};



export const actOnRequest = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { id } = req.params;
    const { action } = req.body; // "APPROVED" | "REJECTED"

    if (!["APPROVED", "REJECTED"].includes(action)) {
      return res.status(400).json({ message: "Invalid action" });
    }

    // Find the request and approval row
    const request = await prisma.mainRequest.findUnique({
      where: { id: Number(id) },
      include: {
        approval: true,
        requestType: {
          include: {
            notedBy: true,
            checkedBy: true,
            checkedBy2: true,
            recomApproval: true,
            recomApproval2: true,
            approveBy: true,
          },
        },
      },
    });

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    const approval = request.approval[0];
    const type = request.requestType;
    if (!approval || !type) {
      return res.status(400).json({ message: "Invalid request setup" });
    }

    // ✅ Figure out which field this user is responsible for
    let updateData: any = {};
    if (type.notedBy?.id === userId) updateData.notedBy = action;
    if (type.checkedBy?.id === userId) updateData.checkedBy = action;
    if (type.checkedBy2?.id === userId) updateData.checkedBy2 = action;
    if (type.recomApproval?.id === userId) updateData.recomApproval = action;
    if (type.recomApproval2?.id === userId) updateData.recomApproval2 = action;
    if (type.approveBy?.id === userId) updateData.approveBy = action;

    if (Object.keys(updateData).length === 0) {
      return res.status(403).json({ message: "You are not an approver for this request" });
    }
 
    // ✅ Update approval row
// ✅ Update approval row & create a log entry in the same call
const newApproval = await prisma.approvalTable.update({
  where: { id: approval.id },
  data: {
    ...updateData,
    requestLogs: {
      create: {
        approverId: userId, 
        checkerType: request.requestType?.requestName,
        action: action,
      },
    },
  },
  include: {
    requestLogs: true, // optional: return logs along with approval
  },
});

const io = req.app.get("io");
  if(action == "REJECTED"){
      const reject = await prisma.mainRequest.update({
        where: {id: request.id},
        data: {
          status: "REJECTED",
        }
      })
      io.emit("request_rejected", {
        requestId: request.requestById,
        actorId: userId,     // who rejected
        receiverId: request.requestById, // who created/requested
        content: "Request was rejected",
      });
  }else{
    const nextApproverId = findNextApprover(request.requestType, newApproval); // ✅ first approval row
    if (nextApproverId) { 
        if(nextApproverId === "APPROVED"){
          const approved = await prisma.mainRequest.update({
            where: {id: request.id},
            data: {
              status: "APPROVED",
            }
          })
          io.emit("request_approved", {
            requestId: request.requestById,
            actorId: userId,     // who rejected
            receiverId: request.requestById, // who created/requested
            content: "Request was approved",
          });
        }else{
          io.to(`user_${nextApproverId}`).emit("new_request", {
            receiverId: nextApproverId,
            requestId: request.id,
            content: request.requestType?.requestName,
          });
          console.log(`sending to user_${nextApproverId}`);
         
        }

    } else {
      console.log("no sender");
    }
  }


 

    return res.json({ message: `Request ${action} successfully` });
  } catch (err) {
    console.error("Error approving/rejecting request:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const saveTravelOrderForm = async (req: AuthRequest, res: Response) => {
  try {
    const userId = toNum(req.user?.id);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { name, position, departure_date,destination,current_date,purpose,items,requestTypeId,requestFromId } = req.body ?? {};

    

    if (!requestTypeId) {
      return res.status(400).json({ message: "Missing requestTypeId" });
    }

    const dep = departure_date ? new Date(departure_date) : new Date();
    const cur = current_date ? new Date(current_date) : new Date();
    if (isNaN(dep.getTime()) || isNaN(cur.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    const total = Array.isArray(items)
      ? items.reduce((sum: number, it: any) => {
          const n = parseFloat(String(it?.amount ?? "0"));
          return sum + (Number.isFinite(n) ? n : 0);
        }, 0)
      : 0;

    // Step 1: fetch request type approvers
    const reqType = await prisma.requestType.findUnique({
      where: { id: Number(requestTypeId) },
      select: {
        notedBy: { select: { id: true } },
        checkedBy: { select: { id: true } },
        checkedBy2: { select: { id: true } },
        recomApproval: { select: { id: true } },
        recomApproval2: { select: { id: true } },
        approveBy: { select: { id: true } },
      },
    });

    if (!reqType) {
      return res.status(404).json({ message: "RequestType not found" });
    }

    // Step 2: build create data safely
    const createData: any = {
      requestDate: cur,
      requestType: { connect: { id: Number(requestTypeId) } },
      requestBy: { connect: { id: userId } },
      remarks: "travel_order",
      travelOrder: {
        create: {
          name: name || "Unknown",
          position: position || "Unknown",
          departure_date: dep,
          current_date: cur,
          destination: destination || "Unknown",
          purpose_of_travel: purpose || "Unknown",
          items: items || [],
          total_amount: total,
        },
      },
      approval: {
        create: {
          notedBy: reqType.notedBy?.id ? "PENDING" : "EMPTY",
          checkedBy: reqType.checkedBy?.id ? "PENDING" : "EMPTY",
          checkedBy2: reqType.checkedBy2?.id ? "PENDING" : "EMPTY",
          recomApproval: reqType.recomApproval?.id ? "PENDING" : "EMPTY",
          recomApproval2: reqType.recomApproval2?.id ? "PENDING" : "EMPTY",
          approveBy: reqType.approveBy?.id ? "PENDING" : "EMPTY",
        },
      },
    };


    if (requestFromId && !isNaN(Number(requestFromId))) {
      createData.requestFrom = { connect: { id: Number(requestFromId) } };
    }

    const created = await prisma.mainRequest.create({
      data: createData,
      include: { travelOrder: true, approval: true },
    });

    res.status(201).json({ message: "successfully added", created });
  } catch (error) {
    console.error("saveTravelOrderForm error:", error);
    res.status(500).json({ message: "error occurred" });
  }
};







