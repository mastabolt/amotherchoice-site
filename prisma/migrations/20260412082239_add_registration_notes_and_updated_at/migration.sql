/*
  Warnings:

  - Added the required column `updatedAt` to the `Registration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Registration" ADD COLUMN     "notes" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "Registration_stripeCheckoutSessionId_idx" ON "Registration"("stripeCheckoutSessionId");

-- CreateIndex
CREATE INDEX "Registration_stripePaymentIntentId_idx" ON "Registration"("stripePaymentIntentId");
