'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { ArrowRight, ArrowLeft, Code, Rocket, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Features() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const animationRef = useRef<number>();

    const features = [
        {
            Icon: Code,
            title: "Design to Code",
            description: "Transform your designs into production-ready code automatically",
            iconColor: "text-green-400",
            gradientFrom: "purple-900/40"
        },
        {
            Icon: Rocket,
            title: "Visual Development",
            description: "Build and iterate faster with our intuitive visual development platform",
            iconColor: "text-blue-400",
            gradientFrom: "blue-900/40"
        },
        {
            Icon: Zap,
            title: "AI-Powered",
            description: "Leverage AI to accelerate development and optimize your workflow",
            iconColor: "text-yellow-400",
            gradientFrom: "yellow-900/40"
        }
    ];

    const repeatedFeatures = useMemo(() => [...features, ...features, ...features], []);

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
        <section className="relative bg-black overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-64 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-blue-500/20 rounded-full blur-[100px] opacity-50" />
                <div className="absolute -bottom-64 left-1/4 w-[800px] h-[800px] bg-indigo-500/20 rounded-full blur-[100px] opacity-50" />
            </div>

            <div className="relative z-10 container mx-auto px-6">
                {/* Section Header */}
               

                {/* Main Video Section with improved container */}
                <div className="relative mx-auto mb-24 max-w-5xl">
                    <motion.div 
                        className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-800/50"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="aspect-video">
                            <div className="absolute inset-0 w-full h-full">
                                <video
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover"
                                >
                                    <source
                                        src="https://cdn.builder.io/o/assets%2FYJIGb4i01jvw0SRdL5Bt%2F1f879747f3c14418917a193e0f9b2de8%2Fcompressed?apiKey=YJIGb4i01jvw0SRdL5Bt&token=1f879747f3c14418917a193e0f9b2de8&alt=media&optimized=true"
                                        type="video/mp4"
                                    />
                                </video>
                                <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 backdrop-blur-[2px]" />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Scrolling Features */}
                <div className="overflow-hidden">
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-6 overflow-x-auto scrollbar-hide pb-12 -mx-6 px-6"
                        style={{
                            msOverflowStyle: 'none',
                            scrollbarWidth: 'none',
                            cursor: isDragging ? 'grabbing' : 'grab',
                            WebkitOverflowScrolling: 'touch'
                        }}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onMouseMove={handleMouseMove}
                    >
                        {repeatedFeatures.map((feature, index) => (
                            <motion.div 
                                key={index}
                                className="relative flex-shrink-0 group"
                                style={{ width: '320px' }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                            >
                                <div className="relative h-full rounded-2xl overflow-hidden bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 group-hover:border-gray-700/50 transition-all duration-500 p-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className={`p-3 rounded-xl bg-${feature.gradientFrom}`}>
                                            <feature.Icon className={`w-6 h-6 ${feature.iconColor}`} />
                                        </div>
                                        <h3 className="text-xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                            {feature.title}
                                        </h3>
                                    </div>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                        {feature.description}
                                    </p>
                                    <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                                        <span className="mr-2 text-sm">Learn more</span>
                                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
