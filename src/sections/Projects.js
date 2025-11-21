import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { projects } from '../data/projects';

const Projects = () => {
    const [showAll, setShowAll] = useState(false);
    const displayedProjects = showAll ? projects : projects.slice(0, 4);

    return (
        <section id="projects" className="section-container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                    Featured <span className="text-gradient">Projects</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                    {displayedProjects.map((project, index) => (
                        <Tilt
                            key={index}
                            tiltMaxAngleX={5}
                            tiltMaxAngleY={5}
                            scale={1.02}
                            transitionSpeed={2000}
                            className="glass-panel overflow-hidden group"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-primary transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                                        >
                                            View Code
                                        </a>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-400 mb-4 text-sm line-clamp-3">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag, i) => (
                                            <span
                                                key={i}
                                                className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </Tilt>
                    ))}
                </div>

                {projects.length > 4 && (
                    <div className="text-center mt-12">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="px-8 py-3 rounded-full font-semibold text-white border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-300 flex items-center gap-2 mx-auto group"
                        >
                            {showAll ? (
                                <>
                                    Show Less <FaChevronUp className="group-hover:-translate-y-1 transition-transform" />
                                </>
                            ) : (
                                <>
                                    View More Projects <FaChevronDown className="group-hover:translate-y-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </div>
                )}
            </motion.div>
        </section>
    );
};

export default Projects;
