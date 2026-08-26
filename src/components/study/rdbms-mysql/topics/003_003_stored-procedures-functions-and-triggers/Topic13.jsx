import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic13_files/topic13_questions";
import noteText from "./topic13_files/topic13_note.txt?raw";

/**
 * Topic13 – Real-World Trigger Use Cases: Automated Audit Trail Logging and Data Validation
 * Module: 003_003_stored-procedures-functions-and-triggers
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on production trigger use cases, immutable audit trail logging, cross-table constraint enforcement, denormalized summary counter synchronization, and in-flight regex data sanitization.
 */
const Topic13 = () => {
  // Interactive Simulator State
  const [selectedUseCaseScenario, setSelectedUseCaseScenario] = useState("financial_audit_trail_logging");

  const useCaseScenarios = {
    financial_audit_trail_logging: {
      title: "1. Immutable Financial Audit Trail: AFTER INSERT on Fee Payments",
      badge: "Financial Audit Trail",
      badgeColor: "emerald",
      sqlQuery: `-- AFTER INSERT: Automatically creates an immutable audit record for every fee payment:
DELIMITER //

CREATE TRIGGER trg_fee_payments_after_insert_audit
AFTER INSERT ON fee_payments
FOR EACH ROW
BEGIN
    INSERT INTO fee_payment_audit_ledger (
        payment_id,
        student_id,
        amount_paid_inr,
        payment_method,
        authorized_by_user,
        client_connection_id,
        logged_timestamp
    )
    VALUES (
        NEW.payment_id,
        NEW.student_id,
        NEW.amount_paid_inr,
        NEW.payment_mode,
        USER(),
        CONNECTION_ID(),
        NOW()
    );
END //

DELIMITER ;

-- Insert Payment &rarr; Audit record generated automatically with zero app code:
INSERT INTO fee_payments (student_id, amount_paid_inr, payment_mode) 
VALUES (101, 15000.00, 'UPI_RAZORPAY');`,
      resultRows: [
        { id: "PAY-501", useCase: "Audit Trail Logging", targetTable: "fee_payments", triggerAction: "INSERT into fee_payment_audit_ledger", resultImpact: "Immutable record created with USER() & NOW()", status: "Audited Automatically" },
      ],
      explanation:
        "Database-level audit triggers ensure that financial payment records are logged automatically, even if payments are inserted via direct SQL scripts, CLI tools, or external services.",
    },
    course_capacity_guard: {
      title: "2. Cross-Table Course Seat Capacity Guard: BEFORE INSERT with SIGNAL",
      badge: "Capacity Constraint",
      badgeColor: "rose",
      sqlQuery: `-- BEFORE INSERT: Enforces that lab course enrollments do not exceed 30 seats:
DELIMITER //

CREATE TRIGGER trg_enrollments_before_insert_capacity_check
BEFORE INSERT ON enrollments
FOR EACH ROW
BEGIN
    DECLARE v_current_enrolled INT DEFAULT 0;
    DECLARE v_max_capacity INT DEFAULT 30;
    
    -- Check existing active student count for this course:
    SELECT COUNT(*) INTO v_current_enrolled
    FROM enrollments 
    WHERE course_id = NEW.course_id;
    
    -- Guardrail: Abort transaction if capacity is reached:
    IF v_current_enrolled &ge; v_max_capacity THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'CAPACITY OVERFLOW: Course has reached its maximum quota of 30 seats!';
    END IF;
END //

DELIMITER ;`,
      resultRows: [
        { id: "Seat 1–30", useCase: "Capacity Check", targetTable: "enrollments (Course 5)", triggerAction: "v_current < 30 (Allowed)", resultImpact: "Enrollment Accepted", status: "Enrolled" },
        { id: "Seat 31 (Overflow)", useCase: "Capacity Check", targetTable: "enrollments (Course 5)", triggerAction: "v_current >= 30 (Blocked)", resultImpact: "SIGNAL SQLSTATE '45000' Raised", status: "💥 Aborted & Rolled Back" },
      ],
      explanation:
        "Standard `CHECK` constraints cannot query other tables. A `BEFORE INSERT` trigger queries existing enrollments and uses `SIGNAL` to enforce cross-table capacity limits.",
    },
    summary_counter_sync: {
      title: "3. Real-Time Denormalized Summary Counter Synchronization",
      badge: "Counter Sync",
      badgeColor: "cyan",
      sqlQuery: `-- Maintaining real-time active student counters without slow COUNT(*) queries:
DELIMITER //

-- Increment on student enrollment:
CREATE TRIGGER trg_sync_dept_counter_insert
AFTER INSERT ON students
FOR EACH ROW
BEGIN
    UPDATE departments SET total_students = total_students + 1 WHERE dept_id = NEW.dept_id;
END //

-- Decrement on student withdrawal:
CREATE TRIGGER trg_sync_dept_counter_delete
AFTER DELETE ON students
FOR EACH ROW
BEGIN
    UPDATE departments SET total_students = total_students - 1 WHERE dept_id = OLD.dept_id;
END //

DELIMITER ;`,
      resultRows: [
        { id: "INSERT Student", useCase: "Summary Sync", targetTable: "departments", triggerAction: "total_students + 1 (NEW.dept_id)", resultImpact: "Instant O(1) count read", status: "Counter Incremented" },
        { id: "DELETE Student", useCase: "Summary Sync", targetTable: "departments", triggerAction: "total_students - 1 (OLD.dept_id)", resultImpact: "Instant O(1) count read", status: "Counter Decremented" },
      ],
      explanation:
        "Maintaining denormalized summary counters via triggers allows frontend dashboards to read department sizes instantly in $O(1)$ time without scanning millions of rows with `COUNT(*)`.",
    },
    in_flight_data_sanitization: {
      title: "4. In-Flight Data Sanitization & Indian Mobile (+91) Normalization",
      badge: "Data Sanitization",
      badgeColor: "amber",
      sqlQuery: `-- BEFORE INSERT: Normalizes Indian phone numbers and sanitizes email casing:
DELIMITER //

CREATE TRIGGER trg_sanitize_contact_info
BEFORE INSERT ON students
FOR EACH ROW
BEGIN
    -- Strip non-digits and normalize 10-digit number to Indian +91 format:
    SET NEW.phone = CONCAT('+91 ', RIGHT(REGEXP_REPLACE(NEW.phone, '[^0-9]', ''), 10));
    
    -- Force email to lowercase and trim spaces:
    SET NEW.email = LOWER(TRIM(NEW.email));
END //

DELIMITER ;

-- Test with raw formatted string:
INSERT INTO students (first_name, phone, email) 
VALUES ('Mamata', '098300-11223', '  MAMATA@BKP.EDU  ');
-- Saved cleanly as: '+91 9830011223' and 'mamata@bkp.edu'!`,
      resultRows: [
        { id: "Raw Input", useCase: "Regex Sanitization", targetTable: "students", triggerAction: "Strip non-digits & Prepend +91", resultImpact: "Saved as '+91 9830011223'", status: "Sanitized Cleanly" },
      ],
      explanation:
        "`BEFORE INSERT` triggers use regex string functions to standardize phone formats and email casings before they are committed to database storage.",
    },
  };

  const navItems = [
    { id: "use-case-overview", label: "1. Four Enterprise Patterns" },
    { id: "audit-architecture", label: "2. Trigger vs Middleware" },
    { id: "svg-diagrams", label: "3. Enterprise Patterns & Architecture SVGs" },
    { id: "interactive-sandbox", label: "4. Live Use Cases Workbench" },
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
            <span>Topic 13 of 16</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Enterprise Patterns
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Real-World Trigger Use Cases: Audit Logs &amp; Validation
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Implement production-grade database defense patterns. Master automated immutable audit trail logging, cross-table business rule validation with <code className="text-cyan-300 font-mono">SIGNAL</code>, real-time denormalized counter synchronization, and in-flight regex data sanitization.
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
        {/* SECTION 1: Overview */}
        <section id="use-case-overview" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Four Enterprise Trigger Architectural Patterns
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The primary production use cases for event-driven server-side triggers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-emerald-400 font-mono">1. Immutable Audit Logging</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Captures every INSERT, UPDATE, and DELETE with user metadata and JSON state diffs into append-only tables.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-rose-400 font-mono">2. Cross-Table Constraints</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Enforces business rules that standard CHECK constraints cannot handle (e.g. course seat capacity limits).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-cyan-400 font-mono">3. Real-Time Counter Sync</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Maintains summary counters (e.g. department student counts) in $O(1)$ time without slow <code className="text-cyan-300 font-mono">COUNT(*)</code> scans.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-amber-400 font-mono">4. In-Flight Sanitization</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Normalizes telephone numbers, trims whitespace, and converts email addresses to lowercase before storage.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Architecture */}
        <section id="audit-architecture" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Database Triggers vs Application Middleware
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why database-level triggers provide unbypassable compliance security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                <span>🛡️</span> Database Trigger Audit Logs (Unbypassable)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Executes at the core storage engine. Captures all modifications regardless of whether the query originated from the Web App, Mobile API, direct SQL scripts, CLI tools, or migration jobs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
                <span>⚠️</span> Application Middleware Logging (Bypassable)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Logs only HTTP requests that pass through the specific web backend. Direct database admin queries, background cron jobs, or other microservices bypass application middleware entirely!
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Patterns &amp; Unbypassable Enforcement
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing enterprise trigger patterns with database-level security enforcement.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: 4 Patterns */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> The 4 Enterprise Database Trigger Patterns
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Pattern 1 */}
                  <g>
                    <rect x="20" y="30" width="190" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="115" y="55" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">1. Audit Trail Logging</text>
                    <rect x="30" y="70" width="170" height="40" rx="4" fill="#022c22" />
                    <text x="115" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">AFTER INSERT/UPDATE</text>
                    <text x="115" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Immutable History Tables</text>
                  </g>

                  {/* Pattern 2 */}
                  <g>
                    <rect x="230" y="30" width="190" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="325" y="55" fill="#fca5a5" fontSize="9" fontWeight="bold" textAnchor="middle">2. Constraint Validation</text>
                    <rect x="240" y="70" width="170" height="40" rx="4" fill="#1e293b" />
                    <text x="325" y="88" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">BEFORE INSERT (SIGNAL)</text>
                    <text x="325" y="102" fill="#fca5a5" fontSize="7 font-bold" textAnchor="middle">Cross-Table Capacity Checks</text>
                  </g>

                  {/* Pattern 3 */}
                  <g>
                    <rect x="440" y="30" width="190" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="535" y="55" fill="#c7d2fe" fontSize="9" fontWeight="bold" textAnchor="middle">3. Summary Counter Sync</text>
                    <rect x="450" y="70" width="170" height="40" rx="4" fill="#0f172a" />
                    <text x="535" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">AFTER INSERT / DELETE</text>
                    <text x="535" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Real-Time O(1) Dashboard Reads</text>
                  </g>

                  {/* Pattern 4 */}
                  <g>
                    <rect x="650" y="30" width="180" height="100" rx="8" fill="#451a03" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="740" y="55" fill="#fcd34d" fontSize="9" fontWeight="bold" textAnchor="middle">4. In-Flight Sanitization</text>
                    <rect x="660" y="70" width="160" height="40" rx="4" fill="#1c1917" />
                    <text x="740" y="88" fill="#fde68a" fontSize="8 font-mono" textAnchor="middle">BEFORE INSERT/UPDATE</text>
                    <text x="740" y="102" fill="#f59e0b" fontSize="7 font-bold" textAnchor="middle">SET NEW.phone = +91 ...</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* SVG 2: Unbypassable Security */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-amber-400 font-mono">Diagram B:</span> Database-Level Trigger Defense vs Middleware Gaps
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* All Traffic Routes */}
                  <g>
                    <rect x="30" y="30" width="370" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="215" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">All Entry Points (Web, Mobile, Admin, ETL)</text>
                    <rect x="45" y="70" width="340" height="40" rx="4" fill="#0f172a" />
                    <text x="215" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">React App ↔ Python API ↔ DBeaver ↔ Direct CLI</text>
                    <text x="215" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Every entry point must touch database engine</text>
                  </g>

                  {/* Trigger Gatekeeper */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="630" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">MySQL Trigger Gatekeeper (Unbypassable)</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#022c22" />
                    <text x="630" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Guarantees 100% Audit Logging &amp; Validation</text>
                    <text x="630" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Zero Unaudited Backdoor Changes Allowed</text>
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
              4. Interactive Trigger Use Cases Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test financial audit trails, course capacity guards, summary counter sync, and in-flight regex sanitization live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(useCaseScenarios).map(([key, item]) => {
              const isActive = selectedUseCaseScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedUseCaseScenario(key)}
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
                    {isActive ? "● Active Use Case" : "○ Run Use Case Test"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{useCaseScenarios[selectedUseCaseScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{useCaseScenarios[selectedUseCaseScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Production Pattern Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Production Trigger DDL &amp; Execution Script</span>
                <span className="text-emerald-400">Enterprise Database Pattern</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {useCaseScenarios[selectedUseCaseScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Scenario / Key</th>
                    <th className="py-3 px-4 text-white">Pattern Type</th>
                    <th className="py-3 px-4 text-emerald-400">Target Table</th>
                    <th className="py-3 px-4 text-cyan-400">Trigger Action Executed</th>
                    <th className="py-3 px-4 text-amber-400">Resulting Business Impact</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {useCaseScenarios[selectedUseCaseScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.useCase}</td>
                      <td className="py-3 px-4 text-emerald-300 font-mono">{row.targetTable}</td>
                      <td className="py-3 px-4 text-slate-300 font-sans">{row.triggerAction}</td>
                      <td className="py-3 px-4 text-amber-300 font-sans">{row.resultImpact}</td>
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
              Real-world financial ledger protection and seat capacity guards in Barrackpore.
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
                  Full Financial Ledger Protection &amp; Audit Trail Suite at Barrackpore Academy
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Academy Accounts</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui architected a comprehensive trigger suite: An <code className="text-emerald-300 font-mono">AFTER INSERT</code> trigger logs every fee transaction to an append-only audit ledger with <code className="text-cyan-300 font-mono">USER()</code> and <code className="text-cyan-300 font-mono">NOW()</code>, while a <code className="text-rose-300 font-mono">BEFORE UPDATE</code> trigger rejects any operation that would reduce student balances below zero via <code className="text-rose-400 font-mono">SIGNAL</code>!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Financial Defense Suite:
CREATE TRIGGER trg_audit_payments
AFTER INSERT ON fee_payments
FOR EACH ROW
BEGIN
    INSERT INTO fee_payment_audit (payment_id, amount, paid_by, created_at)
    VALUES (NEW.payment_id, NEW.amount_paid_inr, USER(), NOW());
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
              Avoid synchronous lock bottlenecks and hidden database magic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Synchronous HTTP / Heavy Work in Triggers
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Attempting external HTTP calls or heavy loops inside triggers holds database row locks and introduces timeout crashes during active transactions.
              </p>
              <div className="text-xs text-slate-400">
                Fix: Insert an event into a <code className="text-emerald-400 font-mono">notification_queue</code> table for async worker processing!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Document Database-Level Side Effects
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Always maintain thorough documentation and schema migration tracking for database triggers to avoid "Hidden Magic" bugs that confuse application developers.
              </p>
              <div className="text-xs text-slate-400">
                Maintains architectural transparency.
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
              Key takeaways for Real-World Trigger Use Cases.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Real-World Trigger Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Use <code className="text-cyan-300 font-mono">AFTER INSERT/UPDATE</code> for immutable audit logging.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Use <code className="text-cyan-300 font-mono">BEFORE INSERT/UPDATE</code> with <code className="text-cyan-300 font-mono">SIGNAL</code> for cross-table constraints.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Use triggers to maintain denormalized summary counters in $O(1)$ time.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Never perform slow external synchronous tasks inside triggers.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe unbypassable security...”</span>
                  Triggers enforce business rules at the lowest relational layer, ensuring complete compliance even when direct SQL scripts are run in production!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about async queues...”</span>
                  Instead of sending SMS/emails from triggers, write to a `notification_queue` table and let a Node.js daemon handle API dispatching!
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
              Comprehensive reference questions covering production trigger use cases, immutable audit trail logging, cross-table constraint validation, summary counter synchronization, and in-flight regex data sanitization.
            </p>
          </div>

          <FAQTemplate
            title="Trigger Use Cases FAQs"
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
            title="Real-World Trigger Use Cases: Automated Audit Trail Logging and Data Validation"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic13_note.txt"
          />

          <Teacher
            note="Database triggers shine brightest when enforcing data invariants that must NEVER be bypassed. Use AFTER INSERT and AFTER UPDATE triggers to create immutable audit trail logs, use BEFORE triggers with SIGNAL to prevent seat capacity overruns and invalid balances, and maintain denormalized summary counters in real time. Keep trigger execution ultra-lightweight to protect transaction throughput!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic13;
