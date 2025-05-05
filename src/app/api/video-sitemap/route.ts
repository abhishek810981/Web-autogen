import { NextResponse } from 'next/server';
import { i18nConfig, languageMetadata } from '@/app/i18n/settings';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://autogenlabs.com';

  // This would typically come from your CMS or video management system
  const videos = [
    {
      title: {
        en: 'AutoGen Labs Platform Overview',
        es: 'Descripción general de la plataforma AutoGen Labs',
        fr: 'Aperçu de la plateforme AutoGen Labs',
      },
      description: {
        en: 'See how AutoGen Labs revolutionizes AI-powered development',
        es: 'Vea cómo AutoGen Labs revoluciona el desarrollo impulsado por IA',
        fr: 'Découvrez comment AutoGen Labs révolutionne le développement alimenté par l\'IA',
      },
      thumbnailUrl: '/images/platform-overview-thumb.jpg',
      contentUrl: '/videos/platform-overview.mp4',
      duration: 'PT2M30S',
      uploadDate: '2025-04-15',
      lastMod: '2025-04-15T09:30:00+00:00',
    },
    {
      title: {
        en: 'Getting Started with Visual Development',
        es: 'Comenzando con el desarrollo visual',
        fr: 'Débuter avec le développement visuel',
      },
      description: {
        en: 'Learn how to use our visual development tools with AI assistance',
        es: 'Aprenda a usar nuestras herramientas de desarrollo visual con asistencia de IA',
        fr: 'Apprenez à utiliser nos outils de développement visuel avec l\'assistance IA',
      },
      thumbnailUrl: '/images/visual-dev-thumb.jpg',
      contentUrl: '/videos/visual-development-tutorial.mp4',
      duration: 'PT5M15S',
      uploadDate: '2025-04-14',
      lastMod: '2025-04-14T11:15:00+00:00',
    },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
            xmlns:xhtml="http://www.w3.org/1999/xhtml">
      ${videos.map(video => {
        // Generate entries for each language
        return i18nConfig.locales.map(locale => {
          const localeDomain = locale === i18nConfig.defaultLocale
            ? baseUrl
            : `https://${locale}.autogenlabs.com`;
          const path = `/resources/${video.title[locale].toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
          const url = `${localeDomain}${path}`;
          
          return `
            <url>
              <loc>${url}</loc>
              <video:video>
                <video:thumbnail_loc>${localeDomain}${video.thumbnailUrl}</video:thumbnail_loc>
                <video:title>${video.title[locale]}</video:title>
                <video:description>${video.description[locale]}</video:description>
                <video:content_loc>${localeDomain}${video.contentUrl}</video:content_loc>
                <video:duration>${video.duration}</video:duration>
                <video:publication_date>${video.uploadDate}</video:publication_date>
                <video:family_friendly>yes</video:family_friendly>
                <video:platform>web mobile</video:platform>
                <video:live>no</video:live>
              </video:video>
              <lastmod>${video.lastMod}</lastmod>
              ${i18nConfig.locales.map(alternateLang => {
                const alternateDomain = alternateLang === i18nConfig.defaultLocale
                  ? baseUrl
                  : `https://${alternateLang}.autogenlabs.com`;
                const alternatePath = `/resources/${video.title[alternateLang].toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
                return `
                  <xhtml:link 
                    rel="alternate" 
                    hreflang="${languageMetadata[alternateLang].locale}"
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