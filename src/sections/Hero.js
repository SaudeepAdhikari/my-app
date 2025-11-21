import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import profileImg from '../assets/profile.jpg';
import ThreeBackground from '../components/ThreeBackground';

const Hero = () => {
    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* 3D Background */}
            <ThreeBackground />

            {/* Background Blobs (Optional: kept for extra depth, or remove if too busy) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full mix-blend-screen filter blur-3xl animate-blob"></div>
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-secondary/10 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-2000"></div>
            </div>

            <div className="container mx-auto px-4 z-10 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative mb-8 group"
                >
                    <div className="w-40 h-40 md:w-48 md:h-48 rounded-full p-1 bg-gradient-to-r from-primary to-secondary relative z-10">
                        <img
                            src={profileImg}
                            alt="Saudeep Adhikari"
                            className="w-full h-full object-cover rounded-full border-4 border-dark transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 -z-10 animate-pulse"></div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
                >
                    Hi, I'm <span className="text-gradient">Saudeep Adhikari</span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-xl md:text-2xl text-gray-300 mb-8 h-8"
                >
                    <TypeAnimation
                        sequence={[
                            'Full Stack Web Developer',
                            2000,
                            'Collaborative Team Player',
                            2000,
                            'Creative Problem Solver',
                            2000,
                        ]}
                        wrapper="span"
                        speed={50}
                        repeat={Infinity}
                        className="font-medium text-primary"
                    />
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-gray-400 mb-8 max-w-2xl text-lg"
                >
                    Crafting digital experiences that blend creativity with functionality.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <a href="#contact" className="btn-primary">
                        Get In Touch
                    </a>
                    <a href="#projects" className="btn-secondary">
                        View My Work
                    </a>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
                >
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
