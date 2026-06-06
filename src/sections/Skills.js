import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { getIcon } from '../utils/getIcon';

// Duplicate items for seamless marquee
const MarqueeRow = ({ items, reverse = false }) => (
    <div className="w-full overflow-hidden select-none">
        <motion.div
            className="flex w-max flex-nowrap gap-4 will-change-transform"
            animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
            transition={{
                duration: reverse ? 28 : 22,
                ease: 'linear',
                repeat: Infinity,
                repeatType: 'loop',
            }}
        >
            {[...items, ...items].map((skill, i) => (
                <div
                    key={i}
                    className="flex items-center gap-3 px-5 py-3 rounded-xl shrink-0 group hover:scale-105 transition-transform duration-300 cursor-default"
                    style={{
                        background: 'rgba(15,23,42,0.8)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    <span
                        className="text-xl group-hover:scale-110 transition-transform duration-300"
                        style={{ color: skill.color || '#9ca3af' }}
                    >
                        {getIcon(skill.icon)}
                    </span>
                    <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                        {skill.name}
                    </span>
                </div>
            ))}
        </motion.div>
    </div>
);

const Skills = () => {
    const { data } = usePortfolioData();
    if (!data) return null;
    const { skills, skillCategories } = data;

    // Split skills into rows
    const mid = Math.ceil((skills || []).length / 2);
    const row1 = (skills || []).slice(0, mid);
    const row2 = (skills || []).slice(mid);

    return (
        <section id="skills" className="relative overflow-hidden pt-0 pb-16">
            <div className="glow-cyan w-[500px] h-[500px] -top-32 right-0 opacity-30" />

            {/* Header */}
            <div className="section-container !pt-0 !pb-12 relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-end">
                    <div>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="section-label"
                        >
                            <span className="w-6 h-px bg-accent inline-block" /> Tech Stack
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="section-title text-4xl md:text-5xl"
                        >
                            The tools<br />
                            <span className="text-gradient">I master</span>
                        </motion.h2>
                    </div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-secondary leading-relaxed"
                    >
                        A curated tech stack built for performance, scalability, and delivering exceptional user experiences across the full development lifecycle.
                    </motion.p>
                </div>
            </div>

            {/* Marquee Rows */}
            <div className="section-container pt-0 relative z-10">
                <div className="glass-strong rounded-[2rem] p-5 md:p-8 border border-white/5 overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
                    <div className="flex items-center justify-between gap-4 mb-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                            Core stack
                        </p>
                        <p className="text-xs text-secondary">
                            Tools I use across design, development, and deployment
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        {row1.length > 0 && <MarqueeRow items={row1} />}
                        {row2.length > 0 && <MarqueeRow items={row2} reverse />}
                    </div>
                </div>
            </div>

            {/* Category pills (if available) */}
            {skillCategories && skillCategories.length > 0 && (
                <div className="section-container pt-16 relative z-10">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {skillCategories.map((cat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass rounded-2xl p-5"
                            >
                                <h4 className="font-heading font-semibold text-white text-sm mb-3">{cat.name}</h4>
                                <div className="flex flex-wrap gap-2">
                                    {cat.items && cat.items.map((t, j) => (
                                        <span key={j} className="text-xs px-2.5 py-1 rounded-full text-secondary"
                                            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

export default Skills;
