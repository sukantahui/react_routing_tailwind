import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import decoratorSyntax from "./topic2_files/decorator_syntax_and_wrapping.py?raw";
import parameterizedDecorators from "./topic2_files/decorating_functions_with_arguments.py?raw";
import metadataPreservation from "./topic2_files/preserving_metadata_with_functools_wraps.py?raw";
import telemetrySuite from "./topic2_files/institutional_admission_telemetry_decorator_suite.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic2_files/topic2_note.txt?raw";

// FAQ Questions
import questions from "./topic2_files/topic2_questions";

/**
 * Topic2: Understanding Decorators: Concept and @decorator syntax
 * Module: 003_003_decorators-generators
 * Segment: 3 (Advanced Python Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic2() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("syntax");

  // Interactive Telemetry Decorator Simulator State
  const [studentId, setStudentId] = useState("STU-101");
  const [studentName, setStudentName] = useState("Sourav Mukherjee");
  const [selectedCourse, setSelectedCourse] = useState("Full-Stack Python & AI");
  const [depositAmount, setDepositAmount] = useState(18000);

  // Decorator Toggles
  const [enableValidation, setEnableValidation] = useState(true);
  const [enableAudit, setEnableAudit] = useState(true);
  const [enableTimer, setEnableTimer] = useState(true);
  const [enableWraps, setEnableWraps] = useState(true);

  const [telemetryLogs, setTelemetryLogs] = useState([]);
  const [isSuccess, setIsSuccess] = useState(true);

  const handleExecuteDecoratedFunction = () => {
    const logs = [];
    let success = true;
    const startTime = performance.now();

    // Layer 1: Timer Pre-log
    if (enableTimer) {
      logs.push({
        type: "TIMER",
        text: `[TIMER START] Initializing high-precision performance counter for \`onboard_candidate\`...`,
      });
    }

    // Layer 2: Audit Pre-log
    if (enableAudit) {
      logs.push({
        type: "AUDIT",
        text: `[FORENSIC AUDIT ENTRY] Executing \`onboard_candidate\` with args: ('${studentId}', '${studentName}', '${selectedCourse}', INR ${depositAmount.toLocaleString()})`,
      });
    }

    // Layer 3: Validation Decorator Check
    if (enableValidation) {
      if (!studentId.match(/^STU-\d{3,6}$/)) {
        logs.push({
          type: "ERROR",
          text: `[VALIDATION FAILED] ValueError: Invalid Student ID format '${studentId}'. Must match 'STU-XXXX'!`,
        });
        success = false;
      } else {
        logs.push({
          type: "VALIDATION",
          text: `[VALIDATION OK] Student ID '${studentId}' verified against institutional regex pattern.`,
        });
      }
    }

    // Core Business Function Execution
    if (success) {
      if (depositAmount < 5000) {
        logs.push({
          type: "ERROR",
          text: `[BUSINESS RULE FAILED] ValueError: Minimum deposit is INR 5,000.00, received INR ${depositAmount.toLocaleString()}`,
        });
        success = false;
      } else {
        logs.push({
          type: "CORE",
          text: `[CORE FUNCTION EXECUTED] Generated Admission Certificate for ${studentName} (${studentId}) in ${selectedCourse}.`,
        });
      }
    }

    // Post Audit Log
    if (enableAudit) {
      logs.push({
        type: "AUDIT",
        text: `[FORENSIC AUDIT EXIT] Completed -> Status: ${success ? "ACTIVE_ENROLLED (200 OK)" : "TRANSACTION_ABORTED"}`,
      });
    }

    // Post Timer Log
    if (enableTimer) {
      const elapsed = ((performance.now() - startTime) * 10).toFixed(2);
      logs.push({
        type: "TIMER",
        text: `[TIMER END] Execution finished in ${elapsed} microseconds.`,
      });
    }

    setIsSuccess(success);
    setTelemetryLogs(logs);
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
            Topic 2
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Decorators, Generators &amp; Iterators
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Understanding Decorators &amp; <span className="text-teal-400">`@decorator` Syntax</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master the mechanics of Python function wrapping: understanding <code className="text-teal-300 font-mono">@decorator</code> syntactic sugar, building universal <code className="text-cyan-300 font-mono">*args, **kwargs</code> wrappers, preserving function metadata with <code className="text-purple-300 font-mono">functools.wraps</code>, and decorator stacking.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ✨ @ Syntactic Sugar (fn = dec(fn))
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🌐 Universal *args, **kwargs Wrappers
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ functools.wraps Metadata Preservation
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🥞 Decorator Stacking Pipeline
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: DECORATOR ESSENTIALS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎨</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Anatomy of a Python Decorator
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              A <strong>Decorator</strong> is a design pattern implemented as a higher-order function that accepts a target function, wraps it with additional pre/post execution behavior, and returns the modified wrapper function:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ The @ Syntax</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">fn = decorator(fn)</code>
                <p className="text-[11px] text-slate-300">
                  Syntactic sugar that replaces the original function with the wrapper.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ *args, **kwargs</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">def wrapper(*args, **kw):</code>
                <p className="text-[11px] text-slate-300">
                  Universal envelope accepting and forwarding all arguments seamlessly.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ functools.wraps</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">@functools.wraps(func)</code>
                <p className="text-[11px] text-slate-300">
                  Preserves <code className="text-purple-300 font-mono">__name__</code>, <code className="text-purple-300 font-mono">__doc__</code>, and <code className="text-purple-300 font-mono">__wrapped__</code>.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-rose-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Fatal Beginner Trap: Forgetting `return result`
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                If your wrapper executes <code className="text-teal-300 font-mono">result = func(*args, **kwargs)</code> but forgets to <code className="text-teal-300 font-mono">return result</code>, the decorated function will silently return <code className="text-rose-400 font-mono">None</code> to every caller! Always return the evaluated result.
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
                2. Visualizing Decorator Wrapping &amp; Stacking Pipelines
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
                @ Sugar Transformation
              </button>
              <button
                onClick={() => setActiveInteractiveTab("envelope")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "envelope"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Wrapper Execution Envelope
              </button>
              <button
                onClick={() => setActiveInteractiveTab("stacking")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "stacking"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Decorator Stacking Order
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining syntactic transformation, runtime envelope wrapping, and multi-decorator stacking:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "syntax" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">THE `@decorator` SYNTACTIC SUGAR TRANSFORMATION</text>

                {/* Left: What you write */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="30" fill="#99f6e4" fontSize="12" fontWeight="bold">What You Write in Source Code:</text>
                  
                  <text x="20" y="65" fill="#34d399" fontSize="10 font-mono font-bold">@audit_logger</text>
                  <text x="20" y="90" fill="#ecfdf5" fontSize="10 font-mono">def enroll_student(student_id):</text>
                  <text x="40" y="115" fill="#cbd5e1" fontSize="10 font-mono">print("Enrolling:", student_id)</text>
                  <text x="40" y="140" fill="#cbd5e1" fontSize="10 font-mono">return "ENROLLED"</text>

                  <rect x="20" y="170" width="340" height="50" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="195" fill="#34d399" fontSize="9 font-mono">Clean, declarative, and elegant syntax.</text>
                </g>

                {/* Arrow */}
                <g transform="translate(425, 140)">
                  <text x="0" y="0" fill="#2dd4bf" fontSize="12" fontWeight="bold">equivalent to</text>
                  <text x="25" y="25" fill="#38bdf8" fontSize="26" fontWeight="bold">→</text>
                </g>

                {/* Right: What Python actually executes */}
                <g transform="translate(480, 50)">
                  <rect x="0" y="0" width="370" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="12" fontWeight="bold">What Python Interpreter Executes:</text>
                  
                  <text x="20" y="65" fill="#ecfdf5" fontSize="10 font-mono">def enroll_student(student_id):</text>
                  <text x="40" y="90" fill="#cbd5e1" fontSize="10 font-mono">...</text>
                  
                  <text x="20" y="125" fill="#34d399" fontSize="10 font-mono font-bold">enroll_student = audit_logger(</text>
                  <text x="40" y="150" fill="#34d399" fontSize="10 font-mono font-bold">enroll_student</text>
                  <text x="20" y="175" fill="#34d399" fontSize="10 font-mono font-bold">)</text>

                  <rect x="20" y="190" width="330" height="35" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="30" y="212" fill="#c4b5fd" fontSize="9 font-mono">Rebinds identifier to returned wrapper object!</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "envelope" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">UNIVERSAL WRAPPER ENVELOPE: `*args, **kwargs`</text>

                {/* 3 Step Pipeline */}
                <g transform="translate(30, 50)">
                  {/* Step 1: Pre Execution */}
                  <rect x="0" y="0" width="250" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="15" y="30" fill="#99f6e4" fontSize="11 font-bold">1. Pre-Execution Hook</text>
                  <text x="15" y="60" fill="#ecfdf5" fontSize="9 font-mono">def wrapper(*args, **kw):</text>
                  <text x="25" y="85" fill="#34d399" fontSize="9 font-mono">t0 = perf_counter()</text>
                  <text x="25" y="105" fill="#34d399" fontSize="9 font-mono">validate(args)</text>

                  <rect x="15" y="140" width="220" height="80" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="25" y="165" fill="#34d399" fontSize="9 font-bold">Intercept Arguments:</text>
                  <text x="25" y="185" fill="#cbd5e1" fontSize="8">Logging, timing, or auth check.</text>

                  {/* Arrow 1 */}
                  <text x="265" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 2: Core Execution */}
                  <rect x="295" y="0" width="250" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="310" y="30" fill="#a5f3fc" fontSize="11 font-bold">2. Core Function Call</text>
                  <text x="310" y="60" fill="#ecfdf5" fontSize="9 font-mono">result = func(*args, **kw)</text>
                  <text x="310" y="85" fill="#38bdf8" fontSize="9 font-mono"># Executes original logic</text>

                  <rect x="310" y="140" width="220" height="80" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="320" y="165" fill="#38bdf8" fontSize="9 font-bold">Pure Execution:</text>
                  <text x="320" y="185" fill="#cbd5e1" fontSize="8">Original function runs unaware.</text>

                  {/* Arrow 2 */}
                  <text x="560" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 3: Post Execution */}
                  <rect x="590" y="0" width="230" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="605" y="30" fill="#c4b5fd" fontSize="11 font-bold">3. Post-Execution Hook</text>
                  <text x="605" y="60" fill="#ecfdf5" fontSize="9 font-mono">log_latency(perf_counter()-t0)</text>
                  <text x="605" y="85" fill="#34d399" fontSize="9 font-mono font-bold">return result # CRUCIAL!</text>

                  <rect x="605" y="140" width="200" height="80" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="615" y="165" fill="#c4b5fd" fontSize="9 font-bold">Forward Return Value:</text>
                  <text x="615" y="185" fill="#cbd5e1" fontSize="8">Returns computed output.</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">DECORATOR STACKING ORDER: BOTTOM-UP WRAPPING, TOP-DOWN RUNTIME</text>

                {/* Stacking Layers */}
                <g transform="translate(30, 50)">
                  {/* Layer 1: Outermost */}
                  <rect x="0" y="0" width="400" height="65" rx="6" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="25" fill="#fda4af" fontSize="11 font-bold">1. `@validate_params` (Runs 1st at runtime)</text>
                  <text x="20" y="48" fill="#ecfdf5" fontSize="8 font-mono">Enforces argument types and constraints before proceeding.</text>

                  {/* Layer 2: Middle */}
                  <rect x="0" y="85" width="400" height="65" rx="6" fill="#083344" stroke="#06b6d4" />
                  <text x="20" y="110" fill="#a5f3fc" fontSize="11 font-bold">2. `@audit_logger` (Runs 2nd at runtime)</text>
                  <text x="20" y="133" fill="#ecfdf5" fontSize="8 font-mono">Logs forensic telemetry with timestamps.</text>

                  {/* Layer 3: Innermost */}
                  <rect x="0" y="170" width="400" height="65" rx="6" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="195" fill="#99f6e4" fontSize="11 font-bold">3. `onboard_candidate()` [CORE FUNCTION]</text>
                  <text x="20" y="218" fill="#34d399" fontSize="8 font-mono">Executes actual business database commit.</text>
                </g>

                {/* Direction Guides */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="235" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">The Golden Stacking Rules</text>

                  <rect x="20" y="55" width="340" height="70" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="80" fill="#34d399" fontSize="10 font-bold">1. Wrapping Order (Definition Time):</text>
                  <text x="30" y="100" fill="#ecfdf5" fontSize="8 font-mono">Wraps BOTTOM to TOP: `validate(audit(func))`</text>

                  <rect x="20" y="140" width="340" height="70" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="165" fill="#34d399" fontSize="10 font-bold">2. Execution Order (Invocation Time):</text>
                  <text x="30" y="185" fill="#ecfdf5" fontSize="8 font-mono">Executes TOP to BOTTOM: Validate → Audit → Func!</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE TELEMETRY DECORATOR PLAYGROUND */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Admission Telemetry &amp; Decorator Playground
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Configure student onboarding parameters and toggle stacked decorators to inspect runtime wrapper execution logs in real-time:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Form Controls */}
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold block">
                1. Candidate Onboarding Parameters
              </span>

              {/* Student ID */}
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-400 block">Student ID (Format: `STU-XXXX`):</label>
                <input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs font-mono text-white focus:border-teal-500 focus:outline-none"
                />
              </div>

              {/* Student Name */}
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-400 block">Candidate Name:</label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs font-mono text-white focus:border-teal-500 focus:outline-none"
                />
              </div>

              {/* Deposit Amount Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Enrollment Deposit:</span>
                  <span className="text-teal-300 font-bold">INR {depositAmount.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="30000"
                  step="1000"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(Number(e.target.value))}
                  className="w-full accent-teal-500"
                />
              </div>

              {/* Decorator Stack Toggles */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block">
                  2. Active Stacked Decorators (@):
                </span>
                <div className="flex flex-col gap-1.5 text-xs font-mono text-slate-300">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={enableValidation}
                      onChange={(e) => setEnableValidation(e.target.checked)}
                      className="accent-teal-500 rounded"
                    />
                    <span>@validate_student_id (Regex Pattern Guard)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={enableAudit}
                      onChange={(e) => setEnableAudit(e.target.checked)}
                      className="accent-teal-500 rounded"
                    />
                    <span>@forensic_admission_audit (Entry/Exit Telemetry)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={enableTimer}
                      onChange={(e) => setEnableTimer(e.target.checked)}
                      className="accent-teal-500 rounded"
                    />
                    <span>@measure_admission_latency (Microsecond Benchmark)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={enableWraps}
                      onChange={(e) => setEnableWraps(e.target.checked)}
                      className="accent-purple-500 rounded"
                    />
                    <span className="text-purple-300">@functools.wraps (Preserve Metadata)</span>
                  </label>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleExecuteDecoratedFunction}
                className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-lg text-xs font-mono transition-all shadow-lg shadow-teal-950/50"
              >
                Invoke `onboard_new_candidate(...)`
              </button>
            </div>

            {/* Live Telemetry Console */}
            <div className="space-y-4 flex flex-col justify-between">
              {/* Metadata Readout */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
                <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  Introspected Decorated Function Attributes:
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">`fn.__name__`:</span>
                  <span className={clsx("font-bold", enableWraps ? "text-teal-300" : "text-rose-400")}>
                    {enableWraps ? "onboard_new_candidate" : "wrapper (METADATA ERASED!)"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">`fn.__doc__`:</span>
                  <span className="text-slate-300 text-[11px] truncate max-w-[200px]">
                    {enableWraps ? "Official student onboarding service..." : "Generic wrapper docstring"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">`__wrapped__` Accessible:</span>
                  <span className={clsx("font-bold", enableWraps ? "text-emerald-400" : "text-slate-500")}>
                    {enableWraps ? "True (Original func callable)" : "False"}
                  </span>
                </div>
              </div>

              {/* Live Execution Logs */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex-1 overflow-y-auto max-h-[200px] space-y-1.5 font-mono text-xs">
                <span className="text-slate-400 block font-bold text-[10px] uppercase">
                  Live Execution Telemetry Trace:
                </span>
                {telemetryLogs.length === 0 ? (
                  <div className="text-slate-500 italic text-[11px]">
                    Click "Invoke onboard_new_candidate" to execute decorated pipeline.
                  </div>
                ) : (
                  telemetryLogs.map((log, idx) => (
                    <div
                      key={idx}
                      className={clsx(
                        "p-1.5 rounded text-[11px] leading-relaxed",
                        log.type === "ERROR" && "bg-rose-950/60 border border-rose-800 text-rose-300",
                        log.type === "TIMER" && "text-cyan-300",
                        log.type === "AUDIT" && "text-teal-300",
                        log.type === "VALIDATION" && "text-emerald-300",
                        log.type === "CORE" && "text-purple-300 font-bold"
                      )}
                    >
                      {log.text}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER DECORATORS MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Python Decorators Reference Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Feature / Component</th>
                  <th className="py-3.5 px-4 font-bold">Syntax Blueprint</th>
                  <th className="py-3.5 px-4 font-bold">Purpose / Responsibility</th>
                  <th className="py-3.5 px-4 font-bold">Failure Trap</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">@decorator Syntax</td>
                  <td className="py-3 px-4 font-mono text-slate-200">@my_dec \n def f(): ...</td>
                  <td className="py-3 px-4">Syntactic sugar for `f = my_dec(f)`</td>
                  <td className="py-3 px-4 text-rose-300">Assuming decorator runs on each call</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">*args, **kwargs</td>
                  <td className="py-3 px-4 font-mono text-slate-200">def wrapper(*args, **kwargs):</td>
                  <td className="py-3 px-4">Universal parameter forwarding</td>
                  <td className="py-3 px-4 text-rose-300">TypeError on parameterized target functions</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">functools.wraps</td>
                  <td className="py-3 px-4 font-mono text-slate-200">@functools.wraps(func)</td>
                  <td className="py-3 px-4">Preserves `__name__` and `__doc__`</td>
                  <td className="py-3 px-4 text-rose-300">Erasing function name to 'wrapper'</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-emerald-300 font-semibold">Return Value</td>
                  <td className="py-3 px-4 font-mono text-slate-200">return func(*args, **kwargs)</td>
                  <td className="py-3 px-4">Forwards return value to caller</td>
                  <td className="py-3 px-4 text-rose-300">Silently returning None on forget</td>
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
            Explore 4 production-grade Python scripts demonstrating decorator syntax, argument forwarding, metadata preservation with functools.wraps, and telemetry suites:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "decorator_syntax_and_wrapping.py",
                code: decoratorSyntax,
                description: "Decorator concept, manual wrapping vs @decorator syntax, and execution banners.",
              },
              {
                filename: "decorating_functions_with_arguments.py",
                code: parameterizedDecorators,
                description: "Universal *args and **kwargs wrappers, return value forwarding, and performance timers.",
              },
              {
                filename: "preserving_metadata_with_functools_wraps.py",
                code: metadataPreservation,
                description: "Metadata erasure trap, @functools.wraps preservation, and __wrapped__ introspection.",
              },
              {
                filename: "institutional_admission_telemetry_decorator_suite.py",
                code: telemetrySuite,
                description: "Enterprise Student Admission & Telemetry Decorator Suite with validation and latency benchmarks.",
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
                <span>❌</span> Trap 1: Forgetting `return result`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Calling <code className="text-rose-300 font-mono">func(*args, **kwargs)</code> without returning the evaluated result causes the decorated function to silently return <code className="text-rose-300 font-mono">None</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Always write <code className="text-emerald-300">return func(*args, **kwargs)</code>.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Missing `functools.wraps`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Forgetting <code className="text-amber-300 font-mono">@functools.wraps(func)</code> replaces the function's name with <code className="text-amber-300 font-mono">"wrapper"</code> and wipes all docstrings.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Place <code className="text-emerald-300">@functools.wraps(func)</code> above every inner wrapper.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Decorator Execution Timing
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                The outer decorator function runs at module import/definition time, NOT when the decorated function is called.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Place per-call runtime logic inside the inner wrapper function.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Non-Star Parameters in Wrapper
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-cyan-300 font-mono">def wrapper(args, kwargs):</code> without asterisks expects exactly 2 positional arguments!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Always use <code className="text-emerald-300">*args, **kwargs</code> with asterisks.
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
            Comprehensive question-and-answer repository covering Python decorators, @ syntactic sugar, functools.wraps, and stacking:
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
            Download or print the complete reference sheet with decorator syntax blueprints, functools.wraps templates, and stacking rules:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic2_decorators_syntax_notes.txt"
              title="Print Topic 2 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
