import React from 'react';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { FaCheck, FaStopwatch, FaWrench } from 'react-icons/fa';

const Services = () => {
  const { data } = usePortfolioData();
  if (!data) return null;
  const { services } = data;

  return (
    <section id="services" className="relative py-24 border-t border-white/5 overflow-hidden">
      {/* Background Decal */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 font-f1 font-black italic text-[240px] text-white/[0.015] select-none pointer-events-none">
        BOX
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-f1Red text-white text-[10px] font-black italic px-2 py-0.5 rounded-2xs">
                SECTOR 04
              </span>
              <div className="font-hud text-xs tracking-[0.25em] text-f1Teal font-bold uppercase">
                PIT LANE COMMAND // ENGINEERING CAPABILITIES
              </div>
            </div>
            <h2 className="f1-section-title mt-2">
              PIT STOP PRECISION SERVICES (SERVICES OFFERED)
            </h2>
            <div className="f1-speed-strip w-48 mt-3" />
          </div>

          {/* Pit Stop Record Banner */}
          <div className="bg-[#05070B] border border-white/10 p-3 rounded-2xs flex items-center gap-3">
            <div className="p-2 bg-f1Red text-white rounded-2xs">
              <FaStopwatch className="text-lg animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-hud text-[9px] text-gray-400 uppercase tracking-widest">
                BENCHMARK SPEED
              </span>
              <span className="font-f1 font-black italic text-base text-white">
                SUB-2.0s PIT STOP LATENCY
              </span>
            </div>
          </div>
        </div>

        {/* Services Grid as Pit Crew Stations */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services && services.map((service, index) => {
            const stationNum = String(index + 1).padStart(2, '0');

            return (
              <div
                key={service.id || index}
                className="f1-card group p-6 sm:p-7 f1-cut border border-white/10 hover:border-f1Teal/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Station Number & Icon Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 flex items-center justify-center text-xl bg-[#05070B] border border-white/10 text-f1Teal group-hover:border-f1Teal/50 group-hover:scale-105 transition-all rounded-2xs shadow-inner">
                      {service.icon || <FaWrench />}
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-[10px] text-gray-500 block">CREW BAY</span>
                      <span className="font-racing font-black italic text-xl text-f1Red group-hover:text-f1Teal transition-colors">
                        #{stationNum}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-f1 font-black italic text-xl text-white uppercase group-hover:text-f1Teal transition-colors mb-3">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-xs text-gray-300 leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Features Checklist */}
                {service.features && service.features.length > 0 && (
                  <div className="pt-4 border-t border-white/10">
                    <span className="font-hud text-[9px] text-gray-400 uppercase tracking-widest block mb-2 font-bold">
                      INSPECTION SPECIFICATIONS:
                    </span>
                    <ul className="space-y-1.5 font-mono text-xs text-gray-300">
                      {service.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2">
                          <FaCheck className="text-f1Green text-[10px] shrink-0" />
                          <span className="truncate">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Services;
