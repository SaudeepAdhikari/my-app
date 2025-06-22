import React from 'react';
import './App.css';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaPhp, FaDatabase, FaGitAlt, FaFigma, FaBootstrap, FaPython } from 'react-icons/fa';
import { SiMongodb, SiTailwindcss, SiCplusplus } from 'react-icons/si';

const skills = [
  { name: 'HTML5', icon: <FaHtml5 />, color: '#e44d26' },
  { name: 'CSS3', icon: <FaCss3Alt />, color: '#1572b6' },
  { name: 'JavaScript', icon: <FaJs />, color: '#f7df1e' },
  { name: 'React', icon: <FaReact />, color: '#61dafb' },
  { name: 'Node.js', icon: <FaNodeJs />, color: '#3c873a' },
  { name: 'PHP', icon: <FaPhp />, color: '#777bb4' },
  { name: 'MySQL', icon: <FaDatabase />, color: '#00758f' },
  { name: 'MongoDB', icon: <SiMongodb />, color: '#47a248' },
  { name: 'Git', icon: <FaGitAlt />, color: '#f34f29' },
  { name: 'Figma', icon: <FaFigma />, color: '#a259ff' },
  { name: 'Bootstrap', icon: <FaBootstrap />, color: '#563d7c' },
  { name: 'Tailwind CSS', icon: <SiTailwindcss />, color: '#38bdf8' },
  { name: 'Python', icon: <FaPython />, color: '#3776ab' },
  { name: 'C++', icon: <SiCplusplus />, color: '#00599c' },
];

function Skills() {
  return (
    <>
      <h2 className="section-title">My Skills</h2>
      <div className="skills-grid-responsive">
        {skills.map((skill, idx) => (
          <div
            className="skill-card-responsive"
            key={skill.name}
            style={{ borderColor: skill.color, boxShadow: `0 4px 24px ${skill.color}33` }}
            tabIndex={0}
          >
            <span className="skill-icon" style={{ color: skill.color, fontSize: '2.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{skill.icon}</span>
            <span className="skill-name">{skill.name}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default Skills;