import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import lenTruthiness from "./topic8_files/len_and_truthiness.py?raw";
import shallowCopy from "./topic8_files/shallow_copy_vs_aliasing.py?raw";
import minMaxSum from "./topic8_files/min_max_sum_operations.py?raw";
import batchFeeStats from "./topic8_files/batch_fee_statistics.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic8_files/topic8_note.txt?raw";

// FAQ Questions
import questions from "./topic8_files/topic8_questions";

/**
 * Topic8: Set Length and Basic Operations
 * Module: 002_006_sets
 * Segment: 2 (Practical Python for Real-World Development)
 *
 * Comprehensive exploration of fundamental set operations: O(1) len(s) PySetObject internals,
 * boolean truthiness evaluation, pointer aliasing vs shallow cloning (.copy()),
 * and built-in aggregate functions (min, max, sum, all, any).
 */
export default function Topic8() {
  const sectionRefs = useRef([]);
  const [activeTab, setActiveTab] = useState("length");

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
            Topic 8
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Core Container Operations
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Set Length & Basic Operations
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Understanding <code className="text-emerald-400 font-mono">len()</code> internals, boolean truthiness evaluation, reference aliasing vs shallow cloning with <code className="text-sky-400 font-mono">.copy()</code>, and built-in aggregate operations.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ Instant O(1) len(s) Struct Read
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ Safe Cloning vs Aliasing
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ❓ Boolean Truthiness Checks
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📈 Aggregates: min, max, sum
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: CORE OPERATIONS OVERVIEW */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📐</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. Fundamental Set Mechanics
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Python sets provide several essential built-in operations designed for high-performance computing, clean condition checking, and memory management:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-6 not-prose">
              {/* Card 1: len & truthiness */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-emerald-800/60 shadow-lg shadow-emerald-950/30 transition-all duration-300 hover:border-emerald-500">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg">
                    <span>📏</span> len() & Truthiness
                  </div>
                  <span className="text-xs font-mono bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
                    O(1) Constant
                  </span>
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  Calling <code className="text-emerald-300 font-mono">len(my_set)</code> reads an internal struct counter instantly. Evaluating <code className="text-emerald-300 font-mono">bool(my_set)</code> checks if <strong className="text-white">len &gt; 0</strong>.
                </p>
                <div className="text-xs font-mono text-slate-400">
                  <code className="text-emerald-300">if not s:</code> is the canonical Pythonic check for emptiness.
                </div>
              </div>

              {/* Card 2: copy vs alias */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-sky-800/60 shadow-lg shadow-sky-950/30 transition-all duration-300 hover:border-sky-500">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-sky-400 font-bold text-lg">
                    <span>📋</span> Aliasing vs .copy()
                  </div>
                  <span className="text-xs font-mono bg-sky-950 text-sky-300 px-2 py-0.5 rounded border border-sky-800">
                    Memory Safety
                  </span>
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  <code className="text-rose-300 font-mono">s2 = s1</code> shares the exact same pointer (aliasing). <code className="text-sky-300 font-mono">s2 = s1.copy()</code> creates an independent duplicate set object in memory.
                </p>
                <div className="text-xs font-mono text-slate-400">
                  Always use <code className="text-sky-300">.copy()</code> to prevent accidental mutations.
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
                2. Visualizing Memory: len() Internals & Aliasing
              </h2>
            </div>

            {/* Toggle Tabs */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveTab("length")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeTab === "length"
                    ? "bg-emerald-900/50 text-emerald-300 border border-emerald-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                O(1) len() PySetObject Struct
              </button>
              <button
                onClick={() => setActiveTab("aliasing")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeTab === "aliasing"
                    ? "bg-sky-900/50 text-sky-300 border border-sky-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Aliasing vs Shallow Copy
              </button>
            </div>
          </div>

          {/* SVG Diagram Canvas */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeTab === "length" ? (
              <svg viewBox="0 0 850 320" className="w-full h-auto min-w-[650px] font-sans">
                <text x="30" y="35" fill="#f8fafc" fontSize="15" fontWeight="bold">How Python Computes len(my_set) in Instant O(1) Time</text>

                {/* PySetObject Struct Box */}
                <rect x="30" y="65" width="400" height="220" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="50" y="95" fill="#34d399" fontSize="14" fontWeight="bold">PySetObject C-Structure (CPython)</text>

                <rect x="50" y="115" width="360" height="35" rx="4" fill="#0f172a" stroke="#334155" />
                <text x="65" y="137" fill="#94a3b8" fontSize="11">ob_refcnt: 1 (Reference Counter)</text>

                <rect x="50" y="155" width="360" height="35" rx="4" fill="#0f172a" stroke="#334155" />
                <text x="65" y="177" fill="#94a3b8" fontSize="11">ob_type: &lt;class 'set'&gt;</text>

                <rect x="50" y="195" width="360" height="40" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                <text x="65" y="220" fill="#34d399" fontSize="13" fontWeight="bold">used: 4 (ACTIVE ELEMENT COUNTER)</text>

                <text x="50" y="265" fill="#cbd5e1" fontSize="11">• Updates on every .add() and .remove() in O(1).</text>

                {/* Right: The Function Call */}
                <rect x="460" y="65" width="360" height="220" rx="10" fill="#090d16" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="480" y="95" fill="#38bdf8" fontSize="14" fontWeight="bold">Executing len(my_set)</text>

                <path d="M 410 215 L 470 140" stroke="#38bdf8" strokeWidth="2" fill="none" />

                <rect x="480" y="125" width="320" height="50" rx="6" fill="#0c4a6e" stroke="#0ea5e9" />
                <text x="495" y="155" fill="#bae6fd" fontSize="13" fontWeight="bold">Direct Memory Read: return set-&gt;used</text>

                <text x="480" y="205" fill="#cbd5e1" fontSize="12">• Zero bucket traversal.</text>
                <text x="480" y="230" fill="#cbd5e1" fontSize="12">• Instantaneous response time (&lt;0.00005 ms).</text>
                <text x="480" y="255" fill="#34d399" fontSize="12" fontWeight="bold">✓ 100% Constant O(1) Complexity!</text>
              </svg>
            ) : (
              <svg viewBox="0 0 850 320" className="w-full h-auto min-w-[650px] font-sans">
                <text x="30" y="35" fill="#f8fafc" fontSize="15" fontWeight="bold">Aliasing (s2 = s1) vs Shallow Copy (s2 = s1.copy())</text>

                {/* Left: Aliasing */}
                <rect x="30" y="65" width="380" height="220" rx="10" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
                <text x="50" y="95" fill="#fca5a5" fontSize="14" fontWeight="bold">ALIASING: s2 = s1  (DANGEROUS)</text>

                <rect x="50" y="115" width="150" height="40" rx="6" fill="#0f172a" stroke="#ef4444" />
                <text x="65" y="140" fill="#fca5a5" fontSize="12" fontWeight="bold">Pointer s1</text>

                <rect x="50" y="165" width="150" height="40" rx="6" fill="#0f172a" stroke="#ef4444" />
                <text x="65" y="190" fill="#fca5a5" fontSize="12" fontWeight="bold">Pointer s2</text>

                <rect x="230" y="125" width="160" height="70" rx="6" fill="#450a0a" stroke="#ef4444" />
                <text x="245" y="155" fill="#fecaca" fontSize="11" fontWeight="bold">Shared Set Object</text>
                <text x="245" y="175" fill="#cbd5e1" fontSize="10">{'{"Kolkata", "Ichapur"}'}</text>

                <text x="50" y="240" fill="#fca5a5" fontSize="11" fontWeight="bold">❌ Mutating s2 unintentionally mutates s1!</text>

                {/* Right: Shallow Copy */}
                <rect x="440" y="65" width="380" height="220" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="460" y="95" fill="#34d399" fontSize="14" fontWeight="bold">SHALLOW COPY: s2 = s1.copy()  (SAFE)</text>

                <rect x="460" y="120" width="160" height="60" rx="6" fill="#064e3b" stroke="#10b981" />
                <text x="475" y="145" fill="#34d399" fontSize="11" fontWeight="bold">Original Set (s1)</text>
                <text x="475" y="165" fill="#a7f3d0" fontSize="10">{'{"Kolkata"}'}</text>

                <rect x="640" y="120" width="160" height="60" rx="6" fill="#064e3b" stroke="#10b981" />
                <text x="655" y="145" fill="#34d399" fontSize="11" fontWeight="bold">Cloned Set (s2)</text>
                <text x="655" y="165" fill="#a7f3d0" fontSize="10">{'{"Kolkata"}'}</text>

                <text x="460" y="220" fill="#cbd5e1" fontSize="11">• Two independent memory objects.</text>
                <text x="460" y="240" fill="#34d399" fontSize="11" fontWeight="bold">✓ Mutating s2 leaves s1 100% safe and intact!</text>
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
                Lab A: O(1) len() Measurement & Boolean Truthiness Guards
              </h3>
              <PythonFileLoader
                fileModule={lenTruthiness}
                title="len_and_truthiness.py"
                highlightLines={[6, 12, 18, 23]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab B: Aliasing Reference Pitfall vs Safe Shallow .copy()
              </h3>
              <PythonFileLoader
                fileModule={shallowCopy}
                title="shallow_copy_vs_aliasing.py"
                highlightLines={[8, 14, 18, 24]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab C: Built-in Aggregates: min(), max(), sum(), any(), all()
              </h3>
              <PythonFileLoader
                fileModule={minMaxSum}
                title="min_max_sum_operations.py"
                highlightLines={[7, 10, 15, 18]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab D: Real-World Student Batch Revenue & Safe Audit Copy in ₹
              </h3>
              <PythonFileLoader
                fileModule={batchFeeStats}
                title="batch_fee_statistics.py"
                highlightLines={[13, 19, 23]}
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
            <span className="text-3xl">🏢</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Industry Applications in West Bengal
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">🎓</span> 1. Batch Size & Tuition Fee Auditing
              </div>
              <p className="text-sm text-slate-300">
                Course administrators in <strong>Barrackpore</strong> calculate aggregate student tuition fees (<strong className="text-emerald-300">₹4,500/student</strong>) using <code className="font-mono text-emerald-400">len(enrolled_students)</code> to generate accurate financial balance sheets in Indian Rupees.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-sky-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">🛡️</span> 2. Defensive Simulation Sandboxes
              </div>
              <p className="text-sm text-slate-300">
                Software test suites in <strong>Kolkata</strong> create a safe clone <code className="font-mono text-sky-400">test_env = live_config.copy()</code> to simulate stress scenarios without corrupting production server state.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-purple-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">🛑</span> 3. Guard Clauses in Dispatch Engines
              </div>
              <p className="text-sm text-slate-300">
                High-throughput background jobs abort empty notification queues early using <code className="font-mono text-purple-400">if not pending_jobs: return</code>, saving expensive database network handshakes.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-amber-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">📊</span> 4. Educational Score Evaluation
              </div>
              <p className="text-sm text-slate-300">
                Exam evaluation pipelines in <strong>Jadavpur</strong> compute highest score (<code className="font-mono text-amber-400">max(scores)</code>) and lowest score (<code className="font-mono text-amber-400">min(scores)</code>) across distinct student performance records.
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
              5. Pitfalls & Tricky Traps with Basic Set Operations
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 1: Accidental Aliasing Bug
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Writing <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">s2 = s1</code> shares the same memory pointer. Mutating <code className="font-mono">s2</code> destroys <code className="font-mono">s1</code>. Always use <code className="font-mono text-emerald-400">s1.copy()</code>!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 2: Calling min()/max() on Empty Set
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Calling <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">min(set())</code> raises <code className="text-rose-400 font-bold">ValueError: min() arg is an empty sequence</code>. Pass a fallback: <code className="font-mono text-emerald-400">min(s, default=0)</code>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 3: Calling sum() on String Sets
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">sum({'{A, B}'})</code> raises <code className="text-rose-400 font-bold">TypeError</code>. Use <code className="font-mono text-emerald-400">"".join(s)</code> to concatenate strings!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 4: all(set()) Truth Trap
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                <code className="font-mono">all(set())</code> returns <strong className="text-emerald-400">True</strong> (vacuously true), while <code className="font-mono">any(set())</code> returns <strong className="text-rose-400">False</strong>. Be mindful when checking empty collections.
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
            title="Topic 8: Set Length and Basic Operations Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Printable Study Note"
            downloadFileName="topic8_set_length_basic_operations_note.txt"
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQS (30 COMPREHENSIVE QUESTIONS) */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <FAQTemplate
            title="Topic 8 • Set Length & Basic Operations: Master Viva & Review Questions"
            questions={questions}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: TEACHER'S NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <Teacher
            note="Teacher's Architectural Advice: Never underestimate the elegance of basic operations! In Python, len() is an instantaneous struct field lookup that never slows down your application. When you clone sets for simulation tests, always remember that s2 = s1 is an alias, whereas s2 = s1.copy() gives you genuine independence. Keep your code clean, pythonic, and safe!"
          />
        </section>

      </div>
    </div>
  );
}
