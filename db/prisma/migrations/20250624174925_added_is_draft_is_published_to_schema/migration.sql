-- AlterTable
ALTER TABLE "Blogs" ADD COLUMN     "isDraft" BOOLEAN DEFAULT true,
ADD COLUMN     "isPublished" BOOLEAN DEFAULT false,
ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "title" SET DEFAULT 'Untitled',
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;
