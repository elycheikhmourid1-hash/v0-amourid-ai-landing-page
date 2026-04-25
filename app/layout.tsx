import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://aimouridai.com'),
  title: {
    default: 'AImouridAI - AI Automation for Smarter Business | Richmond, VA',
    template: '%s | AImouridAI',
  },
  description:
    'AImouridAI is a Richmond, Virginia-based AI automation startup specializing in Google Forms automation, data analytics, and smart automated responses for businesses. Request a free consultation today.',
  keywords: [
    'AI automation Richmond',
    'Google Forms automation',
    'data analytics',
    'smart automated responses',
    'business automation Virginia',
    'AImouridAI',
    'AI consulting Richmond VA',
    'workflow automation',
    'robotic process automation',
    'RPA Virginia',
    'business process automation',
    'AI services small business',
  ],
  authors: [{ name: 'AImouridAI' }],
  creator: 'AImouridAI',
  publisher: 'AImouridAI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'AImouridAI - AI Automation for Smarter Business',
    description:
      'Automate workflows, unlock data insights, and deliver intelligent responses with AImouridAI. Based in Richmond, Virginia.',
    type: 'website',
    locale: 'en_US',
    siteName: 'AImouridAI',
    url: 'https://aimouridai.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AImouridAI - AI Automation for Smarter Business',
    description:
      'Automate workflows, unlock data insights, and deliver intelligent responses with AImouridAI. Based in Richmond, Virginia.',
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
  alternates: {
    canonical: 'https://aimouridai.com',
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
  category: 'technology',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'AImouridAI',
  description: 'AI automation startup specializing in Google Forms automation, data analytics, and smart automated responses for businesses.',
  url: 'https://aimouridai.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Richmond',
    addressRegion: 'VA',
    addressCountry: 'US',
  },
  areaServed: {
    '@type': 'State',
    name: 'Virginia',
  },
  priceRange: '$$',
  serviceType: ['AI Automation', 'Data Analytics', 'Business Process Automation'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} bg-background`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none"
        >
          Skip to main content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
