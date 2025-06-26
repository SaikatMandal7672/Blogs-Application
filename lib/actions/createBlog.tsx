'use server'
import prisma from "@/db/prisma"
import { BlogInterface } from "@/lib/types"

interface CreateBlogProps {

    author: string,
    name: string,
    title: string,
    userId: string,
    orgId: string,
    updatedAt: Date,
    createdAt: Date,

}

export const CreateBlogAction = async (data: CreateBlogProps) => {
    const res = await prisma.blogs.create({
        data: data
    })
    console.log("\ncreated blog:-\n", res)
    return res;
}