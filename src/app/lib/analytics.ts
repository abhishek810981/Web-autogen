import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import { WebVitalsMetric } from './web-vitals';

declare global {
  interface Window {
    gtag?: (
      command: string,
      action: string,
      params: object
    ) => void;
  }
}

export function trackPageview(url: string) {
  if (window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID!, {
      page_path: url,
    });
  }
}

export function trackEvent({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value?: number;
}) {
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

export function trackWebVitals(metric: WebVitalsMetric) {
  if (window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.value),
      metric_value: metric.value,
      metric_rating: metric.rating,
      metric_delta: metric.delta,
      non_interaction: true,
    });
  }
}

export const Analytics = VercelAnalytics;
