'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star, Layout, Code, Box, Tags, Users, Shield, Clock, ChevronRight } from 'lucide-react';
import Image from 'next/image';

export default function Templates() {
    const [activeCategory, setActiveCategory] = useState('all');
    const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});
    const [expandedTemplate, setExpandedTemplate] = useState<number | null>(null);

    // Handle video play/pause when visible
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const templateId = parseInt(entry.target.getAttribute('data-template-id') || '0');
                const videoElement = videoRefs.current[templateId];
                
                if (videoElement) {
                    if (entry.isIntersecting) {
                        videoElement.play().catch(error => {
                            console.error(`Video playback failed for template ${templateId}:`, error);
                        });
                    } else {
                        videoElement.pause();
                    }
                }
            });
        }, options);

        // Observe all template containers
        document.querySelectorAll('.template-container').forEach(container => {
            observer.observe(container);
        });

        return () => {
            observer.disconnect();
        };
    }, [activeCategory]);

    const categories = [
        { id: 'all', name: 'All Templates', icon: Layout },
        { id: 'landing', name: 'Landing Pages', icon: Box },
        { id: 'dashboard', name: 'Dashboards', icon: Layout },
        { id: 'ecommerce', name: 'E-commerce', icon: Tags },
        { id: 'portfolio', name: 'Portfolio', icon: Users }
    ];

    const templates = [
        {
            id: 1,
            title: "Modern Dashboard",
            description: "Professional dashboard with analytics and data visualization. Includes interactive charts, user management, and customizable widgets.",
          
            category: "dashboard",
            image: "/images/logo.png",
            hasVideo: true,
            videoSrc: "/video/Screen Recording 2025-05-04 214728.mp4",
            rating: 4.9,
            reviews: 128,
            tags: ["React", "TypeScript", "Tailwind"],
            gradient: "from-cyan-400 to-blue-500",
            demoUrl: "#",
            setupTime: "5 min",
            lastUpdated: "May 2025"
        },
        {
            id: 2,
            title: "E-commerce Store",
            description: "Full-featured online store with cart, checkout, and payment integration. Perfect for retailers and digital product sellers.",
          
            category: "ecommerce",
            image: "/images/templates/ecommerce.jpg",
            hasVideo: true,
            videoSrc: "/video/Screen Recording 2025-05-04 221700.mp4",
            rating: 4.8,
            reviews: 95,
            tags: ["React", "Next.js", "Stripe"],
            gradient: "from-pink-400 to-purple-500",
            demoUrl: "#",
            setupTime: "10 min",
            lastUpdated: "April 2025"
        },
        {
            id: 3,
            title: "Portfolio Pro",
            description: "Showcase your work with this stunning portfolio template. Features project gallery, testimonials section, and contact form.",
          
            category: "portfolio",
            image: "/images/templates/portfolio.jpg",
            hasVideo: true,
            videoSrc: "/video/Screen Recording 2025-05-04 223035.mp4",
            rating: 4.7,
            reviews: 76,
            tags: ["React", "Framer Motion", "Tailwind"],
            gradient: "from-amber-400 to-orange-500",
            demoUrl: "#",
            setupTime: "3 min",
            lastUpdated: "May 2025"
        },
        {
            id: 4,
            title: "SaaS Landing",
            description: "Convert visitors with this optimized SaaS landing page. Includes pricing tables, feature highlights, and optimized CTA sections.",
           
            category: "landing",
            image: "/images/templates/portfolio.jpg",
            hasVideo: true,
            videoSrc: "/video/Screen Recording 2025-05-04 224508.mp4",
            rating: 4.9,
            reviews: 112,
            tags: ["React", "TypeScript", "Tailwind"],
            gradient: "from-green-400 to-teal-500",
            demoUrl: "#",
            setupTime: "5 min",
            lastUpdated: "April 2025"
        },
        {
            id: 5,
            title: "Admin Panel",
            description: "Complete admin dashboard with user management, analytics, and role-based permissions. Perfect for SaaS applications.",
          
            category: "dashboard",
            image: "/images/templates/admin.jpg",
            hasVideo: true,
            videoSrc: "/video/Screen Recording 2025-05-04 230157.mp4",
            rating: 4.8,
            reviews: 87,
            tags: ["React", "Redux", "Tailwind"],
            gradient: "from-blue-400 to-indigo-500",
            demoUrl: "#",
            setupTime: "8 min",
            lastUpdated: "May 2025"
        },
        {
            id: 6,
            title: "Agency Landing",
            description: "Perfect for creative agencies and digital studios. Includes case studies, team showcase, and service offerings sections.",
          
            category: "landing",
            image: "/images/templates/agency.jpg",
            hasVideo: true,
            videoSrc: "/video/Screen Recording 2025-05-04 225706.mp4",
            rating: 4.7,
            reviews: 64,
            tags: ["React", "Next.js", "GSAP"],
            gradient: "from-purple-400 to-pink-500",
            demoUrl: "#",
            setupTime: "5 min",
            lastUpdated: "May 2025"
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
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full filter blur-[120px] opacity-30" />
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
                    {categories.map((category, index) => {
                        const Icon = category.icon;
                        return (
                            <motion.button
                                key={category.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                                onClick={() => setActiveCategory(category.id)}
                                className={`
                                    px-6 py-2 rounded-full text-sm font-medium
                                    transition-all duration-300 flex items-center gap-2
                                    ${activeCategory === category.id 
                                        ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                                        : 'bg-gray-900 text-gray-400 hover:bg-gray-800'}
                                `}
                            >
                                <Icon className="w-4 h-4" />
                                {category.name}
                            </motion.button>
                        );
                    })}
                </div>

                {/* Templates List - Vertical Layout */}
                <div className="space-y-16">
                    {filteredTemplates.map((template, index) => (
                        <motion.div
                            key={template.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: index * 0.1 }}
                            className={`
                                template-container relative
                                ${index % 2 === 0 ? '' : 'bg-gradient-to-b from-gray-900/30 to-transparent'}
                                rounded-3xl p-6 overflow-hidden
                            `}
                            data-template-id={template.id}
                        >
                            {/* Background Glow */}
                            <div className={`
                                absolute -z-10 inset-0 opacity-20
                                bg-gradient-to-tr ${template.gradient}
                                rounded-3xl blur-xl
                            `} />

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Left Side - Template Details */}
                                <div className="relative">
                                    <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl border border-gray-800/50 p-8 h-full relative overflow-hidden">
                                        {/* Background Gradient */}
                                        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${template.gradient}`} />
                                        
                                        {/* Template Information */}
                                        <div className="relative z-10">
                                            <div className="flex items-center justify-between mb-4">
                                                <h2 className="text-2xl font-bold text-white">{template.title}</h2>
                                                <div className="flex items-center space-x-2 bg-gray-800/50 px-3 py-1 rounded-full">
                                                    <Star className="w-4 h-4 text-yellow-400" />
                                                    <span className="text-white font-medium">{template.rating}</span>
                                                    <span className="text-gray-400 text-sm">({template.reviews})</span>
                                                </div>
                                            </div>
                                            
                                            <p className="text-gray-300 mb-6">{template.description}</p>
                                            
                                           
                                            
                                            <div className="grid grid-cols-2 gap-4 mb-6">
                                                <div className="bg-gray-800/50 rounded-lg p-4">
                                                    <p className="text-gray-400 text-sm">Setup Time</p>
                                                    <div className="flex items-center mt-1">
                                                        <Clock className="w-4 h-4 text-blue-400 mr-2" />
                                                        <p className="text-white">{template.setupTime}</p>
                                                    </div>
                                                </div>
                                                <div className="bg-gray-800/50 rounded-lg p-4">
                                                    <p className="text-gray-400 text-sm">Last Updated</p>
                                                    <p className="text-white mt-1">{template.lastUpdated}</p>
                                                </div>
                                            </div>
                                            
                                            {/* Tags */}
                                            <div className="mb-6">
                                                <h3 className="text-white font-medium mb-3">Technologies</h3>
                                                <div className="flex flex-wrap gap-2">
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
                                            </div>
                                            
                                            {/* Action Buttons */}
                                            <div className="flex gap-4">
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className={`
                                                        flex-1 py-3 px-4 rounded-xl
                                                        bg-gradient-to-r ${template.gradient}
                                                        text-white font-medium
                                                        flex items-center justify-center gap-2
                                                        group/button
                                                    `}
                                                >
                                                    Live Demo
                                                    <ArrowRight className="w-4 h-4 group-hover/button:translate-x-1 transition-transform" />
                                                </motion.button>
                                                
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className={`
                                                        flex-1 py-3 px-4 rounded-xl
                                                        bg-gray-800 text-white font-medium
                                                        border border-gray-700
                                                        hover:bg-gray-700 transition-colors
                                                    `}
                                                >
                                                    Use Template
                                                </motion.button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Right Side - Video Preview with 3D Effect */}
                                <div className="relative perspective-1000">
                                    <div
                                        className="
                                            relative rounded-2xl overflow-hidden shadow-2xl
                                            transform hover:scale-[1.02] transition-transform duration-500
                                            hover:shadow-lg hover:shadow-blue-500/10
                                        "
                                        style={{
                                            transform: 'rotateY(-5deg) rotateX(2deg)',
                                            transformStyle: 'preserve-3d',
                                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)'
                                        }}
                                    >
                                        {/* Main Video */}
                                        <div className="relative h-[400px] w-full bg-gray-800 overflow-hidden rounded-2xl">
                                            {template.hasVideo && (
                                                <video 
                                                    ref={el => { if (el) videoRefs.current[template.id] = el; }}
                                                    className="absolute inset-0 object-cover w-full h-full"
                                                    src={template.videoSrc}
                                                    muted
                                                    playsInline
                                                    loop
                                                />
                                            )}
                                            
                                            {/* Reflection Effect */}
                                            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-gray-900/80 to-transparent pointer-events-none" />
                                            
                                            {/* Frame Effect */}
                                            <div className="absolute inset-0 border border-gray-500/30 rounded-2xl pointer-events-none" />
                                            <div className="absolute inset-0 border-t border-white/20 rounded-t-2xl pointer-events-none" />
                                            
                                            {/* Browser-like Top Bar */}
                                            <div className="absolute top-0 left-0 right-0 h-8 bg-gray-800 flex items-center px-4 border-b border-gray-700/50">
                                                <div className="flex space-x-2">
                                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                                </div>
                                                <div className="mx-auto bg-gray-700/50 rounded-full px-4 py-0.5 text-xs text-gray-300">
                                                    {template.title} Preview
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* 3D Edge Effect */}
                                        <div 
                                            className="absolute -bottom-2 left-2 right-2 h-2 bg-gray-700 blur-sm"
                                            style={{
                                                transform: 'rotateX(80deg)',
                                                transformStyle: 'preserve-3d'
                                            }}
                                        />
                                    </div>

                                    {/* Decorative Elements */}
                                    <div className="absolute -z-10 -bottom-10 -right-10 w-32 h-32 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-xl" />
                                    <div className="absolute -z-10 -top-10 -left-10 w-32 h-32 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-xl" />
                                </div>
                            </div>
                            
                            {/* Separator */}
                            {index < filteredTemplates.length - 1 && (
                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
