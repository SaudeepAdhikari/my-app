import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { usePortfolioData } from '../context/PortfolioDataContext';

const Testimonials = () => {
    const { data } = usePortfolioData();
    const [active, setActive] = useState(0);

    if (!data) return null;
    const { testimonials } = data;
    if (!testimonials || testimonials.length === 0) return null;

    const prev = () => setActive(i => (i - 1 + testimonials.length) % testimonials.length);
    const next = () => setActive(i => (i + 1) % testimonials.length);
    const t = testimonials[active];

    return (
        <section id="testimonials" className="relative overflow-hidden py-8">
            <div className="glow-purple w-[600px] h-[600px] top-0 left-1/2 -translate-x-1/2 opacity-20" />

            <div className="section-container relative z-10">
                <div className="text-center mb-16">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="section-label justify-center"
                    >
                        <span className="w-6 h-px bg-accent inline-block" /> Testimonials
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="section-title text-4xl md:text-5xl"
                    >
                        What clients <span className="text-gradient">say</span>
                    </motion.h2>
                </div>

                <div className="max-w-3xl mx-auto">
                    {/* Main card */}
                    <div className="relative glass-strong rounded-3xl p-10 md:p-14 text-center overflow-hidden">
                        <FaQuoteLeft
                            className="absolute top-8 left-8 opacity-10 text-accent"
                            size={60}
                        />
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4, ease: 'easeOut' }}
                            >
                                <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-10 font-light italic">
                                    "{t.quote}"
                                </p>
                                <div className="flex items-center justify-center gap-4">
                                    <div
                                        className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0"
                                        style={{ border: '2px solid rgba(6,182,212,0.3)' }}
                                    >
                                        <img
                                            src={t.avatar}
                                            alt={t.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.parentNode.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:rgba(6,182,212,0.1);color:#06b6d4;font-weight:700;font-size:16px">${t.name.charAt(0)}</div>`;
                                            }}
                                        />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-heading font-bold text-white">{t.name}</p>
                                        <p className="text-xs text-secondary">{t.role}, {t.company}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-center gap-6 mt-8">
                        <button
                            onClick={prev}
                            className="w-10 h-10 rounded-full flex items-center justify-center text-secondary hover:text-accent transition-all duration-300 hover:-translate-x-0.5"
                            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                        >
                            <FaChevronLeft size={12} />
                        </button>

                        <div className="flex gap-2">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActive(i)}
                                    className="transition-all duration-300 rounded-full"
                                    style={{
                                        width: i === active ? '24px' : '6px',
                                        height: '6px',
                                        background: i === active ? '#06b6d4' : 'rgba(255,255,255,0.2)',
                                    }}
                                />
                            ))}
                        </div>

                        <button
                            onClick={next}
                            className="w-10 h-10 rounded-full flex items-center justify-center text-secondary hover:text-accent transition-all duration-300 hover:translate-x-0.5"
                            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                        >
                            <FaChevronRight size={12} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
