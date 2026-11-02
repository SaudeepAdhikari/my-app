import React from 'react';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { FaFlag, FaBroadcastTower, FaBarcode } from 'react-icons/fa';

/* ── Pirelli Tyre Strategy Card ── */
const TyreStrategyCard = ({ color, compound, role, desc, borderClass, bgClass, textClass }) => (
  <div className={`p-3.5 border ${borderClass} ${bgClass} rounded-2xs relative overflow-hidden transition-all duration-300 hover:scale-[1.02]`}>
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        {/* Tyre Circle Icon */}
        <div className={`w-5 h-5 rounded-full border-2 ${borderClass} flex items-center justify-center font-racing text-[9px] font-black ${textClass}`}>
          P
        </div>
        <span className={`font-f1 font-black italic text-xs tracking-wider uppercase ${textClass}`}>
          {compound}
        </span>
      </div>
      <span className="font-hud text-[9px] text-gray-400 uppercase tracking-widest">
        {role}
      </span>
    </div>
    <p className="font-sans text-xs text-gray-300 leading-snug">
      {desc}
    </p>
  </div>
);

const About = () => {
  const { data } = usePortfolioData();
  if (!data) return null;
  const { personalInfo } = data;

  return (
    <section id="about" className="relative py-24 border-t border-white/5 overflow-hidden">
      {/* Background Track Decal */}
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 font-f1 font-black italic text-[260px] text-white/[0.015] select-none pointer-events-none">
        FIA
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="f1-section-header">
          <div className="flex items-center gap-2">
            <span className="bg-f1Red text-white text-[10px] font-black italic px-2 py-0.5 rounded-2xs">
              SECTOR 02
            </span>
            <div className="font-hud text-xs tracking-[0.25em] text-f1Teal font-bold uppercase">
              PILOT DOSSIER // BIOMETRICS &amp; PHILOSOPHY
            </div>
          </div>
          <h2 className="f1-section-title mt-2">
            THE DRIVER BEHIND THE WHEEL
          </h2>
          <div className="f1-speed-strip w-48 mt-3" />
        </div>

        {/* 2-Column Grid: Left Driver Bio & Tyre Strategy + Right FIA Superlicense Card */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ── LEFT: Driver Narrative & Tyre Strategy (7 Cols) ── */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            <div className="f1-card p-6 border-l-4 border-l-f1Red rounded-r-sm">
              <h3 className="font-f1 font-black italic text-2xl text-white uppercase mb-3 flex items-center gap-2">
                <span>RACE PHILOSOPHY: PRECISION OVER SPEED ALONE</span>
              </h3>
              <div className="space-y-4 text-gray-300 font-sans text-sm sm:text-base leading-relaxed">
                {personalInfo.bio && personalInfo.bio.map((para, i) => (
                  <p key={i}>
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Pirelli Tyre Strategy Matrix */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-hud text-xs tracking-widest text-f1Teal font-bold uppercase flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-f1Teal" />
                  PIRELLI TYRE STRATEGY MATRIX (ENGINEERING METHODOLOGY)
                </span>
                <span className="text-[10px] font-mono text-gray-500">OPTIMAL PIT WINDOW</span>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <TyreStrategyCard
                  color="red"
                  compound="P ZERO SOFT (RED)"
                  role="RAPID UI/UX"
                  desc="High-grip, aggressive velocity for prototype sprints, responsive design, and pixel-perfect animations."
                  borderClass="border-f1Red/60"
                  bgClass="bg-f1Red/5"
                  textClass="text-f1Red"
                />

                <TyreStrategyCard
                  color="yellow"
                  compound="P ZERO MEDIUM (YELLOW)"
                  role="FULL STACK ARCHITECTURE"
                  desc="Balanced durability and performance for scalable Node.js APIs, authentication, and core application workflows."
                  borderClass="border-f1Yellow/60"
                  bgClass="bg-f1Yellow/5"
                  textClass="text-f1Yellow"
                />

                <TyreStrategyCard
                  color="white"
                  compound="P ZERO HARD (WHITE)"
                  role="DATABASE & DURABILITY"
                  desc="High-mileage database schemas, resilient data modeling in MongoDB/SQL, and zero-loss backup architecture."
                  borderClass="border-white/40"
                  bgClass="bg-white/5"
                  textClass="text-white"
                />

                <TyreStrategyCard
                  color="green"
                  compound="CINTURATO INTER (GREEN)"
                  role="DEVOPS & OPTIMIZATION"
                  desc="Adapting to tricky track conditions: CI/CD deployment, lighthouse speed tuning, and search engine telemetry."
                  borderClass="border-f1Green/60"
                  bgClass="bg-f1Green/5"
                  textClass="text-f1Green"
                />
              </div>
            </div>

          </div>

          {/* ── RIGHT: Official FIA Superlicense Hologram Card (5 Cols) ── */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            
            <div className="f1-card p-6 f1-cut-lg border border-f1Teal/30 shadow-2xl relative overflow-hidden bg-gradient-to-b from-[#0F1521] via-[#090C12] to-[#05070A]">
              {/* Holographic Watermark Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <div className="font-hud text-[9px] text-f1Teal tracking-[0.25em] uppercase font-bold">
                    FÉDÉRATION INTERNATIONALE DE L'AUTOMOBILE
                  </div>
                  <div className="font-f1 font-black italic text-lg text-white">
                    FIA DRIVER SUPERLICENSE
                  </div>
                </div>
                <div className="bg-f1Red text-white font-racing font-black px-2 py-1 text-sm italic rounded-2xs">
                  A-GRADE
                </div>
              </div>

              {/* License Details Grid */}
              <div className="grid grid-cols-2 gap-4 py-4 border-b border-white/10 font-mono text-xs">
                <div>
                  <span className="text-[10px] text-gray-500 uppercase block">HOLDER</span>
                  <strong className="text-white font-f1 font-black text-sm uppercase">{personalInfo.name}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 uppercase block">RACING NO.</span>
                  <strong className="text-f1Red font-racing font-black text-sm">#07</strong>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 uppercase block">NATIONALITY</span>
                  <span className="text-gray-200 flex items-center gap-1 font-bold">
                    <FaFlag className="text-f1Teal text-[10px]" /> {personalInfo.location || 'Nepal'} 🇳🇵
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 uppercase block">TEAM STATUS</span>
                  <span className="text-f1Green font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-f1Green" /> OPEN TO RACE
                  </span>
                </div>
              </div>

              {/* Career Grand Prix Statistics */}
              <div className="py-4">
                <span className="font-hud text-[10px] text-gray-400 uppercase tracking-widest block mb-2 font-bold">
                  CAREER TELEMETRY METRICS
                </span>
                <div className="grid grid-cols-3 gap-2 text-center font-mono">
                  <div className="bg-[#05070B] p-2.5 border border-white/5 rounded-2xs">
                    <span className="text-xl font-f1 font-black text-f1Red block">1.5+</span>
                    <span className="text-[9px] text-gray-400 uppercase">SEASONS</span>
                  </div>
                  <div className="bg-[#05070B] p-2.5 border border-white/5 rounded-2xs">
                    <span className="text-xl font-f1 font-black text-f1Teal block">7+</span>
                    <span className="text-[9px] text-gray-400 uppercase">GPS WON</span>
                  </div>
                  <div className="bg-[#05070B] p-2.5 border border-white/5 rounded-2xs">
                    <span className="text-xl font-f1 font-black text-f1Purple block">100%</span>
                    <span className="text-[9px] text-gray-400 uppercase">PODIUMS</span>
                  </div>
                </div>
              </div>

              {/* Barcode & Hologram footer */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-mono text-[8px] text-gray-500">SERIAL: 8492-FIA-2026-SAU</span>
                  <span className="font-hud text-[9px] text-f1Teal tracking-widest uppercase font-semibold">VALIDATED: 2026/2027</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <FaBarcode className="text-2xl" />
                </div>
              </div>
            </div>

            {/* Pit Radio Quote Callout */}
            <div className="f1-card p-4 border border-white/10 rounded-2xs bg-[#080B10]">
              <div className="flex items-center gap-2 mb-2">
                <FaBroadcastTower className="text-f1Teal text-xs animate-pulse" />
                <span className="font-hud text-[9px] text-f1Teal uppercase tracking-widest font-bold">
                  DIRECT TRANSMISSION FROM COCKPIT
                </span>
              </div>
              <p className="font-mono text-xs text-gray-300 italic">
                "In Formula 1, half a tenth of a second is the difference between pole position and midfield. I apply that exact same obsession with precision to every line of code."
              </p>
              <div className="text-right mt-2 font-f1 font-black italic text-xs text-f1Red">
                — SAUDEEP ADHIKARI // #07
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default About;
