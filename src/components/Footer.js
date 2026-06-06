import React from 'react';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { getIcon } from '../utils/getIcon';

const Footer = () => {
    const { data } = usePortfolioData();

    if (!data) return null;

    const { personalInfo, socialLinks } = data;

    return (
        <footer className="bg-dark border-t border-white/10 py-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-heading font-bold text-white mb-2">
                            {personalInfo.name}
                        </h3>
                        <p className="text-gray-400">
                            {personalInfo.title}
                        </p>
                    </div>

                    <div className="flex gap-6">
                        {socialLinks && socialLinks.map((social, index) => (
                            <a
                                key={index}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-2xl text-gray-400 hover:text-primary transition-colors hover:-translate-y-1 transform duration-300 flex items-center justify-center"
                                aria-label={social.name}
                            >
                                {getIcon(social.icon)}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
