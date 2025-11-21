import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Blog from './sections/Blog';
import Contact from './sections/Contact';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';

function App() {
  return (
    <div className="min-h-screen bg-dark text-light dark transition-colors duration-300">
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Blog />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
