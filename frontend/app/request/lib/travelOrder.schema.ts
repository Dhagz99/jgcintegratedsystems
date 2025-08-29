import { z } from "zod";

export const entrySchema = z.object({
  budget: z.string().min(1, "Budget is required"),
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine(v => !Number.isNaN(parseFloat(v)), "Amount must be a number"),
});

export const travelOrderSchema = z.object({
  name: z.string().min(1, "Name is required"),
  position: z.string().min(1, "Position is required"),
  departure_date: z.string().min(1, "Departure date is required"), 
  destination: z.string().min(1, "Destination is required"),
  current_date: z.string().min(1, "Current date is required"),
  purpose_of_travel: z.string().min(1, "Purpose is required"),
  requestFromId: z.number().min(1, "Purpose is required"),
  items: z.array(entrySchema).min(1, "At least one entry is required"),
  requestTypeId: z.number().optional(), 

});


export const proposedBudgetSchema = z.object({
  description: z.string().optional().default(""),
  budget: z.coerce.number(),
  total_expense: z.coerce.number(),
  variance: z.coerce.number().optional(),     
  proposed_budget: z.coerce.number(),
  remarks: z.string().optional().default(""),
  expense_type: z.enum(["admin", "office_other_expenses", "unbudgeted_expenses"]),
});




export type TravelOrderFormInput = z.infer<typeof travelOrderSchema>;
export type ProposedBudgetFormIput = z.infer<typeof proposedBudgetSchema>;