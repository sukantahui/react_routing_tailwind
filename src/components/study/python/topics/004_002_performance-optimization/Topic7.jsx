import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import concurrencyCode from "./topic7_files/cpu_multiprocessing_vs_io_threading.py?raw";
import zeroCopyCode from "./topic7_files/zero_copy_memoryview_and_bytearray.py?raw";
import batchingCode from "./topic7_files/batching_and_chunked_stream_pipeline.py?raw";
import highThroughputEngineCode from "./topic7_files/institutional_high_throughput_engine.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic7_files/topic7_note.txt?raw";

// FAQ Questions
import questions from "./topic7_files/topic7_questions";

/**
 * Topic7: Best practices for high-throughput Python applications
 * Module: 004_002_performance-optimization
 * Segment: 4 (Python Pro Level & Ecosystem Mastery)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic7() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("gilArchitecture");

  // Interactive Laboratory State
  const [workloadType, setWorkloadType] = useState("CPU_BOUND"); // CPU_BOUND | IO_BOUND | ZERO_COPY | BATCH_STREAM
  const [workerCount, setWorkerCount] = useState(4);
  const [datasetVolume, setDatasetVolume] = useState(50000);

  // Simulation calculations
  let executionStrategy = "ProcessPoolExecutor (Multi-Process)";
  let throughputRps = 125000;
  let estimatedLatency = "0.40s";
  let gilStatus = "Bypassed (Independent GIL per Process Core)";
  let memoryUsage = "Low (Chunked Worker Distribution)";

  if (workloadType === "CPU_BOUND") {
    throughputRps = Math.floor((datasetVolume / 0.45) * (workerCount / 4));
    estimatedLatency = `${(datasetVolume / throughputRps).toFixed(2)}s`;
    executionStrategy = `ProcessPoolExecutor (${workerCount} CPU Cores)`;
    gilStatus = "Bypassed (1 Python Interpreter per Core)";
    memoryUsage = "Chunked Shared Memory Buffers";
  } else if (workloadType === "IO_BOUND") {
    throughputRps = Math.floor(workerCount * 250);
    estimatedLatency = `${(datasetVolume / throughputRps).toFixed(2)}s`;
    executionStrategy = `ThreadPoolExecutor / asyncio (${workerCount * 4} Workers)`;
    gilStatus = "Released during native socket & DB I/O";
    memoryUsage = "Low (Non-blocking Event Loop Frames)";
  } else if (workloadType === "ZERO_COPY") {
    throughputRps = 950000;
    estimatedLatency = "0.05s";
    executionStrategy = "memoryview & bytearray Pointer Slices";
    gilStatus = "Direct C-pointer memory window";
    memoryUsage = "Zero RAM Copies (O(1) memory footprint)";
  } else if (workloadType === "BATCH_STREAM") {
    throughputRps = 650000;
    estimatedLatency = "0.08s";
    executionStrategy = "itertools.islice Chunked Generator Stream";
    gilStatus = "Streaming lazy batch evaluation";
    memoryUsage = "Constant Bounded Batch RAM (e.g. 2,000 items)";
  }

  const generatedPythonSnippet = `# High-Throughput Production Architecture
# Workload: ${workloadType} | Dataset: ${datasetVolume.toLocaleString()} records | Workers: ${workerCount}

${
  workloadType === "CPU_BOUND"
    ? `from concurrent.futures import ProcessPoolExecutor
import math

def compute_student_score(chunk):
    # Intensive CPU calculation executed in parallel across ${workerCount} cores
    return [math.sqrt(s["score"]) * 10.0 for s in chunk]

with ProcessPoolExecutor(max_workers=${workerCount}) as executor:
    # Bypasses the GIL by distributing chunks to separate Python interpreters!
    results = list(executor.map(compute_student_score, dataset_chunks))`
    : workloadType === "IO_BOUND"
    ? `from concurrent.futures import ThreadPoolExecutor

def fetch_campus_record(student_id):
    # Network / Database query (CPython releases the GIL during I/O!)
    return db_pool.fetch_student(student_id)

with ThreadPoolExecutor(max_workers=${workerCount * 4}) as executor:
    records = list(executor.map(fetch_campus_record, student_id_list))`
    : workloadType === "ZERO_COPY"
    ? `# Zero-Copy Binary Buffer Slicing with memoryview
raw_network_payload = bytearray(20 * 1024 * 1024)  # 20 MB buffer
mv = memoryview(raw_network_payload)

# Creates pointer window directly over C buffer without allocating RAM!
packet_header = mv[0:1024]
packet_payload = mv[1024:2048]
packet_payload[0:8] = b"KOLKATA "  # In-place zero-copy mutation!`
    : `from itertools import islice

def chunked_stream(iterable, batch_size=2000):
    iterator = iter(iterable)
    while chunk := list(islice(iterator, batch_size)):
        yield chunk

# Streams millions of records in bounded 2,000-item chunks (Constant O(1) RAM)
for batch in chunked_stream(million_applicant_stream, 2000):
    database.bulk_insert(batch)  # Amortizes network round-trips!`
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
            Topic 7
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Performance Optimization, Profiling &amp; Big-O Thinking
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          High-Throughput: <span className="text-teal-400">Concurrency &amp; Architecture</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Architect production-grade, high-throughput Python backend services: bypassing the Global Interpreter Lock (GIL) with multi-core <code className="text-teal-300 font-mono">ProcessPoolExecutor</code> for CPU-heavy computing, scaling I/O with <code className="text-cyan-300 font-mono">ThreadPoolExecutor</code> and <code className="text-cyan-300 font-mono">asyncio</code>, eliminating gigabytes of memory duplication with zero-copy <code className="text-purple-300 font-mono">memoryview</code> buffer slicing, fast JSON serialization (<code className="text-amber-300 font-mono">orjson</code>), and batch chunking pipelines.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🚀 100k+ Records/Sec
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ Multi-Core Process Pools
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ Zero-Copy memoryview
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🌊 Chunked Batch Streaming
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
              1. The Concurrency &amp; Throughput Blueprint
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              High-throughput backend development in Python requires matching the right concurrency architecture to the physical constraints of the operating system, hardware CPU cores, and CPython's Global Interpreter Lock (GIL):
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ CPU-Bound (Processes)</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">ProcessPoolExecutor</code>
                <p className="text-[11px] text-slate-300">
                  Spawns separate OS processes with isolated Python interpreters, bypassing the GIL for true multi-core parallel calculation.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ I/O-Bound (Threads/Async)</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">asyncio / ThreadPool</code>
                <p className="text-[11px] text-slate-300">
                  CPython releases the GIL during network and DB socket waits, allowing thousands of concurrent requests on a single core.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ Zero-Copy Buffers</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">memoryview Slicing</code>
                <p className="text-[11px] text-slate-300">
                  Passes lightweight C pointers over binary data without copying megabytes of buffers in RAM during file and network transfers.
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 shadow-lg">
                <div className="text-amber-400 font-bold text-sm mb-1">4️⃣ Batch Amortization</div>
                <code className="text-xs font-mono text-amber-300 block mb-1">itertools.islice Chunking</code>
                <p className="text-[11px] text-slate-300">
                  Bundles thousands of queries into single transactional round-trips, eliminating network chatters and keeping memory constant.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Golden Rule: Never Thread CPU-Bound Python Tasks
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                Running multiple threads on CPU-heavy mathematical tasks causes severe <span className="text-rose-400 font-bold">GIL lock contention and OS context-switching overhead</span>, making threaded CPU tasks <span className="text-amber-300 font-bold">slower than a single thread</span>! Always use <code className="text-teal-300 font-mono">ProcessPoolExecutor</code> or vectorization for CPU workloads.
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
                2. Visualizing Concurrency, Zero-Copy &amp; Processing Pipelines
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("gilArchitecture")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "gilArchitecture"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                GIL &amp; Concurrency Engine
              </button>
              <button
                onClick={() => setActiveInteractiveTab("zeroCopyView")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "zeroCopyView"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Zero-Copy memoryview Slicing
              </button>
              <button
                onClick={() => setActiveInteractiveTab("distributedPipeline")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "distributedPipeline"
                    ? "bg-amber-900/50 text-amber-300 border border-amber-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Multi-Core Process Pipeline
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining internal thread execution under the GIL, zero-copy buffer windows, and multi-core process distribution:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "gilArchitecture" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">
                  CPYTHON CONCURRENCY: THREAD LOCK CONTENTION VS MULTI-PROCESS PARALLELISM
                </text>

                {/* Left: Multi-Threading under GIL */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="245" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="12" fontWeight="bold">
                    Multi-Threading (Constrained by GIL)
                  </text>
                  
                  <rect x="20" y="55" width="340" height="40" rx="4" fill="#090d16" stroke="#e11d48" />
                  <text x="30" y="80" fill="#fca5a5" fontSize="10" fontFamily="monospace">
                    Single CPython Process | 1 GIL Mutex Lock
                  </text>

                  <rect x="20" y="105" width="340" height="60" rx="4" fill="#881337" stroke="#fb7185" />
                  <text x="30" y="127" fill="#ffe4e6" fontSize="10" fontWeight="bold">
                    CPU-Bound: Threads Fight for Lock
                  </text>
                  <text x="30" y="145" fill="#fecdd3" fontSize="9">
                    Thread 1 acquires ➔ Thread 2 pauses. Constant context switches!
                  </text>

                  <rect x="20" y="175" width="340" height="50" rx="4" fill="#090d16" stroke="#f43f5e" />
                  <text x="30" y="197" fill="#86efac" fontSize="10" fontWeight="bold">
                    ✅ I/O-Bound (Sockets/DB): GIL is released during wait!
                  </text>
                </g>

                {/* Right: Multi-Processing */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="245" rx="8" fill="#042f2e" stroke="#14b8a6" />
                  <text x="20" y="30" fill="#5eead4" fontSize="12" fontWeight="bold">
                    Multi-Processing (Bypasses the GIL)
                  </text>

                  {/* Core 1 */}
                  <rect x="20" y="55" width="160" height="45" rx="4" fill="#0f766e" stroke="#2dd4bf" />
                  <text x="28" y="75" fill="#ccfbf1" fontSize="9" fontWeight="bold">Process Core 1</text>
                  <text x="28" y="90" fill="#99f6e4" fontSize="8" fontFamily="monospace">Own Interpreter + GIL</text>

                  {/* Core 2 */}
                  <rect x="200" y="55" width="160" height="45" rx="4" fill="#0f766e" stroke="#2dd4bf" />
                  <text x="208" y="75" fill="#ccfbf1" fontSize="9" fontWeight="bold">Process Core 2</text>
                  <text x="208" y="90" fill="#99f6e4" fontSize="8" fontFamily="monospace">Own Interpreter + GIL</text>

                  {/* Core 3 */}
                  <rect x="20" y="110" width="160" height="45" rx="4" fill="#0f766e" stroke="#2dd4bf" />
                  <text x="28" y="130" fill="#ccfbf1" fontSize="9" fontWeight="bold">Process Core 3</text>
                  <text x="28" y="145" fill="#99f6e4" fontSize="8" fontFamily="monospace">Own Interpreter + GIL</text>

                  {/* Core 4 */}
                  <rect x="200" y="110" width="160" height="45" rx="4" fill="#0f766e" stroke="#2dd4bf" />
                  <text x="208" y="130" fill="#ccfbf1" fontSize="9" fontWeight="bold">Process Core 4</text>
                  <text x="208" y="145" fill="#99f6e4" fontSize="8" fontFamily="monospace">Own Interpreter + GIL</text>

                  <rect x="20" y="170" width="340" height="55" rx="4" fill="#115e59" stroke="#2dd4bf" />
                  <text x="30" y="192" fill="#ffffff" fontSize="10" fontWeight="bold">
                    🚀 True Hardware Parallelism on Multi-Core CPUs
                  </text>
                  <text x="30" y="210" fill="#ccfbf1" fontSize="9">
                    Linear CPU scaling across 4, 8, 16+ server processor cores
                  </text>
                </g>
              </svg>
            ) : activeInteractiveTab === "zeroCopyView" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">
                  ZERO-COPY BUFFER SLICING: STANDARD BYTES COPY VS MEMORYVIEW POINTER WINDOW
                </text>

                {/* Left: Standard Copying */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="245" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="12" fontWeight="bold">
                    Standard Slicing: bytes[1024:2048]
                  </text>

                  <rect x="20" y="55" width="340" height="40" rx="4" fill="#1c1917" stroke="#e11d48" />
                  <text x="30" y="78" fill="#fca5a5" fontSize="10" fontFamily="monospace">
                    Raw 50 MB Binary Ingestion Buffer
                  </text>

                  <rect x="20" y="105" width="340" height="60" rx="4" fill="#881337" stroke="#fb7185" />
                  <text x="30" y="127" fill="#ffe4e6" fontSize="10" fontWeight="bold">
                    Eager Heap Memory Allocation:
                  </text>
                  <text x="30" y="145" fill="#fecdd3" fontSize="9">
                    Allocates new bytes object and copies all characters (O(K) RAM)
                  </text>

                  <rect x="20" y="175" width="340" height="50" rx="4" fill="#090d16" stroke="#f43f5e" />
                  <text x="30" y="197" fill="#fca5a5" fontSize="10">
                    💥 High GC churn &amp; memory fragmentation
                  </text>
                  <text x="30" y="213" fill="#fda4af" fontSize="9">
                    Copying 1,000 chunks creates 1,000 new heap objects!
                  </text>
                </g>

                {/* Right: Zero-Copy memoryview */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="245" rx="8" fill="#3b0764" stroke="#a855f7" />
                  <text x="20" y="30" fill="#e9d5ff" fontSize="12" fontWeight="bold">
                    Zero-Copy: memoryview(buf)[1024:2048]
                  </text>

                  <rect x="20" y="55" width="340" height="40" rx="4" fill="#2e1065" stroke="#c084fc" />
                  <text x="30" y="78" fill="#f5d0fe" fontSize="10" fontFamily="monospace">
                    Raw 50 MB Binary Buffer (Direct Buffer Protocol)
                  </text>

                  <rect x="20" y="105" width="340" height="60" rx="4" fill="#6b21a8" stroke="#d8b4fe" />
                  <text x="30" y="127" fill="#ffffff" fontSize="10" fontWeight="bold">
                    Lightweight C Pointer Window:
                  </text>
                  <text x="30" y="145" fill="#f3e8ff" fontSize="9">
                    Points directly to offset in existing memory (O(1) RAM)
                  </text>

                  <rect x="20" y="175" width="340" height="50" rx="4" fill="#2e1065" stroke="#9333ea" />
                  <text x="30" y="197" fill="#86efac" fontSize="10" fontWeight="bold">
                    🚀 25x Faster Buffer Processing
                  </text>
                  <text x="30" y="213" fill="#f3e8ff" fontSize="9">
                    Supports in-place mutation on bytearray without copying
                  </text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#f59e0b" fontSize="14" fontWeight="bold">
                  MULTI-CORE DISTRIBUTED WORKER PIPELINE (50,000 APPLICANT DOSSIERS)
                </text>

                {/* Main Pipeline Container */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#1e1b4b" stroke="#f59e0b" />
                  <text x="25" y="30" fill="#fde68a" fontSize="13" fontWeight="bold">
                    High-Throughput Batch Processing Daemon Flow
                  </text>

                  {/* Stage 1 */}
                  <rect x="25" y="55" width="220" height="110" rx="6" fill="#0f172a" stroke="#fbbf24" />
                  <text x="35" y="78" fill="#fef3c7" fontSize="11" fontWeight="bold">1. Chunked Stream</text>
                  <text x="35" y="98" fill="#94a3b8" fontSize="9" fontFamily="monospace">50k Student Records</text>
                  <text x="35" y="116" fill="#94a3b8" fontSize="9" fontFamily="monospace">itertools.islice (2k chunks)</text>
                  <text x="35" y="145" fill="#38bdf8" fontSize="9" fontWeight="bold">🌊 Constant O(1) Memory</text>

                  {/* Stage 2 */}
                  <rect x="275" y="55" width="260" height="110" rx="6" fill="#064e3b" stroke="#34d399" />
                  <text x="285" y="78" fill="#d1fae5" fontSize="11" fontWeight="bold">2. Parallel ProcessPool</text>
                  <text x="285" y="98" fill="#a7f3d0" fontSize="9" fontFamily="monospace">4 Isolated Python Processes</text>
                  <text x="285" y="116" fill="#a7f3d0" fontSize="9" fontFamily="monospace">Math.sqrt + Curve Analysis</text>
                  <text x="285" y="145" fill="#facc15" fontSize="9" fontWeight="bold">⚡ 4x Multi-Core Speedup</text>

                  {/* Stage 3 */}
                  <rect x="565" y="55" width="230" height="110" rx="6" fill="#0c4a6e" stroke="#38bdf8" />
                  <text x="575" y="78" fill="#e0f2fe" fontSize="11" fontWeight="bold">3. Local Aggregation</text>
                  <text x="575" y="98" fill="#bae6fd" fontSize="9" fontFamily="monospace">defaultdict(list)</text>
                  <text x="575" y="116" fill="#bae6fd" fontSize="9" fontFamily="monospace">Single-Pass Bulk Insert</text>
                  <text x="575" y="145" fill="#86efac" fontSize="9" fontWeight="bold">🎯 115k+ Records / Sec</text>

                  {/* Bottom Explanation Banner */}
                  <rect x="25" y="180" width="770" height="45" rx="6" fill="#0f172a" stroke="#f59e0b" />
                  <text x="40" y="207" fill="#e2e8f0" fontSize="11">
                    🏛️ Multi-Campus Results: Ingests Barrackpore, Kolkata, Ichapur, and Jadavpur records with linear scaling!
                  </text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE THROUGHPUT CALCULATOR */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧪</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive High-Throughput &amp; Concurrency Simulator
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Test different concurrency architectures, worker pool allocations, and batch volumes to simulate throughput rates (RPS), execution latency, and GIL handling:
          </p>

          <div className="bg-slate-950 p-5 sm:p-6 rounded-xl border border-slate-800/90 space-y-6">
            {/* Workload Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Select Architectural Workload Pattern:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
                {[
                  { id: "CPU_BOUND", label: "CPU-Bound (Processes)", icon: "⚡", tag: "Bypasses GIL (Multi-Core)" },
                  { id: "IO_BOUND", label: "I/O-Bound (Threads/Async)", icon: "🌐", tag: "Non-blocking Socket I/O" },
                  { id: "ZERO_COPY", label: "Zero-Copy memoryview", icon: "🧬", tag: "Zero RAM Allocations" },
                  { id: "BATCH_STREAM", label: "Chunked Stream Pipeline", icon: "🌊", tag: "Constant O(1) Batch RAM" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setWorkloadType(item.id)}
                    className={clsx(
                      "p-3 rounded-xl border text-left transition-all",
                      workloadType === item.id
                        ? "bg-teal-950/60 border-teal-500 shadow-md shadow-teal-950/50"
                        : "bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400"
                    )}
                  >
                    <div className="text-base mb-0.5">{item.icon} <strong className="text-slate-200 text-xs sm:text-sm">{item.label}</strong></div>
                    <div className="text-[11px] text-teal-400 font-mono">{item.tag}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Slider 1: Worker Count */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Allocated Worker Processes / Threads:
                  </span>
                  <span className="text-sm font-mono font-bold text-teal-400 bg-teal-950/80 px-3 py-1 rounded-lg border border-teal-800">
                    {workerCount} Worker Cores
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={16}
                  step={1}
                  value={workerCount}
                  onChange={(e) => setWorkerCount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1">
                  <span>1 Core</span>
                  <span>4 Cores (Quad)</span>
                  <span>16 Cores (Enterprise Server)</span>
                </div>
              </div>

              {/* Slider 2: Dataset Volume */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Batch Volume (N Records):
                  </span>
                  <span className="text-sm font-mono font-bold text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-lg border border-cyan-800">
                    {datasetVolume.toLocaleString()} Items
                  </span>
                </div>
                <input
                  type="range"
                  min={10000}
                  max={200000}
                  step={10000}
                  value={datasetVolume}
                  onChange={(e) => setDatasetVolume(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1">
                  <span>10,000</span>
                  <span>100,000</span>
                  <span>200,000</span>
                </div>
              </div>
            </div>

            {/* Metrics Dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              <div className="bg-slate-900/90 p-4 rounded-xl border border-teal-900/50">
                <div className="text-xs text-teal-400 font-medium mb-1">Execution Architecture</div>
                <div className="text-xs font-bold font-mono text-teal-300 mt-1 leading-snug">
                  {executionStrategy}
                </div>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-cyan-900/50">
                <div className="text-xs text-cyan-400 font-medium mb-1">Simulated Throughput</div>
                <div className="text-lg sm:text-xl font-bold font-mono text-cyan-300">
                  {throughputRps.toLocaleString()} RPS
                </div>
                <div className="text-[11px] text-emerald-400 mt-0.5">Est. Latency: {estimatedLatency}</div>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-purple-900/50">
                <div className="text-xs text-purple-400 font-medium mb-1">GIL Status</div>
                <div className="text-xs font-bold font-mono text-purple-300 mt-1 leading-snug">
                  {gilStatus}
                </div>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-amber-900/50">
                <div className="text-xs text-amber-400 font-medium mb-1">RAM / Buffer Behavior</div>
                <div className="text-xs font-bold font-mono text-amber-300 mt-1 leading-snug">
                  {memoryUsage}
                </div>
              </div>
            </div>

            {/* Generated Dynamic Code */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Production Implementation Snippet:
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
            Inspect, run, and master all four production-grade high-throughput architectures covering multi-core <code className="text-teal-300 font-mono">ProcessPoolExecutor</code> computing, I/O <code className="text-cyan-300 font-mono">ThreadPoolExecutor</code> concurrency, zero-copy <code className="text-purple-300 font-mono">memoryview</code> binary slicing, chunked streaming pipelines, and the complete institutional admission engine:
          </p>

          <div className="space-y-10">
            {/* Python Loader 1 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-teal-300">
                  Lab 1: CPU-Bound ProcessPool vs I/O-Bound ThreadPool &amp; GIL Release
                </h3>
                <p className="text-sm text-slate-400">
                  Benchmarking multi-threaded lock contention on CPU math vs multi-core ProcessPool parallelism, and verifying GIL release during simulated network I/O.
                </p>
              </div>
              <PythonFileLoader
                fileModule={concurrencyCode}
                title="cpu_multiprocessing_vs_io_threading.py"
                highlightLines={[25, 41, 48, 62]}
              />
            </div>

            {/* Python Loader 2 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-purple-300">
                  Lab 2: Zero-Copy Binary Buffer Processing with memoryview &amp; bytearray
                </h3>
                <p className="text-sm text-slate-400">
                  Benchmarking standard bytes buffer slicing ($O(K)$ RAM copies) against zero-copy <code className="text-purple-300 font-mono">memoryview</code> pointer slices and performing in-place packet mutations.
                </p>
              </div>
              <PythonFileLoader
                fileModule={zeroCopyCode}
                title="zero_copy_memoryview_and_bytearray.py"
                highlightLines={[26, 38, 54]}
              />
            </div>

            {/* Python Loader 3 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-cyan-300">
                  Lab 3: High-Throughput Stream Ingestion &amp; Chunked Batching Pipelines
                </h3>
                <p className="text-sm text-slate-400">
                  Building memory-safe streaming batch generators with <code className="text-cyan-300 font-mono">itertools.islice</code> to process 60,000 records without memory spikes or database transaction thrashing.
                </p>
              </div>
              <PythonFileLoader
                fileModule={batchingCode}
                title="batching_and_chunked_stream_pipeline.py"
                highlightLines={[19, 39]}
              />
            </div>

            {/* Python Loader 4 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-amber-300">
                  Lab 4: Institutional Multi-Core Admission &amp; Analytics Engine
                </h3>
                <p className="text-sm text-slate-400">
                  Full end-to-end case study ingesting 40,000 student records across Barrackpore, Kolkata, Ichapur, and Jadavpur campuses using multi-worker multiprocessing delivering <span className="text-emerald-400 font-bold">115,000+ records/sec</span> throughput.
                </p>
              </div>
              <PythonFileLoader
                fileModule={highThroughputEngineCode}
                title="institutional_high_throughput_engine.py"
                highlightLines={[21, 35, 57, 62]}
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
              5. High-Throughput Pitfalls &amp; Bottleneck Traps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pitfall 1 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                1. Threading for CPU-Bound Math (GIL Trap)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Using threads for CPU-heavy tasks causes lock contention and context-switching overhead, making multi-threading slower than a single thread. Always use <code className="text-teal-300 font-mono">ProcessPoolExecutor</code> for CPU tasks.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # BUG: ThreadPool for heavy math # GIL thrashing!{'\n'}
                # FIX: ProcessPool for CPU math
              </pre>
            </div>

            {/* Pitfall 2 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                2. Loading Gigabyte Files into RAM with read()
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Reading entire multi-gigabyte files into a single variable exhausts heap memory and triggers OOM crashes. Stream files line-by-line or in chunked blocks.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # BUG: data = f.read() # 5GB memory crash!{'\n'}
                # FIX: for line in f: process(line)
              </pre>
            </div>

            {/* Pitfall 3 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                3. Spawning ProcessPools Inside Functions
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Creating a new <code className="text-rose-400 font-mono">ProcessPoolExecutor</code> per API request incurs massive process fork/spawn startup latency. Initialize the pool once at the application level.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # BUG: with ProcessPoolExecutor() inside handler:{'\n'}
                # FIX: GLOBAL_POOL = ProcessPoolExecutor(...)
              </pre>
            </div>

            {/* Pitfall 4 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                4. Unbatched Database Operations
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Executing individual SQL inserts inside loops creates thousands of network round-trips. Always batch inserts into chunks of 1,000 to 5,000 records.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # BUG: for item in data: cursor.execute(...) # N roundtrips{'\n'}
                # FIX: cursor.executemany(..., batch) # 1 roundtrip
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
              6. Professional High-Throughput Checklist
            </h2>
          </div>

          <div className="space-y-3 text-slate-300 text-sm sm:text-base">
            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Use ProcessPools for CPU, Async for I/O:</strong> Match your workload to the concurrency model (ProcessPool for math/parsing, asyncio/ThreadPool for DB and sockets).
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Leverage Zero-Copy memoryview:</strong> Slice binary buffers and network payloads without allocating intermediate memory copies.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Batch Everything:</strong> Batch database inserts, API calls, and streaming items into chunks of 1,000–5,000 to amortize network round-trips.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Use Fast Serializers (orjson / msgpack):</strong> Replace slow standard JSON serialization in high-traffic REST/gRPC endpoints with SIMD-accelerated Rust parsers.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Pool Database Connections:</strong> Avoid opening and closing TCP/TLS connections on every request; reuse warm connection pools.
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQS */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <FAQTemplate
            title="High-Throughput Python Architecture FAQs"
            questions={questions}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: PLAIN TEXT PRINT & DOWNLOAD NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <PlainTextPrint
            content={noteText}
            title="Topic 7: Best Practices for High-Throughput Applications Study Note"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Study Note"
            downloadFileName="topic7_note.txt"
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 9: TEACHER'S NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <Teacher
            note={
              "Building high-throughput Python backends is all about respecting hardware realities. When scaling institutional servers for Mamata, Mahima, Abhronila, Susmita, and Debangshu across Barrackpore, Kolkata, Ichapur, and Jadavpur, always remember: bypass the GIL with ProcessPools for heavy mathematical scoring, release the GIL with asyncio and ThreadPools for database queries, slice binary streams with zero-copy memoryviews, and batch all operations. By architecting around these core principles, Python easily powers enterprise services handling hundreds of thousands of operations per second with minimal server footprint."
            }
          />
        </section>

      </div>
    </div>
  );
}
