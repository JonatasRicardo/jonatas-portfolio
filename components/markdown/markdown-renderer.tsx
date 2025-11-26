'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { gruvboxDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import remarkGfm from 'remark-gfm'
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

function CodeRender({ inline, className, children, ...props }: CodeComponentProps) {
  const match = /language-(\w+)/.exec(className || '')
  const language = match ? match[1] : '';
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


export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none prose-pre:bg-indigo-950 prose-pre:text-gray-100">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code: CodeRender,
          a: LinkRenderer,
          p: ({ children }) => <p className="mt-6 mb-6">{children}</p>,
          h2: ({ children }) => <h2 className="mt-8 mb-8">{children}</h2>,
          img: ({ children, ...props }) => <span className='flex justify-center'><img {...props} className="mt-4 mb-4 lg:max-w-[700px]">{children}</img></span>
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
} 