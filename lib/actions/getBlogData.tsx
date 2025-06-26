'use server'

import prisma from "@/db/prisma"

export const GetBlogData =  async (id:string|undefined)=>{
    const blogData = await prisma.blogs.findUnique({
        where:{
            id:id ,
        }
    })

    return blogData 
}