/*
  Warnings:

  - You are about to drop the `Time` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Time" DROP CONSTRAINT "Time_dayId_fkey";

-- DropForeignKey
ALTER TABLE "UserAvailability" DROP CONSTRAINT "UserAvailability_timeId_fkey";

-- DropTable
DROP TABLE "Time";

-- CreateTable
CREATE TABLE "TimeRange" (
    "id" SERIAL NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dayId" INTEGER NOT NULL,

    CONSTRAINT "TimeRange_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TimeRange" ADD CONSTRAINT "TimeRange_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "Day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAvailability" ADD CONSTRAINT "UserAvailability_timeId_fkey" FOREIGN KEY ("timeId") REFERENCES "TimeRange"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
