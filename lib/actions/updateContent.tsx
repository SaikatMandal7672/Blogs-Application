'use server'

import prisma from "@/db/prisma"

export const UpdateContent = async(content:string,id:string)=>{
    const res = await prisma.blogs.update({
        where:{
            id:id
        },
        data:{
            content:content,
            updatedAt: new Date()
        }
    })

    console.log(res)
    return res;
}

