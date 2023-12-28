import type { Metadata } from 'next'
import {seo} from '../lib/seo'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
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
