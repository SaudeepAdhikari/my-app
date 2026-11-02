import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { FaTimes, FaCalendar, FaSearch, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import ShareButtons from '../components/ShareButtons';
import { usePortfolioData } from '../context/PortfolioDataContext';

const INITIAL_DISPLAY_COUNT = 6;

const Blog = () => {
  const { data } = usePortfolioData();
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [visibleCount, setVisibleCount] = useState(INITIAL_DISPLAY_COUNT);

  if (!data) return null;
  const { blogPosts: posts } = data;

  // Sort posts by date descending (latest first)
  const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));

  const allTags = ['All', ...new Set(sortedPosts.flatMap(post => post.tags))];

  const filteredPosts = sortedPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'All' || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const displayedPosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;
  const isExpanded = visibleCount > INITIAL_DISPLAY_COUNT;

  const handleShowMore = () => {
    setVisibleCount(prev => Math.min(prev + 6, filteredPosts.length));
  };

  const handleShowLess = () => {
    setVisibleCount(INITIAL_DISPLAY_COUNT);
    const blogSection = document.getElementById('blog');
    if (blogSection) {
      blogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="blog" className="relative py-24 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="f1-section-header">
          <div className="flex items-center gap-2">
            <span className="bg-f1Red text-white text-[10px] font-black italic px-2 py-0.5 rounded-2xs">
              PADDOCK INSIGHTS
            </span>
            <div className="font-hud text-xs tracking-[0.25em] text-f1Teal font-bold uppercase">
              RACE ENGINEERING &amp; TECHNICAL DEBRIEFS
            </div>
          </div>
          <h2 className="f1-section-title mt-2">
            PADDOCK INTELLIGENCE (BLOGS &amp; DEBRIEFS)
          </h2>
          <div className="f1-speed-strip w-48 mt-3" />
        </div>

        {/* Search Bar & Tag Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          <div className="relative w-full md:w-80">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-xs" />
            <input
              type="text"
              placeholder="Search debrief telemetry..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(INITIAL_DISPLAY_COUNT);
              }}
              className="w-full pl-9 pr-4 py-2.5 bg-[#05070B] border border-white/15 focus:border-f1Teal focus:ring-1 focus:ring-f1Teal text-xs text-white font-mono rounded-2xs outline-none transition-all placeholder:text-gray-600"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setSelectedTag(tag);
                  setVisibleCount(INITIAL_DISPLAY_COUNT);
                }}
                className={`px-3 py-1 font-f1 font-bold text-xs uppercase tracking-wider rounded-2xs transition-all cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-f1Red text-white shadow-md'
                    : 'bg-[#05070B] border border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedPosts.length > 0 ? (
            displayedPosts.map((post, index) => (
              <div
                key={post.id || index}
                onClick={() => setSelectedPost(post)}
                className="f1-card p-6 f1-cut border border-white/10 hover:border-f1Teal/50 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-3 pb-2 border-b border-white/10">
                    <span className="flex items-center gap-1.5 text-f1Teal">
                      <FaCalendar className="text-[10px]" />
                      <span>{post.date}</span>
                    </span>
                    <span className="text-[10px] text-gray-500 uppercase">
                      DEBRIEF #{String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="font-f1 font-black italic text-xl text-white uppercase group-hover:text-f1Teal transition-colors mb-3">
                    {post.title}
                  </h3>

                  <p className="font-sans text-xs text-gray-300 leading-relaxed mb-4 line-clamp-3">
                    {post.summary}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                  {post.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] font-mono px-2 py-0.5 bg-white/5 text-gray-400 rounded-2xs">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500 font-mono text-sm">
              NO PADDOCK DEBRIEFS MATCHING QUERY.
            </div>
          )}
        </div>

        {/* See More / See Less Controls */}
        {filteredPosts.length > INITIAL_DISPLAY_COUNT && (
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            {hasMore && (
              <button
                onClick={handleShowMore}
                className="btn-f1-primary cursor-pointer flex items-center gap-2"
              >
                <span>SEE MORE DEBRIEFS ({filteredPosts.length - visibleCount} REMAINING)</span>
                <FaChevronDown className="text-xs" />
              </button>
            )}

            {isExpanded && (
              <button
                onClick={handleShowLess}
                className="btn-f1-outline cursor-pointer flex items-center gap-2"
              >
                <span>SHOW LESS</span>
                <FaChevronUp className="text-xs" />
              </button>
            )}
          </div>
        )}

      </div>

      {/* Post Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setSelectedPost(null)}
          >
            <div
              className="f1-card w-full max-w-3xl max-h-[85vh] overflow-y-auto p-6 sm:p-8 border border-white/20 f1-cut-lg shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-f1Red transition-colors"
                aria-label="Close dialog"
              >
                <FaTimes size={20} />
              </button>

              <div className="flex items-center gap-2 text-xs font-mono text-f1Teal mb-2">
                <FaCalendar />
                <span>{selectedPost.date}</span>
              </div>

              <h2 className="font-f1 font-black italic text-2xl sm:text-3xl text-white uppercase mb-4">
                {selectedPost.title}
              </h2>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {selectedPost.tags.map((tag, i) => (
                  <span key={i} className="text-[10px] font-mono px-2 py-0.5 bg-f1Red/15 text-f1Red border border-f1Red/30 rounded-2xs">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="prose prose-invert max-w-none text-gray-300 font-sans text-sm leading-relaxed border-t border-white/10 pt-4">
                <ReactMarkdown>{selectedPost.content}</ReactMarkdown>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <ShareButtons url={window.location.href} title={selectedPost.title} />
                <button
                  onClick={() => setSelectedPost(null)}
                  className="btn-f1-outline text-xs py-1.5 px-3"
                >
                  DISMISS DEBRIEF
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Blog;
