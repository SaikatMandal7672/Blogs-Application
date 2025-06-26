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
import { useSearchParams } from 'next/navigation'
import { UploadCoverImage } from '@/lib/actions/uploadImage'

const CoverImageDialog = ({ isUpload ,imgUrl}: { isUpload: Boolean , imgUrl?:string}) => {
    const params = useSearchParams();
    const docId = params.get("id") as string;
    const { edgestore } = useEdgeStore();
    const uploadFn: UploadFn = React.useCallback(
        async ({ file, onProgressChange, signal }) => {

            const res = await edgestore.publicFiles.upload({
                file,
                signal,
                onProgressChange,
                options:{
                    replaceTargetUrl:imgUrl
                }
            });
            const url = res.url;
            await UploadCoverImage({ url, docId })
            return res;

        },
        [edgestore],
    );
    return (
        <Dialog>
            <DialogTrigger>
                {!imgUrl && <div
                    className="bg-slate-800 text-white text-xs flex gap-x-1 border-white border p-2 rounded-md "
                >
                    <ImageIcon className="h-4 w-4" />
                    {
                        isUpload ?
                            "Add Cover" : "Update Cover Image"
                    }

                </div>}
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