import React from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaEye } from 'react-icons/fa';
import { usePortfolioData } from '../context/PortfolioDataContext';

const ResumeDownload = () => {
    const { data } = usePortfolioData();
    if (!data) return null;

    const { personalInfo } = data;
    const resumePath = personalInfo.resumePath;
    const lastUpdated = personalInfo.resumeLastUpdated || 'PDF Format';

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = resumePath;
        link.download = `${personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <section className="relative py-8 overflow-hidden">
            <div className="section-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative rounded-3xl overflow-hidden p-px"
                    style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.3), rgba(139,92,246,0.3))' }}
                >
                    <div
                        className="relative rounded-3xl px-10 py-12 text-center"
                        style={{ background: 'rgba(15,23,42,0.9)', backdropFilter: 'blur(40px)' }}
                    >
                        <div className="absolute inset-0 rounded-3xl"
                            style={{ background: 'radial-gradient(ellipse 60% 60% at 50% -20%, rgba(6,182,212,0.06), transparent)' }} />

                        <div className="relative z-10">
                            <p className="section-label justify-center mb-4">
                                <span className="w-6 h-px bg-accent inline-block" /> Resume
                            </p>
                            <h3 className="section-title text-3xl md:text-4xl mb-4">
                                Want to see my full <span className="text-gradient">credentials?</span>
                            </h3>
                            <p className="text-secondary mb-8 max-w-md mx-auto text-sm leading-relaxed">
                                Download my resume for a detailed overview of experience, skills, and accomplishments.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button onClick={handleDownload} className="btn-primary">
                                    <FaDownload size={13} /> Download PDF
                                </button>
                                <button onClick={() => window.open(resumePath, '_blank')} className="btn-secondary">
                                    <FaEye size={13} /> Preview
                                </button>
                            </div>

                            <p className="text-xs text-gray-500 mt-6">{lastUpdated}</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ResumeDownload;
