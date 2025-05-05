import { Metric } from 'web-vitals';

export interface WebVitalsMetric extends Metric {
  id: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
}

const vitalsUrl = '/api/vitals';

export function getWebVitalsScore(value: number, name: string): 'good' | 'needs-improvement' | 'poor' {
  switch (name) {
    case 'CLS':
      return value <= 0.1 ? 'good' : value <= 0.25 ? 'needs-improvement' : 'poor';
    case 'FID':
      return value <= 100 ? 'good' : value <= 300 ? 'needs-improvement' : 'poor';
    case 'LCP':
      return value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor';
    case 'FCP':
      return value <= 1800 ? 'good' : value <= 3000 ? 'needs-improvement' : 'poor';
    case 'TTFB':
      return value <= 800 ? 'good' : value <= 1800 ? 'needs-improvement' : 'poor';
    default:
      return 'poor';
  }
}

export function sendWebVitals(metric: WebVitalsMetric) {
  if (process.env.NODE_ENV === 'development') {
    console.log(metric);
  }

  const body = {
    id: metric.id,
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    navigationType: metric.navigationType
  };

  // Use `navigator.sendBeacon()` if available, falling back to `fetch()`
  const blob = new Blob([JSON.stringify(body)], { type: 'application/json' });
  if (navigator.sendBeacon) {
    navigator.sendBeacon(vitalsUrl, blob);
  } else {
    fetch(vitalsUrl, {
      body: blob,
      method: 'POST',
      credentials: 'omit',
      keepalive: true,
    });
  }
}

// Helper function to get URL-specific web vital metrics
export function generateWebVitalId(metric: Metric): string {
  const url = location.href.replace(location.origin, '');
  // Encode metric name and URL as base64 for shorter ID
  const id = btoa(`${metric.name}_${url}`).slice(0, 24);
  return id;
}

export function initWebVitals() {
  try {
    // Only initialize in production and if the browser supports the APIs
    if (
      process.env.NODE_ENV === 'production' &&
      'PerformanceObserver' in window &&
      'performance' in window
    ) {
      // Initialize performance observers
      const entryTypes = ['paint', 'layout-shift', 'first-input', 'largest-contentful-paint'];
      entryTypes.forEach(entryType => {
        try {
          const po = new PerformanceObserver((list) => {
            list.getEntries().forEach(entry => {
              // Process and report the entry
              const metric = {
                name: entry.entryType,
                value: entry.entryType === 'layout-shift' ? (entry as any).value : entry.startTime,
                rating: 'poor' as const,
                delta: 0,
                id: generateWebVitalId(entry as any),
              };
              metric.rating = getWebVitalsScore(metric.value, metric.name);
              sendWebVitals(metric as WebVitalsMetric);
            });
          });
          po.observe({ entryTypes: [entryType] });
        } catch (e) {
          console.error(`Error observing ${entryType}:`, e);
        }
      });
    }
  } catch (e) {
    console.error('Error initializing web vitals:', e);
  }
}