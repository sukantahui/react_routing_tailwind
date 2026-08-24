import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import dunderMechanics from "./topic4_files/dunder_name_idiom_mechanics.py?raw";
import reusableCli from "./topic4_files/reusable_library_and_cli_tool.py?raw";
import unitTestingBench from "./topic4_files/unit_testing_and_benchmarking_guard.py?raw";
import taxInvoiceCli from "./topic4_files/tax_invoice_cli_and_module.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic4_files/topic4_note.txt?raw";

// FAQ Questions
import questions from "./topic4_files/topic4_questions";

/**
 * Topic4: The __name__ == '__main__' idiom explained with practical use cases
 * Module: 002_009_modules-packages
 * Segment: 2 (Practical Python for Real-World Development)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic4() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("modes");

  // Interactive Simulator State
  const [simMode, setSimMode] = useState("direct"); // direct vs imported

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
            Topic 4
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Modules, Packages &amp; Python Standard Library
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          The <code className="text-teal-400 font-mono">if __name__ == '__main__':</code> Idiom Explained
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Demystify Python's most ubiquitous idiom: dynamic <code className="text-teal-300 font-mono">__name__</code> assignment, eliminating import side-effect pollution, building dual-purpose modules (pure library + interactive CLI tool), and embedding self-testing assertion benchmarks.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🎯 Direct ('__main__') vs Import ('module_name')
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ Zero Side-Effect Safe Imports
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🧰 Dual-Purpose Module Architecture
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🧪 Embedded Unit Testing &amp; Benchmarks
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: THE CORE MECHANISM */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚙️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Execution Context &amp; <code className="text-teal-400 font-mono">__name__</code> Variable
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Before Python executes a single line of a file, CPython automatically sets the special variable <code className="text-teal-400 font-mono">__name__</code> based on <strong>HOW</strong> the file was invoked:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 not-prose">
              {/* Context 1: Direct */}
              <div className="p-5 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg shadow-teal-950/30">
                <div className="flex items-center gap-2 text-teal-400 font-bold text-base mb-2">
                  <span>💻</span> Direct Execution from Terminal
                </div>
                <code className="text-xs font-mono text-teal-300 block mb-2">python fee_calculator.py</code>
                <div className="text-xs text-slate-300 space-y-1">
                  <div>Python sets: <code className="text-emerald-300 font-bold">__name__ = "__main__"</code></div>
                  <div>Condition: <code className="text-emerald-400 font-bold">True</code> (Guard executes!)</div>
                  <div className="text-slate-400 pt-1">Runs CLI arguments, interactive prompts, and self-tests.</div>
                </div>
              </div>

              {/* Context 2: Imported */}
              <div className="p-5 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg shadow-purple-950/30">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-base mb-2">
                  <span>📦</span> Imported by Another Script
                </div>
                <code className="text-xs font-mono text-purple-300 block mb-2">import fee_calculator</code>
                <div className="text-xs text-slate-300 space-y-1">
                  <div>Python sets: <code className="text-cyan-300 font-bold">__name__ = "fee_calculator"</code></div>
                  <div>Condition: <code className="text-rose-400 font-bold">False</code> (Guard is skipped!)</div>
                  <div className="text-slate-400 pt-1">Only exports functions; zero console prints or side effects.</div>
                </div>
              </div>
            </div>

            <div className="bg-rose-950/40 p-5 rounded-xl border-l-4 border-rose-500 border border-rose-900/60">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                The Side-Effect Import Disaster (Without the Guard)
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                If you put executable statements (<code className="text-rose-200 font-mono">print()</code>, database queries, GUI popups) at the root of a file without the guard, they will run <strong>EVERY SINGLE TIME</strong> another file imports your module!
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
                2. Visualizing Execution Contexts &amp; Dual-Mode Modules
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("modes")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "modes"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Dual Execution Modes
              </button>
              <button
                onClick={() => setActiveInteractiveTab("sideeffects")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "sideeffects"
                    ? "bg-rose-900/50 text-rose-300 border border-rose-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Side Effect Disaster
              </button>
              <button
                onClick={() => setActiveInteractiveTab("dualpurpose")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "dualpurpose"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Dual-Purpose Architecture
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining dynamic variable evaluation, execution guards, and production CLI design:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "modes" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">DYNAMIC __name__ ASSIGNMENT IN CPYTHON</text>

                {/* Left: Direct */}
                <g transform="translate(30, 60)">
                  <rect x="0" y="0" width="390" height="230" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="14" fontWeight="bold">Mode 1: Direct CLI Execution</text>
                  <text x="20" y="55" fill="#f8fafc" fontSize="12 font-mono">python invoice_tool.py</text>

                  <rect x="20" y="80" width="350" height="55" rx="6" fill="#022c22" stroke="#059669" />
                  <text x="35" y="105" fill="#34d399" fontSize="12 font-mono">CPython sets: __name__ = "__main__"</text>
                  <text x="35" y="125" fill="#34d399" fontSize="12 font-mono">if __name__ == '__main__': → TRUE</text>

                  <text x="20" y="165" fill="#ecfdf5" fontSize="12">✓ Executes CLI parser (sys.argv)</text>
                  <text x="20" y="190" fill="#ecfdf5" fontSize="12">✓ Runs terminal demo and benchmark tests</text>
                </g>

                {/* Right: Imported */}
                <g transform="translate(450, 60)">
                  <rect x="0" y="0" width="390" height="230" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="14" fontWeight="bold">Mode 2: Module Import</text>
                  <text x="20" y="55" fill="#f8fafc" fontSize="12 font-mono">import invoice_tool</text>

                  <rect x="20" y="80" width="350" height="55" rx="6" fill="#0f172a" stroke="#475569" />
                  <text x="35" y="105" fill="#38bdf8" fontSize="12 font-mono">CPython sets: __name__ = "invoice_tool"</text>
                  <text x="35" y="125" fill="#f43f5e" fontSize="12 font-mono">if __name__ == '__main__': → FALSE</text>

                  <text x="20" y="165" fill="#ecfdf5" fontSize="12">✓ Exports functions cleanly into namespace</text>
                  <text x="20" y="190" fill="#ecfdf5" fontSize="12">✓ Completely skips CLI and print statements!</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "sideeffects" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#f43f5e" fontSize="14" fontWeight="bold">THE IMPORT SIDE-EFFECT DISASTER (UNPROTECTED TOP-LEVEL CODE)</text>

                {/* Left: Buggy */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="390" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="13" fontWeight="bold">❌ Unprotected: script_a.py</text>
                  <text x="20" y="60" fill="#fca5a5" fontSize="12 font-mono">def calc(): return 100</text>
                  <text x="20" y="85" fill="#f43f5e" fontSize="12 font-mono">print("Connecting to DB...") # RAW PRINT!</text>
                  <text x="20" y="110" fill="#f43f5e" fontSize="12 font-mono">run_heavy_backup()          # UNGUARDED!</text>

                  <rect x="20" y="140" width="350" height="75" rx="6" fill="#881337" stroke="#e11d48" />
                  <text x="35" y="165" fill="#ffe4e6" fontSize="11">When web_app.py writes 'import script_a':</text>
                  <text x="35" y="185" fill="#fca5a5" fontSize="11 font-bold">DATABASE CONNECTS &amp; BACKUP RUNS!</text>
                  <text x="35" y="205" fill="#ffe4e6" fontSize="10">Slows down startup and breaks test suites!</text>
                </g>

                {/* Right: Guarded */}
                <g transform="translate(450, 50)">
                  <rect x="0" y="0" width="390" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="13" fontWeight="bold">✓ Guarded: script_a.py</text>
                  <text x="20" y="60" fill="#34d399" fontSize="12 font-mono">def calc(): return 100</text>
                  <text x="20" y="85" fill="#34d399" fontSize="12 font-mono">if __name__ == '__main__':</text>
                  <text x="40" y="110" fill="#34d399" fontSize="12 font-mono">print("Connecting to DB...")</text>

                  <rect x="20" y="140" width="350" height="75" rx="6" fill="#022c22" stroke="#059669" />
                  <text x="35" y="165" fill="#a7f3d0" fontSize="11">When web_app.py writes 'import script_a':</text>
                  <text x="35" y="185" fill="#ecfdf5" fontSize="11 font-bold">ZERO SIDE EFFECTS (Safe &amp; Clean)</text>
                  <text x="35" y="205" fill="#a7f3d0" fontSize="10">Loads calc() instantly in microseconds!</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">DUAL-PURPOSE ARCHITECTURE (Web Backend Import + Terminal CLI)</text>

                {/* Shared module core */}
                <g transform="translate(240, 50)">
                  <rect x="0" y="0" width="400" height="110" rx="8" fill="#1e293b" stroke="#38bdf8" />
                  <text x="20" y="30" fill="#bae6fd" fontSize="13" fontWeight="bold">Core Module: tax_invoice.py</text>
                  <text x="20" y="60" fill="#34d399" fontSize="12 font-mono">def calculate_gst(amount): ...</text>
                  <text x="20" y="85" fill="#34d399" fontSize="12 font-mono">def format_invoice(data): ...</text>
                </g>

                {/* Bottom 2 Consumers */}
                <g transform="translate(50, 180)">
                  <rect x="0" y="0" width="350" height="110" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="13" fontWeight="bold">Consumer 1: Web / API Backend</text>
                  <text x="20" y="55" fill="#ecfdf5" fontSize="11 font-mono">from tax_invoice import calculate_gst</text>
                  <text x="20" y="80" fill="#cbd5e1" fontSize="11">FastAPI endpoint returns JSON response</text>
                </g>

                <g transform="translate(480, 180)">
                  <rect x="0" y="0" width="350" height="110" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="13" fontWeight="bold">Consumer 2: Terminal Operator (CLI)</text>
                  <text x="20" y="55" fill="#f8fafc" fontSize="11 font-mono">python tax_invoice.py 9402 12000</text>
                  <text x="20" y="80" fill="#cbd5e1" fontSize="11">Prints formatted ASCII receipt to terminal</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE __name__ SIMULATOR */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive <code className="text-teal-400 font-mono">__name__</code> Execution Simulator
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Toggle between Direct Execution and Import Mode to observe how Python dynamically evaluates the execution guard:
          </p>

          {/* Mode Toggle Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => setSimMode("direct")}
              className={clsx(
                "p-4 rounded-xl border text-left transition-all",
                simMode === "direct"
                  ? "bg-teal-950 border-teal-500 text-teal-200 shadow-lg shadow-teal-950"
                  : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
              )}
            >
              <div className="text-sm font-mono font-bold text-teal-300 mb-1">
                💻 Direct CLI Execution Mode
              </div>
              <code className="text-xs text-slate-400">python fee_manager.py</code>
            </button>

            <button
              onClick={() => setSimMode("imported")}
              className={clsx(
                "p-4 rounded-xl border text-left transition-all",
                simMode === "imported"
                  ? "bg-purple-950 border-purple-500 text-purple-200 shadow-lg shadow-purple-950"
                  : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
              )}
            >
              <div className="text-sm font-mono font-bold text-purple-300 mb-1">
                📦 Imported Module Mode
              </div>
              <code className="text-xs text-slate-400">import fee_manager</code>
            </button>
          </div>

          {/* Simulator Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Left Status */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
                  CPython Evaluated __name__ Value
                </span>
                <code className="text-base font-mono font-bold text-teal-300 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 block">
                  __name__ = "{simMode === "direct" ? "__main__" : "fee_manager"}"
                </code>
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
                  Guard Condition Result
                </span>
                <span className={clsx("inline-block text-xs font-mono font-bold px-3 py-1 rounded-full border", simMode === "direct" ? "text-emerald-300 bg-emerald-950/80 border-emerald-800" : "text-rose-400 bg-rose-950/80 border-rose-800")}>
                  if __name__ == '__main__': → {simMode === "direct" ? "TRUE (Executes Block)" : "FALSE (Skips Block)"}
                </span>
              </div>

              <div className="text-xs text-slate-300 leading-relaxed pt-2">
                {simMode === "direct"
                  ? "Direct invocation runs the self-testing demo and CLI parser, outputting formatted calculations directly to the console."
                  : "Importing loads all function definitions into memory cleanly with zero console pollution or side effects."}
              </div>
            </div>

            {/* Right Output */}
            <div className="space-y-2 flex flex-col justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                Terminal Output Stream
              </span>
              <pre className="p-4 bg-slate-900 rounded-lg border border-slate-800 text-emerald-300 font-mono text-xs overflow-x-auto whitespace-pre-wrap flex-1">
{simMode === "direct"
  ? `=======================================================
               CODER & ACCOTAX - SELF-TEST
=======================================================
Gross Course Fee   : INR 12,000.00
18% GST Assessment : +INR 2,160.00
Net Total Payable  : INR 14,160.00
[PASSED] All internal unit tests passed successfully!`
  : `(Silent Execution - 0 lines printed to console)
Module 'fee_manager' loaded into sys.modules successfully.
Functions available: fee_manager.calculate_fee()`}
              </pre>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER USE CASES MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Practical Use Cases for the Main Guard
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Use Case</th>
                  <th className="py-3.5 px-4 font-bold">What is Placed Inside Guard</th>
                  <th className="py-3.5 px-4 font-bold">Behavior When Imported</th>
                  <th className="py-3.5 px-4 font-bold">Behavior When Run Directly</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">Dual-Mode CLI Tool</td>
                  <td className="py-3 px-4"><code className="text-teal-300">sys.argv</code> or <code className="text-teal-300">argparse</code> parser</td>
                  <td className="py-3 px-4">Functions imported as library</td>
                  <td className="py-3 px-4">Interactive command-line tool</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-emerald-300 font-semibold">Self-Testing Assertions</td>
                  <td className="py-3 px-4"><code className="text-emerald-300">assert func(x) == expected</code></td>
                  <td className="py-3 px-4">Zero test overhead</td>
                  <td className="py-3 px-4">Instant unit test verification</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">Algorithm Benchmarking</td>
                  <td className="py-3 px-4"><code className="text-cyan-300">time.perf_counter()</code> timer</td>
                  <td className="py-3 px-4">Zero timing overhead</td>
                  <td className="py-3 px-4">Measures execution latency</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">Multiprocessing Safety</td>
                  <td className="py-3 px-4"><code className="text-purple-300">multiprocessing.Process</code> spawn</td>
                  <td className="py-3 px-4">Prevents infinite fork loops</td>
                  <td className="py-3 px-4">Spawns child processes cleanly</td>
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
            Explore 4 production-grade Python scripts demonstrating dunder name mechanics, dual-purpose FX currency tools, unit test assertions, and GST tax invoice CLI generators:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "dunder_name_idiom_mechanics.py",
                code: dunderMechanics,
                description: "Exploring __name__ dynamic assignment and preventing unwanted top-level code execution on import.",
              },
              {
                filename: "reusable_library_and_cli_tool.py",
                code: reusableCli,
                description: "Dual-purpose currency conversion library with interactive sys.argv terminal argument parsing.",
              },
              {
                filename: "unit_testing_and_benchmarking_guard.py",
                code: unitTestingBench,
                description: "Self-testing unit assertions and algorithm micro-benchmarking inside main guards.",
              },
              {
                filename: "tax_invoice_cli_and_module.py",
                code: taxInvoiceCli,
                description: "Enterprise GST tax invoice generator and interactive terminal CLI tool.",
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
                <span>❌</span> Trap 1: Single Equals Assignment Typo
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-rose-300 font-mono">if __name__ = '__main__':</code> causes a fatal <code className="text-rose-300 font-mono">SyntaxError</code> because single equals is an assignment operator!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Always use double equals: <code className="text-emerald-300">if __name__ == '__main__':</code>
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Defining Functions Inside the Guard
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                If you place function definitions inside the main guard, they will NOT exist when another script imports your module!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Define functions globally; only put execution calls inside the guard.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Multiprocessing Infinite Loops on Windows
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Spawning multiprocessing workers without the guard on Windows triggers an infinite fork bomb because child processes re-execute the file.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Always wrap multiprocessing entry points inside the main guard.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Global Variable Pollution in Guard
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Declaring raw variables inside the guard block makes them global module variables, creating accidental leaks.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Wrap logic inside <code className="text-emerald-300">def main():</code> and call <code className="text-emerald-300">main()</code>.
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
            Comprehensive question-and-answer repository covering dunder name evaluation, import side effects, dual-mode architectures, and multiprocessing guards:
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
            Download or print the complete reference sheet with execution context tables, CLI templates, and self-testing recipes:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic4_main_guard_idiom_notes.txt"
              title="Print Topic 4 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
