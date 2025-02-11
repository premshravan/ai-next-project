/*
  Warnings:

  - You are about to drop the `industryInsight` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_industry_fkey";

-- DropTable
DROP TABLE "industryInsight";

-- CreateTable
CREATE TABLE "IndustryInsight" (
    "id" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "SalaryRanges" JSONB[],
    "growthRate" DOUBLE PRECISION NOT NULL,
    "demandLevel" "DemandLevel" NOT NULL,
    "topSkills" TEXT[],
    "marketOutlook" "MarketOutlook" NOT NULL,
    "keyTrends" TEXT[],
    "recommendedSkills" TEXT[],
    "lastupdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nextUpdate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IndustryInsight_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IndustryInsight_industry_key" ON "IndustryInsight"("industry");

-- CreateIndex
CREATE INDEX "IndustryInsight_industry_idx" ON "IndustryInsight"("industry");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_industry_fkey" FOREIGN KEY ("industry") REFERENCES "IndustryInsight"("industry") ON DELETE SET NULL ON UPDATE CASCADE;
