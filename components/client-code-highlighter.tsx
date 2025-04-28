"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

export function ClientCodeHighlighter() {
  const pathname = usePathname()
  const scriptLoadedRef = useRef(false)
  const observerRef = useRef<MutationObserver | null>(null)
  const highlightTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Load syntax highlighting scripts
  useEffect(() => {
    if (typeof window !== "undefined" && !scriptLoadedRef.current) {
      // Create a script element for Prism
      const script = document.createElement("script")
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-core.min.js"
      script.async = true
      script.onload = () => {
        // Load essential components after core is loaded
        const components = [
          "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js",
          "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/line-numbers/prism-line-numbers.min.js",
        ]

        components.forEach((src) => {
          const componentScript = document.createElement("script")
          componentScript.src = src
          componentScript.async = true
          document.body.appendChild(componentScript)
        })

        // Mark as loaded
        scriptLoadedRef.current = true

        // Initial highlight
        setTimeout(() => {
          if (window.Prism) {
            window.Prism.highlightAll()
          }
        }, 500)
      }

      // Add CSS
      const styles = [
        "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css",
        "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/line-numbers/prism-line-numbers.min.css",
      ]

      styles.forEach((href) => {
        const link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = href
        document.head.appendChild(link)
      })

      // Add the script to the document
      document.body.appendChild(script)
    }
  }, [])

  // Handle route changes and DOM mutations
  useEffect(() => {
    // Function to highlight code blocks
    const highlightCodeBlocks = () => {
      if (highlightTimeoutRef.current) {
        clearTimeout(highlightTimeoutRef.current)
      }

      highlightTimeoutRef.current = setTimeout(() => {
        if (window.Prism) {
          try {
            window.Prism.highlightAll()
          } catch (error) {
            console.error("Error highlighting code:", error)
          }
        }
      }, 100)
    }

    // Highlight on route change
    highlightCodeBlocks()

    // Set up mutation observer
    if (typeof window !== "undefined" && !observerRef.current) {
      observerRef.current = new MutationObserver((mutations) => {
        const hasCodeBlocks = mutations.some((mutation) =>
          Array.from(mutation.addedNodes).some((node) => {
            if (node instanceof HTMLElement) {
              return (
                node.querySelector("pre") ||
                node.querySelector("code") ||
                node.tagName === "PRE" ||
                node.tagName === "CODE"
              )
            }
            return false
          }),
        )

        if (hasCodeBlocks) {
          highlightCodeBlocks()
        }
      })

      // Start observing
      const mainContent = document.querySelector("main")
      if (mainContent) {
        observerRef.current.observe(mainContent, {
          childList: true,
          subtree: true,
        })
      }
    }

    return () => {
      // Clean up
      if (highlightTimeoutRef.current) {
        clearTimeout(highlightTimeoutRef.current)
      }
    }
  }, [pathname])

  // Clean up observer on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  return null
}

// Add TypeScript interface for the global Prism object
declare global {
  interface Window {
    Prism: any
  }
}
