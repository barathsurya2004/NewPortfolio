import React, { useState, useRef } from 'react';
import SectionLabel from '../../UI/SectionLabel';
import WorkCard from './WorkCard';
import ProjectModal from './ProjectModal';
import './Work.css';

interface Project {
  type: string;
  name: string;
  year: string;
  imgClass: string;
  delay?: string;
}

const Work: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [originalCardRef, setOriginalCardRef] = useState<React.RefObject<HTMLAnchorElement> | null>(null);

  const projects: Project[] = [
    {
      type: 'Internal Tools · Debugging',
      name: 'Uber AI Solutions',
      year: '2025',
      imgClass: 'c-sage',
      delay: ''
    },
    {
      type: 'Mobile App · Full-Stack',
      name: 'AI-Powered Expense Tracker',
      year: '2025',
      imgClass: 'c-rose',
      delay: 'd1'
    },
    {
      type: 'Web App · 3D/GSAP',
      name: 'Culinary Heritage of Tamil Nadu',
      year: '2024',
      imgClass: 'c-warm',
      delay: 'd2'
    }
  ];

  const handleCardClick = (project: Project, ref: React.RefObject<HTMLAnchorElement>) => {
    setOriginalCardRef(ref);
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setOriginalCardRef(null);
  };

  return (
    <section className="sec" id="work">
      <SectionLabel number="01" />
      <h2 className="sec-head rv">Selected <em>Work</em></h2>

      <div className="wgrid">
        {projects.map((p, i) => (
          <WorkCard key={i} {...p} onClick={(ref) => handleCardClick(p, ref)} />
        ))}
      </div>

      <ProjectModal 
        project={selectedProject} 
        onClose={handleCloseModal} 
        originalCardRef={originalCardRef || { current: null }} 
      />
    </section>
  );
};

export default Work;
