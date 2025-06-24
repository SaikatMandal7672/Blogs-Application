'use client'
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import React from 'react'
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from '@/components/ui/button'
import { ImageIcon } from 'lucide-react'
import { SingleImageDropzone } from '@/components/upload/single-image';
import {
    UploaderProvider,
    type UploadFn,
} from '@/components/upload/uploader-provider';
import { useEdgeStore } from '@/lib/edgestore';
import { useParams, useSearchParams } from 'next/navigation'
import { UploadCoverImage } from '@/lib/actions/uploadImage'

const CoverImageDialog = () => {
    const params = useSearchParams();
    const docId = params.get("id") as string;
    console.log("id= ", docId );
    const { edgestore } = useEdgeStore();
    const uploadFn: UploadFn = React.useCallback(
        async ({ file, onProgressChange, signal }) => {
            const res = await edgestore.publicFiles.upload({
                file,
                signal,
                onProgressChange,
            });
            // you can run some server action or api here
            // to add the necessary data to your database
            
            console.log(res.url);
            const url = res.url;
            await UploadCoverImage({ url, docId })
            return res;
        },
        [edgestore],
    );
    return (
        <Dialog>
            <DialogTrigger>
                <div
                    onClick={() => console.log("clicked on add image button")}
                    className="text-muted-foreground text-xs flex gap-x-1 border-muted-foreground border p-1 rounded-sm"
                >
                    <ImageIcon className="h-4 w-4" />
                    Add Cover

                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className='flex'>
                    <DialogTitle>Cover Image</DialogTitle>
                    <DialogDescription>Add a cover image for your blog</DialogDescription>
                </DialogHeader>
                <UploaderProvider uploadFn={uploadFn} autoUpload>
                    <SingleImageDropzone
                        height={200}
                        width={200}
                        dropzoneOptions={{
                            maxSize: 1024 * 1024 * 2, // 1 MB
                        }}
                    />
                </UploaderProvider>
            </DialogContent>
        </Dialog>
    )
}

export default CoverImageDialog