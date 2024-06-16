/*
  Warnings:

  - Changed the type of `gender` on the `Profile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `phone` on the `Profile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender" NOT NULL,
DROP COLUMN "phone",
ADD COLUMN     "phone" TEXT NOT NULL;
