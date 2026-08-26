import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

/**
 * Topic4 – Graceful Failure, Automatic Rollback, and Error Logging in Stored Procedures
 * Module: 003_004_error-handling-and-cursors
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on defensive enterprise transaction architecture, atomic rollback upon exception, GET DIAGNOSTICS telemetry, production error audit logging, and REST-style client status contracts.
 */
const Topic4 = () => {
  // Interactive Simulator State
  const [selectedResilienceScenario, setSelectedResilienceScenario] = useState("atomic_transfer_with_logging");

  const resilienceScenarios = {
    atomic_transfer_with_logging: {
      title: "1. Multi-Table Financial Ledger Transfer with Atomic Rollback & Error Logging",
      badge: "Atomic Rollback",
      badgeColor: "emerald",
      sqlQuery: `-- Enterprise Financial Transfer with Automatic Rollback & Telemetry:
DELIMITER //

CREATE PROCEDURE sp_transfer_tuition_funds_safe(
    IN p_from_student INT,
    IN p_to_student INT,
    IN p_amount DECIMAL(10,2),
    OUT p_response_code INT,
    OUT p_response_message VARCHAR(255)
)
BEGIN
    DECLARE v_sqlstate VARCHAR(5);
    DECLARE v_errno INT;
    DECLARE v_msg VARCHAR(255);

    -- EXIT Handler: Catches any fatal error, executes rollback, and logs telemetry:
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- 1. Extract error diagnostics:
        GET DIAGNOSTICS CONDITION 1
            v_sqlstate = RETURNED_SQLSTATE,
            v_errno    = MYSQL_ERRNO,
            v_msg      = MESSAGE_TEXT;
            
        -- 2. Execute explicit transaction rollback:
        ROLLBACK;
        
        -- 3. Persist error to telemetry table AFTER rollback:
        INSERT INTO procedure_error_audit_log (
            procedure_name, sqlstate_code, mysql_errno, error_message, context_payload, logged_at
        ) VALUES (
            'sp_transfer_tuition_funds_safe', v_sqlstate, v_errno, v_msg,
            JSON_OBJECT('from_student', p_from_student, 'to_student', p_to_student, 'amount', p_amount),
            NOW()
        );
        
        -- 4. Return clean standardized error code:
        SET p_response_code = 500;
        SET p_response_message = CONCAT('Internal DB Error: ', v_msg);
    END;

    -- Business Validation Check:
    IF p_amount &le; 0 THEN
        SET p_response_code = 400;
        SET p_response_message = 'Validation Error: Transfer amount must be positive!';
    ELSE
        -- Atomic Multi-Statement Transaction:
        START TRANSACTION;
        
        -- Step 1: Debit sender
        UPDATE student_ledgers SET balance = balance - p_amount WHERE student_id = p_from_student;
        
        -- Step 2: Credit recipient
        UPDATE student_ledgers SET balance = balance + p_amount WHERE student_id = p_to_student;
        
        COMMIT;
        SET p_response_code = 200;
        SET p_response_message = 'Transfer completed successfully.';
    END IF;
END //

DELIMITER ;`,
      resultRows: [
        { id: "Transfer ₹25,000", transactionState: "START TRANSACTION", handlerStatus: "EXIT FOR SQLEXCEPTION", rollbackStatus: "ROLLBACK executed ✅", auditLogStatus: "Telemetry Inserted", clientContract: "200 (Success) / 500 (Clean Fail)", status: "Enterprise Grade" },
      ],
      explanation:
        "If either update statement fails, the `EXIT HANDLER` extracts diagnostics, rolls back the transaction completely, logs a rich JSON context entry to `procedure_error_audit_log`, and returns a clean HTTP-style status `500`.",
    },
    json_rich_context_logging: {
      title: "2. Rich JSON Diagnostic Telemetry: Capturing Procedure Context",
      badge: "JSON Telemetry",
      badgeColor: "cyan",
      sqlQuery: `-- Capturing Rich JSON Execution Parameters into Production Audit Log:
DELIMITER //

CREATE PROCEDURE sp_log_rich_telemetry_demo(
    IN p_dept_id INT,
    IN p_batch_year INT
)
BEGIN
    DECLARE v_state VARCHAR(5);
    DECLARE v_err INT;
    DECLARE v_msg VARCHAR(255);

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            v_state = RETURNED_SQLSTATE,
            v_err   = MYSQL_ERRNO,
            v_msg   = MESSAGE_TEXT;
            
        ROLLBACK;
        
        -- Storing structured JSON parameters for SRE debugging:
        INSERT INTO procedure_error_audit_log (
            procedure_name, sqlstate_code, mysql_errno, error_message, context_payload, executed_by, logged_at
        ) VALUES (
            'sp_log_rich_telemetry_demo', v_state, v_err, v_msg,
            JSON_OBJECT(
                'dept_id', p_dept_id,
                'batch_year', p_batch_year,
                'connection_id', CONNECTION_ID(),
                'server_time', NOW()
            ),
            CURRENT_USER(),
            NOW()
        );
    END;

    START TRANSACTION;
    -- Intentional division by zero to trigger telemetry:
    UPDATE department_stats SET avg_fee = 50000 / 0 WHERE dept_id = p_dept_id;
    COMMIT;
END //

DELIMITER ;`,
      resultRows: [
        { id: "Division by Zero", transactionState: "Enclosed Transaction", handlerStatus: "GET DIAGNOSTICS Captured", rollbackStatus: "ROLLBACK executed ✅", auditLogStatus: "JSON context persisted", clientContract: "Clean Failure Logged", status: "Full Observability" },
      ],
      explanation:
        "Using `JSON_OBJECT()` allows developers to package all runtime arguments, `CONNECTION_ID()`, and `CURRENT_USER()` into the audit log, giving DevOps teams instant debugging context.",
    },
    autonomous_persistence_sequence: {
      title: "3. Log Persistence Sequence: ROLLBACK Before Audit Insert",
      badge: "Sequence Rule",
      badgeColor: "rose",
      sqlQuery: `-- ⚠️ THE CRITICAL SEQUENCE RULE:
-- ❌ BAD PATTERN (Log is erased by subsequent rollback):
-- BEGIN
--     INSERT INTO error_log ...; -- ❌ Inserted inside failed transaction!
--     ROLLBACK;                  -- 💥 Erases the error log entry just inserted!
-- END;

-- ✅ CORRECT PATTERN (Log persists permanently):
-- BEGIN
--     GET DIAGNOSTICS ...;       -- 1. Extract error details into variables
--     ROLLBACK;                  -- 2. Clean up the failed business transaction
--     INSERT INTO error_log ...; -- 3. Insert log entry in clean state (PERSISTS!)
-- END;`,
      resultRows: [
        { id: "Order of Operations", transactionState: "1. Capture Diagnostics", handlerStatus: "2. ROLLBACK (Reset TX)", rollbackStatus: "3. INSERT INTO log (Persists ✅)", auditLogStatus: "4. Return Response Code", clientContract: "Error Log Retained", status: "Guaranteed Persistence" },
      ],
      explanation:
        "If you execute `INSERT INTO error_log` before `ROLLBACK;`, the rollback will undo your log insert! Always execute `ROLLBACK;` first, then insert your telemetry record.",
    },
    http_style_api_contracts: {
      title: "4. Standardized Client Response Contract: 200, 400, 404, 409, 500",
      badge: "API Contracts",
      badgeColor: "amber",
      sqlQuery: `-- Returning Standardized REST-Style HTTP Codes from Stored Routines:
DELIMITER //

CREATE PROCEDURE sp_register_applicant_api(
    IN p_email VARCHAR(100),
    IN p_age INT,
    OUT p_http_status INT,
    OUT p_json_response JSON
)
BEGIN
    DECLARE EXIT HANDLER FOR 1062 -- Duplicate Email
    BEGIN
        SET p_http_status = 409; -- Conflict
        SET p_json_response = JSON_OBJECT('status', 'ERROR', 'code', 409, 'message', 'Email address is already registered!');
    END;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_http_status = 500; -- Internal Server Error
        SET p_json_response = JSON_OBJECT('status', 'ERROR', 'code', 500, 'message', 'Internal database transaction failure.');
    END;

    -- Validation Rule:
    IF p_age < 18 THEN
        SET p_http_status = 400; -- Bad Request
        SET p_json_response = JSON_OBJECT('status', 'ERROR', 'code', 400, 'message', 'Applicant must be at least 18 years old.');
    ELSE
        START TRANSACTION;
        INSERT INTO applicants (email, age) VALUES (p_email, p_age);
        COMMIT;
        
        SET p_http_status = 200; -- OK
        SET p_json_response = JSON_OBJECT('status', 'SUCCESS', 'code', 200, 'message', 'Applicant registered successfully.');
    END IF;
END //

DELIMITER ;`,
      resultRows: [
        { id: "Valid Applicant (21)", transactionState: "Committed", handlerStatus: "Normal Execution", rollbackStatus: "No Rollback Needed", auditLogStatus: "N/A", clientContract: "200 (SUCCESS)", status: "OK" },
        { id: "Underage (16)", transactionState: "Rejected Pre-TX", handlerStatus: "Validation Branch", rollbackStatus: "No Transaction", auditLogStatus: "N/A", clientContract: "400 (Bad Request)", status: "Client Error" },
        { id: "Duplicate Email", transactionState: "Conflict Trapped", handlerStatus: "Handler 1062", rollbackStatus: "Aborted", auditLogStatus: "Telemetry Logged", clientContract: "409 (Conflict)", status: "Conflict" },
      ],
      explanation:
        "Structuring stored procedure output parameters with standard HTTP-like status codes (200, 400, 409, 500) and JSON responses allows Node.js, Spring Boot, and Python FastAPI servers to map database responses directly to API outputs.",
    },
  };

  const navItems = [
    { id: "graceful-failure", label: "1. Graceful Failure & Rollback" },
    { id: "telemetry-logging", label: "2. Telemetry Audit Log Schema" },
    { id: "svg-diagrams", label: "3. Flow & Sequence SVGs" },
    { id: "interactive-sandbox", label: "4. Live Resilience Workbench" },
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
            <span>Topic 4 of 12</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Resilience &amp; Observability
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Graceful Failure, Automatic Rollback &amp; Error Logging
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Build bulletproof, enterprise-ready stored procedures. Master multi-statement atomic transactions, unconditional rollback on failure, <code className="text-cyan-300 font-mono">GET DIAGNOSTICS</code> error extraction, production audit logging, and standardized REST-style response contracts.
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
        {/* SECTION 1: Graceful Failure & Rollback */}
        <section id="graceful-failure" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Enterprise Transaction Safety &amp; Graceful Failure
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Guaranteeing ACID atomicity and preventing lock leakage during procedure exceptions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
                <span>⚠️</span> The Catastrophe of Partial Failures
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                In a multi-table mutation (e.g. debiting sender and crediting receiver), if the procedure crashes midway without an exception handler, the sender's money is lost while the receiver gets nothing, and uncommitted table locks block all concurrent users.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                <span>🛡️</span> The Atomic Rollback &amp; Logging Pipeline
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Enclosing DML in <code className="text-emerald-300 font-mono">START TRANSACTION ... COMMIT;</code> paired with an <code className="text-emerald-300 font-mono">EXIT HANDLER FOR SQLEXCEPTION</code> guarantees that any failure triggers <code className="text-emerald-300 font-mono">ROLLBACK;</code>, logs diagnostic metadata, and returns clean error codes.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Telemetry Audit Log Schema */}
        <section id="telemetry-logging" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Production Error Audit Log Table Architecture
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              A comprehensive DDL schema for capturing database runtime exceptions and execution context.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <pre className="p-4 bg-slate-950 rounded-xl text-xs font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
{`CREATE TABLE procedure_error_audit_log (
    log_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    procedure_name VARCHAR(100) NOT NULL,
    sqlstate_code VARCHAR(5) NOT NULL,
    mysql_errno INT NOT NULL,
    error_message TEXT NOT NULL,
    context_payload JSON NULL,
    executed_by VARCHAR(100) NOT NULL,
    logged_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_proc_time (procedure_name, logged_at),
    INDEX idx_errno (mysql_errno)
) ENGINE=InnoDB;`}
            </pre>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Defensive Flow &amp; Persistence Sequence
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Understanding the safe execution pipeline and the critical rollback-first logging sequence.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Pipeline */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Defensive Transaction &amp; Error Logging Pipeline
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1: START TX */}
                  <g>
                    <rect x="20" y="30" width="140" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="90" y="55" fill="#c7d2fe" fontSize="9" fontWeight="bold" textAnchor="middle">1. START TX</text>
                    <rect x="30" y="70" width="120" height="40" rx="4" fill="#0f172a" />
                    <text x="90" y="92" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Begin Transaction</text>
                  </g>

                  {/* Step 2: DML Fails */}
                  <g>
                    <rect x="180" y="30" width="150" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="255" y="55" fill="#fca5a5" fontSize="9" fontWeight="bold" textAnchor="middle">2. DML Fails</text>
                    <rect x="190" y="70" width="130" height="40" rx="4" fill="#1e293b" />
                    <text x="255" y="92" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">Error 1062 / 1452</text>
                  </g>

                  {/* Step 3: GET DIAGNOSTICS & ROLLBACK */}
                  <g>
                    <rect x="350" y="30" width="170" height="100" rx="8" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                    <text x="435" y="55" fill="#fcd34d" fontSize="9" fontWeight="bold" textAnchor="middle">3. Extract &amp; ROLLBACK</text>
                    <rect x="360" y="70" width="150" height="40" rx="4" fill="#1e293b" />
                    <text x="435" y="86" fill="#fbbf24" fontSize="7 font-mono" textAnchor="middle">GET DIAGNOSTICS</text>
                    <text x="435" y="100" fill="#f87171" fontSize="8 font-mono font-bold" textAnchor="middle">ROLLBACK; (Safe)</text>
                  </g>

                  {/* Step 4: INSERT INTO Log */}
                  <g>
                    <rect x="540" y="30" width="150" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="615" y="55" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">4. Audit Insert</text>
                    <rect x="550" y="70" width="130" height="40" rx="4" fill="#022c22" />
                    <text x="615" y="92" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">INSERT INTO log</text>
                  </g>

                  {/* Step 5: Clean Return */}
                  <g>
                    <rect x="710" y="30" width="120" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="770" y="55" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">5. Return</text>
                    <rect x="720" y="70" width="100" height="40" rx="4" fill="#022c22" />
                    <text x="770" y="92" fill="#34d399" fontSize="8 font-mono" textAnchor="middle">Status 500</text>
                  </g>

                  {/* Arrows */}
                  <path d="M 160 80 L 180 80" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 330 80 L 350 80" stroke="#ef4444" strokeWidth="1.5" />
                  <path d="M 520 80 L 540 80" stroke="#f59e0b" strokeWidth="2" />
                  <path d="M 690 80 L 710 80" stroke="#10b981" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            {/* SVG 2: Sequence Trap */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-rose-400 font-mono">Diagram B:</span> Log Persistence Sequence: Danger of Logging Before Rollback
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Left: Wrong Order */}
                  <g>
                    <rect x="30" y="30" width="370" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="215" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">❌ WRONG ORDER (Log Erased)</text>
                    <rect x="45" y="70" width="340" height="40" rx="4" fill="#1e293b" />
                    <text x="215" y="88" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">1. INSERT INTO log → 2. ROLLBACK;</text>
                    <text x="215" y="102" fill="#fca5a5" fontSize="7 font-bold" textAnchor="middle">💥 Rollback undoes the log insert! Error log is lost!</text>
                  </g>

                  {/* Right: Correct Order */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="630" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">✅ CORRECT ORDER (Log Persists)</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#022c22" />
                    <text x="630" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">1. ROLLBACK; → 2. INSERT INTO log</text>
                    <text x="630" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">✅ Business TX cleaned up; Log is permanently stored!</text>
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
              4. Interactive Resilience &amp; Telemetry Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test atomic financial transfer rollback, rich JSON telemetry capture, persistence sequencing, and REST-style HTTP status contracts live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(resilienceScenarios).map(([key, item]) => {
              const isActive = selectedResilienceScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedResilienceScenario(key)}
                  className={clsx(
                    "p-4 rounded-xl text-left transition-all duration-300 border flex flex-col justify-between cursor-pointer",
                    isActive
                      ? "bg-indigo-950/60 border-cyan-500 shadow-lg shadow-cyan-950/40 scale-[1.02]"
                      : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850"
                  )}
                &gt;
                  <div>
                    <span
                      className={clsx(
                        "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
                        item.badgeColor === "emerald" && "bg-emerald-950 text-emerald-400 border border-emerald-800",
                        item.badgeColor === "cyan" && "bg-cyan-950 text-cyan-400 border border-cyan-800",
                        item.badgeColor === "rose" && "bg-rose-950 text-rose-400 border border-rose-800",
                        item.badgeColor === "amber" && "bg-amber-950 text-amber-400 border border-amber-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Model" : "○ Run Resilience Test"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{resilienceScenarios[selectedResilienceScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{resilienceScenarios[selectedResilienceScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Resilience Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Enterprise Procedure Routine</span>
                <span className="text-emerald-400">Atomic Rollback &amp; Telemetry</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {resilienceScenarios[selectedResilienceScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Transaction Case / ID</th>
                    <th className="py-3 px-4 text-white">Transaction State</th>
                    <th className="py-3 px-4 text-emerald-400">Handler Status</th>
                    <th className="py-3 px-4 text-cyan-400">Rollback Status</th>
                    <th className="py-3 px-4 text-indigo-400">Audit Log Status</th>
                    <th className="py-3 px-4 text-amber-400">Client Contract Code</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {resilienceScenarios[selectedResilienceScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-mono text-white">{row.transactionState}</td>
                      <td className="py-3 px-4 text-emerald-300 font-mono">{row.handlerStatus}</td>
                      <td className="py-3 px-4 text-slate-300 font-sans">{row.rollbackStatus}</td>
                      <td className="py-3 px-4 text-indigo-300 font-sans">{row.auditLogStatus}</td>
                      <td className="py-3 px-4 text-amber-300 font-mono">{row.clientContract}</td>
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
              Real-world financial ledger safety and centralized telemetry architecture.
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
                  Protecting High-Volume Tuition Collections with Atomic Rollbacks in Barrackpore
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Accounts Department</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui engineered a high-integrity financial collection pipeline: Processing ₹50,00,000 in monthly student fee payments across 2,000 students. When an occasional gateway receipt generation fails, the procedure rolls back the ledger debit instantly, logs the exact JSON payload to `procedure_error_audit_log`, and returns a clean 500 error without corrupting ledger balances!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Production Atomic Rollback & JSON Telemetry:
DECLARE EXIT HANDLER FOR SQLEXCEPTION
BEGIN
    GET DIAGNOSTICS CONDITION 1 v_sqlstate = RETURNED_SQLSTATE, v_errno = MYSQL_ERRNO, v_msg = MESSAGE_TEXT;
    ROLLBACK; -- Must rollback BEFORE inserting log!
    INSERT INTO procedure_error_audit_log (procedure_name, sqlstate_code, mysql_errno, error_message, context_payload, logged_at)
    VALUES ('sp_collect_fees', v_sqlstate, v_errno, v_msg, JSON_OBJECT('student_id', p_student_id, 'amt', p_amt), NOW());
    SET p_status = 500;
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
              Avoid logging before rollback and always capture JSON execution context.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Inserting Audit Log BEFORE Rollback
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                If you execute <code className="text-rose-300 font-mono">INSERT INTO error_log</code> and then call <code className="text-rose-300 font-mono">ROLLBACK;</code>, MySQL will roll back your log entry along with the failed transaction!
              </p>
              <div className="text-xs text-slate-400">
                Fix: Always execute <code className="text-emerald-400 font-mono">ROLLBACK;</code> first, then insert your telemetry record!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Return Standard HTTP-Style Status Codes
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Return 200 (Success), 400 (Bad Request), 409 (Conflict), and 500 (Internal DB Failure) so backend microservices can map responses cleanly to web clients.
              </p>
              <div className="text-xs text-slate-400">
                Standardizes database-to-API communication.
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
              Key takeaways for Graceful Failure &amp; Error Logging.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Resilience Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Enclose all multi-table mutations in <code className="text-cyan-300 font-mono">START TRANSACTION ... COMMIT;</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Catch fatal errors with <code className="text-cyan-300 font-mono">DECLARE EXIT HANDLER FOR SQLEXCEPTION</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Extract error metadata via <code className="text-cyan-300 font-mono">GET DIAGNOSTICS</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Execute <code className="text-cyan-300 font-mono">ROLLBACK;</code> before inserting into the audit log table.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe context payloads...”</span>
                  Using `JSON_OBJECT('student_id', p_id, 'amount', p_amt)` in your error log saves hours of debugging by providing the exact parameters that crashed the routine!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about automated purge events...”</span>
                  Always create a scheduled MySQL Event (`sp_purge_old_error_logs`) to delete audit records older than 60 days to keep your database lean!
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
              Comprehensive reference questions covering defensive enterprise transaction architecture, atomic rollback upon exception, GET DIAGNOSTICS telemetry, production error audit logging, and REST-style client status contracts.
            </p>
          </div>

          <FAQTemplate
            title="Graceful Failure &amp; Error Logging FAQs"
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
            title="Graceful Failure, Automatic Rollback, and Error Logging in Stored Procedures"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic4_note.txt"
          />

          <Teacher
            note="In mission-critical enterprise systems, writing a procedure without transaction rollback and telemetry logging is completely unacceptable. Always pair START TRANSACTION with an EXIT HANDLER FOR SQLEXCEPTION. Remember the golden sequence rule: extract diagnostics via GET DIAGNOSTICS, execute ROLLBACK; to release locks and clean up the failed transaction, and then insert your error log record so that it persists permanently!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic4;
