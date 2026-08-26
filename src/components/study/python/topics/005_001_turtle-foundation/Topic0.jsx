import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import firstMotionCode from "./topic0_files/turtle_first_screen_and_motion.py?raw";
import historyOriginCode from "./topic0_files/turtle_history_and_logo_origin.py?raw";
import lifecycleCode from "./topic0_files/turtle_window_lifecycle_and_exit.py?raw";
import institutionalGreetingCode from "./topic0_files/institutional_turtle_greeting_case_study.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic0_files/topic0_note.txt?raw";

// FAQ Questions
import questions from "./topic0_files/topic0_questions";

/**
 * Topic0: Introduction to Turtle Graphics: history, educational purpose, and real-world relevance
 * Module: 005_001_turtle-foundation
 * Segment: 5 (Python Turtle & Creative Graphics Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic0() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("bodySyntonic");

  // Interactive Laboratory State: Virtual Turtle Motion
  const [turtleX, setTurtleX] = useState(0);
  const [turtleY, setTurtleY] = useState(0);
  const [turtleAngle, setTurtleAngle] = useState(0); // 0 = East
  const [motionHistory, setMotionHistory] = useState([
    { x1: 0, y1: 0, x2: 0, y2: 0, color: "#2dd4bf" }
  ]);

  const handleForward = (dist = 50) => {
    const rad = (turtleAngle * Math.PI) / 180;
    const newX = Math.round(turtleX + dist * Math.cos(rad));
    const newY = Math.round(turtleY + dist * Math.sin(rad));

    setMotionHistory((prev) => [
      ...prev,
      { x1: turtleX, y1: turtleY, x2: newX, y2: newY, color: "#2dd4bf" }
    ]);
    setTurtleX(newX);
    setTurtleY(newY);
  };

  const handleTurnLeft = (deg = 90) => {
    setTurtleAngle((prev) => (prev + deg) % 360);
  };

  const handleTurnRight = (deg = 90) => {
    setTurtleAngle((prev) => (prev - deg + 360) % 360);
  };

  const handleResetTurtle = () => {
    setTurtleX(0);
    setTurtleY(0);
    setTurtleAngle(0);
    setMotionHistory([]);
  };

  const handleDrawSquarePreset = () => {
    setTurtleX(0);
    setTurtleY(0);
    setTurtleAngle(0);
    setMotionHistory([
      { x1: 0, y1: 0, x2: 60, y2: 0, color: "#2dd4bf" },
      { x1: 60, y1: 0, x2: 60, y2: 60, color: "#38bdf8" },
      { x1: 60, y1: 60, x2: 0, y2: 60, color: "#a855f7" },
      { x1: 0, y1: 60, x2: 0, y2: 0, color: "#facc15" },
    ]);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-visible");
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans p-4 sm:p-6 md:p-10 pb-28 selection:bg-teal-500/30 selection:text-teal-200">
      {/* Scoped Keyframes for Lightweight Zero-Config Micro-Animations */}
      <style>{`
        .section-hidden {
          transform: translateY(18px);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .section-visible {
          transform: translateY(0);
        }
        @keyframes pulseGlowTeal {
          0%, 100% { filter: drop-shadow(0 0 4px rgba(20, 184, 166, 0.4)); }
          50% { filter: drop-shadow(0 0 10px rgba(20, 184, 166, 0.8)); }
        }
        .animate-glow-teal {
          animation: pulseGlowTeal 3s infinite ease-in-out;
        }
      `}</style>

      {/* ==================================================================== */}
      {/* HEADER SECTION */}
      {/* ==================================================================== */}
      <header
        ref={addToRefs}
        className="section-hidden max-w-5xl mx-auto mb-12 pb-8 border-b border-slate-800/80"
      >
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="text-xs sm:text-sm font-mono font-semibold bg-teal-950/80 text-teal-300 px-3 py-1 rounded-full border border-teal-800/80 shadow-sm shadow-teal-950/50">
            Segment 5 • Module 005_001
          </span>
          <span className="text-xs sm:text-sm font-mono bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/80 shadow-sm shadow-cyan-950/50">
            Topic 0
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Python Turtle &amp; Creative Graphics Programming
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Introduction to Turtle Graphics: <span className="text-teal-400">History &amp; Pedagogy</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Begin your journey into visual programming, geometry, and generative computer graphics: discover Seymour Papert's 1967 Logo origin, the constructivist philosophy of "body-syntonic" spatial learning, the Python <code className="text-teal-300 font-mono">turtle</code> architecture built on Tkinter, canvas vector coordinate planes, and real-world industrial relevance from SVG rendering to CNC robotics.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🐢 MIT Logo Origin (1967)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🧠 Body-Syntonic Spatial Pedagogy
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📐 Cartesian Coordinate Plane (0, 0)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚙️ Real-World Robotics &amp; Vector CAD
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: ARCHITECTURAL PILLARS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🏛️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Foundations of Turtle Graphics &amp; Constructionism
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Turtle Graphics is not merely a toy library; it is a revolutionary pedagogical paradigm designed to make abstract mathematical geometry and algorithmic logic tangible:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ 1967 Logo Roots</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">Seymour Papert (MIT)</code>
                <p className="text-[11px] text-slate-300">
                  Originally a physical robotic turtle rolling on large paper sheets with an ink pen, controlled by Logo commands.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ Body Syntonic</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">Spatial Intuition</code>
                <p className="text-[11px] text-slate-300">
                  Learners project their physical bodies onto the canvas plane ("If I turn 90° right and walk 100 paces...").
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ Vector Geometry</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">Cartesian (0, 0) Origin</code>
                <p className="text-[11px] text-slate-300">
                  Continuous mathematical coordinates (angles, distance, headings) rather than discrete pixel grids.
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 shadow-lg">
                <div className="text-amber-400 font-bold text-sm mb-1">4️⃣ Industrial Impact</div>
                <code className="text-xs font-mono text-amber-300 block mb-1">CNC &amp; 3D Printing</code>
                <p className="text-[11px] text-slate-300">
                  Path-following kinematics in Turtle directly map to G-code toolpaths, robotic arms, and vector SVG graphics.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Tkinter GUI Event Loop Requirement
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                Because Python's <code className="text-teal-300 font-mono">turtle</code> is built on Tkinter, scripts must end with <span className="text-emerald-400 font-bold">turtle.done()</span> or <span className="text-emerald-400 font-bold">screen.exitonclick()</span>. Without this, the operating system closes the window the microsecond the last drawing command finishes!
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 2: INTERACTIVE VISUAL ARCHITECTURE (SVG TABS) */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📐</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                2. Visualizing Body-Syntonic Geometry &amp; Canvas Planes
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("bodySyntonic")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "bodySyntonic"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              &gt;
                Body-Syntonic Geometry
              </button>
              <button
                onClick={() => setActiveInteractiveTab("canvasPlane")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "canvasPlane"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              &gt;
                Canvas vs Screen Coordinate Plane
              </button>
              <button
                onClick={() => setActiveInteractiveTab("evolutionTimeline")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "evolutionTimeline"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              &gt;
                1967 to Modern Python Evolution
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining coordinate planes, heading trigonometry, and physical robotic origins:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "bodySyntonic" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">
                  BODY-SYNTONIC LEARNING: THE TURTLE AS AN EXTENSION OF THE SELF
                </text>

                {/* Left: Coordinate Plane with Turtle */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="235" rx="6" fill="#0c4a6e" stroke="#38bdf8" />
                  
                  {/* Grid Lines */}
                  <line x1="20" y1="120" x2="360" y2="120" stroke="#0284c7" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="190" y1="20" x2="190" y2="220" stroke="#0284c7" strokeWidth="1" strokeDasharray="4 4" />

                  {/* Origin */}
                  <circle cx="190" cy="120" r="4" fill="#38bdf8" />
                  <text x="198" y="115" fill="#bae6fd" fontSize="9" fontWeight="bold">Origin (0, 0)</text>

                  {/* Vector Path */}
                  <line x1="190" y1="120" x2="290" y2="120" stroke="#2dd4bf" strokeWidth="3" />
                  <line x1="290" y1="120" x2="290" y2="40" stroke="#38bdf8" strokeWidth="3" />

                  {/* Turtle Cursor */}
                  <polygon points="290,30 282,45 298,45" fill="#5eead4" stroke="#0f766e" strokeWidth="1.5" />
                  <text x="235" y="140" fill="#2dd4bf" fontSize="8" fontFamily="monospace">forward(100)</text>
                  <text x="300" y="80" fill="#38bdf8" fontSize="8" fontFamily="monospace">left(90); forward(80)</text>
                </g>

                {/* Right: Pedagogy Breakdown */}
                <g transform="translate(440, 50)">
                  <rect x="0" y="0" width="380" height="235" rx="6" fill="#042f2e" stroke="#2dd4bf" />
                  <text x="15" y="25" fill="#5eead4" fontSize="11" fontWeight="bold">The Constructivist Pedagogy</text>

                  <rect x="15" y="45" width="350" height="50" rx="4" fill="#022c22" stroke="#0d9488" />
                  <text x="25" y="65" fill="#a7f3d0" fontSize="9" fontWeight="bold">1. Relative Navigation</text>
                  <text x="25" y="82" fill="#ccfbf1" fontSize="8">Movement is relative to current turtle heading (not absolute pixels)</text>

                  <rect x="15" y="105" width="350" height="50" rx="4" fill="#022c22" stroke="#0d9488" />
                  <text x="25" y="125" fill="#a7f3d0" fontSize="9" fontWeight="bold">2. Trigonometry Made Intuitive</text>
                  <text x="25" y="142" fill="#ccfbf1" fontSize="8">Δx = distance × cos(θ) | Δy = distance × sin(θ) computed automatically</text>

                  <rect x="15" y="165" width="350" height="50" rx="4" fill="#022c22" stroke="#0d9488" />
                  <text x="25" y="185" fill="#a7f3d0" fontSize="9" fontWeight="bold">3. Immediate Visual Verification</text>
                  <text x="25" y="202" fill="#86efac" fontSize="8">Students visually spot loop or angle errors within 0.1 seconds ✅</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "canvasPlane" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">
                  TURTLE CARTESIAN PLANE VS COMPUTER SCREEN PIXEL GRIDS
                </text>

                {/* Comparison Grid */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#082f49" stroke="#0ea5e9" />

                  {/* Left: Turtle Cartesian Plane */}
                  <rect x="25" y="35" width="370" height="180" rx="6" fill="#0369a1" stroke="#38bdf8" />
                  <text x="35" y="60" fill="#ffffff" fontSize="11" fontWeight="bold">Turtle Cartesian Canvas (Standard Math)</text>
                  <text x="35" y="85" fill="#e0f2fe" fontSize="8">• Center of window is Origin (0, 0)</text>
                  <text x="35" y="105" fill="#e0f2fe" fontSize="8">• Positive Y points UP (↑ +Y)</text>
                  <text x="35" y="125" fill="#e0f2fe" fontSize="8">• Positive X points RIGHT (→ +X)</text>
                  <text x="35" y="145" fill="#e0f2fe" fontSize="8">• Angles: 0° East, 90° North, 180° West, 270° South</text>
                  <text x="35" y="195" fill="#86efac" fontSize="8" fontWeight="bold">Matches High School Geometry ✅</text>

                  {/* Right: Computer Screen Bitmap Grid */}
                  <rect x="425" y="35" width="370" height="180" rx="6" fill="#1e1b4b" stroke="#818cf8" />
                  <text x="435" y="60" fill="#e0e7ff" fontSize="11" fontWeight="bold">HTML Canvas / Screen Pixel Grids</text>
                  <text x="435" y="85" fill="#c7d2fe" fontSize="8">• Top-Left corner is (0, 0)</text>
                  <text x="435" y="105" fill="#fca5a5" fontSize="8">• Positive Y points DOWN (↓ +Y inverted!)</text>
                  <text x="435" y="125" fill="#c7d2fe" fontSize="8">• Positive X points RIGHT (→ +X)</text>
                  <text x="435" y="145" fill="#c7d2fe" fontSize="8">• Requires manual offset transformations</text>
                  <text x="435" y="195" fill="#fde047" fontSize="8" fontWeight="bold">Inverted Y Coordinates ⚠️</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">
                  THE EVOLUTION OF TURTLE GRAPHICS (1967 TO MODERN PYTHON)
                </text>

                {/* Evolution Timeline */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#1e1b4b" stroke="#a855f7" />

                  {/* 1967 */}
                  <rect x="25" y="40" width="220" height="165" rx="6" fill="#0c4a6e" stroke="#38bdf8" />
                  <text x="35" y="65" fill="#ffffff" fontSize="11" fontWeight="bold">1967: MIT Logo Origins</text>
                  <text x="35" y="90" fill="#bae6fd" fontSize="8">Seymour Papert &amp; Wally Feurzeig</text>
                  <text x="35" y="110" fill="#e0f2fe" fontSize="8">Physical motorized robot on wheels</text>
                  <text x="35" y="130" fill="#e0f2fe" fontSize="8">drawing ink trails on classroom floors.</text>
                  <text x="35" y="180" fill="#facc15" fontSize="8" fontWeight="bold">Physical Robotic Turtle</text>

                  {/* Arrow 1 */}
                  <path d="M 255 120 L 285 120" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrow)" />

                  {/* 1990s */}
                  <rect x="295" y="40" width="240" height="165" rx="6" fill="#042f2e" stroke="#2dd4bf" />
                  <text x="305" y="65" fill="#5eead4" fontSize="11" fontWeight="bold">1990s: Python StdLib</text>
                  <text x="305" y="90" fill="#ccfbf1" fontSize="8">Guido van Rossum introduces 'turtle'</text>
                  <text x="305" y="110" fill="#ccfbf1" fontSize="8">Built on Tkinter Canvas wrapper.</text>
                  <text x="305" y="130" fill="#ccfbf1" fontSize="8">Pre-installed with every Python install.</text>
                  <text x="305" y="180" fill="#86efac" fontSize="8" fontWeight="bold">Standard Library Integration</text>

                  {/* Arrow 2 */}
                  <path d="M 545 120 L 575 120" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrow)" />

                  {/* Modern */}
                  <rect x="585" y="40" width="210" height="165" rx="6" fill="#3b0764" stroke="#c084fc" />
                  <text x="595" y="65" fill="#f3e8ff" fontSize="11" fontWeight="bold">Today: Generative Art</text>
                  <text x="595" y="90" fill="#d8b4fe" fontSize="8">Complex fractals &amp; L-systems</text>
                  <text x="595" y="110" fill="#d8b4fe" fontSize="8">Multi-agent simulation engines</text>
                  <text x="595" y="130" fill="#d8b4fe" fontSize="8">Robotic G-code toolpath modeling</text>
                  <text x="595" y="180" fill="#86efac" fontSize="8" fontWeight="bold">Creative Vector Geometry 🚀</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE VIRTUAL TURTLE SIMULATOR */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧪</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Virtual Turtle Canvas Simulator
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Direct the virtual turtle cursor across the 2D Cartesian canvas. Click controls to move forward, rotate left/right, and inspect mathematical coordinates in real time:
          </p>

          <div className="bg-slate-950 p-5 sm:p-6 rounded-xl border border-slate-800/90 space-y-6">
            {/* Control Panel Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              <button
                onClick={() => handleForward(50)}
                className="p-2.5 bg-teal-950/60 border border-teal-600 rounded-xl text-xs font-bold text-teal-300 hover:bg-teal-900/80 transition-all text-center"
              &gt;
                Forward 50 px
              </button>

              <button
                onClick={() => handleTurnLeft(90)}
                className="p-2.5 bg-cyan-950/60 border border-cyan-600 rounded-xl text-xs font-bold text-cyan-300 hover:bg-cyan-900/80 transition-all text-center"
              &gt;
                Left 90° ↺
              </button>

              <button
                onClick={() => handleTurnRight(90)}
                className="p-2.5 bg-purple-950/60 border border-purple-600 rounded-xl text-xs font-bold text-purple-300 hover:bg-purple-900/80 transition-all text-center"
              &gt;
                Right 90° ↻
              </button>

              <button
                onClick={handleDrawSquarePreset}
                className="p-2.5 bg-amber-950/60 border border-amber-600 rounded-xl text-xs font-bold text-amber-300 hover:bg-amber-900/80 transition-all text-center"
              >
                Preset: Square ⏹️
              </button>

              <button
                onClick={handleResetTurtle}
                className="p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-bold text-slate-300 hover:bg-slate-800 transition-all text-center"
              >
                Reset Canvas 🔄
              </button>
            </div>

            {/* Metrics Dashboard */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-900/90 p-3 rounded-xl border border-teal-900/50 text-center">
                <div className="text-[11px] text-teal-400 font-medium">Position X</div>
                <div className="text-lg font-bold font-mono text-teal-300">{turtleX}</div>
              </div>

              <div className="bg-slate-900/90 p-3 rounded-xl border border-cyan-900/50 text-center">
                <div className="text-[11px] text-cyan-400 font-medium">Position Y</div>
                <div className="text-lg font-bold font-mono text-cyan-300">{turtleY}</div>
              </div>

              <div className="bg-slate-900/90 p-3 rounded-xl border border-purple-900/50 text-center">
                <div className="text-[11px] text-purple-400 font-medium">Heading Angle</div>
                <div className="text-lg font-bold font-mono text-purple-300">{turtleAngle}°</div>
              </div>
            </div>

            {/* Simulated Canvas Viewport */}
            <div className="relative w-full h-64 bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden flex items-center justify-center">
              <svg viewBox="-150 -100 300 200" className="w-full h-full">
                {/* Axis Grid */}
                <line x1="-140" y1="0" x2="140" y2="0" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="0" y1="-90" x2="0" y2="90" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="0" cy="0" r="3" fill="#64748b" />
                <text x="5" y="-5" fill="#64748b" fontSize="7">(0,0)</text>

                {/* Drawing Paths */}
                {motionHistory.map((seg, idx) => (
                  <line
                    key={idx}
                    x1={seg.x1}
                    y1={-seg.y1} // Invert Y for SVG coordinates
                    x2={seg.x2}
                    y2={-seg.y2}
                    stroke={seg.color}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                ))}

                {/* Animated Turtle Cursor */}
                <g
                  transform={`translate(${turtleX}, ${-turtleY}) rotate(${-turtleAngle})`}
                  className="transition-transform duration-300 ease-out"
                >
                  <polygon
                    points="8,0 -5,-5 -2,0 -5,5"
                    fill="#2dd4bf"
                    stroke="#0f766e"
                    strokeWidth="1"
                  />
                </g>
              </svg>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: DEEP DIVE CODE LABS (PYTHON FILE LOADERS) */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">💻</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Production Code Labs &amp; Turtle Suites
            </h2>
          </div>

          <p className="text-slate-300 mb-8 text-base leading-relaxed">
            Inspect, run, and master all four production-grade Turtle Graphics labs covering first canvas initialization, Logo mathematical models, lifecycle teardown, and institutional student greetings:
          </p>

          <div className="space-y-10">
            {/* Python Loader 1 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-teal-300">
                  Lab 1: First Turtle Canvas &amp; Linear Vector Motion
                </h3>
                <p className="text-sm text-slate-400">
                  Configuring screen dimensions, pen colors, speeds, forward steps, and clean window exit handlers.
                </p>
              </div>
              <PythonFileLoader
                fileModule={firstMotionCode}
                title="turtle_first_screen_and_motion.py"
                highlightLines={[16, 26, 36, 46]}
              />
            </div>

            {/* Python Loader 2 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-cyan-300">
                  Lab 2: Body-Syntonic Mathematical Coordinate Modeling (Logo Origin)
                </h3>
                <p className="text-sm text-slate-400">
                  Tracing continuous mathematical vector displacements using trigonometry (<code className="text-cyan-300 font-mono">cos</code> and <code className="text-cyan-300 font-mono">sin</code>) without GUI dependencies.
                </p>
              </div>
              <PythonFileLoader
                fileModule={historyOriginCode}
                title="turtle_history_and_logo_origin.py"
                highlightLines={[16, 26, 40, 52]}
              />
            </div>

            {/* Python Loader 3 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-purple-300">
                  Lab 3: Window Lifecycle Management &amp; Event Loop Teardown
                </h3>
                <p className="text-sm text-slate-400">
                  Managing Tkinter event loops with <code className="text-purple-300 font-mono">turtle.done()</code>, <code className="text-purple-300 font-mono">screen.exitonclick()</code>, and <code className="text-purple-300 font-mono">turtle.bye()</code>.
                </p>
              </div>
              <PythonFileLoader
                fileModule={lifecycleCode}
                title="turtle_window_lifecycle_and_exit.py"
                highlightLines={[14, 24, 34]}
              />
            </div>

            {/* Python Loader 4 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-amber-300">
                  Lab 4: Institutional Turtle Multi-Campus Waypoint Navigator Case Study
                </h3>
                <p className="text-sm text-slate-400">
                  Complete coordinate navigation engine greeting Mamata, Mahima, and Susmita across Barrackpore, Kolkata, and Ichapur.
                </p>
              </div>
              <PythonFileLoader
                fileModule={institutionalGreetingCode}
                title="institutional_turtle_greeting_case_study.py"
                highlightLines={[18, 30, 48, 62]}
              />
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 5: COMMON PITFALLS & ANTI-PATTERNS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚠️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              5. Turtle Graphics Pitfalls &amp; Anti-Patterns
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pitfall 1 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                1. Omitting turtle.done() / exitonclick()
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Running a script without entering the Tkinter event loop causes the window to close instantly after drawing.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # BUG: t.forward(100) (Window closes in 0.01s!){'\n'}
                # FIX: turtle.done() at the end of the file
              </pre>
            </div>

            {/* Pitfall 2 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                2. Over-reliance on Anonymous Singleton
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Calling <code className="text-rose-400 font-mono">turtle.forward()</code> directly instead of creating explicit <code className="text-teal-300 font-mono">t = turtle.Turtle()</code> prevents multi-turtle animations.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # ANTI-PATTERN: turtle.forward(100){'\n'}
                # BEST PRACTICE: t1 = turtle.Turtle(); t1.forward(100)
              </pre>
            </div>

            {/* Pitfall 3 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                3. Moving Without penup()
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Calling <code className="text-rose-400 font-mono">goto(x, y)</code> without first lifting the pen leaves unwanted diagonal connector lines on the canvas.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # FIX: t.penup(); t.goto(x, y); t.pendown()
              </pre>
            </div>

            {/* Pitfall 4 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                4. Inverted Y-Axis Confusion
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Assuming (0, 0) is top-left as in HTML Canvas causes unexpected upside-down drawings in Turtle's center Cartesian plane.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # REMEMBER: Turtle (0, 0) is Center; +Y points UP
              </pre>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 6: BEST PRACTICES CHECKLIST */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">✅</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              6. Turtle Foundation Best Practices Checklist
            </h2>
          </div>

          <div className="space-y-3 text-slate-300 text-sm sm:text-base">
            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Configure the Screen First:</strong> Set window title, size, and background color with <code className="text-teal-300 font-mono">turtle.Screen()</code>.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Instantiate OOP Turtle Objects:</strong> Use <code className="text-teal-300 font-mono">t = turtle.Turtle()</code> for clean encapsulation and multi-pen capability.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Use speed(0) for Instant Renders:</strong> Eliminate animation wait time when generating complex mathematical fractals.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Always Conclude with Event Loop:</strong> Call <code className="text-teal-300 font-mono">turtle.done()</code> or <code className="text-teal-300 font-mono">screen.exitonclick()</code>.
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQS */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <FAQTemplate
            title="Turtle Graphics Foundations &amp; Pedagogy FAQs"
            questions={questions}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: PLAIN TEXT PRINT & DOWNLOAD NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <PlainTextPrint
            content={noteText}
            title="Topic 0: Introduction to Turtle Graphics Study Note"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Study Note"
            downloadFileName="topic0_note.txt"
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 9: TEACHER'S NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <Teacher
            note={
              "Welcome to Segment 5! Visual programming with Turtle is where code meets creativity and mathematics. When Mamata, Mahima, and Susmita began programming at our centers in Barrackpore and Kolkata, watching the turtle cursor translate loops and angles into geometric art bridged the gap between abstract algebra and visual intuition. Enjoy the journey into creative computing!"
            }
          />
        </section>

      </div>
    </div>
  );
}