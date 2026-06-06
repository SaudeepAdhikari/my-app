import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { getIcon } from '../utils/getIcon';
import { FaMapMarkerAlt, FaArrowRight, FaDownload } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';

const Hero = () => {
    const { data } = usePortfolioData();

    if (!data) return null;

    const { personalInfo, socialLinks, typewriterSequences } = data;

    const fadeUp = {
        hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
        visible: (i = 0) => ({
            opacity: 1, y: 0, filter: 'blur(0px)',
            transition: { delay: i * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }
        })
    };

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center overflow-hidden"
        >
            {/* ── Background layers ── */}
            <div className="absolute inset-0 grid-bg opacity-40" />
            <div className="glow-cyan w-[700px] h-[700px] -top-48 -left-32 opacity-70" />
            <div className="glow-purple w-[600px] h-[600px] top-1/2 right-0 opacity-60" />

            {/* ── Main grid layout ── */}
            <div className="section-container pt-36 pb-16">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* ─ Left: Text content ─ */}
                    <div className="flex flex-col gap-6 order-2 lg:order-1">

                        {/* Status badge */}
                        <motion.div
                            variants={fadeUp} custom={0} initial="hidden" animate="visible"
                            className="inline-flex items-center gap-2.5 self-start px-4 py-2 rounded-full text-xs font-semibold tracking-wide"
                            style={{
                                background: 'rgba(6,182,212,0.08)',
                                border: '1px solid rgba(6,182,212,0.25)',
                                color: '#06b6d4',
                            }}
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                            {personalInfo.availability?.statusText || 'Available for Work'}
                        </motion.div>

                        {/* Heading */}
                        <motion.h1
                            variants={fadeUp} custom={1} initial="hidden" animate="visible"
                            className="section-title text-5xl md:text-6xl xl:text-7xl"
                        >
                            Hi, I'm{' '}
                            <span className="text-gradient">{personalInfo.shortName || personalInfo.name.split(' ')[0]}</span>
                            <br />
                            <span className="text-white/80 text-4xl md:text-5xl xl:text-6xl font-light">
                                {typewriterSequences && typewriterSequences.length > 0 ? (
                                    <TypeAnimation
                                        sequence={typewriterSequences}
                                        wrapper="span"
                                        speed={50}
                                        repeat={Infinity}
                                    />
                                ) : personalInfo.title}
                            </span>
                        </motion.h1>

                        {/* Tagline */}
                        <motion.p
                            variants={fadeUp} custom={2} initial="hidden" animate="visible"
                            className="text-secondary text-lg leading-relaxed max-w-lg"
                        >
                            {personalInfo.tagline}
                        </motion.p>

                        {/* Location */}
                        <motion.div
                            variants={fadeUp} custom={3} initial="hidden" animate="visible"
                            className="flex items-center gap-2 text-sm text-gray-400"
                        >
                            <FaMapMarkerAlt className="text-accent text-xs" />
                            <span>{personalInfo.location}</span>
                        </motion.div>

                        {/* CTAs */}
                        <motion.div
                            variants={fadeUp} custom={4} initial="hidden" animate="visible"
                            className="flex flex-wrap gap-3 mt-2"
                        >
                            <a href="#projects" className="btn-primary">
                                View Projects <FaArrowRight className="text-xs" />
                            </a>
                            <a
                                href={personalInfo.resumePath}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-secondary"
                            >
                                <FaDownload className="text-xs" /> Resume
                            </a>
                        </motion.div>

                        {/* Social links */}
                        <motion.div
                            variants={fadeUp} custom={5} initial="hidden" animate="visible"
                            className="flex items-center gap-4 mt-2"
                        >
                            <span className="text-xs text-gray-500 uppercase tracking-widest">Find me on</span>
                            <div className="w-12 h-px bg-white/10" />
                            {socialLinks && socialLinks.slice(0, 5).map((s, i) => (
                                <a
                                    key={i}
                                    href={s.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s.name}
                                    className="text-gray-500 hover:text-accent transition-all duration-300 hover:-translate-y-1"
                                >
                                    {getIcon(s.icon)}
                                </a>
                            ))}
                        </motion.div>
                    </div>

                    {/* ─ Right: Profile Photo ─ */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 40 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="order-1 lg:order-2 flex justify-center lg:justify-end"
                    >
                        <div className="relative">
                            {/* Outer glow ring */}
                            <div
                                className="absolute inset-0 rounded-3xl animate-blob"
                                style={{
                                    background: 'conic-gradient(from 180deg at 50% 50%, #06b6d4, #8b5cf6, #030712, #06b6d4)',
                                    filter: 'blur(60px)',
                                    opacity: 0.4,
                                    transform: 'scale(1.15)',
                                }}
                            />

                            {/* Gradient border frame */}
                            <div
                                className="relative rounded-3xl p-[2px]"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(6,182,212,0.5), rgba(139,92,246,0.5), rgba(3,7,18,0.1))',
                                }}
                            >
                                <div className="relative rounded-3xl overflow-hidden"
                                    style={{ background: '#0f172a' }}>
                                    <img
                                        src={personalInfo.profileImage}
                                        alt={personalInfo.name}
                                        className="w-72 h-80 md:w-96 md:h-[480px] object-cover object-top"
                                        style={{ filter: 'contrast(1.05) brightness(0.95)' }}
                                    />
                                    {/* Bottom gradient overlay */}
                                    <div
                                        className="absolute bottom-0 left-0 right-0 h-32"
                                        style={{
                                            background: 'linear-gradient(to top, rgba(3,7,18,0.9), transparent)',
                                        }}
                                    />
                                    {/* Info chip on photo */}
                                    <div className="absolute bottom-5 left-5 right-5">
                                        <div className="glass rounded-2xl px-4 py-3">
                                            <p className="text-white font-bold text-sm">{personalInfo.name}</p>
                                            <p className="text-accent text-xs mt-0.5">{personalInfo.title}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating accent card */}
                            <motion.div
                                animate={{ y: [0, -12, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                                className="absolute -right-6 top-12 glass rounded-2xl px-4 py-3 hidden md:block"
                            >
                                <p className="text-xs text-secondary">Open to</p>
                                <p className="text-white font-bold text-sm">Full Stack Roles</p>
                                <div className="flex gap-1 mt-2">
                                    {['React', 'Node', 'Next'].map(t => (
                                        <span key={t} className="text-[9px] px-2 py-0.5 rounded-full"
                                            style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4', border: '1px solid rgba(6,182,212,0.3)' }}>
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Email floating chip */}
                            <motion.a
                                href={`mailto:${personalInfo.email}`}
                                animate={{ y: [0, 12, 0] }}
                                transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
                                className="absolute -left-6 bottom-24 glass rounded-2xl px-3 py-2.5 hidden md:flex items-center gap-2"
                            >
                                <HiOutlineMail className="text-accent text-sm" />
                                <span className="text-xs text-gray-300 font-medium">Hire me!</span>
                            </motion.a>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 6, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-px h-8 bg-gradient-to-b from-accent/60 to-transparent"
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
