import Link from 'next/link';
import React from 'react'
interface HoverLinkProps {
  href: string;
  text: string
}

const HoverLink = ({href,text}:HoverLinkProps) => {
  return (
    <Link href={href} className="text-md ml-8 group">
      <div className="mb-0 group-hover:mb-[2px] transition-all duration-300">{text}</div>
      <div className="w-full h-[1px] bg-red-100"></div>
    </Link>
  )
}

export default HoverLink