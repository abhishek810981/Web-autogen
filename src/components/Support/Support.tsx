'use client';

import React from 'react';
import { motion } from 'framer-motion';
import FaqSchema from './FaqSchema';
import { useIntersectionObserver } from '@/app/lib/useIntersectionObserver';
import { trackEvent } from '@/app/lib/analytics';

export default function Support() {
    const [setRef, isVisible] = useIntersectionObserver({
        threshold: 0.1,
        triggerOnce: true
    });

    const faqs = [
        {
            question: "How do I get started with AutoGen Labs?",
            answer: "Sign up for a free account and follow our interactive onboarding guide. You'll be up and running in minutes with our intuitive platform."
        },
        {
            question: "What are the system requirements?",
            answer: "AutoGen Labs works in any modern web browser. For optimal performance, we recommend Chrome, Firefox, or Safari latest versions."
        },
        {
            question: "Do you offer enterprise solutions?",
            answer: "Yes, we offer enterprise-grade solutions with custom features, dedicated support, and enhanced security measures."
        },
        {
            question: "How does the AI-powered development work?",
            answer: "Our AI analyzes your requirements and automatically generates optimized code, while learning from your preferences and coding style."
        }
    ];

    const supportCategories = [
        {
            title: "Documentation",
            description: "Comprehensive guides and API references",
            icon: "📚",
            link: "/docs"
        },
        {
            title: "Video Tutorials",
            description: "Step-by-step visual learning resources",
            icon: "🎥",
            link: "/tutorials"
        },
        {
            title: "Community Forum",
            description: "Connect with other developers",
            icon: "👥",
            link: "/community"
        },
        {
            title: "API Reference",
            description: "Detailed API documentation",
            icon: "🔧",
            link: "/api-docs"
        }
    ];

    const handleCategoryClick = (category: string) => {
        trackEvent({
            action: 'support_category_click',
            category: 'Support',
            label: category
        });
    };

    return (
        <main className="min-h-screen bg-gray-950 py-20" role="main">
            <FaqSchema items={faqs} />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        How can we help you?
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Find answers, documentation, and support from our community
                    </p>
                </header>

                {/* Support Categories */}
                <section 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
                    aria-labelledby="categories-heading"
                >
                    <h2 id="categories-heading" className="sr-only">Support Categories</h2>
                    {supportCategories.map((category, index) => (
                        <motion.article
                            key={category.title}
                            ref={index === 0 ? setRef : undefined}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50 hover:border-gray-700/50 transition-all"
                            onClick={() => handleCategoryClick(category.title)}
                        >
                            <div className="text-4xl mb-4">{category.icon}</div>
                            <h3 className="text-xl font-semibold text-white mb-2">{category.title}</h3>
                            <p className="text-gray-400 mb-4">{category.description}</p>
                            <a
                                href={category.link}
                                className="text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center"
                                aria-label={`Access ${category.title.toLowerCase()}`}
                            >
                                Learn more →
                            </a>
                        </motion.article>
                    ))}
                </section>

                {/* FAQ Section */}
                <section 
                    className="max-w-3xl mx-auto"
                    aria-labelledby="faq-heading"
                >
                    <h2 
                        id="faq-heading"
                        className="text-3xl font-bold text-white text-center mb-12"
                    >
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-8">
                        {faqs.map((faq, index) => (
                            <motion.article
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                                className="bg-gray-900/30 rounded-lg p-6"
                            >
                                <h3 className="text-xl font-semibold text-white mb-3">
                                    {faq.question}
                                </h3>
                                <p className="text-gray-400">{faq.answer}</p>
                            </motion.article>
                        ))}
                    </div>
                </section>

                {/* Contact Section */}
                <section 
                    className="mt-20 text-center"
                    aria-labelledby="contact-heading"
                >
                    <h2 
                        id="contact-heading"
                        className="text-2xl font-bold text-white mb-4"
                    >
                        Still need help?
                    </h2>
                    <p className="text-gray-400 mb-8">
                        Our support team is available 24/7 to assist you
                    </p>
                    <motion.a
                        href="/contact"
                        className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Contact Support
                    </motion.a>
                </section>
            </div>
        </main>
    );
}