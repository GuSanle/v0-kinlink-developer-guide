"use client";

import { useState, useMemo, useEffect } from "react";
import { Check, Copy } from "lucide-react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({
  code,
  language = "javascript",
  filename,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  // 禁用 highlight.js 的自动检测，防止客户端重复处理
  useEffect(() => {
    hljs.configure({ ignoreUnescapedHTML: true });
  }, []);

  // 在渲染时进行语法高亮，确保服务端和客户端一致
  const highlightedCode = useMemo(() => {
    try {
      if (language && hljs.getLanguage(language)) {
        return hljs.highlight(code, { language }).value;
      }
      return hljs.highlightAuto(code).value;
    } catch (e) {
      console.warn("语法高亮失败:", e);
      return code;
    }
  }, [code, language]);

  function handleCopy() {
    if (!navigator.clipboard || !code) return;
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("复制代码失败: ", err);
      });
  }

  return (
    <div className="not-prose relative my-6 rounded-lg overflow-hidden border border-neutral-800 bg-[#0d1117] shadow-md">
      {filename && (
        <div className="px-4 py-2 text-sm font-medium text-neutral-300 border-b border-neutral-800 bg-[#0d1117]">
          {filename}
        </div>
      )}
      <button
        onClick={handleCopy}
        className="absolute z-10 right-3 top-3 rounded-md bg-neutral-800 p-1.5 text-neutral-300 hover:bg-neutral-700 transition-colors"
        aria-label={copied ? "已复制" : "复制代码"}
        title={copied ? "已复制！" : "复制代码"}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
      <pre className="overflow-x-auto p-4 text-sm font-mono bg-[#0d1117] text-neutral-300 m-0 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent">
        <code
          className={`hljs ${language ? `language-${language}` : ""}`}
          data-highlighted="yes"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </pre>
    </div>
  );
}
