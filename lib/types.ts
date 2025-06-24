export interface BlogInterface {
    id?: string;
    name: string;
    title:string;
    userId: string;
    orgId?: string;
    content?: string;
    coverImage?:string;
    updatedAt: Date;
    createdAt: Date;
}