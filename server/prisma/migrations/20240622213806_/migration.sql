-- DropIndex
DROP INDEX "Answer_tryoutListId_number_userId_idx";

-- AlterTable
ALTER TABLE "Answer" ALTER COLUMN "answer" SET DATA TYPE TEXT;
