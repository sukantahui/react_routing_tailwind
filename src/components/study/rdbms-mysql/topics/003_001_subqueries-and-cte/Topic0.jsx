import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

/**
 * Topic0 – Subqueries Concept and Execution Phases
 * Module: 003_001_subqueries-and-cte
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on subquery fundamentals, execution phases, dimensionality, and optimizer unnesting.
 */
const Topic0 = () => {
  // Interactive Simulator State
  const [selectedSubqueryType, setSelectedSubqueryType] = useState("scalar_subquery_where");

  const subqueryScenarios = {
    scalar_subquery_where: {
      title: "1. Scalar Subquery in WHERE Clause (1x1 Atomic Value)",
      badge: "Scalar Filter (1x1)",
      badgeColor: "emerald",
      sqlQuery: `-- Finding students scoring ABOVE the academy-wide average exam score:
-- Phase 1 (Inner Query): Computes AVG(exam_score_pct) = 84.50% ONCE.
-- Phase 2 (Outer Query): Evaluates 'WHERE exam_score_pct &gt; 84.50' across students table.

SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    s.exam_score_pct,
    'Above Average' AS performance_tier
FROM students s
WHERE s.exam_score_pct > (
    SELECT AVG(exam_score_pct) 
    FROM students
)
ORDER BY s.exam_score_pct DESC;`,
      resultRows: [
        { id: "STU-103", name: "Abhronila Saha", detail: "Information Tech", score: "96.20%", benchmark: "Avg: 84.50%", diff: "+11.70%", status: "Honors Top Tier" },
        { id: "STU-101", name: "Mamata Hui", detail: "Computer Science", score: "94.50%", benchmark: "Avg: 84.50%", diff: "+10.00%", status: "Honors Top Tier" },
        { id: "STU-102", name: "Susmita Sen", detail: "Computer Science", score: "88.00%", benchmark: "Avg: 84.50%", diff: "+3.50%", status: "Above Average" },
      ],
      explanation:
        "The non-correlated inner query evaluates once to calculate the arithmetic average (84.50%), passing the scalar constant to the outer query's WHERE filter.",
    },
    column_subquery_in: {
      title: "2. Column Subquery with IN Operator (Nx1 Value List)",
      badge: "Column List (Nx1)",
      badgeColor: "cyan",
      sqlQuery: `-- Finding all students enrolled in branches located in 'Barrackpore':
-- Phase 1 (Inner Query): Evaluates 'SELECT branch_id FROM branches WHERE city = 'Barrackpore' &rarr; [1, 4].
-- Phase 2 (Outer Query): Evaluates 'WHERE branch_id IN (1, 4)'.

SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    s.branch_id,
    s.email
FROM students s
WHERE s.branch_id IN (
    SELECT branch_id 
    FROM branches 
    WHERE city = 'Barrackpore'
);`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", detail: "Branch #1 (Barrackpore Main)", score: "Active", benchmark: "Matches IN (1, 4)", diff: "Matched", status: "Enrolled" },
        { id: "STU-104", name: "Debangshu Roy", detail: "Branch #4 (Barrackpore North)", score: "Active", benchmark: "Matches IN (1, 4)", diff: "Matched", status: "Enrolled" },
      ],
      explanation:
        "The multi-row column subquery returns a 1-dimensional list of branch IDs. The outer query uses `IN` to match students belonging to those branches.",
    },
    derived_table_from: {
      title: "3. Derived Table Subquery in FROM Clause (NxM Virtual Table)",
      badge: "Derived Table (NxM)",
      badgeColor: "amber",
      sqlQuery: `-- Calculating Branch Performance Summary using an inline Derived Table:
-- The subquery in FROM creates a temporary virtual table 'branch_stats'.
-- NOTE: In MySQL, EVERY derived table MUST have an explicit alias!

SELECT 
    b.branch_name,
    b.city,
    dt.total_students,
    dt.avg_branch_score_pct
FROM branches b
JOIN (
    SELECT 
        branch_id,
        COUNT(student_id) AS total_students,
        ROUND(AVG(exam_score_pct), 2) AS avg_branch_score_pct
    FROM students
    GROUP BY branch_id
) AS dt ON b.branch_id = dt.branch_id
ORDER BY dt.avg_branch_score_pct DESC;`,
      resultRows: [
        { id: "BR-01", name: "Barrackpore Central Hub", detail: "Barrackpore", score: "88.90% Avg", benchmark: "45 Students Enrolled", diff: "Top Branch", status: "High Performance" },
        { id: "BR-02", name: "Kolkata Apex Campus", detail: "Kolkata", score: "84.20% Avg", benchmark: "92 Students Enrolled", diff: "Standard", status: "Optimal" },
      ],
      explanation:
        "The subquery inside the `FROM` clause acts as a temporary inline view with the mandatory alias `AS dt`, allowing the outer query to join directly against the aggregated summary.",
    },
    scalar_subquery_select: {
      title: "4. Scalar Subquery in SELECT Projection List",
      badge: "SELECT Projection",
      badgeColor: "rose",
      sqlQuery: `-- Computing dynamic course enrollment counts per student in the SELECT list:
-- Evaluates the scalar count for each student row individually.

SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    s.dept_id,
    (
        SELECT COUNT(e.enrollment_id) 
        FROM enrollments e 
        WHERE e.student_id = s.student_id
    ) AS total_active_courses,
    (
        SELECT COALESCE(SUM(p.amount_paid_inr), 0.00)
        FROM enrollments e2
        JOIN fee_payments p ON e2.enrollment_id = p.enrollment_id
        WHERE e2.student_id = s.student_id
    ) AS total_fees_paid_inr
FROM students s
ORDER BY total_active_courses DESC;`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", detail: "Computer Science", score: "3 Courses Active", benchmark: "₹25,000.00 Paid", diff: "Paid in Full", status: "Active Student" },
        { id: "STU-103", name: "Abhronila Saha", detail: "Information Tech", score: "2 Courses Active", benchmark: "₹22,000.00 Paid", diff: "Paid in Full", status: "Active Student" },
      ],
      explanation:
        "Scalar subqueries embedded inside the `SELECT` list project calculated summary attributes dynamically for each student record.",
    },
  };

  const navItems = [
    { id: "subquery-concept", label: "1. Subquery Fundamentals" },
    { id: "dimensionality", label: "2. Subquery Dimensionality" },
    { id: "svg-diagrams", label: "3. Execution Phases & Dimensionality SVGs" },
    { id: "interactive-sandbox", label: "4. Live Subquery Workbench" },
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
            <span>Topic 0 of 14</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Advanced SQL Foundations
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Subqueries Concept & Execution Phases
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master the architecture of nested SQL queries. Understand scalar, column, row, and table-level dimensionality, execution lifecycle phases, non-correlated vs correlated mechanics, and optimizer unnesting.
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
        {/* SECTION 1: Fundamentals */}
        <section id="subquery-concept" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. What is a Subquery? Syntax & Core Mechanics
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              An embedded query enclosed in parentheses that computes dynamic intermediate data for its parent outer query.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <span>📥</span> Inner Query (Subquery)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                The nested statement in parentheses that computes a dynamic scalar value, column list, or derived virtual table.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span>📤</span> Outer Query (Parent)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                The enclosing SQL statement that consumes the subquery's intermediate output to filter, project, or join rows.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <span>⚡</span> Non-Correlated Phase
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Independent subqueries execute exactly ONCE before the outer query runs, passing cached values to the outer engine.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Dimensionality */}
        <section id="dimensionality" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Subquery Dimensionality Classifications
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Categorizing subqueries by their output shape and permitted placement in SQL clauses.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-emerald-400 font-bold block text-sm">1. Scalar (1x1)</span>
              <p className="text-slate-400 font-sans">Single value. Used with =, &gt;, &lt;, >=, <=.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-cyan-400 font-bold block text-sm">2. Column (Nx1)</span>
              <p className="text-slate-400 font-sans">List of values. Used with IN, NOT IN, ANY, ALL.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-indigo-400 font-bold block text-sm">3. Row (1xM)</span>
              <p className="text-slate-400 font-sans">Tuple of columns. Used with (a, b) = (SELECT ...).</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-amber-400 font-bold block text-sm">4. Table (NxM)</span>
              <p className="text-slate-400 font-sans">Derived table in FROM clause. MUST have alias.</p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Execution Lifecycle & Dimensionality Matrix
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How the MySQL execution engine orchestrates inner and outer query pipelines.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Non-Correlated Lifecycle */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Non-Correlated Subquery Two-Phase Execution
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Phase 1 */}
                  <g>
                    <rect x="30" y="25" width="280" height="110" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="170" y="50" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Phase 1: Inner Query (Runs Once)</text>
                    <rect x="45" y="65" width="250" height="30" rx="4" fill="#022c22" />
                    <text x="170" y="84" fill="#a7f3d0" fontSize="9 font-mono" textAnchor="middle">SELECT AVG(exam_score) → 84.50%</text>
                    <text x="170" y="120" fill="#34d399" fontSize="8 font-bold" textAnchor="middle">Evaluated & Cached in RAM</text>
                  </g>

                  {/* Phase 2 */}
                  <g>
                    <rect x="420" y="25" width="400" height="110" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                    <text x="620" y="50" fill="#c7d2fe" fontSize="11" fontWeight="bold" textAnchor="middle">Phase 2: Outer Query Execution</text>
                    <rect x="435" y="65" width="370" height="30" rx="4" fill="#0f172a" />
                    <text x="620" y="84" fill="#38bdf8" fontSize="9 font-mono" textAnchor="middle">SELECT * FROM students WHERE exam_score &gt; 84.50</text>
                    <text x="620" y="120" fill="#818cf8" fontSize="8 font-bold" textAnchor="middle">Fast B-Tree Index Range Seek (O(log N))</text>
                  </g>

                  {/* Flow Arrow */}
                  <path d="M 310 80 L 420 80" stroke="#10b981" strokeWidth="2" />
                  <text x="365" y="70" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">84.50%</text>
                </svg>
              </div>
            </div>

            {/* SVG 2: Dimensionality Matrix */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400 font-mono">Diagram B:</span> Subquery Dimensionality Output Shapes
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 140" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Scalar */}
                  <g>
                    <rect x="20" y="25" width="180" height="90" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="110" y="50" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Scalar (1x1)</text>
                    <rect x="40" y="65" width="140" height="25" rx="3" fill="#022c22" />
                    <text x="110" y="81" fill="#a7f3d0" fontSize="9 font-mono" textAnchor="middle">[ 84.50 ]</text>
                  </g>

                  {/* Column */}
                  <g>
                    <rect x="230" y="25" width="180" height="90" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="320" y="50" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">Column (Nx1)</text>
                    <rect x="250" y="65" width="140" height="35" rx="3" fill="#0f172a" />
                    <text x="320" y="80" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">[ 1, 4, 7, 12 ]</text>
                    <text x="320" y="93" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">IN / NOT IN</text>
                  </g>

                  {/* Row */}
                  <g>
                    <rect x="440" y="25" width="180" height="90" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="530" y="50" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">Row (1xM Tuple)</text>
                    <rect x="460" y="65" width="140" height="25" rx="3" fill="#0f172a" />
                    <text x="530" y="81" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">( 101, 'ACTIVE' )</text>
                  </g>

                  {/* Table */}
                  <g>
                    <rect x="650" y="25" width="180" height="90" rx="6" fill="#450a0a" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="740" y="50" fill="#fcd34d" fontSize="10" fontWeight="bold" textAnchor="middle">Table (NxM Derived)</text>
                    <rect x="670" y="65" width="140" height="35" rx="3" fill="#1e293b" />
                    <text x="740" y="80" fill="#fcd34d" fontSize="8 font-mono" textAnchor="middle">[ Row 1: A, B, C ]</text>
                    <text x="740" y="93" fill="#fcd34d" fontSize="8 font-mono" textAnchor="middle">[ Row 2: D, E, F ]</text>
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
              4. Interactive Subquery Execution Sandbox
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Inspect scalar filters, column `IN` queries, derived tables in `FROM`, and subqueries in the `SELECT` list live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(subqueryScenarios).map(([key, item]) => {
              const isActive = selectedSubqueryType === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedSubqueryType(key)}
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
                        item.badgeColor === "amber" && "bg-amber-950 text-amber-400 border border-amber-800",
                        item.badgeColor === "rose" && "bg-rose-950 text-rose-400 border border-rose-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Query" : "○ Run Query"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{subqueryScenarios[selectedSubqueryType].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{subqueryScenarios[selectedSubqueryType].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Subquery Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Subquery Execution</span>
                <span className="text-emerald-400">Two-Phase Evaluation</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {subqueryScenarios[selectedSubqueryType].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">ID / Code</th>
                    <th className="py-3 px-4 text-white">Student / Branch</th>
                    <th className="py-3 px-4 text-emerald-400">Department / City</th>
                    <th className="py-3 px-4 text-cyan-400">Score / Metrics</th>
                    <th className="py-3 px-4 text-indigo-400">Benchmark / Condition</th>
                    <th className="py-3 px-4 text-amber-400">Variance / Difference</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {subqueryScenarios[selectedSubqueryType].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.name}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.detail}</td>
                      <td className="py-3 px-4 text-slate-300 font-bold">{row.score}</td>
                      <td className="py-3 px-4 text-indigo-300">{row.benchmark}</td>
                      <td className="py-3 px-4 text-amber-300 font-sans">{row.diff}</td>
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
              Real-world subquery architectures in education and enterprise systems.
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
                  Defensive Subquery Engineering: Preventing Error 1242
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Academy DB</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui audits student scholarship award pipelines. If two students share the exact top score, a subquery without aggregation can return multiple rows and crash with Error 1242! Always enforce scalar safety using <code className="text-emerald-300 font-mono">LIMIT 1</code> or aggregate functions like <code className="text-emerald-300 font-mono">MAX()</code>.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- ❌ Vulnerable to Error 1242 if multiple top scores exist:
SELECT student_name FROM students WHERE exam_score = (SELECT score FROM scores WHERE rank = 1);

-- ✅ Mathematically Guaranteed Scalar Safety:
SELECT student_name FROM students WHERE exam_score = (SELECT MAX(score) FROM scores);`}
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
              Avoid subquery syntax crashes and performance traps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Forgetting Derived Table Alias in FROM
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Writing <code className="text-rose-300 font-mono">FROM (SELECT ...)</code> without an alias throws <code className="text-rose-300 font-mono">Error 1248: Every derived table must have its own alias</code>.
              </p>
              <div className="text-xs text-slate-400">
                Fix: Always add an explicit alias like <code className="text-emerald-400 font-mono">AS dt</code>.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Subqueries vs CTEs for Readability
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                When subqueries exceed 2 nested levels, refactor them into linear Common Table Expressions (CTEs) using the <code className="text-emerald-400 font-mono">WITH</code> clause.
              </p>
              <div className="text-xs text-slate-400">
                Improves maintainability and makes SQL logic self-documenting.
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
              Key takeaways for mastering subquery concepts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Student Subquery Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Identify subquery dimensionality: Scalar (1x1), Column (Nx1), or Table (NxM).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Understand that Non-Correlated subqueries evaluate exactly ONCE.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Always assign aliases to derived tables in the FROM clause.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Use multi-row operators (<code className="text-cyan-300 font-mono">IN, ANY, ALL</code>) when inner queries return lists.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe subquery unnesting in MySQL 8.0...”</span>
                  Modern MySQL optimizers automatically convert many <code className="text-cyan-300 font-mono">IN (SELECT ...)</code> subqueries into efficient semi-joins under the hood!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about SELECT list subquery cost...”</span>
                  Placing a correlated subquery in the SELECT list across 100,000 rows executes 100,000 query lookups; rewrite as a <code className="text-cyan-300 font-mono">LEFT JOIN</code> with <code className="text-cyan-300 font-mono">GROUP BY</code> instead!
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
              Comprehensive reference questions covering subqueries concepts, execution phases, dimensionality, and optimizer unnesting.
            </p>
          </div>

          <FAQTemplate
            title="Subqueries Concept and Execution Phases FAQs"
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
            title="Subqueries Concept and Execution Phases"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic0_note.txt"
          />

          <Teacher
            note="Welcome to Segment 3! Subqueries are the bridge between simple single-table operations and complex enterprise analytical programming. Always remember the distinction between Non-Correlated subqueries (which run once and cache their result) and Correlated subqueries (which execute for every single row). Master this concept and you will write optimized, high-performance advanced SQL."
          />
        </section>
      </main>
    </div>
  );
};

export default Topic0;
