import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

/**
 * Topic5 – Raising Custom Exceptions with SIGNAL Statement
 * Module: 003_004_error-handling-and-cursors
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on the SIGNAL statement, custom business exception generation, SQLSTATE '45000' user error classes, trigger constraint enforcement, and dynamic diagnostic attributes.
 */
const Topic5 = () => {
  // Interactive Simulator State
  const [selectedSignalScenario, setSelectedSignalScenario] = useState("course_capacity_trigger_guard");

  const signalScenarios = {
    course_capacity_trigger_guard: {
      title: "1. Course Batch Capacity Guard: BEFORE INSERT Trigger with SIGNAL",
      badge: "Capacity Guard",
      badgeColor: "rose",
      sqlQuery: `-- Enforcing Maximum 30 Students per Batch via Trigger SIGNAL:
DELIMITER //

CREATE TRIGGER trg_check_course_capacity_before_insert
BEFORE INSERT ON enrollments
FOR EACH ROW
BEGIN
    DECLARE v_current_count INT;

    -- Count active students currently enrolled in this batch:
    SELECT COUNT(*) INTO v_current_count
    FROM enrollments
    WHERE course_id = NEW.course_id AND batch_year = NEW.batch_year;

    -- Invariant: Maximum batch capacity is 30 students:
    IF v_current_count &ge; 30 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'CAPACITY_EXCEEDED: Maximum 30 students permitted per batch!',
            MYSQL_ERRNO  = 50001,
            SCHEMA_NAME  = 'barrackpore_academy',
            TABLE_NAME   = 'enrollments',
            COLUMN_NAME  = 'course_id';
    END IF;
END //

DELIMITER ;

-- Test 31st Student Enrollment:
-- INSERT INTO enrollments (student_id, course_id, batch_year) VALUES (131, 'REACT-101', 2026);
-- 🚨 ERROR 50001 (45000): CAPACITY_EXCEEDED: Maximum 30 students permitted per batch!`,
      resultRows: [
        { id: "Student 31 (Excess)", targetCourse: "REACT-101 (2026)", conditionTest: "v_current_count (30) >= 30", signalAction: "SIGNAL SQLSTATE '45000'", customErrNo: "50001", clientOutcome: "💥 Transaction Aborted (Capacity Full)", status: "Rejected Cleanly" },
      ],
      explanation:
        "When student 31 attempts to enroll, the `BEFORE INSERT` trigger raises `SIGNAL SQLSTATE '45000'`, aborting the `INSERT` immediately and returning a custom error message without creating orphaned records.",
    },
    student_age_validation_procedure: {
      title: "2. Age Pre-Validation Guard: Procedure Validation with Custom Error",
      badge: "Age Guard",
      badgeColor: "emerald",
      sqlQuery: `-- Procedural Pre-Validation with Structured SIGNAL:
DELIMITER //

CREATE PROCEDURE sp_register_minor_applicant(
    IN p_name VARCHAR(100),
    IN p_birth_date DATE
)
BEGIN
    DECLARE v_age_years INT;

    -- Calculate age in years:
    SET v_age_years = TIMESTAMPDIFF(YEAR, p_birth_date, CURDATE());

    -- Business Rule: Applicant must be at least 16 years old:
    IF v_age_years < 16 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = CONCAT('AGE_VIOLATION: Applicant is only ', v_age_years, ' years old! Minimum required age is 16.'),
            MYSQL_ERRNO  = 50002;
    END IF;

    -- If valid, proceed to insert:
    INSERT INTO students (name, birth_date, registered_at) 
    VALUES (p_name, p_birth_date, NOW());
END //

DELIMITER ;`,
      resultRows: [
        { id: "Applicant Age 14", targetCourse: "Admission Check", conditionTest: "v_age_years (14) < 16", signalAction: "SIGNAL SQLSTATE '45000'", customErrNo: "50002", clientOutcome: "💥 AGE_VIOLATION: Minimum age 16", status: "Rejected Cleanly" },
      ],
      explanation:
        "`SIGNAL` allows dynamic string concatenation in `MESSAGE_TEXT`, providing informative, contextual feedback to applicants (e.g. 'Applicant is only 14 years old!').",
    },
    overdraft_balance_guard: {
      title: "3. Financial Overdraft Guard: Preventing Negative Balances",
      badge: "Balance Guard",
      badgeColor: "amber",
      sqlQuery: `-- Preventing Negative Balances via BEFORE UPDATE Trigger SIGNAL:
DELIMITER //

CREATE TRIGGER trg_guard_negative_balance_before_update
BEFORE UPDATE ON student_ledgers
FOR EACH ROW
BEGIN
    -- Invariant: Ledger balance must never fall below zero:
    IF NEW.outstanding_balance < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'OVERDRAFT_PROHIBITED: Outstanding balance cannot be negative!',
            MYSQL_ERRNO  = 50003,
            TABLE_NAME   = 'student_ledgers',
            COLUMN_NAME  = 'outstanding_balance';
    END IF;
END //

DELIMITER ;`,
      resultRows: [
        { id: "Balance ₹-5,000", targetCourse: "Ledger Update", conditionTest: "NEW.balance < 0", signalAction: "SIGNAL SQLSTATE '45000'", customErrNo: "50003", clientOutcome: "💥 OVERDRAFT_PROHIBITED", status: "Rejected Cleanly" },
      ],
      explanation:
        "Guarding column updates with `SIGNAL` prevents invalid negative balances from ever persisting on disk, even if an application bug attempts an improper deduction.",
    },
    named_condition_signal_dispatch: {
      title: "4. Named Condition SIGNAL: Clean Self-Documenting Declarations",
      badge: "Named Condition",
      badgeColor: "cyan",
      sqlQuery: `-- Declaring Named Condition Aliases for SIGNAL Exceptions:
DELIMITER //

CREATE PROCEDURE sp_named_condition_signal_demo(
    IN p_score INT
)
BEGIN
    -- Declare symbolic named condition alias:
    DECLARE score_out_of_range CONDITION FOR SQLSTATE '45000';

    IF p_score < 0 OR p_score > 100 THEN
        SIGNAL score_out_of_range
        SET MESSAGE_TEXT = 'INVALID_SCORE: Exam score must be between 0 and 100!',
            MYSQL_ERRNO  = 50004;
    END IF;

    SELECT 'Score validated successfully.' AS status;
END //

DELIMITER ;`,
      resultRows: [
        { id: "Score 125", targetCourse: "Exam Entry", conditionTest: "p_score &gt; 100", signalAction: "SIGNAL score_out_of_range", customErrNo: "50004", clientOutcome: "💥 INVALID_SCORE: Must be 0-100", status: "Rejected Cleanly" },
      ],
      explanation:
        "Binding a named condition (`DECLARE score_out_of_range CONDITION FOR SQLSTATE '45000'`) makes procedural code highly readable and maintainable across large teams.",
    },
  };

  const navItems = [
    { id: "signal-concept", label: "1. The SIGNAL Statement" },
    { id: "signal-syntax", label: "2. Syntax & Attributes" },
    { id: "svg-diagrams", label: "3. Flow & Anatomy SVGs" },
    { id: "interactive-sandbox", label: "4. Live SIGNAL Workbench" },
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
            <span>Topic 5 of 12</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Custom Exceptions
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Raising Custom Exceptions with the SIGNAL Statement
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Enforce business rules and domain invariants at the database tier. Master the <code className="text-cyan-300 font-mono">SIGNAL</code> statement, user exception Class <code className="text-cyan-300 font-mono">'45000'</code>, dynamic <code className="text-cyan-300 font-mono">MESSAGE_TEXT</code> formatting, custom <code className="text-cyan-300 font-mono">MYSQL_ERRNO</code> codes, and trigger rollback propagation.
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
        {/* SECTION 1: The SIGNAL Concept */}
        <section id="signal-concept" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Why Raise Custom Database Exceptions with SIGNAL?
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The SQL equivalent of `throw new Exception()` in Java and JavaScript.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
                <span>❌</span> The Limitation of Declarative Constraints
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Standard <code className="text-rose-300 font-mono">CHECK</code> and <code className="text-rose-300 font-mono">FOREIGN KEY</code> constraints cannot evaluate multi-table queries or dynamic aggregations (e.g. counting whether a classroom batch has reached its 30-student capacity).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                <span>🛡️</span> The Power of the SIGNAL Statement
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                <code className="text-emerald-300 font-mono">SIGNAL SQLSTATE '45000'</code> allows stored procedures and triggers to evaluate complex business logic, abort invalid mutations immediately, and return custom, human-readable error messages.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Syntax & Attributes */}
        <section id="signal-syntax" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. SIGNAL Statement Syntax &amp; Diagnostic Attributes
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The complete grammar and configurable condition information items.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <pre className="p-4 bg-slate-950 rounded-xl text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
{`SIGNAL { SQLSTATE [VALUE] '45000' | condition_name }
[SET condition_information_item_name = value [, ...]];

-- Configurable Information Items:
-- • MESSAGE_TEXT  = 'Descriptive business rejection message' (Up to 1024 chars)
-- • MYSQL_ERRNO   = 50001 (Custom vendor integer error number)
-- • SCHEMA_NAME   = 'database_schema_name'
-- • TABLE_NAME    = 'target_table_name'
-- • COLUMN_NAME   = 'target_column_name'
-- • CONSTRAINT_NAME = 'custom_rule_identifier'`}
            </pre>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Execution Flow &amp; SIGNAL Anatomy
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Visualizing trigger rollback propagation and the internal components of a SIGNAL statement.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Flow */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Trigger Invariant Validation &amp; SIGNAL Rollback Pipeline
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1: Client DML */}
                  <g>
                    <rect x="20" y="30" width="160" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="100" y="55" fill="#c7d2fe" fontSize="9" fontWeight="bold" textAnchor="middle">1. Client DML</text>
                    <rect x="30" y="70" width="140" height="40" rx="4" fill="#0f172a" />
                    <text x="100" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">INSERT Enrollment</text>
                    <text x="100" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Student ID = 131</text>
                  </g>

                  {/* Step 2: Trigger Evaluation */}
                  <g>
                    <rect x="210" y="30" width="180" height="100" rx="8" fill="#451a03" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="300" y="55" fill="#fcd34d" fontSize="9" fontWeight="bold" textAnchor="middle">2. Invariant Check</text>
                    <rect x="220" y="70" width="160" height="40" rx="4" fill="#1e293b" />
                    <text x="300" y="88" fill="#fbbf24" fontSize="8 font-mono" textAnchor="middle">Capacity Check</text>
                    <text x="300" y="102" fill="#f87171" fontSize="7 font-bold" textAnchor="middle">Count (30) >= 30 ❌</text>
                  </g>

                  {/* Step 3: SIGNAL Raised */}
                  <g>
                    <rect x="420" y="30" width="190" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
                    <text x="515" y="55" fill="#fca5a5" fontSize="9" fontWeight="bold" textAnchor="middle">3. SIGNAL Raised</text>
                    <rect x="430" y="70" width="170" height="40" rx="4" fill="#1e293b" />
                    <text x="515" y="88" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">SIGNAL SQLSTATE '45000'</text>
                    <text x="515" y="102" fill="#fca5a5" fontSize="7 font-mono" textAnchor="middle">MESSAGE_TEXT = 'Full'</text>
                  </g>

                  {/* Step 4: Statement Rollback */}
                  <g>
                    <rect x="640" y="30" width="190" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="735" y="55" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">4. Atomic Rollback</text>
                    <rect x="650" y="70" width="170" height="40" rx="4" fill="#022c22" />
                    <text x="735" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">0 Rows Inserted ✅</text>
                    <text x="735" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Error Propagated to Client</text>
                  </g>

                  {/* Arrows */}
                  <path d="M 180 80 L 210 80" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 390 80 L 420 80" stroke="#f59e0b" strokeWidth="1.5" />
                  <path d="M 610 80 L 640 80" stroke="#ef4444" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* SVG 2: Anatomy */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-indigo-400 font-mono">Diagram B:</span> Anatomy of the SIGNAL Statement
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Class 45 */}
                  <g>
                    <rect x="30" y="30" width="230" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="145" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">SQLSTATE '45000'</text>
                    <rect x="45" y="70" width="200" height="40" rx="4" fill="#0f172a" />
                    <text x="145" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Class '45' Reserved</text>
                    <text x="145" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">For User Custom Errors</text>
                  </g>

                  {/* MESSAGE_TEXT */}
                  <g>
                    <rect x="290" y="30" width="270" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="425" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">MESSAGE_TEXT</text>
                    <rect x="305" y="70" width="240" height="40" rx="4" fill="#022c22" />
                    <text x="425" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Custom Rejection Explanation</text>
                    <text x="425" y="102" fill="#34d399" fontSize="7 font-mono" textAnchor="middle">Up to 1024 chars in MySQL 8.0</text>
                  </g>

                  {/* MYSQL_ERRNO */}
                  <g>
                    <rect x="590" y="30" width="230" height="100" rx="8" fill="#451a03" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="705" y="55" fill="#fcd34d" fontSize="10" fontWeight="bold" textAnchor="middle">MYSQL_ERRNO</text>
                    <rect x="605" y="70" width="200" height="40" rx="4" fill="#1e293b" />
                    <text x="705" y="88" fill="#fbbf24" fontSize="8 font-mono" textAnchor="middle">50001+ (Vendor Int)</text>
                    <text x="705" y="102" fill="#fde68a" fontSize="7 font-mono" textAnchor="middle">Custom Error Code Number</text>
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
              4. Interactive SIGNAL Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test course capacity triggers, student age validation procedures, negative balance guards, and named condition signaling live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(signalScenarios).map(([key, item]) => {
              const isActive = selectedSignalScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedSignalScenario(key)}
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
                        item.badgeColor === "emerald" && "bg-emerald-950 text-emerald-400 border border-emerald-800",
                        item.badgeColor === "amber" && "bg-amber-950 text-amber-400 border border-amber-800",
                        item.badgeColor === "cyan" && "bg-cyan-950 text-cyan-400 border border-cyan-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Test" : "○ Run SIGNAL Test"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{signalScenarios[selectedSignalScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{signalScenarios[selectedSignalScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                SIGNAL Runtime Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Custom Exception (SIGNAL) Script</span>
                <span className="text-emerald-400">Class 45 User Exception</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {signalScenarios[selectedSignalScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Trigger Case / ID</th>
                    <th className="py-3 px-4 text-white">Target Scope</th>
                    <th className="py-3 px-4 text-emerald-400">Condition Test</th>
                    <th className="py-3 px-4 text-cyan-400">SIGNAL Action</th>
                    <th className="py-3 px-4 text-amber-400">Custom ErrNo</th>
                    <th className="py-3 px-4 text-indigo-400">Client Outcome</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {signalScenarios[selectedSignalScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-mono text-white">{row.targetCourse}</td>
                      <td className="py-3 px-4 text-emerald-300 font-mono">{row.conditionTest}</td>
                      <td className="py-3 px-4 text-slate-300 font-mono">{row.signalAction}</td>
                      <td className="py-3 px-4 text-amber-300 font-mono">{row.customErrNo}</td>
                      <td className="py-3 px-4 text-indigo-300 font-sans">{row.clientOutcome}</td>
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
              Real-world classroom capacity enforcement and master record delete protection.
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
                  Eliminating Classroom Overcrowding with BEFORE INSERT Trigger SIGNAL in Barrackpore
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Coder &amp; AccoTax Academy</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui implemented strict classroom capacity governance: When students register online, a <code className="text-cyan-300 font-mono">BEFORE INSERT</code> trigger queries current batch size. If 30 seats are filled, it executes <code className="text-emerald-300 font-mono">SIGNAL SQLSTATE '45000'</code> with <code className="text-emerald-300 font-mono">MESSAGE_TEXT = 'Classroom batch is full!'</code>, guaranteeing that physical seat capacity is never exceeded!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Classroom Capacity Guard Trigger:
IF (SELECT COUNT(*) FROM enrollments WHERE batch_id = NEW.batch_id) &ge; 30 THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'BATCH_FULL: Maximum 30 students reached for this batch!',
        MYSQL_ERRNO  = 50010;
END IF;`}
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
              Avoid invalid SQLSTATE classes and always provide actionable MESSAGE_TEXT.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Attempting to SIGNAL Class 00 (Success)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Executing <code className="text-rose-300 font-mono">SIGNAL SQLSTATE '00000'</code> causes MySQL to throw Error <code className="text-rose-300 font-mono">1645</code> because Class 00 represents successful completion and cannot be signaled as an error!
              </p>
              <div className="text-xs text-slate-400">
                Fix: Always use Class <code className="text-emerald-400 font-mono">'45000'</code> for custom user exceptions!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Always Set Structured Error Numbers (50000+)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Assign unique custom error numbers (e.g. 50001, 50002) in <code className="text-emerald-400 font-mono">MYSQL_ERRNO</code> so client applications can handle specific business errors programmatically.
              </p>
              <div className="text-xs text-slate-400">
                Enables programmatic error handling in backend code.
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
              Key takeaways for Raising Custom Exceptions with SIGNAL.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> SIGNAL Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Use <code className="text-cyan-300 font-mono">SIGNAL SQLSTATE '45000'</code> for user-defined business exceptions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Always supply descriptive <code className="text-cyan-300 font-mono">MESSAGE_TEXT</code> explaining the rejection.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Assign distinct <code className="text-cyan-300 font-mono">MYSQL_ERRNO</code> codes (50000+) for each business rule.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>In triggers, <code className="text-cyan-300 font-mono">SIGNAL</code> aborts the statement and rolls back in-flight changes.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe dynamic string expressions...”</span>
                  In MySQL 8.0, you can format dynamic messages like `SET MESSAGE_TEXT = CONCAT('Invalid student age: ', v_age);`!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about delete protection...”</span>
                  Use `SIGNAL` inside `BEFORE DELETE` triggers on master tables (e.g. courses) to block deletions if historical student records depend on them!
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
              Comprehensive reference questions covering the SIGNAL statement, custom business exception generation, SQLSTATE '45000' user error classes, trigger constraint enforcement, and dynamic diagnostic attributes.
            </p>
          </div>

          <FAQTemplate
            title="SIGNAL Statement FAQs"
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
            title="Raising Custom Exceptions with SIGNAL Statement"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic5_note.txt"
          />

          <Teacher
            note="The SIGNAL statement is your primary tool for enforcing complex domain rules at the database level. When writing triggers or procedures, never let invalid business states persist: validate your invariants and raise SIGNAL SQLSTATE '45000' with a clear, descriptive MESSAGE_TEXT and a custom MYSQL_ERRNO. This guarantees that client applications receive exact, actionable error messages!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic5;
