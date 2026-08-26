import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import assertionsCode from "./topic2_files/unittest_testcase_and_assertions.py?raw";
import lifecycleCode from "./topic2_files/unittest_setup_teardown_lifecycle.py?raw";
import subtestsCode from "./topic2_files/unittest_subtests_and_skipping.py?raw";
import institutionalSuiteCode from "./topic2_files/institutional_unittest_suite.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic2_files/topic2_note.txt?raw";

// FAQ Questions
import questions from "./topic2_files/topic2_questions";

/**
 * Topic2: Built-in unittest framework: TestCase, assertions, setUp and tearDown
 * Module: 004_003_python-testing
 * Segment: 4 (Python Pro Level & Ecosystem Mastery)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic2() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("lifecycleHooks");

  // Interactive Laboratory State
  const [selectedHookPattern, setSelectedHookPattern] = useState("PER_TEST_FIXTURE"); // PER_TEST_FIXTURE | CLASS_LEVEL_DB | SUBTEST_LOOP
  const [assertionMethod, setAssertionMethod] = useState("assertAlmostEqual");

  // Configuration mapping
  let lifecycleScope = "setUp() runs before EVERY test; tearDown() runs after EVERY test";
  let failureIsolation = "Complete isolation (fresh instance per test method)";
  let typicalScenario = "Clearing tables or resetting in-memory object fixtures";

  if (selectedHookPattern === "PER_TEST_FIXTURE") {
    lifecycleScope = "setUp() & tearDown() executed per test method";
    failureIsolation = "100% isolated state across test methods";
    typicalScenario = "Instantiating fresh StudentProfile objects per test";
  } else if (selectedHookPattern === "CLASS_LEVEL_DB") {
    lifecycleScope = "setUpClass() & tearDownClass() executed ONCE per class";
    failureIsolation = "Shared connection instance across class methods";
    typicalScenario = "Establishing expensive SQLite/PostgreSQL connection pools";
  } else if (selectedHookPattern === "SUBTEST_LOOP") {
    lifecycleScope = "with self.subTest(): executed per loop iteration";
    failureIsolation = "Iteration-level isolation without aborting loop on fail";
    typicalScenario = "Testing 20 student grade boundary thresholds";
  }

  const generatedPythonSnippet = `# Built-in unittest.TestCase Architecture
# Pattern: ${selectedHookPattern} | Assertion: self.${assertionMethod}()

import unittest

class TestStudentLedger(unittest.TestCase):
${
  selectedHookPattern === "CLASS_LEVEL_DB"
    ? `    @classmethod
    def setUpClass(cls):
        # Runs ONCE before all tests: Expensive resource initialization
        cls.db = sqlite3.connect(":memory:")
        cls.db.execute("CREATE TABLE students (sid TEXT, balance REAL)")

    @classmethod
    def tearDownClass(cls):
        # Runs ONCE after all tests: Clean database shutdown
        cls.db.close()`
    : selectedHookPattern === "PER_TEST_FIXTURE"
    ? `    def setUp(self):
        # Runs BEFORE EACH test method: Prepare fresh test fixtures
        self.student = StudentProfile("STU_BP_01", "Mamata", "Barrackpore", 5000.0)

    def tearDown(self):
        # Runs AFTER EACH test method: State cleanup
        self.student = None`
    : `    def test_grade_boundaries(self):
        cases = [(95.0, "A+"), (90.0, "A+"), (80.0, "A"), (35.0, "F")]
        for score, expected in cases:
            # self.subTest isolates failures without aborting the loop!
            with self.subTest(score=score):
                self.assertEqual(calculate_grade(score), expected)`
}

    def test_operation_contract(self):
        # Using self.${assertionMethod}()
        self.${
          assertionMethod === "assertAlmostEqual"
            ? "assertAlmostEqual(0.1 + 0.2, 0.3, places=7)"
            : assertionMethod === "assertRaises"
            ? `assertRaises(ValueError):
            validate_fee(-100.0)`
            : assertionMethod === "assertDictEqual"
            ? `assertDictEqual(
            {"name": "Mamata", "campus": "Barrackpore"},
            {"name": "Mamata", "campus": "Barrackpore"}
        )`
            : "assertIn('Python Pro', self.student.enrolled_courses)"
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
            Topic 2
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Automated Testing, PyTest &amp; Quality Assurance
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Built-in <span className="text-teal-400">unittest Framework</span>: TestCase &amp; Lifecycle
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master Python's built-in zero-dependency standard library testing framework: subclassing <code className="text-teal-300 font-mono">unittest.TestCase</code>, leveraging specialized assertion methods (<code className="text-cyan-300 font-mono">assertEqual</code>, <code className="text-cyan-300 font-mono">assertAlmostEqual</code>, <code className="text-cyan-300 font-mono">assertRaises</code>), mastering the test fixture lifecycle with <code className="text-purple-300 font-mono">setUp()</code>, <code className="text-purple-300 font-mono">tearDown()</code>, and <code className="text-purple-300 font-mono">setUpClass()</code>, and isolating parameterized loop failures with <code className="text-amber-300 font-mono">self.subTest()</code>.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🏛️ Zero-Dependency Standard Library
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔄 setUp &amp; tearDown Lifecycle
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🎯 Rich Assertion Catalog
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔁 Loop Isolation with self.subTest()
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
              1. The unittest.TestCase Architecture
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Python's built-in <code className="text-teal-300 font-mono">unittest</code> module (inspired by JUnit) organizes tests into object-oriented test case classes. It provides a full suite of lifecycle hooks and descriptive assertion methods without requiring third-party package installations:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ TestCase Class</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">unittest.TestCase</code>
                <p className="text-[11px] text-slate-300">
                  Subclass base container. Discovers every method prefixed with <code className="text-teal-300 font-mono">test_</code> as an independent executable test.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ Assertion Catalog</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">self.assertEqual()</code>
                <p className="text-[11px] text-slate-300">
                  Rich diff assertions (<code className="text-cyan-300">assertAlmostEqual</code>, <code className="text-cyan-300">assertRaises</code>, <code className="text-cyan-300">assertIn</code>) with formatted error traces.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ Fixture Lifecycle</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">setUp &amp; tearDown</code>
                <p className="text-[11px] text-slate-300">
                  Automatic hooks creating fresh state before each test and guaranteeing resource teardown even upon assertion failures.
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 shadow-lg">
                <div className="text-amber-400 font-bold text-sm mb-1">4️⃣ SubTests &amp; Skipping</div>
                <code className="text-xs font-mono text-amber-300 block mb-1">self.subTest()</code>
                <p className="text-[11px] text-slate-300">
                  Isolates loop iterations so failures don't abort remaining cases, and conditionally skips tests with <code className="text-amber-300">@unittest.skipIf</code>.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                Assertion Specificity: self.assertEqual vs bare assert
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                When a test fails, <code className="text-teal-300 font-mono">self.assertEqual(dict_a, dict_b)</code> prints a full <span className="text-emerald-400 font-bold">colored key-by-key diff</span> showing exactly which nested keys differed. A bare <code className="text-rose-400 font-mono">assert dict_a == dict_b</code> prints a generic error requiring manual inspection.
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
                2. Visualizing Test Lifecycles, Assertions &amp; SubTest Isolation
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("lifecycleHooks")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "lifecycleHooks"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Fixture Lifecycle Hooks
              </button>
              <button
                onClick={() => setActiveInteractiveTab("assertionMethods")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "assertionMethods"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Assertion Method Catalog
              </button>
              <button
                onClick={() => setActiveInteractiveTab("subTestIsolation")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "subTestIsolation"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                self.subTest() Loop Isolation
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining execution flows across class-level and method-level test hooks:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "lifecycleHooks" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">
                  UNITTEST LIFECYCLE EXECUTION TIMELINE: CLASS-LEVEL VS TEST-LEVEL HOOKS
                </text>

                {/* Main Timeline Box */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#0f172a" stroke="#14b8a6" />

                  {/* 1. setUpClass */}
                  <rect x="25" y="45" width="130" height="150" rx="6" fill="#042f2e" stroke="#2dd4bf" />
                  <text x="35" y="70" fill="#5eead4" fontSize="11" fontWeight="bold">setUpClass()</text>
                  <text x="35" y="90" fill="#ccfbf1" fontSize="9" fontFamily="monospace">Runs ONCE</text>
                  <text x="35" y="110" fill="#99f6e4" fontSize="8">Open DB Socket</text>
                  <text x="35" y="125" fill="#99f6e4" fontSize="8">Global Schema</text>
                  <text x="35" y="170" fill="#facc15" fontSize="8" fontWeight="bold">1x Execution</text>

                  {/* Arrow 1 */}
                  <path d="M 160 120 L 180 120" stroke="#14b8a6" strokeWidth="2" />

                  {/* 2. Test 1 Flow */}
                  <rect x="185" y="45" width="220" height="150" rx="6" fill="#0c4a6e" stroke="#38bdf8" />
                  <text x="195" y="70" fill="#e0f2fe" fontSize="11" fontWeight="bold">Test Method 1 Lifecycle</text>
                  <rect x="195" y="80" width="200" height="26" rx="4" fill="#0369a1" />
                  <text x="205" y="97" fill="#e0f2fe" fontSize="9">1. setUp() ➔ Fresh Fixture</text>
                  <rect x="195" y="110" width="200" height="26" rx="4" fill="#0284c7" />
                  <text x="205" y="127" fill="#ffffff" fontSize="9" fontWeight="bold">2. test_payment()</text>
                  <rect x="195" y="140" width="200" height="26" rx="4" fill="#0369a1" />
                  <text x="205" y="157" fill="#e0f2fe" fontSize="9">3. tearDown() ➔ State Clean</text>

                  {/* Arrow 2 */}
                  <path d="M 410 120 L 430 120" stroke="#14b8a6" strokeWidth="2" />

                  {/* 3. Test 2 Flow */}
                  <rect x="435" y="45" width="220" height="150" rx="6" fill="#0c4a6e" stroke="#38bdf8" />
                  <text x="445" y="70" fill="#e0f2fe" fontSize="11" fontWeight="bold">Test Method 2 Lifecycle</text>
                  <rect x="445" y="80" width="200" height="26" rx="4" fill="#0369a1" />
                  <text x="455" y="97" fill="#e0f2fe" fontSize="9">1. setUp() ➔ Fresh Fixture</text>
                  <rect x="445" y="110" width="200" height="26" rx="4" fill="#ffffff" />
                  <text x="455" y="127" fill="#0f172a" fontSize="9" fontWeight="bold">2. test_refund()</text>
                  <rect x="445" y="140" width="200" height="26" rx="4" fill="#0369a1" />
                  <text x="455" y="157" fill="#e0f2fe" fontSize="9">3. tearDown() ➔ State Clean</text>

                  {/* Arrow 3 */}
                  <path d="M 660 120 L 680 120" stroke="#14b8a6" strokeWidth="2" />

                  {/* 4. tearDownClass */}
                  <rect x="685" y="45" width="115" height="150" rx="6" fill="#4c0519" stroke="#f43f5e" />
                  <text x="692" y="70" fill="#fda4af" fontSize="11" fontWeight="bold">tearDownClass()</text>
                  <text x="692" y="90" fill="#fecdd3" fontSize="9" fontFamily="monospace">Runs ONCE</text>
                  <text x="692" y="110" fill="#ffe4e6" fontSize="8">Close DB Socket</text>
                  <text x="692" y="125" fill="#ffe4e6" fontSize="8">Drop Schema</text>
                  <text x="692" y="170" fill="#facc15" fontSize="8" fontWeight="bold">1x Execution</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "assertionMethods" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">
                  SPECIALIZED ASSERTION METHODS IN UNITTEST.TESTCASE
                </text>

                {/* Assertion Cards Grid */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#082f49" stroke="#0ea5e9" />

                  {/* Row 1 */}
                  <rect x="25" y="40" width="245" height="85" rx="6" fill="#0369a1" stroke="#38bdf8" />
                  <text x="35" y="65" fill="#ffffff" fontSize="11" fontWeight="bold">self.assertEqual(a, b)</text>
                  <text x="35" y="85" fill="#e0f2fe" fontSize="9">Tests equality with deep value diff</text>
                  <text x="35" y="105" fill="#bae6fd" fontSize="8" fontFamily="monospace">self.assertNotEqual(a, b)</text>

                  <rect x="285" y="40" width="245" height="85" rx="6" fill="#0369a1" stroke="#38bdf8" />
                  <text x="295" y="65" fill="#ffffff" fontSize="11" fontWeight="bold">self.assertAlmostEqual(a, b)</text>
                  <text x="295" y="85" fill="#e0f2fe" fontSize="9">Floating-point decimal tolerance</text>
                  <text x="295" y="105" fill="#bae6fd" fontSize="8" fontFamily="monospace">places=2 or delta=0.01</text>

                  <rect x="545" y="40" width="250" height="85" rx="6" fill="#0369a1" stroke="#38bdf8" />
                  <text x="555" y="65" fill="#ffffff" fontSize="11" fontWeight="bold">self.assertRaises(Error)</text>
                  <text x="555" y="85" fill="#e0f2fe" fontSize="9">Verifies exception context manager</text>
                  <text x="555" y="105" fill="#bae6fd" fontSize="8" fontFamily="monospace">with self.assertRaises(ValueError):</text>

                  {/* Row 2 */}
                  <rect x="25" y="140" width="245" height="85" rx="6" fill="#0c4a6e" stroke="#0284c7" />
                  <text x="35" y="165" fill="#ffffff" fontSize="11" fontWeight="bold">self.assertIn(item, list)</text>
                  <text x="35" y="185" fill="#e0f2fe" fontSize="9">Verifies membership in container</text>
                  <text x="35" y="205" fill="#bae6fd" fontSize="8" fontFamily="monospace">self.assertNotIn(k, dict)</text>

                  <rect x="285" y="140" width="245" height="85" rx="6" fill="#0c4a6e" stroke="#0284c7" />
                  <text x="295" y="165" fill="#ffffff" fontSize="11" fontWeight="bold">self.assertDictEqual(d1, d2)</text>
                  <text x="295" y="185" fill="#e0f2fe" fontSize="9">Key-by-key dictionary diff output</text>
                  <text x="295" y="205" fill="#bae6fd" fontSize="8" fontFamily="monospace">self.assertListEqual(l1, l2)</text>

                  <rect x="545" y="140" width="250" height="85" rx="6" fill="#0c4a6e" stroke="#0284c7" />
                  <text x="555" y="165" fill="#ffffff" fontSize="11" fontWeight="bold">self.assertCountEqual(s1, s2)</text>
                  <text x="555" y="185" fill="#e0f2fe" fontSize="9">Order-agnostic multiset equality</text>
                  <text x="555" y="205" fill="#bae6fd" fontSize="8" fontFamily="monospace">Same items regardless of order</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">
                  LOOP ISOLATION: NATIVE FOR-LOOP VS SELF.SUBTEST()
                </text>

                {/* SubTest Comparison */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#1e1b4b" stroke="#a855f7" />

                  {/* Left: Native For Loop */}
                  <rect x="25" y="45" width="370" height="180" rx="6" fill="#4c0519" stroke="#f43f5e" />
                  <text x="35" y="70" fill="#fda4af" fontSize="12" fontWeight="bold">Standard For Loop (No subtests)</text>
                  
                  <rect x="35" y="85" width="350" height="30" rx="4" fill="#1c1917" />
                  <text x="45" y="105" fill="#86efac" fontSize="9" fontFamily="monospace">Iteration 1 (Score 95.0) ➔ PASS</text>

                  <rect x="35" y="120" width="350" height="30" rx="4" fill="#881337" stroke="#fb7185" />
                  <text x="45" y="140" fill="#fecdd3" fontSize="9" fontFamily="monospace">Iteration 2 (Score 90.0) ➔ FAIL (ABORTS!)</text>

                  <rect x="35" y="155" width="350" height="55" rx="4" fill="#1c1917" />
                  <text x="45" y="175" fill="#fca5a5" fontSize="9">💥 Iterations 3, 4, 5 NEVER EXECUTE!</text>
                  <text x="45" y="195" fill="#fda4af" fontSize="8">Hides other passing/failing boundaries</text>

                  {/* Right: self.subTest() */}
                  <rect x="425" y="45" width="370" height="180" rx="6" fill="#042f2e" stroke="#14b8a6" />
                  <text x="435" y="70" fill="#5eead4" fontSize="12" fontWeight="bold">with self.subTest() (Isolated Iterations)</text>

                  <rect x="435" y="85" width="350" height="30" rx="4" fill="#064e3b" />
                  <text x="445" y="105" fill="#a7f3d0" fontSize="9" fontFamily="monospace">subTest 1 (Score 95.0) ➔ PASS</text>

                  <rect x="435" y="120" width="350" height="30" rx="4" fill="#78350f" stroke="#f59e0b" />
                  <text x="445" y="140" fill="#fef3c7" fontSize="9" fontFamily="monospace">subTest 2 (Score 90.0) ➔ FAIL (Recorded!)</text>

                  <rect x="435" y="155" width="350" height="55" rx="4" fill="#064e3b" />
                  <text x="445" y="175" fill="#a7f3d0" fontSize="9">✅ subTests 3, 4, 5 CONTINUE TO RUN!</text>
                  <text x="445" y="195" fill="#ccfbf1" fontSize="8">Reports exact subtest failure diagnostics</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE TESTCASE SIMULATOR */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧪</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive TestCase &amp; Fixture Lifecycle Simulator
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Configure TestCase fixture hooks and assertion modes to observe lifecycle scopes and inspect production Python code:
          </p>

          <div className="bg-slate-950 p-5 sm:p-6 rounded-xl border border-slate-800/90 space-y-6">
            {/* Pattern Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Select Lifecycle Pattern:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "PER_TEST_FIXTURE", label: "setUp / tearDown", icon: "🔄", tag: "Per-Test Isolation" },
                  { id: "CLASS_LEVEL_DB", label: "setUpClass / tearDownClass", icon: "🏛️", tag: "Shared DB Pool" },
                  { id: "SUBTEST_LOOP", label: "self.subTest() Loop", icon: "🔁", tag: "Loop Parametrization" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedHookPattern(item.id)}
                    className={clsx(
                      "p-3 rounded-xl border text-left transition-all",
                      selectedHookPattern === item.id
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

            {/* Assertion Mode Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Select Assertion Method to Test:
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  "assertAlmostEqual",
                  "assertRaises",
                  "assertDictEqual",
                  "assertIn",
                ].map((method) => (
                  <button
                    key={method}
                    onClick={() => setAssertionMethod(method)}
                    className={clsx(
                      "px-3 py-1.5 rounded-lg border text-xs font-mono transition-all",
                      assertionMethod === method
                        ? "bg-cyan-950/80 border-cyan-500 text-cyan-300 shadow-sm"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                    )}
                  >
                    self.{method}()
                  </button>
                ))}
              </div>
            </div>

            {/* Metrics Dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-900/90 p-4 rounded-xl border border-teal-900/50">
                <div className="text-xs text-teal-400 font-medium mb-1">Lifecycle Hook Scope</div>
                <div className="text-xs font-bold font-mono text-teal-300 mt-1 leading-snug">
                  {lifecycleScope}
                </div>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-cyan-900/50">
                <div className="text-xs text-cyan-400 font-medium mb-1">Failure Isolation</div>
                <div className="text-xs font-bold font-mono text-cyan-300 mt-1 leading-snug">
                  {failureIsolation}
                </div>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-purple-900/50">
                <div className="text-xs text-purple-400 font-medium mb-1">Production Use Case</div>
                <div className="text-xs font-bold font-mono text-purple-300 mt-1 leading-snug">
                  {typicalScenario}
                </div>
              </div>
            </div>

            {/* Generated Dynamic Code */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Generated unittest.TestCase Implementation:
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
              4. Production Code Labs &amp; TestCase Suites
            </h2>
          </div>

          <p className="text-slate-300 mb-8 text-base leading-relaxed">
            Inspect, run, and master all four production-grade unittest suites covering assertions, lifecycle fixture hooks, subtest iteration diagnostics, and the multi-campus institutional student manager:
          </p>

          <div className="space-y-10">
            {/* Python Loader 1 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-teal-300">
                  Lab 1: unittest.TestCase Assertion Catalog
                </h3>
                <p className="text-sm text-slate-400">
                  Demonstrating <code className="text-teal-300 font-mono">assertAlmostEqual</code> for floating-point calculations, <code className="text-teal-300 font-mono">assertRaises</code> exception contexts, and <code className="text-teal-300 font-mono">assertDictEqual</code> across student records.
                </p>
              </div>
              <PythonFileLoader
                fileModule={assertionsCode}
                title="unittest_testcase_and_assertions.py"
                highlightLines={[25, 31, 44]}
              />
            </div>

            {/* Python Loader 2 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-cyan-300">
                  Lab 2: Test Fixture Lifecycles (setUpClass, setUp, tearDown)
                </h3>
                <p className="text-sm text-slate-400">
                  Managing in-memory SQLite database connection lifecycles across <code className="text-cyan-300 font-mono">setUpClass()</code>, and inserting fresh student records before every test in <code className="text-cyan-300 font-mono">setUp()</code>.
                </p>
              </div>
              <PythonFileLoader
                fileModule={lifecycleCode}
                title="unittest_setup_teardown_lifecycle.py"
                highlightLines={[18, 30, 36, 44]}
              />
            </div>

            {/* Python Loader 3 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-purple-300">
                  Lab 3: self.subTest() Iteration Isolation &amp; Conditional Skipping
                </h3>
                <p className="text-sm text-slate-400">
                  Testing multiple grade boundary thresholds with <code className="text-purple-300 font-mono">self.subTest()</code> and conditionally skipping tests with <code className="text-purple-300 font-mono">@unittest.skipIf</code>.
                </p>
              </div>
              <PythonFileLoader
                fileModule={subtestsCode}
                title="unittest_subtests_and_skipping.py"
                highlightLines={[32, 38, 42]}
              />
            </div>

            {/* Python Loader 4 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-amber-300">
                  Lab 4: Institutional Student Management Production TestCase Suite
                </h3>
                <p className="text-sm text-slate-400">
                  Comprehensive test suite validating course enrollment balance mutations, tuition payments, and overpayment exceptions for Mamata across Barrackpore and Kolkata.
                </p>
              </div>
              <PythonFileLoader
                fileModule={institutionalSuiteCode}
                title="institutional_unittest_suite.py"
                highlightLines={[36, 47, 53, 59]}
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
              5. unittest Pitfalls &amp; Anti-Patterns
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pitfall 1 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                1. Missing 'test_' Method Prefix
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Methods named without <code className="text-rose-400 font-mono">test_</code> (e.g. <code className="text-rose-400 font-mono">def verify_student(self):</code>) are completely ignored by the test runner and never execute!
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # BUG: def check_fee(self): ... # Skipped!{'\n'}
                # FIX: def test_check_fee(self): ...
              </pre>
            </div>

            {/* Pitfall 2 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                2. Comparing Floats with assertEqual
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Direct equality (<code className="text-rose-400 font-mono">self.assertEqual(0.1 + 0.2, 0.3)</code>) fails due to binary float representation. Always use <code className="text-teal-300 font-mono">assertAlmostEqual</code>.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # BUG: self.assertEqual(0.1 + 0.2, 0.3) # Fails!{'\n'}
                # FIX: self.assertAlmostEqual(0.1 + 0.2, 0.3, places=7)
              </pre>
            </div>

            {/* Pitfall 3 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                3. Mutating Class Fixtures in Tests
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Modifying shared <code className="text-rose-400 font-mono">cls.shared_list</code> inside test methods creates state leakage across tests. Mutate only instance-level fixtures created in <code className="text-teal-300 font-mono">setUp()</code>.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # BUG: self.shared_class_data.append(x){'\n'}
                # FIX: Create fresh data in setUp()
              </pre>
            </div>

            {/* Pitfall 4 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                4. Forgetting subTest in Loops
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Running an assertion in a standard loop causes the first failure to abort the loop, hiding whether subsequent edge cases passed or failed.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # BUG: for x in cases: self.assertEqual(...){'\n'}
                # FIX: for x in cases: with self.subTest(): ...
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
              6. Professional unittest Checklist
            </h2>
          </div>

          <div className="space-y-3 text-slate-300 text-sm sm:text-base">
            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Prefix All Test Methods with test_:</strong> Ensure the test runner discovers every test case automatically.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Use Specific Assertions:</strong> Use <code className="text-teal-300 font-mono">assertEqual</code>, <code className="text-teal-300 font-mono">assertIn</code>, and <code className="text-teal-300 font-mono">assertRaises</code> for rich failure diagnostics.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Isolate Loop Cases with self.subTest():</strong> Keep parameterized loop iterations independent so all cases report diagnostics.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Clean Up with tearDown() or addCleanup():</strong> Guarantee database and file resources are released even when assertions fail.
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQS */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <FAQTemplate
            title="Built-in unittest Framework FAQs"
            questions={questions}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: PLAIN TEXT PRINT & DOWNLOAD NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <PlainTextPrint
            content={noteText}
            title="Topic 2: Built-in unittest Framework Study Note"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Study Note"
            downloadFileName="topic2_note.txt"
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 9: TEACHER'S NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <Teacher
            note={
              "Python's standard library unittest module provides an indispensable, zero-dependency testing foundation. When architecting institutional data models across Barrackpore, Kolkata, Ichapur, and Jadavpur, using unittest.TestCase ensures our tests run out-of-the-box on every server and embedded system without installing third-party tools. Leveraging setUp to generate clean student profiles for Mamata and Mahima, assertAlmostEqual for tuition calculations, and self.subTest to test full grade matrices creates resilient, enterprise-grade test suites."
            }
          />
        </section>

      </div>
    </div>
  );
}
