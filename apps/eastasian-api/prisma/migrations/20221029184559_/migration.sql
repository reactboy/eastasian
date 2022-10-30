/*
  Warnings:

  - Added the required column `bodyJp` to the `Education` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Education` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organization` to the `Education` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleJp` to the `Education` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bodyJp` to the `Experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organization` to the `Experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleJp` to the `Experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bodyJp` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleJp` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bodyJp` to the `Work` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleJp` to the `Work` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Education" ADD COLUMN     "bodyJp" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "organization" TEXT NOT NULL,
ADD COLUMN     "titleJp" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "bodyJp" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "organization" TEXT NOT NULL,
ADD COLUMN     "titleJp" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "bodyJp" TEXT NOT NULL,
ADD COLUMN     "titleJp" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Work" ADD COLUMN     "bodyJp" TEXT NOT NULL,
ADD COLUMN     "titleJp" TEXT NOT NULL;
