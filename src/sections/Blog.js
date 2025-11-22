import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { posts } from '../data/posts';
import { FaTimes, FaCalendar, FaTag, FaSearch } from 'react-icons/fa';
import ShareButtons from '../components/ShareButtons';

const Blog = () => {
    const [selectedPost, setSelectedPost] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState('All');

    // Get all unique tags
    const allTags = ['All', ...new Set(posts.flatMap(post => post.tags))];

    // Filter posts based on search and tag
    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.summary.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTag = selectedTag === 'All' || post.tags.includes(selectedTag);
        return matchesSearch && matchesTag;
    });

    return (
        <section id="blog" className="section-container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                    Latest <span className="text-gradient">Articles</span>
                </h2>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-6">
                    <div className="relative">
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                        />
                    </div>
                </div>

                {/* Tag Filters */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {allTags.map((tag) => (
                        <motion.button
                            key={tag}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedTag(tag)}
                            className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${selectedTag === tag
                                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30'
                                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                                }`}
                        >
                            #{tag}
                        </motion.button>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post, index) => (
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
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <p className="text-gray-400 text-lg">No articles found matching your search.</p>
                        </div>
                    )}
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
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {selectedPost.tags.map((tag, i) => (
                                        <span key={i} className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
                                            <FaTag size={10} />
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Share Buttons */}
                                <div className="pt-4 border-t border-white/10">
                                    <ShareButtons
                                        url={window.location.href}
                                        title={selectedPost.title}
                                    />
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
