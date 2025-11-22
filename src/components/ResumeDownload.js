import React from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaEye } from 'react-icons/fa';

const ResumeDownload = () => {
    const handleDownload = () => {
        // Create a link to download the resume
        const link = document.createElement('a');
        link.href = '/resume.pdf'; // Place your resume.pdf in the public folder
        link.download = 'Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handlePreview = () => {
        // Open resume in new tab
        window.open('/resume.pdf', '_blank');
    };

    return (
        <section className="py-16 relative">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="glass-panel p-12 text-center max-w-3xl mx-auto relative overflow-hidden group"
                >
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative z-10">
                        <div className="text-5xl mb-4">📄</div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-3">
                            Download My <span className="text-gradient">Resume</span>
                        </h3>
                        <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                            Get a detailed overview of my experience, skills, and accomplishments in a downloadable PDF format.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={handleDownload}
                                className="btn-primary group/btn"
                            >
                                <FaDownload className="group-hover/btn:animate-bounce" />
                                Download Resume
                            </button>
                            <button
                                onClick={handlePreview}
                                className="btn-secondary group/btn"
                            >
                                <FaEye className="group-hover/btn:scale-110 transition-transform" />
                                Preview Resume
                            </button>
                        </div>

                        <p className="text-xs text-gray-500 mt-6">
                            PDF Format • Last updated November 2025
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ResumeDownload;
