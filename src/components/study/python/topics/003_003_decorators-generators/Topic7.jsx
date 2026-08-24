import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import floatRangeCode from "./topic7_files/custom_range_iterator_class.py?raw";
import advancedIterators from "./topic7_files/bidirectional_circular_and_sliding_iterators.py?raw";
import lazyPaginator from "./topic7_files/lazy_database_paginator_iterator.py?raw";
import rankSuite from "./topic7_files/institutional_examination_rank_iterator_suite.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic7_files/topic7_note.txt?raw";

// FAQ Questions
import questions from "./topic7_files/topic7_questions";

/**
 * Topic7: Creating custom iterator classes
 * Module: 003_003_decorators-generators
 * Segment: 3 (Advanced Python Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic7() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("floatrange");

  // Interactive Custom Iterator Simulator State
  const [iteratorMode, setIteratorMode] = useState("floatrange"); // floatrange | sliding | paginator

  // Mode 1: FloatRange State
  const [floatStart, setFloatStart] = useState(1.0);
  const [floatStop, setFloatStop] = useState(3.0);
  const [floatStep, setFloatStep] = useState(0.5);
  const [currentFloatVal, setCurrentFloatVal] = useState(1.0);
  const [floatEmitted, setFloatEmitted] = useState([]);
  const [floatExhausted, setFloatExhausted] = useState(false);

  // Mode 2: Sliding Window State
  const sampleScores = [78, 85, 92, 88, 95, 90];
  const [windowSize, setWindowSize] = useState(3);
  const [windowCursor, setWindowCursor] = useState(0);
  const [windowsEmitted, setWindowsEmitted] = useState([]);
  const [windowExhausted, setWindowExhausted] = useState(false);

  // Mode 3: Lazy Paginator State
  const totalDbRecords = 10;
  const pageSize = 3;
  const [paginatorOffset, setPaginatorOffset] = useState(0);
  const [recordsEmitted, setRecordsEmitted] = useState([]);
  const [paginatorExhausted, setPaginatorExhausted] = useState(false);

  // Reset Handlers
  const handleResetFloatRange = () => {
    setCurrentFloatVal(floatStart);
    setFloatEmitted([]);
    setFloatExhausted(false);
  };

  const handleStepFloatRange = () => {
    if (floatExhausted) return;
    if (currentFloatVal >= floatStop) {
      setFloatExhausted(true);
      return;
    }
    const val = currentFloatVal;
    const nextVal = Math.round((currentFloatVal + floatStep) * 100) / 100;
    setFloatEmitted([...floatEmitted, val]);
    setCurrentFloatVal(nextVal);
    if (nextVal >= floatStop) {
      setFloatExhausted(true);
    }
  };

  const handleResetSlidingWindow = () => {
    setWindowCursor(0);
    setWindowsEmitted([]);
    setWindowExhausted(false);
  };

  const handleStepSlidingWindow = () => {
    if (windowExhausted) return;
    if (windowCursor + windowSize > sampleScores.length) {
      setWindowExhausted(true);
      return;
    }
    const windowSlice = sampleScores.slice(windowCursor, windowCursor + windowSize);
    const avg = (windowSlice.reduce((a, b) => a + b, 0) / windowSize).toFixed(1);
    setWindowsEmitted([...windowsEmitted, { items: windowSlice, avg }]);
    const nextCursor = windowCursor + 1;
    setWindowCursor(nextCursor);
    if (nextCursor + windowSize > sampleScores.length) {
      setWindowExhausted(true);
    }
  };

  const handleResetPaginator = () => {
    setPaginatorOffset(0);
    setRecordsEmitted([]);
    setPaginatorExhausted(false);
  };

  const handleStepPaginator = () => {
    if (paginatorExhausted) return;
    if (paginatorOffset >= totalDbRecords) {
      setPaginatorExhausted(true);
      return;
    }
    const recId = paginatorOffset + 1;
    const pageNum = Math.floor(paginatorOffset / pageSize) + 1;
    setRecordsEmitted([...recordsEmitted, { id: `STU-${100 + recId}`, page: pageNum }]);
    const nextOffset = paginatorOffset + 1;
    setPaginatorOffset(nextOffset);
    if (nextOffset >= totalDbRecords) {
      setPaginatorExhausted(true);
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
            Topic 7
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Decorators, Generators &amp; Iterators
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Creating Custom <span className="text-teal-400">Iterator Classes</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master building stateful Iterator classes in Python from scratch: custom floating-point ranges (<code className="text-teal-300 font-mono">FloatRange</code>), sliding window rolling frames over sequences, round-robin circular schedulers, and lazy page-by-page database paginators.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📏 Custom FloatRange(start, stop, step)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🪟 SlidingWindow Rolling Frames
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔄 Circular Round-Robin Schedulers
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            💾 Lazy Database Cursor Pagination
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: CUSTOM ITERATOR SKELETON */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚙️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Anatomy of a Custom Iterator Class
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              To create an iterator class, you must implement the 3 essential structural components:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Part 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ `__init__(self, ...)`</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">self._cursor = 0</code>
                <p className="text-[11px] text-slate-300">
                  Initializes dataset reference and pointer cursors.
                </p>
              </div>

              {/* Part 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ `__iter__(self)`</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">return self</code>
                <p className="text-[11px] text-slate-300">
                  Mandatory idempotence: returns <code className="text-cyan-300">self</code> so the iterator can be looped.
                </p>
              </div>

              {/* Part 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ `__next__(self)`</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">raise StopIteration</code>
                <p className="text-[11px] text-slate-300">
                  Advances cursor, computes next element, or raises <code className="text-purple-300 font-mono">StopIteration</code>.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                Solving Floating-Point Precision Drift in Range Iterators
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                In binary floating-point representation, adding <code className="text-teal-300 font-mono">0.1 + 0.2</code> yields <code className="text-rose-400 font-mono">0.30000000000000004</code>. In a custom <code className="text-teal-300 font-mono">FloatRange</code> class, always sanitize intermediate values using <code className="text-teal-300 font-mono">round(self._current + self.step, 10)</code>!
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
                2. Visualizing Custom Iterators: Range, Window &amp; Cursor
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("floatrange")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "floatrange"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                FloatRange Pointer
              </button>
              <button
                onClick={() => setActiveInteractiveTab("sliding")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "sliding"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Sliding Window Slices
              </button>
              <button
                onClick={() => setActiveInteractiveTab("paginator")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "paginator"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Lazy DB Cursor Pages
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining internal cursor states, sliding frame boundaries, and paginated SQL buffer refills:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "floatrange" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">FLOATRANGE ITERATOR POINTER ADVANCEMENT: `FloatRange(1.0, 3.0, 0.5)`</text>

                {/* 4 Step Pipeline */}
                <g transform="translate(30, 50)">
                  {/* Step 1 */}
                  <rect x="0" y="0" width="180" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="15" y="30" fill="#99f6e4" fontSize="11 font-bold">Step 1: start=1.0</text>
                  <text x="15" y="55" fill="#34d399" fontSize="10 font-mono font-bold">Yield: 1.0</text>
                  <text x="15" y="80" fill="#ecfdf5" fontSize="8 font-mono">_current: 1.0 -&gt; 1.5</text>
                  <rect x="15" y="120" width="150" height="90" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="25" y="145" fill="#34d399" fontSize="9 font-bold">Condition Check:</text>
                  <text x="25" y="165" fill="#ecfdf5" fontSize="8 font-mono">1.0 &lt; 3.0 (OK)</text>

                  {/* Arrow 1 */}
                  <text x="190" y="125" fill="#38bdf8" fontSize="20" fontWeight="bold">→</text>

                  {/* Step 2 */}
                  <rect x="215" y="0" width="180" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="230" y="30" fill="#99f6e4" fontSize="11 font-bold">Step 2: val=1.5</text>
                  <text x="230" y="55" fill="#34d399" fontSize="10 font-mono font-bold">Yield: 1.5</text>
                  <text x="230" y="80" fill="#ecfdf5" fontSize="8 font-mono">_current: 1.5 -&gt; 2.0</text>
                  <rect x="230" y="120" width="150" height="90" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="240" y="145" fill="#34d399" fontSize="9 font-bold">Condition Check:</text>
                  <text x="240" y="165" fill="#ecfdf5" fontSize="8 font-mono">1.5 &lt; 3.0 (OK)</text>

                  {/* Arrow 2 */}
                  <text x="405" y="125" fill="#38bdf8" fontSize="20" fontWeight="bold">→</text>

                  {/* Step 3 */}
                  <rect x="430" y="0" width="180" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="445" y="30" fill="#99f6e4" fontSize="11 font-bold">Step 3: val=2.0 / 2.5</text>
                  <text x="445" y="55" fill="#34d399" fontSize="10 font-mono font-bold">Yield: 2.0, 2.5</text>
                  <text x="445" y="80" fill="#ecfdf5" fontSize="8 font-mono">_current: 2.5 -&gt; 3.0</text>
                  <rect x="445" y="120" width="150" height="90" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="455" y="145" fill="#34d399" fontSize="9 font-bold">Condition Check:</text>
                  <text x="455" y="165" fill="#ecfdf5" fontSize="8 font-mono">2.5 &lt; 3.0 (OK)</text>

                  {/* Arrow 3 */}
                  <text x="620" y="125" fill="#38bdf8" fontSize="20" fontWeight="bold">→</text>

                  {/* Step 4 */}
                  <rect x="645" y="0" width="175" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="660" y="30" fill="#fda4af" fontSize="11 font-bold">Step 4: _current=3.0</text>
                  <text x="660" y="55" fill="#f87171" fontSize="10 font-mono font-bold">StopIteration</text>
                  <text x="660" y="80" fill="#fca5a5" fontSize="8 font-mono">_current &gt;= stop</text>
                  <rect x="660" y="120" width="145" height="90" rx="4" fill="#881337" stroke="#e11d48" />
                  <text x="670" y="145" fill="#ffe4e6" fontSize="9 font-bold">Terminated:</text>
                  <text x="670" y="165" fill="#fca5a5" fontSize="8 font-mono">Loop terminates!</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "sliding" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">SLIDING WINDOW ITERATOR: ROLLING FRAMES OVER SEQUENCE</text>

                {/* Sequence Bar */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="70" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="20" y="25" fill="#a5f3fc" fontSize="10 font-bold">Source Sequence: `scores = [78, 85, 92, 88, 95, 90]` (Window Size = 3)</text>
                  
                  {/* Sequence items */}
                  <g transform="translate(20, 35)">
                    {[78, 85, 92, 88, 95, 90].map((s, i) => (
                      <g key={i} transform={`translate(${i * 125}, 0)`}>
                        <rect width="110" height="25" rx="4" fill="#090d16" stroke="#0284c7" />
                        <text x="55" y="17" fill="#ecfdf5" fontSize="10 font-mono" textAnchor="middle">idx[{i}]: {s}</text>
                      </g>
                    ))}
                  </g>
                </g>

                {/* 3 Sliding Windows */}
                <g transform="translate(30, 140)">
                  {/* Window 1 */}
                  <rect x="0" y="0" width="250" height="150" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="15" y="25" fill="#99f6e4" fontSize="11 font-bold">Window 1: slice[0:3]</text>
                  <text x="15" y="55" fill="#34d399" fontSize="10 font-mono font-bold">Yield: (78, 85, 92)</text>
                  <text x="15" y="80" fill="#ecfdf5" fontSize="8 font-mono">Moving Avg: 85.0</text>
                  <text x="15" y="110" fill="#a7f3d0" fontSize="8 font-mono">cursor: 0 -&gt; 1</text>

                  {/* Window 2 */}
                  <rect x="285" y="0" width="250" height="150" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="300" y="25" fill="#99f6e4" fontSize="11 font-bold">Window 2: slice[1:4]</text>
                  <text x="300" y="55" fill="#34d399" fontSize="10 font-mono font-bold">Yield: (85, 92, 88)</text>
                  <text x="300" y="80" fill="#ecfdf5" fontSize="8 font-mono">Moving Avg: 88.3</text>
                  <text x="300" y="110" fill="#a7f3d0" fontSize="8 font-mono">cursor: 1 -&gt; 2</text>

                  {/* Window 3 */}
                  <rect x="570" y="0" width="250" height="150" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="585" y="25" fill="#99f6e4" fontSize="11 font-bold">Window 3: slice[2:5]</text>
                  <text x="585" y="55" fill="#34d399" fontSize="10 font-mono font-bold">Yield: (92, 88, 95)</text>
                  <text x="585" y="80" fill="#ecfdf5" fontSize="8 font-mono">Moving Avg: 91.7</text>
                  <text x="585" y="110" fill="#a7f3d0" fontSize="8 font-mono">cursor: 2 -&gt; 3</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">LAZY DATABASE PAGINATOR ITERATOR BUFFER ARCHITECTURE</text>

                {/* 3 Step Pipeline */}
                <g transform="translate(30, 50)">
                  {/* Step 1 */}
                  <rect x="0" y="0" width="250" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="15" y="30" fill="#c4b5fd" fontSize="11 font-bold">1. Local Page Buffer</text>
                  <text x="15" y="55" fill="#ecfdf5" fontSize="8 font-mono">buffer = [STU-1, STU-2, STU-3]</text>
                  <text x="15" y="75" fill="#34d399" fontSize="8 font-mono font-bold">buffer_index = 0, 1, 2</text>

                  <rect x="15" y="110" width="220" height="105" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="25" y="135" fill="#c4b5fd" fontSize="9 font-bold">Fast RAM Yields:</text>
                  <text x="25" y="155" fill="#cbd5e1" fontSize="8">Yields elements from local</text>
                  <text x="25" y="170" fill="#cbd5e1" fontSize="8">buffer at memory speeds.</text>

                  {/* Arrow 1 */}
                  <text x="265" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 2 */}
                  <rect x="295" y="0" width="250" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="310" y="30" fill="#a5f3fc" fontSize="11 font-bold">2. Buffer Exhausted?</text>
                  <text x="310" y="55" fill="#ecfdf5" fontSize="8 font-mono">if buffer_index &gt;= len(buffer):</text>
                  <text x="320" y="75" fill="#38bdf8" fontSize="8 font-mono font-bold">_fetch_next_page()</text>

                  <rect x="310" y="110" width="220" height="105" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="320" y="135" fill="#38bdf8" fontSize="9 font-bold">Lazy SQL Query:</text>
                  <text x="320" y="155" fill="#cbd5e1" fontSize="8">SELECT * LIMIT 3 OFFSET 3</text>
                  <text x="320" y="170" fill="#cbd5e1" fontSize="8">Only queries DB on demand!</text>

                  {/* Arrow 2 */}
                  <text x="560" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 3 */}
                  <rect x="590" y="0" width="230" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="605" y="30" fill="#a7f3d0" fontSize="11 font-bold">3. Database Exhausted</text>
                  <text x="605" y="55" fill="#ecfdf5" fontSize="8 font-mono">if offset &gt;= total_records:</text>
                  <text x="615" y="75" fill="#34d399" fontSize="8 font-mono font-bold">raise StopIteration()</text>

                  <rect x="605" y="110" width="200" height="105" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="615" y="135" fill="#34d399" fontSize="9 font-bold">Constant O(1) Memory:</text>
                  <text x="615" y="155" fill="#cbd5e1" fontSize="8">Can iterate 10 million rows</text>
                  <text x="615" y="170" fill="#cbd5e1" fontSize="8">using only 50 rows of RAM!</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE CUSTOM ITERATOR PLAYGROUND */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Custom Iterator Laboratory &amp; Stepper
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Choose an iterator pattern to step through custom range arithmetic, moving window frames, or paginated database buffers:
          </p>

          {/* Mode Selector */}
          <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 mb-6 text-xs font-semibold">
            <button
              onClick={() => setIteratorMode("floatrange")}
              className={clsx(
                "flex-1 py-2 rounded-lg transition-all text-center",
                iteratorMode === "floatrange"
                  ? "bg-teal-950 border border-teal-500 text-teal-200 font-bold"
                  : "text-slate-400 hover:text-white"
              )}
            >
              1. FloatRange(1.0, 3.0, 0.5)
            </button>
            <button
              onClick={() => setIteratorMode("sliding")}
              className={clsx(
                "flex-1 py-2 rounded-lg transition-all text-center",
                iteratorMode === "sliding"
                  ? "bg-cyan-950 border border-cyan-500 text-cyan-200 font-bold"
                  : "text-slate-400 hover:text-white"
              )}
            >
              2. SlidingWindow(size=3)
            </button>
            <button
              onClick={() => setIteratorMode("paginator")}
              className={clsx(
                "flex-1 py-2 rounded-lg transition-all text-center",
                iteratorMode === "paginator"
                  ? "bg-purple-950 border border-purple-500 text-purple-200 font-bold"
                  : "text-slate-400 hover:text-white"
              )}
            >
              3. LazyDatabasePaginator(page=3)
            </button>
          </div>

          {/* Playground Body */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Left Controls */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                  {iteratorMode === "floatrange" && "FloatRange Stepping"}
                  {iteratorMode === "sliding" && "Sliding Window Stepping"}
                  {iteratorMode === "paginator" && "Lazy Database Paginator Stepping"}
                </span>
                <button
                  onClick={() => {
                    if (iteratorMode === "floatrange") handleResetFloatRange();
                    else if (iteratorMode === "sliding") handleResetSlidingWindow();
                    else handleResetPaginator();
                  }}
                  className="text-[11px] font-mono text-slate-400 hover:text-white underline"
                >
                  `iter()` (Reset Iterator)
                </button>
              </div>

              {/* Mode 1: FloatRange Config */}
              {iteratorMode === "floatrange" && (
                <div className="space-y-3">
                  <div className="text-xs font-mono text-slate-300">
                    Configuration: <code className="text-teal-300 font-bold">FloatRange(start={floatStart}, stop={floatStop}, step={floatStep})</code>
                  </div>
                  <button
                    onClick={handleStepFloatRange}
                    disabled={floatExhausted}
                    className={clsx(
                      "w-full py-2.5 font-mono text-xs font-bold rounded-lg transition-all shadow-lg",
                      floatExhausted
                        ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
                        : "bg-teal-600 hover:bg-teal-500 text-white shadow-teal-950/50"
                    )}
                  >
                    {floatExhausted ? "FloatRange Exhausted (StopIteration)" : "Execute `next(float_range_iter)`"}
                  </button>
                </div>
              )}

              {/* Mode 2: Sliding Window Config */}
              {iteratorMode === "sliding" && (
                <div className="space-y-3">
                  <div className="text-xs font-mono text-slate-300">
                    Source: <code className="text-cyan-300 font-bold">scores = [78, 85, 92, 88, 95, 90]</code> (Window: 3)
                  </div>
                  <button
                    onClick={handleStepSlidingWindow}
                    disabled={windowExhausted}
                    className={clsx(
                      "w-full py-2.5 font-mono text-xs font-bold rounded-lg transition-all shadow-lg",
                      windowExhausted
                        ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
                        : "bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-950/50"
                    )}
                  >
                    {windowExhausted ? "Window Stream Exhausted (StopIteration)" : "Execute `next(sliding_window_iter)`"}
                  </button>
                </div>
              )}

              {/* Mode 3: Paginator Config */}
              {iteratorMode === "paginator" && (
                <div className="space-y-3">
                  <div className="text-xs font-mono text-slate-300">
                    Total DB Records: <code className="text-purple-300 font-bold">10</code> | Page Size: <code className="text-purple-300 font-bold">3</code>
                  </div>
                  <button
                    onClick={handleStepPaginator}
                    disabled={paginatorExhausted}
                    className={clsx(
                      "w-full py-2.5 font-mono text-xs font-bold rounded-lg transition-all shadow-lg",
                      paginatorExhausted
                        ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
                        : "bg-purple-600 hover:bg-purple-500 text-white shadow-purple-950/50"
                    )}
                  >
                    {paginatorExhausted ? "DB Cursor Exhausted (StopIteration)" : "Execute `next(db_paginator_iter)`"}
                  </button>
                </div>
              )}
            </div>

            {/* Right Output */}
            <div className="space-y-4 flex flex-col justify-between">
              {/* Emitted Records Log */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
                <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  Consumer Received Stream Elements:
                </div>

                {iteratorMode === "floatrange" && (
                  <div className="flex flex-wrap gap-1.5 min-h-[60px]">
                    {floatEmitted.length === 0 ? (
                      <span className="text-slate-500 italic">No values yielded yet. Click `next()` to step.</span>
                    ) : (
                      floatEmitted.map((v, i) => (
                        <span key={i} className="px-2 py-1 bg-teal-950 border border-teal-700 text-teal-200 rounded font-bold">
                          {v.toFixed(2)}
                        </span>
                      ))
                    )}
                    {floatExhausted && (
                      <span className="px-2 py-1 bg-rose-950 border border-rose-800 text-rose-300 rounded font-bold">
                        [StopIteration]
                      </span>
                    )}
                  </div>
                )}

                {iteratorMode === "sliding" && (
                  <div className="space-y-1 min-h-[60px]">
                    {windowsEmitted.length === 0 ? (
                      <span className="text-slate-500 italic">No sliding windows yielded yet. Click `next()`.</span>
                    ) : (
                      windowsEmitted.map((w, i) => (
                        <div key={i} className="p-1.5 bg-slate-950 rounded border border-slate-800 flex justify-between text-[11px]">
                          <span className="text-cyan-300 font-bold">Window #{i+1}: ({w.items.join(", ")})</span>
                          <span className="text-emerald-400">Avg: {w.avg}</span>
                        </div>
                      ))
                    )}
                    {windowExhausted && (
                      <div className="p-1 bg-rose-950/60 border border-rose-800 text-rose-300 rounded text-center font-bold">
                        [StopIteration Reached]
                      </div>
                    )}
                  </div>
                )}

                {iteratorMode === "paginator" && (
                  <div className="space-y-1 min-h-[60px] max-h-[140px] overflow-y-auto">
                    {recordsEmitted.length === 0 ? (
                      <span className="text-slate-500 italic">No DB records fetched yet. Click `next()`.</span>
                    ) : (
                      recordsEmitted.map((r, i) => (
                        <div key={i} className="p-1 bg-slate-950 rounded border border-slate-800 flex justify-between text-[11px]">
                          <span className="text-purple-300 font-bold">{r.id}</span>
                          <span className="text-slate-500 text-[10px]">Loaded via DB Page #{r.page}</span>
                        </div>
                      ))
                    )}
                    {paginatorExhausted && (
                      <div className="p-1 bg-rose-950/60 border border-rose-800 text-rose-300 rounded text-center font-bold">
                        [Database Pagination Complete]
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER CUSTOM ITERATOR MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Custom Iterator Design Pattern Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Iterator Class Pattern</th>
                  <th className="py-3.5 px-4 font-bold">Internal State Variables</th>
                  <th className="py-3.5 px-4 font-bold">`StopIteration` Condition</th>
                  <th className="py-3.5 px-4 font-bold">Primary Production Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">FloatRange</td>
                  <td className="py-3 px-4 font-mono text-slate-200">_current, _stop, _step</td>
                  <td className="py-3 px-4">`_current &gt;= _stop` (for step &gt; 0)</td>
                  <td className="py-3 px-4">Financial discount brackets &amp; physics steps</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">SlidingWindow</td>
                  <td className="py-3 px-4 font-mono text-slate-200">_data, _window_size, _cursor</td>
                  <td className="py-3 px-4">`_cursor + _window_size &gt; len(_data)`</td>
                  <td className="py-3 px-4">Time-series moving averages &amp; NLP n-grams</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">CircularIterator</td>
                  <td className="py-3 px-4 font-mono text-slate-200">_data, _index, _yielded, _limit</td>
                  <td className="py-3 px-4">`_yielded &gt;= _limit`</td>
                  <td className="py-3 px-4">Round-robin load balancing &amp; shift rotation</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-emerald-300 font-semibold">LazyDbPaginator</td>
                  <td className="py-3 px-4 font-mono text-slate-200">_offset, _buffer, _buffer_index</td>
                  <td className="py-3 px-4">`_offset &gt;= total_db_records`</td>
                  <td className="py-3 px-4">High-volume database queries without OOM</td>
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
            Explore 4 production-grade Python scripts demonstrating FloatRange, sliding windows, circular schedulers, lazy database paginators, and rank iterator engines:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "custom_range_iterator_class.py",
                code: floatRangeCode,
                description: "Custom FloatRange iterator class with float arithmetic and bounds checking.",
              },
              {
                filename: "bidirectional_circular_and_sliding_iterators.py",
                code: advancedIterators,
                description: "SlidingWindow and Circular round-robin iterator classes over sequences.",
              },
              {
                filename: "lazy_database_paginator_iterator.py",
                code: lazyPaginator,
                description: "Memory-efficient page-by-page database cursor iterator.",
              },
              {
                filename: "institutional_examination_rank_iterator_suite.py",
                code: rankSuite,
                description: "Rank-ordered student examination merit iterator with scholarship tier classification.",
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
                <span>❌</span> Trap 1: Float Drift Accumulation
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Repeatedly adding floats without rounding produces drift like <code className="text-rose-300 font-mono">0.30000000000000004</code>, causing boundary checks to misfire.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Use <code className="text-emerald-300">round(self._current + self.step, 10)</code>.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Infinite Loop on Missing `StopIteration`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                If <code className="text-amber-300 font-mono">__next__()</code> returns <code className="text-amber-300 font-mono">None</code> instead of raising <code className="text-amber-300 font-mono">StopIteration</code>, <code className="text-amber-300 font-mono">for</code> loops run forever.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Always raise <code className="text-emerald-300">StopIteration</code> when bounds are exceeded.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Missing `__iter__` Returning `self`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                An Iterator class without <code className="text-purple-300 font-mono">def __iter__(self): return self</code> cannot be passed into <code className="text-purple-300 font-mono">for</code> loops or <code className="text-purple-300 font-mono">iter()</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Every Iterator must implement <code className="text-emerald-300">__iter__</code> returning <code className="text-emerald-300">self</code>.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Sliding Window Off-By-One
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Checking <code className="text-cyan-300 font-mono">cursor &gt;= len(data)</code> instead of <code className="text-cyan-300 font-mono">cursor + size &gt; len(data)</code> yields truncated, partial windows at the end.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Terminate when <code className="text-emerald-300">cursor + window_size &gt; len(data)</code>.
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
            Comprehensive question-and-answer repository covering custom iterator classes, FloatRange, sliding windows, and database paginators:
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
            Download or print the complete reference sheet with custom iterator blueprints, FloatRange templates, and sliding window recipes:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic7_custom_iterator_classes_notes.txt"
              title="Print Topic 7 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
