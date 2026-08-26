import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import basicRaisesCode from "./topic5_files/basic_pytest_raises_context.py?raw";
import regexMatchingCode from "./topic5_files/exception_message_regex_matching.py?raw";
import customHierarchyCode from "./topic5_files/custom_exception_hierarchy_testing.py?raw";
import institutionalGuardCode from "./topic5_files/institutional_admission_validation_suite.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic5_files/topic5_note.txt?raw";

// FAQ Questions
import questions from "./topic5_files/topic5_questions";

/**
 * Topic5: Testing exceptions with pytest.raises
 * Module: 004_003_python-testing
 * Segment: 4 (Python Pro Level & Ecosystem Mastery)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic5() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("raisesFlow");

  // Interactive Laboratory State
  const [selectedException, setSelectedException] = useState("ValueError"); // ValueError | KeyError | QuotaExceededError
  const [useRegexMatch, setUseRegexMatch] = useState(true);

  // Mapped metrics
  let errorContract = "Verifies input validation failures";
  let regexPattern = "r'Candidate age .* is below minimum'";
  let businessScenario = "Catching underage candidates (<16 years old)";

  if (selectedException === "ValueError") {
    errorContract = "Validates numerical boundary and data type integrity";
    regexPattern = "r'Candidate age .* is below minimum'";
    businessScenario = "Catching negative tuition fees or invalid ages";
  } else if (selectedException === "KeyError") {
    errorContract = "Guards dictionary lookups and duplicate identity keys";
    regexPattern = "r'Student ID .* already registered'";
    businessScenario = "Preventing duplicate student admission tokens";
  } else if (selectedException === "QuotaExceededError") {
    errorContract = "Custom domain exception with structured capacity metadata";
    regexPattern = "r'Quota full for Barrackpore .*'";
    businessScenario = "Enforcing maximum 30-student cohort caps per batch";
  }

  const generatedPythonSnippet = `# Exception Contract Testing with PyTest
# Target: ${selectedException} | Match Mode: ${useRegexMatch ? "Regex Enabled" : "Type Only"}

import pytest

def test_${selectedException.toLowerCase()}_contract():
${
  useRegexMatch
    ? `    # Asserts exact exception type AND verifies error message via regex!
    with pytest.raises(${selectedException}, match=${regexPattern}) as exc_info:
        # Minimal single-line execution scope
        enroll_student("STU_BP_01", campus="Barrackpore", age=14)

    # Inspect captured ExceptionInfo payload attributes:
    assert exc_info.typename == "${selectedException}"`
    : `    # Asserts only the exception type
    with pytest.raises(${selectedException}):
        enroll_student("STU_BP_01", campus="Barrackpore", age=14)`
}
${
  selectedException === "QuotaExceededError"
    ? `    # Inspect custom domain attributes
    err = exc_info.value
    assert err.campus == "Barrackpore"
    assert err.capacity == 30`
    : ""
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
            Topic 5
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Automated Testing, PyTest &amp; Quality Assurance
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Testing Exceptions: <span className="text-teal-400">pytest.raises</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master negative testing and exception contract verification in PyTest: asserting expected errors with <code className="text-teal-300 font-mono">with pytest.raises()</code>, verifying failure messages using regular expression matching with <code className="text-cyan-300 font-mono">match=r"..."</code>, inspecting custom exception attributes via <code className="text-purple-300 font-mono">exc_info.value</code>, and validating domain error hierarchies.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ Defensive Negative Testing
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔍 Regex Message match=r"..."
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📦 exc_info.value Payload Inspection
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🏛️ Custom Domain Hierarchies
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
              1. The Exception Contract Testing Architecture
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              In robust software systems, proving that functions fail predictably and safely on invalid data is just as critical as proving they work on valid data. <code className="text-teal-300 font-mono">pytest.raises</code> acts as a context manager that intercepts and validates expected exceptions:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ Context Manager</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">with pytest.raises()</code>
                <p className="text-[11px] text-slate-300">
                  Wraps the target function call. Passes only if the specified exception is raised; fails if no error occurs.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ Regex Message Match</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">match=r"pattern"</code>
                <p className="text-[11px] text-slate-300">
                  Matches error message strings against regular expressions to ensure the exception was raised for the exact right reason.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ Payload Inspection</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">exc_info.value</code>
                <p className="text-[11px] text-slate-300">
                  Captures the live exception object to assert on custom attributes (<code className="text-purple-300">error_code</code>, <code className="text-purple-300">capacity</code>, <code className="text-purple-300">details</code>).
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 shadow-lg">
                <div className="text-amber-400 font-bold text-sm mb-1">4️⃣ Domain Hierarchies</div>
                <code className="text-xs font-mono text-amber-300 block mb-1">class CustomError</code>
                <p className="text-[11px] text-slate-300">
                  Tests enterprise domain exception trees (<code className="text-amber-300">QuotaExceededError</code> inheriting from <code className="text-amber-300">AdmissionError</code>).
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Trap of Broad Exception Testing
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                Writing <code className="text-rose-400 font-mono">with pytest.raises(Exception):</code> is a dangerous anti-pattern. If a typo in your test creates an accidental <code className="text-rose-400 font-mono">NameError</code>, the test passes by mistake! Always specify the <span className="text-emerald-400 font-bold">exact exception class</span> and use <code className="text-teal-300 font-mono">match=r"..."</code>.
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
                2. Visualizing pytest.raises Flow, Regex Matching &amp; Payload Capture
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("raisesFlow")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "raisesFlow"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                pytest.raises Execution Flow
              </button>
              <button
                onClick={() => setActiveInteractiveTab("regexMatching")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "regexMatching"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Regex Message Matching
              </button>
              <button
                onClick={() => setActiveInteractiveTab("exceptionPayload")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "exceptionPayload"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Custom Exception Payload
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining context interception lifecycle, regex message verification, and structured exception attributes:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "raisesFlow" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">
                  PYTEST.RAISES CONTEXT MANAGER INTERCEPTION PIPELINE
                </text>

                {/* Pipeline Flow */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#0f172a" stroke="#14b8a6" />

                  {/* Step 1 */}
                  <rect x="25" y="45" width="220" height="150" rx="6" fill="#042f2e" stroke="#2dd4bf" />
                  <text x="35" y="70" fill="#5eead4" fontSize="11" fontWeight="bold">1. Enter Context Block</text>
                  <rect x="35" y="85" width="200" height="40" rx="4" fill="#134e4a" />
                  <text x="45" y="105" fill="#ccfbf1" fontSize="9" fontFamily="monospace">with pytest.raises(ValueError):</text>
                  <text x="35" y="145" fill="#99f6e4" fontSize="9">PyTest installs active exception trap</text>
                  <text x="35" y="165" fill="#facc15" fontSize="8" fontWeight="bold">Active Listener Ready</text>

                  {/* Arrow 1 */}
                  <path d="M 245 120 L 295 120" stroke="#14b8a6" strokeWidth="2" />

                  {/* Step 2 */}
                  <rect x="300" y="45" width="230" height="150" rx="6" fill="#0c4a6e" stroke="#38bdf8" />
                  <text x="310" y="70" fill="#e0f2fe" fontSize="11" fontWeight="bold">2. Target Function Executes</text>
                  <rect x="310" y="85" width="210" height="40" rx="4" fill="#0369a1" />
                  <text x="320" y="105" fill="#ffffff" fontSize="9" fontFamily="monospace">validate_age(14) # &lt; 16</text>
                  <text x="310" y="145" fill="#bae6fd" fontSize="9">Raises: ValueError("Age too low")</text>
                  <text x="310" y="165" fill="#f87171" fontSize="8" fontWeight="bold">Exception Propagates</text>

                  {/* Arrow 2 */}
                  <path d="M 530 120 L 580 120" stroke="#14b8a6" strokeWidth="2" />

                  {/* Step 3 */}
                  <rect x="585" y="45" width="210" height="150" rx="6" fill="#1e1b4b" stroke="#818cf8" />
                  <text x="595" y="70" fill="#e0e7ff" fontSize="11" fontWeight="bold">3. Trap Matches &amp; Passes</text>
                  <rect x="595" y="85" width="190" height="40" rx="4" fill="#312e81" />
                  <text x="605" y="105" fill="#86efac" fontSize="9" fontFamily="monospace">Type Matches ValueError!</text>
                  <text x="595" y="145" fill="#c7d2fe" fontSize="9">Suppresses crash cleanly</text>
                  <text x="595" y="170" fill="#86efac" fontSize="9" fontWeight="bold">✅ TEST PASSED</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "regexMatching" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">
                  REGEX MESSAGE MATCHING: PREVENTING WRONG-CAUSE FALSE PASSES
                </text>

                {/* Regex Comparison */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#082f49" stroke="#0ea5e9" />

                  {/* Bad: Type Only */}
                  <rect x="25" y="45" width="370" height="180" rx="6" fill="#4c0519" stroke="#f43f5e" />
                  <text x="35" y="70" fill="#fda4af" fontSize="12" fontWeight="bold">Type Only (No match=r"..."): Risky</text>
                  
                  <rect x="35" y="85" width="350" height="30" rx="4" fill="#1c1917" />
                  <text x="45" y="105" fill="#fca5a5" fontSize="9" fontFamily="monospace">with pytest.raises(ValueError):</text>

                  <rect x="35" y="120" width="350" height="40" rx="4" fill="#881337" />
                  <text x="45" y="137" fill="#fecdd3" fontSize="9">⚠️ If code raises ValueError("DB Down") instead</text>
                  <text x="45" y="152" fill="#fecdd3" fontSize="8">of "Invalid fee", test STILL PASSES silently!</text>

                  <text x="45" y="195" fill="#fda4af" fontSize="9" fontWeight="bold">💥 Masks underlying functional regressions!</text>

                  {/* Good: Type + Regex Match */}
                  <rect x="425" y="45" width="370" height="180" rx="6" fill="#042f2e" stroke="#14b8a6" />
                  <text x="435" y="70" fill="#5eead4" fontSize="12" fontWeight="bold">Type + match=r"..." (Strict &amp; Safe)</text>

                  <rect x="435" y="85" width="350" height="30" rx="4" fill="#064e3b" />
                  <text x="445" y="105" fill="#a7f3d0" fontSize="9" fontFamily="monospace">with pytest.raises(ValueError, match=r"Fee.*positive"):</text>

                  <rect x="435" y="120" width="350" height="40" rx="4" fill="#134e4a" />
                  <text x="445" y="137" fill="#ccfbf1" fontSize="9">✅ Matches exact error cause string</text>
                  <text x="445" y="152" fill="#ccfbf1" fontSize="8">Rejects unrelated ValueError exceptions</text>

                  <text x="445" y="195" fill="#86efac" fontSize="9" fontWeight="bold">🎯 Zero false passes. Enterprise precision.</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">
                  CUSTOM EXCEPTION HIERARCHY &amp; STRUCTURED PAYLOAD CAPTURE
                </text>

                {/* Exception Payload Grid */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#1e1b4b" stroke="#a855f7" />

                  {/* Exception Object */}
                  <rect x="25" y="40" width="380" height="180" rx="6" fill="#3b0764" stroke="#c084fc" />
                  <text x="35" y="65" fill="#f3e8ff" fontSize="12" fontWeight="bold">
                    Captured exc_info.value Instance:
                  </text>
                  
                  <rect x="35" y="75" width="360" height="135" rx="4" fill="#0f172a" stroke="#a855f7" />
                  <text x="45" y="95" fill="#d8b4fe" fontSize="9" fontFamily="monospace">class AdmissionQuotaExceededError(InstitutionalError):</text>
                  <text x="45" y="115" fill="#e9d5ff" fontSize="9" fontFamily="monospace">  err.campus      ➔ "Barrackpore"</text>
                  <text x="45" y="135" fill="#e9d5ff" fontSize="9" fontFamily="monospace">  err.batch       ➔ "Python_Batch_1"</text>
                  <text x="45" y="155" fill="#e9d5ff" fontSize="9" fontFamily="monospace">  err.capacity    ➔ 30</text>
                  <text x="45" y="175" fill="#e9d5ff" fontSize="9" fontFamily="monospace">  err.error_code  ➔ 4001</text>
                  <text x="45" y="198" fill="#86efac" fontSize="9" fontWeight="bold">✅ Rich structured domain context</text>

                  {/* Assertion Assertions */}
                  <rect x="425" y="40" width="370" height="180" rx="6" fill="#0c4a6e" stroke="#38bdf8" />
                  <text x="435" y="65" fill="#e0f2fe" fontSize="12" fontWeight="bold">
                    Test Assertion Verifications:
                  </text>

                  <rect x="435" y="75" width="350" height="135" rx="4" fill="#0f172a" stroke="#38bdf8" />
                  <text x="445" y="95" fill="#bae6fd" fontSize="9" fontFamily="monospace">assert isinstance(err, InstitutionalError)</text>
                  <text x="445" y="115" fill="#bae6fd" fontSize="9" fontFamily="monospace">assert err.campus == "Barrackpore"</text>
                  <text x="445" y="135" fill="#bae6fd" fontSize="9" fontFamily="monospace">assert err.capacity == 30</text>
                  <text x="445" y="155" fill="#bae6fd" fontSize="9" fontFamily="monospace">assert err.error_code == 4001</text>
                  <text x="445" y="198" fill="#fde047" fontSize="9" fontWeight="bold">⚡ Validates telemetry &amp; API response contracts</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE EXCEPTION & REGEX INSPECTOR */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧪</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Exception &amp; Regex Match Simulator
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Select exception types and toggle regex error message validation to observe interception flows and inspect generated PyTest code:
          </p>

          <div className="bg-slate-950 p-5 sm:p-6 rounded-xl border border-slate-800/90 space-y-6">
            {/* Exception Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Select Exception Type to Test:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "ValueError", label: "ValueError", icon: "🔢", tag: "Invalid Data Value" },
                  { id: "KeyError", label: "KeyError", icon: "🔑", tag: "Duplicate or Missing Key" },
                  { id: "QuotaExceededError", label: "QuotaExceededError", icon: "🏛️", tag: "Domain Custom Exception" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedException(item.id)}
                    className={clsx(
                      "p-3 rounded-xl border text-left transition-all",
                      selectedException === item.id
                        ? "bg-teal-950/60 border-teal-500 shadow-md shadow-teal-950/50"
                        : "bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400"
                    )}
                  >
                    <div className="text-base mb-1">{item.icon} <strong className="text-slate-200 text-xs sm:text-sm">{item.label}</strong></div>
                    <div className="text-[11px] text-teal-400 font-mono">{item.tag}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Regex Match Toggle */}
            <div className="flex items-center justify-between p-3 bg-slate-900/80 rounded-xl border border-slate-800">
              <div>
                <div className="text-xs font-bold text-white">Enable Regex Message Matching (match=r"...")</div>
                <div className="text-[11px] text-slate-400">Enforces exact error cause verification instead of type-only trapping</div>
              </div>
              <button
                onClick={() => setUseRegexMatch(!useRegexMatch)}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all",
                  useRegexMatch
                    ? "bg-emerald-950 border border-emerald-500 text-emerald-300"
                    : "bg-slate-800 border border-slate-700 text-slate-400"
                )}
              >
                {useRegexMatch ? "REGEX MATCH: STRICT" : "TYPE ONLY: LENIENT"}
              </button>
            </div>

            {/* Metrics Dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-900/90 p-4 rounded-xl border border-teal-900/50">
                <div className="text-xs text-teal-400 font-medium mb-1">Contract Verification</div>
                <div className="text-xs font-bold font-mono text-teal-300 mt-1 leading-snug">
                  {errorContract}
                </div>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-cyan-900/50">
                <div className="text-xs text-cyan-400 font-medium mb-1">Regex Pattern</div>
                <div className="text-xs font-bold font-mono text-cyan-300 mt-1 leading-snug">
                  {regexPattern}
                </div>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-purple-900/50">
                <div className="text-xs text-purple-400 font-medium mb-1">Institutional Use Case</div>
                <div className="text-xs font-bold font-mono text-purple-300 mt-1 leading-snug">
                  {businessScenario}
                </div>
              </div>
            </div>

            {/* Generated Dynamic Code */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Generated pytest.raises Implementation:
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
              4. Production Code Labs &amp; Exception Suites
            </h2>
          </div>

          <p className="text-slate-300 mb-8 text-base leading-relaxed">
            Inspect, run, and master all four production-grade exception testing labs covering basic contexts, regex error matching, structured custom exception payloads, and the complete institutional admission guard:
          </p>

          <div className="space-y-10">
            {/* Python Loader 1 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-teal-300">
                  Lab 1: Basic pytest.raises Exception Validation
                </h3>
                <p className="text-sm text-slate-400">
                  Testing minimum age requirements (&lt;16) and minimum initial deposit thresholds (Rs. 2,000) for candidate registrations.
                </p>
              </div>
              <PythonFileLoader
                fileModule={basicRaisesCode}
                title="basic_pytest_raises_context.py"
                highlightLines={[12, 23, 40]}
              />
            </div>

            {/* Python Loader 2 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-cyan-300">
                  Lab 2: Error Message Regex Matching (match=r"...")
                </h3>
                <p className="text-sm text-slate-400">
                  Asserting specific certificate issuance error codes (<code className="text-cyan-300 font-mono">CERT_FAIL_401</code>, <code className="text-cyan-300 font-mono">CERT_FAIL_402</code>) with strict regex expressions.
                </p>
              </div>
              <PythonFileLoader
                fileModule={regexMatchingCode}
                title="exception_message_regex_matching.py"
                highlightLines={[14, 25, 36]}
              />
            </div>

            {/* Python Loader 3 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-purple-300">
                  Lab 3: Custom Exception Hierarchy &amp; Structured Payload Testing
                </h3>
                <p className="text-sm text-slate-400">
                  Inspecting structured attributes on <code className="text-purple-300 font-mono">AdmissionQuotaExceededError</code> and bank decline codes on <code className="text-purple-300 font-mono">PaymentDeclinedError</code>.
                </p>
              </div>
              <PythonFileLoader
                fileModule={customHierarchyCode}
                title="custom_exception_hierarchy_testing.py"
                highlightLines={[17, 26, 46, 56]}
              />
            </div>

            {/* Python Loader 4 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-amber-300">
                  Lab 4: Institutional Multi-Campus Admission Guard Case Study
                </h3>
                <p className="text-sm text-slate-400">
                  Comprehensive admission guard test suite guarding against duplicate student IDs, expired vouchers, and invalid age boundaries across Mamata, Mahima, and Abhronila.
                </p>
              </div>
              <PythonFileLoader
                fileModule={institutionalGuardCode}
                title="institutional_admission_validation_suite.py"
                highlightLines={[17, 36, 44, 53]}
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
              5. Exception Testing Pitfalls &amp; Anti-Patterns
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pitfall 1 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                1. Trapping Generic 'Exception'
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Testing <code className="text-rose-400 font-mono">with pytest.raises(Exception)</code> catches unintended SyntaxErrors, NameErrors, or TypeErrors, causing buggy tests to pass accidentally!
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # BUG: with pytest.raises(Exception): f(){'\n'}
                # FIX: with pytest.raises(AdmissionQuotaError): f()
              </pre>
            </div>

            {/* Pitfall 2 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                2. Putting Setup Code Inside 'with' Block
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Placing fixture setup inside the <code className="text-rose-400 font-mono">with pytest.raises</code> block risks catching exceptions from the setup rather than the function under test.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # BUG: with pytest.raises(...): s = User(); s.pay(){'\n'}
                # FIX: s = User(); with pytest.raises(...): s.pay()
              </pre>
            </div>

            {/* Pitfall 3 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                3. Unescaped Regex Special Characters
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                If the error string has parentheses (e.g. <code className="text-rose-400 font-mono">"Error (Code 404)"</code>), unescaped parentheses in <code className="text-teal-300 font-mono">match</code> act as regex capture groups and fail to match.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # BUG: match="Error (Code 404)"{'\n'}
                # FIX: match=r"Error \(Code 404\)" or re.escape()
              </pre>
            </div>

            {/* Pitfall 4 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                4. Manual try...except Without assert False
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Writing manual <code className="text-rose-400 font-mono">try: f() except: pass</code> without checking that the exception actually occurred will pass even if no exception was raised at all!
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # ANTI-PATTERN: try: f() except: pass{'\n'}
                # BEST PRACTICE: with pytest.raises(ExpectedError): f()
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
              6. Professional Exception Testing Checklist
            </h2>
          </div>

          <div className="space-y-3 text-slate-300 text-sm sm:text-base">
            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Specify Exact Exception Types:</strong> Always test against specific errors like <code className="text-teal-300 font-mono">ValueError</code> or <code className="text-teal-300 font-mono">KeyError</code>, never generic <code className="text-rose-400 font-mono">Exception</code>.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Match Error Message Causes:</strong> Use <code className="text-teal-300 font-mono">match=r"..."</code> to verify that the exception occurred for the expected underlying reason.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Keep Context Block Minimal:</strong> Keep only the single target operation inside the <code className="text-teal-300 font-mono">with pytest.raises()</code> block.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Assert on Custom Error Attributes:</strong> Capture <code className="text-teal-300 font-mono">exc_info.value</code> to assert on domain error payloads and HTTP status codes.
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQS */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <FAQTemplate
            title="Testing Exceptions with PyTest FAQs"
            questions={questions}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: PLAIN TEXT PRINT & DOWNLOAD NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <PlainTextPrint
            content={noteText}
            title="Topic 5: Testing Exceptions with PyTest Study Note"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Study Note"
            downloadFileName="topic5_note.txt"
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 9: TEACHER'S NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <Teacher
            note={
              "Defensive software architecture requires rigorous negative testing. In our multi-campus student management system across Barrackpore, Kolkata, Ichapur, and Jadavpur, proving that our admission pipeline rejects underage candidates, detects duplicate roll numbers, and blocks overpayment transactions with precise exception types is fundamental to data integrity. Using pytest.raises with regex message matching guarantees that every boundary rule for Mamata, Mahima, and Abhronila fails cleanly and informatively before any bad data hits production databases."
            }
          />
        </section>

      </div>
    </div>
  );
}
