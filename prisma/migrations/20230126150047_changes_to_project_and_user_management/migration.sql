/*
  Warnings:

  - The values [SuperAdmin,Manager,Developer,Client] on the enum `UserType` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `userType` to the `UserProjects` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MemberType" AS ENUM ('Admin', 'Developer', 'Designer', 'Support', 'Member', 'Client');

-- AlterEnum
BEGIN;
CREATE TYPE "UserType_new" AS ENUM ('Admin', 'Member');
ALTER TABLE "User" ALTER COLUMN "userType" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "userType" TYPE "UserType_new" USING ("userType"::text::"UserType_new");
ALTER TYPE "UserType" RENAME TO "UserType_old";
ALTER TYPE "UserType_new" RENAME TO "UserType";
DROP TYPE "UserType_old";
ALTER TABLE "User" ALTER COLUMN "userType" SET DEFAULT 'Member';
COMMIT;

-- AlterTable
ALTER TABLE "UserProjects" ADD COLUMN     "userType" "MemberType" NOT NULL;

-- CreateIndex
CREATE INDEX "User_id_idx" ON "User" USING HASH ("id");
