import { RequestTypeDTO, Users } from "./RequestType";
import { MainRequest } from "./RequestType";

export type FormProps = {
  requestTypeId: number; 
  requestType: RequestTypeDTO | null;
}



export type TravelOrderPaperProps = {
    name: string;
    position: string;
    departure_date: string;
    current_date: string;
    purpose_of_travel: string;
    destination:string;
    items: Entry[];
    onSubmit?: () => void;       
    submitting?: boolean;  
    requestTypeId?:number;   
    requestFromId: number; 
    branchName?: string;
    address?: string;
    requestedBy?:string;
    requestedPosition?: string;
    total_amount?:number;
};


export type Entry = {
    budget: string; 
    amount: string;
 };


export type ExpenseType = "ADMIN & PERSONNEL" | "OFFICE & OTHER" | "UNBUDGETED";

export interface BudgetItem {
  id?: string;   
  expense_type: ExpenseType;
  description: string;
  budget: string;
  total_expenses: string;
  variance: string;
  proposed_budget: string;
  month_of?:string;
  remarks: string;
  requestTypeId?:number;
  requestFromId: number;
}

export type AddProposedBudgetPayload = {
    items: BudgetItem[];
    form_type?: string;
    added_by?: string;
    requestFromId: number; 
    branchName?: string;
    monthOf?: string;
    requestedBy?:string;
    requestedPosition?: string;
  };


export interface Budget {
    id: number;
    budgetName: string;
    amount: string;
}

export interface Category {
    id: number;
    categoryName?: string;
    budgets: Budget[];
}

export interface FormDataDisburse {
    toId?: number;
    toName:string;
    fromId?: number;
    from?:string;
    subject: string;
    date: string;
    description: string;
    note:string;
    toPosition?:string;
    fromName:string;
    companyName?: string; 
    address?:string;
    telephone?:string;
    total_amount?:number;
    requestTypeId?:number;
    requestFromId?: number;
    items?: Category[]; 
    requestTo?: Users | null;
    branchName?:string;
    
}

export interface DisbursePaperProps {
    formData?: FormDataDisburse;
    categories?: Category[];
    mainRequest?: MainRequest | null;
    requestType?: RequestTypeDTO | null;
    onClose?: () => void;
    onReset?: () => void;
  }


export interface TransmittalData{
    toId?: number;
    toName?:string;
    from?:number;
    fromName?: string;  
    date?:string;
    description?:string;
    note?:string;
    items?:TransmittalItem[];
    requestToId?:number;
    requestedBy?:string;
    requestedPosition?: string;
    branchName?: string;
    address?:string;
    requestTypeId?:number;
    requestFromId?:number;
    requestTo?: Users | null;
    companyName?:string;
    toPosition?:string;
}   

export type FieldWeeklyProps = {
  name: string;
  date_covered: string;
  particulars: { id: number; particular: string; amount: string }[];
  checklists: {
    id: number;
    category: string;
    items: { id: number; text: string }[];
  }[];
  images?: string[];
};


export interface TransmittalItem {
    id: number;
    text: string;
}


export interface FormPropsTransmittalProps{
    formData?: TransmittalData;
    items?: TransmittalItem[];
    requestType?: RequestTypeDTO | null;
    mainRequest?: MainRequest | null;
    onClose?: () => void;
    onReset?: () => void;
}



export type FormPropsTravelOrder = {
    requestType?: RequestTypeDTO | null;
    formData?: TravelOrderPaperProps | null;
    mainRequest?: MainRequest | null;
    onClose?: () => void;
    onReset?: () => void;
    
};
  
export type FormPropsProposedBudget = {
  requestType?: RequestTypeDTO | null;
  formData?: AddProposedBudgetPayload | null; 
  mainRequest?: MainRequest | null;
  onClose?: () => void;
  onReset?: () => void;
  onSuccess?: () => void;
};



export interface FormPropsFieldWeeklyTravelExpense {
  formData?: FieldWeeklyProps;  
  items?: TransmittalItem[];
  requestType?: RequestTypeDTO | null;
  mainRequest?: MainRequest | null;
  onClose?: () => void;
  onReset?: () => void;
}
