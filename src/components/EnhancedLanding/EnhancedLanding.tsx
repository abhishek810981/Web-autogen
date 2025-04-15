'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Hero from '../Hero/Hero';
import Features from '../Features/Features';
import DesignToCodeSection from '../DesignToCodeSection/DesignToCodeSection';
import Resources from '../Resources/Resources';
import Pricing from '../Pricing/Pricing';
import Footer from '../Footer/Footer';

const EnhancedLanding: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const launchDate = new Date('2025-04-28T00:00:00');
            const now = new Date();
            const difference = launchDate.getTime() - now.getTime();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft();

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="bg-purple-900/20 text-center py-2 px-4">
                <p className="text-sm flex items-center justify-center gap-2">
                    <span>Launching April 28th</span>
                    <span className="font-mono">
                        {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s
                    </span>
                </p>
            </div>
            <Navbar />
            <Hero />
            <Features />
            <DesignToCodeSection />
            <Resources />
            <Pricing />
            <Footer />
            
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fadeIn 0.6s ease-out forwards;
                }
                .animate-fade-in-delay {
                    animation: fadeIn 0.6s ease-out 0.2s forwards;
                    opacity: 0;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
};

export default EnhancedLanding;
