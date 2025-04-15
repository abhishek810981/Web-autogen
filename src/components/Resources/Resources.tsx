'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';

export default function Resources() {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const animationRef = useRef<number>();

    const resources = [
        {
            title: "Visual Development Guide",
            description: "Learn how to build modern applications using our visual development platform.",
            icon: "🎨",
            gradient: "from-cyan-500 via-blue-500 to-purple-500",
            delay: 0.1
        },
        {
            title: "AI Integration",
            description: "Discover how AI can accelerate your development workflow.",
            icon: "🤖",
            gradient: "from-blue-500 via-indigo-500 to-purple-500",
            delay: 0.2
        },
        {
            title: "Component Library",
            description: "Access our extensive library of pre-built components.",
            icon: "🧩",
            gradient: "from-purple-500 via-pink-500 to-rose-500",
            delay: 0.3
        }
    ];

    // Duplicate resources for infinite scroll
    const repeatedResources = [...resources, ...resources, ...resources];

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer) return;

        let isHovered = false;
        let lastTime = performance.now();
        const FRAME_DURATION = 1000 / 60;

        const animate = () => {
            if (!isHovered && !isDragging && scrollContainer) {
                const currentTime = performance.now();
                const deltaTime = currentTime - lastTime;

                if (deltaTime >= FRAME_DURATION) {
                    scrollContainer.scrollLeft += 1;
                    if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
                        scrollContainer.scrollLeft = 0;
                    }
                    lastTime = currentTime;
                }
            }
            animationRef.current = requestAnimationFrame(animate);
        };

        animate();
        
        const handleMouseEnter = () => { isHovered = true; };
        const handleMouseLeave = () => { isHovered = false; };

        scrollContainer.addEventListener('mouseenter', handleMouseEnter);
        scrollContainer.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
            scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [isDragging]);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollContainerRef.current!.offsetLeft);
        setScrollLeft(scrollContainerRef.current!.scrollLeft);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current!.offsetLeft;
        const walk = (x - startX) * 2;
        scrollContainerRef.current!.scrollLeft = scrollLeft - walk;
    };

    return (
        <div className="relative min-h-screen bg-black">
            {/* Full viewport background with gradients */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />
                <motion.div 
                    className="absolute w-[1000px] h-[1000px] bg-blue-500/20 rounded-full blur-[150px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.15 }}
                    transition={{ duration: 1 }}
                    style={{ top: '-30%', right: '-20%' }}
                />
                <motion.div 
                    className="absolute w-[800px] h-[800px] bg-purple-500/20 rounded-full blur-[150px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.15 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    style={{ bottom: '-20%', left: '-20%' }}
                />
            </div>

            <div className="relative w-full">
                <div className="max-w-7xl mx-auto px-6 py-32">
                    <motion.div 
                        className="text-center mb-20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold">
                            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                Resources to get you started
                            </span>
                        </h2>
                        <p className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto">
                            Everything you need to build better products, faster. Dive into our comprehensive resources.
                        </p>
                    </motion.div>

                    {/* Scroll Container with Edge Fade */}
                    <div className="relative w-full overflow-hidden">
                        {/* Left Shadow Overlay */}
                        <div className="absolute left-0 top-0 h-full w-32 z-20 bg-gradient-to-r from-black to-transparent pointer-events-none" />
                        
                        {/* Right Shadow Overlay */}
                        <div className="absolute right-0 top-0 h-full w-32 z-20 bg-gradient-to-l from-black to-transparent pointer-events-none" />

                        <div 
                            ref={scrollContainerRef}
                            className="flex overflow-x-auto scrollbar-hide py-8 px-4"
                            onMouseDown={handleMouseDown}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            onMouseMove={handleMouseMove}
                            style={{ 
                                cursor: isDragging ? 'grabbing' : 'grab',
                                WebkitOverflowScrolling: 'touch'
                            }}
                        >
                            <div className="flex gap-8 select-none pb-8">
                                {repeatedResources.map((card, index) => (
                                    <motion.div 
                                        key={index}
                                        className="relative flex-none w-[300px] sm:w-[350px]"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: card.delay }}
                                        style={{
                                            perspective: '1000px',
                                            transformStyle: 'preserve-3d',
                                        }}
                                        onMouseEnter={() => setHoveredCard(index)}
                                        onMouseLeave={() => setHoveredCard(null)}
                                    >
                                        <motion.div
                                            className="card-container relative w-full h-[400px]"
                                            whileHover={{
                                                rotate: [-5, 5, -5],
                                                transition: { repeat: Infinity, duration: 1.5 }
                                            }}
                                        >
                                            {/* Gradient Sphere Background */}
                                            <div className={`absolute inset-0 rounded-full opacity-30 bg-gradient-to-br ${card.gradient} blur-3xl`} />

                                            {/* Main Card */}
                                            <motion.div
                                                className="absolute inset-0 bg-gray-900/80 rounded-2xl p-8 backdrop-blur-lg"
                                                style={{ transform: `rotateY(${index % 2 === 0 ? -20 : 20}deg)` }}
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                <div className="h-full flex flex-col items-center justify-center space-y-4">
                                                    <div className={`text-6xl sm:text-7xl mb-4 bg-gradient-to-br ${card.gradient} bg-clip-text text-transparent`}>
                                                        {card.icon}
                                                    </div>
                                                    <h3 className="text-xl sm:text-2xl font-bold text-center text-white">
                                                        {card.title}
                                                    </h3>
                                                    <p className="text-sm sm:text-base text-gray-300 text-center">
                                                        {card.description}
                                                    </p>
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        className="mt-auto px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center space-x-2"
                                                    >
                                                        <span>Explore now</span>
                                                        <ArrowRight className="w-4 h-4" />
                                                    </motion.button>
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
