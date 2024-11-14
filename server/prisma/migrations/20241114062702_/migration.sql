/*
  Warnings:

  - The `batch` column on the `TryoutList` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "TryoutList" DROP COLUMN "batch",
ADD COLUMN     "batch" INTEGER NOT NULL DEFAULT 1;
