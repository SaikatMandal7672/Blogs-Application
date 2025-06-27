"use client";
import CoverImage from "@/components/cover-image";
import Toolbar from "@/components/toolbar";
import { GetBlogData } from "@/lib/actions/getBlogData";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BlogInterface } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import Editor from "@/components/editor";
import CreateBlogNavbar from "./_components/create-blog-navbar";
import { toast } from "sonner";
import { PublishBlog } from "@/lib/actions/publishBlog";

const CreateBlog = () => {
  const [blogData, setBlogData] = useState<BlogInterface | null>(null);
  const params = useSearchParams();
  const docId = params.get("id") as string;

  useEffect(() => {
    const fetchData = async () => {
      const res = await GetBlogData(docId);
      setBlogData(res);
    };
    fetchData();
  }, [docId]);
  const onChange = (content: string) => {
  };

  const handlePublish = async () => {
    try {
      await PublishBlog(docId);
      toast.success("Blog published successfully!");

      const updatedData = await GetBlogData(docId);
      setBlogData(updatedData);
    } catch (error) {
      toast.error("Failed to publish blog");
      console.error("Publish error:", error);
    }
  };

  if (!blogData)
    return (
      <>
        <CreateBlogNavbar onPublish={handlePublish} isPublished={false} />
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
      <CreateBlogNavbar onPublish={handlePublish} isPublished={blogData?.isPublished || false} />
      <div className="pb-40 relative">
        <CoverImage url={blogData?.coverImage || undefined} id={docId} />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
          <Toolbar url={blogData?.coverImage || undefined} id={docId}
            title={blogData?.title as string}
          />
          <Editor
            initialContent={blogData?.content ?? undefined}
            onChange={onChange}
            editable={true}
            id={docId}
          />
        </div>
      </div>
    </>
  );
};

export default CreateBlog;
