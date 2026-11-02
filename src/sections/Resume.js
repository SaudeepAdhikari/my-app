import React from 'react';
import { FaGraduationCap, FaBriefcase, FaExternalLinkAlt, FaTrophy } from 'react-icons/fa';
import { usePortfolioData } from '../context/PortfolioDataContext';

const TimelineCard = ({ item, index, isExp }) => {
  return (
    <div className="relative pl-8 pb-8 group last:pb-0">
      {/* Pit Lane Lap Line */}
      <div className="absolute left-[11px] top-6 bottom-0 w-[2px] bg-white/10 group-last:hidden" />

      {/* Diamond Sector Marker */}
      <div className="absolute left-0 top-1.5 w-6 h-6 flex items-center justify-center">
        <div
          className={`w-3.5 h-3.5 transition-all duration-300 group-hover:scale-125 ${
            isExp ? 'bg-f1Red shadow-[0_0_10px_#E10600]' : 'bg-f1Teal shadow-[0_0_10px_#00D2BE]'
          }`}
          style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
        />
      </div>

      {/* Content Card */}
      <div className="f1-card p-5 f1-cut border border-white/10 group-hover:border-white/25 transition-all">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span
            className={`font-mono text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-2xs ${
              isExp ? 'bg-f1Red/15 text-f1Red border border-f1Red/30' : 'bg-f1Teal/15 text-f1Teal border border-f1Teal/30'
            }`}
          >
            {item.period}
          </span>
          <span className="font-mono text-[9px] text-gray-500 uppercase">
            STINT // LAP {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <h4 className="font-f1 font-black italic text-lg text-white uppercase group-hover:text-f1Teal transition-colors">
          {item.role || item.degree}
        </h4>

        <p className="font-mono text-xs text-gray-400 mb-3">
          {item.company || item.school}
        </p>

        {item.description && (
          <p className="font-sans text-xs text-gray-300 leading-relaxed">
            {item.description}
          </p>
        )}
      </div>
    </div>
  );
};

const Resume = () => {
  const { data } = usePortfolioData();
  if (!data) return null;
  const { workExperience, education, certifications } = data;

  return (
    <section id="resume" className="relative py-24 border-t border-white/5 overflow-hidden">
      {/* Background Decal */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 font-f1 font-black italic text-[240px] text-white/[0.015] select-none pointer-events-none">
        LOG
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="f1-section-header">
          <div className="flex items-center gap-2">
            <span className="bg-f1Red text-white text-[10px] font-black italic px-2 py-0.5 rounded-2xs">
              SECTOR 06
            </span>
            <div className="font-hud text-xs tracking-[0.25em] text-f1Teal font-bold uppercase">
              CHAMPIONSHIP HISTORY // CAREER LOG
            </div>
          </div>
          <h2 className="f1-section-title mt-2">
            STINT &amp; LAP RECORDS (EXPERIENCE &amp; EDUCATION)
          </h2>
          <div className="f1-speed-strip w-48 mt-3" />
        </div>

        {/* 2 Column Grid: Experience & Education */}
        <div className="grid lg:grid-cols-2 gap-10">
          
          {/* Work Experience */}
          <div>
            <div className="flex items-center gap-3 mb-6 pb-2 border-b border-white/10">
              <div className="p-2 bg-f1Red/15 text-f1Red border border-f1Red/30 rounded-2xs">
                <FaBriefcase className="text-base" />
              </div>
              <div>
                <h3 className="font-f1 font-black italic text-xl text-white uppercase">
                  CONSTRUCTOR STINTS (EXPERIENCE)
                </h3>
                <span className="font-hud text-[9px] text-gray-400 uppercase tracking-widest">
                  PRODUCTION APPS &amp; ENGINEERING ROLES
                </span>
              </div>
            </div>

            <div>
              {workExperience && workExperience.map((exp, i) => (
                <TimelineCard key={i} item={exp} index={i} isExp={true} />
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center gap-3 mb-6 pb-2 border-b border-white/10">
              <div className="p-2 bg-f1Teal/15 text-f1Teal border border-f1Teal/30 rounded-2xs">
                <FaGraduationCap className="text-base" />
              </div>
              <div>
                <h3 className="font-f1 font-black italic text-xl text-white uppercase">
                  DRIVER ACADEMY (EDUCATION)
                </h3>
                <span className="font-hud text-[9px] text-gray-400 uppercase tracking-widest">
                  ACADEMIC FOUNDATION &amp; DEGREE
                </span>
              </div>
            </div>

            <div>
              {education && education.map((edu, i) => (
                <TimelineCard key={i} item={edu} index={i} isExp={false} />
              ))}
            </div>
          </div>

        </div>

        {/* Certifications - Trophy Cabinet */}
        {certifications && certifications.length > 0 && (
          <div className="mt-16 pt-12 border-t border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-yellow-500/15 text-yellow-400 border border-yellow-500/30 rounded-2xs">
                <FaTrophy className="text-base" />
              </div>
              <div>
                <h3 className="font-f1 font-black italic text-xl text-white uppercase">
                  FIA ACCREDITATIONS &amp; CERTIFICATIONS
                </h3>
                <span className="font-hud text-[9px] text-gray-400 uppercase tracking-widest">
                  OFFICIAL MOTORSPORT ENGINEERING BADGES
                </span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="f1-card p-5 f1-cut border border-yellow-500/20 hover:border-yellow-500/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[9px] text-yellow-400 font-bold uppercase tracking-wider">
                        {cert.date}
                      </span>
                      <FaTrophy className="text-yellow-400/50 text-xs" />
                    </div>
                    <h4 className="font-f1 font-bold italic text-base text-white uppercase mb-1">
                      {cert.title}
                    </h4>
                    <p className="font-mono text-xs text-gray-400">
                      ISSUED BY: {cert.issuer}
                    </p>
                  </div>

                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-400 hover:text-yellow-400 transition-colors"
                    >
                      <span>VALIDATE CREDENTIAL</span>
                      <FaExternalLinkAlt className="text-[10px]" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Resume;
