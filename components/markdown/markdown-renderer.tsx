'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from '../base-ui/utils'

interface MarkdownRendererProps {
  content: string,
  className?: string
}

interface CodeComponentProps {
  node?: any
  inline?: boolean
  className?: string
  children?: React.ReactNode
  [key: string]: any
}

function CodeRender({ node, inline, className, children, ...props }: CodeComponentProps) {
  const match = /language-(\w+)/.exec(className || '')
  const language = match ? match[1] : '';
  if (!inline && match) {
    return (
      <pre className="rounded-md !mb-6 overflow-x-auto">
        <code className={className} {...props}>
          {String(children).replace(/\n$/, '')}
        </code>
      </pre>
    )
  }
  return <code className={className} {...props}>{children}</code>
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
    <div className={cn("prose prose-sm dark:prose-invert max-w-none prose-pre:bg-indigo-950 prose-pre:text-gray-100 rounded-xl", className)}>
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