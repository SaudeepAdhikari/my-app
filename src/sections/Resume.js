import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBriefcase, FaCertificate, FaExternalLinkAlt } from 'react-icons/fa';
import { usePortfolioData } from '../context/PortfolioDataContext';

const Resume = () => {
    const { data } = usePortfolioData();

    if (!data) return null;

    const { workExperience, education, certifications } = data;

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
    };

    return (
        <section id="resume" className="section-container relative overflow-hidden">
            {/* Background decorative blob */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/5 rounded-full mix-blend-screen filter blur-3xl"></div>
            </div>

            <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                variants={containerVariants}
                className="max-w-6xl mx-auto relative z-10"
            >
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                    Education & <span className="text-gradient">Experience</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-12 mb-16">
                    {/* Education Column */}
                    <div>
                        <div className="flex items-center gap-3 mb-8 justify-center md:justify-start">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xl">
                                <FaGraduationCap />
                            </div>
                            <h3 className="text-2xl font-bold text-white">Education</h3>
                        </div>

                        <div className="space-y-8 border-l border-white/10 ml-5 pl-8 relative">
                            {education && education.map((edu, index) => (
                                <motion.div
                                    key={edu.id || index}
                                    variants={itemVariants}
                                    className="relative group"
                                >
                                    {/* Timeline Node dot */}
                                    <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-dark border-2 border-primary group-hover:bg-primary transition-colors duration-300 flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-white scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                                    </div>

                                    <div className="glass-panel p-6 hover:border-primary/30 transition-all duration-300">
                                        <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                                            {edu.period}
                                        </span>
                                        <h4 className="text-lg font-bold text-white mt-3 group-hover:text-primary transition-colors">
                                            {edu.degree}
                                        </h4>
                                        <p className="text-sm font-medium text-gray-400 mt-1">
                                            {edu.school}
                                        </p>
                                        {edu.description && (
                                            <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                                                {edu.description}
                                            </p>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Experience Column */}
                    <div>
                        <div className="flex items-center gap-3 mb-8 justify-center md:justify-start">
                            <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary text-xl">
                                <FaBriefcase />
                            </div>
                            <h3 className="text-2xl font-bold text-white">Experience</h3>
                        </div>

                        <div className="space-y-8 border-l border-white/10 ml-5 pl-8 relative">
                            {workExperience && workExperience.map((exp, index) => (
                                <motion.div
                                    key={exp.id || index}
                                    variants={itemVariants}
                                    className="relative group"
                                >
                                    {/* Timeline Node dot */}
                                    <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-dark border-2 border-secondary group-hover:bg-secondary transition-colors duration-300 flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-white scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                                    </div>

                                    <div className="glass-panel p-6 hover:border-secondary/30 transition-all duration-300">
                                        <span className="text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1 rounded-full">
                                            {exp.period}
                                        </span>
                                        <h4 className="text-lg font-bold text-white mt-3 group-hover:text-secondary transition-colors">
                                            {exp.role}
                                        </h4>
                                        <p className="text-sm font-medium text-gray-400 mt-1">
                                            {exp.company}
                                        </p>
                                        {exp.description && (
                                            <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                                                {exp.description}
                                            </p>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Certifications Section */}
                {certifications && certifications.length > 0 && (
                    <div className="mt-20">
                        <div className="flex items-center gap-3 mb-8 justify-center">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xl">
                                <FaCertificate />
                            </div>
                            <h3 className="text-2xl font-bold text-white">Certifications</h3>
                        </div>

                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {certifications.map((cert, index) => (
                                <motion.div
                                    key={cert.id || index}
                                    variants={itemVariants}
                                    whileHover={{ y: -5 }}
                                    className="glass-panel p-6 flex flex-col justify-between hover:border-primary/50 transition-colors group"
                                >
                                    <div>
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="text-3xl text-primary transform group-hover:scale-110 transition-transform duration-300">
                                                📜
                                            </div>
                                            <span className="text-xs font-semibold text-gray-400 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                                                {cert.date}
                                            </span>
                                        </div>
                                        <h4 className="text-md font-bold text-white group-hover:text-primary transition-colors">
                                            {cert.title}
                                        </h4>
                                        <p className="text-xs text-gray-400 mt-1">
                                            Issued by {cert.issuer}
                                        </p>
                                    </div>

                                    {cert.link && (
                                        <div className="mt-6 pt-4 border-t border-white/5">
                                            <a
                                                href={cert.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs font-bold text-primary hover:text-white flex items-center gap-2 transition-colors"
                                            >
                                                Verify Credentials <FaExternalLinkAlt className="text-[10px]" />
                                            </a>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
            </motion.div>
        </section>
    );
};

export default Resume;
