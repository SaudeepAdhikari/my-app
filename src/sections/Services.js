import React from 'react';
import { motion } from 'framer-motion';
import { services } from '../data/services';
import { FaCheck } from 'react-icons/fa';

const Services = () => {
    return (
        <section id="services" className="section-container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                    What I <span className="text-gradient">Offer</span>
                </h2>
                <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
                    Comprehensive development services to bring your ideas to life with modern technologies and best practices.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="glass-panel p-8 group hover:border-primary/50 transition-all duration-300 relative overflow-hidden"
                        >
                            {/* Background gradient effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="relative z-10">
                                {/* Icon */}
                                <div className="text-6xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                    {service.icon}
                                </div>

                                {/* Title */}
                                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                                    {service.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                                    {service.description}
                                </p>

                                {/* Features */}
                                <ul className="space-y-2">
                                    {service.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                                            <FaCheck className="text-primary mt-1 flex-shrink-0" size={12} />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Hover border effect */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Services;
