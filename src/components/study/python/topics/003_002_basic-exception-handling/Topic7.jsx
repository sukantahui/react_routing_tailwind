import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import raisingFundamentals from "./topic7_files/raising_exceptions_fundamentals.py?raw";
import reRaisingExceptions from "./topic7_files/re_raising_active_exceptions.py?raw";
import failFastGuards from "./topic7_files/conditional_validation_guards.py?raw";
import walletGuard from "./topic7_files/student_banking_withdrawal_guard.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic7_files/topic7_note.txt?raw";

// FAQ Questions
import questions from "./topic7_files/topic7_questions";

/**
 * Topic7: Raising exceptions intentionally using raise keyword
 * Module: 003_002_basic-exception-handling
 * Segment: 3 (Advanced Python Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic7() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("pipeline");

  // Interactive Student Wallet Guard Simulator State
  const [balance, setBalance] = useState(10000);
  const [withdrawInput, setWithdrawInput] = useState(2500);
  const [isFrozen, setIsFrozen] = useState(false);
  const [operationLog, setOperationLog] = useState({
    type: "SUCCESS",
    msg: "Wallet initialized with INR 10,000.00. Ready for guarded transactions.",
  });

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

  const handleWithdrawal = () => {
    const amt = Number(withdrawInput);

    if (isFrozen) {
      setOperationLog({
        type: "ERROR_PERMISSION",
        msg: "PermissionError: Wallet for Debanjan Roy is FROZEN by administration!",
      });
      return;
    }

    if (isNaN(amt)) {
      setOperationLog({
        type: "ERROR_TYPE",
        msg: "TypeError: Withdrawal amount must be a numeric value!",
      });
      return;
    }

    if (amt <= 0) {
      setOperationLog({
        type: "ERROR_VALUE",
        msg: `ValueError: Withdrawal amount must be strictly positive: INR ${amt.toFixed(2)}`,
      });
      return;
    }

    if (amt > 5000) {
      setOperationLog({
        type: "ERROR_VALUE",
        msg: `ValueError: Withdrawal of INR ${amt.toLocaleString()} exceeds single transaction limit of INR 5,000.00!`,
      });
      return;
    }

    if (amt > balance) {
      setOperationLog({
        type: "ERROR_VALUE",
        msg: `ValueError: Insufficient Funds: Requested INR ${amt.toLocaleString()}, Available: INR ${balance.toLocaleString()}!`,
      });
      return;
    }

    // Success: Deduct balance
    const newBal = balance - amt;
    setBalance(newBal);
    setOperationLog({
      type: "SUCCESS",
      msg: `[WITHDRAWAL SUCCESS] Disbursed -INR ${amt.toLocaleString()} | Remaining Balance: INR ${newBal.toLocaleString()}`,
    });
  };

  const handleReset = () => {
    setBalance(10000);
    setIsFrozen(false);
    setOperationLog({
      type: "SUCCESS",
      msg: "Wallet balance reset to INR 10,000.00.",
    });
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
            Topic 7
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Robust Exception Handling &amp; Defensive Coding
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Raising Exceptions Intentionally with <code className="text-teal-400 font-mono">raise</code>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master proactive error signaling and fail-fast programming: triggering exceptions with <code className="text-teal-300 font-mono">raise</code>, why raising exceptions beats returning error codes, re-raising active errors with bare <code className="text-cyan-300 font-mono">raise</code>, and enforcing domain invariants.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🚨 Triggering Exceptions with raise
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ Fail-Fast vs Error Code Hazards
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔄 Bare raise Re-Raising &amp; Traceback Preservation
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ Financial Invariant Guards
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: THE RAISE STATEMENT */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚠️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The `raise` Statement: Proactive Error Triggering
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              In Python, you do not need to wait for a crash to occur. The <code className="text-teal-300 font-mono">raise</code> statement allows you to proactively halt execution and report invalid states before they corrupt downstream data:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-base mb-1">1️⃣ Inline Exception Raise</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">raise ValueError("Bad Arg")</code>
                <p className="text-[11px] text-slate-300">
                  Instantiates and throws a standard exception with a descriptive error message.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-base mb-1">2️⃣ Bare raise Re-Raise</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">except Error: log(); raise</code>
                <p className="text-[11px] text-slate-300">
                  Re-throws the currently active exception inside an except block without losing its original traceback.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-base mb-1">3️⃣ Fail-Fast Principle</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">if x &lt; 0: raise ValueError</code>
                <p className="text-[11px] text-slate-300">
                  Validates function inputs immediately, preventing silent data corruption from return codes.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-rose-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Return Code Trap: Why `return -1` Fails
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Returning <code className="text-rose-400 font-mono">return -1</code> or <code className="text-rose-400 font-mono">return None</code> requires every caller to remember to check for errors. If a caller forgets, the <code className="text-rose-400 font-mono">-1</code> is silently added to accounts or database ledgers, causing catastrophic data corruption. Raising an exception <em>cannot be ignored</em>!
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
                2. Visualizing Exception Propagation &amp; Bare `raise`
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("pipeline")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "pipeline"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                raise Propagation Flow
              </button>
              <button
                onClick={() => setActiveInteractiveTab("reraise")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "reraise"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Bare raise Logging Pattern
              </button>
              <button
                onClick={() => setActiveInteractiveTab("failfast")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "failfast"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Fail-Fast vs Return Codes
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining call stack unwinding, traceback preservation, and defensive validation guards:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "pipeline" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">THE `raise` STATEMENT CALL STACK UNWINDING FLOW</text>

                {/* 3 Call Stack Layers */}
                <g transform="translate(30, 50)">
                  {/* Layer 1: Caller */}
                  <rect x="0" y="0" width="250" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="15" y="30" fill="#c4b5fd" fontSize="12" fontWeight="bold">1. Main Application Service</text>
                  <text x="15" y="60" fill="#ecfdf5" fontSize="9 font-mono">try:</text>
                  <text x="30" y="80" fill="#38bdf8" fontSize="9 font-mono">enroll_student(age=10)</text>
                  <text x="15" y="110" fill="#ecfdf5" fontSize="9 font-mono">except ValueError as err:</text>
                  <text x="30" y="130" fill="#34d399" fontSize="9 font-mono">handle_alert(err)</text>
                  
                  <rect x="15" y="160" width="220" height="60" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="25" y="185" fill="#a7f3d0" fontSize="9 font-bold">Catches Propagated Error:</text>
                  <text x="25" y="205" fill="#ecfdf5" fontSize="8 font-mono">Prompts user to re-enter age!</text>

                  {/* Arrow 1 */}
                  <text x="265" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">←</text>

                  {/* Layer 2: Domain Function */}
                  <rect x="295" y="0" width="250" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="310" y="30" fill="#a5f3fc" fontSize="12" fontWeight="bold">2. enroll_student() Function</text>
                  <text x="310" y="60" fill="#ecfdf5" fontSize="9 font-mono">def enroll_student(age):</text>
                  <text x="325" y="85" fill="#fda4af" fontSize="9 font-mono">if age &lt; 14:</text>
                  <text x="340" y="110" fill="#f43f5e" fontSize="9 font-mono font-bold">raise ValueError("Age &lt; 14")</text>

                  <rect x="310" y="150" width="220" height="70" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="320" y="175" fill="#fca5a5" fontSize="9 font-bold">Execution Halted Immediately:</text>
                  <text x="320" y="195" fill="#cbd5e1" fontSize="8">Unwinds stack to main caller</text>

                  {/* Arrow 2 */}
                  <text x="560" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">←</text>

                  {/* Layer 3: Validation Engine */}
                  <rect x="590" y="0" width="230" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="605" y="30" fill="#99f6e4" fontSize="12" fontWeight="bold">3. Invariant Boundary</text>
                  <text x="605" y="60" fill="#cbd5e1" fontSize="9">• Validates age 14-80</text>
                  <text x="605" y="80" fill="#cbd5e1" fontSize="9">• Validates non-negative fee</text>
                  <text x="605" y="100" fill="#cbd5e1" fontSize="9">• Validates student name</text>

                  <rect x="605" y="140" width="200" height="80" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="615" y="165" fill="#34d399" fontSize="10 font-bold">✓ Fail-Fast Guarantee:</text>
                  <text x="615" y="185" fill="#ecfdf5" fontSize="8 font-mono">Corrupt data never touches</text>
                  <text x="615" y="200" fill="#ecfdf5" fontSize="8 font-mono">the institutional database!</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "reraise" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">BARE `raise` LOGGING &amp; ROLLBACK PATTERN</text>

                {/* Left: Middleware block */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="400" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="12" fontWeight="bold">Database Middleware Handler</text>
                  
                  <text x="20" y="60" fill="#ecfdf5" fontSize="9 font-mono">try:</text>
                  <text x="40" y="80" fill="#cbd5e1" fontSize="9 font-mono">execute_db_transaction(amount)</text>
                  <text x="20" y="105" fill="#ecfdf5" fontSize="9 font-mono">except PermissionError as err:</text>
                  <text x="40" y="125" fill="#38bdf8" fontSize="9 font-mono">1. audit_log_error(err)  # Forensic Log</text>
                  <text x="40" y="145" fill="#38bdf8" fontSize="9 font-mono">2. rollback_db_state()   # Clean state</text>
                  <text x="40" y="170" fill="#34d399" fontSize="10 font-mono font-bold">3. raise                 # BARE RAISE!</text>

                  <rect x="20" y="195" width="360" height="30" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="30" y="215" fill="#a7f3d0" fontSize="8 font-mono">Preserves line number of original error in execute_db()!</text>
                </g>

                {/* Arrow */}
                <g transform="translate(445, 140)">
                  <text x="10" y="20" fill="#38bdf8" fontSize="26" fontWeight="bold">→</text>
                </g>

                {/* Right: Caller */}
                <g transform="translate(490, 50)">
                  <rect x="0" y="0" width="360" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">Top-Level Web / API Gateway</text>
                  
                  <rect x="20" y="60" width="320" height="85" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="85" fill="#34d399" fontSize="10 font-bold">Catches Re-Raised Exception:</text>
                  <text x="30" y="105" fill="#ecfdf5" fontSize="9 font-mono">Returns HTTP 403 Forbidden</text>
                  <text x="30" y="125" fill="#ecfdf5" fontSize="9 font-mono">to mobile application client!</text>

                  <text x="20" y="175" fill="#cbd5e1" fontSize="9">• Clean architectural separation</text>
                  <text x="20" y="195" fill="#cbd5e1" fontSize="9">• Zero error masking or swallow bugs</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">FAIL-FAST EXCEPTIONS VS RETURNING ERROR CODES</text>

                {/* Left: Flawed */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="12" fontWeight="bold">❌ Flawed Return Code Approach</text>
                  <text x="20" y="60" fill="#fca5a5" fontSize="9 font-mono">def calc_tax(salary):</text>
                  <text x="40" y="80" fill="#fca5a5" fontSize="9 font-mono">if salary &lt; 0: return -1.0  # ERROR CODE</text>
                  
                  <rect x="20" y="115" width="340" height="100" rx="4" fill="#881337" stroke="#e11d48" />
                  <text x="30" y="140" fill="#ffe4e6" fontSize="10 font-bold">Silent Disaster:</text>
                  <text x="30" y="160" fill="#ecfdf5" fontSize="8 font-mono">Caller forgets to check for -1:</text>
                  <text x="30" y="180" fill="#ecfdf5" fontSize="8 font-mono">total_tax += calc_tax(-50000)  # Adds -1 to ledger!</text>
                  <text x="30" y="200" fill="#fda4af" fontSize="8 font-mono">Corrupts financial accounting silently!</text>
                </g>

                {/* Right: Pythonic */}
                <g transform="translate(460, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">✓ Pythonic Fail-Fast Exception</text>
                  <text x="20" y="60" fill="#ecfdf5" fontSize="9 font-mono">def calc_tax(salary):</text>
                  <text x="40" y="80" fill="#34d399" fontSize="9 font-mono">if salary &lt; 0: raise ValueError("Negative!")</text>

                  <rect x="20" y="115" width="340" height="100" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="140" fill="#a7f3d0" fontSize="10 font-bold">Guaranteed Safety:</text>
                  <text x="30" y="160" fill="#ecfdf5" fontSize="8 font-mono">Execution halts at the exact line of bug.</text>
                  <text x="30" y="180" fill="#ecfdf5" fontSize="8 font-mono">Invalid negative value can NEVER enter ledger!</text>
                  <text x="30" y="200" fill="#34d399" fontSize="8 font-mono">Immediate feedback in logs and tracebacks.</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE STUDENT WALLET PLAYGROUND */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Student Digital Wallet &amp; `raise` Guard Playground
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Test institutional financial transaction guards protected by <code className="text-teal-300 font-mono">raise</code> statements:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Wallet Controls */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                  Student Financial Account
                </span>
                <button
                  onClick={handleReset}
                  className="text-[11px] font-mono text-slate-400 hover:text-white underline"
                >
                  Reset Balance
                </button>
              </div>

              {/* Balance Card */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400 font-mono">Debanjan Roy (STU-882)</div>
                  <div className="text-xl font-bold text-teal-300 font-mono mt-0.5">
                    INR {balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </div>
                </div>
                <span className={clsx("text-xs font-mono px-2 py-1 rounded border", isFrozen ? "bg-rose-950 text-rose-300 border-rose-700" : "bg-emerald-950 text-emerald-300 border-emerald-700")}>
                  {isFrozen ? "FROZEN" : "ACTIVE"}
                </span>
              </div>

              {/* Amount Input */}
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-400 block">
                  Withdrawal Amount (Max Single Limit: INR 5,000.00):
                </label>
                <input
                  type="number"
                  value={withdrawInput}
                  onChange={(e) => setWithdrawInput(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-sm font-mono text-white focus:border-teal-500 focus:outline-none"
                  placeholder="Enter amount..."
                />
              </div>

              {/* Freeze Toggle */}
              <label className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between text-xs font-mono cursor-pointer hover:border-slate-700">
                <span className="text-slate-300">Administrative Account Freeze</span>
                <input
                  type="checkbox"
                  checked={isFrozen}
                  onChange={(e) => setIsFrozen(e.target.checked)}
                  className="accent-rose-500 w-4 h-4"
                />
              </label>

              {/* Action Button */}
              <button
                onClick={handleWithdrawal}
                className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-lg text-xs font-mono transition-all shadow-lg shadow-teal-950/50"
              >
                Execute Guarded Withdrawal (withdraw())
              </button>
            </div>

            {/* Live Invariant Trace Output */}
            <div className="space-y-3 flex flex-col justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-bold">
                Live Defensive Invariant Audit Trace
              </span>

              <div className={clsx(
                "p-4 rounded-xl border flex-1 space-y-2.5 text-xs font-mono",
                operationLog.type === "SUCCESS" ? "bg-slate-900 border-slate-800" : "bg-rose-950/40 border-rose-800"
              )}>
                <div className="text-slate-400">
                  Transaction Status:{" "}
                  <span className={clsx("font-bold", operationLog.type === "SUCCESS" ? "text-emerald-400" : "text-rose-400")}>
                    {operationLog.type === "SUCCESS" ? "✓ APPROVED (200 OK)" : "❌ BLOCKED BY `raise`"}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <span className="text-slate-400 block mb-1">Execution Feedback:</span>
                  <div className={clsx("p-3 rounded-lg border leading-relaxed", operationLog.type === "SUCCESS" ? "bg-emerald-950/40 border-emerald-800 text-emerald-300" : "bg-slate-950 border-rose-900 text-rose-300")}>
                    {operationLog.msg}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-500">
                  Invariants enforced: Non-zero positive, single limit INR 5k, balance check, authorization status.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER RAISE REFERENCE MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master `raise` Scenarios Reference Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Scenario / Syntax</th>
                  <th className="py-3.5 px-4 font-bold">Python Code Pattern</th>
                  <th className="py-3.5 px-4 font-bold">Traceback Behavior</th>
                  <th className="py-3.5 px-4 font-bold">Recommended Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">New Exception</td>
                  <td className="py-3 px-4 font-mono text-slate-200">raise ValueError("msg")</td>
                  <td className="py-3 px-4">Creates new traceback at current line</td>
                  <td className="py-3 px-4">Input validation, boundary guards, domain checks</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">Bare Re-Raise</td>
                  <td className="py-3 px-4 font-mono text-slate-200">except Exception: log(); raise</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">Preserves original line numbers</td>
                  <td className="py-3 px-4">Logging, rollback, and middleware auditing</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">Permission Guard</td>
                  <td className="py-3 px-4 font-mono text-slate-200">raise PermissionError("Frozen")</td>
                  <td className="py-3 px-4">Halts unauthorized user actions</td>
                  <td className="py-3 px-4">RBAC access control, frozen wallets, expired tokens</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">Abstract Stub</td>
                  <td className="py-3 px-4 font-mono text-slate-200">raise NotImplementedError()</td>
                  <td className="py-3 px-4">Signals missing child implementation</td>
                  <td className="py-3 px-4">Unimplemented base class methods</td>
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
            Explore 4 production-grade Python scripts demonstrating the `raise` keyword, bare re-raising, fail-fast guards, and student wallet invariant engines:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "raising_exceptions_fundamentals.py",
                code: raisingFundamentals,
                description: "Raising exceptions intentionally with raise, input validation, and descriptive error messages.",
              },
              {
                filename: "re_raising_active_exceptions.py",
                code: reRaisingExceptions,
                description: "Bare raise re-raising, preserving original tracebacks, and the log-cleanup-reraise pattern.",
              },
              {
                filename: "conditional_validation_guards.py",
                code: failFastGuards,
                description: "Fail-Fast exceptions vs silent error return codes and Indian PAN validation guards.",
              },
              {
                filename: "student_banking_withdrawal_guard.py",
                code: walletGuard,
                description: "Enterprise Student Campus Wallet with strict invariant guards and atomic transactions.",
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
                <span>❌</span> Trap 1: Bare `raise` Outside Except Block
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Calling bare <code className="text-rose-300 font-mono">raise</code> when no exception is active raises <code className="text-rose-300 font-mono">RuntimeError: No active exception to reraise</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Only use bare <code className="text-emerald-300">raise</code> inside <code className="text-emerald-300">except</code> blocks.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Raising Non-Exception Types
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-amber-300 font-mono">raise "Invalid Password"</code> in Python 3 causes <code className="text-amber-300 font-mono">TypeError: exceptions must derive from BaseException</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Always instantiate exception classes: <code className="text-emerald-300">raise ValueError("msg")</code>.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Generic Unhelpful Error Messages
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-purple-300 font-mono">raise ValueError("Error")</code> makes debugging in production logs impossible.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Include specific values: <code className="text-emerald-300">raise ValueError(f"Expected age &gt;= 14, got {age}")</code>.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Silent Exception Swallowing
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Catching an exception and executing <code className="text-cyan-300 font-mono">except Exception: pass</code> silently masks severe crashes and database corruptions.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Always handle, log, or re-raise with <code className="text-emerald-300">raise</code>.
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
            Comprehensive question-and-answer repository covering the `raise` keyword, bare re-raising, fail-fast guards, and defensive coding:
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
            Download or print the complete reference sheet with raise recipes, fail-fast validation templates, and wallet guard patterns:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic7_raising_exceptions_notes.txt"
              title="Print Topic 7 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
