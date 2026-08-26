import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import internalsCode from "./topic5_files/python_internals_memory_gil_mro.py?raw";
import algorithmsCode from "./topic5_files/algorithmic_coding_challenges_solutions.py?raw";
import concurrencyCode from "./topic5_files/concurrency_and_asyncio_interview_patterns.py?raw";
import interviewCaseCode from "./topic5_files/institutional_interview_technical_assessment.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic5_files/topic5_note.txt?raw";

// FAQ Questions
import questions from "./topic5_files/topic5_questions";

/**
 * Topic5: Top Python Technical Interview Questions & Coding Challenges
 * Module: 004_004_capstone-projects
 * Segment: 4 (Python Pro Level & Ecosystem Mastery)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic5() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("memoryInternals");

  // Interactive Laboratory State
  const [selectedChallenge, setSelectedChallenge] = useState("LRU"); // LRU | TWOSUM | MRO | ASYNCIO

  let challengeTitle = "O(1) LRU Cache Implementation";
  let timeComplexity = "O(1) Time for get() and put()";
  let spaceComplexity = "O(Capacity) auxiliary space";
  let explanationText = "Combines a Hash Map with a Doubly Linked List (OrderedDict) to achieve constant time lookups, updates, and least-recently-used evictions.";
  let solutionSnippet = `from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = OrderedDict()

    def get(self, key: str):
        if key not in self.cache: return -1
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key: str, value):
        if key in self.cache: self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False) # Evicts LRU`;

  if (selectedChallenge === "LRU") {
    challengeTitle = "O(1) LRU Cache (Least Recently Used)";
    timeComplexity = "O(1) Constant Time (get & put)";
    spaceComplexity = "O(N) where N = capacity";
    explanationText = "Combines a Hash Map with a Doubly Linked List (OrderedDict) to achieve constant time lookups, updates, and least-recently-used evictions.";
  } else if (selectedChallenge === "TWOSUM") {
    challengeTitle = "Two Sum Hash Map Lookup";
    timeComplexity = "O(N) Linear Time (Single Pass)";
    spaceComplexity = "O(N) Hash Table Storage";
    explanationText = "Maintains a complement dictionary mapping seen values to indices, finding matching pairs in O(1) average lookup time.";
    solutionSnippet = `def two_sum(nums: list[int], target: int) &rarr; list[int]:
    seen = {}
    for idx, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], idx]
        seen[num] = idx
    return []`;
  } else if (selectedChallenge === "MRO") {
    challengeTitle = "C3 Linearization & MRO Resolution";
    timeComplexity = "Deterministic C3 Resolution Order";
    spaceComplexity = "O(Hierarchy Depth)";
    explanationText = "Python computes a monotonic inheritance order preserving local precedence and monotonicity across complex multiple inheritance diamonds.";
    solutionSnippet = `class D(B, C):
    pass

# C3 Linearization order:
# D.__mro__ == (D, B, C, A, object)`;
  } else if (selectedChallenge === "ASYNCIO") {
    challengeTitle = "Asyncio Non-Blocking Concurrency";
    timeComplexity = "O(Max Latency) Concurrency vs O(Sum) Sequential";
    spaceComplexity = "O(Task Count) lightweight coroutines";
    explanationText = "Cooperative single-threaded event loop multiplexing thousands of concurrent network sockets without OS thread context switching overhead.";
    solutionSnippet = `async def fetch_campus(campus: str):
    await asyncio.sleep(0.05)
    return f"{campus} synced"

async def sync_all():
    return await asyncio.gather(
        fetch_campus("Barrackpore"),
        fetch_campus("Kolkata")
    )`;
  }

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
            Segment 4 • Module 004_004
          </span>
          <span className="text-xs sm:text-sm font-mono bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/80 shadow-sm shadow-cyan-950/50">
            Topic 5
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Capstone Projects, Portfolio &amp; Interview Mastery
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Top Python Interview Questions &amp; <span className="text-teal-400">Coding Challenges</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master senior and mid-level Python technical interviews: CPython memory model (reference counting, generational cyclic GC, <code className="text-teal-300 font-mono">__slots__</code>), the Global Interpreter Lock (GIL) and concurrency tradeoffs (Threading vs Multiprocessing vs Asyncio), C3 Linearization Method Resolution Order (MRO), mutable default arguments, solving classic coding algorithms (LRU Cache in O(1), Two Sum HashMap, Sliding Window), and communicating architectural tradeoffs.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🧠 CPython Memory &amp; Cyclic GC
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔒 GIL &amp; Concurrency Paradigms
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ O(1) LRU Cache &amp; Data Structures
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🧬 C3 Linearization MRO Order
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
              1. The Technical Interview Core Pillars
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Acing senior technical interviews requires answering the <em>why</em> behind Python's design alongside executing optimal algorithmic solutions:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ Memory Internals</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">Refcount + Cyclic GC</code>
                <p className="text-[11px] text-slate-300">
                  Immediate deallocation on 0 refcount; 3-generation cyclic garbage collector detecting self-referential loops.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ GIL &amp; Concurrency</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">Threads vs Asyncio vs Procs</code>
                <p className="text-[11px] text-slate-300">
                  The Global Interpreter Lock restricts CPU bytecode execution to 1 thread; solve CPU-bound tasks with Multiprocessing.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ O(1) Data Structures</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">LRU Cache / HashMaps</code>
                <p className="text-[11px] text-slate-300">
                  Implementing constant-time eviction caches using OrderedDict or Doubly Linked Lists paired with Hash Tables.
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 shadow-lg">
                <div className="text-amber-400 font-bold text-sm mb-1">4️⃣ MRO &amp; Dunder Model</div>
                <code className="text-xs font-mono text-amber-300 block mb-1">C3 Linearization</code>
                <p className="text-[11px] text-slate-300">
                  Deterministic method resolution order under multiple inheritance diamond patterns and dunder protocol mechanics.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Mutable Default Parameter Trap
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                Why does <code className="text-rose-400 font-mono">def append_to(x, target=[]):</code> fail? Python evaluates default parameters once when the function is parsed at definition time. All future calls share the exact same list instance in heap memory. Fix it with <span className="text-emerald-400 font-bold">target=None</span> and initializing inside the function body!
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
                2. Visualizing CPython Memory, GIL Concurrency &amp; LRU Architecture
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("memoryInternals")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "memoryInternals"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              &gt;
                Memory &amp; Cyclic GC
              </button>
              <button
                onClick={() => setActiveInteractiveTab("gilConcurrency")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "gilConcurrency"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              &gt;
                GIL &amp; Concurrency Models
              </button>
              <button
                onClick={() => setActiveInteractiveTab("lruCache")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "lruCache"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              &gt;
                O(1) LRU Cache Mechanics
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining CPython heap garbage collection cycles, GIL thread scheduling, and constant time cache eviction topologies:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "memoryInternals" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">
                  CPYTHON MEMORY MANAGEMENT: REFERENCE COUNTING + 3-GENERATION CYCLIC GC
                </text>

                {/* Left: Reference Counting */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="240" height="235" rx="6" fill="#0c4a6e" stroke="#38bdf8" />
                  <text x="15" y="25" fill="#ffffff" fontSize="11" fontWeight="bold">1. Reference Counting (Immediate)</text>
                  <text x="15" y="50" fill="#bae6fd" fontSize="8" fontFamily="monospace">PyObject -&gt; ob_refcnt</text>
                  
                  <rect x="10" y="70" width="220" height="70" rx="4" fill="#082f49" />
                  <text x="15" y="90" fill="#38bdf8" fontSize="8" fontWeight="bold">Refcount Life Cycle:</text>
                  <text x="15" y="107" fill="#e0f2fe" fontSize="8">a = [1, 2]  ➔  refcount = 1</text>
                  <text x="15" y="124" fill="#e0f2fe" fontSize="8">b = a       ➔  refcount = 2</text>

                  <rect x="10" y="150" width="220" height="70" rx="4" fill="#042f2e" />
                  <text x="15" y="170" fill="#5eead4" fontSize="8" fontWeight="bold">Deallocation Trigger:</text>
                  <text x="15" y="187" fill="#ccfbf1" fontSize="8">del a; del b  ➔  refcount = 0</text>
                  <text x="15" y="204" fill="#86efac" fontSize="8" fontWeight="bold">Instant Memory Free ✅</text>
                </g>

                {/* Center: Circular Ref Trap */}
                <g transform="translate(290, 50)">
                  <rect x="0" y="0" width="260" height="235" rx="6" fill="#4c0519" stroke="#f43f5e" />
                  <text x="15" y="25" fill="#fda4af" fontSize="11" fontWeight="bold">2. The Cyclic Reference Problem</text>
                  <text x="15" y="50" fill="#fecdd3" fontSize="8">Self-referencing objects never reach 0!</text>

                  <rect x="15" y="70" width="230" height="145" rx="4" fill="#881337" />
                  <text x="25" y="95" fill="#ffe4e6" fontSize="8" fontFamily="monospace">node_a.next = node_b</text>
                  <text x="25" y="115" fill="#ffe4e6" fontSize="8" fontFamily="monospace">node_b.next = node_a</text>
                  <text x="25" y="140" fill="#fecdd3" fontSize="8">del node_a; del node_b</text>
                  <text x="25" y="165" fill="#fda4af" fontSize="8" fontWeight="bold">Refcount stays = 1 (Isolated!)</text>
                  <text x="25" y="195" fill="#fb7185" fontSize="8">Causes Memory Leak without GC ⚠️</text>
                </g>

                {/* Right: Generational GC */}
                <g transform="translate(570, 50)">
                  <rect x="0" y="0" width="250" height="235" rx="6" fill="#042f2e" stroke="#2dd4bf" />
                  <text x="15" y="25" fill="#5eead4" fontSize="11" fontWeight="bold">3. Generational Cyclic GC</text>

                  <rect x="10" y="45" width="230" height="50" rx="4" fill="#022c22" stroke="#0d9488" />
                  <text x="15" y="65" fill="#a7f3d0" fontSize="8" fontWeight="bold">Generation 0: Youngest Objects</text>
                  <text x="15" y="80" fill="#ccfbf1" fontSize="7">Collected frequently (High mortality)</text>

                  <rect x="10" y="105" width="230" height="50" rx="4" fill="#022c22" stroke="#0d9488" />
                  <text x="15" y="125" fill="#a7f3d0" fontSize="8" fontWeight="bold">Generation 1: Middle Tier</text>
                  <text x="15" y="140" fill="#ccfbf1" fontSize="7">Surviving objects promoted here</text>

                  <rect x="10" y="165" width="230" height="55" rx="4" fill="#022c22" stroke="#0d9488" />
                  <text x="15" y="185" fill="#a7f3d0" fontSize="8" fontWeight="bold">Generation 2: Long-Lived Objects</text>
                  <text x="15" y="202" fill="#86efac" fontSize="7">Full cycle collections (gc.collect()) ✅</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "gilConcurrency" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">
                  GLOBAL INTERPRETER LOCK (GIL) VS CONCURRENCY PARADIGMS
                </text>

                {/* Concurrency Comparison Grid */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#082f49" stroke="#0ea5e9" />

                  {/* Threading */}
                  <rect x="25" y="35" width="240" height="180" rx="6" fill="#0369a1" stroke="#38bdf8" />
                  <text x="35" y="60" fill="#ffffff" fontSize="11" fontWeight="bold">1. Threading (threading)</text>
                  <text x="35" y="85" fill="#e0f2fe" fontSize="8">• OS Threads, Shared Memory</text>
                  <text x="35" y="105" fill="#fca5a5" fontSize="8">• GIL locked: 1 thread runs at a time</text>
                  <text x="35" y="125" fill="#86efac" fontSize="8">• Best for: I/O-Bound (Disk/Network)</text>
                  <text x="35" y="145" fill="#fca5a5" fontSize="8">• Bad for: CPU-Bound math/crypto</text>
                  <text x="35" y="195" fill="#facc15" fontSize="8" fontWeight="bold">GIL Released on OS I/O</text>

                  {/* Multiprocessing */}
                  <rect x="290" y="35" width="240" height="180" rx="6" fill="#042f2e" stroke="#2dd4bf" />
                  <text x="300" y="60" fill="#5eead4" fontSize="11" fontWeight="bold">2. Multiprocessing</text>
                  <text x="300" y="85" fill="#ccfbf1" fontSize="8">• Separate OS Processes</text>
                  <text x="300" y="105" fill="#86efac" fontSize="8">• Separate Python GIL per process!</text>
                  <text x="300" y="125" fill="#86efac" fontSize="8">• True Multi-Core CPU Parallelism</text>
                  <text x="300" y="145" fill="#fca5a5" fontSize="8">• IPC Serialization overhead</text>
                  <text x="300" y="195" fill="#86efac" fontSize="8" fontWeight="bold">Best for Heavy CPU Tasks ✅</text>

                  {/* Asyncio */}
                  <rect x="555" y="35" width="240" height="180" rx="6" fill="#3b0764" stroke="#c084fc" />
                  <text x="565" y="60" fill="#f3e8ff" fontSize="11" fontWeight="bold">3. Asyncio (Event Loop)</text>
                  <text x="565" y="85" fill="#d8b4fe" fontSize="8">• Single Thread, Cooperative</text>
                  <text x="565" y="105" fill="#86efac" fontSize="8">• 10,000+ Concurrent Sockets</text>
                  <text x="565" y="125" fill="#86efac" fontSize="8">• Zero OS thread memory overhead</text>
                  <text x="565" y="145" fill="#fca5a5" fontSize="8">• Blocking code halts event loop!</text>
                  <text x="565" y="195" fill="#c084fc" fontSize="8" fontWeight="bold">Best for Web APIs &amp; Sockets</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">
                  O(1) LRU CACHE TOPOLOGY: HASH TABLE + DOUBLY LINKED LIST
                </text>

                {/* LRU Architecture */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#1e1b4b" stroke="#a855f7" />

                  {/* Doubly Linked List Nodes */}
                  {/* Head (LRU) */}
                  <rect x="35" y="55" width="160" height="120" rx="6" fill="#4c0519" stroke="#f43f5e" />
                  <text x="45" y="80" fill="#fda4af" fontSize="10" fontWeight="bold">HEAD (LRU Eviction)</text>
                  <text x="45" y="105" fill="#fecdd3" fontSize="8" fontFamily="monospace">Key: STU_IC_01</text>
                  <text x="45" y="122" fill="#fecdd3" fontSize="8" fontFamily="monospace">Val: Abhronila</text>
                  <text x="45" y="155" fill="#fb7185" fontSize="8" fontWeight="bold">Next to be evicted ❌</text>

                  {/* Node 2 */}
                  <rect x="250" y="55" width="160" height="120" rx="6" fill="#0c4a6e" stroke="#38bdf8" />
                  <text x="260" y="80" fill="#ffffff" fontSize="10" fontWeight="bold">Middle Node</text>
                  <text x="260" y="105" fill="#bae6fd" fontSize="8" fontFamily="monospace">Key: STU_CC_01</text>
                  <text x="260" y="122" fill="#bae6fd" fontSize="8" fontFamily="monospace">Val: Mahima</text>
                  <text x="260" y="155" fill="#38bdf8" fontSize="8">Active Cache Entry</text>

                  {/* Tail (MRU) */}
                  <rect x="465" y="55" width="160" height="120" rx="6" fill="#042f2e" stroke="#2dd4bf" />
                  <text x="475" y="80" fill="#5eead4" fontSize="10" fontWeight="bold">TAIL (Most Recent)</text>
                  <text x="475" y="105" fill="#ccfbf1" fontSize="8" fontFamily="monospace">Key: STU_BP_01</text>
                  <text x="475" y="122" fill="#ccfbf1" fontSize="8" fontFamily="monospace">Val: Mamata</text>
                  <text x="475" y="155" fill="#86efac" fontSize="8" fontWeight="bold">Protected from Eviction ✅</text>

                  {/* Hash Map Index */}
                  <rect x="660" y="55" width="130" height="120" rx="6" fill="#0f172a" stroke="#818cf8" />
                  <text x="670" y="80" fill="#e0e7ff" fontSize="9" fontWeight="bold">Hash Map Index</text>
                  <text x="670" y="105" fill="#a5b4fc" fontSize="8">key ➔ NodePtr</text>
                  <text x="670" y="125" fill="#a5b4fc" fontSize="8">Lookup: O(1)</text>
                  <text x="670" y="145" fill="#a5b4fc" fontSize="8">Move: O(1)</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE TECHNICAL INTERVIEW CODING SANDBOX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧪</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Technical Interview Coding Sandbox
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Select high-frequency interview coding challenges to inspect optimal time/space complexities and Python solution architectures:
          </p>

          <div className="bg-slate-950 p-5 sm:p-6 rounded-xl border border-slate-800/90 space-y-6">
            {/* Challenge Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Select Technical Challenge:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "LRU", label: "O(1) LRU Cache", tag: "Data Structure" },
                  { id: "TWOSUM", label: "Two Sum Hash Map", tag: "O(N) Lookup" },
                  { id: "MRO", label: "C3 Linearization MRO", tag: "OOP Internals" },
                  { id: "ASYNCIO", label: "Asyncio Concurrency", tag: "I/O Concurrency" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedChallenge(item.id)}
                    className={clsx(
                      "p-2.5 rounded-xl border text-left transition-all",
                      selectedChallenge === item.id
                        ? "bg-teal-950/60 border-teal-500 shadow-md shadow-teal-950/50"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                    )}
                  &gt;
                    <div className="text-xs font-bold text-slate-200">{item.label}</div>
                    <div className="text-[10px] text-cyan-400 font-mono mt-0.5">{item.tag}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Metrics Dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-900/90 p-4 rounded-xl border border-teal-900/50">
                <div className="text-xs text-teal-400 font-medium mb-1">Time Complexity</div>
                <div className="text-base font-bold font-mono text-teal-300">{timeComplexity}</div>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-cyan-900/50">
                <div className="text-xs text-cyan-400 font-medium mb-1">Space Complexity</div>
                <div className="text-base font-bold font-mono text-cyan-300">{spaceComplexity}</div>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-purple-900/50">
                <div className="text-xs text-purple-400 font-medium mb-1">Architectural Insight</div>
                <div className="text-xs text-slate-300 leading-snug">{explanationText}</div>
              </div>
            </div>

            {/* Solution Code Preview */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Optimal Python Solution Implementation:
              </div>
              <pre className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl text-xs sm:text-sm font-mono text-teal-200 overflow-x-auto leading-relaxed">
                {solutionSnippet}
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
              4. Production Code Labs &amp; Interview Challenge Suites
            </h2>
          </div>

          <p className="text-slate-300 mb-8 text-base leading-relaxed">
            Inspect, run, and master all four production-grade technical interview labs covering CPython internals, classic algorithms, Asyncio concurrency, and the complete institutional technical assessment:
          </p>

          <div className="space-y-10">
            {/* Python Loader 1 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-teal-300">
                  Lab 1: CPython Memory Internals, MRO &amp; Slots Optimization
                </h3>
                <p className="text-sm text-slate-400">
                  Demonstrating C3 Linearization multiple inheritance resolution, mutable default argument traps, and <code className="text-teal-300 font-mono">__slots__</code> memory reduction.
                </p>
              </div>
              <PythonFileLoader
                fileModule={internalsCode}
                title="python_internals_memory_gil_mro.py"
                highlightLines={[14, 30, 48, 62]}
              />
            </div>

            {/* Python Loader 2 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-cyan-300">
                  Lab 2: High-Frequency Interview Algorithms (LRU Cache, Two Sum, Sliding Window)
                </h3>
                <p className="text-sm text-slate-400">
                  Implementing O(1) LRU Cache using <code className="text-cyan-300 font-mono">OrderedDict</code> and linear O(N) Two Sum Hash Map lookups.
                </p>
              </div>
              <PythonFileLoader
                fileModule={algorithmsCode}
                title="algorithmic_coding_challenges_solutions.py"
                highlightLines={[16, 36, 52, 68]}
              />
            </div>

            {/* Python Loader 3 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-purple-300">
                  Lab 3: Concurrency Paradigms: Asyncio Event Loop vs Threading
                </h3>
                <p className="text-sm text-slate-400">
                  Benchmarking cooperative asynchronous I/O with <code className="text-purple-300 font-mono">asyncio.gather()</code> against sequential execution.
                </p>
              </div>
              <PythonFileLoader
                fileModule={concurrencyCode}
                title="concurrency_and_asyncio_interview_patterns.py"
                highlightLines={[14, 24, 34]}
              />
            </div>

            {/* Python Loader 4 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-amber-300">
                  Lab 4: Complete Institutional Live Technical Interview Assessment
                </h3>
                <p className="text-sm text-slate-400">
                  Full thread-safe LRU student caching engine combining synchronization locks with constant-time eviction policies for Mamata and Mahima across Barrackpore and Kolkata.
                </p>
              </div>
              <PythonFileLoader
                fileModule={interviewCaseCode}
                title="institutional_interview_technical_assessment.py"
                highlightLines={[18, 30, 46, 58]}
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
              5. Python Interview Gotchas &amp; Anti-Patterns
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pitfall 1 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                1. Mutable Default Arguments
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Using <code className="text-rose-400 font-mono">def append(item, target=[])</code> causes all callers to mutate the same list in memory.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # ANTI-PATTERN: def f(x, target=[]) (Shared memory!){'\n'}
                # BEST PRACTICE: def f(x, target=None): if target is None: target = []
              </pre>
            </div>

            {/* Pitfall 2 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                2. Confusing 'is' with '=='
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                <code className="text-rose-400 font-mono">is</code> checks memory address identity, whereas <code className="text-teal-300 font-mono">==</code> checks equality of value.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # ANTI-PATTERN: if name is "Mamata": (Wrong!){'\n'}
                # BEST PRACTICE: if name == "Mamata": (Value equality)
              </pre>
            </div>

            {/* Pitfall 3 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                3. Late Binding Closures in Loops
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Creating lambdas inside loops looks up variables when called, returning the final loop value for all functions.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # BUG: [lambda: i for i in range(3)] ➔ [2, 2, 2]{'\n'}
                # FIX: [lambda i=i: i for i in range(3)] ➔ [0, 1, 2]
              </pre>
            </div>

            {/* Pitfall 4 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                4. Threading for CPU-Bound Tasks
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Spawning OS threads for heavy math computations is slowed down by GIL context switching overhead.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # FIX: Use multiprocessing.Pool or ProcessPoolExecutor
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
              6. Senior Technical Interview Mastery Checklist
            </h2>
          </div>

          <div className="space-y-3 text-slate-300 text-sm sm:text-base">
            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Explain CPython Internals:</strong> Reference counting for instant free, 3-generation cyclic GC for circular reference detection.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Articulate Concurrency Tradeoffs:</strong> Threading for I/O, Multiprocessing for CPU bound loads, and Asyncio for massive socket scaling.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Write O(1) Cache Architectures:</strong> Use <code className="text-teal-300 font-mono">OrderedDict</code> with <code className="text-teal-300 font-mono">move_to_end()</code> and <code className="text-teal-300 font-mono">popitem(last=False)</code>.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">State Big-O Complexities:</strong> Always state both Time and Auxiliary Space complexity before and after writing algorithms.
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQS */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <FAQTemplate
            title="Python Technical Interview &amp; Coding FAQs"
            questions={questions}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: PLAIN TEXT PRINT & DOWNLOAD NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <PlainTextPrint
            content={noteText}
            title="Topic 5: Technical Interview Questions &amp; Challenges Study Note"
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
              "Technical interviews do not test memorization; they test your engineering intuition and deep understanding of runtime tradeoffs. In our institutional student management systems across Barrackpore, Kolkata, Ichapur, and Jadavpur, applying O(1) LRU caching and thread-safe data structures keeps student fee queries and admission pipelines instantaneous, while understanding CPython's reference counting and GIL behavior lets you build high-performance systems with confidence."
            }
          />
        </section>

      </div>
    </div>
  );
}
