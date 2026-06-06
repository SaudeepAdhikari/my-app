import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub, FaChevronDown, FaChevronUp, FaArrowRight } from 'react-icons/fa';
import { usePortfolioData } from '../context/PortfolioDataContext';

const Projects = () => {
    const { data } = usePortfolioData();
    const [showAll, setShowAll] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('All');

    if (!data) return null;
    const { projects } = data;

    const allTags = ['All', ...new Set(projects.flatMap(p => p.tags))];
    const filtered = selectedFilter === 'All' ? projects : projects.filter(p => p.tags.includes(selectedFilter));
    const displayed = showAll ? filtered : filtered.slice(0, 4);

    return (
        <section id="projects" className="relative overflow-hidden">
            <div className="glow-purple w-[600px] h-[600px] -top-32 right-0 opacity-35" />

            <div className="section-container relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="section-label"
                        >
                            <span className="w-6 h-px bg-accent inline-block" /> Portfolio
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="section-title text-4xl md:text-5xl"
                        >
                            Selected <span className="text-gradient">Projects</span>
                        </motion.h2>
                    </div>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-secondary max-w-sm text-sm leading-relaxed"
                    >
                        Shipped products from concept to production — built to perform, designed to impress.
                    </motion.p>
                </div>

                {/* Filter pills */}
                <div className="flex flex-wrap gap-2 mb-12">
                    {allTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setSelectedFilter(tag)}
                            className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300"
                            style={{
                                background: selectedFilter === tag ? 'rgba(6,182,212,0.15)' : 'rgba(255,255,255,0.03)',
                                border: selectedFilter === tag ? '1px solid rgba(6,182,212,0.4)' : '1px solid rgba(255,255,255,0.06)',
                                color: selectedFilter === tag ? '#06b6d4' : 'rgba(156,163,175,0.8)',
                            }}
                        >
                            {tag}
                        </button>
                    ))}
                </div>

                {/* Project grid */}
                <AnimatePresence mode="popLayout">
                    <div className="grid md:grid-cols-2 gap-6">
                        {displayed.map((project, index) => (
                            <motion.div
                                layout
                                key={project.title}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.5, delay: index * 0.06 }}
                                className="group relative rounded-2xl overflow-hidden"
                                style={{
                                    background: 'rgba(15,23,42,0.7)',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    backdropFilter: 'blur(20px)',
                                }}
                            >
                                {/* Image */}
                                <div className="relative overflow-hidden"
                                    style={{ aspectRatio: '16/9' }}>
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    {/* Overlay on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent" />
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                                        style={{ background: 'rgba(6,182,212,0.03)' }} />

                                    {/* Action buttons overlay */}
                                    <div className="absolute top-4 right-4 flex gap-2 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                        {(project.sourceLink || (!project.liveLink && project.link)) && (
                                            <a
                                                href={project.sourceLink || project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
                                                style={{ background: 'rgba(3,7,18,0.9)', border: '1px solid rgba(255,255,255,0.1)' }}
                                            >
                                                <FaGithub size={14} />
                                            </a>
                                        )}
                                        {(project.liveLink || project.link) && (
                                            <a
                                                href={project.liveLink || project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
                                                style={{ background: 'rgba(6,182,212,0.9)', border: '1px solid rgba(6,182,212,0.5)' }}
                                            >
                                                <FaExternalLinkAlt size={12} />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex items-start justify-between gap-3 mb-3">
                                        <h3 className="font-heading font-bold text-lg text-white group-hover:text-accent transition-colors duration-300">
                                            {project.title}
                                        </h3>
                                        <FaArrowRight
                                            className="text-gray-500 group-hover:text-accent group-hover:-rotate-45 transition-all duration-300 flex-shrink-0 mt-1"
                                            size={13}
                                        />
                                    </div>
                                    <p className="text-secondary text-sm leading-relaxed mb-5 line-clamp-2">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag, i) => (
                                            <span
                                                key={i}
                                                className="text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide"
                                                style={{
                                                    background: 'rgba(255,255,255,0.04)',
                                                    border: '1px solid rgba(255,255,255,0.06)',
                                                    color: 'rgba(156,163,175,0.8)',
                                                }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </AnimatePresence>

                {/* Show more */}
                {filtered.length > 4 && (
                    <div className="text-center mt-12">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="btn-secondary"
                        >
                            {showAll ? <><FaChevronUp size={12} /> Show Less</> : <><FaChevronDown size={12} /> View All ({filtered.length})</>}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;
