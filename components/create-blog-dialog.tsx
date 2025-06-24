'use client'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Dock, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { CreateBlogAction } from '@/lib/actions/createBlog'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'


const CreateBlogDialog = ({ userId, orgId }: { userId: string, orgId?: string }) => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const [name, setName] = useState("");

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setIsLoading(true)
            const res = await CreateBlogAction({
                name: name,
                title: "untitled",
                userId,
                orgId,
                updatedAt: new Date(),
                createdAt: new Date(),
            });

            console.log("Response:", res); // Debug: Check what's in the response

            if (res && res.id) {
                const queryParams = new URLSearchParams();
                queryParams.append("id", res.id);
                router.push(`/create-blog?${queryParams.toString()}`);
                toast.success('Blog created successfully')
            } else {
                toast.error("No ID returned from CreateBlogAction");
            }

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <Dialog>
            <DialogTrigger>

                <div className='flex gap-x-3 text-foreground items-center max-w-xs p-4 rounded-lg bg-emerald-100/50 dark:bg-emerald-950/20 text-2xl border-2 border-emerald-600 dark:border-green-950 mt-4 hover:shadow-xl dark:hover:shadow-green-800/30'>
                    <Dock className=' h-14 w-14 text-green-800 dark:text-green-500 bg-green-300 dark:bg-green-950 p-3 rounded-lg' /> Create new blog
                </div>

            </DialogTrigger>

            <DialogContent>
                <DialogHeader className='flex'>
                    <DialogTitle>New Blog</DialogTitle>
                    <DialogDescription>Start writing a new blog </DialogDescription>
                </DialogHeader>

                <form onSubmit={onSubmit}>

                    <Label >Blog Name</Label>
                    <Input
                        value={name}
                        onChange={e =>
                            setName(e.target.value)
                        }
                        className='mt-2 mb-4' placeholder='name..' />

                    <div className="flex flex-center gap-x-2">
                        <Button type='reset' variant={'secondary'} className='hover:bg-gray-200 dark:hover:bg-gray-900'>Cancel</Button>

                        <Button

                            type="submit"
                            className="bg-green-500 text-white dark:bg-green-900 hover:bg-green-700 dark:hover:bg-green-800"
                        >
                            {isLoading ?
                                (
                                    <Loader2 className='h-4 w-8 animate-spin' />
                                ) :
                                ("Create")
                            }
                        </Button>


                    </div>

                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateBlogDialog