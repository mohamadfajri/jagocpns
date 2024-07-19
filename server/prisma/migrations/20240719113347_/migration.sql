-- DropForeignKey
ALTER TABLE "PaidList" DROP CONSTRAINT "PaidList_tryoutListId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_tryoutListId_fkey";

-- DropForeignKey
ALTER TABLE "Score" DROP CONSTRAINT "Score_tryoutListId_fkey";

-- AddForeignKey
ALTER TABLE "PaidList" ADD CONSTRAINT "PaidList_tryoutListId_fkey" FOREIGN KEY ("tryoutListId") REFERENCES "TryoutList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_tryoutListId_fkey" FOREIGN KEY ("tryoutListId") REFERENCES "TryoutList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_tryoutListId_fkey" FOREIGN KEY ("tryoutListId") REFERENCES "TryoutList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
