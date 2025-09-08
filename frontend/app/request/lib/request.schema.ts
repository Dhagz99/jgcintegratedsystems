import { z }  from 'zod'

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



// Travel Fundings Schema


export const TravelingFundsSchema = z.object({
    
<<<<<<< HEAD
    tagsField: z.array(z.string().min(1)).min(1, "At least one tag is required"),

    travelDate: z.coerce.date(),

   
    travelling: z.string()
        .max(100, "Your text is too long."),

    fuelFee: z.coerce.number()
        .min(0, "fee must be 0 or greater")
        .max(100000, "fee must not exceed limit.")
        .refine(val => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
        message: "Maximum of 2 decimal places allowed"
        }),

    repairs: z.array(z.string().min(1)).optional(),

    litigationExp: z.coerce.number()
        .min(0, "fee must be 0 or greater")
        .max(100000, "fee must not exceed limit.")
        .refine(val => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
        message: "Maximum of 2 decimal places allowed"
        }),

    totalFunds: z.coerce.number()
        .min(0, "fee must be 0 or greater")
        .max(100000, "fee must not exceed limit.")
        .refine(val => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
        message: "Maximum of 2 decimal places allowed"
        }),

    travelKm: z.string()
        .max(10, "You exceeded the text limit."),

    fundRemarks: z.string()
        .max(200, "Make your remark shorter"),

    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
=======
  tagsField: z.array(z.string().min(1)).min(1, "At least one tag is required"),

  travelDate: z.coerce.date(),

 
  travelling: z.string()
      .max(100, "Your text is too long."),

  fuelFee: z.coerce.number()
      .min(0, "fee must be 0 or greater")
      .max(100000, "fee must not exceed limit.")
      .refine(val => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
      message: "Maximum of 2 decimal places allowed"
      }),

  repairs: z.array(z.string().min(1)).optional(),

  litigationExp: z.coerce.number()
      .min(0, "fee must be 0 or greater")
      .max(100000, "fee must not exceed limit.")
      .refine(val => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
      message: "Maximum of 2 decimal places allowed"
      }),

  totalFunds: z.coerce.number()
      .min(0, "fee must be 0 or greater")
      .max(100000, "fee must not exceed limit.")
      .refine(val => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
      message: "Maximum of 2 decimal places allowed"
      }),

  travelKm: z.string()
      .max(10, "You exceeded the text limit."),

  fundRemarks: z.string()
      .max(200, "Make your remark shorter"),

  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
>>>>>>> tester

});

export type travelFund = z.infer<typeof TravelingFundsSchema>;
<<<<<<< HEAD
    

export const CashFundRepSchema = z.object({
    funDate: z.coerce.date(),
    payee: z.string()
        .max(100, "Your text is too long."),
    fundRemarks: z.string()
        .max(200, "Make your remark shorter"),
    fundAmount: z.coerce.number() .min(0, "amount must be 0 or greater")
        .max(100000, "amount must not exceed limit.")
        .refine(val => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
        message: "Maximum of 2 decimal places allowed"
        }),
    miscExp: z.coerce.number()
        .min(0, "fee must be 0 or greater")
        .max(100000, "fee must not exceed limit.")
        .refine(val => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
        message: "Maximum of 2 decimal places allowed"
        }),
    powerLight: z.coerce.number()
        .min(0, "fee must be 0 or greater")
        .max(100000, "fee must not exceed limit.")
        .refine(val => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
        message: "Maximum of 2 decimal places allowed"
        }),
    telephone: z.coerce.number()
        .min(0, "fee must be 0 or greater")
        .max(100000, "fee must not exceed limit.")
        .refine(val => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
        message: "Maximum of 2 decimal places allowed"
        }),
    dueToMh: z.coerce.number()
        .min(0, "fee must be 0 or greater")
        .max(100000, "fee must not exceed limit.")
        .refine(val => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
        message: "Maximum of 2 decimal places allowed"
        }),


    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
=======
  

export const CashFundRepSchema = z.object({
  funDate: z.coerce.date(),
  payee: z.string()
      .max(100, "Your text is too long."),
  fundRemarks: z.string()
      .max(200, "Make your remark shorter"),
  fundAmount: z.coerce.number() .min(0, "amount must be 0 or greater")
      .max(100000, "amount must not exceed limit.")
      .refine(val => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
      message: "Maximum of 2 decimal places allowed"
      }),
  miscExp: z.coerce.number()
      .min(0, "fee must be 0 or greater")
      .max(100000, "fee must not exceed limit.")
      .refine(val => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
      message: "Maximum of 2 decimal places allowed"
      }),
  powerLight: z.coerce.number()
      .min(0, "fee must be 0 or greater")
      .max(100000, "fee must not exceed limit.")
      .refine(val => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
      message: "Maximum of 2 decimal places allowed"
      }),
  telephone: z.coerce.number()
      .min(0, "fee must be 0 or greater")
      .max(100000, "fee must not exceed limit.")
      .refine(val => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
      message: "Maximum of 2 decimal places allowed"
      }),
  dueToMh: z.coerce.number()
      .min(0, "fee must be 0 or greater")
      .max(100000, "fee must not exceed limit.")
      .refine(val => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
      message: "Maximum of 2 decimal places allowed"
      }),


  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
>>>>>>> tester
});

export type CashFundRep = z.infer<typeof CashFundRepSchema>;


export const AddcashCountSchema = z
<<<<<<< HEAD
  .object({
    office: z.string().min(1, "Required").max(50),
    branch:z.string().min(1,"Required").max(100),

    dateCounted: z.coerce.date(),
    nameFund: z.string().min(1, "Required").max(100),
    fundAmount: z.coerce.number().min(0, "Must be 0 or greater"),
    reference: z.string().max(100).optional(),

    denoms: z.array(z.coerce.number()),
    pieces: z.array(z.coerce.number().min(0, "Must be 0 or greater")),
    amounts: z.array(z.coerce.number().min(0, "Must be 0 or greater")),
    fundPerCount: z.coerce.number().min(0, "Must be 0 or greater"),
    cashShort: z.coerce.number().min(0, "Must be 0 or greater"),
    checked: z.array(z.coerce.boolean()).optional(),
  })
  .passthrough(); 
=======
.object({
  office: z.string().min(1, "Required").max(50),
  branch:z.string().min(1,"Required").max(100),

  dateCounted: z.coerce.date(),
  nameFund: z.string().min(1, "Required").max(100),
  fundAmount: z.coerce.number().min(0, "Must be 0 or greater"),
  reference: z.string().max(100).optional(),

  denoms: z.array(z.coerce.number()),
  pieces: z.array(z.coerce.number().min(0, "Must be 0 or greater")),
  amounts: z.array(z.coerce.number().min(0, "Must be 0 or greater")),
  fundPerCount: z.coerce.number().min(0, "Must be 0 or greater"),
  cashShort: z.coerce.number().min(0, "Must be 0 or greater"),
  checked: z.array(z.coerce.boolean()).optional(),
})
.passthrough(); 
>>>>>>> tester

export type addCcashCount = z.infer<typeof AddcashCountSchema>;


export const TravelFundsModalSchema=z.object({
<<<<<<< HEAD
    company: z.string().min(1, "Required").max(100),
    branch:z.string().min(1,"Required").max(100),
   
=======
  company: z.string().min(1, "Required").max(100),
  branch:z.string().min(1,"Required").max(100),
 
>>>>>>> tester
})

export type FundsModal = z.infer<typeof TravelFundsModalSchema>;

export const CashFundsModalSchema=z.object({
<<<<<<< HEAD
    company: z.string().min(1, "Required").max(100),
    branch:z.string().min(1,"Required").max(100),
   
=======
  company: z.string().min(1, "Required").max(100),
  branch:z.string().min(1,"Required").max(100),
 
>>>>>>> tester
})

export type CashModal = z.infer<typeof CashFundsModalSchema>;