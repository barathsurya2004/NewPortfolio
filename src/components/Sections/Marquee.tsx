import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './Marquee.css';

const Marquee: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const items = [
    'Golang', 'Java', 'gRPC', 'PostgreSQL', 'React Native', 
    'Three.js', 'Blender', 'TypeScript', 'Python', 'GSAP'
  ];

  useGSAP(() => {
    if (!trackRef.current) return;

    const track = trackRef.current;
    
    // Total width of one set of items
    const trackWidth = track.scrollWidth / 2;

    gsap.to(track, {
      x: -trackWidth,
      duration: 28,
      ease: 'none',
      repeat: -1
    });
  }, { scope: trackRef });

  return (
    <div className="marquee">
      <div className="m-track" ref={trackRef}>
        {[...items, ...items].map((item, i) => (
          <div key={i} className="m-item">
            {item} <span className="m-sep"></span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
