import { z }  from 'zod'
import { id } from 'zod/v4/locales';

export const checkerSchema = z.object({
    id: z.number().optional(), 
    userId: z.number().optional(), // no coerce
    position: z.string().min(3),
    initial: z.string().min(3)
})
export type CheckerData = z.infer<typeof checkerSchema>
export type CheckerInput = z.input<typeof checkerSchema>;   // userId?: unknown
export type CheckerOutput = z.output<typeof checkerSchema>; // userId?: number


export const branchSchema = z.object({
    id: z.number().optional(),
      branchCode: z
        .string()
        .min(1, { message: "Branch code is required" })
        .max(10, { message: "Branch code must be at most 10 characters" }),
      branchName: z
        .string()
        .min(1, { message: "Branch name is required" })
        .max(100, { message: "Branch name must be at most 100 characters" }),
        bom: z
      .string()
      .min(1, { message: "Bof name is required" })
      .max(100, { message: "Bof name must be at most 100 characters" }),
      faa: z
      .string()
      .min(1, { message: "Faa name is required" })
      .max(100, { message: "Faa name must be at most 100 characters" }),
      telephone: z
      .string()
      .min(1, { message: "Telephone number is required" })
      .max(20, { message: "Telephone number must be at most 20 characters" }),
      address: z
      .string()
      .min(1, { message: "Address is required" })
      .max(150, { message: "Address must be at most 100 characters" }),
      companyName: z
      .string()
      .min(1, { message: "Company name is required" })
      .max(150, { message: "Company name must be at most 150 characters" }),
      createdAt: z.date().optional(),
      updatedAt: z.date().optional(), 
    });
  
  export const createBranchSchema = branchSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });
  
  // 3️⃣ Update schema — for PATCH/PUT (all fields optional)
  export const updateBranchSchema = branchSchema
    .partial()
    .refine(
      data => Object.keys(data).length > 0,
      { message: "At least one field must be provided for update" }
    );
  
  // ✅ TypeScript types inferred from Zod
  export type Branch = z.infer<typeof branchSchema>;
  export type CreateBranchInput = z.infer<typeof createBranchSchema>;
  export type UpdateBranchInput = z.infer<typeof updateBranchSchema>;


export const requestTypeSchema  = z.object({
      id: z.number().optional(),
      requestName: z.string().min(1),
      notedById: z.number().optional(),
      checkedById: z.number().optional(),
      checkedBy2Id: z.number().optional(),
      recomApprovalId: z.number().optional(),
      recomApproval2Id: z.number().optional(),
      approveById: z.number().optional(),
      createdAt: z.date().optional(),
      updatedAt: z.date().optional(), 
})

export const createRequestType = requestTypeSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// 3️⃣ Update schema — for PATCH/PUT (all fields optional)
export const updateRequestType = requestTypeSchema
  .partial()
  .refine(
    data => Object.keys(data).length > 0,
    { message: "At least one field must be provided for update" }
  );


export type RequestType = z.infer<typeof requestTypeSchema>;
export type CreateRequestType = z.infer<typeof createRequestType>;
export type UpdateRequestType = z.infer<typeof updateRequestType>;


export const mainRequest = z.object({
  id: z.number().optional(),
  requestTypeId: z.number(),
  requestById: z.number(),
  status: z.string(),
  requestDate: z.date(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(), 
})



export const formFundTransfer  = z.object({
  id: z.number().optional(),
  mainRequestID: z.number().optional(), 
  requestToId: z.number({ message: "Select only in the provided data" }).min(1, { message: "Requested to is required" }),
  requestFromId: z.number({ message: "Select only in the provided data" }).min(1),
  requestContent: z.string().min(1),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(), 

  //MainRequest
  requestDate: z.coerce.date()
  .refine((val) => val instanceof Date && !isNaN(val.getTime()), {
    message: "Invalid date format",
  })
  .or(z.any().refine((val) => !!val, { message: "Date is required" })),

  requestTypeId: z.number().optional(), 
  requestById: z.number().optional(), 
})


export const createFundTransfer = formFundTransfer.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});


export type FormFundTransfer = z.infer<typeof formFundTransfer>;
export type CreateFundTrasnfer = z.infer<typeof createFundTransfer>;

