import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { FaFlag, FaBroadcastTower } from 'react-icons/fa';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const navLinks = [
  { id: 'hero',     num: '01', label: 'GRID (HOME)'            },
  { id: 'about',    num: '02', label: 'PILOT (ABOUT)'          },
  { id: 'skills',   num: '03', label: 'POWER UNIT (SKILLS)'    },
  { id: 'services', num: '04', label: 'PIT STOP (SERVICES)'    },
  { id: 'projects', num: '05', label: 'GRAND PRIX (PROJECTS)'  },
  { id: 'resume',   num: '06', label: 'LAP LOG (EXPERIENCE)'   },
  { id: 'blog',     num: '07', label: 'PADDOCK (BLOGS)'        },
  { id: 'contact',  num: '08', label: 'PIT RADIO (CONTACT)'    },
];

const Navbar = () => {
  const { data } = usePortfolioData();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActive] = useState('hero');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const updateActiveSection = () => {
      const scrollY = window.scrollY;
      const threshold = window.innerHeight * 0.35;
      if (scrollY < 80) { setActive('hero'); return; }
      let currentSection = navLinks[0].id;
      for (const link of navLinks) {
        const element = document.getElementById(link.id);
        if (!element) continue;
        const sectionTop = element.getBoundingClientRect().top + scrollY;
        if (scrollY + threshold >= sectionTop) currentSection = link.id;
      }
      setActive(currentSection);
    };
    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    return () => window.removeEventListener('scroll', updateActiveSection);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const name = data?.personalInfo?.shortName || 'SAUDEEP';

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        role="banner"
      >
        {/* Top F1 Red Racing Accent Line */}
        <div className="w-full h-[3px] bg-gradient-to-r from-f1Red via-f1Teal to-f1Purple" />

        {/* Live Timing / Race Status Bar */}
        <div className="bg-[#05070B]/90 backdrop-blur-md border-b border-white/5 px-4 py-1 hidden lg:block">
          <div className="max-w-7xl mx-auto flex items-center justify-between font-hud text-[11px] tracking-wider text-gray-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-white font-bold">
                <span className="w-2 h-2 rounded-full bg-f1Green" />
                <span className="text-f1Green">TRACK STATUS:</span> GREEN FLAG
              </span>
              <span className="text-white/20">|</span>
              <span className="text-gray-300">
                SESSION: <strong className="text-white">Q3 QUALIFYING</strong>
              </span>
              <span className="text-white/20">|</span>
              <span className="text-gray-300">
                CURRENT POSITION: <span className="bg-f1Red text-white px-1.5 py-0.2 font-black rounded-sm">P1</span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-purple-300">
                <span className="w-2 h-2 rounded-sm bg-f1Purple" /> S1: <strong>24.128s</strong> (PURPLE)
              </span>
              <span className="flex items-center gap-1 text-teal-300">
                <span className="w-2 h-2 rounded-sm bg-f1Teal" /> S2: <strong>28.340s</strong> (PB)
              </span>
              <span className="flex items-center gap-1 text-purple-300">
                <span className="w-2 h-2 rounded-sm bg-f1Purple" /> S3: <strong>25.892s</strong> (PURPLE)
              </span>
              <span className="bg-f1Teal/20 text-f1Teal border border-f1Teal/40 px-2 py-0.5 rounded-sm font-bold text-[10px]">
                DRS ACTIVE
              </span>
            </div>
          </div>
        </div>

        {/* Main Pit Wall Bar */}
        <div
          className={`px-4 transition-all duration-300 ${
            scrolled ? 'py-2 bg-[#080B10]/95 backdrop-blur-xl shadow-2xl border-b border-white/10' : 'py-3.5 bg-[#080B10]/75 backdrop-blur-md'
          }`}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* F1 Team Brand */}
            <button
              onClick={() => scrollTo('hero')}
              className="flex items-center gap-3 group text-left cursor-pointer"
              aria-label="Saudeep Adhikari F1 Portfolio"
            >
              {/* F1 Style Chevron Badge */}
              <div className="flex items-center">
                <div className="bg-f1Red text-white font-black italic px-2.5 py-1 text-sm tracking-tighter skew-x-[-12deg] shadow-lg shadow-f1Red/30 group-hover:bg-red-500 transition-colors">
                  F1
                </div>
                <div className="w-[3px] h-6 bg-white/20 mx-2 skew-x-[-12deg]" />
              </div>
              <div className="flex flex-col">
                <span className="font-f1 font-black italic text-lg sm:text-xl text-white tracking-wider leading-none group-hover:text-f1Teal transition-colors">
                  {name.toUpperCase()}
                </span>
                <span className="font-hud text-[9px] tracking-[0.25em] text-f1Teal uppercase font-semibold">
                  MERCEDES SPEC // DEV
                </span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Racing Navigation">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className={`relative px-3 py-1.5 font-f1 font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className={`font-mono text-[9px] ${isActive ? 'text-f1Red font-black' : 'text-gray-500'}`}>
                        {link.num}
                      </span>
                      <span>{link.label}</span>
                    </div>

                    {/* Active Sector Indicator Bar */}
                    {isActive && (
                      <motion.div
                        layoutId="activeSector"
                        className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-gradient-to-r from-f1Red to-f1Teal"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Action Buttons: Pit Radio & Mobile Menu Toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => scrollTo('contact')}
                className="hidden sm:inline-flex items-center gap-2 font-f1 font-black italic uppercase text-xs tracking-wider px-4 py-2 bg-gradient-to-r from-f1Red to-red-700 text-white clip-path-slant hover:from-red-600 hover:to-f1Red shadow-lg shadow-f1Red/25 transition-all duration-300"
                style={{ clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)' }}
                title="Transmit message to contact section"
              >
                <span className="w-2 h-2 rounded-full bg-white" />
                <FaBroadcastTower className="text-xs" />
                <span>PIT RADIO (CONTACT)</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2 text-gray-300 hover:text-white bg-white/5 border border-white/10 rounded-sm cursor-pointer"
                aria-label="Toggle navigation"
              >
                {menuOpen ? <HiX className="w-6 h-6 text-f1Red" /> : <HiMenuAlt3 className="w-6 h-6 text-f1Teal" />}
              </button>
            </div>
          </div>
        </div>

        {/* Chequered flag strip under navbar */}
        <div className="chequered-stripe w-full" />
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[88px] z-40 bg-[#080B10]/98 backdrop-blur-2xl border-b border-white/10 p-6 lg:hidden shadow-2xl"
          >
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 text-xs font-hud text-gray-400">
              <span className="text-f1Teal font-bold">PIT WALL COMMAND MENU</span>
              <span className="bg-f1Red text-white px-2 py-0.5 rounded-sm font-black">P1</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`flex items-center gap-2 p-3 font-f1 font-bold text-sm tracking-wider uppercase border text-left transition-all ${
                    activeSection === link.id
                      ? 'border-f1Red bg-f1Red/15 text-white'
                      : 'border-white/5 bg-white/5 text-gray-300 hover:border-f1Teal/40 hover:text-white'
                  }`}
                  style={{ clipPath: 'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)' }}
                >
                  <span className="font-mono text-xs text-f1Teal">{link.num}</span>
                  <span>{link.label}</span>
                </button>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-hud text-gray-400">
                <FaFlag className="text-f1Teal" />
                <span>GRID: NEPAL</span>
              </div>
              <button
                onClick={() => scrollTo('contact')}
                className="btn-f1-primary text-xs py-2 px-4"
              >
                CONNECT RADIO
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
