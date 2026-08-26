import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import dequeCode from "./topic6_files/deque_fifo_lifo_ring_buffer.py?raw";
import counterCode from "./topic6_files/counter_frequency_and_multisets.py?raw";
import defaultDictCode from "./topic6_files/defaultdict_and_ordereddict_mastery.py?raw";
import namedTupleCode from "./topic6_files/namedtuple_and_chainmap_casestudy.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic6_files/topic6_note.txt?raw";

// FAQ Questions
import questions from "./topic6_files/topic6_questions";

/**
 * Topic6: collections module: deque, Counter, defaultdict, OrderedDict, namedtuple
 * Module: 004_002_performance-optimization
 * Segment: 4 (Python Pro Level & Ecosystem Mastery)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic6() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("dequeMemory");

  // Interactive Laboratory State
  const [selectedContainer, setSelectedContainer] = useState("DEQUE"); // DEQUE | COUNTER | DEFAULTDICT | ORDEREDDICT | NAMEDTUPLE | CHAINMAP
  const [workloadSize, setWorkloadSize] = useState(25000);

  // Container metrics mapping
  let timeComplexity = "O(1) Constant";
  let memoryOverhead = "Low (Chunked Blocks)";
  let primaryUseCase = "High-speed FIFO/LIFO queues & Bounded Ring Buffers";
  let baselineSpeedup = "15x - 50x vs list.pop(0)";

  if (selectedContainer === "DEQUE") {
    timeComplexity = "O(1) Appends & Pops on Both Ends";
    memoryOverhead = "Chunked Doubly-Linked Blocks (~64 items/block)";
    primaryUseCase = "High-throughput FIFO Queues & Sliding-Window Buffers";
    baselineSpeedup = "25x+ Faster than list.pop(0)";
  } else if (selectedContainer === "COUNTER") {
    timeComplexity = "O(1) Updates, O(N log K) most_common()";
    memoryOverhead = "Hash Table + C Min-Heap";
    primaryUseCase = "Frequency counting, Top-K rankings, Multiset algebra";
    baselineSpeedup = "2x Faster + Clean algebraic multiset API";
  } else if (selectedContainer === "DEFAULTDICT") {
    timeComplexity = "O(1) Key lookup and auto-factory creation";
    memoryOverhead = "Hash Table with C-level missing factory";
    primaryUseCase = "Grouping, multi-level nesting & inverted indexes";
    baselineSpeedup = "2.2x Faster than manual if-key checks";
  } else if (selectedContainer === "ORDEREDDICT") {
    timeComplexity = "O(1) Lookup, move_to_end(), and popitem()";
    memoryOverhead = "Doubly-Linked List + Hash Map pointers";
    primaryUseCase = "In-memory LRU / MRU Caches with eviction";
    baselineSpeedup = "O(1) Eviction vs O(N) list sorting";
  } else if (selectedContainer === "NAMEDTUPLE") {
    timeComplexity = "O(1) Tuple offset descriptor access";
    memoryOverhead = "Minimal (~72B per object, NO __dict__)";
    primaryUseCase = "Immutable low-memory domain records";
    baselineSpeedup = "65%+ RAM reduction vs standard classes";
  } else if (selectedContainer === "CHAINMAP") {
    timeComplexity = "O(K) Layered search (K = number of scopes)";
    memoryOverhead = "Zero-Copy Reference Mapping";
    primaryUseCase = "Hierarchical configuration & lexical scoping";
    baselineSpeedup = "Zero memory allocation vs dict merging";
  }

  const generatedPythonSnippet = `# High-Performance Collections Laboratory
# Selected Container: ${selectedContainer} | Workload: N = ${workloadSize.toLocaleString()} items

${
  selectedContainer === "DEQUE"
    ? `from collections import deque

# O(1) Double-Ended Queue + Bounded Ring Buffer
queue = deque(maxlen=1000)
for i in range(${workloadSize}):
    queue.append(f"Student_{i}") # O(1) Push
    if len(queue) > 500:
        first_in = queue.popleft() # O(1) Pop (NEVER use list.pop(0) - O(N)!)`
    : selectedContainer === "COUNTER"
    ? `from collections import Counter

# O(N log K) Top-K Ranking & Multiset Algebra
scores = ["PYTHON_PRO", "DATA_AI", "WEB_DEV"] * ${Math.floor(workloadSize / 3)}
tally = Counter(scores)
top_2_courses = tally.most_common(2)  # Heap-accelerated top-K selection

# Multiset Algebra: batch1 + batch2, batch1 & batch2, batch1 - batch2`
    : selectedContainer === "DEFAULTDICT"
    ? `from collections import defaultdict

# Multi-Level Grouping & Auto-Vivifying Trees
campus_groups = defaultdict(list)
for i in range(${workloadSize}):
    campus = "Barrackpore" if i % 2 == 0 else "Kolkata"
    campus_groups[campus].append(f"STU_{i}")  # No 'if campus not in dict' needed!`
    : selectedContainer === "ORDEREDDICT"
    ? `from collections import OrderedDict

# High-Performance O(1) LRU Cache
lru_cache = OrderedDict()
for i in range(10):
    lru_cache[f"KEY_{i}"] = f"Data_{i}"
    lru_cache.move_to_end(f"KEY_{i}")  # Mark as MRU
    if len(lru_cache) &gt; 5:
        lru_cache.popitem(last=False)  # Evict oldest LRU in O(1)`
    : selectedContainer === "NAMEDTUPLE"
    ? `from collections import namedtuple

# Low-Memory Immutable C Struct (~72 bytes vs ~340 bytes standard class)
Student = namedtuple("Student", ["id", "name", "campus", "score"])
students = [
    Student(f"STU_{i}", "Mamata", "Barrackpore", 98.0)
    for i in range(${workloadSize})
]  # 65%+ RAM saved across ${workloadSize.toLocaleString()} records!`
    : `from collections import ChainMap

# Zero-Copy Hierarchical Policy Resolution
global_policy = {"timeout": 30, "campus": "All", "debug": False}
campus_override = {"campus": "Barrackpore", "timeout": 60}
local_session = {"student": "Mamata", "debug": True}

config = ChainMap(local_session, campus_override, global_policy)
print(config["timeout"])  # 60 (from campus)
print(config["debug"])    # True (from local session)`
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
            Topic 6
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Performance Optimization, Profiling &amp; Big-O Thinking
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Specialized Containers: <span className="text-teal-400">`collections` Module</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master Python's high-speed standard library container datatypes: replacing linear <code className="text-rose-400 font-mono">list.pop(0)</code> bottleneck queues with <code className="text-teal-300 font-mono">deque</code> ($O(1)$ operations and ring buffers), frequency analysis &amp; multiset algebra with <code className="text-cyan-300 font-mono">Counter</code>, branching-free grouping with <code className="text-purple-300 font-mono">defaultdict</code>, LRU caching with <code className="text-amber-300 font-mono">OrderedDict</code>, low-memory C structs with <code className="text-emerald-300 font-mono">namedtuple</code>, and zero-copy hierarchical scoping with <code className="text-blue-300 font-mono">ChainMap</code>.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ O(1) Double-Ended Queues
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📊 O(N log K) Counter Ranking
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🗂️ Zero-Branching defaultdict
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🧠 65%+ RAM Saved with namedtuple
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
              1. The High-Speed Container Architecture
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Standard Python lists and dictionaries are general-purpose tools. When applications scale to millions of operations, picking the exact specialized container from the <code className="text-teal-300 font-mono">collections</code> module eliminates memory churn and unlocks orders-of-magnitude speedups:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Pillar 1: deque */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ collections.deque</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">O(1) End Pops &amp; Appends</code>
                <p className="text-[11px] text-slate-300">
                  Allocates 64-element doubly-linked C memory blocks. Never shifts arrays on <code className="text-teal-300">popleft()</code>. Auto-evicts via <code className="text-teal-300">maxlen</code>.
                </p>
              </div>

              {/* Pillar 2: Counter */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ collections.Counter</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">O(N log K) Top-K &amp; Multisets</code>
                <p className="text-[11px] text-slate-300">
                  C-optimized frequency tallies with zero-default missing keys, <code className="text-cyan-300">heapq.nlargest</code> ranking, and multiset algebra (<code className="text-cyan-300">+</code>, <code className="text-cyan-300">-</code>, <code className="text-cyan-300">&amp;</code>, <code className="text-cyan-300">|</code>).
                </p>
              </div>

              {/* Pillar 3: defaultdict */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ collections.defaultdict</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">C Factory Auto-Vivification</code>
                <p className="text-[11px] text-slate-300">
                  Calls a C-level factory function (<code className="text-purple-300">list</code>, <code className="text-purple-300">int</code>, <code className="text-purple-300">set</code>) on missing keys, eliminating manual conditional branching.
                </p>
              </div>

              {/* Pillar 4: OrderedDict */}
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 shadow-lg">
                <div className="text-amber-400 font-bold text-sm mb-1">4️⃣ collections.OrderedDict</div>
                <code className="text-xs font-mono text-amber-300 block mb-1">O(1) LRU Cache Eviction</code>
                <p className="text-[11px] text-slate-300">
                  Maintains a doubly-linked hash map with <code className="text-amber-300">move_to_end()</code> and <code className="text-amber-300">popitem(last=False)</code> for building in-memory LRU caches.
                </p>
              </div>

              {/* Pillar 5: namedtuple */}
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 shadow-lg">
                <div className="text-emerald-400 font-bold text-sm mb-1">5️⃣ collections.namedtuple</div>
                <code className="text-xs font-mono text-emerald-300 block mb-1">Zero __dict__ C Struct</code>
                <p className="text-[11px] text-slate-300">
                  Compact immutable C tuple subclass with named field descriptors. Cuts instance memory by over 65% across millions of records.
                </p>
              </div>

              {/* Pillar 6: ChainMap */}
              <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-800/60 shadow-lg">
                <div className="text-blue-400 font-bold text-sm mb-1">6️⃣ collections.ChainMap</div>
                <code className="text-xs font-mono text-blue-300 block mb-1">Zero-Copy Scope Layering</code>
                <p className="text-[11px] text-slate-300">
                  Searches multiple dictionaries by reference sequentially without copying or merging data. Perfect for tiered configurations.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Performance Trap: Why list.pop(0) Destroys Throughput
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                A Python list is a contiguous dynamic C array. Popping the first element (<code className="text-rose-400 font-mono">list.pop(0)</code>) requires CPython to shift all $N-1$ remaining pointers one step to the left in memory, producing an <span className="text-rose-400 font-bold">$O(N)$ penalty per pop ($O(N^2)$ overall queue drain)</span>! <code className="text-teal-300 font-mono">deque.popleft()</code> unlinks a pointer in constant <span className="text-emerald-400 font-bold">$O(1)$ time</span>.
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
                2. Visualizing Container Memory Internals &amp; Operations
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("dequeMemory")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "dequeMemory"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              &gt;
                deque vs list Memory
              </button>
              <button
                onClick={() => setActiveInteractiveTab("counterAlgebra")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "counterAlgebra"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              &gt;
                Counter Multiset Algebra
              </button>
              <button
                onClick={() => setActiveInteractiveTab("chainMapScopes")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "chainMapScopes"
                    ? "bg-blue-900/50 text-blue-300 border border-blue-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              &gt;
                ChainMap Scope Layering
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Comparing internal C memory layouts, block allocation strategies, and multi-dictionary lookup mechanics:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "dequeMemory" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">
                  MEMORY INTERNALS: CONTIGUOUS LIST ARRAY VS DEQUE DOUBLY-LINKED BLOCK NODES
                </text>

                {/* Left: Standard List Array */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="245" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="12" fontWeight="bold">
                    Standard List: Contiguous C Array
                  </text>
                  
                  <rect x="20" y="55" width="340" height="40" rx="4" fill="#090d16" stroke="#e11d48" />
                  <text x="30" y="80" fill="#fca5a5" fontSize="10" fontFamily="monospace">
                    [ Item 0 | Item 1 | Item 2 | Item 3 | Item 4 ... ]
                  </text>

                  <rect x="20" y="105" width="340" height="60" rx="4" fill="#881337" stroke="#fb7185" />
                  <text x="30" y="127" fill="#ffe4e6" fontSize="10" fontWeight="bold">
                    list.pop(0) Triggers Massive Memory Shift:
                  </text>
                  <text x="30" y="145" fill="#fecdd3" fontSize="9" fontFamily="monospace">
                    memmove() shifts N-1 pointers to left (O(N) CPU time!)
                  </text>

                  <rect x="20" y="175" width="340" height="50" rx="4" fill="#090d16" stroke="#f43f5e" />
                  <text x="30" y="197" fill="#fca5a5" fontSize="10">
                    💥 Severe queue drain bottleneck at scale
                  </text>
                  <text x="30" y="213" fill="#fda4af" fontSize="9">
                    50,000 items = 2.5 Billion pointer shifts!
                  </text>
                </g>

                {/* Right: Deque Block Nodes */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="245" rx="8" fill="#042f2e" stroke="#14b8a6" />
                  <text x="20" y="30" fill="#5eead4" fontSize="12" fontWeight="bold">
                    collections.deque: Doubly-Linked Blocks
                  </text>

                  {/* Block 1 */}
                  <rect x="20" y="55" width="95" height="45" rx="4" fill="#0f766e" stroke="#2dd4bf" />
                  <text x="25" y="75" fill="#ccfbf1" fontSize="9" fontWeight="bold">Block Node 1</text>
                  <text x="25" y="90" fill="#99f6e4" fontSize="8" fontFamily="monospace">64 items</text>

                  {/* Arrow 1 */}
                  <path d="M 120 78 L 138 78" stroke="#2dd4bf" strokeWidth="2" markerEnd="url(#arrow)" />

                  {/* Block 2 */}
                  <rect x="142" y="55" width="95" height="45" rx="4" fill="#0f766e" stroke="#2dd4bf" />
                  <text x="147" y="75" fill="#ccfbf1" fontSize="9" fontWeight="bold">Block Node 2</text>
                  <text x="147" y="90" fill="#99f6e4" fontSize="8" fontFamily="monospace">64 items</text>

                  {/* Arrow 2 */}
                  <path d="M 242 78 L 260 78" stroke="#2dd4bf" strokeWidth="2" />

                  {/* Block 3 */}
                  <rect x="265" y="55" width="95" height="45" rx="4" fill="#0f766e" stroke="#2dd4bf" />
                  <text x="270" y="75" fill="#ccfbf1" fontSize="9" fontWeight="bold">Block Node 3</text>
                  <text x="270" y="90" fill="#99f6e4" fontSize="8" fontFamily="monospace">64 items</text>

                  <rect x="20" y="115" width="340" height="50" rx="4" fill="#115e59" stroke="#2dd4bf" />
                  <text x="30" y="137" fill="#ffffff" fontSize="10" fontWeight="bold">
                    deque.popleft() is Instant O(1):
                  </text>
                  <text x="30" y="153" fill="#ccfbf1" fontSize="9">
                    Only adjusts head block pointer. Zero memory shifting!
                  </text>

                  <rect x="20" y="175" width="340" height="50" rx="4" fill="#042f2e" stroke="#0d9488" />
                  <text x="30" y="197" fill="#a7f3d0" fontSize="10" fontWeight="bold">
                    🚀 50x Faster Queue Processing
                  </text>
                  <text x="30" y="213" fill="#ccfbf1" fontSize="9">
                    Auto-trims with maxlen=K without manual size checks
                  </text>
                </g>
              </svg>
            ) : activeInteractiveTab === "counterAlgebra" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">
                  COUNTER MULTISET ARITHMETIC ALGEBRA &amp; HEAP TOP-K RANKING
                </text>

                {/* Left: Multiset Operations */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="245" rx="8" fill="#082f49" stroke="#0ea5e9" />
                  <text x="20" y="30" fill="#7dd3fc" fontSize="12" fontWeight="bold">
                    Multiset / Bag Arithmetic Algebra
                  </text>

                  <rect x="20" y="50" width="340" height="38" rx="4" fill="#0369a1" stroke="#38bdf8" />
                  <text x="30" y="74" fill="#e0f2fe" fontSize="10" fontFamily="monospace">
                    c1 + c2 ➔ Combined sum of item counts
                  </text>

                  <rect x="20" y="95" width="340" height="38" rx="4" fill="#0369a1" stroke="#38bdf8" />
                  <text x="30" y="119" fill="#e0f2fe" fontSize="10" fontFamily="monospace">
                    c1 - c2 ➔ Subtraction (keeps positive only)
                  </text>

                  <rect x="20" y="140" width="340" height="38" rx="4" fill="#0369a1" stroke="#38bdf8" />
                  <text x="30" y="164" fill="#e0f2fe" fontSize="10" fontFamily="monospace">
                    c1 &amp; c2 ➔ Intersection: min(c1[k], c2[k])
                  </text>

                  <rect x="20" y="185" width="340" height="40" rx="4" fill="#0c4a6e" stroke="#0284c7" />
                  <text x="30" y="210" fill="#bae6fd" fontSize="10" fontFamily="monospace">
                    c1 | c2 ➔ Union: max(c1[k], c2[k])
                  </text>
                </g>

                {/* Right: Heap Top-K */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="245" rx="8" fill="#1e1b4b" stroke="#6366f1" />
                  <text x="20" y="30" fill="#c7d2fe" fontSize="12" fontWeight="bold">
                    Counter.most_common(k) Heap Ranking
                  </text>

                  <rect x="20" y="50" width="340" height="45" rx="4" fill="#3730a3" stroke="#818cf8" />
                  <text x="30" y="72" fill="#e0e7ff" fontSize="10" fontFamily="monospace">
                    1. Direct Hash Counting: O(N)
                  </text>
                  <text x="30" y="87" fill="#c7d2fe" fontSize="9">
                    Scans all N items and accumulates counts in C
                  </text>

                  <rect x="20" y="105" width="340" height="50" rx="4" fill="#4338ca" stroke="#818cf8" />
                  <text x="30" y="127" fill="#ffffff" fontSize="10" fontWeight="bold">
                    2. heapq.nlargest Top-K Selection: O(N log K) ⚡
                  </text>
                  <text x="30" y="143" fill="#c7d2fe" fontSize="9">
                    Maintains K-element min-heap (Avoids O(N log N) full sort)
                  </text>

                  <rect x="20" y="165" width="340" height="60" rx="4" fill="#312e81" stroke="#6366f1" />
                  <text x="30" y="190" fill="#e0e7ff" fontSize="10" fontWeight="bold">
                    🎯 Instant Leaderboards &amp; Frequency Tallies
                  </text>
                  <text x="30" y="208" fill="#a5b4fc" fontSize="9">
                    Counter['missing_item'] returns 0 without KeyError!
                  </text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#60a5fa" fontSize="14" fontWeight="bold">
                  CHAINMAP: ZERO-COPY LAYERED HIERARCHY &amp; LEXICAL SCOPING
                </text>

                {/* Main ChainMap Container */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#0f172a" stroke="#3b82f6" />
                  <text x="25" y="30" fill="#93c5fd" fontSize="13" fontWeight="bold">
                    ChainMap(Local Overrides, Campus Policy, Global Defaults)
                  </text>

                  {/* Scope 1 */}
                  <rect x="25" y="55" width="240" height="110" rx="6" fill="#1e3a8a" stroke="#60a5fa" />
                  <text x="35" y="78" fill="#bfdbfe" fontSize="11" fontWeight="bold">Map 0: Local Scope (MRU)</text>
                  <text x="35" y="100" fill="#93c5fd" fontSize="9" fontFamily="monospace">student: 'Mamata'</text>
                  <text x="35" y="118" fill="#60a5fa" fontSize="9" fontFamily="monospace">max_logins: 1 (Shadows!)</text>
                  <text x="35" y="145" fill="#facc15" fontSize="9" fontWeight="bold">✍️ Writes happen ONLY here</text>

                  {/* Scope 2 */}
                  <rect x="290" y="55" width="240" height="110" rx="6" fill="#1e293b" stroke="#64748b" />
                  <text x="300" y="78" fill="#cbd5e1" fontSize="11" fontWeight="bold">Map 1: Campus Policy</text>
                  <text x="300" y="100" fill="#94a3b8" fontSize="9" fontFamily="monospace">campus: 'Barrackpore'</text>
                  <text x="300" y="118" fill="#94a3b8" fontSize="9" fontFamily="monospace">passcode: 'BP_LAB_99'</text>
                  <text x="300" y="136" fill="#94a3b8" fontSize="9" fontFamily="monospace">max_logins: 4</text>

                  {/* Scope 3 */}
                  <rect x="555" y="55" width="240" height="110" rx="6" fill="#0f172a" stroke="#475569" />
                  <text x="565" y="78" fill="#94a3b8" fontSize="11" fontWeight="bold">Map 2: Global Defaults</text>
                  <text x="565" y="100" fill="#64748b" fontSize="9" fontFamily="monospace">institution: 'CoderAccotax'</text>
                  <text x="565" y="118" fill="#64748b" fontSize="9" fontFamily="monospace">grace_days: 15</text>
                  <text x="565" y="136" fill="#64748b" fontSize="9" fontFamily="monospace">passcode: 'DEFAULT_2026'</text>

                  {/* Bottom Explanation Banner */}
                  <rect x="25" y="180" width="770" height="45" rx="6" fill="#1e293b" stroke="#3b82f6" />
                  <text x="40" y="207" fill="#e2e8f0" fontSize="11">
                    🔍 Sequential Search: Checks Map 0 ➔ Map 1 ➔ Map 2 without copying dictionaries. Zero RAM duplication!
                  </text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE CONTAINER SELECTOR & LAB */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧪</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Container Selector &amp; Complexity Simulator
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Select a specialized container from the <code className="text-teal-300 font-mono">collections</code> module and examine its internal complexity, memory footprint, and production Python code:
          </p>

          <div className="bg-slate-950 p-5 sm:p-6 rounded-xl border border-slate-800/90 space-y-6">
            {/* Container Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Choose Specialized Container:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
                {[
                  { id: "DEQUE", label: "deque", icon: "⚡", tag: "O(1) Queue" },
                  { id: "COUNTER", label: "Counter", icon: "📊", tag: "Frequencies" },
                  { id: "DEFAULTDICT", label: "defaultdict", icon: "🗂️", tag: "Grouping" },
                  { id: "ORDEREDDICT", label: "OrderedDict", icon: "🔄", tag: "LRU Cache" },
                  { id: "NAMEDTUPLE", label: "namedtuple", icon: "🧬", tag: "C Struct" },
                  { id: "CHAINMAP", label: "ChainMap", icon: "🔗", tag: "Scope Layer" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedContainer(item.id)}
                    className={clsx(
                      "p-3 rounded-xl border text-center transition-all",
                      selectedContainer === item.id
                        ? "bg-teal-950/60 border-teal-500 shadow-md shadow-teal-950/50"
                        : "bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400"
                    )}
                  &gt;
                    <div className="text-xl mb-1">{item.icon}</div>
                    <div className="text-xs sm:text-sm font-bold text-slate-200">{item.label}</div>
                    <div className="text-[10px] text-teal-400 font-mono mt-0.5">{item.tag}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Slider for Workload */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Simulated Workload Volume:
                </span>
                <span className="text-sm font-mono font-bold text-teal-400 bg-teal-950/80 px-3 py-1 rounded-lg border border-teal-800">
                  {workloadSize.toLocaleString()} Operations
                </span>
              </div>
              <input
                type="range"
                min={5000}
                max={100000}
                step={5000}
                value={workloadSize}
                onChange={(e) => setWorkloadSize(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
              /&gt;
              <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1">
                <span>5,000</span>
                <span>50,000</span>
                <span>100,000 (Production Scale)</span>
              </div>
            </div>

            {/* Metrics Dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              <div className="bg-slate-900/90 p-4 rounded-xl border border-teal-900/50">
                <div className="text-xs text-teal-400 font-medium mb-1">Time Complexity</div>
                <div className="text-sm sm:text-base font-bold font-mono text-teal-300">
                  {timeComplexity}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Optimized in C</div>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-cyan-900/50">
                <div className="text-xs text-cyan-400 font-medium mb-1">Memory Overhead</div>
                <div className="text-sm sm:text-base font-bold font-mono text-cyan-300">
                  {memoryOverhead}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Minimal heap bloat</div>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-purple-900/50">
                <div className="text-xs text-purple-400 font-medium mb-1">Performance Gain</div>
                <div className="text-sm sm:text-base font-bold font-mono text-purple-300">
                  {baselineSpeedup}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">vs naive lists / dicts</div>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-amber-900/50">
                <div className="text-xs text-amber-400 font-medium mb-1">Primary Pattern</div>
                <div className="text-xs font-bold font-mono text-amber-300 leading-snug mt-1">
                  {primaryUseCase}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Production standard</div>
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
            Inspect, run, and master all four production-grade container implementations covering FIFO deque queues, sliding-window ring buffers, multiset frequency algebra with <code className="text-teal-300 font-mono">Counter</code>, grouping trees &amp; LRU caching with <code className="text-cyan-300 font-mono">defaultdict</code> and <code className="text-purple-300 font-mono">OrderedDict</code>, and low-memory records with <code className="text-amber-300 font-mono">namedtuple</code>:
          </p>

          <div className="space-y-10">
            {/* Python Loader 1 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-teal-300">
                  Lab 1: Deque FIFO Queues &amp; Sliding-Window Ring Buffers
                </h3>
                <p className="text-sm text-slate-400">
                  Benchmarking $O(N)$ linear memory shifts in <code className="text-rose-400 font-mono">list.pop(0)</code> against $O(1)$ constant unlinks in <code className="text-teal-300 font-mono">deque.popleft()</code>, and building automatic bounded log buffers with <code className="text-teal-300 font-mono">deque(maxlen=K)</code>.
                </p>
              </div>
              <PythonFileLoader
                fileModule={dequeCode}
                title="deque_fifo_lifo_ring_buffer.py"
                highlightLines={[22, 35, 49, 58]}
              />
            </div>

            {/* Python Loader 2 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-cyan-300">
                  Lab 2: Counter Frequency Analysis &amp; Multiset Bag Arithmetic
                </h3>
                <p className="text-sm text-slate-400">
                  Demonstrating heap-accelerated $O(N \log K)$ <code className="text-cyan-300 font-mono">most_common(k)</code> selection across 50,000 student course ratings and multiset algebra (<code className="text-cyan-300 font-mono">+</code>, <code className="text-cyan-300 font-mono">-</code>, <code className="text-cyan-300 font-mono">&amp;</code>, <code className="text-cyan-300 font-mono">|</code>).
                </p>
              </div>
              <PythonFileLoader
                fileModule={counterCode}
                title="counter_frequency_and_multisets.py"
                highlightLines={[32, 44, 62, 66, 70, 74]}
              />
            </div>

            {/* Python Loader 3 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-purple-300">
                  Lab 3: defaultdict Grouping Trees &amp; OrderedDict LRU Cache Eviction
                </h3>
                <p className="text-sm text-slate-400">
                  Eliminating missing-key dictionary branching with <code className="text-purple-300 font-mono">defaultdict(list)</code>, auto-vivifying infinite nested directory trees, and building an in-memory LRU cache with <code className="text-purple-300 font-mono">OrderedDict.move_to_end()</code> and <code className="text-purple-300 font-mono">popitem(last=False)</code>.
                </p>
              </div>
              <PythonFileLoader
                fileModule={defaultDictCode}
                title="defaultdict_and_ordereddict_mastery.py"
                highlightLines={[32, 45, 52, 60, 68]}
              />
            </div>

            {/* Python Loader 4 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-amber-300">
                  Lab 4: namedtuple Memory Footprint &amp; ChainMap Hierarchical Scoping
                </h3>
                <p className="text-sm text-slate-400">
                  Measuring 65%+ RAM reductions using immutable C <code className="text-amber-300 font-mono">namedtuple</code> instances and building a zero-copy multi-campus policy resolution system with <code className="text-amber-300 font-mono">ChainMap</code>.
                </p>
              </div>
              <PythonFileLoader
                fileModule={namedTupleCode}
                title="namedtuple_and_chainmap_casestudy.py"
                highlightLines={[19, 31, 56, 68]}
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
              5. Common Pitfalls &amp; Container Anti-Patterns
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pitfall 1 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                1. Using list.pop(0) for FIFO Queues
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Using <code className="text-rose-400 font-mono">list.pop(0)</code> causes CPython to shift every remaining item in memory, degrading queue processing to $O(N^2)$. Always use <code className="text-teal-300 font-mono">deque.popleft()</code> ($O(1)$).
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # BUG: item = my_list.pop(0) # O(N) shift!{'\n'}
                # FIX: item = my_deque.popleft() # O(1)
              </pre>
            </div>

            {/* Pitfall 2 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                2. Random Indexing into Large Deques
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Deques are linked block lists; accessing <code className="text-rose-400 font-mono">dq[50000]</code> requires traversing node pointers from the nearest end ($O(N)$). Use standard lists when frequent random index access is needed.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # SLOW: mid = dq[len(dq)//2] # O(N) traversal{'\n'}
                # FAST: mid = lst[len(lst)//2] # O(1) index
              </pre>
            </div>

            {/* Pitfall 3 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                3. Auto-Vivification in defaultdict
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Checking <code className="text-rose-400 font-mono">if d["missing"]:</code> creates and inserts the default entry into the dictionary. Always check <code className="text-teal-300 font-mono">if "missing" in d:</code> to inspect without accidental insertion.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # BUG: if d['nonexistent']: ... # Inserts empty list!{'\n'}
                # FIX: if 'nonexistent' in d: ...
              </pre>
            </div>

            {/* Pitfall 4 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                4. Mutable Defaults in namedtuple
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Assigning a mutable default (e.g. <code className="text-rose-400 font-mono">defaults={'{"tags": []}'}</code>) shares the exact same list instance across all records in memory.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                {"# BUG: defaults={'tags': []} # Shared list across instances!\n"}
                {"# FIX: defaults={'tags': None}"}
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
              6. Professional Container Selection Checklist
            </h2>
          </div>

          <div className="space-y-3 text-slate-300 text-sm sm:text-base">
            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Use deque for Queues &amp; Sliding Windows:</strong> Choose <code className="text-teal-300 font-mono">deque</code> for $O(1)$ popleft and bounded ring buffers with <code className="text-teal-300 font-mono">maxlen</code>.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Use Counter for Frequencies &amp; Top-K:</strong> Leverage <code className="text-teal-300 font-mono">Counter.most_common(k)</code> to avoid $O(N \log N)$ sorting and perform multiset arithmetic.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Use defaultdict for Grouping:</strong> Eliminate dictionary missing-key branching in loops using <code className="text-teal-300 font-mono">defaultdict(list)</code> or recursive tree factories.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Use OrderedDict for LRU Caches:</strong> Build clean in-memory eviction caches with <code className="text-teal-300 font-mono">move_to_end()</code> and <code className="text-teal-300 font-mono">popitem(last=False)</code>.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Use namedtuple for High-Volume Records:</strong> Eliminate dynamic <code className="text-rose-400 font-mono">__dict__</code> memory overhead for lightweight data modeling.
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQS */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <FAQTemplate
            title="Specialized Containers: collections Module FAQs"
            questions={questions}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: PLAIN TEXT PRINT & DOWNLOAD NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <PlainTextPrint
            content={noteText}
            title="Topic 6: Collections Module High-Speed Containers Study Note"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Study Note"
            downloadFileName="topic6_note.txt"
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 9: TEACHER'S NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <Teacher
            note={
              "Selecting the appropriate container from Python's collections module is a hallmark of professional software engineering. In real-world educational data systems across Barrackpore, Kolkata, Ichapur, and Jadavpur, processing student applications with deque ensures constant-time throughput, tallying course evaluations with Counter provides instant top-K rankings without full sorts, grouping rosters with defaultdict eliminates messy boilerplate, and modeling hundreds of thousands of candidate records with namedtuple cuts server RAM by over 65%. Always pick the specialized data structure tailored to your access pattern."
            }
          />
        </section>

      </div>
    </div>
  );
}
