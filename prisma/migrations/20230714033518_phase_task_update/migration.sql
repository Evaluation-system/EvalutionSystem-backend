/*
  Warnings:

  - You are about to drop the column `duration` on the `phaseTasks` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `phaseTasks` table. All the data in the column will be lost.
  - You are about to drop the column `task` on the `phaseTasks` table. All the data in the column will be lost.
  - Added the required column `countTask` to the `phaseTasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionTask` to the `phaseTasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTask` to the `phaseTasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleEmployee` to the `phaseTasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `starTask` to the `phaseTasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleTask` to the `phaseTasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "phaseTasks" DROP COLUMN "duration",
DROP COLUMN "price",
DROP COLUMN "task",
ADD COLUMN     "countTask" INTEGER NOT NULL,
ADD COLUMN     "descriptionTask" TEXT NOT NULL,
ADD COLUMN     "endTask" INTEGER NOT NULL,
ADD COLUMN     "roleEmployee" TEXT NOT NULL,
ADD COLUMN     "starTask" INTEGER NOT NULL,
ADD COLUMN     "titleTask" TEXT NOT NULL;
