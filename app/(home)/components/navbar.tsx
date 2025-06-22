import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, LucideLinkedin } from "lucide-react"
import { Noto_Serif } from "next/font/google"
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import { ModeToggle } from "@/components/mode-toggle"

const noto = Noto_Serif({ subsets: ["latin"] })
export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-16">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="mr-6 flex items-center  space-x-2">
          <span className={`font-normal text-2xl ${noto.className}`}>Blog.dev</span>
        </Link>
        <div className="flex items-center ">
          <ModeToggle/>
          <Link href="https://www.linkedin.com/in/saikat-mandal-b9b2a3230/" target="_blank" rel="noreferrer">
            <Button variant="ghost" size="icon">
              <LucideLinkedin className="h-4 w-4" />
              <span className="sr-only">Linkedin</span>
            </Button>
          </Link>
          <Link href="https://github.com/SaikatMandal7672" target="_blank" rel="noreferrer" className="mr-4">
            <Button variant="ghost" size="icon">
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link>
          <SignedOut>
            <div className="space-x-2">
              <SignInButton >
                <Button className="h-8 border-2 border-neutral-200" variant={"outline"}>Sign In</Button>
              </SignInButton>
              <SignUpButton >
                <Button className="h-8">Sign Up</Button>
              </SignUpButton>
            </div>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard"> <Button className="h-8 mr-2">Enter</Button>  </Link>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  )
}
