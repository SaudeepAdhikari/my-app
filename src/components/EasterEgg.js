import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

const EasterEgg = () => {
    const [showMessage, setShowMessage] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const createConfetti = (color) => {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = color;
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.opacity = '1';
        confetti.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        confetti.style.borderRadius = '50%';

        document.body.appendChild(confetti);

        let pos = -10;
        let rotation = Math.random() * 360;
        const fallSpeed = 2 + Math.random() * 3;
        const rotationSpeed = (Math.random() - 0.5) * 10;
        const drift = (Math.random() - 0.5) * 2;
        let left = parseFloat(confetti.style.left);

        const fall = setInterval(() => {
            pos += fallSpeed;
            rotation += rotationSpeed;
            left += drift;

            confetti.style.top = pos + 'px';
            confetti.style.left = left + 'px';
            confetti.style.transform = 'rotate(' + rotation + 'deg)';
            confetti.style.opacity = 1 - (pos / window.innerHeight);

            if (pos > window.innerHeight) {
                clearInterval(fall);
                document.body.removeChild(confetti);
            }
        }, 20);
    };

    const triggerConfetti = useCallback(() => {
        const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b'];
        const confettiCount = 50;

        for (let i = 0; i < confettiCount; i++) {
            createConfetti(colors[Math.floor(Math.random() * colors.length)]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            const key = e.key;

            if (key === konamiCode[currentIndex]) {
                setCurrentIndex(prev => prev + 1);

                if (currentIndex === konamiCode.length - 1) {
                    setShowMessage(true);
                    triggerConfetti();
                    setCurrentIndex(0);

                    setTimeout(() => {
                        setShowMessage(false);
                    }, 5000);
                }
            } else {
                setCurrentIndex(0);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex, triggerConfetti]);

    return (
        <AnimatePresence>
            {showMessage && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: -50 }}
                    transition={{ type: 'spring', duration: 0.5 }}
                    className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[9999] pointer-events-none"
                >
                    <div className="glass-panel p-8 text-center border-2 border-primary shadow-2xl shadow-primary/50">
                        <motion.div
                            animate={{
                                rotate: [0, 10, -10, 10, 0],
                                scale: [1, 1.1, 1, 1.1, 1]
                            }}
                            transition={{ duration: 0.5, repeat: 3 }}
                            className="text-6xl mb-4"
                        >
                            🎉
                        </motion.div>
                        <h2 className="text-3xl font-bold text-gradient mb-2">
                            You Found It!
                        </h2>
                        <p className="text-gray-300 text-lg">
                            Konami Code Activated! 🎮
                        </p>
                        <p className="text-gray-400 text-sm mt-2">
                            You're a true gamer! 🚀
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default EasterEgg;
