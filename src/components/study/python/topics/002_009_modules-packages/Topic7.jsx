import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import pipLifecycle from "./topic7_files/pip_command_lifecycle_and_pypi.py?raw";
import wheelVsSdist from "./topic7_files/wheel_vs_sdist_and_cache.py?raw";
import ecosystemPackages from "./topic7_files/popular_ecosystem_packages_demo.py?raw";
import packageAuditor from "./topic7_files/automated_package_manager_and_auditor.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic7_files/topic7_note.txt?raw";

// FAQ Questions
import questions from "./topic7_files/topic7_questions";

/**
 * Topic7: Third-party packages and pip package manager
 * Module: 002_009_modules-packages
 * Segment: 2 (Practical Python for Real-World Development)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic7() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("pipflow");

  // Interactive Pip Command Generator State
  const [action, setAction] = useState("install_pinned"); // install, install_pinned, upgrade, uninstall, list, show, freeze
  const [selectedPkg, setSelectedPkg] = useState("requests");
  const [pinVersion, setPinVersion] = useState("==2.31.0");

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

  const getGeneratedCommand = () => {
    switch (action) {
      case "install":
        return `python -m pip install ${selectedPkg}`;
      case "install_pinned":
        return `python -m pip install ${selectedPkg}${pinVersion}`;
      case "upgrade":
        return `python -m pip install --upgrade ${selectedPkg}`;
      case "uninstall":
        return `python -m pip uninstall ${selectedPkg} -y`;
      case "list":
        return `python -m pip list`;
      case "show":
        return `python -m pip show ${selectedPkg}`;
      case "freeze":
        return `python -m pip freeze > requirements.txt`;
      default:
        return `python -m pip install ${selectedPkg}`;
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
            Segment 2 • Module 002_009
          </span>
          <span className="text-xs sm:text-sm font-mono bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/80 shadow-sm shadow-cyan-950/50">
            Topic 7
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Modules, Packages &amp; Python Standard Library
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Third-Party Packages &amp; the <code className="text-teal-400 font-mono">pip</code> Package Manager
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master the open-source Python ecosystem: PyPI package index, the full <code className="text-teal-300 font-mono">pip</code> command lifecycle, the <code className="text-cyan-300 font-mono">python -m pip</code> interpreter binding rule, Wheels (<code className="text-emerald-300 font-mono">.whl</code>) vs source distributions, and programmatic package auditing.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🌐 PyPI Ecosystem (500k+ Packages)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚙️ python -m pip Interpreter Safety
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📦 Pre-Compiled Wheels (.whl)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔍 importlib.metadata Package Auditing
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: THE PIP & PyPI ECOSYSTEM */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📦</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The PyPI Repository &amp; <code className="text-teal-400 font-mono">pip</code> Lifecycle
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              The <strong>Python Package Index (PyPI)</strong> is the official community repository hosting over 500,000+ open-source Python packages. The <code className="text-teal-400 font-mono">pip</code> utility is Python's standard package installer that resolves, downloads, and unpacks these distributions into your environment's <code className="text-cyan-300 font-mono">site-packages</code>:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg shadow-teal-950/30">
                <div className="flex items-center gap-2 text-teal-400 font-bold text-base mb-1">
                  <span>1️⃣</span> PyPI Registry
                </div>
                <p className="text-xs text-slate-300">
                  Global repository at <code className="text-teal-300">pypi.org</code> hosting libraries across web, data science, AI, and testing.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg shadow-cyan-950/30">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-base mb-1">
                  <span>2️⃣</span> Pip Resolver &amp; Wheels
                </div>
                <p className="text-xs text-slate-300">
                  Downloads pre-compiled <code className="text-cyan-300">.whl</code> archives that install in milliseconds without C compilers.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg shadow-purple-950/30">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-base mb-1">
                  <span>3️⃣</span> site-packages Directory
                </div>
                <p className="text-xs text-slate-300">
                  Installs modules into <code className="text-purple-300">site-packages</code> which is automatically on Python's <code className="text-purple-300">sys.path</code>.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Golden Command: Always Use `python -m pip`
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Typing bare <code className="text-rose-400 font-mono">pip install</code> can target a different Python version installed on your operating system. Running <code className="text-teal-300 font-mono">python -m pip install</code> guarantees packages are installed into the exact Python interpreter you are currently executing.
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
                2. Visualizing Pip Installation Flow &amp; Wheel Architecture
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("pipflow")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "pipflow"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Pip Installation Flow
              </button>
              <button
                onClick={() => setActiveInteractiveTab("wheelbuild")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "wheelbuild"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Wheel vs Source Dist
              </button>
              <button
                onClick={() => setActiveInteractiveTab("interpreter")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "interpreter"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                python -m pip Safety
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining dependency resolution, wheel extraction, and interpreter binding:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "pipflow" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">PIP RESOLUTION &amp; INSTALLATION PIPELINE</text>

                {/* 4 Steps */}
                <g transform="translate(30, 60)">
                  {/* Step 1 */}
                  <rect x="0" y="0" width="180" height="180" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="15" y="28" fill="#99f6e4" fontSize="12" fontWeight="bold">1. Command Input</text>
                  <text x="15" y="60" fill="#f8fafc" fontSize="10 font-mono">pip install requests</text>
                  <text x="15" y="90" fill="#cbd5e1" fontSize="10">• Queries PyPI API</text>
                  <text x="15" y="110" fill="#cbd5e1" fontSize="10">• Checks local cache</text>

                  {/* Step 2 */}
                  <rect x="210" y="0" width="180" height="180" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="225" y="28" fill="#a5f3fc" fontSize="12" fontWeight="bold">2. Dependency Resolver</text>
                  <text x="225" y="60" fill="#f8fafc" fontSize="10">• Backtracking algorithm</text>
                  <text x="225" y="85" fill="#cbd5e1" fontSize="10">• Resolves urllib3</text>
                  <text x="225" y="105" fill="#cbd5e1" fontSize="10">• Resolves certifi</text>
                  <text x="225" y="125" fill="#cbd5e1" fontSize="10">• Resolves idna</text>

                  {/* Step 3 */}
                  <rect x="420" y="0" width="180" height="180" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="435" y="28" fill="#c4b5fd" fontSize="12" fontWeight="bold">3. Wheel Download</text>
                  <text x="435" y="60" fill="#f8fafc" fontSize="10">• Downloads .whl ZIP</text>
                  <text x="435" y="85" fill="#cbd5e1" fontSize="10">• Verifies SHA-256</text>
                  <text x="435" y="105" fill="#cbd5e1" fontSize="10">• Caches locally</text>

                  {/* Step 4 */}
                  <rect x="630" y="0" width="180" height="180" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="645" y="28" fill="#a7f3d0" fontSize="12" fontWeight="bold">4. Extraction</text>
                  <text x="645" y="60" fill="#ecfdf5" fontSize="10 font-mono">Unzips into:</text>
                  <text x="645" y="85" fill="#ecfdf5" fontSize="10 font-bold">site-packages/</text>
                  <text x="645" y="110" fill="#34d399" fontSize="10">✓ Ready to import!</text>
                </g>

                {/* Bottom Summary */}
                <g transform="translate(30, 260)">
                  <rect x="0" y="0" width="810" height="50" rx="6" fill="#090d16" stroke="#334155" />
                  <text x="20" y="30" fill="#cbd5e1" fontSize="12">
                    Result: <tspan fill="#34d399" fontWeight="bold">import requests</tspan> executes in microseconds directly from site-packages!
                  </text>
                </g>
              </svg>
            ) : activeInteractiveTab === "wheelbuild" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">WHEEL (.whl) VS SOURCE DISTRIBUTION (.tar.gz)</text>

                {/* Left: Wheel */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="390" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="13" fontWeight="bold">✓ Built Distribution: Wheel (.whl)</text>
                  <text x="20" y="65" fill="#cbd5e1" fontSize="12 font-mono">numpy-2.1.0-cp313-win_amd64.whl</text>
                  <text x="20" y="95" fill="#ecfdf5" fontSize="11">• Pre-compiled C/C++ binary ZIP archive</text>
                  <text x="20" y="120" fill="#ecfdf5" fontSize="11">• ZERO compiler required on user machine</text>
                  <text x="20" y="145" fill="#ecfdf5" fontSize="11">• Installs in 0.2 seconds!</text>

                  <rect x="20" y="175" width="350" height="45" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="200" fill="#34d399" fontSize="11 font-bold">Industry Standard: Fast, Reliable, Clean</text>
                </g>

                {/* Right: sdist */}
                <g transform="translate(450, 50)">
                  <rect x="0" y="0" width="390" height="240" rx="8" fill="#451a03" stroke="#f59e0b" />
                  <text x="20" y="30" fill="#fde68a" fontSize="13" fontWeight="bold">⚠️ Source Distribution: sdist (.tar.gz)</text>
                  <text x="20" y="65" fill="#cbd5e1" fontSize="12 font-mono">numpy-2.1.0.tar.gz</text>
                  <text x="20" y="95" fill="#cbd5e1" fontSize="11">• Raw uncompiled source code</text>
                  <text x="20" y="120" fill="#fca5a5" fontSize="11">• Requires Visual C++ / GCC installed</text>
                  <text x="20" y="145" fill="#fca5a5" fontSize="11">• Can take 10+ minutes to compile locally</text>

                  <rect x="20" y="175" width="350" height="45" rx="4" fill="#090d16" stroke="#475569" />
                  <text x="30" y="200" fill="#f59e0b" fontSize="11">Used only when pre-compiled wheels are unavailable</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">INTERPRETER BINDING: python -m pip vs bare pip</text>

                {/* Left: Bare pip bug */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="390" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="13" fontWeight="bold">❌ Bare 'pip install' (Ambiguous)</text>
                  <text x="20" y="60" fill="#fca5a5" fontSize="11 font-mono">$ pip install requests</text>

                  <rect x="20" y="80" width="350" height="65" rx="4" fill="#881337" stroke="#e11d48" />
                  <text x="30" y="100" fill="#ffe4e6" fontSize="10">May invoke Python 3.10 pip on your system PATH,</text>
                  <text x="30" y="120" fill="#ffe4e6" fontSize="10">installing into Python 3.10 site-packages!</text>

                  <text x="20" y="165" fill="#fca5a5" fontSize="11 font-mono">$ python app.py (Runs Python 3.13)</text>
                  <text x="20" y="190" fill="#f43f5e" fontSize="11 font-bold">CRASH: ModuleNotFoundError: No module named 'requests'!</text>
                </g>

                {/* Right: python -m pip safe */}
                <g transform="translate(450, 50)">
                  <rect x="0" y="0" width="390" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="13" fontWeight="bold">✓ 'python -m pip install' (Guaranteed)</text>
                  <text x="20" y="60" fill="#34d399" fontSize="11 font-mono">$ python -m pip install requests</text>

                  <rect x="20" y="80" width="350" height="65" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="100" fill="#ecfdf5" fontSize="10">Explicitly binds to the ACTIVE Python interpreter,</text>
                  <text x="30" y="120" fill="#34d399" fontSize="10 font-bold">installing directly into Python 3.13 site-packages!</text>

                  <text x="20" y="165" fill="#ecfdf5" fontSize="11 font-mono">$ python app.py (Runs Python 3.13)</text>
                  <text x="20" y="190" fill="#34d399" fontSize="11 font-bold">SUCCESS: requests imported perfectly with 0 issues!</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE PIP COMMAND GENERATOR */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Pip Command Generator &amp; Package Explorer
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Select an action, target package, and version constraint to generate production-ready Pip terminal commands:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Action Selector */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-bold">
                1. Pip Operation
              </label>
              <select
                value={action}
                onChange={(e) => setAction(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-teal-300 font-mono text-sm"
              >
                <option value="install">Install Latest Release</option>
                <option value="install_pinned">Install Exact Pinned (==)</option>
                <option value="upgrade">Upgrade Package (--upgrade)</option>
                <option value="uninstall">Uninstall Cleanly (-y)</option>
                <option value="show">Show Metadata (pip show)</option>
                <option value="list">List All Packages (pip list)</option>
                <option value="freeze">Export (pip freeze)</option>
              </select>
            </div>

            {/* Package Selector */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-bold">
                2. Target Package
              </label>
              <select
                value={selectedPkg}
                onChange={(e) => setSelectedPkg(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-cyan-300 font-mono text-sm"
              >
                <option value="requests">requests (HTTP Library)</option>
                <option value="pandas">pandas (DataFrames)</option>
                <option value="pydantic">pydantic (Data Validation)</option>
                <option value="fastapi">fastapi (Web Framework)</option>
                <option value="pytest">pytest (Testing Suite)</option>
                <option value="rich">rich (Terminal Styling)</option>
              </select>
            </div>

            {/* Version Pinning */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-bold">
                3. Version Specifier
              </label>
              <select
                value={pinVersion}
                onChange={(e) => setPinVersion(e.target.value)}
                disabled={action !== "install_pinned"}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-purple-300 font-mono text-sm disabled:opacity-40"
              >
                <option value="==2.31.0">==2.31.0 (Exact Pin)</option>
                <option value=">=2.0.0">&gt;=2.0.0 (Minimum Version)</option>
                <option value="~=2.31.0">~=2.31.0 (Compatible Patch)</option>
                <option value="<=3.0.0">&lt;=3.0.0 (Maximum Limit)</option>
              </select>
            </div>
          </div>

          {/* Generated Result */}
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800">
            <span className="text-xs font-mono uppercase tracking-wider text-teal-400 block mb-2 font-bold">
              Generated Terminal Command
            </span>
            <div className="flex items-center justify-between bg-slate-900 p-4 rounded-lg border border-slate-800 font-mono text-sm text-emerald-300 overflow-x-auto">
              <code>$ {getGeneratedCommand()}</code>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER PIP COMMANDS MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Pip Operations Reference Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Operation</th>
                  <th className="py-3.5 px-4 font-bold">Command Syntax</th>
                  <th className="py-3.5 px-4 font-bold">Flag Options</th>
                  <th className="py-3.5 px-4 font-bold">Production Best Practice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">Install</td>
                  <td className="py-3 px-4 font-mono text-slate-200">python -m pip install pkg</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">--upgrade, --no-deps</td>
                  <td className="py-3 px-4">Pin versions with <code className="text-teal-300">==</code> in production</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-emerald-300 font-semibold">Uninstall</td>
                  <td className="py-3 px-4 font-mono text-slate-200">python -m pip uninstall pkg</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">-y (auto confirm)</td>
                  <td className="py-3 px-4">Use <code className="text-emerald-300">-y</code> in CI/CD automated scripts</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">Inspect</td>
                  <td className="py-3 px-4 font-mono text-slate-200">python -m pip show pkg</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">-f (list files)</td>
                  <td className="py-3 px-4">Check license and dependency tree info</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">Freeze</td>
                  <td className="py-3 px-4 font-mono text-slate-200">python -m pip freeze &gt; req.txt</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">--all</td>
                  <td className="py-3 px-4">Generate requirements.txt for reproducible builds</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">Cache</td>
                  <td className="py-3 px-4 font-mono text-slate-200">python -m pip cache purge</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">list, dir</td>
                  <td className="py-3 px-4">Clear cached wheels to free local SSD space</td>
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
            Explore 4 production-grade Python scripts demonstrating pip commands, wheel distributions, popular third-party domains, and automated dependency auditing:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "pip_command_lifecycle_and_pypi.py",
                code: pipLifecycle,
                description: "The pip ecosystem, PyPI repositories, python -m pip advantage, and programmatic distribution inspection.",
              },
              {
                filename: "wheel_vs_sdist_and_cache.py",
                code: wheelVsSdist,
                description: "Pre-compiled wheels (.whl) vs source distributions (.tar.gz), wheel filename tags, and pip cache management.",
              },
              {
                filename: "popular_ecosystem_packages_demo.py",
                code: ecosystemPackages,
                description: "Essential community libraries across domains (requests, pandas, pydantic) and defensive optional import fallbacks.",
              },
              {
                filename: "automated_package_manager_and_auditor.py",
                code: packageAuditor,
                description: "Enterprise dependency inspector and auditor reading metadata via standard library importlib.metadata.",
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
                <span>❌</span> Trap 1: Multi-Python Version Mixups
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Typing bare <code className="text-rose-300 font-mono">pip install requests</code> can install into Python 3.10, causing <code className="text-rose-300 font-mono">ModuleNotFoundError</code> when running with Python 3.13!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Always use <code className="text-emerald-300">python -m pip install requests</code>!
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Missing C Compiler for sdist Packages
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Installing raw source distributions containing C extensions crashes with <code className="text-amber-300 font-mono">error: Microsoft Visual C++ 14.0 is required</code> if no wheel exists.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Install pre-compiled wheels or install Visual C++ Build Tools.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Using `--user` Inside Virtual Environments
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Passing <code className="text-purple-300 font-mono">--user</code> inside a virtualenv installs packages into your global home folder, bypassing the sandbox.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Never use <code className="text-emerald-300">--user</code> inside an active virtualenv.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Installing Directly into Global Python
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Installing all dependencies into your base Python installation creates version conflicts between projects and corrupts OS tools.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Always isolate projects inside dedicated virtual environments (<code className="text-emerald-300">venv</code>).
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
            Comprehensive question-and-answer repository covering pip operations, PyPI resolution, wheel distributions, version pinning, and metadata auditing:
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
            Download or print the complete reference sheet with pip command cheatsheets, wheel tags, and package inspection recipes:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic7_third_party_packages_and_pip_notes.txt"
              title="Print Topic 7 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
