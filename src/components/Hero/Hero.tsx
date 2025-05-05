'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-black">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-purple-600/20 rounded-full blur-[100px] opacity-50" />
                <div className="absolute bottom-0 left-1/4 w-[800px] h-[800px] bg-indigo-500/20 rounded-full blur-[100px] opacity-50" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl w-full mx-auto px-6 py-16 flex flex-col lg:flex-row items-center justify-between gap-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex-1 text-left px-4"
                >
                    {/* "INTRODUCING A" label with purple gradient border */}
                    <div className="inline-block mb-4 px-6 py-1 rounded-full border border-purple-500 bg-black/40 backdrop-blur-sm">
                       
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-bold mb-5">
                        <span className="text-white">
                        Step into the future
                        </span>
                        <br />
                        <span className="text-white">
                        of design
                        </span>
                    </h1>

                    {/* Reduced text size here */}
                    <p className="text-gray-400 text-sm max-w-2xl mb-5">
                    Join thousands of designers and teams using our platform to turn ideas into high-performing websites, fast.
                    </p>

                    {/* Medium-sized buttons/links */}
                    <div className="flex flex-row gap-3 items-center">
                        <a href="#" className="text-purple-400 text-sm flex items-center hover:text-purple-300 transition-colors mr-3">
                        Get started for free
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                        <button className="px-4 py-1.5 rounded-lg bg-white text-gray-800 text-sm font-medium hover:opacity-90 transition-opacity">
                        Learn more →
                        </button>
                    </div>
                </motion.div>

                {/* AI Robot Section - keeping the original iframe implementation */}
                <motion.div 
                    className="flex-1 w-full lg:max-w-lg relative"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                  
                    <div className="relative w-full h-96 lg:h-[450px] overflow-hidden">
                        <iframe
                            src="https://my.spline.design/robotfollowcursorforlandingpagemc-yDQ2KJIJ96N4Mlk7CyhxQfiB/"
                            frameBorder="0"
                            style={{
                                width: '150%',
                                height: '150%',
                                transform: 'scale(0.65)',
                                transformOrigin: 'center center',
                                position: 'absolute',
                                top: '-25%',
                                left: '-25%'
                            }}
                            title="AI Robot Animation"
                            allow="autoplay; fullscreen; vr"
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}