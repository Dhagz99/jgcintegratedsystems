/*
  Warnings:

  - A unique constraint covering the columns `[main_reqeust_id]` on the table `form_fund_transfer` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "form_fund_transfer_request_to_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "form_fund_transfer_main_reqeust_id_key" ON "form_fund_transfer"("main_reqeust_id");
