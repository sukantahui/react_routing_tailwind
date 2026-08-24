import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import generatorFundamentals from "./topic8_files/generator_fundamentals_and_yield_mechanics.py?raw";
import fibonacciGenerators from "./topic8_files/fibonacci_and_sequence_generators.py?raw";
import generatorReturns from "./topic8_files/generator_return_and_stopiteration_values.py?raw";
import admissionStream from "./topic8_files/institutional_admission_batch_generator_stream.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic8_files/topic8_note.txt?raw";

// FAQ Questions
import questions from "./topic8_files/topic8_questions";

/**
 * Topic8: Generators & the yield statement
 * Module: 003_003_decorators-generators
 * Segment: 3 (Advanced Python Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic8() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("yieldcycle");

  // Interactive Admission Generator Stream Simulator State
  const admissionCohort = [
    { id: "STU-101", name: "Sourav Mukherjee", course: "Python & AI", fee: 25000, discount: 0.20 },
    { id: "STU-102", name: "Priyanka Sen", course: "Data Science", fee: 30000, discount: 0.10 },
    { id: "STU-103", name: "Rahul Verma", course: "Python Core", fee: 18000, discount: 0.00 },
    { id: "STU-104", name: "Debolina Roy", course: "Machine Learning", fee: 28000, discount: 0.15 },
  ];

  const [streamIndex, setStreamIndex] = useState(-1);
  const [generatorState, setGeneratorState] = useState("GEN_CREATED"); // GEN_CREATED, GEN_SUSPENDED, GEN_CLOSED
  const [yieldedCertificates, setYieldedCertificates] = useState([]);
  const [runningRevenue, setRunningRevenue] = useState(0);
  const [runningScholarships, setRunningScholarships] = useState(0);
  const [finalReport, setFinalReport] = useState(null);

  const handleResetGenerator = () => {
    setStreamIndex(-1);
    setGeneratorState("GEN_CREATED");
    setYieldedCertificates([]);
    setRunningRevenue(0);
    setRunningScholarships(0);
    setFinalReport(null);
  };

  const handleStepGenerator = () => {
    if (generatorState === "GEN_CLOSED") return;

    const nextIdx = streamIndex + 1;
    if (nextIdx < admissionCohort.length) {
      const candidate = admissionCohort[nextIdx];
      const concession = Math.round(candidate.fee * candidate.discount);
      const netPayable = candidate.fee - concession;
      const newRevenue = runningRevenue + netPayable;
      const newScholarships = runningScholarships + concession;

      const cert = {
        seq: nextIdx + 1,
        certId: `ADM-2026-${candidate.id}`,
        name: candidate.name,
        course: candidate.course,
        netFee: netPayable,
        concession: concession,
        runningRev: newRevenue,
      };

      setStreamIndex(nextIdx);
      setRunningRevenue(newRevenue);
      setRunningScholarships(newScholarships);
      setYieldedCertificates([...yieldedCertificates, cert]);
      setGeneratorState("GEN_SUSPENDED");
    } else {
      // Reached return statement: Populates StopIteration.value
      setGeneratorState("GEN_CLOSED");
      setFinalReport({
        totalAdmitted: admissionCohort.length,
        grossCollected: runningRevenue,
        totalScholarships: runningScholarships,
        avgFee: runningRevenue / admissionCohort.length,
        status: "SETTLED_AND_CONFIRMED",
      });
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
            Topic 8
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Decorators, Generators &amp; Iterators
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Generators &amp; <span className="text-teal-400">The `yield` Statement</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master lazy stream generation in Python: how <code className="text-teal-300 font-mono">yield</code> suspends and resumes execution frames with <code className="text-teal-300 font-mono">O(1)</code> memory, the 4 generator lifecycle states, and capturing generator return values via <code className="text-purple-300 font-mono">StopIteration.value</code> (PEP 380).
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⏸️ Frame Freezing &amp; Resumption
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔄 4 Generator States (CREATED → CLOSED)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ♾️ O(1) Memory Infinite Streams
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📦 StopIteration.value Returns (PEP 380)
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: YIELD MECHANICS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚡</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Mechanics of the `yield` Keyword
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              When a Python function body contains the <code className="text-teal-300 font-mono">yield</code> statement, its entire execution paradigm changes fundamentally:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ Instantiation</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">g = my_gen()</code>
                <p className="text-[11px] text-slate-300">
                  Calling the function does NOT execute any code! It returns a Generator object in state <code className="text-teal-300">GEN_CREATED</code>.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ Frame Suspension</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">yield value</code>
                <p className="text-[11px] text-slate-300">
                  Returns <code className="text-cyan-300">value</code> to the caller and freezes local variable state in place (<code className="text-cyan-300">GEN_SUSPENDED</code>).
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ Return Value (PEP 380)</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">return summary</code>
                <p className="text-[11px] text-slate-300">
                  Raises <code className="text-purple-300">StopIteration(summary)</code>, allowing consumers to extract completion payloads via <code className="text-purple-300">exc.value</code>.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The 4 Generator Lifecycle States
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                • <span className="text-teal-300 font-bold">GEN_CREATED</span>: Instantiated, waiting for first <code className="text-slate-200">next()</code>.<br />
                • <span className="text-cyan-300 font-bold">GEN_SUSPENDED</span>: Paused at a <code className="text-slate-200">yield</code> statement.<br />
                • <span className="text-amber-300 font-bold">GEN_RUNNING</span>: Currently executing code inside the frame.<br />
                • <span className="text-purple-300 font-bold">GEN_CLOSED</span>: Terminated via return, exception, or <code className="text-slate-200">close()</code>.
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
                2. Visualizing Frame Freezing &amp; Generator States
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("yieldcycle")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "yieldcycle"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Yield &amp; Resumption Cycle
              </button>
              <button
                onClick={() => setActiveInteractiveTab("states")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "states"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                State Machine Lifecycle
              </button>
              <button
                onClick={() => setActiveInteractiveTab("returnval")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "returnval"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                StopIteration.value Return
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining execution suspension points, state machine transitions, and PEP 380 return values:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "yieldcycle" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">THE `yield` EXECUTION SUSPENSION &amp; RESUMPTION CYCLE</text>

                {/* 3 Step Pipeline */}
                <g transform="translate(30, 50)">
                  {/* Step 1 */}
                  <rect x="0" y="0" width="250" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="15" y="30" fill="#99f6e4" fontSize="11 font-bold">1. `next(gen)` Invocation</text>
                  <text x="15" y="55" fill="#ecfdf5" fontSize="8 font-mono">Caller calls next(gen)</text>
                  <text x="15" y="80" fill="#34d399" fontSize="8 font-mono">Frame starts or resumes</text>
                  <text x="15" y="100" fill="#ecfdf5" fontSize="8 font-mono">from exact last line</text>

                  <rect x="15" y="130" width="220" height="85" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="25" y="155" fill="#34d399" fontSize="9 font-bold">Resumed Execution:</text>
                  <text x="25" y="175" fill="#cbd5e1" fontSize="8">CPython restores local</text>
                  <text x="25" y="190" fill="#cbd5e1" fontSize="8">registers and bytecode pointer.</text>

                  {/* Arrow 1 */}
                  <text x="265" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 2 */}
                  <rect x="295" y="0" width="250" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="310" y="30" fill="#a5f3fc" fontSize="11 font-bold">2. Hits `yield item`</text>
                  <text x="310" y="55" fill="#ecfdf5" fontSize="8 font-mono">yield student_cert</text>
                  <text x="310" y="80" fill="#38bdf8" fontSize="8 font-mono">1. Emits value to caller</text>
                  <text x="310" y="100" fill="#38bdf8" fontSize="8 font-mono font-bold">2. Freezes stack frame!</text>

                  <rect x="310" y="130" width="220" height="85" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="320" y="155" fill="#38bdf8" fontSize="9 font-bold">Frame Frozen in RAM:</text>
                  <text x="320" y="175" fill="#cbd5e1" fontSize="8">Variables remain intact</text>
                  <text x="320" y="190" fill="#cbd5e1" fontSize="8">without being garbage collected.</text>

                  {/* Arrow 2 */}
                  <text x="560" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 3 */}
                  <rect x="590" y="0" width="230" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="605" y="30" fill="#c4b5fd" fontSize="11 font-bold">3. Next `next()` Resumes</text>
                  <text x="605" y="55" fill="#ecfdf5" fontSize="8 font-mono">next(gen) called again</text>
                  <text x="605" y="80" fill="#34d399" fontSize="8 font-mono font-bold">Executes line AFTER yield!</text>

                  <rect x="605" y="130" width="200" height="85" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="615" y="155" fill="#c4b5fd" fontSize="9 font-bold">Zero Recomputation:</text>
                  <text x="615" y="175" fill="#cbd5e1" fontSize="8">Seamlessly continues loop</text>
                  <text x="615" y="190" fill="#cbd5e1" fontSize="8">from where it left off.</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "states" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">THE 4 GENERATOR LIFECYCLE STATES (`inspect.getgeneratorstate`)</text>

                {/* 4 State Blocks */}
                <g transform="translate(30, 50)">
                  {/* State 1 */}
                  <rect x="0" y="0" width="180" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="15" y="30" fill="#c4b5fd" fontSize="11 font-bold">1. GEN_CREATED</text>
                  <text x="15" y="55" fill="#ecfdf5" fontSize="8 font-mono">`gen = stream()`</text>
                  <text x="15" y="80" fill="#cbd5e1" fontSize="8">• Function called</text>
                  <text x="15" y="95" fill="#cbd5e1" fontSize="8">• `next()` not yet run</text>
                  <rect x="15" y="130" width="150" height="80" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="25" y="155" fill="#c4b5fd" fontSize="8 font-bold">Waiting to Start</text>

                  {/* Arrow 1 */}
                  <text x="190" y="125" fill="#38bdf8" fontSize="20" fontWeight="bold">→</text>

                  {/* State 2 */}
                  <rect x="215" y="0" width="180" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="230" y="30" fill="#a5f3fc" fontSize="11 font-bold">2. GEN_RUNNING</text>
                  <text x="230" y="55" fill="#ecfdf5" fontSize="8 font-mono">During `next(gen)`</text>
                  <text x="230" y="80" fill="#cbd5e1" fontSize="8">• Bytecode executing</text>
                  <text x="230" y="95" fill="#cbd5e1" fontSize="8">• Computing values</text>
                  <rect x="230" y="130" width="150" height="80" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="240" y="155" fill="#38bdf8" fontSize="8 font-bold">Active in Thread</text>

                  {/* Arrow 2 */}
                  <text x="405" y="125" fill="#38bdf8" fontSize="20" fontWeight="bold">→</text>

                  {/* State 3 */}
                  <rect x="430" y="0" width="180" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="445" y="30" fill="#99f6e4" fontSize="11 font-bold">3. GEN_SUSPENDED</text>
                  <text x="445" y="55" fill="#ecfdf5" fontSize="8 font-mono">At `yield` line</text>
                  <text x="445" y="80" fill="#34d399" fontSize="8 font-bold">• Frame Frozen</text>
                  <text x="445" y="95" fill="#cbd5e1" fontSize="8">• State preserved</text>
                  <rect x="445" y="130" width="150" height="80" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="455" y="155" fill="#34d399" fontSize="8 font-bold">Suspended in RAM</text>

                  {/* Arrow 3 */}
                  <text x="620" y="125" fill="#38bdf8" fontSize="20" fontWeight="bold">→</text>

                  {/* State 4 */}
                  <rect x="645" y="0" width="175" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="660" y="30" fill="#fda4af" fontSize="11 font-bold">4. GEN_CLOSED</text>
                  <text x="660" y="55" fill="#fca5a5" fontSize="8 font-mono">On `return` / StopIter</text>
                  <text x="660" y="80" fill="#f87171" fontSize="8 font-bold">• Exhausted</text>
                  <text x="660" y="95" fill="#cbd5e1" fontSize="8">• Frame destroyed</text>
                  <rect x="660" y="130" width="145" height="80" rx="4" fill="#881337" stroke="#e11d48" />
                  <text x="670" y="155" fill="#ffe4e6" fontSize="8 font-bold">Terminated</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">EXTRACTING `StopIteration.value` UPON GENERATOR COMPLETION (PEP 380)</text>

                {/* Left: Generator Code */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="30" fill="#99f6e4" fontSize="12" fontWeight="bold">Generator Function with `return`</text>
                  
                  <text x="20" y="60" fill="#ecfdf5" fontSize="9 font-mono">def stream_admissions(cohort):</text>
                  <text x="35" y="80" fill="#cbd5e1" fontSize="9 font-mono">for c in cohort: yield c</text>
                  <text x="35" y="105" fill="#34d399" fontSize="9 font-mono font-bold">return &#123;"total": 4, "rev": 88000&#125;</text>

                  <rect x="20" y="135" width="340" height="85" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="160" fill="#34d399" fontSize="9 font-bold">PEP 380 Mechanics:</text>
                  <text x="30" y="180" fill="#ecfdf5" fontSize="8 font-mono">`return payload` does NOT yield a value.</text>
                  <text x="30" y="198" fill="#a7f3d0" fontSize="8 font-mono">It raises `StopIteration(payload)`!</text>
                </g>

                {/* Arrow */}
                <g transform="translate(425, 140)">
                  <text x="0" y="0" fill="#38bdf8" fontSize="12" fontWeight="bold">captures</text>
                  <text x="25" y="25" fill="#38bdf8" fontSize="26" fontWeight="bold">→</text>
                </g>

                {/* Right: Consumer Catch */}
                <g transform="translate(480, 50)">
                  <rect x="0" y="0" width="370" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="12" fontWeight="bold">Consumer Capturing `exc.value`</text>

                  <text x="20" y="60" fill="#ecfdf5" fontSize="9 font-mono">try:</text>
                  <text x="35" y="80" fill="#ecfdf5" fontSize="9 font-mono">next(gen)</text>
                  <text x="20" y="105" fill="#fca5a5" fontSize="9 font-mono font-bold">except StopIteration as exc:</text>
                  <text x="35" y="125" fill="#34d399" fontSize="9 font-mono font-bold">summary = exc.value  # {'{'}total: 4...{'}'}</text>

                  <rect x="20" y="145" width="330" height="75" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="30" y="170" fill="#c4b5fd" fontSize="9 font-bold">Return Value Accessible:</text>
                  <text x="30" y="190" fill="#cbd5e1" fontSize="8 font-mono">`exc.value` stores the return payload safely.</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE ADMISSION GENERATOR PLAYGROUND */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Student Admission Stream Generator Simulator
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Step through the admission generator stream using <code className="text-teal-300 font-mono">next()</code> to watch the frame suspend at each <code className="text-teal-300 font-mono">yield</code>, accumulate cumulative revenues, and capture the final <code className="text-purple-300 font-mono">StopIteration.value</code> report:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Controls */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                  1. Generator Stepping Controls
                </span>
                <button
                  onClick={handleResetGenerator}
                  className="text-[11px] font-mono text-slate-400 hover:text-white underline"
                >
                  `stream = stream_admission()` (Reset)
                </button>
              </div>

              {/* Stepping Button */}
              <button
                onClick={handleStepGenerator}
                disabled={generatorState === "GEN_CLOSED"}
                className={clsx(
                  "w-full py-3 rounded-lg text-xs font-mono font-bold transition-all shadow-lg",
                  generatorState === "GEN_CLOSED"
                    ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
                    : "bg-teal-600 hover:bg-teal-500 text-white shadow-teal-950/50"
                )}
              >
                {generatorState === "GEN_CLOSED"
                  ? "Generator Closed (StopIteration Raised)"
                  : generatorState === "GEN_CREATED"
                  ? "Execute First `next(stream)` -> (Starts Generator)"
                  : "Execute Next `next(stream)` -> (Resumes Frame)"}
              </button>

              {/* Admission Cohort Pipeline */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800">
                <span className="text-xs font-mono text-slate-400 font-bold block uppercase">
                  Candidate Stream Sequence &amp; Frame Pointer:
                </span>
                <div className="space-y-1">
                  {admissionCohort.map((c, idx) => (
                    <div
                      key={c.id}
                      className={clsx(
                        "p-2 rounded text-xs font-mono border transition-all flex justify-between items-center",
                        streamIndex === idx
                          ? "bg-teal-950 border-teal-500 text-teal-200 font-bold animate-glow-teal"
                          : streamIndex > idx
                          ? "bg-slate-900/50 border-slate-800 text-slate-500"
                          : "bg-slate-900 border-slate-800 text-slate-300"
                      )}
                    >
                      <div>
                        <span className="font-bold">[{idx + 1}] {c.id}: </span>
                        <span>{c.name}</span>
                        <span className="text-[10px] text-slate-500 block">{c.course} (Disc: {c.discount * 100}%)</span>
                      </div>
                      <div className="text-right">
                        <span className="text-emerald-400 font-bold">INR {(c.fee * (1 - c.discount)).toLocaleString()}</span>
                        {streamIndex === idx && (
                          <span className="ml-2 text-teal-400 font-bold block text-[10px]">⏸️ YIELDED &amp; SUSPENDED</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Output & State */}
            <div className="space-y-4 flex flex-col justify-between">
              {/* Internal Generator Frame State */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
                <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  Generator Frame Inspector:
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">`inspect.getgeneratorstate()`:</span>
                  <span
                    className={clsx(
                      "font-bold",
                      generatorState === "GEN_CREATED" && "text-purple-300",
                      generatorState === "GEN_SUSPENDED" && "text-teal-300",
                      generatorState === "GEN_CLOSED" && "text-rose-400"
                    )}
                  >
                    {generatorState}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Enclosed Running Revenue:</span>
                  <span className="text-emerald-400 font-bold">INR {runningRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Scholarships Awarded:</span>
                  <span className="text-cyan-300 font-bold">INR {runningScholarships.toLocaleString()}</span>
                </div>
              </div>

              {/* Final Settlement Report Card */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex-1 overflow-y-auto max-h-[160px] space-y-1.5 font-mono text-xs">
                <span className="text-slate-400 block font-bold text-[10px] uppercase">
                  {finalReport ? "Captured `StopIteration.value` Settlement Report:" : "Live Yielded Stream Output:"}
                </span>

                {finalReport ? (
                  <div className="p-2.5 bg-slate-950 rounded border border-purple-800/80 space-y-1">
                    <div className="text-purple-300 font-bold text-sm">Batch Settlement Complete</div>
                    <div className="text-slate-300">Total Admitted: {finalReport.totalAdmitted} Students</div>
                    <div className="text-emerald-400 font-bold">Gross Revenue: INR {finalReport.grossCollected.toLocaleString()}</div>
                    <div className="text-cyan-300">Scholarships: INR {finalReport.totalScholarships.toLocaleString()}</div>
                    <div className="text-[10px] text-slate-500">Status: {finalReport.status}</div>
                  </div>
                ) : yieldedCertificates.length === 0 ? (
                  <div className="text-slate-500 italic text-[11px]">
                    Click "Execute First next(stream)" to start generator execution.
                  </div>
                ) : (
                  yieldedCertificates.map((cert, idx) => (
                    <div key={idx} className="p-1.5 bg-slate-950 rounded border border-slate-800 flex justify-between text-[11px]">
                      <span className="text-teal-300 font-bold">{cert.certId}: {cert.name}</span>
                      <span className="text-emerald-400 font-bold">INR {cert.netFee.toLocaleString()}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER GENERATOR MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Generator vs Regular Function Reference Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Feature / Behavior</th>
                  <th className="py-3.5 px-4 font-bold">Regular Function (`return`)</th>
                  <th className="py-3.5 px-4 font-bold">Generator Function (`yield`)</th>
                  <th className="py-3.5 px-4 font-bold">Engineering Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">Invocation Result</td>
                  <td className="py-3 px-4">Executes body immediately, returns result</td>
                  <td className="py-3 px-4 text-emerald-400">Returns suspended Generator object</td>
                  <td className="py-3 px-4">Zero upfront computation cost</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">Memory Complexity</td>
                  <td className="py-3 px-4 text-rose-300">O(N) (Allocates full collection in RAM)</td>
                  <td className="py-3 px-4 text-emerald-400">O(1) (Produces 1 item at a time)</td>
                  <td className="py-3 px-4">Zero Out-Of-Memory (OOM) crashes</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">Frame Lifecycle</td>
                  <td className="py-3 px-4">Stack frame destroyed on return</td>
                  <td className="py-3 px-4 text-purple-300">Frame frozen in heap, resumes later</td>
                  <td className="py-3 px-4">State retention across calls</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">Stream Capability</td>
                  <td className="py-3 px-4">Finite collections only</td>
                  <td className="py-3 px-4 text-emerald-400">Supports infinite streams (Fibonacci)</td>
                  <td className="py-3 px-4">Continuous real-time pipelines</td>
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
            Explore 4 production-grade Python scripts demonstrating generator fundamentals, Fibonacci sequence streams, generator return values, and admission batch generators:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "generator_fundamentals_and_yield_mechanics.py",
                code: generatorFundamentals,
                description: "Generator instantiation vs execution, frame state inspection, and yield mechanics.",
              },
              {
                filename: "fibonacci_and_sequence_generators.py",
                code: fibonacciGenerators,
                description: "Infinite and finite sequence generators with O(1) memory and tuition installment streams.",
              },
              {
                filename: "generator_return_and_stopiteration_values.py",
                code: generatorReturns,
                description: "Using return inside generators and capturing StopIteration.value payloads (PEP 380).",
              },
              {
                filename: "institutional_admission_batch_generator_stream.py",
                code: admissionStream,
                description: "Enterprise Student Admission Stream Generator with cumulative financial telemetry.",
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
                <span>❌</span> Trap 1: Calling Generator without Iterating
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Calling <code className="text-rose-300 font-mono">my_gen()</code> returns a generator object without executing any lines of code inside the function body.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Drive the generator using <code className="text-emerald-300">next()</code> or a <code className="text-emerald-300">for</code> loop.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Building Full Lists Inside Generator
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-amber-300 font-mono">results = [big_data]; for r in results: yield r</code> allocates memory upfront, defeating the O(1) purpose.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Yield items directly on the fly as they are computed.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Expecting `for` Loop to Catch Return Values
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Standard <code className="text-purple-300 font-mono">for item in gen:</code> loops catch <code className="text-purple-300 font-mono">StopIteration</code> and discard the returned value.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use <code className="text-emerald-300">yield from</code> or manual <code className="text-emerald-300">try...except StopIteration as exc</code>.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Attempting to Rewind a Generator
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Generators are strictly single-pass stream consumers; once exhausted, calling <code className="text-cyan-300 font-mono">next()</code> raises <code className="text-cyan-300 font-mono">StopIteration</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Re-invoke the generator function to create a new stream.
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
            Comprehensive question-and-answer repository covering generator functions, the yield statement, generator states, and StopIteration.value:
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
            Download or print the complete reference sheet with generator lifecycles, yield recipes, and PEP 380 templates:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic8_generators_yield_notes.txt"
              title="Print Topic 8 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
