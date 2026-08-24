import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import mathRandom from "./topic2_files/math_and_random_modules.py?raw";
import datetimeTime from "./topic2_files/datetime_and_time_modules.py?raw";
import sysOs from "./topic2_files/sys_and_os_system_modules.py?raw";
import systemAudit from "./topic2_files/automated_system_audit_and_lottery.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic2_files/topic2_note.txt?raw";

// FAQ Questions
import questions from "./topic2_files/topic2_questions";

/**
 * Topic2: Built-in standard library modules: math, random, datetime, sys, os
 * Module: 002_009_modules-packages
 * Segment: 2 (Practical Python for Real-World Development)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic2() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("pillars");

  // Interactive StdLib Explorer State
  const [selectedModule, setSelectedModule] = useState("math"); // math, random, datetime, sys, os
  const [mathInputA, setMathInputA] = useState(48);
  const [mathInputB, setMathInputB] = useState(180);

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

  // Helper gcd calculation
  const gcd = (a, b) => (!b ? a : gcd(b, a % b));

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
            Segment 2 • Module 002_009
          </span>
          <span className="text-xs sm:text-sm font-mono bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/80 shadow-sm shadow-cyan-950/50">
            Topic 2
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Modules, Packages &amp; Python Standard Library
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Built-in Standard Library Modules: <code className="text-teal-400 font-mono">math</code>, <code className="text-emerald-400 font-mono">random</code>, <code className="text-cyan-400 font-mono">datetime</code>, <code className="text-purple-400 font-mono">sys</code>, <code className="text-amber-400 font-mono">os</code>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master Python's legendary "Batteries Included" standard library: high-precision mathematical operations, pseudo-random &amp; cryptographic sampling, calendar arithmetic with <code className="text-cyan-300 font-mono">timedelta</code>, interpreter metadata with <code className="text-purple-300 font-mono">sys</code>, and cross-platform operating system interaction with <code className="text-amber-300 font-mono">os.path</code>.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📐 math &amp; isclose() Float Precision
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🎲 random vs secrets Cryptographic Security
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📅 datetime, timedelta &amp; strftime / strptime
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            💻 sys.argv, os.environ &amp; os.path.join()
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: THE 5 CORE PILLARS OVERVIEW */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🏛️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The 5 Core Standard Library Pillars
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Python ships out of the box with over 200 standard library modules. The foundational five power 90% of real-world backend, utility, and automation scripts:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 my-6 not-prose">
              {/* Pillar 1: math */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg shadow-teal-950/30">
                <div className="text-teal-400 font-bold text-base mb-1">📐 math</div>
                <p className="text-xs text-slate-300 mb-2">
                  <code className="text-teal-300">sqrt, gcd, ceil, floor, isclose</code>
                </p>
                <span className="text-[11px] text-teal-400/80 font-mono">Precision Math</span>
              </div>

              {/* Pillar 2: random */}
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 shadow-lg shadow-emerald-950/30">
                <div className="text-emerald-400 font-bold text-base mb-1">🎲 random</div>
                <p className="text-xs text-slate-300 mb-2">
                  <code className="text-emerald-300">randint, choice, sample, shuffle</code>
                </p>
                <span className="text-[11px] text-emerald-400/80 font-mono">Simulations &amp; Sampling</span>
              </div>

              {/* Pillar 3: datetime */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg shadow-cyan-950/30">
                <div className="text-cyan-400 font-bold text-base mb-1">📅 datetime</div>
                <p className="text-xs text-slate-300 mb-2">
                  <code className="text-cyan-300">date, timedelta, strftime, strptime</code>
                </p>
                <span className="text-[11px] text-cyan-400/80 font-mono">Date Arithmetic</span>
              </div>

              {/* Pillar 4: sys */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg shadow-purple-950/30">
                <div className="text-purple-400 font-bold text-base mb-1">⚙️ sys</div>
                <p className="text-xs text-slate-300 mb-2">
                  <code className="text-purple-300">argv, platform, exit, getsizeof</code>
                </p>
                <span className="text-[11px] text-purple-400/80 font-mono">Interpreter Runtime</span>
              </div>

              {/* Pillar 5: os */}
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 shadow-lg shadow-amber-950/30">
                <div className="text-amber-400 font-bold text-base mb-1">📂 os</div>
                <p className="text-xs text-slate-300 mb-2">
                  <code className="text-amber-300">getcwd, listdir, environ, path.join</code>
                </p>
                <span className="text-[11px] text-amber-400/80 font-mono">OS &amp; File System</span>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Security Golden Rule: `random` vs `secrets`
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                The <code className="text-emerald-400 font-mono">random</code> module uses the Mersenne Twister algorithm which is completely predictable after observing 624 outputs. <strong>NEVER</strong> use <code className="text-emerald-400 font-mono">random</code> for passwords, security tokens, or OTPs. Always use the cryptographically secure <code className="text-teal-400 font-mono">secrets</code> module instead.
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
              <span className="text-3xl">🧭</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                2. Visualizing Core Standard Library Architecture
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("pillars")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "pillars"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                The 5 Pillars
              </button>
              <button
                onClick={() => setActiveInteractiveTab("datetime")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "datetime"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Datetime Timeline
              </button>
              <button
                onClick={() => setActiveInteractiveTab("osbridge")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "osbridge"
                    ? "bg-amber-900/50 text-amber-300 border border-amber-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                os &amp; sys Hardware Bridge
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining standard library boundaries, date duration pipelines, and host OS interfaces:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "pillars" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">PYTHON STANDARD LIBRARY ECOSYSTEM</text>

                {/* 5 Pillar Columns */}
                <g transform="translate(30, 60)">
                  {/* math */}
                  <rect x="0" y="0" width="150" height="150" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="15" y="28" fill="#99f6e4" fontSize="13" fontWeight="bold">math</text>
                  <text x="15" y="55" fill="#f8fafc" fontSize="10">• sqrt(144) = 12</text>
                  <text x="15" y="75" fill="#f8fafc" fontSize="10">• ceil(14.2) = 15</text>
                  <text x="15" y="95" fill="#f8fafc" fontSize="10">• gcd(48, 180)</text>
                  <text x="15" y="115" fill="#f8fafc" fontSize="10">• isclose(a, b)</text>

                  {/* random */}
                  <rect x="165" y="0" width="150" height="150" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="180" y="28" fill="#a7f3d0" fontSize="13" fontWeight="bold">random</text>
                  <text x="180" y="55" fill="#f8fafc" fontSize="10">• randint(1, 100)</text>
                  <text x="180" y="75" fill="#f8fafc" fontSize="10">• choice(seq)</text>
                  <text x="180" y="95" fill="#f8fafc" fontSize="10">• sample(seq, 3)</text>
                  <text x="180" y="115" fill="#f8fafc" fontSize="10">• shuffle(deck)</text>

                  {/* datetime */}
                  <rect x="330" y="0" width="150" height="150" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="345" y="28" fill="#a5f3fc" fontSize="13" fontWeight="bold">datetime</text>
                  <text x="345" y="55" fill="#f8fafc" fontSize="10">• date(2026, 8, 24)</text>
                  <text x="345" y="75" fill="#f8fafc" fontSize="10">• timedelta(days=30)</text>
                  <text x="345" y="95" fill="#f8fafc" fontSize="10">• strftime('%d-%b')</text>
                  <text x="345" y="115" fill="#f8fafc" fontSize="10">• strptime(str)</text>

                  {/* sys */}
                  <rect x="495" y="0" width="150" height="150" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="510" y="28" fill="#c4b5fd" fontSize="13" fontWeight="bold">sys</text>
                  <text x="510" y="55" fill="#f8fafc" fontSize="10">• sys.argv (CLI)</text>
                  <text x="510" y="75" fill="#f8fafc" fontSize="10">• sys.platform</text>
                  <text x="510" y="95" fill="#f8fafc" fontSize="10">• sys.getsizeof()</text>
                  <text x="510" y="115" fill="#f8fafc" fontSize="10">• sys.exit(0)</text>

                  {/* os */}
                  <rect x="660" y="0" width="150" height="150" rx="8" fill="#451a03" stroke="#f59e0b" />
                  <text x="675" y="28" fill="#fde68a" fontSize="13" fontWeight="bold">os</text>
                  <text x="675" y="55" fill="#f8fafc" fontSize="10">• os.getcwd()</text>
                  <text x="675" y="75" fill="#f8fafc" fontSize="10">• os.listdir()</text>
                  <text x="675" y="95" fill="#f8fafc" fontSize="10">• os.environ</text>
                  <text x="675" y="115" fill="#f8fafc" fontSize="10">• os.path.join()</text>
                </g>

                {/* Bottom Summary */}
                <g transform="translate(30, 230)">
                  <rect x="0" y="0" width="810" height="70" rx="6" fill="#090d16" stroke="#334155" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="13" fontWeight="bold">Batteries Included Philosophy:</text>
                  <text x="20" y="52" fill="#cbd5e1" fontSize="12">
                    These modules are written in high-performance C and require zero external 'pip install' commands!
                  </text>
                </g>
              </svg>
            ) : activeInteractiveTab === "datetime" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">DATETIME TIMELINE &amp; TIMEDELTA ARITHMETIC</text>

                {/* Datetime arithmetic pipeline */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="240" height="130" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="20" y="30" fill="#a5f3fc" fontSize="13" fontWeight="bold">Today: dt.date.today()</text>
                  <text x="20" y="65" fill="#f8fafc" fontSize="16" fontWeight="bold">2026-08-24</text>
                  <text x="20" y="100" fill="#94a3b8" fontSize="11">Current Session Date</text>

                  {/* Plus arrow */}
                  <text x="260" y="70" fill="#38bdf8" fontSize="24" fontWeight="bold">+</text>

                  {/* Timedelta */}
                  <rect x="295" y="0" width="240" height="130" rx="8" fill="#1e1b4b" stroke="#818cf8" />
                  <text x="315" y="30" fill="#c7d2fe" fontSize="13" fontWeight="bold">dt.timedelta(days=30)</text>
                  <text x="315" y="65" fill="#a7f3d0" fontSize="16" fontWeight="bold">+30 Days Duration</text>
                  <text x="315" y="100" fill="#94a3b8" fontSize="11">Invoice Due Offset</text>

                  {/* Equals arrow */}
                  <text x="555" y="70" fill="#38bdf8" fontSize="24" fontWeight="bold">=</text>

                  {/* Due Date */}
                  <rect x="590" y="0" width="220" height="130" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="610" y="30" fill="#a7f3d0" fontSize="13" fontWeight="bold">Invoice Due Date</text>
                  <text x="610" y="65" fill="#ecfdf5" fontSize="16" fontWeight="bold">2026-09-23</text>
                  <text x="610" y="100" fill="#a7f3d0" fontSize="11">Calculated Automatically!</text>
                </g>

                {/* Parsing vs Formatting */}
                <g transform="translate(30, 200)">
                  <rect x="0" y="0" width="810" height="90" rx="6" fill="#090d16" stroke="#334155" />
                  <text x="20" y="30" fill="#38bdf8" fontSize="13" fontWeight="bold">strftime() vs strptime() Mnemonic:</text>
                  <text x="20" y="55" fill="#cbd5e1" fontSize="12">
                    • <tspan fill="#34d399" fontWeight="bold">strftime("%d-%b-%Y")</tspan> = Datetime <tspan fill="#38bdf8">→</tspan> String (String <strong>F</strong>ormat Time)
                  </text>
                  <text x="20" y="75" fill="#cbd5e1" fontSize="12">
                    • <tspan fill="#34d399" fontWeight="bold">strptime(str, format)</tspan> = String <tspan fill="#38bdf8">→</tspan> Datetime (String <strong>P</strong>arse Time)
                  </text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#f59e0b" fontSize="14" fontWeight="bold">os &amp; sys: OPERATING SYSTEM &amp; HOST RUNTIME BRIDGE</text>

                {/* Left: sys runtime */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="390" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="13" fontWeight="bold">sys: CPython Runtime Internals</text>
                  <text x="20" y="65" fill="#cbd5e1" fontSize="12 font-mono">• sys.argv = ['app.py', '--port', '8000']</text>
                  <text x="20" y="95" fill="#cbd5e1" fontSize="12 font-mono">• sys.platform = 'win32' (or 'linux')</text>
                  <text x="20" y="125" fill="#cbd5e1" fontSize="12 font-mono">• sys.getsizeof(42) = 28 bytes</text>
                  <text x="20" y="155" fill="#cbd5e1" fontSize="12 font-mono">• sys.exit(0) / sys.exit(1)</text>

                  <rect x="20" y="180" width="350" height="40" rx="4" fill="#090d16" stroke="#475569" />
                  <text x="30" y="205" fill="#34d399" fontSize="11">Bridge to Python Interpreter &amp; CLI</text>
                </g>

                {/* Right: os filesystem */}
                <g transform="translate(450, 50)">
                  <rect x="0" y="0" width="390" height="240" rx="8" fill="#451a03" stroke="#f59e0b" />
                  <text x="20" y="30" fill="#fde68a" fontSize="13" fontWeight="bold">os &amp; os.path: OS &amp; File System Bridge</text>
                  <text x="20" y="65" fill="#cbd5e1" fontSize="12 font-mono">• os.getcwd() = Current working directory</text>
                  <text x="20" y="95" fill="#cbd5e1" fontSize="12 font-mono">• os.listdir('./reports')</text>
                  <text x="20" y="125" fill="#cbd5e1" fontSize="12 font-mono">• os.environ.get('USERNAME')</text>
                  <text x="20" y="155" fill="#cbd5e1" fontSize="12 font-mono">• os.path.join('data', 'file.csv')</text>

                  <rect x="20" y="180" width="350" height="40" rx="4" fill="#090d16" stroke="#475569" />
                  <text x="30" y="205" fill="#f59e0b" fontSize="11">Cross-Platform File System Portability</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE STDLIB EXPLORER */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Standard Library Explorer
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Select a module to test live Python standard library functions and inspect generated code:
          </p>

          {/* Module Selector Buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { id: "math", label: "math Module" },
              { id: "random", label: "random & secrets" },
              { id: "datetime", label: "datetime & timedelta" },
              { id: "sys", label: "sys Module" },
              { id: "os", label: "os & os.path" },
            ].map((mod) => (
              <button
                key={mod.id}
                onClick={() => setSelectedModule(mod.id)}
                className={clsx(
                  "py-2 px-4 rounded-xl text-xs sm:text-sm font-mono font-bold border transition-all",
                  selectedModule === mod.id
                    ? "bg-teal-950 border-teal-500 text-teal-300 shadow-md shadow-teal-950"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                )}
              >
                {mod.label}
              </button>
            ))}
          </div>

          {/* Explorer Dynamic Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Left Controls */}
            {selectedModule === "math" ? (
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-400 block font-bold">
                  GCD &amp; Float Precision Inspector
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Number A</label>
                    <input
                      type="number"
                      value={mathInputA}
                      onChange={(e) => setMathInputA(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-teal-300 font-mono text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Number B</label>
                    <input
                      type="number"
                      value={mathInputB}
                      onChange={(e) => setMathInputB(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-teal-300 font-mono text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2 text-xs font-mono text-slate-300 pt-2">
                  <div>• math.gcd({mathInputA}, {mathInputB}) = <span className="text-emerald-400 font-bold">{gcd(mathInputA, mathInputB)}</span></div>
                  <div>• math.sqrt({mathInputA}) = <span className="text-cyan-300 font-bold">{Math.sqrt(mathInputA).toFixed(3)}</span></div>
                  <div>• math.isclose(0.1 + 0.2, 0.3) = <span className="text-emerald-400 font-bold">True</span></div>
                </div>
              </div>
            ) : selectedModule === "random" ? (
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 block font-bold">
                  Sampling &amp; Seeding Explorer
                </span>
                <p className="text-xs text-slate-300">
                  Candidate Pool: <code className="text-emerald-300">['Susmita', 'Rahul', 'Priya', 'Anirban', 'Sneha']</code>
                </p>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono space-y-1.5">
                  <div>random.seed(2026)</div>
                  <div>random.sample(pool, 2) → <span className="text-emerald-300 font-bold">['Susmita', 'Rahul']</span></div>
                  <div>secrets.token_hex(8) → <span className="text-teal-300 font-bold">a9f83c12d45e7b89</span> (Secure)</div>
                </div>
              </div>
            ) : selectedModule === "datetime" ? (
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 block font-bold">
                  Date Arithmetic &amp; Formatting
                </span>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono space-y-1.5">
                  <div>Session Date: <span className="text-cyan-300 font-bold">2026-08-24</span></div>
                  <div>+ timedelta(days=30) → <span className="text-emerald-300 font-bold">2026-09-23</span> (Due Date)</div>
                  <div>strftime('%d-%b-%Y') → <span className="text-teal-300 font-bold">'24-Aug-2026'</span></div>
                </div>
              </div>
            ) : selectedModule === "sys" ? (
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider text-purple-400 block font-bold">
                  Interpreter Runtime &amp; Memory
                </span>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono space-y-1.5">
                  <div>sys.version → <span className="text-purple-300 font-bold">CPython 3.13.2</span></div>
                  <div>sys.platform → <span className="text-purple-300 font-bold">'win32'</span></div>
                  <div>sys.getsizeof(42) → <span className="text-emerald-300 font-bold">28 bytes</span></div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 block font-bold">
                  File System &amp; Environment
                </span>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono space-y-1.5">
                  <div>os.getcwd() → <span className="text-amber-300 font-bold">'e:/react_routing_tailwind'</span></div>
                  <div>os.path.join('data', 'app.csv') → <span className="text-emerald-300 font-bold">'data\\app.csv'</span></div>
                  <div>os.environ.get('USERNAME') → <span className="text-teal-300 font-bold">'sukanta'</span></div>
                </div>
              </div>
            )}

            {/* Right Python Code Display */}
            <div className="space-y-2 flex flex-col justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                Generated Python Script
              </span>
              <pre className="p-4 bg-slate-900 rounded-lg border border-slate-800 text-teal-300 font-mono text-xs overflow-x-auto whitespace-pre-wrap flex-1">
                {selectedModule === "math"
                  ? `import math\n\nprint("GCD:", math.gcd(${mathInputA}, ${mathInputB}))\nprint("Safe Float:", math.isclose(0.1 + 0.2, 0.3))`
                  : selectedModule === "random"
                  ? `import random, secrets\n\nrandom.seed(42)\nprint("Winner:", random.choice(["Susmita", "Rahul", "Priya"]))\nprint("Secure Token:", secrets.token_hex(16))`
                  : selectedModule === "datetime"
                  ? `import datetime as dt\n\ntoday = dt.date(2026, 8, 24)\ndue_date = today + dt.timedelta(days=30)\nprint("Due Date:", due_date.strftime("%d-%b-%Y"))`
                  : selectedModule === "sys"
                  ? `import sys\n\nprint("Platform:", sys.platform)\nprint("Memory for int(42):", sys.getsizeof(42), "bytes")`
                  : `import os\n\npath = os.path.join("reports", "2026", "august.csv")\nprint("Cross-Platform Path:", path)`}
              </pre>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER STDLIB COMPARISON MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Standard Library Reference Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Module</th>
                  <th className="py-3.5 px-4 font-bold">Domain Purpose</th>
                  <th className="py-3.5 px-4 font-bold">Essential Functions / Classes</th>
                  <th className="py-3.5 px-4 font-bold">Security / Accuracy Gotchas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">math</td>
                  <td className="py-3 px-4">Precision mathematics &amp; roots</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">sqrt, ceil, floor, gcd, isclose</td>
                  <td className="py-3 px-4">Use <code className="text-teal-300">math.isclose()</code> for float equality checks</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-emerald-300 font-semibold">random</td>
                  <td className="py-3 px-4">Pseudo-random simulations &amp; sampling</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">randint, choice, sample, shuffle</td>
                  <td className="py-3 px-4 font-mono text-rose-400">UNSAFE for passwords! Use <code className="text-emerald-300">secrets</code></td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">datetime</td>
                  <td className="py-3 px-4">Calendar dates, times, and duration math</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">date, datetime, timedelta, strftime</td>
                  <td className="py-3 px-4"><code className="text-cyan-300">strftime</code> (format) vs <code className="text-cyan-300">strptime</code> (parse)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">sys</td>
                  <td className="py-3 px-4">Interpreter internals &amp; runtime parameters</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">argv, platform, version, getsizeof</td>
                  <td className="py-3 px-4"><code className="text-purple-300">sys.argv[0]</code> is always the script name itself</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">os</td>
                  <td className="py-3 px-4">Operating system &amp; filesystem bridge</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">getcwd, listdir, environ, path.join</td>
                  <td className="py-3 px-4">Always use <code className="text-amber-300">os.path.join</code> (avoid string concat)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 5: LIVE PYTHON CODE LAB */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">💻</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              5. Interactive Code Lab: Production Scripts
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Explore 4 production-grade Python scripts demonstrating math roots, random sampling vs secrets, timedelta date arithmetic, and enterprise diagnostic suites:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "math_and_random_modules.py",
                code: mathRandom,
                description: "math functions (gcd, isclose), random choice/sample/shuffle, and cryptographically secure secrets OTP generator.",
              },
              {
                filename: "datetime_and_time_modules.py",
                code: datetimeTime,
                description: "datetime objects, timedelta date calculations, strftime formatting, strptime parsing, and time.perf_counter benchmarking.",
              },
              {
                filename: "sys_and_os_system_modules.py",
                code: sysOs,
                description: "sys CLI arguments and memory footprints (sys.getsizeof), plus os.getcwd, os.environ, and os.path.join.",
              },
              {
                filename: "automated_system_audit_and_lottery.py",
                code: systemAudit,
                description: "Enterprise environment audit diagnostic and verifiable student scholarship lottery selector combining all 5 modules.",
              },
            ]}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 6: COMMON TRAPS & EDGE CASES */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚠️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              6. Common Traps, Anti-Patterns &amp; Edge Cases
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Trap 1 */}
            <div className="p-6 rounded-xl bg-rose-950/30 border border-rose-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
                <span>❌</span> Trap 1: Using `random` for Auth &amp; Passwords
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Using <code className="text-rose-300 font-mono">random.randint()</code> or <code className="text-rose-300 font-mono">random.choice()</code> to generate security tokens creates easily crackable vulnerabilities.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Always use <code className="text-emerald-300">secrets.token_hex(16)</code> or <code className="text-emerald-300">secrets.token_urlsafe(16)</code>!
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Direct Float Equality Comparison
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-amber-300 font-mono">0.1 + 0.2 == 0.3</code> evaluates to <code className="text-amber-300 font-mono">False</code> due to binary IEEE 754 float inaccuracies.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use <code className="text-emerald-300">math.isclose(0.1 + 0.2, 0.3)</code> or Python's <code className="text-emerald-300">decimal.Decimal</code>!
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Hardcoding Windows Slashes in File Paths
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-purple-300 font-mono">"reports\\" + name</code> breaks on Linux web servers and Docker containers.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Always use <code className="text-emerald-300">os.path.join("reports", name)</code> or <code className="text-emerald-300">pathlib.Path</code>.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Accessing `os.environ` With Direct Indexing
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-cyan-300 font-mono">os.environ["API_KEY"]</code> crashes with <code className="text-cyan-300 font-mono">KeyError</code> if the environment variable has not been set.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use <code className="text-emerald-300">os.environ.get("API_KEY", "default_val")</code>.
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQ & INTERVIEW REVIEW QUESTIONS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">❓</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              7. Master Review &amp; Interview Questions (25 FAQs)
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Comprehensive question-and-answer repository covering math, random vs secrets, datetime timedelta, sys runtime metadata, and os filesystem management:
          </p>

          <FAQTemplate questions={questions} />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: STUDY NOTES, PRINTABLE HANDOUT & TEACHER BIO */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📄</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              8. Study Notes, Printable Handout &amp; Teacher Profile
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Download or print the complete reference sheet with standard library cheat sheets, timedelta formulas, and cross-platform path rules:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic2_built_in_standard_library_notes.txt"
              title="Print Topic 2 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
