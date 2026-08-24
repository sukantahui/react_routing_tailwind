import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import basicComp from "./topic14_files/basic_set_comprehension.py?raw";
import filteringComp from "./topic14_files/filtering_conditional_comprehensions.py?raw";
import nestedComp from "./topic14_files/nested_loops_comprehension.py?raw";
import dataCleaning from "./topic14_files/real_world_data_cleaning.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic14_files/topic14_note.txt?raw";

// FAQ Questions
import questions from "./topic14_files/topic14_questions";

/**
 * Topic14: Set Comprehension
 * Module: 002_006_sets
 * Segment: 2 (Practical Python for Real-World Development)
 *
 * In-depth exploration of Set Comprehensions in Python: syntax,
 * transformation pipelines, on-the-fly deduplication, conditional filtering,
 * matrix flattening with multi-loops, and data cleaning patterns.
 */
export default function Topic14() {
  const sectionRefs = useRef([]);
  const [activeTab, setActiveTab] = useState("pipeline");

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
            Topic 14
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Declarative Data Pipelines
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Set Comprehension
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Mastering declarative set generation: combining transformation, conditional filtering, and automatic on-the-fly hash deduplication into a single elegant expression (<code className="text-emerald-400 font-mono">{"{f(x) for x in data if cond}"}</code>).
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ✨ Declarative Syntax
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ In-Flight Hash Deduplication
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🎯 Conditional if-Filters
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔀 Multi-Loop Matrix Flattening
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: THE SET COMPREHENSION ANATOMY */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📐</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. Anatomy of a Set Comprehension
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              A set comprehension compresses a traditional 4-line for-loop with an append statement into a clean, highly optimized one-liner. It takes an input stream, applies an optional condition, evaluates an expression, and inserts the result into a unique hash table:
            </p>

            <div className="p-5 rounded-xl bg-slate-950 border border-emerald-800/80 shadow-2xl not-prose my-6">
              <div className="text-xs font-mono text-emerald-400 mb-2 uppercase tracking-wider font-bold">
                Syntax Blueprint
              </div>
              <div className="text-base sm:text-xl font-mono text-white flex flex-wrap items-center gap-2">
                <span className="text-emerald-400 font-bold">{'{'}</span>
                <span className="bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">expression</span>
                <span className="text-purple-400 font-bold">for</span>
                <span className="bg-sky-950/80 text-sky-300 px-2 py-0.5 rounded border border-sky-800">item</span>
                <span className="text-purple-400 font-bold">in</span>
                <span className="bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-700">iterable</span>
                <span className="text-amber-400 font-bold">if</span>
                <span className="bg-amber-950/80 text-amber-300 px-2 py-0.5 rounded border border-amber-800">condition</span>
                <span className="text-emerald-400 font-bold">{'}'}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="text-amber-400 font-bold text-base mb-1">Traditional For-Loop (4 Lines)</div>
                <div className="text-xs font-mono text-slate-400 bg-slate-900 p-3 rounded-lg space-y-1">
                  <div>result = set()</div>
                  <div><span className="text-purple-400">for</span> x <span className="text-purple-400">in</span> numbers:</div>
                  <div className="pl-4"><span className="text-purple-400">if</span> x &gt; 0:</div>
                  <div className="pl-8">result.add(x ** 2)</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-800/60">
                <div className="text-emerald-400 font-bold text-base mb-1">Set Comprehension (1 Line)</div>
                <div className="text-xs font-mono text-emerald-300 bg-slate-900 p-3 rounded-lg">
                  result = {'{x ** 2 for x in numbers if x > 0}'}
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  ⚡ Executes at C-level bytecode speed (BUILD_SET / SET_ADD).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 2: INTERACTIVE SVG PIPELINE VISUALIZER */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🔬</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                2. Visualizing Comprehension Execution Pipelines
              </h2>
            </div>

            {/* Toggle Tabs */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveTab("pipeline")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeTab === "pipeline"
                    ? "bg-emerald-900/50 text-emerald-300 border border-emerald-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Data Pipeline Flow
              </button>
              <button
                onClick={() => setActiveTab("contrast")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeTab === "contrast"
                    ? "bg-sky-900/50 text-sky-300 border border-sky-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Set vs List vs Dict Syntax
              </button>
            </div>
          </div>

          {/* SVG Diagram Canvas */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeTab === "pipeline" ? (
              <svg viewBox="0 0 850 320" className="w-full h-auto min-w-[650px] font-sans">
                <text x="30" y="35" fill="#f8fafc" fontSize="15" fontWeight="bold">
                  Pipeline: {'{x.strip().title() for x in raw_names if len(x) > 3}'}
                </text>

                {/* Step 1: Source */}
                <rect x="30" y="65" width="160" height="180" rx="8" fill="#1e293b" stroke="#334155" />
                <text x="45" y="95" fill="#94a3b8" fontSize="12" fontWeight="bold">1. RAW INPUT</text>
                <text x="45" y="125" fill="#cbd5e1" fontSize="11">• " susmita "</text>
                <text x="45" y="150" fill="#cbd5e1" fontSize="11">• "debangshu"</text>
                <text x="45" y="175" fill="#cbd5e1" fontSize="11">• " om "</text>
                <text x="45" y="200" fill="#cbd5e1" fontSize="11">• "SUSMITA"</text>

                {/* Arrow 1 */}
                <path d="M 195 155 L 235 155" stroke="#38bdf8" strokeWidth="2" fill="none" />

                {/* Step 2: Filter */}
                <rect x="240" y="65" width="160" height="180" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="255" y="95" fill="#fbbf24" fontSize="12" fontWeight="bold">2. IF FILTER</text>
                <text x="255" y="125" fill="#cbd5e1" fontSize="11">len(x) &gt; 3:</text>
                <text x="255" y="155" fill="#34d399" fontSize="11">✓ " susmita "</text>
                <text x="255" y="175" fill="#34d399" fontSize="11">✓ "debangshu"</text>
                <text x="255" y="195" fill="#ef4444" fontSize="11">✗ " om " (DROPPED)</text>

                {/* Arrow 2 */}
                <path d="M 405 155 L 445 155" stroke="#38bdf8" strokeWidth="2" fill="none" />

                {/* Step 3: Transform */}
                <rect x="450" y="65" width="170" height="180" rx="8" fill="#1e293b" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="465" y="95" fill="#38bdf8" fontSize="12" fontWeight="bold">3. TRANSFORM</text>
                <text x="465" y="125" fill="#cbd5e1" fontSize="11">.strip().title():</text>
                <text x="465" y="155" fill="#cbd5e1" fontSize="11">1. "Susmita"</text>
                <text x="465" y="175" fill="#cbd5e1" fontSize="11">2. "Debangshu"</text>
                <text x="465" y="195" fill="#cbd5e1" fontSize="11">3. "Susmita"</text>

                {/* Arrow 3 */}
                <path d="M 625 155 L 665 155" stroke="#10b981" strokeWidth="2" fill="none" />

                {/* Step 4: Hash & Output */}
                <rect x="670" y="65" width="150" height="180" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                <text x="685" y="95" fill="#34d399" fontSize="12" fontWeight="bold">4. DEDUPLICATE</text>
                <text x="685" y="130" fill="#a7f3d0" fontSize="12" fontWeight="bold">{'{"Susmita",'}</text>
                <text x="690" y="155" fill="#a7f3d0" fontSize="12" fontWeight="bold">{' "Debangshu"}'}</text>
                <text x="685" y="200" fill="#a7f3d0" fontSize="10">✓ Collapsed duplicate "Susmita"!</text>

                {/* Bottom Bar */}
                <rect x="30" y="265" width="790" height="40" rx="6" fill="#0f172a" stroke="#10b981" />
                <text x="50" y="290" fill="#34d399" fontSize="12" fontWeight="bold">
                  Final Cleaned Set Result: 2 Distinct Unique Records Generated in 1 Single Line!
                </text>
              </svg>
            ) : (
              <svg viewBox="0 0 850 320" className="w-full h-auto min-w-[650px] font-sans">
                <text x="30" y="35" fill="#f8fafc" fontSize="15" fontWeight="bold">
                  Comprehension Syntax &amp; Container Behavior Comparison
                </text>

                {/* Set Comp */}
                <rect x="30" y="65" width="185" height="220" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="45" y="95" fill="#34d399" fontSize="13" fontWeight="bold">Set Comprehension</text>
                <rect x="45" y="110" width="155" height="35" rx="4" fill="#064e3b" stroke="#10b981" />
                <text x="55" y="132" fill="#a7f3d0" fontSize="11" fontWeight="mono">{'{x%3 for x in range(6)}'}</text>
                <text x="45" y="175" fill="#cbd5e1" fontSize="11">• Result: {'{0, 1, 2}'}</text>
                <text x="45" y="200" fill="#cbd5e1" fontSize="11">• Length: 3 items</text>
                <text x="45" y="235" fill="#34d399" fontSize="11" fontWeight="bold">✓ Unique set</text>

                {/* List Comp */}
                <rect x="230" y="65" width="185" height="220" rx="8" fill="#1e293b" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="245" y="95" fill="#38bdf8" fontSize="13" fontWeight="bold">List Comprehension</text>
                <rect x="245" y="110" width="155" height="35" rx="4" fill="#0c4a6e" stroke="#0ea5e9" />
                <text x="255" y="132" fill="#bae6fd" fontSize="11" fontWeight="mono">{'[x%3 for x in range(6)]'}</text>
                <text x="245" y="175" fill="#cbd5e1" fontSize="11">• [0, 1, 2, 0, 1, 2]</text>
                <text x="245" y="200" fill="#cbd5e1" fontSize="11">• Length: 6 items</text>
                <text x="245" y="235" fill="#38bdf8" fontSize="11" fontWeight="bold">✓ Retains duplicates</text>

                {/* Dict Comp */}
                <rect x="430" y="65" width="185" height="220" rx="8" fill="#1e293b" stroke="#a855f7" strokeWidth="1.5" />
                <text x="445" y="95" fill="#c084fc" fontSize="13" fontWeight="bold">Dict Comprehension</text>
                <rect x="445" y="110" width="155" height="35" rx="4" fill="#4a044e" stroke="#a855f7" />
                <text x="455" y="132" fill="#f5d0fe" fontSize="11" fontWeight="mono">{'{x: x**2 for x in r(3)}'}</text>
                <text x="445" y="175" fill="#cbd5e1" fontSize="11">• {'{0:0, 1:1, 2:4}'}</text>
                <text x="445" y="200" fill="#cbd5e1" fontSize="11">• Key-Value mapping</text>
                <text x="445" y="235" fill="#c084fc" fontSize="11" fontWeight="bold">✓ Unique keys</text>

                {/* Gen Expr */}
                <rect x="630" y="65" width="190" height="220" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="645" y="95" fill="#fbbf24" fontSize="13" fontWeight="bold">Generator Expr</text>
                <rect x="645" y="110" width="160" height="35" rx="4" fill="#451a03" stroke="#f59e0b" />
                <text x="655" y="132" fill="#fde68a" fontSize="11" fontWeight="mono">{'(x%3 for x in range(6))'}</text>
                <text x="645" y="175" fill="#cbd5e1" fontSize="11">• Lazy generator object</text>
                <text x="645" y="200" fill="#cbd5e1" fontSize="11">• Evaluates on demand</text>
                <text x="645" y="235" fill="#fbbf24" fontSize="11" fontWeight="bold">✓ Low memory</text>
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
                Lab A: Set Comprehension Basics, Normalization &amp; Deduplication
              </h3>
              <PythonFileLoader
                fileModule={basicComp}
                title="basic_set_comprehension.py"
                highlightLines={[6, 12, 18]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab B: Conditional if-Filtering on Candidate Exam Records
              </h3>
              <PythonFileLoader
                fileModule={filteringComp}
                title="filtering_conditional_comprehensions.py"
                highlightLines={[6, 16, 21]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab C: Multi-Loop Comprehensions &amp; Nested Matrix Flattening
              </h3>
              <PythonFileLoader
                fileModule={nestedComp}
                title="nested_loops_comprehension.py"
                highlightLines={[6, 12, 18]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab D: Real-World Payment Webhook Sanitization &amp; Fee Auditing in ₹
              </h3>
              <PythonFileLoader
                fileModule={dataCleaning}
                title="real_world_data_cleaning.py"
                highlightLines={[6, 15, 23]}
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
                <span className="text-xl">💳</span> 1. Payment Webhook Normalization
              </div>
              <p className="text-sm text-slate-300">
                Payment webhooks receiving admission fees (<strong className="text-emerald-300">₹4,500/student</strong>) in <strong>Barrackpore</strong> sanitize messy student strings using <code className="font-mono text-emerald-400">{"{txn['name'].strip().title() for txn in webhooks if txn['status'] == 'PAID'}"}</code>.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-sky-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">📧</span> 2. Corporate Email Domain Extraction
              </div>
              <p className="text-sm text-slate-300">
                CRM platforms in <strong>Kolkata</strong> extract distinct customer company domains using <code className="font-mono text-sky-400">{"{e.split('@')[1] for e in user_emails if '@' in e}"}</code>, grouping enterprise clients instantly.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-purple-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">🛒</span> 3. Product Catalog Tag Aggregation
              </div>
              <p className="text-sm text-slate-300">
                E-commerce backends in <strong>Ichapur</strong> flatten multi-category product keyword lists using nested set comprehensions <code className="font-mono text-purple-400">{"{tag.lower() for prod in items for tag in prod.tags}"}</code>.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-amber-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">🔍</span> 4. Natural Language Vocabulary Extraction
              </div>
              <p className="text-sm text-slate-300">
                NLP research labs in <strong>Jadavpur</strong> extract distinct root lemmas from document corpora using <code className="font-mono text-amber-400">{"{word.lower() for line in docs for word in line.split() if len(word) > 4}"}</code>.
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
              5. Pitfalls &amp; Tricky Traps with Set Comprehensions
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 1: Unhashable Elements in Output
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Writing <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">{"{[x] for x in data}"}</code> raises <code className="text-rose-400 font-bold">TypeError: unhashable type: 'list'</code>. Transform into immutable tuples <code className="font-mono text-emerald-400">{"{(x,) for x in data}"}</code>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 2: Confusing with Dict Comprehension
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Remember that <code className="font-mono">{"{k: v for ...}"}</code> creates a <strong className="text-white">dict</strong>, while <code className="font-mono">{"{v for ...}"}</code> creates a <strong className="text-white">set</strong>. Omitting or adding a colon changes the container type!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 3: Re-Inventing Set Comprehensions
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Writing <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">set([x for x in data])</code> creates an intermediate list before building the set. Write <code className="font-mono text-emerald-400">{"{x for x in data}"}</code> directly!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 4: Over-Nesting &amp; Loss of Readability
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Comprehensions with more than 2 loops or complex nested logic become difficult to maintain. Write an explicit for-loop if complexity grows!
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
            title="Topic 14: Set Comprehension Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Printable Study Note"
            downloadFileName="topic14_set_comprehensions_note.txt"
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQS (30 COMPREHENSIVE QUESTIONS) */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <FAQTemplate
            title="Topic 14 • Set Comprehensions: Master Viva & Review Questions"
            questions={questions}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: TEACHER'S NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <Teacher
            note="Teacher's Pipeline Maxim: Set Comprehensions represent declarative programming at its finest. Whenever Susmita, Mamata, and Debangshu in Barrackpore need to clean messy datasets, normalize strings, or extract unique attributes, {expr for x in data if cond} transforms raw inputs into pure, deduplicated sets in a single elegant line. Master this construct, and your Python code will look clean, professional, and state-of-the-art!"
          />
        </section>

      </div>
    </div>
  );
}
