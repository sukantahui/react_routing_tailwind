import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import linearMotionCode from "./topic5_files/linear_motion_and_step_precision.py?raw";
import relVsAbsCode from "./topic5_files/relative_vs_absolute_displacement.py?raw";
import odometerCode from "./topic5_files/motion_trajectory_and_distance_auditor.py?raw";
import roboticsShuttleCode from "./topic5_files/institutional_linear_robotics_case_study.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic5_files/topic5_note.txt?raw";

// FAQ Questions
import questions from "./topic5_files/topic5_questions";

/**
 * Topic5: Movement fundamentals: forward(), backward(), distance control and precision
 * Module: 005_001_turtle-foundation
 * Segment: 5 (Python Turtle & Creative Graphics Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic5() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("vectorDisplacement");

  // Interactive Laboratory State: Linear Motion & Odometer
  const [currentX, setCurrentX] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [headingAngle, setHeadingAngle] = useState(0); // 0 = East
  const [cumulativeOdometer, setCumulativeOdometer] = useState(0);
  const [motionLogs, setMotionLogs] = useState([]);
  const [lineSegments, setLineSegments] = useState([]);

  const handleStep = (dist, isForward = true) => {
    const effectiveDist = isForward ? dist : -dist;
    const rad = (headingAngle * Math.PI) / 180;
    const newX = Math.round((currentX + effectiveDist * Math.cos(rad)) * 10) / 10;
    const newY = Math.round((currentY + effectiveDist * Math.sin(rad)) * 10) / 10;

    setLineSegments((prev) => [
      ...prev,
      { x1: currentX, y1: currentY, x2: newX, y2: newY, stroke: isForward ? "#2dd4bf" : "#f59e0b" }
    ]);

    setCumulativeOdometer((prev) => prev + Math.abs(dist));
    setMotionLogs((prev) => [
      `[${isForward ? "FORWARD" : "BACKWARD"}] ${dist} px -> New Pos: (${newX}, ${newY})`,
      ...prev.slice(0, 4)
    ]);

    setCurrentX(newX);
    setCurrentY(newY);
  };

  const handleTurn = (deg) => {
    setHeadingAngle((prev) => (prev + deg) % 360);
    setMotionLogs((prev) => [`[TURN] ${deg}° -> New Heading: ${(headingAngle + deg) % 360}°`, ...prev.slice(0, 4)]);
  };

  const handleResetMotion = () => {
    setCurrentX(0);
    setCurrentY(0);
    setHeadingAngle(0);
    setCumulativeOdometer(0);
    setMotionLogs([]);
    setLineSegments([]);
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
            Topic 5
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Python Turtle &amp; Creative Graphics Programming
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Movement Fundamentals: <span className="text-teal-400">forward(), backward() &amp; Precision</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master linear displacement and directional kinematics in Python Turtle: executing forward motion with <code className="text-teal-300 font-mono">forward()</code> / <code className="text-teal-300 font-mono">fd()</code>, executing reverse linear translation with <code className="text-teal-300 font-mono">backward()</code> / <code className="text-teal-300 font-mono">bk()</code> while preserving heading orientation, sub-pixel floating point step precision, comparing relative vector advances with absolute <code className="text-teal-300 font-mono">goto()</code> coordinates, and tracking cumulative odometer path metrics.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ➡️ forward() / fd() Motion
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⬅️ backward() / bk() Reversal
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🎯 Sub-Pixel Float Precision
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🏎️ Cumulative Path Odometer
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
              1. Linear Motion Vector Kinematics
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Linear translation in Turtle Graphics computes continuous trigonometric coordinate displacements along the active heading vector:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ forward(d) / fd()</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">Δx = d·cosθ, Δy = d·sinθ</code>
                <p className="text-[11px] text-slate-300">
                  Translates distance $d$ forward along the current heading angle $\theta$.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ backward(d) / bk()</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">Preserves Orientation</code>
                <p className="text-[11px] text-slate-300">
                  Moves in reverse without changing the turtle's orientation heading angle.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ Float Precision</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">Sub-pixel Steps</code>
                <p className="text-[11px] text-slate-300">
                  Supports precise floating-point step sizes (e.g. <code className="text-purple-300 font-mono">12.345 px</code>) for micro-machining curves.
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 shadow-lg">
                <div className="text-amber-400 font-bold text-sm mb-1">4️⃣ Path Odometer</div>
                <code className="text-xs font-mono text-amber-300 block mb-1">Σ |step_distance|</code>
                <p className="text-[11px] text-slate-300">
                  Accumulates total linear trajectory distance for robotic kinematics and physical odometry.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                Orientation Preservation During backward()
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                Calling <code className="text-teal-300 font-mono">t.backward(100)</code> does <span className="text-emerald-400 font-bold">NOT</span> rotate the turtle! The turtle remains facing its original direction, making backward motion ideal for drawing symmetrical bilateral tick marks and tree branches.
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
                2. Visualizing Vector Kinematics &amp; Motion Comparison
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("vectorDisplacement")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "vectorDisplacement"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Forward vs Backward Vectors
              </button>
              <button
                onClick={() => setActiveInteractiveTab("relativeVsAbsolute")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "relativeVsAbsolute"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Relative vs Absolute Motion
              </button>
              <button
                onClick={() => setActiveInteractiveTab("subPixelPrecision")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "subPixelPrecision"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Sub-Pixel Precision &amp; Drift
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining linear vector trigonometry, displacement equations, and sub-pixel floating-point steps:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "vectorDisplacement" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">
                  FORWARD VS BACKWARD LINEAR VECTOR DISPLACEMENT
                </text>

                {/* Vector Layout */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#0f172a" stroke="#14b8a6" />

                  {/* Left: Forward Motion */}
                  <rect x="25" y="35" width="370" height="180" rx="6" fill="#042f2e" stroke="#2dd4bf" />
                  <text x="35" y="60" fill="#5eead4" fontSize="11" fontWeight="bold">1. t.forward(120) / t.fd(120)</text>
                  <circle cx="80" cy="120" r="5" fill="#ffffff" />
                  <text x="60" y="140" fill="#bae6fd" fontSize="8">(x, y)</text>
                  
                  <line x1="80" y1="120" x2="260" y2="120" stroke="#2dd4bf" strokeWidth="4" markerEnd="url(#arrow)" />
                  <polygon points="275,120 260,114 260,126" fill="#2dd4bf" />
                  <text x="280" y="123" fill="#5eead4" fontSize="8" fontWeight="bold">(x+120, y)</text>

                  <text x="35" y="170" fill="#ccfbf1" fontSize="8">• Moves along heading angle $\theta$</text>
                  <text x="35" y="190" fill="#86efac" fontSize="8" fontWeight="bold">Heading: 0° East (Preserved) ✅</text>

                  {/* Right: Backward Motion */}
                  <rect x="425" y="35" width="370" height="180" rx="6" fill="#451a03" stroke="#f59e0b" />
                  <text x="435" y="60" fill="#fbbf24" fontSize="11" fontWeight="bold">2. t.backward(80) / t.bk(80)</text>
                  
                  <line x1="680" y1="120" x2="520" y2="120" stroke="#f59e0b" strokeWidth="4" />
                  <circle cx="680" cy="120" r="5" fill="#ffffff" />
                  <text x="660" y="140" fill="#fef3c7" fontSize="8">(x, y)</text>
                  
                  <polygon points="695,120 680,114 680,126" fill="#2dd4bf" />
                  <text x="440" y="123" fill="#fde047" fontSize="8" fontWeight="bold">(x-80, y)</text>

                  <text x="435" y="170" fill="#fef3c7" fontSize="8">• Translates in reverse opposite heading</text>
                  <text x="435" y="190" fill="#86efac" fontSize="8" fontWeight="bold">Heading remains pointing East (0°) ✅</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "relativeVsAbsolute" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">
                  RELATIVE PROCEDURAL STEPS VS ABSOLUTE CARTESIAN POSITIONING
                </text>

                {/* Comparison Grid */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#082f49" stroke="#0ea5e9" />

                  {/* Relative */}
                  <rect x="30" y="30" width="370" height="185" rx="6" fill="#0c4a6e" stroke="#38bdf8" />
                  <text x="40" y="55" fill="#ffffff" fontSize="11" fontWeight="bold">Relative Motion: forward() &amp; backward()</text>
                  <text x="40" y="85" fill="#bae6fd" fontSize="8">• Depends on current turtle position and orientation</text>
                  <text x="40" y="105" fill="#bae6fd" fontSize="8">• Ideal for drawing regular polygons (squares, stars)</text>
                  <text x="40" y="125" fill="#bae6fd" fontSize="8">• Easily modularized into reusable functions</text>
                  <pre className="text-[10px] font-mono text-cyan-300 mt-4 p-2 bg-slate-950 rounded">
                    for _ in range(4):{'\n'}
                    {'    '}t.forward(100){'\n'}
                    {'    '}t.left(90)
                  </pre>

                  {/* Absolute */}
                  <rect x="420" y="30" width="370" height="185" rx="6" fill="#1e1b4b" stroke="#a855f7" />
                  <text x="430" y="55" fill="#f3e8ff" fontSize="11" fontWeight="bold">Absolute Motion: goto(x, y)</text>
                  <text x="430" y="85" fill="#d8b4fe" fontSize="8">• Jumps to exact coordinates regardless of heading</text>
                  <text x="430" y="105" fill="#d8b4fe" fontSize="8">• Ideal for screen layout, UI boxes &amp; waypoint maps</text>
                  <text x="430" y="125" fill="#d8b4fe" fontSize="8">• Does not alter turtle orientation angle</text>
                  <pre className="text-[10px] font-mono text-purple-300 mt-4 p-2 bg-slate-950 rounded">
                    t.penup(){'\n'}
                    t.goto(150, 100) # Barrackpore{'\n'}
                    t.pendown()
                  </pre>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">
                  SUB-PIXEL FLOATING POINT STEP PRECISION &amp; DRIFT MITIGATION
                </text>

                {/* Sub-Pixel Precision Layout */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#1e1b4b" stroke="#a855f7" />

                  {/* Math Formula Box */}
                  <rect x="30" y="30" width="760" height="80" rx="6" fill="#2e1065" stroke="#c084fc" />
                  <text x="45" y="55" fill="#f3e8ff" fontSize="11" fontWeight="bold">
                    Trigonometric Displacement Formula in CPython Turtle
                  </text>
                  <text x="45" y="80" fill="#d8b4fe" fontSize="10" fontFamily="monospace">
                    x_new = x_old + distance * cos(radians(theta)) | y_new = y_old + distance * sin(radians(theta))
                  </text>

                  {/* Sub-pixel Steps */}
                  <rect x="30" y="125" width="760" height="95" rx="6" fill="#0f172a" stroke="#38bdf8" />
                  <text x="45" y="150" fill="#38bdf8" fontSize="10" fontWeight="bold">
                    Handling Floating-Point Precision:
                  </text>
                  <text x="45" y="172" fill="#bae6fd" fontSize="8">
                    • Turtle stores position as floating point numbers (e.g. 100.00000000000003).
                  </text>
                  <text x="45" y="190" fill="#86efac" fontSize="8">
                    • When writing test assertions, always use <code className="text-emerald-300 font-mono">math.isclose(a, b, abs_tol=1e-3)</code> or <code className="text-emerald-300 font-mono">round(pos, 2)</code>! ✅
                  </text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE LINEAR MOVEMENT & ODOMETER STUDIO */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧪</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Linear Movement &amp; Odometer Studio
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Execute precise forward and backward translational steps. Observe how backward motion preserves orientation heading and how the cumulative odometer tracks total distance traveled:
          </p>

          <div className="bg-slate-950 p-5 sm:p-6 rounded-xl border border-slate-800/90 space-y-6">
            {/* Action Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              <button
                onClick={() => handleStep(50, true)}
                className="p-2.5 bg-teal-950/80 border border-teal-600 rounded-xl text-xs font-bold text-teal-300 hover:bg-teal-900 transition-all text-center"
              >
                Forward 50 px ⏩
              </button>

              <button
                onClick={() => handleStep(30, false)}
                className="p-2.5 bg-amber-950/80 border border-amber-600 rounded-xl text-xs font-bold text-amber-300 hover:bg-amber-900 transition-all text-center"
              >
                Backward 30 px ⏪
              </button>

              <button
                onClick={() => handleTurn(90)}
                className="p-2.5 bg-cyan-950/80 border border-cyan-600 rounded-xl text-xs font-bold text-cyan-300 hover:bg-cyan-900 transition-all text-center"
              >
                Turn Left 90° ↺
              </button>

              <button
                onClick={() => handleTurn(-90)}
                className="p-2.5 bg-purple-950/80 border border-purple-600 rounded-xl text-xs font-bold text-purple-300 hover:bg-purple-900 transition-all text-center"
              >
                Turn Right 90° ↻
              </button>

              <button
                onClick={handleResetMotion}
                className="p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-bold text-slate-300 hover:bg-slate-800 transition-all text-center"
              >
                Reset Canvas 🔄
              </button>
            </div>

            {/* Metrics Dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-900/90 p-3 rounded-xl border border-teal-900/50 text-center">
                <div className="text-[10px] text-teal-400 uppercase font-mono">Current Coordinates</div>
                <div className="text-lg font-bold font-mono text-teal-200">({currentX}, {currentY})</div>
              </div>

              <div className="bg-slate-900/90 p-3 rounded-xl border border-cyan-900/50 text-center">
                <div className="text-[10px] text-cyan-400 uppercase font-mono">Heading Orientation</div>
                <div className="text-lg font-bold font-mono text-cyan-200">{headingAngle}°</div>
              </div>

              <div className="bg-slate-900/90 p-3 rounded-xl border border-amber-900/50 text-center">
                <div className="text-[10px] text-amber-400 uppercase font-mono">Cumulative Odometer</div>
                <div className="text-lg font-bold font-mono text-amber-200">{cumulativeOdometer} px</div>
              </div>
            </div>

            {/* Simulated Canvas Viewport */}
            <div className="relative w-full h-64 bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden flex items-center justify-center">
              <svg viewBox="-150 -100 300 200" className="w-full h-full">
                {/* Center Origin */}
                <circle cx="0" cy="0" r="3" fill="#64748b" />
                <line x1="-140" y1="0" x2="140" y2="0" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="0" y1="-90" x2="0" y2="90" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />

                {/* Line Segments */}
                {lineSegments.map((seg, idx) => (
                  <line
                    key={idx}
                    x1={seg.x1}
                    y1={-seg.y1}
                    x2={seg.x2}
                    y2={-seg.y2}
                    stroke={seg.stroke}
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                ))}

                {/* Animated Turtle Cursor */}
                <g
                  transform={`translate(${currentX}, ${-currentY}) rotate(${-headingAngle})`}
                  className="transition-transform duration-200 ease-out"
                >
                  <polygon
                    points="10,0 -6,-6 -3,0 -6,6"
                    fill="#2dd4bf"
                    stroke="#0f766e"
                    strokeWidth="1.5"
                    className="animate-glow-teal"
                  />
                </g>
              </svg>
            </div>

            {/* Motion Logs */}
            {motionLogs.length > 0 && (
              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1">
                <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Recent Motion Dispatch Log:</div>
                {motionLogs.map((log, idx) => (
                  <div key={idx} className="text-teal-300">{log}</div>
                ))}
              </div>
            )}
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
              4. Production Code Labs &amp; Linear Motion Suites
            </h2>
          </div>

          <p className="text-slate-300 mb-8 text-base leading-relaxed">
            Inspect, run, and master all four production-grade linear motion labs covering step precision, relative vs absolute positioning, odometer telemetry, and autonomous shuttle robotics:
          </p>

          <div className="space-y-10">
            {/* Python Loader 1 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-teal-300">
                  Lab 1: Linear Motion, Aliases &amp; Sub-Pixel Float Precision
                </h3>
                <p className="text-sm text-slate-400">
                  Translating forward and backward along heading vectors with continuous float coordinates.
                </p>
              </div>
              <PythonFileLoader
                fileModule={linearMotionCode}
                title="linear_motion_and_step_precision.py"
                highlightLines={[16, 26, 38, 52]}
              />
            </div>

            {/* Python Loader 2 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-cyan-300">
                  Lab 2: Relative Vector Steps vs Absolute Coordinate Displacement
                </h3>
                <p className="text-sm text-slate-400">
                  Comparing procedural <code className="text-cyan-300 font-mono">forward()</code> advances with absolute <code className="text-cyan-300 font-mono">goto()</code> coordinate positioning.
                </p>
              </div>
              <PythonFileLoader
                fileModule={relVsAbsCode}
                title="relative_vs_absolute_displacement.py"
                highlightLines={[16, 26, 38]}
              />
            </div>

            {/* Python Loader 3 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-purple-300">
                  Lab 3: Cumulative Linear Path Distance &amp; Odometer Telemetry
                </h3>
                <p className="text-sm text-slate-400">
                  Tracking cumulative path lengths and total distance metrics across multi-step journeys.
                </p>
              </div>
              <PythonFileLoader
                fileModule={odometerCode}
                title="motion_trajectory_and_distance_auditor.py"
                highlightLines={[16, 26, 38]}
              />
            </div>

            {/* Python Loader 4 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-amber-300">
                  Lab 4: Institutional Autonomous Campus Dispatch Shuttle Case Study
                </h3>
                <p className="text-sm text-slate-400">
                  Robotic shuttle simulation delivering materials between Barrackpore and Kolkata for Mamata and Mahima.
                </p>
              </div>
              <PythonFileLoader
                fileModule={roboticsShuttleCode}
                title="institutional_linear_robotics_case_study.py"
                highlightLines={[16, 28, 42, 54]}
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
              5. Linear Movement Pitfalls &amp; Anti-Patterns
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pitfall 1 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                1. Assuming backward() Rotates Orientation
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Expecting <code className="text-rose-400 font-mono">backward(100)</code> to turn the turtle 180°; it translates in reverse while keeping the cursor facing forward.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # REMEMBER: backward() preserves heading angle
              </pre>
            </div>

            {/* Pitfall 2 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                2. Floating-Point Drift in Loops
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Accumulating fractional trigonometric steps can produce tiny rounding errors (e.g. <code className="text-rose-400 font-mono">0.0000000000000004</code>) in position assertions.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # FIX: Use math.isclose(a, b, abs_tol=1e-3)
              </pre>
            </div>

            {/* Pitfall 3 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                3. Negative Distance Confusion
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Calling <code className="text-rose-400 font-mono">forward(-50)</code> moves backward, which can cause subtle logic bugs if sign is not checked.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # FIX: Keep step distances positive and turn deliberately
              </pre>
            </div>

            {/* Pitfall 4 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                4. Confusing goto() with forward()
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Calling <code className="text-rose-400 font-mono">goto(100, 0)</code> when you intended to step forward 100 units relative to current rotated angle.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # FIX: Use forward(d) for relative procedural shapes
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
              6. Movement Fundamentals Best Practices Checklist
            </h2>
          </div>

          <div className="space-y-3 text-slate-300 text-sm sm:text-base">
            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Use Relative Motion for Polygons:</strong> Build modular geometric shapes with <code className="text-teal-300 font-mono">forward()</code> and angle turns.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Leverage backward() for Symmetry:</strong> Draw bilateral branches and return to center without disturbing orientation.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Track Cumulative Odometry:</strong> Sum absolute step distances when simulating physics or vehicle kinematics.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Use Float Distances Freely:</strong> Take advantage of sub-pixel floating-point translation for smooth curves.
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQS */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <FAQTemplate
            title="Linear Movement &amp; Distance Precision FAQs"
            questions={questions}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: PLAIN TEXT PRINT & DOWNLOAD NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <PlainTextPrint
            content={noteText}
            title="Topic 5: Movement Fundamentals Study Note"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Study Note"
            downloadFileName="topic5_note.txt"
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 9: TEACHER'S NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <Teacher
            note={
              "Linear motion is the foundational building block of all computer graphics. When Mamata, Mahima, and Susmita programmed their first autonomous delivery rover simulations at our Barrackpore and Kolkata centers, seeing how backward() preserves orientation while forward() steps along the heading vector laid the mathematical groundwork for autonomous robotics and CNC machining. Enjoy mastering the forward and backward vectors!"
            }
          />
        </section>

      </div>
    </div>
  );
}