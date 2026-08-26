import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import assertRewritingCode from "./topic3_files/pytest_assert_rewriting_and_discovery.py?raw";
import fixturesCode from "./topic3_files/pytest_fixtures_and_dependency_injection.py?raw";
import conftestCode from "./topic3_files/pytest_conftest_and_shared_fixtures.py?raw";
import institutionalPytestCode from "./topic3_files/institutional_pytest_suite.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic3_files/topic3_note.txt?raw";

// FAQ Questions
import questions from "./topic3_files/topic3_questions";

/**
 * Topic3: Modern testing with PyTest: test discovery, assert statements, fixtures
 * Module: 004_003_python-testing
 * Segment: 4 (Python Pro Level & Ecosystem Mastery)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic3() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("astRewriting");

  // Interactive Laboratory State
  const [fixtureScope, setFixtureScope] = useState("function"); // function | module | session
  const [useYieldTeardown, setUseYieldTeardown] = useState(true);

  // Fixture metrics mapping
  let fixtureLifecycle = "Runs once per test function (Default, maximum isolation)";
  let executionCost = "Zero shared state, fresh instance per test";
  let typicalScenario = "Creating isolated student domain entities (Mamata, Mahima)";

  if (fixtureScope === "function") {
    fixtureLifecycle = "Setup & Teardown executed for EVERY test function";
    executionCost = "Complete state isolation (no inter-test pollution)";
    typicalScenario = "Instantiating fresh student objects or database records";
  } else if (fixtureScope === "module") {
    fixtureLifecycle = "Setup runs ONCE per test file; Teardown runs at file end";
    executionCost = "Amortized initialization for all tests in the file";
    typicalScenario = "Opening in-memory SQLite schema or loading 50MB sample dataset";
  } else if (fixtureScope === "session") {
    fixtureLifecycle = "Setup runs ONCE at test suite start; Teardown at suite exit";
    executionCost = "Highest speed for heavy application-wide resources";
    typicalScenario = "Spawning Docker container, FastAPI TestClient, or DB pool";
  }

  const generatedPythonSnippet = `# Modern PyTest Architecture
# Fixture Scope: @pytest.fixture(scope="${fixtureScope}") | Yield Teardown: ${useYieldTeardown}

import pytest
import sqlite3

@pytest.fixture(scope="${fixtureScope}")
def database_engine():
    # --- SETUP PHASE ---
    print("Connecting to in-memory database...")
    conn = sqlite3.connect(":memory:")
    conn.execute("CREATE TABLE students (sid TEXT, name TEXT, balance REAL)")
    
${
  useYieldTeardown
    ? `    # Yield passes the resource to the test and pauses here
    yield conn
    
    # --- TEARDOWN PHASE (Runs automatically after test finishes!) ---
    print("Closing database connection...")
    conn.close()`
    : `    return conn  # Setup only (no automatic teardown hook)`
}

@pytest.fixture
def sample_student(database_engine):
    # Modular Fixture Composition: requesting another fixture!
    with database_engine:
        database_engine.execute("INSERT INTO students VALUES ('STU_1', 'Mamata', 10000.0)")
    return {"sid": "STU_1", "name": "Mamata", "balance": 10000.0}

# Standalone Test Function (Zero OOP Class Boilerplate!)
def test_student_payment(database_engine, sample_student):
    # AST Assert Rewriting provides detailed key-by-key diffs!
    assert sample_student["name"] == "Mamata"
    assert sample_student["balance"] == 10000.0`;

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
            Topic 3
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Automated Testing, PyTest &amp; Quality Assurance
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Modern Testing with <span className="text-teal-400">PyTest</span>: Assertions &amp; Fixtures
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master the industry-standard Python testing framework: writing clean, zero-boilerplate standalone test functions, leveraging AST assert rewriting for colorful in-depth failure diffs, composing modular dependency-injected fixtures with <code className="text-teal-300 font-mono">@pytest.fixture</code>, managing teardown lifecycle hooks with <code className="text-cyan-300 font-mono">yield</code>, and sharing fixtures seamlessly across directories with <code className="text-purple-300 font-mono">conftest.py</code>.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ Zero-Boilerplate Functions
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔍 AST Assert Rewriting Diffs
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            💉 Modular Fixture Injection
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📂 conftest.py Global Sharing
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
              1. The PyTest Philosophy &amp; Architecture
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              PyTest revolutionized Python testing by replacing rigid object-oriented class hierarchies with functional, Pythonic test discovery, standard <code className="text-teal-300 font-mono">assert</code> statements, and modular dependency-injection fixtures:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ Zero Boilerplate</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">def test_*()</code>
                <p className="text-[11px] text-slate-300">
                  Write plain standalone functions without inheriting from <code className="text-teal-300">unittest.TestCase</code> or creating class wrappers.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ AST Assert Rewriting</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">assert a == b</code>
                <p className="text-[11px] text-slate-300">
                  PyTest rewrites the bytecode AST of plain assertions to render colorful key-by-key and item-by-item failure diffs.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ Modular Fixtures</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">@pytest.fixture + yield</code>
                <p className="text-[11px] text-slate-300">
                  Dependency injection via function parameters with yield-based teardown and scopes (<code className="text-purple-300">function</code>, <code className="text-purple-300">module</code>, <code className="text-purple-300">session</code>).
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 shadow-lg">
                <div className="text-amber-400 font-bold text-sm mb-1">4️⃣ conftest.py Discovery</div>
                <code className="text-xs font-mono text-amber-300 block mb-1">Global Scope Sharing</code>
                <p className="text-[11px] text-slate-300">
                  Define reusable mock fixtures once in <code className="text-amber-300 font-mono">conftest.py</code> and consume them everywhere without importing.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                Why PyTest Fixtures Destroy Legacy OOP setUp/tearDown
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                In legacy <code className="text-rose-400 font-mono">unittest</code>, every test in a class shares the exact same <code className="text-rose-400 font-mono">setUp()</code> method whether it needs it or not. In <code className="text-teal-300 font-mono">pytest</code>, test functions request <span className="text-emerald-400 font-bold">only the specific fixtures they need as parameters</span>, producing clean, composable, and decoupled test suites.
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
                2. Visualizing AST Rewriting, Fixture Trees &amp; conftest Sharing
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("astRewriting")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "astRewriting"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                AST Assert Rewriting
              </button>
              <button
                onClick={() => setActiveInteractiveTab("fixtureTree")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "fixtureTree"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Fixture Composition &amp; Yield
              </button>
              <button
                onClick={() => setActiveInteractiveTab("conftestScopes")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "conftestScopes"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                conftest.py Root Sharing
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining AST bytecode introspection, dependency-injection graph resolution, and project-wide fixture distribution:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "astRewriting" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">
                  AST ASSERT REWRITING: TURNING SIMPLE ASSERTS INTO RICH FAILURE DIAGNOSTICS
                </text>

                {/* Left: Code Box */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="245" rx="8" fill="#0f172a" stroke="#14b8a6" />
                  <text x="20" y="30" fill="#5eead4" fontSize="12" fontWeight="bold">
                    What Developer Writes in Python:
                  </text>
                  
                  <rect x="20" y="50" width="340" height="50" rx="4" fill="#022c22" stroke="#0d9488" />
                  <text x="30" y="73" fill="#a7f3d0" fontSize="11" fontFamily="monospace">
                    def test_student():
                  </text>
                  <text x="50" y="90" fill="#5eead4" fontSize="11" fontFamily="monospace">
                    assert get_campus() == "Barrackpore"
                  </text>

                  <rect x="20" y="115" width="340" height="110" rx="4" fill="#134e4a" />
                  <text x="30" y="137" fill="#ffffff" fontSize="10" fontWeight="bold">
                    PyTest AST Import Hook Interception:
                  </text>
                  <text x="30" y="155" fill="#ccfbf1" fontSize="9">
                    1. Intercepts import of test file
                  </text>
                  <text x="30" y="172" fill="#ccfbf1" fontSize="9">
                    2. Rewrites AST comparison nodes
                  </text>
                  <text x="30" y="190" fill="#ccfbf1" fontSize="9">
                    3. Instruments sub-expression evaluations
                  </text>
                  <text x="30" y="210" fill="#facc15" fontSize="9" fontWeight="bold">
                    ⚡ Zero manual self.assertEqual needed!
                  </text>
                </g>

                {/* Right: Terminal Output */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="245" rx="8" fill="#1e1e2e" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="12" fontWeight="bold">
                    PyTest Failure Output (Rich Diff):
                  </text>

                  <rect x="20" y="50" width="340" height="175" rx="4" fill="#090d16" stroke="#e11d48" />
                  <text x="30" y="72" fill="#fca5a5" fontSize="10" fontFamily="monospace">
                    &gt; assert get_campus() == "Barrackpore"
                  </text>
                  <text x="30" y="95" fill="#fb7185" fontSize="10" fontFamily="monospace">
                    E AssertionError: assert 'Kolkata' == 'Barrackpore'
                  </text>
                  <text x="30" y="120" fill="#fda4af" fontSize="9" fontFamily="monospace">
                    - Barrackpore
                  </text>
                  <text x="30" y="138" fill="#86efac" fontSize="9" fontFamily="monospace">
                    + Kolkata
                  </text>
                  <text x="30" y="170" fill="#94a3b8" fontSize="9">
                    Where: 'Kolkata' = get_campus()
                  </text>
                  <text x="30" y="195" fill="#facc15" fontSize="9" fontWeight="bold">
                    🎯 Instant failure localization in seconds!
                  </text>
                </g>
              </svg>
            ) : activeInteractiveTab === "fixtureTree" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">
                  FIXTURE COMPOSITION &amp; YIELD TEARDOWN TIMELINE
                </text>

                {/* Fixture Graph */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#082f49" stroke="#0ea5e9" />

                  {/* Level 1: DB Fixture */}
                  <rect x="25" y="45" width="220" height="130" rx="6" fill="#0c4a6e" stroke="#38bdf8" />
                  <text x="35" y="70" fill="#e0f2fe" fontSize="11" fontWeight="bold">@pytest.fixture: db_engine</text>
                  <text x="35" y="90" fill="#bae6fd" fontSize="9" fontFamily="monospace">1. conn = sqlite3.connect()</text>
                  <text x="35" y="108" fill="#facc15" fontSize="9" fontFamily="monospace">2. yield conn (Pauses!)</text>
                  <text x="35" y="126" fill="#f87171" fontSize="9" fontFamily="monospace">3. conn.close() (Teardown)</text>
                  <text x="35" y="155" fill="#38bdf8" fontSize="8" fontWeight="bold">Scope: module</text>

                  {/* Arrow 1 */}
                  <path d="M 245 110 L 295 110" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" />

                  {/* Level 2: Student Fixture */}
                  <rect x="300" y="45" width="240" height="130" rx="6" fill="#064e3b" stroke="#34d399" />
                  <text x="310" y="70" fill="#d1fae5" fontSize="11" fontWeight="bold">@pytest.fixture: student(db)</text>
                  <text x="310" y="90" fill="#a7f3d0" fontSize="9" fontFamily="monospace">1. db.insert("Mamata")</text>
                  <text x="310" y="108" fill="#facc15" fontSize="9" fontFamily="monospace">2. yield student (Active)</text>
                  <text x="310" y="126" fill="#a7f3d0" fontSize="9" fontFamily="monospace">3. db.delete(student)</text>
                  <text x="310" y="155" fill="#86efac" fontSize="8" fontWeight="bold">Requests db_engine fixture</text>

                  {/* Arrow 2 */}
                  <path d="M 540 110 L 590 110" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" />

                  {/* Level 3: Test Function */}
                  <rect x="595" y="45" width="200" height="130" rx="6" fill="#1e1b4b" stroke="#818cf8" />
                  <text x="605" y="70" fill="#e0e7ff" fontSize="11" fontWeight="bold">def test_pay(student):</text>
                  <text x="605" y="95" fill="#c7d2fe" fontSize="9" fontFamily="monospace">student.pay(5000)</text>
                  <text x="605" y="115" fill="#c7d2fe" fontSize="9" fontFamily="monospace">assert student.due == 5000</text>
                  <text x="605" y="155" fill="#86efac" fontSize="9" fontWeight="bold">✅ Injected &amp; Verified</text>

                  {/* Bottom Text */}
                  <rect x="25" y="190" width="770" height="40" rx="4" fill="#0f172a" stroke="#0ea5e9" />
                  <text x="40" y="215" fill="#e0f2fe" fontSize="10">
                    💡 Yield Fixtures cleanly separate Setup (before yield) from Teardown (after yield) with automatic LIFO execution.
                  </text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">
                  CONFTEST.PY: AUTOMATIC FIXTURE SHARING ACROSS DIRECTORIES
                </text>

                {/* Conftest Tree */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#1e1b4b" stroke="#a855f7" />

                  {/* Root Box */}
                  <rect x="25" y="35" width="770" height="65" rx="6" fill="#3b0764" stroke="#c084fc" />
                  <text x="40" y="60" fill="#f3e8ff" fontSize="12" fontWeight="bold">
                    📁 tests/conftest.py (Project Root Configuration)
                  </text>
                  <text x="40" y="80" fill="#d8b4fe" fontSize="10" fontFamily="monospace">
                    @pytest.fixture: mock_campus_roster, global_database_pool, auth_client
                  </text>

                  {/* Sub-tree 1 */}
                  <rect x="25" y="115" width="240" height="110" rx="6" fill="#0f172a" stroke="#60a5fa" />
                  <text x="35" y="140" fill="#bfdbfe" fontSize="11" fontWeight="bold">tests/test_admission.py</text>
                  <text x="35" y="160" fill="#93c5fd" fontSize="9" fontFamily="monospace">def test_admit(auth_client):</text>
                  <text x="35" y="180" fill="#93c5fd" fontSize="9" fontFamily="monospace">  assert auth_client.ready</text>
                  <text x="35" y="205" fill="#fde047" fontSize="8">Auto-injected from conftest!</text>

                  {/* Sub-tree 2 */}
                  <rect x="290" y="115" width="240" height="110" rx="6" fill="#0f172a" stroke="#34d399" />
                  <text x="300" y="140" fill="#d1fae5" fontSize="11" fontWeight="bold">tests/test_billing.py</text>
                  <text x="300" y="160" fill="#a7f3d0" fontSize="9" fontFamily="monospace">def test_fee(mock_roster):</text>
                  <text x="300" y="180" fill="#a7f3d0" fontSize="9" fontFamily="monospace">  assert "Mamata" in roster</text>
                  <text x="300" y="205" fill="#fde047" fontSize="8">No import statement required!</text>

                  {/* Sub-tree 3 */}
                  <rect x="555" y="115" width="240" height="110" rx="6" fill="#0f172a" stroke="#f59e0b" />
                  <text x="565" y="140" fill="#fef3c7" fontSize="11" fontWeight="bold">tests/campus/test_bp.py</text>
                  <text x="565" y="160" fill="#fde68a" fontSize="9" fontFamily="monospace">def test_bp(global_db):</text>
                  <text x="565" y="180" fill="#fde68a" fontSize="9" fontFamily="monospace">  assert global_db.is_open</text>
                  <text x="565" y="205" fill="#fde047" fontSize="8">Inherits parent conftest fixtures</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE FIXTURE & ASSERT SIMULATOR */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧪</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive PyTest Fixture Scope &amp; Yield Simulator
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Configure fixture execution scopes (<code className="text-teal-300 font-mono">function</code>, <code className="text-cyan-300 font-mono">module</code>, <code className="text-purple-300 font-mono">session</code>) and teardown mechanics to observe lifecycle behaviors and inspect production PyTest code:
          </p>

          <div className="bg-slate-950 p-5 sm:p-6 rounded-xl border border-slate-800/90 space-y-6">
            {/* Scope Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Select Fixture Scope:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "function", label: "scope='function'", icon: "🔄", tag: "Per Test (Default Isolation)" },
                  { id: "module", label: "scope='module'", icon: "📁", tag: "Once Per Test File" },
                  { id: "session", label: "scope='session'", icon: "🚀", tag: "Once Per Entire Test Run" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setFixtureScope(item.id)}
                    className={clsx(
                      "p-3 rounded-xl border text-left transition-all",
                      fixtureScope === item.id
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

            {/* Yield Teardown Toggle */}
            <div className="flex items-center justify-between p-3 bg-slate-900/80 rounded-xl border border-slate-800">
              <div>
                <div className="text-xs font-bold text-white">Enable Yield Teardown Hook</div>
                <div className="text-[11px] text-slate-400">Executes automatic cleanup logic after test completion</div>
              </div>
              <button
                onClick={() => setUseYieldTeardown(!useYieldTeardown)}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all",
                  useYieldTeardown
                    ? "bg-emerald-950 border border-emerald-500 text-emerald-300"
                    : "bg-slate-800 border border-slate-700 text-slate-400"
                )}
              >
                {useYieldTeardown ? "YIELD TEARDOWN: ACTIVE" : "RETURN: SETUP ONLY"}
              </button>
            </div>

            {/* Metrics Dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-900/90 p-4 rounded-xl border border-teal-900/50">
                <div className="text-xs text-teal-400 font-medium mb-1">Execution Lifecycle</div>
                <div className="text-xs font-bold font-mono text-teal-300 mt-1 leading-snug">
                  {fixtureLifecycle}
                </div>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-cyan-900/50">
                <div className="text-xs text-cyan-400 font-medium mb-1">State Isolation</div>
                <div className="text-xs font-bold font-mono text-cyan-300 mt-1 leading-snug">
                  {executionCost}
                </div>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-purple-900/50">
                <div className="text-xs text-purple-400 font-medium mb-1">Recommended Usage</div>
                <div className="text-xs font-bold font-mono text-purple-300 mt-1 leading-snug">
                  {typicalScenario}
                </div>
              </div>
            </div>

            {/* Generated Dynamic Code */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Generated Modern PyTest Implementation:
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
              4. Production Code Labs &amp; PyTest Suites
            </h2>
          </div>

          <p className="text-slate-300 mb-8 text-base leading-relaxed">
            Inspect, run, and master all four production-grade pytest labs covering standalone functions with AST assert rewriting, dependency injection with <code className="text-teal-300 font-mono">@pytest.fixture</code>, shared project-wide fixtures with <code className="text-cyan-300 font-mono">conftest.py</code>, and the complete institutional student manager:
          </p>

          <div className="space-y-10">
            {/* Python Loader 1 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-teal-300">
                  Lab 1: PyTest Standalone Functions &amp; AST Assert Rewriting
                </h3>
                <p className="text-sm text-slate-400">
                  Writing zero-boilerplate standalone test functions with plain Python <code className="text-teal-300 font-mono">assert</code> statements for tuition discounts and dictionary comparisons.
                </p>
              </div>
              <PythonFileLoader
                fileModule={assertRewritingCode}
                title="pytest_assert_rewriting_and_discovery.py"
                highlightLines={[25, 30, 35]}
              />
            </div>

            {/* Python Loader 2 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-cyan-300">
                  Lab 2: @pytest.fixture Dependency Injection &amp; Yield Teardown
                </h3>
                <p className="text-sm text-slate-400">
                  Building modular in-memory SQLite database fixtures with yield teardown and chaining composed student fixtures.
                </p>
              </div>
              <PythonFileLoader
                fileModule={fixturesCode}
                title="pytest_fixtures_and_dependency_injection.py"
                highlightLines={[18, 23, 27, 36]}
              />
            </div>

            {/* Python Loader 3 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-purple-300">
                  Lab 3: Shared conftest.py Fixtures &amp; Composed Rosters
                </h3>
                <p className="text-sm text-slate-400">
                  Distributing multi-campus student mock rosters (Barrackpore, Kolkata, Ichapur) project-wide without import statements.
                </p>
              </div>
              <PythonFileLoader
                fileModule={conftestCode}
                title="pytest_conftest_and_shared_fixtures.py"
                highlightLines={[14, 29, 39]}
              />
            </div>

            {/* Python Loader 4 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-amber-300">
                  Lab 4: Institutional Student Admission &amp; GPA PyTest Suite
                </h3>
                <p className="text-sm text-slate-400">
                  Complete modern pytest suite verifying candidate registration, duplicate prevention, and multi-course GPA calculation for Abhronila.
                </p>
              </div>
              <PythonFileLoader
                fileModule={institutionalPytestCode}
                title="institutional_pytest_suite.py"
                highlightLines={[42, 54, 65]}
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
              5. PyTest Pitfalls &amp; Anti-Patterns
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pitfall 1 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                1. Calling Fixtures Directly as Functions
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Calling a fixture like a function (<code className="text-rose-400 font-mono">my_fix = fresh_student()</code>) invokes the fixture generator rather than the injected value! Declare it as a parameter instead.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # BUG: s = fresh_student() # Fixture function call error!{'\n'}
                # FIX: def test_pay(fresh_student): ...
              </pre>
            </div>

            {/* Pitfall 2 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                2. Importing conftest.py Explicitly
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Writing <code className="text-rose-400 font-mono">from conftest import my_fixture</code> causes duplicate fixture registration warnings. PyTest discovers <code className="text-teal-300 font-mono">conftest.py</code> automatically.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # BUG: from conftest import db_conn{'\n'}
                # FIX: Just pass db_conn as a test parameter
              </pre>
            </div>

            {/* Pitfall 3 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                3. Mutating Session-Scoped Fixtures
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Modifying shared data inside a <code className="text-rose-400 font-mono">scope="session"</code> fixture pollutes subsequent tests. Use session scope only for immutable or read-only resources.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # BUG: global_session_roster.clear(){'\n'}
                # FIX: Use scope="function" for mutable state
              </pre>
            </div>

            {/* Pitfall 4 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                4. Adding __init__.py Inside Test Directories
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Adding <code className="text-rose-400 font-mono">__init__.py</code> inside test folders can alter module namespace resolution and create import collisions across different test subdirectories.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # BEST PRACTICE: Keep tests/ as a directory without __init__.py{'\n'}
                # Use src/ layout and pip install -e .
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
              6. Professional PyTest Checklist
            </h2>
          </div>

          <div className="space-y-3 text-slate-300 text-sm sm:text-base">
            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Use Standalone Test Functions:</strong> Prefer simple <code className="text-teal-300 font-mono">def test_*():</code> functions over unnecessary OOP test classes.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Rely on Plain Assert Statements:</strong> Let PyTest's AST rewriter generate colorful failure diffs.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Use Yield Fixtures for Teardown:</strong> Place setup logic before <code className="text-teal-300 font-mono">yield</code> and cleanup logic after.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Organize Shared State in conftest.py:</strong> Store cross-file fixtures in <code className="text-teal-300 font-mono">conftest.py</code> for zero-import auto-discovery.
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQS */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <FAQTemplate
            title="Modern PyTest Framework FAQs"
            questions={questions}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: PLAIN TEXT PRINT & DOWNLOAD NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <PlainTextPrint
            content={noteText}
            title="Topic 3: Modern Testing with PyTest Study Note"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Study Note"
            downloadFileName="topic3_note.txt"
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 9: TEACHER'S NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <Teacher
            note={
              "PyTest represents the pinnacle of modern Python testing ergonomics. In our institutional software across Barrackpore, Kolkata, Ichapur, and Jadavpur, transitioning from verbose test classes to clean, expressive pytest functions and dependency-injected fixtures has cut test code size in half while providing vastly superior failure diagnostics. Leveraging yield fixtures for database setups and conftest.py for candidate roster sharing ensures that testing student enrollment for Mamata, Mahima, and Abhronila is fast, modular, and enjoyable."
            }
          />
        </section>

      </div>
    </div>
  );
}
