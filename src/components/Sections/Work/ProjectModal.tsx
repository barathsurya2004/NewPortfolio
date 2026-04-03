import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import ProjectModelCanvas from './ProjectModelCanvas';
import './ProjectModal.css';

gsap.registerPlugin(Flip);

interface Project {
  type: string;
  name: string;
  year: string;
  imgClass: string;
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  originalCardRef: React.RefObject<HTMLAnchorElement>;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, originalCardRef }) => {
  const modalContentRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (project && originalCardRef.current && modalContentRef.current) {
      // 1. Capture original card state
      const state = Flip.getState(originalCardRef.current);
      
      // 2. We need to make the modal visible before we can "flip" into it
      // For GSAP Flip to work between two different elements, we can use targets
      
      gsap.to(backdropRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out'
      });

      Flip.from(state, {
        targets: modalContentRef.current,
        duration: 0.8,
        ease: 'power4.inOut',
        scale: true,
        absolute: true,
        onComplete: () => {
          gsap.to('.modal-details', { opacity: 1, y: 0, stagger: 0.1 });
        }
      });
    }
  }, [project, originalCardRef]);

  const handleClose = () => {
    if (originalCardRef.current && modalContentRef.current) {
      const state = Flip.getState(modalContentRef.current);
      
      gsap.to('.modal-details', { opacity: 0, y: 20, duration: 0.3 });
      gsap.to(backdropRef.current, { opacity: 0, duration: 0.5, delay: 0.2 });

      Flip.from(state, {
        targets: originalCardRef.current,
        duration: 0.8,
        ease: 'power4.inOut',
        scale: true,
        absolute: true,
        onComplete: onClose
      });
    } else {
      onClose();
    }
  };

  if (!project) return null;

  return (
    <div className="modal-root">
      <div className="modal-backdrop" ref={backdropRef} onClick={handleClose}></div>
      <div className="modal-content" ref={modalContentRef}>
        <button className="modal-close" onClick={handleClose}>×</button>
        <div className={`modal-header-img ${project.imgClass}`}></div>
        <div className="modal-body">
          <div className="modal-details" style={{ opacity: 0, transform: 'translateY(20px)' }}>
            <span className="modal-type">{project.type}</span>
            <h2 className="modal-name">{project.name}</h2>
            <span className="modal-year">{project.year}</span>
            <p className="modal-desc">
              Detailed view of the {project.name} project. This is where more context would go.
              Below is a 3D representation of the core concept.
            </p>
            <ProjectModelCanvas />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
