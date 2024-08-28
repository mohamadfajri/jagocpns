/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `FreeForm` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FreeForm_userId_key" ON "FreeForm"("userId");
