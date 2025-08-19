-- DropForeignKey
ALTER TABLE "main_request" DROP CONSTRAINT "main_request_request_by_id_fkey";

-- AddForeignKey
ALTER TABLE "main_request" ADD CONSTRAINT "main_request_request_by_id_fkey" FOREIGN KEY ("request_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
