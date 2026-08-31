import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

/**
 * Topic6 – Propagating and Modifying Exceptions using RESIGNAL Statement
 * Module: 003_004_error-handling-and-cursors
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on the RESIGNAL statement, the Log-and-Rethrow design pattern, bare pass-through vs modifying vs transforming modes, security sanitization, and multi-tier exception propagation.
 */
const Topic6 = () => {
  // Interactive Simulator State
  const [selectedResignalScenario, setSelectedResignalScenario] = useState("bare_resignal_log_and_rethrow");

  const resignalScenarios = {
    bare_resignal_log_and_rethrow: {
      title: "1. Bare RESIGNAL: Transparent Log-and-Rethrow Architecture",
      badge: "Bare RESIGNAL",
      badgeColor: "emerald",
      sqlQuery: `-- The Authoritative Enterprise Log-and-Rethrow Pattern:
DELIMITER //

CREATE PROCEDURE sp_transfer_with_rethrow(
    IN p_from_id INT,
    IN p_to_id INT,
    IN p_amount DECIMAL(10,2)
)
BEGIN
    DECLARE v_state VARCHAR(5);
    DECLARE v_err INT;
    DECLARE v_msg VARCHAR(255);

    -- EXIT Handler: Catches error, logs telemetry, then re-throws:
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- 1. Extract diagnostic metadata:
        GET DIAGNOSTICS CONDITION 1
            v_state = RETURNED_SQLSTATE,
            v_err   = MYSQL_ERRNO,
            v_msg   = MESSAGE_TEXT;

        -- 2. Clean up failed business transaction:
        ROLLBACK;

        -- 3. Persist error to database audit table:
        INSERT INTO procedure_error_audit_log (
            procedure_name, sqlstate_code, mysql_errno, error_message, logged_at
        ) VALUES (
            'sp_transfer_with_rethrow', v_state, v_err, v_msg, NOW()
        );

        -- 4. Re-throw the original error completely untouched:
        RESIGNAL;
    END;

    START TRANSACTION;
    UPDATE student_ledgers SET balance = balance - p_amount WHERE student_id = p_from_id;
    UPDATE student_ledgers SET balance = balance + p_amount WHERE student_id = p_to_id;
    COMMIT;
END //

DELIMITER ;`,
      resultRows: [
        { id: "Transfer Failure", handlerAction: "EXIT Handler", loggingAction: "Logged to audit table ✅", rollbackAction: "ROLLBACK executed ✅", resignalMode: "Bare RESIGNAL;", clientResult: "Original Error Propagated to Client", status: "Full Observability" },
      ],
      explanation:
        "Bare `RESIGNAL;` re-throws the exact caught exception with all original attributes preserved, allowing the database to log the error internally while still notifying the client driver.",
    },
    modifying_resignal_context_prefix: {
      title: "2. Modifying RESIGNAL: Prepending Routine Context to Error Messages",
      badge: "Modifying RESIGNAL",
      badgeColor: "cyan",
      sqlQuery: `-- Prepending Context Information to Existing Exception:
DELIMITER //

CREATE PROCEDURE sp_process_student_ledger_with_context(
    IN p_student_id INT,
    IN p_amount DECIMAL(10,2)
)
BEGIN
    DECLARE v_original_msg VARCHAR(255);

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- 1. Extract original error message:
        GET DIAGNOSTICS CONDITION 1 v_original_msg = MESSAGE_TEXT;
        ROLLBACK;

        -- 2. Re-throw with prepended routine metadata:
        RESIGNAL SET MESSAGE_TEXT = CONCAT('[sp_process_student_ledger] (Student ', p_student_id, ') FAILED: ', v_original_msg);
    END;

    START TRANSACTION;
    UPDATE student_ledgers SET balance = balance - p_amount WHERE student_id = p_student_id;
    COMMIT;
END //

DELIMITER ;`,
      resultRows: [
        { id: "Context Prepending", handlerAction: "EXIT Handler", loggingAction: "Context Captured", rollbackAction: "ROLLBACK executed ✅", resignalMode: "RESIGNAL SET MESSAGE_TEXT", clientResult: "[sp_process_student_ledger] (Student 105) FAILED: ...", status: "Enriched Context" },
      ],
      explanation:
        "`RESIGNAL SET MESSAGE_TEXT` decorates the caught error with runtime parameter context (e.g. `Student 105`), simplifying debugging across microservice log aggregators.",
    },
    transforming_resignal_sanitization: {
      title: "3. Transforming RESIGNAL: Sanitizing Raw DB Errors into Domain Errors",
      badge: "Transforming RESIGNAL",
      badgeColor: "amber",
      sqlQuery: `-- Security Sanitization: Replacing Raw DB Errors with Domain Errors:
DELIMITER //

CREATE PROCEDURE sp_register_secure_applicant(
    IN p_email VARCHAR(100)
)
BEGIN
    -- Trap Duplicate Key 1062 and replace with user-friendly domain error:
    DECLARE EXIT HANDLER FOR 1062
    BEGIN
        -- Mask internal table/index names and return sanitized Class 45 error:
        RESIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'APPLICATION_ERROR: This email is already associated with an existing account!',
            MYSQL_ERRNO  = 50021,
            SCHEMA_NAME  = 'barrackpore_portal';
    END;

    INSERT INTO applicants (email, registered_at) VALUES (p_email, NOW());
END //

DELIMITER ;`,
      resultRows: [
        { id: "Duplicate Email (1062)", handlerAction: "Handler 1062", loggingAction: "Schema Masked", rollbackAction: "Statement Aborted", resignalMode: "RESIGNAL SQLSTATE '45000'", clientResult: "APPLICATION_ERROR: Email already exists!", status: "Security Sanitized" },
      ],
      explanation:
        "`RESIGNAL SQLSTATE '45000'` replaces raw, revealing vendor error numbers (1062) and table names with sanitized, user-friendly business error messages.",
    },
    multitier_procedure_propagation: {
      title: "4. Multi-Tier Propagation: Call Stack Exception Escalation",
      badge: "Multi-Tier Call Stack",
      badgeColor: "rose",
      sqlQuery: `-- Multi-Tier Call Stack Exception Propagation:
DELIMITER //

-- Inner Child Procedure:
CREATE PROCEDURE sp_child_validate_record(IN p_id INT)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Child logs local failure and propagates up the call stack:
        INSERT INTO audit_child_trace (trace_msg) VALUES ('Child validation failed; re-throwing...');
        RESIGNAL;
    END;

    SELECT * FROM non_existent_validation_table;
END //

-- Outer Parent Procedure:
CREATE PROCEDURE sp_parent_workflow_coordinator()
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Parent intercepts re-thrown exception from Child:
        SELECT 'Parent workflow caught propagated child exception gracefully!' AS status;
    END;

    CALL sp_child_validate_record(101);
END //

DELIMITER ;`,
      resultRows: [
        { id: "Child → Parent", handlerAction: "Child Re-throws → Parent Catches", loggingAction: "Child Trace Logged", rollbackAction: "Propagated Up Call Stack", resignalMode: "Multi-Tier RESIGNAL", clientResult: "Parent workflow caught propagated exception", status: "Hierarchical Recovery" },
      ],
      explanation:
        "`RESIGNAL` enables clean hierarchical error propagation: child routines can log granular local telemetry and re-throw exceptions for parent workflows to handle centrally.",
    },
  };

  const navItems = [
    { id: "resignal-concept", label: "1. The RESIGNAL Concept" },
    { id: "three-modes", label: "2. Three Modes of RESIGNAL" },
    { id: "svg-diagrams", label: "3. Architecture & Modes SVGs" },
    { id: "interactive-sandbox", label: "4. Live RESIGNAL Workbench" },
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
            <span>Topic 6 of 12</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Exception Propagation
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Propagating &amp; Modifying Exceptions with RESIGNAL
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Implement clean multi-tier database exception architectures. Master the Log-and-Rethrow pattern, bare pass-through <code className="text-cyan-300 font-mono">RESIGNAL;</code>, message context enrichment, domain error transformation, and security sanitization.
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
        {/* SECTION 1: The RESIGNAL Concept */}
        <section id="resignal-concept" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Log-and-Rethrow Architecture
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why swallowing errors is dangerous and how RESIGNAL solves the observability problem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
                <span>❌</span> The Trap of Silent Error Swallowing
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                When a handler catches an exception and merely returns without re-throwing, the calling application believes the operation succeeded! This leads to corrupted state and silent data loss.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                <span>🛡️</span> The Log-and-Rethrow Pattern
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Using <code className="text-emerald-300 font-mono">RESIGNAL</code> allows stored routines to execute transaction rollback and record internal database telemetry, while still re-throwing the exception to alert client applications.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Three Modes of RESIGNAL */}
        <section id="three-modes" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. The Three Modes of the RESIGNAL Statement
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing pass-through, modifying, and transforming exception styles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400 font-mono">1. Bare RESIGNAL;</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Re-throws the original caught error with all attributes (SQLSTATE, Error Number, Message Text) completely untouched.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-cyan-400 font-mono">2. Modifying RESIGNAL</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Preserves the original SQLSTATE while prepending or enriching <code className="text-cyan-300 font-mono">MESSAGE_TEXT</code> with routine parameter context.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-amber-400 font-mono">3. Transforming RESIGNAL</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Replaces raw database vendor errors with user-friendly, security-sanitized <code className="text-amber-300 font-mono">SQLSTATE '45000'</code> domain messages.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Log-and-Rethrow Pipeline &amp; RESIGNAL Modes
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Visualizing the full exception cycle and the three operational modes of RESIGNAL.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Pipeline */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> The Enterprise Log-and-Rethrow Pipeline
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1: DML Fails */}
                  <g>
                    <rect x="20" y="30" width="160" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="100" y="55" fill="#fca5a5" fontSize="9" fontWeight="bold" textAnchor="middle">1. DML Fails</text>
                    <rect x="30" y="70" width="140" height="40" rx="4" fill="#1e293b" />
                    <text x="100" y="88" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">Exception Raised</text>
                    <text x="100" y="102" fill="#fca5a5" fontSize="7 font-mono" textAnchor="middle">Error 1062 / 1452</text>
                  </g>

                  {/* Step 2: Catch & Rollback */}
                  <g>
                    <rect x="210" y="30" width="180" height="100" rx="8" fill="#451a03" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="300" y="55" fill="#fcd34d" fontSize="9" fontWeight="bold" textAnchor="middle">2. Catch &amp; ROLLBACK</text>
                    <rect x="220" y="70" width="160" height="40" rx="4" fill="#1e293b" />
                    <text x="300" y="88" fill="#fbbf24" fontSize="8 font-mono" textAnchor="middle">GET DIAGNOSTICS</text>
                    <text x="300" y="102" fill="#f87171" fontSize="7 font-bold" textAnchor="middle">ROLLBACK; executed</text>
                  </g>

                  {/* Step 3: Insert Telemetry */}
                  <g>
                    <rect x="420" y="30" width="180" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="510" y="55" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">3. Audit Telemetry</text>
                    <rect x="430" y="70" width="160" height="40" rx="4" fill="#022c22" />
                    <text x="510" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">INSERT INTO log</text>
                    <text x="510" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Permanent Storage ✅</text>
                  </g>

                  {/* Step 4: RESIGNAL */}
                  <g>
                    <rect x="630" y="30" width="200" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                    <text x="730" y="55" fill="#c7d2fe" fontSize="9" fontWeight="bold" textAnchor="middle">4. Re-throw to Client</text>
                    <rect x="640" y="70" width="180" height="40" rx="4" fill="#0f172a" />
                    <text x="730" y="88" fill="#38bdf8" fontSize="8 font-mono font-bold" textAnchor="middle">RESIGNAL;</text>
                    <text x="730" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Client Driver Alerted ✅</text>
                  </g>

                  {/* Arrows */}
                  <path d="M 180 80 L 210 80" stroke="#ef4444" strokeWidth="1.5" />
                  <path d="M 390 80 L 420 80" stroke="#f59e0b" strokeWidth="1.5" />
                  <path d="M 600 80 L 630 80" stroke="#10b981" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* SVG 2: Three Modes */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-amber-400 font-mono">Diagram B:</span> The Three Operational Modes of RESIGNAL
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Mode 1 */}
                  <g>
                    <rect x="30" y="30" width="240" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="150" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">1. Bare RESIGNAL;</text>
                    <rect x="45" y="70" width="210" height="40" rx="4" fill="#022c22" />
                    <text x="150" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Pass-Through Mode</text>
                    <text x="150" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Untouched Original Error</text>
                  </g>

                  {/* Mode 2 */}
                  <g>
                    <rect x="300" y="30" width="250" height="100" rx="8" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="425" y="55" fill="#67e8f9" fontSize="10" fontWeight="bold" textAnchor="middle">2. Modifying RESIGNAL</text>
                    <rect x="315" y="70" width="220" height="40" rx="4" fill="#0f172a" />
                    <text x="425" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">SET MESSAGE_TEXT = ...</text>
                    <text x="425" y="102" fill="#bae6fd" fontSize="7 font-bold" textAnchor="middle">Prepends Context Data</text>
                  </g>

                  {/* Mode 3 */}
                  <g>
                    <rect x="580" y="30" width="240" height="100" rx="8" fill="#451a03" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="700" y="55" fill="#fcd34d" fontSize="10" fontWeight="bold" textAnchor="middle">3. Transforming RESIGNAL</text>
                    <rect x="595" y="70" width="210" height="40" rx="4" fill="#1e293b" />
                    <text x="700" y="88" fill="#fbbf24" fontSize="8 font-mono" textAnchor="middle">RESIGNAL SQLSTATE '45000'</text>
                    <text x="700" y="102" fill="#fde68a" fontSize="7 font-bold" textAnchor="middle">Sanitized Domain Error</text>
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
              4. Interactive RESIGNAL Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test bare pass-through, context message enrichment, security error transformation, and multi-tier call stack propagation live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(resignalScenarios).map(([key, item]) => {
              const isActive = selectedResignalScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedResignalScenario(key)}
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
                        item.badgeColor === "cyan" && "bg-cyan-950 text-cyan-400 border border-cyan-800",
                        item.badgeColor === "amber" && "bg-amber-950 text-amber-400 border border-amber-800",
                        item.badgeColor === "rose" && "bg-rose-950 text-rose-400 border border-rose-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Model" : "○ Run RESIGNAL Test"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{resignalScenarios[selectedResignalScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{resignalScenarios[selectedResignalScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                RESIGNAL Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Exception Propagation (RESIGNAL) Script</span>
                <span className="text-emerald-400">Log-and-Rethrow Implementation</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {resignalScenarios[selectedResignalScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Trigger Case / ID</th>
                    <th className="py-3 px-4 text-white">Handler Action</th>
                    <th className="py-3 px-4 text-emerald-400">Logging Action</th>
                    <th className="py-3 px-4 text-cyan-400">Rollback Action</th>
                    <th className="py-3 px-4 text-amber-400">RESIGNAL Mode</th>
                    <th className="py-3 px-4 text-indigo-400">Client Result</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {resignalScenarios[selectedResignalScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-mono text-white">{row.handlerAction}</td>
                      <td className="py-3 px-4 text-emerald-300 font-mono">{row.loggingAction}</td>
                      <td className="py-3 px-4 text-slate-300 font-mono">{row.rollbackAction}</td>
                      <td className="py-3 px-4 text-amber-300 font-mono">{row.resignalMode}</td>
                      <td className="py-3 px-4 text-indigo-300 font-sans">{row.clientResult}</td>
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
              Real-world transparent error logging and database schema sanitization.
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
                  Eliminating Silent Swallowing in Barrackpore Fee Collection
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Accounts Department</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui refactored a flawed tuition collection procedure: Previously, an empty <code className="text-rose-300 font-mono">CONTINUE HANDLER</code> swallowed duplicate receipt errors silently. Adding <code className="text-emerald-300 font-mono">RESIGNAL;</code> allowed the procedure to record audit telemetry while immediately alerting the cashier's point-of-sale machine that payment failed!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Transparent Log-and-Rethrow Implementation:
DECLARE EXIT HANDLER FOR SQLEXCEPTION
BEGIN
    GET DIAGNOSTICS CONDITION 1 v_sqlstate = RETURNED_SQLSTATE, v_errno = MYSQL_ERRNO, v_msg = MESSAGE_TEXT;
    ROLLBACK;
    INSERT INTO billing_error_log (proc_name, sqlstate_val, msg) VALUES ('sp_collect_fees', v_sqlstate, v_msg);
    RESIGNAL; -- Alerts client POS terminal immediately!
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
              Avoid executing RESIGNAL outside handlers and protect against secondary logging errors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Executing RESIGNAL Outside a Handler
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                `RESIGNAL` is strictly invalid outside an active handler body. Calling it directly in a procedure throws MySQL Error <code className="text-rose-300 font-mono">1645</code>.
              </p>
              <div className="text-xs text-slate-400">
                Fix: Use <code className="text-emerald-400 font-mono">SIGNAL</code> for standalone error raising, and <code className="text-emerald-400 font-mono">RESIGNAL</code> only inside handlers!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Sanitize Database Errors for Public Clients
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Use <code className="text-emerald-400 font-mono">RESIGNAL SQLSTATE '45000'</code> to replace internal database error strings with clean, non-sensitive domain messages before sending to public APIs.
              </p>
              <div className="text-xs text-slate-400">
                Prevents schema information disclosure vulnerabilities.
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
              Key takeaways for Propagating Exceptions with RESIGNAL.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> RESIGNAL Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><code className="text-cyan-300 font-mono">RESIGNAL</code> is ONLY valid inside an active handler body.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Bare <code className="text-cyan-300 font-mono">RESIGNAL;</code> re-throws the original caught error untouched.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span><code className="text-cyan-300 font-mono">RESIGNAL SET MESSAGE_TEXT = ...</code> enriches context.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span><code className="text-cyan-300 font-mono">RESIGNAL SQLSTATE '45000'</code> sanitizes internal errors into domain errors.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe the Log-and-Rethrow pattern...”</span>
                  Never leave a handler empty! Log telemetry to `procedure_error_audit_log` and call `RESIGNAL;` to guarantee full observability!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about multi-tier workflows...”</span>
                  When child procedures use `RESIGNAL;`, parent procedures can intercept the failure or let it propagate to the API tier automatically!
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
              Comprehensive reference questions covering the RESIGNAL statement, the Log-and-Rethrow design pattern, bare pass-through vs modifying vs transforming modes, security sanitization, and multi-tier exception propagation.
            </p>
          </div>

          <FAQTemplate
            title="RESIGNAL Statement FAQs"
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
            title="Propagating and Modifying Exceptions using RESIGNAL Statement"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic6_note.txt"
          />

          <Teacher
            note="The RESIGNAL statement is essential for implementing the enterprise Log-and-Rethrow pattern. When an exception occurs, always execute ROLLBACK; and insert telemetry into your audit log first, then execute RESIGNAL; (or RESIGNAL SQLSTATE '45000' for sanitized domain errors). This guarantees that internal database observability is preserved while external clients are never left with silent errors!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic6;
