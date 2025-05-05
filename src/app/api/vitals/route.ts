import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { WebVitalsMetric } from '@/app/lib/web-vitals';

export async function POST(request: NextRequest) {
  try {
    const body: WebVitalsMetric = await request.json();

    // Log metrics in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Web Vitals]:', {
        url: request.headers.get('referer'),
        metric: body,
      });
    }

    // In production, you would typically:
    // 1. Send to analytics service (Google Analytics, etc.)
    // 2. Store in a database for analysis
    // 3. Send to monitoring service (New Relic, DataDog, etc.)
    
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to Google Analytics
      if (body && (body as any).name) {
        const eventName = `web-vitals-${(body as any).name.toLowerCase()}`;
        const analyticsBody = {
          name: eventName,
          value: Math.round((body as any).value),
          rating: (body as any).rating,
          id: (body as any).id,
          page: request.headers.get('referer'),
          timeStamp: new Date().toISOString(),
        };

        // This would be your analytics service endpoint
        await fetch(process.env.ANALYTICS_ENDPOINT || '', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(analyticsBody),
        }).catch(console.error);
      }
    }

    return NextResponse.json(
      { message: 'Metrics received' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Web Vitals Error]:', error);
    return NextResponse.json(
      { message: 'Error processing metrics' },
      { status: 500 }
    );
  }
}