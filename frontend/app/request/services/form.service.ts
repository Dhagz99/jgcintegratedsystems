import api  from "@/lib/api";

import { TravelOrderPaperProps } from "../type/FormType";
import { AddProposedBudgetPayload } from "../type/FormType";

export const addTravelOrder = async (data: TravelOrderPaperProps) => {
  const res = await api.post("/add-travel-form", data);
  return res.data;
};


export const addProposedBudget = async (payload: AddProposedBudgetPayload) => {
  const res = await api.post("/add-proposed-budget", payload);
  return res.data;
};
