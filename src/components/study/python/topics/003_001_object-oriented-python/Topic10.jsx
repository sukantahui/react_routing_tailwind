import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import mroFundamentals from "./topic10_files/mro_fundamentals_and_c3_linearization.py?raw";
import mroErrors from "./topic10_files/mro_inconsistent_hierarchy_and_errors.py?raw";
import c3Algorithm from "./topic10_files/complex_multiple_inheritance_mro_visualizer.py?raw";
import middlewareMRO from "./topic10_files/enterprise_plugin_and_event_pipeline_mro.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic10_files/topic10_note.txt?raw";

// FAQ Questions
import questions from "./topic10_files/topic10_questions";

/**
 * Topic10: Method Resolution Order (MRO)
 * Module: 003_001_object-oriented-python
 * Segment: 3 (Advanced Python Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic10() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("c3formula");

  // Interactive MRO Simulator State
  const [selectedHierarchy, setSelectedHierarchy] = useState("diamond_bc");

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

  const hierarchies = {
    diamond_bc: {
      title: "CompositeDiamond(BranchA, BranchB)",
      code: "class CompositeDiamond(BranchA, BranchB): pass",
      mro: ["CompositeDiamond", "BranchA", "BranchB", "RootEntity", "object"],
      description: "Standard Diamond: BranchA (left) evaluated before BranchB (right), then common root RootEntity.",
      isError: false,
    },
    diamond_cb: {
      title: "InvertedDiamond(BranchB, BranchA)",
      code: "class InvertedDiamond(BranchB, BranchA): pass",
      mro: ["InvertedDiamond", "BranchB", "BranchA", "RootEntity", "object"],
      description: "Inverted Diamond: BranchB (left) evaluated before BranchA (right), then common root RootEntity.",
      isError: false,
    },
    middleware: {
      title: "ProductionApiEndpoint(RateLimit, JWTAuth, AuditTelemetry)",
      code: "class ProductionApiEndpoint(RateLimit, JWTAuth, AuditTelemetry): pass",
      mro: ["ProductionApiEndpoint", "RateLimitPlugin", "JWTAuthenticationPlugin", "AuditTelemetryPlugin", "BaseMiddleware", "object"],
      description: "Sequential Middleware Pipeline: strictly processes RateLimit -> JWTAuth -> AuditTelemetry.",
      isError: false,
    },
    conflict: {
      title: "InvalidChild(BaseA, BaseB) where BaseB(BaseA)",
      code: "class InvalidChild(BaseA, BaseB): pass  # Contradictory!",
      mro: [],
      description: "TypeError: Cannot create a consistent method resolution order (MRO) for bases BaseA, BaseB. BaseB demands BaseB before BaseA, but header demands BaseA before BaseB!",
      isError: true,
    },
  };

  const currentH = hierarchies[selectedHierarchy];

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
            Segment 3 • Module 003_001
          </span>
          <span className="text-xs sm:text-sm font-mono bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/80 shadow-sm shadow-cyan-950/50">
            Topic 10
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Object-Oriented Programming (OOP) in Python
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Method Resolution Order (<span className="text-teal-400 font-mono">MRO</span>) &amp; C3 Linearization
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master Python's deterministic method lookup engine: inspecting <code className="text-teal-300 font-mono">Class.__mro__</code>, the mathematical C3 Linearization algorithm, diamond problem resolution, monotonicity constraints, and diagnosing <code className="text-rose-400 font-mono">TypeError: inconsistent MRO</code>.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📐 C3 Linearization Algorithm
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            💎 Diamond Problem Resolution
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔍 Class.__mro__ vs Class.mro()
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ Monotonicity &amp; Conflict Diagnosis
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: WHAT IS MRO */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧭</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Deterministic Search Path: Understanding MRO
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              When you call <code className="text-teal-300 font-mono">obj.method()</code>, Python must search through ancestor classes to find the method. The exact, deterministic sequence of classes searched is the <strong>Method Resolution Order (MRO)</strong>, calculated by Python's <strong>C3 Linearization Algorithm</strong>:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-base mb-1">1️⃣ Subclass Priority</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">Child before Parent</code>
                <p className="text-[11px] text-slate-300">
                  Subclasses are always searched before their parent base classes.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-base mb-1">2️⃣ Left-to-Right Order</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">class D(A, B): A then B</code>
                <p className="text-[11px] text-slate-300">
                  Base classes declared in the class header preserve their declaration order.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-base mb-1">3️⃣ Monotonicity</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">Stable Ancestor Order</code>
                <p className="text-[11px] text-slate-300">
                  If A precedes B in one parent, A must precede B across all derived subclasses!
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                Inspecting MRO in Python
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                You can inspect the exact MRO of any class using <code className="text-teal-300 font-mono">ClassName.__mro__</code> (returns a tuple of class types) or <code className="text-cyan-300 font-mono">ClassName.mro()</code> (returns a list). Every class in Python 3 ultimately terminates at <code className="text-slate-400 font-mono">object</code>.
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
                2. Visualizing C3 Linearization &amp; Diamond Traversal
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("c3formula")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "c3formula"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                C3 Merge Formula
              </button>
              <button
                onClick={() => setActiveInteractiveTab("diamond")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "diamond"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Diamond MRO Path
              </button>
              <button
                onClick={() => setActiveInteractiveTab("conflict")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "conflict"
                    ? "bg-rose-900/50 text-rose-300 border border-rose-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Inconsistent MRO Trap
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining the C3 merge algorithm, diamond resolution paths, and contradictory ordering conflicts:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "c3formula" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">THE C3 LINEARIZATION FORMULA &amp; MERGE STEP</text>

                {/* Formula Box */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="70" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="30" fill="#99f6e4" fontSize="13" fontWeight="bold">Mathematical Definition:</text>
                  <text x="20" y="55" fill="#34d399" fontSize="13 font-mono font-bold">L(C) = [C] + merge(L(B1), L(B2), ..., [B1, B2, ...])</text>
                </g>

                {/* 3 Steps */}
                <g transform="translate(30, 135)">
                  <rect x="0" y="0" width="260" height="150" rx="6" fill="#083344" stroke="#06b6d4" />
                  <text x="15" y="25" fill="#a5f3fc" fontSize="11 font-bold">1. Select Candidate Head</text>
                  <text x="15" y="50" fill="#cbd5e1" fontSize="9">Take head of first list.</text>
                  <text x="15" y="70" fill="#cbd5e1" fontSize="9">Check if it appears in the TAIL</text>
                  <text x="15" y="90" fill="#cbd5e1" fontSize="9">(index 1+) of any other list.</text>
                  <text x="15" y="115" fill="#38bdf8" fontSize="9 font-bold">If in tail → Skip to next candidate!</text>

                  <rect x="280" y="0" width="260" height="150" rx="6" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="295" y="25" fill="#c4b5fd" fontSize="11 font-bold">2. Append &amp; Remove</text>
                  <text x="295" y="50" fill="#cbd5e1" fontSize="9">If candidate is valid:</text>
                  <text x="295" y="70" fill="#34d399" fontSize="9 font-mono">1. Append to result output</text>
                  <text x="295" y="90" fill="#34d399" fontSize="9 font-mono">2. Remove from all input lists</text>
                  <text x="295" y="115" fill="#c084fc" fontSize="9 font-bold">Repeat until all lists are empty!</text>

                  <rect x="560" y="0" width="260" height="150" rx="6" fill="#064e3b" stroke="#10b981" />
                  <text x="575" y="25" fill="#a7f3d0" fontSize="11 font-bold">3. Final MRO Sequence</text>
                  <text x="575" y="50" fill="#cbd5e1" fontSize="9">Returns strict monotonic linear</text>
                  <text x="575" y="70" fill="#cbd5e1" fontSize="9">sequence ending at 'object'.</text>
                  <text x="575" y="100" fill="#a7f3d0" fontSize="9 font-bold">✓ Conflict-free &amp; Deterministic!</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "diamond" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">DIAMOND HIERARCHY MRO RESOLUTION PATH: D(B, C)</text>

                {/* Diamond Diagram */}
                <g transform="translate(30, 40)">
                  {/* Root: A */}
                  <rect x="340" y="10" width="180" height="45" rx="6" fill="#134e4a" stroke="#14b8a6" />
                  <text x="375" y="38" fill="#99f6e4" fontSize="12 font-mono font-bold">RootEntity (A)</text>

                  {/* Left: B */}
                  <rect x="170" y="95" width="180" height="45" rx="6" fill="#083344" stroke="#06b6d4" />
                  <text x="205" y="123" fill="#a5f3fc" fontSize="12 font-mono font-bold">BranchA (B)</text>

                  {/* Right: C */}
                  <rect x="510" y="95" width="180" height="45" rx="6" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="545" y="123" fill="#c4b5fd" fontSize="12 font-mono font-bold">BranchB (C)</text>

                  {/* Child: D */}
                  <rect x="340" y="185" width="180" height="45" rx="6" fill="#064e3b" stroke="#10b981" />
                  <text x="360" y="213" fill="#a7f3d0" fontSize="12 font-mono font-bold">CompositeDiamond (D)</text>

                  {/* Resolution Order Path */}
                  <text x="250" y="165" fill="#38bdf8" fontSize="12" fontWeight="bold">1. D → 2. B</text>
                  <text x="435" y="123" fill="#38bdf8" fontSize="14" fontWeight="bold">→</text>
                  <text x="400" y="145" fill="#38bdf8" fontSize="11 font-mono">3. C (Right)</text>
                  <text x="600" y="75" fill="#38bdf8" fontSize="11 font-mono">4. A (Root)</text>
                </g>

                {/* Bottom MRO Result Banner */}
                <g transform="translate(30, 270)">
                  <rect x="0" y="0" width="820" height="45" rx="6" fill="#090d16" stroke="#334155" />
                  <text x="20" y="28" fill="#34d399" fontSize="11 font-mono font-bold">MRO: [ CompositeDiamond → BranchA → BranchB → RootEntity → object ]</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#f43f5e" fontSize="14" fontWeight="bold">CONTRADICTORY MRO CONFLICT (TypeError: Inconsistent MRO)</text>

                {/* Code Conflict */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="12" fontWeight="bold">❌ The Contradictory Definition</text>
                  <text x="20" y="60" fill="#fca5a5" fontSize="10 font-mono">class BaseA: pass</text>
                  <text x="20" y="85" fill="#fca5a5" fontSize="10 font-mono">class BaseB(BaseA): pass</text>
                  <text x="20" y="120" fill="#fca5a5" fontSize="10 font-mono"># DANGEROUS CONTRADICTION:</text>
                  <text x="20" y="140" fill="#fda4af" fontSize="10 font-mono font-bold">class InvalidChild(BaseA, BaseB): pass</text>

                  <text x="20" y="180" fill="#ffe4e6" fontSize="9">• Header demands: BaseA before BaseB</text>
                  <text x="20" y="200" fill="#ffe4e6" fontSize="9">• BaseB demands: BaseB before BaseA</text>
                </g>

                {/* Right: Python's Reaction */}
                <g transform="translate(460, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#881337" stroke="#e11d48" />
                  <text x="20" y="30" fill="#ffe4e6" fontSize="12" fontWeight="bold">CPython Compilation Reaction</text>
                  
                  <rect x="20" y="60" width="340" height="85" rx="4" fill="#4c0519" stroke="#f43f5e" />
                  <text x="30" y="85" fill="#fda4af" fontSize="10 font-bold">TypeError Raised:</text>
                  <text x="30" y="105" fill="#ecfdf5" fontSize="8 font-mono">Cannot create a consistent method resolution</text>
                  <text x="30" y="125" fill="#ecfdf5" fontSize="8 font-mono">order (MRO) for bases BaseA, BaseB</text>

                  <text x="20" y="175" fill="#a7f3d0" fontSize="10 font-bold">✓ Canonical Fix:</text>
                  <text x="20" y="200" fill="#34d399" fontSize="10 font-mono font-bold">class ValidChild(BaseB, BaseA): pass</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE MRO CALCULATOR PLAYGROUND */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive MRO Calculator &amp; Hierarchy Inspector
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Select an inheritance topology to calculate its live C3 Linearization MRO search sequence:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Chooser */}
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-teal-400 block font-bold">
                Select Class Hierarchy
              </span>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setSelectedHierarchy("diamond_bc")}
                  className={clsx(
                    "p-3 rounded-lg text-left text-xs font-mono transition-all border",
                    selectedHierarchy === "diamond_bc"
                      ? "bg-teal-950/80 border-teal-500 text-teal-200"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  )}
                >
                  <div className="font-bold text-teal-300">1. CompositeDiamond(BranchA, BranchB)</div>
                  <div className="text-[11px] text-slate-400">Classic Diamond (Left Branch evaluated first)</div>
                </button>

                <button
                  onClick={() => setSelectedHierarchy("diamond_cb")}
                  className={clsx(
                    "p-3 rounded-lg text-left text-xs font-mono transition-all border",
                    selectedHierarchy === "diamond_cb"
                      ? "bg-cyan-950/80 border-cyan-500 text-cyan-200"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  )}
                >
                  <div className="font-bold text-cyan-300">2. InvertedDiamond(BranchB, BranchA)</div>
                  <div className="text-[11px] text-slate-400">Inverted Diamond (Right Branch evaluated first)</div>
                </button>

                <button
                  onClick={() => setSelectedHierarchy("middleware")}
                  className={clsx(
                    "p-3 rounded-lg text-left text-xs font-mono transition-all border",
                    selectedHierarchy === "middleware"
                      ? "bg-purple-950/80 border-purple-500 text-purple-200"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  )}
                >
                  <div className="font-bold text-purple-300">3. ProductionApiEndpoint (3 Middleware Plugins)</div>
                  <div className="text-[11px] text-slate-400">RateLimit → JWTAuth → AuditTelemetry</div>
                </button>

                <button
                  onClick={() => setSelectedHierarchy("conflict")}
                  className={clsx(
                    "p-3 rounded-lg text-left text-xs font-mono transition-all border",
                    selectedHierarchy === "conflict"
                      ? "bg-rose-950/80 border-rose-500 text-rose-200"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  )}
                >
                  <div className="font-bold text-rose-300">4. Inconsistent MRO (TypeError Conflict)</div>
                  <div className="text-[11px] text-slate-400">Contradictory base ordering violating monotonicity</div>
                </button>
              </div>
            </div>

            {/* MRO Inspection Display */}
            <div className="space-y-3 flex flex-col justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-bold">
                Calculated C3 MRO Linearization
              </span>

              <div className={clsx(
                "p-4 rounded-xl border flex-1 space-y-2 text-xs font-mono",
                currentH.isError ? "bg-rose-950/40 border-rose-800" : "bg-slate-900 border-slate-800"
              )}>
                {!currentH.isError ? (
                  <>
                    <div className="text-teal-300 font-bold mb-1">
                      {currentH.code}
                    </div>
                    <div className="text-[11px] text-slate-400 mb-3">
                      {currentH.description}
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-slate-800">
                      <span className="text-slate-400 block mb-1 font-bold">Method Search Priority:</span>
                      {currentH.mro.map((clsName, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="bg-slate-950 text-teal-400 font-bold px-1.5 py-0.5 rounded border border-slate-800 w-6 text-center">
                            {idx}
                          </span>
                          <span className={clsx(idx === 0 ? "text-emerald-300 font-bold" : idx === currentH.mro.length - 1 ? "text-slate-500" : "text-cyan-300")}>
                            {clsName}
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="space-y-2 text-rose-300">
                    <div className="font-bold text-rose-400 text-sm">❌ TypeError: Inconsistent MRO</div>
                    <p className="text-[11px] leading-relaxed">
                      {currentH.description}
                    </p>
                    <div className="p-2.5 bg-slate-950 rounded border border-rose-900 text-[11px] text-emerald-400 font-bold">
                      ✓ Fix: Reorder bases specialized before general: `class Valid(BaseB, BaseA): pass`
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER MRO MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Method Resolution Order Reference Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Hierarchy Topology</th>
                  <th className="py-3.5 px-4 font-bold">Declaration Header</th>
                  <th className="py-3.5 px-4 font-bold">MRO Sequence Result</th>
                  <th className="py-3.5 px-4 font-bold">First Searched Base</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">Single</td>
                  <td className="py-3 px-4 font-mono text-slate-200">class B(A):</td>
                  <td className="py-3 px-4 font-mono text-slate-300">[B, A, object]</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">B (Self)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">Multilevel</td>
                  <td className="py-3 px-4 font-mono text-slate-200">class C(B): (B inherits A)</td>
                  <td className="py-3 px-4 font-mono text-slate-300">[C, B, A, object]</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">C (Child)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">Multiple (Left-First)</td>
                  <td className="py-3 px-4 font-mono text-slate-200">class D(B, C):</td>
                  <td className="py-3 px-4 font-mono text-slate-300">[D, B, C, A, object]</td>
                  <td className="py-3 px-4 text-cyan-300">B (Leftmost Header Base)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">Inverted Multiple</td>
                  <td className="py-3 px-4 font-mono text-slate-200">class D(C, B):</td>
                  <td className="py-3 px-4 font-mono text-slate-300">[D, C, B, A, object]</td>
                  <td className="py-3 px-4 text-amber-300">C (Leftmost Header Base)</td>
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
            Explore 4 production-grade Python scripts demonstrating MRO inspection, C3 merge algorithm in pure Python, inconsistent MRO error handling, and middleware sequencing:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "mro_fundamentals_and_c3_linearization.py",
                code: mroFundamentals,
                description: "MRO inspection via __mro__ / mro() and diamond hierarchy method resolution.",
              },
              {
                filename: "mro_inconsistent_hierarchy_and_errors.py",
                code: mroErrors,
                description: "Diagnosing and fixing TypeError: Cannot create a consistent method resolution order (MRO).",
              },
              {
                filename: "complex_multiple_inheritance_mro_visualizer.py",
                code: c3Algorithm,
                description: "Pure Python implementation of the C3 Linearization merge algorithm matching CPython 100%.",
              },
              {
                filename: "enterprise_plugin_and_event_pipeline_mro.py",
                code: middlewareMRO,
                description: "Enterprise Event Middleware Pipeline sequencing RateLimit, Authentication, and AuditLogging via MRO.",
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
                <span>❌</span> Trap 1: General Before Specialized Bases
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-rose-300 font-mono">class Child(GeneralBase, SpecializedSubclass):</code> causes <code className="text-rose-300 font-mono">TypeError: Cannot create a consistent MRO</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Always list specialized classes before general base classes in inheritance headers.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Assuming Depth-First Search
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Assuming Python uses DFS will lead to bugs in diamond hierarchies. C3 evaluates all sibling branches before visiting shared roots!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fact:</span> C3 Linearization checks all child siblings before shared ancestors.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Expecting `super()` to Call Parent
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                In multiple inheritance, <code className="text-purple-300 font-mono">super()</code> calls the next class in MRO, which may be a sibling mixin rather than a direct parent.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Always inspect <code className="text-emerald-300">Class.__mro__</code> to trace exact delegation paths.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Attempting to Mutate `__mro__`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Attempting to modify <code className="text-cyan-300 font-mono">Class.__mro__ = (...)</code> raises <code className="text-cyan-300 font-mono">TypeError: readonly attribute</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> MRO is fixed and immutable at class compilation time.
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
            Comprehensive question-and-answer repository covering Method Resolution Order, C3 Linearization algorithm, diamond problem, and monotonicity constraints:
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
            Download or print the complete reference sheet with C3 linearization rules, MRO inspection recipes, and middleware architecture patterns:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic10_method_resolution_order_mro_notes.txt"
              title="Print Topic 10 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
