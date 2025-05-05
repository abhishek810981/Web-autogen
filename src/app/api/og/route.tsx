import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
 
export const runtime = 'edge';
 
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'AutoGen Labs';
    const description = searchParams.get('description') || 'Next Generation Development Platform';
    const type = searchParams.get('type') || 'website';

    const interRegular = await fetch(
      new URL('https://fonts.googleapis.com/css2?family=Inter&display=swap')
    ).then((res) => res.arrayBuffer());
    
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000',
            backgroundImage: 'radial-gradient(circle at 25px 25px, #333 2%, transparent 0%), radial-gradient(circle at 75px 75px, #333 2%, transparent 0%)',
            backgroundSize: '100px 100px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '40px',
              maxWidth: '80%',
            }}
          >
            <img
              src={new URL('/public/images/logo.png', import.meta.url).toString()}
              alt="Logo"
              width="120"
              height="120"
              style={{ marginBottom: '20px' }}
            />
            <h1
              style={{
                fontSize: '60px',
                fontFamily: 'Inter',
                background: 'linear-gradient(to bottom right, white, #888)',
                backgroundClip: 'text',
                color: 'transparent',
                margin: '0',
                marginBottom: '20px',
                textAlign: 'center',
                maxWidth: '800px',
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: '30px',
                fontFamily: 'Inter',
                color: '#888',
                margin: '0',
                textAlign: 'center',
                maxWidth: '600px',
              }}
            >
              {description}
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '40px',
              }}
            >
              {type === 'article' && (
                <span
                  style={{
                    backgroundColor: '#0070f3',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '20px',
                    fontFamily: 'Inter',
                  }}
                >
                  Read Article
                </span>
              )}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: interRegular,
            weight: 400,
            style: 'normal',
          },
        ],
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}