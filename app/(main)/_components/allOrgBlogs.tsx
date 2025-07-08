'use client'

import React, { useState, useEffect } from 'react'
import { useOrganization } from '@clerk/nextjs'
import { GetOrgBlogsWithPagination } from '@/lib/actions/getOrgBlogs'
import { BlogInterface } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Input } from '@/components/ui/input'
import { Edit, ChevronLeft, ChevronRight, Loader2, Search, X } from 'lucide-react'
import Link from 'next/link'
import BlogCard from './blog-card'

interface AllOrgBlogsProps {
  pageSize?: number
}

const AllOrgBlogs = ({ pageSize = 6 }: AllOrgBlogsProps) => {
  const { organization } = useOrganization()
  const [blogs, setBlogs] = useState<BlogInterface[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [hasPreviousPage, setHasPreviousPage] = useState(false)

  const [searchQuery, setSearchQuery] = useState<string>('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>('')

  const fetchBlogs = async (page: number) => {
    if (!organization?.id) return

    try {
      setLoading(true)
      const result = await GetOrgBlogsWithPagination(organization.id, {
        page,
        pageSize,
        orderBy: 'updatedAt',
        orderDirection: 'desc',
        searchQuery: debouncedSearchQuery || undefined
      })

      setBlogs(result.blogs)
      setTotalPages(result.totalPages)
      setTotalCount(result.totalCount)
      setCurrentPage(result.currentPage)
      setHasNextPage(result.hasNextPage)
      setHasPreviousPage(result.hasPreviousPage)
    } catch (error) {
      console.error('Error fetching blogs:', error)
    } finally {
      setLoading(false)
    }
  }

  // Debounced search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 500) 

    return () => clearTimeout(timer)
  }, [searchQuery])

  // Fetching the blogs on mount ei ther organization changes from null to something or when search content changes
  useEffect(() => {
    fetchBlogs(1) 
  }, [organization?.id, debouncedSearchQuery])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    fetchBlogs(page)
  }

  const handlePrevious = () => {
    if (hasPreviousPage) {
      handlePageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (hasNextPage) {
      handlePageChange(currentPage + 1)
    }
  }

  const clearSearch = () => {
    setSearchQuery('')
  }

  if (!organization) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Please select an organization to view blogs.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* this is the Header section*/}
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <div>
          <h2 className="text-2xl font-bold">Organization Blogs</h2>
          <p className="text-muted-foreground">
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className='h-4 w-4 animate-spin'/>
                {debouncedSearchQuery ? 'Searching...' : 'Loading...'}
              </span>
            ) : (
              <>
                {debouncedSearchQuery ? (
                  <span>
                    {totalCount} result{totalCount !== 1 ? 's' : ''} for "{debouncedSearchQuery}"
                  </span>
                ) : (
                  <span>
                    {totalCount} blog{totalCount !== 1 ? 's' : ''} found
                  </span>
                )}
              </>
            )}
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/*this if for skeleton loading */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: pageSize }).map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-8 w-20" />
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/*Rndering the  Blogs in Grid */}
      {!loading && blogs.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} isOwner={true} />
          ))}
        </div>
      )}

      {/* Empty State - No blogs or No search results */}
      {!loading && blogs.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
            {debouncedSearchQuery ? (
              <Search className="w-12 h-12 text-muted-foreground" /> 
            ) : (
              <Edit className="w-12 h-12 text-muted-foreground" />
            )}
          </div>

          {debouncedSearchQuery ? (
            <>
              <h3 className="text-lg font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground mb-4">
                No blogs found for "{debouncedSearchQuery}". Try a different search term.
              </p>
              <Button variant="outline" onClick={clearSearch}>
                Clear Search
              </Button>
            </>
          ) : (
            <>
              <h3 className="text-lg font-semibold mb-2">No blogs found</h3>
              <p className="text-muted-foreground mb-4">
                This organization hasn't created any blogs yet.
              </p>
              <Button asChild>
                <Link href="/create-blog">Create Your First Blog</Link>
              </Button>
            </>
          )}
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, totalCount)} of {totalCount} blogs
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              disabled={!hasPreviousPage}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>

            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNumber
                if (totalPages <= 5) {
                  pageNumber = i + 1
                } else if (currentPage <= 3) {
                  pageNumber = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + i
                } else {
                  pageNumber = currentPage - 2 + i
                }

                return (
                  <Button
                    key={pageNumber}
                    variant={currentPage === pageNumber ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(pageNumber)}
                    className="w-8 h-8 p-0"
                  >
                    {pageNumber}
                  </Button>
                )
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              disabled={!hasNextPage}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AllOrgBlogs