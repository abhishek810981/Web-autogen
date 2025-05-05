'use client';

import React, { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { initWebVitals } from '../lib/web-vitals';
import { trackPageLoadPerformance } from '../lib/performance';
import { trackPageview } from '../lib/analytics';

export function PerformanceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Initialize web vitals monitoring
    initWebVitals();

    // Track initial page load
    trackPageLoadPerformance();
  }, []);

  useEffect(() => {
    // Track page views and performance on route changes
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    trackPageview(url);
    trackPageLoadPerformance();
  }, [pathname, searchParams]);

  return <>{children}</>;
}