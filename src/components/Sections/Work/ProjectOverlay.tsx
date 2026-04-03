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
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  
  const isAnimating = useRef(false);

  useEffect(() => {
    if (activeIdx !== null) {
      setCurrentIdx(activeIdx);
      setIsVisible(true);
      document.body.classList.add('overlay-open');
    }
  }, [activeIdx]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIdx === null || isAnimating.current) return;
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') switchProject(1);
      if (e.key === 'ArrowLeft') switchProject(-1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIdx, currentIdx]);

  useGSAP(() => {
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
    }
  }, { dependencies: [activeIdx], scope: overlayRef });

  const handleClose = () => {
    if (isAnimating.current || !overlayRef.current || !closeBtnRef.current || !splitRef.current || !floodRef.current || !blurLayerRef.current) return;
    isAnimating.current = true;

    // 1. Get Close Button Center
    const rect = closeBtnRef.current.getBoundingClientRect();
    const closeX = rect.left + (rect.width / 2);
    const closeY = rect.top + (rect.height / 2);

    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        document.body.classList.remove('overlay-open');
        isAnimating.current = false;
        onClose();
      }
    });

    // 2. Fade out text
    tl.to(splitRef.current, { 
      opacity: 0, 
      duration: 0.4, 
      ease: "power2.in" 
    });

    // 3. Move origin to Close Button (Invisible to user as circle is 150%)
    tl.add(() => {
      gsap.set(overlayRef.current, {
        '--ox': `${closeX}px`,
        '--oy': `${closeY}px`
      } as any);
    });

    // 4. "Suck" back into the button
    tl.to([floodRef.current, blurLayerRef.current], {
      clipPath: 'circle(0% at var(--ox) var(--oy))',
      duration: 0.9,
      ease: "power3.inOut",
      stagger: 0.05
    }, "-=0.1");
  };

  const switchProject = (dir: number) => {
    if (isAnimating.current || !splitRef.current || !overlayRef.current) return;
    isAnimating.current = true;

    const nextIdx = (currentIdx + dir + projects.length) % projects.length;

    gsap.to(splitRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setCurrentIdx(nextIdx);
        
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
          <button className="prj-close" ref={closeBtnRef} onClick={handleClose}>
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
