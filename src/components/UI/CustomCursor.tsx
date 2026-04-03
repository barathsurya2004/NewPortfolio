import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './CustomCursor.css';

const CustomCursor: React.FC = () => {
  const curRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  
  const mousePos = useRef({ x: 0, y: 0 });

  useGSAP(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      // Dot moves instantly
      gsap.set(curRef.current, {
        x: e.clientX,
        y: e.clientY
      });
    };

    const handleMouseEnter = () => document.body.classList.add('hov');
    const handleMouseLeave = () => document.body.classList.remove('hov');

    window.addEventListener('mousemove', handleMouseMove);
    
    const hoverables = document.querySelectorAll('a, button, .wcard, .tag');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Ring follows with lag using GSAP ticker
    const xTo = gsap.quickTo(ringRef.current, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(ringRef.current, "y", { duration: 0.4, ease: "power3" });

    gsap.ticker.add(() => {
      xTo(mousePos.current.x);
      yTo(mousePos.current.y);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      hoverables.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div id="cur" ref={curRef}></div>
      <div id="cur-ring" ref={ringRef}></div>
    </>
  );
};

export default CustomCursor;
