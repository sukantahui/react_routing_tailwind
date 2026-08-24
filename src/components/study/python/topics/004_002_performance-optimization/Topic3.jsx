import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import cprofileFundCode from "./topic3_files/cprofile_deterministic_profiler_fundamentals.py?raw";
import decoratorsCode from "./topic3_files/cprofile_context_manager_and_decorators.py?raw";
import bottleneckCode from "./topic3_files/identifying_and_resolving_cpu_bottlenecks.py?raw";
import ledgerProfilerCode from "./topic3_files/institutional_admission_ledger_cpu_profiler.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic3_files/topic3_note.txt?raw";

// FAQ Questions
import questions from "./topic3_files/topic3_questions";

/**
 * Topic3: Profiling CPU execution using cProfile and pstats
 * Module: 004_002_performance-optimization
 * Segment: 4 (Python Pro Level & Ecosystem Mastery)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic3() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("callTreeAnatomy");

  // Interactive Laboratory State
  const [pipelineMode, setPipelineMode] = useState("BOTTLENECK"); // BOTTLENECK | OPTIMIZED
  const [sortKey, setSortKey] = useState("CUMULATIVE"); // CUMULATIVE | TIME | CALLS

  // Simulated Profile Rows
  let profileRows = [];
  let totalRuntime = "420.5 ms";
  let hotspotSummary = "stage2_validate_records consumes 96.2% of runtime!";

  if (pipelineMode === "BOTTLENECK") {
    totalRuntime = "420.5 ms";
    hotspotSummary = "stage2_validate_records consumes 96.2% of runtime (O(N²) list scan)!";
    profileRows = [
      { name: "execute_pipeline()", ncalls: "1", tottime: "0.2 ms", cumtime: "420.5 ms", pct: 100, isHot: false },
      { name: "stage2_validate_records()", ncalls: "1", tottime: "404.6 ms", cumtime: "404.6 ms", pct: 96.2, isHot: true },
      { name: "stage1_ingest_records()", ncalls: "1", tottime: "10.4 ms", cumtime: "10.4 ms", pct: 2.5, isHot: false },
      { name: "stage3_compute_tax()", ncalls: "1", tottime: "5.3 ms", cumtime: "5.3 ms", pct: 1.3, isHot: false },
    ];
  } else {
    totalRuntime = "18.2 ms";
    hotspotSummary = "Hotspot eliminated! Pipeline executes in 18.2 ms (23x Speedup).";
    profileRows = [
      { name: "execute_pipeline()", ncalls: "1", tottime: "0.2 ms", cumtime: "18.2 ms", pct: 100, isHot: false },
      { name: "stage1_ingest_records()", ncalls: "1", tottime: "10.4 ms", cumtime: "10.4 ms", pct: 57.1, isHot: false },
      { name: "stage3_compute_tax()", ncalls: "1", tottime: "5.3 ms", cumtime: "5.3 ms", pct: 29.1, isHot: false },
      { name: "stage2_validate_records() [Set]", ncalls: "1", tottime: "2.3 ms", cumtime: "2.3 ms", pct: 12.6, isHot: false },
    ];
  }

  if (sortKey === "TIME") {
    profileRows = [...profileRows].sort((a, b) => parseFloat(b.tottime) - parseFloat(a.tottime));
  } else if (sortKey === "CALLS") {
    profileRows = [...profileRows].sort((a, b) => parseInt(b.ncalls) - parseInt(a.ncalls));
  } else {
    profileRows = [...profileRows].sort((a, b) => parseFloat(b.cumtime) - parseFloat(a.cumtime));
  }

  const generatedPythonSnippet = `# cProfile CPU Profiling & pstats Report Generation:
import cProfile
import pstats

profiler = cProfile.Profile()
profiler.enable()

# Execute target workload:
execute_pipeline()

profiler.disable()

# Format report with pstats:
stats = pstats.Stats(profiler)
stats.strip_dirs()
stats.sort_stats(pstats.SortKey.${sortKey})
stats.print_stats(10)`;

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
            Segment 4 • Module 004_002
          </span>
          <span className="text-xs sm:text-sm font-mono bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/80 shadow-sm shadow-cyan-950/50">
            Topic 3
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Performance Optimization, Profiling &amp; Big-O Thinking
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          CPU Profiling: <span className="text-teal-400">cProfile &amp; pstats Modules</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master deterministic CPU profiling in Python: isolating execution bottlenecks with <code className="text-teal-300 font-mono">cProfile.Profile()</code>, analyzing call tree metrics with <code className="text-cyan-300 font-mono">pstats.Stats()</code>, understanding internal (<code className="text-amber-300 font-mono">tottime</code>) versus cumulative (<code className="text-purple-300 font-mono">cumtime</code>) costs, building custom profiling decorators, and exporting <code className="text-emerald-400 font-mono">.pstats</code> binary snapshots for interactive Snakeviz flamegraphs.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔬 Deterministic Profiling
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📊 `tottime` vs `cumtime`
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔥 Hotspot Elimination
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🌐 Snakeviz Flamegraphs
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: CPROFILE ARCHITECTURE */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🔬</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The CPU Execution Profiling Architecture
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Deterministic profiling intercepts every function call, return, and exception to build a complete statistical model of program execution:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ `cProfile.Profile`</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">enable(), disable()</code>
                <p className="text-[11px] text-slate-300">
                  C-extension profiler with minimal runtime overhead. Records precise call counts and execution timestamps.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ `pstats.Stats`</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">sort_stats("cumulative")</code>
                <p className="text-[11px] text-slate-300">
                  Formats, strips directories, and sorts profiling logs by cumulative time, internal time, or call count.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ Flamegraph Dumps</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">dump_stats("prof.pstats")</code>
                <p className="text-[11px] text-slate-300">
                  Exports binary profiling dumps to open interactive visual flamegraphs and icicle charts via Snakeviz.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Golden Profiling Rule: `tottime` vs `cumtime`
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                <code className="text-amber-300 font-mono">tottime</code> represents the time spent inside the function body itself (excluding sub-calls). <code className="text-purple-300 font-mono">cumtime</code> represents the cumulative time spent inside the function AND all its child sub-routines. Always sort by <code className="text-teal-300 font-mono">cumtime</code> first to locate the high-level bottleneck branch!
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
                2. Visualizing Call Trees, Hotspot Isolation &amp; Flamegraphs
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("callTreeAnatomy")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "callTreeAnatomy"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Call Tree Anatomy
              </button>
              <button
                onClick={() => setActiveInteractiveTab("hotspotIsolation")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "hotspotIsolation"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Hotspot Isolation
              </button>
              <button
                onClick={() => setActiveInteractiveTab("flamegraphEcosystem")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "flamegraphEcosystem"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Flamegraph Tooling
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining call tree hierarchy metrics, identifying the 95% execution hotspot, and integrating with browser flamegraph viewers:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "callTreeAnatomy" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">CPROFILE CALL TREE HIERARCHY &amp; METRIC DECOMPOSITION</text>

                {/* Top Caller Box */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="60" rx="6" fill="#083344" stroke="#06b6d4" />
                  <text x="20" y="25" fill="#a5f3fc" fontSize="11 font-bold">Top-Level Caller: `execute_pipeline()` (ncalls = 1)</text>
                  <text x="20" y="45" fill="#38bdf8" fontSize="9 font-mono">cumtime = 420.5 ms (Total Tree Runtime) | tottime = 0.2 ms (Self Work)</text>
                </g>

                {/* 3 Children Subroutines */}
                <g transform="translate(30, 130)">
                  {/* Child 1 */}
                  <rect x="0" y="0" width="250" height="150" rx="6" fill="#134e4a" stroke="#14b8a6" />
                  <text x="15" y="30" fill="#99f6e4" fontSize="11 font-bold">`stage1_ingest_records()`</text>
                  <text x="15" y="55" fill="#34d399" fontSize="8 font-mono">ncalls = 1</text>
                  <text x="15" y="75" fill="#38bdf8" fontSize="8 font-mono">cumtime = 10.4 ms (2.5%)</text>
                  <text x="15" y="95" fill="#cbd5e1" fontSize="8">Fast data loading.</text>
                  <text x="15" y="115" fill="#34d399" fontSize="8 font-bold">STATUS: OPTIMAL</text>

                  {/* Child 2 (HOTSPOT) */}
                  <rect x="280" y="0" width="260" height="150" rx="6" fill="#4c0519" stroke="#f43f5e" />
                  <text x="295" y="30" fill="#fda4af" fontSize="11 font-bold">`stage2_validate_records()`</text>
                  <text x="295" y="55" fill="#fca5a5" fontSize="8 font-mono">ncalls = 1</text>
                  <text x="295" y="75" fill="#f43f5e" fontSize="8 font-mono font-bold">cumtime = 404.6 ms (96.2%)</text>
                  <text x="295" y="95" fill="#fca5a5" fontSize="8">Repeated linear list scans.</text>
                  <text x="295" y="115" fill="#f43f5e" fontSize="8 font-bold">🔥 SEVERE BOTTLENECK</text>

                  {/* Child 3 */}
                  <rect x="570" y="0" width="250" height="150" rx="6" fill="#134e4a" stroke="#14b8a6" />
                  <text x="585" y="30" fill="#99f6e4" fontSize="11 font-bold">`stage3_compute_tax()`</text>
                  <text x="585" y="55" fill="#34d399" fontSize="8 font-mono">ncalls = 1</text>
                  <text x="585" y="75" fill="#38bdf8" fontSize="8 font-mono">cumtime = 5.3 ms (1.3%)</text>
                  <text x="585" y="95" fill="#cbd5e1" fontSize="8">Fast float arithmetic.</text>
                  <text x="585" y="115" fill="#34d399" fontSize="8 font-bold">STATUS: OPTIMAL</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "hotspotIsolation" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">SYSTEMATIC BOTTLENECK ELIMINATION: 96% BOTTLENECK COLLAPSE</text>

                {/* Left: Before */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="12" fontWeight="bold">Before Optimization: 420.5 ms</text>
                  
                  <text x="20" y="65" fill="#fca5a5" fontSize="8 font-mono">`if student_id in valid_ids_list:`</text>
                  <text x="20" y="85" fill="#fca5a5" fontSize="8 font-mono">Scans list of 2,000 IDs for every candidate</text>
                  <text x="20" y="105" fill="#f43f5e" fontSize="8 font-mono font-bold">Total comparisons: 2,000 x 2,000 = 4,000,000</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#090d16" stroke="#e11d48" />
                  <text x="30" y="155" fill="#fda4af" fontSize="9 font-bold">Profiler Diagnosis:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">Stage 2 consumes 96.2% of pipeline latency.</text>
                </g>

                {/* Right: After */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">After Optimization: 18.2 ms (23x Faster!)</text>

                  <text x="20" y="65" fill="#34d399" fontSize="8 font-mono">`valid_ids_set = set(valid_ids_list)`</text>
                  <text x="20" y="85" fill="#34d399" fontSize="8 font-mono">`if student_id in valid_ids_set:` (O(1) Hash)</text>
                  <text x="20" y="105" fill="#34d399" fontSize="8 font-mono font-bold">Total comparisons: 2,000 instant bucket checks</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="155" fill="#34d399" fontSize="9 font-bold">Verification with cProfile:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">Stage 2 latency collapsed from 404.6 ms to 2.3 ms.</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">PROFILING ECOSYSTEM &amp; SNAKEVIZ FLAMEGRAPH PIPELINE</text>

                {/* 3 Step Flow */}
                <g transform="translate(30, 50)">
                  {/* Step 1 */}
                  <rect x="0" y="0" width="250" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="15" y="30" fill="#99f6e4" fontSize="11 font-bold">1. Capture Profile</text>
                  <text x="15" y="55" fill="#38bdf8" fontSize="8 font-mono">`cProfile.Profile()`</text>
                  <text x="15" y="80" fill="#cbd5e1" fontSize="8">Tracks function entry</text>
                  <text x="15" y="95" fill="#cbd5e1" fontSize="8">and exit timestamps.</text>

                  <rect x="15" y="130" width="220" height="85" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="25" y="155" fill="#34d399" fontSize="9 font-bold">In-Memory Engine:</text>
                  <text x="25" y="175" fill="#cbd5e1" fontSize="8">C-level event listener.</text>

                  {/* Arrow 1 */}
                  <text x="265" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 2 */}
                  <rect x="295" y="0" width="250" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="310" y="30" fill="#a5f3fc" fontSize="11 font-bold">2. Dump Binary Snapshot</text>
                  <text x="310" y="55" fill="#38bdf8" fontSize="8 font-mono">`dump_stats("out.pstats")`</text>
                  <text x="310" y="80" fill="#cbd5e1" fontSize="8">Persists complete call</text>
                  <text x="310" y="95" fill="#cbd5e1" fontSize="8">tree to binary file.</text>

                  <rect x="310" y="130" width="220" height="85" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="320" y="155" fill="#38bdf8" fontSize="9 font-bold">Binary Portability:</text>
                  <text x="320" y="175" fill="#cbd5e1" fontSize="8">Inspect anytime without re-running.</text>

                  {/* Arrow 2 */}
                  <text x="560" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 3 */}
                  <rect x="590" y="0" width="230" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="605" y="30" fill="#c4b5fd" fontSize="11 font-bold">3. Snakeviz Visualizer</text>
                  <text x="605" y="55" fill="#c084fc" fontSize="8 font-mono">`$ snakeviz out.pstats`</text>
                  <text x="605" y="80" fill="#cbd5e1" fontSize="8">Interactive icicle plots,</text>
                  <text x="605" y="95" fill="#cbd5e1" fontSize="8">zoomable call trees,</text>
                  <text x="605" y="110" fill="#cbd5e1" fontSize="8">and sunburst graphs.</text>

                  <rect x="605" y="130" width="200" height="85" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="615" y="155" fill="#c4b5fd" fontSize="9 font-bold">Visual Hotspotting:</text>
                  <text x="615" y="175" fill="#cbd5e1" fontSize="8">Zero guesswork debugging.</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE CPROFILE LAB */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive cProfile Hotspot Inspector Laboratory
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Switch between bottlenecked and optimized pipelines, adjust pstats sort criteria, and inspect real-time call tree profiles:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Controls */}
            <div className="space-y-4">
              {/* Pipeline Mode */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                  1. Target Pipeline Architecture:
                </span>
                <div className="flex bg-slate-900 p-1.5 rounded-lg border border-slate-800 text-xs font-mono">
                  {[
                    { id: "BOTTLENECK", label: "1. Bottleneck (O(N²) List)" },
                    { id: "OPTIMIZED", label: "2. Optimized (O(1) Set)" },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPipelineMode(p.id)}
                      className={clsx(
                        "flex-1 py-1.5 rounded transition-all",
                        pipelineMode === p.id
                          ? "bg-teal-900/60 text-teal-300 font-bold border border-teal-700/80"
                          : "text-slate-400 hover:text-white"
                      )}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Key */}
              <div className="space-y-1.5 pt-1">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                  2. pstats Sort Key (`sort_stats`):
                </span>
                <div className="flex bg-slate-900 p-1.5 rounded-lg border border-slate-800 text-xs font-mono">
                  {[
                    { id: "CUMULATIVE", label: "Cumulative (cumtime)" },
                    { id: "TIME", label: "Internal (tottime)" },
                    { id: "CALLS", label: "Calls (ncalls)" },
                  ].map((k) => (
                    <button
                      key={k.id}
                      onClick={() => setSortKey(k.id)}
                      className={clsx(
                        "flex-1 py-1 rounded transition-all",
                        sortKey === k.id
                          ? "bg-cyan-900/60 text-cyan-300 font-bold border border-cyan-700/80"
                          : "text-slate-400 hover:text-white"
                      )}
                    >
                      {k.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hotspot Progress Table */}
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono space-y-2">
                <div className="flex justify-between items-center text-slate-400 text-[10px] uppercase font-bold border-b border-slate-800 pb-1">
                  <span>Function</span>
                  <span>cumtime (% Total)</span>
                </div>
                {profileRows.map((r) => (
                  <div key={r.name} className="space-y-1">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className={clsx(r.isHot ? "text-rose-400 font-bold" : "text-slate-300")}>
                        {r.isHot ? "🔥 " : ""}{r.name}
                      </span>
                      <span className={clsx(r.isHot ? "text-rose-400 font-bold" : "text-slate-400")}>
                        {r.cumtime} ({r.pct}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={clsx("h-full rounded-full", r.isHot ? "bg-rose-500" : "bg-teal-500")}
                        style={{ width: `${r.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Generated Code & Terminal Output */}
            <div className="space-y-4 flex flex-col justify-between">
              {/* Python Code Display */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
                <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  Generated cProfile Execution Script:
                </div>
                <pre className="text-teal-300 text-[11px] leading-relaxed break-all font-mono overflow-x-auto">
                  {generatedPythonSnippet}
                </pre>
              </div>

              {/* Terminal Telemetry */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex-1 overflow-y-auto max-h-[160px] font-mono text-xs space-y-1">
                <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400">
                  <span>pstats Formatted Terminal Output:</span>
                  <span className="text-emerald-400">Total: {totalRuntime}</span>
                </div>
                <pre className="text-slate-200 text-[11px] leading-relaxed font-mono whitespace-pre-wrap">
                  {`ncalls  tottime  percall  cumtime  percall filename:lineno(function)
${profileRows.map((r) => `${r.ncalls.padEnd(6)} ${r.tottime.padEnd(8)} ${(parseFloat(r.tottime)/parseInt(r.ncalls)).toFixed(1)}ms  ${r.cumtime.padEnd(8)} ${(parseFloat(r.cumtime)/parseInt(r.ncalls)).toFixed(1)}ms ${r.name}`).join("\n")}

[DIAGNOSIS] ${hotspotSummary}`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER PROFILING MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Python Profiling Tooling Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Profiling Tool</th>
                  <th className="py-3.5 px-4 font-bold">Type</th>
                  <th className="py-3.5 px-4 font-bold">Overhead</th>
                  <th className="py-3.5 px-4 font-bold">Primary Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">`cProfile`</td>
                  <td className="py-3 px-4 text-slate-200">Deterministic (All calls)</td>
                  <td className="py-3 px-4 text-emerald-400">Low (~10-30%)</td>
                  <td className="py-3 px-4">Standard library whole-program call tree profiling</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">`pstats`</td>
                  <td className="py-3 px-4 text-slate-200">Report Generator</td>
                  <td className="py-3 px-4 text-emerald-400">Zero (Post-run)</td>
                  <td className="py-3 px-4">Sorting, filtering, and exporting binary `.pstats` snapshots</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">`Snakeviz`</td>
                  <td className="py-3 px-4 text-slate-200">Browser Visualizer</td>
                  <td className="py-3 px-4 text-emerald-400">Zero (GUI viewer)</td>
                  <td className="py-3 px-4">Rendering interactive icicle charts and flamegraphs</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">`line_profiler`</td>
                  <td className="py-3 px-4 text-slate-200">Line-by-Line Micro</td>
                  <td className="py-3 px-4 text-amber-300">High (~200-500%)</td>
                  <td className="py-3 px-4">Finding the exact slow line inside a single function</td>
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
            Explore 4 production-grade Python scripts demonstrating cProfile fundamentals, custom decorators, bottleneck debugging walkthroughs, and institutional ledger profilers:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "cprofile_deterministic_profiler_fundamentals.py",
                code: cprofileFundCode,
                description: "cProfile.Profile, pstats.Stats, tottime vs cumtime, and SortKey sorting.",
              },
              {
                filename: "cprofile_context_manager_and_decorators.py",
                code: decoratorsCode,
                description: "Custom @profile_function decorators, ProfilerContext context managers, and pstats dumps.",
              },
              {
                filename: "identifying_and_resolving_cpu_bottlenecks.py",
                code: bottleneckCode,
                description: "Before/after CPU hotspot profiling and bottleneck elimination.",
              },
              {
                filename: "institutional_admission_ledger_cpu_profiler.py",
                code: ledgerProfilerCode,
                description: "Multi-stage admission ledger CPU profiling and structured telemetry reporting.",
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
                <span>❌</span> Trap 1: Confusing `tottime` with `cumtime`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Sorting by <code className="text-rose-300 font-mono">tottime</code> misses high-level orchestrator bottlenecks whose children consume 95% of execution time.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Sort by <code className="text-emerald-300">SortKey.CUMULATIVE</code> first.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Running cProfile in Production
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Leaving active deterministic profiling enabled on live API servers adds 20%+ request latency and allocates extra memory.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use sampling profilers (e.g. `py-spy`) for live production monitoring.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Premature Intuition Optimization
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Rewriting code based on assumptions without profiling evidence often optimizes the wrong 2% of the codebase.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Profile first, locate the hotspot, refactor, and re-profile.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Multi-Threading Profile Blindspots
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                `cProfile` only profiles the thread that instantiated it, missing background worker thread executions.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Attach separate profilers to worker thread target functions.
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
            Comprehensive question-and-answer repository covering CPU execution profiling, cProfile, pstats, tottime vs cumtime, and Snakeviz:
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
            Download or print the complete reference sheet with cProfile recipes, pstats sort flags, and profiling best practices:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic3_cprofile_cpu_profiling_notes.txt"
              title="Print Topic 3 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
