import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic11_files/topic11_questions";
import noteText from "./topic11_files/topic11_note.txt?raw";

/**
 * Topic11 – Trigger Event Types: INSERT, UPDATE, and DELETE Triggers
 * Module: 003_003_stored-procedures-functions-and-triggers
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on DML trigger events (INSERT, UPDATE, DELETE), pseudo-record access (OLD vs NEW), counter synchronization, historical archiving, and TRUNCATE trigger bypass mechanics.
 */
const Topic11 = () => {
  // Interactive Simulator State
  const [selectedEventScenario, setSelectedEventScenario] = useState("insert_event_counter_increment");

  const eventScenarios = {
    insert_event_counter_increment: {
      title: "1. INSERT Trigger: Automated Department Counter Increment",
      badge: "INSERT Event",
      badgeColor: "emerald",
      sqlQuery: `-- AFTER INSERT: Increments department total_students when a new student enrolls:
DELIMITER //

CREATE TRIGGER trg_students_after_insert_counter
AFTER INSERT ON students
FOR EACH ROW
BEGIN
    -- Increment department count using NEW.dept_id:
    UPDATE departments 
    SET total_students = total_students + 1
    WHERE dept_id = NEW.dept_id;
END //

DELIMITER ;

-- Insert new student &rarr; Department count automatically increments:
INSERT INTO students (first_name, last_name, dept_id) VALUES ('Mamata', 'Hui', 1);
SELECT dept_name, total_students FROM departments WHERE dept_id = 1;`,
      resultRows: [
        { id: "STU-101", eventType: "INSERT", targetRow: "Mamata Hui (Dept 1 - CS)", availableRecords: "NEW only (OLD is NULL)", actionTaken: "UPDATE departments: total_students + 1", status: "Count Incremented" },
      ],
      explanation:
        "The `INSERT` trigger has access to `NEW` values (`NEW.dept_id`). It automatically increments the parent department's summary count without requiring application-side query coordination.",
    },
    update_event_score_audit: {
      title: "2. UPDATE Trigger: Tracking Exam Score Revisions in Audit Log",
      badge: "UPDATE Event",
      badgeColor: "cyan",
      sqlQuery: `-- AFTER UPDATE: Tracks exam score revisions by comparing OLD vs NEW values:
DELIMITER //

CREATE TRIGGER trg_students_after_update_score_audit
AFTER UPDATE ON students
FOR EACH ROW
BEGIN
    -- Detect if exam score changed using NULL-safe inequality:
    IF NOT (OLD.exam_score_pct &le; &gt; NEW.exam_score_pct) THEN
        INSERT INTO student_grade_audit_log (
            student_id,
            previous_score_pct,
            revised_score_pct,
            score_delta_pct,
            revised_by_user,
            logged_at
        )
        VALUES (
            NEW.student_id,
            OLD.exam_score_pct,
            NEW.exam_score_pct,
            (NEW.exam_score_pct - OLD.exam_score_pct),
            USER(),
            NOW()
        );
    END IF;
END //

DELIMITER ;

-- Update student score &rarr; Trigger detects difference and logs revision!
UPDATE students SET exam_score_pct = 94.50 WHERE student_id = 101;`,
      resultRows: [
        { id: "STU-101", eventType: "UPDATE", targetRow: "Mamata Hui (CS)", availableRecords: "BOTH OLD (88.0%) & NEW (94.5%)", actionTaken: "INSERT into grade_audit (+6.5% Delta)", status: "Revision Logged" },
      ],
      explanation:
        "The `UPDATE` trigger compares `OLD.exam_score_pct` (88.0%) with `NEW.exam_score_pct` (94.5%). If different, it logs the revision, delta (+6.5%), and operator user to the audit trail.",
    },
    delete_event_historical_archive: {
      title: "3. DELETE Trigger: Archiving Withdrawn Students to History",
      badge: "DELETE Event",
      badgeColor: "rose",
      sqlQuery: `-- BEFORE DELETE: Archives student data to historical table before removal:
DELIMITER //

CREATE TRIGGER trg_students_before_delete_archive
BEFORE DELETE ON students
FOR EACH ROW
BEGIN
    -- Archive all deleted row attributes from OLD pseudo-record:
    INSERT INTO deleted_students_archive (
        student_id,
        student_name,
        dept_id,
        final_gpa,
        deleted_by_user,
        deleted_timestamp
    )
    VALUES (
        OLD.student_id,
        CONCAT(OLD.first_name, ' ', OLD.last_name),
        OLD.dept_id,
        OLD.exam_score_pct,
        USER(),
        NOW()
    );
END //

DELIMITER ;

-- Delete student record -> Archived safely before table deletion!
DELETE FROM students WHERE student_id = 104;`,
      resultRows: [
        { id: "STU-104", eventType: "DELETE", targetRow: "Debangshu Roy (IT)", availableRecords: "OLD only (NEW is NULL)", actionTaken: "INSERT into deleted_students_archive", status: "Archived & Deleted" },
      ],
      explanation:
        "The `DELETE` trigger reads the `OLD` pseudo-record before the row is purged from disk, preserving complete historical data in the `deleted_students_archive` table.",
    },
    truncate_bypass_warning: {
      title: "4. The TRUNCATE TABLE Trap: Bypassing DELETE Triggers",
      badge: "TRUNCATE Trap",
      badgeColor: "amber",
      sqlQuery: `-- ⚠️ CRITICAL GOTCHA: TRUNCATE TABLE vs DELETE FROM:
-- 1. DELETE FROM students; -> DML Statement: Fires DELETE trigger for every row!
-- 2. TRUNCATE TABLE students; -> DDL Statement: Drops and re-creates the table!
-- 🚨 TRUNCATE TABLE bypasses all DELETE triggers completely! Zero audit records are created!

-- Senior Best Practice: Revoke DROP/TRUNCATE permissions in production:
REVOKE DROP ON barrackpore_academy.students FROM 'app_user'@'%';`,
      resultRows: [
        { id: "DELETE FROM students", eventType: "DML DELETE", targetRow: "All Rows (1-by-1)", availableRecords: "Fires for each row", actionTaken: "Audit trigger fires 100 times", status: "Audited & Safe" },
        { id: "TRUNCATE TABLE", eventType: "DDL TRUNCATE", targetRow: "Entire Table Storage", availableRecords: "Bypasses Triggers ❌", actionTaken: "Zero trigger executions!", status: "⚠️ Bypassed Triggers" },
      ],
      explanation:
        "Because `TRUNCATE TABLE` is a DDL operation that drops the underlying storage data files, it bypasses all `DELETE` triggers. To preserve audit logs, always use `DELETE FROM`.",
    },
  };

  const navItems = [
    { id: "event-types", label: "1. Three Trigger Events" },
    { id: "pseudo-records", label: "2. OLD vs NEW Matrix" },
    { id: "svg-diagrams", label: "3. Events Matrix & TRUNCATE SVGs" },
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
            <span>Topic 11 of 16</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              DML Events
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Trigger Event Types: INSERT, UPDATE &amp; DELETE
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master the three DML trigger events in MySQL. Understand <code className="text-cyan-300 font-mono">INSERT</code> triggers (accessing <code className="text-cyan-300 font-mono">NEW</code>), <code className="text-cyan-300 font-mono">UPDATE</code> triggers (accessing <code className="text-cyan-300 font-mono">OLD</code> &amp; <code className="text-cyan-300 font-mono">NEW</code>), <code className="text-cyan-300 font-mono">DELETE</code> triggers (accessing <code className="text-cyan-300 font-mono">OLD</code>), and the <code className="text-amber-400 font-mono">TRUNCATE TABLE</code> bypass trap.
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
        {/* SECTION 1: Event Types */}
        <section id="event-types" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Three DML Trigger Event Types
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing trigger activation conditions and available record states.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span>➕</span> 1. INSERT Triggers
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Fired on <code className="text-emerald-300 font-mono">INSERT</code>, <code className="text-emerald-300 font-mono">LOAD DATA</code>, and <code className="text-emerald-300 font-mono">REPLACE</code>. Has access strictly to <code className="text-emerald-300 font-mono">NEW</code> values (<code className="text-slate-400">OLD is NULL</code>).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <span>🔄</span> 2. UPDATE Triggers
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Fired on <code className="text-cyan-300 font-mono">UPDATE</code> statements. Has access to <strong>BOTH</strong> <code className="text-cyan-300 font-mono">OLD</code> (pre-update) and <code className="text-cyan-300 font-mono">NEW</code> (post-update) values.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <span>🗑️</span> 3. DELETE Triggers
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Fired on <code className="text-rose-300 font-mono">DELETE</code> statements. Has access strictly to <code className="text-rose-300 font-mono">OLD</code> values (<code className="text-slate-400">NEW is NULL</code>).
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: OLD vs NEW Matrix */}
        <section id="pseudo-records" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Pseudo-Record Availability Matrix
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing OLD and NEW record accessibility across all trigger events.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300">
              <thead className="bg-slate-950 text-white font-semibold border-b border-slate-800 font-mono">
                <tr>
                  <th className="py-3 px-4 text-cyan-400">Trigger Event</th>
                  <th className="py-3 px-4 text-emerald-400">OLD Record State</th>
                  <th className="py-3 px-4 text-indigo-400">NEW Record State</th>
                  <th className="py-3 px-4 text-amber-400">Primary Engineering Application</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono text-xs">
                <tr>
                  <td className="py-3 px-4 font-bold text-emerald-300">INSERT</td>
                  <td className="py-3 px-4 text-slate-500">Undefined / NULL</td>
                  <td className="py-3 px-4 text-emerald-400">Available (Read / Write in BEFORE)</td>
                  <td className="py-3 px-4 font-sans">Default values, counter increments, sanitization</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-cyan-300">UPDATE</td>
                  <td className="py-3 px-4 text-cyan-400">Available (Read-Only)</td>
                  <td className="py-3 px-4 text-emerald-400">Available (Read / Write in BEFORE)</td>
                  <td className="py-3 px-4 font-sans">Change auditing, delta math, status transitions</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-rose-300">DELETE</td>
                  <td className="py-3 px-4 text-cyan-400">Available (Read-Only)</td>
                  <td className="py-3 px-4 text-slate-500">Undefined / NULL</td>
                  <td className="py-3 px-4 font-sans">Historical archiving, counter decrements</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Event Matrix &amp; TRUNCATE Trap
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing pseudo-record availability with the TRUNCATE TABLE trigger bypass.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Event Matrix */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Pseudo-Record Access: INSERT (NEW) vs UPDATE (OLD/NEW) vs DELETE (OLD)
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* INSERT */}
                  <g>
                    <rect x="30" y="30" width="230" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="145" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">INSERT EVENT</text>
                    <rect x="45" y="70" width="200" height="40" rx="4" fill="#022c22" />
                    <text x="145" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">NEW.col (Available ✅)</text>
                    <text x="145" y="102" fill="#ef4444" fontSize="7 font-mono" textAnchor="middle">OLD.col (Undefined ❌)</text>
                  </g>

                  {/* UPDATE */}
                  <g>
                    <rect x="300" y="30" width="250" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="425" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">UPDATE EVENT</text>
                    <rect x="315" y="70" width="220" height="40" rx="4" fill="#0f172a" />
                    <text x="425" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">OLD.col &amp; NEW.col (Both ✅)</text>
                    <text x="425" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Compare OLD vs NEW for delta</text>
                  </g>

                  {/* DELETE */}
                  <g>
                    <rect x="590" y="30" width="230" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="705" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">DELETE EVENT</text>
                    <rect x="605" y="70" width="200" height="40" rx="4" fill="#1e293b" />
                    <text x="705" y="88" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">OLD.col (Available ✅)</text>
                    <text x="705" y="102" fill="#ef4444" fontSize="7 font-mono" textAnchor="middle">NEW.col (Undefined ❌)</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* SVG 2: TRUNCATE Trap */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-amber-400 font-mono">Diagram B:</span> The TRUNCATE TABLE Trap (DDL vs DML Trigger Bypass)
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* DELETE FROM */}
                  <g>
                    <rect x="30" y="30" width="370" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="215" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">DELETE FROM students (DML Execution)</text>
                    <rect x="45" y="70" width="340" height="40" rx="4" fill="#022c22" />
                    <text x="215" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Row-by-Row Deletion → Fires DELETE Trigger per Row</text>
                    <text x="215" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">✅ Full Historical Archive Logged</text>
                  </g>

                  {/* TRUNCATE TABLE */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="630" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">TRUNCATE TABLE students (DDL Storage Reset)</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#1e293b" />
                    <text x="630" y="88" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">Drops &amp; Recreates Storage Files → Bypasses Triggers! 💥</text>
                    <text x="630" y="102" fill="#fca5a5" fontSize="7 font-bold" textAnchor="middle">❌ Zero Archive Records Logged!</text>
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
              4. Interactive Trigger Events Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test INSERT counter increments, UPDATE grade revision auditing, DELETE historical archiving, and TRUNCATE bypass warnings live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(eventScenarios).map(([key, item]) => {
              const isActive = selectedEventScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedEventScenario(key)}
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
                    {isActive ? "● Active Event" : "○ Run Event Test"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{eventScenarios[selectedEventScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{eventScenarios[selectedEventScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                DML Event Processor
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Event Trigger Script</span>
                <span className="text-emerald-400">FOR EACH ROW State Handler</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {eventScenarios[selectedEventScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Record ID / Entity</th>
                    <th className="py-3 px-4 text-white">Event Type</th>
                    <th className="py-3 px-4 text-emerald-400">Target Row Context</th>
                    <th className="py-3 px-4 text-cyan-400">Available Pseudo-Records</th>
                    <th className="py-3 px-4 text-indigo-400">Trigger Action Executed</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {eventScenarios[selectedEventScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-mono text-white">{row.eventType}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.targetRow}</td>
                      <td className="py-3 px-4 text-slate-300 font-mono">{row.availableRecords}</td>
                      <td className="py-3 px-4 text-indigo-300 font-sans">{row.actionTaken}</td>
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
              Real-world grade audit logging and historical record preservation.
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
                  Exam Score Revision Auditing in Barrackpore Academy ERP
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Academy Examinations</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui implemented strict anti-grade inflation auditing: An <code className="text-cyan-300 font-mono">AFTER UPDATE</code> trigger on the student scores table detects when <code className="text-cyan-300 font-mono">OLD.exam_score_pct != NEW.exam_score_pct</code>, automatically logging the previous score, new score, delta, examiner user ID, and timestamp into an immutable audit table!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Grade Revision Audit Trigger:
IF NOT (OLD.exam_score_pct &le; &gt; NEW.exam_score_pct) THEN
    INSERT INTO grade_audit_log (student_id, old_score, new_score, revised_by, revised_at)
    VALUES (NEW.student_id, OLD.exam_score_pct, NEW.exam_score_pct, USER(), NOW());
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
              Avoid the TRUNCATE trap and use NULL-safe comparisons for change detection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> The TRUNCATE TABLE Trigger Bypass Trap
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                `TRUNCATE TABLE` is a DDL operation that drops table storage files and bypasses all `DELETE` triggers without creating any audit records!
              </p>
              <div className="text-xs text-slate-400">
                Fix: Use <code className="text-emerald-400 font-mono">DELETE FROM my_table;</code> to ensure DELETE triggers fire!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Use NULL-Safe {"` &le; &gt;`"} for Change Detection
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Using <code className="text-emerald-400 font-mono">IF NOT (OLD.col <=> NEW.col)</code> prevents three-valued logic bugs when either the old or new value is `NULL`.
              </p>
              <div className="text-xs text-slate-400">
                Standard enterprise change detection pattern.
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
              Key takeaways for Trigger Event Types.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Trigger Events Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Use <code className="text-cyan-300 font-mono">INSERT</code> triggers to access <code className="text-cyan-300 font-mono">NEW</code> values.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Use <code className="text-cyan-300 font-mono">UPDATE</code> triggers to compare <code className="text-cyan-300 font-mono">OLD</code> and <code className="text-cyan-300 font-mono">NEW</code> values.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Use <code className="text-cyan-300 font-mono">DELETE</code> triggers to archive <code className="text-cyan-300 font-mono">OLD</code> values.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Remember that <code className="text-cyan-300 font-mono">TRUNCATE TABLE</code> bypasses all DELETE triggers.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe multi-row batch updates...”</span>
                  When an UPDATE query modifies 100 rows, the `FOR EACH ROW` trigger executes exactly 100 times in order. Keep trigger code fast!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about REPLACE INTO...”</span>
                  `REPLACE INTO` activates the `DELETE` trigger on the old conflicting row, followed by the `INSERT` trigger on the new row!
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
              Comprehensive reference questions covering INSERT, UPDATE, and DELETE triggers, pseudo-record access rules (OLD vs NEW), counter synchronization, historical archiving, and TRUNCATE bypass mechanics.
            </p>
          </div>

          <FAQTemplate
            title="Trigger Event Types FAQs"
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
            title="Trigger Event Types: INSERT, UPDATE, and DELETE Triggers"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic11_note.txt"
          />

          <Teacher
            note="Understanding the three trigger events is essential for building automated, reactive database architectures. Remember what data is available: INSERT triggers have access strictly to NEW values, DELETE triggers have access strictly to OLD values, and UPDATE triggers have access to both OLD and NEW for delta comparisons. And beware the TRUNCATE trap: TRUNCATE TABLE is a DDL operation that bypasses all DELETE triggers completely!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic11;
