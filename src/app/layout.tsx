import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs'
import Script from 'next/script'
import { Analytics } from './lib/analytics'
import { PerformanceProvider } from './providers/performance-provider'
import JsonLdProvider from '@/components/JsonLd/JsonLdProvider'
import { createWebsiteSchema, createOrganizationSchema } from '@/components/JsonLd/jsonLdSchemas'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
})

export const metadata: Metadata = {
  metadataBase: new URL('https://autogenlabs.com'),
  title: {
    default: 'AutoGen Labs - Next Generation Development Platform',
    template: '%s | AutoGen Labs'
  },
  description: 'Transform your development workflow with AutoGen Labs. AI-powered tools, visual development, and enterprise-grade solutions for modern applications.',
  keywords: 'AutoGen Labs, AI Development, Visual Development, Enterprise Solutions, Development Platform',
  authors: [{ name: 'AutoGen Labs Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://autogenlabs.com',
    siteName: 'AutoGen Labs',
    title: 'AutoGen Labs - Next Generation Development Platform',
    description: 'Transform your development workflow with AutoGen Labs. AI-powered tools, visual development, and enterprise-grade solutions.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AutoGen Labs Platform Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AutoGen Labs - Next Generation Development Platform',
    description: 'Transform your development workflow with AutoGen Labs',
    images: ['/images/twitter-image.png'],
    creator: '@autogenlabs',
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
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: 'https://autogenlabs.com',
    languages: {
      'en-US': 'https://autogenlabs.com',
      'es-ES': 'https://autogenlabs.com/es',
      'fr-FR': 'https://autogenlabs.com/fr',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const baseSchemas = [
    createWebsiteSchema(),
    createOrganizationSchema({
      foundingDate: '2024',
      foundingLocation: 'San Francisco, CA',
      numberOfEmployees: {
        '@type': 'QuantitativeValue',
        minValue: '50',
        maxValue: '100',
      },
    }),
  ];

  return (
    <html lang="en">
      <head>
        {/* Resource Hints */}
        <link
          rel="preload"
          href="/fonts/inter.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://cdn.builder.io"
          crossOrigin="anonymous"
        />
        <link 
          rel="dns-prefetch" 
          href="https://cdn.builder.io" 
        />
        
        {/* Performance & SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* SEO Meta Tags */}
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL} />
        <link rel="alternate" href={process.env.NEXT_PUBLIC_SITE_URL} hrefLang="x-default" />
        <link rel="alternate" href={process.env.NEXT_PUBLIC_SITE_URL} hrefLang="en" />
        <link rel="alternate" href={`${process.env.NEXT_PUBLIC_SITE_URL}/es`} hrefLang="es" />
        <link rel="alternate" href={`${process.env.NEXT_PUBLIC_SITE_URL}/fr`} hrefLang="fr" />
        
        {/* App Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>
        <JsonLdProvider schemas={baseSchemas} />
        <PerformanceProvider>
          <Breadcrumbs />
          {children}
        </PerformanceProvider>
        <Analytics />
        
        {/* Analytics & Performance Monitoring */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
          async
          defer
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          defer
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                page_path: window.location.pathname,
                transport_type: 'beacon',
                send_page_view: true,
                anonymize_ip: true,
                cookie_flags: 'SameSite=None;Secure'
              });
            `,
          }}
        />
      </body>
    </html>
  )
}
