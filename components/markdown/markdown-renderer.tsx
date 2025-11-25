'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { gruvboxDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import remarkGfm from 'remark-gfm'
// import markdownStyles from "./markdown-styles.module.css";
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
    <div className="prose prose-sm dark:prose-invert max-w-none prose-pre:bg-indigo-950 prose-pre:text-gray-100">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code: CodeRender,
          a: LinkRenderer,
          p: ({ children }) => <p className="m-4">{children}</p>,
          h2: ({ children }) => <h2 className="m-4">{children}</h2>
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
} 