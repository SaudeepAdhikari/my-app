import React from 'react';

const TECH_ITEMS = [
  { label: 'React', icon: '⚛️' },
  { label: 'Next.js', icon: '▲' },
  { label: 'Node.js', icon: '🟢' },
  { label: 'MongoDB', icon: '🍃' },
  { label: 'Tailwind CSS', icon: '🎨' },
  { label: 'JavaScript', icon: '⚡' },
  { label: 'TypeScript', icon: '🔷' },
  { label: 'Figma', icon: '🎯' },
  { label: 'Git', icon: '🔀' },
  { label: 'MySQL', icon: '🗄️' },
  { label: 'PHP', icon: '🐘' },
  { label: 'REST APIs', icon: '🔗' },
  { label: 'Framer Motion', icon: '🎭' },
  { label: 'Bootstrap', icon: '💜' },
];

// Duplicate for seamless loop
const ITEMS = [...TECH_ITEMS, ...TECH_ITEMS];

const TechMarquee = () => (
  <div className="relative w-full overflow-hidden border-y border-white/[0.06] bg-[#05070B]/80 py-3 my-0">
    {/* Left & Right fade masks */}
    <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10"
      style={{ background: 'linear-gradient(90deg, #05070B, transparent)' }} />
    <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10"
      style={{ background: 'linear-gradient(270deg, #05070B, transparent)' }} />

    <div className="marquee-track">
      {ITEMS.map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-2 mx-5 shrink-0 font-hud text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-f1Teal transition-colors cursor-default"
        >
          <span>{item.icon}</span>
          <span>{item.label}</span>
          <span className="ml-4 text-white/10">◆</span>
        </div>
      ))}
    </div>
  </div>
);

export default TechMarquee;

