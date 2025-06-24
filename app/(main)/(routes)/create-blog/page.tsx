'use client'
import Toolbar from '@/components/toolbar'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const CreateBlog = () => {
  const params  = useSearchParams()
  const userId = params.get("userId")
  const orgId = params.get("orgId")
  const name = params.get("name")
  
  return (
    <div className='pb-40'>CreateBlog
      <div className='h-[35vh]'></div>
      <div className='md:max-w-3xl lg:max-w-4xl mx-auto'>
        <Toolbar  />
      </div>
    </div>
  )
}

export default CreateBlog