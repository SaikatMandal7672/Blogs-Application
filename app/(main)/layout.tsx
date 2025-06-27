
import "../globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import type { Metadata } from "next"
import { ClerkProvider } from "@clerk/nextjs"
import { ThemeProvider } from "@/components/theme-provider"
import ConditionalNavbar from "./_components/conditional-navbar"
import { EdgeStoreProvider } from "@/lib/edgestore"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Blog.dev - think , write and share",
    description: "A simple blog app to share  ideas and thoughts"
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <html lang="en" className="dark" suppressHydrationWarning>
            <body className={`${inter.className} antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <ClerkProvider>
                        <ConditionalNavbar />
                        <EdgeStoreProvider >
                            {children}
                            <Toaster richColors />
                        </EdgeStoreProvider>
                    </ClerkProvider>

                </ThemeProvider>
            </body>
        </html>
    )
}
