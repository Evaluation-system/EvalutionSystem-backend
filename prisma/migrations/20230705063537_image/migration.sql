/*
  Warnings:

  - Added the required column `pathImage` to the `UserProjects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserProjects" ADD COLUMN     "pathImage" TEXT NOT NULL;
