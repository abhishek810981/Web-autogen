'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    const [locale, setLocale] = useState('en');
    
    useEffect(() => {
        const cookieLocale = document.cookie
            .split('; ')
            .find(row => row.startsWith('NEXT_LOCALE='))
            ?.split('=')[1];
        setLocale(cookieLocale || 'en');
    }, []);

    const navItems = [
        { title: 'Home', href: `/${locale ?? 'en'}`, description: 'Return to homepage' },
        { title: 'Features', href: `/${locale ?? 'en'}/features`, description: 'Explore our platform features' },
        { title: 'Templates', href: `/${locale ?? 'en'}/templates`, description: 'Browse ready-to-use templates' },
        { title: 'Blog', href: `/${locale ?? 'en'}/blog`, description: 'Read latest updates and tutorials' },
        { title: 'Support', href: `/${locale ?? 'en'}/support`, description: 'Get help and documentation' }
    ];

    return (
        <motion.nav 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed w-full z-50 transition-all duration-300 ${
                isScrolled 
                    ? 'border-b border-gray-800/50 bg-black/90 backdrop-blur-xl'
                    : 'bg-transparent'
            }`}
            role="navigation"
            aria-label="Main navigation"
        >
            <div className={`absolute inset-0 transition-opacity duration-300 ${
                isScrolled ? 'opacity-100' : 'opacity-0'
            }`}>
                <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-black/80 backdrop-blur-xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-violet-500/5 to-purple-500/5" />
            </div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <motion.div 
                        className="flex items-center space-x-3"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="relative group">
                            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 opacity-30 blur group-hover:opacity-40 transition duration-300" />
                            <img 
                                src="/images/logo.png" 
                                alt="AutoGen Labs Logo" 
                                className="relative w-10 h-10 transform group-hover:scale-105 transition duration-300"
                            />
                        </div>
                        <div className="relative">
                            <span className="text-xl font-semibold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                                AutoGen Labs
                            </span>
                            <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 group-hover:w-full transition-all duration-300" />
                        </div>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.title}
                                href={item.href}
                                 prefetch={true}
                                className="relative text-gray-400 hover:text-white transition-colors group py-2"
                                aria-label={item.description}
                            >
                                <motion.span
                                    className="relative z-10"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {item.title}
                                </motion.span>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-violet-500/10 to-purple-500/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 group-hover:w-full transition-all duration-300" />
                            </Link>
                        ))}
                        <motion.a
                            href="/download"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative group px-6 py-2.5 rounded-lg font-medium"
                            aria-label="Download AutoGen Labs"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 rounded-lg" />
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 rounded-lg blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                            <span className="relative text-white">Download Now</span>
                        </motion.a>
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button 
                        className="md:hidden relative p-2 group"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-violet-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {isMenuOpen ? (
                            <X className="w-6 h-6 text-white" />
                        ) : (
                            <Menu className="w-6 h-6 text-white" />
                        )}
                    </motion.button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <motion.div 
                    className="md:hidden relative"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="relative px-4 pt-3 pb-6 space-y-2 bg-black/95 backdrop-blur-2xl border-t border-gray-800/50">
                        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-violet-500/5 to-purple-500/5" />
                        {navItems.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link
                                    href={item.href}
                                    className="relative block px-4 py-3 text-gray-400 hover:text-white rounded-lg group transition-all"
                                    aria-label={item.description}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-violet-500/10 to-purple-500/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    {item.title}
                                </Link>
                            </motion.div>
                        ))}
                        <motion.a
                            href="/download"
                            className="relative w-full mt-4 px-6 py-3 rounded-lg font-medium group"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            aria-label="Download AutoGen Labs"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 rounded-lg" />
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 rounded-lg blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                            <span className="relative text-white">Download Now</span>
                        </motion.a>
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
}
