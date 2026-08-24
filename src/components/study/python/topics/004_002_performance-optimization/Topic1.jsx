import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import lookupBenchCode from "./topic1_files/data_structure_lookup_and_search_benchmarks.py?raw";
import mutationCostsCode from "./topic1_files/insertion_deletion_and_fifo_lifo_costs.py?raw";
import memoryOverheadCode from "./topic1_files/memory_overhead_and_cache_locality.py?raw";
import rosterOptCode from "./topic1_files/institutional_admission_roster_lookup_optimizer.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic1_files/topic1_note.txt?raw";

// FAQ Questions
import questions from "./topic1_files/topic1_questions";

/**
 * Topic1: Comparing lookup costs across Python data structures (list, set, dict, deque)
 * Module: 004_002_performance-optimization
 * Segment: 4 (Python Pro Level & Ecosystem Mastery)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic1() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("memoryLayout");

  // Interactive Laboratory State
  const [datasetSizeN, setDatasetSizeN] = useState(100000);
  const [selectedOperation, setSelectedOperation] = useState("SEARCH"); // SEARCH | HEAD_INSERT | FIFO_POP | TAIL_INSERT

  let listComplexity = "O(N) Linear Scan";
  let setComplexity = "O(1) Hash Table";
  let dictComplexity = "O(1) Key Table";
  let dequeComplexity = "O(N) Block Scan";

  let listLatency = "1.25 ms";
  let setLatency = "0.0001 ms (10,000x faster)";
  let dictLatency = "0.0001 ms";
  let dequeLatency = "1.45 ms";

  if (selectedOperation === "HEAD_INSERT") {
    listComplexity = "O(N) Memory Shift";
    setComplexity = "O(1) Hash Insert (set.add)";
    dictComplexity = "O(1) Key Assign (dict[k])";
    dequeComplexity = "O(1) Block Link (appendleft)";

    listLatency = `${((datasetSizeN / 1000) * 0.12).toFixed(2)} ms (Severe Shifting)`;
    setLatency = "0.0002 ms";
    dictLatency = "0.0002 ms";
    dequeLatency = "0.0001 ms (Optimal FIFO)";
  } else if (selectedOperation === "FIFO_POP") {
    listComplexity = "O(N) Memory Shift (pop(0))";
    setComplexity = "O(1) Unordered Pop (set.pop)";
    dictComplexity = "O(1) Key Delete (del dict[k])";
    dequeComplexity = "O(1) Block Unlink (popleft)";

    listLatency = `${((datasetSizeN / 1000) * 0.14).toFixed(2)} ms (Quadratic Queue!)`;
    setLatency = "0.0002 ms";
    dictLatency = "0.0002 ms";
    dequeLatency = "0.0001 ms (High-Throughput)";
  } else if (selectedOperation === "TAIL_INSERT") {
    listComplexity = "O(1) Amortized Append";
    setComplexity = "O(1) Hash Add";
    dictComplexity = "O(1) Key Set";
    dequeComplexity = "O(1) Block Append";

    listLatency = "0.0001 ms";
    setLatency = "0.0002 ms";
    dictLatency = "0.0002 ms";
    dequeLatency = "0.0001 ms";
  }

  const generatedPythonSnippet = `# Performance Benchmark for N = ${datasetSizeN.toLocaleString()} elements:
# Operation: ${selectedOperation}

${
  selectedOperation === "SEARCH"
    ? `# 1. List Search: O(N) linear iteration\nfound = target in student_list  # ~${listLatency}\n\n# 2. Set Search: O(1) hash bucket lookup (10,000x faster!)\nfound = target in student_set   # ~${setLatency}`
    : selectedOperation === "HEAD_INSERT"
    ? `# 1. List Head Insert: O(N) memory shift\nstudent_list.insert(0, item)  # Bottleneck!\n\n# 2. Deque Head Insert: O(1) block link\nstudent_deque.appendleft(item)  # Instant!`
    : selectedOperation === "FIFO_POP"
    ? `# 1. List FIFO Pop: O(N) memory shift\nitem = student_list.pop(0)  # O(N²) Queue Hazard!\n\n# 2. Deque FIFO Pop: O(1) unlinking\nitem = student_deque.popleft()  # 1000x Faster!`
    : `# Tail Appends: O(1) across all sequential structures\nstudent_list.append(item)\nstudent_deque.append(item)\nstudent_set.add(item)`
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
            Topic 1
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Performance Optimization, Profiling &amp; Big-O Thinking
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Data Structure Costs: <span className="text-teal-400">list, set, dict &amp; deque</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master the operational complexity, search latencies, memory layouts, and mutation characteristics of Python's primary built-in data structures: comparing linear <code className="text-rose-400 font-mono">list</code> scans (<code className="text-rose-400 font-mono">O(N)</code>) against instant <code className="text-emerald-400 font-mono">set</code> / <code className="text-emerald-400 font-mono">dict</code> hash lookups (<code className="text-emerald-400 font-mono">O(1)</code>), and replacing <code className="text-rose-400 font-mono">list.insert(0)</code> / <code className="text-rose-400 font-mono">pop(0)</code> bottlenecks with high-throughput <code className="text-cyan-300 font-mono">collections.deque</code>.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔍 O(1) Hash Table vs O(N) Scan
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ `collections.deque` O(1) FIFO
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🧠 Memory Layout &amp; Cache Locality
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🚀 10,000x Search Speedup
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: DATA STRUCTURE PILLARS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🏛️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Data Structure Architectural Landscape
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Selecting the appropriate data structure directly governs whether an operation executes in sub-microsecond time or causes multi-second backend lags:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ `list` (Dynamic Array)</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">O(1) index, O(N) search</code>
                <p className="text-[11px] text-slate-300">
                  Contiguous memory blocks. Ideal for ordered indexed iteration; severe bottleneck for FIFO queues and membership search.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ `set` (Hash Table)</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">O(1) search, O(1) add</code>
                <p className="text-[11px] text-slate-300">
                  Sparse hash bucket table. Delivers instant 10,000x faster membership checks (<code className="text-cyan-300 font-mono">x in s</code>) and uniqueness enforcement.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ `dict` (Key-Value)</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">O(1) key lookup / assign</code>
                <p className="text-[11px] text-slate-300">
                  Compact hash table with key-value associations. The backbone of fast foreign key indexing and metadata lookups.
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 shadow-lg">
                <div className="text-amber-400 font-bold text-sm mb-1">4️⃣ `deque` (Linked Blocks)</div>
                <code className="text-xs font-mono text-amber-300 block mb-1">O(1) head/tail push/pop</code>
                <p className="text-[11px] text-slate-300">
                  Doubly-linked 64-element blocks. Eliminates <code className="text-rose-400 font-mono">list.insert(0)</code> and <code className="text-rose-400 font-mono">pop(0)</code> memory shifting.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The FIFO Queue Anti-Pattern: Why `list.pop(0)` Destroys Performance
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                Popping from index 0 of a list (<code className="text-rose-400 font-mono">list.pop(0)</code>) forces CPython to shift all remaining N element pointers in memory (<code className="text-rose-400 font-mono">O(N)</code>). Processing a queue of 100,000 tasks turns into <code className="text-rose-400 font-mono">O(N²)</code> quadratic degradation (taking ~15 seconds)! Switching to <code className="text-teal-300 font-mono">deque.popleft()</code> executes in &lt;10 milliseconds (<code className="text-emerald-400 font-mono">O(1)</code>).
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
                2. Visualizing Memory Layouts, Search Traversal &amp; Head Shifting
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("memoryLayout")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "memoryLayout"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Memory Layouts
              </button>
              <button
                onClick={() => setActiveInteractiveTab("searchComplexity")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "searchComplexity"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Search Mechanics
              </button>
              <button
                onClick={() => setActiveInteractiveTab("headShiftHazard")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "headShiftHazard"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Head Shift Hazard
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining internal CPython memory layouts, hash bucket indexing vs contiguous scanning, and block pointer unlinking:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "memoryLayout" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">CPYTHON INTERNAL MEMORY ARCHITECTURES</text>

                {/* 3 Layout Boxes */}
                <g transform="translate(30, 50)">
                  {/* List */}
                  <rect x="0" y="0" width="250" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="15" y="30" fill="#99f6e4" fontSize="11 font-bold">1. List (Contiguous Array)</text>
                  <text x="15" y="55" fill="#38bdf8" fontSize="8 font-mono">[Ptr 0] [Ptr 1] [Ptr 2] [Ptr 3] ...</text>
                  
                  <text x="15" y="85" fill="#cbd5e1" fontSize="8">Contiguous array of C pointers.</text>
                  <text x="15" y="100" fill="#34d399" fontSize="8 font-mono">O(1) index: array_base + i * 8</text>
                  <text x="15" y="115" fill="#cbd5e1" fontSize="8">Excellent L1/L2 cache locality.</text>

                  <rect x="15" y="135" width="220" height="85" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="25" y="160" fill="#34d399" fontSize="9 font-bold">Best For:</text>
                  <text x="25" y="180" fill="#cbd5e1" fontSize="8">Ordered sequences, index access,</text>
                  <text x="25" y="195" fill="#cbd5e1" fontSize="8">and sorting via Timsort.</text>

                  {/* Set / Dict */}
                  <rect x="280" y="0" width="260" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="295" y="30" fill="#a5f3fc" fontSize="11 font-bold">2. Set / Dict (Hash Table)</text>
                  <text x="295" y="55" fill="#38bdf8" fontSize="8 font-mono">[Hash | Key | Value | Next]</text>

                  <text x="295" y="85" fill="#cbd5e1" fontSize="8">Sparse array of hash buckets.</text>
                  <text x="295" y="100" fill="#34d399" fontSize="8 font-mono">O(1) bucket = hash(key) &amp; mask</text>
                  <text x="295" y="115" fill="#cbd5e1" fontSize="8">Requires ~33% empty buffer space.</text>

                  <rect x="295" y="135" width="230" height="85" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="305" y="160" fill="#38bdf8" fontSize="9 font-bold">Best For:</text>
                  <text x="305" y="180" fill="#cbd5e1" fontSize="8">High-speed membership checks,</text>
                  <text x="305" y="195" fill="#cbd5e1" fontSize="8">uniqueness, and key lookups.</text>

                  {/* Deque */}
                  <rect x="570" y="0" width="250" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="585" y="30" fill="#c4b5fd" fontSize="11 font-bold">3. Deque (Doubly-Linked Blocks)</text>
                  <text x="585" y="55" fill="#c084fc" fontSize="8 font-mono">[Block A] &lt;---&gt; [Block B]</text>

                  <text x="585" y="85" fill="#cbd5e1" fontSize="8">Linked list of 64-item blocks.</text>
                  <text x="585" y="100" fill="#34d399" fontSize="8 font-mono">O(1) push/pop at head &amp; tail</text>
                  <text x="585" y="115" fill="#cbd5e1" fontSize="8">Zero array reallocation shifts.</text>

                  <rect x="585" y="135" width="220" height="85" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="595" y="160" fill="#c4b5fd" fontSize="9 font-bold">Best For:</text>
                  <text x="595" y="180" fill="#cbd5e1" fontSize="8">FIFO queues, rolling buffers,</text>
                  <text x="595" y="195" fill="#cbd5e1" fontSize="8">and producer-consumer pipelines.</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "searchComplexity" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">MEMBERSHIP SEARCH: LINEAR O(N) SCAN VS CONSTANT O(1) HASH BUCKET</text>

                {/* Left: List Scan */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="12" fontWeight="bold">`target in list` [O(N) LINEAR SCAN]</text>
                  
                  <text x="20" y="65" fill="#fca5a5" fontSize="8 font-mono">Item 0 == target? (No) -&gt; Item 1 == target? (No)...</text>
                  <text x="20" y="85" fill="#fca5a5" fontSize="8 font-mono">Must compare each element sequentially up to index N-1</text>
                  <text x="20" y="105" fill="#f43f5e" fontSize="8 font-mono font-bold">Latency at N=100,000: ~1.25 ms per query!</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#090d16" stroke="#e11d48" />
                  <text x="30" y="155" fill="#fda4af" fontSize="9 font-bold">The Loop Trap:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">Running this search inside a loop of 1,000 queries</text>
                  <text x="30" y="190" fill="#cbd5e1" fontSize="8">takes 1.25 seconds of pure CPU waste!</text>
                </g>

                {/* Right: Set Hash Lookup */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">`target in set` [O(1) HASH BUCKET]</text>

                  <text x="20" y="65" fill="#34d399" fontSize="8 font-mono">1. Compute `bucket = hash(target) &amp; mask`</text>
                  <text x="20" y="85" fill="#34d399" fontSize="8 font-mono">2. Direct RAM memory lookup at bucket index</text>
                  <text x="20" y="105" fill="#34d399" fontSize="8 font-mono font-bold">Latency at N=100,000: ~0.0001 ms (10,000x FASTER!)</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="155" fill="#34d399" fontSize="9 font-bold">Sub-Microsecond Scale:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">1,000 queries complete in under 0.1 milliseconds</text>
                  <text x="30" y="190" fill="#cbd5e1" fontSize="8">with zero server CPU saturation.</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">HEAD MUTATION: LIST O(N) MEMMOVE VS DEQUE O(1) BLOCK LINK</text>

                {/* Left: List Shifting */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="12" fontWeight="bold">`list.insert(0, x)` or `pop(0)` [O(N) SHIFT]</text>
                  
                  <text x="20" y="65" fill="#c084fc" fontSize="8 font-mono">[Index 0] [Index 1] [Index 2] ... [Index N-1]</text>
                  <text x="20" y="85" fill="#cbd5e1" fontSize="8 font-mono">CPython calls `memmove()` to shift ALL pointers right</text>
                  <text x="20" y="105" fill="#f43f5e" fontSize="8 font-mono font-bold">50,000 head insertions take ~1.85 seconds</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="30" y="155" fill="#c4b5fd" fontSize="9 font-bold">Memory Shifting Overhead:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">Copies hundreds of megabytes of raw pointers.</text>
                </g>

                {/* Right: Deque Link */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">`deque.appendleft(x)` or `popleft()` [O(1)]</text>

                  <text x="20" y="65" fill="#34d399" fontSize="8 font-mono">[New Head Pointer] &lt;--- Linked to ---&gt; [Block 1]</text>
                  <text x="20" y="85" fill="#34d399" fontSize="8 font-mono">Updates block node head pointer in strict O(1) time</text>
                  <text x="20" y="105" fill="#34d399" fontSize="8 font-mono font-bold">50,000 head insertions take ~2.8 ms (650x FASTER!)</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="155" fill="#34d399" fontSize="9 font-bold">Zero Pointer Shifting:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">The standard data structure for production queues.</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE LOOKUP LAB */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Data Structure Cost &amp; Latency Laboratory
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Select dataset size <code className="text-teal-300 font-mono">N</code>, switch between access patterns, and inspect real-time complexity and latency metrics across List, Set, Dict, and Deque:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Controls */}
            <div className="space-y-4">
              {/* N Selector */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                  1. Collection Dataset Size (N):
                </span>
                <div className="flex bg-slate-900 p-1.5 rounded-lg border border-slate-800 text-xs font-mono">
                  {[1000, 10000, 100000, 1000000].map((size) => (
                    <button
                      key={size}
                      onClick={() => setDatasetSizeN(size)}
                      className={clsx(
                        "flex-1 py-1 rounded transition-all",
                        datasetSizeN === size
                          ? "bg-teal-900/60 text-teal-300 font-bold border border-teal-700/80"
                          : "text-slate-400 hover:text-white"
                      )}
                    >
                      {size.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Operation Selector */}
              <div className="space-y-1.5 pt-1">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                  2. Operational Access Pattern:
                </span>
                <div className="grid grid-cols-2 gap-1.5 bg-slate-900 p-1.5 rounded-lg border border-slate-800 text-xs font-mono">
                  {[
                    { id: "SEARCH", label: "1. Search (x in ds)" },
                    { id: "HEAD_INSERT", label: "2. Head Insert (at 0)" },
                    { id: "FIFO_POP", label: "3. FIFO Pop (from 0)" },
                    { id: "TAIL_INSERT", label: "4. Tail Append" },
                  ].map((op) => (
                    <button
                      key={op.id}
                      onClick={() => setSelectedOperation(op.id)}
                      className={clsx(
                        "py-1.5 rounded transition-all",
                        selectedOperation === op.id
                          ? "bg-cyan-900/60 text-cyan-300 font-bold border border-cyan-700/80"
                          : "text-slate-400 hover:text-white"
                      )}
                    >
                      {op.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Multi-Structure Metrics */}
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono space-y-1.5">
                <div className="flex justify-between items-center text-slate-300">
                  <span className="font-bold text-teal-300">List:</span>
                  <span className="text-rose-400 font-bold">{listComplexity} (~{listLatency})</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span className="font-bold text-cyan-300">Set:</span>
                  <span className="text-emerald-400 font-bold">{setComplexity} (~{setLatency})</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span className="font-bold text-purple-300">Dict:</span>
                  <span className="text-emerald-400 font-bold">{dictComplexity} (~{dictLatency})</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span className="font-bold text-amber-300">Deque:</span>
                  <span className="text-teal-300 font-bold">{dequeComplexity} (~{dequeLatency})</span>
                </div>
              </div>
            </div>

            {/* Generated Code & Terminal Output */}
            <div className="space-y-4 flex flex-col justify-between">
              {/* Python Code Display */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
                <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  Python Implementation Comparison:
                </div>
                <pre className="text-teal-300 text-[11px] leading-relaxed break-all font-mono overflow-x-auto">
                  {generatedPythonSnippet}
                </pre>
              </div>

              {/* Terminal Telemetry */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex-1 overflow-y-auto max-h-[160px] font-mono text-xs space-y-1">
                <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400">
                  <span>Micro-Benchmark Telemetry:</span>
                  <span className="text-emerald-400">Exit Code 0</span>
                </div>
                <pre className="text-slate-200 text-[11px] leading-relaxed font-mono whitespace-pre-wrap">
                  {`[LOOKUP_PROFILER] Benchmark for N = ${datasetSizeN.toLocaleString()} elements:
* Target Pattern  : ${selectedOperation}
* List Cost       : ${listComplexity}
* Set Cost        : ${setComplexity}
* Deque Cost      : ${dequeComplexity}
* Performance     : SET is ~10,000x FASTER for membership queries.`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER LOOKUP MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Data Structure Complexity Reference Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Data Structure</th>
                  <th className="py-3.5 px-4 font-bold">Search (`in`)</th>
                  <th className="py-3.5 px-4 font-bold">Head (`insert/pop 0`)</th>
                  <th className="py-3.5 px-4 font-bold">Tail (`append/pop`)</th>
                  <th className="py-3.5 px-4 font-bold">Index Access (`[i]`)</th>
                  <th className="py-3.5 px-4 font-bold">Memory Footprint</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">`list`</td>
                  <td className="py-3 px-4 text-rose-400">`O(N)` Scan</td>
                  <td className="py-3 px-4 text-rose-400">`O(N)` Shift</td>
                  <td className="py-3 px-4 text-emerald-400">`O(1)` Amortized</td>
                  <td className="py-3 px-4 text-emerald-400">`O(1)` Direct</td>
                  <td className="py-3 px-4 text-teal-300">Low (Contiguous)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">`set`</td>
                  <td className="py-3 px-4 text-emerald-400">`O(1)` Hash</td>
                  <td className="py-3 px-4 text-slate-400">N/A (Unordered)</td>
                  <td className="py-3 px-4 text-emerald-400">`O(1)` Add/Remove</td>
                  <td className="py-3 px-4 text-slate-400">N/A</td>
                  <td className="py-3 px-4 text-amber-300">Medium (Sparse)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">`dict`</td>
                  <td className="py-3 px-4 text-emerald-400">`O(1)` Key Hash</td>
                  <td className="py-3 px-4 text-slate-400">N/A (Ordered)</td>
                  <td className="py-3 px-4 text-emerald-400">`O(1)` Set/Del</td>
                  <td className="py-3 px-4 text-emerald-400">`O(1)` Key</td>
                  <td className="py-3 px-4 text-purple-300">High (Key+Value)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">`deque`</td>
                  <td className="py-3 px-4 text-rose-400">`O(N)` Scan</td>
                  <td className="py-3 px-4 text-emerald-400">`O(1)` Link</td>
                  <td className="py-3 px-4 text-emerald-400">`O(1)` Link</td>
                  <td className="py-3 px-4 text-rose-300">`O(N)` Mid-Traverse</td>
                  <td className="py-3 px-4 text-amber-300">Medium (Blocks)</td>
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
            Explore 4 production-grade Python scripts demonstrating data structure search benchmarks, FIFO mutation costs, memory footprint profiling, and roster query optimizers:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "data_structure_lookup_and_search_benchmarks.py",
                code: lookupBenchCode,
                description: "Search latency comparisons across list, set, dict, and deque.",
              },
              {
                filename: "insertion_deletion_and_fifo_lifo_costs.py",
                code: mutationCostsCode,
                description: "Head/tail insertion and deletion cost differences between list and deque.",
              },
              {
                filename: "memory_overhead_and_cache_locality.py",
                code: memoryOverheadCode,
                description: "sys.getsizeof comparisons across tuple, list, set, dict, and deque.",
              },
              {
                filename: "institutional_admission_roster_lookup_optimizer.py",
                code: rosterOptCode,
                description: "50,000 student candidate verification benchmarks across list, set, dict, and deque.",
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
                <span>❌</span> Trap 1: Using `list.pop(0)` for FIFO Queues
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Popping from the front of a list shifts all remaining elements in memory (<code className="text-rose-300 font-mono">O(N)</code>), turning queue processing into <code className="text-rose-300 font-mono">O(N²)</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Always use <code className="text-emerald-300">collections.deque.popleft()</code>.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Assuming `dict.values()` is O(1)
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Checking <code className="text-amber-300 font-mono">val in my_dict.values()</code> performs a linear scan (<code className="text-slate-300 font-mono">O(N)</code>) because values are not indexed by the hash table.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Query by key (<code className="text-emerald-300">key in my_dict</code>) for <code className="text-emerald-300">O(1)</code> lookups.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Indexing into Deque Middle
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Accessing <code className="text-purple-300 font-mono">my_deque[50000]</code> traverses linked blocks in <code className="text-slate-300 font-mono">O(N)</code> time, unlike list index access (<code className="text-emerald-300 font-mono">O(1)</code>).
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use standard lists when frequent random index access is needed.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Constructing Sets Inside Loops
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-cyan-300 font-mono">if item in set(other_list):</code> rebuilds the entire set on every single iteration, destroying performance.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Hoist set creation outside the loop once.
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
            Comprehensive question-and-answer repository covering data structure lookup costs, dynamic arrays, hash tables, deques, and memory profiling:
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
            Download or print the complete reference sheet with lookup cost matrices, mutation rules, and data structure selection recipes:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic1_data_structure_lookup_costs_notes.txt"
              title="Print Topic 1 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
