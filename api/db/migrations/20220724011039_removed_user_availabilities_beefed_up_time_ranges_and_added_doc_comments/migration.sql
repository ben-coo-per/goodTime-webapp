/*
  Warnings:

  - You are about to drop the column `userId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the `UserAvailability` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ownerId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `TimeRange` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserAvailability" DROP CONSTRAINT "UserAvailability_timeId_fkey";

-- DropForeignKey
ALTER TABLE "UserAvailability" DROP CONSTRAINT "UserAvailability_userId_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "userId",
ADD COLUMN     "ownerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TimeRange" ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "UserAvailability";

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeRange" ADD CONSTRAINT "TimeRange_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
