'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from '../base-ui/utils'
import markdownStyles from "./markdown-styles.module.css";

interface MarkdownRendererProps {
  content: string,
  className?: string
}

interface CodeComponentProps {
  inline?: boolean
  className?: string
  children?: React.ReactNode
}

function CodeRender({ inline, className, children, ...props }: CodeComponentProps) {
  return inline ? (
    <code className={className} {...props}>
      {children}
    </code>
  ) : (
    <pre className="mb-6 overflow-x-auto rounded-md bg-indigo-950 p-4 text-gray-100">
      <code className={className} {...props}>
        {String(children).replace(/\n$/, '')}
      </code>
    </pre>
  )
}

function LinkRenderer({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a href={href} target="_blank" rel="noreferrer" {...props}>
      {children}
    </a>
  );
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div className={cn("prose prose-sm dark:prose-invert max-w-none prose-pre:bg-indigo-950 prose-pre:text-gray-100", markdownStyles["markdown"], className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code: CodeRender,
          a: LinkRenderer,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
