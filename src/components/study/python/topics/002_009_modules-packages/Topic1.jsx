import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import sysPathSearch from "./topic1_files/sys_path_and_search_order.py?raw";
import namespaceGlobals from "./topic1_files/module_namespace_and_globals.py?raw";
import moduleShadowing from "./topic1_files/module_shadowing_and_isolation.py?raw";
import pluginLoader from "./topic1_files/dynamic_plugin_loader.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic1_files/topic1_note.txt?raw";

// FAQ Questions
import questions from "./topic1_files/topic1_questions";

/**
 * Topic1: Module search path (sys.path) and module namespace
 * Module: 002_009_modules-packages
 * Segment: 2 (Practical Python for Real-World Development)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic1() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("precedence");

  // Interactive sys.path Simulator State
  const [queryModule, setQueryModule] = useState("math");

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

  const simulateSearch = (modName) => {
    const lower = modName.toLowerCase().trim();
    if (lower === "random" || lower === "shadowed_random") {
      return {
        matchedTier: "Tier 1: Current Script Directory (sys.path[0])",
        resolvedPath: "e:/react_routing_tailwind/src/random.py",
        isShadowed: true,
        badge: "DANGER: Shadowing Standard Library",
        color: "text-rose-400 bg-rose-950/80 border-rose-800",
        explanation: "Python found your local 'random.py' in the current working directory first, blocking the standard library random module!",
      };
    } else if (lower === "math" || lower === "json" || lower === "datetime" || lower === "sys" || lower === "os") {
      return {
        matchedTier: "Tier 3: Standard Library Directory",
        resolvedPath: `C:/Python313/Lib/${lower}.py`,
        isShadowed: false,
        badge: "Standard Library Module",
        color: "text-emerald-300 bg-emerald-950/80 border-emerald-800",
        explanation: "Resolved cleanly from Python's standard library directory without local conflicts.",
      };
    } else if (lower === "numpy" || lower === "pandas" || lower === "requests" || lower === "fastapi") {
      return {
        matchedTier: "Tier 4: Third-Party Packages (site-packages)",
        resolvedPath: `C:/Python313/Lib/site-packages/${lower}/__init__.py`,
        isShadowed: false,
        badge: "Third-Party pip Package",
        color: "text-cyan-300 bg-cyan-950/80 border-cyan-800",
        explanation: "Resolved from virtual environment or global site-packages directory.",
      };
    } else if (lower === "custom_plugin" || lower === "finance_utils") {
      return {
        matchedTier: "Tier 1: Current Script Directory (sys.path[0])",
        resolvedPath: `e:/react_routing_tailwind/src/components/study/python/${lower}.py`,
        isShadowed: false,
        badge: "Custom Application Module",
        color: "text-teal-300 bg-teal-950/80 border-teal-800",
        explanation: "Resolved from your local project source tree.",
      };
    } else {
      return {
        matchedTier: "Not Found in any sys.path Tier",
        resolvedPath: "None",
        isShadowed: false,
        badge: "ModuleNotFoundError",
        color: "text-amber-400 bg-amber-950/80 border-amber-800",
        explanation: `No module named '${modName}' exists on sys.path. Requires pip install or correct directory path.`,
      };
    }
  };

  const simResult = simulateSearch(queryModule);

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
            Topic 1
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Modules, Packages &amp; Python Standard Library
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Module Search Path (<code className="text-teal-400 font-mono">sys.path</code>) &amp; Module Namespaces
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Explore Python's search path resolution hierarchy, module namespace isolation (<code className="text-teal-300 font-mono">module.__dict__</code>), dunder metadata (<code className="text-purple-300 font-mono">__name__</code>, <code className="text-purple-300 font-mono">__file__</code>, <code className="text-purple-300 font-mono">__doc__</code>), and how to diagnose and prevent catastrophic <span className="text-rose-400 font-semibold">Module Shadowing</span> bugs.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🧭 sys.path 4-Tier Hierarchy
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📦 Module Namespaces (__dict__, ModuleType)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ Module Shadowing Diagnosis &amp; Audit
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔌 Dynamic Plugin Discovery Engine
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: THE SEARCH PATH RESOLUTION HIERARCHY */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🗺️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The 4-Tier <code className="text-teal-400 font-mono">sys.path</code> Search Resolution Hierarchy
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              When you write <code className="text-teal-400 font-mono">import my_module</code>, Python searches a list of directories stored in <code className="text-teal-300 font-mono">sys.path</code> strictly in sequential order:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-6 not-prose">
              {/* Tier 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg shadow-teal-950/30">
                <div className="flex items-center gap-2 text-teal-400 font-bold text-base mb-1">
                  <span>1️⃣</span> Script Dir (sys.path[0])
                </div>
                <p className="text-xs text-slate-300">
                  The directory containing the script that was executed. Has highest priority.
                </p>
              </div>

              {/* Tier 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg shadow-cyan-950/30">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-base mb-1">
                  <span>2️⃣</span> PYTHONPATH
                </div>
                <p className="text-xs text-slate-300">
                  Custom environment variable paths configured by developers or Docker containers.
                </p>
              </div>

              {/* Tier 3 */}
              <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-800/60 shadow-lg shadow-blue-950/30">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-base mb-1">
                  <span>3️⃣</span> Standard Library
                </div>
                <p className="text-xs text-slate-300">
                  Core Python modules (<code className="text-slate-400">math, json, os, datetime</code>) in <code className="text-slate-400">/Lib</code>.
                </p>
              </div>

              {/* Tier 4 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg shadow-purple-950/30">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-base mb-1">
                  <span>4️⃣</span> site-packages
                </div>
                <p className="text-xs text-slate-300">
                  Third-party libraries installed via <code className="text-purple-300">pip</code> in virtualenv.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                Programmatic Path Injection: <code className="text-teal-300 font-mono">sys.path.insert(0, path)</code>
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Using <code className="text-teal-300 font-mono">sys.path.insert(0, custom_path)</code> places your custom directory at index 0, giving it higher search precedence than standard library or third-party packages.
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
              <span className="text-3xl">🔬</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                2. Visualizing sys.path Search &amp; Shadowing
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("precedence")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "precedence"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                sys.path Precedence
              </button>
              <button
                onClick={() => setActiveInteractiveTab("namespace")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "namespace"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Module Namespace Anatomy
              </button>
              <button
                onClick={() => setActiveInteractiveTab("shadowing")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "shadowing"
                    ? "bg-rose-900/50 text-rose-300 border border-rose-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Module Shadowing Bug
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining sequential directory searches, module dunder dictionaries, and local file collisions:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "precedence" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">sys.path SEQUENTIAL SEARCH RESOLUTION PIPELINE</text>

                {/* Precedence Tiers */}
                <g transform="translate(30, 60)">
                  {/* Tier 1 */}
                  <rect x="0" y="0" width="185" height="120" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="15" y="28" fill="#99f6e4" fontSize="12" fontWeight="bold">Tier 1: sys.path[0]</text>
                  <text x="15" y="55" fill="#f8fafc" fontSize="11">Current Script Dir</text>
                  <text x="15" y="75" fill="#a7f3d0" fontSize="10">./ (Project Root)</text>

                  {/* Tier 2 */}
                  <rect x="220" y="0" width="185" height="120" rx="8" fill="#1e293b" stroke="#38bdf8" />
                  <text x="235" y="28" fill="#bae6fd" fontSize="12" fontWeight="bold">Tier 2: PYTHONPATH</text>
                  <text x="235" y="55" fill="#f8fafc" fontSize="11">Environment Vars</text>
                  <text x="235" y="75" fill="#cbd5e1" fontSize="10">Custom paths</text>

                  {/* Tier 3 */}
                  <rect x="440" y="0" width="185" height="120" rx="8" fill="#1e1b4b" stroke="#818cf8" />
                  <text x="455" y="28" fill="#c7d2fe" fontSize="12" fontWeight="bold">Tier 3: Standard Lib</text>
                  <text x="455" y="55" fill="#f8fafc" fontSize="11">Python /Lib Directory</text>
                  <text x="455" y="75" fill="#cbd5e1" fontSize="10">math, json, os...</text>

                  {/* Tier 4 */}
                  <rect x="660" y="0" width="180" height="120" rx="8" fill="#4a044e" stroke="#c026d3" />
                  <text x="675" y="28" fill="#f5d0fe" fontSize="12" fontWeight="bold">Tier 4: site-packages</text>
                  <text x="675" y="55" fill="#f8fafc" fontSize="11">pip Packages</text>
                  <text x="675" y="75" fill="#f5d0fe" fontSize="10">numpy, pandas...</text>
                </g>

                {/* Bottom Resolution Rule */}
                <g transform="translate(30, 210)">
                  <rect x="0" y="0" width="810" height="80" rx="6" fill="#090d16" stroke="#334155" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="13" fontWeight="bold">First Match Terminates the Search:</text>
                  <text x="20" y="55" fill="#cbd5e1" fontSize="12">
                    Python stops searching as soon as it finds a matching module name. If a match is found in Tier 1, Tiers 2, 3, and 4 are completely bypassed!
                  </text>
                </g>
              </svg>
            ) : activeInteractiveTab === "namespace" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">THE MODULE OBJECT &amp; NAMESPACE DICTIONARY (__dict__)</text>

                {/* Module Object Structure */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="810" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="14" fontWeight="bold">Module Instance: types.ModuleType</text>

                  {/* Attribute grid */}
                  <g transform="translate(20, 50)">
                    <rect x="0" y="0" width="240" height="70" rx="6" fill="#0f172a" stroke="#475569" />
                    <text x="15" y="25" fill="#38bdf8" fontSize="12" fontWeight="bold">module.__name__</text>
                    <text x="15" y="48" fill="#cbd5e1" fontSize="11 font-mono">"math" or "__main__"</text>

                    <rect x="260" y="0" width="250" height="70" rx="6" fill="#0f172a" stroke="#475569" />
                    <text x="275" y="25" fill="#38bdf8" fontSize="12" fontWeight="bold">module.__file__</text>
                    <text x="275" y="48" fill="#cbd5e1" fontSize="11 font-mono">"C:/Python/Lib/math.py"</text>

                    <rect x="530" y="0" width="240" height="70" rx="6" fill="#0f172a" stroke="#475569" />
                    <text x="545" y="25" fill="#38bdf8" fontSize="12" fontWeight="bold">module.__dict__</text>
                    <text x="545" y="48" fill="#cbd5e1" fontSize="11 font-mono">&#123;'pi': 3.14, 'sqrt': ...&#125;</text>
                  </g>

                  <text x="20" y="160" fill="#ecfdf5" fontSize="12">
                    • Every global variable, function, and class in a module is stored as a key in its <tspan fill="#34d399" fontWeight="bold">__dict__</tspan>.
                  </text>
                  <text x="20" y="185" fill="#ecfdf5" fontSize="12">
                    • <tspan fill="#38bdf8" fontWeight="bold">dir(module)</tspan> returns a sorted list of all keys in <tspan fill="#34d399">module.__dict__</tspan>.
                  </text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#f43f5e" fontSize="14" fontWeight="bold">THE MODULE SHADOWING DISASTER</text>

                {/* Left: Shadowing Trigger */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="390" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="13" fontWeight="bold">Novice Mistake: Creating `random.py`</text>
                  <rect x="20" y="55" width="350" height="70" rx="6" fill="#881337" stroke="#e11d48" />
                  <text x="35" y="80" fill="#ffe4e6" fontSize="12 font-mono"># Inside ./random.py</text>
                  <text x="35" y="102" fill="#ffe4e6" fontSize="12 font-mono">import random  # Imports ITSELF!</text>

                  <text x="20" y="155" fill="#ffe4e6" fontSize="12">
                    • sys.path[0] matches the local <tspan fill="#fca5a5" fontWeight="bold">./random.py</tspan>.
                  </text>
                  <text x="20" y="180" fill="#ffe4e6" fontSize="12">
                    • Standard library <tspan fill="#fca5a5">random.py</tspan> is ignored!
                  </text>
                  <text x="20" y="205" fill="#f43f5e" fontSize="12" fontWeight="bold">
                    → Crash: AttributeError: has no attribute 'randint'
                  </text>
                </g>

                {/* Right: Diagnosis with __file__ */}
                <g transform="translate(450, 50)">
                  <rect x="0" y="0" width="390" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="13" fontWeight="bold">Diagnosis &amp; Fix with `module.__file__`</text>
                  <rect x="20" y="55" width="350" height="70" rx="6" fill="#022c22" stroke="#059669" />
                  <text x="35" y="80" fill="#a7f3d0" fontSize="12 font-mono">import random</text>
                  <text x="35" y="102" fill="#a7f3d0" fontSize="12 font-mono">print(random.__file__)</text>

                  <text x="20" y="155" fill="#ecfdf5" fontSize="12">
                    • If __file__ points to project root, it is shadowed!
                  </text>
                  <text x="20" y="180" fill="#ecfdf5" fontSize="12">
                    • Fix: Rename script to <tspan fill="#34d399" fontWeight="bold">random_demo.py</tspan>.
                  </text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE sys.path SIMULATOR */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧭</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive <code className="text-teal-400 font-mono">sys.path</code> Search Simulator
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Test how Python resolves different module queries across search tiers and detects shadowing conflicts:
          </p>

          {/* Quick preset chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            {["math", "shadowed_random", "numpy", "custom_plugin", "unknown_module"].map((mod) => (
              <button
                key={mod}
                onClick={() => setQueryModule(mod)}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border transition-all",
                  queryModule === mod
                    ? "bg-teal-950 border-teal-500 text-teal-300 shadow-md shadow-teal-950"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                )}
              >
                {mod}
              </button>
            ))}
          </div>

          {/* Search Input & Live Inspection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Left Controls */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                  Module Import Query Name
                </label>
                <input
                  type="text"
                  value={queryModule}
                  onChange={(e) => setQueryModule(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-teal-300 font-mono text-sm focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
                  Matched Resolution Tier
                </span>
                <div className="text-sm font-mono text-slate-200">{simResult.matchedTier}</div>
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
                  Resolved Source File Path (__file__)
                </span>
                <code className="text-xs font-mono text-cyan-300 block bg-slate-900 p-2 rounded border border-slate-800 overflow-x-auto">
                  {simResult.resolvedPath}
                </code>
              </div>
            </div>

            {/* Right Status */}
            <div className="space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
                  Resolution Status
                </span>
                <span className={clsx("inline-block text-xs font-mono font-bold px-3 py-1 rounded-full border mb-3", simResult.color)}>
                  {simResult.badge}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {simResult.explanation}
                </p>
              </div>

              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs font-mono text-slate-400">
                <span className="text-teal-400 font-bold">Python Code:</span> <code className="text-teal-300">import {queryModule}; print({queryModule}.__file__)</code>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER SEARCH PATH MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master <code className="text-teal-400 font-mono">sys.path</code> Tier Comparison Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Search Tier</th>
                  <th className="py-3.5 px-4 font-bold">Directory Source</th>
                  <th className="py-3.5 px-4 font-bold">Priority</th>
                  <th className="py-3.5 px-4 font-bold">Typical Module Contents</th>
                  <th className="py-3.5 px-4 font-bold">Shadowing Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">Tier 1: sys.path[0]</td>
                  <td className="py-3 px-4">Current Script Working Dir</td>
                  <td className="py-3 px-4 font-mono text-emerald-400 font-bold">1 (Highest)</td>
                  <td className="py-3 px-4">Local project files (<code className="text-slate-300">utils.py</code>, etc.)</td>
                  <td className="py-3 px-4 font-mono text-rose-400 font-bold">HIGH (Can shadow stdlib)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">Tier 2: PYTHONPATH</td>
                  <td className="py-3 px-4">Environment Variable</td>
                  <td className="py-3 px-4 font-mono text-blue-400">2</td>
                  <td className="py-3 px-4">Shared company packages &amp; monorepo roots</td>
                  <td className="py-3 px-4 font-mono text-amber-400">Medium</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-blue-300 font-semibold">Tier 3: Standard Lib</td>
                  <td className="py-3 px-4">Python Install /Lib</td>
                  <td className="py-3 px-4 font-mono text-indigo-400">3</td>
                  <td className="py-3 px-4">Core Python standard library (<code className="text-slate-300">math, json</code>)</td>
                  <td className="py-3 px-4 font-mono text-emerald-400">None</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">Tier 4: site-packages</td>
                  <td className="py-3 px-4">pip install Target Directory</td>
                  <td className="py-3 px-4 font-mono text-purple-400">4</td>
                  <td className="py-3 px-4">Third-party wheels (<code className="text-slate-300">numpy, pandas</code>)</td>
                  <td className="py-3 px-4 font-mono text-emerald-400">None</td>
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
            Explore 4 production-grade Python scripts demonstrating search path resolution, module dunder introspection, shadowing auditing, and dynamic plugin discovery:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "sys_path_and_search_order.py",
                code: sysPathSearch,
                description: "Exploring sys.path hierarchy, sys.path.insert(0), and inspecting __file__ module locations.",
              },
              {
                filename: "module_namespace_and_globals.py",
                code: namespaceGlobals,
                description: "Module namespace dictionaries (module.__dict__), dunder metadata, and globals() vs locals().",
              },
              {
                filename: "module_shadowing_and_isolation.py",
                code: moduleShadowing,
                description: "Anatomy of module shadowing bugs and an automated directory shadowing audit engine.",
              },
              {
                filename: "dynamic_plugin_loader.py",
                code: pluginLoader,
                description: "Production plugin discovery and execution registry engine for educational and tax calculations.",
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
                <span>❌</span> Trap 1: Naming Scripts After Standard Modules
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Naming a script <code className="text-rose-300 font-mono">math.py</code> or <code className="text-rose-300 font-mono">random.py</code> breaks Python across your entire project because <code className="text-rose-300 font-mono">sys.path[0]</code> loads your empty file!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Suffix test files: <code className="text-emerald-300">math_demo.py</code> or <code className="text-emerald-300">random_test.py</code>
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Mutating sys.path In Published Libraries
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Modifying <code className="text-amber-300 font-mono">sys.path</code> inside a reusable package pollutes the global process state and causes hard-to-trace bugs for consumers.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Use proper packaging (<code className="text-emerald-300">pip install -e .</code>) rather than <code className="text-emerald-300">sys.path.append()</code>.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Assuming Built-in Modules Have `__file__`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Calling <code className="text-purple-300 font-mono">sys.__file__</code> or <code className="text-purple-300 font-mono">builtins.__file__</code> raises <code className="text-purple-300 font-mono">AttributeError</code> or returns <code className="text-purple-300 font-mono">None</code> because they are compiled in C!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use <code className="text-emerald-300">getattr(mod, '__file__', None)</code> for safe inspection.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Hardcoding Absolute Paths in sys.path
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-cyan-300 font-mono">sys.path.append("C:/Users/sukanta/project")</code> breaks immediately when deployed to Linux, macOS, or Docker containers.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use relative path resolution: <code className="text-emerald-300">pathlib.Path(__file__).parent</code>
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
            Comprehensive question-and-answer repository covering sys.path resolution order, module namespaces, dunder attributes, and module shadowing:
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
            Download or print the complete reference sheet with search tier hierarchies, namespace cheat sheets, and shadowing prevention checklists:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic1_sys_path_and_namespaces_notes.txt"
              title="Print Topic 1 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
