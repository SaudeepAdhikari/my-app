import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { posts } from '../data/posts';
import { FaTimes, FaCalendar, FaTag } from 'react-icons/fa';

const Blog = () => {
    const [selectedPost, setSelectedPost] = useState(null);

    return (
        <section id="blog" className="section-container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                    Latest <span className="text-gradient">Articles</span>
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="glass-panel p-6 cursor-pointer group hover:border-primary/50 transition-colors"
                            onClick={() => setSelectedPost(post)}
                        >
                            <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                                <FaCalendar className="text-primary" />
                                <span>{post.date}</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                                {post.title}
                            </h3>
                            <p className="text-gray-400 mb-4 line-clamp-3">
                                {post.summary}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag, i) => (
                                    <span key={i} className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-300">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Blog Post Modal */}
            <AnimatePresence>
                {selectedPost && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setSelectedPost(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="glass-panel w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8 relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedPost(null)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                            >
                                <FaTimes size={24} />
                            </button>

                            <div className="mb-6">
                                <div className="flex items-center gap-2 text-sm text-primary mb-2">
                                    <FaCalendar />
                                    <span>{selectedPost.date}</span>
                                </div>
                                <h2 className="text-3xl font-bold mb-4">{selectedPost.title}</h2>
                                <div className="flex flex-wrap gap-2">
                                    {selectedPost.tags.map((tag, i) => (
                                        <span key={i} className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
                                            <FaTag size={10} />
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="prose prose-invert max-w-none">
                                <ReactMarkdown>{selectedPost.content}</ReactMarkdown>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Blog;
