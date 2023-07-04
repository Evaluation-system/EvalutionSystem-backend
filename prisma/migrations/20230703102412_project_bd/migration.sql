-- CreateTable
CREATE TABLE "UserProjects" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "UserId" INTEGER,

    CONSTRAINT "UserProjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Procings" (
    "id" SERIAL NOT NULL,
    "ProjectId" INTEGER,
    "cost" TEXT NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "Procings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tasks" (
    "id" SERIAL NOT NULL,
    "ProjectId" INTEGER,
    "task" TEXT NOT NULL,
    "time" INTEGER NOT NULL,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeePayments" (
    "id" SERIAL NOT NULL,
    "ProjectId" INTEGER,
    "employee" TEXT NOT NULL,
    "salary" INTEGER NOT NULL,

    CONSTRAINT "EmployeePayments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserProjects" ADD CONSTRAINT "UserProjects_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Procings" ADD CONSTRAINT "Procings_ProjectId_fkey" FOREIGN KEY ("ProjectId") REFERENCES "UserProjects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_ProjectId_fkey" FOREIGN KEY ("ProjectId") REFERENCES "UserProjects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeePayments" ADD CONSTRAINT "EmployeePayments_ProjectId_fkey" FOREIGN KEY ("ProjectId") REFERENCES "UserProjects"("id") ON DELETE SET NULL ON UPDATE CASCADE;
