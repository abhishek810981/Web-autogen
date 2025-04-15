'use client';

import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Templates from '@/components/Templates/Templates';

export default function TemplatesPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <Templates />
    </main>
  );
}