import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBriefcase, FaCertificate, FaExternalLinkAlt } from 'react-icons/fa';
import { usePortfolioData } from '../context/PortfolioDataContext';

const TimelineItem = ({ item, index, accent }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex gap-6 group"
    >
        {/* Line & dot */}
        <div className="flex flex-col items-center">
            <div
                className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0 transition-all duration-300 group-hover:scale-150"
                style={{
                    background: accent,
                    boxShadow: `0 0 12px ${accent}60`,
                }}
            />
            <div className="flex-1 w-px mt-2" style={{ background: 'rgba(255,255,255,0.06)' }} />
        </div>

        {/* Content */}
        <div className="pb-10 flex-1">
            <span
                className="text-[10px] font-bold uppercase tracking-widest mb-2 block"
                style={{ color: accent }}
            >
                {item.period}
            </span>
            <h4 className="font-heading font-bold text-white text-base mb-1 group-hover:text-accent transition-colors">
                {item.role || item.degree}
            </h4>
            <p className="text-sm text-secondary mb-3">{item.company || item.school}</p>
            {item.description && (
                <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
            )}
        </div>
    </motion.div>
);

const Resume = () => {
    const { data } = usePortfolioData();
    if (!data) return null;
    const { workExperience, education, certifications } = data;

    return (
        <section id="resume" className="relative overflow-hidden">
            <div className="glow-cyan w-[500px] h-[500px] top-0 right-0 opacity-25" />
            <div className="glow-purple w-[500px] h-[500px] bottom-0 left-0 opacity-20" />

            <div className="section-container relative z-10">
                <div className="mb-12">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="section-label"
                    >
                        <span className="w-6 h-px bg-accent inline-block" /> Journey
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="section-title text-4xl md:text-5xl"
                    >
                        Experience &<br /><span className="text-gradient">Education</span>
                    </motion.h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Experience */}
                    <div>
                        <div className="flex items-center gap-3 mb-10">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-accent"
                                style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)' }}>
                                <FaBriefcase size={16} />
                            </div>
                            <h3 className="font-heading font-bold text-xl text-white">Work Experience</h3>
                        </div>
                        <div>
                            {workExperience && workExperience.map((exp, i) => (
                                <TimelineItem key={i} item={exp} index={i} accent="#06b6d4" />
                            ))}
                        </div>
                    </div>

                    {/* Education */}
                    <div>
                        <div className="flex items-center gap-3 mb-10">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-purpleGlow"
                                style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)' }}>
                                <FaGraduationCap size={16} />
                            </div>
                            <h3 className="font-heading font-bold text-xl text-white">Education</h3>
                        </div>
                        <div>
                            {education && education.map((edu, i) => (
                                <TimelineItem key={i} item={edu} index={i} accent="#8b5cf6" />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Certifications */}
                {certifications && certifications.length > 0 && (
                    <div className="mt-20">
                        <div className="flex items-center gap-3 mb-10">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}>
                                <FaCertificate size={16} className="text-amber-400" />
                            </div>
                            <h3 className="font-heading font-bold text-xl text-white">Certifications</h3>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {certifications.map((cert, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08 }}
                                    whileHover={{ y: -4 }}
                                    className="glass rounded-2xl p-5 flex flex-col justify-between group"
                                    style={{ minHeight: '140px' }}
                                >
                                    <div>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400/80 mb-2 block">
                                            {cert.date}
                                        </span>
                                        <h4 className="font-heading font-bold text-sm text-white group-hover:text-amber-400 transition-colors">
                                            {cert.title}
                                        </h4>
                                        <p className="text-xs text-secondary mt-1">by {cert.issuer}</p>
                                    </div>
                                    {cert.link && (
                                        <a
                                            href={cert.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-amber-400 transition-colors mt-4 pt-3"
                                            style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
                                        >
                                            Verify <FaExternalLinkAlt size={8} />
                                        </a>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Resume;
