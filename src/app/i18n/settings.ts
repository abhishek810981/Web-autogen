export const defaultLocale = 'en';

export const locales = ['en', 'es', 'fr'] as const;
export type ValidLocale = typeof locales[number];

export const languageNames = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
} as const;

export const defaultNamespaces = ['common'] as const;
export type ValidNamespace = typeof defaultNamespaces[number];

// For search engines to understand the content structure
export const languageMetadata = {
  en: {
    name: 'English',
    countryCode: 'US',
    dir: 'ltr',
    dateFormat: 'MM/DD/YYYY',
    hreflang: 'en',
  },
  es: {
    name: 'Spanish',
    countryCode: 'ES',
    dir: 'ltr',
    dateFormat: 'DD/MM/YYYY',
    hreflang: 'es',
  },
  fr: {
    name: 'French',
    countryCode: 'FR',
    dir: 'ltr',
    dateFormat: 'DD/MM/YYYY',
    hreflang: 'fr',
  },
} as const;

export const defaultMetadata = {
  en: {
    title: 'AutoGen Labs - Next Generation Development Platform',
    description: 'Transform your development workflow with AI-powered tools and visual development solutions.',
    keywords: ['AI Development', 'Visual Development', 'Enterprise Solutions'],
  },
  es: {
    title: 'AutoGen Labs - Plataforma de Desarrollo de Nueva Generación',
    description: 'Transforma tu flujo de desarrollo con herramientas impulsadas por IA y soluciones de desarrollo visual.',
    keywords: ['Desarrollo con IA', 'Desarrollo Visual', 'Soluciones Empresariales'],
  },
  fr: {
    title: 'AutoGen Labs - Plateforme de Développement de Nouvelle Génération',
    description: 'Transformez votre flux de développement avec des outils alimentés par l\'IA et des solutions de développement visuel.',
    keywords: ['Développement IA', 'Développement Visuel', 'Solutions Entreprise'],
  },
} as const;

export const i18nConfig = {
  defaultLocale: 'en',
  locales: ['en', 'es', 'fr'],
  domains: [
    {
      domain: 'autogenlabs.com',
      defaultLocale: 'en',
    },
    {
      domain: 'es.autogenlabs.com',
      defaultLocale: 'es',
    },
    {
      domain: 'fr.autogenlabs.com',
      defaultLocale: 'fr',
    },
  ],
  // Pages that don't require translation
  nonLocalizedPaths: [
    '/api/',
    '/sitemap.xml',
    '/robots.txt',
    '/favicon.ico',
  ],
};

export function getLanguageAlternates(path: string) {
  return i18nConfig.locales.map(locale => ({
    hrefLang: locale,
    href: locale === i18nConfig.defaultLocale
      ? `https://autogenlabs.com${path}`
      : `https://${locale}.autogenlabs.com${path}`,
  }));
}

export function getCanonicalUrl(locale: string, path: string) {
  return locale === i18nConfig.defaultLocale
    ? `https://autogenlabs.com${path}`
    : `https://${locale}.autogenlabs.com${path}`;
}

export function getMetadataAlternates(path: string) {
  return {
    languages: Object.fromEntries(
      i18nConfig.locales.map(locale => [
        locale,
        getCanonicalUrl(locale, path),
      ])
    ),
  };
}
