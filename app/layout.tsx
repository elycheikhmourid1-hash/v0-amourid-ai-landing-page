import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: 'AICore Digital - AI Automation for Smarter Business | Richmond, VA',
  description:
    'AICore Digital is a Richmond, Virginia-based AI automation startup specializing in Google Forms automation, data analytics, and smart automated responses for businesses. Request a free consultation today.',
  keywords: [
    'AI automation Richmond',
    'Google Forms automation',
    'data analytics',
    'smart automated responses',
    'business automation Virginia',
    'AICore Digital',
    'AI consulting Richmond VA',
  ],
  openGraph: {
    title: 'AICore Digital - AI Automation for Smarter Business',
    description:
      'Automate workflows, unlock data insights, and deliver intelligent responses with AICore Digital. Based in Richmond, Virginia.',
    type: 'website',
    locale: 'en_US',
    siteName: 'AICore Digital',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AICore Digital - AI Automation for Smarter Business',
    description:
      'Automate workflows, unlock data insights, and deliver intelligent responses with AICore Digital. Based in Richmond, Virginia.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#1a1a1a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
