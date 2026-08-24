import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import failFastPatterns from "./topic12_files/fail_fast_design_patterns.py?raw";
import loggingBestPractices from "./topic12_files/exception_logging_and_auditing_best_practices.py?raw";
import defensiveContracts from "./topic12_files/defensive_programming_contracts.py?raw";
import resilientEngine from "./topic12_files/enterprise_resilient_financial_engine.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic12_files/topic12_note.txt?raw";

// FAQ Questions
import questions from "./topic12_files/topic12_questions";

/**
 * Topic12: Best practices: Fail fast, log errors, defensive programming
 * Module: 003_002_basic-exception-handling
 * Segment: 3 (Advanced Python Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic12() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("failfast");

  // Interactive Resilient Billing Simulator State
  const [studentId, setStudentId] = useState("STU-101");
  const [studentName, setStudentName] = useState("Sourav Mukherjee");
  const [balance, setBalance] = useState(25000);
  const [tuitionFee, setTuitionFee] = useState(15000);

  const [transactionLog, setTransactionLog] = useState({
    status: "IDLE",
    originalBalance: 25000,
    currentBalance: 25000,
    message: "Ready to execute defensive atomic transaction.",
    rollbackTriggered: false,
    auditTrail: [],
  });

  const handleExecuteTransaction = () => {
    // Tier 1: Fail-Fast Boundary Guard
    if (!studentId.startsWith("STU-")) {
      setTransactionLog({
        status: "ERROR_VALIDATION",
        originalBalance: balance,
        currentBalance: balance,
        message: `StudentAdmissionValidationError: Invalid ID format '${studentId}'. Must start with 'STU-'!`,
        rollbackTriggered: false,
        auditTrail: [{ time: new Date().toLocaleTimeString(), event: "Fail-Fast Validation Blocked" }],
      });
      return;
    }

    if (!studentName.trim()) {
      setTransactionLog({
        status: "ERROR_VALIDATION",
        originalBalance: balance,
        currentBalance: balance,
        message: "StudentAdmissionValidationError: Student name is mandatory!",
        rollbackTriggered: false,
        auditTrail: [{ time: new Date().toLocaleTimeString(), event: "Empty Name Blocked" }],
      });
      return;
    }

    if (tuitionFee <= 0) {
      setTransactionLog({
        status: "ERROR_VALIDATION",
        originalBalance: balance,
        currentBalance: balance,
        message: `StudentAdmissionValidationError: Tuition fee must be strictly positive: INR ${tuitionFee}`,
        rollbackTriggered: false,
        auditTrail: [{ time: new Date().toLocaleTimeString(), event: "Non-positive Fee Blocked" }],
      });
      return;
    }

    // Tier 2 & 3: Atomic Balance Deduction with Rollback Protection
    const original = balance;
    if (tuitionFee > balance) {
      // Discrepancy Error -> Rollback triggered!
      setTransactionLog({
        status: "ERROR_ROLLBACK",
        originalBalance: original,
        currentBalance: original, // Protected and rolled back!
        message: `LedgerTransactionDiscrepancyError: Insufficient funds (Available: INR ${original.toLocaleString()}, Required: INR ${tuitionFee.toLocaleString()}) -> ATOMIC ROLLBACK EXECUTED. Balance preserved at INR ${original.toLocaleString()}!`,
        rollbackTriggered: true,
        auditTrail: [
          { time: new Date().toLocaleTimeString(), event: `Snapshot original balance: INR ${original.toLocaleString()}` },
          { time: new Date().toLocaleTimeString(), event: "Insufficient balance detected" },
          { time: new Date().toLocaleTimeString(), event: `Rolled back balance to INR ${original.toLocaleString()}` },
        ],
      });
      return;
    }

    // Success
    const newBal = balance - tuitionFee;
    setBalance(newBal);
    setTransactionLog({
      status: "SUCCESS",
      originalBalance: original,
      currentBalance: newBal,
      message: `[ATOMIC COMMIT APPROVED] Disbursed INR ${tuitionFee.toLocaleString()} for ${studentName} (${studentId}). Remaining: INR ${newBal.toLocaleString()}`,
      rollbackTriggered: false,
      auditTrail: [
        { time: new Date().toLocaleTimeString(), event: `Snapshot original balance: INR ${original.toLocaleString()}` },
        { time: new Date().toLocaleTimeString(), event: `Deducted INR ${tuitionFee.toLocaleString()}` },
        { time: new Date().toLocaleTimeString(), event: "Postcondition Invariant Verified (Sum == Original - Fee)" },
        { time: new Date().toLocaleTimeString(), event: `Committed new balance: INR ${newBal.toLocaleString()}` },
      ],
    });
  };

  const handleReset = () => {
    setBalance(25000);
    setStudentId("STU-101");
    setStudentName("Sourav Mukherjee");
    setTuitionFee(15000);
    setTransactionLog({
      status: "IDLE",
      originalBalance: 25000,
      currentBalance: 25000,
      message: "Reset state to INR 25,000.00.",
      rollbackTriggered: false,
      auditTrail: [],
    });
  };

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
            Topic 12 (Module Capstone)
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Robust Exception Handling &amp; Defensive Coding
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Exception Best Practices &amp; <span className="text-teal-400">Defensive Architecture</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master crash-proof software design: the Fail-Fast principle, replacing the Pyramid of Doom with guard clauses, avoiding silent exception swallowing (<code className="text-rose-400 font-mono">except: pass</code>), EAFP vs LBYL, and atomic rollback transaction guarantees.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ Fail-Fast Guard Clauses
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🐍 EAFP vs LBYL Philosophy
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔄 Atomic Transaction Rollbacks
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📊 Forensic Telemetry Auditing
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: THE 5 CARDINAL RULES */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🏛️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The 5 Cardinal Rules of Python Exception Engineering
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Writing robust, production-grade Python software requires following five proven architectural design rules:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6 not-prose">
              {/* Rule 1 */}
              <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/60 shadow-lg">
                <div className="text-rose-400 font-bold text-sm mb-1">1️⃣ Never Silently Swallow</div>
                <code className="text-xs font-mono text-rose-300 block mb-1">except: pass (FORBIDDEN)</code>
                <p className="text-[11px] text-slate-300">
                  Always log, notify, re-raise, or gracefully degrade. Never hide errors.
                </p>
              </div>

              {/* Rule 2 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">2️⃣ Specific-First Ordering</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">ChildError before BaseError</code>
                <p className="text-[11px] text-slate-300">
                  Order except blocks from most specific to most general to avoid dead code.
                </p>
              </div>

              {/* Rule 3 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">3️⃣ Fail-Fast at Boundaries</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">raise for inputs / assert for math</code>
                <p className="text-[11px] text-slate-300">
                  Validate inputs immediately with guard clauses; check internal invariants with assert.
                </p>
              </div>

              {/* Rule 4 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">4️⃣ Chain with `from e`</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">raise DomainError from root_err</code>
                <p className="text-[11px] text-slate-300">
                  Preserve causal history across architectural subsystem boundaries.
                </p>
              </div>

              {/* Rule 5 */}
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 shadow-lg">
                <div className="text-emerald-400 font-bold text-sm mb-1">5️⃣ Atomic Rollback</div>
                <code className="text-xs font-mono text-emerald-300 block mb-1">try mutate / except restore</code>
                <p className="text-[11px] text-slate-300">
                  Guarantee that no exception leaves database or financial balances in half-mutated states.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                EAFP (Pythonic) vs LBYL (Cautious)
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Python strongly favors <strong>EAFP</strong> (<em>"Easier to Ask for Forgiveness than Permission"</em>) using <code className="text-teal-300 font-mono">try...except</code> over <strong>LBYL</strong> (<em>"Look Before You Leap"</em>) using <code className="text-cyan-300 font-mono">if key in dict</code>. EAFP is faster on the happy path and eliminates multi-threaded <strong>TOCTOU</strong> (Time-of-Check to Time-of-Use) race hazards!
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
                2. Visualizing Defensive Architecture &amp; Guard Pipelines
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("failfast")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "failfast"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Guard Clauses vs Pyramid
              </button>
              <button
                onClick={() => setActiveInteractiveTab("eafp")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "eafp"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                EAFP vs LBYL Decision Tree
              </button>
              <button
                onClick={() => setActiveInteractiveTab("rollback")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "rollback"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Atomic Rollback Guarantee
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining code structure flattening, Pythonic EAFP access, and atomic rollback workflows:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "failfast" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">FAIL-FAST GUARD CLAUSES VS PYRAMID OF DOOM</text>

                {/* Left: Pyramid of Doom */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="12" fontWeight="bold">❌ Pyramid of Doom (Nested If-Ladders)</text>
                  
                  <text x="20" y="60" fill="#fca5a5" fontSize="8 font-mono">if data is not None:</text>
                  <text x="35" y="78" fill="#fca5a5" fontSize="8 font-mono">if "name" in data:</text>
                  <text x="50" y="96" fill="#fca5a5" fontSize="8 font-mono">if len(data["name"]) &gt; 0:</text>
                  <text x="65" y="114" fill="#fca5a5" fontSize="8 font-mono">if "fee" in data:</text>
                  <text x="80" y="132" fill="#fca5a5" fontSize="8 font-mono">if data["fee"] &gt;= 5000:</text>
                  <text x="95" y="150" fill="#34d399" fontSize="8 font-mono"># Actual Core Logic Buried Deep!</text>

                  <rect x="20" y="170" width="340" height="50" rx="4" fill="#881337" stroke="#e11d48" />
                  <text x="30" y="195" fill="#ffe4e6" fontSize="9 font-mono">Hard to read, hard to test, fails slowly!</text>
                </g>

                {/* Right: Guard Clauses */}
                <g transform="translate(460, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">✓ Pythonic Fail-Fast Guard Clauses</text>
                  
                  <text x="20" y="60" fill="#ecfdf5" fontSize="8 font-mono">if not data: raise TypeError("Missing data")</text>
                  <text x="20" y="78" fill="#ecfdf5" fontSize="8 font-mono">if "name" not in data: raise ValueError("Name required")</text>
                  <text x="20" y="96" fill="#ecfdf5" fontSize="8 font-mono">if data["fee"] &lt; 5000: raise ValueError("Fee &lt; 5k")</text>
                  
                  <rect x="20" y="125" width="340" height="95" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="150" fill="#34d399" fontSize="10 font-bold">Flat Unindented Happy Path:</text>
                  <text x="30" y="170" fill="#ecfdf5" fontSize="8 font-mono"># Clean business logic follows immediately at column 0!</text>
                  <text x="30" y="190" fill="#a7f3d0" fontSize="8 font-mono">Instant bug pinpointing in production logs.</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "eafp" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">EAFP (PYTHONIC) VS LBYL (CAUTIOUS) COMPARISON</text>

                {/* Left: LBYL */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="12" fontWeight="bold">LBYL: Look Before You Leap</text>
                  
                  <text x="20" y="65" fill="#ecfdf5" fontSize="9 font-mono">if student_id in student_database:</text>
                  <text x="35" y="85" fill="#ecfdf5" fontSize="9 font-mono">return student_database[student_id]</text>
                  <text x="20" y="105" fill="#ecfdf5" fontSize="9 font-mono">else:</text>
                  <text x="35" y="125" fill="#ecfdf5" fontSize="9 font-mono">return None</text>

                  <rect x="20" y="150" width="340" height="70" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="30" y="175" fill="#fda4af" fontSize="9 font-bold">Weaknesses:</text>
                  <text x="30" y="195" fill="#cbd5e1" fontSize="8 font-mono">2 dictionary hash lookups; vulnerable to TOCTOU race!</text>
                </g>

                {/* Right: EAFP */}
                <g transform="translate(460, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="20" y="30" fill="#a5f3fc" fontSize="12" fontWeight="bold">EAFP: Easier to Ask Forgiveness (Pythonic)</text>
                  
                  <text x="20" y="65" fill="#ecfdf5" fontSize="9 font-mono">try:</text>
                  <text x="35" y="85" fill="#34d399" fontSize="9 font-mono font-bold">return student_database[student_id]</text>
                  <text x="20" y="105" fill="#ecfdf5" fontSize="9 font-mono">except KeyError:</text>
                  <text x="35" y="125" fill="#ecfdf5" fontSize="9 font-mono">return None</text>

                  <rect x="20" y="150" width="340" height="70" rx="4" fill="#022c22" stroke="#0284c7" />
                  <text x="30" y="175" fill="#34d399" fontSize="9 font-bold">Advantages:</text>
                  <text x="30" y="195" fill="#a7f3d0" fontSize="8 font-mono">Single hash lookup on happy path; 100% thread-safe!</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">ATOMIC TRANSACTION EXECUTION &amp; ROLLBACK ARCHITECTURE</text>

                {/* 4 Sequential Steps */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="190" height="240" rx="6" fill="#134e4a" stroke="#14b8a6" />
                  <text x="15" y="30" fill="#99f6e4" fontSize="11 font-bold">1. Snapshot State</text>
                  <text x="15" y="60" fill="#ecfdf5" fontSize="8 font-mono">orig_bal = acc.balance</text>
                  <text x="15" y="90" fill="#cbd5e1" fontSize="8">• Takes in-memory</text>
                  <text x="15" y="105" fill="#cbd5e1" fontSize="8">or DB checkpoint</text>

                  <rect x="210" y="0" width="190" height="240" rx="6" fill="#083344" stroke="#06b6d4" />
                  <text x="225" y="30" fill="#a5f3fc" fontSize="11 font-bold">2. Execute Mutation</text>
                  <text x="225" y="60" fill="#ecfdf5" fontSize="8 font-mono">acc.balance -= fee</text>
                  <text x="225" y="90" fill="#cbd5e1" fontSize="8">• Performs balance</text>
                  <text x="225" y="105" fill="#cbd5e1" fontSize="8">deduction</text>

                  <rect x="420" y="0" width="190" height="240" rx="6" fill="#4c0519" stroke="#f43f5e" />
                  <text x="435" y="30" fill="#fda4af" fontSize="11 font-bold">3. Exception Caught</text>
                  <text x="435" y="60" fill="#fca5a5" fontSize="8 font-mono">except Discrepancy:</text>
                  <text x="445" y="80" fill="#fda4af" fontSize="8 font-mono">acc.bal = orig_bal</text>
                  <text x="435" y="110" fill="#cbd5e1" fontSize="8">• Restores balance</text>
                  <text x="435" y="125" fill="#cbd5e1" fontSize="8">instantly!</text>

                  <rect x="630" y="0" width="190" height="240" rx="6" fill="#064e3b" stroke="#10b981" />
                  <text x="645" y="30" fill="#a7f3d0" fontSize="11 font-bold">4. Audit &amp; Raise</text>
                  <text x="645" y="60" fill="#ecfdf5" fontSize="8 font-mono">logger.error(...)</text>
                  <text x="645" y="80" fill="#34d399" fontSize="8 font-mono">raise</text>
                  <text x="645" y="110" fill="#cbd5e1" fontSize="8">• Zero corrupted data</text>
                  <text x="645" y="125" fill="#cbd5e1" fontSize="8">in database!</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE RESILIENT BILLING PLAYGROUND */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Resilient Billing Engine &amp; Rollback Playground
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Execute fee deductions against the defensive ledger to test fail-fast guards, boundary validation, and automatic atomic rollbacks:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Controls */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                  Transaction Parameters
                </span>
                <button
                  onClick={handleReset}
                  className="text-[11px] font-mono text-slate-400 hover:text-white underline"
                >
                  Reset Ledger
                </button>
              </div>

              {/* Balance Card */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400 font-mono">Active Student Balance:</div>
                  <div className="text-xl font-bold text-teal-300 font-mono mt-0.5">
                    INR {balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </div>
                </div>
                {transactionLog.rollbackTriggered && (
                  <span className="text-xs font-mono px-2 py-1 bg-rose-950 text-rose-300 border border-rose-700 rounded animate-pulse">
                    ROLLBACK EXECUTED
                  </span>
                )}
              </div>

              {/* Student ID */}
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-400 block">Student ID (Must start with 'STU-'):</label>
                <input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs font-mono text-white focus:border-teal-500 focus:outline-none"
                />
              </div>

              {/* Student Name */}
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-400 block">Student Name:</label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs font-mono text-white focus:border-teal-500 focus:outline-none"
                />
              </div>

              {/* Tuition Deduction Fee */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Tuition Deduction Amount:</span>
                  <span className="text-teal-300 font-bold">INR {tuitionFee.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="40000"
                  step="5000"
                  value={tuitionFee}
                  onChange={(e) => setTuitionFee(Number(e.target.value))}
                  className="w-full accent-teal-500"
                />
              </div>

              {/* Action Button */}
              <button
                onClick={handleExecuteTransaction}
                className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-lg text-xs font-mono transition-all shadow-lg shadow-teal-950/50"
              >
                Execute Atomic Deduction (execute_atomic_tuition_deduction())
              </button>
            </div>

            {/* Live Ledger Audit Trace */}
            <div className="space-y-3 flex flex-col justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-bold">
                Defensive Telemetry &amp; Rollback Audit Log
              </span>

              <div className={clsx(
                "p-4 rounded-xl border flex-1 space-y-2.5 text-xs font-mono",
                transactionLog.status === "SUCCESS"
                  ? "bg-slate-900 border-slate-800"
                  : transactionLog.status === "IDLE"
                  ? "bg-slate-900 border-slate-800 text-slate-400"
                  : "bg-rose-950/40 border-rose-800"
              )}>
                <div>
                  <span className="text-slate-400">Transaction Status: </span>
                  <span className={clsx(
                    "font-bold",
                    transactionLog.status === "SUCCESS"
                      ? "text-emerald-400"
                      : transactionLog.status === "IDLE"
                      ? "text-slate-400"
                      : "text-rose-400"
                  )}>
                    {transactionLog.status === "SUCCESS"
                      ? "✓ COMMITTED (200 OK)"
                      : transactionLog.status === "IDLE"
                      ? "IDLE"
                      : "❌ ABORTED & ROLLED BACK"}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-800 text-slate-300 leading-relaxed text-[11px]">
                  {transactionLog.message}
                </div>

                {transactionLog.auditTrail.length > 0 && (
                  <div className="pt-2 border-t border-slate-800 space-y-1">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">
                      Forensic Audit Trail:
                    </span>
                    {transactionLog.auditTrail.map((item, idx) => (
                      <div key={idx} className="text-[11px] text-teal-300 flex gap-2">
                        <span className="text-slate-500">[{item.time}]</span>
                        <span>{item.event}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER DEFENSIVE MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Defensive Exception Handling Architecture Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Pattern / Strategy</th>
                  <th className="py-3.5 px-4 font-bold">Python Code Template</th>
                  <th className="py-3.5 px-4 font-bold">Key Architectural Advantage</th>
                  <th className="py-3.5 px-4 font-bold">Avoided Anti-Pattern</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">Guard Clauses</td>
                  <td className="py-3 px-4 font-mono text-slate-200">if not valid: raise Error</td>
                  <td className="py-3 px-4">Flattens code, fails fast at entry point</td>
                  <td className="py-3 px-4 text-rose-300">Pyramid of Doom (Deep nesting)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">EAFP Access</td>
                  <td className="py-3 px-4 font-mono text-slate-200">try: data[k] except KeyError:</td>
                  <td className="py-3 px-4">Faster happy path, eliminates TOCTOU races</td>
                  <td className="py-3 px-4 text-rose-300">LBYL multi-lookup race conditions</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">Atomic Rollback</td>
                  <td className="py-3 px-4 font-mono text-slate-200">except Exception: state = orig; raise</td>
                  <td className="py-3 px-4">Guarantees data integrity on failure</td>
                  <td className="py-3 px-4 text-rose-300">Half-mutated corrupted records</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">Forensic Logging</td>
                  <td className="py-3 px-4 font-mono text-slate-200">logger.exception("Failed: ...")</td>
                  <td className="py-3 px-4">Automatic complete stack trace telemetry</td>
                  <td className="py-3 px-4 text-rose-300">Silent swallow (except: pass)</td>
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
            Explore 4 production-grade Python scripts demonstrating fail-fast guard clauses, exception logging best practices, defensive contracts, and resilient financial engines:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "fail_fast_design_patterns.py",
                code: failFastPatterns,
                description: "Fail-Fast architecture, guard clauses vs pyramid of doom, and boundary input validation.",
              },
              {
                filename: "exception_logging_and_auditing_best_practices.py",
                code: loggingBestPractices,
                description: "Silent swallow anti-pattern hazards, forensic logging with logger.exception(), and graceful degradation.",
              },
              {
                filename: "defensive_programming_contracts.py",
                code: defensiveContracts,
                description: "EAFP vs LBYL performance, TOCTOU race hazard elimination, and defensive class invariants.",
              },
              {
                filename: "enterprise_resilient_financial_engine.py",
                code: resilientEngine,
                description: "Enterprise Resilient Educational Ledger Engine with atomic rollbacks, domain exceptions, and logging.",
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
                <span>❌</span> Trap 1: Silent Swallow (`except: pass`)
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Catching errors and doing <code className="text-rose-300 font-mono">pass</code> creates silent failures, masking database corruption and data loss from operators.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Always log, re-raise, or enqueue to fallback buffers.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Giant 200-Line Try Blocks
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Wrapping entire functions in a single try block makes it impossible to know which line failed and accidentally catches unrelated bugs.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Keep try blocks tight, focused, and small.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Catching BaseException
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-purple-300 font-mono">except BaseException:</code> intercepts <code className="text-purple-300 font-mono">KeyboardInterrupt</code> (Ctrl+C), preventing users from terminating hanging tasks.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Catch <code className="text-emerald-300">Exception</code> instead.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Non-Atomic State Mutations
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Mutating state without taking a snapshot means that if step 2 of a calculation fails, the database is left in a corrupted half-updated state.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Always implement atomic rollback handlers on exception.
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
            Comprehensive capstone question-and-answer repository covering exception handling best practices, defensive coding, and EAFP vs LBYL:
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
            Download or print the complete capstone reference sheet with cardinal rules, defensive blueprints, and rollback recipes:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic12_exception_best_practices_notes.txt"
              title="Print Topic 12 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
