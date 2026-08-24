import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import readabilityCode from "./topic2_files/readability_metrics_and_zen_of_python.py?raw";
import refactoringCode from "./topic2_files/refactoring_complex_comprehensions_to_loops.py?raw";
import memoryCode from "./topic2_files/memory_and_profiling_comprehensions_vs_generators.py?raw";
import cleanerSuiteCode from "./topic2_files/institutional_admission_roster_cleaner_suite.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic2_files/topic2_note.txt?raw";

// FAQ Questions
import questions from "./topic2_files/topic2_questions";

/**
 * Topic2: Readability guidelines: When to use comprehensions vs loops
 * Module: 003_005_advance-comprehensions
 * Segment: 3 (Advanced Python Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic2() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("decisionTree");

  // Interactive Laboratory State
  const scenarios = [
    {
      id: "simple_map",
      title: "1. Simple Filter & Map",
      verdict: "COMPREHENSION_IDEAL",
      compCode: `honors = [s['name'] for s in students if s['score'] >= 90]`,
      loopCode: `honors = []\nfor s in students:\n    if s['score'] >= 90:\n        honors.append(s['name'])`,
      reason: "Single loop, simple filter, zero side-effects. Comprehension is concise and ~30% faster.",
      score: 98,
    },
    {
      id: "side_effect",
      title: "2. Side-Effect Audit Logger",
      verdict: "LOOP_REQUIRED",
      compCode: `[logger.info(f"Audit: {s['id']}") for s in students]  # ANTI-PATTERN!`,
      loopCode: `for s in students:\n    logger.info(f"Audit: {s['id']}")\n    audit_db.record_entry(s)`,
      reason: "Comprehension creates a useless [None, None] list in RAM. Procedural loop is proper for I/O.",
      score: 35,
    },
    {
      id: "exceptions",
      title: "3. Dirty Payload Exception Handling",
      verdict: "LOOP_REQUIRED",
      compCode: `[float(s['marks']) for s in dirty_records]  # CRASHES ON INVALID STRINGS!`,
      loopCode: `clean_scores = []\nfor s in dirty_records:\n    try:\n        clean_scores.append(float(s['marks']))\n    except (ValueError, TypeError):\n        quarantine.append(s)`,
      reason: "Comprehensions cannot contain try...except. Procedural loop handles errors defensively.",
      score: 20,
    },
    {
      id: "monster_nested",
      title: "4. Monster 4-Level Nested Logic",
      verdict: "LOOP_REQUIRED",
      compCode: `[v*2 if v%2==0 else v*3 for lay in cube for r in lay for v in r if v>5]  # CRYPTIC!`,
      loopCode: `results = []\nfor layer in cube:\n    for row in layer:\n        for val in row:\n            if val > 5:\n                transformed = val * 2 if val % 2 == 0 else val * 3\n                results.append(transformed)`,
      reason: "Exceeds 2-clause threshold. Violates Zen of Python ('Readability counts').",
      score: 15,
    },
  ];

  const [selectedScenarioId, setSelectedScenarioId] = useState("simple_map");
  const [viewMode, setViewMode] = useState("compare"); // compare | comp | loop

  const activeScenario = scenarios.find((s) => s.id === selectedScenarioId) || scenarios[0];

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
            Topic 2
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Advanced Comprehensions &amp; Functional Python
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Readability Guidelines: <span className="text-teal-400">Comprehensions vs Loops</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master Python's core software engineering principles: The Zen of Python rules ("Readability counts", "Flat is better than nested"), the empirical 2-clause threshold rule, refactoring side-effect anti-patterns, handling defensive exceptions with <code className="text-teal-300 font-mono">try...except</code>, and memory profiling eager lists vs lazy generators.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📖 Zen of Python ("Readability Counts")
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📏 The 2-Clause Threshold Rule
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ Defensive `try...except` Handling
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ Eager List vs Lazy Generator Memory
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: ARCHITECTURAL DECISION PRINCIPLES */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚖️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Comprehension vs Loop Decision Rubric
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Comprehensions are powerful tools for data construction, but overuse leads to cryptic "code golf" that creates maintainability hazards:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 not-prose">
              {/* When to use Comprehensions */}
              <div className="p-5 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg space-y-2">
                <div className="text-teal-400 font-bold text-sm flex items-center gap-2">
                  <span>✅</span> When to Use Comprehensions
                </div>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li>Constructing a new list, dict, or set from an iterable</li>
                  <li>At most 1 loop and 1 simple filter guard (Max 2 clauses)</li>
                  <li>Pure transformations without external side-effects</li>
                  <li>Clear, expressive 1-line or cleanly indented PEP 8 expressions</li>
                </ul>
              </div>

              {/* When to use Procedural Loops */}
              <div className="p-5 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg space-y-2">
                <div className="text-cyan-400 font-bold text-sm flex items-center gap-2">
                  <span>🔄</span> When to Use Procedural Loops
                </div>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li>Executing side-effects (logging, file I/O, database writes)</li>
                  <li>Handling exceptions defensively (<code className="text-cyan-300">try...except</code>)</li>
                  <li>Complex branching (<code className="text-cyan-300">elif</code> ladders, early <code className="text-cyan-300">break</code>/<code className="text-cyan-300">continue</code>)</li>
                  <li>Logic exceeds 2 nested loop levels or requires debugging step-throughs</li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Side-Effect Anti-Pattern Warning
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                Writing <code className="text-rose-400 font-mono">[audit_log(x) for x in items]</code> allocates an unnecessary list of <code className="text-slate-400 font-mono">[None, None, ...]</code> in heap RAM that is immediately discarded. Always use a standard <code className="text-teal-300 font-mono">for</code> loop for side-effects!
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
                2. Visual Decision Tree, Complexity &amp; Memory Allocation
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("decisionTree")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "decisionTree"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Decision Tree
              </button>
              <button
                onClick={() => setActiveInteractiveTab("complexity")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "complexity"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Cognitive Complexity
              </button>
              <button
                onClick={() => setActiveInteractiveTab("memory")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "memory"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Memory: List vs Gen
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining the decision flowchart, cyclomatic threshold limits, and heap memory allocation curves:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "decisionTree" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">COMPREHENSION VS PROCEDURAL LOOP DECISION TREE</text>

                {/* 3 Step Pipeline */}
                <g transform="translate(30, 50)">
                  {/* Step 1 */}
                  <rect x="0" y="0" width="250" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="15" y="30" fill="#c4b5fd" fontSize="11 font-bold">1. Primary Purpose Question</text>
                  <text x="15" y="55" fill="#38bdf8" fontSize="8 font-mono">Building new collection?</text>
                  <text x="15" y="75" fill="#ecfdf5" fontSize="8 font-mono">OR executing side-effects?</text>

                  <rect x="15" y="105" width="220" height="110" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="25" y="130" fill="#f43f5e" fontSize="9 font-bold">If Side-Effects (I/O, DB, Print):</text>
                  <text x="25" y="150" fill="#cbd5e1" fontSize="8 font-bold">➡️ USE FOR LOOP</text>
                  <text x="25" y="170" fill="#34d399" fontSize="9 font-bold">If Building Collection:</text>
                  <text x="25" y="190" fill="#cbd5e1" fontSize="8">Proceed to step 2 ➡️</text>

                  {/* Arrow 1 */}
                  <text x="265" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 2 */}
                  <rect x="295" y="0" width="250" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="310" y="30" fill="#a5f3fc" fontSize="11 font-bold">2. Complexity &amp; Error Checks</text>
                  <text x="310" y="55" fill="#38bdf8" fontSize="8 font-mono">Needs `try...except`?</text>
                  <text x="310" y="75" fill="#38bdf8" fontSize="8 font-mono">Clauses &gt; 2 levels?</text>

                  <rect x="310" y="105" width="220" height="110" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="320" y="130" fill="#f43f5e" fontSize="9 font-bold">If Exceptions / &gt; 2 Loops:</text>
                  <text x="320" y="150" fill="#cbd5e1" fontSize="8 font-bold">➡️ USE FOR LOOP</text>
                  <text x="320" y="170" fill="#34d399" fontSize="9 font-bold">If Simple &amp; Safe:</text>
                  <text x="320" y="190" fill="#cbd5e1" fontSize="8">Proceed to step 3 ➡️</text>

                  {/* Arrow 2 */}
                  <text x="560" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 3 */}
                  <rect x="590" y="0" width="230" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="605" y="30" fill="#a7f3d0" fontSize="11 font-bold">3. Optimal Comprehension</text>
                  <text x="605" y="55" fill="#34d399" fontSize="9 font-mono font-bold">[x for x in seq if cond]</text>
                  <text x="605" y="75" fill="#ecfdf5" fontSize="8 font-mono">Clean, Idiomatic &amp; Fast</text>

                  <rect x="605" y="105" width="200" height="110" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="615" y="130" fill="#34d399" fontSize="9 font-bold">Optimal Choice:</text>
                  <text x="615" y="150" fill="#cbd5e1" fontSize="8">Executes at C-speed</text>
                  <text x="615" y="165" fill="#cbd5e1" fontSize="8">with maximum readability</text>
                  <text x="615" y="180" fill="#cbd5e1" fontSize="8">and 100% Zen compliance.</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "complexity" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">COGNITIVE COMPLEXITY &amp; READABILITY THRESHOLD</text>

                {/* Left: Clean Comprehension */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="30" fill="#99f6e4" fontSize="12" fontWeight="bold">1. Clean Comprehension (Cognitive Score: 95/100)</text>
                  
                  <text x="20" y="65" fill="#34d399" fontSize="9 font-mono font-bold">honors = [s['name'] for s in students if s['score'] &gt;= 90]</text>

                  <rect x="20" y="100" width="340" height="115" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="125" fill="#34d399" fontSize="9 font-bold">Zen of Python Compliance:</text>
                  <text x="30" y="145" fill="#cbd5e1" fontSize="8">• Simple is better than complex (True)</text>
                  <text x="30" y="160" fill="#cbd5e1" fontSize="8">• Readability counts (True)</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">• Single scan mental model</text>
                </g>

                {/* Right: Monster Comprehension */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="12" fontWeight="bold">2. Monster Comprehension (Cognitive Score: 15/100)</text>

                  <text x="20" y="65" fill="#fca5a5" fontSize="8 font-mono">[v*2 if v%2==0 else v*3 for L in M for r in L for v in r if v&gt;5]</text>

                  <rect x="20" y="100" width="340" height="115" rx="4" fill="#090d16" stroke="#e11d48" />
                  <text x="30" y="125" fill="#fda4af" fontSize="9 font-bold">Maintainability Violations:</text>
                  <text x="30" y="145" fill="#cbd5e1" fontSize="8">• 3 nested loops + ternary ladder (Violates 2-clause rule)</text>
                  <text x="30" y="160" fill="#cbd5e1" fontSize="8">• Impossible to set breakpoints or log intermediate states</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">• Refactor immediately to procedural loop!</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">MEMORY PROFILING: 1,000,000 ELEMENTS (LIST VS GENERATOR)</text>

                {/* Left: Eager List */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="12" fontWeight="bold">Eager List Comprehension `[x for x in ...]`</text>
                  
                  <text x="20" y="60" fill="#fca5a5" fontSize="8 font-mono">1,000,000 Integers Allocated in RAM</text>
                  <text x="20" y="80" fill="#f43f5e" fontSize="16 font-bold">~8.5 MB Heap Memory</text>

                  <rect x="20" y="110" width="340" height="105" rx="4" fill="#090d16" stroke="#e11d48" />
                  <text x="30" y="135" fill="#fda4af" fontSize="9 font-bold">Allocation Invariant:</text>
                  <text x="30" y="155" fill="#cbd5e1" fontSize="8">Full O(N) memory allocated up front.</text>
                  <text x="30" y="170" fill="#cbd5e1" fontSize="8">Essential for indexing (`M[0]`), `len()`, or multiple passes.</text>
                </g>

                {/* Right: Lazy Generator */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">Lazy Generator Expression `(x for x in ...)`</text>

                  <text x="20" y="60" fill="#34d399" fontSize="8 font-mono">Streams 1 Item at a Time on Demand</text>
                  <text x="20" y="80" fill="#34d399" fontSize="16 font-bold">104 Bytes Constant O(1) Memory!</text>

                  <rect x="20" y="110" width="340" height="105" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="135" fill="#34d399" fontSize="9 font-bold">Streaming Invariant:</text>
                  <text x="30" y="155" fill="#cbd5e1" fontSize="8">Constant O(1) memory footprint (~80,000x less RAM!).</text>
                  <text x="30" y="170" fill="#cbd5e1" fontSize="8">Ideal for passing directly to `sum()`, `max()`, or file streaming.</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE READABILITY LABORATORY */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Readability &amp; Refactoring Laboratory
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Select a coding scenario, compare raw comprehensions against refactored procedural loops, and inspect Zen of Python quality scorecards:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Scenario Selector & Controls */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                  1. Select Code Scenario
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  Total Scenarios: {scenarios.length}
                </span>
              </div>

              {/* Scenario Buttons */}
              <div className="space-y-2">
                {scenarios.map((sc) => (
                  <button
                    key={sc.id}
                    onClick={() => setSelectedScenarioId(sc.id)}
                    className={clsx(
                      "w-full text-left p-3 rounded-lg border font-mono text-xs transition-all flex items-center justify-between",
                      selectedScenarioId === sc.id
                        ? "bg-teal-950/60 border-teal-600/80 text-white shadow-md"
                        : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
                    )}
                  >
                    <span>{sc.title}</span>
                    <span
                      className={clsx(
                        "px-2 py-0.5 rounded text-[10px] font-bold",
                        sc.verdict === "COMPREHENSION_IDEAL"
                          ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                          : "bg-rose-950 text-rose-300 border border-rose-800"
                      )}
                    >
                      {sc.verdict === "COMPREHENSION_IDEAL" ? "✅ USE COMPREHENSION" : "🔄 USE FOR LOOP"}
                    </span>
                  </button>
                ))}
              </div>

              {/* View Switcher */}
              <div className="pt-2">
                <div className="flex bg-slate-900 p-1.5 rounded-lg border border-slate-800 text-xs font-mono">
                  <button
                    onClick={() => setViewMode("compare")}
                    className={clsx(
                      "flex-1 py-1 rounded transition-all",
                      viewMode === "compare"
                        ? "bg-teal-900/60 text-teal-300 font-bold border border-teal-700/80"
                        : "text-slate-400 hover:text-white"
                    )}
                  >
                    Side-by-Side Diff
                  </button>
                  <button
                    onClick={() => setViewMode("comp")}
                    className={clsx(
                      "flex-1 py-1 rounded transition-all",
                      viewMode === "comp"
                        ? "bg-cyan-900/60 text-cyan-300 font-bold border border-cyan-700/80"
                        : "text-slate-400 hover:text-white"
                    )}
                  >
                    Comprehension
                  </button>
                  <button
                    onClick={() => setViewMode("loop")}
                    className={clsx(
                      "flex-1 py-1 rounded transition-all",
                      viewMode === "loop"
                        ? "bg-purple-900/60 text-purple-300 font-bold border border-purple-700/80"
                        : "text-slate-400 hover:text-white"
                    )}
                  >
                    Procedural Loop
                  </button>
                </div>
              </div>
            </div>

            {/* Code Inspector & Quality Scorecard */}
            <div className="space-y-4 flex flex-col justify-between">
              {/* Quality & Scorecard */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
                <div className="flex justify-between items-center text-[10px] uppercase font-bold text-slate-400">
                  <span>Zen of Python Compliance Score:</span>
                  <span className={clsx(activeScenario.score >= 70 ? "text-emerald-400 font-bold" : "text-rose-400 font-bold")}>
                    {activeScenario.score} / 100
                  </span>
                </div>
                <div className="text-slate-300 text-[11px] leading-relaxed pt-1">
                  {activeScenario.reason}
                </div>
              </div>

              {/* Code Previews */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex-1 overflow-y-auto max-h-[190px] font-mono text-xs space-y-3">
                {(viewMode === "compare" || viewMode === "comp") && (
                  <div className="space-y-1">
                    <span className="text-[10px] text-teal-400 font-bold uppercase block">Comprehension Expression:</span>
                    <pre className="text-slate-200 text-[11px] leading-relaxed bg-slate-950 p-2 rounded border border-slate-800 overflow-x-auto">
                      {activeScenario.compCode}
                    </pre>
                  </div>
                )}

                {(viewMode === "compare" || viewMode === "loop") && (
                  <div className="space-y-1">
                    <span className="text-[10px] text-cyan-400 font-bold uppercase block">Refactored Procedural Loop:</span>
                    <pre className="text-slate-200 text-[11px] leading-relaxed bg-slate-950 p-2 rounded border border-slate-800 overflow-x-auto">
                      {activeScenario.loopCode}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER DECISION MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Decision Rubric Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Criteria</th>
                  <th className="py-3.5 px-4 font-bold">List Comprehension</th>
                  <th className="py-3.5 px-4 font-bold">Procedural `for` Loop</th>
                  <th className="py-3.5 px-4 font-bold">Generator `(x for ...)`</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">Side-Effects (I/O)</td>
                  <td className="py-3 px-4 text-rose-400">❌ Anti-pattern</td>
                  <td className="py-3 px-4 text-emerald-400">✅ Recommended</td>
                  <td className="py-3 px-4 text-rose-400">❌ Anti-pattern</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">Exception Handling</td>
                  <td className="py-3 px-4 text-rose-400">❌ Not supported</td>
                  <td className="py-3 px-4 text-emerald-400">✅ Full `try...except`</td>
                  <td className="py-3 px-4 text-rose-400">❌ Not supported</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">Memory Usage</td>
                  <td className="py-3 px-4 text-amber-300">O(N) Full RAM</td>
                  <td className="py-3 px-4 text-slate-200">Variable</td>
                  <td className="py-3 px-4 text-emerald-400">✅ O(1) Constant</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">C-Speed Opcode</td>
                  <td className="py-3 px-4 text-emerald-400">✅ Fast `LIST_APPEND`</td>
                  <td className="py-3 px-4 text-slate-200">Standard bytecode</td>
                  <td className="py-3 px-4 text-emerald-400">✅ Fast stream</td>
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
            Explore 4 production-grade Python scripts demonstrating readability guidelines, monster comprehension refactoring, memory profiling, and admission roster cleaners:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "readability_metrics_and_zen_of_python.py",
                code: readabilityCode,
                description: "Zen of Python principles, 2-clause threshold, and side-effect anti-patterns.",
              },
              {
                filename: "refactoring_complex_comprehensions_to_loops.py",
                code: refactoringCode,
                description: "Refactoring monster comprehensions to clean procedural loops with exception handling.",
              },
              {
                filename: "memory_and_profiling_comprehensions_vs_generators.py",
                code: memoryCode,
                description: "Memory benchmarks with sys.getsizeof and timeit (List vs Generator).",
              },
              {
                filename: "institutional_admission_roster_cleaner_suite.py",
                code: cleanerSuiteCode,
                description: "Strategic balance of defensive loops and idiomatic comprehensions in student pipelines.",
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
                <span>❌</span> Trap 1: Side-Effects in Comprehensions
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-rose-300 font-mono">[print(x) for x in seq]</code> wastes heap memory constructing an immediately discarded list of <code className="text-rose-300 font-mono">[None, ...]</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Use standard <code className="text-emerald-300">for</code> loops for side-effects and logging.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Lack of Native Exception Handling
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                If a single element raises an unhandled exception inside a comprehension, the entire pipeline crashes with all partially computed items lost.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use a procedural loop with <code className="text-emerald-300">try...except</code> to quarantine bad records.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Memory Exhaustion on Massive Streams
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Using <code className="text-purple-300 font-mono">sum([x for x in range(10_000_000)])</code> creates an 85 MB list in RAM instead of streaming directly.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use lazy generator expressions <code className="text-emerald-300">sum(x for x in range(...))</code>.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Code Golf Tech Debt
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing 4-line monster comprehensions solely to minimize line count slows down team pull requests and obscures edge case bugs.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> "Readability counts." Keep comprehensions under 2 clauses.
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
            Comprehensive question-and-answer repository covering readability guidelines, Zen of Python principles, exception handling, and memory profiling:
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
            Download or print the complete reference sheet with readability rubrics, refactoring decision trees, and memory profiling metrics:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic2_readability_guidelines_notes.txt"
              title="Print Topic 2 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
