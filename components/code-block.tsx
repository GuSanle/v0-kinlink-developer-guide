"use client"

import { useState, useRef } from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
}

export function CodeBlock({ code, language = "javascript", filename, showLineNumbers = false }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const codeRef = useRef<HTMLPreElement>(null)

  const copyToClipboard = async () => {
    if (!navigator.clipboard || !code) return

    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy code: ", err)
    }
  }

  return (
    <div className="relative my-6 overflow-hidden rounded-lg border bg-muted">
      {filename && (
        <div className="flex items-center justify-between border-b bg-muted px-4 py-2 text-sm text-muted-foreground">
          <span>{filename}</span>
        </div>
      )}
      <div className="relative">
        <pre
          ref={codeRef}
          className={cn("overflow-x-auto p-4 text-sm", showLineNumbers && "line-numbers", `language-${language}`)}
        >
          <code className={`language-${language}`}>{code}</code>
        </pre>
        <button
          onClick={copyToClipboard}
          className="absolute right-3 top-3 rounded-md border bg-background p-2 text-muted-foreground hover:bg-muted-foreground/10"
          aria-label="Copy code"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
    </div>
  )
}
