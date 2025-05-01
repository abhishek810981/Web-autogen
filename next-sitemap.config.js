/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://autogenlabs.com',
  generateRobotsTxt: false,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: [
    '/admin/*',
    '/private/*',
    '/api/*',
    '/404',
    '/500',
  ],
  transform: async (config, path) => {
    // Add language variations
    const languages = ['en', 'es', 'fr'];
    const isRootPath = path === '/';
    const baseLocales = languages.map(lang => ({
      loc: `${config.siteUrl}/${lang}${isRootPath ? '' : path}`,
      alternateRefs: languages
        .filter(l => l !== lang)
        .map(l => ({
          href: `${config.siteUrl}/${l}${isRootPath ? '' : path}`,
          hreflang: l,
        })),
      lastmod: new Date().toISOString(),
      changefreq: isRootPath ? 'daily' : config.changefreq,
      priority: isRootPath ? 1.0 : config.priority,
    }));

    // Dynamic content URLs
    if (path.startsWith('/blog/')) {
      return {
        loc: `${config.siteUrl}${path}`,
        changefreq: 'weekly',
        priority: 0.8,
        alternateRefs: [],
      };
    }

    // Template URLs
    if (path.startsWith('/templates/')) {
      return {
        loc: `${config.siteUrl}${path}`,
        changefreq: 'monthly',
        priority: 0.9,
        alternateRefs: [],
      };
    }

    return baseLocales;
  },
  additionalPaths: async (config) => {
    const result = [];
    
    // Add dynamic paths
    const dynamicPaths = [
      // Add your dynamic routes here
      { loc: '/features', priority: 0.9 },
      { loc: '/templates', priority: 0.9 },
      { loc: '/blog', priority: 0.8 },
      { loc: '/support', priority: 0.8 },
      { loc: '/community', priority: 0.7 },
      { loc: '/docs', priority: 0.9 },
    ];

    // Add language variations for dynamic paths
    const languages = ['en', 'es', 'fr'];
    dynamicPaths.forEach(({ loc, priority }) => {
      languages.forEach(lang => {
        result.push({
          loc: `/${lang}${loc}`,
          priority,
          changefreq: 'daily',
          lastmod: new Date().toISOString(),
        });
      });
    });

    return result;
  },
};

module.exports = config;