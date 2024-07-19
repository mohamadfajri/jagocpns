-- DropForeignKey
ALTER TABLE "Ownership" DROP CONSTRAINT "Ownership_tryoutListId_fkey";

-- AddForeignKey
ALTER TABLE "Ownership" ADD CONSTRAINT "Ownership_tryoutListId_fkey" FOREIGN KEY ("tryoutListId") REFERENCES "TryoutList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
