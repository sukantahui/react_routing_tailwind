import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

/**
 * Topic1 – Understanding MySQL Error Codes and standard ANSI SQLSTATE Values
 * Module: 003_004_error-handling-and-cursors
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on MySQL vendor error numbers, ANSI SQLSTATE taxonomy, Class code structures, specific vs generic handler matching, and diagnostics stack inspection.
 */
const Topic1 = () => {
  // Interactive Simulator State
  const [selectedErrorScenario, setSelectedErrorScenario] = useState("integrity_violations_23000");

  const errorScenarios = {
    integrity_violations_23000: {
      title: "1. Integrity Violations: Error 1062 & 1452 → SQLSTATE '23000'",
      badge: "Class 23 (Integrity)",
      badgeColor: "rose",
      sqlQuery: `-- Handling Integrity Constraint Violations:
DELIMITER //

CREATE PROCEDURE sp_handle_integrity_demo(
    IN p_student_id INT,
    IN p_email VARCHAR(100),
    IN p_dept_id INT,
    OUT p_result_code VARCHAR(30)
)
BEGIN
    -- Specific Handler 1: Duplicate Key (Error 1062)
    DECLARE EXIT HANDLER FOR 1062
    BEGIN
        SET p_result_code = 'ERR_DUPLICATE_KEY_1062';
    END;

    -- Specific Handler 2: Foreign Key Violation (Error 1452)
    DECLARE EXIT HANDLER FOR 1452
    BEGIN
        SET p_result_code = 'ERR_INVALID_DEPT_FK_1452';
    END;

    -- Generic Fallback for all other Class 23 violations:
    DECLARE EXIT HANDLER FOR SQLSTATE '23000'
    BEGIN
        SET p_result_code = 'ERR_GENERAL_INTEGRITY_23000';
    END;

    INSERT INTO students (student_id, email, dept_id)
    VALUES (p_student_id, p_email, p_dept_id);
    
    SET p_result_code = 'SUCCESS_200';
END //

DELIMITER ;`,
      resultRows: [
        { id: "Duplicate Email", errno: "1062 (ER_DUP_ENTRY)", sqlstate: "'23000'", handlerMatched: "Handler 1062 (Specific)", returnVal: "'ERR_DUPLICATE_KEY_1062'", status: "Specific Match" },
        { id: "Non-Existent Dept", errno: "1452 (ER_NO_REFERENCED_ROW)", sqlstate: "'23000'", handlerMatched: "Handler 1452 (Specific)", returnVal: "'ERR_INVALID_DEPT_FK_1452'", status: "Specific Match" },
        { id: "NOT NULL Violation", errno: "1048 (ER_BAD_NULL_ERROR)", sqlstate: "'23000'", handlerMatched: "SQLSTATE '23000' (Generic)", returnVal: "'ERR_GENERAL_INTEGRITY_23000'", status: "Class Fallback" },
      ],
      explanation:
        "Errors 1062, 1452, and 1048 all map to ANSI SQLSTATE `'23000'`. MySQL's specificity rule allows you to trap 1062 specifically while letting 1048 fall back to the generic `'23000'` handler.",
    },
    deadlock_serialization_40001: {
      title: "2. Deadlock & Serialization Failure: Error 1213 → SQLSTATE '40001'",
      badge: "Class 40 (Deadlock)",
      badgeColor: "amber",
      sqlQuery: `-- Trapping InnoDB Deadlocks for Automatic Retry Logic:
DELIMITER //

CREATE PROCEDURE sp_transfer_tuition_with_deadlock_guard(
    IN p_from_id INT,
    IN p_to_id INT,
    IN p_amount DECIMAL(10,2),
    OUT p_status VARCHAR(30)
)
BEGIN
    -- Declare Named Condition for Deadlock:
    DECLARE deadlock_detected CONDITION FOR SQLSTATE '40001'; -- Or Error 1213

    DECLARE EXIT HANDLER FOR deadlock_detected
    BEGIN
        ROLLBACK;
        SET p_status = 'ERR_DEADLOCK_RETRY_NEEDED';
        -- Application backend intercepts this code and retries transaction!
    END;

    START TRANSACTION;
    UPDATE student_ledgers SET balance = balance - p_amount WHERE student_id = p_from_id;
    UPDATE student_ledgers SET balance = balance + p_amount WHERE student_id = p_to_id;
    COMMIT;
    
    SET p_status = 'TRANSFER_SUCCESS';
END //

DELIMITER ;`,
      resultRows: [
        { id: "Deadlock Cycle", errno: "1213 (ER_LOCK_DEADLOCK)", sqlstate: "'40001'", handlerMatched: "deadlock_detected (Class 40)", returnVal: "'ERR_DEADLOCK_RETRY_NEEDED'", status: "Rollback & Retry" },
      ],
      explanation:
        "When concurrent transactions create a lock dependency cycle, InnoDB detects the deadlock and aborts one transaction with Error 1213 / SQLSTATE `'40001'`, triggering rollback and retry.",
    },
    missing_objects_42S02: {
      title: "3. Syntax & Catalog Errors: Error 1146 → SQLSTATE '42S02'",
      badge: "Class 42 (Catalog)",
      badgeColor: "cyan",
      sqlQuery: `-- Handling Missing Tables and Syntax Violations:
DELIMITER //

CREATE PROCEDURE sp_safe_table_query()
BEGIN
    DECLARE v_table_missing BOOLEAN DEFAULT FALSE;

    -- Traps Table Not Found (Error 1146 / SQLSTATE '42S02'):
    DECLARE CONTINUE HANDLER FOR SQLSTATE '42S02'
    BEGIN
        SET v_table_missing = TRUE;
    END;

    SELECT * FROM legacy_grades_2015;

    IF v_table_missing THEN
        SELECT 'Table does not exist. Using fallback archive...' AS message;
    END IF;
END //

DELIMITER ;`,
      resultRows: [
        { id: "Missing Table", errno: "1146 (ER_NO_SUCH_TABLE)", sqlstate: "'42S02'", handlerMatched: "SQLSTATE '42S02'", returnVal: "v_table_missing = TRUE", status: "Non-Fatal Fallback" },
      ],
      explanation:
        "Class `42` encompasses syntax and catalog rule violations. SQLSTATE `'42S02'` (Error 1146) allows stored routines to catch missing tables and divert execution to fallback archives.",
    },
    user_defined_signal_45000: {
      title: "4. Custom User Application Exceptions: SQLSTATE '45000'",
      badge: "Class 45 (Custom)",
      badgeColor: "emerald",
      sqlQuery: `-- Custom Business Rule Exceptions via SIGNAL:
DELIMITER //

CREATE PROCEDURE sp_enroll_student_with_age_check(
    IN p_name VARCHAR(100),
    IN p_age INT
)
BEGIN
    -- Business Invariant: Student must be at least 16 years old:
    IF p_age < 16 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'AGE_RESTRICTION: Student must be at least 16 years old to enroll!',
            MYSQL_ERRNO  = 50001;
    END IF;

    INSERT INTO students (name, age) VALUES (p_name, p_age);
END //

DELIMITER ;

-- Test with Underage Student:
-- CALL sp_enroll_student_with_age_check('Rohan', 14);
-- 🚨 ERROR 50001 (45000): AGE_RESTRICTION: Student must be at least 16 years old to enroll!`,
      resultRows: [
        { id: "Age 14 (Underage)", errno: "50001 (Custom)", sqlstate: "'45000' (Class 45)", handlerMatched: "SIGNAL Raised", returnVal: "Aborted with custom MESSAGE_TEXT", status: "💥 Business Rejection" },
      ],
      explanation:
        "Class `'45'` (specifically `'45000'`) is reserved strictly for user-defined application exceptions. Combining `SIGNAL SQLSTATE '45000'` with `SET MESSAGE_TEXT` returns customized business error messages.",
    },
  };

  const navItems = [
    { id: "error-taxonomy", label: "1. Error Number vs SQLSTATE" },
    { id: "class-taxonomy", label: "2. SQLSTATE Class Taxonomy" },
    { id: "svg-diagrams", label: "3. Anatomy & Mapping SVGs" },
    { id: "interactive-sandbox", label: "4. Live Error Codes Workbench" },
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
            <span>Topic 1 of 12</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Error Standards
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            MySQL Error Codes &amp; Standard ANSI SQLSTATE
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master the relationship between MySQL vendor error numbers and standard ANSI SQLSTATE codes. Learn Class code taxonomies (<code className="text-cyan-300 font-mono">'23000'</code>, <code className="text-cyan-300 font-mono">'40001'</code>, <code className="text-cyan-300 font-mono">'45000'</code>), specific error discrimination, and exception routing.
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
        {/* SECTION 1: Error Taxonomy */}
        <section id="error-taxonomy" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. MySQL Error Numbers vs ANSI SQLSTATE
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing proprietary vendor error integers with portable standard strings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                <span>🔢</span> MySQL Error Number (Proprietary Integer)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                A 4-digit vendor-specific integer (e.g. <code className="text-emerald-300 font-mono">1062</code> for Duplicate Entry, <code className="text-emerald-300 font-mono">1452</code> for Foreign Key Failure). Allows highly granular sub-type discrimination.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-cyan-400 flex items-center gap-2">
                <span>🌐</span> ANSI SQLSTATE Code (5-Character String)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                A 5-character standardized alphanumeric string (e.g. <code className="text-cyan-300 font-mono">'23000'</code> for Integrity Violations, <code className="text-cyan-300 font-mono">'40001'</code> for Deadlocks) portable across all SQL databases.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Class Taxonomy */}
        <section id="class-taxonomy" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. ANSI SQLSTATE Class Code Taxonomy
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Standard 2-character prefix classifications for database conditions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="font-bold text-emerald-400 font-mono">Class '00' ('00000')</div>
              <div className="text-slate-300">Successful Completion (No Error)</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="font-bold text-amber-400 font-mono">Class '01' ('01000')</div>
              <div className="text-slate-300">Warning (Data Truncation)</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="font-bold text-cyan-400 font-mono">Class '02' ('02000')</div>
              <div className="text-slate-300">No Data / NOT FOUND (Cursor End)</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="font-bold text-rose-400 font-mono">Class '23' ('23000')</div>
              <div className="text-slate-300">Integrity Violation (PK, FK, NULL)</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="font-bold text-rose-400 font-mono">Class '40' ('40001')</div>
              <div className="text-slate-300">Transaction Rollback / Deadlock</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="font-bold text-indigo-400 font-mono">Class '42' ('42000')</div>
              <div className="text-slate-300">Syntax / Access Violation / Missing Table</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="font-bold text-emerald-400 font-mono">Class '45' ('45000')</div>
              <div className="text-slate-300">User Custom Exception (via SIGNAL)</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="font-bold text-slate-400 font-mono">Class 'HY' ('HY000')</div>
              <div className="text-slate-300">Generic CLI / Vendor Catch-All</div>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: SQLSTATE Anatomy &amp; Error Mapping
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Visualizing the 5-character SQLSTATE structure and many-to-one error mappings.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: SQLSTATE Anatomy */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Anatomy of a 5-Character ANSI SQLSTATE
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Class Code Box */}
                  <g>
                    <rect x="50" y="30" width="320" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                    <text x="210" y="55" fill="#c7d2fe" fontSize="11" fontWeight="bold" textAnchor="middle">2-Character CLASS Code ('23')</text>
                    <rect x="65" y="70" width="290" height="40" rx="4" fill="#0f172a" />
                    <text x="210" y="88" fill="#38bdf8" fontSize="9 font-mono" textAnchor="middle">Broad Category: Integrity Constraint Violation</text>
                    <text x="210" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Evaluated by generic handlers</text>
                  </g>

                  {/* Subclass Code Box */}
                  <g>
                    <rect x="420" y="30" width="380" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="610" y="55" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">3-Character SUBCLASS Code ('000')</text>
                    <rect x="435" y="70" width="350" height="40" rx="4" fill="#022c22" />
                    <text x="610" y="88" fill="#a7f3d0" fontSize="9 font-mono" textAnchor="middle">Specific Condition: Standard Violation Detail</text>
                    <text x="610" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Combines into Full SQLSTATE: '23000'</text>
                  </g>

                  {/* Connecting Plus */}
                  <text x="395" y="88" fill="#ffffff" fontSize="18" fontWeight="bold" textAnchor="middle">+</text>
                </svg>
              </div>
            </div>

            {/* SVG 2: Error Mapping */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-rose-400 font-mono">Diagram B:</span> Many-to-One Error Number Mapping to SQLSTATE '23000'
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Left: MySQL Errors */}
                  <g>
                    <rect x="30" y="20" width="280" height="35" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1" />
                    <text x="170" y="42" fill="#fca5a5" fontSize="8 font-mono" textAnchor="middle">Error 1062: Duplicate Primary/Unique Key</text>

                    <rect x="30" y="65" width="280" height="35" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1" />
                    <text x="170" y="87" fill="#fca5a5" fontSize="8 font-mono" textAnchor="middle">Error 1452: Foreign Key Constraint Failure</text>

                    <rect x="30" y="110" width="280" height="35" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1" />
                    <text x="170" y="132" fill="#fca5a5" fontSize="8 font-mono" textAnchor="middle">Error 1048: Column Cannot Be NULL</text>
                  </g>

                  {/* Right: ANSI SQLSTATE */}
                  <g>
                    <rect x="480" y="30" width="340" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="650" y="60" fill="#34d399" fontSize="12 font-bold" textAnchor="middle">ANSI SQLSTATE '23000'</text>
                    <rect x="500" y="75" width="300" height="40" rx="4" fill="#022c22" />
                    <text x="650" y="98" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">DECLARE EXIT HANDLER FOR SQLSTATE '23000'</text>
                  </g>

                  {/* Converging Arrows */}
                  <path d="M 310 37 L 480 80" stroke="#ef4444" strokeWidth="1.5" />
                  <path d="M 310 82 L 480 80" stroke="#ef4444" strokeWidth="1.5" />
                  <path d="M 310 127 L 480 80" stroke="#ef4444" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Error Codes &amp; SQLSTATE Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test specific vs generic integrity handlers, deadlock traps, missing table fallbacks, and custom Class 45 exceptions live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(errorScenarios).map(([key, item]) => {
              const isActive = selectedErrorScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedErrorScenario(key)}
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
                    {isActive ? "● Active Test" : "○ Run Error Test"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{errorScenarios[selectedErrorScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{errorScenarios[selectedErrorScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Error Code Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Error Code &amp; SQLSTATE Handler Script</span>
                <span className="text-emerald-400">Specificity Routing</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {errorScenarios[selectedErrorScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Trigger Case / ID</th>
                    <th className="py-3 px-4 text-rose-400">MySQL Error No</th>
                    <th className="py-3 px-4 text-emerald-400">ANSI SQLSTATE</th>
                    <th className="py-3 px-4 text-cyan-400">Handler Matched</th>
                    <th className="py-3 px-4 text-indigo-400">Output Result Code</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {errorScenarios[selectedErrorScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-mono text-rose-300">{row.errno}</td>
                      <td className="py-3 px-4 text-emerald-300 font-mono">{row.sqlstate}</td>
                      <td className="py-3 px-4 text-slate-300 font-sans">{row.handlerMatched}</td>
                      <td className="py-3 px-4 text-indigo-300 font-mono">{row.returnVal}</td>
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
              Real-world error discrimination and automatic deadlock retry loops.
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
                  Discriminating Duplicate Keys vs Foreign Key Failures in Barrackpore Admissions
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Academy ERP</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui architected a high-precision admission processor: Because both duplicate roll numbers (<code className="text-cyan-300 font-mono">1062</code>) and invalid course IDs (<code className="text-cyan-300 font-mono">1452</code>) share SQLSTATE <code className="text-rose-400 font-mono">'23000'</code>, declared specific error number handlers distinguish the two conditions, giving students clear feedback instead of a generic database error!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Granular Handler Specificity:
DECLARE EXIT HANDLER FOR 1062 SET p_msg = 'Roll number already assigned to another student!';
DECLARE EXIT HANDLER FOR 1452 SET p_msg = 'Selected course ID is invalid or discontinued!';`}
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
              Avoid overly broad error catching and understand SQLSTATE class hierarchies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Overly Broad Catch-All Handlers
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Catching all errors with a single generic <code className="text-rose-300 font-mono">SQLEXCEPTION</code> handler prevents the calling application from distinguishing between transient deadlocks and permanent integrity violations.
              </p>
              <div className="text-xs text-slate-400">
                Fix: Stack specific handlers for <code className="text-emerald-400 font-mono">40001</code> and <code className="text-emerald-400 font-mono">1062</code>!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Leverage Class 45 for Business Invariants
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Always use <code className="text-emerald-400 font-mono">SIGNAL SQLSTATE '45000'</code> when aborting transactions for custom business rule failures.
              </p>
              <div className="text-xs text-slate-400">
                Standardizes custom application exceptions.
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
              Key takeaways for Error Codes &amp; SQLSTATE Values.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Error Code Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Use SQLSTATE <code className="text-cyan-300 font-mono">'23000'</code> for integrity constraint violations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Use SQLSTATE <code className="text-cyan-300 font-mono">'40001'</code> for deadlock serialization failures.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Use SQLSTATE <code className="text-cyan-300 font-mono">'45000'</code> for custom user exceptions via `SIGNAL`.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Use specific error numbers (e.g. 1062) when distinguishing sub-types.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe SQLSTATE Class 02...”</span>
                  Class `'02'` represents `NOT FOUND`, which is the condition triggered when cursors reach the end of their dataset during `FETCH INTO`!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about deadlock recovery...”</span>
                  When an application receives SQLSTATE `'40001'`, it should wait a random backoff jitter (e.g. 50ms) and retry the transaction automatically!
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
              Comprehensive reference questions covering MySQL vendor error numbers, ANSI SQLSTATE taxonomy, Class code structures, specific vs generic handler matching, and diagnostics stack inspection.
            </p>
          </div>

          <FAQTemplate
            title="MySQL Error Codes &amp; SQLSTATE FAQs"
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
            title="Understanding MySQL Error Codes and standard ANSI SQLSTATE Values"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic1_note.txt"
          />

          <Teacher
            note="Knowing your error codes and SQLSTATE values is essential for writing accurate, defensive stored routines. Remember that SQLSTATE codes are 5-character ANSI standards (like '23000' for integrity violations and '40001' for deadlocks), while MySQL error numbers (like 1062 and 1452) provide granular vendor-specific detail. Always use specific handlers to provide actionable feedback to client applications!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic1;
