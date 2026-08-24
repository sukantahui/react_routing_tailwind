import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

/**
 * Topic2 – The DECLARE HANDLER Statement: CONTINUE vs EXIT Handlers
 * Module: 003_004_error-handling-and-cursors
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on the DECLARE HANDLER statement, CONTINUE vs EXIT control flow mechanics, compound handler bodies, nested block error isolation, and batch failure resilience.
 */
const Topic2 = () => {
  // Interactive Simulator State
  const [selectedHandlerScenario, setSelectedHandlerScenario] = useState("exit_handler_atomic_rollback");

  const handlerScenarios = {
    exit_handler_atomic_rollback: {
      title: "1. EXIT Handler: Immediate Transaction Rollback & Block Termination",
      badge: "EXIT Action",
      badgeColor: "rose",
      sqlQuery: `-- EXIT Handler: Immediately halts current block upon error:
DELIMITER //

CREATE PROCEDURE sp_process_single_tuition_fee(
    IN p_student_id INT,
    IN p_amount DECIMAL(10,2),
    OUT p_status_code VARCHAR(30)
)
BEGIN
    -- Declare EXIT Handler for any fatal SQL error:
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Explicit atomic rollback:
        ROLLBACK;
        SET p_status_code = 'TRANSACTION_ROLLED_BACK';
        -- Execution terminates here! Outer block returns immediately.
    END;

    START TRANSACTION;
    
    -- Step 1: Deduct student fee:
    UPDATE student_ledgers 
    SET outstanding_balance = outstanding_balance - p_amount 
    WHERE student_id = p_student_id;
    
    -- Step 2: Insert receipt (might fail if duplicate receipt ID):
    INSERT INTO fee_receipts (receipt_no, student_id, amount) 
    VALUES ('RCP-2026-999', p_student_id, p_amount);
    
    COMMIT;
    SET p_status_code = 'TRANSACTION_COMMITTED_200';
END //

DELIMITER ;`,
      resultRows: [
        { id: "Receipt Collision", handlerType: "EXIT HANDLER", triggerCond: "SQLEXCEPTION (1062)", actionExecuted: "ROLLBACK; SET p_status = 'FAIL'", flowOfControl: "Terminates block immediately", status: "Clean Rollback" },
      ],
      explanation:
        "When an error occurs at Step 2, the `EXIT HANDLER` catches the exception, executes `ROLLBACK`, assigns the error status code, and terminates the procedure without executing any subsequent statements.",
    },
    continue_handler_batch_loop: {
      title: "2. CONTINUE Handler: Best-Effort Batch Processing & Flag Setting",
      badge: "CONTINUE Action",
      badgeColor: "emerald",
      sqlQuery: `-- CONTINUE Handler: Resumes execution at the next statement after error:
DELIMITER //

CREATE PROCEDURE sp_batch_notify_students(
    OUT p_success_count INT,
    OUT p_failure_count INT
)
BEGIN
    DECLARE v_error_flag BOOLEAN DEFAULT FALSE;
    
    SET p_success_count = 0;
    SET p_failure_count = 0;

    -- CONTINUE Handler: Traps errors without aborting the batch:
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
    BEGIN
        SET v_error_flag = TRUE;
        SET p_failure_count = p_failure_count + 1;
    END;

    -- Item 1: Valid Notification
    INSERT INTO notification_queue (student_id, message) VALUES (101, 'Exam schedule published');
    SET p_success_count = p_success_count + 1;

    -- Item 2: Invalid Student (Foreign key fails) -> Handler catches & continues!
    INSERT INTO notification_queue (student_id, message) VALUES (99999, 'Exam schedule published');

    -- Item 3: Valid Notification -> Executes normally!
    INSERT INTO notification_queue (student_id, message) VALUES (103, 'Exam schedule published');
    SET p_success_count = p_success_count + 1;
END //

DELIMITER ;`,
      resultRows: [
        { id: "Batch Job (3 Items)", handlerType: "CONTINUE HANDLER", triggerCond: "SQLEXCEPTION (FK 1452)", actionExecuted: "Increment failure count & continue", flowOfControl: "Proceeds to Item 3", status: "Batch Finished (2 Success, 1 Fail)" },
      ],
      explanation:
        "`CONTINUE` handlers do not abort the procedure. When Item 2 encounters an error, the handler logs the failure and control proceeds directly to Item 3.",
    },
    nested_block_try_catch_isolation: {
      title: "3. Nested Block Scoping: Inner Try-Catch Error Isolation",
      badge: "Nested Try-Catch",
      badgeColor: "cyan",
      sqlQuery: `-- Emulating Try-Catch: Inner block EXIT handler does not abort outer procedure:
DELIMITER //

CREATE PROCEDURE sp_nested_block_try_catch_demo()
BEGIN
    DECLARE v_outer_status VARCHAR(50) DEFAULT 'INITIALIZING';

    -- Outer statement:
    SET v_outer_status = 'STARTING_OUTER_WORKFLOW';

    -- Inner Protected Block (Emulates try { ... } catch { ... }):
    BEGIN
        DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            -- Catches error in inner block only:
            INSERT INTO non_fatal_log (msg) VALUES ('Inner block encountered error; isolated safely.');
        END;

        -- Risky Statement:
        SELECT * FROM non_existent_table_xyz;
    END; -- Exits inner block upon error, but OUTSIDE execution continues!

    -- Outer procedure resumes seamlessly:
    SET v_outer_status = 'OUTER_WORKFLOW_COMPLETED_SUCCESSFULLY';
    SELECT v_outer_status;
END //

DELIMITER ;`,
      resultRows: [
        { id: "Inner Table Missing", handlerType: "Inner EXIT HANDLER", triggerCond: "Error 1146 in inner block", actionExecuted: "Exits inner BEGIN...END block", flowOfControl: "Outer workflow continues cleanly", status: "Isolated Recovery" },
      ],
      explanation:
        "An `EXIT HANDLER` in a nested block terminates ONLY that inner block. The outer procedure continues running, emulating structured `try { ... } catch { ... }` exception isolation.",
    },
    multi_condition_stacking: {
      title: "4. Multi-Condition Stacking: Comma-Separated Error Traps",
      badge: "Multi-Condition",
      badgeColor: "amber",
      sqlQuery: `-- Binding multiple error codes to a single unified handler:
DELIMITER //

CREATE PROCEDURE sp_multi_condition_handler_demo(
    IN p_id INT,
    IN p_email VARCHAR(100)
)
BEGIN
    -- Single handler listening to Duplicate Key (1062), FK Failure (1452), and Syntax (42000):
    DECLARE EXIT HANDLER FOR 1062, 1452, SQLSTATE '42000'
    BEGIN
        ROLLBACK;
        INSERT INTO audit_security_alerts (alert_type, logged_at) 
        VALUES ('INTEGRITY_OR_SYNTAX_VIOLATION', NOW());
    END;

    START TRANSACTION;
    INSERT INTO students (student_id, email) VALUES (p_id, p_email);
    COMMIT;
END //

DELIMITER ;`,
      resultRows: [
        { id: "Stacked Conditions", handlerType: "EXIT HANDLER", triggerCond: "1062, 1452, SQLSTATE '42000'", actionExecuted: "Unified Rollback & Security Alert", flowOfControl: "Single handler catches 3 errors", status: "Unified Handler Active" },
      ],
      explanation:
        "You can stack multiple error numbers and SQLSTATE codes in a single `DECLARE HANDLER` statement using commas, eliminating duplicate handler boilerplate code.",
    },
  };

  const navItems = [
    { id: "handler-syntax", label: "1. DECLARE HANDLER Syntax" },
    { id: "continue-vs-exit", label: "2. CONTINUE vs EXIT Mechanics" },
    { id: "svg-diagrams", label: "3. Flow of Control & Scoping SVGs" },
    { id: "interactive-sandbox", label: "4. Live Handler Workbench" },
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
            <span>Topic 2 of 12</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Flow of Control
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            The DECLARE HANDLER Statement: CONTINUE vs EXIT
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Control exception recovery and program flow in MySQL stored routines. Master <code className="text-cyan-300 font-mono">CONTINUE</code> (resume next statement) vs <code className="text-cyan-300 font-mono">EXIT</code> (halt block) handlers, compound execution bodies, and nested block try-catch isolation.
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
        {/* SECTION 1: Syntax */}
        <section id="handler-syntax" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The DECLARE HANDLER Statement Syntax
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The standard MySQL DDL structure for intercepting database exceptions.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <pre className="p-4 bg-slate-950 rounded-xl text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
{`DECLARE { CONTINUE | EXIT } HANDLER 
FOR condition_value [, condition_value] ...
handler_statement;`}
            </pre>
          </div>
        </section>

        {/* SECTION 2: CONTINUE vs EXIT */}
        <section id="continue-vs-exit" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. CONTINUE vs EXIT Control Flow Mechanics
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing immediate resumption with block termination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                <span>🔄</span> CONTINUE Handler (Resume Next)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                When an error or warning occurs, MySQL runs the handler and then <strong>resumes execution at the immediate next statement</strong>. Ideal for loop termination flags (<code className="text-emerald-300 font-mono">NOT FOUND</code>) and best-effort batch operations.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
                <span>⏹️</span> EXIT Handler (Halt Block)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                When an error occurs, MySQL runs the handler and <strong>immediately terminates execution of the current <code className="text-rose-300 font-mono">BEGIN...END</code> block</strong>. Ideal for fatal errors requiring immediate <code className="text-rose-300 font-mono">ROLLBACK;</code>.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Flow of Control &amp; Nested Scoping
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing control flow jumps with nested block error isolation.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Flow of Control */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Flow of Control: CONTINUE vs EXIT
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* CONTINUE Flow */}
                  <g>
                    <rect x="30" y="30" width="370" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="215" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">CONTINUE HANDLER FLOW</text>
                    <rect x="45" y="70" width="340" height="40" rx="4" fill="#022c22" />
                    <text x="215" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Statement 1 (Fails) → Handler Runs → Statement 2 Runs</text>
                    <text x="215" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">✅ Procedure does NOT terminate</text>
                  </g>

                  {/* EXIT Flow */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="630" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">EXIT HANDLER FLOW</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#1e293b" />
                    <text x="630" y="88" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">Statement 1 (Fails) → Handler Runs (ROLLBACK) → Block Exits</text>
                    <text x="630" y="102" fill="#fca5a5" fontSize="7 font-bold" textAnchor="middle">🛑 Statement 2 is NEVER reached</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* SVG 2: Nested Scoping */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-indigo-400 font-mono">Diagram B:</span> Nested Block Scoping (Inner Try-Catch Isolation)
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Outer Block */}
                  <g>
                    <rect x="20" y="20" width="810" height="120" rx="8" fill="#0f172a" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="45" y="42" fill="#c7d2fe" fontSize="10" fontWeight="bold">OUTER PROCEDURE SCOPE (BEGIN ... END)</text>

                    {/* Inner Block */}
                    <rect x="180" y="50" width="480" height="75" rx="6" fill="#1e1b4b" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="420" y="70" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">INNER PROTECTED BLOCK (DECLARE EXIT HANDLER)</text>
                    <text x="420" y="90" fill="#cbd5e1" fontSize="8 font-mono" textAnchor="middle">Risky DML Fails → EXIT Handler halts ONLY this inner block</text>
                    <text x="420" y="108" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Control returns to Outer Procedure → Continues Execution!</text>
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
              4. Interactive Handlers Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test EXIT handler atomic rollbacks, CONTINUE batch resilient loops, nested block error isolation, and multi-condition stacking live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(handlerScenarios).map(([key, item]) => {
              const isActive = selectedHandlerScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedHandlerScenario(key)}
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
                        item.badgeColor === "rose" && "bg-rose-950 text-rose-400 border border-rose-800",
                        item.badgeColor === "emerald" && "bg-emerald-950 text-emerald-400 border border-emerald-800",
                        item.badgeColor === "cyan" && "bg-cyan-950 text-cyan-400 border border-cyan-800",
                        item.badgeColor === "amber" && "bg-amber-950 text-amber-400 border border-amber-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Model" : "○ Run Handler Test"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{handlerScenarios[selectedHandlerScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{handlerScenarios[selectedHandlerScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Handler Control Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Handler Routine Script</span>
                <span className="text-emerald-400">Flow-of-Control Demonstration</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {handlerScenarios[selectedHandlerScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Scenario / Test ID</th>
                    <th className="py-3 px-4 text-white">Handler Action</th>
                    <th className="py-3 px-4 text-emerald-400">Trigger Condition</th>
                    <th className="py-3 px-4 text-cyan-400">Action Executed</th>
                    <th className="py-3 px-4 text-indigo-400">Flow of Control</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {handlerScenarios[selectedHandlerScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-mono text-white">{row.handlerType}</td>
                      <td className="py-3 px-4 text-emerald-300 font-mono">{row.triggerCond}</td>
                      <td className="py-3 px-4 text-slate-300 font-sans">{row.actionExecuted}</td>
                      <td className="py-3 px-4 text-indigo-300 font-sans">{row.flowOfControl}</td>
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
              Real-world batch processing resilience and atomic payment rollbacks.
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
                  Best-Effort Batch SMS Notification Queueing at Barrackpore Academy
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Academy Communications</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui architected a high-resilience communication pipeline: When broadcasting exam notices to 5,000 students, if an invalid phone number or duplicate student row fails, a <code className="text-emerald-300 font-mono">CONTINUE HANDLER FOR SQLEXCEPTION</code> increments the failure counter and continues broadcasting to the remaining 4,999 students without crashing the entire batch!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Non-Blocking Batch Notification Handler:
DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
BEGIN
    SET v_fail_count = v_fail_count + 1;
    INSERT INTO notification_failures (student_id, fail_time) VALUES (v_cur_student, NOW());
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
              Avoid uncommitted transactions in EXIT handlers and silent error swallowing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Forgetting Explicit ROLLBACK on EXIT
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                An `EXIT HANDLER` only halts execution; it does NOT automatically execute `ROLLBACK;` unless you explicitly code it inside the handler body!
              </p>
              <div className="text-xs text-slate-400">
                Fix: Always write <code className="text-emerald-400 font-mono">BEGIN ROLLBACK; ... END;</code> in transactional EXIT handlers!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Isolate Failures with Nested Blocks
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Wrap non-critical operations (like audit logging or analytics pings) in an inner `BEGIN...END` block with its own `EXIT HANDLER` so outer business transactions never fail.
              </p>
              <div className="text-xs text-slate-400">
                Standard enterprise fault isolation.
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
              Key takeaways for CONTINUE vs EXIT Handlers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Handlers Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Use <code className="text-cyan-300 font-mono">EXIT HANDLER</code> for fatal errors and atomic transaction rollbacks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Use <code className="text-cyan-300 font-mono">CONTINUE HANDLER</code> for cursor iterations (`NOT FOUND`) and flags.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Remember that <code className="text-cyan-300 font-mono">EXIT</code> in an inner block exits ONLY that inner block.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Stack multiple conditions with commas to reduce repetitive handler code.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe cursor loop termination...”</span>
                  The standard idiom for ending a cursor loop is `DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_done = TRUE;`!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about compound statements...”</span>
                  Wrap complex handler recovery logic inside `BEGIN ROLLBACK; INSERT INTO error_log ...; SET p_status = 'FAIL'; END;`!
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
              Comprehensive reference questions covering the DECLARE HANDLER statement, CONTINUE vs EXIT control flow mechanics, compound handler bodies, nested block error isolation, and batch failure resilience.
            </p>
          </div>

          <FAQTemplate
            title="CONTINUE vs EXIT Handlers FAQs"
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
            title="The DECLARE HANDLER Statement: CONTINUE vs EXIT Handlers"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic2_note.txt"
          />

          <Teacher
            note="Mastering CONTINUE versus EXIT handlers is fundamental to writing bulletproof stored routines. Use EXIT handlers to guarantee atomic rollback and graceful failure whenever a fatal constraint or transaction error occurs; use CONTINUE handlers to detect cursor exhaustion (NOT FOUND) and set warning flags in batch loops. Remember that nesting an EXIT handler inside an inner BEGIN...END block gives you full try-catch error isolation!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic2;
