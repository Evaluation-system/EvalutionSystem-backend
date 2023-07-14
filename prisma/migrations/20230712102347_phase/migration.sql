-- CreateTable
CREATE TABLE "phase" (
    "id" SERIAL NOT NULL,
    "ProjectId" INTEGER,

    CONSTRAINT "phase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "phaseTasks" (
    "id" SERIAL NOT NULL,
    "task" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "phaseId" INTEGER,

    CONSTRAINT "phaseTasks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "phase" ADD CONSTRAINT "phase_ProjectId_fkey" FOREIGN KEY ("ProjectId") REFERENCES "UserProjects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "phaseTasks" ADD CONSTRAINT "phaseTasks_phaseId_fkey" FOREIGN KEY ("phaseId") REFERENCES "phase"("id") ON DELETE SET NULL ON UPDATE CASCADE;
