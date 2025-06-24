/*
  Warnings:

  - Made the column `isDraft` on table `Blogs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isPublished` on table `Blogs` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Blogs" ALTER COLUMN "isDraft" SET NOT NULL,
ALTER COLUMN "isPublished" SET NOT NULL;
