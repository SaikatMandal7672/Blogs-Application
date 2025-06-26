'use client'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'
import CoverImageDialog from './cover-image-dialog'
import { Button } from '@/components/ui/button'
import { RemoveCoverImage } from '@/lib/actions/removeImagr'
import { useEdgeStore } from '@/lib/edgestore'
import { Skeleton } from './ui/skeleton'

interface CoverImageProps {
    id: string | undefined
    url?: string
}

const CoverImage = ({ id, url }: CoverImageProps) => {
    const { edgestore } = useEdgeStore()
    const removeImage = async () => {
        const res = await RemoveCoverImage(id)
        console.log(res)
        await edgestore.publicFiles.delete({
            url: url as string
        })
    }

    return (
        <div
            className={cn(
                "max-w-4xl rounded-lg mx-auto h-[45vh] relative group p-8",
                !url && "h-[10vh]",
                url && "bg-muted"
            )}
        >{
                !!url && (<>
                    <Image
                        src={url}
                        fill
                        alt="cover image"
                        className='object-cover'

                    />
                    <div className='absolute bottom-0 right-0 m-4 group-hover:opacity-100 opacity-0 flex gap-x-2'>
                        <CoverImageDialog isUpload={false} />
                        <Button
                            variant={'outline'}
                            onClick={removeImage}
                            className='text-muted-foreground text-xs h-7'
                        >
                            Remove Image
                        </Button>
                    </div>

                </>
                )
            }

        </div>
    )
}
CoverImage.Skeleton = function CoverSkeleton(){
  return (
    <Skeleton className="w-5xl h-[12vh]"/>
  )
}
export default CoverImage