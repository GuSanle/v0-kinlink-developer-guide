import type React from "react";
import { DocsSidebar } from "@/components/docs-sidebar";
import { CodeHighlighter } from "@/components/code-highlighter";
import { ClientCodeHighlighter } from "@/components/client-code-highlighter";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
        <div className="h-full py-6 pr-2 lg:py-8">
          <DocsSidebar />
        </div>
      </aside>
      <main className="relative py-6 lg:gap-10 lg:py-8">
        <div className="prose dark:prose-invert mx-auto w-full min-w-0">
          <ClientCodeHighlighter />
          <CodeHighlighter>{children}</CodeHighlighter>
        </div>
      </main>
    </div>
  );
}
