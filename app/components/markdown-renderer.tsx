'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula, gruvboxLight, gruvboxDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { cn } from './base-ui/utils'
import markdownStyles from "./markdown-styles.module.css";

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
  let language = match ? match[1] : '';
  return !inline && match ? (<SyntaxHighlighter
      style={gruvboxDark}
      language={language}
      PreTag="div"
      className="rounded-md !mb-6"
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter> ) : (
    <code className={className} {...props}>
      {children}
    </code>
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
    <div className={cn("prose prose-sm dark:prose-invert max-w-none prose-pre:bg-indigo-950 prose-pre:text-gray-100", markdownStyles["markdown"])}>
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