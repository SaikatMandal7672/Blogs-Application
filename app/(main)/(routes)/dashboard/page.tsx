'use client'
import React from 'react'
import { useUser } from '@clerk/nextjs'
const Dashboard = () => {
  const { user } = useUser();
  return (
    
    <div className='px-24'>Dashboard
      <pre>{JSON.stringify(user?.id, null, 2)}</pre>
    </div>
  )
}

export default Dashboard