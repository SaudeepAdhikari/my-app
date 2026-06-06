import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

jest.mock('react-markdown', () => ({
  __esModule: true,
  default: ({ children }) => <div>{children}</div>,
}));

const portfolioData = {
  personalInfo: {
    name: 'Saudeep Adhikari',
    shortName: 'Saudeep',
    title: 'Full Stack Web Developer & Designer',
    tagline: 'Crafting digital experiences that blend creativity with functionality.',
    location: 'Nepal',
    profileImage: '/assets/profile.jpg',
    resumePath: '/Saudeep_Adhikari_Resume_v3.pdf',
    resumeLastUpdated: 'PDF Format',
    email: 'saudeepadhikari543@gmail.com',
    availability: {
      isAvailable: true,
      statusText: 'Available for Work',
      statusSubtext: 'Open to opportunities',
    },
    bio: [
      'Short bio paragraph one.',
      'Short bio paragraph two.',
    ],
    emailjs: {
      serviceId: 'service_id',
      templateId: 'template_id',
      publicKey: 'public_key',
    },
  },
  socialLinks: [
    { name: 'GitHub', url: 'https://github.com/saudeepadhikari', icon: 'github' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/saudeep-adhikari-b558aa2a8/', icon: 'linkedin' },
  ],
  typewriterSequences: ['Creative Problem Solver'],
  aboutStats: [
    { value: '1.5+', label: 'Years Experience' },
    { value: '7+', label: 'Projects Completed' },
  ],
  skills: [
    { name: 'React', icon: 'react', color: '#61dafb' },
    { name: 'Node.js', icon: 'node', color: '#68a063' },
  ],
  skillCategories: [
    { name: 'Frontend', items: ['React', 'Tailwind CSS'] },
  ],
  services: [
    { id: 1, icon: '🌐', title: 'Web Development', description: 'Build responsive web apps.', features: ['Responsive design'] },
  ],
  projects: [
    { title: 'Sample Project', description: 'A sample project.', tags: ['React'], image: '/assets/profile.jpg', liveLink: 'https://example.com' },
  ],
  workExperience: [
    { period: '2024', role: 'Developer', company: 'Company', description: 'Did work.' },
  ],
  education: [
    { period: '2023', degree: 'Degree', school: 'School', description: 'Studied things.' },
  ],
  certifications: [
    { date: '2024', title: 'Certification', issuer: 'Issuer', link: 'https://example.com' },
  ],
  blogPosts: [
    { id: 1, date: '2024-01-01', title: 'Post', summary: 'Summary', tags: ['React'], content: 'Content' },
  ],
};

describe('App', () => {
  const originalFetch = global.fetch;
  const originalIntersectionObserver = global.IntersectionObserver;

  beforeAll(() => {
    global.IntersectionObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  });

  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => portfolioData,
    });
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  afterAll(() => {
    global.IntersectionObserver = originalIntersectionObserver;
  });

  test('renders the portfolio hero after loading data', async () => {
    render(<App />);

    expect(await screen.findByRole('heading', { name: /hi, i'm/i })).toBeInTheDocument();
  });
});
