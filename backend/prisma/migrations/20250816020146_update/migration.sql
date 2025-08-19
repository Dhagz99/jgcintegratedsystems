-- AlterEnum
ALTER TYPE "Statuses" ADD VALUE 'EMPTY';

-- AlterTable
ALTER TABLE "main_request" ADD COLUMN     "remarks" TEXT;

-- CreateTable
CREATE TABLE "approval_table" (
    "id" SERIAL NOT NULL,
    "main_form_id" INTEGER,
    "noted_by" "Statuses" NOT NULL DEFAULT 'PENDING',
    "checked_by" "Statuses" NOT NULL DEFAULT 'PENDING',
    "checked_by2" "Statuses" NOT NULL DEFAULT 'PENDING',
    "recom_approval" "Statuses" NOT NULL DEFAULT 'PENDING',
    "recom_approval2" "Statuses" NOT NULL DEFAULT 'PENDING',
    "approve_by" "Statuses" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "approval_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "request_logs" (
    "id" SERIAL NOT NULL,
    "approval_id" INTEGER,
    "checker_type" TEXT NOT NULL,
    "approver_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "request_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "approval_table_main_form_id_key" ON "approval_table"("main_form_id");

-- CreateIndex
CREATE INDEX "approval_table_main_form_id_idx" ON "approval_table"("main_form_id");

-- CreateIndex
CREATE INDEX "request_logs_approval_id_idx" ON "request_logs"("approval_id");

-- CreateIndex
CREATE INDEX "request_logs_approver_id_idx" ON "request_logs"("approver_id");

-- AddForeignKey
ALTER TABLE "approval_table" ADD CONSTRAINT "approval_table_main_form_id_fkey" FOREIGN KEY ("main_form_id") REFERENCES "main_request"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_logs" ADD CONSTRAINT "request_logs_approval_id_fkey" FOREIGN KEY ("approval_id") REFERENCES "approval_table"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_logs" ADD CONSTRAINT "request_logs_approver_id_fkey" FOREIGN KEY ("approver_id") REFERENCES "request_checker"("id") ON DELETE SET NULL ON UPDATE CASCADE;
