'use client';

import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Blog from '@/components/Blog/Blog';

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <Blog />
    </main>
  );
}