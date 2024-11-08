/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Workout` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "customMuscle" TEXT;

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "createdAt";
