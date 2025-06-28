"use client";
import CoverImage from "@/components/cover-image";
import Toolbar from "@/components/toolbar";
import { GetBlogData } from "@/lib/actions/getBlogData";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BlogInterface } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import Editor from "@/components/editor";
import { toast } from "sonner";
import { PublishBlog } from "@/lib/actions/publishBlog";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ViewBlogProps {
    params: Promise<{
        blogId: string;
    }>
}


const ViewBlog = ({ params }: ViewBlogProps) => {
    const [blogData, setBlogData] = useState<BlogInterface | null>(null);
    const resolvedParams = React.use(params);
    const docId = resolvedParams.blogId;

    useEffect(() => {
        const fetchData = async () => {
            const res = await GetBlogData(docId);
            setBlogData(res);
        };
        fetchData();
    }, [docId]);
    const onChange = (content: string) => {
    };



    if (!blogData)
        return (
            <>

                <div>
                    <CoverImage.Skeleton />
                    <div className="flex flex-col gap-y-2 items-center mt-10">
                        <Skeleton className="h-14 w-[50%]" />
                        <Skeleton className="h-4 w-[80%]" />
                        <Skeleton className="h-4 w-[40%]" />
                        <Skeleton className="h-4 w-[60%]" />
                    </div>
                </div>
            </>
        );

    return (
        <>
            <div className="pb-40 relative ">
                <div className={cn("max-w-4xl rounded-lg mx-auto bg-accent relative group", !blogData?.coverImage && "h-[10vh] bg-inherit")}>
                    {blogData?.coverImage &&
                        <Image
                            src={blogData?.coverImage as string}
                            alt="cover image"
                            width={500}
                            height={300}
                            className="object-cover rounded-md mx-auto"
                        />}
                </div>
                <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-4">
                    <h1 className="text-center tracking-tighter text-5xl font-bold mb-2">{blogData?.title}</h1>
                    <Editor
                        initialContent={blogData?.content ?? undefined}
                        onChange={onChange}
                        editable={false}
                        id={docId}
                    />
                </div>
            </div>
        </>
    );
};

export default ViewBlog;
