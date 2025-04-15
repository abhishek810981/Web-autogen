'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronRight, Star } from 'lucide-react';

export default function Pricing() {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
    const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

    const plans = [
        {
            id: 'starter',
            name: 'Starter',
            description: 'Perfect for individual developers and small projects',
            price: {
                monthly: 19,
                annual: 190
            },
            gradient: "from-blue-400 via-indigo-500 to-purple-500",
            features: [
                'Up to 3 projects',
                'Basic code generation',
                'Community support',
                'Basic analytics'
            ]
        },
        {
            id: 'pro',
            name: 'Professional',
            description: 'Ideal for teams and growing businesses',
            price: {
                monthly: 49,
                annual: 490
            },
            gradient: "from-emerald-400 via-teal-500 to-cyan-500",
            features: [
                'Unlimited projects',
                'Advanced AI features',
                'Priority support',
                'Advanced analytics',
                'Custom integrations',
                'Team collaboration'
            ],
            popular: true
        },
        {
            id: 'enterprise',
            name: 'Enterprise',
            description: 'For large organizations with custom needs',
            price: {
                monthly: 99,
                annual: 990
            },
            gradient: "from-rose-400 via-pink-500 to-purple-500",
            features: [
                'Everything in Pro',
                'Enterprise security',
                'Custom SLA',
                'Dedicated support',
                'Advanced permissions',
                'Custom training',
                'White-labeling'
            ]
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <section className="relative py-24 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950" />
                <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 to-transparent opacity-70" />
                {plans.map((plan) => (
                    <motion.div
                        key={plan.id}
                        className={`absolute opacity-20 blur-3xl rounded-full w-96 h-96 bg-gradient-to-r ${plan.gradient}`}
                        initial={{ opacity: 0 }}
                        animate={{ 
                            opacity: hoveredPlan === plan.id ? 0.3 : 0.1,
                            scale: hoveredPlan === plan.id ? 1.2 : 1
                        }}
                        transition={{ duration: 0.5 }}
                        style={{
                            left: plan.id === 'starter' ? '10%' : plan.id === 'pro' ? '50%' : '90%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}
                    />
                ))}
            </div>

            <div className="relative max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold mb-6"
                    >
                        <span className="relative">
                            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                Simple, Transparent Pricing
                            </span>
                            <div className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                        </span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 max-w-2xl mx-auto"
                    >
                        Choose the perfect plan for your needs. All plans include updates and community features.
                    </motion.p>
                </div>

                {/* Billing Toggle */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex justify-center mb-16"
                >
                    <div className="bg-gray-900/50 backdrop-blur-sm p-1 rounded-xl border border-gray-800/50">
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setBillingCycle('monthly')}
                                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                    billingCycle === 'monthly' 
                                        ? 'bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 text-white shadow-lg'
                                        : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setBillingCycle('annual')}
                                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                    billingCycle === 'annual'
                                        ? 'bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 text-white shadow-lg'
                                        : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                Annual
                                <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                                    Save 20%
                                </span>
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Pricing Cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {plans.map((plan) => (
                        <motion.div
                            key={plan.id}
                            variants={itemVariants}
                            onMouseEnter={() => setHoveredPlan(plan.id)}
                            onMouseLeave={() => setHoveredPlan(null)}
                            className="relative group"
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                                    <span className="px-4 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 text-white shadow-lg">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <div className={`
                                relative p-8 h-full rounded-2xl 
                                bg-gray-900/50 backdrop-blur-sm 
                                border border-gray-800/50
                                transition-all duration-500
                                ${hoveredPlan === plan.id ? 'border-gray-700 transform scale-[1.02]' : ''}
                            `}>
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                                    <p className="text-gray-400 text-sm">{plan.description}</p>
                                </div>

                                <div className="mb-6">
                                    <div className="flex items-end">
                                        <span className="text-4xl font-bold text-white">
                                            ${billingCycle === 'monthly' ? plan.price.monthly : plan.price.annual}
                                        </span>
                                        <span className="text-gray-400 ml-2 mb-1">
                                            /{billingCycle === 'monthly' ? 'month' : 'year'}
                                        </span>
                                    </div>
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-center text-gray-300">
                                            <Check className="w-5 h-5 mr-3 text-green-500" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="relative w-full group"
                                >
                                    <div className={`absolute inset-0 rounded-lg bg-gradient-to-r ${plan.gradient} opacity-80`} />
                                    <div className={`
                                        absolute inset-0 rounded-lg bg-gradient-to-r ${plan.gradient}
                                        opacity-0 group-hover:opacity-80 transition-opacity duration-300 blur-xl
                                    `} />
                                    <div className="relative px-6 py-3 rounded-lg text-white font-medium flex items-center justify-center">
                                        Get Started
                                        <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </motion.button>
                            </div>

                            {/* Hover Effect */}
                            <div className={`
                                absolute inset-0 rounded-2xl opacity-0 
                                group-hover:opacity-20 transition-opacity duration-500
                                bg-gradient-to-r ${plan.gradient}
                                blur-xl
                            `} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
