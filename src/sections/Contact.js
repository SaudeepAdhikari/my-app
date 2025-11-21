import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';
import { FaPaperPlane, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

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
            await emailjs.send(
                'service_dvxs0i8',
                'template_xytrhan',
                {
                    name: form.name,
                    user_name: form.name,
                    user_email: form.email,
                    subject: form.subject,
                    message: form.message,
                },
                '4rIpJ1RKaBOGuKVRQ'
            );
            setStatus({ type: 'success', message: 'Message sent successfully!' });
            setForm({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="section-container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
            >
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                    Get In <span className="text-gradient">Touch</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <h3 className="text-2xl font-bold mb-6">Let's Talk</h3>
                        <p className="text-gray-400 mb-8">
                            Have a project in mind or just want to say hi? Feel free to send me a message. I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                        </p>

                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                <FaEnvelope className="text-xl" />
                            </div>
                            <div>
                                <h4 className="font-bold">Email</h4>
                                <a href="mailto:saudeepadhikari543@gmail.com" className="text-gray-400 hover:text-primary transition-colors">
                                    saudeepadhikari543@gmail.com
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                                <FaMapMarkerAlt className="text-xl" />
                            </div>
                            <div>
                                <h4 className="font-bold">Location</h4>
                                <p className="text-gray-400">Nepal</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="glass-panel p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="input-field"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="input-field"
                                />
                            </div>
                            <input
                                type="text"
                                name="subject"
                                placeholder="Subject"
                                value={form.subject}
                                onChange={handleChange}
                                className="input-field"
                            />
                            <textarea
                                name="message"
                                placeholder="Message"
                                rows="4"
                                value={form.message}
                                onChange={handleChange}
                                className="input-field resize-none"
                            ></textarea>

                            {status.message && (
                                <div className={`p-4 rounded-lg text-sm ${status.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                    {status.message}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full btn-primary disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Sending...' : (
                                    <>
                                        Send Message <FaPaperPlane className="text-sm" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Contact;
