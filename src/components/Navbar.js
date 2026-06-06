import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioData } from '../context/PortfolioDataContext';

const navLinks = [
  { id: 'hero',     label: 'Home'     },
  { id: 'about',    label: 'About'    },
  { id: 'skills',   label: 'Skills'   },
  { id: 'services', label: 'Work'     },
  { id: 'projects', label: 'Projects' },
  { id: 'resume',   label: 'Resume'   },
  { id: 'blog',     label: 'Blog'     },
  { id: 'contact',  label: 'Contact'  },
];

const Navbar = () => {
  const { data } = usePortfolioData();
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [activeSection, setActive]  = useState('hero');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section detection — last section whose top has passed the scroll threshold
  useEffect(() => {
    const updateActiveSection = () => {
      const scrollY = window.scrollY;
      const threshold = window.innerHeight * 0.3;

      if (scrollY < 80) {
        setActive('hero');
        return;
      }

      let currentSection = navLinks[0].id;

      for (const link of navLinks) {
        const element = document.getElementById(link.id);
        if (!element) continue;

        const sectionTop = element.getBoundingClientRect().top + scrollY;
        if (scrollY + threshold >= sectionTop) {
          currentSection = link.id;
        }
      }

      setActive(currentSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const name = data?.personalInfo?.shortName || 'SA';

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-5"
      >
        <nav
          className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-500"
          style={{
            background: scrolled ? 'rgba(3,7,18,0.85)' : 'rgba(3,7,18,0.5)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(255,255,255,0.04)',
            boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.4)' : 'none',
          }}
        >
          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-2 mr-3 group"
          >
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-dark"
              style={{ background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)' }}>
              {name.charAt(0)}
            </div>
            <span className="text-sm font-bold text-white hidden sm:block tracking-wide">{name}</span>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="relative px-3 py-1.5 text-sm rounded-full transition-colors duration-200"
                style={{ color: activeSection === link.id ? '#06b6d4' : 'rgba(255,255,255,0.6)' }}
              >
                {activeSection === link.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)' }}
                    transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            ))}
          </div>

          {/* CTA */}
          <a
            href={`mailto:${data?.personalInfo?.email}`}
            className="hidden md:block ml-2 px-4 py-1.5 rounded-full text-xs font-semibold text-white transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(6,182,212,0.2), rgba(139,92,246,0.2))',
              border: '1px solid rgba(6,182,212,0.25)',
            }}
          >
            Hire me
          </a>

          {/* Hamburger */}
          <button
            className="md:hidden ml-2 w-8 h-8 flex flex-col justify-center items-center gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="block w-5 h-0.5 bg-white rounded-full origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className="block w-5 h-0.5 bg-white rounded-full"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="block w-5 h-0.5 bg-white rounded-full origin-center"
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed top-20 left-4 right-4 z-40 rounded-2xl p-5"
            style={{
              background: 'rgba(3,7,18,0.95)',
              backdropFilter: 'blur(40px)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
            }}
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(link.id)}
                  className="text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors"
                  style={{
                    color: activeSection === link.id ? '#06b6d4' : 'rgba(255,255,255,0.7)',
                    background: activeSection === link.id ? 'rgba(6,182,212,0.08)' : 'transparent',
                  }}
                >
                  {link.label}
                </motion.button>
              ))}
              <div className="mt-2 pt-3 border-t border-white/5">
                <a
                  href={`mailto:${data?.personalInfo?.email}`}
                  className="btn-primary w-full justify-center text-xs"
                >
                  Hire me
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
