/*
  Warnings:

  - Changed the type of `phone` on the `Profile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female');

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "phone",
ADD COLUMN     "phone" "Gender" NOT NULL;
