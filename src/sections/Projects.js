import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { FaChevronDown, FaChevronUp, FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { projects } from '../data/projects';

const Projects = () => {
    const [showAll, setShowAll] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('All');

    // Get all unique tags
    const allTags = ['All', ...new Set(projects.flatMap(project => project.tags))];

    // Filter projects based on selected filter
    const filteredProjects = selectedFilter === 'All'
        ? projects
        : projects.filter(project => project.tags.includes(selectedFilter));

    const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 4);

    return (
        <section id="projects" className="section-container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                    Featured <span className="text-gradient">Projects</span>
                </h2>

                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {allTags.map((tag) => (
                        <motion.button
                            key={tag}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedFilter(tag)}
                            className={`px-6 py-2 rounded-full font-medium text-sm transition-all duration-300 ${selectedFilter === tag
                                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30'
                                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                                }`}
                        >
                            {tag}
                        </motion.button>
                    ))}
                </div>

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
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="relative px-8 py-4 bg-gradient-to-r from-primary via-secondary to-primary bg-size-200 bg-pos-0 hover:bg-pos-100 rounded-full font-bold text-white shadow-2xl hover:shadow-primary/60 transition-all duration-500 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 flex items-center gap-3 overflow-hidden group/btn active:scale-95"
                                        >
                                            <span className="relative z-10 flex items-center gap-2">
                                                <FaGithub className="text-xl group-hover/btn:rotate-12 transition-transform duration-300" />
                                                View Code
                                                <FaExternalLinkAlt className="text-sm group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                                            </span>
                                            {/* Animated glow effect */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                                            {/* Pulse effect */}
                                            <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover/btn:scale-100 opacity-0 group-hover/btn:opacity-100 transition-all duration-500"></div>
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
