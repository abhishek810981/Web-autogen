import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://autogenlabs.com';
  const lastModified = new Date();

  // Define static routes
  const staticRoutes = [
    '',
    '/features',
    '/templates',
    '/blog',
    '/support',
    '/docs',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Add language variations
  const languages = ['es', 'fr'];
  const localizedRoutes = languages.flatMap((lang) =>
    staticRoutes.map((route) => ({
      url: `${baseUrl}/${lang}${route.url.replace(baseUrl, '')}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority * 0.9, // Slightly lower priority for translated pages
    }))
  );

  // Add dynamic routes (e.g., blog posts, templates)
  // This would typically come from your CMS or database
  const dynamicRoutes = [
    // Example blog posts
    '/blog/getting-started',
    '/blog/ai-development',
    '/blog/visual-tools',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...localizedRoutes, ...dynamicRoutes];
}