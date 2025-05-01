'use client';

import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Blog from '@/components/Blog/Blog';
import JsonLdProvider from '@/components/JsonLd/JsonLdProvider';
import { createWebsiteSchema, createArticleSchema } from '@/components/JsonLd/jsonLdSchemas';
import { metadata } from './metadata';

// This would typically come from your CMS or blog content API
const blogPosts = [
  {
    title: 'Getting Started with AI-Powered Development',
    description: 'Learn how to leverage AI to enhance your development workflow',
    author: 'AutoGen Labs Team',
    date: '2025-04-15',
    image: '/images/blog/ai-development.webp',
    slug: 'getting-started-ai-development',
    category: 'AI Development',
  },
  {
    title: 'Visual Development Best Practices',
    description: 'Best practices for creating intuitive interfaces with visual tools',
    author: 'Design Team',
    date: '2025-04-14',
    image: '/images/blog/visual-development.webp',
    slug: 'visual-development-best-practices',
    category: 'Visual Tools',
  },
  {
    title: 'Enterprise Solution Architecture',
    description: 'Building scalable enterprise solutions with AutoGen Labs',
    author: 'Enterprise Team',
    date: '2025-04-13',
    image: '/images/blog/enterprise-solutions.webp',
    slug: 'enterprise-solution-architecture',
    category: 'Enterprise',
  },
];

export default function BlogPage() {
  const blogListSchema = {
    '@type': 'Blog',
    headline: 'AutoGen Labs Development Blog',
    description: metadata.description,
    author: {
      '@type': 'Organization',
      name: 'AutoGen Labs',
      url: 'https://autogenlabs.com',
    },
    blogPost: blogPosts.map(post => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      author: {
        '@type': 'Person',
        name: post.author,
      },
      datePublished: post.date,
      image: post.image,
      articleSection: post.category,
    })),
  };

  const schemas = [
    {
      type: 'WebSite',
      data: {
        ...blogListSchema,
        ...createWebsiteSchema().data,
      },
    },
  ];

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <JsonLdProvider schemas={schemas} />
      <Blog />
    </main>
  );
}
