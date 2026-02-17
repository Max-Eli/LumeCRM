"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface GradientTextProps {
  children: ReactNode
  className?: string
  from?: string
  via?: string
  to?: string
}

export function GradientText({ 
  children, 
  className,
  from = "from-violet-600",
  via = "via-purple-600",
  to = "to-indigo-600"
}: GradientTextProps) {
  return (
    <span 
      className={cn(
        "bg-gradient-to-r bg-clip-text text-transparent",
        from,
        via,
        to,
        className
      )}
    >
      {children}
    </span>
  )
}