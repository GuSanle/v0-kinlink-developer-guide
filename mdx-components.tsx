import type { MDXComponents } from "mdx/types";

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use components
// here that would be available to all MDX files.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children, ...props }) => (
      <h1
        className="text-3xl font-bold tracking-tight mb-6 mt-10 first:mt-0 text-foreground"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2
        className="text-2xl font-bold tracking-tight mb-4 mt-10 first:mt-0 text-foreground"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3
        className="text-xl font-semibold mb-3 mt-8 first:mt-0 text-foreground"
        {...props}
      >
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4
        className="text-lg font-semibold mb-2 mt-6 first:mt-0 text-foreground"
        {...props}
      >
        {children}
      </h4>
    ),
    ul: ({ children, ...props }) => (
      <ul className="mb-6 pl-6 list-disc" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="mb-6 pl-6 list-decimal" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="mb-2 text-foreground" {...props}>
        {children}
      </li>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="border-l-4 border-primary/30 pl-6 py-2 italic my-6 text-muted-foreground bg-muted/30 rounded-r"
        {...props}
      >
        {children}
      </blockquote>
    ),
    code: ({ children, className, ...props }) => {
      if (className?.includes("language-") || className?.includes("hljs")) {
        return (
          <code className={className} {...props}>
            {children}
          </code>
        );
      }
      return (
        <code
          className="bg-muted px-2 py-1 rounded text-sm font-mono text-foreground"
          {...props}
        >
          {children}
        </code>
      );
    },
    pre: ({ children, ...props }) => <pre {...props}>{children}</pre>,
    a: ({ children, ...props }) => (
      <a className="text-primary hover:underline font-medium" {...props}>
        {children}
      </a>
    ),
    strong: ({ children, ...props }) => (
      <strong className="font-semibold text-foreground" {...props}>
        {children}
      </strong>
    ),
    ...components,
  };
}
