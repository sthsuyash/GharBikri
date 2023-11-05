/*
  Warnings:

  - You are about to drop the column `userProfileId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `UserProfile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `UserProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_userProfileId_fkey";

-- DropIndex
DROP INDEX "UserProfile_user_id_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "userProfileId";

-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "user_id";

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_id_key" ON "UserProfile"("id");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
