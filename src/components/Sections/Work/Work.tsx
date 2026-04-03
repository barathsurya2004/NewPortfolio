import React, { useState } from 'react';
import SectionLabel from '../../UI/SectionLabel';
import WorkCard from './WorkCard';
import ProjectOverlay from './ProjectOverlay';
import './Work.css';

export interface ProjectData {
  color: string;
  type: string;
  name: string;
  subtitle: string;
  desc: string;
  stack: string[];
  metrics: { val: string; lbl: string }[];
  role: string;
  imgClass: string;
}

const projects: ProjectData[] = [
  {
    color: '#8DAD85', // Sage
    type: 'Mobile App · Full-Stack',
    name: 'AI Expense Tracker',
    subtitle: 'Automated receipt parsing via multi-modal LLMs',
    desc: 'Developed a full-stack mobile application that leverages a multi-modal LLM API to automatically transcribe and categorize expenses from receipt photos. Engineered a robust backend using Golang and implemented a gRPC API for efficient, high-performance communication.',
    stack: ['Golang', 'React Native', 'gRPC', 'PostgreSQL'],
    metrics: [{ val: 'Real-time', lbl: 'Analytics' }, { val: '100%', lbl: 'Receipt Parsing' }],
    role: 'Role: Full-Stack Developer<br>Timeline: August 2025',
    imgClass: 'c-sage'
  },
  {
    color: '#C4A098', // Rose
    type: 'Web App · 3D/GSAP',
    name: 'Tamil Nadu Culinary',
    subtitle: 'Interactive 3D exploration of regional cuisines',
    desc: 'Developed a dynamic front-end application using ReactJS to visually differentiate between unique Tamil Nadu cuisines. Leveraged GSAP to create complex animations and integrated 3D models using Three.js and Blender, providing an immersive user experience.',
    stack: ['ReactJS', 'Three.js', 'GSAP', 'Blender'],
    metrics: [{ val: '2', lbl: 'Distinct Cuisines' }, { val: '60fps', lbl: '3D Performance' }],
    role: 'Role: Frontend/Creative Dev<br>Timeline: July - Dec 2024',
    imgClass: 'c-rose'
  },
  {
    color: '#C8B49A', // Warm
    type: 'Internal Tools · Debugging',
    name: 'Uber AI Solutions',
    subtitle: 'Streamlined developer workflows and bug resolution',
    desc: 'Engineered a new debugging tool that improved bug identification and resolution time for user-reported issues. Collaborated with a cross-functional team to gather requirements, design features, and deploy solutions that directly improved team efficiency.',
    stack: ['Python', 'React', 'Internal APIs'],
    metrics: [{ val: '80%', lbl: 'Faster Resolution' }, { val: 'Measurable', lbl: 'Effort Reduction' }],
    role: 'Role: Software Engineering Intern<br>Timeline: May - July 2025',
    imgClass: 'c-warm'
  }
];

const Work: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState<number | null>(null);
  const [clickPos, setClickPos] = useState({ x: 0, y: 0 });

  const handleCardClick = (idx: number, e: React.MouseEvent) => {
    setClickPos({ x: e.clientX, y: e.clientY });
    setCurrentIdx(idx);
  };

  const handleClose = () => {
    setCurrentIdx(null);
  };

  return (
    <section className="sec" id="work">
      <SectionLabel number="01" />
      <h2 className="sec-head rv">Selected <em>Work</em></h2>

      <div className="wgrid">
        {projects.map((p, i) => (
          <div key={i} className="card-slot">
            <WorkCard 
              type={p.type}
              name={p.name}
              year={p.role.split('Timeline: ')[1]?.split(' ')[1] || '2025'}
              imgClass={p.imgClass}
              onClick={(e) => handleCardClick(i, e)}
            />
          </div>
        ))}
      </div>

      <ProjectOverlay 
        projects={projects}
        activeIdx={currentIdx}
        clickPos={clickPos}
        onClose={handleClose}
      />
    </section>
  );
};

export default Work;
