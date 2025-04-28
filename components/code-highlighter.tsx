"use client"

import type React from "react"

export function CodeHighlighter({ children }: { children: React.ReactNode }) {
  // This component now just passes through children
  // All highlighting is handled by ClientCodeHighlighter
  return <>{children}</>
}
