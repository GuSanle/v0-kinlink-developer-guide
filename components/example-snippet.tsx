"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CodeBlock } from "@/components/code-block"

interface ExampleSnippetProps {
  title: string
  description: string
  code: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
}

export function ExampleSnippet({
  title,
  description,
  code,
  language = "javascript",
  filename,
  showLineNumbers = false,
}: ExampleSnippetProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy code: ", err)
    }
  }

  return (
    <Card className="flex flex-col overflow-hidden border shadow-sm">
      <CardHeader className="flex flex-col space-y-1.5 p-6">
        <CardTitle className="line-clamp-1 text-xl">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-6 pt-0 text-sm">
        <CodeBlock code={code} language={language} filename={filename} showLineNumbers={showLineNumbers} />
      </CardContent>
      <CardFooter className="p-6 pt-0 mt-auto">
        <Button variant="outline" className="w-full" onClick={copyToClipboard}>
          {copied ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Copied
            </>
          ) : (
            <>
              <Copy className="mr-2 h-4 w-4" />
              Copy Snippet
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
