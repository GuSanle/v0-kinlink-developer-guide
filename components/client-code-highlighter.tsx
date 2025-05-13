"use client";

import { useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    hljs?: typeof hljs & { initLineNumbersOnLoad?: () => void };
  }
}

/**
 * 全局代码高亮处理组件
 * 自动处理页面中所有的代码块
 */
export function ClientCodeHighlighter() {
  const pathname = usePathname();

  useEffect(() => {
    // 初始加载和路径变化时进行高亮处理
    const applyHighlight = () => {
      try {
        const codeBlocks = document.querySelectorAll("pre code");
        if (codeBlocks.length > 0) {
          codeBlocks.forEach((block) => {
            try {
              hljs.highlightElement(block as HTMLElement);
            } catch (error) {
              // 静默处理错误
            }
          });
        }
      } catch (error) {
        // 静默处理错误
      }
    };

    // 初次加载与延迟加载以确保处理动态内容
    applyHighlight();
    const timer = setTimeout(applyHighlight, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}
