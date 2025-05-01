'use client';

import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Support from '@/components/Support/Support';
import JsonLdProvider from '@/components/JsonLd/JsonLdProvider';
import { createWebsiteSchema } from '@/components/JsonLd/jsonLdSchemas';
import { metadata } from './metadata';

// This would typically come from your CMS or knowledge base
const faqs = [
  {
    question: 'What is AutoGen Labs?',
    answer: 'AutoGen Labs is a next-generation development platform that combines AI-powered tools, visual development interfaces, and enterprise-grade solutions to streamline your development workflow.',
    category: 'General',
  },
  {
    question: 'How does the AI development feature work?',
    answer: 'Our AI development tools analyze your code patterns, suggest improvements, and automate repetitive tasks. The system learns from your coding style to provide personalized suggestions.',
    category: 'AI Features',
  },
  {
    question: 'Can I use custom templates in the visual builder?',
    answer: 'Yes, you can create, import, and customize templates in our visual builder. Templates support component inheritance and can be shared across your team.',
    category: 'Visual Development',
  },
  {
    question: 'What enterprise features are available?',
    answer: 'Enterprise features include role-based access control, audit logging, custom workflows, SSO integration, and dedicated support with guaranteed SLAs.',
    category: 'Enterprise',
  },
];

export default function SupportPage() {
  const faqSchema = {
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const schemas = [
    {
      type: 'WebSite',
      data: {
        ...faqSchema,
        ...createWebsiteSchema().data,
      },
    },
  ];

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <JsonLdProvider schemas={schemas} />
      <Support />
    </main>
  );
}
