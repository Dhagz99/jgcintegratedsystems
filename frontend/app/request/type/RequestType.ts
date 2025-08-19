import { Approval, ApproverRole, FundTransfer } from "./BaseType";

 export type Option = { value: number | string; label: string };


 export type Users = {
    id?: string;
    name: string;
    email: string;
    username: string;
    password: string;
    role: string;
    branchId?: string;
    createdAt?: string;
    updateAt?: string;

}

export type Checker = {
    id: number;
    userId: number;
    position: string;
    initial: string;
}


export type CheckerWithName = Checker & {
    checkerName: Pick<Users, "name"> | null; // { name: string } | null 
  };


  export interface RequestTypeDTO {
    id: number;
    requestName: string;
  
    // FK scalars
    notedById: number | null;
    checkedById: number | null;
    checkedBy2Id: number | null;
    recomApprovalId: number | null;
    recomApproval2Id: number | null;
    approveById: number | null;
  
    createdAt: string;   // ISO string in API
    updateAt: string;    // <- matches your field name (no "d")
  
    // Relations (nullable if FK is null)
    notedBy: CheckerWithName | null;
    checkedBy: CheckerWithName | null;
    checkedBy2: CheckerWithName | null;
    recomApproval: CheckerWithName | null;
    recomApproval2: CheckerWithName | null;
    approveBy: CheckerWithName | null;
  }
  



  export type Option1 = { id: number | string; name: string };



  export type RequestType = {
    id: number;
    requestName: string;
    notedById: number | null;
    checkedById: number | null;
    checkedBy2Id: number | null;
    recomApprovalId: number | null;
    recomApproval2Id: number | null;
    approveById: number | null;
    createdAt: string;
    updateAt: string;
  
    // relations
    notedBy: ApproverRole | null;
    checkedBy: ApproverRole | null;
    checkedBy2: ApproverRole | null;
    recomApproval: ApproverRole | null;
    recomApproval2: ApproverRole | null;
    approveBy: ApproverRole | null;
  };

  export type MainRequest = {
    id: number;
    requestTypeId: number;
    requestById: number;
    requestFromId: number;
    status: "PENDING" | "APPROVED" | "REJECTED";
    requestDate: string;
    remarks: string | null;
    createdAt: string;
    updateAt: string;
  
    fundTransfer: FundTransfer;
    approval: Approval[];
    requestFrom: RequestFrom;
    requestType: RequestType;
    requestBy: {
      id: number;
      name: string;
    };
  };


  export interface RequestFrom {
    id: number;
    branchCode: string;
    branchName: string;
    bom: string;
    faa: string;
    telephone: string;
    address: string;
    companyName: string;
    createdAt: string;
    updateAt: string;
  }

  export interface ApprovalResponse {
    data: MainRequest[];
  }


