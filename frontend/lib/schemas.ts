import { z } from 'zod'

export const loginSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(6),
})

<<<<<<< HEAD
const RoleEnum = z.enum(["Admin", "User", "Branch", "Superadmin",  "Coordinator"]);
=======
const RoleEnum = z.enum(["Admin", "User", "Branch", "Superadmin", "Coordinator"]);
>>>>>>> tester

export const registerSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(2),
    email: z.string().email(),
    username: z.string().min(1),
    password: z.string().min(6),
    role: RoleEnum.default("User"),
    branchId: z.coerce.number().optional(),
    approver: z.coerce.boolean().default(false),
    position: z.string().min(1),
    initial: z.string().min(1),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
})


 export const createUserSchema = registerSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });
  
  export const updateUserSchema = registerSchema
    .partial()
    .refine(
      data => Object.keys(data).length > 0,
      { message: "At least one field must be provided for update" }
    );
  
    export type RegisterData = z.infer<typeof registerSchema>
    export type CreateUser = z.infer<typeof createUserSchema>;
    export type UpdateUser = z.infer<typeof updateUserSchema>;


export type LoginData = z.infer<typeof loginSchema>