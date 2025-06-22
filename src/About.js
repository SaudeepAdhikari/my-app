import React from 'react';
import { motion } from 'framer-motion';

function About() {
  return (
    <>
      <h2 className="section-title">About Me</h2>
      <div className="about-content about-content-enhanced">
        <motion.div
          className="about-profile-row"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="about-image-container">
            <img src="/profile.jpg" alt="Saudeep Adhikari" className="about-profile-img" loading="lazy" />
            <div className="about-image-glow"></div>
          </div>

          <motion.div
            className="about-bio"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.blockquote
              className="about-quote"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              "Turning ideas into beautiful, functional web experiences."
            </motion.blockquote>

            <div className="about-text-content">
              <p>
                Hello! I'm <span className="highlight-text">Saudeep Adhikari</span>, a passionate Full Stack Web Developer & Designer based in Nepal.
                I love building modern, responsive, and user-friendly web applications that solve real-world problems.
              </p>

              <p>
                I have hands-on experience with <span className="tech-highlight">React</span>, <span className="tech-highlight">JavaScript</span>,
                <span className="tech-highlight">Node.js</span>, <span className="tech-highlight">Express</span>, <span className="tech-highlight">MongoDB</span>,
                <span className="tech-highlight">HTML</span>, <span className="tech-highlight">CSS</span>, and <span className="tech-highlight">UI/UX design</span>.
                My focus is on writing clean, maintainable code and delivering high-quality digital experiences.
              </p>

              <p>
                When I'm not coding, I enjoy exploring new technologies, reading tech blogs, and collaborating with other developers.
                I'm always eager to learn and take on new challenges!
              </p>
            </div>

            <motion.div
              className="about-signature-row"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="signature-container">
                <span className="about-signature">Saudeep Adhikari</span>
                <span className="about-signature-title">Full Stack Developer</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="about-stats"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">1+</div>
              <div className="stat-label">Year Experience</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5+</div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10+</div>
              <div className="stat-label">Technologies</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Passionate</div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default About;