'use server'
import prisma from "@/db/prisma"
interface CoverImageProps {
    url: string,
    docId: string
}

export const UploadCoverImage = async ({ url, docId }: CoverImageProps): Promise<CoverImageProps> => {
    await prisma.blogs.update({
        where: {
            id: docId as string,
        },
        data: {
            coverImage: url,
        }
    });
    return { url, docId };
}