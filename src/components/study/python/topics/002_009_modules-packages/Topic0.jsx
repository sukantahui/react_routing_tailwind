import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import syntaxVariations from "./topic0_files/import_syntax_variations.py?raw";
import importInternals from "./topic0_files/import_internals_and_bytecode.py?raw";
import circularResolution from "./topic0_files/circular_imports_and_resolution.py?raw";
import financialToolkit from "./topic0_files/financial_toolkit_importer.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic0_files/topic0_note.txt?raw";

// FAQ Questions
import questions from "./topic0_files/topic0_questions";

/**
 * Topic0: import & from-import syntax variations
 * Module: 002_009_modules-packages
 * Segment: 2 (Practical Python for Real-World Development)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic0() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("lifecycle");

  // Interactive Import Playground State
  const [selectedSyntax, setSelectedSyntax] = useState("direct"); // direct, mod_alias, symbol, sym_alias, wildcard

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

  const syntaxDetails = {
    direct: {
      label: "import math",
      title: "Direct Module Import",
      syntax: "import math",
      boundName: "math (Module Object)",
      access: "math.sqrt(144)",
      safety: "100% Safe (Explicit Namespace)",
      badgeColor: "text-emerald-300 bg-emerald-950/80 border-emerald-800",
      description: "Binds the module object to the current namespace. All calls require the 'math.' prefix, guaranteeing zero variable collisions.",
      code: "import math\n\nradius = 7.0\narea = math.pi * (radius ** 2)\nprint(f'Area: {area:.2f}')  # Area: 153.94",
    },
    mod_alias: {
      label: "import datetime as dt",
      title: "Module Aliasing",
      syntax: "import datetime as dt",
      boundName: "dt (Alias Object)",
      access: "dt.date.today()",
      safety: "100% Safe (Shortened Namespace)",
      badgeColor: "text-emerald-300 bg-emerald-950/80 border-emerald-800",
      description: "Standard convention across scientific and data libraries (e.g. np, pd, plt) to shorten repetitive namespace prefixes.",
      code: "import datetime as dt\n\ntoday = dt.date(2026, 8, 24)\nprint(f'Session Date: {today:%d-%B-%Y}')  # 24-August-2026",
    },
    symbol: {
      label: "from decimal import Decimal",
      title: "Specific Symbol Import",
      syntax: "from decimal import Decimal, ROUND_HALF_UP",
      boundName: "Decimal, ROUND_HALF_UP (Direct Classes/Funcs)",
      access: "Decimal('14337.00')",
      safety: "High (Clean, but may shadow local names)",
      badgeColor: "text-blue-300 bg-blue-950/80 border-blue-800",
      description: "Imports individual functions or classes directly into the current namespace, avoiding the module prefix for frequently used utilities.",
      code: "from decimal import Decimal, ROUND_HALF_UP\n\nfee = Decimal('4500.555').quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)\nprint(f'Fee: INR {fee}')  # INR 4500.56",
    },
    sym_alias: {
      label: "from statistics import mean as avg",
      title: "Symbol Aliasing",
      syntax: "from statistics import mean as calculate_average",
      boundName: "calculate_average (Aliased Function)",
      access: "calculate_average([90, 95, 100])",
      safety: "100% Safe (Resolves local name conflicts)",
      badgeColor: "text-emerald-300 bg-emerald-950/80 border-emerald-800",
      description: "Renames the imported symbol locally to eliminate naming collisions with existing variables or functions.",
      code: "from statistics import mean as calculate_average\n\nscores = [88, 92, 96, 94]\nprint(f'Average: {calculate_average(scores):.1f}%')  # Average: 92.5%",
    },
    wildcard: {
      label: "from math import *",
      title: "Wildcard Import (Anti-Pattern)",
      syntax: "from math import *",
      boundName: "All 50+ math symbols dumped into global scope",
      access: "sqrt(16), pi, sin(0)",
      safety: "CRITICAL DANGER: Namespace Pollution & Shadowing",
      badgeColor: "text-rose-400 bg-rose-950/80 border-rose-800",
      description: "DANGEROUS ANTI-PATTERN: Floods the local scope, silently overwrites existing variables, and breaks IDE autocomplete and code linters.",
      code: "# AVOID THIS IN PRODUCTION!\nfrom math import *\n\n# If you also do 'from numpy import *', 'sqrt' is silently overwritten!\nprint(sqrt(25))",
    },
  };

  const current = syntaxDetails[selectedSyntax];

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
            Topic 0
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Modules, Packages &amp; Python Standard Library
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          <code className="text-teal-400 font-mono">import</code> &amp; <code className="text-cyan-400 font-mono">from-import</code> Syntax Variations &amp; Namespace Architecture
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master Python’s module loading pipeline: direct imports, alias binding (<code className="text-teal-300 font-mono">import as</code>), specific symbol imports (<code className="text-cyan-300 font-mono">from import</code>), the 4-step import lifecycle (<code className="text-purple-300 font-mono">sys.modules</code> cache &amp; <code className="text-purple-300 font-mono">__pycache__</code> bytecode), and resolving circular dependency cycles.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📦 import vs from-import
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ sys.modules Cache &amp; Bytecode (.pyc)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🚫 Wildcard Import Anti-Pattern
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔄 Circular Import Resolution (DAG Design)
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: THE IMPORT TAXONOMY */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧱</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The 4 Legitimate Import Styles vs 1 Toxic Anti-Pattern
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              In Python, every <code className="text-teal-400 font-mono">.py</code> file is a standalone <strong>module</strong>. The <code className="text-teal-400 font-mono">import</code> keyword brings external logic into your script while managing namespace boundaries:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 not-prose">
              {/* Style 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg shadow-teal-950/30">
                <div className="flex items-center gap-2 text-teal-400 font-bold text-base mb-1">
                  <span>1️⃣</span> Direct Module Import
                </div>
                <code className="text-xs font-mono text-teal-300 block mb-2">import math</code>
                <p className="text-xs text-slate-300">
                  Access via <code className="text-teal-300">math.pi</code>. Cleanest, explicit, zero namespace pollution.
                </p>
              </div>

              {/* Style 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg shadow-cyan-950/30">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-base mb-1">
                  <span>2️⃣</span> Module Aliasing
                </div>
                <code className="text-xs font-mono text-cyan-300 block mb-2">import datetime as dt</code>
                <p className="text-xs text-slate-300">
                  Access via <code className="text-cyan-300">dt.date</code>. Standard for data science (<code className="text-slate-400">np, pd, plt</code>).
                </p>
              </div>

              {/* Style 3 */}
              <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-800/60 shadow-lg shadow-blue-950/30">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-base mb-1">
                  <span>3️⃣</span> Specific Symbol Import
                </div>
                <code className="text-xs font-mono text-blue-300 block mb-2">from decimal import Decimal</code>
                <p className="text-xs text-slate-300">
                  Direct access to <code className="text-blue-300">Decimal()</code> without repeating package names.
                </p>
              </div>

              {/* Style 4 */}
              <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/60 shadow-lg shadow-indigo-950/30">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-base mb-1">
                  <span>4️⃣</span> Symbol Aliasing
                </div>
                <code className="text-xs font-mono text-indigo-300 block mb-2">from math import ceil as round_up</code>
                <p className="text-xs text-slate-300">
                  Resolves local identifier naming collisions cleanly.
                </p>
              </div>
            </div>

            <div className="bg-rose-950/40 p-5 rounded-xl border-l-4 border-rose-500 border border-rose-900/60">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                ☠️ The Wildcard Import Anti-Pattern: <code className="text-rose-200 font-mono">from module import *</code>
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Wildcard imports dump hundreds of unknown identifiers directly into your global namespace. If two modules define functions with the same name, the second import silently overwrites the first without an error! Always use explicit symbol imports.
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
              <span className="text-3xl">⚙️</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                2. Visualizing Import Internals &amp; Dependency Graphs
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("lifecycle")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "lifecycle"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Import Lifecycle Pipeline
              </button>
              <button
                onClick={() => setActiveInteractiveTab("namespace")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "namespace"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Namespace Isolation
              </button>
              <button
                onClick={() => setActiveInteractiveTab("circular")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "circular"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Circular Import Deadlock
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining CPython cache resolution, namespace dictionary bindings, and DAG refactoring:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "lifecycle" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">CPYTHON 4-STEP IMPORT LIFECYCLE</text>

                {/* 4 Pipeline Stages */}
                <g transform="translate(30, 60)">
                  {/* Step 1 */}
                  <rect x="0" y="0" width="185" height="130" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="15" y="28" fill="#99f6e4" fontSize="12" fontWeight="bold">1. sys.modules Cache</text>
                  <text x="15" y="55" fill="#f8fafc" fontSize="11">Checks in-memory cache.</text>
                  <text x="15" y="75" fill="#a7f3d0" fontSize="11">If found → Returns cached reference instantly!</text>

                  {/* Arrow 1 */}
                  <path d="M 195 65 L 215 65" stroke="#2dd4bf" strokeWidth="2" markerEnd="url(#arrow)" />

                  {/* Step 2 */}
                  <rect x="220" y="0" width="185" height="130" rx="8" fill="#1e293b" stroke="#38bdf8" />
                  <text x="235" y="28" fill="#bae6fd" fontSize="12" fontWeight="bold">2. sys.path Finder</text>
                  <text x="235" y="55" fill="#f8fafc" fontSize="11">Searches directories:</text>
                  <text x="235" y="75" fill="#cbd5e1" fontSize="10">• Current working dir</text>
                  <text x="235" y="90" fill="#cbd5e1" fontSize="10">• PYTHONPATH</text>
                  <text x="235" y="105" fill="#cbd5e1" fontSize="10">• Stdlib &amp; site-packages</text>

                  {/* Step 3 */}
                  <rect x="440" y="0" width="185" height="130" rx="8" fill="#1e1b4b" stroke="#818cf8" />
                  <text x="455" y="28" fill="#c7d2fe" fontSize="12" fontWeight="bold">3. Bytecode Compilation</text>
                  <text x="455" y="55" fill="#f8fafc" fontSize="11">Compiles .py to .pyc</text>
                  <text x="455" y="75" fill="#a7f3d0" fontSize="11">Stored in __pycache__/</text>
                  <text x="455" y="95" fill="#cbd5e1" fontSize="10">Skips if .pyc is fresh!</text>

                  {/* Step 4 */}
                  <rect x="660" y="0" width="180" height="130" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="675" y="28" fill="#a7f3d0" fontSize="12" fontWeight="bold">4. Execution &amp; Binding</text>
                  <text x="675" y="55" fill="#f8fafc" fontSize="11">Runs top-level code.</text>
                  <text x="675" y="75" fill="#ecfdf5" fontSize="11">Stores in sys.modules</text>
                  <text x="675" y="95" fill="#ecfdf5" fontSize="11">Binds name locally.</text>
                </g>

                {/* Bottom Invariant */}
                <g transform="translate(30, 220)">
                  <rect x="0" y="0" width="810" height="70" rx="6" fill="#090d16" stroke="#334155" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="13" fontWeight="bold">Single-Execution Guarantee:</text>
                  <text x="20" y="52" fill="#cbd5e1" fontSize="12">
                    Even if 'import my_mod' is written 100 times across 20 files, Python executes the module file ONLY ONCE per process!
                  </text>
                </g>
              </svg>
            ) : activeInteractiveTab === "namespace" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">NAMESPACE BOUNDARIES: EXPLICIT IMPORT VS WILDCARD POLLUTION</text>

                {/* Left: Clean Namespace */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="390" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="13" fontWeight="bold">A. Clean Isolated Namespace (import math)</text>
                  <rect x="20" y="50" width="350" height="70" rx="6" fill="#022c22" stroke="#059669" />
                  <text x="35" y="75" fill="#34d399" fontSize="12" fontWeight="bold">Global Scope Namespace</text>
                  <text x="35" y="95" fill="#f8fafc" fontSize="12">Contains: &#123;'math': &lt;module 'math'&gt;&#125;</text>

                  <text x="20" y="150" fill="#ecfdf5" fontSize="12">• Access requires explicit prefix: <tspan fill="#34d399" fontWeight="bold">math.sqrt(16)</tspan></text>
                  <text x="20" y="175" fill="#ecfdf5" fontSize="12">• Zero risk of variable collisions with local names.</text>
                  <text x="20" y="200" fill="#ecfdf5" fontSize="12">• IDE autocompletion is blazing fast.</text>
                </g>

                {/* Right: Polluted Namespace */}
                <g transform="translate(450, 50)">
                  <rect x="0" y="0" width="390" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="13" fontWeight="bold">B. Polluted Namespace (from math import *)</text>
                  <rect x="20" y="50" width="350" height="70" rx="6" fill="#881337" stroke="#e11d48" />
                  <text x="35" y="75" fill="#fca5a5" fontSize="12" fontWeight="bold">Global Scope Namespace</text>
                  <text x="35" y="95" fill="#f8fafc" fontSize="11">Contains: pi, sqrt, sin, cos, tan, log, exp, gcd... (50+)</text>

                  <text x="20" y="150" fill="#ffe4e6" fontSize="12">• Local variables named 'pi' or 'sin' get overwritten!</text>
                  <text x="20" y="175" fill="#ffe4e6" fontSize="12">• Impossible to trace where functions originated.</text>
                  <text x="20" y="200" fill="#ffe4e6" fontSize="12">• Severe anti-pattern in production software.</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">CIRCULAR IMPORT DEADLOCK &amp; DAG REFACTORING</text>

                {/* Left: Deadlock Cycle */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="390" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="13" fontWeight="bold">Problem: Mutual Top-Level Cycle</text>
                  <text x="20" y="65" fill="#cbd5e1" fontSize="12 font-mono">module_a.py → from module_b import func_b</text>
                  <text x="20" y="90" fill="#cbd5e1" fontSize="12 font-mono">module_b.py → from module_a import func_a</text>

                  <rect x="20" y="120" width="350" height="90" rx="6" fill="#090d16" stroke="#e11d48" />
                  <text x="35" y="145" fill="#f43f5e" fontSize="12" fontWeight="bold">CRASH: ImportError</text>
                  <text x="35" y="170" fill="#fda4af" fontSize="11">cannot import name 'func_a' from</text>
                  <text x="35" y="190" fill="#fda4af" fontSize="11">partially initialized module 'module_a'</text>
                </g>

                {/* Right: Solution Refactoring */}
                <g transform="translate(450, 50)">
                  <rect x="0" y="0" width="390" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="13" fontWeight="bold">Solution: Directed Acyclic Graph (DAG)</text>
                  <rect x="20" y="55" width="350" height="50" rx="6" fill="#022c22" stroke="#059669" />
                  <text x="35" y="85" fill="#34d399" fontSize="12 font-mono" fontWeight="bold">models.py / common.py (Shared Types)</text>

                  <text x="20" y="145" fill="#ecfdf5" fontSize="12">• Both <tspan fill="#38bdf8">module_a</tspan> and <tspan fill="#38bdf8">module_b</tspan> import from <tspan fill="#34d399">models.py</tspan>.</text>
                  <text x="20" y="175" fill="#ecfdf5" fontSize="12">• Cycle is broken into a clean 1-way dependency.</text>
                  <text x="20" y="205" fill="#ecfdf5" fontSize="12">• Or use function-level deferred imports!</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE IMPORT PLAYGROUND */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Import Syntax &amp; Namespace Playground
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Select an import syntax pattern to inspect its namespace binding, member access syntax, and collision safety rating:
          </p>

          {/* Syntax Selector Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
            {Object.keys(syntaxDetails).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedSyntax(key)}
                className={clsx(
                  "py-2.5 px-3 rounded-xl text-xs font-mono font-bold border transition-all text-center",
                  selectedSyntax === key
                    ? "bg-teal-950 border-teal-500 text-teal-300 shadow-md shadow-teal-950"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                )}
              >
                {syntaxDetails[key].label}
              </button>
            ))}
          </div>

          {/* Playground Details Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Left Column: Properties */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
                  Import Syntax Pattern
                </span>
                <code className="text-base font-mono font-bold text-teal-300 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 block">
                  {current.syntax}
                </code>
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
                  Bound Local Identifier
                </span>
                <div className="text-sm font-mono text-slate-200">{current.boundName}</div>
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
                  Access Calling Syntax
                </span>
                <code className="text-sm font-mono text-cyan-300">{current.access}</code>
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
                  Namespace Safety Rating
                </span>
                <span className={clsx("inline-block text-xs font-mono font-bold px-3 py-1 rounded-full border", current.badgeColor)}>
                  {current.safety}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed pt-2">
                {current.description}
              </p>
            </div>

            {/* Right Column: Code Snippet */}
            <div className="space-y-2 flex flex-col justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                Live Python Code Demonstration
              </span>
              <pre className="p-4 bg-slate-900 rounded-lg border border-slate-800 text-teal-300 font-mono text-xs overflow-x-auto whitespace-pre-wrap flex-1">
                {current.code}
              </pre>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER IMPORT MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Import Syntax &amp; Namespace Comparison Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Import Statement</th>
                  <th className="py-3.5 px-4 font-bold">Bound Local Name</th>
                  <th className="py-3.5 px-4 font-bold">How to Call Members</th>
                  <th className="py-3.5 px-4 font-bold">Namespace Safety</th>
                  <th className="py-3.5 px-4 font-bold">Recommended Usage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">import math</td>
                  <td className="py-3 px-4 font-mono text-slate-200">math</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">math.sqrt(16)</td>
                  <td className="py-3 px-4 font-mono text-emerald-400 font-bold">Highest</td>
                  <td className="py-3 px-4">Standard library &amp; general modules</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">import datetime as dt</td>
                  <td className="py-3 px-4 font-mono text-slate-200">dt</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">dt.date.today()</td>
                  <td className="py-3 px-4 font-mono text-emerald-400 font-bold">Highest</td>
                  <td className="py-3 px-4">Data science standard (np, pd, plt)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-blue-300 font-semibold">from decimal import Decimal</td>
                  <td className="py-3 px-4 font-mono text-slate-200">Decimal</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Decimal("10.5")</td>
                  <td className="py-3 px-4 font-mono text-blue-400">High</td>
                  <td className="py-3 px-4">Specific classes/functions used heavily</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-indigo-300 font-semibold">from math import ceil as c</td>
                  <td className="py-3 px-4 font-mono text-slate-200">c</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">c(4.2)</td>
                  <td className="py-3 px-4 font-mono text-emerald-400 font-bold">Highest</td>
                  <td className="py-3 px-4">Resolving local variable name collisions</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-rose-400 font-semibold">from math import *</td>
                  <td className="py-3 px-4 font-mono text-rose-300">50+ identifiers</td>
                  <td className="py-3 px-4 font-mono text-rose-300">sqrt(16)</td>
                  <td className="py-3 px-4 font-mono text-rose-400 font-bold">Toxic (Dangerous)</td>
                  <td className="py-3 px-4">NEVER in production (Anti-pattern)</td>
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
            Explore 4 production-grade Python scripts demonstrating import syntax variations, bytecode inspection, circular import resolution, and modular financial toolkits:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "import_syntax_variations.py",
                code: syntaxVariations,
                description: "Direct imports, aliasing (dt, pd), specific symbol imports (Decimal), and the wildcard import anti-pattern.",
              },
              {
                filename: "import_internals_and_bytecode.py",
                code: importInternals,
                description: "The 4-step import lifecycle, inspecting sys.modules, and dynamic imports via importlib.import_module().",
              },
              {
                filename: "circular_imports_and_resolution.py",
                code: circularResolution,
                description: "Anatomy of circular import cycles, deferred function-level imports, and DAG architectural refactoring.",
              },
              {
                filename: "financial_toolkit_importer.py",
                code: financialToolkit,
                description: "Production financial assessment toolkit combining Decimal, math.ceil, datetime, and typing imports.",
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
                <span>❌</span> Trap 1: Module Shadowing (Naming Files math.py)
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                If you name a script <code className="text-rose-300 font-mono">math.py</code> or <code className="text-rose-300 font-mono">random.py</code>, Python will import your file instead of the standard library module, crashing other libraries with <code className="text-rose-300 font-mono">AttributeError</code>!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Never give custom script files the same name as standard Python modules.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Believing Multiple Imports Slow Down Programs
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Some beginners fear writing <code className="text-amber-300 font-mono">import math</code> in multiple files. In reality, Python caches loaded modules in <code className="text-amber-300 font-mono">sys.modules</code>, so subsequent imports take <strong>microseconds</strong>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Import what each file needs explicitly at the top of that file.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Wildcard Variable Collisions
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-purple-300 font-mono">from module_a import *</code> followed by <code className="text-purple-300 font-mono">from module_b import *</code> silently overwrites any functions shared between both modules without warning.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use explicit imports: <code className="text-emerald-300">from module_a import func_a</code>
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Circular Import Deadlock
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                When A imports B and B imports A at the top level, you will encounter <code className="text-cyan-300 font-mono">ImportError: cannot import name from partially initialized module</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Move the import inside the function, or extract shared models into <code className="text-emerald-300">models.py</code>.
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
            Comprehensive question-and-answer repository covering import lifecycle, sys.modules cache, bytecode optimization, and dependency management:
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
            Download or print the complete reference sheet with import syntax matrices, bytecode lifecycle diagrams, and DAG refactoring rules:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic0_import_syntax_notes.txt"
              title="Print Topic 0 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
