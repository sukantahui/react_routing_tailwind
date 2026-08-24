import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import fundamentalsCode from "./topic0_files/list_dict_set_comprehension_fundamentals.py?raw";
import conditionalsCode from "./topic0_files/conditional_expressions_in_comprehensions.py?raw";
import dictSetTransformCode from "./topic0_files/dict_and_set_advanced_transformations.py?raw";
import academicSuiteCode from "./topic0_files/institutional_student_marks_comprehension_engine.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic0_files/topic0_note.txt?raw";

// FAQ Questions
import questions from "./topic0_files/topic0_questions";

/**
 * Topic0: Deep Dive: List, Dict, and Set Comprehensions
 * Module: 003_005_advance-comprehensions
 * Segment: 3 (Advanced Python Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic0() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("syntax");

  // Interactive Laboratory State
  const sampleStudents = [
    { id: "STU-101", name: "Sourav Mukherjee", score: 95.5, dept: "AI_ENGINEERING" },
    { id: "STU-102", name: "Priyanka Sen", score: 88.0, dept: "DATA_SCIENCE" },
    { id: "STU-103", name: "Debolina Roy", score: 96.0, dept: "AI_ENGINEERING" },
    { id: "STU-104", name: "Rahul Verma", score: 78.0, dept: "WEB_DEV" },
    { id: "STU-105", name: "Sneha Gupta", score: 92.5, dept: "DATA_SCIENCE" },
  ];

  const [containerType, setContainerType] = useState("list"); // list | dict | set
  const [minScore, setMinScore] = useState(85);
  const [useTernary, setUseTernary] = useState(true);
  const [filterAiOnly, setFilterAiOnly] = useState(false);
  const [invertDict, setInvertDict] = useState(false);

  // Compute live comprehension output and generated Python code
  const filteredList = sampleStudents.filter(
    (s) => s.score >= minScore && (!filterAiOnly || s.dept === "AI_ENGINEERING")
  );

  let generatedCode = "";
  let evaluatedOutput = null;

  if (containerType === "list") {
    if (useTernary) {
      generatedCode = `[f"{s['name']} (DISTINCTION)" if s['score'] >= 90 else f"{s['name']} (PASS)" for s in students if s['score'] >= ${minScore}${filterAiOnly ? " and s['dept'] == 'AI_ENGINEERING'" : ""}]`;
      evaluatedOutput = filteredList.map((s) =>
        s.score >= 90 ? `${s.name} (DISTINCTION)` : `${s.name} (PASS)`
      );
    } else {
      generatedCode = `[s['name'] for s in students if s['score'] >= ${minScore}${filterAiOnly ? " and s['dept'] == 'AI_ENGINEERING'" : ""}]`;
      evaluatedOutput = filteredList.map((s) => s.name);
    }
  } else if (containerType === "dict") {
    if (invertDict) {
      generatedCode = `{s['score']: s['name'] for s in students if s['score'] >= ${minScore}${filterAiOnly ? " and s['dept'] == 'AI_ENGINEERING'" : ""}}`;
      const dictOut = {};
      filteredList.forEach((s) => {
        dictOut[s.score] = s.name;
      });
      evaluatedOutput = dictOut;
    } else {
      generatedCode = `{s['id']: ("PLATINUM" if s['score'] >= 90 else "STANDARD") for s in students if s['score'] >= ${minScore}${filterAiOnly ? " and s['dept'] == 'AI_ENGINEERING'" : ""}}`;
      const dictOut = {};
      filteredList.forEach((s) => {
        dictOut[s.id] = s.score >= 90 ? "PLATINUM" : "STANDARD";
      });
      evaluatedOutput = dictOut;
    }
  } else {
    // Set comprehension
    generatedCode = `{s['dept'] for s in students if s['score'] >= ${minScore}${filterAiOnly ? " and s['dept'] == 'AI_ENGINEERING'" : ""}}`;
    evaluatedOutput = Array.from(new Set(filteredList.map((s) => s.dept)));
  }

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
            Topic 0
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Advanced Comprehensions &amp; Functional Python
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Deep Dive: <span className="text-teal-400">List, Dict, and Set Comprehensions</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master idiomatic comprehensions in Python: formal syntax grammar, C-level bytecode optimization (<code className="text-teal-300 font-mono">BUILD_LIST</code> &amp; <code className="text-teal-300 font-mono">LIST_APPEND</code>), the critical distinction between trailing filtering <code className="text-cyan-300 font-mono">if</code> and leading ternary <code className="text-cyan-300 font-mono">if-else</code> transformations, dictionary inversions, and set deduplication.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📋 `[expr for x in seq if cond]`
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔑 `&#123;k: v for k, v in d.items()&#125;`
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ `&#123;x for x in seq&#125;` (Deduplication)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🚀 C-Speed Bytecode Execution
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: COMPREHENSION FOUNDATIONS & SPEED */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚡</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Power &amp; Performance of Python Comprehensions
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Comprehensions provide a concise, declarative syntax to construct collections while executing at C-speed directly in Python's virtual machine:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ List Comprehension</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">[x * 2 for x in seq if x &gt; 0]</code>
                <p className="text-[11px] text-slate-300">
                  Constructs ordered lists in memory using specialized <code className="text-teal-300">LIST_APPEND</code> bytecode.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ Dict Comprehension</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">&#123;k: v for k, v in pairs&#125;</code>
                <p className="text-[11px] text-slate-300">
                  Maps keys to values, ideal for dataset indexing, filtering, and 1-to-1 dictionary inversions.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ Set Comprehension</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">&#123;s.upper() for s in tags&#125;</code>
                <p className="text-[11px] text-slate-300">
                  Extracts unique items with automatic hash-based deduplication and case normalization.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                Why Comprehensions are Faster than `for` Loop `.append()`
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                Traditional <code className="text-rose-400 font-mono">for</code> loops perform attribute lookup (<code className="text-slate-300">list.append</code>) and method frame creation on every single iteration. Comprehensions execute a dedicated C-level opcode (<code className="text-teal-300 font-mono">LIST_APPEND</code>), running up to 35% faster.
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
                2. Visualizing Syntax Anatomy, Conditional Logic &amp; Bytecode
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
                Comprehension Anatomy
              </button>
              <button
                onClick={() => setActiveInteractiveTab("conditionals")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "conditionals"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Filter `if` vs Ternary `if-else`
              </button>
              <button
                onClick={() => setActiveInteractiveTab("bytecode")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "bytecode"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Bytecode Optimization
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining comprehension syntax parts, conditional execution positioning, and C-level bytecode instructions:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "syntax" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">ANATOMY OF PYTHON COMPREHENSIONS (LIST, DICT, SET)</text>

                {/* 3 Container Layouts */}
                <g transform="translate(30, 50)">
                  {/* List */}
                  <rect x="0" y="0" width="250" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="15" y="30" fill="#99f6e4" fontSize="11 font-bold">1. List Comprehension `[...]`</text>
                  <text x="15" y="55" fill="#34d399" fontSize="9 font-mono font-bold">[expr for x in seq if cond]</text>
                  <text x="15" y="80" fill="#ecfdf5" fontSize="8 font-mono">• Delimiters: Square Brackets []</text>
                  <text x="15" y="98" fill="#ecfdf5" fontSize="8 font-mono">• Order: Preserves iteration order</text>

                  <rect x="15" y="120" width="220" height="95" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="25" y="145" fill="#34d399" fontSize="9 font-bold">Output Container:</text>
                  <text x="25" y="165" fill="#cbd5e1" fontSize="8">`list` object</text>
                  <text x="25" y="180" fill="#cbd5e1" fontSize="8">Allows duplicates &amp; indexing.</text>

                  {/* Arrow 1 */}
                  <text x="265" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Dict */}
                  <rect x="295" y="0" width="250" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="310" y="30" fill="#a5f3fc" fontSize="11 font-bold">2. Dict Comprehension `&#123;k: v&#125;`</text>
                  <text x="310" y="55" fill="#38bdf8" fontSize="9 font-mono font-bold">&#123;k: v for x in seq if cond&#125;</text>
                  <text x="310" y="80" fill="#ecfdf5" fontSize="8 font-mono">• Delimiters: Curly Braces + Colon</text>
                  <text x="310" y="98" fill="#ecfdf5" fontSize="8 font-mono">• Keys: Must be hashable &amp; unique</text>

                  <rect x="310" y="120" width="220" height="95" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="320" y="145" fill="#38bdf8" fontSize="9 font-bold">Output Container:</text>
                  <text x="320" y="165" fill="#cbd5e1" fontSize="8">`dict` object</text>
                  <text x="320" y="180" fill="#cbd5e1" fontSize="8">O(1) key-value lookup map.</text>

                  {/* Arrow 2 */}
                  <text x="560" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Set */}
                  <rect x="590" y="0" width="230" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="605" y="30" fill="#c4b5fd" fontSize="11 font-bold">3. Set Comprehension `&#123;...&#125;`</text>
                  <text x="605" y="55" fill="#c084fc" fontSize="9 font-mono font-bold">&#123;expr for x in seq if cond&#125;</text>
                  <text x="605" y="80" fill="#ecfdf5" fontSize="8 font-mono">• Delimiters: Curly Braces (No colon)</text>
                  <text x="605" y="98" fill="#ecfdf5" fontSize="8 font-mono">• Auto-Deduplication: Unique only</text>

                  <rect x="605" y="120" width="200" height="95" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="615" y="145" fill="#c4b5fd" fontSize="9 font-bold">Output Container:</text>
                  <text x="615" y="165" fill="#cbd5e1" fontSize="8">`set` object</text>
                  <text x="615" y="180" fill="#cbd5e1" fontSize="8">O(1) membership testing.</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "conditionals" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">FILTERING `if` (END) VS TERNARY `if-else` (START)</text>

                {/* Left: Filtering */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="30" fill="#99f6e4" fontSize="12" fontWeight="bold">1. Filtering `if` (At the END)</text>
                  
                  <text x="20" y="60" fill="#34d399" fontSize="9 font-mono font-bold">[s for s in scores if s &gt;= 50]</text>
                  <text x="20" y="85" fill="#ecfdf5" fontSize="8 font-mono">• Evaluated: PRE-APPEND filter guard</text>
                  <text x="20" y="105" fill="#ecfdf5" fontSize="8 font-mono">• Result: Omits non-matching elements</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="155" fill="#34d399" fontSize="9 font-bold">Length Impact:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">Output length &lt;= Input length (Subset selection).</text>
                </g>

                {/* Right: Ternary */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="12" fontWeight="bold">2. Ternary `if-else` (At the START)</text>

                  <text x="20" y="60" fill="#c084fc" fontSize="9 font-mono font-bold">["PASS" if s &gt;= 50 else "FAIL" for s in scores]</text>
                  <text x="20" y="85" fill="#ecfdf5" fontSize="8 font-mono">• Evaluated: PER-ITEM expression transform</text>
                  <text x="20" y="105" fill="#ecfdf5" fontSize="8 font-mono">• Result: Transforms EVERY element ('else' is mandatory!)</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="30" y="155" fill="#c4b5fd" fontSize="9 font-bold">Length Impact:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">Output length == Input length (1-to-1 transformation).</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">BYTECODE EXECUTION: `LIST_APPEND` VS RUNTIME METHOD CALLS</text>

                {/* Left: For Loop */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="12" fontWeight="bold">Traditional `for` loop + `.append()`</text>
                  
                  <text x="20" y="60" fill="#fca5a5" fontSize="8 font-mono">1. LOAD_FAST 'res'</text>
                  <text x="20" y="76" fill="#fca5a5" fontSize="8 font-mono">2. LOAD_METHOD 'append' (Runtime attribute lookup!)</text>
                  <text x="20" y="92" fill="#fca5a5" fontSize="8 font-mono">3. PRECALL + CALL (Creates function stack frame)</text>
                  <text x="20" y="108" fill="#fca5a5" fontSize="8 font-mono">4. POP_TOP</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#090d16" stroke="#e11d48" />
                  <text x="30" y="155" fill="#fda4af" fontSize="9 font-bold">Overhead per Iteration:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">Requires repeated dictionary lookups for 'append'.</text>
                </g>

                {/* Right: Comprehension */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">List Comprehension Bytecode</text>

                  <text x="20" y="60" fill="#34d399" fontSize="8 font-mono">1. BUILD_LIST 0 (Allocates list in C)</text>
                  <text x="20" y="76" fill="#34d399" fontSize="8 font-mono">2. FOR_ITER ...</text>
                  <text x="20" y="92" fill="#34d399" fontSize="8 font-mono font-bold">3. LIST_APPEND 1 (Direct C-level array insert!)</text>
                  <text x="20" y="108" fill="#34d399" fontSize="8 font-mono">4. RETURN_VALUE</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="155" fill="#34d399" fontSize="9 font-bold">Zero Method Overhead:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">Executes directly in optimized C opcode (~35% faster).</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE COMPREHENSION LABORATORY */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Comprehension Transformation Laboratory
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Configure container types, adjust minimum score filtering guards, toggle ternary distinctions, and observe live evaluated Python comprehensions:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Controls */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                  1. Target Container Type
                </span>
              </div>

              {/* Container Selector */}
              <div className="flex bg-slate-900 p-1.5 rounded-lg border border-slate-800 text-xs font-mono">
                <button
                  onClick={() => setContainerType("list")}
                  className={clsx(
                    "flex-1 py-1.5 rounded transition-all",
                    containerType === "list"
                      ? "bg-teal-900/60 text-teal-300 font-bold border border-teal-700/80"
                      : "text-slate-400 hover:text-white"
                  )}
                >
                  List `[...]`
                </button>
                <button
                  onClick={() => setContainerType("dict")}
                  className={clsx(
                    "flex-1 py-1.5 rounded transition-all",
                    containerType === "dict"
                      ? "bg-cyan-900/60 text-cyan-300 font-bold border border-cyan-700/80"
                      : "text-slate-400 hover:text-white"
                  )}
                >
                  Dict `&#123;k: v&#125;`
                </button>
                <button
                  onClick={() => setContainerType("set")}
                  className={clsx(
                    "flex-1 py-1.5 rounded transition-all",
                    containerType === "set"
                      ? "bg-purple-900/60 text-purple-300 font-bold border border-purple-700/80"
                      : "text-slate-400 hover:text-white"
                  )}
                >
                  Set `&#123;...&#125;`
                </button>
              </div>

              {/* Filter Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">Filter Guard: Minimum Score:</span>
                  <span className="text-teal-300 font-bold">{minScore}%</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={95}
                  value={minScore}
                  onChange={(e) => setMinScore(Number(e.target.value))}
                  className="w-full accent-teal-500 cursor-pointer"
                />
              </div>

              {/* Toggles */}
              <div className="space-y-2 text-xs font-mono pt-1">
                {containerType === "list" && (
                  <label className="flex items-center gap-2 p-2 bg-slate-900 rounded border border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={useTernary}
                      onChange={(e) => setUseTernary(e.target.checked)}
                      className="accent-teal-500 rounded"
                    />
                    <span>Apply Leading Ternary Distinction Label (DISTINCTION / PASS)</span>
                  </label>
                )}

                {containerType === "dict" && (
                  <label className="flex items-center gap-2 p-2 bg-slate-900 rounded border border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={invertDict}
                      onChange={(e) => setInvertDict(e.target.checked)}
                      className="accent-cyan-500 rounded"
                    />
                    <span>Invert Dictionary Keys (`score -&gt; name`)</span>
                  </label>
                )}

                <label className="flex items-center gap-2 p-2 bg-slate-900 rounded border border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filterAiOnly}
                    onChange={(e) => setFilterAiOnly(e.target.checked)}
                    className="accent-purple-500 rounded"
                  />
                  <span>Filter Only AI_ENGINEERING Department</span>
                </label>
              </div>
            </div>

            {/* Code Generation & Output Inspector */}
            <div className="space-y-4 flex flex-col justify-between">
              {/* Generated Python Code */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
                <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  Generated Python Comprehension Expression:
                </div>
                <div className="text-teal-300 text-[11px] leading-relaxed break-all font-mono">
                  {generatedCode}
                </div>
              </div>

              {/* Evaluated Output */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex-1 overflow-y-auto max-h-[160px] font-mono text-xs space-y-1">
                <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400">
                  <span>Evaluated Output ({Array.isArray(evaluatedOutput) ? evaluatedOutput.length : Object.keys(evaluatedOutput || {}).length} Items):</span>
                  <span className="text-emerald-400">C-Speed Opcode Ready</span>
                </div>
                <pre className="text-slate-200 text-[11px] leading-relaxed">
                  {JSON.stringify(evaluatedOutput, null, 2)}
                </pre>
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
              4. Master Comprehension Container Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Comprehension Type</th>
                  <th className="py-3.5 px-4 font-bold">Syntax Template</th>
                  <th className="py-3.5 px-4 font-bold">Container Invariant</th>
                  <th className="py-3.5 px-4 font-bold">Primary Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">List Comprehension</td>
                  <td className="py-3 px-4 font-mono text-slate-200">`[expr for x in seq if cond]`</td>
                  <td className="py-3 px-4 text-emerald-400">Ordered, duplicates allowed</td>
                  <td className="py-3 px-4">Sequential dataset transformations</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">Dict Comprehension</td>
                  <td className="py-3 px-4 font-mono text-slate-200">`&#123;k: v for x in seq if cond&#125;`</td>
                  <td className="py-3 px-4 text-cyan-300">Hash table key-value pairs</td>
                  <td className="py-3 px-4">Fast lookups, dictionary inversion</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">Set Comprehension</td>
                  <td className="py-3 px-4 font-mono text-slate-200">`&#123;expr for x in seq if cond&#125;`</td>
                  <td className="py-3 px-4 text-purple-300">Unique hashable elements only</td>
                  <td className="py-3 px-4">Tag normalization, deduplication</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">Generator Expression</td>
                  <td className="py-3 px-4 font-mono text-slate-200">`(expr for x in seq if cond)`</td>
                  <td className="py-3 px-4 text-amber-300">Lazy iterator, O(1) memory</td>
                  <td className="py-3 px-4">Streaming multi-million record pipelines</td>
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
            Explore 4 production-grade Python scripts demonstrating comprehension fundamentals, conditional mechanics, dict/set inversions, and academic marks suites:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "list_dict_set_comprehension_fundamentals.py",
                code: fundamentalsCode,
                description: "List, Dict, and Set comprehensions and bytecode performance comparisons.",
              },
              {
                filename: "conditional_expressions_in_comprehensions.py",
                code: conditionalsCode,
                description: "Filtering if vs ternary if-else expressions in comprehensions.",
              },
              {
                filename: "dict_and_set_advanced_transformations.py",
                code: dictSetTransformCode,
                description: "Dictionary inversion, 1-to-many grouping, and set data normalization.",
              },
              {
                filename: "institutional_student_marks_comprehension_engine.py",
                code: academicSuiteCode,
                description: "Institutional Academic Marks & Scholarship Allocation Comprehension Suite.",
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
                <span>❌</span> Trap 1: Adding `else` to Trailing Filtering `if`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-rose-300 font-mono">[x for x in seq if x &gt; 0 else 0]</code> is a fatal <code className="text-rose-300 font-mono">SyntaxError</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Put ternary <code className="text-emerald-300">[x if x &gt; 0 else 0 for x in seq]</code> at the start!
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Direct Dict Inversion Key Overwriting
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Inverting <code className="text-amber-300 font-mono">&#123;v: k for k, v in d.items()&#125;</code> when multiple keys share the same value silently overwrites earlier keys!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Group values into a list or set per unique value.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Creating Empty Set with `{}`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-purple-300 font-mono">s = &#123;&#125;</code> creates an empty dictionary (<code className="text-purple-300 font-mono">dict</code>), not a set!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Always use <code className="text-emerald-300">set()</code> for an empty set.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Side-Effects in Comprehensions
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Using comprehensions solely to execute side-effects like <code className="text-cyan-300 font-mono">[print(x) for x in seq]</code> wastes memory creating temporary discarded lists.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Use standard <code className="text-emerald-300">for</code> loops for side-effects and I/O.
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
            Comprehensive question-and-answer repository covering list, dict, and set comprehensions, conditional filtering, bytecode execution, and memory optimization:
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
            Download or print the complete reference sheet with comprehension syntax recipes, conditional mechanics, and dictionary inversion templates:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic0_comprehensions_deep_dive_notes.txt"
              title="Print Topic 0 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
