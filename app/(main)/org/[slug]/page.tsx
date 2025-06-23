import React from 'react'
import { createClerkClient, currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Dock } from 'lucide-react';
import AllOrgBlogs from '../../components/allOrgBlogs';

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
    const userId = user?.id;
    const adminId = org.createdBy;

    const queryParams = new URLSearchParams();
    queryParams.append("orgId",org.id);
    queryParams.append("userId", userId ?? '');
    console.log(queryParams.toString());
    const href = `/create-blog?${queryParams.toString()}`

    return (
        <main className='px-24 py-16 w-full min-h-screen'>

            {userId == adminId ? (

                <div className='mb-10'>
                    <div className='flex gap-x-2 mb-2'>
                        <h1 className='text-2xl'>{org.name}</h1>
                        <div className='bg-green-100 border-green-400 dark:bg-green-950 text-sm rounded-full px-2 py-1 border-2 dark:border-green-500'>Admin</div>
                    </div>
                    <h1 className='text-3xl font-bold tracking-wide '>Start writing blogs</h1>
                    <Link href={href} className='flex gap-x-3 text-foreground items-center max-w-xs p-4 rounded-lg bg-emerald-100/50 dark:bg-emerald-950/20 text-2xl border-2 border-emerald-600 dark:border-green-950 mt-4'>
                        <Dock className=' h-14 w-14 text-green-800 dark:text-green-500 bg-green-300 dark:bg-green-950 p-3 rounded-lg' /> Create new blog
                    </Link>
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