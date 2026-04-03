import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import HeroCanvas from "./Hero/HeroCanvas";
import "./Hero.css";

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRowsRef = useRef<HTMLSpanElement[]>([]);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Entrance Animation
      tl.fromTo(
        ".hero-badge",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.3 },
      );

      tl.fromTo(
        titleRowsRef.current,
        { opacity: 0, y: "105%" },
        {
          opacity: 1,
          y: 0,
          duration: 0.95,
          ease: "power4.out",
          stagger: 0.15,
        },
        "-=0.5",
      );

      tl.fromTo(
        ".hero-foot",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.3",
      );

      tl.fromTo(
        ".scroll-hint",
        { opacity: 0, y: 20, xPercent: -50 },
        { opacity: 1, y: 0, xPercent: -50, duration: 0.8, ease: "power2.out" },
        "-=0.1",
      );

      // Scroll Line Pulse
      gsap.fromTo(
        ".scroll-line",
        { scaleY: 1, opacity: 1 },
        {
          scaleY: 0.4,
          opacity: 0.4,
          duration: 1.1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        },
      );
    },
    { scope: heroRef },
  );

  return (
    <section className="hero" id="home" ref={heroRef}>
      <HeroCanvas />
      <div className="hero-wm">BS</div>

      <div className="hero-content">
        <p className="hero-badge">Software Engineer · Full-Stack Developer</p>

        <h1 className="hero-title">
          <span className="row">
            <span ref={(el) => (titleRowsRef.current[0] = el!)}>
              Building robust
            </span>
          </span>
          <span className="row">
            <span ref={(el) => (titleRowsRef.current[1] = el!)}>
              systems that <em>feel</em>
            </span>
          </span>
          <span className="row">
            <span ref={(el) => (titleRowsRef.current[2] = el!)}>
              seamlessly crafted.
            </span>
          </span>
        </h1>

        <div className="hero-foot">
          <p className="hero-bio">
            I'm an Electrical Engineering student at IIT Hyderabad (Class of
            2026), focused on bridging complex backends with engaging frontends.
            Recently interned at Uber AI.
          </p>
          <div className="hero-actions">
            <a href="#work" className="btn-pill">
              View my work
              <svg width="13" height="13" fill="none" viewBox="0 0 13 13">
                <path
                  d="M2 6.5h9M11 6.5L7.5 3M11 6.5L7.5 10"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              </svg>
            </a>
            <a href="#contact" className="btn-ghost">
              Let's talk
              <svg width="11" height="11" fill="none" viewBox="0 0 11 11">
                <path
                  d="M1 1h9v9M10 1L1 10"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* <div className="scroll-hint"> */}
      {/*   <span>Scroll</span> */}
      {/*   <div className="scroll-line"></div> */}
      {/* </div> */}
    </section>
  );
};

export default Hero;
