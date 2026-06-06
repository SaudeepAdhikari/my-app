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
import EasterEgg from './components/EasterEgg';
import { PortfolioDataProvider, usePortfolioData } from './context/PortfolioDataContext';

function AppContent() {
  usePortfolioData();

  return (
    <div className="min-h-screen bg-dark text-gray-200 dark transition-colors duration-300">
      <ScrollProgress />
      <Navbar />
      <AvailabilityBadge />
      <AccessibilityPanel />
      <EasterEgg />

      <main>
        <Hero />
        <About />
        <Skills />
        <Services />
        <Projects />
        <Resume />
        <Blog />
        <ResumeDownload />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <PortfolioDataProvider>
      <AppContent />
    </PortfolioDataProvider>
  );
}

export default App;
