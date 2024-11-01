import type { Metadata } from 'next'
import { seo } from '../lib/seo'
import { Providers } from './providers'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className='dark:bg-gray-900'>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: seo.url,
  title: seo.title,
  description: seo.description,
  openGraph: {
    title: {
      default: seo.title,
      template: '%s | Hot Search Trending',
    },
    description: seo.description,
    siteName: seo.title,
    locale: 'zh_CN',
    type: 'website',
    url: seo.url,
  },
  twitter: {
    site: '@tim_cook',
    creator: '@tim_cook',
    card: 'summary_large_image',
    title: seo.title,
    description: seo.description,
  },
}
