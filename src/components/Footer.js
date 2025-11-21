import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    const socialLinks = [
        { icon: <FaGithub />, href: "https://github.com/saudeepadhikari", label: "GitHub" },
        { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/saudeep-adhikari-b558aa2a8/", label: "LinkedIn" },
        { icon: <FaEnvelope />, href: "mailto:saudeepadhikari543@gmail.com", label: "Email" },
        { icon: <FaFacebook />, href: "https://www.facebook.com/saudeep.adhikariking", label: "Facebook" },
        { icon: <FaInstagram />, href: "https://www.instagram.com/only_one_king007/", label: "Instagram" },
    ];

    return (
        <footer className="bg-dark border-t border-white/10 py-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-heading font-bold text-white mb-2">Saudeep Adhikari</h3>
                        <p className="text-gray-400">Full Stack Developer & Designer</p>
                    </div>

                    <div className="flex gap-6">
                        {socialLinks.map((social, index) => (
                            <a
                                key={index}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-2xl text-gray-400 hover:text-primary transition-colors hover:-translate-y-1 transform duration-300"
                                aria-label={social.label}
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Saudeep Adhikari. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
