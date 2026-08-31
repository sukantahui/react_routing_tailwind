import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import unitTestCode from "./topic1_files/unit_testing_pure_functions.py?raw";
import integrationTestCode from "./topic1_files/integration_testing_multi_component.py?raw";
import functionalE2ECode from "./topic1_files/functional_system_e2e_testing.py?raw";
import pyramidCaseCode from "./topic1_files/testing_pyramid_case_study.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic1_files/topic1_note.txt?raw";

// FAQ Questions
import questions from "./topic1_files/topic1_questions";

/**
 * Topic1: Types of testing: Unit testing, Integration testing, Functional testing
 * Module: 004_003_python-testing
 * Segment: 4 (Python Pro Level & Ecosystem Mastery)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic1() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("pyramidModel");

  // Interactive Laboratory State
  const [selectedTier, setSelectedTier] = useState("UNIT"); // UNIT | INTEGRATION | FUNCTIONAL_E2E
  const [testCount, setTestCount] = useState(100);

  // Metrics mapping
  let executionSpeed = "< 1 microsecond per test";
  let failureLocalization = "Pinpoints exact line of source code";
  let externalDependencies = "Zero (100% In-Memory Execution)";
  let pyramidProportion = "70% of entire test suite (Broad Base)";

  if (selectedTier === "UNIT") {
    executionSpeed = "~0.1 microseconds / test";
    failureLocalization = "Exact source line & assertion contract";
    externalDependencies = "Zero (Pure memory execution)";
    pyramidProportion = "70% of entire test suite (Foundation)";
  } else if (selectedTier === "INTEGRATION") {
    executionSpeed = "~1.5 milliseconds / test";
    failureLocalization = "Component interface & SQL query boundary";
    externalDependencies = "In-memory SQLite, Caching, Repository";
    pyramidProportion = "20% of entire test suite (Middle Tier)";
  } else if (selectedTier === "FUNCTIONAL_E2E") {
    executionSpeed = "~15 - 50 milliseconds / test";
    failureLocalization = "High-level user workflow / subsystem contract";
    externalDependencies = "Full App Stack, HTTP APIs, Serialization";
    pyramidProportion = "10% of entire test suite (Apex)";
  }

  const generatedPythonSnippet = `# Testing Pyramid Tier: ${selectedTier}
# Test Volume: ${testCount} tests | Speed: ${executionSpeed}

${
  selectedTier === "UNIT"
    ? `# Level 1: UNIT TEST (Pure Function in Memory)
def test_gpa_calculation():
    # Arrange: Pure input data
    marks = [95.0, 90.0, 92.0]
    # Act: Calculate in CPU memory (<0.0001s)
    gpa = calculate_gpa(marks)
    # Assert: Exact mathematical contract
    assert gpa == 9.23, "Mamata GPA calculation failed"`
    : selectedTier === "INTEGRATION"
    ? `# Level 2: INTEGRATION TEST (Service + In-Memory Database)
def test_billing_db_synchronization():
    # Arrange: Setup in-memory SQLite table
    db = StudentDatabase(":memory:")
    db.insert_student("STU_BP_101", "Mamata", "Barrackpore", 10000.0)
    service = BillingService(db)

    # Act: Perform multi-component business operation
    rem_balance = service.process_payment("STU_BP_101", 3500.0)

    # Assert: Verify service return AND persisted SQLite state
    assert rem_balance == 6500.0
    assert db.get_student("STU_BP_101")["balance"] == 6500.0`
    : `# Level 3: FUNCTIONAL / E2E TEST (Complete User Journey)
def test_e2e_student_admission_flow():
    # Arrange: Black-box HTTP API request payload
    app = AdmissionSystemApp()
    request_payload = json.dumps({
        "name": "Mamata",
        "campus": "Barrackpore",
        "course": "Python Pro",
        "initial_payment": 8000.0
    })

    # Act: Process full application journey
    response = json.loads(app.handle_request(request_payload))

    # Assert: Validate end-to-end customer contract
    assert response["status"] == "SUCCESS"
    assert response["app_id"] == "APP_0001"
    assert response["remaining_due"] == 17000.0`
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
            Topic 1
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Automated Testing, PyTest &amp; Quality Assurance
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Types of Testing: <span className="text-teal-400">Unit, Integration &amp; E2E</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master the professional Testing Pyramid hierarchy: building hundreds of lightning-fast <span className="text-teal-300 font-semibold">Unit Tests</span> ($O(1)$ memory execution), robust <span className="text-cyan-300 font-semibold">Integration Tests</span> (validating database and component collaboration), and lean <span className="text-purple-300 font-semibold">Functional / E2E Tests</span> (validating complete customer journeys across Barrackpore and Kolkata admission services).
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ 70% Unit Tests (Microsecond Speed)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🗄️ 20% Integration Tests (SQLite/APIs)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🌐 10% Functional E2E Journeys
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ Avoid Ice-Cream Cone Trap
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
              1. The Testing Pyramid Hierarchy &amp; Trade-Offs
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Different types of automated tests address different failure modes. A balanced testing strategy organizes tests according to speed, cost, and localization precision:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Level 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ Level 1: Unit Tests (~70%)</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">In-Memory Logic Isolation</code>
                <p className="text-[11px] text-slate-300">
                  Tests individual functions, formulas, and domain entities with zero I/O. Runs in microseconds and pinpoints the exact line of code at fault.
                </p>
              </div>

              {/* Level 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ Level 2: Integration Tests (~20%)</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">Component Collaboration</code>
                <p className="text-[11px] text-slate-300">
                  Verifies interactions across boundaries (Service + SQLite + Caches). Catches SQL syntax errors, schema mismatches, and serialization bugs.
                </p>
              </div>

              {/* Level 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ Level 3: Functional / E2E (~10%)</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">Black-Box User Journeys</code>
                <p className="text-[11px] text-slate-300">
                  Simulates complete client HTTP requests to database commits and PDF receipts. Ensures the end-to-end business workflow delivers value.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Ice-Cream Cone Anti-Pattern
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                The <span className="text-rose-400 font-bold">Ice Cream Cone Anti-Pattern</span> occurs when a project has very few unit tests, some integration tests, and massive suites of slow, brittle E2E tests. This results in slow CI builds (taking hours), high test maintenance costs, and frequent false alarms. Always maintain a broad, fast Unit Test base.
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
                2. Visualizing Test Pyramids, Boundary Mocks &amp; Workflows
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("pyramidModel")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "pyramidModel"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Testing Pyramid Model
              </button>
              <button
                onClick={() => setActiveInteractiveTab("integrationBoundary")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "integrationBoundary"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Integration Boundaries
              </button>
              <button
                onClick={() => setActiveInteractiveTab("e2eUserFlow")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "e2eUserFlow"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                E2E User Journey
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining the distribution ratios, component boundaries, and black-box verification flows:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "pyramidModel" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">
                  THE TESTING PYRAMID: IDEAL DISTRIBUTION RATIOS &amp; EXECUTION SPEEDS
                </text>

                {/* Left: Visual Pyramid */}
                <g transform="translate(40, 50)">
                  {/* Top: E2E */}
                  <polygon points="180,20 280,80 80,80" fill="#3b0764" stroke="#a855f7" strokeWidth="2" />
                  <text x="180" y="65" fill="#f3e8ff" fontSize="10" fontWeight="bold" textAnchor="middle">
                    10% E2E / Functional
                  </text>

                  {/* Middle: Integration */}
                  <polygon points="80,85 280,85 330,155 30,155" fill="#082f49" stroke="#0ea5e9" strokeWidth="2" />
                  <text x="180" y="125" fill="#e0f2fe" fontSize="11" fontWeight="bold" textAnchor="middle">
                    20% Integration Tests
                  </text>

                  {/* Base: Unit Tests */}
                  <polygon points="30,160 330,160 380,235 -20,235" fill="#042f2e" stroke="#14b8a6" strokeWidth="2" />
                  <text x="180" y="205" fill="#ccfbf1" fontSize="12" fontWeight="bold" textAnchor="middle">
                    70% Unit Tests (Broad Base)
                  </text>
                </g>

                {/* Right: Characteristic Details */}
                <g transform="translate(460, 50)">
                  <rect x="0" y="0" width="390" height="245" rx="8" fill="#0f172a" stroke="#334155" />
                  <text x="20" y="30" fill="#94a3b8" fontSize="12" fontWeight="bold">
                    Tier Metrics &amp; Characteristics
                  </text>

                  {/* Row 1: E2E */}
                  <rect x="20" y="48" width="350" height="48" rx="4" fill="#2e1065" stroke="#a855f7" />
                  <text x="30" y="68" fill="#f3e8ff" fontSize="10" fontWeight="bold">E2E Tests: High Confidence, Slow Speed</text>
                  <text x="30" y="84" fill="#d8b4fe" fontSize="9">Speed: ~20-50ms | Scope: Complete Web Journey</text>

                  {/* Row 2: Integration */}
                  <rect x="20" y="106" width="350" height="48" rx="4" fill="#0c4a6e" stroke="#0ea5e9" />
                  <text x="30" y="126" fill="#e0f2fe" fontSize="10" fontWeight="bold">Integration Tests: Medium Speed &amp; Scope</text>
                  <text x="30" y="142" fill="#bae6fd" fontSize="9">Speed: ~1-3ms | Scope: DB Schemas &amp; Repositories</text>

                  {/* Row 3: Unit */}
                  <rect x="20" y="164" width="350" height="60" rx="4" fill="#115e59" stroke="#14b8a6" />
                  <text x="30" y="184" fill="#ccfbf1" fontSize="10" fontWeight="bold">Unit Tests: Ultra-Fast, Precise Failure Spotting</text>
                  <text x="30" y="200" fill="#99f6e4" fontSize="9">Speed: &lt;0.001ms | Scope: Pure Functions &amp; Invariants</text>
                  <text x="30" y="214" fill="#5eead4" fontSize="8" fontWeight="bold">⚡ Runs 1,000 tests in 0.05 seconds!</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "integrationBoundary" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">
                  INTEGRATION TESTING: VALIDATING BOUNDARIES ACROSS COLLABORATING SUBSYSTEMS
                </text>

                {/* Subsystem Flow */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#082f49" stroke="#0ea5e9" />

                  {/* Box 1: Service */}
                  <rect x="30" y="60" width="220" height="120" rx="6" fill="#0c4a6e" stroke="#38bdf8" />
                  <text x="45" y="85" fill="#e0f2fe" fontSize="12" fontWeight="bold">BillingService</text>
                  <text x="45" y="108" fill="#bae6fd" fontSize="9" fontFamily="monospace">process_payment(sid, 3500)</text>
                  <text x="45" y="126" fill="#bae6fd" fontSize="9" fontFamily="monospace">Validates business rules</text>
                  <text x="45" y="155" fill="#38bdf8" fontSize="9" fontWeight="bold">⚙️ Business Logic Tier</text>

                  {/* Arrow 1 */}
                  <path d="M 255 120 L 305 120" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow)" />
                  <text x="280" y="112" fill="#e0f2fe" fontSize="9" textAnchor="middle">SQL Execute</text>

                  {/* Box 2: Repository / DB */}
                  <rect x="310" y="60" width="240" height="120" rx="6" fill="#064e3b" stroke="#34d399" />
                  <text x="325" y="85" fill="#d1fae5" fontSize="12" fontWeight="bold">StudentDatabase (:memory:)</text>
                  <text x="325" y="108" fill="#a7f3d0" fontSize="9" fontFamily="monospace">UPDATE students SET balance</text>
                  <text x="325" y="126" fill="#a7f3d0" fontSize="9" fontFamily="monospace">WHERE sid = 'STU_BP_101'</text>
                  <text x="325" y="155" fill="#86efac" fontSize="9" fontWeight="bold">🗄️ In-Memory SQLite Table</text>

                  {/* Box 3: Verification */}
                  <rect x="580" y="60" width="210" height="120" rx="6" fill="#1e1b4b" stroke="#818cf8" />
                  <text x="595" y="85" fill="#e0e7ff" fontSize="12" fontWeight="bold">Assert Contract</text>
                  <text x="595" y="108" fill="#c7d2fe" fontSize="9" fontFamily="monospace">1. Return == 6500.0</text>
                  <text x="595" y="126" fill="#c7d2fe" fontSize="9" fontFamily="monospace">2. DB.balance == 6500.0</text>
                  <text x="595" y="155" fill="#fde047" fontSize="9" fontWeight="bold">✅ State Sync Verified</text>

                  {/* Bottom Text */}
                  <rect x="30" y="195" width="760" height="35" rx="4" fill="#0f172a" stroke="#0ea5e9" />
                  <text x="45" y="217" fill="#e0f2fe" fontSize="10">
                    💡 Integration tests ensure that SQL statements, data types, and transactional states match perfectly.
                  </text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">
                  FUNCTIONAL / E2E: BLACK-BOX CANDIDATE ADMISSION JOURNEY
                </text>

                {/* E2E Workflow */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#1e1b4b" stroke="#a855f7" />

                  {/* Step 1 */}
                  <rect x="25" y="55" width="220" height="115" rx="6" fill="#3b0764" stroke="#c084fc" />
                  <text x="35" y="78" fill="#f3e8ff" fontSize="11" fontWeight="bold">1. Client JSON Request</text>
                  <text x="35" y="98" fill="#d8b4fe" fontSize="9" fontFamily="monospace">name: "Mamata"</text>
                  <text x="35" y="114" fill="#d8b4fe" fontSize="9" fontFamily="monospace">campus: "Barrackpore"</text>
                  <text x="35" y="130" fill="#d8b4fe" fontSize="9" fontFamily="monospace">initial_payment: 8000</text>
                  <text x="35" y="153" fill="#fbcfe8" fontSize="8">Simulates HTTP POST /admit</text>

                  {/* Step 2 */}
                  <rect x="275" y="55" width="255" height="115" rx="6" fill="#0f172a" stroke="#38bdf8" />
                  <text x="285" y="78" fill="#e0f2fe" fontSize="11" fontWeight="bold">2. Black-Box Processing</text>
                  <text x="285" y="98" fill="#94a3b8" fontSize="9" fontFamily="monospace">AdmissionSystemApp()</text>
                  <text x="285" y="114" fill="#94a3b8" fontSize="9" fontFamily="monospace">Validation ➔ Roster Insert</text>
                  <text x="285" y="130" fill="#94a3b8" fontSize="9" fontFamily="monospace">Ledger Entry ➔ Receipt Gen</text>
                  <text x="285" y="153" fill="#86efac" fontSize="8">Full business workflow</text>

                  {/* Step 3 */}
                  <rect x="560" y="55" width="235" height="115" rx="6" fill="#064e3b" stroke="#34d399" />
                  <text x="570" y="78" fill="#d1fae5" fontSize="11" fontWeight="bold">3. Validated Outcome</text>
                  <text x="570" y="98" fill="#a7f3d0" fontSize="9" fontFamily="monospace">status: "SUCCESS"</text>
                  <text x="570" y="114" fill="#a7f3d0" fontSize="9" fontFamily="monospace">app_id: "APP_0001"</text>
                  <text x="570" y="130" fill="#a7f3d0" fontSize="9" fontFamily="monospace">receipt_id: "RCP_0001"</text>
                  <text x="570" y="153" fill="#fde047" fontSize="8">Complete user journey verified</text>

                  {/* Bottom Text */}
                  <rect x="25" y="185" width="770" height="40" rx="4" fill="#0f172a" stroke="#a855f7" />
                  <text x="40" y="210" fill="#e9d5ff" fontSize="10">
                    🌐 Functional E2E tests guarantee that end-users receive expected business value without inspecting code internals.
                  </text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE TIER SELECTOR & SIMULATOR */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧪</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Testing Tier Selector &amp; Metric Simulator
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Select a tier from the Testing Pyramid to examine its execution velocity, architectural scope, failure localization, and production Python code:
          </p>

          <div className="bg-slate-950 p-5 sm:p-6 rounded-xl border border-slate-800/90 space-y-6">
            {/* Tier Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Choose Pyramid Level:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "UNIT", label: "Unit Testing", icon: "⚡", tag: "70% of Suite (Fastest)" },
                  { id: "INTEGRATION", label: "Integration Testing", icon: "🗄️", tag: "20% of Suite (Boundaries)" },
                  { id: "FUNCTIONAL_E2E", label: "Functional / E2E", icon: "🌐", tag: "10% of Suite (User Journeys)" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedTier(item.id)}
                    className={clsx(
                      "p-3 rounded-xl border text-left transition-all",
                      selectedTier === item.id
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

            {/* Metrics Dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              <div className="bg-slate-900/90 p-4 rounded-xl border border-teal-900/50">
                <div className="text-xs text-teal-400 font-medium mb-1">Execution Velocity</div>
                <div className="text-xs font-bold font-mono text-teal-300 mt-1">
                  {executionSpeed}
                </div>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-cyan-900/50">
                <div className="text-xs text-cyan-400 font-medium mb-1">Failure Localization</div>
                <div className="text-xs font-bold font-mono text-cyan-300 mt-1 leading-snug">
                  {failureLocalization}
                </div>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-purple-900/50">
                <div className="text-xs text-purple-400 font-medium mb-1">External Dependencies</div>
                <div className="text-xs font-bold font-mono text-purple-300 mt-1 leading-snug">
                  {externalDependencies}
                </div>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-amber-900/50">
                <div className="text-xs text-amber-400 font-medium mb-1">Pyramid Share</div>
                <div className="text-xs font-bold font-mono text-amber-300 mt-1 leading-snug">
                  {pyramidProportion}
                </div>
              </div>
            </div>

            {/* Generated Dynamic Code */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Production Implementation Example:
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
              4. Production Code Labs &amp; Testing Suite
            </h2>
          </div>

          <p className="text-slate-300 mb-8 text-base leading-relaxed">
            Inspect, run, and master all four production-grade testing labs covering pure function unit testing, in-memory SQLite integration verification, full black-box functional E2E admission flows, and the multi-tier testing pyramid benchmark:
          </p>

          <div className="space-y-10">
            {/* Python Loader 1 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-teal-300">
                  Lab 1: Unit Testing Isolated Pure Functions in Memory
                </h3>
                <p className="text-sm text-slate-400">
                  Executing sub-microsecond unit tests on GPA calculation, late fee caps, and regional campus waiver logic across Barrackpore and Kolkata students.
                </p>
              </div>
              <PythonFileLoader
                fileModule={unitTestCode}
                title="unit_testing_pure_functions.py"
                highlightLines={[12, 27, 36, 45]}
              />
            </div>

            {/* Python Loader 2 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-cyan-300">
                  Lab 2: Integration Testing Service &amp; In-Memory SQLite Database
                </h3>
                <p className="text-sm text-slate-400">
                  Verifying collaboration between <code className="text-cyan-300 font-mono">BillingService</code> and <code className="text-cyan-300 font-mono">StudentDatabase</code> using in-memory SQLite tables (<code className="text-cyan-300 font-mono">:memory:</code>) to test payment persistence.
                </p>
              </div>
              <PythonFileLoader
                fileModule={integrationTestCode}
                title="integration_testing_multi_component.py"
                highlightLines={[42, 53, 62]}
              />
            </div>

            {/* Python Loader 3 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-purple-300">
                  Lab 3: Functional / End-to-End Black-Box Candidate Admission Flow
                </h3>
                <p className="text-sm text-slate-400">
                  Simulating complete client JSON request payloads through the admission engine, verifying full transaction validation, fee due calculation, and receipt generation.
                </p>
              </div>
              <PythonFileLoader
                fileModule={functionalE2ECode}
                title="functional_system_e2e_testing.py"
                highlightLines={[18, 47, 61]}
              />
            </div>

            {/* Python Loader 4 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-amber-300">
                  Lab 4: The Multi-Tier Testing Pyramid Benchmark Case Study
                </h3>
                <p className="text-sm text-slate-400">
                  Benchmarking a full 70-test suite distribution (50 Unit, 15 Integration, 5 E2E) demonstrating how 70 unit tests execute in &lt;1ms while maintaining full coverage.
                </p>
              </div>
              <PythonFileLoader
                fileModule={pyramidCaseCode}
                title="testing_pyramid_case_study.py"
                highlightLines={[17, 26, 35, 48]}
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
                1. The Ice Cream Cone Trap
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Writing 90% E2E tests and almost no unit tests creates an extremely slow, flaky, and expensive test suite that takes hours to run in CI.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # ANTI-PATTERN: 100 E2E tests, 5 unit tests{'\n'}
                # BEST PRACTICE: 100 Unit tests, 10 E2E tests
              </pre>
            </div>

            {/* Pitfall 2 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                2. Testing Private Helper Implementation Details
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Directly testing private methods (e.g. <code className="text-rose-400 font-mono">_compute_raw_sub()</code>) breaks tests whenever you refactor internal helper functions. Test public APIs instead.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # BAD: test_obj._private_math_step(){'\n'}
                # GOOD: test_obj.public_calculate_total()
              </pre>
            </div>

            {/* Pitfall 3 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                3. Over-Mocking Integration Tests
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Mocking out the database in an integration test defeats the purpose of the test; use real in-memory SQLite tables to verify real SQL queries.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # BAD: Mocking DB in integration test{'\n'}
                # GOOD: Using sqlite3.connect(":memory:")
              </pre>
            </div>

            {/* Pitfall 4 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                4. Hardcoded File System Paths
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Hardcoding absolute paths (e.g. <code className="text-rose-400 font-mono">"C:\temp\data.json"</code>) causes tests to crash on Linux CI build runners. Use <code className="text-teal-300 font-mono">tmp_path</code>.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # BAD: path = "C:/test.db"{'\n'}
                # GOOD: path = tmp_path / "test.db"
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
              6. Professional Testing Pyramid Checklist
            </h2>
          </div>

          <div className="space-y-3 text-slate-300 text-sm sm:text-base">
            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Respect the 70/20/10 Ratio:</strong> Build 70% unit tests, 20% integration tests, and 10% E2E tests for maximum velocity and stability.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Use In-Memory SQLite for Integration:</strong> Use <code className="text-teal-300 font-mono">:memory:</code> to test real SQL operations in milliseconds without on-disk file cleanup.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Focus E2E on Critical Journeys:</strong> Reserve full functional E2E tests for essential user flows (login, payments, candidate admission).
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Test Public Behaviors, Not Private Code:</strong> Decouple tests from internal refactoring by exercising public interfaces.
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQS */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <FAQTemplate
            title="Types of Software Testing FAQs"
            questions={questions}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: PLAIN TEXT PRINT & DOWNLOAD NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <PlainTextPrint
            content={noteText}
            title="Topic 1: Types of Testing (Unit, Integration, Functional) Study Note"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Study Note"
            downloadFileName="topic1_note.txt"
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 9: TEACHER'S NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <Teacher
            note={
              "Understanding the testing pyramid is essential for building scalable applications without drowning in test maintenance. In our multi-campus administrative systems across Barrackpore, Kolkata, Ichapur, and Jadavpur, writing fast unit tests for student fee waivers and grade curves gives us instant feedback, integration tests ensure our SQLite database records stay in sync with payment transactions, and targeted E2E tests confirm that students like Mamata and Mahima receive valid admission receipts. Adhering to the 70/20/10 pyramid rule guarantees both extreme speed and production reliability."
            }
          />
        </section>

      </div>
    </div>
  );
}
