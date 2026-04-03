import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import './AboutSlider.css';

const AboutSlider: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(50); // 0 to 100
  const isDragging = useRef(false);

  // Three.js Scene Setup
  useEffect(() => {
    if (!canvasRef.current) return;

    const width = canvasRef.current.clientWidth;
    const height = canvasRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    canvasRef.current.appendChild(renderer.domElement);

    // Abstract Avatar (Torus Knot)
    const geometry = new THREE.TorusKnotGeometry(0.6, 0.2, 100, 16);
    const material = new THREE.MeshStandardMaterial({ 
      color: 0x8dad85, 
      metalness: 0.7, 
      roughness: 0.2 
    });
    const avatar = new THREE.Mesh(geometry, material);
    scene.add(avatar);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const animate = () => {
      avatar.rotation.x += 0.01;
      avatar.rotation.y += 0.015;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      if (!canvasRef.current) return;
      const w = canvasRef.current.clientWidth;
      const h = canvasRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvasRef.current?.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  // Slider Logic
  const handleMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const pos = ((x - rect.left) / rect.width) * 100;
    
    setSliderPos(Math.min(Math.max(pos, 0), 100));
  };

  useEffect(() => {
    const up = () => (isDragging.current = false);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', up);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', up);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', up);
    };
  }, []);

  return (
    <div className="slider-container" ref={containerRef}>
      {/* Layer A: Photo (Bottom) */}
      <div className="layer layer-photo">
        <img src="https://via.placeholder.com/600x800?text=Photo+of+Barath" alt="Barath Surya" />
      </div>

      {/* Layer B: 3D Canvas (Top) */}
      <div 
        className="layer layer-canvas" 
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        ref={canvasRef}
      >
        <div className="about-tagline">✦ Interactive Avatar</div>
      </div>

      {/* Slider Handle */}
      <div 
        className="slider-handle" 
        style={{ left: `${sliderPos}%` }}
        onMouseDown={() => (isDragging.current = true)}
        onTouchStart={() => (isDragging.current = true)}
      >
        <div className="handle-line"></div>
        <div className="handle-button">
          <span>↔</span>
        </div>
      </div>
    </div>
  );
};

export default AboutSlider;
