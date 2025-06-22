import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Noto_Serif_JP } from "next/font/google"
import Image from "next/image"
const noto = Noto_Serif_JP({ subsets: ["latin"] })

export default function Hero() {
  return (
    <div className="flex justify-between pl-24">
      <div className=" flex min-h-[calc(100vh-3.5rem)] max-w-screen-2xl flex-col  space-y-8 py-28">
        <div className="space-y-4 w-full">
          <h1 className={`${noto.className} dark:text-white  text-4xl font-bold tracking-tight text-black sm:text-5xl md:text-6xl `}>
            Write. Share. Inspire.
            <br />
            <span className="dark:text-neutral-300 text-neutral-700 text-3xl sm:text-4xl md:text-5xl ">With help of AI.</span>
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            The modern blogging platform that helps you create beautiful content, build your audience, and share your
            ideas with the world.
          </p>
        </div>
        <div className="flex gap-4">
          <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="md:text-md  inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-neutral-950 px-8 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              Start Writing Today
              <ArrowRight className="h-4 w-4 ml-4" />
            </span>
          </button>
        </div>
      </div>
      <Image src={"Hero-Bg-light.png"}
        height={100}
        width={375}
        alt="bg-image"
      />
    </div>
  )
}
