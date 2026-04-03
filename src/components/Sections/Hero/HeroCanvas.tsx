import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const HeroCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 4; // Moved back slightly for better view

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const blobs: { 
      mesh: THREE.Mesh; 
      geometry: THREE.IcosahedronGeometry; 
      initialPositions: Float32Array; 
      speed: number;
      offset: number;
    }[] = [];

    const createBlob = (color: number, scale: number, x: number, y: number, speed: number, offset: number) => {
      const geometry = new THREE.IcosahedronGeometry(scale, 32);
      const material = new THREE.MeshStandardMaterial({
        color: color,
        transparent: true,
        opacity: 0.5, // Increased opacity to survive heavy blur
        roughness: 0.8,
        metalness: 0.1,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, y, 0);
      scene.add(mesh);

      blobs.push({
        mesh,
        geometry,
        initialPositions: new Float32Array(geometry.attributes.position.array),
        speed,
        offset
      });
    };

    // Create 3 larger, more opaque blobs
    createBlob(0x8dad85, 1.8, -2, 1, 0.004, 0);    // Sage top-left
    createBlob(0xc4a098, 2.2, 2.5, -1.5, 0.003, 10); // Rose bottom-right
    createBlob(0xc8b49a, 1.6, 0, -2, 0.005, 20);   // Warm bottom-center

    // Lighting - Stronger ambient light to ensure visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1.5);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Mouse movement
    const mouse = new THREE.Vector2();
    const targetMouse = new THREE.Vector2();

    const onMouseMove = (event: MouseEvent) => {
      targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    let time = 0;
    const animate = () => {
      time += 0.005;
      
      mouse.x += (targetMouse.x - mouse.x) * 0.03;
      mouse.y += (targetMouse.y - mouse.y) * 0.03;

      blobs.forEach((b, index) => {
        const positions = b.geometry.attributes.position.array as Float32Array;
        const initial = b.initialPositions;
        
        for (let i = 0; i < positions.length; i += 3) {
          const x = initial[i];
          const y = initial[i + 1];
          const z = initial[i + 2];

          const noise = Math.sin(x * 1.0 + time * b.speed * 100 + b.offset) * 0.2 + 
                        Math.cos(y * 1.2 + time * b.speed * 80 + b.offset) * 0.2;
          
          const factor = 1 + noise;
          positions[i] = x * factor;
          positions[i+1] = y * factor;
          positions[i+2] = z * factor;
        }
        b.geometry.attributes.position.needsUpdate = true;

        b.mesh.rotation.y += 0.001 * (index + 1);
        
        // Mouse reaction
        const targetX = (index === 0 ? -2 : index === 1 ? 2.5 : 0) + mouse.x * 0.5;
        const targetY = (index === 0 ? 1 : index === 1 ? -1.5 : -2) + mouse.y * 0.5;
        
        b.mesh.position.x += (targetX - b.mesh.position.x) * 0.02;
        b.mesh.position.y += (targetY - b.mesh.position.y) * 0.02;
      });

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      blobs.forEach(b => {
        b.geometry.dispose();
        (b.mesh.material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      id="hero-canvas" 
      style={{ 
        position: 'fixed', 
        inset: 0, 
        zIndex: -1, 
        pointerEvents: 'none',
        filter: 'blur(80px)', // Slightly reduced blur to ensure visibility
        opacity: 0.5
      }} 
    />
  );
};

export default HeroCanvas;
