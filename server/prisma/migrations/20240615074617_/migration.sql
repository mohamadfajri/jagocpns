/*
  Warnings:

  - You are about to drop the column `answer` on the `Tryout` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scoreA` to the `Tryout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scoreB` to the `Tryout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scoreC` to the `Tryout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scoreD` to the `Tryout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scoreE` to the `Tryout` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('unpaid', 'checking', 'paid');

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "amount" BIGINT NOT NULL,
ADD COLUMN     "status" "TransactionStatus" NOT NULL DEFAULT 'unpaid';

-- AlterTable
ALTER TABLE "Tryout" DROP COLUMN "answer",
ADD COLUMN     "scoreA" INTEGER NOT NULL,
ADD COLUMN     "scoreB" INTEGER NOT NULL,
ADD COLUMN     "scoreC" INTEGER NOT NULL,
ADD COLUMN     "scoreD" INTEGER NOT NULL,
ADD COLUMN     "scoreE" INTEGER NOT NULL;
