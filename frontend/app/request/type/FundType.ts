import { Users } from "./RequestType";
  
export type CashDemoItem = {
  denom: number;
  amount: number;
  pieces: number;
  checked: boolean;
};

export type countSheet = {
    id: number;
    fundType:   string;
    mainFormId: number;
    office:     string;
    dateCount:  Date;
    fundName:   string;
    fundAmount: number;
    reference:  string;
    cashDemo:   CashDemoItem[]; 
    repFund:    number;
    totalFund:  number;
    cashShort:  number;

    requestTo: Users | null;
    CashCountSheet?: CashCountSheet[]; 
    TravelCountSheet?: TravelCountSheet[];
  };

  
export type TravelCountSheet = {
  id: number;
  countId: number | null;
  tagsField: string[]; 
  startDate: Date;
  endDate: Date;
  reqDate: Date;
  travelling: string | null;
  fuel: number | null;
  repair: string[]; 
  litigation: number | null;
  totalFee: number;
  kilometer: string | null;
  remarks: string | null;
};

export type CashCountSheet = {
    id: number;
    countId: number;
    startDate: Date;
    endDate: Date;
    reqDate: Date;
    payee: string;
    remarks: string | null;
    fundAmount: number;
    miscExp: number | null;
    billFee: number | null;
    telFee: number | null;
    dueMh: number | null;
}