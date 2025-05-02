import React from 'react';
import Support from '@/components/Support/Support';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Support - Web-autogen',
  description: 'Get support for Web-autogen. Find answers to your questions and get help with any issues.',
};

export default function SupportPage() {
  return <Support />;
}
