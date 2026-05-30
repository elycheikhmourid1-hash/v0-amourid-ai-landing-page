import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk, Noto_Sans_Arabic } from 'next/font/google'
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

// Fallback so Arabic lead/message content (and any RTL data) renders cleanly
const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-noto-arabic',
})

export const metadata: Metadata = {
  title: 'AICORE DIGITAL - AI Automation for Smarter Business | Richmond, VA',
  description:
    'AICORE DIGITAL is a Richmond, Virginia-based AI automation agency founded by Ely Cheikh Mourid. We specialize in workflow automation, data analytics, and intelligent AI solutions for businesses. Request a free consultation today.',
  keywords: [
    'AI automation Richmond',
    'workflow automation',
    'data analytics',
    'smart automated responses',
    'business automation Virginia',
    'AICORE DIGITAL',
    'AI consulting Richmond VA',
    'Ely Cheikh Mourid',
  ],
  authors: [{ name: 'Ely Cheikh Mourid', url: 'https://aicoredigital.com' }],
  creator: 'Ely Cheikh Mourid',
  publisher: 'AICORE DIGITAL',
  openGraph: {
    title: 'AICORE DIGITAL - AI Automation for Smarter Business',
    description:
      'Automate workflows, unlock data insights, and deliver intelligent AI solutions with AICORE DIGITAL. Founded by Ely Cheikh Mourid. Based in Richmond, Virginia.',
    type: 'website',
    locale: 'en_US',
    siteName: 'AICORE DIGITAL',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AICORE DIGITAL - AI Automation for Smarter Business',
    description:
      'Automate workflows, unlock data insights, and deliver intelligent AI solutions with AICORE DIGITAL. Founded by Ely Cheikh Mourid.',
    creator: '@aicoredigital',
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
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${notoArabic.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
