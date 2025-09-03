-- CreateTable
CREATE TABLE "form_transmittal_memo" (
    "id" SERIAL NOT NULL,
    "from" VARCHAR(100),
    "date" DATE NOT NULL,
    "description" VARCHAR(200),
    "note" VARCHAR(200),
    "items" JSONB,
    "to_id" INTEGER,
    "main_form_id" INTEGER NOT NULL,

    CONSTRAINT "form_transmittal_memo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "form_transmittal_memo_main_form_id_key" ON "form_transmittal_memo"("main_form_id");

-- AddForeignKey
ALTER TABLE "form_transmittal_memo" ADD CONSTRAINT "form_transmittal_memo_to_id_fkey" FOREIGN KEY ("to_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form_transmittal_memo" ADD CONSTRAINT "form_transmittal_memo_main_form_id_fkey" FOREIGN KEY ("main_form_id") REFERENCES "main_request"("id") ON DELETE CASCADE ON UPDATE CASCADE;
