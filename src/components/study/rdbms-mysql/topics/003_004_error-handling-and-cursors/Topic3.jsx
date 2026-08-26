import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

/**
 * Topic3 – Handling SQLEXCEPTION, SQLWARNING, and NOT FOUND Conditions
 * Module: 003_004_error-handling-and-cursors
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on MySQL's three canonical condition keywords: SQLEXCEPTION, SQLWARNING, and NOT FOUND, handler precedence, SELECT INTO zero-row traps, and multi-condition routine architectures.
 */
const Topic3 = () => {
  // Interactive Simulator State
  const [selectedConditionScenario, setSelectedConditionScenario] = useState("sqlexception_fatal_rollback");

  const conditionScenarios = {
    sqlexception_fatal_rollback: {
      title: "1. SQLEXCEPTION: Universal Fatal Error Catch-All & Rollback",
      badge: "SQLEXCEPTION",
      badgeColor: "rose",
      sqlQuery: `-- Universal Error Interception with SQLEXCEPTION:
DELIMITER //

CREATE PROCEDURE sp_universal_exception_guard_demo(
    IN p_student_id INT,
    IN p_fee DECIMAL(10,2),
    OUT p_status_code VARCHAR(30)
)
BEGIN
    -- SQLEXCEPTION catches ANY fatal SQL error (Duplicate key, FK fail, table missing, deadlock):
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_status_code = 'ERR_SQLEXCEPTION_ROLLED_BACK';
        INSERT INTO fatal_error_log (procedure_name, err_time) 
        VALUES ('sp_universal_exception_guard_demo', NOW());
    END;

    START TRANSACTION;
    INSERT INTO student_ledger (student_id, fee_amount) VALUES (p_student_id, p_fee);
    UPDATE department_budget SET collected = collected + p_fee WHERE dept_id = 1;
    COMMIT;
    
    SET p_status_code = 'SUCCESS_200';
END //

DELIMITER ;`,
      resultRows: [
        { id: "Fatal Error (Any)", conditionKeyword: "SQLEXCEPTION", matchedSQLSTATE: "Not '00', '01', or '02'", handlerAction: "EXIT + ROLLBACK", outputResult: "'ERR_SQLEXCEPTION_ROLLED_BACK'", status: "Safely Rolled Back" },
      ],
      explanation:
        "`SQLEXCEPTION` catches any fatal SQL error condition where SQLSTATE does not begin with '00' (success), '01' (warning), or '02' (not found), ensuring universal transaction rollback safety.",
    },
    sqlwarning_telemetry_tracker: {
      title: "2. SQLWARNING: Non-Fatal Warning Tracking & Telemetry",
      badge: "SQLWARNING",
      badgeColor: "amber",
      sqlQuery: `-- Tracking Non-Fatal Data Truncation / Warning Conditions:
DELIMITER //

CREATE PROCEDURE sp_import_student_batch_with_warnings(
    OUT p_warning_count INT
)
BEGIN
    SET p_warning_count = 0;

    -- CONTINUE Handler for SQLWARNING (Class '01'):
    DECLARE CONTINUE HANDLER FOR SQLWARNING
    BEGIN
        SET p_warning_count = p_warning_count + 1;
    END;

    -- Statement 1: String exceeds VARCHAR(10) (Truncated with warning under non-strict mode)
    INSERT INTO staging_contacts (phone) VALUES ('+91-98300-12345-EXT');
    
    -- Statement 2: NULL in aggregate calculation
    INSERT INTO staging_stats (val) SELECT AVG(score) FROM exam_scores;
END //

DELIMITER ;`,
      resultRows: [
        { id: "Data Truncation", conditionKeyword: "SQLWARNING", matchedSQLSTATE: "Class '01' ('01000', '01004')", handlerAction: "CONTINUE + Inc Counter", outputResult: "p_warning_count = 1", status: "Warning Tracked" },
      ],
      explanation:
        "`SQLWARNING` traps conditions where SQLSTATE begins with `'01'` (e.g. data truncation or NULLs eliminated in aggregate functions), enabling quality telemetry without halting execution.",
    },
    not_found_cursor_and_select_into: {
      title: "3. NOT FOUND: Cursor Exhaustion & Zero-Row SELECT INTO",
      badge: "NOT FOUND",
      badgeColor: "cyan",
      sqlQuery: `-- Handling Cursor Exhaustion and SELECT INTO Missing Data:
DELIMITER //

CREATE PROCEDURE sp_lookup_student_phone(
    IN p_student_id INT,
    OUT p_phone VARCHAR(20)
)
BEGIN
    DECLARE v_is_missing BOOLEAN DEFAULT FALSE;

    -- NOT FOUND traps Class '02' ('02000', Error 1329):
    DECLARE CONTINUE HANDLER FOR NOT FOUND
    BEGIN
        SET v_is_missing = TRUE;
    END;

    -- If student ID does not exist, SELECT INTO triggers NOT FOUND:
    SELECT phone INTO p_phone FROM students WHERE student_id = p_student_id;

    IF v_is_missing THEN
        SET p_phone = 'NOT_REGISTERED';
    END IF;
END //

DELIMITER ;`,
      resultRows: [
        { id: "Student ID 99999", conditionKeyword: "NOT FOUND", matchedSQLSTATE: "Class '02' ('02000' / Error 1329)", handlerAction: "CONTINUE + Fallback", outputResult: "p_phone = 'NOT_REGISTERED'", status: "Handled Gracefully" },
      ],
      explanation:
        "`NOT FOUND` catches conditions where SQLSTATE begins with `'02'`, specifically when a cursor `FETCH` runs out of rows or a `SELECT ... INTO` query finds zero matching rows.",
    },
    tri_condition_stacking_architecture: {
      title: "4. Tri-Condition Architecture: Handling All 3 Conditions Together",
      badge: "Tri-Condition Stacking",
      badgeColor: "emerald",
      sqlQuery: `-- Production Tri-Condition Stored Procedure Architecture:
DELIMITER //

CREATE PROCEDURE sp_tri_condition_master_processor(
    OUT p_status VARCHAR(50),
    OUT p_warn_count INT
)
BEGIN
    DECLARE v_done BOOLEAN DEFAULT FALSE;
    SET p_warn_count = 0;

    -- 1. NOT FOUND Handler (Cursor Iteration):
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_done = TRUE;

    -- 2. SQLWARNING Handler (Telemetry):
    DECLARE CONTINUE HANDLER FOR SQLWARNING SET p_warn_count = p_warn_count + 1;

    -- 3. SQLEXCEPTION Handler (Fatal Error Rollback):
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_status = 'FATAL_ERROR_ROLLED_BACK';
    END;

    START TRANSACTION;
    -- Routine execution logic here...
    COMMIT;
    SET p_status = 'BATCH_COMPLETED_SUCCESSFULLY';
END //

DELIMITER ;`,
      resultRows: [
        { id: "Tri-Condition Stacking", conditionKeyword: "NOT FOUND + SQLWARNING + SQLEXCEPTION", matchedSQLSTATE: "All SQLSTATE Classes", handlerAction: "CONTINUE / CONTINUE / EXIT", outputResult: "Comprehensive Isolation", status: "Full Coverage" },
      ],
      explanation:
        "Combining all three standard condition handlers creates an industrial-strength routine that iterates cursors via `NOT FOUND`, tallies warnings via `SQLWARNING`, and rolls back on `SQLEXCEPTION`.",
    },
  };

  const navItems = [
    { id: "condition-concepts", label: "1. The 3 Canonical Conditions" },
    { id: "precedence-rules", label: "2. Handler Precedence Hierarchy" },
    { id: "svg-diagrams", label: "3. Condition Hierarchy SVGs" },
    { id: "interactive-sandbox", label: "4. Live Conditions Workbench" },
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
            <span>Topic 3 of 12</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Condition Handling
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Handling SQLEXCEPTION, SQLWARNING &amp; NOT FOUND
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master the three canonical condition keywords in MySQL stored routines. Learn the boundary rules between fatal errors (<code className="text-cyan-300 font-mono">SQLEXCEPTION</code>), non-fatal warnings (<code className="text-cyan-300 font-mono">SQLWARNING</code>), and cursor exhaustion (<code className="text-cyan-300 font-mono">NOT FOUND</code>).
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
        {/* SECTION 1: Condition Concepts */}
        <section id="condition-concepts" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Three Canonical Standard Condition Keywords
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The high-level categories that classify every possible MySQL execution result.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
                <span>💥</span> 1. SQLEXCEPTION
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Catches all fatal SQL runtime errors where SQLSTATE does not start with '00', '01', or '02' (e.g. Duplicate Key 1062, FK Failure 1452, Table Not Found 1146, Deadlock 1213).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
                <span>⚠️</span> 2. SQLWARNING
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Catches all warning conditions where SQLSTATE begins with <code className="text-amber-300 font-mono">'01'</code> (e.g. data truncation, NULL elimination in aggregates).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-cyan-400 flex items-center gap-2">
                <span>🔍</span> 3. NOT FOUND
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Catches all data absence conditions where SQLSTATE begins with <code className="text-cyan-300 font-mono">'02'</code> (e.g. cursor <code className="text-cyan-300 font-mono">FETCH</code> exhaustion, or <code className="text-cyan-300 font-mono">SELECT ... INTO</code> returning 0 rows).
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Precedence Rules */}
        <section id="precedence-rules" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Handler Resolution Precedence Hierarchy
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How MySQL determines which handler executes when an exception fires.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
              <span>Resolution Order: Specific to Generic</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center text-xs font-mono">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-emerald-300 font-bold">1. MySQL Error Number (FOR 1062) [Highest]</div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-cyan-300 font-bold">2. Specific SQLSTATE (FOR SQLSTATE '23000')</div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-indigo-300 font-bold">3. Named Condition (FOR duplicate_key)</div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-rose-300 font-bold">4. SQLEXCEPTION / SQLWARNING / NOT FOUND [Lowest]</div>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Condition Keyword Hierarchy &amp; Processing
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Partitioning the universe of SQLSTATE codes across the 3 canonical keywords.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Condition Partition */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> SQLSTATE Universe Partitioning
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Class 00 */}
                  <g>
                    <rect x="20" y="30" width="180" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="110" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Class '00' ('00000')</text>
                    <rect x="30" y="70" width="160" height="40" rx="4" fill="#022c22" />
                    <text x="110" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">SUCCESS (No Handler)</text>
                    <text x="110" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Normal Execution</text>
                  </g>

                  {/* Class 01 */}
                  <g>
                    <rect x="230" y="30" width="180" height="100" rx="8" fill="#451a03" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="320" y="55" fill="#fcd34d" fontSize="10" fontWeight="bold" textAnchor="middle">Class '01' ('01xxx')</text>
                    <rect x="240" y="70" width="160" height="40" rx="4" fill="#1e293b" />
                    <text x="320" y="88" fill="#fbbf24" fontSize="8 font-mono" textAnchor="middle">SQLWARNING</text>
                    <text x="320" y="102" fill="#fde68a" fontSize="7 font-mono" textAnchor="middle">Data truncation, etc.</text>
                  </g>

                  {/* Class 02 */}
                  <g>
                    <rect x="440" y="30" width="180" height="100" rx="8" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="530" y="55" fill="#67e8f9" fontSize="10" fontWeight="bold" textAnchor="middle">Class '02' ('02xxx')</text>
                    <rect x="450" y="70" width="160" height="40" rx="4" fill="#0f172a" />
                    <text x="530" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">NOT FOUND</text>
                    <text x="530" y="102" fill="#bae6fd" fontSize="7 font-mono" textAnchor="middle">Cursor end / 0 rows</text>
                  </g>

                  {/* All other Classes */}
                  <g>
                    <rect x="650" y="30" width="180" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="740" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">Classes 23, 40, 42, 45...</text>
                    <rect x="660" y="70" width="160" height="40" rx="4" fill="#1e293b" />
                    <text x="740" y="88" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">SQLEXCEPTION</text>
                    <text x="740" y="102" fill="#fca5a5" fontSize="7 font-bold" textAnchor="middle">All Fatal Errors</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* SVG 2: Tri-Condition Processing */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400 font-mono">Diagram B:</span> Tri-Condition Handler Stacking Pattern
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Outer Procedure Box */}
                  <g>
                    <rect x="20" y="20" width="810" height="120" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                    <text x="45" y="42" fill="#94a3b8" fontSize="10" fontWeight="bold">STORED PROCEDURE TRI-CONDITION ROUTER</text>

                    {/* 3 Handler Modules */}
                    <rect x="40" y="55" width="230" height="70" rx="6" fill="#083344" stroke="#06b6d4" />
                    <text x="155" y="75" fill="#67e8f9" fontSize="8 font-mono" textAnchor="middle">DECLARE CONTINUE HANDLER</text>
                    <text x="155" y="92" fill="#38bdf8" fontSize="9 font-bold" textAnchor="middle">FOR NOT FOUND</text>
                    <text x="155" y="110" fill="#cbd5e1" fontSize="7" textAnchor="middle">SET v_done = TRUE;</text>

                    <rect x="310" y="55" width="230" height="70" rx="6" fill="#451a03" stroke="#f59e0b" />
                    <text x="425" y="75" fill="#fcd34d" fontSize="8 font-mono" textAnchor="middle">DECLARE CONTINUE HANDLER</text>
                    <text x="425" y="92" fill="#fbbf24" fontSize="9 font-bold" textAnchor="middle">FOR SQLWARNING</text>
                    <text x="425" y="110" fill="#cbd5e1" fontSize="7" textAnchor="middle">SET v_warn = v_warn + 1;</text>

                    <rect x="580" y="55" width="230" height="70" rx="6" fill="#450a0a" stroke="#ef4444" />
                    <text x="695" y="75" fill="#fca5a5" fontSize="8 font-mono" textAnchor="middle">DECLARE EXIT HANDLER</text>
                    <text x="695" y="92" fill="#f87171" fontSize="9 font-bold" textAnchor="middle">FOR SQLEXCEPTION</text>
                    <text x="695" y="110" fill="#fca5a5" fontSize="7 font-bold" textAnchor="middle">ROLLBACK; SET p_status = 'FAIL';</text>
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
              4. Interactive Conditions Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test SQLEXCEPTION universal rollback, SQLWARNING data quality tracking, NOT FOUND cursor loop termination, and Tri-Condition stacking live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(conditionScenarios).map(([key, item]) => {
              const isActive = selectedConditionScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedConditionScenario(key)}
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
                        item.badgeColor === "rose" && "bg-rose-950 text-rose-400 border border-rose-800",
                        item.badgeColor === "amber" && "bg-amber-950 text-amber-400 border border-amber-800",
                        item.badgeColor === "cyan" && "bg-cyan-950 text-cyan-400 border border-cyan-800",
                        item.badgeColor === "emerald" && "bg-emerald-950 text-emerald-400 border border-emerald-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Model" : "○ Run Condition Test"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{conditionScenarios[selectedConditionScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{conditionScenarios[selectedConditionScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Condition Dispatch Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Condition Routine Script</span>
                <span className="text-emerald-400">Canonical Keyword Dispatch</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {conditionScenarios[selectedConditionScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Trigger Case / ID</th>
                    <th className="py-3 px-4 text-white">Condition Keyword</th>
                    <th className="py-3 px-4 text-emerald-400">Matched SQLSTATE</th>
                    <th className="py-3 px-4 text-cyan-400">Handler Action</th>
                    <th className="py-3 px-4 text-indigo-400">Output Result Code</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {conditionScenarios[selectedConditionScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-mono text-rose-300">{row.conditionKeyword}</td>
                      <td className="py-3 px-4 text-emerald-300 font-mono">{row.matchedSQLSTATE}</td>
                      <td className="py-3 px-4 text-slate-300 font-sans">{row.handlerAction}</td>
                      <td className="py-3 px-4 text-indigo-300 font-mono">{row.outputResult}</td>
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
              Real-world zero-row lookup safety and warning telemetry tracking.
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
                  Eliminating Crashing SELECT INTO Lookups with NOT FOUND at Barrackpore Portal
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Student Verification Portal</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui resolved a critical web portal bug: When a student searched for an unregistered registration number, <code className="text-cyan-300 font-mono">SELECT phone INTO v_phone</code> threw Error <code className="text-cyan-300 font-mono">1329</code> and crashed the stored procedure. Declaring a <code className="text-emerald-300 font-mono">CONTINUE HANDLER FOR NOT FOUND</code> intercepted the zero-row condition, assigning a friendly fallback message!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Zero-Row Fallback Handler:
DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_phone = 'UNREGISTERED_STUDENT';
SELECT phone INTO v_phone FROM students WHERE reg_no = p_reg_no;`}
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
              Avoid assuming regular SELECT triggers NOT FOUND and manage multi-row SELECT INTO errors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Assuming SELECT * Triggers NOT FOUND
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                A regular <code className="text-rose-300 font-mono">SELECT * FROM students</code> returning an empty set does NOT trigger `NOT FOUND`. `NOT FOUND` is only triggered by <code className="text-emerald-300 font-mono">FETCH</code> on exhausted cursors or <code className="text-emerald-300 font-mono">SELECT ... INTO</code> with 0 matching rows!
              </p>
              <div className="text-xs text-slate-400">
                Fix: Check <code className="text-emerald-400 font-mono">FOUND_ROWS()</code> or use <code className="text-emerald-400 font-mono">SELECT INTO</code>.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Always Stack All 3 Standard Conditions
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Use <code className="text-cyan-300 font-mono">CONTINUE FOR NOT FOUND</code> for cursors, <code className="text-amber-300 font-mono">CONTINUE FOR SQLWARNING</code> for telemetry, and <code className="text-rose-300 font-mono">EXIT FOR SQLEXCEPTION</code> for atomic rollback.
              </p>
              <div className="text-xs text-slate-400">
                Provides complete exception coverage across all SQLSTATE classes.
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
              Key takeaways for SQLEXCEPTION, SQLWARNING, and NOT FOUND.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Condition Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><code className="text-cyan-300 font-mono">SQLEXCEPTION</code> catches all non-warning, non-not-found fatal errors.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span><code className="text-cyan-300 font-mono">SQLWARNING</code> catches SQLSTATE Class '01' warning conditions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span><code className="text-cyan-300 font-mono">NOT FOUND</code> catches SQLSTATE Class '02' (cursor end &amp; 0-row SELECT INTO).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Specific error numbers (1062) override generic <code className="text-cyan-300 font-mono">SQLEXCEPTION</code> handlers.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe SELECT INTO multiple rows...”</span>
                  If `SELECT ... INTO` matches 2 or more rows, it raises Error `1172`, which triggers `SQLEXCEPTION`, not `NOT FOUND`!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about warning telemetry...”</span>
                  In large data migration pipelines, tracking warning counts with `SQLWARNING` helps detect truncated data without failing the migration!
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
              Comprehensive reference questions covering MySQL's three canonical condition keywords: SQLEXCEPTION, SQLWARNING, and NOT FOUND, handler precedence, SELECT INTO zero-row traps, and multi-condition routine architectures.
            </p>
          </div>

          <FAQTemplate
            title="SQLEXCEPTION, SQLWARNING &amp; NOT FOUND FAQs"
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
            title="Handling SQLEXCEPTION, SQLWARNING, and NOT FOUND Conditions"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic3_note.txt"
          />

          <Teacher
            note="Every professional MySQL procedure developer must understand the clean three-way partitioning between SQLEXCEPTION, SQLWARNING, and NOT FOUND. SQLEXCEPTION traps fatal database errors requiring immediate rollback; SQLWARNING catches non-fatal data conversion or truncation warnings; and NOT FOUND governs cursor termination and zero-row SELECT INTO conditions. Combine all three in your enterprise routines for bulletproof reliability!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic3;
