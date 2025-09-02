import { useAdd } from "./useGlobal";
import { TravelOrderPaperProps } from "../type/FormType";
import { AddProposedBudgetPayload,TransmittalData,FormDataDisburse } from "../type/FormType";
import { addTravelOrder,addProposedBudget,addTransmittalMemo,addDisburse } from "../services/form.service";


export const useAddTravelOrder = () =>
    useAdd<TravelOrderPaperProps>({
      mutationFn: addTravelOrder,
      queryKey: "travel-orders",
    });
  
  

export const useAddProposedBudget = () =>
  useAdd<AddProposedBudgetPayload>({
    mutationFn: addProposedBudget,
    queryKey: "propose-budget",
  });
    
export const useAddTransmittalMemo = () =>
  useAdd<TransmittalData>({
    mutationFn: addTransmittalMemo,
    queryKey: "query-transmittal-memo",
});
    
  
export const useAddDisburse = () =>
  useAdd<FormDataDisburse>({
    mutationFn: addDisburse,
    queryKey: "query-disburse",
});
    