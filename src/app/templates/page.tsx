import React from 'react';
import Templates from '@/components/Templates/Templates';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Templates - Web-autogen',
  description: 'Explore our collection of web development templates.',
};

export default function TemplatesPage() {
  return <Templates />;
}
