export interface BlogInterface {
    id: string | null;
    author: string;
    name: string;
    title: string | null;
    content: string | null;
    coverImage: string | null;
    userId: string;
    orgId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    isDraft: boolean;
    isPublished: boolean;

}