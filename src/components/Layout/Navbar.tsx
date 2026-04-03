import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useGSAP(() => {
    // Pulse animation for availability dot
    gsap.to(dotRef.current, {
      opacity: 0.35,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }, { scope: navRef });

  return (
    <nav id="nav" ref={navRef} className={scrolled ? 'scrolled' : ''}>
      <a href="#" className="nav-logo">B ✦ S</a>
      <ul className="nav-links">
        <li><a href="#work">Work</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Say hi</a></li>
      </ul>
      <div className="nav-avail">
        <span className="avail-dot" ref={dotRef}></span>
        Open to work
      </div>
    </nav>
  );
};

export default Navbar;
