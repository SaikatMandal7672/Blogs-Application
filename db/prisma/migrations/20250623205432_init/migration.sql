/*
  Warnings:

  - Added the required column `createdAt` to the `Blogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `Blogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blogs" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;
