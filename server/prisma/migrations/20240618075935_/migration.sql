/*
  Warnings:

  - You are about to drop the column `questionerId` on the `TryoutList` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TryoutList" DROP CONSTRAINT "TryoutList_questionerId_fkey";

-- AlterTable
ALTER TABLE "TryoutList" DROP COLUMN "questionerId";
