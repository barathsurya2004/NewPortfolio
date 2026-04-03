import React from 'react';
import SectionLabel from '../../UI/SectionLabel';
import './Process.css';

const Process: React.FC = () => {
  const steps = [
    {
      n: '01',
      h: 'Listen & Explore',
      d: 'Every great build starts with understanding the problem deeply — the users, the goals, and the constraints — before writing a single line of code.',
      delay: ''
    },
    {
      n: '02',
      h: 'Design & Prototype',
      d: 'Ideas become tangible fast. I move between Figma and code freely, iterating until the experience feels just right — not just looks right.',
      delay: 'd1'
    },
    {
      n: '03',
      h: 'Build & Refine',
      d: 'Clean, performant, accessible code with real attention to motion and micro-details. The difference between good and great lives in the finishing.',
      delay: 'd2'
    }
  ];

  return (
    <div style={{ padding: '0 1.5rem', marginBottom: '7rem' }}>
      <div className="process-wrap">
        <SectionLabel number="03" />
        <h2 className="sec-head rv" style={{ marginBottom: 0 }}>How I <em>work</em></h2>
        <div className="pgrid">
          {steps.map((s, i) => (
            <div key={i} className={`pstep rv ${s.delay}`}>
              <div className="pstep-n">{s.n}</div>
              <h3 className="pstep-h">{s.h}</h3>
              <p className="pstep-d">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Process;
