import { RequestTypeDTO } from "./RequestType";

export type FormProps = {
  requestTypeId: number; 
  requestType: RequestTypeDTO | null;
}



export type TravelOrderPaperProps = {
    name: string;
    position: string;
    departure_date: string;
    current_date: string;
    purpose: string;
    destination:string;
    items: Entry[];
    onSubmit?: () => void;       
    submitting?: boolean;  
    requestTypeId?:number;   
    requestFromId: number; 
    branchName?: string;
    address?: string;
    requestedBy?:string;
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

export interface FormData {
    to: string;
    from: string;
    subject: string;
    date: string;
    description: string;
}

export interface DisbursePaperProps {
    formData: FormData;
    categories: Category[];
  }


export interface TransmittalData{
    to:string;
    from:string;
    date:string;
    description:string;
    note?:string;
    items:string;
}   

export interface TransmittalItem {
    id: number;
    text: string;
  }
export interface TransmittalProps{
    formData: TransmittalData;
    items: TransmittalItem[];
}



export type FormPropsTravelOrder = {
    requestType?: RequestTypeDTO | null;
    formData?: TravelOrderPaperProps | null;
    onClose?: () => void;
    onReset?: () => void;
  };
  