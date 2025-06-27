import React from 'react'
import { createClerkClient, currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Dock } from 'lucide-react';
import AllOrgBlogs from '../../../_components/allOrgBlogs';
import CreateBlogDialog from '@/components/create-blog-dialog';
import { GetBlogData } from '@/lib/actions/getBlogData';

interface OrgPageProps {
    params: {
        slug: string;
    }
}


const OrgBlogPage = async ({ params }: OrgPageProps) => {

    const { slug } = await params;
    const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
    const org = await clerkClient.organizations.getOrganization({ slug });
    const user = await currentUser();
    const userId = user?.id || "";
    const author = user?.fullName || "none";
    const adminId = org.createdBy;
    const queryParams = new URLSearchParams();
    queryParams.append("orgId", org.id);
    queryParams.append("userId", userId || " ");
    const href = `/create-blog?${queryParams.toString()}`



    return (
        <main className='px-24 py-16 w-full min-h-screen bg-slate-100 dark:bg-neutral-950'>
            {/* Organization Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                    <h1 className='text-3xl font-bold text-foreground'>{org.name}</h1>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border-2 ${
                        userId == adminId
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950 dark:border-emerald-800 dark:text-emerald-300'
                            : 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-300'
                    }`}>
                        {userId == adminId ? 'Admin' : 'Member'}
                    </div>
                </div>

                {/* User Info */}
                <div className='flex items-center gap-3 text-muted-foreground'>
                    <div className='h-2 w-2 bg-current rounded-full opacity-60'></div>
                    <span className='text-lg font-medium'>{user?.fullName}</span>
                </div>
            </div>

            {/* Admin Section */}
            {userId == adminId ? (
                <div className='mb-12'>
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl p-8 border border-blue-100 dark:border-blue-900/30">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
                                <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </div>
                            <div>
                                <h2 className='text-2xl font-bold text-foreground'>Start Writing</h2>
                                <p className='text-muted-foreground'>Create and share your thoughts with the world</p>
                            </div>
                        </div>
                        <div className="mt-6">
                            <CreateBlogDialog userId={userId} orgId={org.id} author={author} />
                        </div>
                    </div>
                </div>
            ) : (
                <div className='mb-8'>
                    <div className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                                <svg className="h-4 w-4 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className='text-lg font-semibold text-foreground'>Organization Member</h3>
                                <p className='text-sm text-muted-foreground'>You can view and interact with organization content</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Organization Blogs Section */}
            <div className="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
                            <svg className="h-4 w-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-foreground">Organization Blogs</h2>
                    </div>
                </div>
                <div className="p-6">
                    <AllOrgBlogs />
                </div>
            </div>

        </main>
    )
}

export default OrgBlogPage