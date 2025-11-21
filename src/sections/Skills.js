import React from 'react';
import { motion } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaPhp, FaDatabase, FaGitAlt, FaFigma, FaBootstrap, FaPython } from 'react-icons/fa';
import { SiMongodb, SiTailwindcss, SiCplusplus } from 'react-icons/si';

const skills = [
    { name: 'HTML5', icon: <FaHtml5 />, color: '#e44d26' },
    { name: 'CSS3', icon: <FaCss3Alt />, color: '#1572b6' },
    { name: 'JavaScript', icon: <FaJs />, color: '#f7df1e' },
    { name: 'React', icon: <FaReact />, color: '#61dafb' },
    { name: 'Node.js', icon: <FaNodeJs />, color: '#3c873a' },
    { name: 'PHP', icon: <FaPhp />, color: '#777bb4' },
    { name: 'MySQL', icon: <FaDatabase />, color: '#00758f' },
    { name: 'MongoDB', icon: <SiMongodb />, color: '#47a248' },
    { name: 'Git', icon: <FaGitAlt />, color: '#f34f29' },
    { name: 'Figma', icon: <FaFigma />, color: '#a259ff' },
    { name: 'Bootstrap', icon: <FaBootstrap />, color: '#563d7c' },
    { name: 'Tailwind CSS', icon: <SiTailwindcss />, color: '#38bdf8' },
    { name: 'Python', icon: <FaPython />, color: '#3776ab' },
    { name: 'C++', icon: <SiCplusplus />, color: '#00599c' },
];

const Skills = () => {
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
                    {skills.map((skill) => (
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
                                {skill.icon}
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
