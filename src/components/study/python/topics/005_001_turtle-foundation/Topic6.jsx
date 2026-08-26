import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import relRotationsCode from "./topic6_files/relative_rotations_left_and_right.py?raw";
import absHeadingCode from "./topic6_files/absolute_setheading_and_radians_mode.py?raw";
import polygonGeomCode from "./topic6_files/angular_normalization_and_polygon_geometry.py?raw";
import compassCaseCode from "./topic6_files/institutional_multi_angle_compass_case_study.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic6_files/topic6_note.txt?raw";

// FAQ Questions
import questions from "./topic6_files/topic6_questions";

/**
 * Topic6: Rotation control: left(), right(), setheading(), degrees vs angles
 * Module: 005_001_turtle-foundation
 * Segment: 5 (Python Turtle & Creative Graphics Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic6() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("polygonTurns");

  // Interactive Laboratory State: Regular Polygon & Star Studio
  const [selectedShapeType, setSelectedShapeType] = useState("triangle"); // triangle, square, pentagon, hexagon, star
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const shapeSpecs = {
    triangle: { name: "Equilateral Triangle", sides: 3, turnAngle: 120, interior: 60, sideLength: 70 },
    square: { name: "Square", sides: 4, turnAngle: 90, interior: 90, sideLength: 60 },
    pentagon: { name: "Regular Pentagon", sides: 5, turnAngle: 72, interior: 108, sideLength: 48 },
    hexagon: { name: "Regular Hexagon", sides: 6, turnAngle: 60, interior: 120, sideLength: 40 },
    star: { name: "5-Pointed Star", sides: 5, turnAngle: 144, interior: 36, sideLength: 70 }
  };

  const currentSpec = shapeSpecs[selectedShapeType];

  const handleNextStep = () => {
    setCurrentStepIndex((prev) => (prev + 1) % (currentSpec.sides + 1));
  };

  const handleResetShape = (shapeKey) => {
    setSelectedShapeType(shapeKey);
    setCurrentStepIndex(0);
  };

  // Generate shape points based on current step index
  const generateShapePoints = () => {
    const points = [{ x: 0, y: 0 }];
    let curX = 0;
    let curY = 0;
    let curHeading = 0; // East

    for (let i = 0; i < currentStepIndex; i++) {
      const rad = (curHeading * Math.PI) / 180;
      curX += currentSpec.sideLength * Math.cos(rad);
      curY += currentSpec.sideLength * Math.sin(rad);
      points.push({ x: curX, y: curY });
      curHeading = (curHeading + currentSpec.turnAngle) % 360;
    }

    return { points, curX, curY, curHeading };
  };

  const { points, curX, curY, curHeading } = generateShapePoints();

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
            Topic 6
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Python Turtle &amp; Creative Graphics Programming
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Rotation Control: <span className="text-teal-400">left(), right(), setheading() &amp; Angles</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master rotational kinematics and angular geometry in Python Turtle: relative turns with <code className="text-teal-300 font-mono">left()</code> / <code className="text-teal-300 font-mono">lt()</code> and <code className="text-teal-300 font-mono">right()</code> / <code className="text-teal-300 font-mono">rt()</code>, absolute compass orientation with <code className="text-teal-300 font-mono">setheading()</code> / <code className="text-teal-300 font-mono">seth()</code>, the Exterior Angle Theorem for regular polygons (<code className="text-teal-300 font-mono">turn = 360° / N</code>), switching angle modes between degrees and radians (<code className="text-teal-300 font-mono">screen.radians()</code>), and modulo 360 angular normalization.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ↺ left() / right() Relative Turns
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🧭 setheading() Absolute Bearing
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📐 Polygon Exterior Theorem (360°/N)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🥧 Degrees vs Radians Mode
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
              1. The Geometry of Rotations &amp; Turning Angles
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Turning in Turtle Graphics involves understanding the difference between interior geometric angles and exterior vertex turns:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ Relative Turns</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">left(a), right(a)</code>
                <p className="text-[11px] text-slate-300">
                  Rotates counter-clockwise (<code className="text-teal-300 font-mono">left</code>) or clockwise (<code className="text-teal-300 font-mono">right</code>) by delta angle.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ Absolute Bearing</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">setheading(angle)</code>
                <p className="text-[11px] text-slate-300">
                  Sets absolute orientation directly: 0° East, 90° North, 180° West, 270° South.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ Exterior Theorem</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">turn = 360° / N</code>
                <p className="text-[11px] text-slate-300">
                  To complete a closed regular polygon of $N$ sides, the turtle turns $360^\circ / N$ at every corner.
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 shadow-lg">
                <div className="text-amber-400 font-bold text-sm mb-1">4️⃣ Angle Modes</div>
                <code className="text-xs font-mono text-amber-300 block mb-1">radians() &amp; degrees()</code>
                <p className="text-[11px] text-slate-300">
                  Switch between 360° sexagesimal degrees and $2\pi$ trigonometric calculus radians.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Exterior Turning Angle Trap
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                When drawing an equilateral triangle, many beginners mistakenly write <code className="text-rose-400 font-mono">t.left(60)</code> because a triangle's interior angle is 60°. But the turtle must turn by the <span className="text-emerald-400 font-bold">EXTERIOR ANGLE: 180° - 60° = 120°</span> to continue drawing the next side!
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
                2. Visualizing Polygon Turning Geometry &amp; Star Angles
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("polygonTurns")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "polygonTurns"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Polygon Exterior Angles
              </button>
              <button
                onClick={() => setActiveInteractiveTab("starGeometry")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "starGeometry"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                5-Pointed Star (144° Turn)
              </button>
              <button
                onClick={() => setActiveInteractiveTab("degreesVsRadians")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "degreesVsRadians"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Degrees vs Radians Modes
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining exterior turning angles, star polygon vertex formulas, and trigonometric angle modes:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "polygonTurns" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">
                  REGULAR POLYGON EXTERIOR TURNING FORMULA: TURN = 360° / N
                </text>

                {/* Polygons Row */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#0f172a" stroke="#14b8a6" />

                  {/* Triangle */}
                  <rect x="25" y="30" width="175" height="190" rx="6" fill="#042f2e" stroke="#2dd4bf" />
                  <text x="35" y="55" fill="#5eead4" fontSize="11" fontWeight="bold">Triangle (N=3)</text>
                  <polygon points="112,85 70,150 155,150" fill="none" stroke="#2dd4bf" strokeWidth="2" />
                  <text x="35" y="180" fill="#ccfbf1" fontSize="8">• Interior: 60°</text>
                  <text x="35" y="200" fill="#86efac" fontSize="8" fontWeight="bold">Turn: 360/3 = 120° ✅</text>

                  {/* Square */}
                  <rect x="220" y="30" width="175" height="190" rx="6" fill="#082f49" stroke="#38bdf8" />
                  <text x="230" y="55" fill="#38bdf8" fontSize="11" fontWeight="bold">Square (N=4)</text>
                  <rect x="267" y="90" width="60" height="60" fill="none" stroke="#38bdf8" strokeWidth="2" />
                  <text x="230" y="180" fill="#bae6fd" fontSize="8">• Interior: 90°</text>
                  <text x="230" y="200" fill="#86efac" fontSize="8" fontWeight="bold">Turn: 360/4 = 90° ✅</text>

                  {/* Pentagon */}
                  <rect x="415" y="30" width="175" height="190" rx="6" fill="#1e1b4b" stroke="#a855f7" />
                  <text x="425" y="55" fill="#c084fc" fontSize="11" fontWeight="bold">Pentagon (N=5)</text>
                  <polygon points="502,85 540,115 525,155 480,155 465,115" fill="none" stroke="#c084fc" strokeWidth="2" />
                  <text x="425" y="180" fill="#d8b4fe" fontSize="8">• Interior: 108°</text>
                  <text x="425" y="200" fill="#86efac" fontSize="8" fontWeight="bold">Turn: 360/5 = 72° ✅</text>

                  {/* Hexagon */}
                  <rect x="610" y="30" width="185" height="190" rx="6" fill="#451a03" stroke="#f59e0b" />
                  <text x="620" y="55" fill="#fbbf24" fontSize="11" fontWeight="bold">Hexagon (N=6)</text>
                  <polygon points="702,85 737,105 737,140 702,160 667,140 667,105" fill="none" stroke="#fbbf24" strokeWidth="2" />
                  <text x="620" y="180" fill="#fef3c7" fontSize="8">• Interior: 120°</text>
                  <text x="620" y="200" fill="#86efac" fontSize="8" fontWeight="bold">Turn: 360/6 = 60° ✅</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "starGeometry" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">
                  5-POINTED STAR (PENTAGRAM) TURNING ANGLE GEOMETRY
                </text>

                {/* Star Diagram */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#082f49" stroke="#0ea5e9" />

                  {/* Left: Star Drawing */}
                  <rect x="30" y="30" width="370" height="185" rx="6" fill="#0c4a6e" stroke="#38bdf8" />
                  <polygon
                    points="215,50 235,110 295,110 245,145 265,200 215,165 165,200 185,145 135,110 195,110"
                    fill="#0369a1"
                    stroke="#38bdf8"
                    strokeWidth="2"
                  />
                  <text x="40" y="55" fill="#ffffff" fontSize="11" fontWeight="bold">Star {`{5/2}`} Polygon</text>
                  <text x="40" y="200" fill="#bae6fd" fontSize="8">Completes 2 full revolutions (720° total)</text>

                  {/* Right: Math Derivation */}
                  <rect x="420" y="30" width="370" height="185" rx="6" fill="#1e1b4b" stroke="#a855f7" />
                  <text x="435" y="55" fill="#f3e8ff" fontSize="11" fontWeight="bold">Mathematical Derivation</text>
                  <text x="435" y="85" fill="#d8b4fe" fontSize="9" fontFamily="monospace">Total Turning = 2 * 360° = 720°</text>
                  <text x="435" y="110" fill="#d8b4fe" fontSize="9" fontFamily="monospace">Turn per vertex = 720° / 5 = 144°</text>
                  <text x="435" y="145" fill="#5eead4" fontSize="9" fontFamily="monospace">for _ in range(5):</text>
                  <text x="455" y="165" fill="#5eead4" fontSize="9" fontFamily="monospace">t.forward(150)</text>
                  <text x="455" y="185" fill="#5eead4" fontSize="9" fontFamily="monospace">t.right(144) # 144° Tip Turn</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">
                  DEGREES VS RADIANS ANGLE MODES IN PYTHON TURTLE
                </text>

                {/* Modes Comparison */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#1e1b4b" stroke="#a855f7" />

                  {/* Degrees Mode */}
                  <rect x="30" y="30" width="370" height="185" rx="6" fill="#042f2e" stroke="#2dd4bf" />
                  <text x="45" y="55" fill="#5eead4" fontSize="11" fontWeight="bold">screen.degrees() [Default]</text>
                  <text x="45" y="85" fill="#ccfbf1" fontSize="9">• Full circle = 360.0 degrees</text>
                  <text x="45" y="110" fill="#ccfbf1" fontSize="9">• East = 0.0° | North = 90.0°</text>
                  <text x="45" y="135" fill="#ccfbf1" fontSize="9">• West = 180.0° | South = 270.0°</text>
                  <text x="45" y="175" fill="#86efac" fontSize="9" fontWeight="bold">Best for visual art and school geometry ✅</text>

                  {/* Radians Mode */}
                  <rect x="420" y="30" width="370" height="185" rx="6" fill="#2e1065" stroke="#c084fc" />
                  <text x="435" y="55" fill="#f3e8ff" fontSize="11" fontWeight="bold">screen.radians() [Trigonometric]</text>
                  <text x="435" y="85" fill="#d8b4fe" fontSize="9">• Full circle = 2 * pi (6.28318...) radians</text>
                  <text x="435" y="110" fill="#d8b4fe" fontSize="9">• East = 0.0 rad | North = pi/2 rad</text>
                  <text x="435" y="135" fill="#d8b4fe" fontSize="9">• West = pi rad | South = 3*pi/2 rad</text>
                  <text x="435" y="175" fill="#fde047" fontSize="9" fontWeight="bold">Best for scientific calculus &amp; physics 🔬</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE MULTI-ANGLE POLYGON STUDIO */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧪</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Multi-Angle Polygon &amp; Star Studio
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Select a regular polygon or star shape. Step through each edge and turn in real time to observe the exact exterior angle rotation in action:
          </p>

          <div className="bg-slate-950 p-5 sm:p-6 rounded-xl border border-slate-800/90 space-y-6">
            {/* Shape Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {Object.keys(shapeSpecs).map((k) => (
                <button
                  key={k}
                  onClick={() => handleResetShape(k)}
                  className={clsx(
                    "p-2.5 rounded-xl border text-xs font-bold capitalize transition-all text-center",
                    selectedShapeType === k
                      ? "bg-teal-900/80 border-teal-500 text-teal-200 shadow-md shadow-teal-950/50"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  )}
                >
                  {shapeSpecs[k].name}
                </button>
              ))}
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 p-3 rounded-xl border border-slate-800">
              <div className="text-xs font-mono text-slate-300">
                Shape: <strong className="text-teal-300">{currentSpec.name}</strong> | Exterior Turn: <strong className="text-cyan-300">{currentSpec.turnAngle}°</strong> | Step: <strong className="text-purple-300">{currentStepIndex} / {currentSpec.sides}</strong>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleNextStep}
                  className="px-4 py-1.5 bg-teal-950/80 border border-teal-600 rounded-lg text-xs font-bold text-teal-300 hover:bg-teal-900 transition-all"
                >
                  {currentStepIndex >= currentSpec.sides ? "Restart Shape ↺" : "Draw Next Side ⏩"}
                </button>

                <button
                  onClick={() => setCurrentStepIndex(0)}
                  className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs font-bold text-slate-300 hover:bg-slate-700 transition-all"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Simulated Canvas Viewport */}
            <div className="relative w-full h-64 bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden flex items-center justify-center">
              <svg viewBox="-100 -75 200 150" className="w-full h-full">
                {/* Center Origin */}
                <circle cx="0" cy="0" r="3" fill="#64748b" />
                <line x1="-90" y1="0" x2="90" y2="0" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="0" y1="-65" x2="0" y2="65" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />

                {/* Drawn Points Path */}
                {points.length > 1 && (
                  <polyline
                    points={points.map((p) => `${p.x},${-p.y}`).join(" ")}
                    fill="none"
                    stroke="#2dd4bf"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}

                {/* Turtle Cursor */}
                <g
                  transform={`translate(${curX}, ${-curY}) rotate(${-curHeading})`}
                  className="transition-transform duration-200 ease-out"
                >
                  <polygon
                    points="8,0 -5,-5 -2,0 -5,5"
                    fill="#38bdf8"
                    stroke="#0284c7"
                    strokeWidth="1.5"
                    className="animate-glow-teal"
                  />
                </g>
              </svg>
            </div>

            {/* Angular Telemetry Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center">
                <div className="text-[10px] text-teal-400 uppercase font-mono">Exterior Turn Angle</div>
                <div className="text-base font-bold font-mono text-teal-200">{currentSpec.turnAngle}°</div>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center">
                <div className="text-[10px] text-cyan-400 uppercase font-mono">Interior Corner Angle</div>
                <div className="text-base font-bold font-mono text-cyan-200">{currentSpec.interior}°</div>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center">
                <div className="text-[10px] text-purple-400 uppercase font-mono">Current Turtle Heading</div>
                <div className="text-base font-bold font-mono text-purple-200">{curHeading}°</div>
              </div>
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
              4. Production Code Labs &amp; Angular Geometry Suites
            </h2>
          </div>

          <p className="text-slate-300 mb-8 text-base leading-relaxed">
            Inspect, run, and master all four production-grade rotation labs covering relative turning, absolute heading bearings, polygon geometry derivations, and multi-angle campus compass navigation:
          </p>

          <div className="space-y-10">
            {/* Python Loader 1 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-teal-300">
                  Lab 1: Relative Rotations &amp; Regular Polygon Exterior Angles
                </h3>
                <p className="text-sm text-slate-400">
                  Turning counter-clockwise (<code className="text-teal-300 font-mono">left()</code>) and clockwise (<code className="text-teal-300 font-mono">right()</code>) with polygon formulas.
                </p>
              </div>
              <PythonFileLoader
                fileModule={relRotationsCode}
                title="relative_rotations_left_and_right.py"
                highlightLines={[16, 26, 38, 52]}
              />
            </div>

            {/* Python Loader 2 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-cyan-300">
                  Lab 2: Absolute setheading() &amp; Degrees vs Radians Mode Switching
                </h3>
                <p className="text-sm text-slate-400">
                  Orienting directional bearings directly and managing trigonometric radian angles.
                </p>
              </div>
              <PythonFileLoader
                fileModule={absHeadingCode}
                title="absolute_setheading_and_radians_mode.py"
                highlightLines={[16, 26, 38]}
              />
            </div>

            {/* Python Loader 3 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-purple-300">
                  Lab 3: Interior vs Exterior Angles &amp; 5-Pointed Star Geometry
                </h3>
                <p className="text-sm text-slate-400">
                  Comparing interior polygon corners with exterior turns and deriving star polygon tip angles.
                </p>
              </div>
              <PythonFileLoader
                fileModule={polygonGeomCode}
                title="angular_normalization_and_polygon_geometry.py"
                highlightLines={[16, 26, 38]}
              />
            </div>

            {/* Python Loader 4 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-amber-300">
                  Lab 4: Institutional Campus Radial Compass Navigator Case Study
                </h3>
                <p className="text-sm text-slate-400">
                  Directing student communications along radial compass bearings across Barrackpore, Kolkata, and Ichapur.
                </p>
              </div>
              <PythonFileLoader
                fileModule={compassCaseCode}
                title="institutional_multi_angle_compass_case_study.py"
                highlightLines={[18, 30, 44, 58]}
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
              5. Rotation &amp; Angular Geometry Pitfalls &amp; Anti-Patterns
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pitfall 1 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                1. Turning by Interior Angles
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Turning 60° for a triangle creates a hexagon instead of closing a 3-sided triangle.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # FIX: Turn by 360/3 = 120° (Exterior Angle)
              </pre>
            </div>

            {/* Pitfall 2 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                2. Passing Radians in Degrees Mode
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Calling <code className="text-rose-400 font-mono">t.left(3.14159)</code> while in default degrees mode turns only ~3 degrees instead of 180°.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # FIX: Use screen.radians() before radian turns
              </pre>
            </div>

            {/* Pitfall 3 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                3. Confusing left() and right()
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Remembering that <code className="text-teal-300 font-mono">left()</code> is counter-clockwise (+angle) and <code className="text-teal-300 font-mono">right()</code> is clockwise (-angle).
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # REMEMBER: left = counter-clockwise (CCW)
              </pre>
            </div>

            {/* Pitfall 4 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                4. Forgetting Modulo 360 Normalization
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Angles exceeding 360° or below 0° should be normalized with <code className="text-rose-400 font-mono">angle % 360</code> for clean telemetry comparisons.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # FIX: normalized_angle = angle % 360.0
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
              6. Rotation &amp; Angular Geometry Best Practices Checklist
            </h2>
          </div>

          <div className="space-y-3 text-slate-300 text-sm sm:text-base">
            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Apply Exterior Angle Formula:</strong> Always compute <code className="text-teal-300 font-mono">turn = 360 / N</code> for closed polygons.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Choose Relative vs Absolute Wisely:</strong> Use <code className="text-teal-300 font-mono">left()</code> for shapes and <code className="text-teal-300 font-mono">setheading()</code> for compass bearings.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Use Star Polygon Formula:</strong> For 5-pointed stars, turn by <code className="text-teal-300 font-mono">720 / 5 = 144°</code>.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Verify Heading Telemetry:</strong> Check <code className="text-teal-300 font-mono">t.heading()</code> when debugging complex rotational spiraling rosettes.
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQS */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <FAQTemplate
            title="Rotation Control &amp; Angular Geometry FAQs"
            questions={questions}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: PLAIN TEXT PRINT & DOWNLOAD NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <PlainTextPrint
            content={noteText}
            title="Topic 6: Rotation Control Study Note"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Study Note"
            downloadFileName="topic6_note.txt"
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 9: TEACHER'S NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <Teacher
            note={
              "Understanding exterior angles was a true 'Eureka!' moment for Mamata, Mahima, and Susmita during our creative geometry workshops in Barrackpore and Kolkata. Once students realize that the turtle turns by the exterior angle (360° / N), they can effortlessly draw any shape in the universe—from 3-sided triangles to 100-sided mandalas. Keep calculating those angles and watch your geometry come alive!"
            }
          />
        </section>

      </div>
    </div>
  );
}