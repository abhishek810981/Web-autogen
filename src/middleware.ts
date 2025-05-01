import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { locales, defaultLocale, languageMetadata } from './app/i18n/settings'

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // @ts-ignore locales are readonly
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  const localeList = [...locales]

  try {
    const matchedLocale = matchLocale(languages, localeList, defaultLocale)
    return matchedLocale
  } catch (e) {
    return defaultLocale
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const pathnameIsMissingLocale = locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Handle missing locale - don't redirect, just set headers
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    const response = NextResponse.next()
    response.headers.set('x-language', locale)
    response.headers.set('x-country', languageMetadata[locale as keyof typeof languageMetadata].countryCode)
    response.cookies.set('NEXT_LOCALE', locale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    })
    return response
  }

  // Add headers for pages with locale
  const response = NextResponse.next()
  if (!pathnameIsMissingLocale) {
    const locale = pathname.split('/')[1]
    response.headers.set('x-language', locale)
    response.headers.set('x-country', languageMetadata[locale as keyof typeof languageMetadata].countryCode)
  }

  return response
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
