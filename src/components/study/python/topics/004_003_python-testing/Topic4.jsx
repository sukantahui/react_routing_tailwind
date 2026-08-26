import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import basicParametrizeCode from "./topic4_files/basic_parametrize_boundaries.py?raw";
import matrixParametrizeCode from "./topic4_files/matrix_combinatorial_parametrize.py?raw";
import customIdsCode from "./topic4_files/custom_parametrize_ids_and_xfail.py?raw";
import institutionalMatrixCode from "./topic4_files/institutional_fee_matrix_casestudy.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic4_files/topic4_note.txt?raw";

// FAQ Questions
import questions from "./topic4_files/topic4_questions";

/**
 * Topic4: Parametrized tests with @pytest.mark.parametrize
 * Module: 004_003_python-testing
 * Segment: 4 (Python Pro Level & Ecosystem Mastery)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic4() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("tableMapping");

  // Interactive Laboratory State
  const [selectedCampusCount, setSelectedCampusCount] = useState(4); // 2 | 4
  const [selectedTierCount, setSelectedTierCount] = useState(3); // 2 | 3
  const [includeXfailRow, setIncludeXfailRow] = useState(true);

  // Total generated tests
  const totalCombinations = selectedCampusCount * selectedTierCount + (includeXfailRow ? 1 : 0);

  const generatedPythonSnippet = `# Data-Driven PyTest Parametrization
# Combinatorial Test Matrix: ${totalCombinations} Independent Test Cases

import pytest

@pytest.mark.parametrize("campus", [
${selectedCampusCount === 4 ? `    "Barrackpore", "Kolkata", "Ichapur", "Jadavpur"` : `    "Barrackpore", "Kolkata"`}
])
@pytest.mark.parametrize("course_tier", [
${selectedTierCount === 3 ? `    "FOUNDATION", "PRO", "MASTER"` : `    "FOUNDATION", "PRO"`}
])
def test_campus_course_pricing_matrix(campus, course_tier):
    # Stacking generates ${selectedCampusCount * selectedTierCount} Cartesian product test variations!
    net_fee = calculate_course_fee(campus, course_tier)
    assert net_fee > 0.0
    assert net_fee &le; 25000.0

# Granular Row Customization with pytest.param()
@pytest.mark.parametrize("score, expected_grade", [
    pytest.param(95.0, "A+", id="mamata_top_merit"),
    pytest.param(90.0, "A+", id="mahima_exact_90_boundary"),
    pytest.param(80.0, "A",  id="abhronila_80_boundary"),
    pytest.param(40.0, "C",  id="debangshu_pass_cutoff"),
${
  includeXfailRow
    ? `    pytest.param(-5.0, None, marks=pytest.mark.xfail, id="known_negative_bug"),`
    : `    pytest.param(35.0, "F",  id="failing_grade_case"),`
}
])
def test_student_grade_tiers(score, expected_grade):
    assert evaluate_grade(score) == expected_grade`;

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
            Topic 4
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Automated Testing, PyTest &amp; Quality Assurance
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Parametrized Tests: <span className="text-teal-400">@pytest.mark.parametrize</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master data-driven testing in PyTest: replacing repetitive test copy-pasting with clean input-output parameter tables, generating Cartesian product combinatorial matrices via stacked decorators, assigning human-readable test names with custom <code className="text-teal-300 font-mono">ids</code>, and attaching row-specific markers using <code className="text-cyan-300 font-mono">pytest.param(marks=pytest.mark.xfail)</code>.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📊 DRY Data-Driven Tables
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ✖️ Cartesian Product Matrices
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🏷️ Custom IDs &amp; pytest.param
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ Precise Boundary Verification
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
              1. The Data-Driven Testing Paradigm
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              When testing functions with multiple inputs, outputs, or boundary conditions, writing separate test functions for each scenario leads to massive code bloat. <code className="text-teal-300 font-mono">@pytest.mark.parametrize</code> executes a single test function across an entire table of inputs, treating every single row as an independent, fully isolated test case:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ Multi-Argument Vector</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">@pytest.mark.parametrize</code>
                <p className="text-[11px] text-slate-300">
                  Maps parameter tuples to function arguments. Each tuple executes as an isolated test case with individual pass/fail tracking.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ Cartesian Product</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">Stacked Decorators</code>
                <p className="text-[11px] text-slate-300">
                  Stacking decorators multiplies parameter sets ($N \times M$), automatically generating complete multi-variable testing matrices.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ Custom Test IDs</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">ids=["name_1", ...]</code>
                <p className="text-[11px] text-slate-300">
                  Assign descriptive names to parameter variations so terminal failure logs pinpoint the exact business scenario immediately.
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 shadow-lg">
                <div className="text-amber-400 font-bold text-sm mb-1">4️⃣ Row Metadata</div>
                <code className="text-xs font-mono text-amber-300 block mb-1">pytest.param(marks=...)</code>
                <p className="text-[11px] text-slate-300">
                  Attach custom markers (like <code className="text-amber-300 font-mono">xfail</code> or <code className="text-amber-300 font-mono">skip</code>) to individual parameter rows without affecting others.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                Parametrization vs Native For-Loops
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                Running assertions inside a native <code className="text-rose-400 font-mono">for</code> loop means that if the 2nd item fails, <span className="text-rose-400 font-bold">the entire test aborts and skips items 3, 4, 5</span>! With <code className="text-teal-300 font-mono">@pytest.mark.parametrize</code>, PyTest treats all 5 cases as independent tests, executing all of them and reporting exactly which ones succeeded or failed.
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
                2. Visualizing Data Tables, Cartesian Products &amp; Test IDs
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("tableMapping")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "tableMapping"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              &gt;
                Table Vector Mapping
              </button>
              <button
                onClick={() => setActiveInteractiveTab("cartesianMatrix")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "cartesianMatrix"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              &gt;
                Cartesian Product Matrix
              </button>
              <button
                onClick={() => setActiveInteractiveTab("pytestParamIds")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "pytestParamIds"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              &gt;
                Custom IDs &amp; xfail Tags
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining parameter vector expansion, combinatorial decorator stacking, and granular test identification:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "tableMapping" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">
                  @PYTEST.MARK.PARAMETRIZE: VECTOR TUPLE TABLE ➔ INDEPENDENT TEST NODES
                </text>

                {/* Left: Table of Tuples */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="245" rx="8" fill="#0f172a" stroke="#14b8a6" />
                  <text x="20" y="30" fill="#5eead4" fontSize="12" fontWeight="bold">
                    Input-Output Parameter Table:
                  </text>
                  
                  <rect x="20" y="50" width="340" height="35" rx="4" fill="#064e3b" stroke="#10b981" />
                  <text x="30" y="72" fill="#d1fae5" fontSize="10" fontFamily="monospace">
                    (95.0, "Barrackpore") ➔ Rs. 5000 (Mamata)
                  </text>

                  <rect x="20" y="95" width="340" height="35" rx="4" fill="#064e3b" stroke="#10b981" />
                  <text x="30" y="117" fill="#d1fae5" fontSize="10" fontFamily="monospace">
                    (90.0, "Kolkata")     ➔ Rs. 5000 (Mahima)
                  </text>

                  <rect x="20" y="140" width="340" height="35" rx="4" fill="#064e3b" stroke="#10b981" />
                  <text x="30" y="162" fill="#d1fae5" fontSize="10" fontFamily="monospace">
                    (80.0, "Ichapur")     ➔ Rs. 3000 (Abhronila)
                  </text>

                  <rect x="20" y="185" width="340" height="40" rx="4" fill="#0c4a6e" stroke="#38bdf8" />
                  <text x="30" y="210" fill="#bae6fd" fontSize="9">
                    ⚡ 1 Function Definition ➔ 3 Clean Independent Tests
                  </text>
                </g>

                {/* Right: PyTest Test Runner Execution Tree */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="245" rx="8" fill="#1e1e2e" stroke="#38bdf8" />
                  <text x="20" y="30" fill="#93c5fd" fontSize="12" fontWeight="bold">
                    PyTest Test Runner Execution Tree:
                  </text>

                  {/* Test 1 */}
                  <rect x="20" y="50" width="340" height="45" rx="4" fill="#042f2e" stroke="#2dd4bf" />
                  <text x="30" y="70" fill="#ccfbf1" fontSize="10" fontFamily="monospace">
                    test_scholarship[95.0-Barrackpore]
                  </text>
                  <text x="30" y="86" fill="#86efac" fontSize="9" fontWeight="bold">✅ PASSED (0.001s)</text>

                  {/* Test 2 */}
                  <rect x="20" y="105" width="340" height="45" rx="4" fill="#042f2e" stroke="#2dd4bf" />
                  <text x="30" y="125" fill="#ccfbf1" fontSize="10" fontFamily="monospace">
                    test_scholarship[90.0-Kolkata]
                  </text>
                  <text x="30" y="141" fill="#86efac" fontSize="9" fontWeight="bold">✅ PASSED (0.001s)</text>

                  {/* Test 3 */}
                  <rect x="20" y="160" width="340" height="45" rx="4" fill="#042f2e" stroke="#2dd4bf" />
                  <text x="30" y="180" fill="#ccfbf1" fontSize="10" fontFamily="monospace">
                    test_scholarship[80.0-Ichapur]
                  </text>
                  <text x="30" y="196" fill="#86efac" fontSize="9" fontWeight="bold">✅ PASSED (0.001s)</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "cartesianMatrix" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">
                  CARTESIAN PRODUCT MATRIX: STACKED PARAMETRIZE DECORATORS
                </text>

                {/* Matrix Diagram */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#082f49" stroke="#0ea5e9" />

                  {/* Decorator 1 */}
                  <rect x="25" y="40" width="230" height="60" rx="6" fill="#0c4a6e" stroke="#38bdf8" />
                  <text x="35" y="62" fill="#e0f2fe" fontSize="10" fontWeight="bold">Decorator 1: Campus (N = 4)</text>
                  <text x="35" y="80" fill="#bae6fd" fontSize="9" fontFamily="monospace">['BP', 'CC', 'IC', 'JU']</text>

                  {/* Multiply Icon */}
                  <text x="285" y="75" fill="#facc15" fontSize="22" fontWeight="bold">✖</text>

                  {/* Decorator 2 */}
                  <rect x="325" y="40" width="230" height="60" rx="6" fill="#064e3b" stroke="#34d399" />
                  <text x="335" y="62" fill="#d1fae5" fontSize="10" fontWeight="bold">Decorator 2: Course Tier (M = 3)</text>
                  <text x="335" y="80" fill="#a7f3d0" fontSize="9" fontFamily="monospace">['FOUNDATION', 'PRO', 'MASTER']</text>

                  {/* Equals Icon */}
                  <text x="585" y="75" fill="#facc15" fontSize="22" fontWeight="bold">=</text>

                  {/* Output Box */}
                  <rect x="625" y="40" width="165" height="60" rx="6" fill="#1e1b4b" stroke="#818cf8" />
                  <text x="635" y="62" fill="#e0e7ff" fontSize="11" fontWeight="bold">12 Total Tests</text>
                  <text x="635" y="80" fill="#c7d2fe" fontSize="9">4 × 3 Combinations</text>

                  {/* Matrix Table Preview */}
                  <rect x="25" y="115" width="765" height="110" rx="6" fill="#0f172a" stroke="#334155" />
                  <text x="40" y="137" fill="#94a3b8" fontSize="10" fontWeight="bold">Generated Combinatorial Permutations Grid:</text>
                  <text x="40" y="160" fill="#cbd5e1" fontSize="9" fontFamily="monospace">
                    BP x FOUNDATION | BP x PRO | BP x MASTER | CC x FOUNDATION | CC x PRO | CC x MASTER
                  </text>
                  <text x="40" y="180" fill="#cbd5e1" fontSize="9" fontFamily="monospace">
                    IC x FOUNDATION | IC x PRO | IC x MASTER | JU x FOUNDATION | JU x PRO | JU x MASTER
                  </text>
                  <text x="40" y="208" fill="#86efac" fontSize="9" fontWeight="bold">
                    🚀 Fully tests all regional campus discount and course tier permutations automatically!
                  </text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">
                  CUSTOM TEST IDS &amp; PYTEST.PARAM(MARKS=PYTEST.MARK.XFAIL)
                </text>

                {/* Custom IDs View */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#1e1b4b" stroke="#a855f7" />

                  {/* Case 1 */}
                  <rect x="25" y="45" width="240" height="120" rx="6" fill="#3b0764" stroke="#c084fc" />
                  <text x="35" y="70" fill="#f3e8ff" fontSize="11" fontWeight="bold">pytest.param(id="mamata_bp")</text>
                  <text x="35" y="90" fill="#d8b4fe" fontSize="9" fontFamily="monospace">token: "BP-2026-MAMATA01"</text>
                  <text x="35" y="108" fill="#d8b4fe" fontSize="9" fontFamily="monospace">expected: valid</text>
                  <text x="35" y="145" fill="#86efac" fontSize="9" fontWeight="bold">✅ Custom Named Pass</text>

                  {/* Case 2 */}
                  <rect x="290" y="45" width="240" height="120" rx="6" fill="#3b0764" stroke="#c084fc" />
                  <text x="300" y="70" fill="#f3e8ff" fontSize="11" fontWeight="bold">pytest.param(id="mahima_cc")</text>
                  <text x="300" y="90" fill="#d8b4fe" fontSize="9" fontFamily="monospace">token: "CC-2026-MAHIMA02"</text>
                  <text x="300" y="108" fill="#d8b4fe" fontSize="9" fontFamily="monospace">expected: valid</text>
                  <text x="300" y="145" fill="#86efac" fontSize="9" fontWeight="bold">✅ Custom Named Pass</text>

                  {/* Case 3: xfail */}
                  <rect x="555" y="45" width="240" height="120" rx="6" fill="#4c0519" stroke="#f43f5e" />
                  <text x="565" y="70" fill="#fda4af" fontSize="11" fontWeight="bold">marks=pytest.mark.xfail</text>
                  <text x="565" y="90" fill="#fecdd3" fontSize="9" fontFamily="monospace">id="legacy_missing_year"</text>
                  <text x="565" y="108" fill="#fecdd3" fontSize="9" fontFamily="monospace">token: "BP-MAMATA01"</text>
                  <text x="565" y="145" fill="#facc15" fontSize="9" fontWeight="bold">⚠️ XFAIL (Expected Failure)</text>

                  {/* Bottom Text */}
                  <rect x="25" y="180" width="770" height="45" rx="4" fill="#0f172a" stroke="#a855f7" />
                  <text x="40" y="207" fill="#e9d5ff" fontSize="10">
                    🎯 pytest.param() attaches metadata to individual rows, documenting expected bugs without failing the CI build.
                  </text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE COMBINATORIAL MATRIX CALCULATOR */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧪</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Combinatorial Test Matrix Simulator
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Configure Cartesian product parameter dimensions and observe how PyTest dynamically generates multi-variable test suites:
          </p>

          <div className="bg-slate-950 p-5 sm:p-6 rounded-xl border border-slate-800/90 space-y-6">
            {/* Dimension Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Selector 1: Campus Dimension */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Campus Dimension (N):
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { count: 2, label: "2 Campuses", desc: "BP, Kolkata" },
                    { count: 4, label: "4 Campuses", desc: "BP, CC, IC, JU" },
                  ].map((item) => (
                    <button
                      key={item.count}
                      onClick={() => setSelectedCampusCount(item.count)}
                      className={clsx(
                        "p-3 rounded-xl border text-left transition-all",
                        selectedCampusCount === item.count
                          ? "bg-teal-950/60 border-teal-500 shadow-md shadow-teal-950/50"
                          : "bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400"
                      )}
                    &gt;
                      <div className="text-xs sm:text-sm font-bold text-slate-200">{item.label}</div>
                      <div className="text-[10px] text-teal-400 font-mono">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Selector 2: Course Tier Dimension */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Course Tier Dimension (M):
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { count: 2, label: "2 Tiers", desc: "Foundation, Pro" },
                    { count: 3, label: "3 Tiers", desc: "Foundation, Pro, Master" },
                  ].map((item) => (
                    <button
                      key={item.count}
                      onClick={() => setSelectedTierCount(item.count)}
                      className={clsx(
                        "p-3 rounded-xl border text-left transition-all",
                        selectedTierCount === item.count
                          ? "bg-cyan-950/60 border-cyan-500 shadow-md shadow-cyan-950/50"
                          : "bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400"
                      )}
                    &gt;
                      <div className="text-xs sm:text-sm font-bold text-slate-200">{item.label}</div>
                      <div className="text-[10px] text-cyan-400 font-mono">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* xfail toggle */}
            <div className="flex items-center justify-between p-3 bg-slate-900/80 rounded-xl border border-slate-800">
              <div>
                <div className="text-xs font-bold text-white">Include pytest.param(marks=pytest.mark.xfail) Row</div>
                <div className="text-[11px] text-slate-400">Simulates testing a known bug with graceful XFAIL handling</div>
              </div>
              <button
                onClick={() => setIncludeXfailRow(!includeXfailRow)}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all",
                  includeXfailRow
                    ? "bg-purple-950 border border-purple-500 text-purple-300"
                    : "bg-slate-800 border border-slate-700 text-slate-400"
                )}
              &gt;
                {includeXfailRow ? "XFAIL ROW: INCLUDED" : "XFAIL ROW: DISABLED"}
              </button>
            </div>

            {/* Metrics Dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-900/90 p-4 rounded-xl border border-teal-900/50">
                <div className="text-xs text-teal-400 font-medium mb-1">Generated Test Count</div>
                <div className="text-2xl font-bold font-mono text-teal-300">
                  {totalCombinations} Independent Tests
                </div>
                <div className="text-[11px] text-slate-400 mt-1">{selectedCampusCount} × {selectedTierCount} Cartesian Matrix</div>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-cyan-900/50">
                <div className="text-xs text-cyan-400 font-medium mb-1">Execution Time (Est.)</div>
                <div className="text-2xl font-bold font-mono text-cyan-300">
                  ~{(totalCombinations * 0.001).toFixed(3)}s
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Sub-second execution</div>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-purple-900/50">
                <div className="text-xs text-purple-400 font-medium mb-1">Code Duplication Saved</div>
                <div className="text-2xl font-bold font-mono text-purple-300">
                  {totalCombinations * 6} Lines of Code
                </div>
                <div className="text-[11px] text-slate-400 mt-1">100% DRY compliance</div>
              </div>
            </div>

            {/* Generated Dynamic Code */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Generated Parametrized Implementation:
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
              4. Production Code Labs &amp; Parametrized Suites
            </h2>
          </div>

          <p className="text-slate-300 mb-8 text-base leading-relaxed">
            Inspect, run, and master all four production-grade parameterized test labs covering boundary value testing, Cartesian product matrices, custom test IDs with <code className="text-teal-300 font-mono">pytest.param</code>, and the multi-campus institutional fee engine:
          </p>

          <div className="space-y-10">
            {/* Python Loader 1 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-teal-300">
                  Lab 1: Multi-Argument Parametrization &amp; Academic Grade Boundaries
                </h3>
                <p className="text-sm text-slate-400">
                  Verifying 8 strict grade boundaries (39.9, 40.0, 89.9, 90.0, 98.5) across Mamata, Mahima, and Debangshu in a single clean test.
                </p>
              </div>
              <PythonFileLoader
                fileModule={basicParametrizeCode}
                title="basic_parametrize_boundaries.py"
                highlightLines={[12, 26, 38]}
              />
            </div>

            {/* Python Loader 2 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-cyan-300">
                  Lab 2: Stacked Parametrize Decorators (Cartesian Product Matrix)
                </h3>
                <p className="text-sm text-slate-400">
                  Generating 12 combinatorial test runs across 4 campuses (Barrackpore, Kolkata, Ichapur, Jadavpur) and 3 course tiers (Foundation, Pro, Master).
                </p>
              </div>
              <PythonFileLoader
                fileModule={matrixParametrizeCode}
                title="matrix_combinatorial_parametrize.py"
                highlightLines={[13, 31, 38]}
              />
            </div>

            {/* Python Loader 3 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-purple-300">
                  Lab 3: Custom Test IDs &amp; pytest.param(marks=pytest.mark.xfail)
                </h3>
                <p className="text-sm text-slate-400">
                  Assigning clear descriptive names to test variations and safely tagging a known defect row with <code className="text-purple-300 font-mono">xfail</code>.
                </p>
              </div>
              <PythonFileLoader
                fileModule={customIdsCode}
                title="custom_parametrize_ids_and_xfail.py"
                highlightLines={[23, 35, 48]}
              />
            </div>

            {/* Python Loader 4 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-amber-300">
                  Lab 4: Multi-Campus Enterprise Fee &amp; Scholarship Matrix Case Study
                </h3>
                <p className="text-sm text-slate-400">
                  Comprehensive multi-variable test matrix verifying merit scholarships, early bird discounts, and 35% cap limits across Mamata, Mahima, Abhronila, and Susmita.
                </p>
              </div>
              <PythonFileLoader
                fileModule={institutionalMatrixCode}
                title="institutional_fee_matrix_casestudy.py"
                highlightLines={[20, 35, 52, 60]}
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
              5. Parametrization Pitfalls &amp; Anti-Patterns
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pitfall 1 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                1. Combinatorial Explosion
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Stacking too many large parameter lists (e.g. 10 x 10 x 10 = 1,000 tests) causes massive test suite slowdown with diminishing testing value.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # ANTI-PATTERN: 4 stacked decorators producing 5,000 tests{'\n'}
                # BEST PRACTICE: Focus on representative boundary pairs
              </pre>
            </div>

            {/* Pitfall 2 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                2. Unreadable Default IDs on Complex Objects
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Passing large objects without custom <code className="text-rose-400 font-mono">ids</code> creates unreadable terminal test names like <code className="text-rose-400 font-mono">test_calc[&lt;Object at 0x7f...&gt;]</code>.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # BAD: @pytest.mark.parametrize('obj', [User(1), User(2)]){'\n'}
                # GOOD: ids=['admin_user', 'student_user']
              </pre>
            </div>

            {/* Pitfall 3 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                3. Argument Name Typos in Parametrize String
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Mismatches between the comma-separated string (e.g. <code className="text-rose-400 font-mono">"a, b"</code>) and function parameters (<code className="text-rose-400 font-mono">def test(a, c)</code>) raise PyTest fixture lookup errors.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # BUG: @pytest.mark.parametrize("score, grade") &rarr; def test(score, expected){'\n'}
                # FIX: Keep argument names perfectly identical
              </pre>
            </div>

            {/* Pitfall 4 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                4. Testing Unrelated Behaviors in One Matrix
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Trying to test payment calculations, email dispatching, and user registration in one giant parametrized function creates brittle tests.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # BEST PRACTICE: Parametrize only one specific domain concern per test
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
              6. Professional Parametrization Checklist
            </h2>
          </div>

          <div className="space-y-3 text-slate-300 text-sm sm:text-base">
            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Use Meaningful Parameter Names:</strong> Use clear names like <code className="text-teal-300 font-mono">score, campus, expected_fee</code> rather than generic <code className="text-rose-400 font-mono">x, y, z</code>.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Assign Custom IDs for Readable Logs:</strong> Use <code className="text-teal-300 font-mono">ids=[...]</code> or <code className="text-teal-300 font-mono">pytest.param(..., id="...")</code> to pinpoint scenarios in CI.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Cover Boundary Cutoffs:</strong> Always include values just below, exactly at, and just above decision thresholds.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Tag Known Bugs with xfail:</strong> Use <code className="text-teal-300 font-mono">pytest.param(marks=pytest.mark.xfail)</code> to document known issues without failing CI.
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQS */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <FAQTemplate
            title="PyTest Parametrization FAQs"
            questions={questions}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: PLAIN TEXT PRINT & DOWNLOAD NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <PlainTextPrint
            content={noteText}
            title="Topic 4: Parametrized Tests with PyTest Study Note"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Study Note"
            downloadFileName="topic4_note.txt"
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 9: TEACHER'S NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <Teacher
            note={
              "Parametrization is the secret weapon for writing elegant, high-coverage test suites without drowning in duplicate code. In our institutional admission and tuition fee engines across Barrackpore, Kolkata, Ichapur, and Jadavpur, evaluating scholarship combinations for Mamata, Mahima, Abhronila, Susmita, and Debangshu requires testing dozens of edge cases. With @pytest.mark.parametrize, we define clean data tables that test every cutoff and campus multiplier in sub-milliseconds, giving us total confidence in our financial and grading logic."
            }
          />
        </section>

      </div>
    </div>
  );
}
