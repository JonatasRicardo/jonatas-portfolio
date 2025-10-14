import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import Template from 'app/components/template'
import favicon from '@/imgs/jonatas-ricardo-santos-frontend-icon.png'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Jonatas Santos - Fullstack Software Engineer',
  description: 'Senior Fullstack Engineer specializing in React, Next.js, and AI/ML. Building scalable products and sharing insights on modern web engineering.',
  icons: {
    icon: favicon.src,
    shortcut: favicon.src,
    apple: favicon.src,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Template>
          {children}
        </Template>
      </body>
    </html>
  )
}
