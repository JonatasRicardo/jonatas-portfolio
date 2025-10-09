import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../src/styles/globals.css'
import Template from '@/src/components/template'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Jonatas Santos - Frontend Software Engineer',
  description: 'Senior Frontend Engineer specializing in React, Next.js, and AI/ML. Building scalable products and sharing insights on modern web engineering.',
  icons: {
    icon: '/src/imgs/jonatas-ricardo-santos-frontend-icon.png',
    shortcut: '/src/imgs/jonatas-ricardo-santos-frontend-icon.png',
    apple: '/src/imgs/jonatas-ricardo-santos-frontend-icon.png',
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
