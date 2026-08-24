import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import unorderedDemo from "./topic3_files/unordered_demo.py?raw";
import noIndexingSlicing from "./topic3_files/no_indexing_slicing.py?raw";
import hashRandomization from "./topic3_files/hash_randomization.py?raw";
import orderedAlternatives from "./topic3_files/ordered_alternatives.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic3_files/topic3_note.txt?raw";

// FAQ Questions
import questions from "./topic3_files/topic3_questions";

/**
 * Topic3: Unordered and Unindexed Collections in Python
 * Module: 002_006_sets
 * Segment: 2 (Practical Python for Real-World Development)
 *
 * Deep dive into why sets have no indices, memory architecture differences
 * (contiguous lists vs sparse hash tables), PYTHONHASHSEED, and order-preserving workarounds.
 */
export default function Topic3() {
  const sectionRefs = useRef([]);
  const [activeTab, setActiveTab] = useState("memory");

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
            Topic 3
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Memory & Iteration Models
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Unordered & Unindexed Collections
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Understanding why sets disallow <code className="text-rose-400 font-mono">s[0]</code>, how sparse hash tables differ from contiguous arrays, and why <code className="text-sky-400 font-mono">PYTHONHASHSEED</code> protects against DoS attacks.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🚫 No Positional Indexing
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🎲 Non-Deterministic Iteration
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ Security Hash Seed
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📋 dict.fromkeys() Ordering
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: WHY SETS ARE UNORDERED & UNINDEXED */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧩</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Design Tradeoff: Speed vs Indexing
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              In Python, collections face a classic architectural choice: <strong className="text-emerald-400">Positional Ordering</strong> (like Lists and Tuples) vs <strong className="text-sky-400">High-Speed Hash Lookups</strong> (like Sets and Dictionaries).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-6 not-prose">
              {/* List Memory */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-amber-800/60 shadow-lg shadow-amber-950/30 transition-all duration-300 hover:border-amber-500">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-lg">
                    <span>📜</span> List Architecture
                  </div>
                  <span className="text-xs font-mono bg-amber-950 text-amber-300 px-2 py-0.5 rounded border border-amber-800">
                    Contiguous Array
                  </span>
                </div>
                <p className="text-sm text-slate-300 mb-3">
                  Stores pointers in sequential physical order (<code className="text-amber-300 font-mono">0, 1, 2, 3...</code>). Indexing (<code className="text-amber-300 font-mono">l[0]</code>) and slicing (<code className="text-amber-300 font-mono">l[1:3]</code>) are supported in <strong className="text-white">O(1)</strong> time, but searching by value takes slow <span className="text-rose-400 font-semibold">O(N)</span> time.
                </p>
              </div>

              {/* Set Memory */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-emerald-800/60 shadow-lg shadow-emerald-950/30 transition-all duration-300 hover:border-emerald-500">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg">
                    <span>⚡</span> Set Architecture
                  </div>
                  <span className="text-xs font-mono bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
                    Sparse Hash Table
                  </span>
                </div>
                <p className="text-sm text-slate-300 mb-3">
                  Scatters items across hash buckets based purely on <code className="text-emerald-300 font-mono">hash(x)</code>. There is NO first or last slot. Value search executes in instant <strong className="text-emerald-400">O(1)</strong> time, but numerical indexing is impossible.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-rose-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-2">
                Why Does <code className="text-rose-400 font-mono">s[0]</code> Raise TypeError?
              </h3>
              <p className="text-sm sm:text-base text-slate-300">
                Because sets are implemented as an open-addressing hash array with gaps and empty slots. An item's bucket index can change whenever the set resizes. Hence, Python strictly prohibits subscripting (<code className="text-rose-300 font-mono">TypeError: 'set' object is not subscriptable</code>).
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 2: INTERACTIVE SVG MEMORY VISUALIZER */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🔬</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                2. Comparing Memory Structures: List vs Set
              </h2>
            </div>

            {/* Toggle Tabs */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveTab("memory")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeTab === "memory"
                    ? "bg-emerald-900/50 text-emerald-300 border border-emerald-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Memory Layout Contrast
              </button>
              <button
                onClick={() => setActiveTab("seed")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeTab === "seed"
                    ? "bg-sky-900/50 text-sky-300 border border-sky-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Hash Seed Randomization
              </button>
            </div>
          </div>

          {/* SVG Diagram Canvas */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeTab === "memory" ? (
              <svg viewBox="0 0 850 340" className="w-full h-auto min-w-[650px] font-sans">
                {/* Top: List Sequential Array */}
                <text x="30" y="30" fill="#fbbf24" fontSize="13" fontWeight="bold">1. LIST MEMORY: CONTIGUOUS POINTER ARRAY (INDEXABLE)</text>

                {/* Slots 0, 1, 2, 3 */}
                <g>
                  <rect x="30" y="45" width="180" height="55" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="45" y="70" fill="#fbbf24" fontSize="12" fontWeight="bold">Index [0]:</text>
                  <text x="110" y="70" fill="#ffffff" fontSize="12">"Kolkata"</text>
                  <text x="45" y="90" fill="#64748b" fontSize="10">Offset: base + 0*8</text>
                </g>

                <g>
                  <rect x="220" y="45" width="180" height="55" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="235" y="70" fill="#fbbf24" fontSize="12" fontWeight="bold">Index [1]:</text>
                  <text x="300" y="70" fill="#ffffff" fontSize="12">"Barrackpore"</text>
                  <text x="235" y="90" fill="#64748b" fontSize="10">Offset: base + 1*8</text>
                </g>

                <g>
                  <rect x="410" y="45" width="180" height="55" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="425" y="70" fill="#fbbf24" fontSize="12" fontWeight="bold">Index [2]:</text>
                  <text x="490" y="70" fill="#ffffff" fontSize="12">"Ichapur"</text>
                  <text x="425" y="90" fill="#64748b" fontSize="10">Offset: base + 2*8</text>
                </g>

                <g>
                  <rect x="600" y="45" width="220" height="55" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                  <text x="615" y="70" fill="#34d399" fontSize="12" fontWeight="bold">Direct list[0] → O(1)</text>
                  <text x="615" y="90" fill="#a7f3d0" fontSize="10">Guaranteed sequential index</text>
                </g>

                {/* Bottom: Set Sparse Hash Table */}
                <text x="30" y="160" fill="#38bdf8" fontSize="13" fontWeight="bold">2. SET MEMORY: SPARSE HASH TABLE BUCKETS (UNINDEXED)</text>

                {/* Bucket Array */}
                <rect x="30" y="175" width="150" height="50" rx="6" fill="#1e293b" stroke="#334155" />
                <text x="45" y="205" fill="#64748b" fontSize="11" fontWeight="bold">Bucket [0]: &lt;EMPTY&gt;</text>

                <rect x="190" y="175" width="190" height="50" rx="6" fill="#1e293b" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="205" y="200" fill="#38bdf8" fontSize="12" fontWeight="bold">Bucket [1]:</text>
                <text x="275" y="200" fill="#ffffff" fontSize="12">"Barrackpore"</text>
                <text x="205" y="218" fill="#64748b" fontSize="10">hash("Barrackpore") → 1</text>

                <rect x="390" y="175" width="150" height="50" rx="6" fill="#1e293b" stroke="#334155" />
                <text x="405" y="205" fill="#64748b" fontSize="11" fontWeight="bold">Bucket [2]: &lt;EMPTY&gt;</text>

                <rect x="550" y="175" width="170" height="50" rx="6" fill="#1e293b" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="565" y="200" fill="#38bdf8" fontSize="12" fontWeight="bold">Bucket [3]:</text>
                <text x="635" y="200" fill="#ffffff" fontSize="12">"Kolkata"</text>
                <text x="565" y="218" fill="#64748b" fontSize="10">hash("Kolkata") → 3</text>

                {/* Bottom Result Box */}
                <rect x="30" y="245" width="790" height="70" rx="8" fill="#0f172a" stroke="#ef4444" strokeWidth="1.5" />
                <text x="50" y="275" fill="#fca5a5" fontSize="13" fontWeight="bold">
                  ❌ Calling my_set[0] raises TypeError: 'set' object is not subscriptable!
                </text>
                <text x="50" y="298" fill="#94a3b8" fontSize="11">
                  Why? Bucket [0] is empty. There is no contiguous index 0, 1, 2. Elements sit only where hash(x) dictates!
                </text>
              </svg>
            ) : (
              <svg viewBox="0 0 850 320" className="w-full h-auto min-w-[650px] font-sans">
                <text x="30" y="35" fill="#f8fafc" fontSize="15" fontWeight="bold">PYTHONHASHSEED Security & Non-Deterministic String Ordering</text>

                {/* Process 1 */}
                <rect x="30" y="65" width="380" height="220" rx="10" fill="#1e293b" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="50" y="95" fill="#38bdf8" fontSize="14" fontWeight="bold">Python Process 1 (Seed = 0x4F91...)</text>
                <text x="50" y="125" fill="#cbd5e1" fontSize="12">hash("Barrackpore") → Bucket 1</text>
                <text x="50" y="150" fill="#cbd5e1" fontSize="12">hash("Kolkata")     → Bucket 5</text>
                <text x="50" y="175" fill="#cbd5e1" fontSize="12">hash("Ichapur")     → Bucket 7</text>

                <rect x="50" y="200" width="340" height="40" rx="6" fill="#0c4a6e" stroke="#0ea5e9" />
                <text x="65" y="225" fill="#bae6fd" fontSize="12" fontWeight="bold">Iteration: {'{"Barrackpore", "Kolkata", "Ichapur"}'}</text>

                {/* Process 2 */}
                <rect x="440" y="65" width="380" height="220" rx="10" fill="#1e293b" stroke="#a855f7" strokeWidth="1.5" />
                <text x="460" y="95" fill="#c084fc" fontSize="14" fontWeight="bold">Python Process 2 (Seed = 0x8B22...)</text>
                <text x="460" y="125" fill="#cbd5e1" fontSize="12">hash("Ichapur")     → Bucket 0</text>
                <text x="460" y="150" fill="#cbd5e1" fontSize="12">hash("Kolkata")     → Bucket 2</text>
                <text x="460" y="175" fill="#cbd5e1" fontSize="12">hash("Barrackpore") → Bucket 6</text>

                <rect x="460" y="200" width="340" height="40" rx="6" fill="#4a044e" stroke="#a855f7" />
                <text x="475" y="225" fill="#f5d0fe" fontSize="12" fontWeight="bold">Iteration: {'{"Ichapur", "Kolkata", "Barrackpore"}'}</text>
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
                Lab A: Unordered Insertion & Small Integer Coincidences
              </h3>
              <PythonFileLoader
                fileModule={unorderedDemo}
                title="unordered_demo.py"
                highlightLines={[6, 12, 18]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab B: Trapping TypeError & Proper Workaround Techniques
              </h3>
              <PythonFileLoader
                fileModule={noIndexingSlicing}
                title="no_indexing_slicing.py"
                highlightLines={[9, 16, 21, 26]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab C: Security Hash Seed Randomization (PYTHONHASHSEED)
              </h3>
              <PythonFileLoader
                fileModule={hashRandomization}
                title="hash_randomization.py"
                highlightLines={[6, 13, 19]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab D: Deduplication with Order Preservation (dict.fromkeys & ₹ Fees)
              </h3>
              <PythonFileLoader
                fileModule={orderedAlternatives}
                title="ordered_alternatives.py"
                highlightLines={[16, 22, 28]}
              />
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: REAL-WORLD SCENARIOS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🌍</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Industry Scenarios in West Bengal
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">💳</span> 1. Webhook Timeline Idempotency
              </div>
              <p className="text-sm text-slate-300">
                Payment gateways serving students in <strong>Barrackpore</strong> process admission fee events in Indian Rupees (<strong className="text-emerald-300">₹4,500, ₹6,500</strong>). Using <code className="font-mono text-emerald-400">dict.fromkeys()</code> preserves the true timeline order while filtering duplicate webhook retries.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-sky-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">🧪</span> 2. Flaky Unit Test Prevention
              </div>
              <p className="text-sm text-slate-300">
                Software QA engineers avoid writing <code className="font-mono text-sky-400">assert str(output_set) == "..."</code> because string hash seeds randomize print order between CI/CD test runs. Asserting <code className="font-mono text-emerald-400">assert output_set == expected</code> is 100% reliable.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-purple-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">🎲</span> 3. Fair Random Prize Draws
              </div>
              <p className="text-sm text-slate-300">
                When Mamata conducts a student lottery in <strong>Kolkata</strong>, passing a set directly to <code className="font-mono text-purple-400">random.choice()</code> fails with TypeError. Converting via <code className="font-mono text-emerald-400">random.choice(list(students))</code> ensures fair, error-free prize selection.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-amber-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">⚡</span> 4. High-Throughput Search Engines
              </div>
              <p className="text-sm text-slate-300">
                Search engines trade sequential index capabilities for <span className="font-semibold text-emerald-400">O(1)</span> inverted index membership lookups across millions of document tokens in <strong>Jadavpur</strong> research labs.
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
              5. Pitfalls & Traps with Unordered Sets
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 1: Modifying Set During Iteration
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Calling <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">s.remove(x)</code> inside <code className="font-mono">for x in s:</code> raises <code className="text-rose-400 font-bold">RuntimeError: Set changed size during iteration</code>. Iterate over <code className="font-mono text-emerald-400">s.copy()</code> instead.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 2: Expecting pop() to Remove Last Item
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                In lists, <code className="font-mono">l.pop()</code> removes the last item. In sets, <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">s.pop()</code> removes an arbitrary element based on the first occupied hash bucket!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 3: Assuming Integer Sorting is Guaranteed
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Small integers like {1, 2, 3} appear sorted only because <code className="font-mono">hash(n) == n</code>. This is a CPython internal detail, not a language specification!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 4: Calling reversed() on a Set
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">reversed(my_set)</code> fails with <code className="text-rose-400 font-bold">TypeError: 'set' object is not reversible</code>. Sort with <code className="font-mono text-emerald-400">sorted(s, reverse=True)</code>.
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
            title="Topic 3: Unordered and Unindexed Collections Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Printable Study Note"
            downloadFileName="topic3_unordered_unindexed_sets_note.txt"
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQS (30 COMPREHENSIVE QUESTIONS) */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <FAQTemplate
            title="Topic 3 • Unordered & Unindexed Sets: Master Viva & Review Questions"
            questions={questions}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: TEACHER'S NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <Teacher
            note="Teacher's Key Insight: Never fight the nature of a data structure. If you need positional sequence indices, use a list. If you need lightning-fast O(1) membership and guaranteed uniqueness, use a set. And if Abhronila and Debangshu in Barrackpore need both order and uniqueness, list(dict.fromkeys(data)) is your magic wand!"
          />
        </section>

      </div>
    </div>
  );
}
