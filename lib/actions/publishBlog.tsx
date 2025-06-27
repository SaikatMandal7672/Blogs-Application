'use server'

import prisma from "@/db/prisma"

export const PublishBlog = async (id: string) => {
    try {
        const res = await prisma.blogs.update({
            where: {
                id: id,
            },
            data: {
                isPublished: true,
                isDraft: false,
                updatedAt: new Date(),
            }
        })
        return res;
    } catch (error) {
        console.error("Error publishing blog:", error);
        throw error;
    }
}

export const UnpublishBlog = async (id: string) => {
    try {
        const res = await prisma.blogs.update({
            where: {
                id: id,
            },
            data: {
                isPublished: false,
                isDraft: true,
                updatedAt: new Date(),
            }
        })
        return res;
    } catch (error) {
        console.error("Error unpublishing blog:", error);
        throw error;
    }
}
