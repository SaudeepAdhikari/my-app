import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPalette, FaCheck, FaTimes } from 'react-icons/fa';
import { useLivery, LIVERIES } from '../context/LiveryContext';

const LiverySwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentLivery, livery, setLivery } = useLivery();
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('touchstart', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-2xs border border-white/15 bg-white/5 hover:border-white/30 text-gray-300 hover:text-white transition-all text-xs font-hud font-bold tracking-wider cursor-pointer"
        title="Change Constructor Livery Theme"
        aria-label="F1 Team Livery Switcher"
      >
        <span
          className="w-2.5 h-2.5 rounded-full border border-black/40 shadow-sm"
          style={{ backgroundColor: livery.primaryColor }}
        />
        <span className="hidden xl:inline text-[10px] uppercase font-mono">
          LIVERY: {livery.name.split(' ')[0]}
        </span>
        <FaPalette className="text-[11px] text-gray-400" />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-72 bg-[#0B0F17]/90 backdrop-blur-md border border-white/20 rounded-xs shadow-2xl p-3 z-50 f1-cut-bottom-right"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <FaPalette className="text-xs text-white" />
                <span className="font-hud font-bold text-[10px] uppercase tracking-widest text-white">
                  SELECT CONSTRUCTOR LIVERY
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white text-xs p-1"
                aria-label="Close Livery Palette"
              >
                <FaTimes />
              </button>
            </div>

            <p className="font-sans text-[10px] text-gray-400 mb-2.5 leading-relaxed">
              Switch the aerodynamic telemetry and cockpit highlights to your favorite F1 team:
            </p>

            {/* Team Livery Options */}
            <div className="flex flex-col gap-1.5">
              {Object.entries(LIVERIES).map(([key, item]) => {
                const isSelected = currentLivery === key;
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setLivery(key);
                      setIsOpen(false);
                    }}
                    className={`flex items-center justify-between p-2 rounded-2xs border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white/10 border-white/40 shadow-md'
                        : 'bg-[#05070B] border-white/5 hover:border-white/20 text-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {/* Dual color swatch pill */}
                      <div className="flex items-center overflow-hidden rounded-xs border border-white/20 w-5 h-5 shrink-0">
                        <div
                          className="w-1/2 h-full"
                          style={{ backgroundColor: item.primaryColor }}
                        />
                        <div
                          className="w-1/2 h-full"
                          style={{ backgroundColor: item.secondaryColor }}
                        />
                      </div>

                      <div className="flex flex-col">
                        <span className="font-f1 font-black italic text-xs text-white uppercase tracking-wider flex items-center gap-1.5">
                          {item.name}
                        </span>
                        <span className="font-hud text-[8px] text-gray-400 uppercase tracking-widest">
                          {item.constructor}
                        </span>
                      </div>
                    </div>

                    {isSelected && (
                      <span className="p-1 rounded-full text-[9px] bg-white text-black font-bold">
                        <FaCheck />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-2.5 pt-2 border-t border-white/10 text-center font-mono text-[8px] text-gray-500 uppercase tracking-widest">
              PERSISTENT // SAVED IN RACING TELEMETRY
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LiverySwitcher;

