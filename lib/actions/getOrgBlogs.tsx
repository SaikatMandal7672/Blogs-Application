'use server'

import prisma from "@/db/prisma"
import { BlogInterface } from "@/lib/types"

interface GetOrgBlogsOptions {
  includePublishedOnly?: boolean
  includeDraftsOnly?: boolean
  orderBy?: 'createdAt' | 'updatedAt' | 'title'
  orderDirection?: 'asc' | 'desc'
  page?: number
  pageSize?: number
}

interface PaginatedBlogsResult {
  blogs: BlogInterface[]
  totalCount: number
  totalPages: number
  currentPage: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export const GetOrgBlogsWithPagination = async (
  orgId: string,
  options: GetOrgBlogsOptions = {}
): Promise<PaginatedBlogsResult> => {
  try {
    const {
      includePublishedOnly = false,
      includeDraftsOnly = false,
      orderBy = 'updatedAt',
      orderDirection = 'desc',
      page = 1,
      pageSize = 10
    } = options;

    // Build the where clause
    const whereClause: any = {
      orgId: orgId
    };

    // Add publish status filters
    if (includePublishedOnly) {
      whereClause.isPublished = true;
    } else if (includeDraftsOnly) {
      whereClause.isDraft = true;
    }

    // Calculate pagination
    const skip = (page - 1) * pageSize;

    // Get total count and blogs in parallel
    const [totalCount, blogs] = await Promise.all([
      prisma.blogs.count({ where: whereClause }),
      prisma.blogs.findMany({
        where: whereClause,
        orderBy: {
          [orderBy]: orderDirection
        },
        skip: skip,
        take: pageSize
      })
    ]);

    const totalPages = Math.ceil(totalCount / pageSize);

    return {
      blogs: blogs as BlogInterface[],
      totalCount,
      totalPages,
      currentPage: page,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1
    };
  } catch (error) {
    console.error("Error fetching organization blogs:", error);
    throw new Error("Failed to fetch organization blogs");
  }
}

// Convenience function to get only published blogs for an organization
export const GetOrgPublishedBlogs = async (orgId: string): Promise<BlogInterface[]> => {
  const result = await GetOrgBlogsWithPagination(orgId, { includePublishedOnly: true, pageSize: 1000 });
  return result.blogs;
}

// Convenience function to get only draft blogs for an organization
export const GetOrgDraftBlogs = async (orgId: string): Promise<BlogInterface[]> => {
  const result = await GetOrgBlogsWithPagination(orgId, { includeDraftsOnly: true, pageSize: 1000 });
  return result.blogs;
}

// Function to get blog count for an organization
export const GetOrgBlogCount = async (orgId: string): Promise<{
  total: number;
  published: number;
  drafts: number;
}> => {
  try {
    const [total, published, drafts] = await Promise.all([
      prisma.blogs.count({
        where: { orgId: orgId }
      }),
      prisma.blogs.count({
        where: { orgId: orgId, isPublished: true }
      }),
      prisma.blogs.count({
        where: { orgId: orgId, isDraft: true }
      })
    ]);

    return { total, published, drafts };
  } catch (error) {
    console.error("Error fetching organization blog count:", error);
    throw new Error("Failed to fetch organization blog count");
  }
}
