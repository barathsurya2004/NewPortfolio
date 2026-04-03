import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './WorkCard.css';

interface WorkCardProps {
  type: string;
  name: string;
  year: string;
  imgClass: string;
  delay?: string;
  onClick: (e: React.MouseEvent) => void;
}

const WorkCard: React.FC<WorkCardProps> = ({ type, name, year, imgClass, delay, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      
      gsap.to(card, {
        rotateX: -y * 5,
        rotateY: x * 5,
        y: -5,
        duration: 0.45,
        ease: 'power3.out',
        overwrite: 'auto'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        y: 0,
        duration: 0.45,
        ease: 'power3.out',
        overwrite: 'auto'
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, { scope: cardRef });

  return (
    <div 
      className={`wcard rv ${delay || ''}`} 
      ref={cardRef}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="wcard-img">
        <div className={`wcard-img-fill ${imgClass}`}></div>
      </div>
      <div className="wcard-body">
        <div>
          <div className="wcard-type">{type}</div>
          <div className="wcard-name">{name}</div>
        </div>
        <div className="wcard-meta">
          <span className="wcard-yr">{year}</span>
          <div className="wcard-arr">→</div>
        </div>
      </div>
    </div>
  );
};

export default WorkCard;
