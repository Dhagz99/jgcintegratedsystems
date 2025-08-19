-- AlterTable
ALTER TABLE "main_request" ADD COLUMN     "requestFrom" INTEGER;

-- CreateIndex
CREATE INDEX "main_request_requestFrom_idx" ON "main_request"("requestFrom");

-- AddForeignKey
ALTER TABLE "main_request" ADD CONSTRAINT "main_request_requestFrom_fkey" FOREIGN KEY ("requestFrom") REFERENCES "branches"("id") ON DELETE SET NULL ON UPDATE CASCADE;
