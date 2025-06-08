import type React from "react";
import { ClientCodeHighlighter } from "@/components/client-code-highlighter";

export const metadata = {
  title: "Examples - kinlink Developer",
  description:
    "Browse our collection of examples to learn how to use kinlink effectively.",
};

export default function ExamplesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1">
      <div className="container py-6 lg:py-10">
        <div className="prose dark:prose-invert mx-auto w-full min-w-0">
          <ClientCodeHighlighter />
          {children}
        </div>
      </div>
    </div>
  );
}
