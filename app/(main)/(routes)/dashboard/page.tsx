'use client'
import React from 'react'
import { useAuth, useUser } from '@clerk/nextjs'
const Dashboard = () => {
  const details = useAuth();
  return (
    
    <div className='px-24'>Dashboard
      <pre>{JSON.stringify(details.orgSlug, null, 2)}</pre>
    </div>
  )
}

export default Dashboard