import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import chainingOrder from "./topic5_files/decorator_chaining_wrapping_vs_execution_order.py?raw";
import combinedPipeline from "./topic5_files/combining_security_caching_and_logging_pipeline.py?raw";
import classDecorators from "./topic5_files/class_methods_and_stacked_builtin_decorators.py?raw";
import diplomaPipeline from "./topic5_files/institutional_examination_certificate_generator_pipeline.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic5_files/topic5_note.txt?raw";

// FAQ Questions
import questions from "./topic5_files/topic5_questions";

/**
 * Topic5: Chaining multiple decorators
 * Module: 003_003_decorators-generators
 * Segment: 3 (Advanced Python Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic5() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("onion");

  // Interactive Diploma Pipeline State
  const candidatePresets = {
    sourav: {
      id: "STU-101",
      name: "Sourav Mukherjee",
      course: "Full-Stack Python & AI",
      hasPaid: true,
      score: 92.5,
    },
    priyanka: {
      id: "STU-102",
      name: "Priyanka Sen",
      course: "Data Science & ML",
      hasPaid: false, // Triggers Dues error
      score: 88.0,
    },
    rahul: {
      id: "STU-103",
      name: "Rahul Verma",
      course: "Python Core",
      hasPaid: true,
      score: 52.0, // Triggers failing score error
    },
  };

  const [selectedCandidateKey, setSelectedCandidateKey] = useState("sourav");
  const [enableClearance, setEnableClearance] = useState(true);
  const [enableSignature, setEnableSignature] = useState(true);
  const [enableBlockchain, setEnableBlockchain] = useState(true);
  const [enableTimer, setEnableTimer] = useState(true);

  const [pipelineLogs, setPipelineLogs] = useState([]);
  const [issuedDiploma, setIssuedDiploma] = useState(null);

  const handleExecutePipeline = () => {
    const logs = [];
    const candidate = candidatePresets[selectedCandidateKey];
    let failed = false;

    // Layer 1: Entry
    if (enableClearance) {
      logs.push({
        layer: "LAYER 1 (ENTRY)",
        text: `[ENTRY @verify_clearance] Inspecting candidate '${candidate.name}' dues & academic scores...`,
      });

      if (!candidate.hasPaid) {
        logs.push({
          layer: "LAYER 1 (GUARD)",
          type: "ERROR",
          text: `[CLEARANCE REJECTED] PermissionError: Outstanding tuition dues pending for ${candidate.name} (${candidate.id})!`,
        });
        failed = true;
      } else if (candidate.score < 60.0) {
        logs.push({
          layer: "LAYER 1 (GUARD)",
          type: "ERROR",
          text: `[ACADEMIC REJECTED] ValueError: Score ${candidate.score}% is below 60.0% passing threshold!`,
        });
        failed = true;
      } else {
        logs.push({
          layer: "LAYER 1 (PASS)",
          type: "SUCCESS",
          text: `[CLEARANCE APPROVED] Candidate cleared for graduation (Score: ${candidate.score}%).`,
        });
      }
    }

    if (failed) {
      setIssuedDiploma(null);
      setPipelineLogs(logs);
      return;
    }

    // Layer 2: Signature Entry
    if (enableSignature) {
      logs.push({
        layer: "LAYER 2 (ENTRY)",
        text: `[ENTRY @apply_signature] Preparing cryptographic seal parameters...`,
      });
    }

    // Layer 3: Blockchain Entry
    if (enableBlockchain) {
      logs.push({
        layer: "LAYER 3 (ENTRY)",
        text: `[ENTRY @record_blockchain] Initializing distributed ledger audit channel...`,
      });
    }

    // Layer 4: Timer Entry
    if (enableTimer) {
      logs.push({
        layer: "LAYER 4 (ENTRY)",
        text: `[ENTRY @measure_latency] Monotonic hardware benchmark timer started...`,
      });
    }

    // Core Function Execution
    logs.push({
      layer: "CORE SERVICE",
      type: "CORE",
      text: `[CORE EXECUTED] Generated baseline diploma record for ${candidate.name} in ${candidate.course}.`,
    });

    // Layer 4: Exit
    if (enableTimer) {
      logs.push({
        layer: "LAYER 4 (EXIT)",
        type: "TIMER",
        text: `[EXIT @measure_latency] Diploma compilation completed in 2.45 microseconds.`,
      });
    }

    // Layer 3: Exit (Attach Blockchain TX)
    const txHash = `0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`;
    if (enableBlockchain) {
      logs.push({
        layer: "LAYER 3 (EXIT)",
        type: "SUCCESS",
        text: `[EXIT @record_blockchain] Mined immutable ledger audit transaction: ${txHash}`,
      });
    }

    // Layer 2: Exit (Attach Digital Seal)
    const sealId = `SEAL-CA-2026-${candidate.id}`;
    if (enableSignature) {
      logs.push({
        layer: "LAYER 2 (EXIT)",
        type: "SUCCESS",
        text: `[EXIT @apply_signature] Affixed official institutional digital watermark: ${sealId}`,
      });
    }

    // Layer 1: Exit
    if (enableClearance) {
      logs.push({
        layer: "LAYER 1 (EXIT)",
        text: `[EXIT @verify_clearance] Transaction sealed. Returning completed diploma envelope.`,
      });
    }

    setIssuedDiploma({
      id: `DIPLOMA-${candidate.id}-2026`,
      name: candidate.name,
      course: candidate.course,
      grade: candidate.score >= 85 ? "DISTINCTION" : "FIRST_CLASS",
      seal: enableSignature ? sealId : "UNSIGNED",
      txHash: enableBlockchain ? txHash : "UNAUDITED",
    });

    setPipelineLogs(logs);
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
            Topic 5
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Decorators, Generators &amp; Iterators
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Chaining <span className="text-teal-400">Multiple Decorators</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master the mathematical composition of stacked Python decorators: understanding the bottom-up wrapping and top-down onion layer execution flow, avoiding critical security ordering hazards, and chaining with built-in class decorators.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🧅 Onion Layer Execution Model
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚠️ Security Ordering Hazards (Auth vs Cache)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🏛️ @classmethod Stacking Invariants
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔗 Multi-Tier Middleware Pipelines
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: CHAINING ESSENTIALS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🔗</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Mathematics of Decorator Chaining
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              When multiple decorators are stacked above a function, Python applies mathematical function composition:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 not-prose">
              {/* Definition Time */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ Definition Time (Wrapping)</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">f = dec1(dec2(dec3(f)))</code>
                <p className="text-[11px] text-slate-300">
                  Decorators wrap from <strong>BOTTOM to TOP</strong> (innermost closest to the function wraps first).
                </p>
              </div>

              {/* Runtime Invocation */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ Runtime Invocation (Onion Flow)</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">Dec1 → Dec2 → Dec3 → Core → Dec3 → Dec2 → Dec1</code>
                <p className="text-[11px] text-slate-300">
                  Executes from <strong>TOP to BOTTOM</strong> on entry, and bottom-up on return!
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-rose-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Critical Security Hazard: Auth vs Caching
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                If you place <code className="text-rose-400 font-mono">@cache</code> above <code className="text-rose-400 font-mono">@require_auth</code>, an unauthenticated user will receive cached confidential records from previous admin sessions without ever triggering the auth gatekeeper! Always place <strong>Authentication Outermost</strong>.
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
                2. Visualizing Onion Layer Flow &amp; Security Ordering
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("onion")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "onion"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Onion Layer Execution
              </button>
              <button
                onClick={() => setActiveInteractiveTab("security")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "security"
                    ? "bg-rose-900/50 text-rose-300 border border-rose-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Security Ordering Hazard
              </button>
              <button
                onClick={() => setActiveInteractiveTab("classmethod")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "classmethod"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                @classmethod Stacking Rule
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining call flow through nested wrappers, security order implications, and classmethod stacking:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "onion" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">THE DECORATOR ONION LAYER EXECUTION MODEL</text>

                {/* 3 Concentric Onion Blocks */}
                <g transform="translate(30, 50)">
                  {/* Layer 1: Outermost */}
                  <rect x="0" y="0" width="820" height="240" rx="10" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="25" fill="#99f6e4" fontSize="11 font-bold">1. LAYER 1: `@audit_logger` (Runs 1st on Entry ↓, Runs 3rd on Exit ↑)</text>

                  {/* Layer 2: Middle */}
                  <rect x="30" y="45" width="760" height="180" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="50" y="68" fill="#a5f3fc" fontSize="11 font-bold">2. LAYER 2: `@in_memory_cache` (Runs 2nd on Entry ↓, Runs 2nd on Exit ↑)</text>

                  {/* Layer 3: Innermost */}
                  <rect x="60" y="90" width="700" height="120" rx="6" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="80" y="112" fill="#c4b5fd" fontSize="11 font-bold">3. LAYER 3: `@benchmark_timer` (Runs 3rd on Entry ↓, Runs 1st on Exit ↑)</text>

                  {/* Core Function */}
                  <rect x="90" y="130" width="640" height="65" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="110" y="158" fill="#34d399" fontSize="12 font-bold font-mono">CORE FUNCTION: issue_certified_diploma(student_id)</text>
                  <text x="110" y="180" fill="#ecfdf5" fontSize="8 font-mono">Generates core diploma data structure in memory.</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "security" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#f43f5e" fontSize="14" fontWeight="bold">SECURITY ORDERING HAZARD: AUTH BEFORE CACHE VS CACHE BEFORE AUTH</text>

                {/* Left: Insecure Order */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="12" fontWeight="bold">❌ INSECURE ORDER: Cache on Top</text>
                  
                  <text x="20" y="65" fill="#f87171" fontSize="10 font-mono font-bold">@in_memory_cache  # ❌ RUNS 1ST!</text>
                  <text x="20" y="90" fill="#fca5a5" fontSize="10 font-mono">@require_auth     # Runs 2nd</text>
                  <text x="20" y="115" fill="#fca5a5" fontSize="10 font-mono">def get_secret_balance(): ...</text>

                  <rect x="20" y="140" width="340" height="80" rx="4" fill="#881337" stroke="#e11d48" />
                  <text x="30" y="165" fill="#ffe4e6" fontSize="9 font-bold">CRITICAL EXPLOIT:</text>
                  <text x="30" y="185" fill="#ecfdf5" fontSize="8 font-mono">Unauthenticated user gets cached secret</text>
                  <text x="30" y="202" fill="#ecfdf5" fontSize="8 font-mono">WITHOUT EVER CHECKING AUTHENTICATION!</text>
                </g>

                {/* Right: Secure Order */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">✓ SECURE ORDER: Auth on Top</text>
                  
                  <text x="20" y="65" fill="#34d399" fontSize="10 font-mono font-bold">@require_auth     # ✓ RUNS 1ST (GATEKEEPER)</text>
                  <text x="20" y="90" fill="#a7f3d0" fontSize="10 font-mono">@in_memory_cache  # Runs 2nd</text>
                  <text x="20" y="115" fill="#ecfdf5" fontSize="10 font-mono">def get_secret_balance(): ...</text>

                  <rect x="20" y="140" width="340" height="80" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="165" fill="#34d399" fontSize="9 font-bold">TOTAL PROTECTION:</text>
                  <text x="30" y="185" fill="#ecfdf5" fontSize="8 font-mono">Unauthenticated requests are blocked immediately;</text>
                  <text x="30" y="202" fill="#ecfdf5" fontSize="8 font-mono">only verified users can reach the cache.</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">THE `@classmethod` / `@staticmethod` STACKING INVARIANT</text>

                {/* Left: Correct */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">✓ CORRECT: Built-in is Outermost</text>
                  
                  <text x="20" y="65" fill="#34d399" fontSize="10 font-mono font-bold">@classmethod         # MUST BE ON TOP</text>
                  <text x="20" y="90" fill="#ecfdf5" fontSize="10 font-mono">@audit_logger        # Custom decorator</text>
                  <text x="20" y="115" fill="#ecfdf5" fontSize="10 font-mono">def create_batch(cls): ...</text>

                  <rect x="20" y="145" width="340" height="70" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="170" fill="#34d399" fontSize="9 font-bold">Why this works:</text>
                  <text x="30" y="190" fill="#ecfdf5" fontSize="8 font-mono">`@audit_logger` wraps normal function; `@classmethod` binds `cls` descriptor on top.</text>
                </g>

                {/* Right: Incorrect */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="12" fontWeight="bold">❌ INCORRECT: Custom on Top of Built-in</text>
                  
                  <text x="20" y="65" fill="#f87171" fontSize="10 font-mono font-bold">@audit_logger        # ❌ CRASHES!</text>
                  <text x="20" y="90" fill="#fca5a5" fontSize="10 font-mono">@classmethod         # Returns classmethod descriptor</text>
                  <text x="20" y="115" fill="#fca5a5" fontSize="10 font-mono">def create_batch(cls): ...</text>

                  <rect x="20" y="145" width="340" height="70" rx="4" fill="#881337" stroke="#e11d48" />
                  <text x="30" y="170" fill="#ffe4e6" fontSize="9 font-bold">Why this crashes:</text>
                  <text x="30" y="190" fill="#fca5a5" fontSize="8 font-mono">`classmethod` objects are NOT callables in wrapper;</text>
                  <text x="30" y="205" fill="#fca5a5" fontSize="8 font-mono">causes `TypeError: 'classmethod' object is not callable`.</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE DIPLOMA PIPELINE PLAYGROUND */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Degree Certificate Interceptor Pipeline
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Select candidate graduation presets and toggle stacked interceptor layers to trace the complete onion-layer execution pipeline in real time:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Form Controls */}
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold block">
                1. Select Graduation Candidate Preset
              </span>

              {/* Candidate Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  onClick={() => setSelectedCandidateKey("sourav")}
                  className={clsx(
                    "p-2 rounded-lg text-left text-xs font-mono border transition-all",
                    selectedCandidateKey === "sourav"
                      ? "bg-teal-950 border-teal-500 text-teal-200"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  )}
                >
                  <div className="font-bold text-teal-300">Sourav M.</div>
                  <div className="text-[10px] text-emerald-400">Paid | 92.5%</div>
                </button>

                <button
                  onClick={() => setSelectedCandidateKey("priyanka")}
                  className={clsx(
                    "p-2 rounded-lg text-left text-xs font-mono border transition-all",
                    selectedCandidateKey === "priyanka"
                      ? "bg-amber-950 border-amber-500 text-amber-200"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  )}
                >
                  <div className="font-bold text-amber-300">Priyanka S.</div>
                  <div className="text-[10px] text-rose-400">Unpaid | 88.0%</div>
                </button>

                <button
                  onClick={() => setSelectedCandidateKey("rahul")}
                  className={clsx(
                    "p-2 rounded-lg text-left text-xs font-mono border transition-all",
                    selectedCandidateKey === "rahul"
                      ? "bg-rose-950 border-rose-500 text-rose-200"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  )}
                >
                  <div className="font-bold text-rose-300">Rahul V.</div>
                  <div className="text-[10px] text-rose-400">Paid | 52.0%</div>
                </button>
              </div>

              {/* Pipeline Layer Toggles */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block">
                  2. Active Stacked Decorators (Outermost to Innermost):
                </span>
                <div className="flex flex-col gap-1.5 text-xs font-mono text-slate-300">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={enableClearance}
                      onChange={(e) => setEnableClearance(e.target.checked)}
                      className="accent-teal-500 rounded"
                    />
                    <span>Layer 1: @verify_academic_clearance (Outermost Gatekeeper)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={enableSignature}
                      onChange={(e) => setEnableSignature(e.target.checked)}
                      className="accent-cyan-500 rounded"
                    />
                    <span>Layer 2: @apply_digital_signature (QR Watermark)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={enableBlockchain}
                      onChange={(e) => setEnableBlockchain(e.target.checked)}
                      className="accent-purple-500 rounded"
                    />
                    <span>Layer 3: @record_blockchain_audit_hash (SHA-256 Hash)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={enableTimer}
                      onChange={(e) => setEnableTimer(e.target.checked)}
                      className="accent-emerald-500 rounded"
                    />
                    <span>Layer 4: @measure_generation_latency (Innermost Profiler)</span>
                  </label>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleExecutePipeline}
                className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-lg text-xs font-mono transition-all shadow-lg shadow-teal-950/50"
              >
                Execute Stacked Decorator Pipeline
              </button>
            </div>

            {/* Live Pipeline Output */}
            <div className="space-y-4 flex flex-col justify-between">
              {/* Issued Diploma Card */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
                <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  Issued Certified Digital Diploma:
                </div>
                {issuedDiploma ? (
                  <div className="p-3 bg-slate-950 rounded border border-teal-800/80 space-y-1">
                    <div className="text-teal-300 font-bold text-sm">{issuedDiploma.name}</div>
                    <div className="text-slate-300">{issuedDiploma.course} • Grade: <span className="text-emerald-400 font-bold">{issuedDiploma.grade}</span></div>
                    <div className="text-[10px] text-cyan-300">Seal: {issuedDiploma.seal}</div>
                    <div className="text-[10px] text-purple-300 font-mono">Blockchain TX: {issuedDiploma.txHash}</div>
                  </div>
                ) : (
                  <div className="text-slate-500 italic text-[11px]">
                    No certificate issued yet or pipeline blocked by security guard.
                  </div>
                )}
              </div>

              {/* Execution Trace */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex-1 overflow-y-auto max-h-[160px] space-y-1.5 font-mono text-xs">
                <span className="text-slate-400 block font-bold text-[10px] uppercase">
                  Onion Layer Execution Trace:
                </span>
                {pipelineLogs.length === 0 ? (
                  <div className="text-slate-500 italic text-[11px]">
                    Click "Execute Stacked Decorator Pipeline" to run.
                  </div>
                ) : (
                  pipelineLogs.map((log, idx) => (
                    <div
                      key={idx}
                      className={clsx(
                        "p-1.5 rounded text-[11px] leading-relaxed",
                        log.type === "ERROR" && "bg-rose-950/60 border border-rose-800 text-rose-300 font-bold",
                        log.type === "SUCCESS" && "text-emerald-300 font-bold",
                        log.type === "TIMER" && "text-cyan-300 text-[10px]",
                        log.type === "CORE" && "text-purple-300 font-bold",
                        !log.type && "text-slate-400"
                      )}
                    >
                      <span className="text-[9px] text-slate-500 block font-bold">{log.layer}</span>
                      {log.text}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER CHAINING MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Decorator Chaining Order Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Recommended Position</th>
                  <th className="py-3.5 px-4 font-bold">Decorator Concern</th>
                  <th className="py-3.5 px-4 font-bold">Order Rationale</th>
                  <th className="py-3.5 px-4 font-bold">Misordering Consequence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">1. Outermost (Top)</td>
                  <td className="py-3 px-4">Rate Limiting &amp; Auth (@auth)</td>
                  <td className="py-3 px-4">Fails fast before burning system resources</td>
                  <td className="py-3 px-4 text-rose-300">Security breach (Cached data leaked)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">2. Upper-Middle</td>
                  <td className="py-3 px-4">Input Validation &amp; Schema</td>
                  <td className="py-3 px-4">Rejects malformed arguments early</td>
                  <td className="py-3 px-4 text-rose-300">Corrupted database query attempts</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">3. Lower-Middle</td>
                  <td className="py-3 px-4">Response Caching (@lru_cache)</td>
                  <td className="py-3 px-4">Serves cached hits to authenticated users</td>
                  <td className="py-3 px-4 text-rose-300">Unnecessary recalculation</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-emerald-300 font-semibold">4. Innermost (Bottom)</td>
                  <td className="py-3 px-4">Execution Timing (@timer)</td>
                  <td className="py-3 px-4">Measures pure business logic latency</td>
                  <td className="py-3 px-4 text-rose-300">Measuring middleware overhead as app time</td>
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
            Explore 4 production-grade Python scripts demonstrating decorator chaining order, middleware pipelines, classmethod stacking, and diploma generation engines:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "decorator_chaining_wrapping_vs_execution_order.py",
                code: chainingOrder,
                description: "Wrapping order vs runtime onion layer execution flow in stacked decorators.",
              },
              {
                filename: "combining_security_caching_and_logging_pipeline.py",
                code: combinedPipeline,
                description: "Stacked production middleware pipeline with security ordering principles.",
              },
              {
                filename: "class_methods_and_stacked_builtin_decorators.py",
                code: classDecorators,
                description: "Custom decorator chaining with @classmethod, @staticmethod, and @property.",
              },
              {
                filename: "institutional_examination_certificate_generator_pipeline.py",
                code: diplomaPipeline,
                description: "Enterprise Degree & Certificate Generation Interceptor Pipeline with clearance guards.",
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
                <span>❌</span> Trap 1: Insecure Cache Before Auth
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-rose-300 font-mono">@cache @auth def f()</code> allows unauthenticated callers to receive cached data without authentication checks.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Always place <code className="text-emerald-300">@require_auth</code> on the very top!
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: `@classmethod` Underneath Custom Decorator
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-amber-300 font-mono">@custom @classmethod def f()</code> crashes with <code className="text-amber-300 font-mono">TypeError: 'classmethod' object is not callable</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Place <code className="text-emerald-300">@classmethod</code> above all custom decorators.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Broken `__wrapped__` Chain
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                If any intermediate decorator in the chain forgets <code className="text-purple-300 font-mono">@functools.wraps</code>, the metadata inheritance chain is broken.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Apply <code className="text-emerald-300">@functools.wraps(func)</code> at every single layer.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: The 10-Decorator Pyramid
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Stacking 8-10+ disparate decorators makes code unreadable and hard to reason about.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Compose multiple decorators into a single composite decorator.
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
            Comprehensive question-and-answer repository covering decorator chaining, onion layer execution, security ordering, and classmethod stacking:
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
            Download or print the complete reference sheet with onion layer flow models, security ordering rules, and classmethod stacking recipes:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic5_chaining_decorators_notes.txt"
              title="Print Topic 5 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
