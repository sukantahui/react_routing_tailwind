import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

/**
 * Topic0 – Exception Handling Architecture in MySQL Stored Routines
 * Module: 003_004_error-handling-and-cursors
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on exception handling architecture, handler declaration rules, CONTINUE vs EXIT actions, diagnostics stack inspection (GET DIAGNOSTICS), and atomic transaction rollback.
 */
const Topic0 = () => {
  // Interactive Simulator State
  const [selectedExceptionScenario, setSelectedExceptionScenario] = useState("graceful_exit_rollback");

  const exceptionScenarios = {
    graceful_exit_rollback: {
      title: "1. Graceful Exit Handler: Atomic Rollback & Error Interception",
      badge: "EXIT Handler (Rollback)",
      badgeColor: "emerald",
      sqlQuery: `-- Defensive Procedure: Catches Duplicate Key Error 1062 & Rolls Back:
DELIMITER //

CREATE PROCEDURE sp_register_student_safe(
    IN p_student_id INT,
    IN p_email VARCHAR(100),
    IN p_fee DECIMAL(10,2),
    OUT p_status_code VARCHAR(20)
)
BEGIN
    -- 1. Declaration Order: Variables → Handlers
    DECLARE v_error_occurred BOOLEAN DEFAULT FALSE;
    
    -- 2. Declare EXIT Handler for any SQLEXCEPTION:
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Intercept error, rollback partial changes, and return error code:
        ROLLBACK;
        SET p_status_code = 'ERR_DUPLICATE_OR_FAIL';
        
        -- Log diagnostic details to audit table:
        INSERT INTO procedure_error_log (procedure_name, error_timestamp, notes)
        VALUES ('sp_register_student_safe', NOW(), 'Caught SQLEXCEPTION; transaction rolled back.');
    END;

    -- 3. Atomic Multi-Statement Transaction:
    START TRANSACTION;
    
    -- Insert student record (fails if email is duplicated):
    INSERT INTO students (student_id, email) VALUES (p_student_id, p_email);
    
    -- Insert financial fee ledger:
    INSERT INTO student_ledger (student_id, fee_amount) VALUES (p_student_id, p_fee);
    
    COMMIT;
    SET p_status_code = 'SUCCESS_200';
END //

DELIMITER ;

-- Test Duplicate Email Insertion:
CALL sp_register_student_safe(105, 'mamata.hui@bkp.edu', 25000.00, @status);
SELECT @status;`,
      resultRows: [
        { id: "STU-105 Duplicate", executionType: "With EXIT HANDLER", errorTrap: "Catches Error 1062", rollbackAction: "ROLLBACK executed ✅", outputCode: "@status = 'ERR_DUPLICATE_OR_FAIL'", status: "Safely Handled" },
      ],
      explanation:
        "When duplicate email insertion triggers Error 1062, the `EXIT HANDLER FOR SQLEXCEPTION` intercepts the error immediately, executes `ROLLBACK`, logs the incident, and sets a clean status code.",
    },
    unhandled_crash_comparison: {
      title: "2. The Danger of Unhandled Procedures: Partial Writes & Lock Orphanage",
      badge: "Unhandled Crash",
      badgeColor: "rose",
      sqlQuery: `-- ❌ BROKEN ARCHITECTURE: No Handlers Declared:
DELIMITER //

CREATE PROCEDURE sp_register_student_unhandled(
    IN p_student_id INT,
    IN p_email VARCHAR(100),
    IN p_fee DECIMAL(10,2)
)
BEGIN
    START TRANSACTION;
    
    -- Step 1: Successfully inserts student:
    INSERT INTO students (student_id, email) VALUES (p_student_id, p_email);
    
    -- Step 2: Fails due to foreign key violation or division by zero:
    INSERT INTO student_ledger (student_id, fee_amount) VALUES (99999, p_fee); -- 💥 FAILS!
    
    -- Step 3: Never reached! Transaction remains open and uncommitted!
    COMMIT;
END //

DELIMITER ;

-- 🚨 EXECUTION CRASHES MIDWAY:
-- ERROR 1452 (23000): Cannot add or update a child row: foreign key constraint fails!
-- 💥 Result: Lock contention and uncommitted transaction state!`,
      resultRows: [
        { id: "STU-99999 Crash", executionType: "No Handlers", errorTrap: "Unhandled 1452", rollbackAction: "No Rollback ❌ (Transaction Leaked)", outputCode: "Uncaught Exception", status: "💥 System Outage" },
      ],
      explanation:
        "Without handlers, a failure at Step 2 halts execution immediately. Step 1 remains in an uncommitted transaction state, holding table locks and creating database contention.",
    },
    diagnostics_stack_capture: {
      title: "3. Capturing Telemetry: Inspecting the Diagnostics Stack",
      badge: "GET DIAGNOSTICS",
      badgeColor: "cyan",
      sqlQuery: `-- Capturing detailed SQLSTATE, Error Number, and Message Text:
DELIMITER //

CREATE PROCEDURE sp_inspect_diagnostics_demo()
BEGIN
    DECLARE v_sqlstate VARCHAR(5);
    DECLARE v_errno INT;
    DECLARE v_message VARCHAR(255);

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Extract metadata from the MySQL Diagnostics Area:
        GET DIAGNOSTICS CONDITION 1
            v_sqlstate = RETURNED_SQLSTATE,
            v_errno    = MYSQL_ERRNO,
            v_message  = MESSAGE_TEXT;
            
        -- Store in structured error telemetry table:
        INSERT INTO system_error_telemetry (
            sqlstate_code,
            mysql_error_no,
            error_message,
            captured_at
        )
        VALUES (v_sqlstate, v_errno, v_message, NOW());
    END;

    -- Trigger intentional error (table does not exist):
    SELECT * FROM non_existent_table_2026;
END //

DELIMITER ;`,
      resultRows: [
        { id: "Diagnostics Inspection", executionType: "GET DIAGNOSTICS", errorTrap: "Error 1146 (Table doesn't exist)", rollbackAction: "SQLSTATE: '42S02'", outputCode: "Logged to system_error_telemetry", status: "Telemetry Recorded" },
      ],
      explanation:
        "`GET DIAGNOSTICS CONDITION 1` extracts the exact `RETURNED_SQLSTATE` ('42S02'), `MYSQL_ERRNO` (1146), and `MESSAGE_TEXT` for automated production error telemetry.",
    },
    continue_handler_batch_flag: {
      title: "4. CONTINUE Handler: Batch Processing with Error Flags",
      badge: "CONTINUE Handler",
      badgeColor: "amber",
      sqlQuery: `-- Setting flag and continuing row iteration during bulk batch load:
DELIMITER //

CREATE PROCEDURE sp_batch_process_with_continue_flag()
BEGIN
    DECLARE v_has_error BOOLEAN DEFAULT FALSE;
    
    -- CONTINUE Handler: Catches error, sets flag, but allows execution to continue:
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
    BEGIN
        SET v_has_error = TRUE;
    END;

    -- Statement 1: Might fail
    UPDATE student_ledgers SET balance = balance - 100 WHERE dept_id = 1;
    
    -- Statement 2: Executes regardless of Statement 1 failure
    UPDATE audit_heartbeat SET last_ping = NOW();
    
    -- Statement 3: Check error state
    IF v_has_error THEN
        INSERT INTO batch_alerts (msg) VALUES ('Batch completed with non-fatal warnings');
    END IF;
END //

DELIMITER ;`,
      resultRows: [
        { id: "Batch Statement 1", executionType: "CONTINUE HANDLER", errorTrap: "Catches warning/error", rollbackAction: "SET v_has_error = TRUE", outputCode: "Executes Statement 2 cleanly", status: "Non-Blocking Recovery" },
      ],
      explanation:
        "`CONTINUE` handlers do not abort the procedure. They execute the recovery statement and immediately proceed to the next SQL statement in the block.",
    },
  };

  const navItems = [
    { id: "exception-concept", label: "1. Exception Architecture" },
    { id: "declaration-rules", label: "2. Declaration Order & Scope" },
    { id: "svg-diagrams", label: "3. Pipeline & Action SVGs" },
    { id: "interactive-sandbox", label: "4. Live Exception Workbench" },
    { id: "case-studies", label: "5. Production Case Studies" },
    { id: "pitfalls-rules", label: "6. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "7. Student Checklist" },
    { id: "faq-section", label: "8. FAQs (30 Questions)" },
    { id: "teacher-notes", label: "9. Teacher's Note & Raw Script" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-900 pb-20">
      {/* Header Banner */}
      <header className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-2">
            <span>Module 003_004</span>
            <span>•</span>
            <span>Topic 0 of 12</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Defensive Programming
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Exception Handling Architecture in Stored Routines
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Build resilient, fault-tolerant stored procedures and triggers. Master the MySQL exception processing pipeline, <code className="text-cyan-300 font-mono">DECLARE HANDLER</code> syntax, <code className="text-cyan-300 font-mono">CONTINUE</code> vs <code className="text-cyan-300 font-mono">EXIT</code> actions, <code className="text-cyan-300 font-mono">GET DIAGNOSTICS</code> telemetry, and automatic transaction rollback.
          </p>
        </div>
      </header>

      {/* Navigation Quick Links */}
      <nav className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2 overflow-x-auto text-xs sm:text-sm font-medium scrollbar-thin scrollbar-thumb-slate-700">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-cyan-600/30 hover:text-cyan-300 text-slate-300 transition-all duration-300 border border-slate-700/50 hover:border-cyan-500/40"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        {/* SECTION 1: Architecture Overview */}
        <section id="exception-concept" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Why Exception Handling Matters in Relational Engines
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Preventing uncommitted partial writes, orphaned locks, and database corruption.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
                <span>💥</span> The Risk of Unhandled Procedures
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                When a procedure without handlers encounters a runtime error (e.g. duplicate email, missing foreign key), MySQL halts immediately. Open transactions remain uncommitted, holding locks and leaving data half-written.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                <span>🛡️</span> The Defensive Exception Architecture
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Declaring an <code className="text-emerald-300 font-mono">EXIT HANDLER FOR SQLEXCEPTION</code> guarantees that errors are caught, <code className="text-emerald-300 font-mono">ROLLBACK</code> is executed atomically, error diagnostics are recorded, and clean status codes are returned to the client.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Declaration Rules & Scope */}
        <section id="declaration-rules" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Strict Declaration Ordering &amp; Grammar Rules
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The required syntax placement inside MySQL `BEGIN ... END` blocks.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
              <span>Mandatory Declaration Sequence</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center text-xs font-mono">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-cyan-300 font-bold">1. Variables (DECLARE v INT)</div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-indigo-300 font-bold">2. Conditions (DECLARE cond)</div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-amber-300 font-bold">3. Cursors (DECLARE cur)</div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-emerald-300 font-bold">4. Handlers (DECLARE HANDLER)</div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-white font-bold">5. SQL Statements (SET/IF/DML)</div>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Exception Pipeline &amp; Action Modes
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing exception stack propagation with CONTINUE and EXIT handler mechanics.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Pipeline */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> MySQL Stored Routine Exception Processing Pipeline
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1: Statement Fails */}
                  <g>
                    <rect x="20" y="30" width="180" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="110" y="55" fill="#fca5a5" fontSize="9" fontWeight="bold" textAnchor="middle">1. Statement Error</text>
                    <rect x="30" y="70" width="160" height="40" rx="4" fill="#1e293b" />
                    <text x="110" y="88" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">INSERT / UPDATE Fails</text>
                    <text x="110" y="102" fill="#fca5a5" fontSize="7 font-mono" textAnchor="middle">e.g. Duplicate Key 1062</text>
                  </g>

                  {/* Step 2: Diagnostics Stack */}
                  <g>
                    <rect x="230" y="30" width="180" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="320" y="55" fill="#c7d2fe" fontSize="9" fontWeight="bold" textAnchor="middle">2. Diagnostics Stack</text>
                    <rect x="240" y="70" width="160" height="40" rx="4" fill="#0f172a" />
                    <text x="320" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">SQLSTATE: '23000'</text>
                    <text x="320" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">MYSQL_ERRNO: 1062</text>
                  </g>

                  {/* Step 3: Handler Match */}
                  <g>
                    <rect x="440" y="30" width="190" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="535" y="55" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">3. Handler Interception</text>
                    <rect x="450" y="70" width="170" height="40" rx="4" fill="#022c22" />
                    <text x="535" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">EXIT HANDLER Matched</text>
                    <text x="535" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Traps SQLEXCEPTION</text>
                  </g>

                  {/* Step 4: Recovery / Rollback */}
                  <g>
                    <rect x="650" y="30" width="180" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="740" y="55" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">4. Atomic Recovery</text>
                    <rect x="660" y="70" width="160" height="40" rx="4" fill="#022c22" />
                    <text x="740" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">ROLLBACK; Error Logged</text>
                    <text x="740" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Clean Status Returned</text>
                  </g>

                  {/* Arrows */}
                  <path d="M 200 80 L 230 80" stroke="#ef4444" strokeWidth="1.5" />
                  <path d="M 410 80 L 440 80" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 630 80 L 650 80" stroke="#10b981" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* SVG 2: CONTINUE vs EXIT */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-amber-400 font-mono">Diagram B:</span> Handler Action Modes (CONTINUE vs EXIT)
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* CONTINUE */}
                  <g>
                    <rect x="30" y="30" width="370" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="215" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">CONTINUE HANDLER (Resume Next)</text>
                    <rect x="45" y="70" width="340" height="40" rx="4" fill="#0f172a" />
                    <text x="215" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Executes recovery statement → Proceeds to Statement N+1</text>
                    <text x="215" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Ideal for cursor loops &amp; non-fatal warnings</text>
                  </g>

                  {/* EXIT */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="630" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">EXIT HANDLER (Halt Block)</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#022c22" />
                    <text x="630" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Executes recovery statement → Halts Current BEGIN...END</text>
                    <text x="630" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Ideal for transactional rollback &amp; error return</text>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Exception Handling Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test graceful EXIT handler rollbacks, unhandled crash hazards, GET DIAGNOSTICS telemetry, and non-blocking CONTINUE flags live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(exceptionScenarios).map(([key, item]) => {
              const isActive = selectedExceptionScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedExceptionScenario(key)}
                  className={clsx(
                    "p-4 rounded-xl text-left transition-all duration-300 border flex flex-col justify-between cursor-pointer",
                    isActive
                      ? "bg-indigo-950/60 border-cyan-500 shadow-lg shadow-cyan-950/40 scale-[1.02]"
                      : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850"
                  )}
                >
                  <div>
                    <span
                      className={clsx(
                        "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
                        item.badgeColor === "emerald" && "bg-emerald-950 text-emerald-400 border border-emerald-800",
                        item.badgeColor === "rose" && "bg-rose-950 text-rose-400 border border-rose-800",
                        item.badgeColor === "cyan" && "bg-cyan-950 text-cyan-400 border border-cyan-800",
                        item.badgeColor === "amber" && "bg-amber-950 text-amber-400 border border-amber-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Architecture" : "○ Run Exception Test"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{exceptionScenarios[selectedExceptionScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{exceptionScenarios[selectedExceptionScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Exception Runtime Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Exception Handling Script</span>
                <span className="text-emerald-400">DECLARE HANDLER Interception</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {exceptionScenarios[selectedExceptionScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Scenario / Test ID</th>
                    <th className="py-3 px-4 text-white">Execution Type</th>
                    <th className="py-3 px-4 text-emerald-400">Error Trapped</th>
                    <th className="py-3 px-4 text-cyan-400">Rollback / Recovery Action</th>
                    <th className="py-3 px-4 text-indigo-400">Output Result / Status Code</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {exceptionScenarios[selectedExceptionScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-mono text-white">{row.executionType}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.errorTrap}</td>
                      <td className="py-3 px-4 text-slate-300 font-mono">{row.rollbackAction}</td>
                      <td className="py-3 px-4 text-indigo-300 font-sans">{row.outputCode}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[11px] font-sans font-medium border bg-emerald-950 text-emerald-400 border-emerald-800">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 5: Production Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Production Industry Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Real-world transaction recovery and error telemetry logging.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case Study 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="p-1.5 rounded bg-emerald-950 text-emerald-400 font-mono text-xs border border-emerald-800">
                    CASE 01
                  </span>
                  Eliminating Orphaned Tuition Transactions with EXIT HANDLERS in Barrackpore
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Academy Accounts</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui resolved a critical accounting defect: When a duplicate student payment was submitted, the procedure crashed mid-flight, leaving the tuition payment inserted while failing the receipt generation. Adding an <code className="text-emerald-300 font-mono">EXIT HANDLER FOR SQLEXCEPTION</code> with <code className="text-emerald-300 font-mono">ROLLBACK;</code> completely restored ACID atomicity!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Atomic Exception Recovery Handler:
DECLARE EXIT HANDLER FOR SQLEXCEPTION
BEGIN
    ROLLBACK;
    SET p_status_code = 'ERR_TX_ROLLED_BACK';
    INSERT INTO billing_error_logs (student_id, error_time) VALUES (p_student_id, NOW());
END;`}
              </pre>
            </div>
          </div>
        </section>

        {/* SECTION 6: Senior Pitfalls & Best Practices */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Senior Pitfalls & Best Practices
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Avoid declaration order violations and silent error swallows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Silent Error Suppression
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Writing <code className="text-rose-300 font-mono">DECLARE CONTINUE HANDLER FOR SQLEXCEPTION BEGIN END;</code> swallows errors silently without logging or notifying the caller, making bug diagnosis impossible.
              </p>
              <div className="text-xs text-slate-400">
                Fix: Always set a flag variable or log to an error telemetry table!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Always Enforce Declaration Order
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Declare Variables first, then Named Conditions, then Cursors, and finally Handlers before any executable procedural statements.
              </p>
              <div className="text-xs text-slate-400">
                Prevents syntax compilation errors in MySQL.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: Student Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              7. Mini Checklist & Senior Developer Hints
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key takeaways for Exception Handling Architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Exception Handling Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Use <code className="text-cyan-300 font-mono">EXIT HANDLER</code> for transactional rollback on fatal errors.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Use <code className="text-cyan-300 font-mono">CONTINUE HANDLER</code> for cursor iterations and flag setting.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Extract error metadata with <code className="text-cyan-300 font-mono">GET DIAGNOSTICS</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Follow the strict order: Variables → Conditions → Cursors → Handlers.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe specific vs generic handlers...”</span>
                  MySQL resolves handlers by specificity! If you declare a handler for `1062` and another for `SQLEXCEPTION`, Error 1062 triggers the specific handler first!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about nested block scopes...”</span>
                  An `EXIT HANDLER` in an inner `BEGIN...END` block halts only that inner block, allowing the outer procedure to resume gracefully!
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: FAQ Template */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              8. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comprehensive reference questions covering exception handling architecture, handler declaration rules, CONTINUE vs EXIT actions, diagnostics stack inspection (GET DIAGNOSTICS), and atomic transaction rollback.
            </p>
          </div>

          <FAQTemplate
            title="Exception Handling Architecture FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 9: PlainTextPrint & Teacher's Note */}
        <section id="teacher-notes" className="space-y-8">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              9. Printable Topic Note &amp; Teacher's Observation
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Download clean text documentation for revision and study Sukanta Hui's direct pedagogical insights.
            </p>
          </div>

          <PlainTextPrint
            content={noteText}
            title="Exception Handling Architecture in MySQL Stored Routines"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic0_note.txt"
          />

          <Teacher
            note="Exception handling is what separates brittle toy scripts from enterprise-grade database applications. Never let a stored procedure execute multi-statement DML without an explicit EXIT HANDLER FOR SQLEXCEPTION to perform a ROLLBACK on error. Follow the strict declaration order (Variables → Conditions → Cursors → Handlers) and inspect the Diagnostics Area to log meaningful telemetry!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic0;
