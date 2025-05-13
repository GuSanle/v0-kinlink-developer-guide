"use client";

import type React from "react";

export function CodeHighlighter({ children }: { children: React.ReactNode }) {
  // 这个组件只是简单透传子组件，不添加额外嵌套
  return children;
}
