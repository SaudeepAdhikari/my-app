import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolioData } from '../context/PortfolioDataContext';

const About = () => {
    const { data } = usePortfolioData();

    if (!data) return null;

    const { personalInfo, aboutStats } = data;

    return (
        <section id="about" className="section-container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
            >
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                    About <span className="text-gradient">Me</span>
                </h2>

                <div className="glass-panel p-8 md:p-12">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="flex-1 space-y-6 text-gray-300 leading-relaxed">
                            {personalInfo.bio && personalInfo.bio.map((paragraph, index) => (
                                <p key={index}>
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        {/* Stats or Highlights */}
                        <div className="w-full md:w-1/3 grid grid-cols-2 gap-4">
                            {aboutStats && aboutStats.map((stat, index) => {
                                // For the 3rd stat (Client Satisfaction), make it col-span-2 if it's the last element of an odd-sized array
                                const isLast = index === aboutStats.length - 1;
                                const isOdd = aboutStats.length % 2 !== 0;
                                const colClass = isLast && isOdd ? "col-span-2" : "";

                                return (
                                    <div
                                        key={index}
                                        className={`bg-white/5 p-4 rounded-xl text-center ${colClass}`}
                                    >
                                        <h3 className={`text-3xl font-bold mb-1 ${stat.color || 'text-white'}`}>
                                            {stat.value}
                                        </h3>
                                        <p className="text-sm text-gray-400">
                                            {stat.label}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default About;
