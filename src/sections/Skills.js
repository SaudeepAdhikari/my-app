import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { getIcon } from '../utils/getIcon';

const Skills = () => {
    const { data } = usePortfolioData();

    if (!data) return null;

    const { skills } = data;

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <section id="skills" className="section-container">
            <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={container}
            >
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                    My <span className="text-gradient">Skills</span>
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {skills && skills.map((skill) => (
                        <motion.div
                            key={skill.name}
                            variants={item}
                            className="glass-panel p-6 flex flex-col items-center justify-center gap-4 hover:border-primary/50 transition-colors cursor-pointer group"
                            whileHover={{ scale: 1.05 }}
                        >
                            <div
                                className="text-5xl transition-transform duration-300 group-hover:rotate-12"
                                style={{ color: skill.color }}
                            >
                                {getIcon(skill.icon)}
                            </div>
                            <span className="font-medium text-gray-300 group-hover:text-white transition-colors">
                                {skill.name}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Skills;
