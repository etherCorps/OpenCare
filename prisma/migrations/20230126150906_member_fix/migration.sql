/*
  Warnings:

  - The values [Developer,Designer,Support] on the enum `MemberType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MemberType_new" AS ENUM ('Admin', 'Member', 'Client');
ALTER TABLE "UserProjects" ALTER COLUMN "userType" TYPE "MemberType_new" USING ("userType"::text::"MemberType_new");
ALTER TYPE "MemberType" RENAME TO "MemberType_old";
ALTER TYPE "MemberType_new" RENAME TO "MemberType";
DROP TYPE "MemberType_old";
COMMIT;
