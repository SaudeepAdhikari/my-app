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
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import LoadingScreen from './components/LoadingScreen';
import Stats from './components/Stats';
import ResumeDownload from './components/ResumeDownload';
import AvailabilityBadge from './components/AvailabilityBadge';
import AccessibilityPanel from './components/AccessibilityPanel';
import EasterEgg from './components/EasterEgg';
import { PortfolioDataProvider, usePortfolioData } from './context/PortfolioDataContext';

function AppContent() {
  const { loading } = usePortfolioData();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-dark text-light dark transition-colors duration-300">
      <LoadingScreen />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <AvailabilityBadge />
      <AccessibilityPanel />
      <EasterEgg />

      <main>
        <Hero />
        <About />
        <Stats />
        <Skills />
        <Resume />
        <Services />
        <Projects />
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

