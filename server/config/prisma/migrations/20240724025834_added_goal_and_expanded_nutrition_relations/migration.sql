/*
  Warnings:

  - You are about to drop the column `juiceId` on the `Nutrition` table. All the data in the column will be lost.
  - Added the required column `date` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Nutrition" DROP CONSTRAINT "Nutrition_juiceId_fkey";

-- DropIndex
DROP INDEX "Nutrition_juiceId_key";

-- AlterTable
ALTER TABLE "Nutrition" DROP COLUMN "juiceId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Nutrition_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "age" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "height" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "weight" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Goal" (
    "id" SERIAL NOT NULL,
    "profileId" INTEGER NOT NULL,
    "target" INTEGER NOT NULL,
    "desc" TEXT,
    "targetNutritionId" INTEGER NOT NULL,

    CONSTRAINT "Goal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JuiceNutrition" (
    "juiceId" INTEGER NOT NULL,
    "nutritionId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "ProfileNutrition" (
    "date" TIMESTAMP(3) NOT NULL,
    "nutritionId" INTEGER NOT NULL,
    "profileId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Goal_profileId_key" ON "Goal"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Goal_targetNutritionId_key" ON "Goal"("targetNutritionId");

-- CreateIndex
CREATE UNIQUE INDEX "JuiceNutrition_juiceId_key" ON "JuiceNutrition"("juiceId");

-- CreateIndex
CREATE UNIQUE INDEX "JuiceNutrition_nutritionId_key" ON "JuiceNutrition"("nutritionId");

-- CreateIndex
CREATE UNIQUE INDEX "ProfileNutrition_nutritionId_key" ON "ProfileNutrition"("nutritionId");

-- CreateIndex
CREATE UNIQUE INDEX "ProfileNutrition_profileId_key" ON "ProfileNutrition"("profileId");

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_targetNutritionId_fkey" FOREIGN KEY ("targetNutritionId") REFERENCES "Nutrition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JuiceNutrition" ADD CONSTRAINT "JuiceNutrition_juiceId_fkey" FOREIGN KEY ("juiceId") REFERENCES "Juice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JuiceNutrition" ADD CONSTRAINT "JuiceNutrition_nutritionId_fkey" FOREIGN KEY ("nutritionId") REFERENCES "Nutrition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileNutrition" ADD CONSTRAINT "ProfileNutrition_nutritionId_fkey" FOREIGN KEY ("nutritionId") REFERENCES "Nutrition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileNutrition" ADD CONSTRAINT "ProfileNutrition_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
