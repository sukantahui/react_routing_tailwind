import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import protocolFundamentals from "./topic6_files/iteration_protocol_fundamentals.py?raw";
import sentinelProtocol from "./topic6_files/iter_sentinel_two_argument_protocol.py?raw";
import exhaustionIdempotence from "./topic6_files/exhaustion_and_idempotence_of_iterators.py?raw";
import rosterIteratorEngine from "./topic6_files/institutional_student_roster_iterator_engine.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic6_files/topic6_note.txt?raw";

// FAQ Questions
import questions from "./topic6_files/topic6_questions";

/**
 * Topic6: Iteration protocol: __iter__() and __next__()
 * Module: 003_003_decorators-generators
 * Segment: 3 (Advanced Python Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic6() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("protocol");

  // Interactive Roster Iterator Simulator State
  const rosterData = [
    { id: "STU-101", name: "Sourav Mukherjee", course: "Full-Stack AI", feeDue: 0, score: 92.5 },
    { id: "STU-102", name: "Priyanka Sen", course: "Data Science", feeDue: 5000, score: 88.0 },
    { id: "STU-103", name: "Rahul Verma", course: "Python Core", feeDue: 0, score: 78.5 },
    { id: "STU-104", name: "Debolina Roy", course: "AI & ML", feeDue: 12000, score: 85.0 },
  ];

  const [filterClearedOnly, setFilterClearedOnly] = useState(false);
  const [cursorIndex, setCursorIndex] = useState(-1);
  const [isExhausted, setIsExhausted] = useState(false);
  const [consumedItems, setConsumedItems] = useState([]);
  const [currentStepLog, setCurrentStepLog] = useState("Click 'iter(roster)' to initialize iterator.");

  // Compute active dataset based on filter
  const activeDataset = filterClearedOnly
    ? rosterData.filter((s) => s.feeDue === 0)
    : rosterData;

  const handleInitIterator = () => {
    setCursorIndex(-1);
    setIsExhausted(false);
    setConsumedItems([]);
    setCurrentStepLog(
      `[iter() CALLED] Instantiated fresh \`StudentRosterIterator\`. Cursor set to start.`
    );
  };

  const handleNextStep = () => {
    if (isExhausted) {
      setCurrentStepLog(
        `[StopIteration RAISED] Iterator is already exhausted! Cannot advance further.`
      );
      return;
    }

    const nextIndex = cursorIndex + 1;
    if (nextIndex < activeDataset.length) {
      const student = activeDataset[nextIndex];
      setCursorIndex(nextIndex);
      setConsumedItems([...consumedItems, student]);
      setCurrentStepLog(
        `[next() -> ${student.id}] Yielded ${student.name} (Due: INR ${student.feeDue.toLocaleString()})`
      );
    } else {
      setIsExhausted(true);
      setCurrentStepLog(
        `[StopIteration RAISED] Cursor reached index ${nextIndex} (End of roster). Loop terminates cleanly.`
      );
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
            Topic 6
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Decorators, Generators &amp; Iterators
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          The Iteration Protocol: <span className="text-teal-400">`__iter__()` &amp; `__next__()`</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master the foundation of Python iteration: understanding Iterable vs Iterator, deconstructing the <code className="text-teal-300 font-mono">for</code> loop with <code className="text-cyan-300 font-mono">StopIteration</code>, the 2-argument <code className="text-purple-300 font-mono">iter(callable, sentinel)</code> stream protocol, and iterator exhaustion.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔄 Iterable vs Iterator Interface
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛑 StopIteration Exception Cycle
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🎯 iter(callable, sentinel) Streams
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ Single-Pass Exhaustion &amp; Idempotence
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: PROTOCOL ESSENTIALS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧭</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Anatomy of Python's Iteration Protocol
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              In Python, iteration is governed by two complementary dunder methods forming the <strong>Iteration Protocol</strong>:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 not-prose">
              {/* Iterable */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ The Iterable (`__iter__`)</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">def __iter__(self): return Iterator(self)</code>
                <p className="text-[11px] text-slate-300">
                  Any container that can produce an Iterator upon request (lists, dicts, tuples, sets). Multi-pass reusable.
                </p>
              </div>

              {/* Iterator */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ The Iterator (`__iter__` + `__next__`)</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">def __next__(self): return value or raise StopIteration</code>
                <p className="text-[11px] text-slate-300">
                  A stateful stream that yields values on demand via <code className="text-cyan-300">__next__()</code> and returns <code className="text-cyan-300">self</code> in <code className="text-cyan-300">__iter__()</code>. Single-pass exhaustible.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                Deconstructing Python's `for` Loop
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                When you write: <span className="text-teal-300">for x in collection: print(x)</span><br />
                Python internally executes:<br />
                <span className="text-slate-400">iterator = iter(collection)</span><br />
                <span className="text-slate-400">while True:</span><br />
                &nbsp;&nbsp;<span className="text-slate-400">try: x = next(iterator); print(x)</span><br />
                &nbsp;&nbsp;<span className="text-cyan-300">except StopIteration: break</span>
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
                2. Visualizing Iteration Cycles &amp; Sentinel Streams
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("protocol")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "protocol"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Iteration Protocol Cycle
              </button>
              <button
                onClick={() => setActiveInteractiveTab("forloop")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "forloop"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                `for` Loop Translation
              </button>
              <button
                onClick={() => setActiveInteractiveTab("sentinel")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "sentinel"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                2-Arg Sentinel Protocol
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining call cycles, StopIteration mechanics, and 2-argument sentinel streaming:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "protocol" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">THE PYTHON ITERATION PROTOCOL CALL CYCLE</text>

                {/* 3 Step Pipeline */}
                <g transform="translate(30, 50)">
                  {/* Step 1: Iterable Container */}
                  <rect x="0" y="0" width="250" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="15" y="30" fill="#99f6e4" fontSize="11 font-bold">1. Iterable Container</text>
                  <text x="15" y="55" fill="#ecfdf5" fontSize="8 font-mono">class ClassroomRoster:</text>
                  <text x="25" y="75" fill="#34d399" fontSize="8 font-mono font-bold">def __iter__(self):</text>
                  <text x="35" y="95" fill="#ecfdf5" fontSize="8 font-mono">return RosterIterator(self)</text>

                  <rect x="15" y="130" width="220" height="85" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="25" y="155" fill="#34d399" fontSize="9 font-bold">Role: Factory</text>
                  <text x="25" y="175" fill="#cbd5e1" fontSize="8">Produces a fresh new Iterator</text>
                  <text x="25" y="190" fill="#cbd5e1" fontSize="8">on every `iter(roster)` call.</text>

                  {/* Arrow 1 */}
                  <text x="265" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 2: Iterator Object */}
                  <rect x="295" y="0" width="250" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="310" y="30" fill="#a5f3fc" fontSize="11 font-bold">2. Iterator Stream</text>
                  <text x="310" y="55" fill="#ecfdf5" fontSize="8 font-mono">class RosterIterator:</text>
                  <text x="320" y="75" fill="#38bdf8" fontSize="8 font-mono font-bold">def __next__(self):</text>
                  <text x="330" y="95" fill="#ecfdf5" fontSize="8 font-mono">return next_student</text>
                  <text x="320" y="115" fill="#38bdf8" fontSize="8 font-mono font-bold">def __iter__(self): return self</text>

                  <rect x="310" y="130" width="220" height="85" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="320" y="155" fill="#38bdf8" fontSize="9 font-bold">Stateful Stream:</text>
                  <text x="320" y="175" fill="#cbd5e1" fontSize="8">Advances cursor index</text>
                  <text x="320" y="190" fill="#cbd5e1" fontSize="8">forward on each `next()` call.</text>

                  {/* Arrow 2 */}
                  <text x="560" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 3: StopIteration */}
                  <rect x="590" y="0" width="230" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="605" y="30" fill="#fda4af" fontSize="11 font-bold">3. `StopIteration`</text>
                  <text x="605" y="55" fill="#fca5a5" fontSize="8 font-mono">if cursor &gt;= len(records):</text>
                  <text x="615" y="75" fill="#fda4af" fontSize="8 font-mono font-bold">raise StopIteration()</text>

                  <rect x="605" y="130" width="200" height="85" rx="4" fill="#881337" stroke="#e11d48" />
                  <text x="615" y="155" fill="#ffe4e6" fontSize="9 font-bold">Loop Termination:</text>
                  <text x="615" y="175" fill="#fca5a5" fontSize="8">Cleanly signals to the loop</text>
                  <text x="615" y="190" fill="#fca5a5" fontSize="8">that stream is exhausted.</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "forloop" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">DECONSTRUCTING PYTHON'S `for` LOOP SYNTAX</text>

                {/* Left: What you write */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="30" fill="#99f6e4" fontSize="12" fontWeight="bold">What You Write in Python:</text>
                  
                  <text x="20" y="65" fill="#34d399" fontSize="11 font-mono font-bold">for student in roster:</text>
                  <text x="40" y="90" fill="#ecfdf5" fontSize="11 font-mono">process(student)</text>

                  <rect x="20" y="140" width="340" height="70" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="165" fill="#34d399" fontSize="9 font-bold">Declarative Loop:</text>
                  <text x="30" y="185" fill="#ecfdf5" fontSize="8 font-mono">Simple, idiomatic, and clean.</text>
                </g>

                {/* Arrow */}
                <g transform="translate(425, 140)">
                  <text x="0" y="0" fill="#38bdf8" fontSize="12" fontWeight="bold">translates to</text>
                  <text x="25" y="25" fill="#38bdf8" fontSize="26" fontWeight="bold">→</text>
                </g>

                {/* Right: What Python actually runs */}
                <g transform="translate(480, 50)">
                  <rect x="0" y="0" width="370" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="12" fontWeight="bold">What Python Interpreter Runs:</text>
                  
                  <text x="20" y="60" fill="#34d399" fontSize="9 font-mono">_it = iter(roster)  # 1. Call __iter__</text>
                  <text x="20" y="80" fill="#ecfdf5" fontSize="9 font-mono">while True:         # 2. Infinite Loop</text>
                  <text x="35" y="100" fill="#ecfdf5" fontSize="9 font-mono">try:</text>
                  <text x="50" y="120" fill="#34d399" fontSize="9 font-mono font-bold">student = next(_it) # 3. Call __next__</text>
                  <text x="50" y="140" fill="#cbd5e1" fontSize="9 font-mono">process(student)</text>
                  <text x="35" y="160" fill="#fca5a5" fontSize="9 font-mono font-bold">except StopIteration:</text>
                  <text x="50" y="180" fill="#fda4af" fontSize="9 font-mono font-bold">break  # 4. Clean exit</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">THE 2-ARGUMENT `iter(callable, sentinel)` STREAM PROTOCOL</text>

                {/* 3 Step Stream */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="250" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="15" y="30" fill="#c4b5fd" fontSize="11 font-bold">1. Stream Callable</text>
                  <text x="15" y="55" fill="#ecfdf5" fontSize="8 font-mono">stream.fetch_next_tx()</text>
                  <text x="15" y="80" fill="#cbd5e1" fontSize="8">• Returns next transaction dict</text>
                  <text x="15" y="95" fill="#cbd5e1" fontSize="8">• Returns `None` when stream ends</text>

                  <rect x="15" y="130" width="220" height="85" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="25" y="155" fill="#c4b5fd" fontSize="9 font-bold">Producer Function:</text>
                  <text x="25" y="175" fill="#cbd5e1" fontSize="8">Zero-argument callable</text>
                  <text x="25" y="190" fill="#cbd5e1" fontSize="8">yielding stream chunks.</text>

                  {/* Arrow 1 */}
                  <text x="265" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 2: Sentinel Match */}
                  <rect x="295" y="0" width="250" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="310" y="30" fill="#a5f3fc" fontSize="11 font-bold">2. Sentinel Check (`None`)</text>
                  <text x="310" y="55" fill="#ecfdf5" fontSize="8 font-mono">iter(stream.fetch, None)</text>
                  <text x="310" y="80" fill="#38bdf8" fontSize="8 font-mono">if val == sentinel:</text>
                  <text x="325" y="100" fill="#38bdf8" fontSize="8 font-mono font-bold">raise StopIteration</text>

                  <rect x="310" y="130" width="220" height="85" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="320" y="155" fill="#38bdf8" fontSize="9 font-bold">Automatic Sentinel Guard:</text>
                  <text x="320" y="175" fill="#cbd5e1" fontSize="8">Eliminates manual while loop</text>
                  <text x="320" y="190" fill="#cbd5e1" fontSize="8">and break statements!</text>

                  {/* Arrow 2 */}
                  <text x="560" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 3: Stream Consumer */}
                  <rect x="590" y="0" width="230" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="605" y="30" fill="#a7f3d0" fontSize="11 font-bold">3. Consumer Loop</text>
                  <text x="605" y="55" fill="#ecfdf5" fontSize="8 font-mono">for tx in sentinel_iter:</text>
                  <text x="620" y="75" fill="#34d399" fontSize="8 font-mono font-bold">process_payment(tx)</text>

                  <rect x="605" y="130" width="200" height="85" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="615" y="155" fill="#34d399" fontSize="9 font-bold">Clean Consumption:</text>
                  <text x="615" y="175" fill="#cbd5e1" fontSize="8">Standard for loop iterates</text>
                  <text x="615" y="190" fill="#cbd5e1" fontSize="8">seamlessly over stream.</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE ROSTER ITERATOR PLAYGROUND */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Step-by-Step Student Roster Iterator Simulator
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Step manually through the classroom roster iterator with <code className="text-teal-300 font-mono">next()</code> to inspect internal cursor advancing and <code className="text-rose-400 font-mono">StopIteration</code> triggering on exhaustion:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Controls */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                  1. Iterator Stepping Controls
                </span>
                <button
                  onClick={handleInitIterator}
                  className="text-[11px] font-mono text-slate-400 hover:text-white underline"
                >
                  `iter(roster)` (Reset Iterator)
                </button>
              </div>

              {/* Filter Checkbox */}
              <label className="flex items-center gap-2 text-xs font-mono text-slate-300 cursor-pointer p-2 bg-slate-900 rounded border border-slate-800">
                <input
                  type="checkbox"
                  checked={filterClearedOnly}
                  onChange={(e) => {
                    setFilterClearedOnly(e.target.checked);
                    setCursorIndex(-1);
                    setIsExhausted(false);
                    setConsumedItems([]);
                  }}
                  className="accent-teal-500 rounded"
                />
                <span>Only Iterate Students with Zero Dues (`cleared_only_iterator()`)</span>
              </label>

              {/* Stepping Button */}
              <button
                onClick={handleNextStep}
                disabled={isExhausted}
                className={clsx(
                  "w-full py-3 rounded-lg text-xs font-mono font-bold transition-all shadow-lg",
                  isExhausted
                    ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
                    : "bg-teal-600 hover:bg-teal-500 text-white shadow-teal-950/50"
                )}
              >
                {isExhausted ? "Iterator Exhausted (StopIteration)" : "Execute `next(student_iterator)`"}
              </button>

              {/* Roster Dataset Visualizer */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800">
                <span className="text-xs font-mono text-slate-400 font-bold block uppercase">
                  Classroom Roster Elements &amp; Cursor Pointer:
                </span>
                <div className="space-y-1">
                  {activeDataset.map((student, idx) => (
                    <div
                      key={student.id}
                      className={clsx(
                        "p-2 rounded text-xs font-mono border transition-all flex justify-between items-center",
                        cursorIndex === idx
                          ? "bg-teal-950 border-teal-500 text-teal-200 font-bold"
                          : cursorIndex > idx
                          ? "bg-slate-900/50 border-slate-800 text-slate-500 line-through"
                          : "bg-slate-900 border-slate-800 text-slate-300"
                      )}
                    >
                      <div>
                        <span className="font-bold">[{idx}] {student.id}: </span>
                        <span>{student.name}</span>
                      </div>
                      <div>
                        <span className={student.feeDue === 0 ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                          {student.feeDue === 0 ? "PAID" : `INR ${student.feeDue.toLocaleString()}`}
                        </span>
                        {cursorIndex === idx && <span className="ml-2 text-teal-400 font-bold">← CURSOR</span>}
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
                  Iterator Internal Memory State:
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Current Cursor Index:</span>
                  <span className="text-teal-300 font-bold">{cursorIndex >= 0 ? cursorIndex : "NOT STARTED (-1)"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Stream Exhaustion Status:</span>
                  <span className={clsx("font-bold", isExhausted ? "text-rose-400" : "text-emerald-400")}>
                    {isExhausted ? "EXHAUSTED (True)" : "ACTIVE STREAM (False)"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Consumed Elements Count:</span>
                  <span className="text-purple-300 font-bold">{consumedItems.length} / {activeDataset.length}</span>
                </div>
              </div>

              {/* Live Step Log */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex-1 overflow-y-auto max-h-[160px] space-y-1.5 font-mono text-xs">
                <span className="text-slate-400 block font-bold text-[10px] uppercase">
                  Live Iteration Step Telemetry:
                </span>
                <div
                  className={clsx(
                    "p-2 rounded text-xs font-mono",
                    isExhausted ? "bg-rose-950/60 border border-rose-800 text-rose-300 font-bold" : "text-slate-300"
                  )}
                >
                  {currentStepLog}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER ITERATION PROTOCOL MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Iterable vs Iterator Comparison Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Construct / Protocol</th>
                  <th className="py-3.5 px-4 font-bold">Required Dunder Methods</th>
                  <th className="py-3.5 px-4 font-bold">`iter(obj)` Returns</th>
                  <th className="py-3.5 px-4 font-bold">Multi-Pass Capability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">Iterable (e.g. list, tuple)</td>
                  <td className="py-3 px-4 font-mono text-slate-200">`__iter__()` only</td>
                  <td className="py-3 px-4 text-emerald-400">Fresh new Iterator instance</td>
                  <td className="py-3 px-4 text-emerald-400">Yes (Reusable infinite times)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">Iterator (e.g. list_iterator)</td>
                  <td className="py-3 px-4 font-mono text-slate-200">`__iter__()` AND `__next__()`</td>
                  <td className="py-3 px-4 text-purple-300">`self` (Same iterator object)</td>
                  <td className="py-3 px-4 text-rose-300">No (Exhausts after 1 pass)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">2-Arg Sentinel Protocol</td>
                  <td className="py-3 px-4 font-mono text-slate-200">`iter(callable, sentinel)`</td>
                  <td className="py-3 px-4 text-cyan-300">`callable_iterator` object</td>
                  <td className="py-3 px-4 text-rose-300">No (Streams until sentinel)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">Generator Object</td>
                  <td className="py-3 px-4 font-mono text-slate-200">`__iter__()` + `__next__()` + `send()`</td>
                  <td className="py-3 px-4 text-purple-300">`self`</td>
                  <td className="py-3 px-4 text-rose-300">No (Exhausts upon return)</td>
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
            Explore 4 production-grade Python scripts demonstrating iteration fundamentals, sentinel streaming, iterator exhaustion, and classroom roster engines:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "iteration_protocol_fundamentals.py",
                code: protocolFundamentals,
                description: "Iterable vs Iterator distinction, iter(), next(), StopIteration, and for-loop deconstruction.",
              },
              {
                filename: "iter_sentinel_two_argument_protocol.py",
                code: sentinelProtocol,
                description: "The 2-argument iter(callable, sentinel) stream protocol for reading chunks.",
              },
              {
                filename: "exhaustion_and_idempotence_of_iterators.py",
                code: exhaustionIdempotence,
                description: "Single-pass exhaustion of iterators and the idempotence property iter(it) is it.",
              },
              {
                filename: "institutional_student_roster_iterator_engine.py",
                code: rosterIteratorEngine,
                description: "Enterprise Classroom Student Roster & Ledger Iterator Engine with filtering.",
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
                <span>❌</span> Trap 1: Attempting to Reuse Exhausted Iterators
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Calling <code className="text-rose-300 font-mono">list(it)</code> followed by another <code className="text-rose-300 font-mono">for x in it:</code> does nothing because the iterator is exhausted.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> To iterate multiple times, call <code className="text-emerald-300">iter(iterable)</code> again.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Mutating Collections During Iteration
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Deleting from a dictionary or list during a <code className="text-amber-300 font-mono">for</code> loop raises <code className="text-amber-300 font-mono">RuntimeError: dictionary changed size during iteration</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Iterate over a snapshot: <code className="text-emerald-300">for k in list(d.keys()):</code>.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Missing `__iter__` on Custom Iterator
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Defining <code className="text-purple-300 font-mono">__next__()</code> without <code className="text-purple-300 font-mono">__iter__() returning self</code> prevents the iterator from being used in <code className="text-purple-300 font-mono">for</code> loops.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Always define <code className="text-emerald-300">def __iter__(self): return self</code> on iterators.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Forgetting `StopIteration` in `__next__`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                If <code className="text-cyan-300 font-mono">__next__()</code> returns <code className="text-cyan-300 font-mono">None</code> instead of raising <code className="text-cyan-300 font-mono">StopIteration</code>, <code className="text-cyan-300 font-mono">for</code> loops will run forever!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Always raise <code className="text-emerald-300">StopIteration</code> when the stream is exhausted.
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
            Comprehensive question-and-answer repository covering the Python iteration protocol, __iter__, __next__, StopIteration, and sentinel iteration:
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
            Download or print the complete reference sheet with iteration protocol blueprints, sentinel recipes, and for-loop mechanics:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic6_iteration_protocol_notes.txt"
              title="Print Topic 6 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
