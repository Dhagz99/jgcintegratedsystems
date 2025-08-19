/*
  Warnings:

  - You are about to drop the column `request_from_id` on the `form_fund_transfer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "form_fund_transfer" DROP CONSTRAINT "form_fund_transfer_request_from_id_fkey";

-- DropIndex
DROP INDEX "form_fund_transfer_request_from_id_idx";

-- AlterTable
ALTER TABLE "form_fund_transfer" DROP COLUMN "request_from_id";
