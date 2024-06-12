/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'other');

-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('juice', 'container', 'other');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "gender" "Gender",
    "bio" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Juice" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "ingredients" TEXT[],
    "productUrl" TEXT,
    "pictureUrl" TEXT,
    "price" INTEGER NOT NULL,
    "size" INTEGER NOT NULL,

    CONSTRAINT "Juice_pkey" PRIMARY KEY ("id"),
    CONSTRAINT price_non_negative CHECK (price >= 0)
);

-- CreateTable
CREATE TABLE "Nutrition" (
    "juiceId" INTEGER NOT NULL,
    "energy" DECIMAL(4,1) NOT NULL,
    "fat" DECIMAL(3,1) NOT NULL,
    "carbs" DECIMAL(3,1) NOT NULL,
    "protein" DECIMAL(3,1) NOT NULL,
    "fibre" DECIMAL(3,1) NOT NULL,
    "sugar" DECIMAL(3,1) NOT NULL,
    "sodium" DECIMAL(3,1) NOT NULL
);

-- CreateTable
CREATE TABLE "Container" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "productUrl" TEXT,
    "pictureUrl" TEXT,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Container_pkey" PRIMARY KEY ("id"),
    CONSTRAINT price_non_negative CHECK (price >= 0)
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "subtotal" INTEGER NOT NULL,
    "discount" INTEGER,
    "tax" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id"),
    CONSTRAINT subtotal_non_negative CHECK (subtotal >= 0),
    CONSTRAINT discount_non_negative CHECK (discount >= 0),
    CONSTRAINT tax_non_negative CHECK (tax >= 0),
    CONSTRAINT total_non_negative CHECK (total >= 0)
);

-- CreateTable
CREATE TABLE "OrderedProduct" (
    "id" SERIAL NOT NULL,
    "qty" INTEGER NOT NULL,
    "type" "ProductType" NOT NULL,
    "juiceId" INTEGER,
    "containerId" INTEGER,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "OrderedProduct_pkey" PRIMARY KEY ("id"),
    CONSTRAINT qty_positive CHECK (qty > 0)
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Nutrition_juiceId_key" ON "Nutrition"("juiceId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nutrition" ADD CONSTRAINT "Nutrition_juiceId_fkey" FOREIGN KEY ("juiceId") REFERENCES "Juice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderedProduct" ADD CONSTRAINT "OrderedProduct_juiceId_fkey" FOREIGN KEY ("juiceId") REFERENCES "Juice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderedProduct" ADD CONSTRAINT "OrderedProduct_containerId_fkey" FOREIGN KEY ("containerId") REFERENCES "Container"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderedProduct" ADD CONSTRAINT "OrderedProduct_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
