import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub, FaChevronDown, FaChevronUp, FaCheck } from 'react-icons/fa';
import { usePortfolioData } from '../context/PortfolioDataContext';

const fadeUp = {
    hidden: { opacity: 0, y: 28, filter: 'blur(10px)' },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { delay: i * 0.07, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    }),
};

const TECH_COLORS = {
    React: { bg: 'rgba(97,218,251,0.1)', border: 'rgba(97,218,251,0.28)', color: '#61dafb' },
    'Node.js': { bg: 'rgba(60,135,58,0.12)', border: 'rgba(60,135,58,0.3)', color: '#68a063' },
    MongoDB: { bg: 'rgba(71,162,72,0.12)', border: 'rgba(71,162,72,0.3)', color: '#47a248' },
    CSS: { bg: 'rgba(21,114,182,0.12)', border: 'rgba(21,114,182,0.3)', color: '#60a5fa' },
    EmailJS: { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)', color: '#fbbf24' },
    HTML: { bg: 'rgba(228,77,38,0.12)', border: 'rgba(228,77,38,0.3)', color: '#f97316' },
    JS: { bg: 'rgba(247,223,30,0.12)', border: 'rgba(247,223,30,0.3)', color: '#facc15' },
    API: { bg: 'rgba(6,182,212,0.12)', border: 'rgba(6,182,212,0.3)', color: '#06b6d4' },
};

const DEFAULT_TECH_COLOR = {
    bg: 'rgba(255,255,255,0.04)',
    border: 'rgba(255,255,255,0.1)',
    color: 'rgba(156,163,175,0.95)',
};

const STATUS_STYLES = {
    Live: { bg: 'rgba(6,182,212,0.12)', border: 'rgba(6,182,212,0.35)', color: '#06b6d4' },
    Completed: { bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.12)', color: 'rgba(156,163,175,0.95)' },
    'In Progress': { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.35)', color: '#fbbf24' },
};

const getTechnologies = (project) => project.technologies || project.tags || [];
const getGithubUrl = (project) => {
    if (project.github) return project.github;
    if (project.sourceLink) return project.sourceLink;
    const hasDemo = project.demo || project.liveLink;
    if (!hasDemo && project.link) return project.link;
    return null;
};
const getDemoUrl = (project) => {
    if (project.demo) return project.demo;
    if (project.liveLink) return project.liveLink;
    if (project.link) return project.link;
    return null;
};

const TechBadge = ({ label, compact = false }) => {
    const colors = TECH_COLORS[label] || DEFAULT_TECH_COLOR;

    return (
        <span
            className={`inline-flex items-center font-semibold tracking-wide transition-all duration-300 ${
                compact ? 'px-2 py-0.5 rounded-md text-[9px]' : 'px-2.5 py-1 rounded-lg text-[10px]'
            }`}
            style={{
                background: colors.bg,
                border: `1px solid ${colors.border}`,
                color: colors.color,
            }}
        >
            {label}
        </span>
    );
};

const StatusBadge = ({ status }) => {
    const style = STATUS_STYLES[status] || STATUS_STYLES.Completed;

    return (
        <span
            className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide"
            style={{
                background: style.bg,
                border: `1px solid ${style.border}`,
                color: style.color,
            }}
        >
            {status}
        </span>
    );
};

const ProjectCard = ({ project, index, isExpanded, onToggle }) => {
    const [isHovered, setIsHovered] = useState(false);
    const technologies = getTechnologies(project);
    const githubUrl = getGithubUrl(project);
    const demoUrl = getDemoUrl(project);
    const isActive = isHovered || isExpanded;
    const statusStyle = STATUS_STYLES[project.status] || STATUS_STYLES.Completed;

    const handleCardClick = (e) => {
        e.stopPropagation();
        if (window.matchMedia('(hover: none)').matches) {
            onToggle(project.title);
        }
    };

    return (
        <motion.article
            layout
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.5, delay: index * 0.06 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleCardClick}
            className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${
                project.featured ? 'ring-1 ring-accent/25 shadow-[0_0_40px_rgba(6,182,212,0.08)]' : ''
            } ${isActive ? '-translate-y-1.5 scale-[1.01] shadow-[0_24px_60px_rgba(0,0,0,0.45),0_0_32px_rgba(6,182,212,0.1)]' : 'shadow-[0_16px_40px_rgba(0,0,0,0.3)]'}`}
            style={{
                background: 'rgba(15,23,42,0.75)',
                border: isActive ? '1px solid rgba(6,182,212,0.35)' : '1px solid rgba(255,255,255,0.06)',
                backdropFilter: 'blur(20px)',
            }}
        >
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={project.image}
                    alt={project.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 project-image-grade ${
                        isActive ? 'scale-[1.05]' : 'scale-100'
                    }`}
                />

                <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                    style={{
                        background:
                            'linear-gradient(180deg, rgba(3,7,18,0.1) 0%, rgba(3,7,18,0.35) 50%, rgba(15,23,42,0.92) 100%)',
                        opacity: isActive ? 0.35 : 1,
                    }}
                />

                {project.featured && (
                    <div className="absolute top-3 left-3 z-10">
                        <span
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.16em]"
                            style={{
                                background: 'rgba(3,7,18,0.8)',
                                border: '1px solid rgba(6,182,212,0.35)',
                                color: '#06b6d4',
                                backdropFilter: 'blur(10px)',
                            }}
                        >
                            <span className="w-1 h-1 rounded-full bg-accent" />
                            Featured
                        </span>
                    </div>
                )}

                <div
                    className={`absolute inset-x-0 bottom-0 p-4 sm:p-5 z-10 transition-all duration-500 ${
                        isActive ? 'opacity-0 translate-y-3 pointer-events-none' : 'opacity-100 translate-y-0'
                    }`}
                >
                    {project.category && (
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent mb-2">
                            {project.category}
                        </p>
                    )}
                    <h3 className="font-heading font-bold text-lg text-white leading-tight mb-3">
                        {project.title}
                    </h3>
                    <div className="flex items-center gap-1.5 flex-wrap">
                        {technologies.slice(0, 3).map((tech, i) => (
                            <TechBadge key={i} label={tech} compact />
                        ))}
                        {technologies.length > 3 && (
                            <span className="text-[9px] font-semibold text-gray-500 px-1.5">
                                +{technologies.length - 3}
                            </span>
                        )}
                    </div>
                </div>

                <div
                    className={`absolute inset-0 z-20 flex flex-col justify-end p-4 sm:p-5 transition-all duration-500 ${
                        isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
                    }`}
                    style={{
                        background:
                            'linear-gradient(180deg, rgba(3,7,18,0.55) 0%, rgba(3,7,18,0.82) 40%, rgba(15,23,42,0.96) 100%)',
                        backdropFilter: isActive ? 'blur(8px)' : 'blur(0px)',
                    }}
                >
                    <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                            {project.category && (
                                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
                                    {project.category}
                                </span>
                            )}
                            {project.status && <StatusBadge status={project.status} />}
                        </div>
                        {project.year && (
                            <span className="text-[10px] font-medium text-gray-500">{project.year}</span>
                        )}
                    </div>

                    <h3 className="font-heading font-bold text-lg text-white mb-2">{project.title}</h3>
                    <p className="text-secondary text-xs sm:text-sm leading-relaxed mb-3 line-clamp-2">
                        {project.description}
                    </p>

                    {project.keyFeatures?.length > 0 && (
                        <div className="mb-3">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45 mb-1.5">
                                Key Features
                            </p>
                            <ul className="space-y-1">
                                {project.keyFeatures.slice(0, 3).map((feature, i) => (
                                    <li key={i} className="flex items-start gap-2 text-[11px] text-gray-400">
                                        <FaCheck className="text-accent mt-0.5 flex-shrink-0" size={8} />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                            {technologies.map((tech, i) => (
                                <TechBadge key={i} label={tech} />
                            ))}
                        </div>
                    )}

                    <div
                        className="flex items-center gap-2 pt-3 border-t"
                        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {githubUrl && (
                            <a
                                href={githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all duration-300 hover:-translate-y-0.5 mr-2"
                                style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: 'rgba(255,255,255,0.9)',
                                }}
                            >
                                <FaGithub size={12} />
                                GitHub
                            </a>
                        )}
                        {demoUrl && (
                            <a
                                href={demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all duration-300 hover:-translate-y-0.5"
                                style={{
                                    background: statusStyle.bg,
                                    border: `1px solid ${statusStyle.border}`,
                                    color: statusStyle.color,
                                }}
                            >
                                <FaExternalLinkAlt size={10} />
                                Live Demo
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.article>
    );
};

const Projects = () => {
    const { data } = usePortfolioData();
    const [showAll, setShowAll] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [expandedCard, setExpandedCard] = useState(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (sectionRef.current && !sectionRef.current.contains(e.target)) {
                setExpandedCard(null);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    if (!data) return null;
    const { projects } = data;

    const allFilters = [
        'All',
        ...new Set(projects.flatMap((p) => getTechnologies(p))),
    ];

    const filtered = selectedFilter === 'All'
        ? projects
        : projects.filter((p) => getTechnologies(p).includes(selectedFilter));

    const sorted = [...filtered].sort((a, b) => Number(b.featured) - Number(a.featured));
    const displayed = showAll ? sorted : sorted.slice(0, 4);

    const handleToggle = (title) => {
        setExpandedCard((prev) => (prev === title ? null : title));
    };

    return (
        <section id="projects" className="relative overflow-hidden" ref={sectionRef}>
            <div className="absolute inset-0 pointer-events-none">
                <div className="glow-purple w-[600px] h-[600px] -top-32 right-0 opacity-35" />
                <div className="glow-cyan w-[450px] h-[450px] bottom-0 left-[-80px] opacity-25" />
                <div
                    className="absolute inset-0 opacity-25"
                    style={{
                        background:
                            'radial-gradient(ellipse 65% 45% at 50% 0%, rgba(6,182,212,0.07), transparent 60%)',
                    }}
                />
            </div>

            <div className="section-container relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                    <div>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="section-label"
                        >
                            <span className="w-6 h-px bg-accent inline-block" />
                            Portfolio
                        </motion.p>
                        <motion.h2
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={1}
                            variants={fadeUp}
                            className="section-title text-4xl md:text-5xl"
                        >
                            Selected <span className="text-gradient">Work</span>
                        </motion.h2>
                    </div>
                    <motion.p
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={2}
                        variants={fadeUp}
                        className="text-secondary max-w-sm text-sm leading-relaxed"
                    >
                        Real products built to solve real-world problems — hover to explore each case study.
                    </motion.p>
                </div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={3}
                    variants={fadeUp}
                    className="flex flex-wrap gap-2 mb-12"
                >
                    {allFilters.map((filter) => {
                        const isActive = selectedFilter === filter;
                        return (
                            <button
                                key={filter}
                                onClick={() => {
                                    setSelectedFilter(filter);
                                    setExpandedCard(null);
                                }}
                                className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 hover:-translate-y-0.5"
                                style={{
                                    background: isActive
                                        ? 'rgba(6,182,212,0.15)'
                                        : 'rgba(255,255,255,0.03)',
                                    border: isActive
                                        ? '1px solid rgba(6,182,212,0.4)'
                                        : '1px solid rgba(255,255,255,0.06)',
                                    color: isActive ? '#06b6d4' : 'rgba(156,163,175,0.8)',
                                }}
                            >
                                {filter}
                            </button>
                        );
                    })}
                </motion.div>

                <AnimatePresence mode="popLayout">
                    <motion.div
                        layout
                        key={`${selectedFilter}-${showAll}`}
                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6"
                    >
                        {displayed.map((project, index) => (
                            <ProjectCard
                                key={project.title}
                                project={project}
                                index={index}
                                isExpanded={expandedCard === project.title}
                                onToggle={handleToggle}
                            />
                        ))}
                    </motion.div>
                </AnimatePresence>

                {filtered.length > 4 && (
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mt-12"
                    >
                        <button
                            onClick={() => {
                                setShowAll(!showAll);
                                setExpandedCard(null);
                            }}
                            className="btn-secondary"
                        >
                            {showAll ? (
                                <>
                                    <FaChevronUp size={12} /> Show Less
                                </>
                            ) : (
                                <>
                                    <FaChevronDown size={12} /> View All ({filtered.length})
                                </>
                            )}
                        </button>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Projects;
