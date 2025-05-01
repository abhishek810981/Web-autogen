'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import Head from 'next/head';

export default function Blog() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');

    const categories = [
        { id: 'all', name: 'All Posts' },
        { id: 'tutorials', name: 'Tutorials' },
        { id: 'guides', name: 'Guides' },
        { id: 'news', name: 'News' },
        { id: 'case-studies', name: 'Case Studies' }
    ];

    const blogPosts = [
        {
            id: 1,
            title: "Building Modern UIs with Our Visual Editor",
            excerpt: "Learn how to create stunning user interfaces without writing a single line of code using our visual editor.",
            category: "tutorials",
            author: {
                name: "Alex Morgan",
                avatar: "/images/blog/authors/alex.jpg"
            },
            date: "2025-04-10",
            readTime: "8 min read",
            image: "/images/blog/visual-editor.jpg",
            tags: ["UI Design", "No-Code", "Tutorial"],
            gradient: "from-blue-400 to-indigo-500"
        },
        {
            id: 2,
            title: "Maximizing Performance with AI-Powered Optimization",
            excerpt: "Discover how our AI technology automatically optimizes your applications for peak performance.",
            category: "guides",
            author: {
                name: "Sarah Chen",
                avatar: "/images/blog/authors/sarah.jpg"
            },
            date: "2025-04-08",
            readTime: "12 min read",
            image: "/images/blog/ai-optimization.jpg",
            tags: ["AI", "Performance", "Optimization"],
            gradient: "from-purple-400 to-pink-500"
        },
        {
            id: 3,
            title: "Success Story: How Company X Scaled Their Platform",
            excerpt: "Learn how Company X used our platform to scale their application to millions of users.",
            category: "case-studies",
            author: {
                name: "James Wilson",
                avatar: "/images/blog/authors/james.jpg"
            },
            date: "2025-04-05",
            readTime: "10 min read",
            image: "/images/blog/success-story.jpg",
            tags: ["Case Study", "Scaling", "Success Story"],
            gradient: "from-amber-400 to-orange-500"
        },
        {
            id: 4,
            title: "Introducing: Real-Time Collaboration Features",
            excerpt: "We're excited to announce our new suite of real-time collaboration tools for teams.",
            category: "news",
            author: {
                name: "Emma Davis",
                avatar: "/images/blog/authors/emma.jpg"
            },
            date: "2025-04-01",
            readTime: "5 min read",
            image: "/images/blog/collaboration.jpg",
            tags: ["New Features", "Collaboration", "Teams"],
            gradient: "from-green-400 to-emerald-500"
        }
    ];

    const filteredPosts = blogPosts
        .filter(post => activeCategory === 'all' || post.category === activeCategory)
        .filter(post => 
            searchQuery === '' || 
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
        );

    // Schema.org structured data for blog posts
    const blogSchema = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "headline": "AutoGen Labs Blog",
        "description": "Latest updates, tutorials, and insights about AI development and visual tools",
        "author": {
            "@type": "Organization",
            "name": "AutoGen Labs"
        },
        "blogPost": blogPosts.map(post => ({
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "author": {
                "@type": "Person",
                "name": post.author.name
            },
            "datePublished": post.date,
            "keywords": post.tags.join(", ")
        }))
    };

    return (
        <>
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
                />
            </Head>
            <main role="main" className="relative min-h-screen bg-gray-950 py-20 overflow-hidden">
                {/* Background effects */}
                <div className="absolute inset-0" aria-hidden="true">
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950" />
                    <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 to-transparent opacity-70" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    {/* Header */}
                    <header role="banner" className="text-center mb-16">
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-3xl md:text-4xl font-bold mb-6"
                        >
                            <span className="relative">
                                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                    Latest from Our Blog
                                </span>
                                <div className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                            </span>
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-gray-400 max-w-2xl mx-auto"
                        >
                            Stay up to date with the latest news, tutorials, and insights from our team
                        </motion.p>
                    </header>

                    {/* Search */}
                    <div className="max-w-3xl mx-auto mb-12">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative"
                        >
                            <label htmlFor="search-input" className="sr-only">Search articles</label>
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
                            <input
                                id="search-input"
                                type="search"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                                role="searchbox"
                                aria-label="Search blog posts"
                            />
                        </motion.div>
                    </div>

                    {/* Categories */}
                    <nav role="navigation" aria-label="Blog categories" className="flex flex-wrap justify-center gap-4 mb-16">
                        {categories.map((category, index) => (
                            <motion.button
                                key={category.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                                onClick={() => setActiveCategory(category.id)}
                                className={`
                                    px-6 py-2 rounded-full text-sm font-medium
                                    transition-all duration-300 
                                    ${activeCategory === category.id 
                                        ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                                        : 'bg-gray-900 text-gray-400 hover:bg-gray-800'}
                                `}
                                aria-pressed={activeCategory === category.id}
                                aria-label={`Filter by ${category.name}`}
                            >
                                {category.name}
                            </motion.button>
                        ))}
                    </nav>

                    {/* Blog Posts Grid */}
                    <section 
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                        aria-label="Blog posts"
                    >
                        {filteredPosts.length === 0 ? (
                            <p className="text-gray-400 text-center col-span-full">
                                No posts found matching your search criteria
                            </p>
                        ) : (
                            filteredPosts.map((post, index) => (
                                <motion.article
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                                    className="relative group"
                                >
                                    <div className="relative overflow-hidden rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 transition-all duration-500 hover:border-gray-700">
                                        {/* Post Image */}
                                        <div className="relative h-48 overflow-hidden">
                                            <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-20`} />
                                            <div className="absolute inset-0 bg-gray-900/60" />
                                        </div>

                                        {/* Post Content */}
                                        <div className="p-6">
                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {post.tags.map((tag, i) => (
                                                    <span 
                                                        key={i}
                                                        className="px-3 py-1 rounded-full text-xs bg-gray-800 text-gray-300 border border-gray-700"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">
                                                {post.title}
                                            </h3>
                                            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                                {post.excerpt}
                                            </p>

                                            {/* Meta Information */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-4">
                                                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                                                        <Calendar className="w-4 h-4" />
                                                        <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                                                        <Clock className="w-4 h-4" />
                                                        <span>{post.readTime}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Read More Button */}
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className={`
                                                    w-full mt-6 py-3 px-4 rounded-xl
                                                    bg-gradient-to-r ${post.gradient}
                                                    text-white font-medium
                                                    flex items-center justify-center gap-2
                                                    group/button
                                                `}
                                            >
                                                Read More
                                                <ArrowRight className="w-4 h-4 group-hover/button:translate-x-1 transition-transform" />
                                            </motion.button>
                                        </div>
                                    </div>

                                    {/* Decorative Background Glow */}
                                    <div className={`
                                        absolute inset-0 bg-gradient-to-r ${post.gradient}
                                        opacity-0 group-hover:opacity-10 blur-xl
                                        transition-opacity duration-500 rounded-2xl
                                    `} />
                                </motion.article>
                            ))
                        )}
                    </section>
                </div>
            </main>
        </>
    );
}