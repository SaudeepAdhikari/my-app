import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { stats } from '../data/stats';

const Stats = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [counts, setCounts] = useState(stats.map(() => 0));
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        const currentSection = sectionRef.current;
        if (currentSection) {
            observer.observe(currentSection);
        }

        return () => {
            if (currentSection) {
                observer.unobserve(currentSection);
            }
        };
    }, [isVisible]);

    useEffect(() => {
        if (isVisible) {
            stats.forEach((stat, index) => {
                let start = 0;
                const end = stat.value;
                const duration = 2000; // 2 seconds
                const increment = end / (duration / 16); // 60fps

                const timer = setInterval(() => {
                    start += increment;
                    if (start >= end) {
                        setCounts(prev => {
                            const newCounts = [...prev];
                            newCounts[index] = end;
                            return newCounts;
                        });
                        clearInterval(timer);
                    } else {
                        setCounts(prev => {
                            const newCounts = [...prev];
                            newCounts[index] = Math.floor(start);
                            return newCounts;
                        });
                    }
                }, 16);

                return () => clearInterval(timer);
            });
        }
    }, [isVisible]);

    return (
        <section ref={sectionRef} className="py-16 relative">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="text-center group"
                        >
                            <div className="glass-panel p-6 hover:border-primary/50 transition-all duration-300">
                                {/* Icon */}
                                <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                                    {stat.icon}
                                </div>

                                {/* Counter */}
                                <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                                    {counts[index]}{stat.suffix}
                                </div>

                                {/* Label */}
                                <div className="text-gray-400 text-sm font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
