import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import cursorTelemetryCode from "./topic4_files/turtle_cursor_position_and_heading.py?raw";
import visibilityPerfCode from "./topic4_files/cursor_visibility_and_performance.py?raw";
import penStateCode from "./topic4_files/turtle_pen_state_and_trail_control.py?raw";
import hudCaseCode from "./topic4_files/institutional_cursor_hud_case_study.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic4_files/topic4_note.txt?raw";

// FAQ Questions
import questions from "./topic4_files/topic4_questions";

/**
 * Topic4: Turtle cursor (pen) behavior: position, heading, visibility (showturtle(), hideturtle())
 * Module: 005_001_turtle-foundation
 * Segment: 5 (Python Turtle & Creative Graphics Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic4() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("compassRadar");

  // Interactive Laboratory State: Real-Time Cursor HUD
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);
  const [headingDeg, setHeadingDeg] = useState(0); // 0 = East
  const [isPenDown, setIsPenDown] = useState(true);
  const [isCursorVisible, setIsCursorVisible] = useState(true);
  const [penStrokeWidth, setPenStrokeWidth] = useState(3);
  const [penColorHex, setPenColorHex] = useState("#2dd4bf");

  const [pathSegments, setPathSegments] = useState([]);

  const handleStepForward = (dist = 40) => {
    const rad = (headingDeg * Math.PI) / 180;
    const newX = Math.round(cursorX + dist * Math.cos(rad));
    const newY = Math.round(cursorY + dist * Math.sin(rad));

    if (isPenDown) {
      setPathSegments((prev) => [
        ...prev,
        { x1: cursorX, y1: cursorY, x2: newX, y2: newY, stroke: penColorHex, width: penStrokeWidth }
      ]);
    }

    setCursorX(newX);
    setCursorY(newY);
  };

  const handleSetHeading = (deg) => {
    setHeadingDeg(deg % 360);
  };

  const handleResetHUD = () => {
    setCursorX(0);
    setCursorY(0);
    setHeadingDeg(0);
    setIsPenDown(true);
    setIsCursorVisible(true);
    setPathSegments([]);
  };

  const getCompassDirection = (deg) => {
    const norm = deg % 360;
    if (norm === 0) return "East (+X) [0°]";
    if (norm === 90) return "North (+Y) [90°]";
    if (norm === 180) return "West (-X) [180°]";
    if (norm === 270) return "South (-Y) [270°]";
    return `${norm}° Custom`;
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
            Topic 4
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Python Turtle &amp; Creative Graphics Programming
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Turtle Cursor (Pen) Behavior: <span className="text-teal-400">Position, Heading &amp; Visibility</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master complete telemetry and control over the Turtle cursor and drawing pen: querying coordinate positions (<code className="text-teal-300 font-mono">pos()</code>, <code className="text-teal-300 font-mono">xcor()</code>, <code className="text-teal-300 font-mono">ycor()</code>), compass heading angles (<code className="text-teal-300 font-mono">heading()</code>, <code className="text-teal-300 font-mono">setheading()</code>), toggling cursor visibility (<code className="text-teal-300 font-mono">showturtle()</code>, <code className="text-teal-300 font-mono">hideturtle()</code>) for 5x rendering speedups, and managing pen states (<code className="text-teal-300 font-mono">penup()</code>, <code className="text-teal-300 font-mono">pendown()</code>, <code className="text-teal-300 font-mono">isdown()</code>).
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🧭 Compass Heading Angles (0°-360°)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ hideturtle() 5x Speedup
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🖊️ penup() / pendown() Trail Physics
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📊 Real-Time HUD Telemetry
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
              1. The Cursor &amp; Pen Telemetry Architecture
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              The Turtle cursor combines geometric position telemetry with drawing state management. Understanding these methods enables precise vector navigation:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ Position Telemetry</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">pos(), xcor(), ycor()</code>
                <p className="text-[11px] text-slate-300">
                  Inspect the turtle's exact 2D Cartesian coordinates anytime with sub-pixel precision.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ Heading Telemetry</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">heading(), seth()</code>
                <p className="text-[11px] text-slate-300">
                  Query or orient the compass heading: 0° East, 90° North, 180° West, and 270° South.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ Visibility Speedup</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">hideturtle(), ht()</code>
                <p className="text-[11px] text-slate-300">
                  Hides the cursor icon, eliminating Tkinter redraw overhead and accelerating loop execution 3x to 5x.
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 shadow-lg">
                <div className="text-amber-400 font-bold text-sm mb-1">4️⃣ Pen State Physics</div>
                <code className="text-xs font-mono text-amber-300 block mb-1">penup(), pendown()</code>
                <p className="text-[11px] text-slate-300">
                  Controls ink trail deposition: lift pen for transit, lower pen for drawing discrete geometric segments.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Performance Impact of hideturtle()
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                When rendering complex mandalas, fractals, or simulations with 5,000+ steps, always call <span className="text-emerald-400 font-bold">t.hideturtle()</span> at the start! This prevents Tkinter from recomputing cursor matrix transformations on every single frame.
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
                2. Visualizing Compass Heading, Performance &amp; Pen Trails
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("compassRadar")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "compassRadar"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              &gt;
                Compass Heading Radar
              </button>
              <button
                onClick={() => setActiveInteractiveTab("renderBenchmark")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "renderBenchmark"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              &gt;
                Visibility 5x Speed Benchmark
              </button>
              <button
                onClick={() => setActiveInteractiveTab("penTrailPhysics")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "penTrailPhysics"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              &gt;
                penup() / pendown() Trail Physics
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining compass heading angular radars, render time benchmarks, and pen state physics:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "compassRadar" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">
                  TURTLE COMPASS HEADING ANGULAR RADAR (0° TO 360°)
                </text>

                {/* Radar Grid */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#0f172a" stroke="#14b8a6" />

                  {/* Left: Radar Circle */}
                  <circle cx="200" cy="122" r="85" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 4" fill="#082f49" />
                  <circle cx="200" cy="122" r="5" fill="#ffffff" />

                  {/* Axes */}
                  <line x1="85" y1="122" x2="315" y2="122" stroke="#475569" strokeWidth="1.5" />
                  <line x1="200" y1="25" x2="200" y2="220" stroke="#475569" strokeWidth="1.5" />

                  {/* Compass Labels */}
                  <text x="290" y="115" fill="#2dd4bf" fontSize="11" fontWeight="bold">0° East (+X)</text>
                  <text x="160" y="20" fill="#38bdf8" fontSize="11" fontWeight="bold">90° North (+Y)</text>
                  <text x="88" y="115" fill="#c084fc" fontSize="11" fontWeight="bold">180° West (-X)</text>
                  <text x="160" y="235" fill="#fbbf24" fontSize="11" fontWeight="bold">270° South (-Y)</text>

                  {/* Sample Heading Vector at 45 deg */}
                  <line x1="200" y1="122" x2="260" y2="62" stroke="#facc15" strokeWidth="3" markerEnd="url(#arrow)" />
                  <text x="240" y="55" fill="#facc15" fontSize="9" fontWeight="bold">setheading(45)</text>

                  {/* Right: Code Summary Box */}
                  <rect x="420" y="30" width="370" height="185" rx="6" fill="#042f2e" stroke="#2dd4bf" />
                  <text x="435" y="55" fill="#5eead4" fontSize="11" fontWeight="bold">Heading Methods in Python</text>
                  <text x="435" y="85" fill="#ccfbf1" fontSize="9" fontFamily="monospace">t.heading()       # Returns current angle float</text>
                  <text x="435" y="110" fill="#ccfbf1" fontSize="9" fontFamily="monospace">t.setheading(90)  # Points North (+Y)</text>
                  <text x="435" y="135" fill="#ccfbf1" fontSize="9" fontFamily="monospace">t.setheading(180) # Points West (-X)</text>
                  <text x="435" y="160" fill="#ccfbf1" fontSize="9" fontFamily="monospace">t.setheading(270) # Points South (-Y)</text>
                  <text x="435" y="195" fill="#86efac" fontSize="8" fontWeight="bold">Angles automatically normalize modulo 360° ✅</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "renderBenchmark" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">
                  CURSOR VISIBILITY PERFORMANCE BENCHMARK (1,000 ITERATIONS)
                </text>

                {/* Benchmark Bar Chart */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#082f49" stroke="#0ea5e9" />

                  {/* Bar 1: Visible Cursor (Slow) */}
                  <text x="35" y="45" fill="#ffffff" fontSize="11" fontWeight="bold">
                    1. Cursor Visible (showturtle) - 1,250 ms (Slow)
                  </text>
                  <rect x="35" y="60" width="650" height="35" rx="4" fill="#4c0519" stroke="#f43f5e" />
                  <text x="45" y="82" fill="#ffe4e6" fontSize="10" fontWeight="bold">
                    1,250 ms (Tkinter constantly rotates and repaints cursor polygon icon)
                  </text>

                  {/* Bar 2: Hidden Cursor (Fast) */}
                  <text x="35" y="130" fill="#ffffff" fontSize="11" fontWeight="bold">
                    2. Cursor Hidden (hideturtle) - 250 ms (5.0x Faster! 🚀)
                  </text>
                  <rect x="35" y="145" width="130" height="35" rx="4" fill="#064e3b" stroke="#34d399" />
                  <text x="175" y="167" fill="#86efac" fontSize="10" fontWeight="bold">
                    250 ms (Zero cursor icon redraw overhead)
                  </text>

                  <rect x="35" y="200" width="750" height="30" rx="4" fill="#0c4a6e" stroke="#0284c7" />
                  <text x="45" y="220" fill="#e0f2fe" fontSize="9">
                    💡 Rule: Always call t.hideturtle() for complex fractals, mandalas, and multi-agent physics!
                  </text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">
                  PEN STATE PHYSICS: PENUP() TRANSIT VS PENDOWN() DRAWING
                </text>

                {/* Trail Physics Layout */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#1e1b4b" stroke="#a855f7" />

                  {/* Segment 1: Drawing */}
                  <rect x="30" y="30" width="220" height="185" rx="6" fill="#042f2e" stroke="#2dd4bf" />
                  <text x="40" y="55" fill="#5eead4" fontSize="11" fontWeight="bold">1. pendown() Active</text>
                  <line x1="50" y1="120" x2="200" y2="120" stroke="#2dd4bf" strokeWidth="4" />
                  <text x="40" y="85" fill="#ccfbf1" fontSize="8">• t.isdown() == True</text>
                  <text x="40" y="105" fill="#ccfbf1" fontSize="8">• Stroke: 4px Teal</text>
                  <text x="40" y="165" fill="#86efac" fontSize="8" fontWeight="bold">Active Vector Drawing ✅</text>

                  {/* Segment 2: Transit (penup) */}
                  <rect x="290" y="30" width="230" height="185" rx="6" fill="#451a03" stroke="#f59e0b" />
                  <text x="300" y="55" fill="#fbbf24" fontSize="11" fontWeight="bold">2. penup() In Transit</text>
                  <line x1="310" y1="120" x2="460" y2="120" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" />
                  <text x="300" y="85" fill="#fef3c7" fontSize="8">• t.isdown() == False</text>
                  <text x="300" y="105" fill="#fef3c7" fontSize="8">• Pen lifted from canvas</text>
                  <text x="300" y="165" fill="#fde047" fontSize="8" fontWeight="bold">Clean Jump Without Trails ✈️</text>

                  {/* Segment 3: Resume Drawing */}
                  <rect x="560" y="30" width="230" height="185" rx="6" fill="#082f49" stroke="#38bdf8" />
                  <text x="570" y="55" fill="#38bdf8" fontSize="11" fontWeight="bold">3. pendown() Resumed</text>
                  <line x1="580" y1="120" x2="730" y2="120" stroke="#38bdf8" strokeWidth="4" />
                  <text x="570" y="85" fill="#bae6fd" fontSize="8">• t.pendown() called</text>
                  <text x="570" y="105" fill="#bae6fd" fontSize="8">• New discrete polygon</text>
                  <text x="570" y="165" fill="#86efac" fontSize="8" fontWeight="bold">New Shape Started ✅</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE REAL-TIME CURSOR HUD STUDIO */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧪</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Real-Time Cursor HUD Studio
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Direct the virtual turtle cursor and observe real-time telemetry updates. Toggle pen states, orient compass headings, and test visibility modes:
          </p>

          <div className="bg-slate-950 p-5 sm:p-6 rounded-xl border border-slate-800/90 space-y-6">
            {/* Action Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              <button
                onClick={() => handleStepForward(40)}
                className="p-2.5 bg-teal-950/80 border border-teal-600 rounded-xl text-xs font-bold text-teal-300 hover:bg-teal-900 transition-all text-center"
              &gt;
                Forward 40 px 🚀
              </button>

              <button
                onClick={() => setIsPenDown(!isPenDown)}
                className={clsx(
                  "p-2.5 rounded-xl border text-xs font-bold transition-all text-center",
                  isPenDown
                    ? "bg-emerald-950/80 border-emerald-500 text-emerald-300"
                    : "bg-amber-950/80 border-amber-500 text-amber-300"
                )}
              &gt;
                Pen: {isPenDown ? "DOWN (Draw)" : "UP (Transit)"}
              </button>

              <button
                onClick={() => setIsCursorVisible(!isCursorVisible)}
                className={clsx(
                  "p-2.5 rounded-xl border text-xs font-bold transition-all text-center",
                  isCursorVisible
                    ? "bg-cyan-950/80 border-cyan-500 text-cyan-300"
                    : "bg-purple-950/80 border-purple-500 text-purple-300"
                )}
              &gt;
                Cursor: {isCursorVisible ? "VISIBLE" : "HIDDEN (Fast)"}
              </button>

              <button
                onClick={handleResetHUD}
                className="p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-bold text-slate-300 hover:bg-slate-800 transition-all text-center"
              >
                Reset Studio 🔄
              </button>

              {/* Heading Presets */}
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                {[0, 90, 180, 270].map((deg) => (
                  <button
                    key={deg}
                    onClick={() => handleSetHeading(deg)}
                    className={clsx(
                      "flex-1 py-1 rounded text-[10px] font-mono transition-all",
                      headingDeg === deg ? "bg-teal-800 text-white font-bold" : "text-slate-400 hover:text-white"
                    )}
                  &gt;
                    {deg}°
                  </button>
                ))}
              </div>
            </div>

            {/* Real-Time Telemetry HUD Overlay Bar */}
            <div className="bg-slate-900/90 border border-teal-900/60 p-3.5 rounded-xl grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <div className="text-[10px] text-teal-400 uppercase font-mono">Position (X, Y)</div>
                <div className="text-base font-bold font-mono text-teal-200">({cursorX}, {cursorY})</div>
              </div>
              <div>
                <div className="text-[10px] text-cyan-400 uppercase font-mono">Heading Angle</div>
                <div className="text-base font-bold font-mono text-cyan-200">{getCompassDirection(headingDeg)}</div>
              </div>
              <div>
                <div className="text-[10px] text-purple-400 uppercase font-mono">Pen State</div>
                <div className="text-base font-bold font-mono text-purple-200">{isPenDown ? "DOWN (Active)" : "UP (Transit)"}</div>
              </div>
              <div>
                <div className="text-[10px] text-amber-400 uppercase font-mono">Cursor Visibility</div>
                <div className="text-base font-bold font-mono text-amber-200">{isCursorVisible ? "VISIBLE" : "HIDDEN"}</div>
              </div>
            </div>

            {/* Simulated Canvas Viewport */}
            <div className="relative w-full h-64 bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden flex items-center justify-center">
              <svg viewBox="-150 -100 300 200" className="w-full h-full">
                {/* Center Origin */}
                <circle cx="0" cy="0" r="3" fill="#64748b" />
                <line x1="-140" y1="0" x2="140" y2="0" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="0" y1="-90" x2="0" y2="90" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />

                {/* Path Segments */}
                {pathSegments.map((seg, idx) => (
                  <line
                    key={idx}
                    x1={seg.x1}
                    y1={-seg.y1}
                    x2={seg.x2}
                    y2={-seg.y2}
                    stroke={seg.stroke}
                    strokeWidth={seg.width}
                    strokeLinecap="round"
                  />
                ))}

                {/* Turtle Cursor Icon (if visible) */}
                {isCursorVisible && (
                  <g
                    transform={`translate(${cursorX}, ${-cursorY}) rotate(${-headingDeg})`}
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
                )}
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
              4. Production Code Labs &amp; Cursor Telemetry Suites
            </h2>
          </div>

          <p className="text-slate-300 mb-8 text-base leading-relaxed">
            Inspect, run, and master all four production-grade cursor behavior labs covering coordinate inspection, visibility benchmarking, pen state physics, and real-time HUD telemetry:
          </p>

          <div className="space-y-10">
            {/* Python Loader 1 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-teal-300">
                  Lab 1: Position Coordinates &amp; Compass Heading Telemetry
                </h3>
                <p className="text-sm text-slate-400">
                  Querying coordinates (<code className="text-teal-300 font-mono">pos()</code>, <code className="text-teal-300 font-mono">xcor()</code>, <code className="text-teal-300 font-mono">ycor()</code>) and compass directions (0° to 270°).
                </p>
              </div>
              <PythonFileLoader
                fileModule={cursorTelemetryCode}
                title="turtle_cursor_position_and_heading.py"
                highlightLines={[16, 26, 38, 52]}
              />
            </div>

            {/* Python Loader 2 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-cyan-300">
                  Lab 2: Cursor Visibility Control &amp; Rendering Speedup Benchmarks
                </h3>
                <p className="text-sm text-slate-400">
                  Benchmarking execution latency with <code className="text-cyan-300 font-mono">hideturtle()</code> vs visible cursor redraws.
                </p>
              </div>
              <PythonFileLoader
                fileModule={visibilityPerfCode}
                title="cursor_visibility_and_performance.py"
                highlightLines={[16, 26, 36]}
              />
            </div>

            {/* Python Loader 3 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-purple-300">
                  Lab 3: Pen State Control, Widths &amp; Discrete Segment Generation
                </h3>
                <p className="text-sm text-slate-400">
                  Managing pen up/down mechanics, checking status with <code className="text-purple-300 font-mono">isdown()</code>, and customizing stroke widths.
                </p>
              </div>
              <PythonFileLoader
                fileModule={penStateCode}
                title="turtle_pen_state_and_trail_control.py"
                highlightLines={[16, 26, 38, 52]}
              />
            </div>

            {/* Python Loader 4 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-amber-300">
                  Lab 4: Institutional Real-Time Cursor Telemetry HUD Case Study
                </h3>
                <p className="text-sm text-slate-400">
                  Generating real-time HUD telemetry overlays tracking Mamata, Mahima, and Susmita across Barrackpore and Kolkata.
                </p>
              </div>
              <PythonFileLoader
                fileModule={hudCaseCode}
                title="institutional_cursor_hud_case_study.py"
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
              5. Cursor &amp; Pen Pitfalls &amp; Anti-Patterns
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pitfall 1 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                1. Visible Cursor in Heavy Loops
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Leaving the cursor visible while rendering 10,000-segment fractals causes extreme UI lag due to Tkinter redraws.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # FIX: t.hideturtle() before starting heavy loops
              </pre>
            </div>

            {/* Pitfall 2 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                2. Moving Without penup()
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Calling <code className="text-rose-400 font-mono">goto()</code> to transit across the canvas without lifting the pen leaves ugly connector lines.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # FIX: t.penup(); t.goto(x, y); t.pendown()
              </pre>
            </div>

            {/* Pitfall 3 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                3. Assuming 0° Points North
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                In standard nautical compasses 0° is North, but in Turtle Graphics 0° is East (+X) and 90° is North (+Y).
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # REMEMBER: 0° is East; 90° is North
              </pre>
            </div>

            {/* Pitfall 4 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                4. Forgetting to Restore Heading
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Calling recursive functions without restoring original turtle heading angles produces distorted geometric trees.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # FIX: Save heading with h = t.heading() and restore
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
              6. Cursor &amp; Pen Management Best Practices Checklist
            </h2>
          </div>

          <div className="space-y-3 text-slate-300 text-sm sm:text-base">
            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Hide Cursor for Speed:</strong> Invoke <code className="text-teal-300 font-mono">t.hideturtle()</code> whenever drawing complex geometry.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Defensive Pen State:</strong> Always lift pen (<code className="text-teal-300 font-mono">penup()</code>) before moving to non-adjacent shapes.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Verify Heading Angles:</strong> Use <code className="text-teal-300 font-mono">t.heading()</code> to verify orientation after rotations.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Save &amp; Restore State:</strong> Cache position and heading when writing reusable geometric functions.
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQS */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <FAQTemplate
            title="Turtle Cursor &amp; Pen Telemetry FAQs"
            questions={questions}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: PLAIN TEXT PRINT & DOWNLOAD NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <PlainTextPrint
            content={noteText}
            title="Topic 4: Turtle Cursor Behavior & Telemetry Study Note"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Study Note"
            downloadFileName="topic4_note.txt"
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 9: TEACHER'S NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <Teacher
            note={
              "Mastering cursor telemetry is like having a flight dashboard for your code. When Mamata, Mahima, and Susmita started debugging their first multi-shape drawings at our Barrackpore and Kolkata centers, understanding that 0° points East and that hideturtle() eliminates redraw lag turned frustrating slow programs into silky-smooth, instantaneous art generators. Keep your pen state clean and your headings true!"
            }
          />
        </section>

      </div>
    </div>
  );
}