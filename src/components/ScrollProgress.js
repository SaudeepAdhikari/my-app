import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3.5px] origin-left z-[100]"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #E10600 0%, #00D2BE 50%, #B138DD 100%)',
        boxShadow: '0 0 12px rgba(225, 6, 0, 0.8), 0 0 24px rgba(0, 210, 190, 0.5)',
      }}
    />
  );
};

export default ScrollProgress;
