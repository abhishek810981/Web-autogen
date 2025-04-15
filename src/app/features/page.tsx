'use client';

import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import FeaturesPageComponent from '@/components/FeaturesPage/featurepage';

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-4">
        
        <FeaturesPageComponent />
      </div>
    </main>
  );
}