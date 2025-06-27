'use server'

import prisma from "@/db/prisma"

export const UpdateBlogTitle = async (title: string | undefined, id: string | undefined) => {
    try {
        const res = await prisma.blogs.update({
            where: {
                id: id,
            },
            data: {
                title: title
            }
        })
        return res;
    } catch (error) {
        return error
    }
}