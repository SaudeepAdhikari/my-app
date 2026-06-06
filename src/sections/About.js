import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { FaQuoteRight } from 'react-icons/fa';

const About = () => {
    const { data } = usePortfolioData();
    if (!data) return null;
    const { personalInfo, aboutStats } = data;

    return (
        <section id="about" className="relative overflow-hidden">
            <div className="glow-cyan w-[500px] h-[500px] -bottom-32 right-0 opacity-30" />

            <div className="section-container relative z-10">
                <div className="grid lg:grid-cols-5 gap-12 items-center">

                    {/* Left: bio text (3 cols) */}
                    <div className="lg:col-span-3">
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="section-label"
                        >
                            <span className="w-6 h-px bg-accent inline-block" /> About Me
                        </motion.p>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="section-title text-4xl md:text-5xl mb-8"
                        >
                            Passionate about<br />
                            <span className="text-gradient">building products</span><br />
                            <span className="text-white/40 font-light text-3xl md:text-4xl">that people love</span>
                        </motion.h2>

                        <div className="space-y-5 text-secondary leading-relaxed">
                            {personalInfo.bio && personalInfo.bio.map((p, i) => (
                                <motion.p
                                    key={i}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.15 + i * 0.1 }}
                                    className={i === 0 ? 'text-lg text-gray-200' : 'text-base'}
                                >
                                    {p}
                                </motion.p>
                            ))}
                        </div>
                    </div>

                    {/* Right: stats bento (2 cols) */}
                    <div className="lg:col-span-2 grid grid-cols-2 gap-3">
                        {aboutStats && aboutStats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, type: 'spring', stiffness: 150 }}
                                whileHover={{ y: -5, scale: 1.03 }}
                                className="glass rounded-2xl p-6 flex flex-col items-start justify-between group"
                                style={{ minHeight: '130px' }}
                            >
                                <span className="text-4xl font-heading font-black text-white group-hover:text-gradient transition-all">
                                    {stat.value}
                                </span>
                                <span className="text-xs text-secondary uppercase tracking-wider mt-2">
                                    {stat.label}
                                </span>
                            </motion.div>
                        ))}

                        {/* Quote card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="glass rounded-2xl p-5 col-span-2"
                            style={{ borderColor: 'rgba(6,182,212,0.15)', background: 'rgba(6,182,212,0.04)' }}
                        >
                            <FaQuoteRight className="text-accent/30 text-2xl mb-3" />
                            <p className="text-sm text-gray-300 italic leading-relaxed">
                                "I believe that great software is not just about the code — it's about the experience it creates."
                            </p>
                            <p className="text-xs text-accent mt-3 font-semibold">{personalInfo.name}</p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
