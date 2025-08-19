import { z } from "zod";

export const requestTypeSchema = z.object({
  requestName: z.string().min(1, "Request name is required"),
  notedById: z.number().optional(),
  checkedById: z.number().optional(),
  checkedBy2Id: z.number().optional(),
  recomApprovalId: z.number().optional(),
  recomApproval2Id: z.number().optional(),
  approveById: z.number().optional(),
})