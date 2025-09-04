-- DropForeignKey
ALTER TABLE "approval_table" DROP CONSTRAINT "approval_table_main_form_id_fkey";

-- DropForeignKey
ALTER TABLE "request_logs" DROP CONSTRAINT "request_logs_approval_id_fkey";

-- AddForeignKey
ALTER TABLE "approval_table" ADD CONSTRAINT "approval_table_main_form_id_fkey" FOREIGN KEY ("main_form_id") REFERENCES "main_request"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_logs" ADD CONSTRAINT "request_logs_approval_id_fkey" FOREIGN KEY ("approval_id") REFERENCES "approval_table"("id") ON DELETE CASCADE ON UPDATE CASCADE;
