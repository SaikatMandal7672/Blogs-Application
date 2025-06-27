import React from 'react'
import { BlogInterface } from '@/lib/types'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CalendarDays, User, Eye, Edit, ImageIcon } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'
import Image from 'next/image'

interface BlogCardProps {
  blog: BlogInterface
}

const BlogCard = ({ blog }: BlogCardProps) => {
  

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg line-clamp-2">
            {blog.title || 'Untitled'}
          </CardTitle>
          <Badge variant={blog.isPublished ? 'default' : 'secondary'}>
            {blog.isPublished ? 'Published' : 'Draft'}
          </Badge>
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
      
      <CardContent className="flex-1">
        {blog.coverImage  ? (
          <Image
            src={blog.coverImage}
            alt="cover image"
            width={500}
            height={300}
            className="object-cover rounded-md"
          />
        ) :  (          
          <ImageIcon className="h-12 w-12 text-muted-foreground" />
        )}
        
      </CardContent>
      
      <CardFooter className="flex gap-2">
        <Button asChild variant="outline" size="sm" className="flex-1">
          <Link href={`/create-blog?id=${blog.id}`}>
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Link>
        </Button>
        {blog.isPublished && (
          <Button asChild variant="default" size="sm" className="flex-1">
            <Link href={`/blog/${blog.id}`}>
              <Eye className="h-4 w-4 mr-1" />
              View
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default BlogCard
