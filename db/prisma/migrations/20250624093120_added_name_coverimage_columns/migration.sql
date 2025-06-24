/*
  Warnings:

  - Added the required column `name` to the `Blogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blogs" ADD COLUMN     "coverImage" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "content" DROP NOT NULL;
