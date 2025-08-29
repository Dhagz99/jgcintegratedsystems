import { useAdd } from "./useGlobal";
import { TravelOrderPaperProps } from "../type/FormType";
import { AddProposedBudgetPayload } from "../type/FormType";
import { addTravelOrder,addProposedBudget } from "../services/form.service";


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
    
