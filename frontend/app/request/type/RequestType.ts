import { Approval, FundTransfer } from "./BaseType";
import { AddProposedBudgetPayload, FormDataDisburse, TransmittalData, TravelOrderPaperProps } from "./FormType";
import { countSheet } from "./FundType";
 export type Option = { value: number | string; label: string };


 export type Users = {
    id?: string;
    name: string;
    email: string;
    position: string;
    initial: string;
    approver: string;
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
  
    createdAt: string;  
    updateAt: string;    

    fundTransfer: FundTransfer | null;
  
  
    notedBy: Users | null;
    checkedBy: Users | null;
    checkedBy2: Users | null;
    recomApproval: Users | null;
    recomApproval2: Users | null;
    approveBy: Users | null;
  }
  



  export type Option1 = { id: number | string; name: string; position?:string; };



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
    notedBy: Users | null;
    checkedBy: Users | null;
    checkedBy2: Users | null;
    recomApproval: Users | null;
    recomApproval2: Users | null;
    approveBy: Users | null;
  };

  export type MainRequest = {
    id: number;
    requestTypeId: number;
    requestById: number;
    requestFromId: number;
    referenceCode: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    requestDate: string;
    remarks: string | null;
    createdAt: string;
    updateAt: string;
    countSheet:countSheet;
    fundTransfer:FundTransfer;
    travelOrder: TravelOrderPaperProps;
    proposedBudget:AddProposedBudgetPayload;
    transmittalMemo:TransmittalData;
    disburse:FormDataDisburse;
    approval: Approval[];
    requestFrom: RequestFrom;
    requestType: RequestType;
    requestBy: {
      id: number;
      name: string;
      position?:string;
    };
  };


  export type Pagination = {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  }

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



export  type DataProps = {
    mainRequest: MainRequest | null;
}
