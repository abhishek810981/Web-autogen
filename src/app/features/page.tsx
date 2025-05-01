'use client';

import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import FeaturesPageComponent from '@/components/FeaturesPage/featurepage';
import JsonLdProvider from '@/components/JsonLd/JsonLdProvider';
import { createWebsiteSchema } from '@/components/JsonLd/jsonLdSchemas';

const features = [
  {
    title: 'AI-Powered Development',
    description: 'Leverage advanced AI algorithms to automate and enhance your development workflow.',
    benefits: ['Faster development cycles', 'Reduced errors', 'Automated code review'],
  },
  {
    title: 'Visual Development Tools',
    description: 'Create stunning interfaces with our intuitive visual development platform.',
    benefits: ['Drag-and-drop interface', 'Real-time preview', 'Component library'],
  },
  {
    title: 'Enterprise Solutions',
    description: 'Scale your applications with our enterprise-grade development platform.',
    benefits: ['Advanced security', 'Team collaboration', 'Custom workflows'],
  },
];

export default function Features() {
  const featureSchema = {
    '@type': 'ItemList',
    itemListElement: features.map((feature, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Thing',
        name: feature.title,
        description: feature.description,
        additionalProperty: feature.benefits.map(benefit => ({
          '@type': 'PropertyValue',
          name: 'benefit',
          value: benefit,
        })),
      },
    })),
  };

  const schemas = [
    createWebsiteSchema({
      potentialAction: {
        '@type': 'ViewAction',
        target: 'https://autogenlabs.com/features',
        name: 'View Features',
      }
    }),
  ];

  return (
    <>
      <JsonLdProvider schemas={schemas} />
      <main className="min-h-screen bg-black" role="main" aria-label="Features page">
        <Navbar />
        <div className="pt-4">
          <FeaturesPageComponent />
        </div>
      </main>
    </>
  );
}
