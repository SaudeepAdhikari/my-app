import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTimes, FaTerminal, FaDownload, FaEnvelope, FaCode, FaBook, FaBriefcase, FaFlag, FaPalette } from 'react-icons/fa';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { useLivery } from '../context/LiveryContext';

const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { data } = usePortfolioData();
  const { livery, setLivery } = useLivery();
  const inputRef = useRef(null);

  // Keyboard shortcut listener (Ctrl+K or Cmd+K or Backtick `)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === '`' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus input on open & reset
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  const handleDownloadCV = () => {
    const resumePath = data?.personalInfo?.resumePath;
    if (resumePath) {
      window.open(resumePath, '_blank', 'noopener,noreferrer');
    }
    setIsOpen(false);
  };

  // Base Commands
  const commands = [
    {
      id: 'nav-home',
      category: 'NAVIGATION',
      icon: FaFlag,
      title: 'Jump to Grid (Home)',
      subtitle: 'Hero telemetry and reaction test',
      action: () => scrollTo('hero'),
    },
    {
      id: 'nav-about',
      category: 'NAVIGATION',
      icon: FaFlag,
      title: 'Jump to Pilot (About Me)',
      subtitle: 'Biography and tyre strategy methodology',
      action: () => scrollTo('about'),
    },
    {
      id: 'nav-skills',
      category: 'NAVIGATION',
      icon: FaCode,
      title: 'Jump to Power Unit (Technical Skills)',
      subtitle: 'Aero, Engine, ERS, and Pitcrew subsystems',
      action: () => scrollTo('skills'),
    },
    {
      id: 'nav-services',
      category: 'NAVIGATION',
      icon: FaBriefcase,
      title: 'Jump to Pit Stop (Services Offered)',
      subtitle: 'Frontend velocity, APIs, and performance engineering',
      action: () => scrollTo('services'),
    },
    {
      id: 'nav-projects',
      category: 'NAVIGATION',
      icon: FaCode,
      title: 'Jump to Grand Prix (Featured Projects)',
      subtitle: 'Production web apps and live deployments',
      action: () => scrollTo('projects'),
    },
    {
      id: 'nav-resume',
      category: 'NAVIGATION',
      icon: FaBriefcase,
      title: 'Jump to Lap Log (Experience & Education)',
      subtitle: 'Career stints and certifications',
      action: () => scrollTo('resume'),
    },
    {
      id: 'nav-blog',
      category: 'NAVIGATION',
      icon: FaBook,
      title: 'Jump to Paddock Intelligence (Blogs)',
      subtitle: 'Race engineering debriefs and technical articles',
      action: () => scrollTo('blog'),
    },
    {
      id: 'nav-contact',
      category: 'NAVIGATION',
      icon: FaEnvelope,
      title: 'Jump to Pit Radio (Contact Form)',
      subtitle: 'Transmit message or email directly',
      action: () => scrollTo('contact'),
    },
    {
      id: 'action-cv',
      category: 'ACTIONS',
      icon: FaDownload,
      title: 'Download Curriculum Vitae (PDF)',
      subtitle: 'Acquire official engineering dossier',
      action: handleDownloadCV,
    },
    {
      id: 'action-email',
      category: 'ACTIONS',
      icon: FaEnvelope,
      title: 'Send Direct Email Dispatch',
      subtitle: `Email ${data?.personalInfo?.email || 'saudeepadhikari@gmail.com'}`,
      action: () => {
        window.location.href = `mailto:${data?.personalInfo?.email || ''}`;
        setIsOpen(false);
      },
    },
    {
      id: 'livery-mercedes',
      category: 'LIVERY THEMES',
      icon: FaPalette,
      title: 'Set Livery: Mercedes-AMG Petronas',
      subtitle: 'Emerald Teal & Carbon Silver styling',
      action: () => {
        setLivery('mercedes');
        setIsOpen(false);
      },
    },
    {
      id: 'livery-ferrari',
      category: 'LIVERY THEMES',
      icon: FaPalette,
      title: 'Set Livery: Scuderia Ferrari',
      subtitle: 'Rosso Corsa & Giallo Modena styling',
      action: () => {
        setLivery('ferrari');
        setIsOpen(false);
      },
    },
    {
      id: 'livery-mclaren',
      category: 'LIVERY THEMES',
      icon: FaPalette,
      title: 'Set Livery: McLaren F1',
      subtitle: 'Papaya Orange & Anthracite Blue styling',
      action: () => {
        setLivery('mclaren');
        setIsOpen(false);
      },
    },
    {
      id: 'livery-redbull',
      category: 'LIVERY THEMES',
      icon: FaPalette,
      title: 'Set Livery: Red Bull Racing',
      subtitle: 'Cobalt Navy & Crimson Bull styling',
      action: () => {
        setLivery('redbull');
        setIsOpen(false);
      },
    },
  ];

  // Dynamic project searches from portfolioData
  const projectCommands = (data?.projects || []).map((project) => ({
    id: `project-${project.id}`,
    category: 'PROJECTS',
    icon: FaCode,
    title: `Project: ${project.title}`,
    subtitle: `${project.category || 'Web App'} // ${project.technologies?.slice(0, 3).join(', ')}`,
    action: () => {
      scrollTo('projects');
      setIsOpen(false);
    },
  }));

  const allCommands = [...commands, ...projectCommands];

  const filteredCommands = allCommands.filter((cmd) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.subtitle.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q)
    );
  });

  // Keyboard navigation inside results (Up/Down/Enter)
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    }
  };

  return (
    <>
      {/* Floating Trigger Pill on Screen Edge */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 left-28 z-40 hidden lg:flex items-center gap-2 px-3 py-2 bg-[#0B0F17]/90 backdrop-blur-md border border-white/15 hover:border-f1Teal/50 text-gray-300 hover:text-white rounded-sm text-xs font-mono shadow-xl transition-all cursor-pointer group"
        title="Open Pit Wall Command Palette (Ctrl+K)"
        aria-label="Command Palette"
      >
        <FaTerminal className="text-xs text-f1Teal group-hover:scale-110 transition-transform" />
        <span className="font-hud uppercase text-[10px] tracking-wider text-gray-300 font-bold">
          PIT PALETTE
        </span>
        <span className="px-1.5 py-0.5 bg-white/10 border border-white/20 rounded-2xs text-[9px] text-gray-400">
          Ctrl + K
        </span>
      </button>

      {/* Command Palette Modal */}
      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl bg-[#0B0F17]/95 backdrop-blur-xl border border-white/20 rounded-sm shadow-2xl overflow-hidden f1-cut-bottom-right"
            >
              {/* Search Bar Header */}
              <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3 bg-white/[0.02]">
                <FaSearch className="text-sm text-f1Teal shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a command, project, or section... (e.g. cv, projects, ferrari)"
                  className="w-full bg-transparent text-sm text-white placeholder:text-gray-500 font-mono outline-none"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="p-1 text-gray-500 hover:text-white"
                  >
                    <FaTimes className="text-xs" />
                  </button>
                )}
                <span className="hidden sm:inline-block px-1.5 py-0.5 bg-white/10 border border-white/15 rounded-2xs text-[9px] font-mono text-gray-400 uppercase">
                  ESC
                </span>
              </div>

              {/* Commands List */}
              <div className="max-h-80 overflow-y-auto p-2 space-y-1">
                {filteredCommands.length > 0 ? (
                  filteredCommands.map((cmd, idx) => {
                    const isSelected = selectedIndex === idx;
                    const Icon = cmd.icon;

                    return (
                      <div
                        key={cmd.id}
                        onClick={cmd.action}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-2xs cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-white/10 border-l-2 text-white'
                            : 'hover:bg-white/5 text-gray-300'
                        }`}
                        style={{
                          borderLeftColor: isSelected ? livery.primaryColor : 'transparent',
                        }}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`p-1.5 rounded-2xs text-xs shrink-0 ${
                              isSelected ? 'bg-white/15 text-white' : 'bg-white/5 text-gray-400'
                            }`}
                          >
                            <Icon />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-f1 font-bold italic text-xs uppercase tracking-wide truncate">
                              {cmd.title}
                            </span>
                            <span className="font-mono text-[9px] text-gray-500 truncate">
                              {cmd.subtitle}
                            </span>
                          </div>
                        </div>

                        <span className="font-hud text-[8px] uppercase tracking-widest text-gray-500 px-1.5 py-0.5 bg-white/5 rounded-2xs shrink-0 ml-2">
                          {cmd.category}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-8 text-center text-xs font-mono text-gray-500">
                    NO COMMANDS MATCHING &quot;{query}&quot;
                  </div>
                )}
              </div>

              {/* Footer Guide */}
              <div className="flex items-center justify-between px-4 py-2 border-t border-white/10 text-[9px] font-mono text-gray-500 bg-[#070A0F]">
                <div className="flex items-center gap-3">
                  <span><strong className="text-gray-300">↑↓</strong> Navigate</span>
                  <span><strong className="text-gray-300">↵</strong> Execute</span>
                  <span><strong className="text-gray-300">Esc</strong> Dismiss</span>
                </div>
                <span className="text-f1Teal font-bold">
                  TELEMETRY DISPATCH ACTIVE
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CommandPalette;

