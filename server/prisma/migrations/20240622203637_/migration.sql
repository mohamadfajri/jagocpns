/*
  Warnings:

  - A unique constraint covering the columns `[tryoutListId,number,userId]` on the table `Answer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `answer` to the `Answer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Answer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tryoutListId` to the `Answer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Answer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Answer" ADD COLUMN     "answer" INTEGER NOT NULL,
ADD COLUMN     "number" INTEGER NOT NULL,
ADD COLUMN     "tryoutListId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Ownership" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "tryoutListId" INTEGER NOT NULL,

    CONSTRAINT "Ownership_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Answer_tryoutListId_number_userId_key" ON "Answer"("tryoutListId", "number", "userId");

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_tryoutListId_fkey" FOREIGN KEY ("tryoutListId") REFERENCES "TryoutList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
