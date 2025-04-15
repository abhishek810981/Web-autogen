'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Search,
    ChevronDown, 
    Mail, 
    MessageSquare, 
    Book, 
    FileText, 
    Youtube,
    PhoneCall,
    AlertCircle,
    CheckCircle2
} from 'lucide-react';

export default function Support() {
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

    const faqs = [
        {
            id: 1,
            question: "How do I get started with AutoGen Labs?",
            answer: "Getting started is easy! Sign up for a free account, follow our quick-start guide, and you'll be building in minutes. Check out our documentation for detailed instructions and best practices."
        },
        {
            id: 2,
            question: "What are the system requirements?",
            answer: "Our platform runs in modern web browsers (Chrome, Firefox, Safari, Edge). For local development, you'll need Node.js 14+ and npm/yarn installed."
        },
        {
            id: 3,
            question: "How do I deploy my application?",
            answer: "We support one-click deployment to popular platforms like Vercel, Netlify, and AWS. Follow our deployment guide for step-by-step instructions."
        },
        {
            id: 4,
            question: "Do you offer technical support?",
            answer: "Yes! We provide 24/7 technical support through our help desk. Premium users get priority support with guaranteed response times."
        },
        {
            id: 5,
            question: "Can I use AutoGen Labs for commercial projects?",
            answer: "Absolutely! Our platform is perfect for commercial projects. Check our pricing page for details about commercial licenses and enterprise plans."
        }
    ];

    const resources = [
        {
            title: "Documentation",
            description: "Comprehensive guides and API references",
            icon: Book,
            link: "/docs",
            gradient: "from-blue-400 to-indigo-500"
        },
        {
            title: "Video Tutorials",
            description: "Step-by-step video guides and examples",
            icon: Youtube,
            link: "/tutorials",
            gradient: "from-red-400 to-pink-500"
        },
        {
            title: "API Reference",
            description: "Detailed API documentation and examples",
            icon: FileText,
            link: "/api",
            gradient: "from-green-400 to-emerald-500"
        },
        {
            title: "Community Forum",
            description: "Connect with other developers",
            icon: MessageSquare,
            link: "/community",
            gradient: "from-purple-400 to-violet-500"
        }
    ];

    const filteredFaqs = faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <section className="relative min-h-screen bg-gray-950 py-20 overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950" />
                <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 to-transparent opacity-70" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-4xl font-bold mb-6"
                    >
                        <span className="relative">
                            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                How Can We Help?
                            </span>
                            <div className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                        </span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-gray-400 max-w-2xl mx-auto"
                    >
                        Find answers, contact support, or explore our resources
                    </motion.p>
                </div>

                {/* Search */}
                <div className="max-w-3xl mx-auto mb-16">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search for help..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                        />
                    </motion.div>
                </div>

                {/* Quick Contact Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="p-6 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl hover:border-gray-700 transition-colors"
                    >
                        <div className="flex items-start space-x-4">
                            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500">
                                <Mail className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2">Email Support</h3>
                                <p className="text-gray-400 mb-4">Get help from our support team</p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-4 py-2 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg text-white font-medium"
                                >
                                    Send Email
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="p-6 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl hover:border-gray-700 transition-colors"
                    >
                        <div className="flex items-start space-x-4">
                            <div className="p-3 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500">
                                <PhoneCall className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2">Live Chat</h3>
                                <p className="text-gray-400 mb-4">Chat with our support team</p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg text-white font-medium"
                                >
                                    Start Chat
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Resources Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {resources.map((resource, index) => (
                        <motion.a
                            key={resource.title}
                            href={resource.link}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                            className="group relative p-6 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl hover:border-gray-700 transition-all duration-300"
                        >
                            <div className={`p-3 rounded-xl bg-gradient-to-br ${resource.gradient} mb-4`}>
                                <resource.icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">{resource.title}</h3>
                            <p className="text-gray-400 text-sm">{resource.description}</p>
                        </motion.a>
                    ))}
                </div>

                {/* FAQs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    className="max-w-3xl mx-auto"
                >
                    <h3 className="text-2xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h3>
                    <div className="space-y-4">
                        {filteredFaqs.map((faq) => (
                            <motion.div 
                                key={faq.id}
                                initial={false}
                                className="border border-gray-800 rounded-xl overflow-hidden"
                            >
                                <button
                                    onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                                    className="w-full p-4 flex items-center justify-between text-left bg-gray-900/50 hover:bg-gray-900/70 transition-colors"
                                >
                                    <span className="text-white font-medium">{faq.question}</span>
                                    <ChevronDown 
                                        className={`w-5 h-5 text-gray-400 transform transition-transform duration-300 ${
                                            expandedFaq === faq.id ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>
                                <AnimatePresence>
                                    {expandedFaq === faq.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-4 bg-gray-900/30 text-gray-400">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}