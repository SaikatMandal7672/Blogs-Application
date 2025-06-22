import React from 'react'
import { createClerkClient } from '@clerk/nextjs/server';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Dock } from 'lucide-react';

interface OrgBlogPageProps {
    params: Record<string, string>;
}

const OrgBlogPage = async ({ params }: OrgBlogPageProps) => {
    const { slug } =await params;
    const clerkClient = createClerkClient({secretKey:process.env.CLERK_SECRET_KEY});
    const res = await clerkClient.organizations.getOrganization({slug})
    return (
        <main className='px-24 py-16'>
            <h1 className='text-3xl font-bold tracking-wide '>Start writing blogs</h1>
            <Link href="" className='flex gap-x-3 items-center max-w-xs p-4 rounded-lg bg-emerald-950/20 text-2xl border-2 border-green-950 mt-4'>
                <Dock className=' h-14 w-14 text-green-500 bg-green-950 p-3 rounded-lg'/> Create new blog
            </Link>
        </main>
    )
}

export default OrgBlogPage