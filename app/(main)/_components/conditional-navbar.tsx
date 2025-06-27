'use client'

import { usePathname } from "next/navigation"
import Navbar from "./navbar"

export default function ConditionalNavbar() {
  const pathname = usePathname()
  
  // Hide navbar on create-blog page since it has its own custom navbar
  if (pathname.includes('/create-blog')) {
    return null
  }
  
  return <Navbar />
}
