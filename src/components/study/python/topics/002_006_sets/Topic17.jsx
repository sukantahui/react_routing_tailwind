import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import hashBench from "./topic17_files/hash_table_mechanics_benchmark.py?raw";
import scalingCurves from "./topic17_files/set_vs_list_scaling_curves.py?raw";
import algebraPerf from "./topic17_files/algebra_vs_loop_performance.py?raw";
import taxFilter from "./topic17_files/million_records_tax_filter.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic17_files/topic17_note.txt?raw";

// FAQ Questions
import questions from "./topic17_files/topic17_questions";

/**
 * Topic17: Performance Benefits of Sets
 * Module: 002_006_sets
 * Segment: 2 (Practical Python for Real-World Development)
 *
 * In-depth technical analysis of set performance: O(1) hash lookups,
 * asymptotic scaling curves, C-level set algebra optimization vs Python bytecode loops,
 * space-time economics, and high-throughput financial auditing.
 */
export default function Topic17() {
  const sectionRefs = useRef([]);
  const [activeTab, setActiveTab] = useState("curves");

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
            Topic 17
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Algorithmic Complexity &amp; Optimization
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Performance Benefits of Sets
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Unlocking extreme computational performance in Python: mastering <code className="text-emerald-400 font-mono">O(1)</code> direct bucket hashing, comparing C-level set algebra against bytecode loops, and managing space-time economics.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ O(1) Constant Time Lookups
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🚀 3,000x Speedup over Lists
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📐 Asymptotic Scaling Curves
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚖️ Space-Time Economic Balance
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: THE MATHEMATICS OF O(1) HASH TABLES */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🔬</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Mathematics of O(1) Hash Tables
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              When a Python program checks <code className="text-emerald-300 font-mono">x in my_list</code>, the CPU is forced to inspect every pointer from index <code className="font-mono text-white">0</code> up to <code className="font-mono text-white">N-1</code>. But when checking <code className="text-emerald-300 font-mono">x in my_set</code>, Python calculates:
            </p>

            <div className="p-5 rounded-xl bg-slate-950 border border-emerald-800/80 shadow-2xl not-prose my-6 font-mono text-sm sm:text-base text-emerald-300">
              bucket_index = hash(x) &amp; (table_size - 1)
            </div>

            <p>
              This bitwise masking operation maps any hash code to a direct memory offset in <strong className="text-emerald-400">nanoseconds</strong>. Whether the set contains 10 elements or 10,000,000 elements, computing the bucket index takes the exact same number of CPU cycles.
            </p>
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
              <span className="text-3xl">📈</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                2. Visualizing Asymptotic Scaling &amp; Hash Indexing
              </h2>
            </div>

            {/* Toggle Tabs */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveTab("curves")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeTab === "curves"
                    ? "bg-emerald-900/50 text-emerald-300 border border-emerald-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Time Scaling Curves
              </button>
              <button
                onClick={() => setActiveTab("hashing")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeTab === "hashing"
                    ? "bg-sky-900/50 text-sky-300 border border-sky-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Direct Bucket Addressing
              </button>
            </div>
          </div>

          {/* SVG Diagram Canvas */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeTab === "curves" ? (
              <svg viewBox="0 0 850 320" className="w-full h-auto min-w-[650px] font-sans">
                {/* Axes */}
                <line x1="80" y1="260" x2="800" y2="260" stroke="#475569" strokeWidth="2" />
                <line x1="80" y1="260" x2="80" y2="40" stroke="#475569" strokeWidth="2" />

                <text x="800" y="285" fill="#94a3b8" fontSize="12" textAnchor="end">Data Size (N Elements) ➔</text>
                <text x="30" y="45" fill="#94a3b8" fontSize="12" transform="rotate(-90 30,45)">Execution Time (s) ➔</text>

                {/* O(N^2) Curve */}
                <path d="M 80 260 Q 200 240 280 60" fill="none" stroke="#ef4444" strokeWidth="3" />
                <text x="290" y="65" fill="#ef4444" fontSize="12" fontWeight="bold">O(N²) Nested Loop (Exponential Trap!)</text>

                {/* O(N) Curve */}
                <line x1="80" y1="260" x2="700" y2="100" stroke="#0ea5e9" strokeWidth="3" />
                <text x="710" y="105" fill="#38bdf8" fontSize="12" fontWeight="bold">O(N) List Linear Scan</text>

                {/* O(1) Curve */}
                <line x1="80" y1="250" x2="780" y2="250" stroke="#10b981" strokeWidth="3.5" />
                <text x="650" y="240" fill="#34d399" fontSize="13" fontWeight="bold">O(1) Set Hash Table (Flatline Speed!)</text>

                {/* Bottom Callout */}
                <rect x="300" y="160" width="380" height="50" rx="6" fill="#0f172a" stroke="#10b981" />
                <text x="315" y="182" fill="#a7f3d0" fontSize="11" fontWeight="bold">
                  At N = 1,000,000 Elements:
                </text>
                <text x="315" y="200" fill="#cbd5e1" fontSize="11">
                  List: ~15.2 ms • Set: ~0.00005 ms (3,000x faster!)
                </text>
              </svg>
            ) : (
              <svg viewBox="0 0 850 320" className="w-full h-auto min-w-[650px] font-sans">
                <text x="30" y="35" fill="#f8fafc" fontSize="15" fontWeight="bold">
                  Under the Hood: How Set Lookup Bypasses Linear Scanning
                </text>

                {/* Input query */}
                <rect x="30" y="80" width="180" height="180" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="45" y="110" fill="#38bdf8" fontSize="13" fontWeight="bold">Query Item</text>
                <text x="45" y="145" fill="#cbd5e1" fontSize="12">x = "Susmita"</text>
                <text x="45" y="180" fill="#94a3b8" fontSize="11">1. hash(x) ➔</text>
                <text x="45" y="205" fill="#38bdf8" fontSize="11" fontWeight="mono">0x4F8A39E1</text>

                {/* Arrow 1 */}
                <path d="M 215 170 L 275 170" stroke="#38bdf8" strokeWidth="2" />

                {/* Masking logic */}
                <rect x="280" y="80" width="220" height="180" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="295" y="110" fill="#fbbf24" fontSize="13" fontWeight="bold">Bitwise Masking</text>
                <text x="295" y="145" fill="#cbd5e1" fontSize="11">hash &amp; (table_size - 1)</text>
                <text x="295" y="180" fill="#fde68a" fontSize="13" fontWeight="mono">bucket = 3</text>
                <text x="295" y="210" fill="#94a3b8" fontSize="11">Direct RAM jump in O(1)!</text>

                {/* Arrow 2 */}
                <path d="M 505 170 L 565 170" stroke="#10b981" strokeWidth="2" />

                {/* Table Bucket */}
                <rect x="570" y="80" width="240" height="180" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                <text x="585" y="110" fill="#34d399" fontSize="13" fontWeight="bold">PySetEntry [Bucket 3]</text>
                <text x="585" y="145" fill="#a7f3d0" fontSize="11">• key: "Susmita"</text>
                <text x="585" y="170" fill="#a7f3d0" fontSize="11">• hash: 0x4F8A39E1</text>
                <text x="585" y="200" fill="#ffffff" fontSize="12" fontWeight="bold">✓ MATCH: Returns True!</text>
                <text x="585" y="230" fill="#a7f3d0" fontSize="10">Zero linear scanning needed!</text>
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
              3. Interactive Python Performance Labs
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab A: 500,000 Element Membership Benchmark (Worst-Case Search)
              </h3>
              <PythonFileLoader
                fileModule={hashBench}
                title="hash_table_mechanics_benchmark.py"
                highlightLines={[6, 14, 21, 28]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab B: Scaling Curves across 1,000 to 500,000 Elements
              </h3>
              <PythonFileLoader
                fileModule={scalingCurves}
                title="set_vs_list_scaling_curves.py"
                highlightLines={[6, 17, 23, 29]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab C: Set Intersection Algebra vs Nested List Quadratic Traps
              </h3>
              <PythonFileLoader
                fileModule={algebraPerf}
                title="algebra_vs_loop_performance.py"
                highlightLines={[6, 14, 22, 29]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab D: Real-World High-Throughput Tax Exemption Audit in ₹
              </h3>
              <PythonFileLoader
                fileModule={taxFilter}
                title="million_records_tax_filter.py"
                highlightLines={[6, 17, 24, 31]}
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
            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">💰</span> 1. High-Volume Tax Exemption Auditing
              </div>
              <p className="text-sm text-slate-300">
                Tax departments in <strong>Barrackpore</strong> cross-reference 250,000 financial transactions against 10,000 exempt NGO PAN accounts in <strong className="text-emerald-300">0.03 seconds</strong> using O(1) set lookups, reconciling ledger amounts in Indian Rupees (<strong className="text-emerald-300">₹250M+ audit volume</strong>).
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-sky-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">🛡️</span> 2. DDoS Firewall IP Blacklist Filters
              </div>
              <p className="text-sm text-slate-300">
                Cloud gateways in <strong>Kolkata</strong> filter incoming HTTP requests against 50,000 malicious IPs in ~50 nanoseconds per connection, handling 100,000 req/sec without latency spikes.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-purple-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">📈</span> 3. Stock Exchange Ticker Validation
              </div>
              <p className="text-sm text-slate-300">
                Trading engines in <strong>Ichapur</strong> validate incoming equity orders against active NSE/BSE security symbols stored in an in-memory set before executing order matching.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-amber-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">🧬</span> 4. Genomic K-mer Matching
              </div>
              <p className="text-sm text-slate-300">
                Bioinformatics pipelines in <strong>Jadavpur</strong> find common DNA sequence fragments across chromosomes in milliseconds using set intersection (<code className="font-mono text-amber-400">kmer_set_a &amp; kmer_set_b</code>).
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
              5. Pitfalls &amp; Performance Anti-Patterns
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 1: Converting to Set Inside Loops
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Writing <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">for x in data: if x in set(lookup_list)</code> reconstructs the set on <strong className="text-white">every single iteration</strong>! Always convert the list to a set <strong className="text-emerald-400">once</strong> outside the loop.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 2: Converting for a Single Lookup
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                If you only perform a single <code className="font-mono">in</code> check on a tiny list (N &lt; 20), constructing a set takes more CPU cycles than a direct linear search.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 3: Ignoring Memory Overhead
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Sets consume ~8-10x more RAM than lists. On low-memory IoT devices or multi-gigabyte datasets, evaluate RAM constraints carefully!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 4: Nested List Comprehensions
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Writing <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">[x for x in list_a if x in list_b]</code> is quadratic O(N²). Use <code className="font-mono text-emerald-400">set_a &amp; set_b</code> for instant C-level speed!
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
            title="Topic 17: Performance Benefits of Sets Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Printable Study Note"
            downloadFileName="topic17_performance_benefits_note.txt"
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQS (30 COMPREHENSIVE QUESTIONS) */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <FAQTemplate
            title="Topic 17 • Performance Benefits of Sets: Master Viva & Review Questions"
            questions={questions}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: TEACHER'S NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <Teacher
            note="Teacher's Optimization Wisdom: When dealing with large datasets in production backend systems, algorithms dictate speed. A single nested list loop will freeze your server for minutes, while a set intersection will finish in milliseconds. Remember: hash lookups are O(1), and converting collections to sets before membership loops is the easiest 3,000x speedup you will ever achieve!"
          />
        </section>

      </div>
    </div>
  );
}
