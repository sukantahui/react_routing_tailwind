import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

/**
 * Topic3 – Updatable Views: Conditions and WITH CHECK OPTION Clause
 * Module: 002_007_views-indexes-and-performance-basics
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial on updatable views, DML constraints, and the WITH CHECK OPTION clause.
 */
const Topic3 = () => {
  // Interactive Simulator State
  const [selectedScenario, setSelectedScenario] = useState("check_option_blocked");

  const dmlScenarios = {
    check_option_blocked: {
      title: "1. WITH CHECK OPTION: Boundary Violation Blocked (Error 1369)",
      badge: "Constraint Enforced (Blocked)",
      badgeColor: "rose",
      sqlQuery: `-- View definition with WITH CHECK OPTION boundary constraint:
CREATE OR REPLACE VIEW view_barrackpore_students AS
SELECT 
    student_id,
    student_name,
    course_stream,
    centre_city,
    tuition_fee_inr
FROM student_registry
WHERE centre_city = 'Barrackpore'
WITH CHECK OPTION;

-- ❌ An operator attempts to update a student's city to 'Kolkata':
UPDATE view_barrackpore_students
SET centre_city = 'Kolkata'
WHERE student_id = 'STU-101';

-- Outcome: MySQL throws Error 1369 (HY000)!`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", stream: "React Fullstack", city: "Barrackpore", fee: "₹25,000.00", status: "❌ REJECTED (Error 1369: CHECK OPTION Failed)" },
      ],
      explanation:
        "The UPDATE is rejected immediately by the MySQL engine because changing centre_city to 'Kolkata' would violate the view's WHERE condition. The database state remains uncorrupted.",
    },
    valid_update_success: {
      title: "2. Valid UPDATE: Satisfies WHERE Clause & Updates Base Table",
      badge: "200 OK (DML Succeeded)",
      badgeColor: "emerald",
      sqlQuery: `-- View definition:
CREATE OR REPLACE VIEW view_barrackpore_students AS
SELECT 
    student_id,
    student_name,
    course_stream,
    centre_city,
    tuition_fee_inr
FROM student_registry
WHERE centre_city = 'Barrackpore'
WITH CHECK OPTION;

-- ✓ Operator updates tuition fee within the Barrackpore boundary:
UPDATE view_barrackpore_students
SET tuition_fee_inr = tuition_fee_inr + 2000.00
WHERE student_id = 'STU-101';

-- Outcome: Base table row updated; remains visible in view!`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", stream: "React Fullstack", city: "Barrackpore", fee: "₹27,000.00", status: "✓ Base Table Updated (1 Row Affected)" },
        { id: "STU-102", name: "Susmita Sen", stream: "Java Enterprise", city: "Barrackpore", fee: "₹25,000.00", status: "✓ Unchanged" },
      ],
      explanation:
        "Because the updated row still has centre_city = 'Barrackpore', the CHECK OPTION condition is fully satisfied. The change is written directly to the underlying physical table.",
    },
    ghost_row_problem: {
      title: "3. The 'Ghost Row' Problem (WITHOUT WITH CHECK OPTION)",
      badge: "Vanishing Tuple Pitfall",
      badgeColor: "amber",
      sqlQuery: `-- View definition WITHOUT CHECK OPTION:
CREATE OR REPLACE VIEW view_unprotected_bkp AS
SELECT student_id, student_name, course_stream, centre_city
FROM student_registry
WHERE centre_city = 'Barrackpore';

-- ⚠️ Operator runs an update changing city to 'Kolkata':
UPDATE view_unprotected_bkp
SET centre_city = 'Kolkata'
WHERE student_id = 'STU-101';

-- Outcome: Query succeeds, but Mamata Hui DISAPPEARS from view!`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", stream: "React Fullstack", city: "Kolkata (Base DB)", fee: "₹25,000.00", status: "⚠️ Disappeared from View (Ghost Row)" },
        { id: "STU-102", name: "Susmita Sen", stream: "Java Enterprise", city: "Barrackpore", fee: "₹25,000.00", status: "✓ Visible" },
      ],
      explanation:
        "Without WITH CHECK OPTION, the row is updated in the base table to 'Kolkata', causing it to immediately vanish from the Barrackpore view. This causes confusion and breaks multi-tenant boundaries.",
    },
    cascaded_vs_local: {
      title: "4. Nested Views: CASCADED vs LOCAL Check Options",
      badge: "Hierarchy Validation",
      badgeColor: "cyan",
      sqlQuery: `-- Parent View A:
CREATE VIEW view_parent_active AS
SELECT * FROM students WHERE is_active = 1;

-- Child View B (Built on View A):
CREATE VIEW view_child_bkp AS
SELECT * FROM view_parent_active WHERE centre_city = 'Barrackpore'
WITH CASCADED CHECK OPTION;

-- ❌ Inserting an inactive Barrackpore student through View B:
INSERT INTO view_child_bkp (student_id, student_name, centre_city, is_active)
VALUES ('STU-999', 'Rohan Das', 'Barrackpore', 0);

-- Outcome: CASCADED fails on parent condition (is_active = 1)!`,
      resultRows: [
        { id: "STU-999", name: "Rohan Das", stream: "React Fullstack", city: "Barrackpore", fee: "is_active = 0", status: "❌ Blocked by Parent View A Condition" },
      ],
      explanation:
        "WITH CASCADED CHECK OPTION checks all parent views in the ancestry chain. Even though centre_city = 'Barrackpore' is valid, is_active = 0 violates the parent view, rejecting the insert.",
    },
  };

  const navItems = [
    { id: "theory", label: "1. Updatability Conditions" },
    { id: "ghost-row", label: "2. The Ghost Row Problem" },
    { id: "svg-diagrams", label: "3. Check Option SVGs" },
    { id: "interactive-sandbox", label: "4. Live DML Sandbox" },
    { id: "cascaded-local", label: "5. CASCADED vs LOCAL" },
    { id: "case-studies", label: "6. Production Case Studies" },
    { id: "pitfalls-rules", label: "7. Senior Pitfalls" },
    { id: "checklist", label: "8. Student Checklist" },
    { id: "faq-section", label: "9. FAQs (30 Questions)" },
    { id: "teacher-notes", label: "10. Teacher's Note & Raw Script" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-900 pb-20">
      {/* Header Banner */}
      <header className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-2">
            <span>Module 002_007</span>
            <span>•</span>
            <span>Topic 3 of 14</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              View DML Integrity
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Updatable Views & WITH CHECK OPTION Clause
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Execute write operations through virtual tables safely. Master 1-to-1 updatability rules, eliminate the{" "}
            <code className="text-amber-300 font-mono font-bold">Ghost Row</code> pitfall, and enforce declarative constraints with{" "}
            <code className="text-emerald-300 font-mono font-bold">WITH CHECK OPTION</code>.
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
        {/* SECTION 1: Updatability Conditions */}
        <section id="theory" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Strict Conditions for View Updatability
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The database engine must be able to unambiguously map a view row back to a unique physical base table row.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Updatable Views (IS_UPDATABLE = 'YES')
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>1-to-1 relationship with a single underlying base table.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>Simple column projections and WHERE filter conditions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>Primary key or unique key present in the view definition.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Non-Updatable Constructs (IS_UPDATABLE = 'NO')
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>Aggregate functions: <code className="text-rose-300 font-mono">COUNT, SUM, AVG, MIN, MAX</code></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>Keywords: <code className="text-rose-300 font-mono">GROUP BY, HAVING, DISTINCT, UNION</code></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>Algorithm: <code className="text-rose-300 font-mono">ALGORITHM = TEMPTABLE</code></span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: The Ghost Row Problem */}
        <section id="ghost-row" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. The "Ghost Row" (Vanishing Tuple) Problem
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why unconstrained DML through views can lead to mysterious data disappearances.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Suppose a branch manager at Barrackpore runs:
              <br />
              <code className="text-cyan-300 font-mono">UPDATE v_barrackpore_students SET centre_city = 'Kolkata' WHERE id = 101;</code>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-amber-900/40 space-y-2">
                <span className="text-amber-400 font-bold text-xs uppercase font-mono">WITHOUT WITH CHECK OPTION:</span>
                <p className="text-xs text-slate-300">
                  The base table updates Student 101 to 'Kolkata'. However, Student 101 instantly <strong>disappears</strong> from the Barrackpore view! The manager can no longer see or manage the record.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-900/40 space-y-2">
                <span className="text-emerald-400 font-bold text-xs uppercase font-mono">WITH WITH CHECK OPTION:</span>
                <p className="text-xs text-slate-300">
                  MySQL blocks the update with <code className="text-rose-400 font-mono">Error 1369</code> because 'Kolkata' violates the view's WHERE condition. The data boundary remains strictly protected!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: WITH CHECK OPTION Firewall
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              See how WITH CHECK OPTION acts as an active validation guard for DML writes.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono">Diagram A:</span> DML Validation Interceptor & Error 1369 Guard
            </h3>

            <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
              <svg viewBox="0 0 850 250" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                {/* Left: DML Request */}
                <g>
                  <rect x="30" y="30" width="220" height="80" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="140" y="55" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">DML Write Attempt</text>
                  <text x="140" y="75" fill="#e2e8f0" fontSize="9" textAnchor="middle font-mono">UPDATE view_bkp</text>
                  <text x="140" y="90" fill="#fca5a5" fontSize="9" textAnchor="middle font-mono">SET city = 'Kolkata'</text>
                </g>

                {/* Middle: WITH CHECK OPTION Guard */}
                <g>
                  <rect x="320" y="20" width="220" height="200" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                  <text x="430" y="45" fill="#c7d2fe" fontSize="12" fontWeight="bold" textAnchor="middle">🛡️ WITH CHECK OPTION</text>
                  <rect x="335" y="65" width="190" height="40" rx="4" fill="#020617" />
                  <text x="430" y="82" fill="#38bdf8" fontSize="9" textAnchor="middle font-mono">Evaluates view WHERE:</text>
                  <text x="430" y="96" fill="#a5b4fc" fontSize="9" textAnchor="middle font-mono">centre_city = 'Barrackpore'</text>

                  {/* Decision Fork */}
                  <rect x="335" y="125" width="190" height="35" rx="4" fill="#450a0a" stroke="#ef4444" />
                  <text x="430" y="146" fill="#fca5a5" fontSize="9" textAnchor="middle font-bold">city = 'Kolkata' → FAILS!</text>
                  <text x="430" y="195" fill="#f87171" fontSize="9" textAnchor="middle font-bold">Throws Error 1369</text>
                </g>

                {/* Right: Base Table */}
                <g>
                  <rect x="610" y="30" width="210" height="80" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                  <text x="715" y="55" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Base Table: students</text>
                  <text x="715" y="75" fill="#a7f3d0" fontSize="9" textAnchor="middle">Physical InnoDB Storage</text>
                  <text x="715" y="90" fill="#6ee7b7" fontSize="9" textAnchor="middle font-bold">(Untouched & Protected)</text>
                </g>

                {/* Flow Arrow Left → Middle */}
                <path d="M 250 70 L 320 70" stroke="#38bdf8" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive DML Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Updatable Views Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test DML write operations with and without WITH CHECK OPTION live.
            </p>
          </div>

          {/* Scenario Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {Object.entries(dmlScenarios).map(([key, item]) => {
              const isActive = selectedScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedScenario(key)}
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
                        item.badgeColor === "amber" && "bg-amber-950 text-amber-400 border border-amber-800",
                        item.badgeColor === "cyan" && "bg-cyan-950 text-cyan-400 border border-cyan-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Execution" : "○ Run DML"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{dmlScenarios[selectedScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{dmlScenarios[selectedScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                DML Interceptor Active
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL DML Transaction Script</span>
                <span className="text-emerald-400">Integrity Validation Engine</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {dmlScenarios[selectedScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4 font-mono text-cyan-400">student_id</th>
                    <th className="py-3 px-4 font-mono text-white">student_name</th>
                    <th className="py-3 px-4 font-mono text-emerald-400">course_stream</th>
                    <th className="py-3 px-4 font-mono text-cyan-400">centre_city</th>
                    <th className="py-3 px-4 font-mono text-indigo-400">tuition_fee_inr</th>
                    <th className="py-3 px-4 font-mono text-amber-400">Execution Outcome</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {dmlScenarios[selectedScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.name}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.stream}</td>
                      <td className="py-3 px-4 text-slate-300">{row.city}</td>
                      <td className="py-3 px-4 text-indigo-300 font-bold">{row.fee}</td>
                      <td className="py-3 px-4">
                        <span
                          className={clsx(
                            "px-2 py-0.5 rounded text-[11px] font-sans font-medium border",
                            row.status.includes("REJECTED") || row.status.includes("Blocked")
                              ? "bg-rose-950 text-rose-400 border-rose-800"
                              : row.status.includes("Disappeared")
                              ? "bg-amber-950 text-amber-400 border-amber-800"
                              : "bg-emerald-950 text-emerald-400 border-emerald-800"
                          )}
                        >
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

        {/* SECTION 5: CASCADED vs LOCAL */}
        <section id="cascaded-local" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. CASCADED vs LOCAL Check Option in Nested Views
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How constraint evaluation traverses through nested view inheritance trees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-cyan-400 mb-2">WITH CASCADED CHECK OPTION (Default)</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Validates the <code className="text-cyan-300 font-mono">WHERE</code> condition of the current view <strong>AND ALL</strong> underlying parent views in the ancestry chain.
              </p>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono text-cyan-300">
                Child View Check = (Child_WHERE) AND (Parent1_WHERE) AND (Parent2_WHERE)...
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-2">WITH LOCAL CHECK OPTION</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Validates <strong>ONLY</strong> the WHERE condition of the current view (checks underlying views only if they explicitly defined their own CHECK OPTION).
              </p>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono text-emerald-300">
                Child View Check = (Child_WHERE) ONLY
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Production Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Production Industry Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Real-world implementations of updatable views and constraint enforcement.
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
                  Branch Coordinator Safe Enrollment Portal
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore, Kolkata</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui provides the Barrackpore branch coordinator with an updatable view with <code className="text-emerald-300 font-mono">WITH CHECK OPTION</code> so they can enroll or update student records (Mamata, Susmita, Abhronila, Debangshu) without the ability to corrupt Kolkata branch records.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`CREATE OR REPLACE VIEW view_barrackpore_coordinator_portal AS
SELECT 
    student_id,
    student_name,
    course_stream,
    centre_city,
    tuition_fee_inr,
    enrollment_status
FROM student_master
WHERE centre_city = 'Barrackpore'
WITH CASCADED CHECK OPTION;`}
              </pre>
            </div>

            {/* Case Study 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="p-1.5 rounded bg-cyan-950 text-cyan-400 font-mono text-xs border border-cyan-800">
                    CASE 02
                  </span>
                  Statutory Minimum Wage Payroll Compliance Guard
                </h3>
                <span className="text-xs text-slate-400 font-mono">HR & Payroll Compliance</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Preventing HR clerk errors: A view with <code className="text-cyan-300 font-mono">WITH CHECK OPTION</code> ensures that no employee's hourly rate can ever be reduced below the legal minimum threshold of ₹250.00/hr.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-cyan-300 border border-slate-800 overflow-x-auto">
{`CREATE OR REPLACE VIEW view_compliant_payroll AS
SELECT 
    employee_id,
    employee_name,
    designation,
    hourly_rate_inr
FROM employee_payroll
WHERE hourly_rate_inr >= 250.00
WITH CHECK OPTION;`}
              </pre>
            </div>
          </div>
        </section>

        {/* SECTION 7: Senior Pitfalls & Best Practices */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              7. Senior Pitfalls & Best Practices
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Avoid common mistakes when designing updatable views.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Missing NOT NULL Columns on INSERT
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                If the base table has a column defined as <code className="text-rose-300 font-mono">NOT NULL</code> without a default value, and that column is omitted from the view, <code className="text-rose-300 font-mono">INSERT</code> operations through the view will fail with Error 1364!
              </p>
              <div className="text-xs text-slate-400">
                Fix: Always ensure all mandatory base columns are included in updatable views or have defaults.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Always Use WITH CHECK OPTION on Filtered Views
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Never deploy a row-filtered updatable view without <code className="text-emerald-400 font-mono">WITH CHECK OPTION</code>. It eliminates the Ghost Row problem and guarantees declarative data integrity.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees that all inserted/updated records remain visible to authorized users.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: Student Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              8. Mini Checklist & Senior Developer Hints
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key takeaways for exams and technical interviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Student Exam Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Updatable views require a 1-to-1 relationship with a single base table.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Aggregate functions, GROUP BY, DISTINCT, and UNION destroy updatability.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span><code className="text-cyan-300 font-mono">WITH CHECK OPTION</code> rejects DML that violates the view's WHERE condition (Error 1369).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span><code className="text-cyan-300 font-mono">CASCADED</code> checks all parent views; <code className="text-cyan-300 font-mono">LOCAL</code> checks only the current view.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe information_schema.VIEWS...”</span>
                  Inspect <code className="text-cyan-300 font-mono">IS_UPDATABLE</code> and <code className="text-cyan-300 font-mono">CHECK_OPTION</code> in the system catalog to verify your view's DML configuration.
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about multi-tenant security...”</span>
                  In SaaS architectures, defining views like <code className="text-cyan-300 font-mono">WHERE tenant_id = 42 WITH CHECK OPTION</code> completely prevents cross-tenant data corruption!
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              9. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comprehensive reference questions covering updatability conditions, Error 1369, CASCADED vs LOCAL check options, and multi-tenant security.
            </p>
          </div>

          <FAQTemplate
            title="Updatable Views & WITH CHECK OPTION FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint & Teacher's Note */}
        <section id="teacher-notes" className="space-y-8">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              10. Printable Topic Note & Teacher's Observation
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Download clean text documentation for revision and study Sukanta Hui's direct pedagogical insights.
            </p>
          </div>

          <PlainTextPrint
            content={noteText}
            title="Updatable Views: Conditions and WITH CHECK OPTION Clause"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic3_note.txt"
          />

          <Teacher
            note="Never allow students to create row-filtered updatable views without WITH CHECK OPTION. The 'Ghost Row' problem causes immense real-world debugging pain when an operator updates a record and then panics because the record vanished from their screen. WITH CHECK OPTION acts as an unbreachable declarative firewall that guarantees data boundary integrity."
          />
        </section>
      </main>
    </div>
  );
};

export default Topic3;
