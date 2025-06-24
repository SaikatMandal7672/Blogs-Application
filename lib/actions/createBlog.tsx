'use server'
import prisma from "@/db/prisma"
import { BlogInterface } from "@/lib/types"

export const CreateBlogAction = async (data:BlogInterface) => {
    const res  = await prisma.blogs.create({
        data : data
    })
    // console.log("\ncreated blog:-\n",res)
    return res;
}