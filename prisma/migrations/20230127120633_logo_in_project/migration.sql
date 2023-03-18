/*
  Warnings:

  - Added the required column `logo` to the `Projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Projects" ADD COLUMN     "logo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserProjects" ALTER COLUMN "userType" SET DEFAULT 'Member';
