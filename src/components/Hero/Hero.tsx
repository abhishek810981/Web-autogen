'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronRight, Star, Users, Zap } from 'lucide-react';

export default function Hero() {
    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);
    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const stats = [
        { icon: Star, value: "4.9/5", label: "Rating" },
        { icon: Users, value: "10k+", label: "Users" },
        { icon: Zap, value: "99.9%", label: "Uptime" }
    ];

    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: (delay: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                delay: delay
            }
        })
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-black">
                <motion.div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(147,51,234,0.1) 50%, rgba(0,0,0,0) 70%)',
                        filter: 'blur(60px)',
                        x: useTransform(cursorXSpring, value => value / 10),
                        y: useTransform(cursorYSpring, value => value / 10)
                    }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#000_0%,rgba(0,0,0,0)_40%,rgba(0,0,0,0)_60%,#000_100%)] pointer-events-none" />
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                <motion.div
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    custom={0}
                    className="relative inline-block mb-6"
                >
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 rounded-2xl blur-2xl opacity-30"
                        animate={{ 
                            scale: [1, 1.1, 1],
                            opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{ 
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <h1 className="text-5xl md:text-7xl font-bold p-2">
                        <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                            Step into the future
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
                            of design
                        </span>
                    </h1>
                </motion.div>

                <motion.p
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    custom={0.2}
                    className="text-gray-400 text-xl md:text-2xl max-w-2xl mx-auto mb-12"
                >
                    Join thousands of designers and teams using our platform to turn ideas into high-performing websites, fast.
                </motion.p>

                <motion.div
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    custom={0.4}
                    className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative group px-8 py-4 rounded-lg overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500" />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-xl" />
                        <span className="relative flex items-center justify-center text-white font-semibold">
                            Get started for free
                            <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative group px-8 py-4 rounded-lg"
                    >
                        <div className="absolute inset-0 border border-gray-700 rounded-lg group-hover:border-gray-600 transition-colors" />
                        <div className="absolute inset-0 bg-gray-800/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="relative text-white">Learn more</span>
                    </motion.button>
                </motion.div>

                {/* Stats */}
                <div className="flex flex-wrap justify-center gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            variants={variants}
                            initial="hidden"
                            animate="visible"
                            custom={0.6 + index * 0.1}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="relative px-6 py-3 rounded-2xl bg-gray-900/80 border border-gray-800 backdrop-blur-sm"
                            >
                                <div className="flex items-center gap-2">
                                    <stat.icon className="w-5 h-5 text-gray-400" />
                                    <span className="text-white font-semibold">{stat.value}</span>
                                    <span className="text-gray-400">{stat.label}</span>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
