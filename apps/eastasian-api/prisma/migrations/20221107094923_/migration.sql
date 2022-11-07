/*
  Warnings:

  - You are about to drop the column `iconImage` on the `Stack` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Stack" DROP COLUMN "iconImage",
ADD COLUMN     "stackImage" TEXT DEFAULT '';
