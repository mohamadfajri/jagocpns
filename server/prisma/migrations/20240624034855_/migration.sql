/*
  Warnings:

  - A unique constraint covering the columns `[userId,tryoutListId,number]` on the table `Answer` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_tryoutListId_fkey";

-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_userId_fkey";

-- DropIndex
DROP INDEX "Answer_tryoutListId_number_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Answer_userId_tryoutListId_number_key" ON "Answer"("userId", "tryoutListId", "number");
