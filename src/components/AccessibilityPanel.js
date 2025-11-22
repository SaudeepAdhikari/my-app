import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUniversalAccess, FaTimes, FaFont, FaAdjust, FaKeyboard } from 'react-icons/fa';

const AccessibilityPanel = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [fontSize, setFontSize] = useState('medium');
    const [highContrast, setHighContrast] = useState(false);
    const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);

    // Load preferences from localStorage
    useEffect(() => {
        const savedFontSize = localStorage.getItem('fontSize');
        const savedHighContrast = localStorage.getItem('highContrast');

        if (savedFontSize) {
            setFontSize(savedFontSize);
            applyFontSize(savedFontSize);
        }
        if (savedHighContrast === 'true') {
            setHighContrast(true);
            document.documentElement.classList.add('high-contrast');
        }
    }, []);

    const applyFontSize = (size) => {
        const root = document.documentElement;
        root.classList.remove('font-small', 'font-medium', 'font-large', 'font-xlarge');
        root.classList.add(`font-${size}`);
    };

    const handleFontSizeChange = (size) => {
        setFontSize(size);
        applyFontSize(size);
        localStorage.setItem('fontSize', size);
    };

    const handleHighContrastToggle = () => {
        const newValue = !highContrast;
        setHighContrast(newValue);

        if (newValue) {
            document.documentElement.classList.add('high-contrast');
        } else {
            document.documentElement.classList.remove('high-contrast');
        }

        localStorage.setItem('highContrast', newValue);
    };

    return (
        <>
            {/* Floating Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 1.5 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-8 left-8 z-50 w-14 h-14 bg-gradient-to-r from-primary to-secondary rounded-full shadow-lg hover:shadow-primary/50 transition-all duration-300 flex items-center justify-center group hover:scale-110 active:scale-95"
                aria-label="Accessibility Options"
            >
                <FaUniversalAccess className="text-white text-2xl group-hover:rotate-12 transition-transform" />
            </motion.button>

            {/* Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ type: 'spring', damping: 25 }}
                        className="fixed bottom-24 left-8 z-50 w-80 glass-panel p-6"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <FaUniversalAccess className="text-primary" />
                                Accessibility
                            </h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-white transition-colors"
                                aria-label="Close"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        {/* Font Size */}
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-3">
                                <FaFont className="text-primary" />
                                <label className="text-sm font-semibold">Font Size</label>
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                {['small', 'medium', 'large', 'xlarge'].map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => handleFontSizeChange(size)}
                                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${fontSize === size
                                                ? 'bg-primary text-white'
                                                : 'bg-white/5 text-gray-300 hover:bg-white/10'
                                            }`}
                                    >
                                        {size === 'small' && 'S'}
                                        {size === 'medium' && 'M'}
                                        {size === 'large' && 'L'}
                                        {size === 'xlarge' && 'XL'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* High Contrast */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <FaAdjust className="text-primary" />
                                    <label className="text-sm font-semibold">High Contrast</label>
                                </div>
                                <button
                                    onClick={handleHighContrastToggle}
                                    className={`relative w-12 h-6 rounded-full transition-colors ${highContrast ? 'bg-primary' : 'bg-white/20'
                                        }`}
                                    aria-label="Toggle High Contrast"
                                >
                                    <motion.div
                                        animate={{ x: highContrast ? 24 : 2 }}
                                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                        className="absolute top-1 w-4 h-4 bg-white rounded-full"
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Keyboard Navigation */}
                        <div>
                            <button
                                onClick={() => setShowKeyboardHelp(!showKeyboardHelp)}
                                className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary transition-colors"
                            >
                                <FaKeyboard />
                                Keyboard Shortcuts
                            </button>

                            <AnimatePresence>
                                {showKeyboardHelp && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-3 text-xs text-gray-400 space-y-1 overflow-hidden"
                                    >
                                        <p><kbd className="px-2 py-1 bg-white/10 rounded">Tab</kbd> Navigate forward</p>
                                        <p><kbd className="px-2 py-1 bg-white/10 rounded">Shift + Tab</kbd> Navigate back</p>
                                        <p><kbd className="px-2 py-1 bg-white/10 rounded">Enter</kbd> Activate link/button</p>
                                        <p><kbd className="px-2 py-1 bg-white/10 rounded">Esc</kbd> Close modals</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AccessibilityPanel;
