/*
  Warnings:

  - The `terms` column on the `UserProjects` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "UserProjects" DROP COLUMN "terms",
ADD COLUMN     "terms" INTEGER;
