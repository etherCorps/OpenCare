-- AlterEnum
ALTER TYPE "UserType" ADD VALUE 'Member';

-- CreateTable
CREATE TABLE "Projects" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectFields" (
    "id" TEXT NOT NULL,
    "fields" JSONB NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "ProjectFields_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sprints" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Sprints_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectFields_projectId_key" ON "ProjectFields"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "Sprints_projectId_key" ON "Sprints"("projectId");

-- AddForeignKey
ALTER TABLE "ProjectFields" ADD CONSTRAINT "ProjectFields_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sprints" ADD CONSTRAINT "Sprints_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
