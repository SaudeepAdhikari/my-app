import React, { createContext, useContext, useState, useEffect } from 'react';

export const LIVERIES = {
  mercedes: {
    id: 'mercedes',
    name: 'MERCEDES-AMG',
    constructor: 'PETRONAS FORMULA ONE TEAM',
    specText: 'MERCEDES SPEC // DEV',
    primaryColor: '#00D2BE',      // Petronas Emerald Teal
    secondaryColor: '#E10600',    // Ineos Red
    accentColor: '#B138DD',       // Purple Fastest Lap
    badgeBg: '#00D2BE',
    cardBorderHover: 'rgba(0, 210, 190, 0.5)',
    glow: 'rgba(0, 210, 190, 0.4)',
    flagEmoji: '🏁'
  },
  ferrari: {
    id: 'ferrari',
    name: 'SCUDERIA FERRARI',
    constructor: 'HP FORMULA ONE TEAM',
    specText: 'FERRARI SPEC // DEV',
    primaryColor: '#EF1A2D',      // Rosso Corsa
    secondaryColor: '#FFF200',    // Giallo Modena
    accentColor: '#0090FF',       // HP Azzurro Dino
    badgeBg: '#EF1A2D',
    cardBorderHover: 'rgba(239, 26, 45, 0.6)',
    glow: 'rgba(239, 26, 45, 0.4)',
    flagEmoji: '🐎'
  },
  mclaren: {
    id: 'mclaren',
    name: 'MCLAREN F1',
    constructor: 'MCLAREN RACING FORMULA 1',
    specText: 'MCLAREN SPEC // DEV',
    primaryColor: '#FF8000',      // Papaya Orange
    secondaryColor: '#04C4D9',    // Gulf / Anthracite Blue
    accentColor: '#B138DD',       // Purple
    badgeBg: '#FF8000',
    cardBorderHover: 'rgba(255, 128, 0, 0.6)',
    glow: 'rgba(255, 128, 0, 0.4)',
    flagEmoji: '🏎️'
  },
  redbull: {
    id: 'redbull',
    name: 'RED BULL RACING',
    constructor: 'ORACLE RED BULL RACING',
    specText: 'RED BULL SPEC // DEV',
    primaryColor: '#1E41FF',      // Racing Navy / Cobalt Blue
    secondaryColor: '#F59E0B',    // Amber Gold
    accentColor: '#E10600',       // Bull Red
    badgeBg: '#1E41FF',
    cardBorderHover: 'rgba(30, 65, 255, 0.6)',
    glow: 'rgba(30, 65, 255, 0.4)',
    flagEmoji: '⚡'
  }
};

const LiveryContext = createContext({
  currentLivery: 'mercedes',
  livery: LIVERIES.mercedes,
  setLivery: () => {}
});

export const LiveryProvider = ({ children }) => {
  const [currentLivery, setCurrentLivery] = useState(() => {
    try {
      return localStorage.getItem('f1_active_livery') || 'mercedes';
    } catch (e) {
      return 'mercedes';
    }
  });

  const active = LIVERIES[currentLivery] || LIVERIES.mercedes;

  useEffect(() => {
    const root = document.documentElement;
    // Set CSS Variables dynamically across all styled components
    root.style.setProperty('--f1-teal', active.primaryColor);
    root.style.setProperty('--f1-purple', active.accentColor);
    root.style.setProperty('--theme-glow', active.glow);
    root.style.setProperty('--theme-border-hover', active.cardBorderHover);

    try {
      localStorage.setItem('f1_active_livery', currentLivery);
    } catch (e) {}
  }, [currentLivery, active]);

  const selectLivery = (key) => {
    if (LIVERIES[key]) {
      setCurrentLivery(key);
    }
  };

  return (
    <LiveryContext.Provider value={{ currentLivery, livery: active, setLivery: selectLivery }}>
      {children}
    </LiveryContext.Provider>
  );
};

export const useLivery = () => useContext(LiveryContext);

