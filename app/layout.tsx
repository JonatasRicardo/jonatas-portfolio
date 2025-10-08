import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../src/styles/globals.css'
import Template from '@/src/components/Template'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Jonatas Santos - Portfolio',
  description: 'Frontend Developer specializing in modern web technologies',
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
