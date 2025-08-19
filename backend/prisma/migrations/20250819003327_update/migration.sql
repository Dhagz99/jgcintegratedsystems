/*
  Warnings:

  - A unique constraint covering the columns `[request_to_id]` on the table `form_fund_transfer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "form_fund_transfer_request_to_id_key" ON "form_fund_transfer"("request_to_id");
