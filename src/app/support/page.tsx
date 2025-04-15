'use client';

import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Support from '@/components/Support/Support';

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <Support />
    </main>
  );
}