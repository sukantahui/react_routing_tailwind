import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import instantiationCode from "./topic3_files/turtle_instantiation_and_properties.py?raw";
import multiAgentCode from "./topic3_files/multi_turtle_synchronized_agents.py?raw";
import cloningCode from "./topic3_files/turtle_lifecycle_cloning_and_destruction.py?raw";
import institutionalOrchestratorCode from "./topic3_files/institutional_multi_agent_drawing_orchestrator.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic3_files/topic3_note.txt?raw";

// FAQ Questions
import questions from "./topic3_files/topic3_questions";

/**
 * Topic3: Turtle object creation and lifecycle
 * Module: 005_001_turtle-foundation
 * Segment: 5 (Python Turtle & Creative Graphics Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic3() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("multiInstance");

  // Interactive Laboratory State: Multi-Agent Swarm
  const [swarmRotationDeg, setSwarmRotationDeg] = useState(0);
  const [selectedShape, setSelectedShape] = useState("turtle"); // turtle | circle | square | arrow

  const agents = [
    { id: 1, name: "Mamata's Pen (Barrackpore)", color: "#2dd4bf", offsetDeg: 0, radius: 80 },
    { id: 2, name: "Mahima's Pen (Kolkata)", color: "#38bdf8", offsetDeg: 120, radius: 80 },
    { id: 3, name: "Susmita's Pen (Ichapur)", color: "#c084fc", offsetDeg: 240, radius: 80 },
  ];

  const handleRotateSwarm = (delta = 30) => {
    setSwarmRotationDeg((prev) => (prev + delta) % 360);
  };

  const handleResetSwarm = () => {
    setSwarmRotationDeg(0);
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
            Topic 3
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Python Turtle &amp; Creative Graphics Programming
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Turtle Object Creation &amp; <span className="text-teal-400">Lifecycle</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master the object-oriented architecture of Turtle Graphics: instantiating explicit <code className="text-teal-300 font-mono">t = turtle.Turtle()</code> instances, customizing cursor shapes (<code className="text-teal-300 font-mono">"turtle"</code>, <code className="text-teal-300 font-mono">"circle"</code>, <code className="text-teal-300 font-mono">"arrow"</code>), deep cloning with <code className="text-teal-300 font-mono">clone()</code>, imprinting marks with <code className="text-teal-300 font-mono">stamp()</code>, state encapsulation across isolated pen properties, and orchestrating synchronized multi-agent drawing systems on a single shared canvas.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🐢 Explicit OOP Instantiation
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🧬 t.clone() State Duplication
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🏷️ Cursor Shapes &amp; Stamping
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🤝 Multi-Agent Synchronization
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
              1. The Object-Oriented Turtle Paradigm
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Transitioning from procedural global turtle calls to explicit object-oriented instances unlocks the full potential of multi-layer graphics, recursive branch art, and multi-agent physics:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ Explicit OOP</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">t = turtle.Turtle()</code>
                <p className="text-[11px] text-slate-300">
                  Creates an independent turtle instance encapsulating its own position, heading, speed, and pen attributes.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ Cursor Shapes</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">shape("turtle")</code>
                <p className="text-[11px] text-slate-300">
                  Customize the cursor representation with built-ins: "turtle", "arrow", "circle", "square", "triangle", "classic".
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ Deep Cloning</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">t_child = t.clone()</code>
                <p className="text-[11px] text-slate-300">
                  Duplicates the exact position, heading, and pen state into a new child instance, essential for fractal trees.
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 shadow-lg">
                <div className="text-amber-400 font-bold text-sm mb-1">4️⃣ Multi-Agent Swarms</div>
                <code className="text-xs font-mono text-amber-300 block mb-1">screen.turtles()</code>
                <p className="text-[11px] text-slate-300">
                  Coordinate multiple turtles drawing in parallel across distinct canvas layers (grid, fractal, annotations).
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                Vector Persistence vs Object Destruction
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                When a Python <code className="text-teal-300 font-mono">Turtle</code> object is deleted with <code className="text-rose-400 font-mono">del t</code>, the underlying lines and shapes already drawn on the Tkinter canvas <span className="text-emerald-400 font-bold">REMAIN VISIBLE</span>! The canvas stores vector draw commands independently of the Python garbage collector.
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
                2. Visualizing Multi-Instance Encapsulation &amp; Shapes
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("multiInstance")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "multiInstance"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Multi-Instance Encapsulation
              </button>
              <button
                onClick={() => setActiveInteractiveTab("shapesAnatomy")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "shapesAnatomy"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Cursor Shapes &amp; Stamping
              </button>
              <button
                onClick={() => setActiveInteractiveTab("swarmMatrix")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "swarmMatrix"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Multi-Agent Swarm Matrix
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining isolated object state encapsulation, cursor shape geometries, and parallel multi-agent swarms:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "multiInstance" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">
                  OOP MULTI-INSTANCE STATE ENCAPSULATION ON A SHARED CANVAS
                </text>

                {/* Encapsulation Grid */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#0f172a" stroke="#14b8a6" />

                  {/* Instance 1: Mamata */}
                  <rect x="25" y="35" width="240" height="180" rx="6" fill="#042f2e" stroke="#2dd4bf" />
                  <text x="35" y="60" fill="#5eead4" fontSize="11" fontWeight="bold">🐢 Instance: t_mamata</text>
                  <text x="35" y="85" fill="#ccfbf1" fontSize="8" fontFamily="monospace">• pos(): (150, 100)</text>
                  <text x="35" y="105" fill="#ccfbf1" fontSize="8" fontFamily="monospace">• heading(): 45.0°</text>
                  <text x="35" y="125" fill="#ccfbf1" fontSize="8" fontFamily="monospace">• pencolor(): "#2dd4bf"</text>
                  <text x="35" y="145" fill="#ccfbf1" fontSize="8" fontFamily="monospace">• speed(): 0 (instant)</text>
                  <text x="35" y="195" fill="#86efac" fontSize="8" fontWeight="bold">Layer: Background Grid</text>

                  {/* Instance 2: Mahima */}
                  <rect x="290" y="35" width="240" height="180" rx="6" fill="#082f49" stroke="#38bdf8" />
                  <text x="300" y="60" fill="#38bdf8" fontSize="11" fontWeight="bold">🐢 Instance: t_mahima</text>
                  <text x="300" y="85" fill="#bae6fd" fontSize="8" fontFamily="monospace">• pos(): (0, 0)</text>
                  <text x="300" y="105" fill="#bae6fd" fontSize="8" fontFamily="monospace">• heading(): 90.0°</text>
                  <text x="300" y="125" fill="#bae6fd" fontSize="8" fontFamily="monospace">• pencolor(): "#38bdf8"</text>
                  <text x="300" y="145" fill="#bae6fd" fontSize="8" fontFamily="monospace">• speed(): 6 (normal)</text>
                  <text x="300" y="195" fill="#86efac" fontSize="8" fontWeight="bold">Layer: Fractal Geometry</text>

                  {/* Instance 3: Susmita */}
                  <rect x="555" y="35" width="240" height="180" rx="6" fill="#3b0764" stroke="#c084fc" />
                  <text x="565" y="60" fill="#f3e8ff" fontSize="11" fontWeight="bold">🐢 Instance: t_susmita</text>
                  <text x="565" y="85" fill="#d8b4fe" fontSize="8" fontFamily="monospace">• pos(): (-120, -80)</text>
                  <text x="565" y="105" fill="#d8b4fe" fontSize="8" fontFamily="monospace">• heading(): 180.0°</text>
                  <text x="565" y="125" fill="#d8b4fe" fontSize="8" fontFamily="monospace">• pencolor(): "#c084fc"</text>
                  <text x="565" y="145" fill="#d8b4fe" fontSize="8" fontFamily="monospace">• speed(): 3 (slow)</text>
                  <text x="565" y="195" fill="#86efac" fontSize="8" fontWeight="bold">Layer: Star Mandala</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "shapesAnatomy" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">
                  TURTLE CURSOR SHAPES ANATOMY &amp; STAMPING SYSTEM
                </text>

                {/* Shapes Row */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#082f49" stroke="#0ea5e9" />

                  {/* Shape 1: Turtle */}
                  <rect x="30" y="35" width="115" height="180" rx="6" fill="#0c4a6e" stroke="#38bdf8" />
                  <polygon points="87,70 78,85 96,85" fill="#2dd4bf" />
                  <circle cx="87" cy="80" r="10" fill="#2dd4bf" />
                  <text x="45" y="120" fill="#ffffff" fontSize="10" fontWeight="bold">"turtle"</text>
                  <text x="40" y="145" fill="#bae6fd" fontSize="7">Actual icon</text>
                  <text x="40" y="165" fill="#a7f3d0" fontSize="7">Best for demos</text>

                  {/* Shape 2: Arrow */}
                  <rect x="160" y="35" width="115" height="180" rx="6" fill="#0c4a6e" stroke="#38bdf8" />
                  <polygon points="217,65 205,90 217,82 229,90" fill="#38bdf8" />
                  <text x="180" y="120" fill="#ffffff" fontSize="10" fontWeight="bold">"arrow"</text>
                  <text x="170" y="145" fill="#bae6fd" fontSize="7">Direction arrow</text>
                  <text x="170" y="165" fill="#a7f3d0" fontSize="7">Vector paths</text>

                  {/* Shape 3: Circle */}
                  <rect x="290" y="35" width="115" height="180" rx="6" fill="#0c4a6e" stroke="#38bdf8" />
                  <circle cx="347" cy="80" r="12" fill="#c084fc" />
                  <text x="310" y="120" fill="#ffffff" fontSize="10" fontWeight="bold">"circle"</text>
                  <text x="300" y="145" fill="#bae6fd" fontSize="7">Smooth dot</text>
                  <text x="300" y="165" fill="#a7f3d0" fontSize="7">Particles</text>

                  {/* Shape 4: Square */}
                  <rect x="420" y="35" width="115" height="180" rx="6" fill="#0c4a6e" stroke="#38bdf8" />
                  <rect x="435" y="68" width="24" height="24" rx="2" fill="#fbbf24" />
                  <text x="440" y="120" fill="#ffffff" fontSize="10" fontWeight="bold">"square"</text>
                  <text x="430" y="145" fill="#bae6fd" fontSize="7">Box icon</text>
                  <text x="430" y="165" fill="#a7f3d0" fontSize="7">Grid stamping</text>

                  {/* Shape 5: Triangle */}
                  <rect x="550" y="35" width="115" height="180" rx="6" fill="#0c4a6e" stroke="#38bdf8" />
                  <polygon points="607,68 595,92 619,92" fill="#f43f5e" />
                  <text x="565" y="120" fill="#ffffff" fontSize="10" fontWeight="bold">"triangle"</text>
                  <text x="560" y="145" fill="#bae6fd" fontSize="7">Delta shape</text>
                  <text x="560" y="165" fill="#a7f3d0" fontSize="7">Aircrafts</text>

                  {/* Shape 6: Classic */}
                  <rect x="680" y="35" width="110" height="180" rx="6" fill="#0c4a6e" stroke="#38bdf8" />
                  <polygon points="735,70 725,90 735,84 745,90" fill="#34d399" />
                  <text x="695" y="120" fill="#ffffff" fontSize="10" fontWeight="bold">"classic"</text>
                  <text x="690" y="145" fill="#bae6fd" fontSize="7">Default arrow</text>
                  <text x="690" y="165" fill="#a7f3d0" fontSize="7">Minimalist</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">
                  MULTI-AGENT SWARM SYNCHRONIZATION ARCHITECTURE
                </text>

                {/* Swarm Layout */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#1e1b4b" stroke="#a855f7" />

                  {/* Left: Swarm Loop Code */}
                  <rect x="30" y="30" width="370" height="190" rx="6" fill="#2e1065" stroke="#c084fc" />
                  <text x="40" y="55" fill="#f3e8ff" fontSize="11" fontWeight="bold">Synchronized Multi-Agent Dispatch Loop</text>
                  <text x="40" y="85" fill="#d8b4fe" fontSize="8" fontFamily="monospace">turtles = [t_mamata, t_mahima, t_susmita]</text>
                  <text x="40" y="110" fill="#d8b4fe" fontSize="8" fontFamily="monospace">for step in range(36):</text>
                  <text x="60" y="130" fill="#5eead4" fontSize="8" fontFamily="monospace">for t in turtles:</text>
                  <text x="80" y="150" fill="#5eead4" fontSize="8" fontFamily="monospace">t.forward(15)</text>
                  <text x="80" y="170" fill="#5eead4" fontSize="8" fontFamily="monospace">t.left(10)</text>

                  {/* Right: Tri-Arm Visual */}
                  <rect x="420" y="30" width="370" height="190" rx="6" fill="#0f172a" stroke="#38bdf8" />
                  <circle cx="605" cy="125" r="50" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" fill="none" />
                  <circle cx="605" cy="125" r="4" fill="#ffffff" />

                  {/* Mamata at 0 deg */}
                  <line x1="605" y1="125" x2="655" y2="125" stroke="#2dd4bf" strokeWidth="2" />
                  <circle cx="655" cy="125" r="5" fill="#2dd4bf" />
                  <text x="665" y="128" fill="#2dd4bf" fontSize="8" fontWeight="bold">Mamata (0°)</text>

                  {/* Mahima at 120 deg */}
                  <line x1="605" y1="125" x2="580" y2="82" stroke="#38bdf8" strokeWidth="2" />
                  <circle cx="580" cy="82" r="5" fill="#38bdf8" />
                  <text x="520" y="75" fill="#38bdf8" fontSize="8" fontWeight="bold">Mahima (120°)</text>

                  {/* Susmita at 240 deg */}
                  <line x1="605" y1="125" x2="580" y2="168" stroke="#c084fc" strokeWidth="2" />
                  <circle cx="580" cy="168" r="5" fill="#c084fc" />
                  <text x="520" y="180" fill="#c084fc" fontSize="8" fontWeight="bold">Susmita (240°)</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE MULTI-AGENT SWARM STUDIO */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧪</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Multi-Agent Turtle Swarm Studio
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Direct 3 independent synchronized turtle agents representing student pens across Barrackpore, Kolkata, and Ichapur. Rotate the swarm and change cursor shapes to observe parallel OOP state management:
          </p>

          <div className="bg-slate-950 p-5 sm:p-6 rounded-xl border border-slate-800/90 space-y-6">
            {/* Controls Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => handleRotateSwarm(30)}
                className="p-2.5 bg-teal-950/80 border border-teal-600 rounded-xl text-xs font-bold text-teal-300 hover:bg-teal-900 transition-all text-center"
              >
                Rotate Swarm +30° ↺
              </button>

              <button
                onClick={() => handleRotateSwarm(-30)}
                className="p-2.5 bg-cyan-950/80 border border-cyan-600 rounded-xl text-xs font-bold text-cyan-300 hover:bg-cyan-900 transition-all text-center"
              >
                Rotate Swarm -30° ↻
              </button>

              <button
                onClick={handleResetSwarm}
                className="p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-bold text-slate-300 hover:bg-slate-800 transition-all text-center"
              >
                Reset Swarm 🔄
              </button>

              {/* Cursor Shape Toggle */}
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                {["turtle", "circle", "square", "arrow"].map((sh) => (
                  <button
                    key={sh}
                    onClick={() => setSelectedShape(sh)}
                    className={clsx(
                      "flex-1 py-1 rounded text-[10px] font-mono capitalize transition-all",
                      selectedShape === sh ? "bg-teal-800 text-white font-bold" : "text-slate-400 hover:text-white"
                    )}
                  >
                    {sh}
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated Swarm Viewport */}
            <div className="relative w-full h-64 bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden flex items-center justify-center">
              <svg viewBox="-150 -100 300 200" className="w-full h-full">
                {/* Center Origin */}
                <circle cx="0" cy="0" r="3" fill="#64748b" />
                <circle cx="0" cy="0" r="80" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" fill="none" />

                {/* 3 Agents */}
                {agents.map((ag) => {
                  const totalAngle = (ag.offsetDeg + swarmRotationDeg) % 360;
                  const rad = (totalAngle * Math.PI) / 180;
                  const x = Math.round(ag.radius * Math.cos(rad));
                  const y = Math.round(ag.radius * Math.sin(rad));

                  return (
                    <g key={ag.id}>
                      {/* Trail */}
                      <line x1="0" y1="0" x2={x} y2={-y} stroke={ag.color} strokeWidth="2" strokeDasharray="2 2" />

                      {/* Agent Cursor */}
                      <g transform={`translate(${x}, ${-y}) rotate(${-totalAngle})`}>
                        {selectedShape === "turtle" ? (
                          <circle cx="0" cy="0" r="6" fill={ag.color} className="animate-glow-teal" />
                        ) : selectedShape === "circle" ? (
                          <circle cx="0" cy="0" r="5" fill={ag.color} />
                        ) : selectedShape === "square" ? (
                          <rect x="-5" y="-5" width="10" height="10" fill={ag.color} />
                        ) : (
                          <polygon points="6,0 -4,-4 -2,0 -4,4" fill={ag.color} />
                        )}
                      </g>

                      {/* Label */}
                      <text x={x + 8} y={-y + 4} fill={ag.color} fontSize="7" fontWeight="bold">
                        {ag.name.split(" ")[0]} ({x}, {y})
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Active Swarm Status */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {agents.map((ag) => {
                const totalAngle = (ag.offsetDeg + swarmRotationDeg) % 360;
                const rad = (totalAngle * Math.PI) / 180;
                const x = Math.round(ag.radius * Math.cos(rad));
                const y = Math.round(ag.radius * Math.sin(rad));

                return (
                  <div key={ag.id} className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                    <div className="text-xs font-bold" style={{ color: ag.color }}>{ag.name}</div>
                    <div className="text-[11px] font-mono text-slate-300 mt-1">Pos: ({x}, {y}) | Heading: {totalAngle}°</div>
                    <div className="text-[10px] text-slate-400 font-mono">Shape: "{selectedShape}" | Speed: 0</div>
                  </div>
                );
              })}
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
              4. Production Code Labs &amp; Multi-Agent Suites
            </h2>
          </div>

          <p className="text-slate-300 mb-8 text-base leading-relaxed">
            Inspect, run, and master all four production-grade Turtle object lifecycle labs covering OOP instantiation, swarm synchronization, cloning, and institutional layered drawing:
          </p>

          <div className="space-y-10">
            {/* Python Loader 1 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-teal-300">
                  Lab 1: Explicit Object-Oriented Instantiation &amp; State Encapsulation
                </h3>
                <p className="text-sm text-slate-400">
                  Initializing explicit <code className="text-teal-300 font-mono">turtle.Turtle()</code> instances, custom shapes, colors, and pen controls.
                </p>
              </div>
              <PythonFileLoader
                fileModule={instantiationCode}
                title="turtle_instantiation_and_properties.py"
                highlightLines={[16, 26, 38, 52]}
              />
            </div>

            {/* Python Loader 2 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-cyan-300">
                  Lab 2: Multi-Agent Synchronized Swarm Drawing Orchestration
                </h3>
                <p className="text-sm text-slate-400">
                  Coordinating multiple concurrent drawing agents with phase offsets and vector kinematics.
                </p>
              </div>
              <PythonFileLoader
                fileModule={multiAgentCode}
                title="multi_turtle_synchronized_agents.py"
                highlightLines={[16, 26, 38]}
              />
            </div>

            {/* Python Loader 3 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-purple-300">
                  Lab 3: Turtle Cloning, Cursor Stamping &amp; Lifecycle State Reset
                </h3>
                <p className="text-sm text-slate-400">
                  Creating child branch agents with <code className="text-purple-300 font-mono">t.clone()</code> and managing canvas stamps with <code className="text-purple-300 font-mono">stamp()</code>.
                </p>
              </div>
              <PythonFileLoader
                fileModule={cloningCode}
                title="turtle_lifecycle_cloning_and_destruction.py"
                highlightLines={[16, 26, 38]}
              />
            </div>

            {/* Python Loader 4 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-amber-300">
                  Lab 4: Institutional Collaborative Layered Canvas System Case Study
                </h3>
                <p className="text-sm text-slate-400">
                  Dividing complex geometric art across specialized agent layers for Mamata, Mahima, and Susmita.
                </p>
              </div>
              <PythonFileLoader
                fileModule={institutionalOrchestratorCode}
                title="institutional_multi_agent_drawing_orchestrator.py"
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
              5. Turtle Object Lifecycle Pitfalls &amp; Anti-Patterns
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pitfall 1 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                1. Relying on Procedural Singleton
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Calling <code className="text-rose-400 font-mono">turtle.forward()</code> directly restricts your program to a single shared turtle cursor.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # ANTI-PATTERN: turtle.forward(100){'\n'}
                # BEST PRACTICE: t1 = turtle.Turtle()
              </pre>
            </div>

            {/* Pitfall 2 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                2. Expecting del t to Clear Drawn Lines
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Deleting a Python turtle variable does not erase its lines from the Tkinter canvas; call <code className="text-teal-300 font-mono">t.clear()</code> or <code className="text-teal-300 font-mono">t.reset()</code> instead.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # FIX: t.clear() before deleting reference
              </pre>
            </div>

            {/* Pitfall 3 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                3. Lag from Visible Cursors on Large Loops
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Leaving the turtle cursor visible during 1,000+ iteration mathematical loops causes massive animation lag.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # FIX: t.hideturtle(); t.speed(0)
              </pre>
            </div>

            {/* Pitfall 4 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                4. Forgetting Stamp IDs
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Not saving the return integer of <code className="text-rose-400 font-mono">t.stamp()</code> prevents selectively clearing specific stamped shapes later.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # FIX: stamp_id = t.stamp()
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
              6. Turtle Object Management Best Practices Checklist
            </h2>
          </div>

          <div className="space-y-3 text-slate-300 text-sm sm:text-base">
            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Instantiate Explicit Objects:</strong> Use <code className="text-teal-300 font-mono">t = turtle.Turtle()</code> for all drawing tasks.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Leverage Cloning for Fractals:</strong> Duplicate state branches seamlessly with <code className="text-teal-300 font-mono">t.clone()</code>.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Divide Art into Layers:</strong> Assign separate turtles to background grids, foreground geometry, and typography.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Manage Swarms with Iterators:</strong> Store turtles in lists to step through synchronized multi-agent animation frames.
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQS */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <FAQTemplate
            title="Turtle Object Creation &amp; Lifecycle FAQs"
            questions={questions}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: PLAIN TEXT PRINT & DOWNLOAD NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <PlainTextPrint
            content={noteText}
            title="Topic 3: Turtle Object Creation & Lifecycle Study Note"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Study Note"
            downloadFileName="topic3_note.txt"
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 9: TEACHER'S NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <Teacher
            note={
              "Treating each Turtle as an independent object is where true mastery begins. In our collaborative graphics hackathons in Barrackpore and Kolkata, Mamata, Mahima, and Susmita each programmed their own Turtle agent to draw complex geometric mandalas simultaneously on a single canvas. When code is modular and object-oriented, creativity has no limits!"
            }
          />
        </section>

      </div>
    </div>
  );
}