'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { fetchBlogs } from '@/lib/actions/getAllBlogs'
import  BlogCard  from './blog-card'
import { BlogInterface } from '@/lib/types'

export function BlogList() {
  const [blogs, setBlogs] = useState<BlogInterface[]>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)
  const [error, setError] = useState<string | null>(null)
  
 
  const loadingTriggerRef = useRef<HTMLDivElement>(null)  // Ref for the loading trigger element
  
  
  const isFetchingRef = useRef(false)// Ref to track if we're currently fetching to prevent duplicate requests

  // Function to load more blogs
  const loadMoreBlogs = useCallback(async () => {
    if (isFetchingRef.current || !hasMore) return
    
    isFetchingRef.current = true
    setLoading(true)
    setError(null)

    try {
      const response = await fetchBlogs(page, 5)
      
      setBlogs(prevBlogs => [...prevBlogs, ...response.blogs])
      setHasMore(response.hasMore)
      setPage(prevPage => prevPage + 1)
    } catch (err) {
      setError('Failed to load more blogs. Please try again.')
      console.error('Error loading blogs:', err)
    } finally {
      setLoading(false)
      isFetchingRef.current = false
    }
  }, [page, hasMore])

  // Initial load
  useEffect(() => {
    loadMoreBlogs()
  }, []) 

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0]
        if (target.isIntersecting && hasMore && !loading) {
          loadMoreBlogs()
        }
      },
      {
        root: null, // Use viewport as root
        rootMargin: '100px', // Start loading 100px before reaching the element
        threshold: 0.1 // Trigger when 10% of the element is visible
      }
    )

    const currentTrigger = loadingTriggerRef.current
    if (currentTrigger) {
      observer.observe(currentTrigger)
    }

    return () => {
      if (currentTrigger) {
        observer.unobserve(currentTrigger)
      }
    }
  }, [hasMore, loading, loadMoreBlogs])

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Latest Blogs</h1>
      
      <div className="space-y-4">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} isOwner={false} />
        ))}
      </div>

  
      {hasMore && (
        <div 
          ref={loadingTriggerRef}
          className="flex justify-center items-center py-8"
        >
          {loading ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="text-gray-600">Loading more blogs...</span>
            </div>
          ) : (
            <div className="text-gray-500">Scroll to load more</div>
          )}
        </div>
      )}

      {!hasMore && blogs.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">You've reached the end of our blog posts!</p>
        </div>
      )}


      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 my-4">
          <p className="text-red-700">{error}</p>
          <button 
            onClick={loadMoreBlogs}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {blogs.length === 0 && !loading && !error && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No blogs found.</p>
        </div>
      )}
    </div>
  )
}