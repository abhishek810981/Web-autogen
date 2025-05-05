import { NextResponse, type NextRequest } from 'next/server';
import { headers } from 'next/headers';

export function generateSecurityHeaders() {
  return {
    'Content-Security-Policy':
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https: blob:; font-src 'self' https://fonts.gstatic.com data:; connect-src 'self' https://www.google-analytics.com; frame-ancestors 'none';",
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy':
      'camera=(), microphone=(), geolocation=(), interest-cohort=()',
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  };
}

export function generateCacheHeaders(type: 'page' | 'asset' | 'api') {
  const cacheConfig = {
    page: {
      'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=59',
    },
    asset: {
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
    api: {
      'Cache-Control': 'public, s-maxage=1, stale-while-revalidate=59',
    },
  };

  return cacheConfig[type];
}

export function getPrioritizedResources() {
  return {
    preload: [
      { path: '/fonts/inter.woff2', as: 'font', type: 'font/woff2' },
      { path: '/images/hero-bg.webp', as: 'image' },
    ],
    prefetch: ['/features', '/templates', '/blog'],
    preconnect: ['https://www.googletagmanager.com', 'https://www.google-analytics.com'],
  };
}

export async function generateHeaders(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const responseHeaders = new Headers();

  // Add security headers
  Object.entries(generateSecurityHeaders()).forEach(([key, value]) => {
    responseHeaders.set(key, value);
  });

  // Add cache headers based on route type
  const cacheHeaders = generateCacheHeaders(
    pathname.startsWith('/api')
      ? 'api'
      : pathname.match(/\.(jpg|jpeg|png|webp|svg|ico|css|js)$/)
      ? 'asset'
      : 'page'
  );

  Object.entries(cacheHeaders).forEach(([key, value]) => {
    responseHeaders.set(key, value);
  });

  // Add language headers for internationalization
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    responseHeaders.set('Content-Language', acceptLanguage.split(',')[0]);
  }

  return responseHeaders;
}