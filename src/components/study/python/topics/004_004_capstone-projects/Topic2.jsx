import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import loggingCode from "./topic2_files/logging_configuration_and_rotating_handlers.py?raw";
import exceptionCode from "./topic2_files/custom_exception_hierarchy_and_handling.py?raw";
import cliCode from "./topic2_files/modular_cli_interface_argparse_click.py?raw";
import institutionalCliCaseCode from "./topic2_files/institutional_cli_and_logging_case_study.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic2_files/topic2_note.txt?raw";

// FAQ Questions
import questions from "./topic2_files/topic2_questions";

/**
 * Topic2: Configuring logging, error handling, and modular CLI / GUI interfaces
 * Module: 004_004_capstone-projects
 * Segment: 4 (Python Pro Level & Ecosystem Mastery)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic2() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("loggingPipeline");

  // Interactive Laboratory State
  const [activeCliCommand, setActiveCliCommand] = useState("ENROLL"); // ENROLL | PAY | REPORT | AUDIT
  const [selectedLogLevel, setSelectedLogLevel] = useState("INFO"); // DEBUG | INFO | WARNING

  let cliTerminalOutput = "campus-cli enroll --sid STU_BP_01 --name Mamata --campus Barrackpore --fee 25000\n[SUCCESS] Enrolled Mamata at Barrackpore Campus (Tuition: Rs. 25,000.00)";
  let emittedLogRecord = `2026-08-25 11:46:00 [INFO    ] (institutional.admission) Student 'Mamata' enrolled at Barrackpore Campus.`;
  let posixExitCode = 0;

  if (activeCliCommand === "ENROLL") {
    cliTerminalOutput = "$ campus-cli enroll --sid STU_BP_01 --name Mamata --campus Barrackpore --fee 25000\n[SUCCESS] Enrolled Mamata (ID: STU_BP_01) at Barrackpore Campus.\n          Base Tuition: Rs. 25,000.00 | Status: ACTIVE";
    emittedLogRecord = `2026-08-25 11:46:00 [${selectedLogLevel.padEnd(8, " ")}] (institutional.admission) Student 'Mamata' enrolled at Barrackpore Campus.`;
    posixExitCode = 0;
  } else if (activeCliCommand === "PAY") {
    cliTerminalOutput = "$ campus-cli pay --sid STU_BP_01 --amount 15000 --memo 'Installment 1 - UPI'\n[SUCCESS] Payment of Rs. 15,000.00 recorded for STU_BP_01.\n          Remaining Balance: Rs. 10,000.00";
    emittedLogRecord = `2026-08-25 11:46:05 [${selectedLogLevel.padEnd(8, " ")}] (institutional.ledger) Payment recorded: STU_BP_01 | Rs. 15,000.00 | Remaining: Rs. 10,000.00`;
    posixExitCode = 0;
  } else if (activeCliCommand === "REPORT") {
    cliTerminalOutput = `$ campus-cli report\n+------------+------------+---------------+----------------+\n| Student ID | Name       | Campus        | Net Balance    |\n+------------+------------+---------------+----------------+\n| STU_BP_01  | Mamata     | Barrackpore   | Rs.  10,000.00 |\n| STU_CC_01  | Mahima     | Kolkata       | Rs.  12,500.00 |\n| STU_IC_01  | Abhronila  | Ichapur       | Rs.       0.00 |\n+------------+------------+---------------+----------------+`;
    emittedLogRecord = `2026-08-25 11:46:10 [${selectedLogLevel.padEnd(8, " ")}] (institutional.reporting) Multi-campus ledger summary report generated (3 records).`;
    posixExitCode = 0;
  } else if (activeCliCommand === "AUDIT") {
    cliTerminalOutput = "$ campus-cli pay --sid STU_BP_01 --amount 50000\n[ERROR] InsufficientFundsError: Payment Rs. 50,000 exceeds debt Rs. 10,000\n[EXIT] Process returned non-zero error code 1.";
    emittedLogRecord = `2026-08-25 11:46:15 [ERROR   ] (institutional.security) [INSUFFICIENT_FUNDS] Overpayment rejected for STU_BP_01: Amount Rs. 50,000 > Debt Rs. 10,000`;
    posixExitCode = 1;
  }

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
            Segment 4 • Module 004_004
          </span>
          <span className="text-xs sm:text-sm font-mono bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/80 shadow-sm shadow-cyan-950/50">
            Topic 2
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Capstone Projects, Portfolio &amp; Interview Mastery
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Configuring Logging &amp; <span className="text-teal-400">Modular CLI Interfaces</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master production observability and command-line interfaces in Python: configuring hierarchical loggers with <code className="text-teal-300 font-mono">RotatingFileHandler</code> to eliminate disk overflow, designing domain-specific custom exception hierarchies with status codes, building modular sub-command CLI tools with <code className="text-cyan-300 font-mono">argparse</code>, rendering rich ANSI terminal tables, and standardizing POSIX process exit codes.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📜 Rotating File Handlers (5MB Max)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ Domain Custom Exception Hierarchies
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            💻 Modular Subcommand Dispatchers
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🚦 POSIX Process Exit Codes (0 / 1)
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
              1. The Production Observability &amp; CLI Architecture
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Production applications replace amateur <code className="text-rose-400 font-mono">print()</code> debugging with structured rotating logs, defensive error hierarchies, and self-documenting CLI interfaces:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ Rotating Logs</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">RotatingFileHandler</code>
                <p className="text-[11px] text-slate-300">
                  Rotates log files automatically when reaching byte limits, keeping historical backups and preventing disk space crashes.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ Custom Exceptions</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">InstitutionalError</code>
                <p className="text-[11px] text-slate-300">
                  Domain exception classes with machine-readable error codes and structured JSON context payloads.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ Subcommand CLIs</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">add_subparsers()</code>
                <p className="text-[11px] text-slate-300">
                  Modular command dispatching (enroll, pay, report) with argument validation, choices, and automated help menus.
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 shadow-lg">
                <div className="text-amber-400 font-bold text-sm mb-1">4️⃣ POSIX Exit Codes</div>
                <code className="text-xs font-mono text-amber-300 block mb-1">sys.exit(0 / 1)</code>
                <p className="text-[11px] text-slate-300">
                  Standard process exit codes enabling CI/CD pipelines, Docker orchestrators, and Bash scripts to detect status.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                Why print() Statements Fail in Production
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                Using <code className="text-rose-400 font-mono">print()</code> sends unformatted text to standard output without timestamps, severity levels, or source module context. It cannot be redirected to rotating files or filtered dynamically in production without editing source code. Always use <span className="text-emerald-400 font-bold">logging.getLogger(__name__)</span>!
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
                2. Visualizing Logging Pipelines, Error Trees &amp; CLI Dispatchers
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("loggingPipeline")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "loggingPipeline"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              &gt;
                Logging Handler Pipeline
              </button>
              <button
                onClick={() => setActiveInteractiveTab("exceptionTree")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "exceptionTree"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              &gt;
                Domain Exception Hierarchy
              </button>
              <button
                onClick={() => setActiveInteractiveTab("cliDispatch")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "cliDispatch"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              &gt;
                CLI Subcommand Tree
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining multi-destination log dispatching, structured exception inheritance trees, and modular argument parsing:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "loggingPipeline" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">
                  MULTI-DESTINATION LOGGING PIPELINE &amp; ROTATING HANDLERS
                </text>

                {/* Left: Logger Source */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="220" height="235" rx="6" fill="#0c4a6e" stroke="#38bdf8" />
                  <text x="15" y="25" fill="#ffffff" fontSize="11" fontWeight="bold">Logger Source</text>
                  <text x="15" y="50" fill="#bae6fd" fontSize="9" fontFamily="monospace">logger.info()</text>
                  <text x="15" y="70" fill="#bae6fd" fontSize="9" fontFamily="monospace">logger.warning()</text>
                  <text x="15" y="90" fill="#bae6fd" fontSize="9" fontFamily="monospace">logger.error()</text>

                  <rect x="10" y="125" width="200" height="95" rx="4" fill="#082f49" />
                  <text x="15" y="145" fill="#38bdf8" fontSize="8" fontWeight="bold">LogRecord Metadata:</text>
                  <text x="15" y="162" fill="#e0f2fe" fontSize="8">• %(asctime)s</text>
                  <text x="15" y="177" fill="#e0f2fe" fontSize="8">• %(levelname)s</text>
                  <text x="15" y="192" fill="#e0f2fe" fontSize="8">• %(name)s (Module)</text>
                  <text x="15" y="207" fill="#e0f2fe" fontSize="8">• %(message)s</text>
                </g>

                {/* Arrow to Dispatcher */}
                <path d="M 260 160 L 290 160" stroke="#14b8a6" strokeWidth="3" markerEnd="url(#arrow)" />

                {/* Center: Formatter */}
                <g transform="translate(300, 50)">
                  <rect x="0" y="0" width="230" height="235" rx="6" fill="#042f2e" stroke="#2dd4bf" />
                  <text x="15" y="25" fill="#5eead4" fontSize="11" fontWeight="bold">Formatter &amp; Filter</text>
                  <text x="15" y="50" fill="#ccfbf1" fontSize="9" fontFamily="monospace">logging.Formatter(...)</text>
                  <text x="15" y="75" fill="#ccfbf1" fontSize="8">Threshold Level: INFO (20)</text>

                  <rect x="10" y="105" width="210" height="115" rx="4" fill="#022c22" />
                  <text x="15" y="125" fill="#86efac" fontSize="8" fontWeight="bold">Severity Hierarchy:</text>
                  <text x="15" y="145" fill="#a7f3d0" fontSize="8">DEBUG (10) ➔ Suppressed</text>
                  <text x="15" y="162" fill="#a7f3d0" fontSize="8">INFO (20) ➔ Allowed ✅</text>
                  <text x="15" y="179" fill="#a7f3d0" fontSize="8">WARNING (30) ➔ Allowed ✅</text>
                  <text x="15" y="196" fill="#fca5a5" fontSize="8">ERROR (40) ➔ Allowed ✅</text>
                  <text x="15" y="211" fill="#f87171" fontSize="8">CRITICAL (50) ➔ Allowed ✅</text>
                </g>

                {/* Right: Handlers */}
                <g transform="translate(570, 50)">
                  {/* Console Handler */}
                  <rect x="0" y="0" width="250" height="110" rx="6" fill="#1e1b4b" stroke="#818cf8" />
                  <text x="15" y="25" fill="#e0e7ff" fontSize="11" fontWeight="bold">StreamHandler (Console)</text>
                  <text x="15" y="50" fill="#c7d2fe" fontSize="8" fontFamily="monospace">stdout / stderr</text>
                  <text x="15" y="70" fill="#a5b4fc" fontSize="8">Live operational alerts formatted</text>
                  <text x="15" y="88" fill="#a5b4fc" fontSize="8">for terminal operators</text>

                  {/* Rotating File Handler */}
                  <rect x="0" y="125" width="250" height="110" rx="6" fill="#3b0764" stroke="#c084fc" />
                  <text x="15" y="150" fill="#f3e8ff" fontSize="11" fontWeight="bold">RotatingFileHandler (Disk)</text>
                  <text x="15" y="175" fill="#d8b4fe" fontSize="8" fontFamily="monospace">app.log (Max 5MB, 5 Backups)</text>
                  <text x="15" y="195" fill="#e9d5ff" fontSize="8">Persistent historical disk logs</text>
                  <text x="15" y="213" fill="#86efac" fontSize="8">Zero disk overflow risk ✅</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "exceptionTree" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">
                  DOMAIN EXCEPTION INHERITANCE TREE &amp; STRUCTURED ERROR CODES
                </text>

                {/* Exception Hierarchy */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#082f49" stroke="#0ea5e9" />

                  {/* Root: Exception */}
                  <rect x="330" y="20" width="160" height="40" rx="6" fill="#0369a1" stroke="#38bdf8" />
                  <text x="355" y="45" fill="#ffffff" fontSize="11" fontWeight="bold">builtins.Exception</text>

                  {/* Arrow down */}
                  <path d="M 410 60 L 410 85" stroke="#38bdf8" strokeWidth="2" />

                  {/* Domain Base: InstitutionalError */}
                  <rect x="290" y="85" width="240" height="50" rx="6" fill="#042f2e" stroke="#2dd4bf" />
                  <text x="320" y="110" fill="#5eead4" fontSize="11" fontWeight="bold">class InstitutionalError</text>
                  <text x="310" y="125" fill="#ccfbf1" fontSize="8" fontFamily="monospace">code: str, payload: dict</text>

                  {/* Branch lines */}
                  <path d="M 410 135 L 410 155" stroke="#38bdf8" strokeWidth="2" />
                  <path d="M 130 155 L 690 155" stroke="#38bdf8" strokeWidth="2" />
                  <path d="M 130 155 L 130 175" stroke="#38bdf8" strokeWidth="2" />
                  <path d="M 410 155 L 410 175" stroke="#38bdf8" strokeWidth="2" />
                  <path d="M 690 155 L 690 175" stroke="#38bdf8" strokeWidth="2" />

                  {/* Child 1 */}
                  <rect x="30" y="175" width="200" height="60" rx="6" fill="#4c0519" stroke="#f43f5e" />
                  <text x="40" y="195" fill="#fda4af" fontSize="9" fontWeight="bold">StudentNotFoundError</text>
                  <text x="40" y="212" fill="#fecdd3" fontSize="8" fontFamily="monospace">code: "STUDENT_NOT_FOUND"</text>
                  <text x="40" y="226" fill="#ffe4e6" fontSize="7">payload: &#123;"sid": "STU_1"&#125;</text>

                  {/* Child 2 */}
                  <rect x="310" y="175" width="200" height="60" rx="6" fill="#4c0519" stroke="#f43f5e" />
                  <text x="320" y="195" fill="#fda4af" fontSize="9" fontWeight="bold">DuplicateEnrollmentError</text>
                  <text x="320" y="212" fill="#fecdd3" fontSize="8" fontFamily="monospace">code: "DUPLICATE_ENROLL"</text>
                  <text x="320" y="226" fill="#ffe4e6" fontSize="7">payload: &#123;"sid": "STU_1"&#125;</text>

                  {/* Child 3 */}
                  <rect x="590" y="175" width="200" height="60" rx="6" fill="#4c0519" stroke="#f43f5e" />
                  <text x="600" y="195" fill="#fda4af" fontSize="9" fontWeight="bold">InsufficientFundsError</text>
                  <text x="600" y="212" fill="#fecdd3" fontSize="8" fontFamily="monospace">code: "INSUFFICIENT_FUNDS"</text>
                  <text x="600" y="226" fill="#ffe4e6" fontSize="7">payload: &#123;"amount": 50000&#125;</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">
                  MODULAR CLI SUBCOMMAND DISPATCH TREE (ARGPARSE)
                </text>

                {/* Subcommand Tree */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#1e1b4b" stroke="#a855f7" />

                  {/* Root: campus-cli */}
                  <rect x="310" y="20" width="200" height="40" rx="6" fill="#4f46e5" stroke="#818cf8" />
                  <text x="330" y="45" fill="#ffffff" fontSize="11" fontWeight="bold">prog: campus-cli [-v]</text>

                  {/* Branch lines */}
                  <path d="M 410 60 L 410 85" stroke="#a855f7" strokeWidth="2" />
                  <path d="M 130 85 L 690 85" stroke="#a855f7" strokeWidth="2" />
                  <path d="M 130 85 L 130 105" stroke="#a855f7" strokeWidth="2" />
                  <path d="M 410 85 L 410 105" stroke="#a855f7" strokeWidth="2" />
                  <path d="M 690 85 L 690 105" stroke="#a855f7" strokeWidth="2" />

                  {/* Subcommand 1: enroll */}
                  <rect x="25" y="105" width="210" height="120" rx="6" fill="#042f2e" stroke="#2dd4bf" />
                  <text x="35" y="130" fill="#5eead4" fontSize="11" fontWeight="bold">subparser: enroll</text>
                  <text x="35" y="150" fill="#ccfbf1" fontSize="8" fontFamily="monospace">--sid STU_BP_01 (Req)</text>
                  <text x="35" y="167" fill="#ccfbf1" fontSize="8" fontFamily="monospace">--name "Mamata" (Req)</text>
                  <text x="35" y="184" fill="#ccfbf1" fontSize="8" fontFamily="monospace">--campus [BP/CC/IC]</text>
                  <text x="35" y="201" fill="#ccfbf1" fontSize="8" fontFamily="monospace">--fee 25000 (Float)</text>

                  {/* Subcommand 2: pay */}
                  <rect x="305" y="105" width="210" height="120" rx="6" fill="#0c4a6e" stroke="#38bdf8" />
                  <text x="315" y="130" fill="#e0f2fe" fontSize="11" fontWeight="bold">subparser: pay</text>
                  <text x="315" y="150" fill="#bae6fd" fontSize="8" fontFamily="monospace">--sid STU_BP_01 (Req)</text>
                  <text x="315" y="167" fill="#bae6fd" fontSize="8" fontFamily="monospace">--amount 15000 (Req)</text>
                  <text x="315" y="184" fill="#bae6fd" fontSize="8" fontFamily="monospace">--memo "UPI Payment"</text>
                  <text x="315" y="210" fill="#86efac" fontSize="8" fontWeight="bold">Exit Code: 0 (Success)</text>

                  {/* Subcommand 3: report */}
                  <rect x="585" y="105" width="210" height="120" rx="6" fill="#3b0764" stroke="#c084fc" />
                  <text x="595" y="130" fill="#f3e8ff" fontSize="11" fontWeight="bold">subparser: report</text>
                  <text x="595" y="150" fill="#d8b4fe" fontSize="8" fontFamily="monospace">--campus (Optional)</text>
                  <text x="595" y="170" fill="#e9d5ff" fontSize="8">Renders ASCII table of</text>
                  <text x="595" y="187" fill="#e9d5ff" fontSize="8">multi-campus balances</text>
                  <text x="595" y="210" fill="#86efac" fontSize="8" fontWeight="bold">Table Formatter</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE CLI & LOGGING INSPECTOR */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧪</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive CLI Terminal &amp; Logging Inspector
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Execute sub-commands in the simulated administrative CLI terminal, adjust active log levels, and observe structured logging output and POSIX exit codes:
          </p>

          <div className="bg-slate-950 p-5 sm:p-6 rounded-xl border border-slate-800/90 space-y-6">
            {/* Command & Level Selector Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Command Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Select CLI Subcommand:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "ENROLL", label: "campus-cli enroll", desc: "Enroll Mamata" },
                    { id: "PAY", label: "campus-cli pay", desc: "Pay Rs. 15,000" },
                    { id: "REPORT", label: "campus-cli report", desc: "Balance Report" },
                    { id: "AUDIT", label: "campus-cli pay (Error)", desc: "Trigger 50k Error" },
                  ].map((cmd) => (
                    <button
                      key={cmd.id}
                      onClick={() => setActiveCliCommand(cmd.id)}
                      className={clsx(
                        "p-2.5 rounded-xl border text-left transition-all",
                        activeCliCommand === cmd.id
                          ? cmd.id === "AUDIT"
                            ? "bg-rose-950/60 border-rose-500 shadow-md shadow-rose-950/50"
                            : "bg-teal-950/60 border-teal-500 shadow-md shadow-teal-950/50"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                      )}
                    &gt;
                      <div className="text-xs font-bold text-slate-200">{cmd.label}</div>
                      <div className="text-[10px] text-cyan-400 font-mono">{cmd.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Log Level Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Active Log Severity Threshold:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["DEBUG", "INFO", "WARNING"].map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setSelectedLogLevel(lvl)}
                      className={clsx(
                        "p-2.5 rounded-xl border text-center font-mono font-bold transition-all",
                        selectedLogLevel === lvl
                          ? "bg-purple-950/60 border-purple-500 text-purple-300 shadow-md"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                      )}
                    &gt;
                      {lvl}
                    </button>
                  ))}
                </div>
                <div className="text-[11px] text-slate-400 mt-2">
                  Setting {selectedLogLevel} controls console stream filter threshold
                </div>
              </div>
            </div>

            {/* Terminal Screen */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                <span>Simulated Terminal Output:</span>
                <span className={clsx(
                  "font-mono px-2 py-0.5 rounded text-[11px] font-bold",
                  posixExitCode === 0 ? "bg-emerald-950 text-emerald-300 border border-emerald-800" : "bg-rose-950 text-rose-300 border border-rose-800"
                )}>
                  Exit Code: {posixExitCode} {posixExitCode === 0 ? "(SUCCESS)" : "(ERROR)"}
                </span>
              </div>
              <pre className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl text-xs sm:text-sm font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                {cliTerminalOutput}
              </pre>
            </div>

            {/* Rotating Log File Record */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Emitted Rotating Log Record (app.log):
              </div>
              <pre className="p-3 bg-slate-900/90 border border-purple-900/50 rounded-xl text-xs sm:text-sm font-mono text-purple-300 overflow-x-auto">
                {emittedLogRecord}
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
              4. Production Code Labs &amp; CLI Engines
            </h2>
          </div>

          <p className="text-slate-300 mb-8 text-base leading-relaxed">
            Inspect, run, and master all four production-grade observability and CLI labs covering rotating log handlers, custom exception hierarchies, modular <code className="text-teal-300 font-mono">argparse</code> subcommands, and the complete institutional management case study:
          </p>

          <div className="space-y-10">
            {/* Python Loader 1 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-teal-300">
                  Lab 1: Enterprise Logging &amp; Rotating File Handlers
                </h3>
                <p className="text-sm text-slate-400">
                  Configuring console stream handlers alongside rotating disk log files (1MB max, 3 backups) with structured timestamp formatting.
                </p>
              </div>
              <PythonFileLoader
                fileModule={loggingCode}
                title="logging_configuration_and_rotating_handlers.py"
                highlightLines={[18, 32, 42, 58]}
              />
            </div>

            {/* Python Loader 2 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-cyan-300">
                  Lab 2: Domain Custom Exception Hierarchy &amp; JSON Payloads
                </h3>
                <p className="text-sm text-slate-400">
                  Designing structured domain errors (<code className="text-cyan-300 font-mono">StudentNotFoundError</code>, <code className="text-cyan-300 font-mono">InsufficientFundsError</code>) with machine-readable error codes.
                </p>
              </div>
              <PythonFileLoader
                fileModule={exceptionCode}
                title="custom_exception_hierarchy_and_handling.py"
                highlightLines={[16, 30, 48, 64]}
              />
            </div>

            {/* Python Loader 3 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-purple-300">
                  Lab 3: Modular CLI Interface with Subcommands &amp; Tables
                </h3>
                <p className="text-sm text-slate-400">
                  Building modular command-line subcommands (<code className="text-purple-300 font-mono">enroll</code>, <code className="text-purple-300 font-mono">pay</code>, <code className="text-purple-300 font-mono">report</code>) with <code className="text-purple-300 font-mono">argparse</code> and POSIX exit codes.
                </p>
              </div>
              <PythonFileLoader
                fileModule={cliCode}
                title="modular_cli_interface_argparse_click.py"
                highlightLines={[16, 26, 40, 52]}
              />
            </div>

            {/* Python Loader 4 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-amber-300">
                  Lab 4: Complete Institutional Management Administrative CLI Case Study
                </h3>
                <p className="text-sm text-slate-400">
                  Complete administrative CLI controller coordinating domain exceptions, audit trails, and multi-campus operations for Mamata and Mahima across Barrackpore and Kolkata.
                </p>
              </div>
              <PythonFileLoader
                fileModule={institutionalCliCaseCode}
                title="institutional_cli_and_logging_case_study.py"
                highlightLines={[14, 30, 48, 64]}
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
              5. Logging &amp; CLI Pitfalls &amp; Anti-Patterns
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pitfall 1 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                1. Silent Exception Swallowing
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Using bare <code className="text-rose-400 font-mono">except: pass</code> blocks hides critical crashes, memory errors, and syntax defects from logs completely.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # ANTI-PATTERN: try: enroll() except: pass{'\n'}
                # BEST PRACTICE: except Exception: logger.exception("Failed")
              </pre>
            </div>

            {/* Pitfall 2 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                2. Logging Without File Rotation
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Using a plain <code className="text-rose-400 font-mono">FileHandler</code> without rotation creates unbounded 50GB log files that eventually exhaust server disk space.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # RISKY: FileHandler("app.log") (Unbounded!){'\n'}
                # SAFE: RotatingFileHandler("app.log", maxBytes=5_000_000)
              </pre>
            </div>

            {/* Pitfall 3 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                3. Logging Plain-Text Sensitive Secrets
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Printing raw passwords, payment card numbers, or API keys directly into logs creates critical security and compliance breaches.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # VULNERABLE: logger.info(f"Card: &#123;card_number&#125;")
                {'\n'}# SECURE: logger.info("Card: ****-****-****-%s", card[-4:])
              </pre>
            </div>

            {/* Pitfall 4 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                4. Always Exiting with Code 0 on Error
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Printing an error message to stdout and exiting without <code className="text-rose-400 font-mono">sys.exit(1)</code> fools CI/CD pipelines into thinking the job passed!
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # BUG: print("Error!") (Returns 0 to Bash!){'\n'}
                # FIX: sys.exit(1) on unrecoverable errors
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
              6. Professional Observability &amp; CLI Checklist
            </h2>
          </div>

          <div className="space-y-3 text-slate-300 text-sm sm:text-base">
            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Use Rotating File Handlers:</strong> Always configure <code className="text-teal-300 font-mono">RotatingFileHandler</code> with <code className="text-teal-300 font-mono">maxBytes</code> and <code className="text-teal-300 font-mono">backupCount</code>.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Structure Domain Exceptions:</strong> Inherit from a root base domain exception with distinct error codes and context payloads.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Modular Subcommands:</strong> Use <code className="text-teal-300 font-mono">argparse.add_subparsers()</code> for clean, separated CLI commands.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Return Standard Exit Codes:</strong> Explicitly call <code className="text-teal-300 font-mono">sys.exit(0)</code> on success and <code className="text-teal-300 font-mono">sys.exit(1)</code> on failure.
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQS */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <FAQTemplate
            title="Logging, Error Handling &amp; CLI FAQs"
            questions={questions}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: PLAIN TEXT PRINT & DOWNLOAD NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <PlainTextPrint
            content={noteText}
            title="Topic 2: Logging, Error Handling &amp; Modular CLI Interfaces Study Note"
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
              "A software system is only as reliable as its observability and error transparency. When administrators operate our institutional management system across Barrackpore, Kolkata, Ichapur, and Jadavpur, rotating log files capture every admission and financial transaction with full audit trails, while custom domain exceptions and modular CLI subcommands give Mamata, Mahima, and Susmita clear, graceful feedback instead of crashing terminal screens."
            }
          />
        </section>

      </div>
    </div>
  );
}
