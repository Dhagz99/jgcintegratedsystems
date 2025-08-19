/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `request_checker` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "request_checker_user_id_key" ON "request_checker"("user_id");
