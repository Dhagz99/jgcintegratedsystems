-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'User', 'Branch', 'Coordinator', 'Superadmin');

-- CreateEnum
CREATE TYPE "Statuses" AS ENUM ('PENDING', 'INPROGRESS', 'CANCEL', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'User',
    "branch_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "branches" (
    "id" SERIAL NOT NULL,
    "branchCode" TEXT NOT NULL,
    "branchName" TEXT NOT NULL,
    "bom" TEXT NOT NULL,
    "faa" TEXT NOT NULL,
    "coordinator" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "branches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "request_types" (
    "id" SERIAL NOT NULL,
    "requestName" TEXT NOT NULL,
    "notedById" INTEGER,
    "checkedById" INTEGER,
    "checkedBy2Id" INTEGER,
    "recomApprovalId" INTEGER,
    "recomApproval2Id" INTEGER,
    "approveById" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "request_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "request_checker" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "position" TEXT NOT NULL,
    "initial" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "request_checker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "main_request" (
    "id" SERIAL NOT NULL,
    "request_type_id" INTEGER,
    "request_by_id" INTEGER,
    "status" "Statuses" NOT NULL DEFAULT 'PENDING',
    "request_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "main_request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "form_fund_transfer" (
    "id" SERIAL NOT NULL,
    "main_reqeust_id" INTEGER,
    "request_to_id" INTEGER,
    "request_from_id" INTEGER,
    "request_content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "form_fund_transfer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE INDEX "users_branch_id_idx" ON "users"("branch_id");

-- CreateIndex
CREATE UNIQUE INDEX "branches_branchCode_key" ON "branches"("branchCode");

-- CreateIndex
CREATE UNIQUE INDEX "request_types_requestName_key" ON "request_types"("requestName");

-- CreateIndex
CREATE INDEX "request_types_notedById_idx" ON "request_types"("notedById");

-- CreateIndex
CREATE INDEX "request_types_checkedById_idx" ON "request_types"("checkedById");

-- CreateIndex
CREATE INDEX "request_types_checkedBy2Id_idx" ON "request_types"("checkedBy2Id");

-- CreateIndex
CREATE INDEX "request_types_recomApprovalId_idx" ON "request_types"("recomApprovalId");

-- CreateIndex
CREATE INDEX "request_types_recomApproval2Id_idx" ON "request_types"("recomApproval2Id");

-- CreateIndex
CREATE INDEX "request_types_approveById_idx" ON "request_types"("approveById");

-- CreateIndex
CREATE INDEX "request_checker_user_id_idx" ON "request_checker"("user_id");

-- CreateIndex
CREATE INDEX "main_request_request_type_id_idx" ON "main_request"("request_type_id");

-- CreateIndex
CREATE INDEX "main_request_request_by_id_idx" ON "main_request"("request_by_id");

-- CreateIndex
CREATE INDEX "form_fund_transfer_main_reqeust_id_idx" ON "form_fund_transfer"("main_reqeust_id");

-- CreateIndex
CREATE INDEX "form_fund_transfer_request_to_id_idx" ON "form_fund_transfer"("request_to_id");

-- CreateIndex
CREATE INDEX "form_fund_transfer_request_from_id_idx" ON "form_fund_transfer"("request_from_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branches"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_types" ADD CONSTRAINT "request_types_notedById_fkey" FOREIGN KEY ("notedById") REFERENCES "request_checker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_types" ADD CONSTRAINT "request_types_checkedById_fkey" FOREIGN KEY ("checkedById") REFERENCES "request_checker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_types" ADD CONSTRAINT "request_types_checkedBy2Id_fkey" FOREIGN KEY ("checkedBy2Id") REFERENCES "request_checker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_types" ADD CONSTRAINT "request_types_recomApprovalId_fkey" FOREIGN KEY ("recomApprovalId") REFERENCES "request_checker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_types" ADD CONSTRAINT "request_types_recomApproval2Id_fkey" FOREIGN KEY ("recomApproval2Id") REFERENCES "request_checker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_types" ADD CONSTRAINT "request_types_approveById_fkey" FOREIGN KEY ("approveById") REFERENCES "request_checker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_checker" ADD CONSTRAINT "request_checker_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "main_request" ADD CONSTRAINT "main_request_request_type_id_fkey" FOREIGN KEY ("request_type_id") REFERENCES "request_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "main_request" ADD CONSTRAINT "main_request_request_by_id_fkey" FOREIGN KEY ("request_by_id") REFERENCES "request_checker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form_fund_transfer" ADD CONSTRAINT "form_fund_transfer_main_reqeust_id_fkey" FOREIGN KEY ("main_reqeust_id") REFERENCES "main_request"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form_fund_transfer" ADD CONSTRAINT "form_fund_transfer_request_to_id_fkey" FOREIGN KEY ("request_to_id") REFERENCES "request_checker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form_fund_transfer" ADD CONSTRAINT "form_fund_transfer_request_from_id_fkey" FOREIGN KEY ("request_from_id") REFERENCES "request_checker"("id") ON DELETE SET NULL ON UPDATE CASCADE;
