import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollReveal = () => {
  useEffect(() => {
    const elements = document.querySelectorAll('.rv');
    
    elements.forEach((el) => {
      // Get the delay from the class name (d1, d2, d3, d4)
      let delay = 0;
      if (el.classList.contains('d1')) delay = 0.1;
      else if (el.classList.contains('d2')) delay = 0.2;
      else if (el.classList.contains('d3')) delay = 0.3;
      else if (el.classList.contains('d4')) delay = 0.4;

      gsap.fromTo(el, 
        { 
          opacity: 0, 
          y: 28 
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: 'power2.out',
          delay: delay,
          scrollTrigger: {
            trigger: el,
            start: 'top 95%', // Similar to rootMargin: '0px 0px -40px 0px'
            toggleActions: 'play none none none'
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);
};
