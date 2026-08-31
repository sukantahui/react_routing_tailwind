import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import statementVsBranchCode from "./topic7_files/basic_statement_vs_branch_coverage.py?raw";
import configPragmasCode from "./topic7_files/coverage_configuration_and_exclusions.py?raw";
import cliReportCode from "./topic7_files/pytest_cov_cli_and_html_reports.py?raw";
import institutionalAuditCode from "./topic7_files/institutional_coverage_audit_suite.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic7_files/topic7_note.txt?raw";

// FAQ Questions
import questions from "./topic7_files/topic7_questions";

/**
 * Topic7: Measuring Code Coverage with coverage.py / pytest-cov
 * Module: 004_003_python-testing
 * Segment: 4 (Python Pro Level & Ecosystem Mastery)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic7() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("branchAnalysis");

  // Interactive Laboratory State
  const [targetCoverageThreshold, setTargetCoverageThreshold] = useState(85); // 80 | 85 | 90
  const [testedBranchCount, setTestedBranchCount] = useState(4); // 2 (50%) | 4 (100%)
  const [enableBranchMode, setEnableBranchMode] = useState(true);

  // Metrics computation
  const totalBranches = 4;
  const currentCoverage = enableBranchMode
    ? Math.round((testedBranchCount / totalBranches) * 100)
    : 100; // Statement coverage is 100% even with 2 branches
  const isCiPassing = currentCoverage >= targetCoverageThreshold;

  const generatedTomlSnippet = `# pyproject.toml - Enterprise Code Coverage Standards
[tool.coverage.run]
branch = ${enableBranchMode ? "true" : "false"}
source = ["src"]
omit = [
    "*/migrations/*",
    "*/tests/*",
    "*/__init__.py"
]

[tool.coverage.report]
fail_under = ${targetCoverageThreshold}.0
show_missing = true
precision = 2
exclude_lines = [
    "pragma: no cover",
    "def __repr__",
    "raise NotImplementedError",
    "if __name__ == .__main__.:",
    "if TYPE_CHECKING:",
    "@overload"
]

# Command Line Execution in CI/CD:
# pytest --cov=src --cov-branch --cov-report=term-missing --cov-fail-under=${targetCoverageThreshold}`;

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
            Topic 7
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Automated Testing, PyTest &amp; Quality Assurance
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Measuring Code Coverage: <span className="text-teal-400">pytest-cov &amp; coverage.py</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master test suite auditing, coverage metrics, and CI/CD quality gates in Python: distinguishing Statement (Line) Coverage from Branch Decision Coverage, reading terminal missing-line traces with <code className="text-teal-300 font-mono">--cov-report=term-missing</code>, generating interactive HTML reports, excluding boilerplate with <code className="text-cyan-300 font-mono"># pragma: no cover</code>, and enforcing automated build failure thresholds with <code className="text-purple-300 font-mono">--cov-fail-under=85</code>.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📊 Statement vs Branch Metrics
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🚦 CI/CD Quality Gates (--cov-fail-under)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🚫 Exclusion Pragmas (# pragma: no cover)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📑 HTML Interactive Heatmaps
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
              1. The Code Coverage &amp; Quality Gate Architecture
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Code coverage acts as an automated audit of your test suite, measuring which parts of your codebase were executed during test execution and highlighting untested blind spots before deployment:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ Statement Coverage</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">Line Traversal %</code>
                <p className="text-[11px] text-slate-300">
                  Measures the fraction of executable lines reached. High line coverage is necessary but does not guarantee correctness.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ Branch Coverage</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">--cov-branch</code>
                <p className="text-[11px] text-slate-300">
                  Verifies that every decision branch (both the True AND False outcomes of every <code className="text-cyan-300">if</code> statement) was traversed.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ Quality Gates</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">--cov-fail-under=85</code>
                <p className="text-[11px] text-slate-300">
                  Enforces minimum coverage thresholds in CI/CD, automatically rejecting PRs that cause coverage regressions.
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 shadow-lg">
                <div className="text-amber-400 font-bold text-sm mb-1">4️⃣ Exclusion Pragmas</div>
                <code className="text-xs font-mono text-amber-300 block mb-1"># pragma: no cover</code>
                <p className="text-[11px] text-slate-300">
                  Cleanly excludes abstract methods, debug dumps, and <code className="text-amber-300 font-mono">if __name__ == '__main__':</code> from coverage metrics.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The 100% Coverage Myth
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                A test with zero assertions can achieve <span className="text-rose-400 font-bold">100% line coverage</span> simply by calling the function! Code coverage measures <span className="text-emerald-400 font-bold">what code was executed</span>, not whether the output was verified correctly. Aim for 85%+ branch coverage paired with rigorous assertion testing.
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
                2. Visualizing Branch Paths, Terminal Reports &amp; HTML Heatmaps
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("branchAnalysis")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "branchAnalysis"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Statement vs Branch Paths
              </button>
              <button
                onClick={() => setActiveInteractiveTab("terminalReport")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "terminalReport"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Terminal Report Breakdown
              </button>
              <button
                onClick={() => setActiveInteractiveTab("htmlHeatmap")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "htmlHeatmap"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                HTML Visual Heatmap
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining decision branch coverage gaps, terminal table metric columns, and interactive HTML line traces:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "branchAnalysis" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">
                  STATEMENT VS BRANCH DECISION COVERAGE: THE HIDDEN FALSE BRANCH GAP
                </text>

                {/* Left: Code with single test */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="245" rx="8" fill="#0f172a" stroke="#14b8a6" />
                  <text x="20" y="30" fill="#5eead4" fontSize="12" fontWeight="bold">
                    Code Flow with Single Test (Score=95, EWS=True):
                  </text>
                  
                  <rect x="20" y="50" width="340" height="50" rx="4" fill="#022c22" stroke="#0d9488" />
                  <text x="30" y="70" fill="#a7f3d0" fontSize="9" fontFamily="monospace">if score &gt;= 90: discount += 0.20</text>
                  <text x="30" y="88" fill="#a7f3d0" fontSize="9" fontFamily="monospace">if is_ews: discount += 0.15</text>

                  <rect x="20" y="115" width="340" height="110" rx="4" fill="#134e4a" />
                  <text x="30" y="137" fill="#86efac" fontSize="10" fontWeight="bold">
                    Statement (Line) Coverage: 100% ✅
                  </text>
                  <text x="30" y="157" fill="#fca5a5" fontSize="10" fontWeight="bold">
                    Branch Coverage: 50% ❌ (2 of 4 branches missed!)
                  </text>
                  <text x="30" y="180" fill="#fecdd3" fontSize="8">
                    • Never tested when score &lt; 90 (False branch 1 missed)
                  </text>
                  <text x="30" y="198" fill="#fecdd3" fontSize="8">
                    • Never tested when is_ews is False (False branch 2 missed)
                  </text>
                </g>

                {/* Right: Full Branch Solution */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="245" rx="8" fill="#042f2e" stroke="#2dd4bf" />
                  <text x="20" y="30" fill="#5eead4" fontSize="12" fontWeight="bold">
                    Comprehensive Branch Coverage (4 Tests):
                  </text>

                  <rect x="20" y="50" width="340" height="30" rx="4" fill="#064e3b" />
                  <text x="30" y="70" fill="#a7f3d0" fontSize="9" fontFamily="monospace">1. Score=95, EWS=False ➔ True / False</text>

                  <rect x="20" y="85" width="340" height="30" rx="4" fill="#064e3b" />
                  <text x="30" y="105" fill="#a7f3d0" fontSize="9" fontFamily="monospace">2. Score=85, EWS=True  ➔ Elif / True</text>

                  <rect x="20" y="120" width="340" height="30" rx="4" fill="#064e3b" />
                  <text x="30" y="140" fill="#a7f3d0" fontSize="9" fontFamily="monospace">3. Score=70, EWS=True  ➔ False / True</text>

                  <rect x="20" y="155" width="340" height="30" rx="4" fill="#064e3b" />
                  <text x="30" y="175" fill="#a7f3d0" fontSize="9" fontFamily="monospace">4. Score=60, EWS=False ➔ False / False</text>

                  <text x="30" y="215" fill="#facc15" fontSize="10" fontWeight="bold">
                    🚀 100% Statement + 100% Branch Coverage Achieved!
                  </text>
                </g>
              </svg>
            ) : activeInteractiveTab === "terminalReport" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">
                  PYTEST-COV TERMINAL REPORT DECOMPOSITION (--cov-report=term-missing)
                </text>

                {/* Terminal Table */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#082f49" stroke="#0ea5e9" />

                  {/* Header Row */}
                  <rect x="25" y="35" width="770" height="35" rx="4" fill="#0369a1" />
                  <text x="35" y="57" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="monospace">
                    Name                      Stmts   Miss  Branch BrPart  Cover  Missing Lines
                  </text>

                  {/* Row 1 */}
                  <rect x="25" y="75" width="770" height="28" rx="2" fill="#0c4a6e" />
                  <text x="35" y="93" fill="#e0f2fe" fontSize="9" fontFamily="monospace">
                    src/admission_engine.py      45      0     12      0   100%   (All covered)
                  </text>

                  {/* Row 2 (Missing lines) */}
                  <rect x="25" y="105" width="770" height="28" rx="2" fill="#4c0519" stroke="#f43f5e" />
                  <text x="35" y="123" fill="#fecdd3" fontSize="9" fontFamily="monospace">
                    src/billing_processor.py     60      3     16      2    93%   45-47, 88-&gt;92
                  </text>

                  {/* Row 3 */}
                  <rect x="25" y="135" width="770" height="28" rx="2" fill="#0c4a6e" />
                  <text x="35" y="153" fill="#e0f2fe" fontSize="9" fontFamily="monospace">
                    src/transcript_engine.py     35      0      8      0   100%   (All covered)
                  </text>

                  {/* Summary Box */}
                  <rect x="25" y="175" width="770" height="50" rx="4" fill="#0f172a" stroke="#38bdf8" />
                  <text x="35" y="195" fill="#facc15" fontSize="9" fontWeight="bold">
                    Missing Diagnostic: Lines 45-47 in billing_processor.py were never executed!
                  </text>
                  <text x="35" y="212" fill="#94a3b8" fontSize="8">
                    Missing Branch: 88-&gt;92 indicates condition at line 88 was never evaluated as False.
                  </text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">
                  HTML INTERACTIVE COVERAGE HEATMAP (--cov-report=html)
                </text>

                {/* Heatmap UI */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#1e1b4b" stroke="#a855f7" />

                  {/* HTML Viewer Frame */}
                  <rect x="25" y="30" width="770" height="195" rx="6" fill="#090d16" stroke="#475569" />
                  
                  {/* Top Bar */}
                  <rect x="25" y="30" width="770" height="30" rx="6" fill="#1e293b" />
                  <text x="35" y="50" fill="#cbd5e1" fontSize="10" fontFamily="monospace">
                    htmlcov/src_billing_processor_py.html • 93.3% Coverage
                  </text>

                  {/* Green Covered Line */}
                  <rect x="35" y="70" width="750" height="22" rx="2" fill="#064e3b" />
                  <text x="45" y="85" fill="#86efac" fontSize="9" fontFamily="monospace">
                    44:   def pay_tuition(self, amount: float):
                  </text>

                  {/* Red Missed Lines */}
                  <rect x="35" y="95" width="750" height="42" rx="2" fill="#881337" stroke="#fb7185" />
                  <text x="45" y="110" fill="#fecdd3" fontSize="9" fontFamily="monospace">
                    45:       if amount &lt;= 0:
                  </text>
                  <text x="45" y="128" fill="#fecdd3" fontSize="9" fontFamily="monospace">
                    46:           raise ValueError("Payment must be positive")  # MISSED (RED)
                  </text>

                  {/* Yellow Partial Branch */}
                  <rect x="35" y="140" width="750" height="22" rx="2" fill="#78350f" stroke="#f59e0b" />
                  <text x="45" y="155" fill="#fef3c7" fontSize="9" fontFamily="monospace">
                    88:       if self.is_scholarship_eligible():  # PARTIAL BRANCH (YELLOW)
                  </text>

                  {/* Bottom Guide */}
                  <text x="45" y="195" fill="#e9d5ff" fontSize="9">
                    🟢 Green = Executed in tests | 🔴 Red = Never executed | 🟡 Yellow = Partial branch (True or False missed)
                  </text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE COVERAGE SIMULATOR */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧪</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Quality Gate &amp; Branch Coverage Simulator
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Adjust tested decision branch counts, toggle branch coverage evaluation, and set CI/CD quality gate failure thresholds:
          </p>

          <div className="bg-slate-950 p-5 sm:p-6 rounded-xl border border-slate-800/90 space-y-6">
            {/* Control Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Quality Gate Threshold */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  CI Quality Gate Threshold (--cov-fail-under):
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[80, 85, 90].map((val) => (
                    <button
                      key={val}
                      onClick={() => setTargetCoverageThreshold(val)}
                      className={clsx(
                        "p-2.5 rounded-xl border text-center font-mono font-bold transition-all",
                        targetCoverageThreshold === val
                          ? "bg-teal-950/60 border-teal-500 text-teal-300 shadow-md"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                      )}
                    >
                      {val}% Threshold
                    </button>
                  ))}
                </div>
              </div>

              {/* Tested Branches */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Tested Decision Branches:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { count: 2, label: "2 of 4 Branches (50%)", desc: "Misses False paths" },
                    { count: 4, label: "4 of 4 Branches (100%)", desc: "All paths tested" },
                  ].map((item) => (
                    <button
                      key={item.count}
                      onClick={() => setTestedBranchCount(item.count)}
                      className={clsx(
                        "p-2.5 rounded-xl border text-left transition-all",
                        testedBranchCount === item.count
                          ? "bg-cyan-950/60 border-cyan-500 shadow-md"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                      )}
                    >
                      <div className="text-xs font-bold text-slate-200">{item.label}</div>
                      <div className="text-[10px] text-cyan-400 font-mono">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Branch Mode Toggle */}
            <div className="flex items-center justify-between p-3 bg-slate-900/80 rounded-xl border border-slate-800">
              <div>
                <div className="text-xs font-bold text-white">Enable Strict Branch Coverage (--cov-branch)</div>
                <div className="text-[11px] text-slate-400">Forces coverage calculation to evaluate both True and False outcomes</div>
              </div>
              <button
                onClick={() => setEnableBranchMode(!enableBranchMode)}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all",
                  enableBranchMode
                    ? "bg-emerald-950 border border-emerald-500 text-emerald-300"
                    : "bg-slate-800 border border-slate-700 text-slate-400"
                )}
              >
                {enableBranchMode ? "BRANCH COVERAGE: ACTIVE" : "STATEMENT ONLY (LENIENT)"}
              </button>
            </div>

            {/* Metrics Dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-900/90 p-4 rounded-xl border border-teal-900/50">
                <div className="text-xs text-teal-400 font-medium mb-1">Computed Code Coverage</div>
                <div className="text-3xl font-bold font-mono text-teal-300">
                  {currentCoverage}%
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  {enableBranchMode ? `${testedBranchCount}/${totalBranches} branches` : "100% statements"}
                </div>
              </div>

              <div className={clsx(
                "p-4 rounded-xl border transition-all",
                isCiPassing
                  ? "bg-emerald-950/40 border-emerald-500/70"
                  : "bg-rose-950/40 border-rose-500/70"
              )}>
                <div className={clsx("text-xs font-medium mb-1", isCiPassing ? "text-emerald-400" : "text-rose-400")}>
                  CI/CD Build Quality Gate
                </div>
                <div className={clsx("text-2xl font-bold font-mono", isCiPassing ? "text-emerald-300" : "text-rose-300")}>
                  {isCiPassing ? "✅ BUILD PASSED" : "❌ BUILD FAILED"}
                </div>
                <div className="text-[11px] text-slate-300 mt-1">
                  {isCiPassing ? `Coverage >= ${targetCoverageThreshold}%` : `Required ${targetCoverageThreshold}%, Got ${currentCoverage}%`}
                </div>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-purple-900/50">
                <div className="text-xs text-purple-400 font-medium mb-1">Diagnostic Quality</div>
                <div className="text-xs font-bold font-mono text-purple-300 mt-1 leading-snug">
                  {enableBranchMode && testedBranchCount === 4
                    ? "Production Ready: 100% Robustness"
                    : "Untested False branches exist!"}
                </div>
              </div>
            </div>

            {/* Generated Dynamic Code */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Generated pyproject.toml Configuration &amp; CLI:
              </div>
              <pre className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl text-xs sm:text-sm font-mono text-teal-200 overflow-x-auto leading-relaxed">
                {generatedTomlSnippet}
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
              4. Production Code Labs &amp; Coverage Suites
            </h2>
          </div>

          <p className="text-slate-300 mb-8 text-base leading-relaxed">
            Inspect, run, and master all four production-grade code coverage labs covering statement vs branch metrics, exclusion pragmas, terminal diagnostic tables, and the complete institutional audit:
          </p>

          <div className="space-y-10">
            {/* Python Loader 1 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-teal-300">
                  Lab 1: Statement Coverage vs Branch Decision Coverage
                </h3>
                <p className="text-sm text-slate-400">
                  Demonstrating how a single test achieves 100% line coverage while missing critical False branches in scholarship calculations.
                </p>
              </div>
              <PythonFileLoader
                fileModule={statementVsBranchCode}
                title="basic_statement_vs_branch_coverage.py"
                highlightLines={[18, 24, 34, 46]}
              />
            </div>

            {/* Python Loader 2 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-cyan-300">
                  Lab 2: Exclusion Pragmas &amp; pyproject.toml Standards
                </h3>
                <p className="text-sm text-slate-400">
                  Using <code className="text-cyan-300 font-mono"># pragma: no cover</code> on untestable boilerplate and configuring project-wide coverage rules.
                </p>
              </div>
              <PythonFileLoader
                fileModule={configPragmasCode}
                title="coverage_configuration_and_exclusions.py"
                highlightLines={[20, 24, 42]}
              />
            </div>

            {/* Python Loader 3 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-purple-300">
                  Lab 3: pytest-cov CLI Reports &amp; Missing Line Diagnostics
                </h3>
                <p className="text-sm text-slate-400">
                  Interpreting terminal missing line number ranges (<code className="text-purple-300 font-mono">45-47</code>) and branch decision markers (<code className="text-purple-300 font-mono">88-&gt;92</code>).
                </p>
              </div>
              <PythonFileLoader
                fileModule={cliReportCode}
                title="pytest_cov_cli_and_html_reports.py"
                highlightLines={[14, 21]}
              />
            </div>

            {/* Python Loader 4 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-amber-300">
                  Lab 4: Institutional Student Ledger 100% Coverage Audit
                </h3>
                <p className="text-sm text-slate-400">
                  Complete audit of student fee mutations, merit tiers, and settlement logic for Mamata, Mahima, and Abhronila across Barrackpore, Kolkata, and Ichapur.
                </p>
              </div>
              <PythonFileLoader
                fileModule={institutionalAuditCode}
                title="institutional_coverage_audit_suite.py"
                highlightLines={[19, 31, 48, 64]}
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
              5. Code Coverage Pitfalls &amp; Anti-Patterns
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pitfall 1 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                1. Chasing 100% Vanity Coverage
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Writing low-value tests for trivial getters, setters, or Django settings files to hit 100% creates maintenance drag with zero reliability gain.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # ANTI-PATTERN: Testing trivial def get_name(self): return self.name{'\n'}
                # BEST PRACTICE: Focus on 85%+ branch coverage on core logic
              </pre>
            </div>

            {/* Pitfall 2 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                2. Ignoring Branch Coverage (--cov-branch)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Evaluating only statement coverage hides untested <code className="text-rose-400 font-mono">else:</code> branches and unhandled boolean decision conditions.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # BUG: pytest --cov=src (Misses False branches!){'\n'}
                # FIX: pytest --cov=src --cov-branch
              </pre>
            </div>

            {/* Pitfall 3 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                3. Counting Test Files as Source Code
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Running <code className="text-rose-400 font-mono">pytest --cov=.</code> includes test files in the coverage calculation, artificially inflating coverage numbers.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # BUG: --cov=. (Counts tests as source!){'\n'}
                # FIX: --cov=src or source = ["src"]
              </pre>
            </div>

            {/* Pitfall 4 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                4. Tests with Zero Assertions
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Executing code without asserting on the return value gives high line coverage while testing absolutely nothing!
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # BUG: def test_f(): calculate_fee() # 100% coverage, 0 checks!{'\n'}
                # FIX: assert calculate_fee() == 8500.0
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
              6. Professional Code Coverage Checklist
            </h2>
          </div>

          <div className="space-y-3 text-slate-300 text-sm sm:text-base">
            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Enable Branch Coverage:</strong> Always include <code className="text-teal-300 font-mono">--cov-branch</code> to test both True and False decision paths.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Set CI Quality Gates:</strong> Enforce <code className="text-teal-300 font-mono">--cov-fail-under=85</code> to block pull requests that degrade coverage.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Exclude Boilerplate via Pragmas:</strong> Use <code className="text-teal-300 font-mono"># pragma: no cover</code> for untestable <code className="text-teal-300 font-mono">__repr__</code> and debug fallbacks.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Audit Missing Lines with HTML Reports:</strong> Use <code className="text-teal-300 font-mono">--cov-report=html</code> to visually inspect uncovered red lines.
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQS */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <FAQTemplate
            title="Measuring Code Coverage with pytest-cov FAQs"
            questions={questions}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: PLAIN TEXT PRINT & DOWNLOAD NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <PlainTextPrint
            content={noteText}
            title="Topic 7: Measuring Code Coverage with pytest-cov Study Note"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Study Note"
            downloadFileName="topic7_note.txt"
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 9: TEACHER'S NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <Teacher
            note={
              "Code coverage is not a competition to reach vanity 100% metrics—it is a diagnostic flashlight that reveals untested logical blind spots. In our institutional student management systems across Barrackpore, Kolkata, Ichapur, and Jadavpur, auditing branch coverage ensures that every discount tier, scholarship boundary, and payment exception for Mamata, Mahima, and Abhronila is verified under both True and False conditions. Enforcing an 85% branch coverage gate in your CI pipeline guarantees rock-solid reliability across every production deployment."
            }
          />
        </section>

      </div>
    </div>
  );
}
