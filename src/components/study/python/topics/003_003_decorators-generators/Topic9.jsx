import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import memoryBenchmark from "./topic9_files/memory_and_eager_vs_lazy_evaluation_benchmark.py?raw";
import yieldFromDelegation from "./topic9_files/subgenerator_delegation_yield_from.py?raw";
import coroutineSend from "./topic9_files/bidirectional_communication_with_send_and_close.py?raw";
import multicampusPipeline from "./topic9_files/institutional_multicampus_financial_pipeline_suite.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic9_files/topic9_note.txt?raw";

// FAQ Questions
import questions from "./topic9_files/topic9_questions";

/**
 * Topic9: Generator functions vs regular functions
 * Module: 003_003_decorators-generators
 * Segment: 3 (Advanced Python Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic9() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("memory");

  // Interactive Multi-Campus Pipeline Simulator State
  const regionalData = [
    { branch: "Barrackpore", id: "STU-101", name: "Sourav Mukherjee", fee: 20000 },
    { branch: "Barrackpore", id: "STU-102", name: "Priyanka Sen", fee: 27000 },
    { branch: "Kolkata", id: "STU-201", name: "Rahul Verma", fee: 18000 },
    { branch: "Kolkata", id: "STU-202", name: "Debolina Roy", fee: 23800 },
    { branch: "Online Global", id: "STU-301", name: "Amitava Sen", fee: 19800 },
  ];

  const [pipelineCursor, setPipelineCursor] = useState(-1);
  const [streamedVouchers, setStreamedVouchers] = useState([]);
  const [activeBranch, setActiveBranch] = useState("Not Started");
  const [isCompleted, setIsCompleted] = useState(false);
  const [consolidatedReport, setConsolidatedReport] = useState(null);

  const handleResetPipeline = () => {
    setPipelineCursor(-1);
    setStreamedVouchers([]);
    setActiveBranch("Not Started");
    setIsCompleted(false);
    setConsolidatedReport(null);
  };

  const handleStepPipeline = () => {
    if (isCompleted) return;

    const nextIdx = pipelineCursor + 1;
    if (nextIdx < regionalData.length) {
      const item = regionalData[nextIdx];
      setPipelineCursor(nextIdx);
      setActiveBranch(item.branch);
      setStreamedVouchers([...streamedVouchers, item]);
    } else {
      setIsCompleted(true);
      setActiveBranch("All Subgenerators Completed");
      const totalRev = regionalData.reduce((acc, curr) => acc + curr.fee, 0);
      setConsolidatedReport({
        totalAdmitted: regionalData.length,
        grossRevenue: totalRev,
        barrackpore: 47000,
        kolkata: 41800,
        online: 19800,
        status: "REGIONAL_SETTLEMENT_VERIFIED",
      });
    }
  };

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
            Segment 3 • Module 003_003
          </span>
          <span className="text-xs sm:text-sm font-mono bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/80 shadow-sm shadow-cyan-950/50">
            Topic 9
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Decorators, Generators &amp; Iterators
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Generator Functions <span className="text-teal-400">vs Regular Functions</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master the architectural divide in Python: Eager evaluation vs Lazy evaluation, benchmarking memory (<code className="text-teal-300 font-mono">O(N)</code> vs <code className="text-teal-300 font-mono">O(1)</code>), subgenerator delegation with <code className="text-cyan-300 font-mono">yield from</code> (PEP 380), and bidirectional communication with <code className="text-purple-300 font-mono">send()</code>, <code className="text-purple-300 font-mono">throw()</code>, and <code className="text-purple-300 font-mono">close()</code>.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚖️ Eager vs Lazy Evaluation
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📊 O(N) vs O(1) Memory Benchmarking
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛣️ `yield from` Subgenerator Delegation
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📡 Coroutines: send(), throw(), close()
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: EAGER VS LAZY PARADIGM */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚖️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. Eager Evaluation vs Lazy Evaluation
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              The choice between a regular function and a generator function is a fundamental engineering tradeoff:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 not-prose">
              {/* Regular */}
              <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 shadow-lg">
                <div className="text-slate-200 font-bold text-sm mb-1">📦 Regular Functions (Eager)</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">return [records...]</code>
                <p className="text-[11px] text-slate-400">
                  Allocates the entire collection in RAM upfront. Ideal when random indexing (<code className="text-slate-300 font-mono">data[i]</code>) or <code className="text-slate-300 font-mono">len()</code> is mandatory. High first-item latency.
                </p>
              </div>

              {/* Generator */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">⚡ Generator Functions (Lazy)</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">yield record</code>
                <p className="text-[11px] text-slate-300">
                  Computes items one at a time on demand. Constant <code className="text-teal-300">O(1)</code> memory regardless of dataset scale. Instant first-item response.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The `yield from` Subgenerator Delegation Highway (PEP 380)
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Rather than writing tedious <code className="text-teal-300 font-mono">for item in subgen(): yield item</code> loops, Python provides <code className="text-teal-300 font-mono">yield from subgen()</code>. It delegates data streaming directly at CPython interpreter speed and captures the subgenerator's return value: <code className="text-teal-300 font-mono">result = yield from subgen()</code>.
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
                2. Visualizing Memory Footprints, `yield from` &amp; Coroutines
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("memory")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "memory"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Memory: O(N) vs O(1)
              </button>
              <button
                onClick={() => setActiveInteractiveTab("yieldfrom")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "yieldfrom"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                `yield from` Delegation
              </button>
              <button
                onClick={() => setActiveInteractiveTab("coroutine")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "coroutine"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Coroutine `send(val)` Channel
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining RAM scaling, delegated sub-generator highways, and bidirectional coroutine data injection:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "memory" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">MEMORY ALLOCATION: EAGER LIST (O(N)) VS LAZY GENERATOR (O(1))</text>

                {/* Left: Eager List */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="12" fontWeight="bold">Eager List Allocation (1,000,000 items)</text>
                  
                  {/* Memory Bar */}
                  <rect x="20" y="55" width="340" height="35" rx="4" fill="#881337" stroke="#e11d48" />
                  <text x="190" y="78" fill="#ffe4e6" fontSize="11 font-mono font-bold" textAnchor="middle">RAM: ~8.4 MB (O(N) Linear Growth)</text>

                  <rect x="20" y="110" width="340" height="110" rx="4" fill="#090d16" stroke="#e11d48" />
                  <text x="30" y="135" fill="#fca5a5" fontSize="9 font-bold">Latency &amp; Failure Risk:</text>
                  <text x="30" y="155" fill="#cbd5e1" fontSize="8">• Consumer must wait for ALL 1M items to generate</text>
                  <text x="30" y="170" fill="#cbd5e1" fontSize="8">• 100M items causes MemoryError / OOM Crash</text>
                  <text x="30" y="185" fill="#cbd5e1" fontSize="8">• Allocates huge contiguous array on heap</text>
                </g>

                {/* Right: Lazy Generator */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="30" fill="#99f6e4" fontSize="12" fontWeight="bold">Lazy Generator Streaming (1,000,000 items)</text>
                  
                  {/* Memory Bar */}
                  <rect x="20" y="55" width="340" height="35" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="190" y="78" fill="#34d399" fontSize="11 font-mono font-bold" textAnchor="middle">RAM: ~112 Bytes (O(1) Constant Space!)</text>

                  <rect x="20" y="110" width="340" height="110" rx="4" fill="#090d16" stroke="#059669" />
                  <text x="30" y="135" fill="#34d399" fontSize="9 font-bold">Immediate Latency &amp; Infinite Scale:</text>
                  <text x="30" y="155" fill="#cbd5e1" fontSize="8">• First item ready in ~0.001 ms</text>
                  <text x="30" y="170" fill="#cbd5e1" fontSize="8">• Can process 100 Billion items with same 112 bytes</text>
                  <text x="30" y="185" fill="#cbd5e1" fontSize="8">• Freezes/resumes frame without intermediate arrays</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "yieldfrom" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">`yield from` SUBGENERATOR DELEGATION HIGHWAY (PEP 380)</text>

                {/* Delegator Box */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="300" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="12" fontWeight="bold">Master Delegator Generator</text>
                  <text x="20" y="60" fill="#ecfdf5" fontSize="8 font-mono">def regional_pipeline():</text>
                  <text x="35" y="80" fill="#34d399" fontSize="8 font-mono font-bold">r1 = yield from stream_bp()</text>
                  <text x="35" y="100" fill="#34d399" fontSize="8 font-mono font-bold">r2 = yield from stream_kol()</text>
                  <text x="35" y="125" fill="#c4b5fd" fontSize="8 font-mono">return r1 + r2</text>

                  <rect x="20" y="150" width="260" height="70" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="30" y="175" fill="#c4b5fd" fontSize="9 font-bold">Automatic Pipeline:</text>
                  <text x="30" y="195" fill="#cbd5e1" fontSize="8">Transparently pipes subgen items</text>
                </g>

                {/* Highway Pipe */}
                <g transform="translate(350, 140)">
                  <text x="0" y="0" fill="#38bdf8" fontSize="12" fontWeight="bold">Direct Subgen Pipe</text>
                  <text x="30" y="25" fill="#38bdf8" fontSize="28" fontWeight="bold">⇆</text>
                </g>

                {/* Subgenerators Box */}
                <g transform="translate(480, 50)">
                  <rect x="0" y="0" width="370" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="30" fill="#99f6e4" fontSize="12" fontWeight="bold">Subgenerators (Modular Streams)</text>

                  {/* Subgen 1 */}
                  <rect x="20" y="55" width="330" height="75" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="75" fill="#34d399" fontSize="9 font-mono font-bold">stream_bp():</text>
                  <text x="30" y="95" fill="#ecfdf5" fontSize="8 font-mono">yield student_1; yield student_2</text>
                  <text x="30" y="115" fill="#a7f3d0" fontSize="8 font-mono">return {"{"}branch: "Barrackpore", total: 2{"}"}</text>

                  {/* Subgen 2 */}
                  <rect x="20" y="145" width="330" height="75" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="165" fill="#34d399" fontSize="9 font-mono font-bold">stream_kol():</text>
                  <text x="30" y="185" fill="#ecfdf5" fontSize="8 font-mono">yield student_3; yield student_4</text>
                  <text x="30" y="205" fill="#a7f3d0" fontSize="8 font-mono">return {"{"}branch: "Kolkata", total: 2{"}"}</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">BIDIRECTIONAL COROUTINE CHANNEL WITH `gen.send(value)`</text>

                {/* 3 Step Pipeline */}
                <g transform="translate(30, 50)">
                  {/* Step 1 */}
                  <rect x="0" y="0" width="250" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="15" y="30" fill="#c4b5fd" fontSize="11 font-bold">1. Prime Coroutine</text>
                  <text x="15" y="55" fill="#ecfdf5" fontSize="8 font-mono">next(coroutine)</text>
                  <text x="15" y="75" fill="#cbd5e1" fontSize="8">Advances execution to the</text>
                  <text x="15" y="90" fill="#cbd5e1" fontSize="8">very first `yield` expression.</text>

                  <rect x="15" y="125" width="220" height="90" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="25" y="150" fill="#c4b5fd" fontSize="9 font-bold">Waiting for Data:</text>
                  <text x="25" y="170" fill="#cbd5e1" fontSize="8">Coroutine pauses at yield</text>
                  <text x="25" y="185" fill="#cbd5e1" fontSize="8">ready to accept incoming values.</text>

                  {/* Arrow 1 */}
                  <text x="265" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 2 */}
                  <rect x="295" y="0" width="250" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="310" y="30" fill="#a5f3fc" fontSize="11 font-bold">2. Inject via `send(val)`</text>
                  <text x="310" y="55" fill="#38bdf8" fontSize="8 font-mono font-bold">val = coroutine.send(5000)</text>
                  <text x="310" y="80" fill="#ecfdf5" fontSize="8 font-mono">val gets assigned to LHS</text>
                  <text x="310" y="100" fill="#ecfdf5" fontSize="8 font-mono">of `yield` expression!</text>

                  <rect x="310" y="125" width="220" height="90" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="320" y="150" fill="#38bdf8" fontSize="9 font-bold">Two-Way Data Transfer:</text>
                  <text x="320" y="170" fill="#cbd5e1" fontSize="8">1. Sends 5000 in</text>
                  <text x="320" y="185" fill="#cbd5e1" fontSize="8">2. Returns new total out!</text>

                  {/* Arrow 2 */}
                  <text x="560" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 3 */}
                  <rect x="590" y="0" width="230" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="605" y="30" fill="#fda4af" fontSize="11 font-bold">3. Clean Close</text>
                  <text x="605" y="55" fill="#fca5a5" fontSize="8 font-mono">coroutine.close()</text>
                  <text x="605" y="80" fill="#cbd5e1" fontSize="8">Raises `GeneratorExit`</text>
                  <text x="605" y="95" fill="#cbd5e1" fontSize="8">inside frame to cleanup.</text>

                  <rect x="605" y="125" width="200" height="90" rx="4" fill="#881337" stroke="#e11d48" />
                  <text x="615" y="150" fill="#ffe4e6" fontSize="9 font-bold">Safe Teardown:</text>
                  <text x="615" y="170" fill="#fca5a5" fontSize="8">Executes finally blocks</text>
                  <text x="615" y="185" fill="#fca5a5" fontSize="8">and releases open handles.</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE MULTICAMPUS PIPELINE PLAYGROUND */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Multi-Campus Financial Delegation Pipeline Simulator
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Step through the master financial delegator pipeline to watch <code className="text-teal-300 font-mono">yield from</code> seamlessly transition across branch sub-generators and calculate unified regional accounting ledgers:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Controls */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                  1. Delegated Pipeline Stepper
                </span>
                <button
                  onClick={handleResetPipeline}
                  className="text-[11px] font-mono text-slate-400 hover:text-white underline"
                >
                  Reset Master Pipeline
                </button>
              </div>

              {/* Step Button */}
              <button
                onClick={handleStepPipeline}
                disabled={isCompleted}
                className={clsx(
                  "w-full py-3 rounded-lg text-xs font-mono font-bold transition-all shadow-lg",
                  isCompleted
                    ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
                    : "bg-teal-600 hover:bg-teal-500 text-white shadow-teal-950/50"
                )}
              >
                {isCompleted ? "All Regional Streams Consolidated" : "Execute `next(master_pipeline)` -> (Delegates via yield from)"}
              </button>

              {/* Subgenerators Status Blocks */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-xs font-mono text-slate-400 font-bold block uppercase">
                  Sub-Generator Delegation Sequence:
                </span>
                
                {/* Branch 1: Barrackpore */}
                <div className={clsx(
                  "p-2.5 rounded border text-xs font-mono transition-all",
                  activeBranch === "Barrackpore"
                    ? "bg-teal-950 border-teal-500 text-teal-200 font-bold animate-glow-teal"
                    : pipelineCursor >= 1
                    ? "bg-slate-900/50 border-slate-800 text-slate-500"
                    : "bg-slate-900 border-slate-800 text-slate-400"
                )}>
                  <div className="flex justify-between">
                    <span>1. `yield from stream_barrackpore()`</span>
                    <span>{pipelineCursor >= 1 ? "[COMPLETED]" : activeBranch === "Barrackpore" ? "ACTIVE DELEGATION" : "PENDING"}</span>
                  </div>
                </div>

                {/* Branch 2: Kolkata */}
                <div className={clsx(
                  "p-2.5 rounded border text-xs font-mono transition-all",
                  activeBranch === "Kolkata"
                    ? "bg-cyan-950 border-cyan-500 text-cyan-200 font-bold animate-glow-teal"
                    : pipelineCursor >= 3
                    ? "bg-slate-900/50 border-slate-800 text-slate-500"
                    : "bg-slate-900 border-slate-800 text-slate-400"
                )}>
                  <div className="flex justify-between">
                    <span>2. `yield from stream_kolkata()`</span>
                    <span>{pipelineCursor >= 3 ? "[COMPLETED]" : activeBranch === "Kolkata" ? "ACTIVE DELEGATION" : "PENDING"}</span>
                  </div>
                </div>

                {/* Branch 3: Online */}
                <div className={clsx(
                  "p-2.5 rounded border text-xs font-mono transition-all",
                  activeBranch === "Online Global"
                    ? "bg-purple-950 border-purple-500 text-purple-200 font-bold animate-glow-teal"
                    : pipelineCursor >= 4
                    ? "bg-slate-900/50 border-slate-800 text-slate-500"
                    : "bg-slate-900 border-slate-800 text-slate-400"
                )}>
                  <div className="flex justify-between">
                    <span>3. `yield from stream_online()`</span>
                    <span>{pipelineCursor >= 4 ? "[COMPLETED]" : activeBranch === "Online Global" ? "ACTIVE DELEGATION" : "PENDING"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Output & State */}
            <div className="space-y-4 flex flex-col justify-between">
              {/* Active Pipeline Telemetry */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
                <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  Master Pipeline Telemetry:
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Active Subgenerator Stream:</span>
                  <span className="text-teal-300 font-bold">{activeBranch}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Streamed Vouchers Count:</span>
                  <span className="text-cyan-300 font-bold">{streamedVouchers.length} / {regionalData.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Pipeline Memory Footprint:</span>
                  <span className="text-emerald-400 font-bold">112 Bytes (O(1) Constant)</span>
                </div>
              </div>

              {/* Final Manifest / Log */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex-1 overflow-y-auto max-h-[160px] space-y-1.5 font-mono text-xs">
                <span className="text-slate-400 block font-bold text-[10px] uppercase">
                  {consolidatedReport ? "Consolidated Regional Manifest (StopIteration.value):" : "Emitted Student Vouchers:"}
                </span>

                {consolidatedReport ? (
                  <div className="p-2.5 bg-slate-950 rounded border border-teal-800/80 space-y-1">
                    <div className="text-teal-300 font-bold text-sm">Regional Financial Settlement</div>
                    <div className="text-slate-300">Total Enrolled: {consolidatedReport.totalAdmitted} Students</div>
                    <div className="text-emerald-400 font-bold">Gross Regional Revenue: INR {consolidatedReport.grossRevenue.toLocaleString()}</div>
                    <div className="text-[10px] text-slate-500">Barrackpore: INR 47,000 | Kolkata: INR 41,800 | Online: INR 19,800</div>
                  </div>
                ) : streamedVouchers.length === 0 ? (
                  <div className="text-slate-500 italic text-[11px]">
                    Click "Execute next(master_pipeline)" to start subgenerator delegation.
                  </div>
                ) : (
                  streamedVouchers.map((v, idx) => (
                    <div key={idx} className="p-1.5 bg-slate-950 rounded border border-slate-800 flex justify-between text-[11px]">
                      <span className="text-cyan-300 font-bold">[{v.branch}] {v.name}</span>
                      <span className="text-emerald-400 font-bold">INR {v.fee.toLocaleString()}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER METHOD COMPARISON MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Feature Comparison: Functions vs Generators
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Capability / Characteristic</th>
                  <th className="py-3.5 px-4 font-bold">Regular Function (`return`)</th>
                  <th className="py-3.5 px-4 font-bold">Generator Function (`yield`)</th>
                  <th className="py-3.5 px-4 font-bold">Delegated Generator (`yield from`)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">Evaluation Mode</td>
                  <td className="py-3 px-4">Eager (Upfront all in RAM)</td>
                  <td className="py-3 px-4 text-emerald-400">Lazy (1-at-a-time)</td>
                  <td className="py-3 px-4 text-cyan-300">Lazy (Delegated to subgen)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">Memory Complexity</td>
                  <td className="py-3 px-4 text-rose-300">O(N)</td>
                  <td className="py-3 px-4 text-emerald-400">O(1) (~112 Bytes)</td>
                  <td className="py-3 px-4 text-emerald-400">O(1) (~112 Bytes)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">Random Indexing (`data[i]`)</td>
                  <td className="py-3 px-4 text-emerald-400">Yes (Instant O(1))</td>
                  <td className="py-3 px-4 text-rose-300">No (Must consume)</td>
                  <td className="py-3 px-4 text-rose-300">No (Must consume)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">Bidirectional `send()`</td>
                  <td className="py-3 px-4 text-rose-300">No</td>
                  <td className="py-3 px-4 text-emerald-400">Yes (`gen.send(val)`)</td>
                  <td className="py-3 px-4 text-emerald-400">Yes (Forwarded directly)</td>
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
            Explore 4 production-grade Python scripts demonstrating memory benchmarking, `yield from` subgenerator delegation, bidirectional coroutine channels, and multi-campus financial suites:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "memory_and_eager_vs_lazy_evaluation_benchmark.py",
                code: memoryBenchmark,
                description: "Eager list allocation vs Lazy generator memory and latency benchmarks with sys.getsizeof.",
              },
              {
                filename: "subgenerator_delegation_yield_from.py",
                code: yieldFromDelegation,
                description: "PEP 380 yield from sub-generator delegation and capturing subgenerator return values.",
              },
              {
                filename: "bidirectional_communication_with_send_and_close.py",
                code: coroutineSend,
                description: "Coroutine priming, two-way data passing via send(), throw(), and close() teardown.",
              },
              {
                filename: "institutional_multicampus_financial_pipeline_suite.py",
                code: multicampusPipeline,
                description: "Enterprise Multi-Campus Regional Financial Pipeline Suite with yield from delegation.",
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
                <span>❌</span> Trap 1: Calling `len(generator)`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Generators produce elements on the fly and cannot know their length without consuming the stream, raising <code className="text-rose-300 font-mono">TypeError: object of type 'generator' has no len()</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use <code className="text-emerald-300">sum(1 for _ in gen)</code> to count without list allocation.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Sending Data without Priming
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Calling <code className="text-amber-300 font-mono">gen.send('data')</code> on a newly created generator raises <code className="text-amber-300 font-mono">TypeError: can't send non-None value to a just-started generator</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Prime first with <code className="text-emerald-300">next(gen)</code> or <code className="text-emerald-300">gen.send(None)</code>.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Manual `for x in sub: yield x`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing manual iteration loops over subgenerators is 15-20% slower than <code className="text-purple-300 font-mono">yield from subgen</code> and fails to route <code className="text-purple-300 font-mono">send()</code> or return values.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Always use <code className="text-emerald-300">yield from subgen</code> for delegation.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Blocking I/O in Synchronous Generator
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Synchronous socket or database requests in <code className="text-cyan-300 font-mono">__next__()</code> lock the entire execution thread until I/O returns.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use asynchronous generators (<code className="text-emerald-300">async def / async for</code>) for network I/O.
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
            Comprehensive question-and-answer repository covering generator functions vs regular functions, eager vs lazy evaluation, yield from, and coroutines:
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
            Download or print the complete reference sheet with eager vs lazy benchmarks, yield from architectures, and coroutine send recipes:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic9_generators_vs_functions_notes.txt"
              title="Print Topic 9 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
