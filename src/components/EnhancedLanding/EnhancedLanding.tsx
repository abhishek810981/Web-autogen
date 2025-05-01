'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Hero from '../Hero/Hero';
import Features from '../Features/Features';
import DesignToCodeSection from '../DesignToCodeSection/DesignToCodeSection';
import Resources from '../Resources/Resources';
import Pricing from '../Pricing/Pricing';
import Footer from '../Footer/Footer';
import JsonLdProvider from '../JsonLd/JsonLdProvider';
import { createWebsiteSchema } from '../JsonLd/jsonLdSchemas';

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

    const features = [
        {
            title: "AI-Powered Development",
            description: "Leverage advanced AI to automate and enhance your development workflow",
            icon: "🤖"
        },
        {
            title: "Visual Tools",
            description: "Create stunning interfaces with our intuitive visual development tools",
            icon: "🎨"
        },
        {
            title: "Enterprise Solutions",
            description: "Scale your applications with our enterprise-grade development platform",
            icon: "🏢"
        }
    ];

    // Enhanced schema for software application
    const softwareSchema = {
        "@type": "SoftwareApplication",
        name: "AutoGen Labs Platform",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Web",
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            priceSpecification: {
                "@type": "PriceSpecification",
                price: "0",
                priceCurrency: "USD",
                valueAddedTaxIncluded: false
            }
        },
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.8",
            ratingCount: "1250",
            bestRating: "5",
            worstRating: "1"
        },
        featureList: features.map(f => f.title).join(", ")
    };

    // Combine schemas
    const schemas = [
        createWebsiteSchema({
            potentialAction: {
                "@type": "DownloadAction",
                target: {
                    "@type": "EntryPoint",
                    urlTemplate: "https://autogenlabs.com/download",
                    actionPlatform: [
                        "http://schema.org/DesktopWebPlatform",
                        "http://schema.org/IOSPlatform",
                        "http://schema.org/AndroidPlatform"
                    ]
                }
            }
        }),
        { type: "SoftwareApplication", data: softwareSchema }
    ];

    return (
        <div className="min-h-screen bg-black text-white">
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
