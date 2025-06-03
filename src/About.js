import React from 'react';

function About() {
  return (
    <div className="about-section">
      <h2 className="section-title">About Me</h2>
      <div className="about-content about-content-enhanced">
        <div className="about-profile-row">
          <img src="/profile.jpg" alt="Saudeep Adhikari" className="about-profile-img" loading="lazy" />
          <div className="about-bio">
            <blockquote className="about-quote">
              "Turning ideas into beautiful, functional web experiences."
            </blockquote>
            <p>Hello! I'm <b>Saudeep Adhikari</b>, a passionate Full Stack Web Developer & Designer based in Nepal. I love building modern, responsive, and user-friendly web applications that solve real-world problems.</p>
            <p>I have hands-on experience with <b>React</b>, <b>JavaScript</b>, <b>Node.js</b>, <b>Express</b>, <b>MongoDB</b>, <b>HTML</b>, <b>CSS</b>, and <b>UI/UX design</b>. My focus is on writing clean, maintainable code and delivering high-quality digital experiences.</p>
            <p>When I'm not coding, I enjoy exploring new technologies, reading tech blogs, and collaborating with other developers. I'm always eager to learn and take on new challenges!</p>
            <div className="about-signature-row">
              <span className="about-signature">Saudeep Adhikari</span>
              <span className="about-signature-title">Full Stack Developer</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;