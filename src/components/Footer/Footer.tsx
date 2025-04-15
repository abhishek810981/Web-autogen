'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Mail, Github, Twitter, Linkedin, Send } from 'lucide-react';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [isHovered, setIsHovered] = useState<string | null>(null);

    const sections = [
        {
            title: "Product",
            links: ["Features", "Templates", "Enterprise", "Security"]
        },
        {
            title: "Resources",
            links: ["Documentation", "Tutorials", "Blog", "Support"]
        },
        {
            title: "Company",
            links: ["About", "Careers", "Contact", "Partners"]
        },
        {
            title: "Legal",
            links: ["Privacy", "Terms", "Security", "Status"]
        }
    ];

    const socialLinks = [
        { icon: Github, href: "#", label: "GitHub" },
        { icon: Twitter, href: "#", label: "Twitter" },
        { icon: Linkedin, href: "#", label: "LinkedIn" }
    ];

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle subscription logic here
        setEmail('');
    };

    return (
        <footer className="relative bg-gray-950 pt-24 pb-12 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
                <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent top-0" />
                <motion.div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] rounded-full opacity-20"
                    style={{
                        background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, rgba(147,51,234,0.05) 50%, rgba(0,0,0,0) 70%)',
                        filter: 'blur(60px)',
                    }}
                />
            </div>

            <div className="relative max-w-7xl mx-auto px-6">
                {/* Newsletter Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative mb-20"
                >
                    <div className="max-w-2xl mx-auto text-center">
                        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Stay Updated
                        </h3>
                        <p className="text-gray-400 mb-8">
                            Subscribe to our newsletter for the latest updates, tutorials, and resources.
                        </p>
                        <form onSubmit={handleSubscribe} className="relative max-w-md mx-auto">
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full px-6 py-3 bg-gray-900/50 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 pr-12"
                                />
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:text-blue-400 transition-colors"
                                    type="submit"
                                >
                                    <Send className="w-5 h-5 text-blue-500" />
                                </motion.button>
                            </div>
                        </form>
                    </div>
                </motion.div>

                {/* Links Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="grid md:grid-cols-4 gap-8 mb-12"
                >
                    {sections.map((section) => (
                        <div key={section.title}>
                            <h4 className="text-lg font-semibold text-white mb-4">{section.title}</h4>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link}>
                                        <a 
                                            href="#" 
                                            className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group"
                                            onMouseEnter={() => setIsHovered(link)}
                                            onMouseLeave={() => setIsHovered(null)}
                                        >
                                            <span className="relative">
                                                {link}
                                                <motion.div 
                                                    className="absolute -bottom-0.5 left-0 h-px bg-gradient-to-r from-blue-500 to-violet-500"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: isHovered === link ? '100%' : 0 }}
                                                    transition={{ duration: 0.3 }}
                                                />
                                            </span>
                                            <ChevronRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </motion.div>

                {/* Bottom Section */}
                <div className="border-t border-gray-800/50 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-gray-400 mb-4 md:mb-0"
                        >
                            &copy; 2025 AutoGen Labs. All rights reserved.
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex space-x-4"
                        >
                            {socialLinks.map(({ icon: Icon, href, label }) => (
                                <motion.a
                                    key={label}
                                    href={href}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="p-2 rounded-full bg-gray-900/50 border border-gray-800/50 hover:border-gray-700/50 transition-colors group"
                                >
                                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                                </motion.a>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
