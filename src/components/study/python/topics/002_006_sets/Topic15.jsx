import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import dedupBasics from "./topic15_files/deduplication_basics.py?raw";
import orderDedup from "./topic15_files/order_preserving_deduplication.py?raw";
import customObjDedup from "./topic15_files/custom_objects_deduplication.py?raw";
import voterDedup from "./topic15_files/voter_roll_deduplication.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic15_files/topic15_note.txt?raw";

// FAQ Questions
import questions from "./topic15_files/topic15_questions";

/**
 * Topic15: Removing Duplicates Using Sets
 * Module: 002_006_sets
 * Segment: 2 (Practical Python for Real-World Development)
 *
 * Comprehensive guide to removing duplicates in Python:
 * unordered list(set(data)), order-preserving list(dict.fromkeys(data)),
 * streaming seen-set generators, custom objects __hash__ & __eq__,
 * and avoiding the catastrophic O(N^2) nested list scanning trap.
 */
export default function Topic15() {
  const sectionRefs = useRef([]);
  const [activeTab, setActiveTab] = useState("strategies");

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
            Topic 15
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            High-Performance Data Cleansing
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Removing Duplicates Using Sets
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Mastering algorithmic deduplication in Python: comparing <code className="text-emerald-400 font-mono">list(set(data))</code> vs order-preserving <code className="text-sky-400 font-mono">dict.fromkeys()</code>, streaming seen sets, and escaping the disastrous <code className="text-rose-400 font-mono">O(N²)</code> nested list trap.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ O(N) Linear Deduplication
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🎯 Order-Preserving dict.fromkeys()
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🌊 Streaming 'seen' Set Generator
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🚫 Escaping the O(N²) Trap
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: THE THREE DEDUPLICATION STRATEGIES */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧹</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Three Core Deduplication Strategies
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Depending on whether you need <strong className="text-emerald-400">maximum speed</strong>, <strong className="text-sky-400">order preservation</strong>, or <strong className="text-purple-400">custom attribute filtering</strong>, Python offers three distinct patterns:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Card 1: list(set(data)) */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-emerald-800/60 shadow-lg shadow-emerald-950/30 transition-all duration-300 hover:border-emerald-500">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
                    <span>1.</span> list(set(data))
                  </div>
                  <span className="text-xs font-mono bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
                    O(N) Fast
                  </span>
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  Best when <strong className="text-white">order does not matter</strong>.
                </p>
                <div className="text-xs font-mono text-emerald-300 bg-slate-900 p-2 rounded">
                  Scrambles entry sequence!
                </div>
              </div>

              {/* Card 2: dict.fromkeys() */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-sky-800/60 shadow-lg shadow-sky-950/30 transition-all duration-300 hover:border-sky-500">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-sky-400 font-bold text-base">
                    <span>2.</span> dict.fromkeys()
                  </div>
                  <span className="text-xs font-mono bg-sky-950 text-sky-300 px-2 py-0.5 rounded border border-sky-800">
                    O(N) Ordered
                  </span>
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  Best when <strong className="text-white">preserving insertion order</strong>.
                </p>
                <div className="text-xs font-mono text-sky-300 bg-slate-900 p-2 rounded">
                  Guaranteed in Python 3.7+
                </div>
              </div>

              {/* Card 3: seen-set Generator */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-purple-800/60 shadow-lg shadow-purple-950/30 transition-all duration-300 hover:border-purple-500">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                    <span>3.</span> seen = set() Loop
                  </div>
                  <span className="text-xs font-mono bg-purple-950 text-purple-300 px-2 py-0.5 rounded border border-purple-800">
                    O(N) Stream
                  </span>
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  Best for <strong className="text-white">dictionaries &amp; custom keys</strong>.
                </p>
                <div className="text-xs font-mono text-purple-300 bg-slate-900 p-2 rounded">
                  Low RAM generator pipeline
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
              <span className="text-3xl">🔬</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                2. Visualizing Deduplication Pipelines &amp; Performance
              </h2>
            </div>

            {/* Toggle Tabs */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveTab("strategies")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeTab === "strategies"
                    ? "bg-emerald-900/50 text-emerald-300 border border-emerald-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Order vs Unordered Flow
              </button>
              <button
                onClick={() => setActiveTab("on2trap")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeTab === "on2trap"
                    ? "bg-rose-900/50 text-rose-300 border border-rose-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                The O(N²) Nested List Trap
              </button>
            </div>
          </div>

          {/* SVG Diagram Canvas */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeTab === "strategies" ? (
              <svg viewBox="0 0 850 320" className="w-full h-auto min-w-[650px] font-sans">
                <text x="30" y="35" fill="#f8fafc" fontSize="15" fontWeight="bold">
                  Input Stream: ["Kolkata", "Barrackpore", "Kolkata", "Ichapur"]
                </text>

                {/* Left: list(set(data)) */}
                <rect x="30" y="65" width="380" height="220" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                <text x="50" y="95" fill="#34d399" fontSize="14" fontWeight="bold">1. list(set(data)) [Unordered O(N)]</text>
                <text x="50" y="125" fill="#cbd5e1" fontSize="11">• Inserts items into set hash table.</text>
                <text x="50" y="145" fill="#cbd5e1" fontSize="11">• Hash table resolves duplicates in O(1).</text>
                <text x="50" y="165" fill="#cbd5e1" fontSize="11">• list() pulls items from internal bucket order.</text>

                <rect x="50" y="185" width="340" height="40" rx="6" fill="#064e3b" stroke="#10b981" />
                <text x="65" y="210" fill="#a7f3d0" fontSize="12" fontWeight="bold">
                  Output: ['Barrackpore', 'Ichapur', 'Kolkata']
                </text>
                <text x="50" y="255" fill="#fca5a5" fontSize="11">⚠️ Note: Original input order is lost/scrambled!</text>

                {/* Right: dict.fromkeys(data) */}
                <rect x="440" y="65" width="380" height="220" rx="10" fill="#1e293b" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="460" y="95" fill="#38bdf8" fontSize="14" fontWeight="bold">2. list(dict.fromkeys(data)) [Ordered O(N)]</text>
                <text x="460" y="125" fill="#cbd5e1" fontSize="11">• Inserts keys into compact ordered dict table.</text>
                <text x="460" y="145" fill="#cbd5e1" fontSize="11">• Duplicate keys update value, preserving index.</text>
                <text x="460" y="165" fill="#cbd5e1" fontSize="11">• list() extracts keys in exact original order!</text>

                <rect x="460" y="185" width="340" height="40" rx="6" fill="#0c4a6e" stroke="#0ea5e9" />
                <text x="475" y="210" fill="#bae6fd" fontSize="12" fontWeight="bold">
                  Output: ['Kolkata', 'Barrackpore', 'Ichapur']
                </text>
                <text x="460" y="255" fill="#34d399" fontSize="11">✓ Perfect sequence match with 0 duplicates!</text>
              </svg>
            ) : (
              <svg viewBox="0 0 850 320" className="w-full h-auto min-w-[650px] font-sans">
                <text x="30" y="35" fill="#f8fafc" fontSize="15" fontWeight="bold">
                  Benchmark: Deduplicating 100,000 Elements in Python
                </text>

                {/* Bad Way: Nested List */}
                <rect x="30" y="65" width="380" height="220" rx="10" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
                <text x="50" y="95" fill="#fca5a5" fontSize="14" fontWeight="bold">❌ 'if x not in unique_list' Loop</text>
                <text x="50" y="125" fill="#cbd5e1" fontSize="11">• Scans list linearly for every iteration: O(N).</text>
                <text x="50" y="150" fill="#cbd5e1" fontSize="11">• Total pointer checks: ~5,000,000,000 operations!</text>
                <rect x="50" y="175" width="340" height="45" rx="6" fill="#450a0a" stroke="#ef4444" />
                <text x="65" y="202" fill="#fecaca" fontSize="13" fontWeight="bold">Time Taken: 15.42 Seconds (Freezes!)</text>
                <text x="50" y="250" fill="#fca5a5" fontSize="11" fontWeight="bold">Complexity: O(N²) Quadratic Disaster</text>

                {/* Good Way: Set / dict.fromkeys */}
                <rect x="440" y="65" width="380" height="220" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="460" y="95" fill="#34d399" fontSize="14" fontWeight="bold">✓ Set / dict.fromkeys() Pattern</text>
                <text x="460" y="125" fill="#cbd5e1" fontSize="11">• Computes hash code in O(1) time per item.</text>
                <text x="460" y="150" fill="#cbd5e1" fontSize="11">• Total operations: exactly 100,000 hash checks.</text>
                <rect x="460" y="175" width="340" height="45" rx="6" fill="#064e3b" stroke="#10b981" />
                <text x="475" y="202" fill="#a7f3d0" fontSize="13" fontWeight="bold">Time Taken: 0.0048 Seconds (Instant!)</text>
                <text x="460" y="250" fill="#34d399" fontSize="11" fontWeight="bold">Complexity: O(N) Linear (3,200x Faster!)</text>
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
                Lab A: Standard Unordered Deduplication with list(set(data))
              </h3>
              <PythonFileLoader
                fileModule={dedupBasics}
                title="deduplication_basics.py"
                highlightLines={[6, 14, 19]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab B: Preserving Insertion Order with dict.fromkeys() &amp; seen Generators
              </h3>
              <PythonFileLoader
                fileModule={orderDedup}
                title="order_preserving_deduplication.py"
                highlightLines={[6, 17, 23, 31]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab C: Deduplicating Custom Objects via __hash__ and __eq__
              </h3>
              <PythonFileLoader
                fileModule={customObjDedup}
                title="custom_objects_deduplication.py"
                highlightLines={[6, 12, 16, 27, 34]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab D: Real-World Electoral Voter Roll Deduplication in Barrackpore
              </h3>
              <PythonFileLoader
                fileModule={voterDedup}
                title="voter_roll_deduplication.py"
                highlightLines={[6, 16, 24]}
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
              4. Real-World Applications in West Bengal Industry
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">🗳️</span> 1. Voter Electoral Roll Cleansing
              </div>
              <p className="text-sm text-slate-300">
                Civic election databases in <strong>Barrackpore</strong> deduplicate voter lists across municipal polling booths using seen sets on voter card serial IDs, ensuring clean electoral participation.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-sky-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">💳</span> 2. Webhook Replay Attack Defense
              </div>
              <p className="text-sm text-slate-300">
                Payment gateways in <strong>Kolkata</strong> filter incoming duplicate HTTP retry payloads for student fees (<strong className="text-emerald-300">₹4,500 course fee</strong>) by storing processed transaction IDs in an in-memory set.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-purple-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">🕷️</span> 3. Web Crawler Visited-URL Registers
              </div>
              <p className="text-sm text-slate-300">
                Search engine spiders in <strong>Ichapur</strong> prevent circular infinite traversal loops by checking <code className="font-mono text-purple-400">if url not in visited_urls</code> in O(1) before enqueueing web links.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-amber-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">📧</span> 4. Newsletter Subscriber Cleansing
              </div>
              <p className="text-sm text-slate-300">
                Marketing automation systems in <strong>Jadavpur</strong> run <code className="font-mono text-amber-400">list(dict.fromkeys(emails))</code> before firing bulk campaigns, eliminating duplicate recipient dispatches.
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
              5. Pitfalls &amp; Tricky Gotchas in Data Deduplication
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 1: Unintended Order Scrambling
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Calling <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">list(set(data))</code> scrambles timeline data. If order matters (e.g. chronological logs), always use <code className="font-mono text-sky-400">list(dict.fromkeys(data))</code>!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 2: The O(N²) Nested List Trap
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Writing <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">if x not in unique_list</code> scans the list on every iteration. On 100K records, it causes a severe 15-second CPU freeze!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 3: Unhashable Nested Lists
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">set([[1, 2], [1, 2]])</code> crashes with TypeError. Convert inner lists to tuples first: <code className="font-mono text-emerald-400">[list(x) for x in set(tuple(x) for x in data)]</code>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 4: 1 vs True Collision
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Remember that <code className="font-mono">1 == True == 1.0</code>! Deduplicating <code className="font-mono">[1, True]</code> collapses them into a single element <code className="font-mono">{'{1}'}</code>.
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
            title="Topic 15: Removing Duplicates Using Sets Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Printable Study Note"
            downloadFileName="topic15_deduplication_note.txt"
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQS (30 COMPREHENSIVE QUESTIONS) */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <FAQTemplate
            title="Topic 15 • Removing Duplicates with Sets: Master Viva & Review Questions"
            questions={questions}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: TEACHER'S NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <Teacher
            note="Teacher's Optimization Law: Never, EVER write 'if x not in list' inside a loop! That simple mistake turns your O(N) script into an O(N²) crawler that chokes on real-world datasets in Barrackpore and Kolkata. Use list(set(data)) when order doesn't matter, and list(dict.fromkeys(data)) when order must be preserved. Keep your algorithms in O(N) time!"
          />
        </section>

      </div>
    </div>
  );
}
