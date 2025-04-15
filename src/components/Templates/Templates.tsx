'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Layout, Code, Box, Tags, Users, Shield } from 'lucide-react';

export default function Templates() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [hoveredTemplate, setHoveredTemplate] = useState<number | null>(null);

    const categories = [
        { id: 'all', name: 'All Templates' },
        { id: 'landing', name: 'Landing Pages' },
        { id: 'dashboard', name: 'Dashboards' },
        { id: 'ecommerce', name: 'E-commerce' },
        { id: 'portfolio', name: 'Portfolio' }
    ];

    const templates = [
        {
            id: 1,
            title: "Modern Dashboard",
            description: "Professional dashboard with analytics and data visualization",
            category: "dashboard",
            image: "/images/templates/dashboard.jpg",
            rating: 4.9,
            reviews: 128,
            tags: ["React", "TypeScript", "Tailwind"],
            gradient: "from-cyan-400 to-blue-500"
        },
        {
            id: 2,
            title: "E-commerce Store",
            description: "Full-featured online store with cart and checkout",
            category: "ecommerce",
            image: "/images/templates/ecommerce.jpg",
            rating: 4.8,
            reviews: 95,
            tags: ["Next.js", "Stripe", "Tailwind"],
            gradient: "from-purple-400 to-pink-500"
        },
        {
            id: 3,
            title: "Portfolio Pro",
            description: "Showcase your work with this stunning portfolio template",
            category: "portfolio",
            image: "/images/templates/portfolio.jpg",
            rating: 4.7,
            reviews: 84,
            tags: ["React", "Framer Motion", "GSAP"],
            gradient: "from-amber-400 to-orange-500"
        },
        {
            id: 4,
            title: "SaaS Landing",
            description: "Convert visitors with this optimized SaaS landing page",
            category: "landing",
            image: "/images/templates/saas.jpg",
            rating: 4.9,
            reviews: 156,
            tags: ["Next.js", "Animations", "SEO"],
            gradient: "from-green-400 to-emerald-500"
        },
        {
            id: 5,
            title: "Admin Panel",
            description: "Complete admin dashboard with user management",
            category: "dashboard",
            image: "/images/templates/admin.jpg",
            rating: 4.8,
            reviews: 112,
            tags: ["React", "Redux", "Material UI"],
            gradient: "from-rose-400 to-red-500"
        },
        {
            id: 6,
            title: "Agency Landing",
            description: "Perfect for creative agencies and digital studios",
            category: "landing",
            image: "/images/templates/agency.jpg",
            rating: 4.7,
            reviews: 73,
            tags: ["Next.js", "ThreeJS", "GSAP"],
            gradient: "from-indigo-400 to-violet-500"
        }
    ];

    const filteredTemplates = activeCategory === 'all' 
        ? templates 
        : templates.filter(template => template.category === activeCategory);

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
                                Ready-to-Use Templates
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
                        Jump-start your next project with our professionally designed templates
                    </motion.p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {categories.map((category, index) => (
                        <motion.button
                            key={category.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                            onClick={() => setActiveCategory(category.id)}
                            className={`
                                px-6 py-2 rounded-full text-sm font-medium
                                transition-all duration-300 
                                ${activeCategory === category.id 
                                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                                    : 'bg-gray-900 text-gray-400 hover:bg-gray-800'}
                            `}
                        >
                            {category.name}
                        </motion.button>
                    ))}
                </div>

                {/* Templates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredTemplates.map((template, index) => (
                        <motion.div
                            key={template.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                            onHoverStart={() => setHoveredTemplate(template.id)}
                            onHoverEnd={() => setHoveredTemplate(null)}
                            className="relative group"
                        >
                            <div className="relative z-10">
                                <div className={`
                                    relative overflow-hidden rounded-2xl
                                    bg-gray-900/50 backdrop-blur-sm border border-gray-800/50
                                    transition-all duration-500
                                    ${hoveredTemplate === template.id ? 'transform scale-[1.02] border-gray-700' : ''}
                                `}>
                                    {/* Template Preview */}
                                    <div className="relative h-48 overflow-hidden">
                                        <div className={`
                                            absolute inset-0 bg-gradient-to-br ${template.gradient}
                                            opacity-20
                                        `} />
                                        <div className="absolute inset-0 bg-gray-900/60" />
                                        <div className="absolute inset-0 p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center space-x-2">
                                                    <Star className="w-4 h-4 text-yellow-400" />
                                                    <span className="text-white font-medium">{template.rating}</span>
                                                    <span className="text-gray-400 text-sm">({template.reviews})</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Template Info */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-white mb-2">
                                            {template.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm mb-4">
                                            {template.description}
                                        </p>
                                        
                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {template.tags.map((tag, i) => (
                                                <span 
                                                    key={i}
                                                    className={`
                                                        px-3 py-1 rounded-full text-xs
                                                        bg-gray-800 text-gray-300
                                                        border border-gray-700
                                                    `}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Action Button */}
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`
                                                w-full py-3 px-4 rounded-xl
                                                bg-gradient-to-r ${template.gradient}
                                                text-white font-medium
                                                flex items-center justify-center gap-2
                                                group/button
                                            `}
                                        >
                                            Preview Template
                                            <ArrowRight className="w-4 h-4 group-hover/button:translate-x-1 transition-transform" />
                                        </motion.button>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Background Glow */}
                            <div className={`
                                absolute inset-0 bg-gradient-to-r ${template.gradient}
                                opacity-0 group-hover:opacity-10 blur-xl
                                transition-opacity duration-500 rounded-2xl
                            `} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}