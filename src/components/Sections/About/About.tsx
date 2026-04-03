import React from 'react';
import SectionLabel from '../../UI/SectionLabel';
import AboutSlider from './AboutSlider';
import './About.css';

const About: React.FC = () => {
  const skills = [
    { name: 'TypeScript', hi: true },
    { name: 'Python', hi: true },
    { name: 'Java', hi: true },
    { name: 'Golang', hi: true },
    { name: 'React Native', hi: true },
    { name: 'ReactJS', hi: true },
    { name: 'gRPC' },
    { name: 'PostgreSQL' },
    { name: 'GSAP' },
    { name: 'Three.js' },
    { name: 'Blender' }
  ];

  const stats = [
    { n: 'IIT H', l: 'EE \'26' },
    { n: 'Uber AI', l: 'Intern' },
    { n: 'JLPT N4', l: 'Japanese Proficiency' }
  ];

  return (
    <section className="sec" id="about">
      <SectionLabel number="02" />
      <h2 className="sec-head rv">A bit about <em>me</em></h2>

      <div className="about-inner">
        <div className="rv">
          <AboutSlider />
          <div className="about-details-tag" style={{ marginTop: '1.5rem' }}>
            <strong>Barath Surya M.</strong>
            <span style={{ fontSize: '.75rem', color: 'var(--muted)' }}>Software Engineer & Electrical Student</span>
          </div>
        </div>

        <div>
          <p className="about-bio rv">
            I'm a <strong>software engineer</strong> and Electrical Engineering student at IIT Hyderabad who genuinely cares about the craft — from high-performance backends to fluid user interfaces.
          </p>
          <p className="about-bio rv d1">
            Recently interned at <strong>Uber AI</strong>, where I worked on internal tools and debugging systems. Beyond code, I'm passionate about Japanese Language & Culture (JLPT N4) and exploring 3D worlds with Blender.
          </p>

          <div className="tags rv d2">
            {skills.map((s, i) => (
              <span key={i} className={`tag ${s.hi ? 'hi' : ''}`}>{s.name}</span>
            ))}
          </div>

          <div className="stats rv d3">
            {stats.map((s, i) => (
              <div key={i}>
                <span className="stat-n">{s.n}</span>
                <span className="stat-l">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
