'use client'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Dock } from 'lucide-react'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'

const CreateBlogDialog = ({ href }: { href?: string }) => {
    const [title, setTitle] = useState("");
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
                
                <form>

                    <Label >Title</Label>
                    <Input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className='mt-2 mb-4' placeholder='Title..' />

                    <div className="flex flex-center gap-x-2">
                        <Button type='reset' variant={'secondary'} className='hover:bg-gray-200 dark:hover:bg-gray-900'>Cancel</Button>
                        <Button type='submit' className='bg-green-500 text-white dark:bg-green-900 hover:bg-green-700 dark:hover:bg-green-800'>
                            Create
                        </Button>
                    </div>

                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateBlogDialog