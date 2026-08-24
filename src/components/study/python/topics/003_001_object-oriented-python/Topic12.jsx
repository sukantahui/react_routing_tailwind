import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import representationEquality from "./topic12_files/dunder_representation_and_equality.py?raw";
import containerDunders from "./topic12_files/dunder_containers_and_sequences.py?raw";
import arithmeticCallable from "./topic12_files/dunder_arithmetic_and_callable.py?raw";
import smartLedger from "./topic12_files/smart_student_batch_ledger.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic12_files/topic12_note.txt?raw";

// FAQ Questions
import questions from "./topic12_files/topic12_questions";

/**
 * Topic12: Magic / Dunder Methods: __str__, __repr__, __len__, __eq__, __add__
 * Module: 003_001_object-oriented-python
 * Segment: 3 (Advanced Python Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic12() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("repr");

  // Interactive Smart Batch Ledger Playground State
  const [activeDunderOp, setActiveDunderOp] = useState("len");
  const [searchQuery, setSearchQuery] = useState("Rahul");

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

  const batchAStudents = [
    { id: "STU-01", name: "Sourav Mukherjee", fee: 18000 },
    { id: "STU-02", name: "Priyanka Sen", fee: 18000 },
  ];

  const batchBStudents = [
    { id: "STU-03", name: "Rahul Verma", fee: 22000 },
    { id: "STU-04", name: "Debolina Roy", fee: 22000 },
  ];

  const mergedBatch = [...batchAStudents, ...batchBStudents];

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
            Segment 3 • Module 003_001
          </span>
          <span className="text-xs sm:text-sm font-mono bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/80 shadow-sm shadow-cyan-950/50">
            Topic 12
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Object-Oriented Programming (OOP) in Python
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Magic / Dunder Methods &amp; the <span className="text-teal-400">Python Data Model</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master Python's built-in object protocols: string representations (<code className="text-teal-300 font-mono">__str__</code> vs <code className="text-cyan-300 font-mono">__repr__</code>), container indexing (<code className="text-purple-300 font-mono">__getitem__</code>, <code className="text-purple-300 font-mono">__len__</code>), operator overloading (<code className="text-amber-300 font-mono">__add__</code>), and stateful callable objects (<code className="text-emerald-300 font-mono">__call__</code>).
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔤 __str__ vs __repr__ Protocols
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📦 Container Sequence Protocols (__len__, __getitem__)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ➕ Arithmetic &amp; In-Place Overloads (__add__, __iadd__)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ Callable Functors (__call__)
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: THE PYTHON DATA MODEL */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">✨</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Python Data Model &amp; Magic Protocols
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              In Python, special double-underscore (<strong>dunder</strong>) methods allow custom user-defined objects to integrate seamlessly with native language keywords, built-ins, and operators:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6 not-prose">
              {/* Category 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ Representation</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">__str__, __repr__</code>
                <p className="text-[11px] text-slate-300">
                  Controls string rendering for print(), logs, and interactive shells.
                </p>
              </div>

              {/* Category 2 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">2️⃣ Containers</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">__len__, __getitem__</code>
                <p className="text-[11px] text-slate-300">
                  Enables len(obj), obj[i], obj[1:3], and item in obj.
                </p>
              </div>

              {/* Category 3 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">3️⃣ Arithmetic</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">__add__, __mul__</code>
                <p className="text-[11px] text-slate-300">
                  Customizes +, -, *, and reflected operators (+ with numbers).
                </p>
              </div>

              {/* Category 4 */}
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 shadow-lg">
                <div className="text-amber-400 font-bold text-sm mb-1">4️⃣ Callable Functors</div>
                <code className="text-xs font-mono text-amber-300 block mb-1">__call__(self, ...)</code>
                <p className="text-[11px] text-slate-300">
                  Allows instances to be executed directly like functions: obj(arg).
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Golden Rule: __str__ vs __repr__
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                <code className="text-teal-300 font-mono">__str__</code> is for <strong>users</strong> (friendly, informal UI string). <code className="text-cyan-300 font-mono">__repr__</code> is for <strong>developers</strong> (unambiguous, technical, ideally matching <code className="text-cyan-300">eval(repr(obj)) == obj</code>). Always implement <code className="text-cyan-300">__repr__</code> first!
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
                2. Visualizing Dunder Protocols &amp; Data Model Hooks
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("repr")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "repr"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                __str__ vs __repr__
              </button>
              <button
                onClick={() => setActiveInteractiveTab("container")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "container"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Sequence Protocol
              </button>
              <button
                onClick={() => setActiveInteractiveTab("functor")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "functor"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Callable Functors (__call__)
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining representation dualities, sequence container indexing, and callable functor execution:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "repr" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">REPRESENTATION DUALITY: __str__ VS __repr__</text>

                {/* __str__ Box */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="30" fill="#99f6e4" fontSize="12" fontWeight="bold">__str__(self) - For End Users</text>
                  <text x="20" y="60" fill="#cbd5e1" fontSize="10">• Triggered by `print(obj)` and `str(obj)`</text>
                  <text x="20" y="85" fill="#cbd5e1" fontSize="10">• Informal, readable, clean presentation</text>

                  <rect x="20" y="125" width="340" height="90" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="150" fill="#a7f3d0" fontSize="10 font-bold">Sample Output:</text>
                  <text x="30" y="175" fill="#34d399" fontSize="11 font-mono">Sourav Mukherjee (STU-101): 94.5/100</text>
                  <text x="30" y="195" fill="#ecfdf5" fontSize="8 font-mono">User UI Display / Email Body</text>
                </g>

                {/* __repr__ Box */}
                <g transform="translate(460, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="20" y="30" fill="#a5f3fc" fontSize="12" fontWeight="bold">__repr__(self) - For Developers</text>
                  <text x="20" y="60" fill="#cbd5e1" fontSize="10">• Triggered by REPL, logs, debuggers</text>
                  <text x="20" y="85" fill="#cbd5e1" fontSize="10">• Unambiguous, explicit, eval-ready</text>

                  <rect x="20" y="125" width="340" height="90" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="30" y="150" fill="#38bdf8" fontSize="10 font-bold">Sample Output:</text>
                  <text x="30" y="175" fill="#38bdf8" fontSize="9 font-mono">StudentScoreRecord('STU-101', 'Sourav', 94.5)</text>
                  <text x="30" y="195" fill="#ecfdf5" fontSize="8 font-mono">Log Tracebacks / IDE Tooltips</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "container" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">CUSTOM CONTAINER SEQUENCE DUNDER PROTOCOLS</text>

                {/* 4 Protocol Blocks */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="190" height="240" rx="6" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="15" y="30" fill="#c4b5fd" fontSize="11 font-bold">1. len(obj)</text>
                  <text x="15" y="60" fill="#ecfdf5" fontSize="9 font-mono">def __len__(self):</text>
                  <text x="25" y="80" fill="#34d399" fontSize="9 font-mono">return len(data)</text>
                  <text x="15" y="120" fill="#cbd5e1" fontSize="9">• Must return</text>
                  <text x="15" y="140" fill="#cbd5e1" fontSize="9">integer &gt;= 0</text>

                  <rect x="210" y="0" width="190" height="240" rx="6" fill="#083344" stroke="#06b6d4" />
                  <text x="225" y="30" fill="#a5f3fc" fontSize="11 font-bold">2. obj[i] / Slicing</text>
                  <text x="225" y="60" fill="#ecfdf5" fontSize="9 font-mono">def __getitem__(s, i):</text>
                  <text x="235" y="80" fill="#34d399" fontSize="9 font-mono">return data[i]</text>
                  <text x="225" y="120" fill="#cbd5e1" fontSize="9">• Supports integer</text>
                  <text x="225" y="140" fill="#cbd5e1" fontSize="9">and slice [1:3]</text>

                  <rect x="420" y="0" width="190" height="240" rx="6" fill="#134e4a" stroke="#14b8a6" />
                  <text x="435" y="30" fill="#99f6e4" fontSize="11 font-bold">3. item in obj</text>
                  <text x="435" y="60" fill="#ecfdf5" fontSize="9 font-mono">def __contains__(s, q):</text>
                  <text x="445" y="80" fill="#34d399" fontSize="9 font-mono">return q in data</text>
                  <text x="435" y="120" fill="#cbd5e1" fontSize="9">• Membership</text>
                  <text x="435" y="140" fill="#cbd5e1" fontSize="9">testing logic</text>

                  <rect x="630" y="0" width="190" height="240" rx="6" fill="#064e3b" stroke="#10b981" />
                  <text x="645" y="30" fill="#a7f3d0" fontSize="11 font-bold">4. for x in obj</text>
                  <text x="645" y="60" fill="#ecfdf5" fontSize="9 font-mono">def __iter__(self):</text>
                  <text x="655" y="80" fill="#34d399" fontSize="9 font-mono">return iter(data)</text>
                  <text x="645" y="120" fill="#cbd5e1" fontSize="9">• Native Python</text>
                  <text x="645" y="140" fill="#cbd5e1" fontSize="9">looping support</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">CALLABLE OBJECTS &amp; FUNCTORS: __call__(self, ...)</text>

                {/* Left: Definition */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="12" fontWeight="bold">Class Definition with __call__</text>
                  <text x="20" y="65" fill="#ecfdf5" fontSize="10 font-mono">class DiscountCouponFunctor:</text>
                  <text x="40" y="90" fill="#ecfdf5" fontSize="10 font-mono">def __init__(self, rate): self.rate = rate</text>
                  <text x="40" y="115" fill="#34d399" fontSize="10 font-mono font-bold">def __call__(self, price):</text>
                  <text x="60" y="140" fill="#34d399" fontSize="10 font-mono">return price * (1 - self.rate)</text>
                  
                  <rect x="20" y="165" width="340" height="50" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="30" y="195" fill="#c4b5fd" fontSize="9 font-mono">coupon = DiscountCouponFunctor(0.10)</text>
                </g>

                {/* Right: Execution */}
                <g transform="translate(460, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">Direct Invocation (Like a Function!)</text>
                  
                  <rect x="20" y="60" width="340" height="70" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="85" fill="#34d399" fontSize="10 font-bold">Calling `coupon(20000.0)`:</text>
                  <text x="30" y="110" fill="#ecfdf5" fontSize="10 font-mono">→ Returns INR 18,000.00</text>

                  <text x="20" y="160" fill="#cbd5e1" fontSize="10">• Retains internal state (usage counter)</text>
                  <text x="20" y="185" fill="#cbd5e1" fontSize="10">• Used in AI neural networks &amp; middleware</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE SMART BATCH LEDGER PLAYGROUND */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Smart Batch Ledger (Live Dunder Suite)
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Click dunder operations to witness how magic methods translate native Python syntax into custom container behavior:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Action Choosers */}
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-teal-400 block font-bold">
                Select Dunder Operation to Execute
              </span>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setActiveDunderOp("len")}
                  className={clsx(
                    "p-3 rounded-lg text-left text-xs font-mono transition-all border",
                    activeDunderOp === "len"
                      ? "bg-teal-950/80 border-teal-500 text-teal-200"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  )}
                >
                  <div className="font-bold text-teal-300">1. len(batch_a) (__len__)</div>
                  <div className="text-[11px] text-slate-400">Queries student enrollment count</div>
                </button>

                <button
                  onClick={() => setActiveDunderOp("getitem")}
                  className={clsx(
                    "p-3 rounded-lg text-left text-xs font-mono transition-all border",
                    activeDunderOp === "getitem"
                      ? "bg-cyan-950/80 border-cyan-500 text-cyan-200"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  )}
                >
                  <div className="font-bold text-cyan-300">2. batch_a[0] (__getitem__)</div>
                  <div className="text-[11px] text-slate-400">Direct square-bracket index lookup</div>
                </button>

                <button
                  onClick={() => setActiveDunderOp("contains")}
                  className={clsx(
                    "p-3 rounded-lg text-left text-xs font-mono transition-all border",
                    activeDunderOp === "contains"
                      ? "bg-purple-950/80 border-purple-500 text-purple-200"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  )}
                >
                  <div className="font-bold text-purple-300">3. 'Priyanka' in batch_a (__contains__)</div>
                  <div className="text-[11px] text-slate-400">Sub-string membership testing</div>
                </button>

                <button
                  onClick={() => setActiveDunderOp("add")}
                  className={clsx(
                    "p-3 rounded-lg text-left text-xs font-mono transition-all border",
                    activeDunderOp === "add"
                      ? "bg-emerald-950/80 border-emerald-500 text-emerald-200"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  )}
                >
                  <div className="font-bold text-emerald-300">4. batch_a + batch_b (__add__)</div>
                  <div className="text-[11px] text-slate-400">Merges two batches into a combined ledger</div>
                </button>

                <button
                  onClick={() => setActiveDunderOp("call")}
                  className={clsx(
                    "p-3 rounded-lg text-left text-xs font-mono transition-all border",
                    activeDunderOp === "call"
                      ? "bg-amber-950/80 border-amber-500 text-amber-200"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  )}
                >
                  <div className="font-bold text-amber-300">5. batch("Rahul") (__call__ Functor)</div>
                  <div className="text-[11px] text-slate-400">Instant lookup calling container as a function</div>
                </button>
              </div>
            </div>

            {/* Live Interactive Evaluation Output */}
            <div className="space-y-3 flex flex-col justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-bold">
                Live Dunder Execution Output
              </span>

              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3 text-xs font-mono flex-1">
                {activeDunderOp === "len" && (
                  <div>
                    <div className="text-slate-400">Executing: <code className="text-teal-300">len(batch_a)</code></div>
                    <div className="text-emerald-300 font-bold text-lg mt-2">→ 2 Students Enrolled</div>
                    <div className="text-[11px] text-slate-500 mt-1">Invoked: <code className="text-teal-400">batch_a.__len__()</code></div>
                  </div>
                )}

                {activeDunderOp === "getitem" && (
                  <div>
                    <div className="text-slate-400">Executing: <code className="text-cyan-300">batch_a[0]</code></div>
                    <div className="text-cyan-300 font-bold mt-2">
                      → [STU-01] Sourav Mukherjee (Paid: INR 18,000.00)
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">Invoked: <code className="text-cyan-400">batch_a.__getitem__(0)</code></div>
                  </div>
                )}

                {activeDunderOp === "contains" && (
                  <div>
                    <div className="text-slate-400">Executing: <code className="text-purple-300">'Priyanka' in batch_a</code></div>
                    <div className="text-purple-300 font-bold text-lg mt-2">→ True (Found STU-02)</div>
                    <div className="text-[11px] text-slate-500 mt-1">Invoked: <code className="text-purple-400">batch_a.__contains__('Priyanka')</code></div>
                  </div>
                )}

                {activeDunderOp === "add" && (
                  <div>
                    <div className="text-slate-400">Executing: <code className="text-emerald-300">mega_batch = batch_a + batch_b</code></div>
                    <div className="text-emerald-300 font-bold mt-2">
                      → Batch [PY-2026-A+PY-2026-B] (4 Total Students)
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      Students: Sourav, Priyanka, Rahul, Debolina
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">Invoked: <code className="text-emerald-400">batch_a.__add__(batch_b)</code></div>
                  </div>
                )}

                {activeDunderOp === "call" && (
                  <div>
                    <div className="text-slate-400">Executing: <code className="text-amber-300">mega_batch("{searchQuery}")</code></div>
                    <div className="text-amber-300 font-bold mt-2">
                      → [STU-03] Rahul Verma (Paid: INR 22,000.00)
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">Invoked: <code className="text-amber-400">mega_batch.__call__("{searchQuery}")</code></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER DUNDERS MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Magic / Dunder Methods Reference Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Category</th>
                  <th className="py-3.5 px-4 font-bold">Dunder Methods</th>
                  <th className="py-3.5 px-4 font-bold">Triggered By Syntax</th>
                  <th className="py-3.5 px-4 font-bold">Data Model Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">Representation</td>
                  <td className="py-3 px-4 font-mono text-slate-200">__str__, __repr__</td>
                  <td className="py-3 px-4 font-mono text-teal-300">print(x), repr(x)</td>
                  <td className="py-3 px-4">User display vs debugging string formatting</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">Sequence / Container</td>
                  <td className="py-3 px-4 font-mono text-slate-200">__len__, __getitem__, __contains__</td>
                  <td className="py-3 px-4 font-mono text-purple-300">len(x), x[0], k in x</td>
                  <td className="py-3 px-4">Length, indexing, slicing, and membership testing</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">Arithmetic Overloads</td>
                  <td className="py-3 px-4 font-mono text-slate-200">__add__, __radd__, __iadd__</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">a + b, 5 + b, a += b</td>
                  <td className="py-3 px-4">Custom math, vector arithmetic, and batch merging</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">Comparison &amp; Hashing</td>
                  <td className="py-3 px-4 font-mono text-slate-200">__eq__, __lt__, __hash__</td>
                  <td className="py-3 px-4 font-mono text-amber-300">a == b, a &lt; b, set([a])</td>
                  <td className="py-3 px-4">Sorting, equality, and hash table membership</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-emerald-300 font-semibold">Callable Functors</td>
                  <td className="py-3 px-4 font-mono text-slate-200">__call__</td>
                  <td className="py-3 px-4 font-mono text-emerald-300">obj(*args, **kwargs)</td>
                  <td className="py-3 px-4">Allows instances to be executed directly like functions</td>
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
            Explore 4 production-grade Python scripts demonstrating string representation, container indexing, arithmetic overloads, and batch ledgers:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "dunder_representation_and_equality.py",
                code: representationEquality,
                description: "String representations (__str__, __repr__), equality (__eq__), @total_ordering, and hashability.",
              },
              {
                filename: "dunder_containers_and_sequences.py",
                code: containerDunders,
                description: "Container sequence protocols (__len__, __getitem__, __setitem__, __delitem__, __contains__, __iter__).",
              },
              {
                filename: "dunder_arithmetic_and_callable.py",
                code: arithmeticCallable,
                description: "Arithmetic overloads (__add__, __radd__, __iadd__) and callable stateful functors (__call__).",
              },
              {
                filename: "smart_student_batch_ledger.py",
                code: smartLedger,
                description: "Production Academic Batch Ledger integrating __repr__, __str__, __len__, __getitem__, __add__, and __call__.",
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
                <span>❌</span> Trap 1: Non-Integer Return from `__len__`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Returning floats, booleans, or negative numbers from <code className="text-rose-300 font-mono">__len__</code> crashes Python with <code className="text-rose-300 font-mono">TypeError: '__len__' must return &gt;= 0 integer</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Always return <code className="text-emerald-300">int &gt;= 0</code>.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Inventing Custom Dunder Names
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Creating names like <code className="text-amber-300 font-mono">def __my_custom_dunder__()</code> risks collisions with future Python releases that reserve all double underscores.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Use standard alphanumeric names for custom methods.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Monkey-Patching Dunders on Instances
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-purple-300 font-mono">obj.__len__ = lambda: 5</code> is ignored by <code className="text-purple-300 font-mono">len(obj)</code> because CPython resolves dunders on the Class type!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Define dunders on class bodies, not instances.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Mutating Objects Stored in Sets/Dicts
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Mutating attributes that determine <code className="text-cyan-300 font-mono">__hash__</code> corrupts hash buckets, making the object unfindable in sets or dictionaries.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Only hash immutable attributes (tuples, ids, strings).
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
            Comprehensive question-and-answer repository covering Magic / Dunder methods, representation protocols, container sequences, and functors:
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
            Download or print the complete reference sheet with Dunder method tables, container blueprints, and functor patterns:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic12_magic_and_dunder_methods_notes.txt"
              title="Print Topic 12 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
