'use client';

import React from 'react';
import { Check } from 'lucide-react';

const Pricing = () => {
    const plans = [
        {
            name: "Free",
            price: "$0",
            features: ["Basic components", "Community support"],
            style: "from-gray-900 to-gray-800",
            buttonStyle: "border border-purple-500/50 hover:bg-purple-500/20"
        },
        {
            name: "Pro",
            price: "$49",
            features: ["Advanced components", "Priority support", "Custom themes"],
            style: "from-purple-900 to-blue-900",
            buttonStyle: "bg-purple-500 hover:bg-purple-600"
        },
        {
            name: "Enterprise",
            price: "Custom",
            features: ["All Pro features", "Dedicated support", "Custom development"],
            style: "from-blue-900 to-purple-900",
            buttonStyle: "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
        }
    ];

    return (
        <div className="max-w-6xl mx-auto px-6 py-16">
            <h2 className="text-3xl font-bold text-center mb-4">Pricing Plans</h2>
            <p className="text-gray-400 text-center mb-12">Choose the perfect plan for your needs</p>
            
            <div className="grid md:grid-cols-3 gap-8">
                {plans.map((plan, index) => (
                    <div key={index} className={`group relative bg-gradient-to-br ${plan.style} rounded-xl p-6 transition-all duration-500 hover:transform hover:scale-105`}>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                        <div className="relative z-10">
                            <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
                            <div className="text-3xl font-bold mb-6">{plan.price}<span className="text-lg font-normal text-gray-400">/month</span></div>
                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center">
                                        <Check className="w-5 h-5 text-green-400 mr-2" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <button className={`w-full py-2 px-4 rounded-lg transition-colors duration-300 ${plan.buttonStyle}`}>
                                {plan.name === "Enterprise" ? "Contact Sales" : `Get Started${plan.name === "Pro" ? " Pro" : ""}`}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Pricing;
