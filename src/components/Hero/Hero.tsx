'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';

export default function Hero() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "AutoGen Labs",
        "applicationCategory": "DeveloperApplication",
        "description": "AI-powered development platform for building modern applications",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        }
    };

    return (
        <>
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />
            </Head>
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden" aria-label="Hero Section">
                {/* Background effects */}
                <div className="absolute inset-0 bg-black">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-blue-500/20 rounded-full blur-[100px] opacity-50" />
                    <div className="absolute bottom-0 left-1/4 w-[800px] h-[800px] bg-indigo-500/20 rounded-full blur-[100px] opacity-50" />
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                                Step into the future
                            </span>
                            <br />
                            <span className="bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
                                of development
                            </span>
                        </h1>

                        <p className="text-gray-400 text-xl md:text-2xl max-w-2xl mx-auto mb-12" role="doc-subtitle">
                            Join thousands of developers and teams using our platform to turn ideas into high-performing websites, fast.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.a
                                href="/signup"
                                className="px-8 py-4 rounded-lg bg-gradient-to-r from-blue-500 to-violet-500 text-white font-semibold hover:opacity-90 transition-opacity"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                role="button"
                                aria-label="Get started for free"
                            >
                                Get started for free
                            </motion.a>
                            <motion.a
                                href="/features"
                                className="px-8 py-4 rounded-lg border border-gray-700 text-white hover:bg-gray-800/50 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                role="button"
                                aria-label="Learn more about our features"
                            >
                                Learn more
                            </motion.a>
                        </div>

                        {/* Floating badges */}
                        <div className="mt-16 flex justify-center gap-8" aria-label="Platform statistics">
                            <motion.div
                                className="px-6 py-2 rounded-full bg-gray-900/80 border border-gray-800 backdrop-blur-sm"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                            >
                                <span className="text-gray-400">⭐️ 4.9/5 Rating</span>
                            </motion.div>
                            <motion.div
                                className="px-6 py-2 rounded-full bg-gray-900/80 border border-gray-800 backdrop-blur-sm"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.7, duration: 0.8 }}
                            >
                                <span className="text-gray-400">🚀 10k+ Users</span>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
