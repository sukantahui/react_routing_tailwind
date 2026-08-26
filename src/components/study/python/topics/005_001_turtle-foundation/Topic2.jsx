import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import setupGeoCode from "./topic2_files/screen_setup_and_window_geometry.py?raw";
import canvasThemingCode from "./topic2_files/canvas_theming_and_bgcolor_control.py?raw";
import virtualCanvasCode from "./topic2_files/screensize_and_scrollable_canvases.py?raw";
import institutionalScreenCode from "./topic2_files/institutional_multi_screen_presentation_suite.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic2_files/topic2_note.txt?raw";

// FAQ Questions
import questions from "./topic2_files/topic2_questions";

/**
 * Topic2: Screen configuration: setup(), title(), bgcolor(), screensize()
 * Module: 005_001_turtle-foundation
 * Segment: 5 (Python Turtle & Creative Graphics Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic2() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("setupGeometry");

  // Interactive Laboratory State: Screen Configurator
  const [selectedTheme, setSelectedTheme] = useState({
    name: "Cyberpunk Dark",
    bgHex: "#090d16",
    penHex: "#2dd4bf",
    rgb: "RGB (9, 13, 22)",
    accent: "text-teal-400",
  });

  const [windowPreset, setWindowPreset] = useState({
    label: "Standard Desktop (800x600)",
    width: 800,
    height: 600,
    aspectRatio: "4:3",
  });

  const themeOptions = [
    { name: "Cyberpunk Dark", bgHex: "#090d16", penHex: "#2dd4bf", rgb: "RGB (9, 13, 22)", accent: "text-teal-400" },
    { name: "Deep Ocean", bgHex: "#030712", penHex: "#38bdf8", rgb: "RGB (3, 7, 18)", accent: "text-cyan-400" },
    { name: "Nebula Purple", bgHex: "#1e1b4b", penHex: "#c084fc", rgb: "RGB (30, 27, 75)", accent: "text-purple-400" },
    { name: "Classic Slate", bgHex: "#0f172a", penHex: "#34d399", rgb: "RGB (15, 23, 42)", accent: "text-emerald-400" },
  ];

  const windowPresets = [
    { label: "Compact (640x480)", width: 640, height: 480, aspectRatio: "4:3" },
    { label: "Standard Desktop (800x600)", width: 800, height: 600, aspectRatio: "4:3" },
    { label: "HD Presentation (1024x768)", width: 1024, height: 768, aspectRatio: "4:3" },
    { label: "Widescreen 16:9 (1280x720)", width: 1280, height: 720, aspectRatio: "16:9" },
  ];

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
            Topic 2
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Python Turtle &amp; Creative Graphics Programming
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Screen Configuration: <span className="text-teal-400">setup(), title() &amp; bgcolor()</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master complete control over the Python Turtle display window and drawing canvas: configuring physical window dimensions and monitor placement with <code className="text-teal-300 font-mono">screen.setup()</code>, customizing window bar headers with <code className="text-teal-300 font-mono">screen.title()</code>, theming dark palettes and RGB color modes with <code className="text-teal-300 font-mono">screen.bgcolor()</code> and <code className="text-teal-300 font-mono">screen.colormode(255)</code>, and allocating high-resolution scrollable buffers with <code className="text-teal-300 font-mono">screen.screensize()</code>.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🖥️ screen.setup() Geometry
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🏷️ screen.title() Branding
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🎨 screen.bgcolor() &amp; RGB(255)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📜 screen.screensize() Buffer
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
              1. The Screen Configuration Lifecycle
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              The Turtle Screen acts as the operating system window container and Tkinter graphics canvas manager. Configuring it explicitly ensures professional presentation and reliable multi-monitor behavior:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ setup() Geometry</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">width, height, x, y</code>
                <p className="text-[11px] text-slate-300">
                  Sets physical window viewport size (pixels or fractional floats 0.0-1.0) and top-left monitor coordinates.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ title() Branding</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">OS Window Bar Title</code>
                <p className="text-[11px] text-slate-300">
                  Customizes the application header text (e.g. "Coder &amp; Accotax • Barrackpore Creative Lab").
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ bgcolor() Theming</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">Hex, Names, RGB(255)</code>
                <p className="text-[11px] text-slate-300">
                  Defines background canvas color. Supports dark mode Hex (<code className="text-purple-300 font-mono">#090d16</code>) or RGB tuples with <code className="text-purple-300 font-mono">colormode(255)</code>.
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 shadow-lg">
                <div className="text-amber-400 font-bold text-sm mb-1">4️⃣ screensize() Buffer</div>
                <code className="text-xs font-mono text-amber-300 block mb-1">Virtual Drawing Canvas</code>
                <p className="text-[11px] text-slate-300">
                  Allocates the internal scrollable drawing buffer size, attaching scrollbars when larger than the window viewport.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Colormode(255) Requirement
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                By default, Python Turtle expects RGB color values in floating point range from <code className="text-teal-300 font-mono">0.0 to 1.0</code>. To use standard integer RGB tuples like <code className="text-teal-300 font-mono">(9, 13, 22)</code>, you MUST invoke <span className="text-emerald-400 font-bold">screen.colormode(255)</span> first!
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
                2. Visualizing Window Geometry, Color Modes &amp; Buffers
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("setupGeometry")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "setupGeometry"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              &gt;
                setup() Window Geometry
              </button>
              <button
                onClick={() => setActiveInteractiveTab("colorModes")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "colorModes"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              &gt;
                bgcolor() &amp; Colormode(255)
              </button>
              <button
                onClick={() => setActiveInteractiveTab("virtualBuffer")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "virtualBuffer"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              &gt;
                setup() vs screensize()
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining the structural geometry of window creation, color mode conversions, and virtual scrollable canvas buffers:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "setupGeometry" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">
                  SCREEN.SETUP(WIDTH, HEIGHT, STARTX, STARTY) MONITOR GEOMETRY
                </text>

                {/* Monitor Box */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#0f172a" stroke="#14b8a6" />
                  <text x="20" y="25" fill="#94a3b8" fontSize="9">User Physical Display Monitor (1920x1080)</text>

                  {/* Window */}
                  <g transform="translate(180, 40)">
                    <rect x="0" y="0" width="460" height="170" rx="6" fill="#042f2e" stroke="#2dd4bf" strokeWidth="2" />

                    {/* Window Title Bar */}
                    <rect x="0" y="0" width="460" height="26" rx="6" fill="#0d9488" />
                    <circle cx="15" cy="13" r="4" fill="#f43f5e" />
                    <circle cx="28" cy="13" r="4" fill="#facc15" />
                    <circle cx="41" cy="13" r="4" fill="#4ade80" />
                    <text x="60" y="17" fill="#ffffff" fontSize="9" fontWeight="bold">
                      screen.title("Coder &amp; Accotax • Geometric Studio")
                    </text>

                    {/* Canvas Area */}
                    <text x="140" y="90" fill="#a7f3d0" fontSize="11" fontWeight="bold">
                      Physical Viewport: width=800, height=600
                    </text>
                    <text x="160" y="115" fill="#ccfbf1" fontSize="8" fontFamily="monospace">
                      screen.setup(800, 600, startx=100, starty=100)
                    </text>
                  </g>

                  {/* Dimension Annotations */}
                  <line x1="30" y1="40" x2="180" y2="40" stroke="#facc15" strokeWidth="1.5" strokeDasharray="3 3" />
                  <text x="60" y="35" fill="#facc15" fontSize="8">startx = 100 px</text>

                  <line x1="180" y1="10" x2="180" y2="40" stroke="#facc15" strokeWidth="1.5" strokeDasharray="3 3" />
                  <text x="185" y="25" fill="#facc15" fontSize="8">starty = 100 px</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "colorModes" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">
                  CANVAS THEMING &amp; COLORMODE(255) VS COLORMODE(1.0)
                </text>

                {/* Color Modes Comparison */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#082f49" stroke="#0ea5e9" />

                  {/* Left: Colormode(255) */}
                  <rect x="30" y="30" width="370" height="190" rx="6" fill="#0c4a6e" stroke="#38bdf8" />
                  <text x="40" y="55" fill="#ffffff" fontSize="11" fontWeight="bold">1. Standard RGB (0-255 Integer Mode)</text>
                  <text x="40" y="80" fill="#bae6fd" fontSize="8">Call this first:</text>
                  <text x="40" y="100" fill="#e0f2fe" fontSize="9" fontFamily="monospace">screen.colormode(255)</text>
                  <text x="40" y="130" fill="#bae6fd" fontSize="8">Pass standard integer RGB tuples:</text>
                  <text x="40" y="150" fill="#a7f3d0" fontSize="9" fontFamily="monospace">screen.bgcolor((9, 13, 22))</text>
                  <text x="40" y="195" fill="#86efac" fontSize="8" fontWeight="bold">Matches Web &amp; CSS RGB Formats ✅</text>

                  {/* Right: Hex Code Mode */}
                  <rect x="420" y="30" width="370" height="190" rx="6" fill="#042f2e" stroke="#2dd4bf" />
                  <text x="430" y="55" fill="#5eead4" fontSize="11" fontWeight="bold">2. Hexadecimal String Mode</text>
                  <text x="430" y="80" fill="#ccfbf1" fontSize="8">Works in any colormode natively:</text>
                  <text x="430" y="100" fill="#5eead4" fontSize="9" fontFamily="monospace">screen.bgcolor("#090d16")</text>
                  <text x="430" y="130" fill="#ccfbf1" fontSize="8">Pen Colors:</text>
                  <text x="430" y="150" fill="#5eead4" fontSize="9" fontFamily="monospace">t.color("#2dd4bf", "#f43f5e")</text>
                  <text x="430" y="195" fill="#86efac" fontSize="8" fontWeight="bold">Cleanest &amp; Most Modern Syntax ✅</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">
                  PHYSICAL VIEWPORT (SETUP) VS VIRTUAL SCROLLABLE BUFFER (SCREENSIZE)
                </text>

                {/* Virtual Buffer Layout */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#1e1b4b" stroke="#a855f7" />

                  {/* Outer Virtual Canvas Buffer */}
                  <rect x="40" y="25" width="740" height="195" rx="6" fill="#2e1065" stroke="#c084fc" strokeDasharray="4 4" />
                  <text x="50" y="45" fill="#d8b4fe" fontSize="9" fontWeight="bold">
                    Virtual Drawing Buffer: screen.screensize(2400, 1800)
                  </text>

                  {/* Inner Window Viewport */}
                  <g transform="translate(180, 55)">
                    <rect x="0" y="0" width="440" height="135" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                    <text x="20" y="30" fill="#38bdf8" fontSize="10" fontWeight="bold">
                      Physical OS Viewport: screen.setup(800, 600)
                    </text>
                    <text x="20" y="55" fill="#bae6fd" fontSize="8">
                      Visible portion of the graphics to the user
                    </text>

                    {/* Scrollbars */}
                    <rect x="425" y="5" width="10" height="125" rx="2" fill="#334155" />
                    <rect x="427" y="20" width="6" height="40" rx="2" fill="#64748b" />

                    <rect x="5" y="122" width="420" height="10" rx="2" fill="#334155" />
                    <rect x="40" y="124" width="60" height="6" rx="2" fill="#64748b" />
                  </g>

                  <text x="190" y="210" fill="#facc15" fontSize="8" fontWeight="bold">
                    Tkinter automatically renders native scrollbars when screensize &gt; setup!
                  </text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE SCREEN THEME & GEOMETRY CONFIGURATOR */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧪</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Screen Theme &amp; Geometry Configurator
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Select curated dark theme palettes and window viewport resolutions to preview generated Python configuration code and simulated canvas appearance:
          </p>

          <div className="bg-slate-950 p-5 sm:p-6 rounded-xl border border-slate-800/90 space-y-6">
            {/* Theme Selector Grid */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                1. Select Background Theme Palette:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {themeOptions.map((th, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedTheme(th)}
                    className={clsx(
                      "p-3 rounded-xl border text-left transition-all",
                      selectedTheme.name === th.name
                        ? "bg-teal-950/80 border-teal-500 shadow-md shadow-teal-950/50"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white"
                    )}
                  &gt;
                    <div className="text-xs font-bold text-slate-200">{th.name}</div>
                    <div className="text-[10px] text-teal-400 font-mono mt-0.5">{th.bgHex}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Window Preset Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                2. Select Viewport Resolution Preset:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {windowPresets.map((wp, idx) => (
                  <button
                    key={idx}
                    onClick={() => setWindowPreset(wp)}
                    className={clsx(
                      "p-2.5 rounded-xl border text-xs font-bold transition-all text-center",
                      windowPreset.label === wp.label
                        ? "bg-cyan-950/80 border-cyan-500 text-cyan-200 shadow-md shadow-cyan-950/50"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white"
                    )}
                  &gt;
                    {wp.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated Desktop Window Viewport */}
            <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                  <span className="text-xs text-slate-300 font-mono ml-2">
                    Coder &amp; Accotax • {selectedTheme.name} ({windowPreset.width}x{windowPreset.height})
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">{windowPreset.aspectRatio}</span>
              </div>

              {/* Simulated Canvas Surface */}
              <div
                style={{ backgroundColor: selectedTheme.bgHex }}
                className="w-full h-44 rounded-lg flex items-center justify-center border border-slate-800 transition-colors duration-300 relative overflow-hidden"
              >
                {/* Simulated Turtle Path */}
                <svg viewBox="0 0 200 100" className="w-48 h-24">
                  <polygon
                    points="100,20 160,80 40,80"
                    fill="none"
                    stroke={selectedTheme.penHex}
                    strokeWidth="2.5"
                  />
                  <circle cx="100" cy="20" r="4" fill={selectedTheme.penHex} className="animate-glow-teal" />
                </svg>
                <div className="absolute bottom-2 right-3 text-[10px] font-mono text-slate-400">
                  {selectedTheme.rgb}
                </div>
              </div>

              {/* Code Snippet Generated */}
              <pre className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-teal-300 overflow-x-auto">
                {`import turtle\n\nscreen = turtle.Screen()\nscreen.setup(width=${windowPreset.width}, height=${windowPreset.height})\nscreen.title("Coder & Accotax • ${selectedTheme.name}")\nscreen.bgcolor("${selectedTheme.bgHex}")\nscreen.colormode(255)`}
              </pre>
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
              4. Production Code Labs &amp; Screen Configuration Suites
            </h2>
          </div>

          <p className="text-slate-300 mb-8 text-base leading-relaxed">
            Inspect, run, and master all four production-grade screen configuration labs covering window geometry, color theming, virtual buffers, and multi-screen student presentations:
          </p>

          <div className="space-y-10">
            {/* Python Loader 1 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-teal-300">
                  Lab 1: Window Geometry, Setup Coordinates &amp; Fractional Scaling
                </h3>
                <p className="text-sm text-slate-400">
                  Configuring absolute pixel viewports, monitor placement (<code className="text-teal-300 font-mono">startx</code>, <code className="text-teal-300 font-mono">starty</code>), and responsive float dimensions.
                </p>
              </div>
              <PythonFileLoader
                fileModule={setupGeoCode}
                title="screen_setup_and_window_geometry.py"
                highlightLines={[16, 26, 38]}
              />
            </div>

            {/* Python Loader 2 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-cyan-300">
                  Lab 2: Canvas Theming, Hex Codes &amp; RGB Colormode(255) Control
                </h3>
                <p className="text-sm text-slate-400">
                  Switching between curated dark theme palettes and validating 0-255 RGB integer tuple integrity.
                </p>
              </div>
              <PythonFileLoader
                fileModule={canvasThemingCode}
                title="canvas_theming_and_bgcolor_control.py"
                highlightLines={[16, 26, 38]}
              />
            </div>

            {/* Python Loader 3 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-purple-300">
                  Lab 3: Virtual Canvas Buffers (screensize) vs Physical Viewports (setup)
                </h3>
                <p className="text-sm text-slate-400">
                  Allocating high-resolution virtual buffers and calculating scrollable pixel spans for large generative art canvases.
                </p>
              </div>
              <PythonFileLoader
                fileModule={virtualCanvasCode}
                title="screensize_and_scrollable_canvases.py"
                highlightLines={[16, 26, 38]}
              />
            </div>

            {/* Python Loader 4 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-amber-300">
                  Lab 4: Institutional Student Exhibition Screen Director Case Study
                </h3>
                <p className="text-sm text-slate-400">
                  Multi-project screen director applying custom themes and resolutions for Mamata, Mahima, and Susmita.
                </p>
              </div>
              <PythonFileLoader
                fileModule={institutionalScreenCode}
                title="institutional_multi_screen_presentation_suite.py"
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
              5. Screen Configuration Pitfalls &amp; Anti-Patterns
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pitfall 1 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                1. Passing RGB (0-255) Without colormode(255)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Calling <code className="text-rose-400 font-mono">bgcolor((15, 23, 42))</code> raises a <code className="text-rose-400 font-mono">TurtleGraphicsError: bad color sequence</code> because default mode expects floats 0.0-1.0.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # FIX: screen.colormode(255) before passing RGB tuples
              </pre>
            </div>

            {/* Pitfall 2 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                2. Confusing setup() with screensize()
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Calling <code className="text-rose-400 font-mono">screensize(800, 600)</code> does not change the physical window size; it only resizes the internal drawing buffer.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # FIX: Use screen.setup(800, 600) for the physical window
              </pre>
            </div>

            {/* Pitfall 3 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                3. Hardcoding Window Positions
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Hardcoding <code className="text-rose-400 font-mono">startx=1500</code> can push the window off-screen on users with smaller 1366x768 laptop displays.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # FIX: Omit startx/starty to auto-center the window
              </pre>
            </div>

            {/* Pitfall 4 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                4. Omitting Exit Binding
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Configuring the screen without concluding the script with <code className="text-rose-400 font-mono">exitonclick()</code> causes the window to terminate immediately.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # FIX: screen.exitonclick() at the end of the script
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
              6. Screen Configuration Best Practices Checklist
            </h2>
          </div>

          <div className="space-y-3 text-slate-300 text-sm sm:text-base">
            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Configure Early in Script:</strong> Invoke <code className="text-teal-300 font-mono">screen.setup()</code> and <code className="text-teal-300 font-mono">screen.bgcolor()</code> before creating turtle objects.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Use Dark Mode Theming:</strong> Pair high-contrast dark backgrounds (<code className="text-teal-300 font-mono">#090d16</code>) with neon pens (<code className="text-teal-300 font-mono">#2dd4bf</code>).
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Add Informative Window Titles:</strong> Brand windows clearly with <code className="text-teal-300 font-mono">screen.title("...")</code>.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Conclude with exitonclick():</strong> Ensure clean user-initiated window dismissal.
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQS */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <FAQTemplate
            title="Screen Configuration &amp; Canvas Theming FAQs"
            questions={questions}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: PLAIN TEXT PRINT & DOWNLOAD NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <PlainTextPrint
            content={noteText}
            title="Topic 2: Screen Configuration & Theming Study Note"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Study Note"
            downloadFileName="topic2_note.txt"
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 9: TEACHER'S NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <Teacher
            note={
              "A polished desktop graphics application begins with a clean, branded window. When Mamata, Mahima, and Susmita prepared their final graphics exhibits at our Barrackpore and Kolkata centers, configuring dark themed backgrounds (#090d16) and descriptive title bars elevated their projects from simple class exercises into museum-worthy digital art installations. Always take pride in your application's first impression!"
            }
          />
        </section>

      </div>
    </div>
  );
}