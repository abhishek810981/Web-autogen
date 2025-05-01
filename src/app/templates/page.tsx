'use client';

import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Templates from '@/components/Templates/Templates';
import JsonLdProvider from '@/components/JsonLd/JsonLdProvider';
import { createWebsiteSchema } from '@/components/JsonLd/jsonLdSchemas';
import { metadata } from './metadata';

// This would typically come from your CMS or template management system
const templates = [
  {
    id: 'ai-dashboard',
    title: 'AI Dashboard Template',
    description: 'Ready-to-use AI analytics dashboard with customizable visualizations',
    category: 'Analytics',
    framework: 'Next.js',
    features: ['Real-time analytics', 'AI predictions', 'Custom charts'],
    image: '/images/templates/ai-dashboard.webp',
  },
  {
    id: 'enterprise-portal',
    title: 'Enterprise Portal Template',
    description: 'Secure and scalable enterprise portal with role-based access',
    category: 'Enterprise',
    framework: 'Next.js',
    features: ['Authentication', 'Role management', 'Analytics'],
    image: '/images/templates/enterprise-portal.webp',
  },
  {
    id: 'visual-builder',
    title: 'Visual Builder Template',
    description: 'Drag-and-drop interface builder with component library',
    category: 'Visual Development',
    framework: 'Next.js',
    features: ['Component library', 'Live preview', 'Code export'],
    image: '/images/templates/visual-builder.webp',
  },
];

export default function TemplatesPage() {
  const templateSchema = {
    '@type': 'ItemList',
    itemListElement: templates.map((template, index) => ({
      '@type': 'SoftwareApplication',
      position: index + 1,
      name: template.title,
      description: template.description,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        category: template.category,
      },
      featureList: template.features.join(', '),
      screenshot: template.image,
    })),
  };

  const schemas = [
    {
      type: 'WebSite',
      data: {
        ...templateSchema,
        ...createWebsiteSchema().data,
      },
    },
  ];

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <JsonLdProvider schemas={schemas} />
      <Templates />
    </main>
  );
}
