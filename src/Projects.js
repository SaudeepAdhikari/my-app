import React from 'react';
import './App.css';

const projects = [
  {
    title: 'Portfolio Website',
    description: 'A modern, responsive portfolio website built with React, custom CSS, and EmailJS integration for contact.',
    image: '/Logo.png',
    link: 'https://github.com/SaudeepAdhikari/Website',
    tags: ['React', 'CSS', 'EmailJS']
  },
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform with product management, cart, and payment integration.',
    image: '/ecommerse.jpg',
    link: 'https://github.com/saudeepadhikari/ecommerce',
    tags: ['React', 'Node.js', 'MongoDB']
  },
  {
    title: 'Parking Management System',
    description: 'A web application for managing parking spaces, bookings, and payments with real-time availability.',
    image: '/Parkinglogo.png',
    link: 'https://github.com/SaudeepAdhikari/Parking-system',
    tags: ['HTML', 'CSS', 'JS']
  },
  {
    title: 'Weather App',
    description: 'A weather application that provides real-time weather updates using OpenWeatherMap API.',
    image: '/weather.jpeg',
    link: 'https://github.com/SaudeepAdhikari/Weather-App',
    tags: ['React', 'API', 'CSS']
  }
];

// Animated illustration for empty state
// const EmptySection = ({ message, animationData }) => (
//   <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem 0' }}>
//     <Suspense fallback={<div style={{height:220}} />}> {/* fallback for Lottie */}
//       <Lottie animationData={animationData} style={{ width: 220, height: 220 }} loop={true} />
//     </Suspense>
//     <p style={{ marginTop: '1.2rem', color: 'var(--color-primary)', fontWeight: 700, fontSize: '1.1rem' }}>{message}</p>
//   </div>
// );

function Projects() {
  // Split projects into rows of 2
  const rows = [];
  for (let i = 0; i < projects.length; i += 2) {
    rows.push(projects.slice(i, i + 2));
  }

  return (
    <div className="projects-container">
      <h2 className="section-title">My Projects</h2>
      <div className="projects-rows">
        {rows.map((row, rowIdx) => (
          <div className="projects-row" key={rowIdx}>
            {row.map((project, idx) => (
              <div className="project-card" key={project.title}>
                <div className="project-image-wrap">
                  <img src={project.image} alt={project.title + ' screenshot'} className="project-image" loading="lazy" />
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
    </div>
  );
}

export default Projects;