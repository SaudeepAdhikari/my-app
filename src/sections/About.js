import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" className="section-container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
            >
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                    About <span className="text-gradient">Me</span>
                </h2>

                <div className="glass-panel p-8 md:p-12">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="flex-1 space-y-6 text-gray-300 leading-relaxed">
                            <p>
                                I am a passionate Full Stack Web Developer with a keen eye for design and a drive for creating seamless digital experiences. My journey in tech has been fueled by curiosity and a desire to build solutions that solve real-world problems.
                            </p>
                            <p>
                                With expertise in modern web technologies like React, Node.js, and Tailwind CSS, I specialize in building responsive, high-performance applications. I believe in writing clean, maintainable code and constantly learning new tools to stay ahead in the ever-evolving tech landscape.
                            </p>
                            <p>
                                When I'm not coding, you can find me exploring new design trends, contributing to open-source projects, or enjoying a good cup of coffee while brainstorming my next big idea.
                            </p>
                        </div>

                        {/* Stats or Highlights */}
                        <div className="w-full md:w-1/3 grid grid-cols-2 gap-4">
                            <div className="bg-white/5 p-4 rounded-xl text-center">
                                <h3 className="text-3xl font-bold text-primary mb-1">2+</h3>
                                <p className="text-sm text-gray-400">Years Experience</p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-xl text-center">
                                <h3 className="text-3xl font-bold text-secondary mb-1">10+</h3>
                                <p className="text-sm text-gray-400">Projects Completed</p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-xl text-center col-span-2">
                                <h3 className="text-3xl font-bold text-white mb-1">100%</h3>
                                <p className="text-sm text-gray-400">Client Satisfaction</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default About;
