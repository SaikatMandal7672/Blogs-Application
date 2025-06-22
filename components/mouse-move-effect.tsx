"use client"

import { useEffect, useState, useCallback } from "react"
import { useTheme } from "next-themes"
export default function MouseMoveEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const updatePosition = () => {
      setMousePosition({ x: event.clientX, y: event.clientY })
    }
    // Add a 100ms delay to the mouse movement
    setTimeout(updatePosition, 100)
  }, [])

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])
  const { theme } = useTheme()

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-1000 ease-linear"
      style={{
        background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px,${ theme=="dark" ? "rgba(29, 78, 216, 0.15)" : "rgba(48, 181, 44, 0.15)"}, transparent 80%)`,
      }}
    />
  )
}
