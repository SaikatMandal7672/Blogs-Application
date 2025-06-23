-- CreateTable
CREATE TABLE "Blogs" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "orgId" TEXT,

    CONSTRAINT "Blogs_pkey" PRIMARY KEY ("id")
);
