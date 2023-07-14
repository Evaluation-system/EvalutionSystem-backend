/*
  Warnings:

  - The values [user,admin] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `ProjectId` on the `phase` table. All the data in the column will be lost.
  - You are about to drop the `EmployeePayments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Procings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tasks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserProjects` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('USER', 'ADMIN');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER';
COMMIT;

-- DropForeignKey
ALTER TABLE "EmployeePayments" DROP CONSTRAINT "EmployeePayments_ProjectId_fkey";

-- DropForeignKey
ALTER TABLE "Procings" DROP CONSTRAINT "Procings_ProjectId_fkey";

-- DropForeignKey
ALTER TABLE "Tasks" DROP CONSTRAINT "Tasks_ProjectId_fkey";

-- DropForeignKey
ALTER TABLE "UserProjects" DROP CONSTRAINT "UserProjects_UserId_fkey";

-- DropForeignKey
ALTER TABLE "phase" DROP CONSTRAINT "phase_ProjectId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER';

-- AlterTable
ALTER TABLE "phase" DROP COLUMN "ProjectId",
ADD COLUMN     "projectId" INTEGER;

-- DropTable
DROP TABLE "EmployeePayments";

-- DropTable
DROP TABLE "Procings";

-- DropTable
DROP TABLE "Tasks";

-- DropTable
DROP TABLE "UserProjects";

-- CreateTable
CREATE TABLE "UserProject" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "client" TEXT,
    "userId" INTEGER,
    "pathImage" TEXT,
    "price" INTEGER,
    "terms" INTEGER,

    CONSTRAINT "UserProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Procing" (
    "id" SERIAL NOT NULL,
    "cost" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "projectId" INTEGER,

    CONSTRAINT "Procing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "task" TEXT NOT NULL,
    "time" INTEGER NOT NULL,
    "projectId" INTEGER,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeePayment" (
    "id" SERIAL NOT NULL,
    "employee" TEXT NOT NULL,
    "salary" INTEGER NOT NULL,
    "ProjectId" INTEGER,

    CONSTRAINT "EmployeePayment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserProject" ADD CONSTRAINT "UserProject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Procing" ADD CONSTRAINT "Procing_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "UserProject"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "UserProject"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeePayment" ADD CONSTRAINT "EmployeePayment_ProjectId_fkey" FOREIGN KEY ("ProjectId") REFERENCES "UserProject"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "phase" ADD CONSTRAINT "phase_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "UserProject"("id") ON DELETE SET NULL ON UPDATE CASCADE;
