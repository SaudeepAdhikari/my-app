import React, { useEffect, useState } from 'react';
import './App.css';
import './Home.css';
import About from './About';
import Projects from './Projects';
import Skills from './Skills';
import Contact from './Contact';
import { motion } from 'framer-motion';

const Hero = () => (
  <section id="hero" className="hero-section" style={{overflow: 'hidden', width: '100vw', maxWidth: '100vw'}}>
    <div className="hero-overlay">
      <img
        src="/profile.jpg"
        alt="Saudeep Adhikari profile"
        className="hero-profile-img"
        loading="lazy"
      />
      <h1 className="hero-title">Hi, I'm Saudeep Adhikari</h1>
      <p className="hero-subtitle">Quality-Focused Full Stack Web Developer & Designer based in Nepal</p>
      <div className="hero-btns">
        <a href="#contact" className="hero-btn">Contact Me</a>
        <a href="#projects" className="hero-btn">View Projects</a>
        {/* <a href="/Saudeep_Adhikari_CV.pdf" className="hero-btn" download target="_blank" rel="noopener noreferrer">Download CV</a> */}
      </div>
      <div className="hero-socials">
        <a href="https://github.com/saudeepadhikari" className="hero-social-icon" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.48 2.87 8.28 6.84 9.63.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0 1 12 6.84c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .27.18.58.69.48C19.13 20.54 22 16.74 22 12.26 22 6.58 17.52 2 12 2z"/></svg>
        </a>
        <a href="https://www.linkedin.com/in/saudeep-adhikari-b558aa2a8/" className="hero-social-icon" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 8a6 6 0 0 1 6 6v6h-4v-6a2 2 0 0 0-4 0v6h-4v-6a6 6 0 0 1 6-6z"/><circle cx="8" cy="8" r="2"/></svg>
        </a>
        <a href="mailto:saudeepadhikari543@gmail.com" className="hero-social-icon" aria-label="Email">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"/><polyline points="22,6 12,13 2,6"/></svg>
        </a>
        <a href="https://www.facebook.com/saudeep.adhikariking" className="hero-social-icon" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 8h-2a2 2 0 0 0-2 2v2h4l-.5 4h-3.5v6"/></svg>
        </a>
        <a href="https://www.instagram.com/saudeepadh/" className="hero-social-icon" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg>
        </a>
      </div>
    </div>
    <div
      className="hero-background-wrapper"
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        maxWidth: "100vw",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: -1,
        borderRadius: "0 0 32px 32px",
        opacity: 0.92,
        filter: "blur(0px)",
        pointerEvents: "none"
      }}
    />
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
    <button
      className={`back-to-top-arrow${visible ? ' show' : ''}`}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="#00bfae" opacity="0.13"/>
        <path d="M16 23V9M16 9l-6 6M16 9l6 6" stroke="#00bfae" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <span>&copy; 2025 Saudeep Adhikari. All rights reserved.</span>
    </div>
  </footer>
);

const Section = ({ children, ...props }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.7, ease: [0.4, 2, 0.6, 1] }}
    {...props}
  >
    {children}
  </motion.section>
);

const AnimatedNavbar = ({ children, ...props }) => (
  <motion.nav
    initial={{ y: -60, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.7, ease: [0.4, 2, 0.6, 1] }}
    {...props}
  >
    {children}
  </motion.nav>
);

function App() {
  // Set dark mode as default
  const [darkMode, setDarkMode] = React.useState(() => {
    // Always default to dark mode on first load
    if (window.localStorage.getItem('darkMode') === null) {
      window.localStorage.setItem('darkMode', 'true');
      return true;
    }
    return window.localStorage.getItem('darkMode') === 'true';
  });
  const [menuOpen, setMenuOpen] = React.useState(false);
  // Always show welcome popup on first load (and after every refresh)
  const [showWelcome, setShowWelcome] = useState(true); // Always show for now

  React.useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
    window.localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Close menu on navigation (for mobile UX)
  const handleNavClick = () => setMenuOpen(false);

  return (
    <div className={`App${darkMode ? ' dark' : ''}`}> 
      <div className={`app-bg${darkMode ? ' dark' : ''}`}></div>
      <AnimatedNavbar className="navbar">
        <div className="navbar-left">
          <a href="#hero" className="navbar-logo">Saudeep</a>
        </div>
        <button
          className={`navbar-hamburger${menuOpen ? ' open' : ''}`}
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
          aria-controls="nav-list"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </button>
        <ul
          className={`nav-list${menuOpen ? ' open' : ''}`}
          id="nav-list"
          style={{
            background: darkMode
              ? 'linear-gradient(90deg, #232b36 60%, #14b8a6 100%)'
              : 'linear-gradient(90deg, #e0f7fa 60%, #b2dfdb 100%)',
            boxShadow: darkMode
              ? '0 2px 16px #00fff022'
              : '0 2px 16px #00bfae11',
            borderRadius: '0 0 18px 18px',
            border: darkMode ? '1.5px solid #00fff0' : '1.5px solid #00bfae',
            color: darkMode ? '#00fff0' : '#00bfae',
          }}
        >
          <li><a href="#hero" onClick={handleNavClick}>Home</a></li>
          <li><a href="#about" onClick={handleNavClick}>About</a></li>
          <li><a href="#skills" onClick={handleNavClick}>Skills</a></li>
          <li><a href="#projects" onClick={handleNavClick}>Projects</a></li>
          <li><a href="#contact" onClick={handleNavClick}>Contact</a></li>
        </ul>
        <button
          className="dark-toggle-btn"
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
      <main className="main-content">
        <Section className="hero-section">
          <Hero />
        </Section>
        <Section className="about-section skills-outer-container" id="about">
          <About />
        </Section>
        <Section className="skills-outer-container" id="skills">
          <Skills />
        </Section>
        <Section className="projects-container" id="projects">
          <Projects />
        </Section>
        <Section className="contact-outer-container skills-outer-container projects-container" id="contact">
          <Contact />
        </Section>
      </main>
      <Footer />
      {showWelcome && (
        <div className="welcome-popup-outer">
          <div className="welcome-popup-center">
            <div className="welcome-popup-box">
              <button className="welcome-popup-close" onClick={() => setShowWelcome(false)} aria-label="Close welcome popup" style={{position: 'absolute', top: 18, right: 22, fontSize: '2rem', background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', zIndex: 10, opacity: 0.7, transition: 'opacity 0.18s'}} onMouseOver={e => e.currentTarget.style.opacity = 1} onMouseOut={e => e.currentTarget.style.opacity = 0.7}>&times;</button>
              <div className="welcome-popup-icon" style={{marginBottom: '0.7rem'}}>
                <span role="img" aria-label="Waving Hand" style={{fontSize: '2.5rem'}}>👋</span>
              </div>
              <h2>Welcome to Saudeep Adhikari's Portfolio!</h2>
              <p>
                Explore my work, skills, and projects. Enjoy the modern design, animations, and dark/light mode!<br/><br/>
                <b>Tip:</b> Use the toggle above to switch themes.
              </p>
            </div>
          </div>
        </div>
      )}
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
