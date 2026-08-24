import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import importSyntax from "./topic6_files/absolute_vs_relative_imports_syntax.py?raw";
import errorResolution from "./topic6_files/attempted_relative_import_error_resolution.py?raw";
import refactoringPortability from "./topic6_files/package_refactoring_and_portability.py?raw";
import ecommerceImporter from "./topic6_files/ecommerce_multi_package_importer.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic6_files/topic6_note.txt?raw";

// FAQ Questions
import questions from "./topic6_files/topic6_questions";

/**
 * Topic6: Relative vs absolute imports in packages
 * Module: 002_009_modules-packages
 * Segment: 2 (Practical Python for Real-World Development)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic6() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("dotnav");

  // Interactive Import Resolver State
  const [sourceLocation, setSourceLocation] = useState("billing"); // billing, auth, core
  const [targetSymbol, setTargetSymbol] = useState("config"); // config, auth_token, receipt

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

  const getComputedImports = () => {
    let abs = "";
    let rel = "";
    let explanation = "";

    if (targetSymbol === "config") {
      abs = "from coder_app.core.config import GST_RATE";
      if (sourceLocation === "billing") {
        rel = "from ...core.config import GST_RATE";
        explanation = "3 dots (...) moves 2 levels up (from billing -> services -> coder_app) to reach core/";
      } else if (sourceLocation === "auth") {
        rel = "from ...core.config import GST_RATE";
        explanation = "3 dots (...) moves 2 levels up (from auth -> services -> coder_app) to reach core/";
      } else {
        rel = "from .config import GST_RATE";
        explanation = "1 dot (.) targets sibling module within the same core/ directory";
      }
    } else if (targetSymbol === "auth_token") {
      abs = "from coder_app.services.auth.tokens import verify_token";
      if (sourceLocation === "billing") {
        rel = "from ..auth.tokens import verify_token";
        explanation = "2 dots (..) moves 1 level up (billing -> services) then down into auth/";
      } else if (sourceLocation === "auth") {
        rel = "from .tokens import verify_token";
        explanation = "1 dot (.) targets sibling module within the same auth/ directory";
      } else {
        rel = "from ..services.auth.tokens import verify_token";
        explanation = "2 dots (..) moves from core/ to coder_app/ root, then down into services/auth/";
      }
    } else {
      abs = "from coder_app.services.billing.receipt import print_receipt";
      if (sourceLocation === "billing") {
        rel = "from .receipt import print_receipt";
        explanation = "1 dot (.) targets sibling file in the same billing/ folder";
      } else if (sourceLocation === "auth") {
        rel = "from ..billing.receipt import print_receipt";
        explanation = "2 dots (..) moves 1 level up (auth -> services) then into billing/";
      } else {
        rel = "from ..services.billing.receipt import print_receipt";
        explanation = "2 dots (..) moves 1 level up (core -> coder_app) then into services/billing/";
      }
    }

    return { abs, rel, explanation };
  };

  const computed = getComputedImports();

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
            Topic 6
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Modules, Packages &amp; Python Standard Library
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Relative vs Absolute Imports in Packages
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master Python import navigation: PEP 8 absolute imports, explicit relative dot notation (<code className="text-teal-300 font-mono">.</code>, <code className="text-cyan-300 font-mono">..</code>, <code className="text-purple-300 font-mono">...</code>), resolving the infamous <code className="text-rose-400 font-mono">attempted relative import with no known parent package</code> crash, and package refactoring portability.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🎯 Absolute vs Explicit Relative Syntax
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🧭 Dot Navigation Rules (., .., ...)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛠️ python -m Fix for Relative Imports
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📦 Library Portability &amp; Refactoring
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: ABSOLUTE VS RELATIVE OVERVIEW */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧭</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. Absolute Imports vs Explicit Relative Imports
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              When a Python package contains multiple subpackages, modules must import from each other. Python provides two distinct ways to specify module locations:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 not-prose">
              {/* Type 1: Absolute */}
              <div className="p-5 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg shadow-teal-950/30">
                <div className="flex items-center gap-2 text-teal-400 font-bold text-base mb-2">
                  <span>📍</span> Absolute Import (PEP 8 Recommended)
                </div>
                <code className="text-xs font-mono text-teal-300 block mb-2">
                  from coder_app.services.billing import TaxCalculator
                </code>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Specifies the entire path starting from the project root on <code className="text-teal-300 font-mono">sys.path</code>. Unambiguous and easy to grep-search across massive codebases.
                </p>
              </div>

              {/* Type 2: Relative */}
              <div className="p-5 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg shadow-cyan-950/30">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-base mb-2">
                  <span>📍</span> Explicit Relative Import (Dot Notation)
                </div>
                <code className="text-xs font-mono text-cyan-300 block mb-2">
                  from ..services.billing import TaxCalculator
                </code>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Specifies path relative to current module's position. Keeps internal library packages self-contained and portable when renaming the parent package.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                Dot Token Reference Quick Guide
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                • <code className="text-teal-300 font-mono">.</code> = Current package directory (sibling)<br />
                • <code className="text-cyan-300 font-mono">..</code> = Parent directory (1 level up)<br />
                • <code className="text-purple-300 font-mono">...</code> = Grandparent directory (2 levels up)
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
                2. Visualizing Dot Navigation &amp; Import Resolution
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("dotnav")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "dotnav"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Dot Navigation
              </button>
              <button
                onClick={() => setActiveInteractiveTab("erroranatomy")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "erroranatomy"
                    ? "bg-rose-900/50 text-rose-300 border border-rose-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                The 'attempted relative' Error
              </button>
              <button
                onClick={() => setActiveInteractiveTab("decision")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "decision"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Decision Matrix
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining package dot climbing, runtime package context resolution, and refactoring guidelines:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "dotnav" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">RELATIVE IMPORT DOT NAVIGATION SYSTEM</text>

                {/* Package hierarchy boxes */}
                <g transform="translate(30, 50)">
                  {/* Root */}
                  <rect x="0" y="0" width="810" height="240" rx="8" fill="#0f172a" stroke="#334155" />
                  <text x="20" y="30" fill="#38bdf8" fontSize="13" fontWeight="bold">📁 coder_app/ (Grandparent Directory: ...)</text>

                  {/* Core */}
                  <rect x="30" y="50" width="220" height="170" rx="6" fill="#134e4a" stroke="#14b8a6" />
                  <text x="45" y="75" fill="#99f6e4" fontSize="12" fontWeight="bold">📁 core/</text>
                  <text x="45" y="105" fill="#ecfdf5" fontSize="11 font-mono">📄 config.py (GST_RATE)</text>

                  {/* Services */}
                  <rect x="280" y="50" width="500" height="170" rx="6" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="295" y="75" fill="#c4b5fd" fontSize="12" fontWeight="bold">📁 services/ (Parent Directory: ..)</text>

                  {/* Auth */}
                  <rect x="300" y="90" width="220" height="110" rx="4" fill="#090d16" stroke="#475569" />
                  <text x="315" y="115" fill="#cbd5e1" fontSize="11" fontWeight="bold">📁 auth/</text>
                  <text x="315" y="140" fill="#cbd5e1" fontSize="10 font-mono">📄 tokens.py (verify_jwt)</text>

                  {/* Billing */}
                  <rect x="540" y="90" width="220" height="110" rx="4" fill="#064e3b" stroke="#10b981" />
                  <text x="555" y="115" fill="#a7f3d0" fontSize="11" fontWeight="bold">📁 billing/ (Current: .)</text>
                  <text x="555" y="140" fill="#ecfdf5" fontSize="10 font-mono">📄 calculator.py (Active)</text>
                  <text x="555" y="165" fill="#ecfdf5" fontSize="10 font-mono">📄 receipt.py (Sibling: .)</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "erroranatomy" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#f43f5e" fontSize="14" fontWeight="bold">ANATOMY OF 'ImportError: attempted relative import with no known parent package'</text>

                {/* Left: Buggy Direct Run */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="390" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="13" fontWeight="bold">❌ Direct Script Invocation</text>
                  <text x="20" y="55" fill="#fca5a5" fontSize="11 font-mono">$ python coder_app/billing/calc.py</text>

                  <rect x="20" y="75" width="350" height="65" rx="4" fill="#881337" stroke="#e11d48" />
                  <text x="30" y="95" fill="#ffe4e6" fontSize="11 font-mono">__name__ = '__main__'</text>
                  <text x="30" y="115" fill="#fca5a5" fontSize="11 font-mono">__package__ = None (No package context!)</text>

                  <text x="20" y="165" fill="#ffe4e6" fontSize="11 font-bold">CRASH: When line 'from ..core import x' runs,</text>
                  <text x="20" y="185" fill="#fca5a5" fontSize="11 font-mono">ImportError: attempted relative import</text>
                  <text x="20" y="205" fill="#fca5a5" fontSize="11 font-mono">with no known parent package!</text>
                </g>

                {/* Right: Fixed with -m */}
                <g transform="translate(450, 50)">
                  <rect x="0" y="0" width="390" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="13" fontWeight="bold">✓ Module Flag Invocation (-m)</text>
                  <text x="20" y="55" fill="#a7f3d0" fontSize="11 font-mono">$ python -m coder_app.billing.calc</text>

                  <rect x="20" y="75" width="350" height="65" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="95" fill="#ecfdf5" fontSize="11 font-mono">__name__ = '__main__'</text>
                  <text x="30" y="115" fill="#34d399" fontSize="11 font-mono">__package__ = 'coder_app.billing' (Populated!)</text>

                  <text x="20" y="165" fill="#a7f3d0" fontSize="11 font-bold">SUCCESS: Python navigates relative dots</text>
                  <text x="20" y="185" fill="#ecfdf5" fontSize="11 font-mono">.. resolves to 'coder_app' successfully!</text>
                  <text x="20" y="205" fill="#ecfdf5" fontSize="11">Script executes cleanly with zero errors.</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">WHEN TO USE ABSOLUTE VS RELATIVE IMPORTS</text>

                {/* Left: Reusable Library */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="390" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="30" fill="#99f6e4" fontSize="13" fontWeight="bold">Prefer Explicit Relative For: Libraries</text>
                  <text x="20" y="65" fill="#ecfdf5" fontSize="12 font-mono">• Reusable third-party PyPI packages</text>
                  <text x="20" y="95" fill="#ecfdf5" fontSize="12 font-mono">• Internal sibling modules (from . import x)</text>
                  <text x="20" y="125" fill="#ecfdf5" fontSize="12 font-mono">• __init__.py API elevation facades</text>
                  <text x="20" y="155" fill="#ecfdf5" fontSize="12 font-mono">• Allows renaming top package safely</text>

                  <rect x="20" y="180" width="350" height="40" rx="4" fill="#090d16" stroke="#475569" />
                  <text x="30" y="205" fill="#34d399" fontSize="11">Maximum Package Portability &amp; Self-Containment</text>
                </g>

                {/* Right: Application / Microservice */}
                <g transform="translate(450, 50)">
                  <rect x="0" y="0" width="390" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="13" fontWeight="bold">Prefer Absolute For: Applications</text>
                  <text x="20" y="65" fill="#cbd5e1" fontSize="12 font-mono">• Web backends (FastAPI, Django, Flask)</text>
                  <text x="20" y="95" fill="#cbd5e1" fontSize="12 font-mono">• Cross-domain imports (app.auth -> app.billing)</text>
                  <text x="20" y="125" fill="#cbd5e1" fontSize="12 font-mono">• Long distances (avoids ....dot madness)</text>
                  <text x="20" y="155" fill="#cbd5e1" fontSize="12 font-mono">• Global grep-searchability across team</text>

                  <rect x="20" y="180" width="350" height="40" rx="4" fill="#090d16" stroke="#475569" />
                  <text x="30" y="205" fill="#c4b5fd" fontSize="11">PEP 8 Standard: Unambiguous Clarity</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE IMPORT SYNTAX RESOLVER */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Import Syntax &amp; Path Resolver
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Select the source module (where you are writing code) and the target symbol to calculate both Absolute and Explicit Relative import statements:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Source Selector */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-bold">
                1. Source Module (Where You Are Writing Code)
              </span>
              <div className="space-y-2">
                {[
                  { id: "billing", label: "services/billing/calculator.py (Level 3)" },
                  { id: "auth", label: "services/auth/tokens.py (Level 3)" },
                  { id: "core", label: "core/config.py (Level 2)" },
                ].map((src) => (
                  <button
                    key={src.id}
                    onClick={() => setSourceLocation(src.id)}
                    className={clsx(
                      "w-full text-left p-3 rounded-lg border text-xs font-mono transition-all",
                      sourceLocation === src.id
                        ? "bg-teal-950 border-teal-500 text-teal-200 shadow-md shadow-teal-950"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                    )}
                  >
                    {src.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Selector */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-bold">
                2. Target Symbol (What You Want to Import)
              </span>
              <div className="space-y-2">
                {[
                  { id: "config", label: "core/config.py -> GST_RATE" },
                  { id: "auth_token", label: "services/auth/tokens.py -> verify_token" },
                  { id: "receipt", label: "services/billing/receipt.py -> print_receipt" },
                ].map((tgt) => (
                  <button
                    key={tgt.id}
                    onClick={() => setTargetSymbol(tgt.id)}
                    className={clsx(
                      "w-full text-left p-3 rounded-lg border text-xs font-mono transition-all",
                      targetSymbol === tgt.id
                        ? "bg-cyan-950 border-cyan-500 text-cyan-200 shadow-md shadow-cyan-950"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                    )}
                  >
                    {tgt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Computed Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-teal-400 block font-bold">
                Generated Import Statements
              </span>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono space-y-2">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Absolute Import (PEP 8 Preferred):</span>
                  <code className="text-teal-300 font-bold block pt-1">{computed.abs}</code>
                </div>
                <div className="pt-2 border-t border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Explicit Relative Import (Dot Navigation):</span>
                  <code className="text-cyan-300 font-bold block pt-1">{computed.rel}</code>
                </div>
              </div>
            </div>

            <div className="space-y-2 flex flex-col justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                Dot Navigation Breakdown
              </span>
              <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-300 flex-1 leading-relaxed flex items-center">
                <p>💡 {computed.explanation}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER ABSOLUTE VS RELATIVE MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Absolute vs Relative Comparison Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Feature</th>
                  <th className="py-3.5 px-4 font-bold">Absolute Import</th>
                  <th className="py-3.5 px-4 font-bold">Explicit Relative Import</th>
                  <th className="py-3.5 px-4 font-bold">Tradeoff / Recommendation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">Syntax Format</td>
                  <td className="py-3 px-4 font-mono text-slate-200">from app.core import db</td>
                  <td className="py-3 px-4 font-mono text-slate-200">from ..core import db</td>
                  <td className="py-3 px-4">Relative uses leading dots for upward navigation</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">PEP 8 Status</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">Preferred Standard</td>
                  <td className="py-3 px-4 text-slate-300">Accepted Alternative</td>
                  <td className="py-3 px-4">Absolute gives better readability and error messages</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-blue-300 font-semibold">Package Portability</td>
                  <td className="py-3 px-4 text-slate-400">Hardcoded to package name</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">100% Portable</td>
                  <td className="py-3 px-4">Renaming top package requires zero edits in relative</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">Direct CLI Run</td>
                  <td className="py-3 px-4 text-emerald-400">Works (if in PYTHONPATH)</td>
                  <td className="py-3 px-4 text-rose-400 font-bold">Crashes without -m</td>
                  <td className="py-3 px-4">Must execute with <code className="text-purple-300">python -m pkg.sub.file</code></td>
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
            Explore 4 production-grade Python scripts demonstrating absolute vs relative syntax, fixing attempted relative import errors, and multi-tier e-commerce checkout importers:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "absolute_vs_relative_imports_syntax.py",
                code: importSyntax,
                description: "Syntax comparison between absolute imports and explicit relative imports with single, double, and triple dot navigation.",
              },
              {
                filename: "attempted_relative_import_error_resolution.py",
                code: errorResolution,
                description: "Anatomy of the 'attempted relative import with no known parent package' error and the python -m resolution.",
              },
              {
                filename: "package_refactoring_and_portability.py",
                code: refactoringPortability,
                description: "Refactoring safety tradeoffs, library portability, and avoiding the 'dot madness' anti-pattern.",
              },
              {
                filename: "ecommerce_multi_package_importer.py",
                code: ecommerceImporter,
                description: "Enterprise e-commerce logistics and billing pipeline coordinating absolute and relative imports.",
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
                <span>❌</span> Trap 1: Direct Execution of Relative Imports
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Running <code className="text-rose-300 font-mono">python app/billing/calc.py</code> crashes with <code className="text-rose-300 font-mono">attempted relative import with no known parent package</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Run from project root with <code className="text-emerald-300">python -m app.billing.calc</code>!
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Dot Madness (Climbing Too Far)
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-amber-300 font-mono">from .....services.auth import user</code> is unreadable, fragile, and breaks immediately when files move.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> If you need more than 2 dots (..), switch to an ABSOLUTE import!
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Relative Import in Top-Level Script
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-purple-300 font-mono">from . import helper</code> in your root <code className="text-purple-300 font-mono">main.py</code> crashes because top-level scripts have no parent package!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use standard <code className="text-emerald-300">import helper</code> in root scripts.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: sys.path.append("..") Workaround
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Manually appending parent folders to <code className="text-cyan-300 font-mono">sys.path</code> creates duplicate module instances in memory and breaks production builds.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use proper packaging or set <code className="text-emerald-300">PYTHONPATH</code>.
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
            Comprehensive question-and-answer repository covering absolute vs relative imports, dot syntax, python -m execution, and package portability:
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
            Download or print the complete reference sheet with dot navigation tables, PEP 8 rules, and the python -m command cheatsheet:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic6_relative_vs_absolute_imports_notes.txt"
              title="Print Topic 6 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
