import { PrismaClient } from "@prisma/client";
import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware";
import { findNextApprover } from "../utils/FindNextApprover";

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
        notedBy: { select: { userId: true } },       // 👈 join to user
        checkedBy: { select: { userId: true } },
        checkedBy2: { select: { userId: true } },
        recomApproval: { select: { userId: true } },
        recomApproval2: { select: { userId: true } },
        approveBy: { select: { userId: true } },
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
        requestBy: { connect: { id: userId } },
        fundTransfer: {
          create: {
            requestContent,
            requestToId,
          },
        },
        approval: {
          create: {
            notedBy: reqType.notedBy?.userId ? "PENDING" : "EMPTY",
            checkedBy: reqType.checkedBy?.userId ? "PENDING" : "EMPTY",
            checkedBy2: reqType.checkedBy2?.userId ? "PENDING" : "EMPTY",
            recomApproval: reqType.recomApproval?.userId ? "PENDING" : "EMPTY",
            recomApproval2: reqType.recomApproval2?.userId ? "PENDING" : "EMPTY",
            approveBy: reqType.approveBy?.userId ? "PENDING" : "EMPTY",
          },
        },
        
      },
      include: { fundTransfer: true, approval: true },
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
