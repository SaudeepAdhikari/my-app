import React, { useState } from 'react';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { getIcon } from '../utils/getIcon';
import { FaCogs, FaBolt, FaDatabase, FaTools, FaCheck } from 'react-icons/fa';

/* ── Interactive Telemetry Graph (Throttle vs Brake) ── */
const TelemetryGraph = () => (
  <div className="bg-[#05070B] border border-white/10 p-4 rounded-sm">
    <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-2">
      <span className="flex items-center gap-2">
        <span className="w-2.5 h-1 bg-f1Green inline-block" /> THROTTLE (FRONTEND VELOCITY)
      </span>
      <span className="flex items-center gap-2">
        <span className="w-2.5 h-1 bg-f1Red inline-block" /> BRAKE / LATENCY CONTROL
      </span>
      <span className="text-f1Teal font-bold">TELEMETRY TRACE: TURN 1 TO TURN 14</span>
    </div>
    
    <div className="h-28 w-full relative">
      <svg viewBox="0 0 500 100" className="w-full h-full preserve-3d" fill="none">
        {/* Background Grid Lines */}
        <line x1="0" y1="25" x2="500" y2="25" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
        <line x1="0" y1="50" x2="500" y2="50" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
        <line x1="0" y1="75" x2="500" y2="75" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />

        {/* Throttle Trace (Green Line) */}
        <path
          d="M 0 80 Q 50 10, 100 20 T 180 85 T 260 15 T 350 70 T 420 15 L 500 20"
          stroke="#10B981"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Brake Trace (Red Line) */}
        <path
          d="M 0 95 L 40 95 L 45 30 L 60 95 L 160 95 L 170 20 L 185 95 L 320 95 L 330 25 L 345 95 L 500 95"
          stroke="#E10600"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
      {/* Speed Trap Point */}
      <div className="absolute top-2 right-6 bg-[#0E131B] border border-f1Teal/40 px-2 py-0.5 rounded text-[10px] font-mono text-f1Teal font-bold shadow-lg">
        SPEED TRAP: 351.4 KM/H
      </div>
    </div>
  </div>
);

const Skills = () => {
  const { data } = usePortfolioData();
  const [activeZone, setActiveZone] = useState('aero');

  if (!data) return null;
  const { skills } = data;

  // Group technologies into Formula 1 Subsystems
  const subsystems = {
    aero: {
      title: 'AERODYNAMICS & CHASSIS (FRONTEND)',
      icon: FaCogs,
      color: 'text-f1Teal',
      border: 'border-f1Teal',
      desc: 'High-downforce, low-drag user interfaces built with React, modern CSS, dynamic motion, and responsive frameworks.',
      tech: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', 'Figma'],
      metrics: { downforce: '99.4%', responsiveness: '100%', renderTime: '<16ms (60 FPS)' }
    },
    engine: {
      title: 'POWER UNIT - 1.6L V6 TURBO (BACKEND)',
      icon: FaBolt,
      color: 'text-f1Red',
      border: 'border-f1Red',
      desc: 'Maximum torque, low-latency server-side architecture powering microservices, RESTful APIs, and secure authentication.',
      tech: ['Node.js', 'Express', 'PHP', 'REST APIs', 'Serverless'],
      metrics: { horsepower: '980 HP EQ', throughput: '10k+ req/sec', latency: '<25ms' }
    },
    ers: {
      title: 'ENERGY RECOVERY SYSTEM - ERS (DATABASES)',
      icon: FaDatabase,
      color: 'text-f1Purple',
      border: 'border-f1Purple',
      desc: 'Instant torque data retrieval, schema design, index optimization, and persistent cache storage.',
      tech: ['MongoDB', 'MySQL', 'Database Design', 'Mongoose'],
      metrics: { cacheHit: '98.2%', indexing: 'Optimized', dataIntegrity: '100%' }
    },
    pitcrew: {
      title: 'PIT WALL & TELEMETRY (DEVOPS & TOOLS)',
      icon: FaTools,
      color: 'text-f1Yellow',
      border: 'border-f1Yellow',
      desc: 'Sub-2.0s deployment cycles, Git version telemetry, environment pipelines, and continuous integration.',
      tech: ['Git', 'GitHub', 'CI/CD Pipelines', 'Performance Audits', 'SEO Telemetry'],
      metrics: { pitStopTime: '1.82s', buildEfficiency: 'A-Grade', uptime: '99.9%' }
    }
  };

  const current = subsystems[activeZone];
  const IconComp = current.icon;

  return (
    <section id="skills" className="relative py-24 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="f1-section-header">
          <div className="flex items-center gap-2">
            <span className="bg-f1Red text-white text-[10px] font-black italic px-2 py-0.5 rounded-2xs">
              SECTOR 03
            </span>
            <div className="font-hud text-xs tracking-[0.25em] text-f1Teal font-bold uppercase">
              CAR SETUP &amp; TELEMETRY DIAGNOSTICS
            </div>
          </div>
          <h2 className="f1-section-title mt-2">
            POWER UNIT SPECIFICATIONS (TECHNICAL SKILLS)
          </h2>
          <div className="f1-speed-strip w-48 mt-3" />
        </div>

        {/* Telemetry Trace Chart */}
        <div className="mb-8">
          <TelemetryGraph />
        </div>

        {/* Cockpit Subsystem Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-8">
          {Object.entries(subsystems).map(([key, item]) => {
            const Icon = item.icon;
            const isActive = activeZone === key;
            const subtitleMap = {
              aero: 'FRONTEND STACK',
              engine: 'BACKEND ARCHITECTURE',
              ers: 'DATABASES & STORAGE',
              pitcrew: 'DEVOPS & WORKFLOW'
            };
            return (
              <button
                key={key}
                onClick={() => setActiveZone(key)}
                className={`p-3.5 text-left border rounded-2xs transition-all duration-200 cursor-pointer ${
                  isActive
                    ? `bg-[#0F1522] ${item.border} shadow-lg shadow-black/40`
                    : 'bg-[#080B10] border-white/10 hover:border-white/20 text-gray-400'
                }`}
                style={{ clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)' }}
              >
                <div className="flex items-center justify-between mb-1">
                  <Icon className={`text-base ${isActive ? item.color : 'text-gray-500'}`} />
                  <span className="font-mono text-[9px] text-gray-500 uppercase">SYS // 0{Object.keys(subsystems).indexOf(key) + 1}</span>
                </div>
                <div className={`font-f1 font-black italic text-xs uppercase tracking-wider ${isActive ? 'text-white' : 'text-gray-300'}`}>
                  {key.toUpperCase()} ({subtitleMap[key]})
                </div>
                <div className="font-hud text-[9px] text-gray-400 uppercase tracking-wider mt-0.5 font-semibold">
                  {subtitleMap[key]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Subsystem Diagnostic Panel */}
        <div className="f1-card p-6 sm:p-8 f1-cut-lg border border-white/10 bg-gradient-to-br from-[#0F1522] to-[#080B10]">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Subsystem Details */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-sm bg-white/5 border border-white/10 ${current.color}`}>
                  <IconComp className="text-2xl" />
                </div>
                <div>
                  <span className="font-hud text-[10px] text-gray-400 tracking-widest uppercase block">
                    ACTIVE TELEMETRY CHANNEL
                  </span>
                  <h3 className="font-f1 font-black italic text-2xl sm:text-3xl text-white uppercase">
                    {current.title}
                  </h3>
                </div>
              </div>

              <p className="font-sans text-gray-300 text-sm sm:text-base leading-relaxed">
                {current.desc}
              </p>

              {/* Technologies in this Subsystem */}
              <div>
                <span className="font-hud text-[10px] text-gray-400 uppercase tracking-widest block mb-2 font-bold">
                  DEPLOYED POWER COMPONENTS:
                </span>
                <div className="flex flex-wrap gap-2">
                  {current.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 bg-[#05070B] border border-white/15 text-white font-mono text-xs font-bold rounded-2xs flex items-center gap-1.5 shadow-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-f1Teal" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Telemetry Benchmarks */}
            <div className="lg:col-span-5 bg-[#05070B] border border-white/10 p-5 rounded-sm">
              <div className="font-hud text-xs text-f1Teal font-bold uppercase tracking-widest mb-4 pb-2 border-b border-white/10 flex items-center justify-between">
                <span>BENCHMARK TELEMETRY</span>
                <span className="text-[10px] font-mono text-gray-500">LIVE FEED</span>
              </div>

              <div className="space-y-4 font-mono">
                {Object.entries(current.metrics).map(([metricKey, val]) => (
                  <div key={metricKey} className="flex items-center justify-between text-xs">
                    <span className="text-gray-400 uppercase">{metricKey.replace(/([A-Z])/g, ' $1')}</span>
                    <strong className="text-white bg-white/5 px-2 py-1 rounded text-xs border border-white/10">
                      {val}
                    </strong>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-white/10 text-center">
                <span className="badge-green w-full justify-center">
                  <FaCheck className="text-[10px]" /> SYSTEM VERIFIED &amp; RACE READY
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Complete Technology Decals Marquee */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-hud text-xs font-bold text-gray-400 uppercase tracking-widest">
              OFFICIAL TECHNICAL PARTNERS &amp; SPONSOR DECAL STACK
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {skills.map((skill) => {
              const Icon = getIcon(skill.icon);
              return (
                <div
                  key={skill.name}
                  className="p-3 bg-[#0E131C] border border-white/10 hover:border-f1Teal/50 transition-all rounded-2xs flex items-center gap-2.5 group cursor-default"
                >
                  <span
                    className="text-lg group-hover:scale-110 transition-transform"
                    style={{ color: skill.color || '#00D2BE' }}
                  >
                    {Icon ? Icon : '⚡'}
                  </span>
                  <span className="font-f1 font-bold italic text-xs uppercase text-gray-300 group-hover:text-white tracking-wider truncate">
                    {skill.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;
