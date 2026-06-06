import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { usePortfolioData } from '../context/PortfolioDataContext';

const Stats = () => {
    const { data } = usePortfolioData();
    const stats = useMemo(() => data?.stats || [], [data]);
    const [isVisible, setIsVisible] = useState(false);
    const [counts, setCounts] = useState(() => stats.map(() => 0));
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting && !isVisible) setIsVisible(true); },
            { threshold: 0.3 }
        );
        const el = sectionRef.current;
        if (el) observer.observe(el);
        return () => { if (el) observer.unobserve(el); };
    }, [isVisible]);

    useEffect(() => {
        if (!isVisible || stats.length === 0) return;
        stats.forEach((stat, index) => {
            let start = 0;
            const end = stat.value;
            const duration = 2000;
            const increment = end / (duration / 16);
            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCounts(prev => { const n = [...prev]; n[index] = end; return n; });
                    clearInterval(timer);
                } else {
                    setCounts(prev => { const n = [...prev]; n[index] = Math.floor(start); return n; });
                }
            }, 16);
            return () => clearInterval(timer);
        });
    }, [isVisible, stats]);

    if (!data || stats.length === 0) return null;

    return (
        <section ref={sectionRef} className="py-2 relative overflow-hidden">
            <div className="glow-divider" />
            <div className="section-container py-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.id || index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="text-center glass rounded-2xl p-6 group hover:-translate-y-1 transition-transform"
                        >
                            <div className="text-3xl mb-3">{stat.icon}</div>
                            <div className="text-4xl font-heading font-black text-gradient mb-1">
                                {counts[index] !== undefined ? counts[index] : 0}{stat.suffix}
                            </div>
                            <div className="text-xs text-secondary uppercase tracking-wider font-medium">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <div className="glow-divider" />
        </section>
    );
};

export default Stats;
