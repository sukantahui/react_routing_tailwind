import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

/**
 * Topic6 – Correlated UPDATE and Correlated DELETE Statements
 * Module: 003_001_subqueries-and-cte
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on correlated DML operations, Error 1093 mitigation, multi-table UPDATE/DELETE syntax, and orphan record purging.
 */
const Topic6 = () => {
  // Interactive Simulator State
  const [selectedDMLScenario, setSelectedDMLScenario] = useState("update_set_ledger");

  const dmlScenarios = {
    update_set_ledger: {
      title: "1. Correlated UPDATE in SET Clause (Dynamic Ledger Sync)",
      badge: "UPDATE SET",
      badgeColor: "emerald",
      sqlQuery: `-- Synchronizing student lifetime fee payments from the transaction ledger:
-- The inner subquery sums payment records matching each outer student_id:

UPDATE students s
SET s.total_fees_paid_inr = (
    SELECT COALESCE(SUM(p.amount_paid_inr), 0.00)
    FROM enrollments e
    JOIN fee_payments p ON e.enrollment_id = p.enrollment_id
    WHERE e.student_id = s.student_id -- Correlation Link!
);`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", targetCol: "total_fees_paid_inr", prevVal: "₹0.00", newVal: "₹25,000.00", dmlType: "UPDATE SET", status: "Synchronized" },
        { id: "STU-102", name: "Susmita Sen", targetCol: "total_fees_paid_inr", prevVal: "₹0.00", newVal: "₹18,000.00", dmlType: "UPDATE SET", status: "Synchronized" },
        { id: "STU-103", name: "Abhronila Saha", targetCol: "total_fees_paid_inr", prevVal: "₹0.00", newVal: "₹22,000.00", dmlType: "UPDATE SET", status: "Synchronized" },
      ],
      explanation:
        "The subquery inside the `SET` clause executes for each student row, calculating their exact payment total from child tables and writing it into the parent column.",
    },
    update_where_honors: {
      title: "2. Correlated UPDATE in WHERE Clause (Conditional Tier Upgrade)",
      badge: "UPDATE WHERE",
      badgeColor: "cyan",
      sqlQuery: `-- Promoting students to 'Gold Honors' if they scored above their Dept Average:
-- Correlated subquery in WHERE evaluates each student's department average:

UPDATE students s
SET s.academic_tier = 'Gold Honors'
WHERE s.exam_score_pct > (
    SELECT AVG(i.exam_score_pct) 
    FROM students_archive i 
    WHERE i.dept_id = s.dept_id
);`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", targetCol: "academic_tier", prevVal: "Standard", newVal: "Gold Honors", dmlType: "UPDATE WHERE", status: "Upgraded" },
        { id: "STU-103", name: "Abhronila Saha", targetCol: "academic_tier", prevVal: "Standard", newVal: "Gold Honors", dmlType: "UPDATE WHERE", status: "Upgraded" },
      ],
      explanation:
        "Updates only those rows where the candidate student's score exceeds their specific department benchmark, evaluated row-by-row in the WHERE clause.",
    },
    delete_orphan_drafts: {
      title: "3. Correlated DELETE with NOT EXISTS (Safe Orphan Purging)",
      badge: "DELETE NOT EXISTS",
      badgeColor: "rose",
      sqlQuery: `-- Safely purging abandoned student application drafts with no parent account:
-- NOT EXISTS ensures only unreferenced orphan records are deleted:

DELETE FROM student_drafts d
WHERE NOT EXISTS (
    SELECT 1 
    FROM students s 
    WHERE s.student_id = d.student_id
);`,
      resultRows: [
        { id: "DRF-901", name: "Unregistered Lead #1", targetCol: "student_drafts", prevVal: "Orphan Record", newVal: "[DELETED]", dmlType: "DELETE NOT EXISTS", status: "Purged" },
        { id: "DRF-902", name: "Unregistered Lead #2", targetCol: "student_drafts", prevVal: "Orphan Record", newVal: "[DELETED]", dmlType: "DELETE NOT EXISTS", status: "Purged" },
      ],
      explanation:
        "`DELETE ... WHERE NOT EXISTS` cleans up orphan child records without risking accidental deletion of valid active accounts.",
    },
    error_1093_multi_table_join: {
      title: "4. Resolving Error 1093 via Multi-Table UPDATE ... JOIN",
      badge: "Multi-Table JOIN",
      badgeColor: "amber",
      sqlQuery: `-- ❌ FAILS with Error 1093:
-- UPDATE students SET dept_benchmark = (SELECT AVG(score) FROM students WHERE dept_id = s.dept_id);

-- ✅ MODERN SOLUTION: Multi-Table UPDATE with Pre-Aggregated JOIN:
UPDATE students s
JOIN (
    SELECT 
        dept_id, 
        ROUND(AVG(exam_score_pct), 2) AS dept_avg_score
    FROM students
    GROUP BY dept_id
) AS dt ON s.dept_id = dt.dept_id
SET s.dept_benchmark = dt.dept_avg_score;`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", targetCol: "dept_benchmark", prevVal: "NULL", newVal: "91.25%", dmlType: "UPDATE JOIN", status: "Bypassed 1093" },
        { id: "STU-103", name: "Abhronila Saha", targetCol: "dept_benchmark", prevVal: "NULL", newVal: "89.30%", dmlType: "UPDATE JOIN", status: "Bypassed 1093" },
      ],
      explanation:
        "MySQL's multi-table `UPDATE ... JOIN` pre-aggregates department averages into a single derived table `dt` and updates all students in one fast pass, completely eliminating Error 1093!",
    },
  };

  const navItems = [
    { id: "dml-concept", label: "1. Correlated DML Concepts" },
    { id: "error-1093", label: "2. Error 1093 Resolution" },
    { id: "svg-diagrams", label: "3. UPDATE Pipeline & Error 1093 SVGs" },
    { id: "interactive-sandbox", label: "4. Live Correlated DML Workbench" },
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
            <span>Module 003_001</span>
            <span>•</span>
            <span>Topic 6 of 14</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              DML Subquery Operations
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Correlated UPDATE & Correlated DELETE Statements
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Execute dynamic data modifications with correlated subqueries. Master <code className="text-cyan-300 font-mono">UPDATE SET</code> ledger synchronization, orphan record pruning with <code className="text-rose-300 font-mono">DELETE NOT EXISTS</code>, and resolve the notorious MySQL <code className="text-amber-300 font-mono">Error 1093</code> using Multi-Table JOINs.
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
        {/* SECTION 1: Concepts */}
        <section id="dml-concept" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Correlated DML Syntax & Operations
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Modifying table records dynamically using intermediate values computed from related tables.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span>📝</span> UPDATE in SET Clause
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Assigns calculated values (sums, counts, last transaction dates) directly to target columns per outer row.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <span>🎯</span> UPDATE in WHERE Clause
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Applies updates conditionally only to rows satisfying correlated benchmarks (e.g. above department average).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <span>🗑️</span> DELETE with NOT EXISTS
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Safely removes orphan child records, expired draft sessions, or unreferenced cart items without data loss.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Error 1093 */}
        <section id="error-1093" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. The Famous MySQL Error 1093 & Multi-Table Solutions
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why MySQL forbids self-table subqueries in DML and how to resolve it cleanly.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <p className="text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">UPDATE students SET score = (SELECT AVG(score) FROM students)</code> triggers <code className="text-rose-300 font-mono">Error 1093: You can't specify target table 'students' for update in FROM clause</code>. Use MySQL's native <code className="text-emerald-400 font-mono">UPDATE ... JOIN</code> syntax instead:
            </p>
            <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- ✅ Modern Multi-Table UPDATE with Pre-Aggregated Derived Table:
UPDATE students s
JOIN (
    SELECT dept_id, AVG(exam_score_pct) AS avg_score 
    FROM students 
    GROUP BY dept_id
) AS dt ON s.dept_id = dt.dept_id
SET s.dept_benchmark = dt.avg_score;`}
            </pre>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: UPDATE Pipeline & Error 1093 Resolution
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How the database engine executes correlated DML and manages table locks.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: UPDATE SET Pipeline */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Correlated UPDATE in SET Clause Pipeline
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1 */}
                  <g>
                    <rect x="30" y="30" width="240" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="150" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">1. Target Outer Row</text>
                    <rect x="45" y="70" width="210" height="40" rx="4" fill="#0f172a" />
                    <text x="150" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Student #101 (Mamata)</text>
                    <text x="150" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Pass student_id = 101</text>
                  </g>

                  {/* Step 2 */}
                  <g>
                    <rect x="310" y="30" width="250" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="435" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">2. Inner Correlated Sum</text>
                    <rect x="325" y="70" width="220" height="40" rx="4" fill="#022c22" />
                    <text x="435" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">SELECT SUM(amount) WHERE</text>
                    <text x="435" y="102" fill="#a7f3d0" fontSize="7 font-mono" textAnchor="middle">student_id = 101 → ₹25,000.00</text>
                  </g>

                  {/* Step 3 */}
                  <g>
                    <rect x="600" y="30" width="220" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="710" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">3. SET Target Column</text>
                    <rect x="615" y="70" width="190" height="40" rx="4" fill="#0f172a" />
                    <text x="710" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">total_fees_paid_inr =</text>
                    <text x="710" y="102" fill="#38bdf8" fontSize="7 font-mono" textAnchor="middle">₹25,000.00 (Written to Disk)</text>
                  </g>

                  {/* Arrows */}
                  <path d="M 270 80 L 310 80" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 560 80 L 600 80" stroke="#10b981" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* SVG 2: Error 1093 */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-rose-400 font-mono">Diagram B:</span> Error 1093 Self-Table Lock Conflict & Multi-Table Solution
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Lock Conflict */}
                  <g>
                    <rect x="30" y="30" width="370" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="215" y="55" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">💥 Direct Subquery Lock Conflict (Error 1093)</text>
                    <rect x="45" y="70" width="340" height="40" rx="4" fill="#0f172a" />
                    <text x="215" y="88" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">UPDATE students ... (SELECT FROM students)</text>
                    <text x="215" y="102" fill="#fca5a5" fontSize="7 font-bold" textAnchor="middle">Concurrent Read/Write Table Lock Collision</text>
                  </g>

                  {/* Multi-Table Solution */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="630" y="55" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">✅ Multi-Table UPDATE ... JOIN (Resolved!)</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#022c22" />
                    <text x="630" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">UPDATE students s JOIN (SELECT ...) AS dt</text>
                    <text x="630" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Pre-materialized in RAM → Single Pass Execution</text>
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
              4. Interactive Correlated DML Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test dynamic ledger updates in SET, conditional tier upgrades in WHERE, orphan pruning with NOT EXISTS, and multi-table JOINs live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(dmlScenarios).map(([key, item]) => {
              const isActive = selectedDMLScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedDMLScenario(key)}
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
                        item.badgeColor === "rose" && "bg-rose-950 text-rose-400 border border-rose-800",
                        item.badgeColor === "amber" && "bg-amber-950 text-amber-400 border border-amber-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active DML" : "○ Run DML"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{dmlScenarios[selectedDMLScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{dmlScenarios[selectedDMLScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                DML Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>DML SQL Statement</span>
                <span className="text-emerald-400">Atomic Modification</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {dmlScenarios[selectedDMLScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Record ID</th>
                    <th className="py-3 px-4 text-white">Target Entity</th>
                    <th className="py-3 px-4 text-emerald-400">Target Column</th>
                    <th className="py-3 px-4 text-slate-400">Previous Value</th>
                    <th className="py-3 px-4 text-cyan-400">New Value (Post-DML)</th>
                    <th className="py-3 px-4 text-indigo-400">DML Operation</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {dmlScenarios[selectedDMLScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.name}</td>
                      <td className="py-3 px-4 text-emerald-300">{row.targetCol}</td>
                      <td className="py-3 px-4 text-slate-400">{row.prevVal}</td>
                      <td className="py-3 px-4 text-cyan-300 font-bold">{row.newVal}</td>
                      <td className="py-3 px-4 text-indigo-300 font-sans">{row.dmlType}</td>
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
              Real-world DML synchronizations and orphan cleanup operations.
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
                  Automated End-of-Term Student Ledger Synchronization
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Academy DB</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui automated the end-of-semester financial audit: Rather than running slow application-tier looping scripts, a single atomic <code className="text-emerald-300 font-mono">UPDATE ... JOIN</code> recalculated paid tuition totals and cleared active exam hall ticket authorizations for students Mamata, Susmita, Abhronila, and Debangshu in 45ms!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Atomic Ledger Update with Multi-Table JOIN:
UPDATE students s
JOIN (
    SELECT e.student_id, SUM(p.amount_paid_inr) AS total_paid
    FROM enrollments e
    JOIN fee_payments p ON e.enrollment_id = p.enrollment_id
    GROUP BY e.student_id
) AS dt ON s.student_id = dt.student_id
SET s.total_fees_paid_inr = dt.total_paid;`}
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
              Avoid DML lock contention and data loss.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Executing DELETE without Preview SELECT
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Never execute a correlated DELETE without running an identical SELECT statement first to verify the exact candidate rows to be deleted!
              </p>
              <div className="text-xs text-slate-400">
                Rule: Always dry-run with SELECT.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Wrap DML in Explicit Transactions
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Always wrap bulk correlated DML in <code className="text-emerald-400 font-mono">START TRANSACTION ... COMMIT</code> so changes can be safely rolled back (<code className="text-emerald-400 font-mono">ROLLBACK</code>) on failure.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees ACID atomicity during batch updates.
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
              Key takeaways for correlated UPDATE and DELETE operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Correlated DML Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Use <code className="text-cyan-300 font-mono">UPDATE SET</code> with scalar subqueries for ledger synchronizations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Use <code className="text-cyan-300 font-mono">DELETE NOT EXISTS</code> to safely prune orphan records.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Resolve <code className="text-rose-300 font-mono">Error 1093</code> using Multi-Table <code className="text-cyan-300 font-mono">UPDATE ... JOIN</code> syntax.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Wrap bulk DML in transactions (<code className="text-cyan-300 font-mono">START TRANSACTION ... COMMIT</code>).</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe Multi-Table UPDATE speed...”</span>
                  Multi-table <code className="text-cyan-300 font-mono">UPDATE ... JOIN</code> is orders of magnitude faster than a correlated subquery in the SET clause on large tables!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about index coverage on DML foreign keys...”</span>
                  Ensure all correlation keys used in UPDATE/DELETE WHERE clauses are indexed to avoid holding table-level write locks!
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
              Comprehensive reference questions covering correlated UPDATE, correlated DELETE, Error 1093 mitigation, and multi-table DML syntax.
            </p>
          </div>

          <FAQTemplate
            title="Correlated UPDATE and DELETE FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 9: PlainTextPrint & Teacher's Note */}
        <section id="teacher-notes" className="space-y-8">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              9. Printable Topic Note & Teacher's Observation
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Download clean text documentation for revision and study Sukanta Hui's direct pedagogical insights.
            </p>
          </div>

          <PlainTextPrint
            content={noteText}
            title="Correlated UPDATE and Correlated DELETE Statements"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic6_note.txt"
          />

          <Teacher
            note="Correlated UPDATE and DELETE statements are where database theory directly touches production data integrity. When modifying tables based on subqueries, always beware of Error 1093. Use MySQL's powerful Multi-Table UPDATE ... JOIN syntax — it avoids self-table locking conflicts and executes much faster. And never run a DELETE in production without previewing the records with SELECT first!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic6;
