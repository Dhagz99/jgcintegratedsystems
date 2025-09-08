import api  from "@/lib/api";

import { TravelOrderPaperProps } from "../type/FormType";
import { AddProposedBudgetPayload,TransmittalData,FormDataDisburse } from "../type/FormType";

export const addTravelOrder = async (data: TravelOrderPaperProps) => {
  const res = await api.post("/add-travel-form", data);
  return res.data;
};


export const addProposedBudget = async (payload: AddProposedBudgetPayload) => {
  const res = await api.post("/add-proposed-budget", payload);
  return res.data;
};



export const addTransmittalMemo = async(data: TransmittalData) => {
  const res = await api.post("/add-transmittal-memo",data);
  return res.data;
}


export const addDisburse = async (data: FormDataDisburse) => {
  const res = await api.post("/add-disburse",data);
  return res.data;
}