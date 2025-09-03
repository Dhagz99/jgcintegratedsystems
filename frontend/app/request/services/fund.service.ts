// services/funs.service.ts
import api from "@/lib/api";

// Travel DTO (from TravelFunds child)
export interface TravelFundDTO {
  tagsField: string[];
  startDate: string | null;
  endDate: string | null;
  travelDate: string | null;
  travelling: string | null;
  fuelFee: number | null;
  repairs: string[] | null;
  litigationExp: number | null;
  totalFunds: number | null;
  travelKm: string | null;
  fundRemarks: string | null;
}

// Cash DTO (from CashFundReplenisment child)
export interface CashFundDTO {
  startDate: string | null;
  endDate: string | null;
  funDate: string | null;
  payee: string | null;
  fundAmount: number | null;
  miscExp: number | null;
  powerLight: number | null;
  telephone: number | null;
  dueToMh: number | null;
  fundRemarks: string | null;
}

export interface CashDemoItem {
  denom: number;
  pieces: number;
  amount: number;
  checked: boolean;
}
// Parent payload type
export interface FundPayload {
  fundType: "Travel" | "Cash";
  requestTypeId:number;
  office?: string;
  dateCounted?: string;
  nameFund?: string;
  fundAmount?: number;
  reference?: string;
  cashDemo?: CashDemoItem[];
  fundPerCount?: number;
  cashShort?: number;
  repFund?:number;
  totalFund:number;
  branchId:number;
  // Conditional child rows
  travelRows?: TravelFundDTO[];
  cashRows?: CashFundDTO[];
}

export async function createFund(payload: FundPayload) {
  const { data } = await api.post(
    "/request/add-count-sheet",
    payload,
    { withCredentials: true }
  );
  return data;
}