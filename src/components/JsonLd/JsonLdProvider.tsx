'use client';

import React from 'react';
import Head from 'next/head';
import { usePathname } from 'next/navigation';

interface JsonLdProps {
  type: 'Website' | 'Organization' | 'BreadcrumbList' | 'Article' | 'Product' | 'FAQPage' | string;
  data: Record<string, any>;
}

interface JsonLdProviderProps {
  schemas: JsonLdProps[];
}

export function JsonLd({ type, data }: JsonLdProps) {
  const pathname = usePathname();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://autogenlabs.com';

  const schema = {
    '@context': 'https://schema.org',
    '@type': type,
    url: `${baseUrl}${pathname}`,
    ...data,
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        key={`jsonld-${type}`}
      />
    </Head>
  );
}

export default function JsonLdProvider({ schemas }: JsonLdProviderProps) {
  return (
    <>
      {schemas.map((schema, index) => (
        <JsonLd key={`${schema.type}-${index}`} {...schema} />
      ))}
    </>
  );
}
