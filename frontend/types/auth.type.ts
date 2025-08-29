interface User {
    id?: number;
    name: string;
    email: string;
    password: string;
}


// app/types/dto.ts (or src/types/dto.ts)

export type Role = 'Admin' | 'User' | 'Branch' | 'Superadmin';

export interface BranchDTO {
  id: number;
  branchCode: string;
  branchName: string;
  bom: string;
  faa: string;
  createdAt: string; // ISO
  updateAt: string;  // ISO
}

export interface  PublicUserDTO {
  id: number;
  name: string;
  email: string;
  username: string;
  position: string;
  initial: string;
  approver: Boolean;
  role: Role;
  branchId: number | null;
  createdAt: string; // ISO
  updateAt: string;  // ISO
  branch: BranchDTO | null;
  signatureUrl: string;
  branchName?: string;
}
