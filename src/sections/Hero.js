import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { Helmet } from 'react-helmet-async';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { getIcon } from '../utils/getIcon';
import { FaFlag, FaDownload, FaBroadcastTower } from 'react-icons/fa';
import { HiLightningBolt } from 'react-icons/hi';

/* ── Starting Lights Gantry Component ── */
/* ── Interactive Starting Lights & Reaction Time Benchmark ── */
const StartingLights = () => {
  const [gameState, setGameState] = useState('idle'); // 'idle' | 'arming' | 'ready' | 'jumpstart' | 'finished'
  const [lightsCount, setLightsCount] = useState(0);
  const [reactionTime, setReactionTime] = useState(null);
  const [bestTime, setBestTime] = useState(() => {
    const saved = localStorage.getItem('f1_reaction_best');
    return saved ? parseInt(saved, 10) : null;
  });

  const lightsOutTimeRef = useRef(null);
  const stepTimerRef = useRef(null);
  const lightsOutTimerRef = useRef(null);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      clearTimeout(stepTimerRef.current);
      clearTimeout(lightsOutTimerRef.current);
    };
  }, []);

  const startSequence = useCallback(() => {
    clearTimeout(stepTimerRef.current);
    clearTimeout(lightsOutTimerRef.current);

    setGameState('arming');
    setLightsCount(0);
    setReactionTime(null);
    lightsOutTimeRef.current = null;

    let step = 0;
    const illuminateNext = () => {
      step += 1;
      setLightsCount(step);
      if (step < 5) {
        stepTimerRef.current = setTimeout(illuminateNext, 700);
      } else {
        // All 5 lights are on: randomized hold between 1.0s and 3.0s before extinguishing
        const randomHold = 1000 + Math.random() * 2000;
        lightsOutTimerRef.current = setTimeout(() => {
          setGameState('ready');
          lightsOutTimeRef.current = performance.now();
        }, randomHold);
      }
    };

    stepTimerRef.current = setTimeout(illuminateNext, 600);
  }, []);

  // Trigger when user clicks to launch
  const handleLaunchAttempt = useCallback(() => {
    if (gameState === 'idle' || gameState === 'finished' || gameState === 'jumpstart') {
      startSequence();
      return;
    }

    if (gameState === 'arming') {
      // Jump start! Clicked while lights were still illuminating
      clearTimeout(stepTimerRef.current);
      clearTimeout(lightsOutTimerRef.current);
      setGameState('jumpstart');
      return;
    }

    if (gameState === 'ready' && lightsOutTimeRef.current) {
      // Valid reaction!
      const elapsed = Math.round(performance.now() - lightsOutTimeRef.current);
      setReactionTime(elapsed);
      setGameState('finished');

      setBestTime(prev => {
        if (!prev || elapsed < prev) {
          try {
            localStorage.setItem('f1_reaction_best', String(elapsed));
          } catch (e) {
            // ignore
          }
          return elapsed;
        }
        return prev;
      });
    }
  }, [gameState, startSequence]);

  // Keyboard Spacebar listener to launch
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' && (gameState === 'arming' || gameState === 'ready')) {
        e.preventDefault();
        handleLaunchAttempt();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, handleLaunchAttempt]);

  // Performance telemetry verdict based on real F1 benchmarks
  const getVerdict = (ms) => {
    if (ms < 200) return { title: 'F1 WORLD CHAMPION PACE', color: 'text-purple-400', badge: 'bg-f1Purple/20 text-purple-300 border-f1Purple/40' };
    if (ms < 260) return { title: 'GRAND PRIX PODIUM REFLEX', color: 'text-f1Teal', badge: 'bg-f1Teal/20 text-f1Teal border-f1Teal/40' };
    if (ms < 350) return { title: 'GRID QUALIFIER PACE', color: 'text-yellow-400', badge: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40' };
    return { title: 'PIT LANE PENALTY PACE', color: 'text-gray-400', badge: 'bg-white/10 text-gray-300 border-white/20' };
  };

  const isLightsOut = gameState === 'ready' || gameState === 'finished';

  return (
    <div className="flex flex-col items-center mb-6 w-full max-w-md mx-auto">
      {/* Starting Lights Box */}
      <div
        onClick={handleLaunchAttempt}
        className="w-full bg-[#05070B] border-2 border-white/15 p-3 sm:p-4 rounded-md shadow-2xl flex flex-col items-center cursor-pointer select-none hover:border-f1Teal/50 transition-all group relative overflow-hidden"
        title={gameState === 'arming' || gameState === 'ready' ? 'Click to Launch!' : 'Click to Start Reaction Test'}
      >
        {/* Top Header */}
        <div className="w-full flex items-center justify-between pb-2 mb-2.5 border-b border-white/10 text-[9px] font-mono uppercase text-gray-400">
          <span className="flex items-center gap-1.5 font-bold">
            <span className="w-1.5 h-1.5 bg-f1Red rounded-xs" />
            FIA STARTING GANTRY // REFLEX BENCHMARK
          </span>
          {bestTime && (
            <span className="text-yellow-400 font-bold">
              BEST: {bestTime}ms
            </span>
          )}
        </div>

        {/* 5 Light Pods */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 py-1">
          {[1, 2, 3, 4, 5].map((pod) => {
            const isRed = pod <= lightsCount && !isLightsOut && gameState !== 'jumpstart';
            const isGreen = gameState === 'ready';

            return (
              <div
                key={pod}
                className="bg-[#0B0F17] p-2 border border-white/10 rounded flex flex-col items-center gap-1.5 shadow-inner"
              >
                <div
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full transition-all duration-100 ${
                    isRed
                      ? 'bg-f1Red shadow-[0_0_16px_#E10600]'
                      : isGreen
                      ? 'bg-f1Green shadow-[0_0_16px_#10B981]'
                      : 'bg-red-950/40 border border-red-900/30'
                  }`}
                />
                <div
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full transition-all duration-100 ${
                    isRed
                      ? 'bg-f1Red shadow-[0_0_16px_#E10600]'
                      : isGreen
                      ? 'bg-f1Green shadow-[0_0_16px_#10B981]'
                      : 'bg-red-950/40 border border-red-900/30'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Action Status Prompts */}
        <div className="mt-3 text-center">
          {gameState === 'idle' && (
            <span className="font-hud text-xs text-f1Teal tracking-widest font-bold uppercase group-hover:scale-105 inline-block transition-transform">
              TAP HERE OR SPACEBAR TO START REACTION TEST
            </span>
          )}

          {gameState === 'arming' && (
            <span className="font-mono text-xs text-yellow-400 tracking-wider font-bold uppercase">
              WAIT FOR LIGHTS OUT... DO NOT JUMP START!
            </span>
          )}

          {gameState === 'ready' && (
            <span className="font-f1 font-black italic text-sm tracking-widest text-f1Green uppercase">
              GO! GO! GO! CLICK NOW!
            </span>
          )}

          {gameState === 'jumpstart' && (
            <div className="flex flex-col items-center gap-1">
              <span className="font-f1 font-black italic text-xs tracking-wider text-f1Red uppercase">
                ⚠️ FALSE START! +5 SEC TIME PENALTY
              </span>
              <span className="font-hud text-[10px] text-gray-400">
                You reacted before the lights went out. Click to try again.
              </span>
            </div>
          )}

          {gameState === 'finished' && reactionTime && (
            <div className="flex flex-col items-center gap-1.5 animate-fadeIn">
              <div className="flex items-center gap-3">
                <span className="font-f1 font-black italic text-2xl text-white tracking-wider">
                  {reactionTime} <span className="text-xs text-gray-400 font-mono">MS</span>
                </span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 border rounded-2xs uppercase ${getVerdict(reactionTime).badge}`}>
                  {getVerdict(reactionTime).title}
                </span>
              </div>
              <span className="font-hud text-[9px] text-gray-400 tracking-wider">
                CLICK TO RETRY &amp; BEAT YOUR RECORD (SPACEBAR SUPPORTED)
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ── RPM Shift Light Bar ── */
const ShiftLightBar = ({ rpmPercent = 95 }) => {
  return (
    <div className="w-full bg-[#05070B] border border-white/10 p-2 rounded-sm shadow-md">
      <div className="flex items-center justify-between text-[9px] font-mono text-gray-400 mb-1">
        <span>RPM GAIN</span>
        <span className="text-f1Teal font-bold">12,850 RPM // REDLINE 13,000</span>
      </div>
      <div className="grid grid-cols-15 gap-1">
        {/* 5 Green LEDs */}
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={`g-${i}`}
            className="h-2 rounded-2xs bg-f1Green shadow-[0_0_6px_#10B981]"
          />
        ))}
        {/* 5 Red LEDs */}
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={`r-${i}`}
            className="h-2 rounded-2xs bg-f1Red shadow-[0_0_8px_#E10600]"
          />
        ))}
        {/* 5 Purple / Blue LEDs (Shift Warning) */}
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={`p-${i}`}
            className="h-2 rounded-2xs bg-f1Purple shadow-[0_0_10px_#B138DD] animate-pulse"
          />
        ))}
      </div>
    </div>
  );
};

const Hero = () => {
  const { data } = usePortfolioData();
  const [raceMode, setRaceMode] = useState('hotlap'); // 'hotlap' | 'race' | 'safety'
  const [isDrsActive, setIsDrsActive] = useState(false);

  if (!data) return null;
  const { personalInfo, socialLinks, typewriterSequences } = data;

  // Dynamic telemetry based on mode & DRS state
  const baseTelemetry = {
    hotlap: { speed: 352, gear: '8', throttle: '100%', ers: '98%', status: 'HOT LAP PUSH', color: 'text-f1Purple' },
    race:   { speed: 324, gear: '7', throttle: '88%',  ers: '76%', status: 'RACE PACE', color: 'text-f1Teal' },
    safety: { speed: 145, gear: '4', throttle: '35%',  ers: '99%', status: 'SAFETY CAR DELTA', color: 'text-f1Yellow' },
  }[raceMode];

  const telemetry = {
    ...baseTelemetry,
    speed: isDrsActive ? baseTelemetry.speed + 22 : baseTelemetry.speed,
    status: isDrsActive ? 'DRS WING OPEN // MAXIMUM VELOCITY' : baseTelemetry.status,
  };

  const toggleDrs = () => {
    setIsDrsActive((prev) => !prev);
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>Saudeep Adhikari — Formula 1 Spec Full Stack Developer & Designer</title>
        <meta
          name="description"
          content="Saudeep Adhikari is a Full Stack Web Developer from Nepal. F1-themed engineering portfolio featuring React, Node.js, MongoDB, telemetry specs, and high-performance applications."
        />
      </Helmet>

      <section id="hero" className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center overflow-hidden">
        {/* Massive Background Stencil Race Number */}
        <div className="absolute right-4 lg:right-24 top-1/2 -translate-y-1/2 font-f1 font-black italic text-[180px] sm:text-[280px] lg:text-[420px] text-white/[0.03] select-none pointer-events-none leading-none z-0">
          07
        </div>

        {/* Ambient Motorsport Lighting */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-f1Red/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-f1Teal/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          {/* Starting Gantry Lights */}
          <StartingLights />

          {/* Grid Layout: Left Cockpit Info + Right Telemetry Card */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* ── LEFT: Driver Information & Launch Controls (7 Cols) ── */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              
              {/* Classification Tag & DRS Badge */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="badge-red">
                  <FaFlag className="text-[10px]" />
                  FIA SUPERLICENSE // PILOT P1
                </span>
                <span className="badge-purple">
                  FASTEST LAP // 1:18.243
                </span>
                <span className="badge-green">
                  <span className="w-1.5 h-1.5 rounded-full bg-f1Green" />
                  DRS OPEN
                </span>
              </div>

              {/* Main Headline: Slanted Racing Font */}
              <div className="overflow-visible">
                <div className="font-hud text-xs sm:text-sm tracking-[0.3em] text-f1Teal uppercase font-bold mb-2">
                  FULL STACK MOTORSPORT ARCHITECT
                </div>
                <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-[82px] font-f1 font-black italic uppercase tracking-tight text-white leading-[1.08] overflow-visible">
                  <span className="inline-block pr-6">SAUDEEP</span><br />
                  <span className="inline-block pr-8 pb-2 text-transparent bg-clip-text bg-gradient-to-r from-f1Red via-f1Teal to-white drop-shadow-[0_4px_12px_rgba(225,6,0,0.35)]">
                    ADHIKARI
                  </span>
                </h1>
              </div>

              {/* Typewriter Subtitle */}
              <div className="font-f1 text-xl sm:text-2xl text-gray-300 italic font-semibold flex items-center gap-2">
                <span className="text-f1Teal">{'//'}</span>
                {typewriterSequences && typewriterSequences.length > 0 ? (
                  <TypeAnimation
                    sequence={typewriterSequences}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                    className="text-white"
                  />
                ) : (
                  <span>Full Stack Web Developer &amp; UI Architect</span>
                )}
              </div>

              {/* Tagline / Bio snippet */}
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-xl font-sans">
                {personalInfo.tagline ||
                  'Engineering high-octane web systems with the precision of a Formula 1 team. From aerodynamics in UI/UX to high-RPM backend engines.'}
              </p>

              {/* Cockpit Mode Switcher */}
              <div className="bg-[#05070B] border border-white/10 p-1.5 rounded-sm flex items-center gap-1 max-w-md">
                <span className="font-hud text-[10px] text-gray-500 uppercase px-2 font-bold hidden sm:inline">
                  MODE:
                </span>
                {[
                  { id: 'hotlap', label: '🔥 HOT LAP (QUALI)', color: 'bg-f1Purple text-white' },
                  { id: 'race',   label: '🏎️ RACE PUSH',        color: 'bg-f1Teal text-black' },
                  { id: 'safety', label: '🟡 SAFETY CAR',       color: 'bg-f1Yellow text-black' },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => {
                      setRaceMode(mode.id);
                    }}
                    className={`flex-1 py-1.5 px-2 text-[10px] sm:text-xs font-f1 font-black uppercase tracking-wider rounded-2xs transition-all cursor-pointer ${
                      raceMode === mode.id
                        ? `${mode.color} shadow-lg font-black`
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>

              {/* DRS Wing Hydraulic Deploy Switch */}
              <div className="flex items-center gap-3 pt-1">
                <button
                  onClick={toggleDrs}
                  className={`px-3 py-1.5 rounded-2xs border text-xs font-hud font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                    isDrsActive
                      ? 'bg-f1Green text-black border-f1Green shadow-[0_0_20px_rgba(16,185,129,0.6)] animate-pulse'
                      : 'bg-white/5 text-gray-300 border-white/15 hover:border-f1Teal hover:text-white'
                  }`}
                  title="Click to Deploy DRS Rear Wing Hydraulic Flap"
                >
                  <span className={`w-2 h-2 rounded-full ${isDrsActive ? 'bg-black' : 'bg-f1Green'}`} />
                  <span>{isDrsActive ? 'DRS DEPLOYED (+22 KM/H)' : 'DEPLOY DRS WING'}</span>
                </button>
                <span className="text-[10px] font-mono text-gray-400">
                  {isDrsActive ? 'DRS FLAP: OPEN' : 'REDUCTION IN DRAG ZONE'}
                </span>
              </div>

              {/* Pit Radio Transmission Box */}
              <div className="bg-[#0D121B] border-l-4 border-f1Teal p-3 rounded-r-sm max-w-xl flex items-start gap-3 shadow-lg">
                <FaBroadcastTower className="text-f1Teal text-base mt-0.5 shrink-0 animate-pulse" />
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 font-hud text-[10px] text-f1Teal font-bold tracking-widest uppercase">
                    <span>PIT WALL RADIO</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-400">CHANNEL 07 ACTIVE</span>
                  </div>
                  <p className="font-mono text-xs text-gray-300 italic mt-0.5">
                    "Radio check Saudeep. Mode push confirmed. Both telemetry sectors green, prepare to engage DRS into turn 1."
                  </p>
                </div>
              </div>

              {/* Launch Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => scrollTo('projects')}
                  className="btn-f1-primary"
                  title="View completed portfolio projects"
                >
                  <HiLightningBolt className="text-base" />
                  <span>ENGAGE DRS // VIEW WORK (PROJECTS)</span>
                </button>

                <button
                  onClick={() => scrollTo('contact')}
                  className="btn-f1-teal"
                  title="Contact Saudeep"
                >
                  <FaBroadcastTower className="text-xs" />
                  <span>RADIO PIT WALL (CONTACT)</span>
                </button>

                {personalInfo.resumePath && (
                  <a
                    href={personalInfo.resumePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 font-f1 font-black italic uppercase text-xs md:text-sm tracking-wider px-6 py-3.5 bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-amber-500/20 text-yellow-300 border-2 border-yellow-400/80 hover:border-yellow-400 hover:bg-yellow-400 hover:text-black hover:shadow-[0_0_25px_rgba(250,204,21,0.5)] transition-all duration-300 rounded-2xs group shadow-lg"
                    style={{ clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)' }}
                    title="Download Saudeep Adhikari's Curriculum Vitae / Resume (PDF)"
                  >
                    <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-yellow-400 text-black group-hover:bg-black group-hover:text-yellow-400 rounded-xs transition-colors">
                      CV
                    </span>
                    <FaDownload className="text-xs group-hover:translate-y-0.5 transition-transform" />
                    <span>CURRICULUM VITAE (PDF)</span>
                  </a>
                )}
              </div>

              {/* Social Channels in Pit Wall Style */}
              <div className="flex items-center gap-2 pt-2">
                <span className="font-hud text-[10px] text-gray-500 uppercase tracking-widest">
                  TELEMETRY FEEDS:
                </span>
                <div className="flex items-center gap-1.5">
                  {socialLinks.map((s) => {
                    const Icon = getIcon(s.icon);
                    return (
                      <a
                        key={s.name}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 flex items-center justify-center bg-white/5 border border-white/10 hover:border-f1Teal hover:text-f1Teal text-gray-300 transition-all text-xs"
                        style={{ clipPath: 'polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)' }}
                        aria-label={s.name}
                      >
                        {Icon ? Icon : s.name[0]}
                      </a>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* ── RIGHT: Official F1 Driver Profile Card & Telemetry HUD (5 Cols) ── */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              
              {/* Driver Race Card */}
              <div className="f1-card f1-cut-lg p-5 sm:p-6 shadow-2xl relative overflow-hidden">
                {/* Chequered flag corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/10 to-transparent pointer-events-none" />
                
                {/* Header: Driver Classification */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="bg-f1Red text-white text-xs font-black italic px-2 py-0.5 rounded-2xs">
                      P1
                    </span>
                    <span className="font-f1 font-black text-sm tracking-wider text-white">
                      DRIVER SPEC // 2026
                    </span>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-xs text-gray-400">
                    <FaFlag className="text-f1Teal" />
                    <span>NEP / 🇳🇵</span>
                  </div>
                </div>

                {/* Driver Photo + Overlay */}
                <div className="relative mt-4 mb-4 rounded-sm overflow-hidden border border-white/10 group">
                  <img
                    src={personalInfo.profileImage || '/assets/profile.jpg'}
                    alt={personalInfo.name}
                    className="w-full h-64 sm:h-72 object-cover object-top filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  {/* High contrast motorsport gradient over image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080B10] via-transparent to-transparent opacity-90" />
                  
                  {/* Hologram Driver Tag */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <div>
                      <div className="font-hud text-[9px] text-f1Teal uppercase tracking-widest font-bold">
                        FIA SUPERLICENSE ID: #SAU-07
                      </div>
                      <div className="font-f1 font-black italic text-xl text-white">
                        SAUDEEP ADHIKARI
                      </div>
                    </div>
                    <div className="font-racing font-black italic text-3xl text-f1Red">
                      #07
                    </div>
                  </div>
                </div>

                {/* Cockpit RPM Rev Limiter */}
                <ShiftLightBar />

                {/* Live Telemetry Readouts Grid */}
                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/10 text-center font-mono">
                  <div className="bg-[#05070B] p-2 border border-white/5 rounded-2xs">
                    <span className="text-[9px] text-gray-500 block uppercase">TOP SPEED</span>
                    <span className="text-base font-black text-white">{telemetry.speed} <span className="text-[9px] text-f1Teal">KM/H</span></span>
                  </div>
                  <div className="bg-[#05070B] p-2 border border-white/5 rounded-2xs">
                    <span className="text-[9px] text-gray-500 block uppercase">GEAR</span>
                    <span className="text-base font-black text-f1Red font-racing">{telemetry.gear}</span>
                  </div>
                  <div className="bg-[#05070B] p-2 border border-white/5 rounded-2xs">
                    <span className="text-[9px] text-gray-500 block uppercase">THROTTLE</span>
                    <span className="text-base font-black text-f1Green">{telemetry.throttle}</span>
                  </div>
                </div>

                {/* ERS Energy Recovery & DRS indicator */}
                <div className="flex items-center justify-between mt-3 text-xs font-hud text-gray-400 bg-white/5 px-3 py-2 rounded-2xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-f1Teal" />
                    <span>ERS DEPLOY: <strong>{telemetry.ers}</strong></span>
                  </div>
                  <span className={`font-bold ${telemetry.color}`}>
                    {telemetry.status}
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
