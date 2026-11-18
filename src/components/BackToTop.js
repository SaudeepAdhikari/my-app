import React, { useState, useEffect } from 'react';
import { FaChevronUp } from 'react-icons/fa';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to pole position / Top of page"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-1.5 px-3 py-2 bg-[#0E131B]/90 hover:bg-f1Red text-gray-300 hover:text-white border border-white/10 hover:border-f1Red rounded-2xs shadow-xl backdrop-blur-md transition-all duration-300 group cursor-pointer"
      style={{ clipPath: 'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)' }}
    >
      <FaChevronUp className="text-xs group-hover:-translate-y-0.5 transition-transform text-f1Teal group-hover:text-white" />
      <span className="font-hud text-[10px] tracking-widest font-bold uppercase hidden sm:inline">
        TOP // P1
      </span>
    </button>
  );
};

export default BackToTop;

