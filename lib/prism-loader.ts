"use client"

import { useEffect } from "react"

// Import Prism core
import Prism from "prismjs"

// Import languages
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-tsx"
import "prismjs/components/prism-css"
import "prismjs/components/prism-json"
import "prismjs/components/prism-markup"
import "prismjs/components/prism-bash"

// Import plugins
import "prismjs/plugins/line-numbers/prism-line-numbers"
import "prismjs/plugins/line-highlight/prism-line-highlight"
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard"

export function usePrism() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      Prism.highlightAll()
    }
  }, [])
}
