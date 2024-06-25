/*
  Warnings:

  - Changed the type of `answer` on the `Answer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "answer",
ADD COLUMN     "answer" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Answer_tryoutListId_number_userId_idx" ON "Answer"("tryoutListId", "number", "userId");
