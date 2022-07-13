/*
  Warnings:

  - You are about to drop the column `dayId` on the `TimeRange` table. All the data in the column will be lost.
  - You are about to drop the `Day` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `eventId` to the `TimeRange` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `startTime` on the `TimeRange` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `endTime` on the `TimeRange` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Day" DROP CONSTRAINT "Day_eventId_fkey";

-- DropForeignKey
ALTER TABLE "TimeRange" DROP CONSTRAINT "TimeRange_dayId_fkey";

-- AlterTable
ALTER TABLE "TimeRange" DROP COLUMN "dayId",
ADD COLUMN     "eventId" INTEGER NOT NULL,
DROP COLUMN "startTime",
ADD COLUMN     "startTime" INTEGER NOT NULL,
DROP COLUMN "endTime",
ADD COLUMN     "endTime" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Day";

-- AddForeignKey
ALTER TABLE "TimeRange" ADD CONSTRAINT "TimeRange_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
