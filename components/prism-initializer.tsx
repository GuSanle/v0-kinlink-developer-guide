"use client"

import { useEffect } from "react"
import Prism from "prismjs"

// Import Prism core styles
import "prismjs/themes/prism-tomorrow.css"

// Import Prism languages
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-tsx"
import "prismjs/components/prism-css"
import "prismjs/components/prism-json"
import "prismjs/components/prism-markup"
import "prismjs/components/prism-bash"
import "prismjs/components/prism-yaml"
import "prismjs/components/prism-markdown"
import "prismjs/components/prism-sql"

// Import Prism plugins
import "prismjs/plugins/line-numbers/prism-line-numbers"
import "prismjs/plugins/line-numbers/prism-line-numbers.css"
import "prismjs/plugins/line-highlight/prism-line-highlight"
import "prismjs/plugins/line-highlight/prism-line-highlight.css"

export function PrismInitializer() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      Prism.highlightAll()
    }
  }, [])

  return null
}
