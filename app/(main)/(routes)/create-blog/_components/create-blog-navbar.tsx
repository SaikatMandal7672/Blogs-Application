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
import { Loader, SaveIcon, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import HoverLink from "@/app/(main)/_components/hover-link"

interface CreateBlogNavbarProps {
  onPublish?: (isPublished: boolean) => void
  isPublished?: boolean
}

const noto = Noto_Serif({ subsets: ["latin"] })

export default function CreateBlogNavbar({ onPublish, isPublished = false }: CreateBlogNavbarProps) {
  const { theme } = useTheme();
  const { isSaving } = useSavingStatus();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-12">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className={`font-normal text-2xl ${noto.className}`}>Blog.dev</span>
          </Link>
          <HoverLink href="/feed" text="Feed"/>
        </div>
        <div className="flex items-center gap-x-3">
          <div className="flex gap-x-1 items-center justify-center bg-emerald-100 dark:bg-emerald-900/20 text-green-900 dark:text-green-400 border border-emerald-600 dark:border-emerald-500 px-3 py-2 text-sm rounded-lg lg:w-28">
            {isSaving ? (
              <>
                <Loader className="h-4 w-4 animate-spin" />
                <span className="hidden lg:block">Saving...</span>
              </>
            ) : (
              <>
                <SaveIcon className="h-4 w-4" />
                <span className="hidden lg:block">Saved</span>
              </>
            )}
          </div>
          {isPublished ? (
            <div
              role="button"
              onClick={() => onPublish && onPublish(false)}
              className="flex gap-x-1 items-center justify-center bg-blue-100 dark:bg-blue-900/20 text-blue-900 dark:text-blue-400 border border-blue-600 dark:border-blue-500 px-3 py-2 text-sm rounded-lg">
              <span className="hidden lg:block">Unpublish</span>
            </div>
          ) : (
            <Button
              variant="default"
              onClick={() => onPublish && onPublish(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Publish Blog
            </Button>
          )}

          <ModeToggle />

          <SignedIn>
            {theme === "dark" && (
              <div className="border-2 px-2 py-1 rounded-lg mr-2">
                <OrganizationSwitcher
                  afterSelectOrganizationUrl={"/org/:slug"}
                  afterCreateOrganizationUrl={"/org/:slug"}
                  afterSelectPersonalUrl={"/dashboard"}
                  appearance={{ baseTheme: dark }}
                />
              </div>
            )}

            {theme === "light" && (
              <div className="border-2 px-2 py-1 rounded-lg mr-2">
                <OrganizationSwitcher
                  afterSelectOrganizationUrl={"/org/:slug"}
                  afterCreateOrganizationUrl={"/org/:slug"}
                  afterSelectPersonalUrl={"/dashboard"}
                />
              </div>
            )}

            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  )
}
