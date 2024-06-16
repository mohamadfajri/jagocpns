/*
  Warnings:

  - Changed the type of `type` on the `Information` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "InformationType" AS ENUM ('banner', 'info', 'news');

-- AlterTable
ALTER TABLE "Information" DROP COLUMN "type",
ADD COLUMN     "type" "InformationType" NOT NULL;
