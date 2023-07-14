/*
  Warnings:

  - You are about to drop the `EmployeePayment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Procing` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EmployeePayment" DROP CONSTRAINT "EmployeePayment_ProjectId_fkey";

-- DropForeignKey
ALTER TABLE "Procing" DROP CONSTRAINT "Procing_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_projectId_fkey";

-- DropTable
DROP TABLE "EmployeePayment";

-- DropTable
DROP TABLE "Procing";

-- DropTable
DROP TABLE "Task";
