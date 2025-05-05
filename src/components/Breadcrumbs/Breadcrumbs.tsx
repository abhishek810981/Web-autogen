'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import Head from 'next/head';

export default function Breadcrumbs() {
  const pathname = usePathname();
  const paths = pathname.split('/').filter(path => path);
  
  // Generate breadcrumb items with proper URLs
  const breadcrumbs = paths.map((path, index) => {
    const href = '/' + paths.slice(0, index + 1).join('/');
    const label = path.charAt(0).toUpperCase() + path.slice(1);
    return { href, label };
  });

  // Generate structured data for breadcrumbs
  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://autogenlabs.com"
      },
      ...breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": crumb.label,
        "item": `https://autogenlabs.com${crumb.href}`
      }))
    ]
  };

  if (paths.length === 0) return null;

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
        />
      </Head>
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link
              href="/"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Home
            </Link>
          </li>
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.href}>
              <ChevronRight className="w-4 h-4 text-gray-600" aria-hidden="true" />
              <li>
                <Link
                  href={crumb.href}
                  className={`${
                    index === breadcrumbs.length - 1
                      ? 'text-white font-medium'
                      : 'text-gray-400 hover:text-white'
                  } transition-colors`}
                  aria-current={index === breadcrumbs.length - 1 ? 'page' : undefined}
                >
                  {crumb.label}
                </Link>
              </li>
            </React.Fragment>
          ))}
        </ol>
      </nav>
    </>
  );
}