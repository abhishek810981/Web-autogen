import React from 'react';
import Hero from '@/components/Hero/Hero';
import Features from '@/components/Features/Features';
import Resources from '@/components/Resources/Resources';
import EnhancedLanding from '@/components/EnhancedLanding/EnhancedLanding';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Web-autogen',
  description: 'Generated by create next app',
};

export default function Home() {
  return <EnhancedLanding />;
}
