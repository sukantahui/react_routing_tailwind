import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import fundamentalsCode from "./topic3_files/map_filter_reduce_fundamentals.py?raw";
import comparisonCode from "./topic3_files/map_filter_vs_comprehensions_and_lambdas.py?raw";
import advancedPipelineCode from "./topic3_files/advanced_functional_pipelines_and_composition.py?raw";
import financialLedgerCode from "./topic3_files/institutional_financial_ledger_functional_pipeline.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic3_files/topic3_note.txt?raw";

// FAQ Questions
import questions from "./topic3_files/topic3_questions";

/**
 * Topic3: Functional tools: map(), filter(), and functools.reduce()
 * Module: 003_005_advance-comprehensions
 * Segment: 3 (Advanced Python Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic3() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("trinity");

  // Interactive Laboratory State
  const initialTransactions = [
    { txn_id: "TXN-801", name: "Sourav Mukherjee", course: "PY-AI", base_fee: 28500.0, status: "CLEARED" },
    { txn_id: "TXN-802", name: "Priyanka Sen", course: "DS-ML", base_fee: 32000.0, status: "CLEARED" },
    { txn_id: "TXN-803", name: "Debolina Roy", course: "PY-AI", base_fee: 28500.0, status: "PENDING" },
    { txn_id: "TXN-804", name: "Rahul Verma", course: "WEB-DEV", base_fee: 25000.0, status: "CLEARED" },
    { txn_id: "TXN-805", name: "Sneha Gupta", course: "DS-ML", base_fee: 32000.0, status: "CLEARED" },
  ];

  const [gstRate, setGstRate] = useState(0.18); // 18% GST
  const [filterMode, setFilterMode] = useState("CLEARED"); // CLEARED | ALL | HIGH_FEE
  const [reduceMode, setReduceMode] = useState("SUM_REVENUE"); // SUM_REVENUE | MAX_FEE | CATEGORY_BREAKDOWN
  const [viewComprehensionEquiv, setViewComprehensionEquiv] = useState(false);

  // Stage 1: Filter
  const filteredTxs = initialTransactions.filter((tx) => {
    if (filterMode === "CLEARED") return tx.status === "CLEARED";
    if (filterMode === "HIGH_FEE") return tx.base_fee >= 30000.0;
    return true;
  });

  // Stage 2: Map
  const mappedTxs = filteredTxs.map((tx) => {
    const gross = Math.round(tx.base_fee * (1 + gstRate) * 100) / 100;
    const gstAmount = Math.round((gross - tx.base_fee) * 100) / 100;
    return {
      ...tx,
      gst_amount: gstAmount,
      gross_fee: gross,
    };
  });

  // Stage 3: Reduce
  let reducedResult = null;
  if (reduceMode === "SUM_REVENUE") {
    reducedResult = mappedTxs.reduce((acc, tx) => acc + tx.gross_fee, 0);
  } else if (reduceMode === "MAX_FEE") {
    reducedResult = mappedTxs.reduce((acc, tx) => (tx.gross_fee > acc ? tx.gross_fee : acc), 0);
  } else {
    // CATEGORY_BREAKDOWN
    reducedResult = mappedTxs.reduce((acc, tx) => {
      acc[tx.course] = (acc[tx.course] || 0) + tx.gross_fee;
      return acc;
    }, {});
  }

  // Generate Functional Pipeline Code vs Comprehension
  const functionalCode = `apply_gst = functools.partial(calc_gross, gst_rate=${gstRate})
cleared_txs = filter(lambda tx: ${filterMode === "CLEARED" ? "tx['status'] == 'CLEARED'" : filterMode === "HIGH_FEE" ? "tx['base_fee'] >= 30000" : "True"}, transactions)
mapped_stream = map(lambda tx: {**tx, 'gross': apply_gst(tx['base_fee'])}, cleared_txs)
result = functools.reduce(lambda acc, tx: ${reduceMode === "SUM_REVENUE" ? "acc + tx['gross']" : reduceMode === "MAX_FEE" ? "max(acc, tx['gross'])" : "{**acc, tx['course']: acc.get(tx['course'], 0) + tx['gross']}"}, mapped_stream, ${reduceMode === "CATEGORY_BREAKDOWN" ? "{}" : "0.0"})`;

  const comprehensionCode = `# Equivalent List Comprehension + Built-in sum():
gross_fees = [
    round(tx['base_fee'] * (1 + ${gstRate}), 2)
    for tx in transactions
    if ${filterMode === "CLEARED" ? "tx['status'] == 'CLEARED'" : filterMode === "HIGH_FEE" ? "tx['base_fee'] >= 30000" : "True"}
]
result = ${reduceMode === "SUM_REVENUE" ? "sum(gross_fees)" : reduceMode === "MAX_FEE" ? "max(gross_fees)" : "{...}"}`;

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
            Segment 3 • Module 003_005
          </span>
          <span className="text-xs sm:text-sm font-mono bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/80 shadow-sm shadow-cyan-950/50">
            Topic 3
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Advanced Comprehensions &amp; Functional Python
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Functional Tools: <span className="text-teal-400">map(), filter() &amp; functools.reduce()</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master Python's functional programming triad: lazy stream transformations with <code className="text-teal-300 font-mono">map()</code> and <code className="text-teal-300 font-mono">filter()</code>, sequential folding with <code className="text-cyan-300 font-mono">functools.reduce()</code>, currying with <code className="text-purple-300 font-mono">functools.partial</code>, accumulator patterns, and institutional ledger computations.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔄 `map(func, iterable)`
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🎯 `filter(predicate, iterable)`
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🧮 `functools.reduce(func, seq, init)`
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ❄️ `functools.partial` (Currying)
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: THE FUNCTIONAL TRIAD */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📐</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Functional Trinity: Transformation, Filtering &amp; Folding
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Functional programming treats computation as the evaluation of mathematical functions, eliminating side-effects and mutable state:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ `map(func, seq)`</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">map(lambda x: x*2, nums)</code>
                <p className="text-[11px] text-slate-300">
                  Applies function to every element lazily. Yields 1 transformed item per input item.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ `filter(pred, seq)`</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">filter(lambda x: x&gt;0, nums)</code>
                <p className="text-[11px] text-slate-300">
                  Tests each element with boolean predicate. Yields only matching elements.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ `reduce(fn, seq)`</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">reduce(lambda acc,x: acc+x, nums, 0)</code>
                <p className="text-[11px] text-slate-300">
                  Folds elements pairwise from left to right into a single scalar or aggregate state.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Reduce Empty Sequence Danger
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                Calling <code className="text-rose-400 font-mono">functools.reduce(lambda a, b: a + b, [])</code> raises <code className="text-rose-400 font-mono">TypeError: reduce() of empty sequence with no initial value</code>. Always provide a 3rd <code className="text-teal-300 font-mono">initializer</code> argument (e.g. <code className="text-teal-300 font-mono">0</code> or <code className="text-teal-300 font-mono">Decimal("0.00")</code>)!
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
                2. Visualizing Functional Pipelines &amp; Reduction Folding
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("trinity")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "trinity"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Functional Triad
              </button>
              <button
                onClick={() => setActiveInteractiveTab("lazyStream")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "lazyStream"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Lazy Stream Conveyor
              </button>
              <button
                onClick={() => setActiveInteractiveTab("folding")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "folding"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Reduce Folding Flow
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining the functional pipeline data stream, lazy memory buffers, and pairwise accumulator transitions:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "trinity" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">THE FUNCTIONAL TRINITY PIPELINE: MAP -&gt; FILTER -&gt; REDUCE</text>

                {/* 3 Step Pipeline */}
                <g transform="translate(30, 50)">
                  {/* Step 1 */}
                  <rect x="0" y="0" width="250" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="15" y="30" fill="#99f6e4" fontSize="11 font-bold">1. `filter(predicate)`</text>
                  <text x="15" y="55" fill="#38bdf8" fontSize="8 font-mono">Input: [28.5k, 32k, 25k, 12k]</text>
                  <text x="15" y="75" fill="#38bdf8" fontSize="8 font-mono">Predicate: fee &gt;= 25k</text>
                  <text x="15" y="95" fill="#34d399" fontSize="8 font-mono font-bold">Output: [28.5k, 32k, 25k]</text>

                  <rect x="15" y="115" width="220" height="100" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="25" y="140" fill="#34d399" fontSize="9 font-bold">Selective Filter:</text>
                  <text x="25" y="160" fill="#cbd5e1" fontSize="8">Discards non-matching</text>
                  <text x="25" y="175" fill="#cbd5e1" fontSize="8">elements from the stream.</text>

                  {/* Arrow 1 */}
                  <text x="265" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 2 */}
                  <rect x="295" y="0" width="250" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="310" y="30" fill="#a5f3fc" fontSize="11 font-bold">2. `map(apply_gst)`</text>
                  <text x="310" y="55" fill="#38bdf8" fontSize="8 font-mono">Transform: fee * 1.18</text>
                  <text x="310" y="75" fill="#ecfdf5" fontSize="8 font-mono font-bold">Mapped: [33.63k, 37.76k, 29.5k]</text>
                  <text x="310" y="95" fill="#34d399" fontSize="8 font-mono">Zero side-effects</text>

                  <rect x="310" y="115" width="220" height="100" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="320" y="140" fill="#38bdf8" fontSize="9 font-bold">Pure Mapping:</text>
                  <text x="320" y="160" fill="#cbd5e1" fontSize="8">Enriches transactions with</text>
                  <text x="320" y="175" fill="#cbd5e1" fontSize="8">tax without mutating originals.</text>

                  {/* Arrow 2 */}
                  <text x="560" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 3 */}
                  <rect x="590" y="0" width="230" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="605" y="30" fill="#c4b5fd" fontSize="11 font-bold">3. `functools.reduce()`</text>
                  <text x="605" y="55" fill="#c084fc" fontSize="8 font-mono">Reducer: lambda acc, x: acc + x</text>
                  <text x="605" y="75" fill="#34d399" fontSize="11 font-mono font-bold">Total: INR 100,890.00</text>

                  <rect x="605" y="115" width="200" height="100" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="615" y="140" fill="#c4b5fd" fontSize="9 font-bold">Pairwise Fold:</text>
                  <text x="615" y="160" fill="#cbd5e1" fontSize="8">Folds stream into single</text>
                  <text x="615" y="175" fill="#cbd5e1" fontSize="8">audited ledger balance.</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "lazyStream" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">LAZY STREAM EVALUATION: O(1) CONSTANT MEMORY PIPELINE</text>

                {/* Left: Eager Python 2 */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="12" fontWeight="bold">Eager List Pipeline (Legacy Python 2)</text>
                  
                  <text x="20" y="65" fill="#fca5a5" fontSize="8 font-mono">1. filter() allocates intermediate List A (8.5 MB)</text>
                  <text x="20" y="85" fill="#fca5a5" fontSize="8 font-mono">2. map() allocates intermediate List B (8.5 MB)</text>
                  <text x="20" y="105" fill="#fca5a5" fontSize="8 font-mono">3. reduce() consumes List B</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#090d16" stroke="#e11d48" />
                  <text x="30" y="155" fill="#fda4af" fontSize="9 font-bold">High Memory Overhead:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">Requires allocating full intermediate collections in RAM.</text>
                </g>

                {/* Right: Lazy Python 3 */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">Lazy Streaming Pipeline (Modern Python 3)</text>

                  <text x="20" y="65" fill="#34d399" fontSize="8 font-mono">1. `filter()` returns lazy iterator &lt;filter object&gt;</text>
                  <text x="20" y="85" fill="#34d399" fontSize="8 font-mono">2. `map()` returns lazy iterator &lt;map object&gt;</text>
                  <text x="20" y="105" fill="#34d399" fontSize="8 font-mono">3. Elements pulled ONE-BY-ONE as needed</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="155" fill="#34d399" fontSize="9 font-bold">O(1) Constant Memory:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">Streams multi-million record logs with zero memory spikes!</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">PAIRWISE ACCUMULATOR REDUCTION STEP-BY-STEP FLOW</text>

                {/* 4 Step Accumulator Walkthrough */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="12" fontWeight="bold">Step-by-Step Folding: `functools.reduce(lambda acc, x: acc + x, [10, 20, 30], 0)`</text>

                  <g transform="translate(20, 55)">
                    {/* Step 0 */}
                    <rect x="0" y="0" width="180" height="150" rx="6" fill="#090d16" stroke="#6d28d9" />
                    <text x="10" y="25" fill="#a78bfa" fontSize="10 font-bold">Step 0 (Init)</text>
                    <text x="10" y="55" fill="#cbd5e1" fontSize="8 font-mono">acc = 0 (Initializer)</text>
                    <text x="10" y="75" fill="#38bdf8" fontSize="8 font-mono">Stream: [10, 20, 30]</text>

                    {/* Step 1 */}
                    <rect x="200" y="0" width="180" height="150" rx="6" fill="#090d16" stroke="#6d28d9" />
                    <text x="210" y="25" fill="#38bdf8" fontSize="10 font-bold">Step 1 (First Item)</text>
                    <text x="210" y="55" fill="#cbd5e1" fontSize="8 font-mono">f(acc=0, x=10)</text>
                    <text x="210" y="75" fill="#34d399" fontSize="8 font-mono font-bold">New acc = 10</text>

                    {/* Step 2 */}
                    <rect x="400" y="0" width="180" height="150" rx="6" fill="#090d16" stroke="#6d28d9" />
                    <text x="410" y="25" fill="#38bdf8" fontSize="10 font-bold">Step 2 (Second Item)</text>
                    <text x="410" y="55" fill="#cbd5e1" fontSize="8 font-mono">f(acc=10, x=20)</text>
                    <text x="410" y="75" fill="#34d399" fontSize="8 font-mono font-bold">New acc = 30</text>

                    {/* Step 3 */}
                    <rect x="600" y="0" width="180" height="150" rx="6" fill="#064e3b" stroke="#10b981" />
                    <text x="610" y="25" fill="#34d399" fontSize="10 font-bold">Step 3 (Final Item)</text>
                    <text x="610" y="55" fill="#cbd5e1" fontSize="8 font-mono">f(acc=30, x=30)</text>
                    <text x="610" y="75" fill="#34d399" fontSize="11 font-mono font-bold">Return: 60</text>
                  </g>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE FUNCTIONAL LABORATORY */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Financial Ledger &amp; Tax Pipeline Laboratory
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Configure GST rates (using <code className="text-purple-300 font-mono">functools.partial</code>), toggle payment status filters, select reducer aggregation modes, and inspect live functional streams:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Controls */}
            <div className="space-y-4">
              {/* GST Rate Selector */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                  1. GST Tax Rate (functools.partial):
                </span>
                <div className="flex bg-slate-900 p-1.5 rounded-lg border border-slate-800 text-xs font-mono">
                  {[0.0, 0.05, 0.12, 0.18].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setGstRate(rate)}
                      className={clsx(
                        "flex-1 py-1 rounded transition-all",
                        gstRate === rate
                          ? "bg-teal-900/60 text-teal-300 font-bold border border-teal-700/80"
                          : "text-slate-400 hover:text-white"
                      )}
                    >
                      {rate * 100}% GST
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter Mode Selector */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                  2. Stage 1: `filter()` Selection:
                </span>
                <div className="flex bg-slate-900 p-1.5 rounded-lg border border-slate-800 text-xs font-mono">
                  {[
                    { id: "CLEARED", label: "Only CLEARED" },
                    { id: "HIGH_FEE", label: "Fee >= 30,000" },
                    { id: "ALL", label: "All Records" },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setFilterMode(f.id)}
                      className={clsx(
                        "flex-1 py-1 rounded transition-all",
                        filterMode === f.id
                          ? "bg-cyan-900/60 text-cyan-300 font-bold border border-cyan-700/80"
                          : "text-slate-400 hover:text-white"
                      )}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reducer Mode Selector */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold">
                  3. Stage 3: `functools.reduce()` Mode:
                </span>
                <div className="flex bg-slate-900 p-1.5 rounded-lg border border-slate-800 text-xs font-mono">
                  {[
                    { id: "SUM_REVENUE", label: "Sum Revenue" },
                    { id: "MAX_FEE", label: "Max Fee" },
                    { id: "CATEGORY_BREAKDOWN", label: "By Course" },
                  ].map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setReduceMode(r.id)}
                      className={clsx(
                        "flex-1 py-1 rounded transition-all",
                        reduceMode === r.id
                          ? "bg-purple-900/60 text-purple-300 font-bold border border-purple-700/80"
                          : "text-slate-400 hover:text-white"
                      )}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggle Comparison */}
              <div className="pt-1">
                <label className="flex items-center gap-2 p-2 bg-slate-900 rounded border border-slate-800 text-xs font-mono cursor-pointer">
                  <input
                    type="checkbox"
                    checked={viewComprehensionEquiv}
                    onChange={(e) => setViewComprehensionEquiv(e.target.checked)}
                    className="accent-teal-500 rounded"
                  />
                  <span>View Equivalent List Comprehension</span>
                </label>
              </div>
            </div>

            {/* Code Generator & Output Inspector */}
            <div className="space-y-4 flex flex-col justify-between">
              {/* Generated Code */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
                <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  {viewComprehensionEquiv ? "Comprehension + sum() Equivalent:" : "Generated Functional Pipeline (map + filter + reduce):"}
                </div>
                <pre className="text-teal-300 text-[11px] leading-relaxed break-all font-mono overflow-x-auto">
                  {viewComprehensionEquiv ? comprehensionCode : functionalCode}
                </pre>
              </div>

              {/* Reduction Output */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex-1 overflow-y-auto max-h-[160px] font-mono text-xs space-y-1">
                <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400">
                  <span>Reduction Final Folded Result:</span>
                  <span className="text-emerald-400">Audited State</span>
                </div>
                <div className="text-white text-base font-bold pt-2">
                  {typeof reducedResult === "number" ? (
                    <span>INR {reducedResult.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                  ) : (
                    <pre className="text-xs text-slate-200">{JSON.stringify(reducedResult, null, 2)}</pre>
                  )}
                </div>
                <div className="text-[10px] text-slate-400 pt-1">
                  Processed {mappedTxs.length} records through lazy stream.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER FUNCTIONAL MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Functional Tool Reference Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Functional Tool</th>
                  <th className="py-3.5 px-4 font-bold">Module Scope</th>
                  <th className="py-3.5 px-4 font-bold">Return Type (Python 3)</th>
                  <th className="py-3.5 px-4 font-bold">Best Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">`map(func, seq)`</td>
                  <td className="py-3 px-4 font-mono text-slate-200">Built-in</td>
                  <td className="py-3 px-4 text-emerald-400">Lazy Iterator (`map object`)</td>
                  <td className="py-3 px-4">Fast C-level casts (`map(int, ...)` )</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">`filter(pred, seq)`</td>
                  <td className="py-3 px-4 font-mono text-slate-200">Built-in</td>
                  <td className="py-3 px-4 text-emerald-400">Lazy Iterator (`filter object`)</td>
                  <td className="py-3 px-4">Falsy value removal (`filter(None, ...)` )</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">`reduce(fn, seq, init)`</td>
                  <td className="py-3 px-4 font-mono text-slate-200">`functools`</td>
                  <td className="py-3 px-4 text-purple-300">Single scalar / dictionary</td>
                  <td className="py-3 px-4">Custom multi-metric state folding</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">`partial(fn, *args)`</td>
                  <td className="py-3 px-4 font-mono text-slate-200">`functools`</td>
                  <td className="py-3 px-4 text-amber-300">Callable (`partial object`)</td>
                  <td className="py-3 px-4">Freezing parameters for pipelines</td>
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
            Explore 4 production-grade Python scripts demonstrating functional fundamentals, benchmarks vs comprehensions, partial application, and financial tax pipelines:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "map_filter_reduce_fundamentals.py",
                code: fundamentalsCode,
                description: "map, filter, and functools.reduce with lazy iterators and accumulators.",
              },
              {
                filename: "map_filter_vs_comprehensions_and_lambdas.py",
                code: comparisonCode,
                description: "Syntactic and performance benchmarks of map/filter vs comprehensions.",
              },
              {
                filename: "advanced_functional_pipelines_and_composition.py",
                code: advancedPipelineCode,
                description: "Functional pipelines, functools.partial, and custom reduce state aggregations.",
              },
              {
                filename: "institutional_financial_ledger_functional_pipeline.py",
                code: financialLedgerCode,
                description: "Complete map, filter, reduce, and partial financial audit pipelines.",
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
                <span>❌</span> Trap 1: Missing Initializer in `reduce()`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Calling <code className="text-rose-300 font-mono">functools.reduce(fn, [])</code> without an initial value raises <code className="text-rose-300 font-mono">TypeError: reduce() of empty iterable with no initial value</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Always provide an explicit initializer like <code className="text-emerald-300">0</code> or <code className="text-emerald-300">&#123;&#125;</code>.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Single-Pass Iterator Exhaustion
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                <code className="text-amber-300 font-mono">map()</code> and <code className="text-amber-300 font-mono">filter()</code> return single-pass iterators; reading them a second time returns an empty sequence!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Materialize with <code className="text-emerald-300">list()</code> if multiple passes are needed.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Lambda Frame Overhead in `map()`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Using <code className="text-purple-300 font-mono">map(lambda x: x*2, nums)</code> is slower and less readable than <code className="text-emerald-300 font-mono">[x*2 for x in nums]</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Only use <code className="text-emerald-300">map()</code> when passing pre-existing named C-functions.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Quadratic List Concat with `reduce()`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Using <code className="text-cyan-300 font-mono">reduce(operator.concat, lists)</code> creates new intermediate lists on every step, leading to terrible O(N^2) quadratic time.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use <code className="text-emerald-300">itertools.chain.from_iterable()</code> for linear O(N) flattening.
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
            Comprehensive question-and-answer repository covering map, filter, functools.reduce, lazy iterators, partial functions, and accumulator patterns:
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
            Download or print the complete reference sheet with functional trinity recipes, reducer templates, and partial application patterns:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic3_functional_tools_notes.txt"
              title="Print Topic 3 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
