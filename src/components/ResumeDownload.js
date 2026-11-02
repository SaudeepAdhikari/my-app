import React from 'react';
import { FaDownload, FaEye, FaFlag } from 'react-icons/fa';
import { usePortfolioData } from '../context/PortfolioDataContext';

const ResumeDownload = () => {
  const { data } = usePortfolioData();
  if (!data) return null;

  const { personalInfo } = data;
  const resumePath = personalInfo.resumePath;
  const lastUpdated = personalInfo.resumeLastUpdated || 'PDF Telemetry';

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumePath;
    link.download = `${personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="relative py-12 overflow-hidden border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="f1-card p-8 sm:p-12 text-center f1-cut-lg border border-f1Teal/40 shadow-2xl relative overflow-hidden bg-gradient-to-br from-[#0F1522] via-[#090C12] to-[#05070A]">
          
          {/* Top telemetry tag */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="badge-red">
              <FaFlag className="text-[9px]" />
              OFFICIAL DRIVER CREDENTIALS // CURRICULUM VITAE
            </span>
          </div>

          <h3 className="font-f1 font-black italic text-3xl sm:text-4xl text-white uppercase mb-3">
            DOWNLOAD CURRICULUM VITAE (CV / RESUME)
          </h3>

          <p className="font-sans text-gray-300 text-xs sm:text-sm max-w-lg mx-auto mb-8 leading-relaxed">
            Acquire Saudeep's full technical CV: engineering architecture, past stints, full stack credentials, and contact telematics.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleDownload}
              className="inline-flex items-center justify-center gap-2.5 font-f1 font-black italic uppercase text-xs md:text-sm tracking-wider px-6 py-3.5 bg-yellow-400 text-black hover:bg-yellow-300 shadow-[0_4px_20px_rgba(250,204,21,0.4)] transition-all duration-300 w-full sm:w-auto cursor-pointer"
              style={{ clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)' }}
            >
              <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-black text-yellow-400 rounded-xs">
                CV
              </span>
              <FaDownload className="text-xs" />
              <span>DOWNLOAD CV (PDF)</span>
            </button>

            <button
              onClick={() => window.open(resumePath, '_blank')}
              className="btn-f1-outline w-full sm:w-auto"
            >
              <FaEye className="text-xs" />
              <span>PREVIEW CV ONLINE</span>
            </button>
          </div>

          <p className="font-mono text-[10px] text-gray-500 mt-6 tracking-widest uppercase">
            STATUS: {lastUpdated} {'//'} VERIFIED VALID FOR 2026 SEASON
          </p>
        </div>
      </div>
    </section>
  );
};

export default ResumeDownload;
