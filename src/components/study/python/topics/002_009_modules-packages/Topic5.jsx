import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import packageStructure from "./topic5_files/package_structure_and_init_role.py?raw";
import subpackagesElevation from "./topic5_files/subpackages_and_api_elevation.py?raw";
import packageAllLazy from "./topic5_files/package_all_whitelist_and_lazy_imports.py?raw";
import payrollPackageSim from "./topic5_files/enterprise_payroll_package_simulator.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic5_files/topic5_note.txt?raw";

// FAQ Questions
import questions from "./topic5_files/topic5_questions";

/**
 * Topic5: Concept of packages & __init__.py files
 * Module: 002_009_modules-packages
 * Segment: 2 (Practical Python for Real-World Development)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic5() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("hierarchy");

  // Interactive Facade State
  const [useFacade, setUseFacade] = useState(true);

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
            Segment 2 • Module 002_009
          </span>
          <span className="text-xs sm:text-sm font-mono bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/80 shadow-sm shadow-cyan-950/50">
            Topic 5
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Modules, Packages &amp; Python Standard Library
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Concept of Packages &amp; <code className="text-teal-400 font-mono">__init__.py</code> Files
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master Python's hierarchical package system: package directory structuring, the 3 foundational roles of <code className="text-teal-300 font-mono">__init__.py</code>, API elevation via the Facade Pattern, Regular vs PEP 420 Namespace packages, subpackages, and lazy submodule loading.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📁 Package Directory Structure
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🪄 The 3 Roles of __init__.py
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🏛️ API Elevation Facade Pattern
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ Lazy Loading with PEP 562
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: PACKAGES & THE 3 ROLES OF __init__.py */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📦</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. What is a Package &amp; The 3 Roles of <code className="text-teal-400 font-mono">__init__.py</code>
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              In Python, a <strong>Package</strong> is simply a folder containing Python files and a special <code className="text-teal-400 font-mono">__init__.py</code> file. It enables multi-tier dot-separated namespaces (e.g. <code className="text-cyan-300 font-mono">app.accounting.gst</code>) to prevent naming collisions in large applications:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Role 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg shadow-teal-950/30">
                <div className="flex items-center gap-2 text-teal-400 font-bold text-base mb-1">
                  <span>1️⃣</span> Package Identifier
                </div>
                <p className="text-xs text-slate-300">
                  Signals to Python that this directory should be treated as an importable module package namespace.
                </p>
              </div>

              {/* Role 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg shadow-cyan-950/30">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-base mb-1">
                  <span>2️⃣</span> Package Initializer
                </div>
                <p className="text-xs text-slate-300">
                  Executes configuration code once when the package is imported for the first time into memory.
                </p>
              </div>

              {/* Role 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg shadow-purple-950/30">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-base mb-1">
                  <span>3️⃣</span> API Elevation Facade
                </div>
                <p className="text-xs text-slate-300">
                  Imports key classes/functions from submodules so consumers can import directly from package root!
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Facade Pattern: Why API Elevation Matters
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Without API elevation, developers must write awkward deep imports like <code className="text-rose-400 font-mono">from accotax.services.taxation.engine.gst_calc import calculate_gst</code>. With <code className="text-teal-300 font-mono">__init__.py</code> elevation, they simply write <code className="text-emerald-400 font-mono">from accotax import calculate_gst</code>!
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
                2. Visualizing Package Structure &amp; API Elevation
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("hierarchy")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "hierarchy"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Package Hierarchy
              </button>
              <button
                onClick={() => setActiveInteractiveTab("elevation")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "elevation"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                API Elevation Facade
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
                Namespace Packages (PEP 420)
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining package directory layouts, facade imports, and namespace boundaries:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "hierarchy" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">PACKAGE DIRECTORY TREE &amp; SUBPACKAGES</text>

                {/* Directory Tree */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="810" height="240" rx="8" fill="#0f172a" stroke="#334155" />
                  <text x="20" y="30" fill="#38bdf8" fontSize="13" fontWeight="bold">📁 coder_suite/ (Root Package Directory)</text>
                  <text x="40" y="55" fill="#2dd4bf" fontSize="12 font-mono">├── 📄 __init__.py (Elevates Public API facade)</text>
                  <text x="40" y="80" fill="#cbd5e1" fontSize="12 font-mono">├── 📁 accounting/ (Subpackage 1)</text>
                  <text x="60" y="105" fill="#2dd4bf" fontSize="12 font-mono">│   ├── 📄 __init__.py</text>
                  <text x="60" y="130" fill="#cbd5e1" fontSize="12 font-mono">│   ├── 📄 gst_calculator.py</text>
                  <text x="60" y="155" fill="#cbd5e1" fontSize="12 font-mono">│   └── 📄 invoice_engine.py</text>
                  <text x="40" y="180" fill="#cbd5e1" fontSize="12 font-mono">└── 📁 payroll/ (Subpackage 2)</text>
                  <text x="60" y="205" fill="#2dd4bf" fontSize="12 font-mono">    ├── 📄 __init__.py</text>
                  <text x="60" y="230" fill="#cbd5e1" fontSize="12 font-mono">    └── 📄 salary_slip.py</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "elevation" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">THE __init__.py API ELEVATION FACADE</text>

                {/* Left: Deep */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="390" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="13" fontWeight="bold">Internal Submodules (Hidden Complexity)</text>
                  <text x="20" y="65" fill="#ecfdf5" fontSize="11 font-mono">coder_suite/accounting/gst_calc.py</text>
                  <text x="40" y="85" fill="#34d399" fontSize="11 font-mono">class GSTCalculator: ...</text>
                  
                  <text x="20" y="120" fill="#ecfdf5" fontSize="11 font-mono">coder_suite/payroll/salary_slip.py</text>
                  <text x="40" y="140" fill="#34d399" fontSize="11 font-mono">def compute_salary(): ...</text>

                  <rect x="20" y="175" width="350" height="45" rx="4" fill="#090d16" stroke="#475569" />
                  <text x="30" y="200" fill="#f43f5e" fontSize="11">Awkward Deep Imports without facade!</text>
                </g>

                {/* Right: Facade */}
                <g transform="translate(450, 50)">
                  <rect x="0" y="0" width="390" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="13" fontWeight="bold">Package __init__.py (Unified Facade)</text>
                  <text x="20" y="65" fill="#cbd5e1" fontSize="11 font-mono">from .accounting.gst_calc import GSTCalculator</text>
                  <text x="20" y="90" fill="#cbd5e1" fontSize="11 font-mono">from .payroll.salary_slip import compute_salary</text>
                  <text x="20" y="120" fill="#38bdf8" fontSize="11 font-mono">__all__ = ['GSTCalculator', 'compute_salary']</text>

                  <rect x="20" y="175" width="350" height="45" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="200" fill="#34d399" fontSize="11 font-bold">Clean: from coder_suite import GSTCalculator</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">REGULAR PACKAGES VS PEP 420 IMPLICIT NAMESPACE PACKAGES</text>

                {/* Left: Regular */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="390" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="30" fill="#99f6e4" fontSize="13" fontWeight="bold">Regular Package (Traditional)</text>
                  <text x="20" y="65" fill="#f8fafc" fontSize="12 font-mono">• MUST have an __init__.py file</text>
                  <text x="20" y="95" fill="#f8fafc" fontSize="12 font-mono">• Can execute initialization logic</text>
                  <text x="20" y="125" fill="#f8fafc" fontSize="12 font-mono">• Has a valid __file__ attribute</text>
                  <text x="20" y="155" fill="#f8fafc" fontSize="12 font-mono">• Confined to a single folder on disk</text>

                  <rect x="20" y="180" width="350" height="40" rx="4" fill="#090d16" stroke="#475569" />
                  <text x="30" y="205" fill="#34d399" fontSize="11">Best for 99% of standalone libraries</text>
                </g>

                {/* Right: Namespace */}
                <g transform="translate(450, 50)">
                  <rect x="0" y="0" width="390" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="13" fontWeight="bold">Implicit Namespace Package (PEP 420)</text>
                  <text x="20" y="65" fill="#cbd5e1" fontSize="12 font-mono">• NO __init__.py file present</text>
                  <text x="20" y="95" fill="#cbd5e1" fontSize="12 font-mono">• Zero execution on import</text>
                  <text x="20" y="125" fill="#cbd5e1" fontSize="12 font-mono">• __file__ evaluates to None</text>
                  <text x="20" y="155" fill="#cbd5e1" fontSize="12 font-mono">• Can span MULTIPLE directories on disk</text>

                  <rect x="20" y="180" width="350" height="40" rx="4" fill="#090d16" stroke="#475569" />
                  <text x="30" y="205" fill="#c4b5fd" fontSize="11">Best for large monorepos and plugin suites</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE FACADE SIMULATOR */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive API Elevation Facade Simulator
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Compare consumer import ergonomics with and without the <code className="text-teal-400 font-mono">__init__.py</code> Facade Pattern:
          </p>

          {/* Toggle Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => setUseFacade(true)}
              className={clsx(
                "p-4 rounded-xl border text-left transition-all",
                useFacade
                  ? "bg-teal-950 border-teal-500 text-teal-200 shadow-lg shadow-teal-950"
                  : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
              )}
            >
              <div className="text-sm font-mono font-bold text-teal-300 mb-1">
                ✨ Clean Facade (With __init__.py Elevation)
              </div>
              <code className="text-xs text-slate-400">from coder_suite import GSTCalculator</code>
            </button>

            <button
              onClick={() => setUseFacade(false)}
              className={clsx(
                "p-4 rounded-xl border text-left transition-all",
                !useFacade
                  ? "bg-rose-950 border-rose-500 text-rose-200 shadow-lg shadow-rose-950"
                  : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
              )}
            >
              <div className="text-sm font-mono font-bold text-rose-300 mb-1">
                🧱 Deep Nested Import (Without Facade)
              </div>
              <code className="text-xs text-slate-400">from coder_suite.accounting.engine.gst_calc import GSTCalculator</code>
            </button>
          </div>

          {/* Result Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                Consumer Developer Experience
              </span>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono">
                <span className="text-slate-400 block mb-1">Import Statement:</span>
                <code className={useFacade ? "text-emerald-300 font-bold" : "text-rose-300"}>
                  {useFacade
                    ? "from coder_suite import GSTCalculator, compute_salary"
                    : "from coder_suite.accounting.engine.gst_calc import GSTCalculator"}
                </code>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {useFacade
                  ? "The facade hides internal file reorganization. If you refactor 'gst_calc.py' to 'tax_core.py', consumers' code will NEVER break!"
                  : "Consumers are tightly coupled to your exact internal folder paths. Any internal refactoring breaks consumer code across the company!"}
              </p>
            </div>

            <div className="space-y-2 flex flex-col justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                Required Package __init__.py Code
              </span>
              <pre className="p-4 bg-slate-900 rounded-lg border border-slate-800 text-teal-300 font-mono text-xs overflow-x-auto whitespace-pre-wrap flex-1">
{useFacade
  ? `"""coder_suite package root __init__.py"""

__version__ = "4.2.0"
__all__ = ["GSTCalculator", "compute_salary"]

# Elevate symbols from submodules:
from .accounting.gst_calc import GSTCalculator
from .payroll.salary_slip import compute_salary`
  : `# __init__.py is empty!
# No symbols are elevated to the package root.`}
              </pre>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER PACKAGES MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Packages &amp; Modules Reference Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Architecture Type</th>
                  <th className="py-3.5 px-4 font-bold">Physical Structure on Disk</th>
                  <th className="py-3.5 px-4 font-bold">Requires __init__.py?</th>
                  <th className="py-3.5 px-4 font-bold">Primary Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">Single Module</td>
                  <td className="py-3 px-4 font-mono text-slate-200">my_script.py</td>
                  <td className="py-3 px-4 text-slate-400">No</td>
                  <td className="py-3 px-4">Standalone scripts and simple utilities</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">Regular Package</td>
                  <td className="py-3 px-4 font-mono text-slate-200">folder/ + __init__.py</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">YES</td>
                  <td className="py-3 px-4">Standard libraries, frameworks, enterprise apps</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">Subpackage</td>
                  <td className="py-3 px-4 font-mono text-slate-200">pkg/subpkg/ + __init__.py</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">YES</td>
                  <td className="py-3 px-4">Domain isolation (accounting, billing, payroll)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">Namespace Package (PEP 420)</td>
                  <td className="py-3 px-4 font-mono text-slate-200">folder/ (No __init__.py)</td>
                  <td className="py-3 px-4 text-rose-400 font-bold">NO</td>
                  <td className="py-3 px-4">Multi-repository plugin ecosystems</td>
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
            Explore 4 production-grade Python scripts demonstrating package structures, subpackage isolation, lazy module loading, and corporate payroll suites:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "package_structure_and_init_role.py",
                code: packageStructure,
                description: "Directory layouts, the 3 roles of __init__.py, and simulated API elevation facades.",
              },
              {
                filename: "subpackages_and_api_elevation.py",
                code: subpackagesElevation,
                description: "Nested subpackage architecture and domain namespace isolation.",
              },
              {
                filename: "package_all_whitelist_and_lazy_imports.py",
                code: packageAllLazy,
                description: "Package-level __all__ whitelists and lazy submodule loading via PEP 562 __getattr__.",
              },
              {
                filename: "enterprise_payroll_package_simulator.py",
                code: payrollPackageSim,
                description: "Multi-tier enterprise payroll and taxation package simulator with unified facade.",
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
                <span>❌</span> Trap 1: Putting Heavy Logic Directly in `__init__.py`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing 500 lines of complex business algorithms directly inside <code className="text-rose-300 font-mono">__init__.py</code> makes testing, refactoring, and debugging difficult.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Keep <code className="text-emerald-300">__init__.py</code> lean: write logic in submodules and import/elevate them in <code className="text-emerald-300">__init__.py</code>.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Running Relative Import Scripts Directly
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Executing <code className="text-amber-300 font-mono">python my_pkg/sub/file.py</code> crashes with <code className="text-rose-400 font-mono">ImportError: attempted relative import with no known parent package</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Run from project root using module syntax: <code className="text-emerald-300">python -m my_pkg.sub.file</code>.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Bloated Eager Imports in Huge Packages
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Importing all 100 submodules inside the root <code className="text-purple-300 font-mono">__init__.py</code> slows down startup by seconds on every CLI command.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use PEP 562 lazy submodule loading with <code className="text-emerald-300">__getattr__</code>.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Circular Facade Imports
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                If a submodule imports a sibling from the root package facade (<code className="text-cyan-300 font-mono">from my_pkg import B</code>) while <code className="text-cyan-300 font-mono">__init__.py</code> is running, Python triggers circular import failure.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Submodules should always import siblings using relative syntax: <code className="text-emerald-300">from .sibling import B</code>.
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
            Comprehensive question-and-answer repository covering package structure, __init__.py roles, facade patterns, namespace packages, and subpackages:
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
            Download or print the complete reference sheet with package comparison tables, facade templates, and PEP 420 rules:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic5_packages_and_init_notes.txt"
              title="Print Topic 5 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
