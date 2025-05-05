import { NextResponse } from 'next/server';
import { i18nConfig, languageMetadata } from '@/app/i18n/settings';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://autogenlabs.com';

  // This would typically come from your CMS or news management system
  const newsArticles = [
    {
      title: {
        en: 'AutoGen Labs Launches Revolutionary AI Development Platform',
        es: 'AutoGen Labs lanza plataforma revolucionaria de desarrollo con IA',
        fr: 'AutoGen Labs lance une plateforme révolutionnaire de développement IA',
      },
      description: {
        en: 'New platform transforms how developers interact with AI for coding',
        es: 'Nueva plataforma transforma cómo los desarrolladores interactúan con IA para programar',
        fr: 'Nouvelle plateforme transforme l\'interaction entre développeurs et IA pour le codage',
      },
      publishDate: '2025-04-15T08:00:00+00:00',
      lastMod: '2025-04-15T09:30:00+00:00',
      category: 'Product Launch',
    },
    {
      title: {
        en: 'Visual Development Tools Enhanced with AI Capabilities',
        es: 'Herramientas de desarrollo visual mejoradas con capacidades de IA',
        fr: 'Outils de développement visuel améliorés avec des capacités d\'IA',
      },
      description: {
        en: 'Major update brings AI-powered features to visual development workflow',
        es: 'Actualización importante trae funciones impulsadas por IA al flujo de trabajo de desarrollo visual',
        fr: 'Mise à jour majeure apporte des fonctionnalités IA au flux de développement visuel',
      },
      publishDate: '2025-04-14T10:00:00+00:00',
      lastMod: '2025-04-14T11:15:00+00:00',
      category: 'Product Update',
    },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
            xmlns:xhtml="http://www.w3.org/1999/xhtml">
      ${newsArticles.map(article => {
        // Generate entries for each language
        return i18nConfig.locales.map(locale => {
          const localeDomain = locale === i18nConfig.defaultLocale
            ? baseUrl
            : `https://${locale}.autogenlabs.com`;
          const validLocales = ['en', 'es', 'fr'] as const;
const localeKey = locale as keyof typeof article.title;
const title = article.title[localeKey] || article.title['en'];
const path = `/blog/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
          const url = `${localeDomain}${path}`;
          
          return `
            <url>
              <loc>${url}</loc>
              <news:news>
                <news:publication>
                  <news:name>AutoGen Labs</news:name>
                  <news:language>${languageMetadata[locale as keyof typeof languageMetadata].hreflang}</news:language>
                </news:publication>
                <news:publication_date>${article.publishDate}</news:publication_date>
                <news:title>${article.title[locale as keyof typeof article.title]}</news:title>
                <news:keywords>${article.category}</news:keywords>
              </news:news>
              <lastmod>${article.lastMod}</lastmod>
              ${i18nConfig.locales.map(alternateLang => {
                const alternateDomain = alternateLang === i18nConfig.defaultLocale
                  ? baseUrl
                  : `https://${alternateLang}.autogenlabs.com`;
                const alternatePath = `/blog/${(article.title[alternateLang as keyof typeof article.title] || article.title['en']).toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
                return `
                  <xhtml:link 
                    rel="alternate" 
                    hreflang="${languageMetadata[alternateLang as keyof typeof languageMetadata].hreflang}"
                    href="${alternateDomain}${alternatePath}"
                  />`;
              }).join('')}
            </url>
          `;
        }).join('');
      }).join('')}
    </urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
