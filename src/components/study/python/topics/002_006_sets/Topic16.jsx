import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import dataComp from "./topic16_files/data_structures_comparison.py?raw";
import memBench from "./topic16_files/memory_and_lookup_benchmark.py?raw";
import decisionMatrix from "./topic16_files/decision_matrix_flow.py?raw";
import ecommerceCart from "./topic16_files/ecommerce_order_processing.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic16_files/topic16_note.txt?raw";

// FAQ Questions
import questions from "./topic16_files/topic16_questions";

/**
 * Topic16: Sets vs Lists vs Tuples
 * Module: 002_006_sets
 * Segment: 2 (Practical Python for Real-World Development)
 *
 * Comprehensive architectural comparison: Sets vs Lists vs Tuples
 * across mutability, ordering, uniqueness, indexing, memory footprint,
 * lookup benchmarks, and real-world e-commerce synergy.
 */
export default function Topic16() {
  const sectionRefs = useRef([]);
  const [activeTab, setActiveTab] = useState("grid");

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
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans p-4 sm:p-6 md:p-10 pb-28 selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Scoped Keyframes for Lightweight Zero-Config Micro-Animations */}
      <style>{`
        .section-hidden {
          transform: translateY(18px);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .section-visible {
          transform: translateY(0);
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
          <span className="text-xs sm:text-sm font-mono font-semibold bg-emerald-950/80 text-emerald-300 px-3 py-1 rounded-full border border-emerald-800/80 shadow-sm shadow-emerald-950/50">
            Segment 2 • Module 002_006
          </span>
          <span className="text-xs sm:text-sm font-mono bg-sky-950/80 text-sky-300 px-3 py-1 rounded-full border border-sky-800/80 shadow-sm shadow-sky-950/50">
            Topic 16
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Architectural Container Selection
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Sets vs Lists vs Tuples
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Mastering Python&apos;s core data containers: in-depth comparative analysis across mutability, ordering, duplicates, <code className="text-emerald-400 font-mono">O(1)</code> lookup speed, and memory footprints.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📋 Dynamic Array: List
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔒 Immutable Record: Tuple
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ Hash Set: Set
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📊 Decision Matrix Guide
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: 3-WAY COMPARISON OVERVIEW */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚖️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Tri-Container Architecture
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Each built-in Python container is engineered for a specific data access pattern:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Card 1: List */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-sky-800/60 shadow-lg shadow-sky-950/30 transition-all duration-300 hover:border-sky-500">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-sky-400 font-bold text-lg">
                    <span>1.</span> List [ ]
                  </div>
                  <span className="text-xs font-mono bg-sky-950 text-sky-300 px-2 py-0.5 rounded border border-sky-800">
                    Dynamic Array
                  </span>
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  Mutable sequence allowing duplicates.
                </p>
                <div className="text-xs font-mono text-sky-300 bg-slate-900 p-2 rounded">
                  Indexable • O(N) Lookup • General
                </div>
              </div>

              {/* Card 2: Tuple */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-purple-800/60 shadow-lg shadow-purple-950/30 transition-all duration-300 hover:border-purple-500">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-purple-400 font-bold text-lg">
                    <span>2.</span> Tuple ( )
                  </div>
                  <span className="text-xs font-mono bg-purple-950 text-purple-300 px-2 py-0.5 rounded border border-purple-800">
                    Fixed Record
                  </span>
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  Immutable sequence with lowest RAM footprint.
                </p>
                <div className="text-xs font-mono text-purple-300 bg-slate-900 p-2 rounded">
                  Hashable • Indexable • Compact
                </div>
              </div>

              {/* Card 3: Set */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-emerald-800/60 shadow-lg shadow-emerald-950/30 transition-all duration-300 hover:border-emerald-500">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg">
                    <span>3.</span> Set {'{ }'}
                  </div>
                  <span className="text-xs font-mono bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
                    Hash Table
                  </span>
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  Mutable collection of strictly unique elements.
                </p>
                <div className="text-xs font-mono text-emerald-300 bg-slate-900 p-2 rounded">
                  O(1) Lookup • Unordered • Set Math
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 2: INTERACTIVE SVG VISUALIZER */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📊</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                2. Visualizing Memory Footprint &amp; Lookup Performance
              </h2>
            </div>

            {/* Toggle Tabs */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveTab("grid")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeTab === "grid"
                    ? "bg-emerald-900/50 text-emerald-300 border border-emerald-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                9-Dimensional Comparison Grid
              </button>
              <button
                onClick={() => setActiveTab("speedmem")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeTab === "speedmem"
                    ? "bg-sky-900/50 text-sky-300 border border-sky-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Speed vs Memory Spectrum
              </button>
            </div>
          </div>

          {/* SVG Diagram Canvas */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeTab === "grid" ? (
              <svg viewBox="0 0 850 320" className="w-full h-auto min-w-[650px] font-sans">
                {/* Table Header */}
                <rect x="20" y="20" width="810" height="35" rx="6" fill="#1e293b" stroke="#334155" />
                <text x="35" y="43" fill="#38bdf8" fontSize="12" fontWeight="bold">DIMENSION</text>
                <text x="240" y="43" fill="#38bdf8" fontSize="12" fontWeight="bold">LIST (list)</text>
                <text x="440" y="43" fill="#c084fc" fontSize="12" fontWeight="bold">TUPLE (tuple)</text>
                <text x="640" y="43" fill="#34d399" fontSize="12" fontWeight="bold">SET (set)</text>

                {/* Row 1 */}
                <rect x="20" y="60" width="810" height="30" fill="#0f172a" />
                <text x="35" y="80" fill="#cbd5e1" fontSize="11" fontWeight="bold">Mutability</text>
                <text x="240" y="80" fill="#38bdf8" fontSize="11">Mutable</text>
                <text x="440" y="80" fill="#f5d0fe" fontSize="11">Immutable</text>
                <text x="640" y="80" fill="#34d399" fontSize="11">Mutable</text>

                {/* Row 2 */}
                <rect x="20" y="92" width="810" height="30" fill="#020617" />
                <text x="35" y="112" fill="#cbd5e1" fontSize="11" fontWeight="bold">Ordering</text>
                <text x="240" y="112" fill="#38bdf8" fontSize="11">Ordered (0, 1, 2...)</text>
                <text x="440" y="112" fill="#f5d0fe" fontSize="11">Ordered (0, 1, 2...)</text>
                <text x="640" y="112" fill="#fca5a5" fontSize="11">Unordered</text>

                {/* Row 3 */}
                <rect x="20" y="124" width="810" height="30" fill="#0f172a" />
                <text x="35" y="144" fill="#cbd5e1" fontSize="11" fontWeight="bold">Duplicates</text>
                <text x="240" y="144" fill="#38bdf8" fontSize="11">Allowed</text>
                <text x="440" y="144" fill="#f5d0fe" fontSize="11">Allowed</text>
                <text x="640" y="144" fill="#34d399" fontSize="11" fontWeight="bold">Prohibited (Unique)</text>

                {/* Row 4 */}
                <rect x="20" y="156" width="810" height="30" fill="#020617" />
                <text x="35" y="176" fill="#cbd5e1" fontSize="11" fontWeight="bold">Indexing / Slicing</text>
                <text x="240" y="176" fill="#38bdf8" fontSize="11">YES (data[i])</text>
                <text x="440" y="176" fill="#f5d0fe" fontSize="11">YES (data[i])</text>
                <text x="640" y="176" fill="#ef4444" fontSize="11">NO (TypeError)</text>

                {/* Row 5 */}
                <rect x="20" y="188" width="810" height="30" fill="#0f172a" />
                <text x="35" y="208" fill="#cbd5e1" fontSize="11" fontWeight="bold">Membership &apos;in&apos;</text>
                <text x="240" y="208" fill="#fbbf24" fontSize="11">O(N) Linear Scan</text>
                <text x="440" y="208" fill="#fbbf24" fontSize="11">O(N) Linear Scan</text>
                <text x="640" y="208" fill="#34d399" fontSize="11" fontWeight="bold">O(1) Instant Hash</text>

                {/* Row 6 */}
                <rect x="20" y="220" width="810" height="30" fill="#020617" />
                <text x="35" y="240" fill="#cbd5e1" fontSize="11" fontWeight="bold">Dict Key Legality</text>
                <text x="240" y="240" fill="#ef4444" fontSize="11">NO (Unhashable)</text>
                <text x="440" y="240" fill="#34d399" fontSize="11" fontWeight="bold">YES (If items hashable)</text>
                <text x="640" y="240" fill="#ef4444" fontSize="11">NO (frozenset YES)</text>

                {/* Row 7 */}
                <rect x="20" y="252" width="810" height="30" fill="#0f172a" />
                <text x="35" y="272" fill="#cbd5e1" fontSize="11" fontWeight="bold">Set Math (|, &amp;, -)</text>
                <text x="240" y="272" fill="#ef4444" fontSize="11">NO</text>
                <text x="440" y="272" fill="#ef4444" fontSize="11">NO</text>
                <text x="640" y="272" fill="#34d399" fontSize="11" fontWeight="bold">YES (Complete Algebra)</text>
              </svg>
            ) : (
              <svg viewBox="0 0 850 320" className="w-full h-auto min-w-[650px] font-sans">
                <text x="30" y="35" fill="#f8fafc" fontSize="15" fontWeight="bold">
                  Memory Footprint vs Lookup Speed Trade-off
                </text>

                {/* Left: Memory */}
                <rect x="30" y="65" width="380" height="220" rx="10" fill="#1e293b" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="50" y="95" fill="#38bdf8" fontSize="14" fontWeight="bold">Memory Footprint (100K Items)</text>
                <text x="50" y="130" fill="#cbd5e1" fontSize="12">1. Tuple: 800 KB (Most Compact)</text>
                <rect x="50" y="140" width="100" height="15" rx="3" fill="#a855f7" />

                <text x="50" y="180" fill="#cbd5e1" fontSize="12">2. List: 824 KB (~1.03x tuple)</text>
                <rect x="50" y="190" width="110" height="15" rx="3" fill="#0ea5e9" />

                <text x="50" y="230" fill="#cbd5e1" fontSize="12">3. Set: 8,388 KB (~10x tuple overhead!)</text>
                <rect x="50" y="240" width="320" height="15" rx="3" fill="#10b981" />

                {/* Right: Speed */}
                <rect x="440" y="65" width="380" height="220" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                <text x="460" y="95" fill="#34d399" fontSize="14" fontWeight="bold">Membership Lookup Time (1K Queries)</text>
                <text x="460" y="130" fill="#cbd5e1" fontSize="12">1. List: 1.8420 seconds (O(N) Slow)</text>
                <rect x="460" y="140" width="320" height="15" rx="3" fill="#ef4444" />

                <text x="460" y="180" fill="#cbd5e1" fontSize="12">2. Tuple: 1.8150 seconds (O(N) Slow)</text>
                <rect x="460" y="190" width="310" height="15" rx="3" fill="#f59e0b" />

                <text x="460" y="230" fill="#cbd5e1" fontSize="12">3. Set: 0.0006 seconds (O(1) 3,000x FASTER!)</text>
                <rect x="460" y="240" width="15" height="15" rx="3" fill="#10b981" />
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: CODE LABS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 space-y-8"
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">💻</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Python Code Labs
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab A: Feature-by-Feature Behavioral Demonstration
              </h3>
              <PythonFileLoader
                fileModule={dataComp}
                title="data_structures_comparison.py"
                highlightLines={[6, 14, 21]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab B: Memory Footprint &amp; Membership Lookup Benchmarking
              </h3>
              <PythonFileLoader
                fileModule={memBench}
                title="memory_and_lookup_benchmark.py"
                highlightLines={[6, 14, 25, 31]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab C: Architectural Decision Flow Engine
              </h3>
              <PythonFileLoader
                fileModule={decisionMatrix}
                title="decision_matrix_flow.py"
                highlightLines={[6, 15, 18, 21]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab D: Real-World E-Commerce Cart, Promos &amp; Fees in ₹
              </h3>
              <PythonFileLoader
                fileModule={ecommerceCart}
                title="ecommerce_order_processing.py"
                highlightLines={[6, 11, 15, 25, 30]}
              />
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: REAL-WORLD APPLICATIONS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🏛️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Industry Applications in West Bengal
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-purple-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">📍</span> 1. GPS Tracking Records (Tuples)
              </div>
              <p className="text-sm text-slate-300">
                Logistics fleets tracking delivery vehicles in <strong>Barrackpore</strong> store fixed geographic coordinates as immutable tuples <code className="font-mono text-purple-400">(22.76, 88.36)</code>, conserving memory and preventing accidental position overwrites.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-sky-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">🛒</span> 2. Dynamic Shopping Cart Buffers (Lists)
              </div>
              <p className="text-sm text-slate-300">
                E-commerce checkouts in <strong>Kolkata</strong> maintain customer item sequences in mutable lists, enabling dynamic addition, deletion, and recalculation of total cart value in Indian Rupees (<strong className="text-emerald-300">₹8,000 subtotal</strong>).
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">🎟️</span> 3. Coupon Code Validation (Sets)
              </div>
              <p className="text-sm text-slate-300">
                Payment gateways in <strong>Ichapur</strong> validate promotional discount coupons using <code className="font-mono text-emerald-400">code in ACTIVE_PROMOS</code>, verifying eligibility in O(1) time without blocking checkout traffic.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-amber-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">🔑</span> 4. Multi-Attribute Cache Keys (Tuples in Sets)
              </div>
              <p className="text-sm text-slate-300">
                High-throughput caching tiers in <strong>Jadavpur</strong> store compound query keys as sets of tuples <code className="font-mono text-amber-400">{"{(user_id, session_id)}"}</code>, providing instantaneous O(1) state resolution.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 5: COMMON PITFALLS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚠️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              5. Pitfalls &amp; Architectural Anti-Patterns
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 1: Using Lists for Lookups
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Checking <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">if item in huge_list</code> forces an O(N) scan. On 100K items, this is 3,000x slower than a set lookup!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 2: Indexing Sets
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Writing <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">my_set[0]</code> raises <code className="text-rose-400 font-bold">TypeError</code>. Sets are unordered; use a list or tuple if you need positional indexing!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 3: Storing Mutable Lists in Sets
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">s.add([1, 2])</code> fails with TypeError. Convert the inner list to a tuple <code className="font-mono text-emerald-400">s.add((1, 2))</code>!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 4: Memory Bloat with Excessive Sets
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Sets consume ~8-10x more RAM than tuples. If you have 50 million static records without lookup requirements, prefer compact tuples!
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 6: PRINTABLE STUDY NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <PlainTextPrint
            content={noteText}
            title="Topic 16: Sets vs Lists vs Tuples Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Printable Study Note"
            downloadFileName="topic16_sets_vs_lists_vs_tuples_note.txt"
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQS (30 COMPREHENSIVE QUESTIONS) */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <FAQTemplate
            title="Topic 16 • Sets vs Lists vs Tuples: Master Viva & Review Questions"
            questions={questions}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: TEACHER'S NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <Teacher
            note="Teacher's Architectural Guideline: Every great software engineer understands the trade-offs of their data structures! In Barrackpore and Kolkata, when Susmita, Mamata, and Debangshu design backends: use Tuples for compact immutable records, Lists for ordered dynamic sequences, and Sets whenever you need uniqueness or O(1) membership lookups. Use the right container for the right job and your software will fly!"
          />
        </section>

      </div>
    </div>
  );
}
