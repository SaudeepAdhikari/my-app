import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
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

function App() {
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

export default App;

