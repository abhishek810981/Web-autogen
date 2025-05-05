import React from 'react';
import FeaturesPage from '@/components/FeaturesPage/featurepage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Features - Web-autogen',
  description: 'Learn about the powerful features of Web-autogen for web development and SEO.',
};

export default function Features() {
  return <FeaturesPage />;
}
