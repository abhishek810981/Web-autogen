import { NextResponse } from 'next/server';
import { i18nConfig, languageMetadata } from '@/app/i18n/settings';
import { getImageMetadata } from '@/app/lib/imageMetadata';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://autogenlabs.com';

  // This would typically come from your CMS or image management system
  const images = [
    {
      url: '/images/features/ai-development.png',
      title: {
        en: 'AI-Powered Development Tools',
        es: 'Herramientas de desarrollo impulsadas por IA',
        fr: 'Outils de développement alimentés par l\'IA',
      },
      caption: {
        en: 'Intelligent code suggestions and automated development workflows',
        es: 'Sugerencias de código inteligentes y flujos de trabajo automatizados',
        fr: 'Suggestions de code intelligentes et flux de développement automatisés',
      },
      location: '/features#ai-development',
      license: 'https://creativecommons.org/licenses/by/4.0/',
    },
    {
      url: '/images/features/visual-builder.png',
      title: {
        en: 'Visual Development Interface',
        es: 'Interfaz de desarrollo visual',
        fr: 'Interface de développement visuel',
      },
      caption: {
        en: 'Drag-and-drop components for rapid development',
        es: 'Componentes de arrastrar y soltar para desarrollo rápido',
        fr: 'Composants glisser-déposer pour un développement rapide',
      },
      location: '/features#visual-builder',
      license: 'https://creativecommons.org/licenses/by/4.0/',
    },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
            xmlns:xhtml="http://www.w3.org/1999/xhtml">
      ${await Promise.all(images.map(async (image) => {
        const metadata = await getImageMetadata(image.url);
        
        // Generate entries for each language
        return i18nConfig.locales.map(locale => {
          const localeDomain = locale === i18nConfig.defaultLocale
            ? baseUrl
            : `https://${locale}.autogenlabs.com`;
          const url = `${localeDomain}${image.location}`;
          
          return `
            <url>
              <loc>${url}</loc>
              <image:image>
                <image:loc>${baseUrl}${image.url}</image:loc>
                <image:title>${(image.title as any)?.[locale] || ''}</image:title>
                <image:caption>${(image.caption as any)?.[locale] || ''}</image:caption>
                ${metadata ? `
                <image:width>${metadata.width || ''}</image:width>
                <image:height>${metadata.height || ''}</image:height>
                ` : ''}
                <image:license>${image.license}</image:license>
              </image:image>
              ${i18nConfig.locales.map(alternateLang => {
                const alternateDomain = alternateLang === i18nConfig.defaultLocale
                  ? baseUrl
                  : `https://${alternateLang}.autogenlabs.com`;
                return `
                  <xhtml:link 
                    rel="alternate" 
                    hreflang="${(languageMetadata as any)[alternateLang].locale}"
                    href="${alternateDomain}${image.location}"
                  />`;
              }).join('')}
            </url>
          `;
        }).join('');
      }))}
    </urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
