import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AImouridAI - AI Automation for Smarter Business',
    short_name: 'AImouridAI',
    description: 'AI automation startup specializing in Google Forms automation, data analytics, and smart automated responses for businesses.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a12',
    theme_color: '#1a1a1a',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
