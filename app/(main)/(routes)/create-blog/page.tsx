'use client'
import CoverImage from '@/components/cover-image'
import Toolbar from '@/components/toolbar'
import { GetBlogData } from '@/lib/actions/getBlogData'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BlogInterface } from '@/lib/types'
import { Skeleton } from '@/components/ui/skeleton'
import Editor from '@/components/editor'
import { useSavingStatus } from '@/hooks/use-saving-status'
import { SaveIcon } from 'lucide-react'

const CreateBlog = () => {
  const [blogData, setBlogData] = useState<BlogInterface | null>(null)
  const {isSaving} = useSavingStatus()
  const params  = useSearchParams()
  const docId = params.get("id") || undefined

  useEffect(()=>{
    const fetchData = async () =>{
      const res = await GetBlogData(docId)
      setBlogData(res)
    } ;
    fetchData();
  })
  const onChange = (content: string) => {
    
    console.log("on change logs:\n",content)
  };

  if (!blogData)
    return (
      <div>
        <CoverImage.Skeleton />
        <div className="flex flex-col gap-y-2 items-center mt-10">
          <Skeleton className="h-14 w-[50%]" />
          <Skeleton className="h-4 w-[80%]" />
          <Skeleton className="h-4 w-[40%]" />
          <Skeleton className="h-4 w-[60%]" />
        </div>
      </div>
    );


  return (
    <div className='pb-40 relative'>
      <div className='fixed right-0 mr-6 mt-6 bg-slate-800 px-3 text-md'>{isSaving ? "saving...":(
        <>
          <SaveIcon className='h-4 w-4'/>
        </>
      )}</div>
      <CoverImage url={blogData?.coverImage || undefined} id={docId}/>
      <div className='md:max-w-3xl lg:max-w-4xl mx-auto'>
        <Toolbar url={blogData?.coverImage || undefined} />
        <Editor 
          initialContent={blogData?.content ?? undefined}
          onChange={onChange}
          editable={true}
          id={docId}
        />
      </div>
    </div>
  )
}

export default CreateBlog