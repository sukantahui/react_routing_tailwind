import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import explicitChaining from "./topic9_files/explicit_exception_chaining_from.py?raw";
import implicitChaining from "./topic9_files/implicit_chaining_and_context.py?raw";
import translationLayer from "./topic9_files/subsystem_exception_translation_layer.py?raw";
import bankingGateway from "./topic9_files/banking_gateway_exception_chaining_suite.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic9_files/topic9_note.txt?raw";

// FAQ Questions
import questions from "./topic9_files/topic9_questions";

/**
 * Topic9: Exception Chaining (raise ... from ...)
 * Module: 003_002_basic-exception-handling
 * Segment: 3 (Advanced Python Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic9() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("explicit");

  // Interactive Payment Gateway Chaining Simulator State
  const [selectedScenario, setSelectedScenario] = useState("timeout");

  const scenarios = {
    timeout: {
      title: "Bank Socket Timeout (Explicit Chaining: `from socket_err`)",
      highLevelError: "PaymentGatewayTimeoutError: Bank authorization server timed out for student STU-102",
      rootCause: "TimeoutError: Socket read timed out after 3000ms on api.bankgateway.in:443",
      causeAttr: "TimeoutError('Socket read timed out after 3000ms')",
      suppressContext: false,
      tracebackMsg: "The above exception was the direct cause of the following exception:",
      isClean: false,
    },
    corrupt_json: {
      title: "Malformed Bank API Payload (Explicit Chaining: `from json_err`)",
      highLevelError: "MalformedPaymentResponseError: Bank API returned invalid non-JSON payload for student STU-103",
      rootCause: "json.decoder.JSONDecodeError: Expecting value: line 1 column 1 (char 0)",
      causeAttr: "JSONDecodeError('Expecting value')",
      suppressContext: false,
      tracebackMsg: "The above exception was the direct cause of the following exception:",
      isClean: false,
    },
    card_declined: {
      title: "Card Declined - Public UI Sanitized (Suppressed: `from None`)",
      highLevelError: "CardAuthorizationFailedError: Your payment card was declined by issuing bank.",
      rootCause: "HIDDEN (Suppressed internal decline routing code DECLINE_CODE_51_ACC_998124)",
      causeAttr: "None (Explicitly suppressed via `from None`)",
      suppressContext: true,
      tracebackMsg: "None (Single clean public traceback shown to user)",
      isClean: true,
    },
    approved: {
      title: "Normal Approved Transaction (No Exceptions)",
      highLevelError: "None (Transaction Status 200 OK)",
      rootCause: "None",
      causeAttr: "None",
      suppressContext: false,
      tracebackMsg: "None",
      isClean: true,
      isSuccess: true,
    },
  };

  const activeData = scenarios[selectedScenario];

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
            Segment 3 • Module 003_002
          </span>
          <span className="text-xs sm:text-sm font-mono bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/80 shadow-sm shadow-cyan-950/50">
            Topic 9
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Robust Exception Handling &amp; Defensive Coding
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Exception Chaining (<code className="text-teal-400 font-mono">raise ... from ...</code>)
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master PEP 3134 exception chaining: connecting high-level domain errors to low-level technical root causes (<code className="text-teal-300 font-mono">__cause__</code>), implicit context (<code className="text-cyan-300 font-mono">__context__</code>), suppressing tracebacks with <code className="text-purple-300 font-mono">from None</code>, and building subsystem translation layers.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔗 Explicit Chaining with from e
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ Suppressing Tracebacks with from None
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔍 Inspecting __cause__ &amp; __context__
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🏛️ Subsystem Translation Layers
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: EXCEPTION CHAINING ESSENTIALS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🔗</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. PEP 3134: Explicit &amp; Suppressed Exception Chaining
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              When writing modular microservices, low-level errors (like socket timeouts or database syntax errors) should rarely be shown directly to user-facing layers. However, simply replacing the error loses valuable diagnostic context. <strong>Exception Chaining</strong> solves this dilemma by linking high-level domain errors to their technical root causes:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-base mb-1">1️⃣ Explicit: `raise B from A`</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">new_err.__cause__ = old_err</code>
                <p className="text-[11px] text-slate-300">
                  Direct causal link: Displays <em>"The above exception was the direct cause of..."</em> in tracebacks.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-base mb-1">2️⃣ Implicit: `raise B`</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">new_err.__context__ = old_err</code>
                <p className="text-[11px] text-slate-300">
                  Occurs automatically inside except blocks without <code>from</code>. Displays <em>"During handling..."</em>.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-base mb-1">3️⃣ Suppressed: `from None`</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">__suppress_context__ = True</code>
                <p className="text-[11px] text-slate-300">
                  Hides low-level internal tracebacks to prevent leaking database schemas or security credentials in public APIs.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Golden Translation Pattern
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Always use <code className="text-teal-300 font-mono">raise DomainError(...) from original_err</code> when translating low-level library errors into clean domain exceptions. It protects architectural abstraction boundaries while preserving complete forensic traceability for Sentry, Datadog, and DevOps engineers!
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
                2. Visualizing Exception Chaining &amp; Translation Pipelines
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("explicit")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "explicit"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Explicit Chaining (__cause__)
              </button>
              <button
                onClick={() => setActiveInteractiveTab("suppress")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "suppress"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Suppression via `from None`
              </button>
              <button
                onClick={() => setActiveInteractiveTab("translation")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "translation"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Subsystem Translation Layer
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining dual tracebacks, causal linkages, and public API sanitization:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "explicit" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">EXPLICIT EXCEPTION CHAINING: `raise NewError from OriginalError`</text>

                {/* Left: Original Error */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="360" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="12" fontWeight="bold">1. Root-Cause Exception</text>
                  <text x="20" y="60" fill="#fca5a5" fontSize="9 font-mono">try:</text>
                  <text x="35" y="80" fill="#fca5a5" fontSize="9 font-mono">socket.connect("bank.gateway:443")</text>
                  <text x="20" y="105" fill="#fca5a5" fontSize="9 font-mono">except TimeoutError as socket_err:</text>

                  <rect x="20" y="130" width="320" height="85" rx="4" fill="#881337" stroke="#e11d48" />
                  <text x="30" y="155" fill="#ffe4e6" fontSize="10 font-bold">Original Low-Level Failure:</text>
                  <text x="30" y="175" fill="#ecfdf5" fontSize="8 font-mono">TimeoutError: Socket read timed out</text>
                  <text x="30" y="195" fill="#fda4af" fontSize="8 font-mono">after 3000ms on port 443</text>
                </g>

                {/* Arrow with FROM */}
                <g transform="translate(405, 140)">
                  <text x="0" y="0" fill="#2dd4bf" fontSize="12" fontWeight="bold">from socket_err</text>
                  <text x="25" y="25" fill="#38bdf8" fontSize="26" fontWeight="bold">→</text>
                </g>

                {/* Right: High Level Error */}
                <g transform="translate(490, 50)">
                  <rect x="0" y="0" width="360" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="30" fill="#99f6e4" fontSize="12" fontWeight="bold">2. High-Level Domain Exception</text>
                  
                  <text x="20" y="60" fill="#ecfdf5" fontSize="9 font-mono">raise PaymentGatewayTimeoutError(</text>
                  <text x="35" y="80" fill="#34d399" fontSize="9 font-mono">"Bank server timed out"</text>
                  <text x="20" y="100" fill="#ecfdf5" fontSize="9 font-mono">) from socket_err</text>

                  <rect x="20" y="130" width="320" height="85" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="155" fill="#34d399" fontSize="10 font-bold">Populates `err.__cause__`:</text>
                  <text x="30" y="175" fill="#ecfdf5" fontSize="8 font-mono">err.__cause__ = socket_err</text>
                  <text x="30" y="195" fill="#a7f3d0" fontSize="8 font-mono">Traceback prints full dual-causal stack!</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "suppress" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">SUPPRESSING TRACEBACKS WITH `raise ... from None`</text>

                {/* Left: Sensitive Internal Error */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="12" fontWeight="bold">Internal Database / API Handler</text>
                  
                  <text x="20" y="60" fill="#ecfdf5" fontSize="9 font-mono">try:</text>
                  <text x="35" y="80" fill="#cbd5e1" fontSize="9 font-mono">query_db("SELECT * FROM tbl_secrets")</text>
                  <text x="20" y="105" fill="#ecfdf5" fontSize="9 font-mono">except SqlInternalError as raw_err:</text>
                  <text x="35" y="130" fill="#f43f5e" fontSize="9 font-mono font-bold"># Sensitive schema leaked in raw_err!</text>

                  <rect x="20" y="155" width="340" height="60" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="30" y="180" fill="#fda4af" fontSize="9 font-bold">Danger if not suppressed:</text>
                  <text x="30" y="198" fill="#ecfdf5" fontSize="8 font-mono">Raw table names leak to client browsers in traceback!</text>
                </g>

                {/* Arrow */}
                <g transform="translate(425, 140)">
                  <text x="0" y="0" fill="#c084fc" fontSize="12" fontWeight="bold">from None</text>
                  <text x="20" y="25" fill="#38bdf8" fontSize="26" fontWeight="bold">→</text>
                </g>

                {/* Right: Sanitized Public Error */}
                <g transform="translate(480, 50)">
                  <rect x="0" y="0" width="370" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">Sanitized Public REST API Response</text>
                  
                  <text x="20" y="60" fill="#ecfdf5" fontSize="9 font-mono">raise UserVisibleError(</text>
                  <text x="35" y="80" fill="#34d399" fontSize="9 font-mono">"Failed to load user profile"</text>
                  <text x="20" y="100" fill="#34d399" fontSize="9 font-mono font-bold">) from None  # SUPPRESSED!</text>

                  <rect x="20" y="130" width="330" height="85" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="155" fill="#34d399" fontSize="10 font-bold">✓ Clean Single Traceback:</text>
                  <text x="30" y="175" fill="#ecfdf5" fontSize="8 font-mono">Sets `__suppress_context__ = True`</text>
                  <text x="30" y="195" fill="#a7f3d0" fontSize="8 font-mono">Zero internal database secrets exposed!</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">SUBSYSTEM EXCEPTION TRANSLATION LAYER ARCHITECTURE</text>

                {/* 3 Tier Blocks in Order */}
                <g transform="translate(30, 50)">
                  {/* Tier 1: Hardware / Driver */}
                  <rect x="0" y="0" width="250" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="15" y="30" fill="#a5f3fc" fontSize="11" fontWeight="bold">1. Third-Party Driver</text>
                  <text x="15" y="60" fill="#cbd5e1" fontSize="9">• sqlite3.OperationalError</text>
                  <text x="15" y="80" fill="#cbd5e1" fontSize="9">• psycopg2.DatabaseError</text>
                  <text x="15" y="100" fill="#cbd5e1" fontSize="9">• requests.TimeoutError</text>
                  
                  <rect x="15" y="130" width="220" height="85" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="25" y="155" fill="#38bdf8" fontSize="9 font-bold">Vendor-Specific Details:</text>
                  <text x="25" y="175" fill="#cbd5e1" fontSize="8">Tied to specific DB drivers.</text>
                  <text x="25" y="190" fill="#cbd5e1" fontSize="8">Changes if you swap Postgres/MySQL.</text>

                  {/* Arrow 1 */}
                  <text x="265" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Tier 2: Translation Layer */}
                  <rect x="295" y="0" width="250" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="310" y="30" fill="#99f6e4" fontSize="11" fontWeight="bold">2. Translation Layer (`from`)</text>
                  <text x="310" y="60" fill="#ecfdf5" fontSize="9 font-mono">except DBError as e:</text>
                  <text x="325" y="85" fill="#34d399" fontSize="9 font-mono font-bold">raise DomainError from e</text>

                  <rect x="310" y="130" width="220" height="85" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="320" y="155" fill="#34d399" fontSize="9 font-bold">Decoupling Boundary:</text>
                  <text x="320" y="175" fill="#cbd5e1" fontSize="8">Converts low-level error into</text>
                  <text x="320" y="190" fill="#cbd5e1" fontSize="8">unified enterprise exception.</text>

                  {/* Arrow 2 */}
                  <text x="560" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Tier 3: Business Caller */}
                  <rect x="590" y="0" width="230" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="605" y="30" fill="#c4b5fd" fontSize="11" fontWeight="bold">3. Business Service Layer</text>
                  <text x="605" y="60" fill="#ecfdf5" fontSize="9 font-mono">except DomainError:</text>
                  <text x="620" y="85" fill="#34d399" fontSize="9 font-mono">retry_transaction()</text>

                  <rect x="605" y="130" width="200" height="85" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="615" y="155" fill="#c4b5fd" fontSize="9 font-bold">Clean Business Logic:</text>
                  <text x="615" y="175" fill="#cbd5e1" fontSize="8">Business rules never depend</text>
                  <text x="615" y="190" fill="#cbd5e1" fontSize="8">on driver-specific classes.</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE PAYMENT GATEWAY SIMULATOR */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Payment Gateway &amp; Exception Chaining Inspector
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Select a payment gateway failure mode to inspect how CPython handles dual tracebacks, causal links (<code className="text-teal-300 font-mono">__cause__</code>), and suppression (<code className="text-purple-300 font-mono">from None</code>):
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Scenario Chooser */}
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold block">
                Simulated Gateway Event Scenario
              </span>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setSelectedScenario("timeout")}
                  className={clsx(
                    "p-3 rounded-lg text-left text-xs font-mono transition-all border",
                    selectedScenario === "timeout"
                      ? "bg-teal-950/80 border-teal-500 text-teal-200"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  )}
                >
                  <div className="font-bold text-teal-300">1. Bank Socket Timeout (raise from socket_err)</div>
                  <div className="text-[11px] text-slate-400">Explicit chaining sets __cause__ to TimeoutError</div>
                </button>

                <button
                  onClick={() => setSelectedScenario("corrupt_json")}
                  className={clsx(
                    "p-3 rounded-lg text-left text-xs font-mono transition-all border",
                    selectedScenario === "corrupt_json"
                      ? "bg-cyan-950/80 border-cyan-500 text-cyan-200"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  )}
                >
                  <div className="font-bold text-cyan-300">2. Malformed Response (raise from json_err)</div>
                  <div className="text-[11px] text-slate-400">Explicit chaining sets __cause__ to JSONDecodeError</div>
                </button>

                <button
                  onClick={() => setSelectedScenario("card_declined")}
                  className={clsx(
                    "p-3 rounded-lg text-left text-xs font-mono transition-all border",
                    selectedScenario === "card_declined"
                      ? "bg-purple-950/80 border-purple-500 text-purple-200"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  )}
                >
                  <div className="font-bold text-purple-300">3. Card Declined (raise from None)</div>
                  <div className="text-[11px] text-slate-400">Suppressed chaining hides internal routing codes</div>
                </button>

                <button
                  onClick={() => setSelectedScenario("approved")}
                  className={clsx(
                    "p-3 rounded-lg text-left text-xs font-mono transition-all border",
                    selectedScenario === "approved"
                      ? "bg-emerald-950/80 border-emerald-500 text-emerald-200"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  )}
                >
                  <div className="font-bold text-emerald-300">4. Normal Approved Payment (200 OK)</div>
                  <div className="text-[11px] text-slate-400">Successful execution without errors</div>
                </button>
              </div>
            </div>

            {/* Live Dual Traceback Inspector Output */}
            <div className="space-y-3 flex flex-col justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-bold">
                Live Traceback &amp; `__cause__` Inspector
              </span>

              <div className={clsx(
                "p-4 rounded-xl border flex-1 space-y-2.5 text-xs font-mono",
                activeData.isSuccess ? "bg-emerald-950/40 border-emerald-800" : activeData.isClean ? "bg-slate-900 border-purple-800" : "bg-rose-950/40 border-rose-800"
              )}>
                <div>
                  <span className="text-slate-400">High-Level Exception: </span>
                  <span className={clsx("font-bold block mt-0.5", activeData.isSuccess ? "text-emerald-300" : "text-rose-300")}>
                    {activeData.highLevelError}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <span className="text-slate-400">Root-Cause Exception:</span>
                  <div className="text-cyan-300 mt-0.5">{activeData.rootCause}</div>
                </div>

                <div className="pt-2 border-t border-slate-800 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">`err.__cause__`:</span>
                    <span className="text-teal-300 font-bold">{activeData.causeAttr}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">`__suppress_context__`:</span>
                    <span className="text-purple-300 font-bold">{String(activeData.suppressContext)}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <span className="text-slate-400 block mb-0.5">Traceback Message:</span>
                  <span className="text-slate-300 italic text-[11px]">{activeData.tracebackMsg}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER EXCEPTION CHAINING MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Exception Chaining Mechanics Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Chaining Style</th>
                  <th className="py-3.5 px-4 font-bold">Syntax Pattern</th>
                  <th className="py-3.5 px-4 font-bold">Attribute Populated</th>
                  <th className="py-3.5 px-4 font-bold">Traceback Output Phrase</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">Explicit Chaining</td>
                  <td className="py-3 px-4 font-mono text-slate-200">raise NewError from OrigError</td>
                  <td className="py-3 px-4 text-emerald-400 font-mono">__cause__ = OrigError</td>
                  <td className="py-3 px-4 italic text-slate-300">"The above exception was the direct cause..."</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">Implicit Chaining</td>
                  <td className="py-3 px-4 font-mono text-slate-200">except OrigError: raise NewError</td>
                  <td className="py-3 px-4 text-cyan-300 font-mono">__context__ = OrigError</td>
                  <td className="py-3 px-4 italic text-slate-300">"During handling of the above exception..."</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">Suppressed Chaining</td>
                  <td className="py-3 px-4 font-mono text-slate-200">raise NewError from None</td>
                  <td className="py-3 px-4 text-purple-300 font-mono">__suppress_context__ = True</td>
                  <td className="py-3 px-4 italic text-slate-300">Hides root traceback completely (clean single error)</td>
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
            Explore 4 production-grade Python scripts demonstrating explicit chaining, suppression with from None, translation layers, and payment gateway clients:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "explicit_exception_chaining_from.py",
                code: explicitChaining,
                description: "Explicit chaining using raise from, __cause__ attribute inspection, and PEP 3134 tracebacks.",
              },
              {
                filename: "implicit_chaining_and_context.py",
                code: implicitChaining,
                description: "Implicit chaining, __context__ attribute, and suppressing tracebacks using raise from None.",
              },
              {
                filename: "subsystem_exception_translation_layer.py",
                code: translationLayer,
                description: "Subsystem translation layer architecture wrapping low-level errors into domain exceptions.",
              },
              {
                filename: "banking_gateway_exception_chaining_suite.py",
                code: bankingGateway,
                description: "Enterprise Banking & Fee Gateway Client with timeout, JSON decoding, and card decline chaining.",
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
                <span>❌</span> Trap 1: Circular Exception Chaining
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-rose-300 font-mono">except Exception as e: raise e from e</code> creates a circular loop where the error references itself as its own root cause!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Use bare <code className="text-emerald-300">raise</code> to re-raise active exceptions.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Leaking Database Secrets to Public UIs
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Forgetting to use <code className="text-amber-300 font-mono">from None</code> in public web endpoints can leak raw SQL syntax and database hostnames directly to client browsers.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Always use <code className="text-emerald-300">raise PublicError from None</code> on public API endpoints.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Passing Non-Exception to `from`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-purple-300 font-mono">raise MyError from "error string"</code> crashes with <code className="text-purple-300 font-mono">TypeError: exception causes must derive from BaseException or be None</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Only pass exception instances/classes or <code className="text-emerald-300">None</code> to <code className="text-emerald-300">from</code>.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Relying on Implicit Chaining
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Omitting <code className="text-cyan-300 font-mono">from e</code> during intentional exception translation triggers confusing "During handling of the above exception..." messages.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Always be explicit: <code className="text-emerald-300">raise DomainError from e</code>.
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
            Comprehensive question-and-answer repository covering Exception Chaining, __cause__, __context__, and from None suppression:
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
            Download or print the complete reference sheet with chaining recipes, suppression templates, and gateway translation patterns:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic9_exception_chaining_notes.txt"
              title="Print Topic 9 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
