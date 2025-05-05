import React from 'react';

const Footer = () => {
    const sections = [
        {
            title: "Product",
            links: ["Features", "Pricing", "Documentation"]
        },
        {
            title: "Resources",
            links: ["Blog", "Tutorials", "Support"]
        },
        {
            title: "Company",
            links: ["About", "Careers", "Contact"]
        },
        {
            title: "Legal",
            links: ["Privacy", "Terms", "Security"]
        }
    ];

    return (
        <footer className="bg-gradient-to-b from-black to-purple-900/20 pt-16 pb-8">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    {sections.map((section, index) => (
                        <div key={index}>
                            <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
                            <ul className="space-y-2">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
                    <p>&copy; 2025 Builder.io. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
