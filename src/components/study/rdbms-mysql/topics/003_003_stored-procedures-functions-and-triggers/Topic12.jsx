import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic12_files/topic12_questions";
import noteText from "./topic12_files/topic12_note.txt?raw";

/**
 * Topic12 – Referencing Modified Data using NEW and OLD Pseudo-Records
 * Module: 003_003_stored-procedures-functions-and-triggers
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on NEW and OLD pseudo-records, attribute access rules, delta calculations, JSON audit trail snapshots, immutable column protection, and NULL-safe change detection.
 */
const Topic12 = () => {
  // Interactive Simulator State
  const [selectedPseudoScenario, setSelectedPseudoScenario] = useState("salary_delta_auditing");

  const pseudoScenarios = {
    salary_delta_auditing: {
      title: "1. Salary Revision Delta Auditing: (NEW.salary - OLD.salary)",
      badge: "Delta Math",
      badgeColor: "emerald",
      sqlQuery: `-- AFTER UPDATE: Computes salary increment delta using OLD and NEW values:
DELIMITER //

CREATE TRIGGER trg_faculty_salary_audit
AFTER UPDATE ON faculty_salaries
FOR EACH ROW
BEGIN
    -- Only log when salary is actually modified:
    IF NOT (OLD.monthly_salary_inr &le; &gt; NEW.monthly_salary_inr) THEN
        INSERT INTO salary_revision_history (
            faculty_id,
            previous_salary,
            new_salary,
            increment_delta,
            percentage_hike,
            approved_by_user,
            revised_at
        )
        VALUES (
            NEW.faculty_id,
            OLD.monthly_salary_inr,
            NEW.monthly_salary_inr,
            (NEW.monthly_salary_inr - OLD.monthly_salary_inr),
            ROUND(((NEW.monthly_salary_inr - OLD.monthly_salary_inr) / OLD.monthly_salary_inr) * 100, 2),
            USER(),
            NOW()
        );
    END IF;
END //

DELIMITER ;

-- Update Faculty Salary:
UPDATE faculty_salaries SET monthly_salary_inr = 65000.00 WHERE faculty_id = 201;`,
      resultRows: [
        { id: "FAC-201", entity: "Sukanta Hui (CS)", oldVal: "OLD: ₹50,000.00", newVal: "NEW: ₹65,000.00", deltaVal: "+₹15,000.00 (+30.00% Hike)", auditSnapshot: "Logged in salary_revision_history", status: "Delta Recorded" },
      ],
      explanation:
        "The trigger calculates the salary differential (`NEW - OLD = +₹15,000.00`) and the percentage increase (+30.00%), recording an exact mathematical audit trail with operator attribution.",
    },
    immutable_column_protection: {
      title: "2. Immutable Primary Key & Creation Date Protection",
      badge: "Immutable Guard",
      badgeColor: "rose",
      sqlQuery: `-- BEFORE UPDATE: Prevents tampering with student_id and created_at timestamps:
DELIMITER //

CREATE TRIGGER trg_students_immutable_guard
BEFORE UPDATE ON students
FOR EACH ROW
BEGIN
    -- Guard 1: Primary Key cannot be changed:
    IF OLD.student_id != NEW.student_id THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'SECURITY VIOLATION: Student ID Primary Key is immutable!';
    END IF;
    
    -- Guard 2: Prevent alteration of original creation timestamp:
    IF OLD.created_at != NEW.created_at THEN
        SET NEW.created_at = OLD.created_at; -- Silently restore original timestamp
    END IF;
    
    -- Auto-record update timestamp:
    SET NEW.updated_at = NOW();
END //

DELIMITER ;`,
      resultRows: [
        { id: "PK Tamper Attempt", entity: "STU-101 → STU-999", oldVal: "OLD.student_id = 101", newVal: "NEW.student_id = 999", deltaVal: "PK Alteration Blocked", auditSnapshot: "SIGNAL SQLSTATE '45000'", status: "💥 Blocked & Aborted" },
        { id: "Creation Date Tamper", entity: "created_at update", oldVal: "2026-01-01", newVal: "2026-08-01", deltaVal: "Silently Restored", auditSnapshot: "SET NEW.created_at = OLD.created_at", status: "Restored Cleanly" },
      ],
      explanation:
        "`BEFORE UPDATE` triggers defend table integrity by rejecting attempts to alter primary keys via `SIGNAL` and restoring immutable creation dates from `OLD.created_at`.",
    },
    json_audit_trail_snapshot: {
      title: "3. JSON Audit Trail Snapshots: Before & After DML State",
      badge: "JSON Audit",
      badgeColor: "cyan",
      sqlQuery: `-- AFTER UPDATE: Stores structured JSON before/after snapshots for compliance:
DELIMITER //

CREATE TRIGGER trg_student_profile_json_audit
AFTER UPDATE ON students
FOR EACH ROW
BEGIN
    INSERT INTO entity_change_audit_logs (
        table_name,
        record_id,
        before_state_json,
        after_state_json,
        modified_by,
        modified_at
    )
    VALUES (
        'students',
        NEW.student_id,
        JSON_OBJECT('first_name', OLD.first_name, 'email', OLD.email, 'dept_id', OLD.dept_id),
        JSON_OBJECT('first_name', NEW.first_name, 'email', NEW.email, 'dept_id', NEW.dept_id),
        USER(),
        NOW()
    );
END //

DELIMITER ;`,
      resultRows: [
        { id: "STU-102", entity: "Susmita Sen", oldVal: "JSON: {'email': 'old@bkp.edu'}", newVal: "JSON: {'email': 'new@bkp.edu'}", deltaVal: "Full JSON Snapshot", auditSnapshot: "INSERT into entity_change_audit_logs", status: "JSON Audited" },
      ],
      explanation:
        "Using `JSON_OBJECT()` allows the trigger to capture comprehensive, multi-field before-and-after snapshots into a single compliance log column.",
    },
    auto_sanitization_before_insert: {
      title: "4. Auto-Sanitizing NEW.email & Name Proper Casing",
      badge: "In-Flight Mutation",
      badgeColor: "amber",
      sqlQuery: `-- BEFORE INSERT: Mutates incoming NEW fields before storage engine commit:
DELIMITER //

CREATE TRIGGER trg_sanitize_student_input
BEFORE INSERT ON students
FOR EACH ROW
BEGIN
    -- Trims and forces email to lowercase:
    SET NEW.email = LOWER(TRIM(NEW.email));
    
    -- Proper Case Formatting:
    SET NEW.first_name = CONCAT(
        UPPER(SUBSTRING(TRIM(NEW.first_name), 1, 1)),
        LOWER(SUBSTRING(TRIM(NEW.first_name), 2))
    );
END //

DELIMITER ;`,
      resultRows: [
        { id: "New Entry", entity: "'  dEBANGSHU  '", oldVal: "OLD is NULL", newVal: "NEW: 'Debangshu', 'debangshu@bkp.edu'", deltaVal: "In-Flight Sanitization", auditSnapshot: "Transformed in Memory", status: "Cleaned" },
      ],
      explanation:
        "`BEFORE INSERT` allows direct mutation of `NEW.column` values before they are written to disk, ensuring 100% data consistency regardless of client input quality.",
    },
  };

  const navItems = [
    { id: "pseudo-concept", label: "1. What are NEW and OLD?" },
    { id: "mutation-matrix", label: "2. Permission & Mutation Matrix" },
    { id: "svg-diagrams", label: "3. Pseudo-Records & Snapshot SVGs" },
    { id: "interactive-sandbox", label: "4. Live Pseudo-Record Workbench" },
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
            <span>Topic 12 of 16</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              State Transitions
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Referencing Data using NEW and OLD Pseudo-Records
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Inspect and mutate row state transitions in database triggers. Master <code className="text-cyan-300 font-mono">NEW</code> and <code className="text-cyan-300 font-mono">OLD</code> pseudo-record access, delta calculations, immutable column guardrails, and JSON audit snapshots.
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
        {/* SECTION 1: Concept */}
        <section id="pseudo-concept" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. What are NEW and OLD Pseudo-Records?
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Virtual transition pointers representing before and after row states in triggers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>⏮️</span> The OLD Pseudo-Record
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Represents row column values <strong>before</strong> the DML operation executes. Available in <code className="text-cyan-300 font-mono">UPDATE</code> and <code className="text-cyan-300 font-mono">DELETE</code> triggers. Strictly <strong>read-only</strong>.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
                <span>⏭️</span> The NEW Pseudo-Record
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Represents row column values <strong>during or after</strong> the DML operation. Available in <code className="text-emerald-300 font-mono">INSERT</code> and <code className="text-emerald-300 font-mono">UPDATE</code> triggers. <strong>Writeable</strong> in BEFORE triggers (<code className="text-emerald-300 font-mono">SET NEW.col = val</code>).
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Mutation Matrix */}
        <section id="mutation-matrix" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Mutation &amp; Permission Matrix
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Exact read and write capabilities across all 6 trigger timings and events.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300">
              <thead className="bg-slate-950 text-white font-semibold border-b border-slate-800 font-mono">
                <tr>
                  <th className="py-3 px-4 text-cyan-400">Trigger Event &amp; Timing</th>
                  <th className="py-3 px-4 text-emerald-400">OLD Record Permission</th>
                  <th className="py-3 px-4 text-indigo-400">NEW Record Permission</th>
                  <th className="py-3 px-4 text-amber-400">Can Mutate via `SET`?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono text-xs">
                <tr>
                  <td className="py-3 px-4 font-bold text-emerald-300">BEFORE INSERT</td>
                  <td className="py-3 px-4 text-slate-500">Undefined / NULL</td>
                  <td className="py-3 px-4 text-emerald-400">Read / Write</td>
                  <td className="py-3 px-4 text-emerald-400">YES (`SET NEW.col = val`) ✅</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-emerald-300">AFTER INSERT</td>
                  <td className="py-3 px-4 text-slate-500">Undefined / NULL</td>
                  <td className="py-3 px-4 text-cyan-400">Read-Only</td>
                  <td className="py-3 px-4 text-rose-400">NO (Read-Only) ❌</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-cyan-300">BEFORE UPDATE</td>
                  <td className="py-3 px-4 text-cyan-400">Read-Only</td>
                  <td className="py-3 px-4 text-emerald-400">Read / Write</td>
                  <td className="py-3 px-4 text-emerald-400">YES (`SET NEW.col = val`) ✅</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-cyan-300">AFTER UPDATE</td>
                  <td className="py-3 px-4 text-cyan-400">Read-Only</td>
                  <td className="py-3 px-4 text-cyan-400">Read-Only</td>
                  <td className="py-3 px-4 text-rose-400">NO (Read-Only) ❌</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-rose-300">BEFORE DELETE</td>
                  <td className="py-3 px-4 text-cyan-400">Read-Only</td>
                  <td className="py-3 px-4 text-slate-500">Undefined / NULL</td>
                  <td className="py-3 px-4 text-rose-400">NO (Read-Only) ❌</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-rose-300">AFTER DELETE</td>
                  <td className="py-3 px-4 text-cyan-400">Read-Only</td>
                  <td className="py-3 px-4 text-slate-500">Undefined / NULL</td>
                  <td className="py-3 px-4 text-rose-400">NO (Read-Only) ❌</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Transition Records &amp; Snapshots
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing pseudo-record state transition buffers with JSON delta snapshots.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Transition Buffers */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Row Transition State Buffers (OLD vs NEW)
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* OLD Record */}
                  <g>
                    <rect x="30" y="30" width="370" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="215" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">OLD Pseudo-Record (Pre-Update State)</text>
                    <rect x="45" y="70" width="340" height="40" rx="4" fill="#0f172a" />
                    <text x="215" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">OLD.monthly_salary = ₹50,000.00 (Immutable)</text>
                    <text x="215" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Read-Only across all trigger types</text>
                  </g>

                  {/* NEW Record */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="630" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">NEW Pseudo-Record (Post-Update State)</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#022c22" />
                    <text x="630" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">NEW.monthly_salary = ₹65,000.00</text>
                    <text x="630" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Writeable in BEFORE (SET NEW.col = val)</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* SVG 2: Delta & JSON Snapshot */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-amber-400 font-mono">Diagram B:</span> Delta Math &amp; JSON Audit Trail Generation
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Delta Box */}
                  <g>
                    <rect x="30" y="30" width="370" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="215" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Mathematical Delta Calculation</text>
                    <rect x="45" y="70" width="340" height="40" rx="4" fill="#022c22" />
                    <text x="215" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">SET delta = (NEW.salary - OLD.salary) → +₹15,000</text>
                    <text x="215" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Exact monetary differential logged to audit history</text>
                  </g>

                  {/* JSON Snapshot Box */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="630" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">Structured JSON Audit Snapshot</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#0f172a" />
                    <text x="630" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">JSON_OBJECT('old', OLD.score, 'new', NEW.score)</text>
                    <text x="630" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Immutable historical compliance snapshots</text>
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
              4. Interactive Pseudo-Records Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test salary revision delta math, immutable primary key guards, JSON audit snapshots, and in-flight NEW value sanitization live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(pseudoScenarios).map(([key, item]) => {
              const isActive = selectedPseudoScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedPseudoScenario(key)}
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
                    {isActive ? "● Active Model" : "○ Run Pseudo-Record Test"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{pseudoScenarios[selectedPseudoScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{pseudoScenarios[selectedPseudoScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Transition Buffer Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Transition Logic Script</span>
                <span className="text-emerald-400">OLD &amp; NEW Pointers</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {pseudoScenarios[selectedPseudoScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Record ID / Entity</th>
                    <th className="py-3 px-4 text-white">Target Entity</th>
                    <th className="py-3 px-4 text-emerald-400">OLD Column State</th>
                    <th className="py-3 px-4 text-cyan-400">NEW Column State</th>
                    <th className="py-3 px-4 text-indigo-400">Computed Delta / Transformation</th>
                    <th className="py-3 px-4 text-amber-400">Audit Action / Result</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {pseudoScenarios[selectedPseudoScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.entity}</td>
                      <td className="py-3 px-4 text-emerald-300 font-mono">{row.oldVal}</td>
                      <td className="py-3 px-4 text-slate-300 font-mono">{row.newVal}</td>
                      <td className="py-3 px-4 text-indigo-300 font-bold">{row.deltaVal}</td>
                      <td className="py-3 px-4 text-amber-300 font-sans">{row.auditSnapshot}</td>
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
              Real-world anti-tampering guards and faculty salary delta auditing.
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
                  Faculty Payroll Revision Auditing with Mathematical Deltas in Barrackpore
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Academy Accounts</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui automated faculty payroll auditing: An <code className="text-emerald-300 font-mono">AFTER UPDATE</code> trigger compares <code className="text-cyan-300 font-mono">OLD.monthly_salary_inr</code> with <code className="text-cyan-300 font-mono">NEW.monthly_salary_inr</code>, computing the exact monetary raise and percentage hike while logging operator user details to comply with West Bengal academic financial auditing standards!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Automatic Payroll Delta Logger:
SET v_hike_inr = (NEW.monthly_salary_inr - OLD.monthly_salary_inr);
SET v_hike_pct = (v_hike_inr / OLD.monthly_salary_inr) * 100.0;
INSERT INTO salary_audit (faculty_id, prev_sal, new_sal, diff, hike_pct, actor, at_time)
VALUES (NEW.faculty_id, OLD.monthly_salary_inr, NEW.monthly_salary_inr, v_hike_inr, v_hike_pct, USER(), NOW());`}
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
              Avoid illegal SET mutations on OLD and invalid pseudo-record references.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Attempting to Modify OLD with SET
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Writing <code className="text-rose-300 font-mono">SET OLD.salary = 50000;</code> throws a syntax error because `OLD` represents immutable pre-existing table state.
              </p>
              <div className="text-xs text-slate-400">
                Fix: Only mutate incoming values via <code className="text-emerald-400 font-mono">SET NEW.col = val</code> in BEFORE triggers!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Always Compare with NULL-Safe {"` &le; &gt;`"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Using <code className="text-emerald-400 font-mono">IF NOT (OLD.col <=> NEW.col)</code> prevents comparison bugs when columns transition to or from `NULL`.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees complete change detection reliability.
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
              Key takeaways for Referencing NEW and OLD Data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> NEW &amp; OLD Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Remember that <code className="text-cyan-300 font-mono">OLD</code> is strictly read-only in all triggers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Remember that <code className="text-cyan-300 font-mono">NEW</code> is writeable only in `BEFORE` triggers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Use <code className="text-cyan-300 font-mono">(NEW.col - OLD.col)</code> for mathematical delta auditing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Use <code className="text-cyan-300 font-mono">JSON_OBJECT()</code> to capture before/after change snapshots.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe memory pointers...”</span>
                  `NEW` and `OLD` pointers access in-memory row buffers inside the MySQL storage engine, making delta comparisons virtually instantaneous without disk I/O!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about immutable columns...”</span>
                  Use `IF OLD.col != NEW.col THEN SIGNAL ...` in `BEFORE UPDATE` triggers to enforce that sensitive columns (like national ID or admission numbers) cannot be tampered with!
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
              Comprehensive reference questions covering NEW and OLD pseudo-records, attribute access rules, delta calculations, JSON audit trail snapshots, immutable column protection, and NULL-safe change detection.
            </p>
          </div>

          <FAQTemplate
            title="Referencing Data using NEW &amp; OLD FAQs"
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
            title="Referencing Modified Data using NEW and OLD Pseudo-Records"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic12_note.txt"
          />

          <Teacher
            note="The NEW and OLD pseudo-records provide the exact before-and-after state images needed to build industrial-strength audit logging, delta tracking, and data integrity safeguards. Always remember the permission rules: OLD is always read-only across all events, while NEW can only be modified via SET inside BEFORE INSERT and BEFORE UPDATE triggers. Always use the NULL-safe equal operator (<=>) when checking if columns have changed!"
          /&gt;
        </section>
      </main>
    </div>
  );
};

export default Topic12;
