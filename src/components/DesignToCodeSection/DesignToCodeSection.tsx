'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const DesignToCodeSection = () => {
    const featureCards = [
        {
            icon: "/icons/visual-editor.svg",
            badge: "Visual Editor",
            title: "Reclaim engineering capacity",
            description: "Enable marketers to drag and drop to build pages and screens with your code components, integrations, and design system with Builder Publish.",
            video: "https://cdn.builder.io/o/assets%2FYJIGb4i01jvw0SRdL5Bt%2F69d7b0f4dd4d438ebb50877a79f13e2e%2Fcompressed",
            glowColor: "from-purple-500/30"
        },
        {
            icon: "/icons/cms.svg",
            badge: "HEADLESS CMS",
            title: "Manage content with an enterprise CMS",
            description: "Effortlessly iterate and scale content changes across channels, locales, brands, and platforms.",
            image: "https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2Ff8ee97017e6f4f1b8afb70f7cd3fec50",
            glowColor: "from-blue-500/30"
        },
        {
            icon: "/icons/optimization.svg",
            badge: "Optimization",
            title: "Optimize without submitting a ticket",
            description: "Quickly launch A/B tests and personalized experiences without jumping through hoops or getting deprioritized in a backlog.",
            image: "https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2Fe07092fa994b4cb5a40e688605b01e93",
            glowColor: "from-green-500/30"
        }
    ];

    const codeRef = useRef<HTMLPreElement | null>(null);
    const [displayedCode, setDisplayedCode] = useState('');
    const [cursorPosition, setCursorPosition] = useState(0);

    const codeString = `import React, { useState, useEffect } from 'react';

const Dashboard = () => {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        // Fetch dashboard data
        const fetchDashboardData = async () => {
            const response = await fetch('/api/dashboard');
            const data = await response.json();
            setData(data);
        };
        
        fetchDashboardData();
    }, []);

    return (
        <div className="dashboard">
            <h1>Welcome Back!</h1>
            <div className="stats-grid">
                {data.map(item => (
                    <div key={item.id}>
                        {item.title}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;`;

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        let mounted = true;

        const typeNextCharacter = () => {
            if (!mounted) return;

            setDisplayedCode(prev => {
                const nextChar = codeString[prev.length];
                return nextChar ? prev + nextChar : prev;
            });

            setCursorPosition(prev => prev + 1);

            if (cursorPosition < codeString.length) {
                timeoutId = setTimeout(typeNextCharacter, 30);
            }
        };

        typeNextCharacter();

        return () => {
            mounted = false;
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <>
            {/* Design to Code Section */}
            <div className="relative bg-gray-900 min-h-screen p-6 md:p-12 flex items-center overflow-hidden">
                {/* Enhanced Grid Background Pattern */}
                <div
                    className="absolute inset-0 opacity-40"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, rgb(99 102 241 / 0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgb(99 102 241 / 0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '30px 30px',
                        maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
                    }}
                />

                <div className="container mx-auto px-6 sm:px-10 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <motion.div 
                            className="lg:w-1/2"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                Get to work <span className="text-indigo-400">quickly</span>
                            </h2>
                            
                            <p className="text-gray-300 mb-6">
                                Go from opening your browser to building in minutes, not hours. Import your existing repositories from GitHub, GitLab, Bitbucket, or your local machine, with support for most tech stacks.
                            </p>
                            
                            <p className="text-gray-300 mb-8">
                                You can also use the App Prototyping agent to quickly create a new application using natural language, mockups, drawing tools, and screenshots, or select from a large catalog of popular framework or language templates.
                            </p>
                            
                            {/* Enhanced Technology Pills */}
                            <div className="flex flex-wrap gap-4 mb-8">
                                {['React', 'Vue.js', 'Next.js', 'Node.js', 'Python'].map((tech) => (
                                    <motion.div
                                        key={tech}
                                        className="bg-indigo-500/10 backdrop-blur-sm border border-indigo-500/20 rounded-full px-4 py-2 text-sm flex items-center hover:bg-indigo-500/20 transition-all duration-300"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <svg className="h-5 w-5 mr-2 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        {tech}
                                    </motion.div>
                                ))}
                            </div>
                            
                            <motion.a
                                href="#"
                                className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Explore Workspaces
                                <ArrowRight className="w-4 h-4" />
                            </motion.a>
                        </motion.div>
                        
                        {/* Enhanced Code Editor */}
                        <motion.div 
                            className="lg:w-1/2"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <div className="rounded-xl overflow-hidden code-window shadow-2xl bg-gray-950 border border-gray-800/50 h-[700px]">
                                <div className="code-header flex items-center justify-between p-4 bg-gray-900/50 backdrop-blur-sm border-b border-gray-800/50">
                                    <div className="flex items-center gap-2">
                                        <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
                                        <div className="h-3 w-3 rounded-full bg-yellow-500/80"></div>
                                        <div className="h-3 w-3 rounded-full bg-green-500/80"></div>
                                    </div>
                                    <div className="text-gray-400 text-sm font-mono">Dashboard.js</div>
                                </div>
                                <div className="flex h-[calc(100%-48px)]">
                                    <div className="w-1/4 bg-gray-900/50 p-4 text-gray-400 border-r border-gray-800/50">
                                        <div className="mb-4 font-medium text-gray-300">Project Files</div>
                                        <div className="pl-2 text-gray-500 font-mono text-sm">
                                            <p className="mb-2">○ src/</p>
                                            <p className="mb-2 pl-4 text-white">○ components/</p>
                                            <p className="mb-2 pl-8 text-indigo-400">○ Dashboard.js</p>
                                            <p className="mb-2 pl-8">○ Sidebar.js</p>
                                            <p className="mb-2 pl-8">○ Header.js</p>
                                            <p className="mb-2 pl-4">○ hooks/</p>
                                            <p className="mb-2 pl-4">○ utils/</p>
                                            <p className="mb-2 pl-4">○ styles/</p>
                                            <p className="mb-2">○ public/</p>
                                            <p className="mb-2">○ package.json</p>
                                        </div>
                                    </div>
                                    <div className="w-3/4 bg-gray-950 p-6 overflow-auto modern-scrollbar">
                                        <div className="text-indigo-400 mb-2 font-mono text-sm">// components/Dashboard.js</div>
                                        <div className="relative font-mono text-sm leading-relaxed">
                                            <pre className="text-gray-300" ref={codeRef}>
                                                <code>{displayedCode}</code>
                                            </pre>
                                            <span 
                                                className="absolute inline-block w-[2px] h-[1.2em] bg-indigo-400 animate-blink"
                                                style={{
                                                    left: `${cursorPosition * 8}px`, // Approximate character width
                                                    top: `${Math.floor(cursorPosition / 80) * 1.5}em` // Approximate line height
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

      
        </>
    );
};

export default DesignToCodeSection;
