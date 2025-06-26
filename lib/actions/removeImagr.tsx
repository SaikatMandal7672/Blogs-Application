'use server'

import prisma from "@/db/prisma"

export const RemoveCoverImage =  async(id: string | undefined) => {
    const res = await prisma.blogs.update({
        where: {
            id: id
        },
        data: {
            coverImage: null
        }
    });
    return res;
}