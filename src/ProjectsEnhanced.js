import React from 'react';

const projects = [
  {
    title: 'Portfolio Website',
    description: 'A modern, responsive portfolio website built with React, custom CSS, and EmailJS integration for contact.',
    image: '/Logo.png',
    video: '', // Add a GIF or MP4 if available
    link: 'https://github.com/SaudeepAdhikari/Website',
    tags: ['React', 'CSS', 'EmailJS']
  },
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform with product management, cart, and payment integration.',
    image: '/ecommerse.jpg',
    video: '',
    link: 'https://github.com/SaudeepAdhikari/E-commerce',
    tags: ['React', 'Node.js', 'MongoDB']
  },
  {
    title: 'Parking Management System',
    description: 'A web application for managing parking spaces, bookings, and payments with real-time availability.',
    image: '/Parkinglogo.png',
    video: '',
    link: 'https://github.com/SaudeepAdhikari/Parking-system',
    tags: ['HTML', 'CSS', 'JS']
  },
  {
    title: 'Weather App',
    description: 'A weather application that provides real-time weather updates using OpenWeatherMap API.',
    image: '/weather.jpeg',
    video: '',
    link: 'https://github.com/SaudeepAdhikari/Weather-App',
    tags: ['React', 'API', 'CSS']
  }
];

function ProjectsEnhanced() {
  // No filters: always show all projects
  const filteredProjects = projects;

  // Split projects into rows of 2
  const rows = [];
  for (let i = 0; i < filteredProjects.length; i += 2) {
    rows.push(filteredProjects.slice(i, i + 2));
  }

  return (
    <section className="projects-section-enhanced" id="projects">
      <h2 className="section-title">My Projects</h2>
  {/* filters removed by request */}
      <div className="projects-rows">
        {rows.map((row, rowIdx) => (
          <div className="projects-row" key={rowIdx}>
            {row.map((project, idx) => (
              <div className="project-card" key={project.title} data-aos="fade-up">
                <div className="project-image-wrap">
                  {project.video ? (
                    <video src={project.video} className="project-video" controls poster={project.image} />
                  ) : (
                    <img src={project.image} alt={project.title + ' screenshot'} className="project-image" loading="lazy" />
                  )}
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <span className="project-tag" key={i}>{tag}</span>
                  ))}
                </div>
                <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer">View Code</a>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProjectsEnhanced;
