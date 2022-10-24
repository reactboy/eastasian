/*
  Warnings:

  - You are about to drop the column `description` on the `Education` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Works` table. All the data in the column will be lost.
  - Added the required column `body` to the `Education` table without a default value. This is not possible if the table is not empty.
  - Added the required column `body` to the `Experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `body` to the `Projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `body` to the `Works` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Education" DROP COLUMN "description",
ADD COLUMN     "body" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "description",
ADD COLUMN     "body" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "description",
ADD COLUMN     "body" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Works" DROP COLUMN "description",
ADD COLUMN     "body" TEXT NOT NULL;
