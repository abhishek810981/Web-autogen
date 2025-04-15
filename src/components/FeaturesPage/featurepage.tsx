'use client';

import React, { useState } from 'react';
import { Code, Rocket, Zap, Palette, Cloud, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FeaturesPageComponent() {
    const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

    const features = [
        {
            Icon: Code,
            title: "Design to Code",
            description: "Transform your designs into production-ready code automatically",
            gradient: "from-emerald-400 to-cyan-400",
            delay: 0.1
        },
        {
            Icon: Palette,
            title: "Visual Editor",
            description: "Intuitive drag-and-drop interface for rapid prototyping",
            gradient: "from-violet-400 to-fuchsia-400",
            delay: 0.2
        },
        {
            Icon: Cloud,
            title: "Cloud Deployment",
            description: "One-click deployment to your favorite cloud platform",
            gradient: "from-blue-400 to-indigo-400",
            delay: 0.3
        },
        {
            Icon: Rocket,
            title: "Performance",
            description: "Optimized for speed with automatic performance tuning",
            gradient: "from-orange-400 to-pink-400",
            delay: 0.4
        },
        {
            Icon: Lock,
            title: "Enterprise Security",
            description: "Bank-grade security with advanced encryption",
            gradient: "from-red-400 to-rose-400",
            delay: 0.5
        },
        {
            Icon: Zap,
            title: "AI-Powered",
            description: "Smart automation and intelligent suggestions",
            gradient: "from-amber-400 to-orange-400",
            delay: 0.6
        }
    ];

    return (
        <section className="relative min-h-screen bg-gray-950 overflow-hidden py-20">
            {/* Animated Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950" />
                <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 to-transparent opacity-70" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-4xl font-bold mb-6"
                    >
                        <span className="relative">
                            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                Next-Generation Features
                            </span>
                            <div className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                        </span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-gray-400 max-w-2xl mx-auto"
                    >
                        Experience the future of development with our cutting-edge toolset
                    </motion.p>
                </div>

                {/* Hexagonal Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: feature.delay }}
                            onHoverStart={() => setHoveredFeature(index)}
                            onHoverEnd={() => setHoveredFeature(null)}
                            className="relative group"
                        >
                            <div className="relative z-10 h-full">
                                <div className={`
                                    relative p-6 h-full bg-gray-900/50 backdrop-blur-sm
                                    rounded-2xl border border-gray-800/50
                                    transition-all duration-500 ease-out
                                    ${hoveredFeature === index ? 'transform scale-105 border-gray-700' : ''}
                                `}>
                                    {/* Feature Icon */}
                                    <div className={`
                                        w-12 h-12 mb-4 rounded-xl
                                        bg-gradient-to-br ${feature.gradient}
                                        flex items-center justify-center
                                        transform transition-transform duration-500
                                        ${hoveredFeature === index ? 'scale-110 rotate-12' : ''}
                                    `}>
                                        <feature.Icon className="w-6 h-6 text-white" />
                                    </div>

                                    {/* Feature Content */}
                                    <h3 className="text-xl font-semibold mb-2 text-white">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm">
                                        {feature.description}
                                    </p>

                                    {/* Interactive Elements */}
                                    <div className={`
                                        absolute bottom-4 right-4
                                        transform transition-all duration-500
                                        ${hoveredFeature === index ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}
                                    `}>
                                        <div className={`p-2 rounded-full bg-gradient-to-r ${feature.gradient}`}>
                                            <Code className="w-4 h-4 text-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Background Elements */}
                            <div className={`
                                absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0
                                group-hover:opacity-10 blur-xl transition-opacity duration-500
                                rounded-2xl
                            `} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
