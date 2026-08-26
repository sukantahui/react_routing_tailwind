import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import tddCycleCode from "./topic8_files/tdd_red_green_refactor_cycle.py?raw";
import tddIncrementalCode from "./topic8_files/tdd_incremental_feature_development.py?raw";
import tddEdgeCasesCode from "./topic8_files/tdd_edge_cases_and_refactoring.py?raw";
import institutionalTddEngineCode from "./topic8_files/institutional_tdd_admission_engine_case_study.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic8_files/topic8_note.txt?raw";

// FAQ Questions
import questions from "./topic8_files/topic8_questions";

/**
 * Topic8: Introduction to Test-Driven Development (TDD) workflow
 * Module: 004_003_python-testing
 * Segment: 4 (Python Pro Level & Ecosystem Mastery)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic8() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("redGreenCycle");

  // Interactive Laboratory State
  const [activeTddStep, setActiveTddStep] = useState("RED"); // RED | GREEN | REFACTOR

  let statusBadge = "🔴 PHASE 1: RED (Failing Test Specification)";
  let developerObjective = "Write a failing test for a new requirement before implementing code";
  let suiteStatus = "FAILED: AssertionError: Expected Rs. 16,000, got None";

  if (activeTddStep === "RED") {
    statusBadge = "🔴 PHASE 1: RED (Failing Specification)";
    developerObjective = "Write a clear failing test verifying admission waiver calculation for Mamata";
    suiteStatus = "FAILED: AssertionError / NameError (No production code yet!)";
  } else if (activeTddStep === "GREEN") {
    statusBadge = "🟢 PHASE 2: GREEN (Minimum Viable Implementation)";
    developerObjective = "Write the simplest possible code to pass the test without over-engineering";
    suiteStatus = "PASSED: calculate_waiver(95.0, 20000.0) == 16000.0 ✅";
  } else if (activeTddStep === "REFACTOR") {
    statusBadge = "🔵 PHASE 3: REFACTOR (Design Optimization)";
    developerObjective = "Clean up code duplication, extract regional constants, and add type hints";
    suiteStatus = "PASSED: 100% Green Suite protecting clean refactored architecture ✅";
  }

  const generatedPythonSnippet = `# Test-Driven Development (TDD) - Phase: ${activeTddStep}
# Target: Mamata Admission Waiver Calculation (Barrackpore Campus)

${
  activeTddStep === "RED"
    ? `# 🔴 STEP 1: Write the failing test FIRST!
def test_mamata_top_merit_waiver():
    # Production function 'calculate_waiver' does NOT exist yet!
    result = calculate_waiver(score=95.0, base_fee=20000.0)
    assert result == 16000.0  # 20% merit discount applied

# CLI Execution:
# > pytest test_waiver.py
# FAILED: NameError: name 'calculate_waiver' is not defined`
    : activeTddStep === "GREEN"
    ? `# 🟢 STEP 2: Write the MINIMUM code to turn the test green!
def calculate_waiver(score: float, base_fee: float) -> float:
    if score >= 90.0:
        return base_fee * 0.80  # Minimum direct code
    return base_fee

def test_mamata_top_merit_waiver():
    assert calculate_waiver(95.0, 20000.0) == 16000.0

# CLI Execution:
# > pytest test_waiver.py
# 1 passed in 0.01s (GREEN!)`
    : `# 🔵 STEP 3: REFACTOR cleanly with guard clauses, constants & type hints!
from typing import Final

TOP_MERIT_THRESHOLD: Final[float] = 90.0
TOP_MERIT_DISCOUNT_PCT: Final[float] = 0.20

def calculate_waiver(score: float, base_fee: float) -> float:
    """Calculates final net tuition after applying institutional merit rules."""
    if base_fee <= 0:
        raise ValueError("Base tuition fee must be positive.")
    if not (0.0 <= score <= 100.0):
        raise ValueError(f"Score {score} outside valid bracket [0, 100].")

    discount_rate = TOP_MERIT_DISCOUNT_PCT if score >= TOP_MERIT_THRESHOLD else 0.0
    return round(base_fee * (1.0 - discount_rate), 2)

# Existing test suite proves refactored code has ZERO regressions!
def test_mamata_top_merit_waiver():
    assert calculate_waiver(95.0, 20000.0) == 16000.0`
}`;

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
            Segment 4 • Module 004_003
          </span>
          <span className="text-xs sm:text-sm font-mono bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/80 shadow-sm shadow-cyan-950/50">
            Topic 8
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Automated Testing, PyTest &amp; Quality Assurance
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Test-Driven Development (<span className="text-teal-400">TDD</span>) Workflow
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master the disciplined engineering methodology of Test-Driven Development: the <span className="text-rose-400 font-bold">Red</span>-<span className="text-emerald-400 font-bold">Green</span>-<span className="text-blue-400 font-bold">Refactor</span> micro-cycle, Uncle Bob's Three Laws of TDD, incremental baby-step design, driving modular domain models from executable specifications, and eliminating over-engineering with YAGNI principles.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔴 Red: Failing Test First
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🟢 Green: Minimum Code to Pass
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔵 Refactor: Safe Cleanup
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📜 The Three Laws of TDD
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: ARCHITECTURAL PILLARS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🏛️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Test-Driven Development Philosophy
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              TDD is primarily a <strong>software design methodology</strong> disguised as a testing practice. By forcing developers to write the test specification before implementing production code, TDD guarantees modular, loosely coupled, and highly testable APIs while catching defects within seconds of inception:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/60 shadow-lg">
                <div className="text-rose-400 font-bold text-sm mb-1">1️⃣ Phase 1: 🔴 RED</div>
                <code className="text-xs font-mono text-rose-300 block mb-1">Write Failing Test</code>
                <p className="text-[11px] text-slate-300">
                  Write a small unit test for the next requirement. Run the test to prove it fails for the expected reason.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 shadow-lg">
                <div className="text-emerald-400 font-bold text-sm mb-1">2️⃣ Phase 2: 🟢 GREEN</div>
                <code className="text-xs font-mono text-emerald-300 block mb-1">Minimum Code</code>
                <p className="text-[11px] text-slate-300">
                  Write the simplest possible production code to turn the failing test green without speculative features.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">3️⃣ Phase 3: 🔵 REFACTOR</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">Clean &amp; Optimize</code>
                <p className="text-[11px] text-slate-300">
                  Clean up duplication, improve naming, and optimize performance under the protection of passing tests.
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">4️⃣ Uncle Bob's 3 Laws</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">Micro-Step Discipline</code>
                <p className="text-[11px] text-slate-300">
                  Strict baby-step rhythm: no production code without a failing test, and only enough code to pass.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                TDD vs Test-Last (Retrospective Testing)
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                Writing tests <span className="text-rose-400 font-bold">after writing code</span> often results in monolithic, tightly coupled functions that are difficult to isolate. Writing tests <span className="text-emerald-400 font-bold">first</span> forces developers to design caller-friendly APIs, modular interfaces, and boundary-checked contracts from line one.
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
                2. Visualizing the Red-Green-Refactor Cycle &amp; Defect Economics
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("redGreenCycle")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "redGreenCycle"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Red-Green-Refactor Loop
              </button>
              <button
                onClick={() => setActiveInteractiveTab("babySteps")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "babySteps"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Baby Steps Progression
              </button>
              <button
                onClick={() => setActiveInteractiveTab("defectEconomics")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "defectEconomics"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Defect Cost Curve
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining the continuous feedback micro-cycle, baby-step algorithmic expansion, and defect mitigation ROI:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "redGreenCycle" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">
                  THE TDD CONTINUOUS FEEDBACK LOOP: RED ➔ GREEN ➔ REFACTOR
                </text>

                {/* Circular Cycle */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#0f172a" stroke="#14b8a6" />

                  {/* 1. RED */}
                  <rect x="35" y="45" width="225" height="150" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="45" y="70" fill="#fda4af" fontSize="13" fontWeight="bold">🔴 1. RED PHASE</text>
                  <text x="45" y="90" fill="#fecdd3" fontSize="9" fontFamily="monospace">Write failing test</text>
                  <text x="45" y="110" fill="#ffe4e6" fontSize="8">• Define new requirement</text>
                  <text x="45" y="125" fill="#ffe4e6" fontSize="8">• Assert expected outcome</text>
                  <text x="45" y="140" fill="#ffe4e6" fontSize="8">• Prove test fails (RED)</text>
                  <text x="45" y="175" fill="#fda4af" fontSize="8" fontWeight="bold">Target: Detect Defect</text>

                  {/* Arrow 1 */}
                  <path d="M 265 120 L 295 120" stroke="#14b8a6" strokeWidth="3" markerEnd="url(#arrow)" />

                  {/* 2. GREEN */}
                  <rect x="300" y="45" width="225" height="150" rx="8" fill="#022c22" stroke="#10b981" />
                  <text x="310" y="70" fill="#a7f3d0" fontSize="13" fontWeight="bold">🟢 2. GREEN PHASE</text>
                  <text x="310" y="90" fill="#d1fae5" fontSize="9" fontFamily="monospace">Minimum code to pass</text>
                  <text x="310" y="110" fill="#ccfbf1" fontSize="8">• Quickest working solution</text>
                  <text x="310" y="125" fill="#ccfbf1" fontSize="8">• No premature optimization</text>
                  <text x="310" y="140" fill="#ccfbf1" fontSize="8">• Turn suite green (GREEN)</text>
                  <text x="310" y="175" fill="#86efac" fontSize="8" fontWeight="bold">Target: Turn Green</text>

                  {/* Arrow 2 */}
                  <path d="M 530 120 L 560 120" stroke="#14b8a6" strokeWidth="3" markerEnd="url(#arrow)" />

                  {/* 3. REFACTOR */}
                  <rect x="565" y="45" width="220" height="150" rx="8" fill="#0c4a6e" stroke="#38bdf8" />
                  <text x="575" y="70" fill="#e0f2fe" fontSize="13" fontWeight="bold">🔵 3. REFACTOR PHASE</text>
                  <text x="575" y="90" fill="#bae6fd" fontSize="9" fontFamily="monospace">Clean design &amp; speed</text>
                  <text x="575" y="110" fill="#e0f2fe" fontSize="8">• Eliminate duplication</text>
                  <text x="575" y="125" fill="#e0f2fe" fontSize="8">• Improve variable names</text>
                  <text x="575" y="140" fill="#e0f2fe" fontSize="8">• Tests remain 100% GREEN</text>
                  <text x="575" y="175" fill="#38bdf8" fontSize="8" fontWeight="bold">Target: Clean Quality</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "babySteps" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">
                  TDD BABY STEPS: INCREMENTAL ALGORITHMIC EVOLUTION (GPA CALCULATOR)
                </text>

                {/* Baby Steps Grid */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#082f49" stroke="#0ea5e9" />

                  {/* Step 1 */}
                  <rect x="25" y="40" width="180" height="160" rx="6" fill="#0369a1" stroke="#38bdf8" />
                  <text x="35" y="65" fill="#ffffff" fontSize="11" fontWeight="bold">Step 1: Empty List</text>
                  <text x="35" y="85" fill="#e0f2fe" fontSize="8" fontFamily="monospace">assert calc([]) == 0.0</text>
                  <rect x="35" y="95" width="160" height="40" rx="4" fill="#0c4a6e" />
                  <text x="45" y="115" fill="#86efac" fontSize="8" fontFamily="monospace">if not marks: return 0.0</text>
                  <text x="35" y="175" fill="#facc15" fontSize="8" fontWeight="bold">Trivial Base Case</text>

                  {/* Step 2 */}
                  <rect x="220" y="40" width="180" height="160" rx="6" fill="#0369a1" stroke="#38bdf8" />
                  <text x="230" y="65" fill="#ffffff" fontSize="11" fontWeight="bold">Step 2: Single Mark</text>
                  <text x="230" y="85" fill="#e0f2fe" fontSize="8" fontFamily="monospace">assert calc([90]) == 90.0</text>
                  <rect x="230" y="95" width="160" height="40" rx="4" fill="#0c4a6e" />
                  <text x="240" y="115" fill="#86efac" fontSize="8" fontFamily="monospace">return marks[0]</text>
                  <text x="230" y="175" fill="#facc15" fontSize="8" fontWeight="bold">Single Item Case</text>

                  {/* Step 3 */}
                  <rect x="415" y="40" width="185" height="160" rx="6" fill="#0369a1" stroke="#38bdf8" />
                  <text x="425" y="65" fill="#ffffff" fontSize="11" fontWeight="bold">Step 3: Multi-Courses</text>
                  <text x="425" y="85" fill="#e0f2fe" fontSize="8" fontFamily="monospace">assert calc([80, 100]) == 90</text>
                  <rect x="425" y="95" width="165" height="40" rx="4" fill="#0c4a6e" />
                  <text x="435" y="115" fill="#86efac" fontSize="8" fontFamily="monospace">return sum(m) / len(m)</text>
                  <text x="425" y="175" fill="#facc15" fontSize="8" fontWeight="bold">General Algorithm</text>

                  {/* Step 4 */}
                  <rect x="615" y="40" width="180" height="160" rx="6" fill="#042f2e" stroke="#2dd4bf" />
                  <text x="625" y="65" fill="#5eead4" fontSize="11" fontWeight="bold">Step 4: Guards &amp; Edge</text>
                  <text x="625" y="85" fill="#ccfbf1" fontSize="8" fontFamily="monospace">assert raises(ValueError)</text>
                  <rect x="625" y="95" width="160" height="40" rx="4" fill="#134e4a" />
                  <text x="635" y="115" fill="#86efac" fontSize="8" fontFamily="monospace">if score &lt; 0: raise Err</text>
                  <text x="625" y="175" fill="#86efac" fontSize="8" fontWeight="bold">Production Hardened</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">
                  DEFECT DETECTION TIMELINE: TDD (SECONDS) VS PRODUCTION (WEEKS/MONTHS)
                </text>

                {/* Defect Cost Curve */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#1e1b4b" stroke="#a855f7" />

                  {/* Stage 1: TDD Coding Phase */}
                  <rect x="25" y="45" width="240" height="170" rx="6" fill="#042f2e" stroke="#2dd4bf" />
                  <text x="35" y="70" fill="#5eead4" fontSize="12" fontWeight="bold">1. TDD Workstation (Seconds)</text>
                  <text x="35" y="95" fill="#ccfbf1" fontSize="9">Time to catch bug: ~5 Seconds</text>
                  <text x="35" y="115" fill="#86efac" fontSize="9" fontWeight="bold">Cost to fix: $1 (Instant)</text>
                  <text x="35" y="145" fill="#a7f3d0" fontSize="8">• Caught by failing unit test</text>
                  <text x="35" y="160" fill="#a7f3d0" fontSize="8">• Fixed immediately in code editor</text>
                  <text x="35" y="195" fill="#86efac" fontSize="8" fontWeight="bold">✅ Zero Customer Impact</text>

                  {/* Stage 2: CI/CD Build */}
                  <rect x="290" y="45" width="240" height="170" rx="6" fill="#0c4a6e" stroke="#38bdf8" />
                  <text x="300" y="70" fill="#e0f2fe" fontSize="12" fontWeight="bold">2. CI Pipeline (Minutes)</text>
                  <text x="300" y="95" fill="#bae6fd" fontSize="9">Time to catch bug: ~5 Minutes</text>
                  <text x="300" y="115" fill="#fde047" fontSize="9" fontWeight="bold">Cost to fix: $10 (Minor)</text>
                  <text x="300" y="145" fill="#e0f2fe" fontSize="8">• Caught by GitHub Actions</text>
                  <text x="300" y="160" fill="#e0f2fe" fontSize="8">• Blocks pull request merge</text>
                  <text x="300" y="195" fill="#fde047" fontSize="8" fontWeight="bold">⚠️ Minor Dev Interruption</text>

                  {/* Stage 3: Production */}
                  <rect x="555" y="45" width="240" height="170" rx="6" fill="#4c0519" stroke="#f43f5e" />
                  <text x="565" y="70" fill="#fda4af" fontSize="12" fontWeight="bold">3. Production (Months)</text>
                  <text x="565" y="95" fill="#fecdd3" fontSize="9">Time to catch bug: ~30 Days</text>
                  <text x="565" y="115" fill="#fb7185" fontSize="9" fontWeight="bold">Cost to fix: $1000+ (Critical)</text>
                  <text x="565" y="145" fill="#ffe4e6" fontSize="8">• Customer escalations &amp; data corruption</text>
                  <text x="565" y="160" fill="#ffe4e6" fontSize="8">• Emergency hotfixes &amp; downtime</text>
                  <text x="565" y="195" fill="#fb7185" fontSize="8" fontWeight="bold">💥 Catastrophic Business Cost</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE TDD SIMULATOR */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧪</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive TDD Step-by-Step Cycle Simulator
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Walk through the Red, Green, and Refactor phases of implementing an institutional admission fee discount algorithm:
          </p>

          <div className="bg-slate-950 p-5 sm:p-6 rounded-xl border border-slate-800/90 space-y-6">
            {/* Phase Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Select Active TDD Phase:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "RED", label: "Phase 1: 🔴 RED", tag: "Failing Test Spec" },
                  { id: "GREEN", label: "Phase 2: 🟢 GREEN", tag: "Minimum Working Code" },
                  { id: "REFACTOR", label: "Phase 3: 🔵 REFACTOR", tag: "Clean Architecture" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTddStep(item.id)}
                    className={clsx(
                      "p-3 rounded-xl border text-left transition-all",
                      activeTddStep === item.id
                        ? item.id === "RED"
                          ? "bg-rose-950/60 border-rose-500 shadow-md shadow-rose-950/50"
                          : item.id === "GREEN"
                          ? "bg-emerald-950/60 border-emerald-500 shadow-md shadow-emerald-950/50"
                          : "bg-cyan-950/60 border-cyan-500 shadow-md shadow-cyan-950/50"
                        : "bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400"
                    )}
                  >
                    <div className="text-xs sm:text-sm font-bold text-slate-200">{item.label}</div>
                    <div className="text-[11px] text-teal-400 font-mono mt-0.5">{item.tag}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Metrics Dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-900/90 p-4 rounded-xl border border-teal-900/50">
                <div className="text-xs text-teal-400 font-medium mb-1">Current TDD Stage</div>
                <div className="text-xs font-bold font-mono text-teal-300 mt-1 leading-snug">
                  {statusBadge}
                </div>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-cyan-900/50">
                <div className="text-xs text-cyan-400 font-medium mb-1">Developer Goal</div>
                <div className="text-xs font-bold text-cyan-300 mt-1 leading-snug">
                  {developerObjective}
                </div>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-purple-900/50">
                <div className="text-xs text-purple-400 font-medium mb-1">Test Runner State</div>
                <div className="text-xs font-bold font-mono text-purple-300 mt-1 leading-snug">
                  {suiteStatus}
                </div>
              </div>
            </div>

            {/* Generated Dynamic Code */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                TDD Source Artifacts at Current Step:
              </div>
              <pre className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl text-xs sm:text-sm font-mono text-teal-200 overflow-x-auto leading-relaxed">
                {generatedPythonSnippet}
              </pre>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: DEEP DIVE CODE LABS (PYTHON FILE LOADERS) */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">💻</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Production Code Labs &amp; TDD Suites
            </h2>
          </div>

          <p className="text-slate-300 mb-8 text-base leading-relaxed">
            Inspect, run, and master all four production-grade TDD suites covering Red-Green-Refactor cycles, baby-step incremental features, edge-case specifications, and the complete institutional admission engine:
          </p>

          <div className="space-y-10">
            {/* Python Loader 1 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-teal-300">
                  Lab 1: Red-Green-Refactor Cycle (Student GPA Calculator)
                </h3>
                <p className="text-sm text-slate-400">
                  Step-by-step TDD progression from empty list handling (Red) to arithmetic mean calculation (Green) and defensive guard refactoring (Refactor).
                </p>
              </div>
              <PythonFileLoader
                fileModule={tddCycleCode}
                title="tdd_red_green_refactor_cycle.py"
                highlightLines={[15, 23, 44, 58]}
              />
            </div>

            {/* Python Loader 2 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-cyan-300">
                  Lab 2: Incremental Baby-Step Feature Expansion from User Stories
                </h3>
                <p className="text-sm text-slate-400">
                  Implementing admission fees, merit scholarships, and stacked Barrackpore regional grants incrementally one story at a time.
                </p>
              </div>
              <PythonFileLoader
                fileModule={tddIncrementalCode}
                title="tdd_incremental_feature_development.py"
                highlightLines={[19, 34, 40, 47]}
              />
            </div>

            {/* Python Loader 3 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-purple-300">
                  Lab 3: Test-First Boundary &amp; Edge Case Specifications
                </h3>
                <p className="text-sm text-slate-400">
                  Specifying registration token formatting, whitespace trimming, and sequence number overflow exceptions before implementing code.
                </p>
              </div>
              <PythonFileLoader
                fileModule={tddEdgeCasesCode}
                title="tdd_edge_cases_and_refactoring.py"
                highlightLines={[12, 23, 29, 35]}
              />
            </div>

            {/* Python Loader 4 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-amber-300">
                  Lab 4: Institutional Admission &amp; Transcript Engine (100% TDD Case Study)
                </h3>
                <p className="text-sm text-slate-400">
                  Comprehensive multi-campus engine designed 100% via TDD, managing student enrollment, grade submission, and distinction honors across Mamata and Mahima.
                </p>
              </div>
              <PythonFileLoader
                fileModule={institutionalTddEngineCode}
                title="institutional_tdd_admission_engine_case_study.py"
                highlightLines={[17, 36, 42, 69]}
              />
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 5: COMMON PITFALLS & ANTI-PATTERNS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚠️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              5. TDD Pitfalls &amp; Anti-Patterns
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pitfall 1 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                1. Writing Code Before a Failing Test
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Writing production code before having a failing test violates Law 1 of TDD, creating untestable code and missing the design feedback of test-first.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # ANTI-PATTERN: Implement engine &rarr; write test later{'\n'}
                # BEST PRACTICE: Write failing test &rarr; write code to pass
              </pre>
            </div>

            {/* Pitfall 2 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                2. Skipping the REFACTOR Phase
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Stopping as soon as tests turn green without cleaning duplication and naming creates accumulated technical debt and messy codebases.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # ANTI-PATTERN: Red &rarr; Green &rarr; Red &rarr; Green{'\n'}
                # BEST PRACTICE: Red &rarr; Green &rarr; Refactor &rarr; Red &rarr; Green
              </pre>
            </div>

            {/* Pitfall 3 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                3. Taking Giant Leaps (Skipping Baby Steps)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Writing massive, 50-line unit tests that try to test an entire subsystem at once causes debugging paralysis when tests fail.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # ANTI-PATTERN: Testing 10 interacting features in 1 test{'\n'}
                # BEST PRACTICE: Test 0 cases &rarr; 1 case &rarr; multiple &rarr; edge
              </pre>
            </div>

            {/* Pitfall 4 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                4. Testing Implementation Details Instead of Behavior
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Asserting on internal private variables (<code className="text-rose-400 font-mono">engine._temp_cache</code>) makes tests brittle during internal refactorings.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # ANTI-PATTERN: assert obj._internal_counter == 1{'\n'}
                # BEST PRACTICE: assert obj.get_public_status() == "ACTIVE"
              </pre>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 6: BEST PRACTICES CHECKLIST */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">✅</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              6. Professional TDD Checklist
            </h2>
          </div>

          <div className="space-y-3 text-slate-300 text-sm sm:text-base">
            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Verify the Red Failure:</strong> Ensure the test fails for the expected reason before writing production code.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Write the Minimum Code:</strong> Implement only what is required to pass the currently failing test (YAGNI).
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Refactor on Green Only:</strong> Clean code, remove duplication, and optimize design while all tests remain green.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Treat Tests as Living Specifications:</strong> Write self-documenting tests that clearly describe business behavior to future maintainers.
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQS */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <FAQTemplate
            title="Test-Driven Development (TDD) FAQs"
            questions={questions}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: PLAIN TEXT PRINT & DOWNLOAD NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <PlainTextPrint
            content={noteText}
            title="Topic 8: Test-Driven Development (TDD) Study Note"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Study Note"
            downloadFileName="topic8_note.txt"
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 9: TEACHER'S NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <Teacher
            note={
              "Test-Driven Development transforms coding from an anxious guesswork process into a calm, confident engineering discipline. When building mission-critical student admission, fee waiver, and transcript generation engines across Barrackpore, Kolkata, Ichapur, and Jadavpur, writing our tests first for Mamata, Mahima, Abhronila, Susmita, and Debangshu ensures our API design is intuitive, our edge cases are covered from day one, and our code is refactored cleanly under the protection of a 100% green test harness."
            }
          />
        </section>

      </div>
    </div>
  );
}
