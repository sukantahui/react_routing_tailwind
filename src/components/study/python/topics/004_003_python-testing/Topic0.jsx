import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import manualTestCode from "./topic0_files/manual_testing_fragility.py?raw";
import regressionCode from "./topic0_files/regression_detection_suite.py?raw";
import aaaPatternCode from "./topic0_files/assertion_contract_verification.py?raw";
import gradingSuiteCode from "./topic0_files/institutional_grade_testing_case.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic0_files/topic0_note.txt?raw";

// FAQ Questions
import questions from "./topic0_files/topic0_questions";

/**
 * Topic0: Why automated testing is mandatory for professional software
 * Module: 004_003_python-testing
 * Segment: 4 (Python Pro Level & Ecosystem Mastery)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic0() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("defectCurve");

  // Interactive Laboratory State
  const [simulatedBugState, setSimulatedBugState] = useState("CLEAN"); // CLEAN | BUGGY_OFF_BY_ONE | BUGGY_NEGATIVE_FEE
  const [testSuiteRan, setTestSuiteRan] = useState(false);

  // Computed results for interactive test runner
  let passedCount = 5;
  let failedCount = 0;
  let testStatusMessage = "All 5 automated test contracts passed with zero regressions!";

  if (simulatedBugState === "BUGGY_OFF_BY_ONE") {
    passedCount = 4;
    failedCount = 1;
    testStatusMessage = "REGRESSION CAUGHT: Boundary test failed! Student with score 90.0 missed top scholarship!";
  } else if (simulatedBugState === "BUGGY_NEGATIVE_FEE") {
    passedCount = 3;
    failedCount = 2;
    testStatusMessage = "CRITICAL FAILURE: Invalid negative fee did not raise ValueError contract!";
  }

  const generatedPythonSnippet = `# Automated Testing Verification Contract
# System State: ${simulatedBugState}

def calculate_scholarship(score: float, income: float) -> float:
${
  simulatedBugState === "CLEAN"
    ? `    if score &ge; 90.0:  # Clean boundary check
        return 5000.0
    elif score >= 75.0 and income &le; 300000.0:
        return 3000.0
    return 0.0`
    : simulatedBugState === "BUGGY_OFF_BY_ONE"
    ? `    if score > 90.0:   # ⚠️ BUG: Off-by-one! Fails for exact score of 90.0!
        return 5000.0
    elif score &ge; 75.0 and income <= 300000.0:
        return 3000.0
    return 0.0`
    : `    if score >= 90.0:
        return 5000.0
    # ⚠️ BUG: Missing validation contract for negative income/fee!
    return 0.0`
}

# --- AUTOMATED ASSERTION CONTRACT SUITE ---
def test_scholarship_boundaries():
    assert calculate_scholarship(95.0, 500000.0) == 5000.0, "Mamata top tier failed"
    assert calculate_scholarship(90.0, 400000.0) == 5000.0, "Mahima exact boundary 90.0 failed"
    assert calculate_scholarship(80.0, 250000.0) == 3000.0, "Abhronila middle tier failed"
    assert calculate_scholarship(75.0, 280000.0) == 3000.0, "Debangshu exact boundary 75.0 failed"
    print("✅ All test assertions verified successfully!")`;

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
            Topic 0
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Automated Testing, PyTest &amp; Quality Assurance
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Why Automated Testing is <span className="text-teal-400">Mandatory</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Discover why automated software testing is the bedrock of professional engineering: understanding the exponential cost-of-defect curve, replacing error-prone manual <code className="text-rose-400 font-mono">print()</code> debugging with deterministic assertion contracts, building permanent regression shields, structuring tests with the Arrange-Act-Assert (AAA) pattern, and automating quality gates in CI/CD pipelines.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ Regression Prevention
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ Sub-Second Verification
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📐 AAA Pattern (Arrange, Act, Assert)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🚀 CI/CD Quality Gates
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
              1. The Economics &amp; Foundations of Automated Testing
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              In amateur software projects, developers test by running code and visually scanning terminal <code className="text-rose-400 font-mono">print()</code> outputs. In enterprise systems, this approach quickly collapses under codebase size. Automated testing transforms software quality from a hope into an enforceable mathematical guarantee:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ Defect Economics</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">Exponential Cost Curve</code>
                <p className="text-[11px] text-slate-300">
                  Catching bugs at dev time takes seconds; in production, bugs trigger data corruption, financial loss, and emergency downtime.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ Regression Shield</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">Zero Breakage Guarantee</code>
                <p className="text-[11px] text-slate-300">
                  Enables fearless refactoring and performance optimization by immediately alerting when previously working features break.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ Living Documentation</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">Executable Specs</code>
                <p className="text-[11px] text-slate-300">
                  Tests clearly demonstrate required inputs, boundary edge cases, and expected outputs in actual code that never goes obsolete.
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 shadow-lg">
                <div className="text-amber-400 font-bold text-sm mb-1">4️⃣ Continuous Quality</div>
                <code className="text-xs font-mono text-amber-300 block mb-1">CI/CD Quality Gates</code>
                <p className="text-[11px] text-slate-300">
                  Automated test suites run on every Git pull request, physically blocking buggy code from being merged or deployed.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The AAA Pattern: Arrange, Act, Assert
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                Professional tests follow the <span className="text-teal-300 font-bold">AAA Pattern</span>:
                1. <span className="text-teal-300">Arrange</span> (prepare inputs, fixtures, accounts) ➔ 
                2. <span className="text-cyan-300">Act</span> (invoke target function or method) ➔ 
                3. <span className="text-emerald-400">Assert</span> (validate actual output against expected contract).
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
                2. Visualizing Defect Curves, Regression Shields &amp; AAA Pipelines
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("defectCurve")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "defectCurve"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              &gt;
                Cost of Defect Curve
              </button>
              <button
                onClick={() => setActiveInteractiveTab("regressionShield")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "regressionShield"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              &gt;
                Regression Shield Workflow
              </button>
              <button
                onClick={() => setActiveInteractiveTab("aaaPipeline")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "aaaPipeline"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              &gt;
                AAA Test Pipeline
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Exploring the economics of software bugs, regression feedback loops, and structured assertion execution:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "defectCurve" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">
                  THE DEFECT COST CURVE: CATCHING BUGS AT DEVELOPMENT VS IN PRODUCTION
                </text>

                {/* Left: Cost Bar Stages */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#0f172a" stroke="#14b8a6" />
                  
                  {/* Dev Stage */}
                  <rect x="30" y="160" width="160" height="60" rx="4" fill="#064e3b" stroke="#10b981" />
                  <text x="40" y="185" fill="#a7f3d0" fontSize="11" fontWeight="bold">1. Development</text>
                  <text x="40" y="202" fill="#d1fae5" fontSize="10">Cost: ~1x (Seconds)</text>
                  <text x="40" y="215" fill="#6ee7b7" fontSize="8">Fixed during typing</text>

                  {/* Staging Stage */}
                  <rect x="230" y="120" width="160" height="100" rx="4" fill="#1e3a8a" stroke="#3b82f6" />
                  <text x="240" y="145" fill="#bfdbfe" fontSize="11" fontWeight="bold">2. CI / Staging</text>
                  <text x="240" y="165" fill="#dbeafe" fontSize="10">Cost: ~10x (Hours)</text>
                  <text x="240" y="180" fill="#93c5fd" fontSize="8">Blocked by test gate</text>

                  {/* QA Stage */}
                  <rect x="430" y="80" width="160" height="140" rx="4" fill="#78350f" stroke="#f59e0b" />
                  <text x="440" y="105" fill="#fde68a" fontSize="11" fontWeight="bold">3. QA Testing</text>
                  <text x="440" y="125" fill="#fef3c7" fontSize="10">Cost: ~30x (Days)</text>
                  <text x="440" y="140" fill="#fcd34d" fontSize="8">Manual bug triage</text>

                  {/* Production Stage */}
                  <rect x="630" y="30" width="160" height="190" rx="4" fill="#881337" stroke="#f43f5e" />
                  <text x="640" y="55" fill="#fecdd3" fontSize="11" fontWeight="bold">4. Production</text>
                  <text x="640" y="75" fill="#ffe4e6" fontSize="11" fontWeight="bold">Cost: 100x - 1000x!</text>
                  <text x="640" y="95" fill="#fda4af" fontSize="9">Data corruption,</text>
                  <text x="640" y="110" fill="#fda4af" fontSize="9">Financial lawsuits,</text>
                  <text x="640" y="125" fill="#fda4af" fontSize="9">Emergency hotfix</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "regressionShield" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">
                  REGRESSION SHIELD: HOW AUTOMATED TESTS PROTECT REFACTORED CODE
                </text>

                {/* Workflow Cards */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#082f49" stroke="#0ea5e9" />

                  {/* Step 1 */}
                  <rect x="30" y="50" width="220" height="130" rx="6" fill="#0c4a6e" stroke="#38bdf8" />
                  <text x="45" y="75" fill="#e0f2fe" fontSize="11" fontWeight="bold">1. Existing Features</text>
                  <text x="45" y="98" fill="#bae6fd" fontSize="9" fontFamily="monospace">Scholarship Rules v1</text>
                  <text x="45" y="116" fill="#bae6fd" fontSize="9" fontFamily="monospace">Passing 100% Tests</text>
                  <text x="45" y="145" fill="#86efac" fontSize="9" fontWeight="bold">🛡️ Baseline Protected</text>

                  {/* Step 2 */}
                  <rect x="290" y="50" width="240" height="130" rx="6" fill="#4c0519" stroke="#f43f5e" />
                  <text x="305" y="75" fill="#ffe4e6" fontSize="11" fontWeight="bold">2. Developer Modifies Code</text>
                  <text x="305" y="98" fill="#fecdd3" fontSize="9" fontFamily="monospace">Refactors logic to v2</text>
                  <text x="305" y="116" fill="#fecdd3" fontSize="9" fontFamily="monospace">Accidentally uses '&gt;'</text>
                  <text x="305" y="145" fill="#fca5a5" fontSize="9" fontWeight="bold">⚠️ Silent boundary bug!</text>

                  {/* Step 3 */}
                  <rect x="570" y="50" width="220" height="130" rx="6" fill="#064e3b" stroke="#34d399" />
                  <text x="585" y="75" fill="#d1fae5" fontSize="11" fontWeight="bold">3. Instant CI Catch</text>
                  <text x="585" y="98" fill="#a7f3d0" fontSize="9" fontFamily="monospace">pytest detects fail</text>
                  <text x="585" y="116" fill="#a7f3d0" fontSize="9" fontFamily="monospace">Mahima 90.0 score</text>
                  <text x="585" y="145" fill="#fde047" fontSize="9" fontWeight="bold">🚀 Bug caught in 0.05s!</text>

                  {/* Bottom Text */}
                  <rect x="30" y="195" width="760" height="35" rx="4" fill="#0c4a6e" stroke="#0284c7" />
                  <text x="45" y="217" fill="#e0f2fe" fontSize="10">
                    💡 Result: The developer fixes the bug in seconds before any code is committed or deployed!
                  </text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">
                  THE AAA PATTERN: ARRANGE ➔ ACT ➔ ASSERT IN ACTION
                </text>

                {/* Main AAA Flow */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#1e1b4b" stroke="#a855f7" />

                  {/* Box 1: Arrange */}
                  <rect x="30" y="50" width="230" height="130" rx="6" fill="#3b0764" stroke="#c084fc" />
                  <text x="45" y="75" fill="#f3e8ff" fontSize="12" fontWeight="bold">1. ARRANGE</text>
                  <text x="45" y="98" fill="#d8b4fe" fontSize="9" fontFamily="monospace">sid = "STU_BP_001"</text>
                  <text x="45" y="116" fill="#d8b4fe" fontSize="9" fontFamily="monospace">acc = StudentAccount(sid)</text>
                  <text x="45" y="145" fill="#fbcfe8" fontSize="9">Prepare test fixtures</text>

                  {/* Box 2: Act */}
                  <rect x="295" y="50" width="230" height="130" rx="6" fill="#1e293b" stroke="#60a5fa" />
                  <text x="310" y="75" fill="#e0f2fe" fontSize="12" fontWeight="bold">2. ACT</text>
                  <text x="310" y="98" fill="#93c5fd" fontSize="9" fontFamily="monospace">acc.deposit(1500.0)</text>
                  <text x="310" y="116" fill="#93c5fd" fontSize="9" fontFamily="monospace">acc.charge_fee(500.0)</text>
                  <text x="310" y="145" fill="#bfdbfe" fontSize="9">Execute target logic</text>

                  {/* Box 3: Assert */}
                  <rect x="560" y="50" width="230" height="130" rx="6" fill="#064e3b" stroke="#34d399" />
                  <text x="575" y="75" fill="#d1fae5" fontSize="12" fontWeight="bold">3. ASSERT</text>
                  <text x="575" y="98" fill="#a7f3d0" fontSize="9" fontFamily="monospace">assert acc.balance == 1000</text>
                  <text x="575" y="116" fill="#a7f3d0" fontSize="9" fontFamily="monospace">assert len(acc.tx) == 2</text>
                  <text x="575" y="145" fill="#86efac" fontSize="9">Verify invariant contract</text>

                  {/* Bottom Banner */}
                  <rect x="30" y="195" width="760" height="35" rx="4" fill="#0f172a" stroke="#a855f7" />
                  <text x="45" y="217" fill="#e9d5ff" fontSize="10">
                    🎯 Structured AAA tests are crystal clear, self-contained, and simple to debug when assertions fail.
                  </text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE TEST RUNNER & QUALITY LAB */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧪</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Regression Detector &amp; Assertion Simulator
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Simulate code changes to a student scholarship rules engine and run the automated test suite to observe how assertions immediately catch silent regressions:
          </p>

          <div className="bg-slate-950 p-5 sm:p-6 rounded-xl border border-slate-800/90 space-y-6">
            {/* Bug Injection Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Simulate Code State / Refactoring Change:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "CLEAN", label: "Clean Production Code", icon: "✅", desc: "Correct &ge; boundary checks" },
                  { id: "BUGGY_OFF_BY_ONE", label: "Off-by-One Boundary Bug", icon: "⚠️", desc: "Refactored with &gt; instead of >=" },
                  { id: "BUGGY_NEGATIVE_FEE", label: "Missing Input Validation", icon: "💥", desc: "No check for negative balance" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSimulatedBugState(item.id);
                      setTestSuiteRan(true);
                    }}
                    className={clsx(
                      "p-3 rounded-xl border text-left transition-all",
                      simulatedBugState === item.id
                        ? "bg-teal-950/60 border-teal-500 shadow-md shadow-teal-950/50"
                        : "bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400"
                    )}
                  &gt;
                    <div className="text-base mb-1">{item.icon} <strong className="text-slate-200 text-xs sm:text-sm">{item.label}</strong></div>
                    <div className="text-[11px] text-slate-400">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Test Results Banner */}
            <div
              className={clsx(
                "p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3",
                failedCount === 0
                  ? "bg-emerald-950/40 border-emerald-800/70 text-emerald-300"
                  : "bg-rose-950/40 border-rose-800/70 text-rose-300"
              )}
            >
              <div>
                <div className="text-xs uppercase font-mono tracking-wider font-bold">
                  {failedCount === 0 ? "✅ TEST SUITE STATUS: ALL GREEN" : "🚨 TEST SUITE STATUS: REGRESSION DETECTED"}
                </div>
                <div className="text-sm font-semibold mt-0.5">{testStatusMessage}</div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono bg-slate-900/80 px-2.5 py-1 rounded border border-slate-700 text-slate-300">
                  Passed: {passedCount}
                </span>
                <span className="text-xs font-mono bg-slate-900/80 px-2.5 py-1 rounded border border-slate-700 text-slate-300">
                  Failed: {failedCount}
                </span>
              </div>
            </div>

            {/* Generated Dynamic Code */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Active Code Implementation &amp; Assertion Suite:
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
              4. Production Code Labs &amp; Test Suites
            </h2>
          </div>

          <p className="text-slate-300 mb-8 text-base leading-relaxed">
            Inspect, run, and master all four production-grade testing labs covering manual print fragility, automated regression suites, the AAA verification pattern, and multi-campus student grade evaluation:
          </p>

          <div className="space-y-10">
            {/* Python Loader 1 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-teal-300">
                  Lab 1: Manual Print Debugging vs Self-Verifying Assertions
                </h3>
                <p className="text-sm text-slate-400">
                  Demonstrating how manual <code className="text-rose-400 font-mono">print()</code> visual checks fail when algorithms output wrong values, and replacing them with self-verifying test assertion contracts.
                </p>
              </div>
              <PythonFileLoader
                fileModule={manualTestCode}
                title="manual_testing_fragility.py"
                highlightLines={[12, 33, 52]}
              />
            </div>

            {/* Python Loader 2 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-cyan-300">
                  Lab 2: Automated Regression Detection &amp; Boundary Verification
                </h3>
                <p className="text-sm text-slate-400">
                  Demonstrating how an automated test suite immediately catches an off-by-one boundary regression introduced during code refactoring across Barrackpore and Kolkata students.
                </p>
              </div>
              <PythonFileLoader
                fileModule={regressionCode}
                title="regression_detection_suite.py"
                highlightLines={[25, 43, 51]}
              />
            </div>

            {/* Python Loader 3 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-purple-300">
                  Lab 3: The Arrange-Act-Assert (AAA) Pattern &amp; Invariants
                </h3>
                <p className="text-sm text-slate-400">
                  Structuring test cases into clean Arrange, Act, Assert blocks, validating mutations, transaction logs, and exception-raising contracts.
                </p>
              </div>
              <PythonFileLoader
                fileModule={aaaPatternCode}
                title="assertion_contract_verification.py"
                highlightLines={[42, 57, 72]}
              />
            </div>

            {/* Python Loader 4 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-amber-300">
                  Lab 4: Institutional Student Grading &amp; Attendance Test Suite
                </h3>
                <p className="text-sm text-slate-400">
                  Complete end-to-end multi-variable grading test suite verifying curves, attendance gates (&lt;75% failure), and honors distinction flags for Mamata, Mahima, Abhronila, Susmita, and Debangshu.
                </p>
              </div>
              <PythonFileLoader
                fileModule={gradingSuiteCode}
                title="institutional_grade_testing_case.py"
                highlightLines={[20, 30, 80]}
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
              5. Testing Pitfalls &amp; Anti-Patterns
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pitfall 1 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                1. Relying on Visual Terminal Prints
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Relying on manual visual checks is slow, human error-prone, and impossible to automate in CI pipelines. Always write executable assertions.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # BAD: print("Result:", calculate(x)) # Human must inspect!{'\n'}
                # GOOD: assert calculate(x) == expected
              </pre>
            </div>

            {/* Pitfall 2 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                2. Test Interdependence (Polluting Global State)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Letting one test mutate a global dictionary or database table causes subsequent tests to fail randomly depending on execution order.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # BUG: test1 modifies GLOBAL_USERS without cleanup!{'\n'}
                # FIX: Use clean fixtures per test
              </pre>
            </div>

            {/* Pitfall 3 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                3. Ignoring Boundary Edge Cases
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Testing only typical inputs (e.g. 85.0) and missing exact cutoffs (74.9 vs 75.0) leads to off-by-one errors in production.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # MUST TEST: 74.9 (Fail) and 75.0 (Pass){'\n'}
                # MUST TEST: 0, -1, empty list []
              </pre>
            </div>

            {/* Pitfall 4 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                4. Flaky Tests with sleep()
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Using <code className="text-rose-400 font-mono">time.sleep(1)</code> to wait for background operations creates slow, flaky tests. Use deterministic event polling or mocks.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # BAD: time.sleep(2) # Flaky on slow CI!{'\n'}
                # GOOD: wait_until(lambda: job.is_ready())
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
              6. Professional Software Testing Checklist
            </h2>
          </div>

          <div className="space-y-3 text-slate-300 text-sm sm:text-base">
            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Follow the AAA Pattern:</strong> Structure all tests with clean Arrange, Act, and Assert steps.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Test Boundaries &amp; Exceptions:</strong> Always verify exact cutoffs (e.g. 89.9 vs 90.0) and verify that invalid inputs raise expected exceptions.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Keep Tests Isolated &amp; Deterministic:</strong> Zero reliance on execution order, network availability, or unseeded random numbers.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Automate CI Quality Gates:</strong> Run all tests on every Git pull request to block regressions from reaching production.
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQS */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <FAQTemplate
            title="Automated Testing Foundations FAQs"
            questions={questions}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: PLAIN TEXT PRINT & DOWNLOAD NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <PlainTextPrint
            content={noteText}
            title="Topic 0: Why Automated Testing is Mandatory Study Note"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Study Note"
            downloadFileName="topic0_note.txt"
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 9: TEACHER'S NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <Teacher
            note={
              "Automated testing is the single most defining characteristic that separates hobbyist scripts from professional enterprise software. When managing student accounts and grade evaluations for Mamata, Mahima, Abhronila, Susmita, and Debangshu across Barrackpore, Kolkata, Ichapur, and Jadavpur, we cannot afford silent bugs or manual check fatigue. Writing self-verifying assertion contracts ensures that every edge case is covered, every refactoring is safe, and our systems maintain 100% mathematical fidelity."
            }
          />
        </section>

      </div>
    </div>
  );
}
