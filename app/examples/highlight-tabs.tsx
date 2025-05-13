"use client";

import { useState, useEffect } from "react";
import {
  Tabs as BaseTabs,
  TabsContent as BaseTabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import hljs from "highlight.js";

/**
 * 标签页组件，自动处理代码高亮
 * 在切换到代码标签时自动应用高亮
 */
export function HighlightTabs({
  defaultValue = "overview",
  children,
  className,
}: {
  defaultValue?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  useEffect(() => {
    // 当切换到代码标签时应用高亮
    if (activeTab === "code") {
      // 延迟确保DOM已更新
      const timer = setTimeout(() => {
        document.querySelectorAll("pre code").forEach((block) => {
          try {
            hljs.highlightElement(block as HTMLElement);
          } catch (error) {
            // 静默处理错误
          }
        });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  return (
    <BaseTabs
      defaultValue={defaultValue}
      onValueChange={setActiveTab}
      className={className}
    >
      {children}
    </BaseTabs>
  );
}

export { TabsList, TabsTrigger, BaseTabsContent as TabsContent };
