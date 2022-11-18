/*
  Warnings:

  - You are about to drop the `Projects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Works` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `profileId` to the `Education` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `Experience` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Education" ADD COLUMN     "profileId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "profileId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Projects";

-- DropTable
DROP TABLE "Works";

-- CreateTable
CREATE TABLE "Work" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "Work_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_StackToWork" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ProjectToStack" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_StackToWork_AB_unique" ON "_StackToWork"("A", "B");

-- CreateIndex
CREATE INDEX "_StackToWork_B_index" ON "_StackToWork"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectToStack_AB_unique" ON "_ProjectToStack"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectToStack_B_index" ON "_ProjectToStack"("B");

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Work" ADD CONSTRAINT "Work_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StackToWork" ADD CONSTRAINT "_StackToWork_A_fkey" FOREIGN KEY ("A") REFERENCES "Stack"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StackToWork" ADD CONSTRAINT "_StackToWork_B_fkey" FOREIGN KEY ("B") REFERENCES "Work"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToStack" ADD CONSTRAINT "_ProjectToStack_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToStack" ADD CONSTRAINT "_ProjectToStack_B_fkey" FOREIGN KEY ("B") REFERENCES "Stack"("id") ON DELETE CASCADE ON UPDATE CASCADE;
