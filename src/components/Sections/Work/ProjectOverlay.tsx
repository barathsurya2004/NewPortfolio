import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ProjectData } from './Work';
import './ProjectOverlay.css';

interface ProjectOverlayProps {
  projects: ProjectData[];
  activeIdx: number | null;
  clickPos: { x: number; y: number };
  onClose: () => void;
}

const ProjectOverlay: React.FC<ProjectOverlayProps> = ({ projects, activeIdx, clickPos, onClose }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(false);
  
  const overlayRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const floodRef = useRef<HTMLDivElement>(null);
  const blurLayerRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  
  const isAnimating = useRef(false);

  useEffect(() => {
    if (activeIdx !== null) {
      setCurrentIdx(activeIdx);
      setIsVisible(true);
      document.body.classList.add('overlay-open');
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
        document.body.classList.remove('overlay-open');
      }, 1200); // Increased buffer for exit animation
      return () => clearTimeout(timer);
    }
  }, [activeIdx]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIdx === null) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') switchProject(1);
      if (e.key === 'ArrowLeft') switchProject(-1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIdx, currentIdx]);

  useGSAP(() => {
    // Crucial check: only animate if we have valid refs and are in a transition state
    if (!overlayRef.current || !rippleRef.current || !floodRef.current || !blurLayerRef.current || !splitRef.current) return;

    if (activeIdx !== null) {
      const tl = gsap.timeline();

      gsap.set(overlayRef.current, {
        '--ox': `${clickPos.x}px`,
        '--oy': `${clickPos.y}px`
      } as any);

      tl.fromTo(rippleRef.current, 
        { scale: 0, opacity: 1 }, 
        { scale: 15, opacity: 0, duration: 0.6, ease: "power2.out" }
      );

      tl.to([floodRef.current, blurLayerRef.current], {
        clipPath: 'circle(150% at var(--ox) var(--oy))',
        duration: 1.1,
        ease: "power3.inOut",
        stagger: 0.05
      }, "-=0.4");

      tl.to(splitRef.current, {
        opacity: 1,
        duration: 0.5
      }, "-=0.3");

      const items = gsap.utils.toArray('.stagger-item', overlayRef.current);
      if (items.length > 0) {
        tl.fromTo(items, 
          { opacity: 0, x: 30 }, 
          { opacity: 1, x: 0, duration: 0.6, stagger: 0.08, ease: "power2.out" }
        );
      }
    } else if (isVisible) {
      // Exit animations
      const tl = gsap.timeline();
      tl.to(splitRef.current, { opacity: 0, duration: 0.4 });
      tl.to([floodRef.current, blurLayerRef.current], {
        clipPath: 'circle(0% at var(--ox) var(--oy))',
        duration: 0.8,
        ease: "power3.inOut"
      }, "-=0.2");
    }
  }, { dependencies: [activeIdx], scope: overlayRef });

  const switchProject = (dir: number) => {
    if (isAnimating.current || !splitRef.current || !overlayRef.current) return;
    isAnimating.current = true;

    const nextIdx = (currentIdx + dir + projects.length) % projects.length;

    gsap.to(splitRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setCurrentIdx(nextIdx);
        
        // Use a small timeout to ensure React has rendered the new content
        setTimeout(() => {
          if (!splitRef.current) return;
          
          gsap.to(splitRef.current, {
            opacity: 1,
            duration: 0.3,
            onComplete: () => {
              isAnimating.current = false;
            }
          });
          
          const items = gsap.utils.toArray('.stagger-item', overlayRef.current);
          if (items.length > 0) {
            gsap.fromTo(items, 
              { opacity: 0, x: 30 }, 
              { opacity: 1, x: 0, duration: 0.6, stagger: 0.08, ease: "power2.out" }
            );
          }
        }, 10);
      }
    });
  };

  if (!isVisible && activeIdx === null) return null;

  const data = projects[currentIdx];

  return (
    <div ref={overlayRef} className={`prj-overlay ${activeIdx !== null ? 'active' : ''}`}>
      <div className="prj-ripple" ref={rippleRef}></div>
      <div className="prj-flood" ref={floodRef} style={{ backgroundColor: data.color }}></div>
      <div className="prj-blur-layer" ref={blurLayerRef}></div>
      
      <div className="prj-split" ref={splitRef}>
        <div className="prj-left">
          <div className="prj-ghost">{data.name}</div>
          <div className="prj-left-content">
            <div className="prj-l-type">{data.type}</div>
            <div className="prj-l-title">{data.name}</div>
          </div>
          <div className="prj-nav">
            <button onClick={() => switchProject(-1)}>←</button>
            <button onClick={() => switchProject(1)}>→</button>
          </div>
        </div>

        <div className="prj-right">
          <div className="prj-accent-line" style={{ backgroundColor: data.color }}></div>
          <button className="prj-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
          
          <div className="prj-content-inner" ref={detailsRef}>
            <div className="stagger-item prj-r-label">{data.type}</div>
            <h2 className="stagger-item prj-r-title">{data.name}</h2>
            <div className="stagger-item prj-r-subtitle">{data.subtitle}</div>
            <div className="stagger-item prj-divider"></div>
            <p className="stagger-item prj-r-desc">{data.desc}</p>
            
            <div className="stagger-item prj-pills">
              {data.stack.map((s, i) => (
                <span key={i} className="prj-pill">{s}</span>
              ))}
            </div>
            
            <div className="stagger-item prj-metrics">
              {data.metrics.map((m, i) => (
                <div key={i}>
                  <div className="prj-metric-val">{m.val}</div>
                  <div className="prj-metric-lbl">{m.lbl}</div>
                </div>
              ))}
            </div>
            
            <div className="stagger-item prj-role" dangerouslySetInnerHTML={{ __html: data.role }}></div>
            <div className="stagger-item prj-links">
              <a href="#" className="btn-pill" style={{ background: 'var(--text)', color: 'var(--bg)' }}>View Project</a>
              <a href="#" className="btn-ghost">GitHub Repo</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverlay;
