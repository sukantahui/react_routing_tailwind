import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import pureFunctionsCode from "./topic6_files/pure_functions_and_referential_transparency.py?raw";
import immutableDataCode from "./topic6_files/immutable_data_structures_and_frozen_dataclasses.py?raw";
import stateTransitionsCode from "./topic6_files/side_effect_free_state_transitions.py?raw";
import ledgerEngineCode from "./topic6_files/institutional_immutable_student_ledger_engine.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic6_files/topic6_note.txt?raw";

// FAQ Questions
import questions from "./topic6_files/topic6_questions";

/**
 * Topic6: Pure functions & immutable programming principles in Python
 * Module: 003_005_advance-comprehensions
 * Segment: 3 (Advanced Python Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic6() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("pureAnatomy");

  // Interactive Laboratory State
  const initialStudent = {
    version: 0,
    student_id: "STU-101",
    name: "Sourav Mukherjee",
    course: "Python Full-Stack & AI",
    tuition_fee: 35000.0,
    fee_paid: 0.0,
    status: "REGISTERED",
    badges: ["PYTHON_CORE", "DECORATORS"],
    hash: "a4f81c9d2b0e",
  };

  const [stateHistory, setStateHistory] = useState([initialStudent]);
  const [currentVersionIndex, setCurrentVersionIndex] = useState(0);
  const [mutationError, setMutationError] = useState(null);

  const currentRecord = stateHistory[currentVersionIndex];

  const handleApplyScholarship = () => {
    setMutationError(null);
    const latest = stateHistory[stateHistory.length - 1];
    const discount = latest.tuition_fee * 0.15;
    const newRecord = {
      ...latest,
      version: latest.version + 1,
      tuition_fee: latest.tuition_fee - discount,
      hash: Math.random().toString(16).substring(2, 14),
    };
    setStateHistory((prev) => [...prev, newRecord]);
    setCurrentVersionIndex(stateHistory.length);
  };

  const handleRecordPayment = () => {
    setMutationError(null);
    const latest = stateHistory[stateHistory.length - 1];
    const newPaid = latest.tuition_fee;
    const newRecord = {
      ...latest,
      version: latest.version + 1,
      fee_paid: newPaid,
      status: "PAID_CLEARED",
      hash: Math.random().toString(16).substring(2, 14),
    };
    setStateHistory((prev) => [...prev, newRecord]);
    setCurrentVersionIndex(stateHistory.length);
  };

  const handleAwardBadge = () => {
    setMutationError(null);
    const latest = stateHistory[stateHistory.length - 1];
    const newRecord = {
      ...latest,
      version: latest.version + 1,
      badges: [...latest.badges, "ADVANCED_COMPREHENSIONS"],
      hash: Math.random().toString(16).substring(2, 14),
    };
    setStateHistory((prev) => [...prev, newRecord]);
    setCurrentVersionIndex(stateHistory.length);
  };

  const handleIllegalMutation = () => {
    setMutationError("FrozenInstanceError: cannot assign to field 'tuition_fee' on immutable @dataclass(frozen=True) instance!");
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
            Segment 3 • Module 003_005
          </span>
          <span className="text-xs sm:text-sm font-mono bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/80 shadow-sm shadow-cyan-950/50">
            Topic 6
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Advanced Comprehensions &amp; Functional Python
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Pure Functions &amp; <span className="text-teal-400">Immutable Programming</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master mathematical purity and immutability in Python: deterministic execution without side-effects, referential transparency, frozen domain models with <code className="text-teal-300 font-mono">@dataclass(frozen=True)</code>, read-only dictionary views (<code className="text-cyan-300 font-mono">MappingProxyType</code>), and pure functional state reducers.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            💎 Pure Functions (Zero Side-Effects)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🧊 `@dataclass(frozen=True)`
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ Read-Only `MappingProxyType`
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🕰️ Time-Travel State Reducers
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: THE PILLARS OF PURITY */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">💎</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Principles of Functional Purity &amp; Immutability
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Writing pure functions and modeling immutable state eliminates race conditions, simplifies unit testing, and unlocks referential transparency:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ Deterministic Output</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">f(x) == f(x) Always</code>
                <p className="text-[11px] text-slate-300">
                  Given the same input arguments, the function always returns the exact same result.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ Zero Side-Effects</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">No In-Place Mutation</code>
                <p className="text-[11px] text-slate-300">
                  Never modifies incoming arguments, global variables, or external system I/O.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ Referential Transparency</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">Value Equivalence</code>
                <p className="text-[11px] text-slate-300">
                  The function call can be safely replaced by its return value without altering program behavior.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The In-Place Argument Mutation Hazard
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                Modifying a caller's dictionary via <code className="text-rose-400 font-mono">dict["key"] = val</code> is a catastrophic side-effect that destroys original data and creates concurrency race conditions. Always use copy-on-write unpacking <code className="text-teal-300 font-mono">&#123;**dict, "key": val&#125;</code> or <code className="text-teal-300 font-mono">dataclasses.replace()</code>!
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
                2. Visualizing Pure Functions, Copy-on-Write &amp; State Trees
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("pureAnatomy")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "pureAnatomy"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Pure Function Anatomy
              </button>
              <button
                onClick={() => setActiveInteractiveTab("copyOnWrite")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "copyOnWrite"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Copy-on-Write
              </button>
              <button
                onClick={() => setActiveInteractiveTab("auditChain")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "auditChain"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Immutable Audit Chain
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining side-effect boundaries, copy-on-write memory branches, and verifiable time-travel audit chains:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "pureAnatomy" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">ANATOMY OF A PURE FUNCTION VS IMPURE FUNCTION</text>

                {/* Left: Pure Function */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">Pure Function: `pure_apply_discount(record, 5k)`</text>
                  
                  <text x="20" y="65" fill="#34d399" fontSize="8 font-mono">1. Takes Immutable Input: `record`</text>
                  <text x="20" y="85" fill="#34d399" fontSize="8 font-mono">2. Operates in Isolated Scope (Zero Side-Effects)</text>
                  <text x="20" y="105" fill="#34d399" fontSize="8 font-mono">3. Returns Brand New Object: `&#123;**record, fee: 25k&#125;`</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="155" fill="#34d399" fontSize="9 font-bold">100% Referential Transparency:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">Input object is completely untouched. Safe for parallel threads.</text>
                </g>

                {/* Right: Impure Function */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="12" fontWeight="bold">Impure Function: `impure_discount(record, 5k)` [HAZARD]</text>

                  <text x="20" y="65" fill="#fca5a5" fontSize="8 font-mono">1. Mutates `record['fee'] -= 5000` In-Place!</text>
                  <text x="20" y="85" fill="#fca5a5" fontSize="8 font-mono">2. Mutates global audit counter: `global counter += 1`</text>
                  <text x="20" y="105" fill="#f43f5e" fontSize="8 font-mono font-bold">3. Destroys Caller's Original State!</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#090d16" stroke="#e11d48" />
                  <text x="30" y="155" fill="#fda4af" fontSize="9 font-bold">Side-Effect Hazard:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">Causes race conditions and bugs in multi-threaded code.</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "copyOnWrite" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">COPY-ON-WRITE PERSISTENCE WITH `@dataclass(frozen=True)`</text>

                {/* 3 Step Pipeline */}
                <g transform="translate(30, 50)">
                  {/* Instance V0 */}
                  <rect x="0" y="0" width="250" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="15" y="30" fill="#99f6e4" fontSize="11 font-bold">1. Frozen Instance V0</text>
                  <text x="15" y="55" fill="#38bdf8" fontSize="8 font-mono">Student(id="STU-101")</text>
                  <text x="15" y="75" fill="#38bdf8" fontSize="8 font-mono">tuition_fee = 35000.0</text>
                  <text x="15" y="95" fill="#34d399" fontSize="8 font-mono">IMMUTABLE IN RAM</text>

                  <rect x="15" y="115" width="220" height="100" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="25" y="140" fill="#34d399" fontSize="9 font-bold">Guaranteed Safety:</text>
                  <text x="25" y="160" fill="#cbd5e1" fontSize="8">Any direct attribute</text>
                  <text x="25" y="175" fill="#cbd5e1" fontSize="8">assignment raises error.</text>

                  {/* Arrow 1 */}
                  <text x="265" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Copy on Write */}
                  <rect x="295" y="0" width="250" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="310" y="30" fill="#c4b5fd" fontSize="11 font-bold">2. `dataclasses.replace()`</text>
                  <text x="310" y="55" fill="#c084fc" fontSize="8 font-mono">replace(v0, fee=30000.0)</text>
                  <text x="310" y="75" fill="#ecfdf5" fontSize="8 font-mono">Clones fields with updates</text>
                  <text x="310" y="95" fill="#34d399" fontSize="8 font-mono">Zero mutation on V0</text>

                  <rect x="310" y="115" width="220" height="100" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="320" y="140" fill="#c4b5fd" fontSize="9 font-bold">Pure Transition:</text>
                  <text x="320" y="160" fill="#cbd5e1" fontSize="8">Produces new instance</text>
                  <text x="320" y="175" fill="#cbd5e1" fontSize="8">leaving V0 untouched.</text>

                  {/* Arrow 2 */}
                  <text x="560" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Instance V1 */}
                  <rect x="590" y="0" width="230" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="605" y="30" fill="#a5f3fc" fontSize="11 font-bold">3. Frozen Instance V1</text>
                  <text x="605" y="55" fill="#38bdf8" fontSize="8 font-mono">Student(id="STU-101")</text>
                  <text x="605" y="75" fill="#34d399" fontSize="9 font-mono font-bold">tuition_fee = 30000.0</text>
                  <text x="605" y="95" fill="#ecfdf5" fontSize="8 font-mono">V0 and V1 Coexist!</text>

                  <rect x="605" y="115" width="200" height="100" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="615" y="140" fill="#38bdf8" fontSize="9 font-bold">Time-Travel Ready:</text>
                  <text x="615" y="160" fill="#cbd5e1" fontSize="8">Both versions exist in RAM</text>
                  <text x="615" y="175" fill="#cbd5e1" fontSize="8">for complete auditability.</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">IMMUTABLE STATE MACHINE AUDIT CHAIN (`(state, action) -&gt; new_state`)</text>

                {/* 3 Step Audit Chain */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="12" fontWeight="bold">Verifiable Cryptographic Audit Progression</text>

                  <g transform="translate(20, 55)">
                    {/* Snap 0 */}
                    <rect x="0" y="0" width="240" height="150" rx="6" fill="#090d16" stroke="#6d28d9" />
                    <text x="10" y="25" fill="#a78bfa" fontSize="10 font-bold">Snapshot V0 [Enrolled]</text>
                    <text x="10" y="55" fill="#cbd5e1" fontSize="8 font-mono">Fee: INR 35,000.00</text>
                    <text x="10" y="75" fill="#cbd5e1" fontSize="8 font-mono">Paid: INR 0.00</text>
                    <text x="10" y="95" fill="#38bdf8" fontSize="8 font-mono">Hash: #a4f81c9d2b0e</text>

                    {/* Arrow 1 */}
                    <text x="250" y="80" fill="#38bdf8" fontSize="18" fontWeight="bold">→</text>

                    {/* Snap 1 */}
                    <rect x="280" y="0" width="240" height="150" rx="6" fill="#090d16" stroke="#6d28d9" />
                    <text x="290" y="25" fill="#38bdf8" fontSize="10 font-bold">Snapshot V1 [Scholarship]</text>
                    <text x="290" y="55" fill="#cbd5e1" fontSize="8 font-mono">Fee: INR 29,750.00 (-15%)</text>
                    <text x="290" y="75" fill="#cbd5e1" fontSize="8 font-mono">Paid: INR 0.00</text>
                    <text x="290" y="95" fill="#38bdf8" fontSize="8 font-mono">Hash: #7e2d9a3b8c4f</text>

                    {/* Arrow 2 */}
                    <text x="530" y="80" fill="#38bdf8" fontSize="18" fontWeight="bold">→</text>

                    {/* Snap 2 */}
                    <rect x="560" y="0" width="240" height="150" rx="6" fill="#064e3b" stroke="#10b981" />
                    <text x="570" y="25" fill="#34d399" fontSize="10 font-bold">Snapshot V2 [Paid Cleared]</text>
                    <text x="570" y="55" fill="#cbd5e1" fontSize="8 font-mono">Fee: INR 29,750.00</text>
                    <text x="570" y="75" fill="#34d399" fontSize="8 font-mono font-bold">Paid: INR 29,750.00</text>
                    <text x="570" y="95" fill="#34d399" fontSize="8 font-mono">Hash: #3b9f4e8d1a6c</text>
                  </g>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE IMMUTABLE STATE LABORATORY */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Pure Function &amp; Immutable State Laboratory
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Dispatch pure state transition actions, attempt illegal in-place mutations, and inspect time-travel historical audit snapshots:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Controls & Action Dispatcher */}
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold block">
                1. Pure Action Dispatcher (Copy-on-Write):
              </span>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleApplyScholarship}
                  className="py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-mono text-xs font-bold rounded-lg transition-all"
                >
                  ➕ Apply 15% Scholarship
                </button>
                <button
                  onClick={handleRecordPayment}
                  className="py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold rounded-lg transition-all"
                >
                  💳 Pay Tuition in Full
                </button>
                <button
                  onClick={handleAwardBadge}
                  className="py-2.5 bg-purple-700 hover:bg-purple-600 text-white font-mono text-xs font-bold rounded-lg transition-all"
                >
                  🏅 Award Badge
                </button>
                <button
                  onClick={handleIllegalMutation}
                  className="py-2.5 bg-rose-700 hover:bg-rose-600 text-white font-mono text-xs font-bold rounded-lg transition-all"
                >
                  🚫 Illegal Direct Mutation
                </button>
              </div>

              {/* Time-Travel Version Selector */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800">
                <span className="text-xs font-mono text-slate-300 block">
                  Time-Travel Inspector: View Historical Snapshot:
                </span>
                <div className="flex flex-wrap gap-1.5 bg-slate-900 p-1.5 rounded-lg border border-slate-800 text-xs font-mono">
                  {stateHistory.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setMutationError(null);
                        setCurrentVersionIndex(idx);
                      }}
                      className={clsx(
                        "px-3 py-1 rounded transition-all",
                        currentVersionIndex === idx
                          ? "bg-teal-900/60 text-teal-300 font-bold border border-teal-700/80"
                          : "text-slate-400 hover:text-white"
                      )}
                    >
                      Snapshot V{s.version}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mutation Error Banner */}
              {mutationError && (
                <div className="p-3 bg-rose-950/40 border border-rose-700/80 rounded-lg text-xs font-mono text-rose-300 space-y-1">
                  <div className="font-bold uppercase text-[10px]">Purity Invariant Protected:</div>
                  <div className="text-[11px] leading-relaxed">{mutationError}</div>
                </div>
              )}
            </div>

            {/* State Inspector Display */}
            <div className="space-y-4 flex flex-col justify-between">
              {/* Snapshot Metadata Banner */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase text-slate-400">
                  <span>Current Snapshot: Version {currentRecord.version}</span>
                  <span className="text-teal-300">Hash: #{currentRecord.hash}</span>
                </div>
                <div className="text-[11px] text-slate-300 pt-1">
                  Historical snapshots stored in memory: {stateHistory.length} versions.
                </div>
              </div>

              {/* State JSON Inspector */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex-1 overflow-y-auto max-h-[170px] font-mono text-xs space-y-1">
                <pre className="text-slate-200 text-[11px] leading-relaxed">
                  {JSON.stringify(currentRecord, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER IMMUTABILITY MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Immutability &amp; Purity Reference Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Immutability Primitive</th>
                  <th className="py-3.5 px-4 font-bold">Mutation Prevention Mechanism</th>
                  <th className="py-3.5 px-4 font-bold">Update Pattern</th>
                  <th className="py-3.5 px-4 font-bold">Primary Benefit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">`@dataclass(frozen=True)`</td>
                  <td className="py-3 px-4 text-slate-200">Raises `FrozenInstanceError`</td>
                  <td className="py-3 px-4 font-mono text-teal-300">`dataclasses.replace(obj, ...)`</td>
                  <td className="py-3 px-4 text-emerald-400">Strict domain model immutability</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">`MappingProxyType(dict)`</td>
                  <td className="py-3 px-4 text-slate-200">Raises `TypeError` on item assignment</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Read-only proxy view</td>
                  <td className="py-3 px-4 text-emerald-400">Safe dictionary encapsulation</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">`frozenset([items])`</td>
                  <td className="py-3 px-4 text-slate-200">Raises `AttributeError` (no `.add()`)</td>
                  <td className="py-3 px-4 font-mono text-purple-300">`frozenset.union()`</td>
                  <td className="py-3 px-4 text-emerald-400">Hashable set for dictionary keys</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">`Tuple[T, ...]`</td>
                  <td className="py-3 px-4 text-slate-200">Raises `TypeError` on index assignment</td>
                  <td className="py-3 px-4 font-mono text-amber-300">`(*t, new_item)`</td>
                  <td className="py-3 px-4 text-emerald-400">Immutable ordered sequence</td>
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
            Explore 4 production-grade Python scripts demonstrating pure functions, frozen dataclasses, Redux-style state machines, and institutional immutable academic ledgers:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "pure_functions_and_referential_transparency.py",
                code: pureFunctionsCode,
                description: "Pure functions, referential transparency, and side-effect avoidance.",
              },
              {
                filename: "immutable_data_structures_and_frozen_dataclasses.py",
                code: immutableDataCode,
                description: "Frozen dataclasses, MappingProxyType, and copy-on-write.",
              },
              {
                filename: "side_effect_free_state_transitions.py",
                code: stateTransitionsCode,
                description: "Pure reducer state transitions, Redux pattern, and time-travel snapshots.",
              },
              {
                filename: "institutional_immutable_student_ledger_engine.py",
                code: ledgerEngineCode,
                description: "Frozen dataclass domain models, copy-on-write, and cryptographic audit chains.",
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
                <span>❌</span> Trap 1: In-Place Argument Mutation
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Modifying an input list or dictionary inside a function mutates the caller's data unexpectedly, introducing hidden state bugs.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Always return a new copy using <code className="text-emerald-300">&#123;**input_dict, ...&#125;</code>.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Default Mutable Function Arguments
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-amber-300 font-mono">def add_student(name, roster=[])</code> shares the same list across all invocations!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use <code className="text-emerald-300">roster=None</code> and initialize inside: <code className="text-emerald-300">roster = roster or []</code>.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Mutable List Fields in Frozen Dataclasses
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                <code className="text-purple-300 font-mono">frozen=True</code> only prevents reassigning the list attribute; <code className="text-slate-300 font-mono">obj.badges.append()</code> will still mutate the inner list!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Always type collection fields as <code className="text-emerald-300">Tuple[str, ...]</code>.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Non-Deterministic Impure Functions
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Calling <code className="text-cyan-300 font-mono">time.time()</code> or <code className="text-cyan-300 font-mono">random.randint()</code> inside a function destroys referential transparency and memoization.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Pass timestamps and random seeds as explicit input arguments.
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
            Comprehensive question-and-answer repository covering pure functions, referential transparency, frozen dataclasses, and time-travel state machines:
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
            Download or print the complete reference sheet with pure function rules, frozen dataclass recipes, and state reducer patterns:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic6_pure_functions_and_immutability_notes.txt"
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
