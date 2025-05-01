import { NextResponse } from 'next/server';
import { i18nConfig, languageMetadata } from '@/app/i18n/settings';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://autogenlabs.com';
  const currentDate = new Date().toISOString();

  const sitemapTypes = [
    'sitemap',      // Main sitemap
    'news-sitemap', // News articles
    'video-sitemap', // Video content
    'image-sitemap', // Images
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
                  xmlns:xhtml="http://www.w3.org/1999/xhtml">
      ${sitemapTypes.map(type => {
        return i18nConfig.locales.map(locale => {
          const localeDomain = locale === i18nConfig.defaultLocale
            ? baseUrl
            : `https://${locale}.autogenlabs.com`;
          const url = `${localeDomain}/api/${type}`;
          
          return `
            <sitemap>
              <loc>${url}</loc>
              <lastmod>${currentDate}</lastmod>
              ${i18nConfig.locales.map(alternateLang => {
                const alternateDomain = alternateLang === i18nConfig.defaultLocale
                  ? baseUrl
                  : `https://${alternateLang}.autogenlabs.com`;
                return `
                  <xhtml:link 
                    rel="alternate" 
                    hreflang="${languageMetadata[alternateLang].locale}"
                    href="${alternateDomain}/api/${type}"
                  />`;
              }).join('')}
            </sitemap>
          `;
        }).join('');
      }).join('')}
    </sitemapindex>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}