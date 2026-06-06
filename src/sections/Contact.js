import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';
import { FaPaperPlane, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub } from 'react-icons/fa';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { usePortfolioData } from '../context/PortfolioDataContext';

const Contact = () => {
    const { data } = usePortfolioData();
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    if (!data) return null;
    const { personalInfo, socialLinks } = data;

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        if (!form.name || !form.email || !form.subject || !form.message) {
            setStatus({ type: 'error', message: 'Please fill in all fields.' });
            setLoading(false);
            return;
        }

        try {
            const cfg = personalInfo.emailjs;
            if (!cfg?.serviceId || !cfg?.templateId || !cfg?.publicKey)
                throw new Error('EmailJS is not configured in portfolioData.json');

            await emailjs.send(cfg.serviceId, cfg.templateId, {
                name: form.name, user_name: form.name,
                user_email: form.email, subject: form.subject, message: form.message,
            }, cfg.publicKey);

            setStatus({ type: 'success', message: '✓ Message sent! I\'ll get back to you soon.' });
            setForm({ name: '', email: '', subject: '', message: '' });
        } catch (err) {
            setStatus({ type: 'error', message: err.message || 'Failed to send. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="relative overflow-hidden">
            <div className="glow-cyan w-[700px] h-[700px] bottom-0 left-1/2 -translate-x-1/2 opacity-20" />

            <div className="section-container relative z-10">
                {/* CTA headline */}
                <div className="text-center mb-20">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="section-label justify-center"
                    >
                        <span className="w-6 h-px bg-accent inline-block" /> Contact
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="section-title text-5xl md:text-6xl lg:text-7xl"
                    >
                        Let's build<br />
                        <span className="text-gradient">something great</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-secondary mt-6 max-w-lg mx-auto leading-relaxed"
                    >
                        Have a project in mind, a role to fill, or just want to connect? I'm always open to new conversations.
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-5 gap-10">
                    {/* Info panel */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="lg:col-span-2 flex flex-col gap-6"
                    >
                        {/* Availability indicator */}
                        <div className="glass rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                                <span className="text-xs font-bold uppercase tracking-widest text-green-400">
                                    {personalInfo.availability?.statusText || 'Available for Work'}
                                </span>
                            </div>
                            <p className="text-sm text-secondary leading-relaxed">
                                Currently accepting freelance projects and full-time opportunities. My response time is usually under 24 hours.
                            </p>
                        </div>

                        {/* Contact info */}
                        <div className="glass rounded-2xl p-6 space-y-5">
                            <a
                                href={`mailto:${personalInfo.email}`}
                                className="flex items-center gap-4 group"
                            >
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-accent flex-shrink-0 group-hover:scale-110 transition-transform"
                                    style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)' }}>
                                    <FaEnvelope size={14} />
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-xs text-secondary mb-0.5">Email</p>
                                    <p className="text-sm text-white group-hover:text-accent transition-colors truncate">
                                        {personalInfo.email}
                                    </p>
                                </div>
                                <HiOutlineArrowRight className="ml-auto text-gray-600 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                            </a>

                            <div className="h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />

                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-purpleGlow flex-shrink-0"
                                    style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)' }}>
                                    <FaMapMarkerAlt size={14} />
                                </div>
                                <div>
                                    <p className="text-xs text-secondary mb-0.5">Location</p>
                                    <p className="text-sm text-white">{personalInfo.location}</p>
                                </div>
                            </div>
                        </div>

                        {/* Social quick links */}
                        {socialLinks && (
                            <div className="glass rounded-2xl p-6">
                                <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-4">Find me on</p>
                                <div className="flex flex-wrap gap-3">
                                    {socialLinks.map((s, i) => (
                                        <a
                                            key={i}
                                            href={s.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 text-secondary hover:text-accent transition-all duration-300 hover:-translate-y-0.5"
                                            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                                        >
                                            {s.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-3"
                    >
                        <div className="glass-strong rounded-3xl p-8 md:p-10">
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid sm:grid-cols-2 gap-5">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-secondary uppercase tracking-wider">Name</label>
                                        <input
                                            type="text" name="name" value={form.name}
                                            onChange={handleChange} placeholder="John Doe"
                                            className="input-field"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-secondary uppercase tracking-wider">Email</label>
                                        <input
                                            type="email" name="email" value={form.email}
                                            onChange={handleChange} placeholder="john@example.com"
                                            className="input-field"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-secondary uppercase tracking-wider">Subject</label>
                                    <input
                                        type="text" name="subject" value={form.subject}
                                        onChange={handleChange} placeholder="How can I help?"
                                        className="input-field"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-secondary uppercase tracking-wider">Message</label>
                                    <textarea
                                        name="message" rows="5" value={form.message}
                                        onChange={handleChange} placeholder="Tell me about your project..."
                                        className="input-field resize-none"
                                    />
                                </div>

                                {status.message && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-4 rounded-xl text-sm font-medium"
                                        style={{
                                            background: status.type === 'success' ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)',
                                            border: `1px solid ${status.type === 'success' ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}`,
                                            color: status.type === 'success' ? '#4ade80' : '#f87171',
                                        }}
                                    >
                                        {status.message}
                                    </motion.div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn-primary w-full py-4 text-sm justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Sending...
                                        </span>
                                    ) : (
                                        <>Send Message <FaPaperPlane size={13} /></>
                                    )}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
