import { Metadata } from 'next';
import { i18nConfig, languageMetadata } from '../i18n/settings';

interface LocalizedMetadataProps {
  title: {
    [key: string]: string;
  };
  description: {
    [key: string]: string;
  };
  path: string;
  images?: {
    url: string;
    alt: string;
    width: number;
    height: number;
  }[];
  type?: 'website' | 'article' | 'book' | 'profile' | 'music.song' | 'music.album' | 'music.playlist' | 'music.radio_station' | 'video.movie' | 'video.episode' | 'video.tv_show' | 'video.other';
}

export function generateLocalizedMetadata(
  { title, description, path, images, type = 'website' }: LocalizedMetadataProps,
  locale: string = i18nConfig.defaultLocale
): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://autogenlabs.com';
  const languageMeta = languageMetadata[locale as keyof typeof languageMetadata];
  const canonicalPath = locale === i18nConfig.defaultLocale ? path : `/${locale}${path}`;
  const canonicalUrl = `${baseUrl}${canonicalPath}`;

  // Generate alternate language versions
  const alternates = {
    canonical: canonicalUrl,
    languages: Object.fromEntries(
      i18nConfig.locales.map(lang => [
        lang,
        lang === i18nConfig.defaultLocale
          ? `${baseUrl}${path}`
          : `${baseUrl}/${lang}${path}`,
      ])
    ),
  };

  // Generate hreflang links (will be added to head separately)
  const alternateLanguages = i18nConfig.locales.map(lang => ({
    hrefLang: languageMetadata[lang as keyof typeof languageMetadata].hreflang,
    href: alternates.languages[lang],
  }));

  // Default OpenGraph image if none provided
  const defaultImages = [{
    url: `${baseUrl}/api/og?title=${encodeURIComponent(title[locale])}&description=${encodeURIComponent(description[locale])}&type=${type}&locale=${locale}`,
    width: 1200,
    height: 630,
    alt: title[locale],
  }];

  const metadata: Metadata & { alternateLanguages?: any } = {
    title: title[locale],
    description: description[locale],
    metadataBase: new URL(baseUrl),
    alternates,
    openGraph: {
      title: title[locale],
      description: description[locale],
      url: canonicalUrl,
      siteName: 'AutoGen Labs',
      locale: languageMeta.hreflang,
      type,
      images: images || defaultImages,
    },
    twitter: {
      card: 'summary_large_image',
      title: title[locale],
      description: description[locale],
      images: images || defaultImages,
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
  };

  return metadata;
}

// Helper function to generate breadcrumb schema
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// Helper function to generate localized social media tags
export function generateSocialTags(
  locale: string,
  path: string,
  ogData: {
    title: string;
    description: string;
    image?: string;
    type?: 'website' | 'article' | 'book' | 'profile' | 'music.song' | 'music.album' | 'music.playlist' | 'music.radio_station' | 'video.movie' | 'video.episode' | 'video.tv_show' | 'video.other';
  }
) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://autogenlabs.com';
  const canonicalUrl = `${baseUrl}${locale === i18nConfig.defaultLocale ? '' : `/${locale}`}${path}`;
  const ogImage = ogData.image || `${baseUrl}/api/og?title=${encodeURIComponent(ogData.title)}&description=${encodeURIComponent(ogData.description)}&type=${ogData.type || 'website'}&locale=${locale}`;

  return {
    ogUrl: canonicalUrl,
    ogType: ogData.type || 'website',
    ogTitle: ogData.title,
    ogDescription: ogData.description,
    ogImage,
    twitterCard: 'summary_large_image',
    twitterTitle: ogData.title,
    twitterDescription: ogData.description,
    twitterImage: ogImage,
  };
}
