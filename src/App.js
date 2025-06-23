import React, { useEffect, useState } from 'react';
import './App.css';
import './Home.css';
import './Enhanced.css';
import About from './About';
import Projects from './Projects';
import Skills from './Skills';
import Contact from './Contact';
import { motion } from 'framer-motion';

const Hero = () => (
  <section id="hero" className="hero-section-fullpage">
    <div className="hero-background-fullpage">
      {/* Animated floating blobs for moving background */}
      <div className="hero-floating-blob blob1"></div>
      <div className="hero-floating-blob blob2"></div>
      <div className="hero-floating-blob blob3"></div>
      <div className="hero-background-overlay"></div>
    </div>

    <div className="hero-content-fullpage">
      <motion.div
        className="hero-profile-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <img
          src="/profile.jpg"
          alt="Saudeep Adhikari profile"
          className="hero-profile-img-fullpage"
          loading="lazy"
        />
        <div className="hero-profile-glow"></div>
      </motion.div>

      <motion.h1
        className="hero-title-fullpage"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Hi, I'm <span className="hero-name-highlight">Saudeep Adhikari</span>
      </motion.h1>

      <motion.p
        className="hero-subtitle-fullpage"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        Quality-Focused Full Stack Web Developer & Designer
      </motion.p>

      <motion.div
        className="hero-description-fullpage"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        Crafting digital experiences that blend creativity with functionality
      </motion.div>

      <motion.div
        className="hero-btns-fullpage"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
      >
        <a href="#contact" className="hero-btn-primary">Get In Touch</a>
        <a href="#projects" className="hero-btn-secondary">View My Work</a>
      </motion.div>

      <motion.div
        className="hero-socials-fullpage"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <a href="https://github.com/saudeepadhikari" className="hero-social-icon-fullpage" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.48 2.87 8.28 6.84 9.63.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0 1 12 6.84c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .27.18.58.69.48C19.13 20.54 22 16.74 22 12.26 22 6.58 17.52 2 12 2z" /></svg>
        </a>
        <a href="https://www.linkedin.com/in/saudeep-adhikari-b558aa2a8/" className="hero-social-icon-fullpage" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 8a6 6 0 0 1 6 6v6h-4v-6a2 2 0 0 0-4 0v6h-4v-6a6 6 0 0 1 6-6z" /><circle cx="8" cy="8" r="2" /></svg>
        </a>
        <a href="mailto:saudeepadhikari543@gmail.com" className="hero-social-icon-fullpage" aria-label="Email">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" ry="2" /><polyline points="22,6 12,13 2,6" /></svg>
        </a>
        <a href="https://www.facebook.com/saudeep.adhikariking" className="hero-social-icon-fullpage" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 8h-2a2 2 0 0 0-2 2v2h4l-.5 4h-3.5v6" /></svg>
        </a>
        <a href="https://www.instagram.com/saudeepadh/" className="hero-social-icon-fullpage" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.5" y2="6.5" /></svg>
        </a>
      </motion.div>
    </div>

    <motion.div
      className="scroll-indicator"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 2 }}
    >
      <div className="scroll-arrow"></div>
      <span>Scroll to explore</span>
    </motion.div>
  </section>
);

function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.button
      className={`back-to-top-enhanced${visible ? ' show' : ''}`}
      onClick={scrollToTop}
      aria-label="Back to top"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 19V5M12 5l-6 6M12 5l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.button>
  );
}

const Footer = () => (
  <footer className="footer-enhanced">
    <div className="footer-content-enhanced">
      <div className="footer-section">
        <h3>Saudeep Adhikari</h3>
        <p>Full Stack Developer & Designer</p>
      </div>
      <div className="footer-section">
        <h4>Connect</h4>
        <div className="footer-socials">
          <a href="https://github.com/saudeepadhikari" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/saudeep-adhikari-b558aa2a8/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="mailto:saudeepadhikari543@gmail.com">Email</a>
        </div>
      </div>
      <div className="footer-section">
        <p>&copy; 2025 Saudeep Adhikari. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

const Section = ({ children, id, className = "", ...props }) => (
  <motion.section
    id={id}
    className={`section-enhanced ${className}`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    {...props}
  >
    {children}
  </motion.section>
);

const AnimatedNavbar = ({ children, ...props }) => (
  <motion.nav
    initial={{ y: -100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
    {...props}
  >
    {children}
  </motion.nav>
);

function App() {
  const [darkMode, setDarkMode] = React.useState(() => {
    if (window.localStorage.getItem('darkMode') === null) {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } else {
      return window.localStorage.getItem('darkMode') === 'true';
    }
  });
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
    window.localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const [menuOpen, setMenuOpen] = useState(false);
  const handleNavClick = () => setMenuOpen(false);

  return (
    <div className={`App-enhanced ${darkMode ? 'dark-mode' : ''}`}>
      <div className="background-boxes">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {showWelcome && (
        <div className="welcome-popup-overlay">
          <div className="welcome-popup-enhanced">
            <h2>Welcome to My Portfolio!</h2>
            <p>Discover my journey as a full stack web developer and designer. Explore projects, skills, and creative solutions that blend technology with design. Thank you for visiting—enjoy your stay!</p>
            <button className="welcome-popup-btn" onClick={() => setShowWelcome(false)}>
              Start Exploring
            </button>
          </div>
        </div>
      )}
      <div className="app-bg-enhanced"></div>
      <AnimatedNavbar className={`navbar-enhanced ${menuOpen ? 'open' : ''}`}>
        <div className="navbar-left-enhanced">
          <a href="#hero" className="navbar-logo-enhanced">Saudeep</a>
        </div>

        <button
          className={`navbar-hamburger-enhanced${menuOpen ? ' open' : ''}`}
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
          aria-controls="nav-list-enhanced"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="hamburger-bar-enhanced"></span>
          <span className="hamburger-bar-enhanced"></span>
          <span className="hamburger-bar-enhanced"></span>
        </button>

        <ul
          className={`nav-list-enhanced${menuOpen ? ' open' : ''}`}
          id="nav-list-enhanced"
        >
          <li><a href="#hero" onClick={handleNavClick}>Home</a></li>
          <li><a href="#about" onClick={handleNavClick}>About</a></li>
          <li><a href="#skills" onClick={handleNavClick}>Skills</a></li>
          <li><a href="#projects" onClick={handleNavClick}>Projects</a></li>
          <li><a href="#contact" onClick={handleNavClick}>Contact</a></li>
        </ul>

        <button
          className="dark-toggle-btn-enhanced"
          onClick={() => setDarkMode((d) => !d)}
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          aria-pressed={darkMode}
        >
          <span
            className={`toggle-icon moon${darkMode ? '' : ' hide'}`}
            aria-hidden={!darkMode}
          >🌙</span>
          <span
            className={`toggle-icon sun${!darkMode ? '' : ' hide'}`}
            aria-hidden={darkMode}
          >☀️</span>
        </button>
      </AnimatedNavbar>

      <main className="main-content-enhanced">
        <Hero />

        <Section id="about" className="about-section-enhanced">
          <About />
        </Section>

        <Section id="skills" className="skills-section-enhanced">
          <Skills />
        </Section>

        <Section id="projects" className="projects-section-enhanced">
          <Projects />
        </Section>

        <Section id="contact" className="contact-section-enhanced">
          <Contact />
        </Section>
      </main>

      <Footer />
      <BackToTopButton />
    </div>
  );
}

export default App;

/* CSS (App.css)
.app-body {
  min-height: 100vh;
  background: url('./background.jpg') no-repeat center center fixed;
  background-size: cover;
  background-attachment: fixed;
}
.hero-profile-img {
  width: 160px;
  height: 160px;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid #fff;
  box-shadow: 0 4px 24px rgba(20,184,166,0.18);
  background: url('./profile.jpg') center center/cover no-repeat;
}
*/
