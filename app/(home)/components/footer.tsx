import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-neutral-600">
      <div className="px-28 flex flex-col gap-8 py-8 md:flex-row md:py-12 md:justify-between w-full">
        <div className="flex-1 space-y-4">
          <h2 className="font-bold">Bog.dev</h2>
          <p className="text-sm text-muted-foreground">Read , write and deepen your knowledge.</p>
        </div>
        <div className="">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Connect</h3>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/SaikatMandal7672"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://x.com/"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://linkedin.com/company/amanesoft"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container border-t border-neutral-500 py-6">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Saikat Mandal. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
