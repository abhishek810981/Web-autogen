'use client';

import React, { useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Code, Rocket, Zap, Layout, Shield, Cloud } from 'lucide-react';

export default function FeatureCards() {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const features = [
        {
            icon: Code,
            title: "Smart Code Generation",
            description: "Transform designs into production-ready code with AI-powered automation",
            gradient: "from-cyan-400 via-blue-500 to-indigo-500",
            glowColor: "rgba(56, 189, 248, 0.2)"
        },
        {
            icon: Layout,
            title: "Responsive Layouts",
            description: "Create fluid layouts that adapt seamlessly to any screen size",
            gradient: "from-violet-400 via-purple-500 to-fuchsia-500",
            glowColor: "rgba(167, 139, 250, 0.2)"
        },
        {
            icon: Shield,
            title: "Enterprise Security",
            description: "Bank-grade security with advanced encryption and compliance",
            gradient: "from-emerald-400 via-teal-500 to-cyan-500",
            glowColor: "rgba(52, 211, 153, 0.2)"
        },
        {
            icon: Cloud,
            title: "Cloud Integration",
            description: "Seamless deployment to your preferred cloud platform",
            gradient: "from-rose-400 via-pink-500 to-purple-500",
            glowColor: "rgba(251, 113, 133, 0.2)"
        },
        {
            icon: Zap,
            title: "Performance Optimization",
            description: "Automatic performance tuning and code optimization",
            gradient: "from-amber-400 via-orange-500 to-red-500",
            glowColor: "rgba(251, 191, 36, 0.2)"
        },
        {
            icon: Rocket,
            title: "Quick Deployment",
            description: "Deploy your applications with a single click",
            gradient: "from-lime-400 via-green-500 to-emerald-500",
            glowColor: "rgba(132, 204, 22, 0.2)"
        }
    ];

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>, index: number) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = (event.clientX - centerX) / 10;
        const distanceY = (event.clientY - centerY) / 10;

        mouseX.set(distanceX);
        mouseY.set(distanceY);
    };

    return (
        <div className="py-20 relative">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-black">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950" />
                <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 to-transparent opacity-70" />
            </div>

            <div className="relative max-w-7xl mx-auto px-6">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative group"
                            onMouseMove={(e) => handleMouseMove(e, index)}
                            onMouseEnter={() => setHoveredCard(index)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <motion.div
                                className="relative p-6 h-full rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 overflow-hidden"
                                style={{
                                    transform: hoveredCard === index ? useMotionTemplate`rotateX(${mouseY}deg) rotateY(${mouseX}deg)` : "none",
                                    transition: "transform 0.1s ease-out"
                                }}
                            >
                                {/* Feature Icon */}
                                <div className={`
                                    relative w-12 h-12 mb-6 rounded-xl
                                    bg-gradient-to-br ${feature.gradient}
                                    flex items-center justify-center
                                    transform transition-transform duration-500
                                    ${hoveredCard === index ? 'scale-110 rotate-12' : ''}
                                `}>
                                    <feature.icon className="w-6 h-6 text-white" />
                                    <div className="absolute inset-0 rounded-xl bg-gray-950 mix-blend-overlay" />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-400 mb-4">
                                    {feature.description}
                                </p>

                                {/* Learn More Link */}
                                <motion.a
                                    href="#"
                                    className="inline-flex items-center text-sm font-medium"
                                    style={{
                                        background: `linear-gradient(to right, ${feature.glowColor}, ${feature.glowColor})`,
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent"
                                    }}
                                >
                                    Learn more
                                    <svg
                                        className={`ml-2 w-4 h-4 transform transition-transform duration-200 ${
                                            hoveredCard === index ? 'translate-x-1' : ''
                                        }`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </motion.a>
                            </motion.div>

                            {/* Hover Effects */}
                            <div className={`
                                absolute inset-0 rounded-2xl opacity-0 
                                group-hover:opacity-20 transition-opacity duration-500
                                bg-gradient-to-r ${feature.gradient}
                                blur-xl
                            `} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}