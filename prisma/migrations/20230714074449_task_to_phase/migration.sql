/*
  Warnings:

  - You are about to drop the column `Bugs` on the `phaseTasks` table. All the data in the column will be lost.
  - You are about to drop the column `PmAm` on the `phaseTasks` table. All the data in the column will be lost.
  - You are about to drop the column `QA` on the `phaseTasks` table. All the data in the column will be lost.
  - You are about to drop the column `Risks` on the `phaseTasks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "phase" ADD COLUMN     "bugs" INTEGER,
ADD COLUMN     "pmAm" INTEGER,
ADD COLUMN     "qa" INTEGER,
ADD COLUMN     "risks" INTEGER;

-- AlterTable
ALTER TABLE "phaseTasks" DROP COLUMN "Bugs",
DROP COLUMN "PmAm",
DROP COLUMN "QA",
DROP COLUMN "Risks";
