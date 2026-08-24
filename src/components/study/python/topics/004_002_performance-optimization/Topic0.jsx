import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import bigOFundamentalsCode from "./topic0_files/big_o_complexity_classes_fundamentals.py?raw";
import spaceComplexityCode from "./topic0_files/space_complexity_and_memory_tradeoffs.py?raw";
import asymptoticBenchCode from "./topic0_files/asymptotic_growth_and_empirical_benchmarking.py?raw";
import institutionalAuditorCode from "./topic0_files/institutional_admission_query_complexity_analyzer.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic0_files/topic0_note.txt?raw";

// FAQ Questions
import questions from "./topic0_files/topic0_questions";

/**
 * Topic0: Big-O notation basics (Time & Space complexity: O(1), O(N), O(N log N), O(N^2))
 * Module: 004_002_performance-optimization
 * Segment: 4 (Python Pro Level & Ecosystem Mastery)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic0() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("growthCurves");

  // Interactive Laboratory State
  const [inputSizeN, setInputSizeN] = useState(1000);
  const [complexityClass, setComplexityClass] = useState("ON2"); // O1 | OLOGN | ON | ONLOGN | ON2

  // Computed Big-O Metrics
  let estimatedOperations = 1;
  let complexityLabel = "O(1) Constant Time";
  let performanceGrade = "EXCELLENT (Optimal)";
  let gradeColor = "text-emerald-400";
  let estimatedLatency = "< 0.001 ms";

  if (complexityClass === "O1") {
    estimatedOperations = 1;
    complexityLabel = "O(1) - Constant Time (Dictionary / Set Lookup)";
    performanceGrade = "EXCELLENT (Optimal Scale)";
    gradeColor = "text-emerald-400";
    estimatedLatency = "~ 0.05 μs";
  } else if (complexityClass === "OLOGN") {
    estimatedOperations = Math.ceil(Math.log2(inputSizeN));
    complexityLabel = "O(log N) - Logarithmic Time (Binary Search)";
    performanceGrade = "EXCELLENT (Scales Sub-Linearly)";
    gradeColor = "text-teal-300";
    estimatedLatency = "~ 0.25 μs";
  } else if (complexityClass === "ON") {
    estimatedOperations = inputSizeN;
    complexityLabel = "O(N) - Linear Time (Single Scan / Filter)";
    performanceGrade = "GOOD (Scales Linearly with N)";
    gradeColor = "text-cyan-300";
    estimatedLatency = `${(inputSizeN * 0.00008).toFixed(2)} ms`;
  } else if (complexityClass === "ONLOGN") {
    estimatedOperations = Math.ceil(inputSizeN * Math.log2(inputSizeN));
    complexityLabel = "O(N log N) - Linearithmic Time (Python Timsort)";
    performanceGrade = "FAIR (Standard for Optimal Sorting)";
    gradeColor = "text-amber-300";
    estimatedLatency = `${(estimatedOperations * 0.00012).toFixed(2)} ms`;
  } else {
    // ON2
    estimatedOperations = inputSizeN * inputSizeN;
    complexityLabel = "O(N²) - Quadratic Time (Nested Loops / Pairwise Search)";
    if (inputSizeN >= 10000) {
      performanceGrade = "UNACCEPTABLE (Server CPU Crash Risk)";
      gradeColor = "text-rose-400 font-bold";
      estimatedLatency = `~ ${(estimatedOperations * 0.0000003).toFixed(2)} seconds (Freezes UI)`;
    } else {
      performanceGrade = "POOR (Quadratic Explosion)";
      gradeColor = "text-rose-300";
      estimatedLatency = `${(estimatedOperations * 0.00025).toFixed(2)} ms`;
    }
  }

  const generatedPythonSnippet = `# Algorithmic Complexity Profile for N = ${inputSizeN.toLocaleString()}:
${
  complexityClass === "O1"
    ? `# O(1) Constant Time:\nstudent = student_dict.get("STU-101")  # 1 step (Instant)`
    : complexityClass === "OLOGN"
    ? `# O(log N) Binary Search:\nimport bisect\nidx = bisect.bisect_left(sorted_ids, target_id)  # ${estimatedOperations} steps`
    : complexityClass === "ON"
    ? `# O(N) Linear Search:\nmatched = [s for s in student_list if s["fee"] == "CLEARED"]  # ${estimatedOperations.toLocaleString()} steps`
    : complexityClass === "ONLOGN"
    ? `# O(N log N) Timsort:\nsorted_roster = sorted(student_list, key=lambda s: s["gpa"])  # ${estimatedOperations.toLocaleString()} steps`
    : `# O(N²) Quadratic Nested Loops:\nfor i in student_list:\n    for j in bank_txns:  # ${estimatedOperations.toLocaleString()} nested steps (Bottleneck!)`
}`;

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
            Topic 0
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Performance Optimization, Profiling &amp; Big-O Thinking
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Big-O Complexity: <span className="text-teal-400">Time &amp; Space Complexity Analysis</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master asymptotic algorithmic analysis in Python: time complexity classes (<code className="text-teal-300 font-mono">O(1)</code>, <code className="text-cyan-300 font-mono">O(log N)</code>, <code className="text-emerald-400 font-mono">O(N)</code>, <code className="text-amber-300 font-mono">O(N log N)</code>, <code className="text-rose-400 font-mono">O(N²)</code>), auxiliary space complexity, eager vs lazy generator memory footprints, space-time trade-offs, and empirical latency benchmarking.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⏱️ Asymptotic Growth
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🧠 Space Complexity
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ Space-Time Tradeoffs
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📊 1000x Refactoring Speedup
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: BIG-O FOUNDATIONS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📐</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Theoretical Foundations of Big-O Notation
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Big-O notation describes how an algorithm's execution time or memory requirement grows as the input size <code className="text-teal-300 font-mono">N</code> scales towards infinity:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ Time Complexity</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">O(1), O(N), O(N²)</code>
                <p className="text-[11px] text-slate-300">
                  Measures CPU operation scaling relative to N. Identifies quadratic bottlenecks that cause server CPU freezes.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ Space Complexity</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">O(1) vs O(N) RAM</code>
                <p className="text-[11px] text-slate-300">
                  Measures auxiliary memory allocations. Lazy generators use <code className="text-cyan-300 font-mono">O(1)</code> space while lists use <code className="text-rose-300 font-mono">O(N)</code>.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ Space-Time Tradeoff</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">Hash Indexing O(N+M)</code>
                <p className="text-[11px] text-slate-300">
                  Trading <code className="text-purple-300 font-mono">O(N)</code> auxiliary memory for <code className="text-emerald-400 font-mono">O(1)</code> query speeds yields 1000x performance gains.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Asymptotic Simplification Rule: Dropping Constants
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                In asymptotic analysis, constants and lower-order terms are discarded: <code className="text-teal-300 font-mono">O(5N + 100) → O(N)</code> and <code className="text-teal-300 font-mono">O(N² + 5000N) → O(N²)</code>. As N grows into millions, the highest-order term completely dominates execution cost.
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
              <span className="text-3xl">📈</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                2. Visualizing Asymptotic Curves, Memory Allocation &amp; Optimization
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("growthCurves")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "growthCurves"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Growth Curves
              </button>
              <button
                onClick={() => setActiveInteractiveTab("spaceTradeoff")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "spaceTradeoff"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Space-Time Tradeoff
              </button>
              <button
                onClick={() => setActiveInteractiveTab("speedupProof")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "speedupProof"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                1000x Speedup Proof
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining algorithmic growth curves, lazy vs eager memory allocations, and collapsing nested loops into linear hash lookups:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "growthCurves" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">BIG-O ASYMPTOTIC TIME COMPLEXITY SCALING CURVES</text>

                {/* Coordinate Axes */}
                <line x1="80" y1="280" x2="820" y2="280" stroke="#475569" strokeWidth="2" />
                <line x1="80" y1="280" x2="80" y2="50" stroke="#475569" strokeWidth="2" />

                <text x="750" y="305" fill="#94a3b8" fontSize="11 font-bold">Input Size (N) →</text>
                <text x="25" y="60" fill="#94a3b8" fontSize="11 font-bold" transform="rotate(-90 25 60)">Operations / Time →</text>

                {/* Curves */}
                {/* O(1) */}
                <line x1="80" y1="270" x2="800" y2="270" stroke="#10b981" strokeWidth="3" />
                <text x="810" y="274" fill="#34d399" fontSize="10 font-bold font-mono">O(1) [Constant]</text>

                {/* O(log N) */}
                <path d="M 80 270 Q 200 255, 800 240" fill="none" stroke="#06b6d4" strokeWidth="3" />
                <text x="810" y="244" fill="#38bdf8" fontSize="10 font-bold font-mono">O(log N) [Binary]</text>

                {/* O(N) */}
                <line x1="80" y1="270" x2="800" y2="170" stroke="#3b82f6" strokeWidth="3" />
                <text x="810" y="174" fill="#60a5fa" fontSize="10 font-bold font-mono">O(N) [Linear]</text>

                {/* O(N log N) */}
                <path d="M 80 270 Q 300 200, 800 110" fill="none" stroke="#f59e0b" strokeWidth="3" />
                <text x="810" y="114" fill="#fbbf24" fontSize="10 font-bold font-mono">O(N log N) [Timsort]</text>

                {/* O(N^2) */}
                <path d="M 80 270 Q 200 240, 450 60" fill="none" stroke="#f43f5e" strokeWidth="3" />
                <text x="460" y="64" fill="#fda4af" fontSize="10 font-bold font-mono">O(N²) [Quadratic Freeze]</text>
              </svg>
            ) : activeInteractiveTab === "spaceTradeoff" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">SPACE COMPLEXITY: EAGER LIST O(N) VS LAZY GENERATOR O(1)</text>

                {/* Left: Eager List */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="12" fontWeight="bold">Eager List Comprehension [O(N) RAM]</text>
                  
                  <text x="20" y="65" fill="#fca5a5" fontSize="8 font-mono">`data = [x for x in range(10_000_000)]`</text>
                  <text x="20" y="85" fill="#fca5a5" fontSize="8 font-mono">Allocates all 10M integers in memory simultaneously</text>
                  <text x="20" y="105" fill="#f43f5e" fontSize="8 font-mono font-bold">Memory Footprint: ~80 MegaBytes in RAM!</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#090d16" stroke="#e11d48" />
                  <text x="30" y="155" fill="#fda4af" fontSize="9 font-bold">Risk at Scale:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">Causes Out-Of-Memory (OOM) fatal process crashes.</text>
                </g>

                {/* Right: Lazy Generator */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">Lazy Generator Expression [O(1) RAM]</text>

                  <text x="20" y="65" fill="#34d399" fontSize="8 font-mono">`stream = (x for x in range(10_000_000))`</text>
                  <text x="20" y="85" fill="#34d399" fontSize="8 font-mono">Yields 1 element at a time on demand</text>
                  <text x="20" y="105" fill="#34d399" fontSize="8 font-mono font-bold">Memory Footprint: 104 Bytes (Constant!)</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="155" fill="#34d399" fontSize="9 font-bold">Infinite Scalability:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">Streams billions of rows with zero memory footprint growth.</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">REFACTORING PROOF: O(N*M) NESTED LOOP VS O(N+M) HASH INDEX</text>

                {/* Left: Naive O(N^2) */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="12" fontWeight="bold">Naive Nested Loop: O(N * M)</text>
                  
                  <text x="20" y="65" fill="#c084fc" fontSize="8 font-mono">For 3,000 Students x 3,000 Bank Txns:</text>
                  <text x="20" y="85" fill="#cbd5e1" fontSize="8 font-mono">Operations: 3,000 * 3,000 = 9,000,000 steps</text>
                  <text x="20" y="105" fill="#f43f5e" fontSize="8 font-mono font-bold">Latency: ~280.45 ms</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="30" y="155" fill="#c4b5fd" fontSize="9 font-bold">Algorithmic Flaw:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">Repeated linear scans over the entire banking table.</text>
                </g>

                {/* Right: Optimized O(N+M) */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">Optimized Hash Indexing: O(N + M)</text>

                  <text x="20" y="65" fill="#34d399" fontSize="8 font-mono">1. Build Dict Index: 3,000 steps</text>
                  <text x="20" y="85" fill="#34d399" fontSize="8 font-mono">2. Query in O(1): 3,000 steps</text>
                  <text x="20" y="105" fill="#34d399" fontSize="8 font-mono font-bold">Latency: ~0.35 ms (800x to 1000x Speedup!)</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="155" fill="#34d399" fontSize="9 font-bold">The Power of Hash Tables:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">Collapses multi-second bottlenecks into sub-millisecond queries.</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE BIG-O LAB */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Big-O Complexity &amp; Operation Scaling Laboratory
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Select input size <code className="text-teal-300 font-mono">N</code>, toggle algorithmic complexity classes, and inspect calculated operation counts, estimated execution latencies, and performance grades:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Controls */}
            <div className="space-y-4">
              {/* N Selector */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                  1. Dataset Input Size (N Elements):
                </span>
                <div className="flex bg-slate-900 p-1.5 rounded-lg border border-slate-800 text-xs font-mono">
                  {[10, 100, 1000, 10000, 100000].map((size) => (
                    <button
                      key={size}
                      onClick={() => setInputSizeN(size)}
                      className={clsx(
                        "flex-1 py-1 rounded transition-all",
                        inputSizeN === size
                          ? "bg-teal-900/60 text-teal-300 font-bold border border-teal-700/80"
                          : "text-slate-400 hover:text-white"
                      )}
                    >
                      {size.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Complexity Class Selector */}
              <div className="space-y-1.5 pt-1">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                  2. Algorithm Complexity Class:
                </span>
                <div className="grid grid-cols-3 gap-1.5 bg-slate-900 p-1.5 rounded-lg border border-slate-800 text-xs font-mono">
                  {[
                    { id: "O1", label: "O(1) Constant" },
                    { id: "OLOGN", label: "O(log N) Binary" },
                    { id: "ON", label: "O(N) Linear" },
                    { id: "ONLOGN", label: "O(N log N) Sort" },
                    { id: "ON2", label: "O(N²) Quadratic" },
                  ].map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setComplexityClass(c.id)}
                      className={clsx(
                        "py-1.5 rounded transition-all",
                        complexityClass === c.id
                          ? "bg-cyan-900/60 text-cyan-300 font-bold border border-cyan-700/80"
                          : "text-slate-400 hover:text-white"
                      )}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Metrics Badge Box */}
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Total Steps:</span>
                  <span className="text-teal-300 font-bold text-sm">
                    {estimatedOperations.toLocaleString()} operations
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Est. Latency:</span>
                  <span className="text-purple-300 font-bold">{estimatedLatency}</span>
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-slate-800">
                  <span className="text-slate-400">Grade:</span>
                  <span className={clsx("font-bold", gradeColor)}>{performanceGrade}</span>
                </div>
              </div>
            </div>

            {/* Generated Code & Terminal Output */}
            <div className="space-y-4 flex flex-col justify-between">
              {/* Python Code Display */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
                <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  Python Implementation Pattern:
                </div>
                <pre className="text-teal-300 text-[11px] leading-relaxed break-all font-mono overflow-x-auto">
                  {generatedPythonSnippet}
                </pre>
              </div>

              {/* Terminal Telemetry */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex-1 overflow-y-auto max-h-[160px] font-mono text-xs space-y-1">
                <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400">
                  <span>Asymptotic Growth Telemetry:</span>
                  <span className="text-emerald-400">Exit Code 0</span>
                </div>
                <pre className="text-slate-200 text-[11px] leading-relaxed font-mono whitespace-pre-wrap">
                  {`[COMPLEXITY_PROFILER] Profile for N = ${inputSizeN.toLocaleString()}:
* Complexity Tier    : ${complexityLabel}
* Total Operations   : ${estimatedOperations.toLocaleString()} steps
* Estimated Run Time : ${estimatedLatency}
* Scalability Grade  : ${performanceGrade}`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER BIG-O MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Big-O Complexity Reference Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Complexity Class</th>
                  <th className="py-3.5 px-4 font-bold">Name</th>
                  <th className="py-3.5 px-4 font-bold">Python Example Operations</th>
                  <th className="py-3.5 px-4 font-bold">Scale at N = 10,000</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-emerald-400 font-semibold">`O(1)`</td>
                  <td className="py-3 px-4 text-slate-200">Constant</td>
                  <td className="py-3 px-4 text-teal-300">`dict[key]`, `set.add()`, `list.append()`, `list[0]`</td>
                  <td className="py-3 px-4 text-emerald-400">1 step (Instant)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">`O(log N)`</td>
                  <td className="py-3 px-4 text-slate-200">Logarithmic</td>
                  <td className="py-3 px-4 text-cyan-300">Binary search (`bisect`), Balanced BST query</td>
                  <td className="py-3 px-4 text-teal-300">~14 steps</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-blue-400 font-semibold">`O(N)`</td>
                  <td className="py-3 px-4 text-slate-200">Linear</td>
                  <td className="py-3 px-4 text-blue-300">`item in list`, `for x in arr:`, `min()`, `max()`, `sum()`</td>
                  <td className="py-3 px-4 text-blue-400">10,000 steps</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">`O(N log N)`</td>
                  <td className="py-3 px-4 text-slate-200">Linearithmic</td>
                  <td className="py-3 px-4 text-amber-300">`sorted(arr)`, `arr.sort()` (Python Timsort)</td>
                  <td className="py-3 px-4 text-amber-300">~140,000 steps</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-rose-400 font-semibold">`O(N²)`</td>
                  <td className="py-3 px-4 text-slate-200">Quadratic</td>
                  <td className="py-3 px-4 text-rose-300">Nested loops (`for i in a: for j in b:`)</td>
                  <td className="py-3 px-4 text-rose-400 font-bold">100,000,000 steps!</td>
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
            Explore 4 production-grade Python scripts demonstrating Big-O complexity classes, space complexity, asymptotic growth curves, and institutional reconciliation optimization:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "big_o_complexity_classes_fundamentals.py",
                code: bigOFundamentalsCode,
                description: "O(1), O(log N), O(N), O(N log N), and O(N^2) complexity classes and step scaling.",
              },
              {
                filename: "space_complexity_and_memory_tradeoffs.py",
                code: spaceComplexityCode,
                description: "Auxiliary space complexity, generator vs list memory, and sys.getsizeof().",
              },
              {
                filename: "asymptotic_growth_and_empirical_benchmarking.py",
                code: asymptoticBenchCode,
                description: "Linear vs quadratic scaling, perf_counter_ns, and empirical growth curves.",
              },
              {
                filename: "institutional_admission_query_complexity_analyzer.py",
                code: institutionalAuditorCode,
                description: "Naive O(N^2) vs optimized O(N) hash indexing fee reconciliation.",
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
                <span>❌</span> Trap 1: Hidden O(N²) in List Lookups
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-rose-300 font-mono">for item in list_a: if item in list_b:</code> executes an inner <code className="text-rose-300 font-mono">O(N)</code> scan on every step, turning the loop into <code className="text-rose-300 font-mono">O(N²)</code>!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Convert <code className="text-emerald-300">list_b</code> to a <code className="text-emerald-300">set(list_b)</code> for <code className="text-emerald-300">O(1)</code> membership tests.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Using `list.insert(0, item)`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Inserting at index 0 of a list forces Python to shift all N elements in memory (<code className="text-amber-300 font-mono">O(N)</code> time). Doing this inside a loop yields <code className="text-rose-300 font-mono">O(N²)</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use <code className="text-emerald-300">collections.deque.appendleft()</code> for <code className="text-emerald-300">O(1)</code> insertions.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Memory Exhaustion in Eager Lists
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Materializing multi-million row query results into eager lists loads gigabytes into RAM, triggering server out-of-memory crashes.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use lazy generator expressions for <code className="text-emerald-300">O(1)</code> RAM usage.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Premature Micro-Optimization
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Optimizing low-level syntax before fixing high-level algorithmic complexity yields negligible gains.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Fix Big-O algorithmic complexity first (<code className="text-emerald-300">O(N²) → O(N)</code>).
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
            Comprehensive question-and-answer repository covering Big-O notation, time complexity classes, space complexity, lazy generators, and optimization:
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
            Download or print the complete reference sheet with Big-O complexity tables, space-time tradeoff recipes, and optimization rules:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic0_big_o_complexity_notes.txt"
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
