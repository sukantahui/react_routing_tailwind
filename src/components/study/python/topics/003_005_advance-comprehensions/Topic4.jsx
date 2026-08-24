import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import mechanicsCode from "./topic4_files/any_and_all_short_circuit_mechanics.py?raw";
import generatorCompCode from "./topic4_files/combining_any_all_with_generator_expressions.py?raw";
import matrixPredicatesCode from "./topic4_files/matrix_and_nested_collection_predicates.py?raw";
import complianceValidatorCode from "./topic4_files/institutional_eligibility_and_compliance_validator.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic4_files/topic4_note.txt?raw";

// FAQ Questions
import questions from "./topic4_files/topic4_questions";

/**
 * Topic4: any() and all() predicates for quick boolean checks
 * Module: 003_005_advance-comprehensions
 * Segment: 3 (Advanced Python Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic4() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("shortCircuit");

  // Interactive Laboratory State
  const [score1, setScore1] = useState(92);
  const [score2, setScore2] = useState(88);
  const [score3, setScore3] = useState(76);
  const [score4, setScore4] = useState(94);
  const [hasAadhaar, setHasAadhaar] = useState(true);
  const [has10th, setHas10th] = useState(true);
  const [has12th, setHas12th] = useState(true);
  const [hasPhoto, setHasPhoto] = useState(true);
  const [feeDeposit, setFeeDeposit] = useState(25000);
  const [hasDisciplinary, setHasDisciplinary] = useState(false);

  // Evaluation Rules
  const scores = [score1, score2, score3, score4];
  const allScoresPass = scores.every((s) => s >= 60);
  const allDocsSubmitted = hasAadhaar && has10th && has12th && hasPhoto;
  const feePasses = feeDeposit >= 15000;
  const disciplinaryPasses = !hasDisciplinary;

  // Short-circuit trace
  let failedRule = null;
  if (!allScoresPass) {
    failedRule = "Academic Rule: Score below 60% minimum cutoff";
  } else if (!allDocsSubmitted) {
    failedRule = "Documentation Rule: Mandatory KYC documents missing";
  } else if (!feePasses) {
    failedRule = "Financial Rule: Fee deposit below INR 15,000 threshold";
  } else if (!disciplinaryPasses) {
    failedRule = "Disciplinary Rule: Flagged for previous institutional action";
  }

  const isEligible = !failedRule;

  const generatedPythonCode = `# Declarative validation with all() and any():
is_academic_valid = all(score >= 60 for score in [${scores.join(", ")}])
is_docs_valid = all([${hasAadhaar}, ${has10th}, ${has12th}, ${hasPhoto}])
is_fee_valid = ${feeDeposit} >= 15000
has_no_disciplinary = not ${hasDisciplinary}

# Final evaluation short-circuits on first False:
is_admitted = all([
    is_academic_valid,
    is_docs_valid,
    is_fee_valid,
    has_no_disciplinary
])`;

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
            Topic 4
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Advanced Comprehensions &amp; Functional Python
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Boolean Predicates: <span className="text-teal-400">any() and all()</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master Python's built-in boolean aggregators: short-circuit evaluation mechanics, vacuous truth on empty sequences (<code className="text-teal-300 font-mono">all([]) == True</code>), combining predicates with generator expressions for <code className="text-teal-300 font-mono">O(1)</code> memory efficiency, multi-dimensional matrix validation, and institutional eligibility rules.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ Short-Circuit Halting
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📭 `all([])` Vacuous Truth
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🚀 `O(1)` Generator Streams
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ Schema Completeness
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: PREDICATE MECHANICS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚖️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. Short-Circuit Evaluation &amp; Vacuous Truth
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              <code className="text-teal-300 font-mono">any()</code> and <code className="text-cyan-300 font-mono">all()</code> allow declarative multi-condition validation across collections with zero boilerplate loop flags:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 not-prose">
              {/* any() card */}
              <div className="p-5 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg space-y-2">
                <div className="text-teal-400 font-bold text-sm flex items-center gap-2">
                  <span>⚡</span> `any(iterable)` (Logical OR)
                </div>
                <p className="text-xs text-slate-300">
                  Returns <code className="text-teal-300 font-mono">True</code> as soon as the first truthy item is encountered. Stops evaluating further items immediately.
                </p>
                <code className="text-xs font-mono text-teal-300 block">any([]) == False</code>
              </div>

              {/* all() card */}
              <div className="p-5 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg space-y-2">
                <div className="text-cyan-400 font-bold text-sm flex items-center gap-2">
                  <span>🛡️</span> `all(iterable)` (Logical AND)
                </div>
                <p className="text-xs text-slate-300">
                  Returns <code className="text-rose-400 font-mono">False</code> as soon as the first falsy item is encountered. Returns <code className="text-emerald-400 font-mono">True</code> if all pass.
                </p>
                <code className="text-xs font-mono text-cyan-300 block">all([]) == True (Vacuous Truth)</code>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Vacuous Truth &amp; Empty List Guard
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                Because there are no <code className="text-rose-400">False</code> items in an empty sequence, <code className="text-cyan-300">all([])</code> evaluates to <code className="text-emerald-400">True</code>. In admission or security validators, always guard with <code className="text-teal-300">if scores and all(s &gt;= 60 for s in scores): ...</code> to prevent empty candidates from passing!
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
                2. Visualizing Short-Circuiting, Vacuous Truth &amp; Memory
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("shortCircuit")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "shortCircuit"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Short-Circuit Halting
              </button>
              <button
                onClick={() => setActiveInteractiveTab("vacuousTruth")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "vacuousTruth"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Vacuous Truth `all([])`
              </button>
              <button
                onClick={() => setActiveInteractiveTab("memoryImpact")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "memoryImpact"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Generator vs List Memory
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining short-circuit exit waveforms, empty set truth tables, and generator streaming memory:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "shortCircuit" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">SHORT-CIRCUIT HALTING MECHANICS (`any()` VS `all()`)</text>

                {/* Left: any() */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="30" fill="#99f6e4" fontSize="12" fontWeight="bold">`any(x &gt;= 90 for x in [70, 95, 88, 99])`</text>
                  
                  <text x="20" y="65" fill="#fca5a5" fontSize="8 font-mono">1. Item 0: 70 &gt;= 90 -&gt; False (Continue)</text>
                  <text x="20" y="85" fill="#34d399" fontSize="8 font-mono font-bold">2. Item 1: 95 &gt;= 90 -&gt; True (HALT &amp; RETURN True!)</text>
                  <text x="20" y="105" fill="#64748b" fontSize="8 font-mono">3. Item 2: 88 (SKIPPED)</text>
                  <text x="20" y="125" fill="#64748b" fontSize="8 font-mono">4. Item 3: 99 (SKIPPED)</text>

                  <rect x="20" y="150" width="340" height="70" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="175" fill="#34d399" fontSize="9 font-bold">Instant Early Exit:</text>
                  <text x="30" y="195" fill="#cbd5e1" fontSize="8">Evaluates only 2 elements, saving 50% CPU cycles.</text>
                </g>

                {/* Right: all() */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="12" fontWeight="bold">`all(s &gt;= 60 for s in [85, 42, 90, 78])`</text>

                  <text x="20" y="65" fill="#34d399" fontSize="8 font-mono">1. Item 0: 85 &gt;= 60 -&gt; True (Continue)</text>
                  <text x="20" y="85" fill="#f43f5e" fontSize="8 font-mono font-bold">2. Item 1: 42 &gt;= 60 -&gt; False (HALT &amp; RETURN False!)</text>
                  <text x="20" y="105" fill="#64748b" fontSize="8 font-mono">3. Item 2: 90 (SKIPPED)</text>
                  <text x="20" y="125" fill="#64748b" fontSize="8 font-mono">4. Item 3: 78 (SKIPPED)</text>

                  <rect x="20" y="150" width="340" height="70" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="30" y="175" fill="#c4b5fd" fontSize="9 font-bold">Defensive Rejection:</text>
                  <text x="30" y="195" fill="#cbd5e1" fontSize="8">Stops checking as soon as first violation is detected.</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "vacuousTruth" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">VACUOUS TRUTH ON EMPTY COLLECTIONS</text>

                {/* Left: all([]) */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">`all([]) == True` (Vacuous Truth)</text>
                  
                  <text x="20" y="65" fill="#34d399" fontSize="8 font-mono">Mathematical Logic Invariant:</text>
                  <text x="20" y="85" fill="#ecfdf5" fontSize="8 font-mono">∀x ∈ ∅, P(x) is trivially True.</text>
                  <text x="20" y="105" fill="#ecfdf5" fontSize="8 font-mono">No element exists in [] to disprove condition.</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="155" fill="#34d399" fontSize="9 font-bold">Required Production Guard:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">`if sequence and all(cond for x in sequence):`</text>
                </g>

                {/* Right: any([]) */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="12" fontWeight="bold">`any([]) == False` (Existence Check)</text>

                  <text x="20" y="65" fill="#fca5a5" fontSize="8 font-mono">Mathematical Logic Invariant:</text>
                  <text x="20" y="85" fill="#ecfdf5" fontSize="8 font-mono">∃x ∈ ∅ such that P(x) is False.</text>
                  <text x="20" y="105" fill="#ecfdf5" fontSize="8 font-mono">No element exists in [] to satisfy condition.</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#090d16" stroke="#e11d48" />
                  <text x="30" y="155" fill="#fda4af" fontSize="9 font-bold">Standard Safety:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">`any([])` safely returns False without extra checks.</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">MEMORY HAZARD: GENERATOR EXPRESSION VS LIST COMPREHENSION</text>

                {/* Left: Eager List */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="12" fontWeight="bold">`any([x == 0 for x in range(1M)])` [DANGEROUS]</text>
                  
                  <text x="20" y="65" fill="#fca5a5" fontSize="8 font-mono">1. Evaluates all 1,000,000 items into RAM</text>
                  <text x="20" y="85" fill="#fca5a5" fontSize="8 font-mono">2. Allocates ~8.5 MB boolean list</text>
                  <text x="20" y="105" fill="#f43f5e" fontSize="8 font-mono font-bold">3. Zero Short-Circuiting Benefits!</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#090d16" stroke="#e11d48" />
                  <text x="30" y="155" fill="#fda4af" fontSize="9 font-bold">Anti-Pattern Hazard:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">Square brackets force full allocation before calling any().</text>
                </g>

                {/* Right: Lazy Generator */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">`any(x == 0 for x in range(1M))` [OPTIMAL]</text>

                  <text x="20" y="65" fill="#34d399" fontSize="8 font-mono">1. Streams items lazily on demand</text>
                  <text x="20" y="85" fill="#34d399" fontSize="8 font-mono font-bold">2. Halts after testing 1st element (0 == 0)</text>
                  <text x="20" y="105" fill="#34d399" fontSize="8 font-mono">3. Constant 104 Bytes O(1) Memory!</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="155" fill="#34d399" fontSize="9 font-bold">Pure Short-Circuit:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">Parentheses stream lazily with instant early return.</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE VALIDATOR LABORATORY */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Admission Eligibility &amp; Short-Circuit Inspector
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Adjust candidate marks, toggle mandatory KYC documentation, adjust fee deposits, and observe live short-circuit evaluation in Python:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Candidate Controls */}
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold block">
                1. Candidate Subject Marks (Min 60% Cutoff):
              </span>

              {/* Sliders for Marks */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div>
                  <div className="flex justify-between">
                    <span>Python AI:</span>
                    <span className={clsx(score1 >= 60 ? "text-teal-300" : "text-rose-400 font-bold")}>{score1}%</span>
                  </div>
                  <input
                    type="range"
                    min={40}
                    max={100}
                    value={score1}
                    onChange={(e) => setScore1(Number(e.target.value))}
                    className="w-full accent-teal-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between">
                    <span>Mathematics:</span>
                    <span className={clsx(score2 >= 60 ? "text-teal-300" : "text-rose-400 font-bold")}>{score2}%</span>
                  </div>
                  <input
                    type="range"
                    min={40}
                    max={100}
                    value={score2}
                    onChange={(e) => setScore2(Number(e.target.value))}
                    className="w-full accent-teal-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between">
                    <span>Data Structures:</span>
                    <span className={clsx(score3 >= 60 ? "text-teal-300" : "text-rose-400 font-bold")}>{score3}%</span>
                  </div>
                  <input
                    type="range"
                    min={40}
                    max={100}
                    value={score3}
                    onChange={(e) => setScore3(Number(e.target.value))}
                    className="w-full accent-teal-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between">
                    <span>Algorithms:</span>
                    <span className={clsx(score4 >= 60 ? "text-teal-300" : "text-rose-400 font-bold")}>{score4}%</span>
                  </div>
                  <input
                    type="range"
                    min={40}
                    max={100}
                    value={score4}
                    onChange={(e) => setScore4(Number(e.target.value))}
                    className="w-full accent-teal-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* Mandatory Documentation Checks */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800">
                <span className="text-xs font-mono text-cyan-400 font-bold block">
                  2. Mandatory Documentation (`all()` check):
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" checked={hasAadhaar} onChange={(e) => setHasAadhaar(e.target.checked)} className="accent-teal-500 rounded" />
                    <span>Aadhaar Card</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" checked={has10th} onChange={(e) => setHas10th(e.target.checked)} className="accent-teal-500 rounded" />
                    <span>10th Marksheet</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" checked={has12th} onChange={(e) => setHas12th(e.target.checked)} className="accent-teal-500 rounded" />
                    <span>12th Marksheet</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" checked={hasPhoto} onChange={(e) => setHasPhoto(e.target.checked)} className="accent-teal-500 rounded" />
                    <span>Passport Photo</span>
                  </label>
                </div>
              </div>

              {/* Fee & Disciplinary */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800 text-xs font-mono">
                <div>
                  <div className="flex justify-between">
                    <span>Fee Deposit:</span>
                    <span className={clsx(feeDeposit >= 15000 ? "text-teal-300" : "text-rose-400 font-bold")}>INR {feeDeposit.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min={5000}
                    max={35000}
                    step={1000}
                    value={feeDeposit}
                    onChange={(e) => setFeeDeposit(Number(e.target.value))}
                    className="w-full accent-teal-500 cursor-pointer"
                  />
                </div>

                <div className="flex items-center">
                  <label className="flex items-center gap-1.5 cursor-pointer text-rose-300">
                    <input type="checkbox" checked={hasDisciplinary} onChange={(e) => setHasDisciplinary(e.target.checked)} className="accent-rose-500 rounded" />
                    <span>Flagged for Disciplinary Action</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Live Evaluation & Python Code Display */}
            <div className="space-y-4 flex flex-col justify-between">
              {/* Python Code Display */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
                <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  Generated Python Predicate Code:
                </div>
                <pre className="text-teal-300 text-[11px] leading-relaxed break-all font-mono overflow-x-auto">
                  {generatedPythonCode}
                </pre>
              </div>

              {/* Status Outcome */}
              <div
                className={clsx(
                  "p-4 rounded-xl border font-mono text-xs space-y-2 transition-all",
                  isEligible
                    ? "bg-emerald-950/40 border-emerald-700/80 text-emerald-300"
                    : "bg-rose-950/40 border-rose-700/80 text-rose-300"
                )}
              >
                <div className="flex justify-between items-center text-sm font-bold">
                  <span>Candidate Admission Status:</span>
                  <span className={clsx(isEligible ? "text-emerald-400" : "text-rose-400")}>
                    {isEligible ? "[APPROVED FOR ADMISSION]" : "[REJECTED / QUARANTINED]"}
                  </span>
                </div>
                {!isEligible && (
                  <div className="text-[11px] text-rose-200">
                    <strong>Short-Circuit Trigger:</strong> {failedRule}
                  </div>
                )}
                {isEligible && (
                  <div className="text-[11px] text-emerald-200">
                    All 4 regulatory predicate guards passed! 100% compliant.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER PREDICATE MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Boolean Predicate Reference Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Predicate Function</th>
                  <th className="py-3.5 px-4 font-bold">Short-Circuit Trigger</th>
                  <th className="py-3.5 px-4 font-bold">Empty List `[]` Result</th>
                  <th className="py-3.5 px-4 font-bold">Recommended Syntax</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">`any(generator)`</td>
                  <td className="py-3 px-4 text-emerald-400">First `True` value encountered</td>
                  <td className="py-3 px-4 text-rose-400">`False`</td>
                  <td className="py-3 px-4 font-mono text-slate-200">`any(cond for x in seq)`</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">`all(generator)`</td>
                  <td className="py-3 px-4 text-rose-400">First `False` value encountered</td>
                  <td className="py-3 px-4 text-emerald-400">`True` (Vacuous Truth)</td>
                  <td className="py-3 px-4 font-mono text-slate-200">`seq and all(cond for x in seq)`</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">`not any(...)`</td>
                  <td className="py-3 px-4 text-slate-300">Equivalent to `all(not ...)`</td>
                  <td className="py-3 px-4 text-emerald-400">`True`</td>
                  <td className="py-3 px-4 font-mono text-slate-200">`not any(is_bad(x) for x in seq)`</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">`not all(...)`</td>
                  <td className="py-3 px-4 text-slate-300">Equivalent to `any(not ...)`</td>
                  <td className="py-3 px-4 text-rose-400">`False`</td>
                  <td className="py-3 px-4 font-mono text-slate-200">`any(not is_valid(x) for x in seq)`</td>
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
            Explore 4 production-grade Python scripts demonstrating any/all mechanics, generator performance benchmarks, matrix predicates, and institutional admission validators:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "any_and_all_short_circuit_mechanics.py",
                code: mechanicsCode,
                description: "Short-circuit evaluation and vacuous truth rules for any() and all().",
              },
              {
                filename: "combining_any_all_with_generator_expressions.py",
                code: generatorCompCode,
                description: "Memory efficiency and short-circuit benchmark comparisons.",
              },
              {
                filename: "matrix_and_nested_collection_predicates.py",
                code: matrixPredicatesCode,
                description: "Nested any/all predicates on 2D matrices and schema completeness.",
              },
              {
                filename: "institutional_eligibility_and_compliance_validator.py",
                code: complianceValidatorCode,
                description: "Multi-rule admission validation with any() and all() predicates.",
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
                <span>❌</span> Trap 1: Using Square Brackets in `any([...])`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-rose-300 font-mono">any([expensive(x) for x in huge_list])</code> forces Python to execute <code className="text-slate-300">expensive(x)</code> on ALL elements, defeating short-circuiting!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Always omit square brackets: <code className="text-emerald-300">any(expensive(x) for x in huge_list)</code>.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Vacuous Truth on Empty Collections
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Calling <code className="text-amber-300 font-mono">all(scores &gt;= 60 for scores in [])</code> returns <code className="text-emerald-400 font-mono">True</code>! This allows empty profiles to bypass security filters.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Guard with <code className="text-emerald-300">if scores and all(s &gt;= 60 for s in scores):</code>.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Negating `all()` Incorrectly
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Confusing "not all pass" with "all fail". Under De Morgan's Laws, <code className="text-purple-300 font-mono">not all(P)</code> is equivalent to <code className="text-purple-300 font-mono">any(not P)</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Check De Morgan's duality when writing negation logic.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Boilerplate Flag Variables
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing 6-line procedural loops with <code className="text-cyan-300 font-mono">flag = True; for x in seq: if not x: flag = False; break</code> clutters codebases.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Replace with declarative <code className="text-emerald-300">all(...)</code>.
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
            Comprehensive question-and-answer repository covering any, all, short-circuit evaluation, vacuous truth, and schema validation:
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
            Download or print the complete reference sheet with boolean predicate truth tables, vacuous truth defenses, and generator recipes:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic4_any_and_all_predicates_notes.txt"
              title="Print Topic 4 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
