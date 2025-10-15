import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next';

import '@/styles/globals.css'
import Template from 'app/components/template'
import favicon from '@/imgs/jonatas-ricardo-santos-frontend-icon.png'
import ogImage from '@/imgs/jonatas-ricardo-santos-frontend-icon.png'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Jonatas Ricardo Santos - Fullstack Software Engineer',
  description: 'Senior Fullstack Engineer specializing in React, Next.js, and AI/ML. Building scalable products and sharing insights on modern web engineering.',
  keywords: ['Jonatas Ricardo Santos', 'Fullstack Engineer','Frontend Engineer', 'React', 'typescript', 'Next.js', 'AI/ML', 'Software Engineer', 'Portfolio'],
  authors: [{ name: 'Jonatas Ricardo Santos' }],
  creator: 'Jonatas Ricardo Santos',
  publisher: 'Jonatas Ricardo Santos',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://jonatasricardo.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Jonatas Ricardo Santos - Fullstack Software Engineer',
    description: 'Senior Fullstack Engineer specializing in React, Next.js, and AI/ML. Building scalable products and sharing insights on modern web engineering.',
    url: 'https://jonatasricardo.com',
    siteName: 'Jonatas Ricardo Santos Portfolio',
    images: [
      {
        url: ogImage.src,
        width: 1200,
        height: 630,
        alt: 'Jonatas Ricardo Santos - Fullstack Software Engineer',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jonatas Ricardo Santos - Fullstack Software Engineer',
    description: 'Senior Fullstack Engineer specializing in React, Next.js, and AI/ML. Building scalable products and sharing insights on modern web engineering.',
    images: [ogImage.src],
    creator: '@JonatasRicardo',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
        <Analytics />
      </body>
    </html>
  )
}
