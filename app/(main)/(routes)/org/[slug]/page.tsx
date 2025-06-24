import React from 'react'
import { createClerkClient, currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Dock } from 'lucide-react';
import AllOrgBlogs from '../../../components/allOrgBlogs';
import CreateBlogDialog from '@/components/create-blog-dialog';

interface OrgPageProps {
    params: {
        slug: string;
    }
}


const OrgBlogPage = async ({ params }: OrgPageProps) => {

    const { slug } =  await params;
    const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
    const org = await clerkClient.organizations.getOrganization({ slug });
    const user = await currentUser();
    const userId = user?.id || "";
    const adminId = org.createdBy;

    const queryParams = new URLSearchParams();
    queryParams.append("orgId",org.id);
    queryParams.append("userId", userId || " ");
    const href = `/create-blog?${queryParams.toString()}`

    return (
        <main className='px-24 py-16 w-full min-h-screen bg-slate-100 dark:bg-neutral-950'>
            <h1 className='text-2xl mb-2'>{org.name}</h1>
            {userId == adminId ? (

                <div className='mb-10'>
                    <div className='flex items-center gap-x-2 mb-8'>
                        <div className='h-2 w-2 dark:bg-slate-50 bg-black  rounded-full'></div>
                        <div className='text-xl'>{user?.fullName}</div>
                        <div className='bg-green-100 border-green-400 dark:bg-green-950 text-xs rounded-full px-2 py-1 border-2 dark:border-green-500'>Admin</div>
                    </div>
                    <h1 className='text-3xl font-bold tracking-wide '>Start writing blogs</h1>
                    <CreateBlogDialog userId={userId} orgId={org.id}/>
                </div>
            ) :
                (
                    <div className='flex gap-x-2 mb-2'>
                        <h1 className='text-2xl'>{org.name}</h1>
                        <div className='bg-blue-200 border-blue-400 dark:bg-blue-950 text-sm rounded-full px-2 py-1 border-2 dark:border-blue-500-500'>Member</div>
                    </div>
                )}
            <AllOrgBlogs />

        </main>
    )
}

export default OrgBlogPage