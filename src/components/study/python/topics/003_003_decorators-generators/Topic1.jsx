import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import innerFunctions from "./topic1_files/inner_functions_and_scope_resolution.py?raw";
import closuresAnatomy from "./topic1_files/closures_and_cell_objects.py?raw";
import nonlocalState from "./topic1_files/nonlocal_keyword_and_state_mutation.py?raw";
import scholarshipClosure from "./topic1_files/institutional_scholarship_accumulator_closure.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic1_files/topic1_note.txt?raw";

// FAQ Questions
import questions from "./topic1_files/topic1_questions";

/**
 * Topic1: Inner functions and variable scope closures
 * Module: 003_003_decorators-generators
 * Segment: 3 (Advanced Python Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic1() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("legb");

  // Interactive Scholarship Closure Simulator State
  const TOTAL_BUDGET = 50000;
  const [candidateName, setCandidateName] = useState("Sourav Mukherjee");
  const [disburseAmount, setDisburseAmount] = useState(12000);
  const [disbursedTotal, setDisbursedTotal] = useState(0);
  const [recipients, setRecipients] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleDisburse = () => {
    setErrorMessage(null);
    if (!candidateName.trim()) {
      setErrorMessage("Candidate name is required!");
      return;
    }
    if (disburseAmount <= 0) {
      setErrorMessage("Disbursement amount must be strictly positive!");
      return;
    }
    if (disbursedTotal + disburseAmount > TOTAL_BUDGET) {
      const remaining = TOTAL_BUDGET - disbursedTotal;
      setErrorMessage(
        `Budget Exceeded! Requested INR ${disburseAmount.toLocaleString()}, but only INR ${remaining.toLocaleString()} remains in closure cell!`
      );
      return;
    }

    const newTotal = disbursedTotal + disburseAmount;
    const newRecipient = {
      id: `STU-${101 + recipients.length}`,
      name: candidateName.trim(),
      amount: disburseAmount,
      time: new Date().toLocaleTimeString(),
      remainingAfter: TOTAL_BUDGET - newTotal,
    };

    setDisbursedTotal(newTotal);
    setRecipients([...recipients, newRecipient]);
    setCandidateName("");
  };

  const handleResetClosure = () => {
    setDisbursedTotal(0);
    setRecipients([]);
    setErrorMessage(null);
    setCandidateName("Sourav Mukherjee");
    setDisburseAmount(12000);
  };

  const remainingBudget = TOTAL_BUDGET - disbursedTotal;

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
            Topic 1
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Decorators, Generators &amp; Iterators
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Inner Functions &amp; <span className="text-teal-400">Variable Scope Closures</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master lexical scoping and memory retention in Python: the LEGB resolution hierarchy, closure anatomy with CPython heap <code className="text-teal-300 font-mono">cell</code> objects, mutating enclosing state with <code className="text-cyan-300 font-mono">nonlocal</code>, and avoiding late-binding loop traps.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔍 LEGB Scope Hierarchy
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📦 __closure__ &amp; Cell Objects
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ The nonlocal Keyword
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🪤 Late-Binding Loop Traps
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: CLOSURE FUNDAMENTALS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🔐</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Anatomy of a Python Closure
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              A <strong>Closure</strong> is a function object that remembers values in its enclosing lexical scope even after the outer parent function has finished executing and popped off the call stack:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Rule 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ Nested Function</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">def outer(): def inner():</code>
                <p className="text-[11px] text-slate-300">
                  Must define an inner function directly inside an outer enclosing function.
                </p>
              </div>

              {/* Rule 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ Enclosed Reference</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">return x * multiplier</code>
                <p className="text-[11px] text-slate-300">
                  The inner function must reference a variable belonging to the outer scope.
                </p>
              </div>

              {/* Rule 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ Returned Function</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">return inner</code>
                <p className="text-[11px] text-slate-300">
                  The outer function must return the inner function object without calling it.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The `nonlocal` Keyword
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                By default, reading an enclosing variable is permitted. However, reassigning it (e.g. <code className="text-rose-400 font-mono">count += 1</code>) will cause <code className="text-rose-400 font-mono">UnboundLocalError</code> because Python assumes it is a local variable. Adding <code className="text-teal-300 font-mono">nonlocal count</code> informs Python to mutate the variable in the enclosing parent scope!
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
                2. Visualizing LEGB Scope &amp; CPython Cell Memory
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("legb")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "legb"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                LEGB Scope Order
              </button>
              <button
                onClick={() => setActiveInteractiveTab("cell")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "cell"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                CPython Cell Objects
              </button>
              <button
                onClick={() => setActiveInteractiveTab("nonlocal")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "nonlocal"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                nonlocal Mutation Flow
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining lexical hierarchy, heap cells, and state mutations across frames:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "legb" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">THE LEGB VARIABLE SCOPE RESOLUTION ORDER</text>

                {/* 4 Concentric Nesting Blocks */}
                <g transform="translate(30, 50)">
                  {/* Built-in: Outer Layer */}
                  <rect x="0" y="0" width="820" height="240" rx="10" fill="#090d16" stroke="#475569" strokeDasharray="4 4" />
                  <text x="20" y="25" fill="#94a3b8" fontSize="11 font-bold">4. BUILT-IN SCOPE (len, range, max, Exception, id)</text>

                  {/* Global Layer */}
                  <rect x="30" y="40" width="760" height="185" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="50" y="62" fill="#c4b5fd" fontSize="11 font-bold">3. GLOBAL SCOPE (Module-level: `INSTITUTION = "Coder &amp; AccoTax"`)</text>

                  {/* Enclosing Layer */}
                  <rect x="60" y="80" width="700" height="130" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="80" y="102" fill="#a5f3fc" fontSize="11 font-bold">2. ENCLOSING SCOPE (Outer function `def outer_auditor(gross_fee)`: `gross_fee = 25000`)</text>

                  {/* Local Layer */}
                  <rect x="90" y="120" width="640" height="75" rx="6" fill="#134e4a" stroke="#14b8a6" />
                  <text x="110" y="145" fill="#99f6e4" fontSize="11 font-bold">1. LOCAL SCOPE (Inner function `def summary(disc_rate)`: `net = gross_fee * (1-disc_rate)`)</text>
                  <text x="110" y="170" fill="#34d399" fontSize="9 font-mono">Resolution searches inside-out: Local → Enclosing → Global → Built-in</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "cell" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">CPYTHON HEAP CELL OBJECTS &amp; `__closure__`</text>

                {/* Left: Closure Function Object */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="360" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="30" fill="#99f6e4" fontSize="12" fontWeight="bold">Closure Function: `apply_discount`</text>
                  
                  <text x="20" y="60" fill="#ecfdf5" fontSize="8 font-mono">def apply_discount(base):</text>
                  <text x="35" y="80" fill="#34d399" fontSize="8 font-mono">return base * multiplier</text>

                  <rect x="20" y="110" width="320" height="105" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="135" fill="#34d399" fontSize="10 font-bold">Internal `__closure__` Tuple:</text>
                  <text x="30" y="155" fill="#ecfdf5" fontSize="8 font-mono">• `fn.__closure__[0]` -&gt; &lt;cell at 0x7ffd&gt;</text>
                  <text x="30" y="175" fill="#ecfdf5" fontSize="8 font-mono">• Points to persistent heap memory</text>
                  <text x="30" y="195" fill="#a7f3d0" fontSize="8 font-mono">even after outer() frame is destroyed!</text>
                </g>

                {/* Arrow */}
                <g transform="translate(405, 140)">
                  <text x="0" y="0" fill="#38bdf8" fontSize="12" fontWeight="bold">references</text>
                  <text x="25" y="25" fill="#38bdf8" fontSize="26" fontWeight="bold">→</text>
                </g>

                {/* Right: Heap Cell Object */}
                <g transform="translate(490, 50)">
                  <rect x="0" y="0" width="360" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="12" fontWeight="bold">Heap Cell Object: `&lt;cell at 0x7ffd&gt;`</text>

                  <rect x="20" y="60" width="320" height="155" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="30" y="85" fill="#ecfdf5" fontSize="9 font-mono font-bold">Cell Attributes:</text>
                  <text x="30" y="110" fill="#34d399" fontSize="9 font-mono">• `cell_contents` = 0.80 (Float)</text>
                  <text x="30" y="135" fill="#cbd5e1" fontSize="8 font-mono">• Reference Count: 1</text>
                  <text x="30" y="160" fill="#cbd5e1" fontSize="8 font-mono">• Shared across multiple inner calls</text>
                  <text x="30" y="185" fill="#c4b5fd" fontSize="8 font-bold">Preserves state across entire application lifecycle!</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">THE `nonlocal` STATE MUTATION WORKFLOW</text>

                {/* Left: Without nonlocal */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="12" fontWeight="bold">❌ Without `nonlocal`: UnboundLocalError</text>
                  
                  <text x="20" y="60" fill="#fca5a5" fontSize="8 font-mono">def outer():</text>
                  <text x="35" y="78" fill="#fca5a5" fontSize="8 font-mono">count = 0</text>
                  <text x="35" y="96" fill="#fca5a5" fontSize="8 font-mono">def inner():</text>
                  <text x="50" y="114" fill="#fca5a5" fontSize="8 font-mono font-bold">count += 1  # ❌ CRASHES!</text>
                  
                  <rect x="20" y="140" width="340" height="75" rx="4" fill="#881337" stroke="#e11d48" />
                  <text x="30" y="165" fill="#ffe4e6" fontSize="9 font-bold">Python's Parsing Rule:</text>
                  <text x="30" y="185" fill="#ecfdf5" fontSize="8 font-mono">Assignment `=` marks `count` as local before assignment!</text>
                </g>

                {/* Right: With nonlocal */}
                <g transform="translate(460, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">✓ With `nonlocal`: Mutates Cell in Place</text>
                  
                  <text x="20" y="60" fill="#ecfdf5" fontSize="8 font-mono">def outer():</text>
                  <text x="35" y="78" fill="#ecfdf5" fontSize="8 font-mono">count = 0</text>
                  <text x="35" y="96" fill="#ecfdf5" fontSize="8 font-mono">def inner():</text>
                  <text x="50" y="114" fill="#34d399" fontSize="8 font-mono font-bold">nonlocal count</text>
                  <text x="50" y="132" fill="#34d399" fontSize="8 font-mono">count += 1  # ✓ Mutates enclosing cell!</text>

                  <rect x="20" y="155" width="340" height="60" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="180" fill="#34d399" fontSize="9 font-bold">Stateful Retention:</text>
                  <text x="30" y="198" fill="#a7f3d0" fontSize="8 font-mono">Increments: 0 → 1 → 2 → 3 on each successive call!</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE SCHOLARSHIP CLOSURE PLAYGROUND */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Scholarship Budget Accumulator Closure
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Disburse scholarship amounts to see how the enclosed closure cell state (<code className="text-teal-300 font-mono">total_disbursed</code>, <code className="text-cyan-300 font-mono">history</code>) updates persistently across successive invocations:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Controls */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                  Disburse Scholarship (Closure Method)
                </span>
                <button
                  onClick={handleResetClosure}
                  className="text-[11px] font-mono text-slate-400 hover:text-white underline"
                >
                  Reset Closure State
                </button>
              </div>

              {/* Candidate Name */}
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-400 block">Candidate Student Name:</label>
                <input
                  type="text"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  placeholder="e.g. Sourav Mukherjee"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs font-mono text-white focus:border-teal-500 focus:outline-none"
                />
              </div>

              {/* Disburse Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Disbursement Amount:</span>
                  <span className="text-teal-300 font-bold">INR {disburseAmount.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="25000"
                  step="1000"
                  value={disburseAmount}
                  onChange={(e) => setDisburseAmount(Number(e.target.value))}
                  className="w-full accent-teal-500"
                />
              </div>

              {/* Action Button */}
              <button
                onClick={handleDisburse}
                className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-lg text-xs font-mono transition-all shadow-lg shadow-teal-950/50"
              >
                Invoke `disburse(student_id, student_name, amount)`
              </button>

              {errorMessage && (
                <div className="p-3 bg-rose-950/80 border border-rose-800 rounded-lg text-xs font-mono text-rose-300">
                  {errorMessage}
                </div>
              )}
            </div>

            {/* Live Closure Cell Inspector Output */}
            <div className="space-y-4 flex flex-col justify-between">
              {/* Heap Cell Memory Readout */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
                <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  Closure `__closure__` Heap Cell Inspector:
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">`__closure__[0]` (Allocated Budget):</span>
                  <span className="text-slate-300 font-bold">INR {TOTAL_BUDGET.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">`__closure__[1]` (Total Disbursed):</span>
                  <span className="text-teal-300 font-bold">INR {disbursedTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Remaining Enclosed Budget:</span>
                  <span className="text-emerald-400 font-bold">INR {remainingBudget.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">`__closure__[2]` (Recipients Cell):</span>
                  <span className="text-purple-300 font-bold">{recipients.length} Enrolled</span>
                </div>
              </div>

              {/* Recipient History List */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex-1 overflow-y-auto max-h-[160px] space-y-1.5 text-xs font-mono">
                <span className="text-slate-400 block font-bold text-[10px] uppercase">
                  Enclosed State Audit History:
                </span>
                {recipients.length === 0 ? (
                  <div className="text-slate-500 italic text-[11px]">No scholarships disbursed yet.</div>
                ) : (
                  recipients.map((r, idx) => (
                    <div key={idx} className="p-2 bg-slate-950 rounded border border-slate-800 flex justify-between items-center text-[11px]">
                      <div>
                        <span className="text-teal-400 font-bold">{r.id}: </span>
                        <span className="text-slate-200">{r.name}</span>
                        <span className="text-slate-500 text-[10px] block">[{r.time}]</span>
                      </div>
                      <div className="text-right">
                        <span className="text-emerald-400 font-bold">INR {r.amount.toLocaleString()}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER CLOSURES MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Lexical Scope &amp; Closures Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Scope / Keyword</th>
                  <th className="py-3.5 px-4 font-bold">Target Resolution Layer</th>
                  <th className="py-3.5 px-4 font-bold">Mutation Capability</th>
                  <th className="py-3.5 px-4 font-bold">Common Anti-Pattern</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">Local (L)</td>
                  <td className="py-3 px-4">Active function frame</td>
                  <td className="py-3 px-4 text-emerald-400">Direct assignment (=)</td>
                  <td className="py-3 px-4 text-rose-300">Shadowing outer variables</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">nonlocal (E)</td>
                  <td className="py-3 px-4">Nearest enclosing parent function</td>
                  <td className="py-3 px-4 text-emerald-400">Requires `nonlocal var`</td>
                  <td className="py-3 px-4 text-rose-300">UnboundLocalError without nonlocal</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">global (G)</td>
                  <td className="py-3 px-4">Top-level module file</td>
                  <td className="py-3 px-4 text-emerald-400">Requires `global var`</td>
                  <td className="py-3 px-4 text-rose-300">Polluting global namespace</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">Late Binding</td>
                  <td className="py-3 px-4">Closure lookup at execution time</td>
                  <td className="py-3 px-4">Evaluates variable dynamically</td>
                  <td className="py-3 px-4 text-rose-300">Loop variable trap in lambda list</td>
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
            Explore 4 production-grade Python scripts demonstrating LEGB scope resolution, closure cell objects, nonlocal mutation, and scholarship managers:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "inner_functions_and_scope_resolution.py",
                code: innerFunctions,
                description: "Inner functions, LEGB scope resolution order, and reading enclosing variables.",
              },
              {
                filename: "closures_and_cell_objects.py",
                code: closuresAnatomy,
                description: "Closure anatomy, cell objects, and __closure__ introspection in CPython.",
              },
              {
                filename: "nonlocal_keyword_and_state_mutation.py",
                code: nonlocalState,
                description: "The nonlocal keyword, stateful counters, and rolling average accumulator closures.",
              },
              {
                filename: "institutional_scholarship_accumulator_closure.py",
                code: scholarshipClosure,
                description: "Institutional Scholarship Budget Manager encapsulating state without OOP classes.",
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
                <span>❌</span> Trap 1: The Late-Binding Loop Trap
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-rose-300 font-mono">funcs = [lambda: i for i in range(5)]</code> binds all lambdas to the same variable <code className="text-rose-300 font-mono">i</code>, so calling any lambda returns <code className="text-rose-300 font-mono">4</code>!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use default argument: <code className="text-emerald-300">lambda i=i: i</code>.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Missing `nonlocal` on Reassignment
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-amber-300 font-mono">count += 1</code> without <code className="text-amber-300 font-mono">nonlocal count</code> raises <code className="text-amber-300 font-mono">UnboundLocalError</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Declare <code className="text-emerald-300">nonlocal count</code> before rebinding.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Pickling Closures with Standard Pickle
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Standard <code className="text-purple-300 font-mono">pickle.dump()</code> fails on nested closures because they lack global module paths.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use <code className="text-emerald-300">dill</code> or <code className="text-emerald-300">cloudpickle</code> for serializing closures.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Memory Leak in Unbounded Accumulators
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Appended lists inside closures grow indefinitely in memory unless capped with rolling buffers or limits.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Use <code className="text-emerald-300">collections.deque(maxlen=100)</code> for rolling buffers.
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
            Comprehensive question-and-answer repository covering inner functions, closures, cell objects, and the nonlocal keyword:
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
            Download or print the complete reference sheet with LEGB scope rules, closure recipes, and nonlocal templates:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic1_inner_functions_closures_notes.txt"
              title="Print Topic 1 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
