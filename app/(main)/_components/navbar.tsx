'use client'
import Link from "next/link"
import { Noto_Serif } from "next/font/google"
import {
  OrganizationSwitcher,
  SignedIn,
  UserButton
} from "@clerk/nextjs"
import { ModeToggle } from "@/components/mode-toggle"
import { useTheme } from "next-themes"
import { dark } from "@clerk/themes"
import { useSavingStatus } from "@/hooks/use-saving-status"
import { Loader, SaveIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavBarProps {
  isActive?: boolean
  onPublish?: () => void
}

const noto = Noto_Serif({ subsets: ["latin"] })

export default function Navbar({ isActive, onPublish }: NavBarProps) {
  const { theme } = useTheme();
  const { isSaving } = useSavingStatus();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-16">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="mr-6 flex items-center  space-x-2">
          <span className={`font-normal text-2xl ${noto.className}`}>Blog.dev</span>
        </Link>

        <div className="flex items-center ">
          {isActive && <>
            <Button variant={"secondary"}>Publish Blog</Button>
            <div className="flex gap-x-1 items-center justify-center bg-emerald-100 text-green-900 border border-emerald-600 px-3 py-2 text-sm rounded-lg lg:w-28 ">
              {isSaving ? (
                <>
                  <Loader className="h-4 w-4 animate-spin" />{" "}
                  <span className="hidden lg:block ">Saving...</span>
                </>
              ) : (
                <>
                  <SaveIcon className="h-4 w-4" />{" "}
                  <span className="hidden lg:block ">Saved</span>
                </>
              )}
            </div>
          </>}
          <ModeToggle />
          <SignedIn>
            {theme == "dark" &&
              <div className="border-2 px-2 py-1 rounded-lg mr-2">
                <OrganizationSwitcher
                  afterSelectOrganizationUrl={"/org/:slug"}
                  afterCreateOrganizationUrl={"/org/:slug"}
                  afterSelectPersonalUrl={"/dashboard"}
                  appearance={
                    { baseTheme: dark }
                  }
                />
              </div>}

            {theme == "light" &&
              <div className="border-2 px-2 py-1 rounded-lg mr-2">
                <OrganizationSwitcher
                  afterSelectOrganizationUrl={"/org/:slug"}
                  afterCreateOrganizationUrl={"/org/:slug"}
                  afterSelectPersonalUrl={"/dashboard"}
                />
              </div>}

            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  )

}
