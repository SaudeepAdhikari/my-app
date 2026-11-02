/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Authentic Formula 1 Color Palette
        primary: '#ffffff',
        secondary: '#94A3B8',
        f1Red: '#E10600',        // Official FIA Formula 1 Red
        f1Teal: '#00D2BE',       // Petronas Mercedes Teal
        accent: '#00D2BE',       // Primary motorsport accent
        accentHover: '#00b5a3',
        f1Purple: '#B138DD',     // F1 Fastest Lap Purple
        f1Yellow: '#F59E0B',     // Yellow Flag / Medium Tyre
        f1Green: '#10B981',      // Green Flag / Personal Best
        f1Silver: '#D1D5DB',     // Silver Arrow Metallic
        f1Gold: '#EAB308',       // P1 Trophy Gold
        dark: '#080B10',         // Cockpit Black
        darkAlt: '#0E131B',      // Carbon Chassis
        card: '#121824',         // Telemetry Panel Card
        glass: 'rgba(18, 24, 36, 0.75)',
        glassBorder: 'rgba(255, 255, 255, 0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        f1: ['"Titillium Web"', 'sans-serif'],
        racing: ['"Orbitron"', '"Titillium Web"', 'sans-serif'],
        hud: ['"Chakra Petch"', 'sans-serif'],
        heading: ['"Titillium Web"', '"Outfit"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'marquee': 'marquee 25s linear infinite',
        'speed-blur': 'speedBlur 1.5s ease-in-out infinite alternate',
        'rev-pulse': 'revPulse 0.6s ease-in-out infinite alternate',
        'flag-wave': 'flagWave 2s ease-in-out infinite',
        'drs-glow': 'drsGlow 1.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        speedBlur: {
          '0%': { filter: 'drop-shadow(0 0 4px #00D2BE)' },
          '100%': { filter: 'drop-shadow(0 0 16px #00D2BE)' },
        },
        revPulse: {
          '0%': { opacity: '0.7' },
          '100%': { opacity: '1' },
        },
        flagWave: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(8deg)' },
        },
        drsGlow: {
          '0%, 100%': { boxShadow: '0 0 8px rgba(0, 210, 190, 0.5)' },
          '50%': { boxShadow: '0 0 24px rgba(0, 210, 190, 0.9)' },
        },
      },
      backgroundImage: {
        'carbon-twill': `repeating-linear-gradient(
          45deg,
          #0b0f17 0px,
          #0b0f17 4px,
          #111622 4px,
          #111622 8px
        )`,
        'chequered': `conic-gradient(
          #ffffff 90deg,
          #000000 90deg 180deg,
          #ffffff 180deg 270deg,
          #000000 270deg
        )`,
        'pitwall-gradient': 'linear-gradient(180deg, rgba(14,19,27,0.95) 0%, rgba(8,11,16,0.98) 100%)',
      }
    },
  },
  plugins: [],
}
