import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import genexpSyntax from "./topic10_files/generator_expressions_syntax_and_parentheses_rules.py?raw";
import chainedPipelines from "./topic10_files/chained_generator_expressions_pipeline.py?raw";
import memoryProfiling from "./topic10_files/memory_profiling_comprehensions_vs_genexps.py?raw";
import auditStreamAnalyzer from "./topic10_files/institutional_examination_audit_stream_analyzer.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic10_files/topic10_note.txt?raw";

// FAQ Questions
import questions from "./topic10_files/topic10_questions";

/**
 * Topic10: Generator expressions for memory efficiency
 * Module: 003_003_decorators-generators
 * Segment: 3 (Advanced Python Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic10() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("syntax");

  // Interactive GenExp Pipeline Builder State
  const initialStudents = [
    { id: "STU-101", name: "Sourav Mukherjee", score: 94.5, baseFee: 25000 },
    { id: "STU-102", name: "Priyanka Sen", score: 88.0, baseFee: 30000 },
    { id: "STU-103", name: "Rahul Verma", score: 62.0, baseFee: 18000 },
    { id: "STU-104", name: "Debolina Roy", score: 91.0, baseFee: 28000 },
    { id: "STU-105", name: "Amitava Sen", score: 54.0, baseFee: 22000 },
  ];

  const [minScoreFilter, setMinScoreFilter] = useState(70);
  const [applyScholarship, setApplyScholarship] = useState(true);
  const [pipelineCursor, setPipelineCursor] = useState(-1);
  const [streamedRecords, setStreamedRecords] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  // Filtered dataset
  const filteredCandidates = initialStudents.filter((s) => s.score >= minScoreFilter);

  const handleResetPipeline = () => {
    setPipelineCursor(-1);
    setStreamedRecords([]);
    setIsCompleted(false);
  };

  const handleStepPipeline = () => {
    if (isCompleted) return;

    const nextIdx = pipelineCursor + 1;
    if (nextIdx < filteredCandidates.length) {
      const student = filteredCandidates[nextIdx];
      const scholarshipRate = applyScholarship && student.score >= 90 ? 0.20 : applyScholarship && student.score >= 80 ? 0.10 : 0.0;
      const netFee = student.baseFee * (1 - scholarshipRate);

      const record = {
        id: student.id,
        name: student.name,
        score: student.score,
        tier: student.score >= 90 ? "DISTINCTION" : "MERIT",
        netFee,
        discount: scholarshipRate * 100,
      };

      setPipelineCursor(nextIdx);
      setStreamedRecords([...streamedRecords, record]);
    } else {
      setIsCompleted(true);
    }
  };

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
            Segment 3 • Module 003_003
          </span>
          <span className="text-xs sm:text-sm font-mono bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/80 shadow-sm shadow-cyan-950/50">
            Topic 10
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Decorators, Generators &amp; Iterators
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Generator Expressions <span className="text-teal-400">for Memory Efficiency</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master Python Generator Expressions: syntax <code className="text-teal-300 font-mono">(expr for x in seq if cond)</code>, parentheses reduction in single-argument functions (<code className="text-cyan-300 font-mono">sum()</code>, <code className="text-cyan-300 font-mono">max()</code>), short-circuiting with <code className="text-purple-300 font-mono">any()</code> / <code className="text-purple-300 font-mono">all()</code>, and composing chained streaming pipelines.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ( ) GenExp Syntax vs [ ] ListComp
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🎯 Single-Argument Parentheses Reduction
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ Short-Circuiting with any() &amp; all()
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔗 Chained Multi-Stage Pipelines
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: GENEXP ESSENTIALS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">💡</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. Generator Expression Syntax &amp; Rules
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Generator expressions provide concise inline generator syntax using parentheses instead of square brackets:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 not-prose">
              {/* List Comprehension */}
              <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 shadow-lg">
                <div className="text-slate-200 font-bold text-sm mb-1">📦 List Comprehension `[...]`</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">{"list_data = [x**2 for x in seq if x > 0]"}</code>
                <p className="text-[11px] text-slate-400">
                  Builds and populates the entire list in memory upfront. Consumes <code className="text-slate-300 font-mono">O(N)</code> RAM.
                </p>
              </div>

              {/* Generator Expression */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">⚡ Generator Expression `(...)`</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">{"gen_data = (x**2 for x in seq if x > 0)"}</code>
                <p className="text-[11px] text-slate-300">
                  Constructs a lazy generator iterator object. Consumes <code className="text-teal-300 font-mono">O(1)</code> constant memory (~112 bytes).
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                Parentheses Reduction in Single-Argument Calls
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                When passing a generator expression as the sole argument to a function, you can omit the redundant outer parentheses:<br />
                <span className="text-teal-300 font-bold">sum(x**2 for x in data)</span> <span className="text-slate-500">(Idiomatic)</span><br />
                <span className="text-slate-400">sum((x**2 for x in data))</span> <span className="text-slate-500">(Redundant outer parens)</span>
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
                2. Visualizing Comprehensions, Pipelines &amp; Short-Circuiting
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("syntax")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "syntax"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                `[]` vs `()` Allocation
              </button>
              <button
                onClick={() => setActiveInteractiveTab("pipeline")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "pipeline"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Chained Pipeline Flow
              </button>
              <button
                onClick={() => setActiveInteractiveTab("shortcircuit")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "shortcircuit"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Short-Circuit: any() / all()
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining memory buffers, multi-stage filter-map pipelines, and immediate short-circuiting termination:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "syntax" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">LIST COMPREHENSION `[...]` VS GENERATOR EXPRESSION `(...)`</text>

                {/* Left: List Comp */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="12" fontWeight="bold">List Comprehension: `[x**2 for x in data]`</text>
                  
                  <text x="20" y="60" fill="#fca5a5" fontSize="9 font-mono">1. Allocates full array on heap</text>
                  <text x="20" y="80" fill="#fca5a5" fontSize="9 font-mono">2. Evaluates all elements eagerly</text>
                  <text x="20" y="100" fill="#fca5a5" fontSize="9 font-mono">3. Returns full List object</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#090d16" stroke="#e11d48" />
                  <text x="30" y="155" fill="#fda4af" fontSize="9 font-bold">Memory &amp; Scale:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">• 1,000,000 ints: ~8.4 MB of RAM</text>
                  <text x="30" y="190" fill="#cbd5e1" fontSize="8">• O(N) Space Complexity</text>
                </g>

                {/* Right: GenExp */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="30" fill="#99f6e4" fontSize="12" fontWeight="bold">Generator Expression: `(x**2 for x in data)`</text>
                  
                  <text x="20" y="60" fill="#34d399" fontSize="9 font-mono">1. Allocates zero element arrays</text>
                  <text x="20" y="80" fill="#34d399" fontSize="9 font-mono">2. Evaluates 1 item on demand via `next()`</text>
                  <text x="20" y="100" fill="#34d399" fontSize="9 font-mono">3. Returns lightweight Generator object</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="155" fill="#34d399" fontSize="9 font-bold">Memory &amp; Scale:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">• 1,000,000 ints: ~112 Bytes of RAM</text>
                  <text x="30" y="190" fill="#cbd5e1" fontSize="8">• O(1) Constant Space Complexity</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "pipeline" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">CHAINED GENERATOR EXPRESSIONS PIPELINE (SOURCE → FILTER → MAP → SINK)</text>

                {/* 4 Pipeline Stages */}
                <g transform="translate(30, 50)">
                  {/* Stage 1 */}
                  <rect x="0" y="0" width="180" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="15" y="30" fill="#c4b5fd" fontSize="11 font-bold">1. Ingest Lines</text>
                  <text x="15" y="55" fill="#ecfdf5" fontSize="8 font-mono">raw_lines</text>
                  <rect x="15" y="110" width="150" height="100" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="25" y="135" fill="#c4b5fd" fontSize="9 font-bold">Stream Ingestion:</text>
                  <text x="25" y="155" fill="#cbd5e1" fontSize="8">Reads raw CSV text</text>
                  <text x="25" y="170" fill="#cbd5e1" fontSize="8">line-by-line.</text>

                  {/* Arrow 1 */}
                  <text x="190" y="125" fill="#38bdf8" fontSize="20" fontWeight="bold">→</text>

                  {/* Stage 2 */}
                  <rect x="215" y="0" width="180" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="230" y="30" fill="#a5f3fc" fontSize="11 font-bold">2. Parse &amp; Filter</text>
                  <text x="230" y="55" fill="#ecfdf5" fontSize="8 font-mono">(s.split(',') for s in l)</text>
                  <rect x="230" y="110" width="150" height="100" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="240" y="135" fill="#38bdf8" fontSize="9 font-bold">Schema Filter:</text>
                  <text x="240" y="155" fill="#cbd5e1" fontSize="8">Ignores invalid lines</text>
                  <text x="240" y="170" fill="#cbd5e1" fontSize="8">and comment headers.</text>

                  {/* Arrow 2 */}
                  <text x="405" y="125" fill="#38bdf8" fontSize="20" fontWeight="bold">→</text>

                  {/* Stage 3 */}
                  <rect x="430" y="0" width="180" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="445" y="30" fill="#99f6e4" fontSize="11 font-bold">3. Transform Fees</text>
                  <text x="445" y="55" fill="#ecfdf5" fontSize="8 font-mono">(compute_fee(x) for x)</text>
                  <rect x="445" y="110" width="150" height="100" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="455" y="135" fill="#34d399" fontSize="9 font-bold">Business Logic:</text>
                  <text x="455" y="155" fill="#cbd5e1" fontSize="8">Calculates discounts</text>
                  <text x="455" y="170" fill="#cbd5e1" fontSize="8">and net fee structures.</text>

                  {/* Arrow 3 */}
                  <text x="620" y="125" fill="#38bdf8" fontSize="20" fontWeight="bold">→</text>

                  {/* Stage 4 */}
                  <rect x="645" y="0" width="175" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="660" y="30" fill="#a7f3d0" fontSize="11 font-bold">4. Consumer Sink</text>
                  <text x="660" y="55" fill="#ecfdf5" fontSize="8 font-mono">sum(x.net for x in p)</text>
                  <rect x="660" y="110" width="145" height="100" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="670" y="135" fill="#34d399" fontSize="9 font-bold">Total Aggregation:</text>
                  <text x="670" y="155" fill="#cbd5e1" fontSize="8">Calculates sum with</text>
                  <text x="670" y="170" fill="#cbd5e1" fontSize="8">constant O(1) memory!</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">SHORT-CIRCUITING EVALUATION WITH `any()` AND `all()`</text>

                {/* 3 Step Pipeline */}
                <g transform="translate(30, 50)">
                  {/* Step 1 */}
                  <rect x="0" y="0" width="250" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="15" y="30" fill="#a5f3fc" fontSize="11 font-bold">1. Large Dataset (100K)</text>
                  <text x="15" y="55" fill="#ecfdf5" fontSize="8 font-mono">scores = [72, 85, 91, 58...]</text>

                  <rect x="15" y="110" width="220" height="105" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="25" y="135" fill="#38bdf8" fontSize="9 font-bold">Lazy Feeder:</text>
                  <text x="25" y="155" fill="#cbd5e1" fontSize="8">Generator expression yields</text>
                  <text x="25" y="170" fill="#cbd5e1" fontSize="8">one score at a time.</text>

                  {/* Arrow 1 */}
                  <text x="265" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 2 */}
                  <rect x="295" y="0" width="250" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="310" y="30" fill="#99f6e4" fontSize="11 font-bold">2. `any(s &gt;= 90 for s)`</text>
                  <text x="310" y="55" fill="#ecfdf5" fontSize="8 font-mono">Step 1: 72 &gt;= 90 -&gt; False</text>
                  <text x="310" y="75" fill="#ecfdf5" fontSize="8 font-mono">Step 2: 85 &gt;= 90 -&gt; False</text>
                  <text x="310" y="95" fill="#34d399" fontSize="8 font-mono font-bold">Step 3: 91 &gt;= 90 -&gt; TRUE!</text>

                  <rect x="310" y="120" width="220" height="95" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="320" y="145" fill="#34d399" fontSize="9 font-bold">Match Found!</text>
                  <text x="320" y="165" fill="#cbd5e1" fontSize="8">`any()` immediately returns True</text>
                  <text x="320" y="180" fill="#cbd5e1" fontSize="8">and halts all further iterations!</text>

                  {/* Arrow 2 */}
                  <text x="560" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 3 */}
                  <rect x="590" y="0" width="230" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="605" y="30" fill="#c4b5fd" fontSize="11 font-bold">3. 99,997 Items Skipped</text>
                  <text x="605" y="55" fill="#ecfdf5" fontSize="8 font-mono">Remaining items untouched</text>
                  <text x="605" y="75" fill="#34d399" fontSize="8 font-mono font-bold">Zero wasted CPU cycles</text>

                  <rect x="605" y="110" width="200" height="105" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="615" y="135" fill="#c4b5fd" fontSize="9 font-bold">Instant Execution:</text>
                  <text x="615" y="155" fill="#cbd5e1" fontSize="8">Completes in 0.002 ms</text>
                  <text x="615" y="170" fill="#cbd5e1" fontSize="8">without scanning the rest!</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE PIPELINE BUILDER PLAYGROUND */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Generator Expression Pipeline Laboratory &amp; Stepper
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Configure pipeline filters and step through the generator expression stream one record at a time to inspect lazy transformation in action:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Controls */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                  1. Pipeline Configuration
                </span>
                <button
                  onClick={handleResetPipeline}
                  className="text-[11px] font-mono text-slate-400 hover:text-white underline"
                >
                  Reset Stream
                </button>
              </div>

              {/* Filter Minimum Score */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono text-slate-300">
                  <span>Minimum Qualifying Score Filter:</span>
                  <span className="text-teal-300 font-bold">{minScoreFilter}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="90"
                  step="5"
                  value={minScoreFilter}
                  onChange={(e) => {
                    setMinScoreFilter(Number(e.target.value));
                    handleResetPipeline();
                  }}
                  className="w-full accent-teal-500 cursor-pointer"
                />
              </div>

              {/* Toggle Scholarship */}
              <label className="flex items-center gap-2 text-xs font-mono text-slate-300 cursor-pointer p-2 bg-slate-900 rounded border border-slate-800">
                <input
                  type="checkbox"
                  checked={applyScholarship}
                  onChange={(e) => {
                    setApplyScholarship(e.target.checked);
                    handleResetPipeline();
                  }}
                  className="accent-teal-500 rounded"
                />
                <span>Apply Merit Concession (20% for &gt;=90%, 10% for &gt;=80%)</span>
              </label>

              {/* Stepper Button */}
              <button
                onClick={handleStepPipeline}
                disabled={isCompleted}
                className={clsx(
                  "w-full py-3 rounded-lg text-xs font-mono font-bold transition-all shadow-lg",
                  isCompleted
                    ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
                    : "bg-teal-600 hover:bg-teal-500 text-white shadow-teal-950/50"
                )}
              >
                {isCompleted ? "GenExp Stream Exhausted" : "Execute `next(gen_pipeline)` -> (Pulls 1 item)"}
              </button>

              {/* Dataset Sequence */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800">
                <span className="text-xs font-mono text-slate-400 font-bold block uppercase">
                  Candidate Stream Sequence ({filteredCandidates.length} Eligible):
                </span>
                <div className="space-y-1">
                  {filteredCandidates.map((c, idx) => (
                    <div
                      key={c.id}
                      className={clsx(
                        "p-2 rounded text-xs font-mono border transition-all flex justify-between items-center",
                        pipelineCursor === idx
                          ? "bg-teal-950 border-teal-500 text-teal-200 font-bold animate-glow-teal"
                          : pipelineCursor > idx
                          ? "bg-slate-900/50 border-slate-800 text-slate-500"
                          : "bg-slate-900 border-slate-800 text-slate-300"
                      )}
                    >
                      <div>
                        <span className="font-bold">[{idx + 1}] {c.id}: </span>
                        <span>{c.name} ({c.score}%)</span>
                      </div>
                      <div className="text-right">
                        <span className="text-emerald-400 font-bold">INR {c.baseFee.toLocaleString()}</span>
                        {pipelineCursor === idx && (
                          <span className="text-teal-400 font-bold block text-[10px]">← ACTIVE POINTER</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Output & Telemetry */}
            <div className="space-y-4 flex flex-col justify-between">
              {/* Internal State */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
                <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  Pipeline Telemetry &amp; Aggregates:
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Pipeline Memory Footprint:</span>
                  <span className="text-emerald-400 font-bold">112 Bytes (O(1) Constant)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">`any(score &gt;= 90)` Short-Circuit:</span>
                  <span className="text-cyan-300 font-bold">
                    {filteredCandidates.some((s) => s.score >= 90) ? "True (Topper Present)" : "False"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Consumed Records:</span>
                  <span className="text-purple-300 font-bold">{streamedRecords.length} / {filteredCandidates.length}</span>
                </div>
              </div>

              {/* Stream Output */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex-1 overflow-y-auto max-h-[160px] space-y-1.5 font-mono text-xs">
                <span className="text-slate-400 block font-bold text-[10px] uppercase">
                  Transformed Stream Elements:
                </span>

                {streamedRecords.length === 0 ? (
                  <div className="text-slate-500 italic text-[11px]">
                    Click "Execute next(gen_pipeline)" to pull the first record.
                  </div>
                ) : (
                  streamedRecords.map((r, idx) => (
                    <div key={idx} className="p-1.5 bg-slate-950 rounded border border-slate-800 flex justify-between text-[11px]">
                      <div>
                        <span className="text-teal-300 font-bold">{r.id}: {r.name}</span>
                        <span className="text-[10px] text-slate-500 block">Tier: {r.tier} ({r.discount}% Concession)</span>
                      </div>
                      <span className="text-emerald-400 font-bold">INR {r.netFee.toLocaleString()}</span>
                    </div>
                  ))
                )}
                {isCompleted && (
                  <div className="p-1 bg-teal-950 border border-teal-700 text-teal-200 rounded text-center font-bold text-[11px]">
                    Pipeline Complete • Total Stream Revenue: INR {streamedRecords.reduce((a, b) => a + b.netFee, 0).toLocaleString()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER COMPREHENSION MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Comprehensions vs Generator Expressions Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Construct</th>
                  <th className="py-3.5 px-4 font-bold">Syntax</th>
                  <th className="py-3.5 px-4 font-bold">Resulting Type</th>
                  <th className="py-3.5 px-4 font-bold">Memory Footprint</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">Generator Expression</td>
                  <td className="py-3 px-4 font-mono text-slate-200">`(x for x in seq)`</td>
                  <td className="py-3 px-4 text-emerald-400">`generator` object</td>
                  <td className="py-3 px-4 text-emerald-400">O(1) Constant (~112 B)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">List Comprehension</td>
                  <td className="py-3 px-4 font-mono text-slate-200">`[x for x in seq]`</td>
                  <td className="py-3 px-4 text-slate-300">`list`</td>
                  <td className="py-3 px-4 text-rose-300">O(N) Linear (e.g. ~8 MB)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">Set Comprehension</td>
                  <td className="py-3 px-4 font-mono text-slate-200">{"`{x for x in seq}`"}</td>
                  <td className="py-3 px-4 text-slate-300">`set`</td>
                  <td className="py-3 px-4 text-rose-300">O(U) Unique elements</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">Dict Comprehension</td>
                  <td className="py-3 px-4 font-mono text-slate-200">{"`{k: v for k, v in seq}`"}</td>
                  <td className="py-3 px-4 text-slate-300">`dict`</td>
                  <td className="py-3 px-4 text-rose-300">O(K) Key-Value pairs</td>
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
            Explore 4 production-grade Python scripts demonstrating generator expression syntax, parentheses reduction, chained pipelines, memory profiling, and exam audit analyzers:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "generator_expressions_syntax_and_parentheses_rules.py",
                code: genexpSyntax,
                description: "Genexp syntax, parentheses reduction in sum(), max(), and short-circuiting with any/all.",
              },
              {
                filename: "chained_generator_expressions_pipeline.py",
                code: chainedPipelines,
                description: "4-stage Unix-style data pipeline using chained generator expressions.",
              },
              {
                filename: "memory_profiling_comprehensions_vs_genexps.py",
                code: memoryProfiling,
                description: "Memory profiling comparing List/Set/Dict Comprehensions vs GenExps using tracemalloc.",
              },
              {
                filename: "institutional_examination_audit_stream_analyzer.py",
                code: auditStreamAnalyzer,
                description: "Enterprise Examination Audit Stream Analyzer with zero intermediate array allocation.",
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
                <span>❌</span> Trap 1: Assuming `(...)` Creates a Tuple
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-rose-300 font-mono">(x for x in seq)</code> creates a Generator Expression, NOT a tuple!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> To create a tuple, use <code className="text-emerald-300">tuple(x for x in seq)</code>.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Redundant Double Parentheses
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-amber-300 font-mono">sum(((x**2 for x in data)))</code> adds ugly redundant parentheses.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Write <code className="text-emerald-300">sum(x**2 for x in data)</code>.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Subscripting GenExp (`g[0]`)
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Generator expressions do not support index lookups, raising <code className="text-purple-300 font-mono">TypeError: 'generator' object is not subscriptable</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use <code className="text-emerald-300">next(gen)</code> or <code className="text-emerald-300">itertools.islice()</code>.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Reusing Exhausted GenExp
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Running <code className="text-cyan-300 font-mono">total = sum(g)</code> exhausts <code className="text-cyan-300 font-mono">g</code>; subsequent calls like <code className="text-cyan-300 font-mono">max(g)</code> will raise ValueError.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Re-define the generator expression for every consumption pass.
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
            Comprehensive question-and-answer repository covering generator expressions, parentheses rules, short-circuiting, and memory profiling:
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
            Download or print the complete reference sheet with generator expression syntax, parentheses reductions, and pipeline recipes:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic10_generator_expressions_notes.txt"
              title="Print Topic 10 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
