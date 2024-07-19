-- DropForeignKey
ALTER TABLE "Tryout" DROP CONSTRAINT "Tryout_tryoutListId_fkey";

-- AddForeignKey
ALTER TABLE "Tryout" ADD CONSTRAINT "Tryout_tryoutListId_fkey" FOREIGN KEY ("tryoutListId") REFERENCES "TryoutList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
