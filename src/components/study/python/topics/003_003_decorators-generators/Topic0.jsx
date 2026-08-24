import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import firstClassFundamentals from "./topic0_files/first_class_functions_fundamentals.py?raw";
import functionFactories from "./topic0_files/function_returning_and_factories.py?raw";
import dispatchTables from "./topic0_files/dispatch_table_with_function_objects.py?raw";
import functorPipelines from "./topic0_files/student_fee_calculator_functors.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic0_files/topic0_note.txt?raw";

// FAQ Questions
import questions from "./topic0_files/topic0_questions";

/**
 * Topic0: First-Class Functions: Passing and returning functions
 * Module: 003_003_decorators-generators
 * Segment: 3 (Advanced Python Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic0() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("memory");

  // Interactive Pipeline & Dispatcher Simulator State
  const [baseTuition, setBaseTuition] = useState(25000);
  const [selectedStrategy, setSelectedStrategy] = useState("academic");
  const [includeLab, setIncludeLab] = useState(true);
  const [includeGst, setIncludeGst] = useState(true);
  const [includeRounding, setIncludeRounding] = useState(true);

  // Command Dispatch State
  const [activeCommand, setActiveCommand] = useState("PAYMENT");

  const strategies = {
    academic: {
      name: "apply_academic_scholarship",
      label: "20% Academic Scholarship (0.80x)",
      rate: 0.80,
      doc: "Applies a 20% discount for meritorious students.",
    },
    sibling: {
      name: "apply_sibling_concession",
      label: "15% Sibling Concession (0.85x)",
      rate: 0.85,
      doc: "Applies a 15% discount for enrolled siblings.",
    },
    early_bird: {
      name: "apply_early_bird_discount",
      label: "10% Early Bird Registration (0.90x)",
      rate: 0.90,
      doc: "Applies 10% waiver for early registrations.",
    },
    standard: {
      name: "compute_standard_fee",
      label: "Standard Tuition Fee (1.00x)",
      rate: 1.00,
      doc: "Standard course rate with no waiver.",
    },
  };

  const dispatchActions = {
    ADMISSION: {
      handler: "handle_admission",
      result: "Processing Admission & Enrolling Student into Python Masterclass",
      time: "0.2ms",
    },
    PAYMENT: {
      handler: "handle_fee_payment",
      result: `Recording Fee Payment of INR ${(baseTuition * strategies[selectedStrategy].rate).toLocaleString()} in ledger`,
      time: "0.3ms",
    },
    CERTIFICATE: {
      handler: "handle_issue_certificate",
      result: "Generating Certified Completion Diploma with Cryptographic Seal",
      time: "0.5ms",
    },
    UNKNOWN: {
      handler: "handle_unknown_action (Fallback)",
      result: "[ERROR] Unrecognized action! Delegated to safe default fallback.",
      time: "0.1ms",
    },
  };

  // Compute composed fee
  let currentVal = baseTuition;
  currentVal = currentVal * strategies[selectedStrategy].rate;
  if (includeLab) currentVal += 2500;
  if (includeGst) currentVal *= 1.18;
  if (includeRounding) currentVal = Math.round(currentVal / 100) * 100;

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
            Topic 0
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Decorators, Generators &amp; Iterators
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          First-Class Functions: <span className="text-teal-400">Passing &amp; Returning Functions</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master the foundation of Python functional programming: treating functions as first-class objects, passing functions into higher-order processors, dynamic function factories, command dispatch tables, and composable pipelines.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🎯 Functions as First-Class Citizens
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔄 Higher-Order Functions (HOFs)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🏭 Dynamic Function Factories
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ O(1) Command Dispatch Tables
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: FIRST-CLASS ESSENTIALS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🌟</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. What Makes Functions "First-Class" in Python?
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              In Python, functions are not merely static blocks of code; they are full <strong>first-class objects</strong> residing in heap memory. This means a function has a memory address, an identity (<code className="text-teal-300 font-mono">id()</code>), and can be manipulated exactly like an integer, string, or list:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-6 not-prose">
              {/* Capability 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ Variable Assignment</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">alias = calculate_fee</code>
                <p className="text-[11px] text-slate-300">
                  Assign function references to new variable names without executing them.
                </p>
              </div>

              {/* Capability 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ Passing as Arguments</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">apply_strategy(discount_fn)</code>
                <p className="text-[11px] text-slate-300">
                  Pass function objects into higher-order functions to parameterize logic.
                </p>
              </div>

              {/* Capability 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ Returning Functions</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">return custom_calculator</code>
                <p className="text-[11px] text-slate-300">
                  Function factories construct and return customized specialized functions.
                </p>
              </div>

              {/* Capability 4 */}
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 shadow-lg">
                <div className="text-emerald-400 font-bold text-sm mb-1">4️⃣ Storing in Data Structures</div>
                <code className="text-xs font-mono text-emerald-300 block mb-1">table = &#123;"PAY": fn&#125;</code>
                <p className="text-[11px] text-slate-300">
                  Store function objects inside dictionaries for O(1) command dispatching.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Golden Difference: `func` vs `func()`
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-teal-300 font-mono">my_func</code> refers to the <strong>function object itself</strong> (like passing a blueprint). Writing <code className="text-cyan-300 font-mono">my_func()</code> with parentheses <strong>invokes</strong> the function, executing its code and evaluating to its return value!
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
                2. Visualizing First-Class Objects &amp; Factory Pipelines
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("memory")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "memory"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Function Memory Reference
              </button>
              <button
                onClick={() => setActiveInteractiveTab("hof")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "hof"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Higher-Order Passing
              </button>
              <button
                onClick={() => setActiveInteractiveTab("factory")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "factory"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Dynamic Function Factory
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining heap memory references, higher-order parameterization, and factory closures:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "memory" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">FUNCTION OBJECTS IN PYTHON HEAP MEMORY</text>

                {/* Variable Stack Pointers */}
                <g transform="translate(30, 60)">
                  <rect x="0" y="0" width="260" height="90" rx="6" fill="#134e4a" stroke="#14b8a6" />
                  <text x="15" y="25" fill="#99f6e4" fontSize="11" fontWeight="bold">Variable: `apply_scholarship`</text>
                  <text x="15" y="50" fill="#ecfdf5" fontSize="9 font-mono">Reference Pointer -&gt;</text>
                  <text x="15" y="70" fill="#34d399" fontSize="8 font-mono">Points to 0x7ffd19a4</text>

                  <rect x="0" y="110" width="260" height="90" rx="6" fill="#083344" stroke="#06b6d4" />
                  <text x="15" y="135" fill="#a5f3fc" fontSize="11" fontWeight="bold">Variable: `discount_calc`</text>
                  <text x="15" y="160" fill="#ecfdf5" fontSize="9 font-mono">Reference Pointer -&gt;</text>
                  <text x="15" y="180" fill="#38bdf8" fontSize="8 font-mono">Points to 0x7ffd19a4 (ALIAS)</text>
                </g>

                {/* Arrow Pointers */}
                <g transform="translate(310, 110)">
                  <text x="10" y="0" fill="#2dd4bf" fontSize="26" fontWeight="bold">→</text>
                  <text x="10" y="80" fill="#38bdf8" fontSize="26" fontWeight="bold">→</text>
                </g>

                {/* Heap Memory Function Object */}
                <g transform="translate(410, 50)">
                  <rect x="0" y="0" width="430" height="230" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="12" fontWeight="bold">Function Object at Heap Address: 0x7ffd19a4</text>

                  <rect x="20" y="50" width="390" height="155" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="35" y="75" fill="#ecfdf5" fontSize="9 font-mono">• `__name__` = "apply_academic_scholarship"</text>
                  <text x="35" y="98" fill="#ecfdf5" fontSize="9 font-mono">• `__doc__`  = "Calculates 20% tuition scholarship"</text>
                  <text x="35" y="121" fill="#ecfdf5" fontSize="9 font-mono">• `__code__` = &lt;code object at 0x7ffd18&gt;</text>
                  <text x="35" y="144" fill="#ecfdf5" fontSize="9 font-mono">• `__dict__` = &#123;'version': '1.0'&#125;</text>
                  <text x="35" y="172" fill="#34d399" fontSize="9 font-bold">✓ Both variables execute identical bytecode!</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "hof" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">HIGHER-ORDER FUNCTIONS: PASSING FUNCTIONS AS ARGUMENTS</text>

                {/* 3 Blocks */}
                <g transform="translate(30, 50)">
                  {/* Strategy Functions */}
                  <rect x="0" y="0" width="250" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="15" y="30" fill="#99f6e4" fontSize="11 font-bold">1. Strategy Functions</text>
                  <text x="15" y="60" fill="#ecfdf5" fontSize="8 font-mono">def academic(fee):</text>
                  <text x="30" y="78" fill="#34d399" fontSize="8 font-mono">return fee * 0.80</text>
                  <text x="15" y="105" fill="#ecfdf5" fontSize="8 font-mono">def sibling(fee):</text>
                  <text x="30" y="123" fill="#34d399" fontSize="8 font-mono">return fee * 0.85</text>

                  <rect x="15" y="150" width="220" height="70" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="25" y="175" fill="#34d399" fontSize="9 font-bold">First-Class Callables:</text>
                  <text x="25" y="195" fill="#cbd5e1" fontSize="8">Pure functions passed as data.</text>

                  {/* Arrow 1 */}
                  <text x="265" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Higher Order Processor */}
                  <rect x="295" y="0" width="250" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="310" y="30" fill="#a5f3fc" fontSize="11 font-bold">2. Higher-Order Function</text>
                  <text x="310" y="60" fill="#ecfdf5" fontSize="8 font-mono">def process(name, fee, fn):</text>
                  <text x="325" y="85" fill="#38bdf8" fontSize="8 font-mono font-bold">final = fn(fee) # CALLS</text>
                  <text x="325" y="105" fill="#ecfdf5" fontSize="8 font-mono">return final</text>

                  <rect x="310" y="150" width="220" height="70" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="320" y="175" fill="#38bdf8" fontSize="9 font-bold">Dynamic Delegation:</text>
                  <text x="320" y="195" fill="#cbd5e1" fontSize="8">Behavior parameterization.</text>

                  {/* Arrow 2 */}
                  <text x="560" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Caller */}
                  <rect x="590" y="0" width="230" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="605" y="30" fill="#c4b5fd" fontSize="11 font-bold">3. Clean Invocation</text>
                  <text x="605" y="60" fill="#ecfdf5" fontSize="8 font-mono">process("Sourav",</text>
                  <text x="620" y="80" fill="#ecfdf5" fontSize="8 font-mono">25000,</text>
                  <text x="620" y="100" fill="#34d399" fontSize="8 font-mono font-bold">academic) # PASSED</text>

                  <rect x="605" y="150" width="200" height="70" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="615" y="175" fill="#c4b5fd" fontSize="9 font-bold">Open-Closed Principle:</text>
                  <text x="615" y="195" fill="#cbd5e1" fontSize="8">Add new strategies easily!</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">DYNAMIC FUNCTION FACTORIES: RETURNING FUNCTIONS</text>

                {/* Left: Factory Definition */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="12" fontWeight="bold">Factory: `create_tuition_calculator(tax, disc)`</text>
                  
                  <text x="20" y="60" fill="#ecfdf5" fontSize="8 font-mono">def create_tuition_calculator(tax, disc):</text>
                  <text x="35" y="80" fill="#cbd5e1" fontSize="8 font-mono">def custom_calc(raw_fee):</text>
                  <text x="50" y="100" fill="#cbd5e1" fontSize="8 font-mono">return (raw_fee * (1 - disc)) * (1 + tax)</text>
                  <text x="35" y="125" fill="#34d399" fontSize="8 font-mono font-bold">return custom_calc  # RETURNS FUNCTION OBJECT</text>

                  <rect x="20" y="150" width="340" height="70" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="30" y="175" fill="#c4b5fd" fontSize="9 font-bold">Closure Capture:</text>
                  <text x="30" y="195" fill="#cbd5e1" fontSize="8 font-mono">Inner function remembers outer `tax` and `disc` parameters!</text>
                </g>

                {/* Arrow */}
                <g transform="translate(425, 140)">
                  <text x="0" y="0" fill="#c084fc" fontSize="12" fontWeight="bold">returns</text>
                  <text x="15" y="25" fill="#38bdf8" fontSize="26" fontWeight="bold">→</text>
                </g>

                {/* Right: Generated Functions */}
                <g transform="translate(480, 50)">
                  <rect x="0" y="0" width="370" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">Specialized Generated Functions</text>
                  
                  <rect x="20" y="55" width="330" height="70" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="78" fill="#34d399" fontSize="9 font-bold font-mono">kolkata_calc = factory(0.18, 0.10)</text>
                  <text x="30" y="98" fill="#cbd5e1" fontSize="8">Customized for Kolkata (18% tax, 10% disc)</text>
                  <text x="30" y="113" fill="#a7f3d0" fontSize="8 font-mono">kolkata_calc(25000) -&gt; INR 26,550.00</text>

                  <rect x="20" y="145" width="330" height="70" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="168" fill="#34d399" fontSize="9 font-bold font-mono">barrackpore_calc = factory(0.05, 0.20)</text>
                  <text x="30" y="188" fill="#cbd5e1" fontSize="8">Customized for Barrackpore (5% tax, 20% disc)</text>
                  <text x="30" y="203" fill="#a7f3d0" fontSize="8 font-mono">barrackpore_calc(25000) -&gt; INR 21,000.00</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE PIPELINE & DISPATCHER PLAYGROUND */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Functor Pipeline &amp; Command Dispatch Playground
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Select a discount strategy function and toggle pipeline transformation stages to see how first-class functions compose cleanly:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Strategy & Pipeline Controls */}
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold block">
                1. Select Strategy Function Object:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {Object.keys(strategies).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSelectedStrategy(key)}
                    className={clsx(
                      "p-2.5 rounded-lg text-left text-xs font-mono border transition-all",
                      selectedStrategy === key
                        ? "bg-teal-950/80 border-teal-500 text-teal-200"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                    )}
                  >
                    <div className="font-bold">{strategies[key].name}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{strategies[key].label}</div>
                  </button>
                ))}
              </div>

              {/* Base Fee Slider */}
              <div className="space-y-1 pt-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Base Tuition Fee:</span>
                  <span className="text-teal-300 font-bold">INR {baseTuition.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="50000"
                  step="5000"
                  value={baseTuition}
                  onChange={(e) => setBaseTuition(Number(e.target.value))}
                  className="w-full accent-teal-500"
                />
              </div>

              {/* Composable Transformation Checkboxes */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block">
                  2. Composed Pipeline Functors:
                </span>
                <div className="flex flex-col gap-1.5 text-xs font-mono text-slate-300">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeLab}
                      onChange={(e) => setIncludeLab(e.target.checked)}
                      className="accent-teal-500 rounded"
                    />
                    <span>add_laboratory_fee (+INR 2,500)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeGst}
                      onChange={(e) => setIncludeGst(e.target.checked)}
                      className="accent-teal-500 rounded"
                    />
                    <span>add_gst_tax (+18% GST)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeRounding}
                      onChange={(e) => setIncludeRounding(e.target.checked)}
                      className="accent-teal-500 rounded"
                    />
                    <span>round_to_nearest_hundred()</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Live Introspection & Command Dispatch Output */}
            <div className="space-y-4 flex flex-col justify-between">
              {/* Function Introspection Box */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
                <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  Active Function Metadata Introspection:
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">`fn.__name__`:</span>
                  <span className="text-teal-300 font-bold">{strategies[selectedStrategy].name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">`fn.__doc__`:</span>
                  <span className="text-slate-300 text-[11px] text-right truncate max-w-[200px]">
                    "{strategies[selectedStrategy].doc}"
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Memory Address:</span>
                  <span className="text-purple-300">0x7ffd19a48e20</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                  <span className="text-slate-300 font-bold">Composed Pipeline Output:</span>
                  <span className="text-base font-bold text-emerald-400">
                    INR {currentVal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Command Dispatch Table Simulator */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2.5 text-xs font-mono">
                <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  3. Command Dispatch Table: `DISPATCH.get(action)`
                </div>
                <div className="grid grid-cols-4 gap-1.5 text-[11px]">
                  {Object.keys(dispatchActions).map((act) => (
                    <button
                      key={act}
                      onClick={() => setActiveCommand(act)}
                      className={clsx(
                        "p-1.5 rounded border transition-all text-center",
                        activeCommand === act
                          ? "bg-cyan-950 border-cyan-500 text-cyan-200 font-bold"
                          : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                      )}
                    >
                      {act}
                    </button>
                  ))}
                </div>

                <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Dispatched Handler:</span>
                    <span className="text-cyan-300 font-bold">{dispatchActions[activeCommand].handler}</span>
                  </div>
                  <div className="text-emerald-300 text-[11px]">
                    {dispatchActions[activeCommand].result}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER FIRST-CLASS MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master First-Class Functions Reference Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Concept / Pattern</th>
                  <th className="py-3.5 px-4 font-bold">Python Code Syntax</th>
                  <th className="py-3.5 px-4 font-bold">Primary Benefit</th>
                  <th className="py-3.5 px-4 font-bold">Real-World Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">Function Aliasing</td>
                  <td className="py-3 px-4 font-mono text-slate-200">calc_ref = apply_scholarship</td>
                  <td className="py-3 px-4">Dynamic runtime reassignment</td>
                  <td className="py-3 px-4">Pluggable backend drivers</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">Higher-Order Passing</td>
                  <td className="py-3 px-4 font-mono text-slate-200">def run(fn, val): return fn(val)</td>
                  <td className="py-3 px-4">Behavioral parameterization</td>
                  <td className="py-3 px-4">Strategy pattern, map(), filter()</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">Function Factory</td>
                  <td className="py-3 px-4 font-mono text-slate-200">def factory(rate): return lambda x: x*rate</td>
                  <td className="py-3 px-4">Generates customized logic</td>
                  <td className="py-3 px-4">Branch-specific fee calculators</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-emerald-300 font-semibold">Dispatch Tables</td>
                  <td className="py-3 px-4 font-mono text-slate-200">TABLE = &#123;'ACT': fn&#125;; TABLE[k]()</td>
                  <td className="py-3 px-4">O(1) lookups, replaces If-ladders</td>
                  <td className="py-3 px-4">REST API routers, CLI command parsers</td>
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
            Explore 4 production-grade Python scripts demonstrating first-class function fundamentals, function factories, command dispatch tables, and composable pipelines:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "first_class_functions_fundamentals.py",
                code: firstClassFundamentals,
                description: "First-class functions, assigning functions to variables, and higher-order argument passing.",
              },
              {
                filename: "function_returning_and_factories.py",
                code: functionFactories,
                description: "Function factories, nested functions, and returning customized function objects.",
              },
              {
                filename: "dispatch_table_with_function_objects.py",
                code: dispatchTables,
                description: "Command dispatch tables eliminating sprawling if/elif/else ladders with dictionary lookups.",
              },
              {
                filename: "student_fee_calculator_functors.py",
                code: functorPipelines,
                description: "Composable institutional fee processing pipeline using first-class function functors.",
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
                <span>❌</span> Trap 1: Accidentally Calling When Passing
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-rose-300 font-mono">button.on_click(handle_click())</code> executes the function immediately at setup time and passes its return value (<code className="text-rose-300 font-mono">None</code>) to the button!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Pass uncalled reference: <code className="text-emerald-300">button.on_click(handle_click)</code>.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Shadowing Built-in Functions
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-amber-300 font-mono">list = [1, 2, 3]</code> or <code className="text-amber-300 font-mono">max = 100</code> overwrites the built-in function object in local scope.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Never use Python built-in names (<code className="text-emerald-300">list, dict, str, max, id</code>) as variable identifiers.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Unhandled Dispatch KeyError
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Using direct subscription <code className="text-purple-300 font-mono">DISPATCH[cmd]()</code> crashes with <code className="text-purple-300 font-mono">KeyError</code> on unrecognized commands.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use <code className="text-emerald-300">DISPATCH.get(cmd, default_handler)()</code>.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Mutable Defaults in Factories
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Using mutable defaults like <code className="text-cyan-300 font-mono">def factory(cache=&#123;&#125;):</code> creates shared state across all generated function instances!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Initialize mutable objects inside the factory body.
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
            Comprehensive question-and-answer repository covering first-class functions, higher-order functions, function factories, and command dispatch tables:
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
            Download or print the complete reference sheet with first-class function templates, factory patterns, and dispatch recipes:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic0_first_class_functions_notes.txt"
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
