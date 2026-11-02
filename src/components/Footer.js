import React from 'react';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { getIcon } from '../utils/getIcon';
import { FaFlagCheckered, FaChevronUp } from 'react-icons/fa';

const Footer = () => {
  const { data } = usePortfolioData();
  if (!data) return null;
  const { personalInfo, socialLinks } = data;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#05070B] border-t border-white/10 overflow-hidden">
      {/* Chequered Finish Line Accent */}
      <div className="chequered-stripe w-full" />
      <div className="h-[2px] w-full bg-gradient-to-r from-f1Red via-f1Teal to-f1Purple" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-f1Red text-white font-black italic px-2 py-0.5 text-xs skew-x-[-12deg]">
                F1
              </div>
              <span className="font-f1 font-black italic text-xl text-white tracking-wider">
                {personalInfo.name.toUpperCase()}
              </span>
            </div>
            <p className="font-hud text-xs text-f1Teal uppercase tracking-widest font-semibold">
              MERCEDES AMG SPEC // FULL STACK MOTORSPORT ARCHITECT
            </p>
            <p className="font-mono text-[11px] text-gray-500 mt-1">
              Engineered with extreme precision in Nepal 🇳🇵
            </p>
          </div>

          {/* Social Channels */}
          <div className="flex items-center gap-2">
            {socialLinks.map((s) => {
              const Icon = getIcon(s.icon);
              return (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center bg-white/5 border border-white/10 hover:border-f1Teal hover:text-f1Teal text-gray-300 transition-all rounded-2xs text-sm"
                  aria-label={s.name}
                >
                  {Icon ? Icon : s.name[0]}
                </a>
              );
            })}
          </div>

          {/* Return to Grid Button */}
          <div>
            <button
              onClick={scrollToTop}
              className="btn-f1-outline text-xs py-2 px-4 cursor-pointer"
            >
              <FaFlagCheckered className="text-f1Teal text-xs" />
              <span>RETURN TO GRID (TOP)</span>
              <FaChevronUp className="text-[10px]" />
            </button>
          </div>

        </div>

        {/* Bottom telemetry line */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-gray-500 gap-2">
          <span>© {new Date().getFullYear()} SAUDEEP ADHIKARI. ALL TELEMETRY RIGHTS RESERVED.</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-f1Green" />
            <span>RACE TIME: 00:00:00 // P1 CONVERTED</span>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
