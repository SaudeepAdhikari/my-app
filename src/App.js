import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Resume from './sections/Resume';
import Services from './sections/Services';
import Projects from './sections/Projects';
import Blog from './sections/Blog';
import Contact from './sections/Contact';
import ScrollProgress from './components/ScrollProgress';
import ResumeDownload from './components/ResumeDownload';
import AvailabilityBadge from './components/AvailabilityBadge';
import AccessibilityPanel from './components/AccessibilityPanel';
import CommandPalette from './components/CommandPalette';
import EasterEgg from './components/EasterEgg';
import GlobalSEO from './components/GlobalSEO';
import TechMarquee from './components/TechMarquee';
import F1SectionDivider from './components/F1SectionDivider';
import ScrollReveal from './components/ScrollReveal';
import BackToTop from './components/BackToTop';
import { PortfolioDataProvider, usePortfolioData } from './context/PortfolioDataContext';
import { LiveryProvider } from './context/LiveryContext';

function AppContent() {
  usePortfolioData();

  return (
    <div className="min-h-screen bg-dark text-gray-200 dark transition-colors duration-300">
      <GlobalSEO />
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-md focus:bg-accent focus:text-white focus:text-sm focus:font-semibold"
      >
        Skip to main content
      </a>
      <ScrollProgress />
      <Navbar />
      <AvailabilityBadge />
      <AccessibilityPanel />
      <CommandPalette />
      <EasterEgg />

      <main id="main-content" role="main">
        <Hero />

        {/* Tech Marquee between Hero and About */}
        <TechMarquee />
        <F1SectionDivider />

        <ScrollReveal>
          <About />
        </ScrollReveal>

        <F1SectionDivider />

        <ScrollReveal delay={80}>
          <Skills />
        </ScrollReveal>

        <F1SectionDivider />

        <ScrollReveal delay={80}>
          <Services />
        </ScrollReveal>

        <F1SectionDivider />

        <ScrollReveal delay={80}>
          <Projects />
        </ScrollReveal>

        <F1SectionDivider />

        <ScrollReveal delay={80}>
          <Resume />
        </ScrollReveal>

        <F1SectionDivider />

        <ScrollReveal delay={80}>
          <Blog />
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <ResumeDownload />
        </ScrollReveal>

        <F1SectionDivider />

        <ScrollReveal delay={80}>
          <Contact />
        </ScrollReveal>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}

function App() {
  return (
    <PortfolioDataProvider>
      <LiveryProvider>
        <AppContent />
      </LiveryProvider>
    </PortfolioDataProvider>
  );
}

export default App;
