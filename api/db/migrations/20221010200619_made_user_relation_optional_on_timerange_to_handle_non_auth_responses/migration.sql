-- DropForeignKey
ALTER TABLE "TimeRange" DROP CONSTRAINT "TimeRange_userId_fkey";

-- AlterTable
ALTER TABLE "TimeRange" ADD COLUMN     "unAuthUserDisplay" TEXT,
ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "TimeRange" ADD CONSTRAINT "TimeRange_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
