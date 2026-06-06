import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { FaCheck, FaArrowRight } from 'react-icons/fa';
import { usePortfolioData } from '../context/PortfolioDataContext';

// Card with mouse-tracking spotlight
const SpotlightCard = ({ service, index }) => {
    const ref = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const spotlightX = useTransform(mouseX, (val) => `${val}px`);
    const spotlightY = useTransform(mouseY, (val) => `${val}px`);

    const onMouseMove = (e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={onMouseMove}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-2xl p-px group overflow-hidden"
            style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.04)',
            }}
        >
            {/* Spotlight spotlight effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                style={{
                    background: `radial-gradient(350px circle at ${spotlightX} ${spotlightY}, rgba(6,182,212,0.08), transparent 70%)`,
                }}
            />
            {/* Border glow */}
            <motion.div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{
                    background: `radial-gradient(200px circle at ${spotlightX} ${spotlightY}, rgba(6,182,212,0.12), transparent 70%)`,
                    mixBlendMode: 'overlay',
                }}
            />

            <div className="relative rounded-2xl p-7 h-full"
                style={{ background: 'rgba(15,23,42,0.7)', backdropFilter: 'blur(20px)' }}>
                {/* Icon */}
                <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-6"
                    style={{
                        background: 'rgba(6,182,212,0.08)',
                        border: '1px solid rgba(6,182,212,0.15)',
                    }}
                >
                    {service.icon}
                </div>

                <h3 className="text-lg font-heading font-bold text-white mb-3 group-hover:text-accent transition-colors duration-300">
                    {service.title}
                </h3>
                <p className="text-secondary text-sm leading-relaxed mb-6">
                    {service.description}
                </p>

                {service.features && service.features.length > 0 && (
                    <ul className="space-y-2 border-t pt-5" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                        {service.features.slice(0, 4).map((f, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-xs text-gray-400">
                                <FaCheck className="text-accent mt-0.5 flex-shrink-0" size={9} />
                                <span>{f}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </motion.div>
    );
};

const Services = () => {
    const { data } = usePortfolioData();
    if (!data) return null;
    const { services } = data;

    return (
        <section id="services" className="relative overflow-hidden">
            <div className="glow-purple w-[600px] h-[600px] top-0 left-0 opacity-40" />
            <div className="section-container relative z-10">

                {/* Header */}
                <div className="max-w-2xl mb-16">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="section-label"
                    >
                        <span className="w-6 h-px bg-accent inline-block" />
                        Capabilities
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="section-title text-4xl md:text-5xl"
                    >
                        What I <span className="text-gradient">build</span><br />
                        <span className="text-white/50 font-light">for you</span>
                    </motion.h2>
                </div>

                {/* Bento Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {services && services.map((service, i) => (
                        <SpotlightCard key={service.id || i} service={service} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
