import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { getIcon } from '../utils/getIcon';

const Footer = () => {
    const { data } = usePortfolioData();
    if (!data) return null;

    const { personalInfo, socialLinks } = data;

    return (
        <footer className="relative border-t overflow-hidden" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
            <div className="glow-cyan w-96 h-96 -bottom-48 left-0 opacity-30" />
            <div className="glow-purple w-96 h-96 -bottom-48 right-0 opacity-25" />

            <div className="section-container py-12 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    {/* Brand */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-dark"
                                style={{ background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)' }}
                            >
                                {(personalInfo.shortName || personalInfo.name).charAt(0)}
                            </div>
                            <span className="font-heading font-bold text-white">{personalInfo.name}</span>
                        </div>
                        <p className="text-secondary text-xs">{personalInfo.title}</p>
                    </motion.div>

                    {/* Social */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="flex gap-3"
                    >
                        {socialLinks && socialLinks.map((social, i) => (
                            <a
                                key={i}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.name}
                                className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 hover:text-accent transition-all duration-300 hover:-translate-y-1"
                                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
                            >
                                {getIcon(social.icon)}
                            </a>
                        ))}
                    </motion.div>
                </div>

                <div className="glow-divider mt-10 mb-8" />

                <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-500">
                    <p>© {new Date().getFullYear()} {personalInfo.name}. Crafted with passion.</p>
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="hover:text-accent transition-colors flex items-center gap-1"
                    >
                        Back to top <span>↑</span>
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
