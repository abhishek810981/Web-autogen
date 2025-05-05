'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    const navItems = [
        { title: 'Home', href: '/' },
        { title: 'Features', href: '/features' },
        { title: 'Templates', href: '/templates' },
        { title: 'Blog', href: '/blog' },
        { title: 'Support', href: '/support' },
    ];

    return (
        <motion.nav 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed w-full z-50 transition-all duration-300 ${
                isScrolled 
                    ? 'bg-black/90 border-b border-gray-800 backdrop-blur'
                    : 'bg-transparent'
            }`}
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Left: Logo */}
                    <div className="flex items-center space-x-3">
                        <img 
                            src="/images/logo.png" 
                            alt="AutoGen Labs Logo" 
                            className="w-10 h-10"
                        />
                        <span className="text-xl font-semibold text-white">AutoGen Labs</span>
                    </div>

                    {/* Center: Nav Links */}
                    <div className="hidden md:flex items-center space-x-6">
                        {navItems.map((item) => (
                            <a
                                key={item.title}
                                href={item.href}
                                className="text-sm text-gray-300 hover:text-white tracking-wide uppercase transition"
                            >
                                {item.title}
                            </a>
                        ))}
                    </div>

                    {/* Right: Sign Button + Mobile Menu */}
                    <div className="flex items-center space-x-4">
                        <button 
                            className="hidden md:inline-block px-5 py-2 rounded-full text-sm font-medium bg-white text-black hover:bg-gray-200 transition"
                        >
                            Download Now
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button 
                            className="md:hidden p-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? (
                                <X className="w-6 h-6 text-white" />
                            ) : (
                                <Menu className="w-6 h-6 text-white" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <motion.div 
                    className="md:hidden bg-black/95 px-6 pb-6 pt-4 space-y-3 backdrop-blur"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    {navItems.map((item, index) => (
                        <a
                            key={item.title}
                            href={item.href}
                            className="block text-sm text-gray-300 hover:text-white uppercase tracking-wide"
                        >
                            {item.title}
                        </a>
                    ))}
                    <button 
                        className="w-full mt-4 px-6 py-3 rounded-full font-medium text-sm bg-white text-black hover:bg-gray-200 transition"
                    >
                       Download Now
                    </button>
                </motion.div>
            )}
        </motion.nav>
    );
};

export default React.memo(Navbar);
