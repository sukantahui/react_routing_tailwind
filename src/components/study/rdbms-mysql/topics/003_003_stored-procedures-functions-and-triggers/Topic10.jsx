import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic10_files/topic10_questions";
import noteText from "./topic10_files/topic10_note.txt?raw";

/**
 * Topic10 – Database Triggers Overview and Execution Timing (BEFORE vs AFTER)
 * Module: 003_003_stored-procedures-functions-and-triggers
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on database triggers, execution timing (BEFORE vs AFTER), NEW/OLD record manipulation, data sanitization, audit logging, and transactional atomicity.
 */
const Topic10 = () => {
  // Interactive Simulator State
  const [selectedTriggerScenario, setSelectedTriggerScenario] = useState("before_insert_sanitization");

  const triggerScenarios = {
    before_insert_sanitization: {
      title: "1. BEFORE INSERT Trigger: Data Sanitization & Case Normalization",
      badge: "BEFORE INSERT (Sanitize)",
      badgeColor: "emerald",
      sqlQuery: `-- BEFORE INSERT: Sanitizes incoming email, phone, and name BEFORE writing to storage:
DELIMITER //

CREATE TRIGGER trg_students_before_insert
BEFORE INSERT ON students
FOR EACH ROW
BEGIN
    -- 1. Normalize Email to lowercase & trim whitespace:
    SET NEW.email = LOWER(TRIM(NEW.email));
    
    -- 2. Format names to Proper Case / Uppercase:
    SET NEW.first_name = CONCAT(UPPER(SUBSTRING(TRIM(NEW.first_name), 1, 1)), 
                                LOWER(SUBSTRING(TRIM(NEW.first_name), 2)));
                                
    -- 3. Set default registration timestamp if missing:
    IF NEW.registered_at IS NULL THEN
        SET NEW.registered_at = NOW();
    END IF;
END //

DELIMITER ;

-- Test Insert with messy user input:
INSERT INTO students (first_name, email) VALUES ('  mAMATA  ', '   MAMATA.HUI@GMAIL.COM  ');
SELECT first_name, email, registered_at FROM students WHERE email = 'mamata.hui@gmail.com';`,
      resultRows: [
        { id: "Messy Input", rawVal: "'  mAMATA  ', ' MAMATA.HUI@GMAIL.COM '", triggerStage: "BEFORE INSERT", sanitizedVal: "'Mamata', 'mamata.hui@gmail.com'", auditAction: "Modified in Memory", status: "Cleaned & Stored" },
      ],
      explanation:
        "The `BEFORE INSERT` trigger intercepts incoming data *before* it reaches the storage engine, automatically trimming whitespace, converting email to lowercase, and capitalizing names.",
    },
    after_insert_audit_logging: {
      title: "2. AFTER INSERT Trigger: Automated Admission Audit Logging",
      badge: "AFTER INSERT (Audit Log)",
      badgeColor: "cyan",
      sqlQuery: `-- AFTER INSERT: Automatically logs registration event to audit trail table:
DELIMITER //

CREATE TRIGGER trg_students_after_insert
AFTER INSERT ON students
FOR EACH ROW
BEGIN
    -- Record admission event into immutable audit trail:
    INSERT INTO student_admission_audit_log (
        student_id,
        student_name,
        registered_email,
        admitted_by_user,
        logged_timestamp
    )
    VALUES (
        NEW.student_id,
        CONCAT(NEW.first_name, ' ', NEW.last_name),
        NEW.email,
        USER(),
        NOW()
    );
END //

DELIMITER ;

-- Insert new student → Trigger automatically fires and creates audit record!
INSERT INTO students (first_name, last_name, email, dept_id)
VALUES ('Abhronila', 'Saha', 'abhronila.saha@gmail.com', 2);`,
      resultRows: [
        { id: "STU-103", rawVal: "Abhronila Saha (IT)", triggerStage: "AFTER INSERT", sanitizedVal: "Committed to students table", auditAction: "INSERT into student_admission_audit_log", status: "Audited Automatically" },
      ],
      explanation:
        "The `AFTER INSERT` trigger fires *after* the student record is committed to disk, automatically inserting an immutable audit entry with the new `student_id`, database operator, and timestamp.",
    },
    before_update_balance_validation: {
      title: "3. BEFORE UPDATE Trigger: Defensive Financial Validation",
      badge: "BEFORE UPDATE (Validate)",
      badgeColor: "amber",
      sqlQuery: `-- BEFORE UPDATE: Guards against corrupt negative balances using SIGNAL:
DELIMITER //

CREATE TRIGGER trg_student_ledger_before_update
BEFORE UPDATE ON student_ledger
FOR EACH ROW
BEGIN
    -- Prevent balance from dropping below zero (Overdraft forbidden):
    IF NEW.outstanding_balance_inr < 0.00 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'FATAL: Student fee ledger balance cannot be negative!';
    END IF;
    
    -- Track update timestamp:
    SET NEW.last_updated_at = NOW();
END //

DELIMITER ;

-- Attempting an invalid debit operation:
-- UPDATE student_ledger SET outstanding_balance_inr = -500.00 WHERE student_id = 101;
-- 🚨 ERROR 1644 (45000): FATAL: Student fee ledger balance cannot be negative!`,
      resultRows: [
        { id: "Valid Update", rawVal: "Balance: ₹15,000 → ₹5,000", triggerStage: "BEFORE UPDATE", sanitizedVal: "Positive Balance Allowed", auditAction: "last_updated_at = NOW()", status: "Updated Successfully" },
        { id: "Invalid Negative", rawVal: "Balance: ₹5,000 → -₹500", triggerStage: "BEFORE UPDATE", sanitizedVal: "Negative Balance Blocked", auditAction: "SIGNAL SQLSTATE '45000'", status: "💥 Aborted & Rolled Back" },
      ],
      explanation:
        "`BEFORE UPDATE` triggers inspect the modified `NEW.outstanding_balance_inr`. If the balance drops below zero, `SIGNAL` raises an exception that halts and rolls back the statement.",
    },
    transactional_atomicity_rollback: {
      title: "4. Transactional Atomicity: Outer DML Rollback Propagation",
      badge: "Atomic Atomicity",
      badgeColor: "rose",
      sqlQuery: `-- Demonstrating that Trigger failures roll back the entire parent transaction:
-- When a trigger throws an error via SIGNAL:
-- 1. Trigger execution halts immediately.
-- 2. The outer INSERT / UPDATE / DELETE statement is aborted.
-- 3. Any prior changes within the same transaction are completely rolled back!
-- 4. Database tables remain in a pristine, uncorrupted state.`,
      resultRows: [
        { id: "Parent DML Query", rawVal: "UPDATE student_ledger ...", triggerStage: "Trigger Boundary", sanitizedVal: "Fires BEFORE UPDATE", auditAction: "Trigger raises SIGNAL", status: "Parent DML Rolled Back" },
        { id: "Audit Trail Table", rawVal: "INSERT audit record", triggerStage: "Cascade Boundary", sanitizedVal: "Not Committed", auditAction: "Rollback propagates", status: "Pristine State Preserved" },
      ],
      explanation:
        "Triggers execute within the exact same transaction boundary as the invoking DML query. If a trigger aborts via `SIGNAL`, the parent statement is completely undone.",
    },
  };

  const navItems = [
    { id: "trigger-concept", label: "1. Trigger Anatomy" },
    { id: "before-vs-after", label: "2. BEFORE vs AFTER Timing" },
    { id: "svg-diagrams", label: "3. Pipeline & Atomicity SVGs" },
    { id: "interactive-sandbox", label: "4. Live Trigger Workbench" },
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
            <span>Module 003_003</span>
            <span>•</span>
            <span>Topic 10 of 16</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Event-Driven Architecture
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Database Triggers &amp; Execution Timing (BEFORE vs AFTER)
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Automate event-driven data integrity and compliance in MySQL. Master <code className="text-cyan-300 font-mono">BEFORE</code> vs <code className="text-cyan-300 font-mono">AFTER</code> execution timing, <code className="text-cyan-300 font-mono">NEW</code> record mutations, automated audit logging, and transactional rollback propagation.
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
        {/* SECTION 1: Trigger Concept */}
        <section id="trigger-concept" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Database Trigger Anatomy &amp; Syntax
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The structure of event-driven procedural routines attached to database tables.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <pre className="p-4 bg-slate-950 rounded-xl text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
{`DELIMITER //

CREATE TRIGGER trigger_name
{ BEFORE | AFTER } { INSERT | UPDATE | DELETE }
ON target_table_name
FOR EACH ROW
BEGIN
    -- Procedural validation, sanitization, or audit logging
END //

DELIMITER ;`}
            </pre>
          </div>
        </section>

        {/* SECTION 2: BEFORE vs AFTER */}
        <section id="before-vs-after" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. BEFORE vs AFTER Execution Timing
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing pre-storage row mutation with post-storage audit propagation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400">1. BEFORE Triggers (Pre-Storage)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Fires *prior* to writing the row to table storage. <strong>CAN modify incoming values</strong> (<code className="text-emerald-300 font-mono">SET NEW.email = LOWER(NEW.email)</code>) and abort invalid statements with <code className="text-emerald-300 font-mono">SIGNAL</code>.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-cyan-400">2. AFTER Triggers (Post-Storage)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Fires *after* the row is successfully committed to table storage. <code className="text-rose-400 font-mono">NEW</code> values are <strong>read-only</strong>. Ideal for writing immutable audit logs to separate tables.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Execution Pipeline &amp; Atomicity
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing trigger execution stages with transactional rollback propagation.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Execution Pipeline */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Trigger Execution Pipeline (BEFORE $\to$ Storage $\to$ AFTER)
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1: DML Query */}
                  <g>
                    <rect x="20" y="30" width="170" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="105" y="55" fill="#c7d2fe" fontSize="9" fontWeight="bold" textAnchor="middle">1. DML Query Event</text>
                    <rect x="30" y="70" width="150" height="40" rx="4" fill="#0f172a" />
                    <text x="105" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">INSERT / UPDATE</text>
                    <text x="105" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Submits raw row payload</text>
                  </g>

                  {/* Step 2: BEFORE Trigger */}
                  <g>
                    <rect x="220" y="30" width="190" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="315" y="55" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">2. BEFORE Trigger</text>
                    <rect x="230" y="70" width="170" height="40" rx="4" fill="#022c22" />
                    <text x="315" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">SET NEW.col = val</text>
                    <text x="315" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Sanitize &amp; Validate Data</text>
                  </g>

                  {/* Step 3: Storage Engine */}
                  <g>
                    <rect x="440" y="30" width="180" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="530" y="55" fill="#c7d2fe" fontSize="9" fontWeight="bold" textAnchor="middle">3. InnoDB Storage</text>
                    <rect x="450" y="70" width="160" height="40" rx="4" fill="#0f172a" />
                    <text x="530" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Writes Row to Disk</text>
                    <text x="530" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Assigns AUTO_INCREMENT</text>
                  </g>

                  {/* Step 4: AFTER Trigger */}
                  <g>
                    <rect x="650" y="30" width="180" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="740" y="55" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">4. AFTER Trigger</text>
                    <rect x="660" y="70" width="160" height="40" rx="4" fill="#022c22" />
                    <text x="740" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">INSERT INTO audit_log</text>
                    <text x="740" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Immutable Audit Log</text>
                  </g>

                  {/* Arrows */}
                  <path d="M 190 80 L 220 80" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 410 80 L 440 80" stroke="#10b981" strokeWidth="2" />
                  <path d="M 620 80 L 650 80" stroke="#818cf8" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            {/* SVG 2: Transactional Atomicity */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-rose-400 font-mono">Diagram B:</span> Transactional Atomicity: SIGNAL Exception Abort &amp; Rollback
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Successful Commit */}
                  <g>
                    <rect x="30" y="30" width="370" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="215" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">✅ Valid Trigger (Atomic Commit)</text>
                    <rect x="45" y="70" width="340" height="40" rx="4" fill="#022c22" />
                    <text x="215" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">BEFORE passed → Stored to Disk → AFTER logged</text>
                    <text x="215" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Transaction Commits Cleanly</text>
                  </g>

                  {/* Failed Abort */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="630" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">❌ Trigger Error / SIGNAL (Atomic Rollback)</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#1e293b" />
                    <text x="630" y="88" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">SIGNAL SQLSTATE '45000' raised in BEFORE trigger! 💥</text>
                    <text x="630" y="102" fill="#fca5a5" fontSize="7 font-bold" textAnchor="middle">Entire Outer DML Statement is Rolled Back!</text>
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
              4. Interactive Database Triggers Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test BEFORE INSERT sanitization, AFTER INSERT audit logging, BEFORE UPDATE validations, and transactional rollback propagation live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(triggerScenarios).map(([key, item]) => {
              const isActive = selectedTriggerScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedTriggerScenario(key)}
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
                    {isActive ? "● Active Trigger" : "○ Run Trigger Test"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{triggerScenarios[selectedTriggerScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{triggerScenarios[selectedTriggerScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Trigger Event Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Trigger DDL &amp; DML Event</span>
                <span className="text-emerald-400">Row-Level FOR EACH ROW</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {triggerScenarios[selectedTriggerScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Trigger Case / ID</th>
                    <th className="py-3 px-4 text-white">Raw DML Input Value</th>
                    <th className="py-3 px-4 text-emerald-400">Trigger Timing Stage</th>
                    <th className="py-3 px-4 text-cyan-400">Transformed / Sanitized State</th>
                    <th className="py-3 px-4 text-indigo-400">Trigger Action Executed</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {triggerScenarios[selectedTriggerScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.rawVal}</td>
                      <td className="py-3 px-4 text-emerald-300 font-mono">{row.triggerStage}</td>
                      <td className="py-3 px-4 text-slate-300 font-mono">{row.sanitizedVal}</td>
                      <td className="py-3 px-4 text-indigo-300 font-sans">{row.auditAction}</td>
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
              Real-world email sanitization and automated audit trail logging.
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
                  Automated Admission Compliance Audit Trail Logging in Barrackpore
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Academy ERP</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui automated compliance auditing: An <code className="text-emerald-300 font-mono">AFTER INSERT</code> trigger on the student registration table logs every student admission event into an immutable audit table with <code className="text-cyan-300 font-mono">USER()</code> and <code className="text-cyan-300 font-mono">NOW()</code> metadata. If any audit insert fails, the student registration rolls back automatically to prevent untracked enrollments!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Automated Admission Audit Trigger:
CREATE TRIGGER trg_audit_admissions
AFTER INSERT ON students
FOR EACH ROW
BEGIN
    INSERT INTO student_admission_audit (student_id, student_email, created_by, created_at)
    VALUES (NEW.student_id, NEW.email, USER(), NOW());
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
              Avoid mutating table recursion and modifying NEW in AFTER triggers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Mutating NEW inside AFTER Triggers
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Attempting <code className="text-rose-300 font-mono">SET NEW.col = val;</code> inside an `AFTER` trigger throws a syntax error because the row has already been committed to disk.
              </p>
              <div className="text-xs text-slate-400">
                Fix: Perform all value mutations inside <code className="text-emerald-400 font-mono">BEFORE</code> triggers!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Avoid Heavy Synchronous Work in Triggers
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Keep trigger logic ultra-lightweight. Heavy table scans or loops inside row triggers hold locks and slow down every concurrent DML statement on the table.
              </p>
              <div className="text-xs text-slate-400">
                Maintains peak OLTP database throughput.
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
              Key takeaways for Database Triggers &amp; Execution Timing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Database Triggers Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Use <code className="text-cyan-300 font-mono">BEFORE</code> triggers for data sanitization and constraint validation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Use <code className="text-cyan-300 font-mono">AFTER</code> triggers for automated audit logging and notifications.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Use <code className="text-cyan-300 font-mono">SIGNAL SQLSTATE '45000'</code> to defensively abort invalid DML queries.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Remember that triggers execute atomically within the parent transaction.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe multiple triggers in MySQL 8.0...”</span>
                  MySQL 8.0 allows multiple triggers on the same table and event! Use `PRECEDES` or `FOLLOWS` to define their exact execution sequence!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about table locking recursion...”</span>
                  Never write an `UPDATE my_table` inside a trigger on `my_table` itself (Error 1442). In BEFORE triggers, use `SET NEW.col = val` instead!
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
              Comprehensive reference questions covering database triggers, BEFORE vs AFTER execution timing, NEW/OLD record manipulation, data sanitization, audit logging, and transactional atomicity.
            </p>
          </div>

          <FAQTemplate
            title="Database Triggers &amp; Timing FAQs"
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
            title="Database Triggers Overview and Execution Timing (BEFORE vs AFTER)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic10_note.txt"
          />

          <Teacher
            note="Database triggers provide automated, event-driven guardrails for your relational tables. Always choose the timing carefully: BEFORE triggers execute before writing to disk and can modify incoming NEW values (ideal for sanitizing emails and enforcing constraints with SIGNAL), while AFTER triggers execute after the row is committed (ideal for automated audit trail logging). Remember that triggers execute atomically within the outer DML transaction!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic10;
