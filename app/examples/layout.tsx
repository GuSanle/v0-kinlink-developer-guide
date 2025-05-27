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
      <ClientCodeHighlighter />
      {children}
    </div>
  );
}
