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
import { fromTheme } from "tailwind-merge"


const noto = Noto_Serif({ subsets: ["latin"] })

export default function Navbar() {
  const { theme } = useTheme();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-16">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="mr-6 flex items-center  space-x-2">
          <span className={`font-normal text-2xl ${noto.className}`}>Blog.dev</span>
        </Link>
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
