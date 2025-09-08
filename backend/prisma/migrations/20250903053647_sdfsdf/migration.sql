-- CreateTable
CREATE TABLE "form_disburse" (
    "id" SERIAL NOT NULL,
    "from" VARCHAR(200),
    "date" DATE NOT NULL,
    "subject" VARCHAR(255),
    "description" TEXT,
    "note" TEXT,
    "total_amount" DECIMAL(12,2),
    "items" JSONB,
    "to_id" INTEGER,
    "main_form_id" INTEGER NOT NULL,

    CONSTRAINT "form_disburse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "form_disburse_main_form_id_key" ON "form_disburse"("main_form_id");

-- AddForeignKey
ALTER TABLE "form_disburse" ADD CONSTRAINT "form_disburse_to_id_fkey" FOREIGN KEY ("to_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form_disburse" ADD CONSTRAINT "form_disburse_main_form_id_fkey" FOREIGN KEY ("main_form_id") REFERENCES "main_request"("id") ON DELETE CASCADE ON UPDATE CASCADE;
