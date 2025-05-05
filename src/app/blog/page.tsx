import React from 'react';
import Blog from '@/components/Blog/Blog';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Web-autogen',
  description: 'Read our latest blog posts about web development, SEO, and more.',
};

export default function BlogPage() {
  return <Blog />;
}
