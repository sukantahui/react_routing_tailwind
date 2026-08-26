import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import basicMockCode from "./topic6_files/basic_mock_and_magicmock.py?raw";
import patchCode from "./topic6_files/patch_decorator_and_context_manager.py?raw";
import networkMockCode from "./topic6_files/mocking_network_and_database_calls.py?raw";
import institutionalMockSuiteCode from "./topic6_files/institutional_payment_gateway_mock_suite.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic6_files/topic6_note.txt?raw";

// FAQ Questions
import questions from "./topic6_files/topic6_questions";

/**
 * Topic6: Mocking external dependencies with unittest.mock (patch, Mock, MagicMock)
 * Module: 004_003_python-testing
 * Segment: 4 (Python Pro Level & Ecosystem Mastery)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic6() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("mockVsMagic");

  // Interactive Laboratory State
  const [mockBehavior, setMockBehavior] = useState("RETURN_VALUE"); // RETURN_VALUE | SIDE_EFFECT_ERROR | ITERABLE_SEQUENCE
  const [useAutospec, setUseAutospec] = useState(true);

  // Mapped metrics
  let simulationMode = "Returns fixed simulated JSON payload";
  let assertionCheck = "mock_gw.charge.assert_called_once_with('STU_BP_01', 15000.0)";
  let typicalScenario = "Simulating successful 200 OK bank transaction";

  if (mockBehavior === "RETURN_VALUE") {
    simulationMode = "Returns fixed simulated JSON payload";
    assertionCheck = "mock_gw.charge.assert_called_once_with('STU_BP_01', 15000.0)";
    typicalScenario = "Simulating successful 200 OK bank transaction";
  } else if (mockBehavior === "SIDE_EFFECT_ERROR") {
    simulationMode = "Raises TimeoutError / ConnectionError on call";
    assertionCheck = "with pytest.raises(TimeoutError): process_tuition(...)";
    typicalScenario = "Testing system resilience against banking gateway downtime";
  } else if (mockBehavior === "ITERABLE_SEQUENCE") {
    simulationMode = "Returns [Fail_1, Fail_2, Success_3] on successive calls";
    assertionCheck = "assert mock_gw.charge.call_count == 3";
    typicalScenario = "Testing automatic retry loop logic with exponential backoff";
  }

  const generatedPythonSnippet = `# unittest.mock Test Suite
# Mock Mode: ${mockBehavior} | autospec: ${useAutospec}

from unittest.mock import Mock, patch
import pytest

# GOLDEN RULE: Patch where an object is USED, NOT where defined!
@patch("institutional_billing.PaymentGatewayClient"${useAutospec ? ", autospec=True" : ""})
def test_tuition_payment_mock(mock_gateway_class):
    mock_gw = mock_gateway_class.return_value
${
  mockBehavior === "RETURN_VALUE"
    ? `    # Configure static simulated return value
    mock_gw.charge.return_value = {
        "status": "SUCCESS",
        "txn_id": "BANK_TXN_BP_8899"
    }

    result = process_tuition("STU_BP_01", 15000.0)
    assert result["txn_id"] == "BANK_TXN_BP_8899"
    mock_gw.charge.assert_called_once_with("STU_BP_01", 15000.0)`
    : mockBehavior === "SIDE_EFFECT_ERROR"
    ? `    # Simulate external network outage with side_effect
    mock_gw.charge.side_effect = TimeoutError("Bank Gateway Down")

    with pytest.raises(TimeoutError, match=r"Bank Gateway Down"):
        process_tuition("STU_BP_01", 15000.0)`
    : `    # Simulate retry sequence with side_effect iterable
    mock_gw.charge.side_effect = [
        TimeoutError("Retry 1"),
        TimeoutError("Retry 2"),
        {"status": "SUCCESS", "txn_id": "RETRY_SUCCESS"}
    ]

    result = process_tuition_with_retry("STU_BP_01", 15000.0)
    assert result["txn_id"] == "RETRY_SUCCESS"
    assert mock_gw.charge.call_count == 3`
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
            Topic 6
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Automated Testing, PyTest &amp; Quality Assurance
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Mocking External Dependencies: <span className="text-teal-400">unittest.mock</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master Python's built-in <code className="text-teal-300 font-mono">unittest.mock</code> framework: isolating unit tests from external HTTP APIs, payment gateways, and databases using <code className="text-cyan-300 font-mono">Mock</code> and <code className="text-cyan-300 font-mono">MagicMock</code>, controlling behavior with <code className="text-purple-300 font-mono">return_value</code> and <code className="text-purple-300 font-mono">side_effect</code>, mastering the golden rule of <code className="text-amber-300 font-mono">patch()</code> ("patch where it is used, not defined"), and preventing mock drift with <code className="text-teal-300 font-mono">autospec=True</code>.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🎭 Mock vs MagicMock Dunders
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🎯 Where-to-Patch Golden Rule
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            💥 side_effect Exception Simulation
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ autospec=True Drift Guard
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
              1. The Test Double &amp; Mocking Architecture
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Unit tests must run in sub-milliseconds without depending on external web APIs, database connections, or sending live SMS alerts to student phones. Python's <code className="text-teal-300 font-mono">unittest.mock</code> provides a complete suite of test doubles to simulate external boundaries:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ Mock vs MagicMock</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">MagicMock</code>
                <p className="text-[11px] text-slate-300">
                  <code className="text-teal-300">MagicMock</code> adds magic dunder methods (<code className="text-teal-300">__len__</code>, <code className="text-teal-300">__iter__</code>, <code className="text-teal-300">__enter__</code>), supporting context managers and iterables.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ Return vs side_effect</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">side_effect=Error</code>
                <p className="text-[11px] text-slate-300">
                  <code className="text-cyan-300">return_value</code> returns static data; <code className="text-cyan-300">side_effect</code> raises exceptions or yields sequences for retry testing.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ Where-to-Patch</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">@patch('pkg.used')</code>
                <p className="text-[11px] text-slate-300">
                  Patch where an object is <strong>imported/used</strong> in the module under test, NOT where the class was originally defined.
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 shadow-lg">
                <div className="text-amber-400 font-bold text-sm mb-1">4️⃣ Invocation Assertions</div>
                <code className="text-xs font-mono text-amber-300 block mb-1">assert_called_once()</code>
                <p className="text-[11px] text-slate-300">
                  Verify invocation contracts: <code className="text-amber-300">assert_called_once_with()</code>, <code className="text-amber-300">call_args_list</code>, and <code className="text-amber-300">assert_not_called()</code>.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Where to Patch Rule Explained
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                If <code className="text-purple-300 font-mono">admission_service.py</code> contains <code className="text-purple-300 font-mono">import requests</code>, patching <code className="text-rose-400 font-mono">@patch("requests.get")</code> fails because the module has already bound its own reference! You MUST patch <code className="text-emerald-400 font-bold">@patch("admission_service.requests.get")</code>.
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
                2. Visualizing Mock Protocols, Patching Targets &amp; Gateway Doubles
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("mockVsMagic")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "mockVsMagic"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Mock vs MagicMock
              </button>
              <button
                onClick={() => setActiveInteractiveTab("whereToPatch")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "whereToPatch"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                The Where to Patch Rule
              </button>
              <button
                onClick={() => setActiveInteractiveTab("gatewayPipeline")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "gatewayPipeline"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Gateway Mocking Pipeline
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining dunder protocol support, namespace lookup resolution during patching, and transactional banking doubles:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "mockVsMagic" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">
                  TEST DOUBLE ARCHITECTURE: STANDARD MOCK VS MAGICMOCK
                </text>

                {/* Comparison Boxes */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#0f172a" stroke="#14b8a6" />

                  {/* Standard Mock */}
                  <rect x="25" y="40" width="370" height="180" rx="6" fill="#0c4a6e" stroke="#38bdf8" />
                  <text x="35" y="65" fill="#e0f2fe" fontSize="12" fontWeight="bold">unittest.mock.Mock</text>
                  
                  <rect x="35" y="75" width="350" height="30" rx="4" fill="#0369a1" />
                  <text x="45" y="95" fill="#ffffff" fontSize="9" fontFamily="monospace">mock.fn() ➔ Returns Child Mock</text>

                  <rect x="35" y="110" width="350" height="30" rx="4" fill="#0369a1" />
                  <text x="45" y="130" fill="#ffffff" fontSize="9" fontFamily="monospace">mock.return_value / mock.side_effect</text>

                  <rect x="35" y="145" width="350" height="60" rx="4" fill="#4c0519" stroke="#f43f5e" />
                  <text x="45" y="165" fill="#fca5a5" fontSize="9">❌ Lacks magic dunders: len(mock), with mock:,</text>
                  <text x="45" y="180" fill="#fca5a5" fontSize="9">   mock[0], and [x for x in mock] raise TypeError!</text>

                  {/* MagicMock */}
                  <rect x="425" y="40" width="370" height="180" rx="6" fill="#042f2e" stroke="#14b8a6" />
                  <text x="435" y="65" fill="#5eead4" fontSize="12" fontWeight="bold">unittest.mock.MagicMock (Default)</text>

                  <rect x="435" y="75" width="350" height="30" rx="4" fill="#064e3b" />
                  <text x="445" y="95" fill="#a7f3d0" fontSize="9" fontFamily="monospace">All Mock capabilities PLUS Magic Dunders!</text>

                  <rect x="435" y="110" width="350" height="30" rx="4" fill="#064e3b" />
                  <text x="445" y="130" fill="#a7f3d0" fontSize="9" fontFamily="monospace">__enter__ / __exit__ (Context Managers)</text>

                  <rect x="435" y="145" width="350" height="60" rx="4" fill="#134e4a" stroke="#10b981" />
                  <text x="445" y="165" fill="#ccfbf1" fontSize="9">✅ Supports: len(), iterators, indexing,</text>
                  <text x="445" y="180" fill="#ccfbf1" fontSize="9">   contextlib with blocks, and arithmetic operators!</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "whereToPatch" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">
                  THE GOLDEN RULE OF PATCHING: WHERE AN OBJECT IS USED VS DEFINED
                </text>

                {/* Where to patch diagram */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#082f49" stroke="#0ea5e9" />

                  {/* Left: Origin Definition */}
                  <rect x="25" y="40" width="230" height="180" rx="6" fill="#0f172a" stroke="#475569" />
                  <text x="35" y="65" fill="#94a3b8" fontSize="11" fontWeight="bold">📁 external_bank.py</text>
                  <text x="35" y="85" fill="#64748b" fontSize="9">Where function is DEFINED:</text>
                  
                  <rect x="35" y="100" width="210" height="50" rx="4" fill="#1e293b" />
                  <text x="45" y="120" fill="#94a3b8" fontSize="9" fontFamily="monospace">def transfer():</text>
                  <text x="55" y="135" fill="#94a3b8" fontSize="9" fontFamily="monospace">  return "LIVE_HTTP"</text>

                  <text x="35" y="185" fill="#f43f5e" fontSize="9" fontWeight="bold">❌ DO NOT PATCH HERE!</text>
                  <text x="35" y="200" fill="#fda4af" fontSize="8">@patch("external_bank.transfer") FAILS!</text>

                  {/* Arrow */}
                  <path d="M 260 130 L 290 130" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" />

                  {/* Center: Module Under Test */}
                  <rect x="295" y="40" width="240" height="180" rx="6" fill="#042f2e" stroke="#2dd4bf" />
                  <text x="305" y="65" fill="#5eead4" fontSize="11" fontWeight="bold">📁 admission_service.py</text>
                  <text x="305" y="85" fill="#a7f3d0" fontSize="9">Module Under Test (Where USED):</text>

                  <rect x="305" y="100" width="220" height="50" rx="4" fill="#022c22" stroke="#0d9488" />
                  <text x="315" y="120" fill="#5eead4" fontSize="9" fontFamily="monospace">from external_bank import transfer</text>
                  <text x="315" y="135" fill="#5eead4" fontSize="9" fontFamily="monospace">def pay(): transfer()</text>

                  <text x="305" y="185" fill="#2dd4bf" fontSize="9" fontWeight="bold">✅ PATCH TARGET LOCATION!</text>
                  <text x="305" y="200" fill="#ccfbf1" fontSize="8">@patch("admission_service.transfer")</text>

                  {/* Arrow */}
                  <path d="M 540 130 L 570 130" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" />

                  {/* Right: Test Execution */}
                  <rect x="575" y="40" width="220" height="180" rx="6" fill="#1e1b4b" stroke="#818cf8" />
                  <text x="585" y="65" fill="#e0e7ff" fontSize="11" fontWeight="bold">📁 test_admission.py</text>
                  
                  <rect x="585" y="80" width="200" height="125" rx="4" fill="#0f172a" stroke="#818cf8" />
                  <text x="595" y="100" fill="#c7d2fe" fontSize="9" fontFamily="monospace">@patch("admission_service.transfer")</text>
                  <text x="595" y="115" fill="#c7d2fe" fontSize="9" fontFamily="monospace">def test_pay(mock_t):</text>
                  <text x="605" y="135" fill="#86efac" fontSize="9" fontFamily="monospace">mock_t.return_value = "OK"</text>
                  <text x="605" y="150" fill="#86efac" fontSize="9" fontFamily="monospace">pay()</text>
                  <text x="605" y="175" fill="#facc15" fontSize="9" fontWeight="bold">🎯 Perfect Isolation</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">
                  MULTI-SERVICE BANKING &amp; AUDIT LOGGING MOCK PIPELINE
                </text>

                {/* Gateway Pipeline */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#1e1b4b" stroke="#a855f7" />

                  {/* Component 1: Processor */}
                  <rect x="25" y="45" width="220" height="140" rx="6" fill="#3b0764" stroke="#c084fc" />
                  <text x="35" y="70" fill="#f3e8ff" fontSize="11" fontWeight="bold">TuitionProcessor</text>
                  <text x="35" y="90" fill="#d8b4fe" fontSize="9">Real Domain Logic</text>
                  <text x="35" y="110" fill="#e9d5ff" fontSize="8" fontFamily="monospace">pay_fee("STU_1", 15000)</text>
                  <text x="35" y="145" fill="#86efac" fontSize="8" fontWeight="bold">Tested in Total Isolation</text>

                  {/* Branch 1 Arrow */}
                  <path d="M 245 85 L 295 85" stroke="#a855f7" strokeWidth="2" />

                  {/* Mock 1: Gateway */}
                  <rect x="300" y="35" width="240" height="90" rx="6" fill="#042f2e" stroke="#2dd4bf" />
                  <text x="310" y="55" fill="#5eead4" fontSize="10" fontWeight="bold">Mock 1: PaymentGatewayClient</text>
                  <text x="310" y="72" fill="#ccfbf1" fontSize="8" fontFamily="monospace">mock_gw.charge.return_value = &#123;"status": "SUCCESS"&#125;</text>
                  <text x="310" y="95" fill="#86efac" fontSize="8">✅ assert_called_once_with("STU_1", 15000)</text>

                  {/* Branch 2 Arrow */}
                  <path d="M 245 145 L 295 145" stroke="#a855f7" strokeWidth="2" />

                  {/* Mock 2: Auditor */}
                  <rect x="300" y="135" width="240" height="90" rx="6" fill="#0c4a6e" stroke="#38bdf8" />
                  <text x="310" y="155" fill="#e0f2fe" fontSize="10" fontWeight="bold">Mock 2: AuditLogService</text>
                  <text x="310" y="172" fill="#bae6fd" fontSize="8" fontFamily="monospace">mock_audit.log.return_value = True</text>
                  <text x="310" y="195" fill="#86efac" fontSize="8">✅ assert_called_once_with("STU_1", "SETTLED")</text>

                  {/* Right Output Box */}
                  <rect x="560" y="45" width="235" height="180" rx="6" fill="#0f172a" stroke="#818cf8" />
                  <text x="575" y="70" fill="#e0e7ff" fontSize="11" fontWeight="bold">Test Outcomes Verified:</text>
                  <text x="575" y="95" fill="#86efac" fontSize="9">1. Zero live bank HTTP calls made</text>
                  <text x="575" y="115" fill="#86efac" fontSize="9">2. Exact payment payload verified</text>
                  <text x="575" y="135" fill="#86efac" fontSize="9">3. Audit ledger entry confirmed</text>
                  <text x="575" y="155" fill="#86efac" fontSize="9">4. Runtime: 0.001s in CI pipeline</text>
                  <text x="575" y="190" fill="#facc15" fontSize="9" fontWeight="bold">⚡ High-Velocity Determinism</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE MOCK & PATCH SIMULATOR */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧪</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Mock Configuration &amp; Invocation Simulator
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Configure mock execution behaviors (<code className="text-teal-300 font-mono">return_value</code>, <code className="text-cyan-300 font-mono">side_effect</code> exception, or iterable sequence) and toggle <code className="text-purple-300 font-mono">autospec=True</code> to inspect live test code:
          </p>

          <div className="bg-slate-950 p-5 sm:p-6 rounded-xl border border-slate-800/90 space-y-6">
            {/* Behavior Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Select Mock Behavior:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "RETURN_VALUE", label: "return_value", icon: "📦", tag: "Static JSON Payload" },
                  { id: "SIDE_EFFECT_ERROR", label: "side_effect (Error)", icon: "💥", tag: "Network Timeout Exception" },
                  { id: "ITERABLE_SEQUENCE", label: "side_effect (Iterable)", icon: "🔄", tag: "Successive Retry Sequence" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setMockBehavior(item.id)}
                    className={clsx(
                      "p-3 rounded-xl border text-left transition-all",
                      mockBehavior === item.id
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

            {/* Autospec Toggle */}
            <div className="flex items-center justify-between p-3 bg-slate-900/80 rounded-xl border border-slate-800">
              <div>
                <div className="text-xs font-bold text-white">Enable autospec=True (Signature Drift Guard)</div>
                <div className="text-[11px] text-slate-400">Strictly enforces real class/function signatures, rejecting invalid method calls and typos</div>
              </div>
              <button
                onClick={() => setUseAutospec(!useAutospec)}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all",
                  useAutospec
                    ? "bg-emerald-950 border border-emerald-500 text-emerald-300"
                    : "bg-slate-800 border border-slate-700 text-slate-400"
                )}
              >
                {useAutospec ? "AUTOSPEC: ACTIVE" : "UNCONSTRAINED MOCK"}
              </button>
            </div>

            {/* Metrics Dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-900/90 p-4 rounded-xl border border-teal-900/50">
                <div className="text-xs text-teal-400 font-medium mb-1">Simulation Behavior</div>
                <div className="text-xs font-bold font-mono text-teal-300 mt-1 leading-snug">
                  {simulationMode}
                </div>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-cyan-900/50">
                <div className="text-xs text-cyan-400 font-medium mb-1">Contract Assertion</div>
                <div className="text-xs font-bold font-mono text-cyan-300 mt-1 leading-snug">
                  {assertionCheck}
                </div>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-purple-900/50">
                <div className="text-xs text-purple-400 font-medium mb-1">Production Scenario</div>
                <div className="text-xs font-bold font-mono text-purple-300 mt-1 leading-snug">
                  {typicalScenario}
                </div>
              </div>
            </div>

            {/* Generated Dynamic Code */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Generated unittest.mock Implementation:
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
              4. Production Code Labs &amp; Mock Suites
            </h2>
          </div>

          <p className="text-slate-300 mb-8 text-base leading-relaxed">
            Inspect, run, and master all four production-grade mock suites covering basic mocks, patch decorators, network SMS dispatches, and the multi-campus institutional payment gateway:
          </p>

          <div className="space-y-10">
            {/* Python Loader 1 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-teal-300">
                  Lab 1: Mock vs MagicMock &amp; Invocation Assertions
                </h3>
                <p className="text-sm text-slate-400">
                  Configuring <code className="text-teal-300 font-mono">return_value</code>, <code className="text-teal-300 font-mono">side_effect</code>, and asserting <code className="text-teal-300 font-mono">assert_called_once_with()</code> on scholarship calculators.
                </p>
              </div>
              <PythonFileLoader
                fileModule={basicMockCode}
                title="basic_mock_and_magicmock.py"
                highlightLines={[25, 36, 47, 59]}
              />
            </div>

            {/* Python Loader 2 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-cyan-300">
                  Lab 2: @patch Decorators &amp; with patch() Context Managers
                </h3>
                <p className="text-sm text-slate-400">
                  Adhering to the "Where to Patch" rule and isolating external banking gateway transfer methods.
                </p>
              </div>
              <PythonFileLoader
                fileModule={patchCode}
                title="patch_decorator_and_context_manager.py"
                highlightLines={[27, 43]}
              />
            </div>

            {/* Python Loader 3 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-purple-300">
                  Lab 3: Mocking Network Calls &amp; Webhook SMS Dispatches
                </h3>
                <p className="text-sm text-slate-400">
                  Mocking HTTP notification clients for candidate onboarding across Barrackpore and Kolkata without sending real SMS alerts.
                </p>
              </div>
              <PythonFileLoader
                fileModule={networkMockCode}
                title="mocking_network_and_database_calls.py"
                highlightLines={[32, 45, 52]}
              />
            </div>

            {/* Python Loader 4 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-amber-300">
                  Lab 4: Institutional Payment Gateway &amp; Audit Mock Suite Case Study
                </h3>
                <p className="text-sm text-slate-400">
                  Production-grade suite coordinating payment gateway doubles and audit logging mocks for Mamata and Mahima across Barrackpore and Kolkata.
                </p>
              </div>
              <PythonFileLoader
                fileModule={institutionalMockSuiteCode}
                title="institutional_payment_gateway_mock_suite.py"
                highlightLines={[42, 58, 69]}
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
              5. Mocking Pitfalls &amp; Anti-Patterns
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pitfall 1 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                1. Patching Where Defined, Not Where Used
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Patching <code className="text-rose-400 font-mono">requests.get</code> instead of <code className="text-teal-300 font-mono">my_module.requests.get</code> has no effect if the module used <code className="text-rose-400 font-mono">from requests import get</code>.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # BUG: @patch("requests.get"){'\n'}
                # FIX: @patch("my_app.services.admission.requests.get")
              </pre>
            </div>

            {/* Pitfall 2 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                2. Silent Typos on Un-Specced Mocks
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Writing <code className="text-rose-400 font-mono">mock.asert_called()</code> (typo in assert) dynamically creates a new Mock attribute rather than raising an error! Use <code className="text-teal-300 font-mono">autospec=True</code>.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # BUG: mock.asert_called_once() # Silently passes!{'\n'}
                # FIX: Use autospec=True to catch typos
              </pre>
            </div>

            {/* Pitfall 3 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                3. Over-Mocking Internal Private Logic
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Mocking internal private helper functions ties tests to implementation details, causing tests to break during harmless internal refactorings.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # ANTI-PATTERN: Mocking internal _compute_tax() helper{'\n'}
                # BEST PRACTICE: Mock only external APIs, DBs, and I/O
              </pre>
            </div>

            {/* Pitfall 4 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                4. Reversed Parameter Order in Stacked @patch
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Stacked patch decorators pass mock arguments to test functions in <strong>bottom-to-top</strong> (reverse) order!
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # @patch("module.email") # 2nd argument{'\n'}
                # @patch("module.db")    # 1st argument{'\n'}
                # def test_fn(mock_db, mock_email): ...
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
              6. Professional Mocking Checklist
            </h2>
          </div>

          <div className="space-y-3 text-slate-300 text-sm sm:text-base">
            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Mock Only at Architectural Boundaries:</strong> Mock network HTTP calls, SMS dispatchers, databases, and clocks; test business logic directly.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Adhere to Where-to-Patch:</strong> Patch objects in the namespace where they are imported and used by the module under test.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Use autospec=True:</strong> Prevent mock drift and catch renamed or deleted methods immediately.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Verify Invocation Contracts:</strong> Always assert that mocks received the exact expected arguments via <code className="text-teal-300 font-mono">assert_called_once_with()</code>.
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQS */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <FAQTemplate
            title="Mocking External Dependencies FAQs"
            questions={questions}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: PLAIN TEXT PRINT & DOWNLOAD NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <PlainTextPrint
            content={noteText}
            title="Topic 6: Mocking External Dependencies Study Note"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Study Note"
            downloadFileName="topic6_note.txt"
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 9: TEACHER'S NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <Teacher
            note={
              "Mocking is the bridge that enables professional test suites to run hundreds of tests per second without spending real money on SMS credits or hitting live banking APIs. In our institutional software across Barrackpore, Kolkata, Ichapur, and Jadavpur, testing student tuition payments for Mamata and Mahima requires isolating payment gateway webhooks and audit loggers. Master the where-to-patch golden rule and autospec=True, and your tests will remain resilient, fast, and completely deterministic."
            }
          />
        </section>

      </div>
    </div>
  );
}
