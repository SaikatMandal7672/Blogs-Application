'use client'
import Link from "next/link"
import { Noto_Serif } from "next/font/google"
import {
  OrganizationSwitcher,
  SignedIn,
  useAuth,
  UserButton
} from "@clerk/nextjs"
import { ModeToggle } from "@/components/mode-toggle"
import { useTheme } from "next-themes"
import { dark } from "@clerk/themes"
import { useSavingStatus } from "@/hooks/use-saving-status"
import { Loader, SaveIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import HoverLink from "./hover-link"

interface NavBarProps {
  isActive?: boolean
  onPublish?: () => void
}

const noto = Noto_Serif({ subsets: ["latin"] })

export default function Navbar() {
  const { theme } = useTheme();
  const {orgSlug} = useAuth();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-16">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <div className="flex">
          <Link href="/" className="mr-12 flex items-center  space-x-2">
            <span className={`font-normal text-2xl ${noto.className}`}>Blog.dev</span>
          </Link>
          <HoverLink href="/dashboard" text="Profile"/>
          <HoverLink href={`/org/${orgSlug}`} text="Organisation"/>

        </div>
        <div className="flex items-center ">

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
