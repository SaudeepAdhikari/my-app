import React, { useState } from 'react';
import { FaTwitter, FaLinkedin, FaFacebook, FaLink, FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ShareButtons = ({ url, title }) => {
    const [copied, setCopied] = useState(false);

    const shareUrl = url || window.location.href;
    const shareTitle = title || document.title;

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    };

    return (
        <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">Share:</span>

            <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#1DA1F2]/20 border border-white/10 hover:border-[#1DA1F2]/50 flex items-center justify-center text-gray-400 hover:text-[#1DA1F2] transition-all duration-300 hover:scale-110"
                aria-label="Share on Twitter"
            >
                <FaTwitter size={16} />
            </a>

            <a
                href={shareLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#0A66C2]/20 border border-white/10 hover:border-[#0A66C2]/50 flex items-center justify-center text-gray-400 hover:text-[#0A66C2] transition-all duration-300 hover:scale-110"
                aria-label="Share on LinkedIn"
            >
                <FaLinkedin size={16} />
            </a>

            <a
                href={shareLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#1877F2]/20 border border-white/10 hover:border-[#1877F2]/50 flex items-center justify-center text-gray-400 hover:text-[#1877F2] transition-all duration-300 hover:scale-110"
                aria-label="Share on Facebook"
            >
                <FaFacebook size={16} />
            </a>

            <button
                onClick={handleCopyLink}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/50 flex items-center justify-center text-gray-400 hover:text-primary transition-all duration-300 hover:scale-110 relative"
                aria-label="Copy link"
            >
                {copied ? (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    >
                        <FaCheck size={16} className="text-green-500" />
                    </motion.div>
                ) : (
                    <FaLink size={16} />
                )}
            </button>
        </div>
    );
};

export default ShareButtons;
