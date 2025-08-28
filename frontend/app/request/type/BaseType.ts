import { Users } from "./RequestType";

export type ApproverRole = {
    id: number;
    userId: number;
    position: string;
    initial: string;
    createdAt: string; // ISO Date string
    updatedAt: string; // ISO Date string
  };
  
  export type Approval = {
    id: number;
    mainFormId: number;
    notedBy: "EMPTY" | "PENDING" | "APPROVED" | "REJECTED";
    checkedBy: "EMPTY" | "PENDING" | "APPROVED" | "REJECTED";
    checkedBy2: "EMPTY" | "PENDING" | "APPROVED" | "REJECTED";
    recomApproval: "EMPTY" | "PENDING" | "APPROVED" | "REJECTED";
    recomApproval2: "EMPTY" | "PENDING" | "APPROVED" | "REJECTED";
    approveBy: "EMPTY" | "PENDING" | "APPROVED" | "REJECTED";
    createdAt: string;
    updateAt: string;
  };
  
  export type FundTransfer = {
    id: number;
    mainRequestID: number;
    requestToId: number;
    requestContent: string;
    createdAt: string;
    updateAt: string;

    requestTo: Users | null;
  };
  