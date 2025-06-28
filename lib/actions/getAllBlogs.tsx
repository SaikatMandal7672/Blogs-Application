'use server'

import prisma from "@/db/prisma"
import { BlogInterface } from "../types"



interface BlogsResponse {
  blogs: BlogInterface[]
  hasMore: boolean
  total: number
}

export async function fetchBlogs(page: number = 0, limit: number = 5): Promise<BlogsResponse> {
  try {
    const skip = page * limit
    
    // Fetch blogs with pagination
    const [blogs, total] = await Promise.all([
      prisma.blogs.findMany({
        where: {
          isPublished: true
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc' 
        }
      }),
      prisma.blogs.count() 
    ])

    const hasMore = skip + limit < total

    return {
      blogs,
      hasMore,
      total
    }
  } catch (error) {
    console.error('Error fetching blogs:', error)
    throw new Error('Failed to fetch blogs')
  }
}


