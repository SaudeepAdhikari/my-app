import React, { useState } from 'react';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

const CIRCUITS = [
  { gp: 'MONACO GP', track: 'Circuit de Monaco', country: 'MC', laps: 78, length: '3.337 km' },
  { gp: 'SILVERSTONE GP', track: 'Silverstone Circuit', country: 'GB', laps: 52, length: '5.891 km' },
  { gp: 'SUZUKA GP', track: 'Suzuka International', country: 'JP', laps: 53, length: '5.807 km' },
  { gp: 'SPA GP', track: 'Spa-Francorchamps', country: 'BE', laps: 44, length: '7.004 km' },
  { gp: 'MONZA GP', track: 'Autodromo Nazionale Monza', country: 'IT', laps: 53, length: '5.793 km' },
  { gp: 'SINGAPORE GP', track: 'Marina Bay Street Circuit', country: 'SG', laps: 62, length: '4.940 km' },
  { gp: 'AUSTIN GP', track: 'Circuit of the Americas', country: 'US', laps: 56, length: '5.513 km' },
];

/* ── SVG Track Silhouette Component ── */
const TrackSilhouette = ({ index }) => {
  const tracks = [
    // Monaco
    "M 10 30 L 40 30 L 60 15 L 85 20 L 95 40 L 75 75 L 45 80 L 35 60 L 15 65 Z",
    // Silverstone
    "M 15 45 L 35 20 L 70 20 L 90 40 L 80 75 L 45 85 L 25 70 Z",
    // Suzuka Figure 8
    "M 20 25 L 50 20 L 80 40 L 50 60 L 80 80 L 40 85 L 20 60 L 45 40 Z",
    // Spa
    "M 15 20 L 55 15 L 90 35 L 75 65 L 85 85 L 40 80 L 25 55 Z",
    // Monza
    "M 10 40 L 85 20 L 95 55 L 75 80 L 25 80 L 10 60 Z",
    // Generic
    "M 15 30 L 50 15 L 85 30 L 85 70 L 50 85 L 15 70 Z",
  ];

  const path = tracks[index % tracks.length];

  return (
    <svg viewBox="0 0 100 100" className="w-16 h-16 opacity-30 group-hover:opacity-80 transition-opacity" fill="none">
      <path
        d={path}
        stroke="#00D2BE"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const Projects = () => {
  const { data } = usePortfolioData();
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  if (!data) return null;
  const { projects } = data;

  const categories = ['ALL', 'Full Stack', 'Frontend', 'Web App'];

  const filteredProjects = selectedCategory === 'ALL'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="relative py-24 border-t border-white/5 overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute right-0 top-10 font-f1 font-black italic text-[260px] text-white/[0.015] select-none pointer-events-none">
        P1
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-f1Red text-white text-[10px] font-black italic px-2 py-0.5 rounded-2xs">
                SECTOR 05
              </span>
              <div className="font-hud text-xs tracking-[0.25em] text-f1Teal font-bold uppercase">
                FORMULA 1 WORLD CHAMPIONSHIP // RACE ARCHIVES
              </div>
            </div>
            <h2 className="f1-section-title mt-2">
              GRAND PRIX VICTORIES (FEATURED PROJECTS)
            </h2>
            <div className="f1-speed-strip w-48 mt-3" />
          </div>

          {/* Category Filter Buttons in Pit Wall Style */}
          <div className="flex items-center gap-1.5 bg-[#05070B] p-1.5 border border-white/10 rounded-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 font-f1 font-bold text-xs uppercase tracking-wider rounded-2xs transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-f1Red text-white shadow-md shadow-f1Red/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => {
            const circuit = CIRCUITS[idx % CIRCUITS.length];
            const roundNum = String(idx + 1).padStart(2, '0');

            return (
              <div
                key={project.title}
                className="f1-card group flex flex-col justify-between overflow-hidden border border-white/10 hover:border-f1Teal/50 transition-all duration-300"
                style={{ clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)' }}
              >
                {/* Top Race Banner */}
                <div className="bg-[#05070B] px-4 py-2 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-black text-f1Red">
                      RD {roundNum}
                    </span>
                    <span className="font-f1 font-black italic text-xs text-white uppercase tracking-wider">
                      {circuit.gp}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="badge-purple text-[9px] py-0.5 px-1.5">
                      P1 🏆
                    </span>
                  </div>
                </div>

                {/* Project Image & Track Silhouette Overlay */}
                <div className="relative h-48 overflow-hidden bg-black/60">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-center filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                      onError={(e) => {
                        e.target.src = '/assets/profile.jpg';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-[#0E131C] flex items-center justify-center font-racing text-white/20 text-3xl">
                      F1 TELEMETRY
                    </div>
                  )}
                  {/* Subtle Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080B10] via-black/30 to-transparent" />

                  {/* Circuit Watermark Silhouette */}
                  <div className="absolute top-2 right-2 pointer-events-none">
                    <TrackSilhouette index={idx} />
                  </div>

                  {/* Circuit Details Tag */}
                  <div className="absolute bottom-2 left-3 font-mono text-[10px] text-f1Teal bg-black/70 px-2 py-0.5 rounded border border-f1Teal/20">
                    {circuit.track} {'//'} {circuit.length}
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-hud text-[10px] text-gray-400 uppercase tracking-widest">
                        SPEC // {project.category || 'FULL STACK'}
                      </span>
                      <span className="font-mono text-[10px] text-f1Teal font-bold">
                        FASTEST LAP: 1:{12 + idx}.{400 + idx * 23}s
                      </span>
                    </div>

                    <h3 className="font-f1 font-black italic text-xl text-white uppercase group-hover:text-f1Teal transition-colors mb-2">
                      {project.title}
                    </h3>

                    <p className="font-sans text-xs text-gray-300 leading-relaxed line-clamp-3 mb-4">
                      {project.description}
                    </p>

                    {/* Key Telemetry Features */}
                    {project.keyFeatures && (
                      <div className="space-y-1 mb-4 border-l-2 border-f1Red/50 pl-2.5 font-sans text-[11px] text-gray-400">
                        {project.keyFeatures.slice(0, 2).map((kf, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <span className="w-1 h-1 bg-f1Red rounded-full" />
                            <span>{kf}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Tech Decals & Launch Links */}
                  <div>
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.technologies && project.technologies.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 bg-white/5 border border-white/10 text-[10px] font-mono text-gray-300 rounded-2xs"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      {project.github ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-f1 font-bold text-xs uppercase text-gray-300 hover:text-f1Teal transition-colors"
                        >
                          <FaGithub className="text-sm" />
                          <span>SOURCE CODE (GITHUB)</span>
                        </a>
                      ) : (
                        <span className="font-mono text-[10px] text-gray-500">PRIVATE REPO</span>
                      )}

                      {(project.demo || project.liveLink || project.link) ? (
                        <a
                          href={project.demo || project.liveLink || project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-f1-primary text-[10px] py-1.5 px-3"
                        >
                          <span>LIVE DEMO (VISIT)</span>
                          <FaExternalLinkAlt className="text-[9px]" />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Projects;
