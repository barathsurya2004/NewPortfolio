import React, { useEffect, useState, useRef } from "react";
import "./Loader.css";

const phases = [
  { at: 0, label: "Initialising" },
  { at: 22, label: "Loading assets" },
  { at: 55, label: "Crafting layout" },
  { at: 78, label: "Polishing details" },
  { at: 95, label: "Almost there" },
  { at: 100, label: "Welcome" },
];

const Loader: React.FC = () => {
  const [prog, setProg] = useState(0);
  const [status, setStatus] = useState("Initialising");
  const [isExit, setIsExit] = useState(false);
  const [isGone, setIsGone] = useState(false);
  const [isOn, setIsOn] = useState(false);
  
  const progRef = useRef(0);
  const dateStr = new Date()
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .toUpperCase();

  useEffect(() => {
    // Lock scroll
    document.body.classList.add("loading");

    // Entrance animations trigger
    const timer = window.setTimeout(() => {
      setIsOn(true);
    }, 10);

    // Progress simulation
    let timeoutId: number;

    const launch = () => {
      window.setTimeout(() => {
        setIsExit(true);
        document.body.classList.remove("loading");
        window.setTimeout(() => {
          setIsGone(true);
        }, 1150);
      }, 520);
    };

    const easeProgress = () => {
      if (progRef.current >= 100) {
        launch();
        return;
      }

      const remaining = 100 - progRef.current;
      const step = Math.max(0.4, Math.random() * (remaining * 0.09));
      progRef.current = Math.min(100, progRef.current + step);

      const p = Math.round(progRef.current);
      setProg(progRef.current);

      // Update status based on phases
      for (let i = phases.length - 1; i >= 0; i--) {
        if (p >= phases[i].at) {
          setStatus(phases[i].label);
          break;
        }
      }

      const delay =
        progRef.current < 80
          ? 28 + Math.random() * 35
          : progRef.current < 95
          ? 55 + Math.random() * 60
          : 90 + Math.random() * 80;

      timeoutId = window.setTimeout(easeProgress, delay);
    };

    // Initial delay before progress starts
    const startTimeout = window.setTimeout(easeProgress, 700);

    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(startTimeout);
      window.clearTimeout(timeoutId);
      document.body.classList.remove("loading");
    };
  }, []);

  if (isGone) return null;

  return (
    <div id="loader" className={`${isExit ? "exit" : ""} ${isGone ? "gone" : ""}`} aria-hidden="true">
      <div className="ld-panel ld-panel-top">
        <div className="ld-grain"></div>
      </div>
      <div className="ld-panel ld-panel-bottom"></div>

      <div className={`ld-blobs ${isOn ? "on" : ""}`}>
        <div className="ld-blob lb1"></div>
        <div className="ld-blob lb2"></div>
        <div className="ld-blob lb3"></div>
      </div>

      <div className="ld-ring ld-ring-1"></div>
      <div className="ld-ring ld-ring-2"></div>
      <div className="ld-ring ld-ring-3"></div>

      <div className={`ld-corner ld-tl ${isOn ? "on" : ""}`}></div>
      <div className={`ld-corner ld-tr ${isOn ? "on" : ""}`}></div>
      <div className={`ld-corner ld-bl ${isOn ? "on" : ""}`}></div>
      <div className={`ld-corner ld-br ${isOn ? "on" : ""}`}></div>

      <div className="ld-stage">
        <div className="ld-mono-wrap">
          <div
            className={`ld-mono ${isOn ? "on" : ""}`}
            data-text="B ✦ S"
          >
            B ✦ S
          </div>
        </div>
        <p className="ld-tag">Software Engineer · Full-Stack Developer</p>
        <div className="ld-progress">
          <div className="ld-track">
            <div className="ld-fill" style={{ width: `${prog}%` }}></div>
          </div>
          <div className="ld-counter-row">
            <div className="ld-pct">
              <span>{Math.round(prog)}</span>%
            </div>
            <div className={`ld-status ${isOn ? "vis" : ""}`}>{status}</div>
          </div>
        </div>
      </div>

      <div className={`ld-strip ${isOn ? "on" : ""}`}>
        <span>Barath Surya M.</span>
        <span className="ld-strip-sep"></span>
        <span id="ldDate">{dateStr}</span>
        <span className="ld-strip-sep"></span>
        <span>Portfolio 2026</span>
      </div>
    </div>
  );
};

export default Loader;
