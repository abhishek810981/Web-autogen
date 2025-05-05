import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Features - AutoGen Labs Development Platform',
  description: 'Explore AI-powered development tools, visual interfaces, and enterprise solutions. Transform your development workflow with AutoGen Labs innovative features.',
  openGraph: {
    title: 'Features - AutoGen Labs Development Platform',
    description: 'Transform your development workflow with AI-powered tools and visual development solutions.',
    url: 'https://autogenlabs.com/features',
    type: 'website',
    images: [
      {
        url: '/api/og?title=Features&description=AI-Powered Development Tools&type=features',
        width: 1200,
        height: 630,
        alt: 'AutoGen Labs Features',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Features - AutoGen Labs Platform',
    description: 'Transform your development workflow with AI-powered tools',
    images: ['/api/og?title=Features&description=AI-Powered Development Tools&type=features'],
  },
};
