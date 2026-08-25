import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import loopOptCode from "./topic5_files/loop_optimization_and_local_caching.py?raw";
import lookupOptCode from "./topic5_files/lookup_optimization_and_hash_indexing.py?raw";
import stringIterCode from "./topic5_files/string_concatenation_and_itertools_pipelines.py?raw";
import admissionCaseCode from "./topic5_files/institutional_admission_bottleneck_eliminator.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic5_files/topic5_note.txt?raw";

// FAQ Questions
import questions from "./topic5_files/topic5_questions";

/**
 * Topic5: Optimizing loops, lookups, and eliminating algorithmic bottlenecks
 * Module: 004_002_performance-optimization
 * Segment: 4 (Python Pro Level & Ecosystem Mastery)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic5() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("loopEngine");

  // Interactive Laboratory State
  const [datasetSize, setDatasetSize] = useState(15000);
  const [selectedPattern, setSelectedPattern] = useState("HASH_INDEXING"); // HASH_INDEXING | STRING_JOIN | INVARIANT_HOIST | GENERATOR_STREAM

  // Simulation calculations
  let naiveOps = 0;
  let optimizedOps = 0;
  let naiveTimeMs = 0;
  let optTimeMs = 0;
  let speedupX = "1.0x";
  let ramSaved = "0 MB";

  if (selectedPattern === "HASH_INDEXING") {
    const targetSize = Math.floor(datasetSize * 0.25);
    naiveOps = datasetSize * targetSize;
    optimizedOps = datasetSize + targetSize;
    naiveTimeMs = (naiveOps * 0.000045).toFixed(2);
    optTimeMs = (optimizedOps * 0.0000004).toFixed(3);
    speedupX = `${(naiveTimeMs / Math.max(0.001, optTimeMs)).toFixed(0)}x`;
    ramSaved = "~2.4 MB Hash Buffer vs O(N²) CPU Thrashing";
  } else if (selectedPattern === "STRING_JOIN") {
    naiveOps = (datasetSize * (datasetSize + 1)) / 2;
    optimizedOps = datasetSize * 2;
    naiveTimeMs = (datasetSize * 0.015).toFixed(2);
    optTimeMs = (datasetSize * 0.00006).toFixed(3);
    speedupX = `${(naiveTimeMs / Math.max(0.001, optTimeMs)).toFixed(0)}x`;
    ramSaved = `${((datasetSize * 64 * 10) / (1024 * 1024)).toFixed(1)} MB Intermediate Strings`;
  } else if (selectedPattern === "INVARIANT_HOIST") {
    naiveOps = datasetSize * 4;
    optimizedOps = datasetSize + 1;
    naiveTimeMs = (datasetSize * 0.0012).toFixed(2);
    optTimeMs = (datasetSize * 0.0002).toFixed(3);
    speedupX = `${(naiveTimeMs / Math.max(0.001, optTimeMs)).toFixed(1)}x`;
    ramSaved = "Eliminated N redundant regex & mathematical object frames";
  } else if (selectedPattern === "GENERATOR_STREAM") {
    naiveOps = datasetSize;
    optimizedOps = datasetSize;
    naiveTimeMs = (datasetSize * 0.0005).toFixed(2);
    optTimeMs = (datasetSize * 0.0003).toFixed(3);
    speedupX = "1.7x (CPU) + 99.8% (RAM)";
    const ramAllocated = ((datasetSize * 128) / (1024 * 1024)).toFixed(2);
    ramSaved = `Saved ${ramAllocated} MB RAM (O(1) Lazy Streaming vs Eager List)`;
  }

  const generatedPythonSnippet = `# Interactive Optimization Demonstration for N = ${datasetSize.toLocaleString()} Records
# Pattern: ${selectedPattern}

${
  selectedPattern === "HASH_INDEXING"
    ? `# ❌ SLOW: O(N * M) Nested List Lookup (${naiveOps.toLocaleString()} operations)
# for student in candidates:
#     if student.id in registered_ids_list: ... # Linear scan per candidate

# ✅ FAST: O(N + M) Pre-Indexed Set Hash Lookup (${optimizedOps.toLocaleString()} operations)
registered_ids_set = set(registered_ids_list)  # Built once in O(M)
accepted = [s for s in candidates if s.id in registered_ids_set]  # O(1) membership`
    : selectedPattern === "STRING_JOIN"
    ? `# ❌ SLOW: O(N²) String Concatenation Buffer Reallocations
# report = ""
# for line in log_lines:
#     report += line  # Copies all previous characters on every single iteration!

# ✅ FAST: O(N) Two-Pass Pre-Allocated str.join()
report = "".join(log_lines)  # Allocates exact RAM buffer once in C`
    : selectedPattern === "INVARIANT_HOIST"
    ? `# ❌ SLOW: Re-compiling regex & recalculating invariants inside loop
# for record in records:
#     pattern = re.compile(r"^\\w+@domain\\.edu\\.in$")  # N regex compilations!
#     tax = base_fee * (1.0 + 0.18)

# ✅ FAST: Invariant Hoisting (Executed 1 time outside loop)
pattern = re.compile(r"^\\w+@domain\\.edu\\.in$")
combined_fee = base_fee * 1.18
valid = [r for r in records if pattern.match(r["email"])]`
    : `# ❌ SLOW / HIGH RAM: Eager List Materialization (Consumes entire batch into RAM)
# data = [transform(x) for x in range(${datasetSize})]  # Materializes large array

# ✅ FAST / O(1) RAM: Lazy Generator Pipeline with itertools
from itertools import islice
stream = (transform(x) for x in range(${datasetSize}))  # Zero RAM upfront
first_page = list(islice(stream, 100))  # Streams only requested items`
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
            Topic 5
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Performance Optimization, Profiling &amp; Big-O Thinking
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Loop, Lookup &amp; <span className="text-teal-400">Bottleneck Optimization</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master the art of eliminating algorithmic bottlenecks in Python: replacing slow interpreted <code className="text-rose-400 font-mono">for</code> loops with high-speed C bytecode comprehensions, binding local method references, hoisting loop invariants, transforming quadratic <code className="text-rose-400 font-mono">O(N²)</code> nested searches into <code className="text-emerald-400 font-mono">O(N)</code> hash lookups, pre-allocating string buffers with <code className="text-teal-300 font-mono">str.join()</code>, and streaming massive datasets with <code className="text-purple-300 font-mono">itertools</code>.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ 200x+ Algorithmic Speedup
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🗝️ O(1) Hash Set Indexing
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🧬 Invariant Code Hoisting
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🌊 Zero-Copy itertools Streaming
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: ARCHITECTURAL PILLARS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🏛️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. CPython Loop Mechanics &amp; Bottleneck Physics
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              In high-throughput Python backends, loops and cross-referencing lookups account for over <strong className="text-teal-300">90% of execution latency</strong>. Understanding why standard Python loops crawl under heavy loads empowers you to write lightning-fast code:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/60 shadow-lg">
                <div className="text-rose-400 font-bold text-sm mb-1">1️⃣ Bytecode Dispatch</div>
                <code className="text-xs font-mono text-rose-300 block mb-1">LOAD_ATTR + CALL_METHOD</code>
                <p className="text-[11px] text-slate-300">
                  Standard loops execute multiple Python virtual machine opcode fetches per item, resolving names dynamically on every cycle.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">2️⃣ C Bytecode Loops</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">LIST_APPEND Opcode</code>
                <p className="text-[11px] text-slate-300">
                  List comprehensions run in optimized internal C loops, avoiding repeated attribute lookups for 25-40% faster execution.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">3️⃣ Hash Set Indexing</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">O(N²) ➔ O(N) Complexity</code>
                <p className="text-[11px] text-slate-300">
                  Converting target lists to hash sets upfront turns linear scans into instant O(1) hash bucket checks.
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">4️⃣ Memory Streaming</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">itertools Zero-Copy</code>
                <p className="text-[11px] text-slate-300">
                  Generators stream items lazily on demand, slashing RAM consumption from hundreds of megabytes to a constant O(1).
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Golden Rule: Hoisting Loop Invariants
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                Any calculation, regular expression compilation (<code className="text-teal-300 font-mono">re.compile</code>), database connection, or container size calculation (<code className="text-rose-400 font-mono">len(data)</code>) that yields the same value on every cycle <span className="text-amber-300 font-bold">must be computed once before the loop starts</span>!
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
                2. Visualizing Optimization Mechanics &amp; Pipelines
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("loopEngine")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "loopEngine"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Loop Bytecode Engine
              </button>
              <button
                onClick={() => setActiveInteractiveTab("hashLookup")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "hashLookup"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                O(N²) vs O(N) Hash Indexing
              </button>
              <button
                onClick={() => setActiveInteractiveTab("streamPipeline")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "streamPipeline"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                itertools Streaming Pipeline
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining how CPython processes instructions at the bytecode level and how algorithmic transformations eliminate bottlenecks:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "loopEngine" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">
                  CPYTHON LOOP EXECUTION: INTERPRETED FOR-LOOP VS C BYTECODE COMPREHENSION
                </text>

                {/* Left: Standard Loop */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="245" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="12" fontWeight="bold">
                    Standard for-loop (High Opcode Overhead)
                  </text>
                  
                  <rect x="20" y="50" width="340" height="35" rx="4" fill="#090d16" stroke="#e11d48" />
                  <text x="30" y="72" fill="#fca5a5" fontSize="10" fontFamily="monospace">
                    1. FOR_ITER ➔ Fetch next element
                  </text>

                  <rect x="20" y="95" width="340" height="35" rx="4" fill="#090d16" stroke="#e11d48" />
                  <text x="30" y="117" fill="#fca5a5" fontSize="10" fontFamily="monospace">
                    2. LOAD_GLOBAL / LOAD_ATTR 'append' ⚠️
                  </text>

                  <rect x="20" y="140" width="340" height="35" rx="4" fill="#090d16" stroke="#e11d48" />
                  <text x="30" y="162" fill="#fca5a5" fontSize="10" fontFamily="monospace">
                    3. CALL_FUNCTION ➔ Push frame, execute, pop
                  </text>

                  <rect x="20" y="185" width="340" height="40" rx="4" fill="#881337" stroke="#fb7185" />
                  <text x="30" y="210" fill="#ffe4e6" fontSize="10" fontWeight="bold">
                    🐢 Repeated Python name resolution on EVERY cycle
                  </text>
                </g>

                {/* Right: Comprehension */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="245" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#6ee7b7" fontSize="12" fontWeight="bold">
                    List Comprehension (Optimized C Engine)
                  </text>

                  <rect x="20" y="50" width="340" height="35" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="72" fill="#a7f3d0" fontSize="10" fontFamily="monospace">
                    1. C-level pre-allocated buffer expansion
                  </text>

                  <rect x="20" y="95" width="340" height="35" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="117" fill="#a7f3d0" fontSize="10" fontFamily="monospace">
                    2. LIST_APPEND opcode (Direct C array write) ⚡
                  </text>

                  <rect x="20" y="140" width="340" height="35" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="162" fill="#a7f3d0" fontSize="10" fontFamily="monospace">
                    3. No CALL_FUNCTION or stack frame overhead
                  </text>

                  <rect x="20" y="185" width="340" height="40" rx="4" fill="#065f46" stroke="#34d399" />
                  <text x="30" y="210" fill="#ecfdf5" fontSize="10" fontWeight="bold">
                    🚀 25% to 40% Faster C execution loop
                  </text>
                </g>
              </svg>
            ) : activeInteractiveTab === "hashLookup" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">
                  CROSS-REFERENCING: QUADRATIC O(N*M) LIST SEARCH VS LINEAR O(N+M) HASH SET
                </text>

                {/* Left: O(N*M) Naive Search */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="245" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="12" fontWeight="bold">
                    Naive 'in list' Search: O(N × M)
                  </text>

                  <rect x="20" y="55" width="340" height="45" rx="4" fill="#1c1917" stroke="#e11d48" />
                  <text x="30" y="77" fill="#fca5a5" fontSize="10" fontFamily="monospace">
                    For each Candidate (N = 10,000):
                  </text>
                  <text x="30" y="92" fill="#f87171" fontSize="9" fontFamily="monospace">
                    Linear scan Target List (M = 5,000)
                  </text>

                  <rect x="20" y="115" width="340" height="50" rx="4" fill="#881337" stroke="#fb7185" />
                  <text x="30" y="137" fill="#ffe4e6" fontSize="11" fontWeight="bold">
                    Total Comparisons: 50,000,000 ops! 💥
                  </text>
                  <text x="30" y="153" fill="#fecdd3" fontSize="9">
                    Latency: ~12.5 seconds (CPU bottleneck)
                  </text>

                  <rect x="20" y="180" width="340" height="45" rx="4" fill="#090d16" stroke="#f43f5e" />
                  <text x="30" y="207" fill="#fca5a5" fontSize="10">
                    ❌ Unusable for live REST API microservices
                  </text>
                </g>

                {/* Right: O(N+M) Hash Set */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="245" rx="8" fill="#082f49" stroke="#0ea5e9" />
                  <text x="20" y="30" fill="#7dd3fc" fontSize="12" fontWeight="bold">
                    Hash Set Pre-Indexing: O(N + M)
                  </text>

                  <rect x="20" y="55" width="340" height="45" rx="4" fill="#0369a1" stroke="#38bdf8" />
                  <text x="30" y="77" fill="#e0f2fe" fontSize="10" fontFamily="monospace">
                    1. Build Hash Table from Target in O(M)
                  </text>
                  <text x="30" y="92" fill="#bae6fd" fontSize="9" fontFamily="monospace">
                    5,000 hash bucket insertions (0.001s)
                  </text>

                  <rect x="20" y="115" width="340" height="50" rx="4" fill="#075985" stroke="#38bdf8" />
                  <text x="30" y="137" fill="#f0f9ff" fontSize="11" fontWeight="bold">
                    2. Instant O(1) Hash Lookups per Candidate ⚡
                  </text>
                  <text x="30" y="153" fill="#bae6fd" fontSize="9">
                    Total Comparisons: 15,000 ops! (0.003 seconds)
                  </text>

                  <rect x="20" y="180" width="340" height="45" rx="4" fill="#0c4a6e" stroke="#0284c7" />
                  <text x="30" y="207" fill="#e0f2fe" fontSize="10" fontWeight="bold">
                    🚀 4,000x Speedup with minimal RAM overhead!
                  </text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">
                  MEMORY STREAMING: EAGER LIST ALLOCATION VS ITERTOOLS LAZY GENERATOR PIPELINE
                </text>

                {/* Left: Eager Materialization */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="245" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="12" fontWeight="bold">
                    Eager Lists: [x for x in stream]
                  </text>

                  <rect x="20" y="55" width="340" height="45" rx="4" fill="#1c1917" stroke="#e11d48" />
                  <text x="30" y="77" fill="#fca5a5" fontSize="10" fontFamily="monospace">
                    Loads all 1,000,000 records into RAM
                  </text>
                  <text x="30" y="92" fill="#f87171" fontSize="9" fontFamily="monospace">
                    Allocates massive continuous pointer array
                  </text>

                  <rect x="20" y="115" width="340" height="50" rx="4" fill="#881337" stroke="#fb7185" />
                  <text x="30" y="137" fill="#ffe4e6" fontSize="11" fontWeight="bold">
                    RAM Footprint: ~250 MB Heap RAM ⚠️
                  </text>
                  <text x="30" y="153" fill="#fecdd3" fontSize="9">
                    Risk of Out-Of-Memory (OOM) in containers
                  </text>

                  <rect x="20" y="180" width="340" height="45" rx="4" fill="#090d16" stroke="#f43f5e" />
                  <text x="30" y="207" fill="#fca5a5" fontSize="10">
                    ❌ Heavy Garbage Collection (GC) pauses
                  </text>
                </g>

                {/* Right: Lazy itertools */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="245" rx="8" fill="#3b0764" stroke="#a855f7" />
                  <text x="20" y="30" fill="#e9d5ff" fontSize="12" fontWeight="bold">
                    itertools Lazy Pipeline: (x for x in stream)
                  </text>

                  <rect x="20" y="55" width="340" height="45" rx="4" fill="#581c87" stroke="#c084fc" />
                  <text x="30" y="77" fill="#faf5ff" fontSize="10" fontFamily="monospace">
                    itertools.chain + islice + groupby
                  </text>
                  <text x="30" y="92" fill="#e9d5ff" fontSize="9" fontFamily="monospace">
                    Yields 1 item at a time on demand
                  </text>

                  <rect x="20" y="115" width="340" height="50" rx="4" fill="#6b21a8" stroke="#d8b4fe" />
                  <text x="30" y="137" fill="#ffffff" fontSize="11" fontWeight="bold">
                    RAM Footprint: &lt; 0.05 MB Constant RAM 🛡️
                  </text>
                  <text x="30" y="153" fill="#f3e8ff" fontSize="9">
                    Zero intermediate list allocations in RAM
                  </text>

                  <rect x="20" y="180" width="340" height="45" rx="4" fill="#2e1065" stroke="#9333ea" />
                  <text x="30" y="207" fill="#f3e8ff" fontSize="10" fontWeight="bold">
                    🚀 Safe for infinite streams &amp; gigabyte CSVs!
                  </text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE ALGORITHMIC SIMULATOR */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧪</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Algorithmic Simulator &amp; Speedup Calculator
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Test different optimization patterns across varying dataset sizes <code className="text-teal-300 font-mono">N</code>. Observe the dramatic reduction in operation count, CPU latency, and RAM thrashing:
          </p>

          <div className="bg-slate-950 p-5 sm:p-6 rounded-xl border border-slate-800/90 space-y-6">
            {/* Pattern Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Select Optimization Pattern:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
                {[
                  { id: "HASH_INDEXING", label: "Hash Set Lookup", icon: "🗝️", desc: "O(N²) ➔ O(N)" },
                  { id: "STRING_JOIN", label: "str.join() Buffer", icon: "🧵", desc: "+= Reallocation ➔ O(N)" },
                  { id: "INVARIANT_HOIST", label: "Invariant Hoisting", icon: "🧬", desc: "N redundant calls ➔ 1" },
                  { id: "GENERATOR_STREAM", label: "itertools Stream", icon: "🌊", desc: "Eager List ➔ O(1) RAM" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedPattern(item.id)}
                    className={clsx(
                      "p-3 rounded-xl border text-left transition-all",
                      selectedPattern === item.id
                        ? "bg-teal-950/60 border-teal-500 shadow-md shadow-teal-950/50"
                        : "bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400"
                    )}
                  >
                    <div className="text-base mb-0.5">{item.icon} <strong className="text-slate-200 text-xs sm:text-sm">{item.label}</strong></div>
                    <div className="text-[11px] text-teal-400 font-mono">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Slider for Dataset Size */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Dataset Size (N Student Records):
                </span>
                <span className="text-sm font-mono font-bold text-teal-400 bg-teal-950/80 px-3 py-1 rounded-lg border border-teal-800">
                  {datasetSize.toLocaleString()} Records
                </span>
              </div>
              <input
                type="range"
                min={2000}
                max={50000}
                step={2000}
                value={datasetSize}
                onChange={(e) => setDatasetSize(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1">
                <span>2,000</span>
                <span>25,000</span>
                <span>50,000 (Enterprise Batch)</span>
              </div>
            </div>

            {/* Metrics Dashboard Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              <div className="bg-slate-900/90 p-4 rounded-xl border border-rose-900/50">
                <div className="text-xs text-rose-400 font-medium mb-1">Naive Operations</div>
                <div className="text-lg sm:text-xl font-bold font-mono text-rose-300">
                  {naiveOps.toLocaleString()} ops
                </div>
                <div className="text-[11px] text-slate-400 mt-1">~{naiveTimeMs} ms CPU latency</div>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-teal-900/50">
                <div className="text-xs text-teal-400 font-medium mb-1">Optimized Operations</div>
                <div className="text-lg sm:text-xl font-bold font-mono text-teal-300">
                  {optimizedOps.toLocaleString()} ops
                </div>
                <div className="text-[11px] text-slate-400 mt-1">~{optTimeMs} ms CPU latency</div>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-cyan-900/50">
                <div className="text-xs text-cyan-400 font-medium mb-1">Speedup Factor</div>
                <div className="text-lg sm:text-xl font-bold font-mono text-cyan-300">
                  {speedupX}
                </div>
                <div className="text-[11px] text-emerald-400 mt-1">⚡ Instantaneous response</div>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-purple-900/50">
                <div className="text-xs text-purple-400 font-medium mb-1">Memory / Efficiency Gain</div>
                <div className="text-xs font-bold font-mono text-purple-300 mt-1 leading-snug">
                  {ramSaved}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Zero OOM hazard</div>
              </div>
            </div>

            {/* Generated Dynamic Code */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Dynamic Python Optimization Equivalent:
              </div>
              <pre className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl text-xs sm:text-sm font-mono text-teal-200 overflow-x-auto leading-relaxed">
                {generatedPythonSnippet}
              </pre>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: DEEP DIVE CODE LABS (PYTHON FILE LOADERS) */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">💻</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Production Code Labs &amp; Benchmarking Suite
            </h2>
          </div>

          <p className="text-slate-300 mb-8 text-base leading-relaxed">
            Inspect, run, and master all four production-grade optimization scripts covering local variable caching, hash set index conversions, binary searches with <code className="text-teal-300 font-mono">bisect</code>, string joins, <code className="text-purple-300 font-mono">itertools</code> pipelines, and the complete institutional admission case study:
          </p>

          <div className="space-y-10">
            {/* Python Loader 1 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-teal-300">
                  Lab 1: CPython Loop Bytecode, List Comprehensions &amp; Local Caching
                </h3>
                <p className="text-sm text-slate-400">
                  Demonstrating the speed differences between standard interpreted loops, local method caching (<code className="text-teal-300 font-mono">append = results.append</code>), list comprehensions, and invariant hoisting.
                </p>
              </div>
              <PythonFileLoader
                fileModule={loopOptCode}
                title="loop_optimization_and_local_caching.py"
                highlightLines={[23, 33, 44, 58]}
              />
            </div>

            {/* Python Loader 2 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-cyan-300">
                  Lab 2: Transforming Quadratic O(N*M) Searches into Linear O(N+M) Hash Lookups
                </h3>
                <p className="text-sm text-slate-400">
                  Comparing naive list membership tests vs pre-indexed set hash tables, compound multi-key indexes for instant queries, and <code className="text-cyan-300 font-mono">bisect</code> binary range search.
                </p>
              </div>
              <PythonFileLoader
                fileModule={lookupOptCode}
                title="lookup_optimization_and_hash_indexing.py"
                highlightLines={[32, 40, 52, 69]}
              />
            </div>

            {/* Python Loader 3 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-purple-300">
                  Lab 3: String Concatenation Buffers &amp; itertools Streaming Pipelines
                </h3>
                <p className="text-sm text-slate-400">
                  Benchmarking O(N²) <code className="text-rose-400 font-mono">+=</code> string reallocations against O(N) <code className="text-teal-300 font-mono">str.join()</code> and building memory-safe streaming pipelines with <code className="text-purple-300 font-mono">itertools.chain</code>, <code className="text-purple-300 font-mono">islice</code>, <code className="text-purple-300 font-mono">groupby</code>, and <code className="text-purple-300 font-mono">accumulate</code>.
                </p>
              </div>
              <PythonFileLoader
                fileModule={stringIterCode}
                title="string_concatenation_and_itertools_pipelines.py"
                highlightLines={[25, 33, 53, 58, 64]}
              />
            </div>

            {/* Python Loader 4 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-amber-300">
                  Lab 4: Institutional Admission Bottleneck Eliminator (Case Study)
                </h3>
                <p className="text-sm text-slate-400">
                  End-to-end real-world benchmark processing 25,000 admission records across Barrackpore, Kolkata, Ichapur, and Jadavpur campuses, eliminating 5 severe bottlenecks to achieve a <span className="text-emerald-400 font-bold">25x+ speedup</span>.
                </p>
              </div>
              <PythonFileLoader
                fileModule={admissionCaseCode}
                title="institutional_admission_bottleneck_eliminator.py"
                highlightLines={[42, 68, 72, 76, 99]}
              />
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 5: COMMON PITFALLS & ANTI-PATTERNS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚠️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              5. Common Pitfalls &amp; Bottleneck Anti-Patterns
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pitfall 1 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                1. 'in list' Inside Loops (Silent O(N²) Trap)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Writing <code className="text-rose-400 font-mono">if item in target_list:</code> inside a loop iterates through the entire list for every outer element. Always convert <code className="text-teal-300 font-mono">target_set = set(target_list)</code> before entering the loop.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # BUG: if user_id in all_user_ids: # O(N*M)!{'\n'}
                # FIX: users_set = set(all_user_ids) # O(N+M)
              </pre>
            </div>

            {/* Pitfall 2 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                2. String Concatenation with '+=' in Loops
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Strings in Python are immutable. Using <code className="text-rose-400 font-mono">+=</code> allocates a new string buffer and copies all previous characters on every iteration. Use <code className="text-teal-300 font-mono">"".join(chunks)</code>.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # BUG: html += '&lt;div&gt;' + row + '&lt;/div&gt;'{'\n'}
                # FIX: html = ''.join(f'&lt;div&gt;{'{r}'}&lt;/div&gt;' for r in rows)
              </pre>
            </div>

            {/* Pitfall 3 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                3. Calling re.compile() Inside Loops
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Compiling regular expressions is computationally heavy. Compiling the regex pattern inside the loop causes repeated AST construction and state-machine generation.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # BUG: re.compile(...) inside loop{'\n'}
                # FIX: PATTERN = re.compile(...) outside loop
              </pre>
            </div>

            {/* Pitfall 4 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                4. Mutating Collections While Iterating
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Modifying a list or dictionary while looping over it causes skipped elements or raises <code className="text-rose-400 font-mono">RuntimeError: dictionary changed size during iteration</code>.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # BUG: for k in d: if bad(k): del d[k]{'\n'}
                # FIX: d = {'{k: v for k, v in d.items() if not bad(k)}'}
              </pre>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 6: BEST PRACTICES CHECKLIST */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">✅</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              6. Professional Algorithmic Optimization Checklist
            </h2>
          </div>

          <div className="space-y-3 text-slate-300 text-sm sm:text-base">
            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Profile Before Optimizing:</strong> Always profile with <code className="text-teal-300 font-mono">cProfile</code> or <code className="text-teal-300 font-mono">timeit</code> to verify actual bottlenecks rather than guessing.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Convert Repeated Searches to Hash Tables:</strong> Use <code className="text-teal-300 font-mono">set</code> for membership and <code className="text-teal-300 font-mono">dict</code> for lookups to ensure O(1) performance.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Prefer List &amp; Dict Comprehensions:</strong> Comprehensions leverage dedicated C opcodes (<code className="text-teal-300 font-mono">LIST_APPEND</code>) and avoid bytecode function call overhead.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Hoist Invariant Calculations:</strong> Compute constants, regular expressions, and invariant formulas once before starting loop cycles.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Use itertools for Large or Infinite Streams:</strong> Prevent RAM exhaustion by chaining and slicing generator streams lazily without eager array allocations.
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQS */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <FAQTemplate
            title="Optimizing Loops, Lookups &amp; Algorithmic Bottlenecks FAQs"
            questions={questions}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: PLAIN TEXT PRINT & DOWNLOAD NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <PlainTextPrint
            content={noteText}
            title="Topic 5: Loop, Lookup &amp; Bottleneck Optimization Study Note"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Study Note"
            downloadFileName="topic5_note.txt"
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 9: TEACHER'S NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <Teacher
            note={
              "Mastering loop and lookup optimization is the dividing line between junior coders and production-grade software engineers. When evaluating code for Mamata, Mahima, Abhronila, Susmita, or Debangshu across Barrackpore, Kolkata, Ichapur, and Jadavpur, always ask: 'Can this quadratic O(N²) search be indexed into an O(1) set lookup? Can this invariant calculation be hoisted outside the loop? Can we stream this with itertools rather than materializing a 500MB list?' Eliminating algorithmic bottlenecks transforms slow, crashing backends into blazing fast, enterprise-ready systems."
            }
          />
        </section>

      </div>
    </div>
  );
}
