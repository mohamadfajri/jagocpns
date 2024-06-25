-- AddForeignKey
ALTER TABLE "Ownership" ADD CONSTRAINT "Ownership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ownership" ADD CONSTRAINT "Ownership_tryoutListId_fkey" FOREIGN KEY ("tryoutListId") REFERENCES "TryoutList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
