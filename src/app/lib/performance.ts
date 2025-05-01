import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Common paths that users often navigate to
const commonPaths = [
  '/features',
  '/templates',
  '/blog',
  '/support',
];

// Critical resources that should be preloaded
const criticalResources = [
  { path: '/fonts/inter.woff2', as: 'font', type: 'font/woff2' },
  { path: '/images/logo.png', as: 'image' },
  { path: '/images/hero-bg.webp', as: 'image' },
];

export function usePrefetchResources() {
  const pathname = usePathname();

  useEffect(() => {
    // Don't prefetch if the user has Save-Data enabled
    if (navigator.connection?.saveData) return;

    // Create link elements for critical resources
    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.path;
      link.as = resource.as;
      if (resource.type) {
        link.type = resource.type;
      }
      if (resource.as === 'font') {
        link.crossOrigin = 'anonymous';
      }
      document.head.appendChild(link);
    });

    // Prefetch common navigation paths
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      // Only prefetch on high-speed connections
      if (connection.effectiveType === '4g' && !connection.saveData) {
        commonPaths
          .filter(path => path !== pathname)
          .forEach(path => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = path;
            document.head.appendChild(link);
          });
      }
    }

    // Clean up function
    return () => {
      const links = document.head.querySelectorAll('link[rel="prefetch"]');
      links.forEach(link => link.remove());
    };
  }, [pathname]);
}

// Image optimization helper
export function getOptimizedImageUrl(src: string, width?: number, quality = 75) {
  if (!src.startsWith('http') && !src.startsWith('/')) return src;
  
  const url = new URL(src.startsWith('http') ? src : `${process.env.NEXT_PUBLIC_SITE_URL}${src}`);
  
  if (width) {
    url.searchParams.set('w', width.toString());
  }
  url.searchParams.set('q', quality.toString());
  url.searchParams.set('auto', 'format,compress');
  
  return url.toString();
}

// Performance monitoring
export function trackPageLoadPerformance() {
  if (typeof window === 'undefined') return;

  try {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const paint = performance.getEntriesByType('paint');
    const firstPaint = paint.find(entry => entry.name === 'first-paint')?.startTime;
    const firstContentfulPaint = paint.find(entry => entry.name === 'first-contentful-paint')?.startTime;

    const performanceMetrics = {
      ttfb: navigation.responseStart - navigation.requestStart,
      fcp: firstContentfulPaint,
      fp: firstPaint,
      domLoad: navigation.domContentLoadedEventEnd - navigation.navigationStart,
      windowLoad: navigation.loadEventEnd - navigation.navigationStart,
    };

    // Send metrics to analytics
    if (window.gtag) {
      window.gtag('event', 'performance_metrics', {
        ...performanceMetrics,
        page_path: window.location.pathname,
      });
    }
  } catch (error) {
    console.error('Error tracking performance:', error);
  }
}