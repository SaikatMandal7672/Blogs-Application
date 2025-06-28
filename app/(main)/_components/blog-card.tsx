import React from 'react'
import { BlogInterface } from '@/lib/types'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CalendarDays, User, Eye, Edit, ImageIcon, CheckCircle, Clock } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { extractTextString } from '@/lib/extractText'

interface BlogCardProps {
  blog: BlogInterface
  isOwner: boolean
}

const BlogCard = ({ blog, isOwner = true }: BlogCardProps) => {


  return (
    <Card className="h-full flex items-center justify-between  hover:shadow-lg transition-shadow">
      <div>

        <CardHeader>
          <div className="flex items-start  gap-3">
            <CardTitle className="text-lg md:text-xl line-clamp-2 flex-1">
              {blog.title || 'Untitled'}
            </CardTitle>
            {isOwner &&
              <Badge
                variant={blog.isPublished ? 'default' : 'secondary'}
                className={cn(
                  "flex items-center gap-1 text-xs font-medium shrink-0",
                  blog.isPublished
                    ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                    : "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800"
                )}
              >
                {blog.isPublished ? (
                  <>
                    Published
                  </>
                ) : (
                  <>
                   
                    Draft
                  </>
                )}
              </Badge>}
          </div>
          <CardDescription className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            {blog.author}
            {blog.updatedAt && (
              <>
                <span>•</span>
                <CalendarDays className="h-4 w-4" />
                {format(new Date(blog.updatedAt), 'dd MMM, yyyy')}
              </>
            )}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 flex justify-between">
          <div className="line-clamp-3 text-sm md:text-base text-muted-foreground">
            {extractTextString(JSON.parse(blog.content as string))}
          </div>

        </CardContent>

        <CardFooter className="flex gap-2">
          {isOwner && (
            <Button asChild variant="outline" size="sm" className="flex-1">
              <Link href={`/create-blog?id=${blog.id}`}>
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Link>
            </Button>)}

          <Button asChild variant="default" size="sm" className={cn(
            isOwner ? 'flex-1' : 'flex-2'
          )}>
            <Link href={`/blog/${blog.id}`}>
              <Eye className="h-4 w-4 mr-1" />
              View
            </Link>
          </Button>

        </CardFooter>
      </div >

      {blog.coverImage ? (
        <div className='flex-1 flex justify-center p-2'>
          <Image
            src={blog.coverImage}
            alt="cover image"
            width={220}
            height={100}
            className="object-cover rounded-md "
          />
        </div>
      ) : (

        <div className='flex-1 items-center justify-center flex '>
          <ImageIcon className="h-24 w-24 text-muted-foreground " />
        </div>
      )}

    </Card>
  )
}

export default BlogCard
