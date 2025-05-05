'use client';

import React from 'react';
import Image from 'next/image';
import { useLazyImage } from '@/app/lib/useIntersectionObserver';
import { generateImageSizes, generateImageSrcSet, generateAltText } from '@/app/lib/imageMetadata';
import Head from 'next/head';

interface OptimizedImageProps {
  src: string;
  alt?: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
  quality?: number;
  fill?: boolean;
  loading?: 'lazy' | 'eager';
  unoptimized?: boolean;
  blurDataUrl?: string;
  imageMetadata?: {
    title?: string;
    description?: string;
    license?: string;
  };
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  sizes,
  quality = 75,
  fill = false,
  loading,
  unoptimized = false,
  blurDataUrl,
  imageMetadata = {},
}: OptimizedImageProps) {
  const [setRef, currentSrc] = useLazyImage(src);
  const generatedAlt = alt || generateAltText(src, 'AutoGen Labs Image');
  const computedSizes = sizes || generateImageSizes();

  // Generate schema.org metadata for the image
  const imageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: src,
    url: typeof window !== 'undefined' ? window.location.href : '',
    width,
    height,
    caption: generatedAlt,
    name: imageMetadata.title || generatedAlt,
    description: imageMetadata.description || generatedAlt,
    license: imageMetadata.license || 'https://creativecommons.org/licenses/by/4.0/',
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(imageSchema) }}
        />
      </Head>
      <div ref={setRef as any} className={`relative ${className}`}>
        <Image
          src={currentSrc || src}
          alt={generatedAlt}
          width={width}
          height={height}
          quality={quality}
          priority={priority}
          sizes={computedSizes}
          fill={fill}
          loading={loading || (priority ? 'eager' : 'lazy')}
          unoptimized={unoptimized}
          className={className}
          placeholder={blurDataUrl ? 'blur' : 'empty'}
          blurDataURL={blurDataUrl}
        />
        <noscript>
          <img
            src={src}
            alt={generatedAlt}
            width={width}
            height={height}
            loading="lazy"
            className={className}
          />
        </noscript>
      </div>
    </>
  );
}