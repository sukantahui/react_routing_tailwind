import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import quadrantGeoCode from "./topic1_files/cartesian_plane_and_quadrant_geometry.py?raw";
import originMapCode from "./topic1_files/origin_and_coordinate_mapping.py?raw";
import screenBoundsCode from "./topic1_files/screen_bounds_and_clipping.py?raw";
import institutionalMapCode from "./topic1_files/institutional_quadrant_campus_map_case_study.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic1_files/topic1_note.txt?raw";

// FAQ Questions
import questions from "./topic1_files/topic1_questions";

/**
 * Topic1: Understanding the Turtle screen: canvas, coordinate system (Cartesian plane), origin (0,0), and quadrants
 * Module: 005_001_turtle-foundation
 * Segment: 5 (Python Turtle & Creative Graphics Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic1() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("quadrantGrid");

  // Interactive Laboratory State: Quadrant Explorer
  const [selectedPoint, setSelectedPoint] = useState({
    name: "Barrackpore (Mamata)",
    x: 120,
    y: 80,
    quadrant: "Quadrant I (+X, +Y) [Top-Right]",
    color: "#2dd4bf",
  });

  const presetPoints = [
    { name: "Barrackpore (Mamata)", x: 120, y: 80, quadrant: "Quadrant I (+X, +Y) [Top-Right]", color: "#2dd4bf" },
    { name: "Ichapur (Abhronila)", x: -120, y: 80, quadrant: "Quadrant II (-X, +Y) [Top-Left]", color: "#38bdf8" },
    { name: "Jadavpur (Susmita)", x: -120, y: -80, quadrant: "Quadrant III (-X, -Y) [Bottom-Left]", color: "#a855f7" },
    { name: "Kolkata (Mahima)", x: 120, y: -80, quadrant: "Quadrant IV (+X, -Y) [Bottom-Right]", color: "#facc15" },
    { name: "Central Origin", x: 0, y: 0, quadrant: "Origin Center (0, 0)", color: "#94a3b8" },
  ];

  const euclideanDistance = Math.round(
    Math.sqrt(selectedPoint.x * selectedPoint.x + selectedPoint.y * selectedPoint.y)
  );

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
            Topic 1
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Python Turtle &amp; Creative Graphics Programming
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Understanding the Turtle Screen: <span className="text-teal-400">Canvas &amp; Quadrants</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master the mathematical architecture of the 2D Cartesian coordinate plane in Python Turtle Graphics: center origin <code className="text-teal-300 font-mono">(0, 0)</code>, the four geometric quadrants (<span className="text-teal-300 font-mono">Q1 (+,+)</span>, <span className="text-cyan-300 font-mono">Q2 (-,+)</span>, <span className="text-purple-300 font-mono">Q3 (-,-)</span>, <span className="text-amber-300 font-mono">Q4 (+,-)</span>), position query methods (<code className="text-teal-300 font-mono">pos()</code>, <code className="text-teal-300 font-mono">xcor()</code>, <code className="text-teal-300 font-mono">ycor()</code>), Euclidean distance calculations (<code className="text-teal-300 font-mono">distance()</code>), and screen boundary clipping.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📐 4 Cartesian Quadrants (Q1-Q4)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🎯 Center Origin (0, 0) Mechanics
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📏 Euclidean Distance Formula
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🖼️ Viewport Dimensions &amp; Clipping
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
              1. The 2D Cartesian Coordinate Architecture
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Unlike raster graphics engines where (0,0) is placed at the top-left with an inverted Y-axis, Python Turtle uses standard mathematical Euclidean geometry with the origin placed at the screen center:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ Quadrant I</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">(+X, +Y) [Top-Right]</code>
                <p className="text-[11px] text-slate-300">
                  North-East sector. Both X and Y coordinates are positive (e.g. Barrackpore at +120, +80).
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ Quadrant II</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">(-X, +Y) [Top-Left]</code>
                <p className="text-[11px] text-slate-300">
                  North-West sector. Negative X and positive Y coordinates (e.g. Ichapur at -120, +80).
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ Quadrant III</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">(-X, -Y) [Bottom-Left]</code>
                <p className="text-[11px] text-slate-300">
                  South-West sector. Both X and Y coordinates are negative (e.g. Jadavpur at -120, -80).
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 shadow-lg">
                <div className="text-amber-400 font-bold text-sm mb-1">4️⃣ Quadrant IV</div>
                <code className="text-xs font-mono text-amber-300 block mb-1">(+X, -Y) [Bottom-Right]</code>
                <p className="text-[11px] text-slate-300">
                  South-East sector. Positive X and negative Y coordinates (e.g. Kolkata at +120, -80).
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                Querying Coordinates &amp; Calculating Distances
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                Inspect coordinates anytime via <code className="text-teal-300 font-mono">t.pos()</code>, <code className="text-teal-300 font-mono">t.xcor()</code>, and <code className="text-teal-300 font-mono">t.ycor()</code>. Calculate straight-line Euclidean displacement using <span className="text-emerald-400 font-bold">t.distance(target_x, target_y)</span>!
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
                2. Visualizing Quadrants, Vectors &amp; Viewport Boundaries
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("quadrantGrid")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "quadrantGrid"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              &gt;
                4 Cartesian Quadrants
              </button>
              <button
                onClick={() => setActiveInteractiveTab("distanceVectors")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "distanceVectors"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              &gt;
                Distance &amp; Vector Trigonometry
              </button>
              <button
                onClick={() => setActiveInteractiveTab("viewportBounds")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "viewportBounds"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              &gt;
                Screen Bounds &amp; Clipping Limits
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining the full geometric layout of the Cartesian canvas:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "quadrantGrid" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">
                  THE 4 CARTESIAN QUADRANTS &amp; CAMPUS COORDINATE WAYPOINTS
                </text>

                {/* Canvas Box */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#0f172a" stroke="#14b8a6" />

                  {/* Axes */}
                  <line x1="410" y1="20" x2="410" y2="225" stroke="#334155" strokeWidth="2" />
                  <line x1="20" y1="122" x2="800" y2="122" stroke="#334155" strokeWidth="2" />

                  {/* Quadrant II (Top Left) */}
                  <rect x="35" y="30" width="350" height="80" rx="4" fill="#082f49" stroke="#0284c7" />
                  <text x="45" y="55" fill="#38bdf8" fontSize="11" fontWeight="bold">Quadrant II (-X, +Y) [Top-Left]</text>
                  <text x="45" y="75" fill="#bae6fd" fontSize="9">📍 Ichapur Center: (-150, 100) • Abhronila</text>
                  <circle cx="260" cy="70" r="5" fill="#38bdf8" />

                  {/* Quadrant I (Top Right) */}
                  <rect x="435" y="30" width="350" height="80" rx="4" fill="#042f2e" stroke="#0d9488" />
                  <text x="445" y="55" fill="#2dd4bf" fontSize="11" fontWeight="bold">Quadrant I (+X, +Y) [Top-Right]</text>
                  <text x="445" y="75" fill="#a7f3d0" fontSize="9">📍 Barrackpore Campus: (150, 100) • Mamata</text>
                  <circle cx="560" cy="70" r="5" fill="#2dd4bf" />

                  {/* Quadrant III (Bottom Left) */}
                  <rect x="35" y="135" width="350" height="80" rx="4" fill="#3b0764" stroke="#a855f7" />
                  <text x="45" y="160" fill="#c084fc" fontSize="11" fontWeight="bold">Quadrant III (-X, -Y) [Bottom-Left]</text>
                  <text x="45" y="180" fill="#f3e8ff" fontSize="9">📍 Jadavpur Lab: (-150, -100) • Susmita</text>
                  <circle cx="260" cy="175" r="5" fill="#c084fc" />

                  {/* Quadrant IV (Bottom Right) */}
                  <rect x="435" y="135" width="350" height="80" rx="4" fill="#451a03" stroke="#f59e0b" />
                  <text x="445" y="160" fill="#fbbf24" fontSize="11" fontWeight="bold">Quadrant IV (+X, -Y) [Bottom-Right]</text>
                  <text x="445" y="180" fill="#fef3c7" fontSize="9">📍 Kolkata Headquarters: (150, -100) • Mahima</text>
                  <circle cx="560" cy="175" r="5" fill="#fbbf24" />

                  {/* Origin */}
                  <circle cx="410" cy="122" r="5" fill="#ffffff" stroke="#14b8a6" strokeWidth="2" />
                  <text x="418" y="118" fill="#ffffff" fontSize="9" fontWeight="bold">Origin (0,0)</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "distanceVectors" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">
                  EUCLIDEAN DISTANCE &amp; VECTOR DISPLACEMENT FROM ORIGIN (0, 0)
                </text>

                {/* Vector Layout */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#082f49" stroke="#0ea5e9" />

                  {/* Left: 3-4-5 Triangle */}
                  <rect x="30" y="30" width="370" height="190" rx="6" fill="#0c4a6e" stroke="#38bdf8" />
                  <text x="40" y="55" fill="#ffffff" fontSize="11" fontWeight="bold">Right Triangle Distance Theorem</text>
                  
                  {/* Origin to point */}
                  <line x1="80" y1="180" x2="260" y2="180" stroke="#2dd4bf" strokeWidth="3" />
                  <line x1="260" y1="180" x2="260" y2="80" stroke="#38bdf8" strokeWidth="3" />
                  <line x1="80" y1="180" x2="260" y2="80" stroke="#facc15" strokeWidth="3" strokeDasharray="5 5" />

                  <circle cx="80" cy="180" r="4" fill="#ffffff" />
                  <text x="60" y="195" fill="#bae6fd" fontSize="8">(0,0)</text>

                  <circle cx="260" cy="80" r="4" fill="#facc15" />
                  <text x="270" y="80" fill="#facc15" fontSize="8" fontWeight="bold">(120, 160)</text>

                  <text x="160" y="195" fill="#2dd4bf" fontSize="8">Δx = 120 px</text>
                  <text x="268" y="135" fill="#38bdf8" fontSize="8">Δy = 160 px</text>
                  <text x="140" y="125" fill="#facc15" fontSize="9" fontWeight="bold">Distance = 200 px (3-4-5)</text>

                  {/* Right: Formulas */}
                  <rect x="420" y="30" width="370" height="190" rx="6" fill="#042f2e" stroke="#2dd4bf" />
                  <text x="430" y="55" fill="#5eead4" fontSize="11" fontWeight="bold">Python Turtle Distance API</text>
                  <text x="430" y="85" fill="#ccfbf1" fontSize="9" fontFamily="monospace">t.distance(120, 160)  # Returns 200.0</text>
                  <text x="430" y="115" fill="#ccfbf1" fontSize="8">Mathematical Formula:</text>
                  <text x="430" y="135" fill="#a7f3d0" fontSize="9" fontFamily="monospace">distance = √((x₂ - x₁)² + (y₂ - y₁)²)</text>
                  <text x="430" y="170" fill="#86efac" fontSize="8">• Computes straight-line displacement</text>
                  <text x="430" y="190" fill="#86efac" fontSize="8">• Works with (x, y) coordinates or Turtle instances</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">
                  CANVAS BOUNDS (800x600) &amp; VIEWPORT CLIPPING BEHAVIOR
                </text>

                {/* Viewport Bounds Layout */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#1e1b4b" stroke="#a855f7" />

                  {/* Inner Window */}
                  <rect x="160" y="30" width="500" height="185" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />

                  {/* Top Edge */}
                  <text x="370" y="25" fill="#38bdf8" fontSize="9" fontWeight="bold">Top Edge: Y = +300 (height / 2)</text>
                  {/* Bottom Edge */}
                  <text x="360" y="232" fill="#38bdf8" fontSize="9" fontWeight="bold">Bottom Edge: Y = -300 (-height / 2)</text>
                  {/* Left Edge */}
                  <text x="25" y="125" fill="#38bdf8" fontSize="9" fontWeight="bold">Left: X = -400</text>
                  {/* Right Edge */}
                  <text x="680" y="125" fill="#38bdf8" fontSize="9" fontWeight="bold">Right: X = +400</text>

                  {/* In Bounds Point */}
                  <circle cx="410" cy="122" r="4" fill="#2dd4bf" />
                  <text x="418" y="120" fill="#5eead4" fontSize="8">Visible Center (0, 0) ✅</text>

                  {/* Off-screen Path */}
                  <line x1="550" y1="90" x2="720" y2="60" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 4" />
                  <circle cx="720" cy="60" r="4" fill="#f43f5e" />
                  <text x="730" y="65" fill="#fca5a5" fontSize="8" fontWeight="bold">Clipped (X: 520, Y: 180) ⚠️</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE QUADRANT EXPLORER */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧪</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Quadrant Coordinate Explorer
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Select student campus locations across Bengal to see coordinate sign classification, quadrant categorization, and real-time Euclidean distance from origin:
          </p>

          <div className="bg-slate-950 p-5 sm:p-6 rounded-xl border border-slate-800/90 space-y-6">
            {/* Location Selector Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {presetPoints.map((pt, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedPoint(pt)}
                  className={clsx(
                    "p-2.5 rounded-xl border text-xs font-bold transition-all text-center",
                    selectedPoint.name === pt.name
                      ? "bg-teal-950/80 border-teal-500 text-teal-200 shadow-md shadow-teal-950/50"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white"
                  )}
                &gt;
                  {pt.name}
                </button>
              ))}
            </div>

            {/* Metrics Dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-900/90 p-3 rounded-xl border border-teal-900/50 text-center">
                <div className="text-[11px] text-teal-400 font-medium">Coordinates (X, Y)</div>
                <div className="text-lg font-bold font-mono text-teal-300">
                  ({selectedPoint.x}, {selectedPoint.y})
                </div>
              </div>

              <div className="bg-slate-900/90 p-3 rounded-xl border border-cyan-900/50 text-center">
                <div className="text-[11px] text-cyan-400 font-medium">Cartesian Sector</div>
                <div className="text-xs font-bold text-cyan-300 mt-1">{selectedPoint.quadrant}</div>
              </div>

              <div className="bg-slate-900/90 p-3 rounded-xl border border-purple-900/50 text-center">
                <div className="text-[11px] text-purple-400 font-medium">Euclidean Distance to (0,0)</div>
                <div className="text-lg font-bold font-mono text-purple-300">{euclideanDistance} px</div>
              </div>
            </div>

            {/* Simulated 2D Coordinate Canvas */}
            <div className="relative w-full h-64 bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden flex items-center justify-center">
              <svg viewBox="-200 -120 400 240" className="w-full h-full">
                {/* Axes */}
                <line x1="-190" y1="0" x2="190" y2="0" stroke="#475569" strokeWidth="1.5" />
                <line x1="0" y1="-110" x2="0" y2="110" stroke="#475569" strokeWidth="1.5" />

                {/* Axis Labels */}
                <text x="175" y="-6" fill="#94a3b8" fontSize="8">+X</text>
                <text x="-190" y="-6" fill="#94a3b8" fontSize="8">-X</text>
                <text x="6" y="-98" fill="#94a3b8" fontSize="8">+Y</text>
                <text x="6" y="105" fill="#94a3b8" fontSize="8">-Y</text>

                {/* Origin */}
                <circle cx="0" cy="0" r="3" fill="#ffffff" />
                <text x="5" y="12" fill="#64748b" fontSize="7">(0,0)</text>

                {/* Vector Line from origin to selected point */}
                <line
                  x1="0"
                  y1="0"
                  x2={selectedPoint.x}
                  y2={-selectedPoint.y} // SVG Y is inverted
                  stroke={selectedPoint.color}
                  strokeWidth="2.5"
                  strokeDasharray="4 4"
                />

                {/* Active Waypoint Dot */}
                <circle
                  cx={selectedPoint.x}
                  cy={-selectedPoint.y}
                  r="6"
                  fill={selectedPoint.color}
                  className="animate-glow-teal"
                />

                {/* Label */}
                <text
                  x={selectedPoint.x + 8}
                  y={-selectedPoint.y + 4}
                  fill={selectedPoint.color}
                  fontSize="8"
                  fontWeight="bold"
                >
                  {selectedPoint.name} ({selectedPoint.x}, {selectedPoint.y})
                </text>
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
              4. Production Code Labs &amp; Quadrant Geometry Suites
            </h2>
          </div>

          <p className="text-slate-300 mb-8 text-base leading-relaxed">
            Inspect, run, and master all four production-grade coordinate geometry labs covering quadrant classification, position inspection, boundary audits, and multi-campus waypoint maps:
          </p>

          <div className="space-y-10">
            {/* Python Loader 1 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-teal-300">
                  Lab 1: Cartesian Plane &amp; 4-Quadrant Geometric Classification
                </h3>
                <p className="text-sm text-slate-400">
                  Detecting and classifying points across Quadrants I, II, III, IV, axes, and central origin.
                </p>
              </div>
              <PythonFileLoader
                fileModule={quadrantGeoCode}
                title="cartesian_plane_and_quadrant_geometry.py"
                highlightLines={[16, 26, 38, 52]}
              />
            </div>

            {/* Python Loader 2 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-cyan-300">
                  Lab 2: Coordinate Mapping, Position Queries &amp; Euclidean Distance
                </h3>
                <p className="text-sm text-slate-400">
                  Using <code className="text-cyan-300 font-mono">pos()</code>, <code className="text-cyan-300 font-mono">xcor()</code>, <code className="text-cyan-300 font-mono">ycor()</code>, and <code className="text-cyan-300 font-mono">distance()</code> with right-triangle verification.
                </p>
              </div>
              <PythonFileLoader
                fileModule={originMapCode}
                title="origin_and_coordinate_mapping.py"
                highlightLines={[16, 28, 42, 54]}
              />
            </div>

            {/* Python Loader 3 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-purple-300">
                  Lab 3: Screen Dimensions, Viewport Limits &amp; Clipping Auditing
                </h3>
                <p className="text-sm text-slate-400">
                  Calculating bounding limits (<code className="text-purple-300 font-mono">+/- width/2</code> and <code className="text-purple-300 font-mono">+/- height/2</code>) and auditing visible vs clipped coordinates.
                </p>
              </div>
              <PythonFileLoader
                fileModule={screenBoundsCode}
                title="screen_bounds_and_clipping.py"
                highlightLines={[16, 26, 36]}
              />
            </div>

            {/* Python Loader 4 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-amber-300">
                  Lab 4: Institutional Student Campus Quadrant Registry Case Study
                </h3>
                <p className="text-sm text-slate-400">
                  Multi-campus quadrant registry mapping Mamata, Abhronila, Susmita, and Mahima across Barrackpore, Ichapur, Jadavpur, and Kolkata.
                </p>
              </div>
              <PythonFileLoader
                fileModule={institutionalMapCode}
                title="institutional_quadrant_campus_map_case_study.py"
                highlightLines={[18, 32, 48, 62]}
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
              5. Coordinate System Pitfalls &amp; Anti-Patterns
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pitfall 1 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                1. Confusing Center (0, 0) with Top-Left
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Assuming (0, 0) is at the top-left corner (like Pygame or HTML Canvas) causes drawings to start at the center unintentionally.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # REMEMBER: Turtle (0, 0) is the center of the window!
              </pre>
            </div>

            {/* Pitfall 2 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                2. Assuming Off-Screen Draws Crash
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Moving to (1000, 1000) does not raise an exception; it silently draws on the virtual canvas outside the visible viewport.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # FIX: Check abs(x) <= width/2 and abs(y) <= height/2
              </pre>
            </div>

            {/* Pitfall 3 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                3. Neglecting Distance Formula
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Manually writing complex Pythagorean theorem code instead of leveraging the built-in <code className="text-teal-300 font-mono">t.distance(x, y)</code> method.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # BEST PRACTICE: dist = t.distance(x2, y2)
              </pre>
            </div>

            {/* Pitfall 4 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                4. Sign Confusion in Quadrant III (-X, -Y)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Forgetting that moving to the bottom-left requires both negative X and negative Y values.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # Q3: t.goto(-150, -100) # South-West
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
              6. Coordinate Navigation Best Practices Checklist
            </h2>
          </div>

          <div className="space-y-3 text-slate-300 text-sm sm:text-base">
            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Understand Centered Bounds:</strong> Screen width $W$ means X coordinates span $[-W/2, +W/2]$.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Use Built-in Distance:</strong> Utilize <code className="text-teal-300 font-mono">t.distance(other)</code> for collision detection and navigation.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Return Home with t.home():</strong> Move back to $(0,0)$ and reset heading to $0^\circ$ East in one call.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Audit Viewport Boundaries:</strong> Prevent sprites from wandering off-canvas by checking screen dimension limits.
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQS */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <FAQTemplate
            title="Cartesian Canvas, Coordinates &amp; Quadrants FAQs"
            questions={questions}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: PLAIN TEXT PRINT & DOWNLOAD NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <PlainTextPrint
            content={noteText}
            title="Topic 1: Understanding the Turtle Screen & Quadrants Study Note"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Study Note"
            downloadFileName="topic1_note.txt"
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 9: TEACHER'S NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <Teacher
            note={
              "Mastering the 4 quadrants is the secret key to all computer graphics, game physics, and robotic path planning. When Mamata, Abhronila, Susmita, and Mahima mapped our student centers across Barrackpore, Ichapur, Jadavpur, and Kolkata onto the four quadrants, the coordinate signs (+,+, -,+, -,-, +,-) became second nature. Keep these axes in mind as we begin drawing complex geometric polygons!"
            }
          />
        </section>

      </div>
    </div>
  );
}