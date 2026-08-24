import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import assertFundamentals from "./topic10_files/assert_statement_fundamentals.py?raw";
import optimizationTrap from "./topic10_files/python_optimization_flag_trap.py?raw";
import defensiveInvariants from "./topic10_files/defensive_internal_invariants.py?raw";
import rankingInvariants from "./topic10_files/classroom_grading_and_rank_invariants.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic10_files/topic10_note.txt?raw";

// FAQ Questions
import questions from "./topic10_files/topic10_questions";

/**
 * Topic10: Using assertions with assert for internal invariant checks
 * Module: 003_002_basic-exception-handling
 * Segment: 3 (Advanced Python Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic10() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("engine");

  // Interactive Ranking & Invariant Simulator State
  const [isDebugMode, setIsDebugMode] = useState(true);
  const [studentScores, setStudentScores] = useState({
    sourav: 94.5,
    priyanka: 98.0,
    rahul: 88.0,
    debolina: 91.5,
  });

  const studentsList = [
    { id: "STU-101", name: "Sourav Mukherjee", score: studentScores.sourav },
    { id: "STU-102", name: "Priyanka Sen", score: studentScores.priyanka },
    { id: "STU-103", name: "Rahul Verma", score: studentScores.rahul },
    { id: "STU-104", name: "Debolina Roy", score: studentScores.debolina },
  ];

  // Sorting descending
  const sortedStudents = [...studentsList].sort((a, b) => b.score - a.score);
  const total = sortedStudents.length;

  const leaderboard = sortedStudents.map((s, idx) => {
    const rank = idx + 1;
    const percentile = ((total - rank) / total) * 100.0;
    return {
      ...s,
      rank,
      percentile,
    };
  });

  // Verify internal invariants
  const invariantPercentile = leaderboard.every((s) => s.percentile >= 0 && s.percentile <= 100);
  const invariantMonotonicity = leaderboard.every((s, i) => i === 0 || leaderboard[i - 1].score >= s.score);
  const invariantDimension = leaderboard.length === total;

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
            Segment 3 • Module 003_002
          </span>
          <span className="text-xs sm:text-sm font-mono bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/80 shadow-sm shadow-cyan-950/50">
            Topic 10
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Robust Exception Handling &amp; Defensive Coding
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Using Assertions with <code className="text-teal-400 font-mono">assert</code> for Invariants
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master internal consistency and defensive invariants: understanding <code className="text-teal-300 font-mono">assert</code> vs <code className="text-cyan-300 font-mono">raise</code>, why Python's <code className="text-purple-300 font-mono">-O</code> flag strips assertions from bytecode, the infamous Tuple Trap, and mathematical postcondition checks.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ Internal Invariant Checks
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚠️ Python -O Flag &amp; __debug__ Mechanics
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🚨 The Fatal Tuple Trap (assert (x, msg))
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📐 Mathematical Postconditions
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: ASSERT ESSENTIALS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎯</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Role of `assert`: Internal Developer Invariants
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              In Python, the <code className="text-teal-300 font-mono">assert</code> statement is designed to verify conditions that <strong>should never happen</strong> if the programmer's internal logic is correct:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-base mb-1">1️⃣ Syntax &amp; Trigger</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">assert cond, "msg"</code>
                <p className="text-[11px] text-slate-300">
                  Evaluates boolean condition. If False, immediately raises <code className="text-rose-400 font-mono">AssertionError</code>.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-base mb-1">2️⃣ The `-O` Flag Trap</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">python -O app.py</code>
                <p className="text-[11px] text-slate-300">
                  Sets <code className="text-purple-300 font-mono">__debug__ = False</code> and completely strips all assertions from bytecode!
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-base mb-1">3️⃣ assert vs raise</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">raise for inputs / assert for math</code>
                <p className="text-[11px] text-slate-300">
                  Always use <code className="text-cyan-300 font-mono">raise</code> for public inputs and auth; use <code className="text-teal-300 font-mono">assert</code> for algorithm sanity checks.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-rose-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Fatal Security Trap: Never Assert for Auth
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-rose-400 font-mono">assert user.is_admin, "Unauthorized"</code> is a severe security vulnerability. If deployed in production with <code className="text-rose-400 font-mono">python -O</code>, the assertion statement is deleted during bytecode compilation, granting unauthenticated users full admin privileges! Always use <code className="text-emerald-400 font-mono">if not user.is_admin: raise PermissionError</code>.
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
                2. Visualizing Assertions, Optimization &amp; Traps
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("engine")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "engine"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Invariant Engine Flow
              </button>
              <button
                onClick={() => setActiveInteractiveTab("optflag")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "optflag"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                The `-O` Flag Bytecode Stripping
              </button>
              <button
                onClick={() => setActiveInteractiveTab("tuple")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "tuple"
                    ? "bg-rose-900/50 text-rose-300 border border-rose-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                The Infamous Tuple Trap
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining invariant checks, optimization flag mechanics, and the tuple syntax hazard:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "engine" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">THE `assert` INVARIANT EVALUATION FLOW</text>

                {/* 3 Steps */}
                <g transform="translate(30, 50)">
                  {/* Step 1: Input validation */}
                  <rect x="0" y="0" width="250" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="15" y="30" fill="#99f6e4" fontSize="11" fontWeight="bold">1. Public Input Validation</text>
                  <text x="15" y="60" fill="#ecfdf5" fontSize="9 font-mono">if gross &lt; 0:</text>
                  <text x="30" y="80" fill="#34d399" fontSize="9 font-mono font-bold">raise ValueError("Fee &lt; 0")</text>
                  
                  <rect x="15" y="120" width="220" height="95" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="25" y="145" fill="#34d399" fontSize="9 font-bold">Guaranteed Execution:</text>
                  <text x="25" y="165" fill="#cbd5e1" fontSize="8">Always runs in dev &amp; prod.</text>
                  <text x="25" y="180" fill="#cbd5e1" fontSize="8">Protects API boundaries.</text>

                  {/* Arrow 1 */}
                  <text x="265" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 2: Math Algorithm */}
                  <rect x="295" y="0" width="250" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="310" y="30" fill="#a5f3fc" fontSize="11" fontWeight="bold">2. Internal Math Processing</text>
                  <text x="310" y="60" fill="#ecfdf5" fontSize="9 font-mono">discount = gross * rate</text>
                  <text x="310" y="80" fill="#ecfdf5" fontSize="9 font-mono">net = gross - discount</text>

                  <rect x="310" y="120" width="220" height="95" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="320" y="145" fill="#38bdf8" fontSize="9 font-bold">Complex Calculation:</text>
                  <text x="320" y="165" fill="#cbd5e1" fontSize="8">Floating-point arithmetic,</text>
                  <text x="320" y="180" fill="#cbd5e1" fontSize="8">normalization, ranking.</text>

                  {/* Arrow 2 */}
                  <text x="560" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 3: Postcondition Assert */}
                  <rect x="590" y="0" width="230" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="605" y="30" fill="#c4b5fd" fontSize="11" fontWeight="bold">3. Internal Postcondition</text>
                  <text x="605" y="60" fill="#ecfdf5" fontSize="9 font-mono">assert 0 &lt;= net &lt;= gross, \</text>
                  <text x="620" y="80" fill="#c4b5fd" fontSize="9 font-mono">"Math invariant broken!"</text>

                  <rect x="605" y="120" width="200" height="95" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="615" y="145" fill="#c4b5fd" fontSize="9 font-bold">Safety Invariant Tripwire:</text>
                  <text x="615" y="165" fill="#cbd5e1" fontSize="8">Catches impossible mathematical</text>
                  <text x="615" y="180" fill="#cbd5e1" fontSize="8">states during development.</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "optflag" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">THE PYTHON OPTIMIZATION FLAG (-O) BYTECODE STRIPPING</text>

                {/* Left: Normal Mode */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">Normal Mode: `python app.py` (__debug__ = True)</text>
                  
                  <text x="20" y="60" fill="#ecfdf5" fontSize="9 font-mono">def check():</text>
                  <text x="35" y="80" fill="#34d399" fontSize="9 font-mono">assert x &gt; 0, "Error"</text>
                  <text x="35" y="100" fill="#ecfdf5" fontSize="9 font-mono">return x</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="155" fill="#34d399" fontSize="10 font-bold">Bytecode Execution:</text>
                  <text x="30" y="175" fill="#ecfdf5" fontSize="8 font-mono">LOAD_FAST (x) → POP_JUMP_IF_TRUE</text>
                  <text x="30" y="195" fill="#a7f3d0" fontSize="8 font-mono">✓ Assertions are actively evaluated!</text>
                </g>

                {/* Right: Optimized Mode */}
                <g transform="translate(460, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="12" fontWeight="bold">Optimized Mode: `python -O app.py` (__debug__ = False)</text>
                  
                  <text x="20" y="60" fill="#fca5a5" fontSize="9 font-mono">def check():</text>
                  <text x="35" y="80" fill="#fda4af" fontSize="9 font-mono text-rose-300 line-through"># assert x &gt; 0, "Error" (STRIPPED!)</text>
                  <text x="35" y="100" fill="#fca5a5" fontSize="9 font-mono">return x</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#881337" stroke="#e11d48" />
                  <text x="30" y="155" fill="#ffe4e6" fontSize="10 font-bold">Bytecode Execution:</text>
                  <text x="30" y="175" fill="#fda4af" fontSize="8 font-mono">LOAD_FAST (x) → RETURN_VALUE</text>
                  <text x="30" y="195" fill="#fca5a5" fontSize="8 font-mono">❌ Assertions are completely GONE from bytecode!</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#f43f5e" fontSize="14" fontWeight="bold">THE INFAMOUS ASSERT TUPLE TRAP: `assert (cond, "msg")`</text>

                {/* Left: Flawed Tuple */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="12" fontWeight="bold">❌ The Bug: Wrapping with Parentheses</text>
                  
                  <text x="20" y="60" fill="#fca5a5" fontSize="9 font-mono">score = -50  # Obviously invalid</text>
                  <text x="20" y="85" fill="#fca5a5" fontSize="9 font-mono font-bold">assert (score &gt;= 0, "Negative score!")</text>

                  <rect x="20" y="115" width="340" height="100" rx="4" fill="#881337" stroke="#e11d48" />
                  <text x="30" y="140" fill="#ffe4e6" fontSize="10 font-bold">Why it NEVER fails:</text>
                  <text x="30" y="160" fill="#ecfdf5" fontSize="8 font-mono">`(-50 &gt;= 0, "msg")` creates tuple `(False, "msg")`.</text>
                  <text x="30" y="180" fill="#ecfdf5" fontSize="8 font-mono">In Python, non-empty tuples evaluate to TRUE!</text>
                  <text x="30" y="200" fill="#fda4af" fontSize="8 font-mono">Assertion passes silently, masking the bug!</text>
                </g>

                {/* Right: Correct Syntax */}
                <g transform="translate(460, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">✓ Correct Syntax: No Parentheses</text>
                  
                  <text x="20" y="60" fill="#ecfdf5" fontSize="9 font-mono">score = -50</text>
                  <text x="20" y="85" fill="#34d399" fontSize="9 font-mono font-bold">assert score &gt;= 0, "Negative score!"</text>

                  <rect x="20" y="115" width="340" height="100" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="140" fill="#a7f3d0" fontSize="10 font-bold">Proper Evaluation:</text>
                  <text x="30" y="160" fill="#ecfdf5" fontSize="8 font-mono">Evaluates `score &gt;= 0` as a standalone boolean.</text>
                  <text x="30" y="180" fill="#34d399" fontSize="8 font-mono">Correctly raises `AssertionError: Negative score!`</text>
                  <text x="30" y="200" fill="#ecfdf5" fontSize="8 font-mono">Catches the invalid score immediately.</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE EXAM RANKING & INVARIANT PLAYGROUND */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Exam Ranking &amp; Invariant Dashboard
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Adjust student exam marks and toggle Python's execution mode to witness how mathematical invariants are evaluated in real-time:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Score Controls */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                  Classroom Exam Marks
                </span>

                {/* Debug Mode Toggle */}
                <button
                  onClick={() => setIsDebugMode(!isDebugMode)}
                  className={clsx(
                    "px-2.5 py-1 rounded text-[11px] font-mono border transition-all",
                    isDebugMode
                      ? "bg-teal-950 text-teal-300 border-teal-700"
                      : "bg-purple-950 text-purple-300 border-purple-700"
                  )}
                >
                  {isDebugMode ? "Mode: Normal (__debug__ = True)" : "Mode: Optimized (-O Flag)"}
                </button>
              </div>

              {/* Slider 1: Sourav */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">Sourav Mukherjee:</span>
                  <span className="text-teal-300 font-bold">{studentScores.sourav.toFixed(1)}/100</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.5"
                  value={studentScores.sourav}
                  onChange={(e) => setStudentScores({ ...studentScores, sourav: Number(e.target.value) })}
                  className="w-full accent-teal-500"
                />
              </div>

              {/* Slider 2: Priyanka */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">Priyanka Sen:</span>
                  <span className="text-teal-300 font-bold">{studentScores.priyanka.toFixed(1)}/100</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.5"
                  value={studentScores.priyanka}
                  onChange={(e) => setStudentScores({ ...studentScores, priyanka: Number(e.target.value) })}
                  className="w-full accent-teal-500"
                />
              </div>

              {/* Slider 3: Rahul */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">Rahul Verma:</span>
                  <span className="text-teal-300 font-bold">{studentScores.rahul.toFixed(1)}/100</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.5"
                  value={studentScores.rahul}
                  onChange={(e) => setStudentScores({ ...studentScores, rahul: Number(e.target.value) })}
                  className="w-full accent-teal-500"
                />
              </div>

              {/* Invariants Monitor */}
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1.5 text-xs font-mono">
                <div className="text-slate-400 font-bold">Internal Postcondition Invariants:</div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-300">1. Percentile Range [0, 100%]:</span>
                  <span className="text-emerald-400 font-bold">✓ PASSED</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-300">2. Rank Monotonicity (S_i &gt;= S_i+1):</span>
                  <span className="text-emerald-400 font-bold">✓ PASSED</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-300">3. Dimensionality (len == 4):</span>
                  <span className="text-emerald-400 font-bold">✓ PASSED</span>
                </div>
              </div>
            </div>

            {/* Live Leaderboard Output */}
            <div className="space-y-3 flex flex-col justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-bold">
                Computed Certified Leaderboard
              </span>

              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex-1 space-y-2 text-xs font-mono">
                {leaderboard.map((item) => (
                  <div
                    key={item.id}
                    className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between"
                  >
                    <div>
                      <span className="text-teal-400 font-bold">#{item.rank} </span>
                      <span className="text-slate-200">{item.name}</span>
                      <span className="text-slate-500 text-[10px] block">({item.id})</span>
                    </div>
                    <div className="text-right">
                      <div className="text-emerald-300 font-bold">{item.score.toFixed(1)}/100</div>
                      <div className="text-[10px] text-cyan-400">{item.percentile.toFixed(1)}%ile</div>
                    </div>
                  </div>
                ))}

                <div className="pt-2 text-[10px] text-slate-500 border-t border-slate-800">
                  {isDebugMode
                    ? "✓ Active Invariant Enforcement: All 3 assertions verified dynamically on every slider update."
                    : "⚠️ Optimized Mode (-O): Bytecode asserts stripped. Math executed at raw native speed."}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER ASSERT MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master `assert` vs `raise` Decision Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Dimension</th>
                  <th className="py-3.5 px-4 font-bold">Assertion (`assert`)</th>
                  <th className="py-3.5 px-4 font-bold">Exception Raise (`raise`)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">Primary Target</td>
                  <td className="py-3 px-4">Internal developer sanity checks &amp; algorithm postconditions</td>
                  <td className="py-3 px-4 font-semibold text-emerald-400">Public user input validation &amp; operational failures</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">Optimization (-O)</td>
                  <td className="py-3 px-4 text-rose-400 font-bold">Completely STRIPPED and removed from bytecode</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">Always executes unconditionally</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">Exception Type</td>
                  <td className="py-3 px-4 font-mono">builtins.AssertionError</td>
                  <td className="py-3 px-4 font-mono">Any (ValueError, TypeError, PermissionError)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">Security &amp; Auth</td>
                  <td className="py-3 px-4 text-rose-400 font-bold">FATAL VULNERABILITY (Never use for security)</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">Industry Standard (raise PermissionError)</td>
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
            Explore 4 production-grade Python scripts demonstrating assert fundamentals, optimization flag traps, defensive invariants, and exam ranking suites:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "assert_statement_fundamentals.py",
                code: assertFundamentals,
                description: "Assert statement fundamentals, AssertionError, and internal math postcondition checks.",
              },
              {
                filename: "python_optimization_flag_trap.py",
                code: optimizationTrap,
                description: "The python -O optimization flag, __debug__ constant, security vulnerabilities, and the tuple trap.",
              },
              {
                filename: "defensive_internal_invariants.py",
                code: defensiveInvariants,
                description: "Legitimate assert patterns: mathematical postconditions, private preconditions, and unreachable sentinels.",
              },
              {
                filename: "classroom_grading_and_rank_invariants.py",
                code: rankingInvariants,
                description: "Enterprise Exam Ranking Engine separating public raise validation from internal assert postconditions.",
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
                <span>❌</span> Trap 1: The Assert Tuple Trap
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-rose-300 font-mono">assert (x &gt; 0, "msg")</code> creates a 2-element tuple. In Python, non-empty tuples are always True, meaning the assertion <em>never fails</em>!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Remove parentheses: <code className="text-emerald-300">assert x &gt; 0, "msg"</code>.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Using Assert for Authorization
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-amber-300 font-mono">assert role == "ADMIN"</code> vanishes when Python runs with <code className="text-amber-300 font-mono">-O</code>, granting non-admin users full access!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Always use <code className="text-emerald-300">if role != "ADMIN": raise PermissionError</code>.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Side-Effects Inside Assert
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-purple-300 font-mono">assert queue.pop() == 5</code> means that in <code className="text-purple-300 font-mono">-O</code> mode, the item is <em>never popped</em> from the queue!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Keep assertions completely free of state-mutating side-effects.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Catching AssertionError in Production
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-cyan-300 font-mono">except AssertionError:</code> to handle routine application logic hides developer bugs instead of fixing them.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Use standard domain exceptions for catchable runtime errors.
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
            Comprehensive question-and-answer repository covering assertions, AssertionError, __debug__, and the python -O flag:
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
            Download or print the complete reference sheet with assert recipes, optimization flag cheat sheets, and invariant templates:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic10_assert_invariants_notes.txt"
              title="Print Topic 10 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
