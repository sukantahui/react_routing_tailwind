import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

/**
 * Topic4 – Correlated Subqueries: Row-by-Row Execution and Dependency on Outer Query
 * Module: 003_001_subqueries-and-cte
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on correlated subqueries, nested loop execution, outer dependency scoping, and window function refactoring.
 */
const Topic4 = () => {
  // Interactive Simulator State
  const [selectedCorrelatedScenario, setSelectedCorrelatedScenario] = useState("above_dept_avg");

  const correlatedScenarios = {
    above_dept_avg: {
      title: "1. Above-Own-Department Average Filter",
      badge: "Group Benchmark",
      badgeColor: "emerald",
      sqlQuery: `-- Finding students scoring strictly above their OWN department's average score:
-- The inner subquery references 's.dept_id' from the outer candidate row.
-- Execution: Re-evaluates AVG() for each student's specific department!

SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    d.dept_name,
    s.exam_score_pct,
    'Above Dept Average' AS performance_tier
FROM students s
JOIN departments d ON s.dept_id = d.dept_id
WHERE s.exam_score_pct > (
    SELECT AVG(i.exam_score_pct) 
    FROM students i 
    WHERE i.dept_id = s.dept_id -- Correlation Link!
)
ORDER BY d.dept_name, s.exam_score_pct DESC;`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", dept: "Computer Science", score: "94.50%", deptAvg: "CS Avg: 91.25%", variance: "+3.25%", status: "Dept Honors" },
        { id: "STU-103", name: "Abhronila Saha", dept: "Information Tech", score: "96.20%", deptAvg: "IT Avg: 89.30%", variance: "+6.90%", status: "Dept Honors" },
      ],
      explanation:
        "The inner subquery evaluates dynamically for each department. Mamata is compared to CS (91.25%) and Abhronila to IT (89.30%), rather than a single static global average.",
    },
    dept_top_scorer: {
      title: "2. Department Top Scorer (= MAX Per Group)",
      badge: "Group Max",
      badgeColor: "cyan",
      sqlQuery: `-- Discovering the highest-scoring student within EACH individual department:
-- Inner Subquery: Computes MAX(exam_score_pct) for s.dept_id.
-- Outer Query: Finds all students in that department matching the top score.

SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    d.dept_name,
    s.exam_score_pct,
    'Department Gold Medalist' AS award_title
FROM students s
JOIN departments d ON s.dept_id = d.dept_id
WHERE s.exam_score_pct = (
    SELECT MAX(i.exam_score_pct) 
    FROM students i 
    WHERE i.dept_id = s.dept_id
)
ORDER BY d.dept_name;`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", dept: "Computer Science", score: "94.50%", deptAvg: "CS Max: 94.50%", variance: "Top Rank", status: "CS Top Scorer" },
        { id: "STU-103", name: "Abhronila Saha", dept: "Information Tech", score: "96.20%", deptAvg: "IT Max: 96.20%", variance: "Top Rank", status: "IT Top Scorer" },
      ],
      explanation:
        "Isolates the maximum score per department without hardcoding. An index on `(dept_id, exam_score_pct)` allows the optimizer to jump to the last index key in $O(1)$ time.",
    },
    top_n_relational_division: {
      title: "3. Top-1 Per Category Ranking (Relational Count)",
      badge: "Relational Count",
      badgeColor: "amber",
      sqlQuery: `-- Legacy Pre-MySQL 8.0 Pattern: Finding Top 1 Student per Department:
-- Counts how many peers in the SAME department have a higher score.
-- If (Count < 1), this student has zero peers with higher scores → Rank 1!

SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    d.dept_name,
    s.exam_score_pct
FROM students s
JOIN departments d ON s.dept_id = d.dept_id
WHERE (
    SELECT COUNT(i.student_id) 
    FROM students i 
    WHERE i.dept_id = s.dept_id 
      AND i.exam_score_pct > s.exam_score_pct
) < 1
ORDER BY d.dept_name;`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", dept: "Computer Science", score: "94.50%", deptAvg: "0 Peers Higher", variance: "Rank #1", status: "Top Rank" },
        { id: "STU-103", name: "Abhronila Saha", dept: "Information Tech", score: "96.20%", deptAvg: "0 Peers Higher", variance: "Rank #1", status: "Top Rank" },
      ],
      explanation:
        "The classic relational division pattern for top-N ranking before window functions. Counts peers scoring strictly higher in the same department partition.",
    },
    modern_window_refactoring: {
      title: "4. Modern MySQL 8.0+ Window Function Refactoring",
      badge: "Window Function",
      badgeColor: "rose",
      sqlQuery: `-- Modern High-Performance Refactoring: ZERO Nested Loops!
-- Executes in a single linear pass over the partitioned dataset:

WITH DeptRanked AS (
    SELECT 
        s.student_id,
        CONCAT(s.first_name, ' ', s.last_name) AS student_name,
        d.dept_name,
        s.exam_score_pct,
        ROUND(AVG(s.exam_score_pct) OVER (PARTITION BY s.dept_id), 2) AS dept_avg_score,
        DENSE_RANK() OVER (PARTITION BY s.dept_id ORDER BY s.exam_score_pct DESC) AS dept_rank
    FROM students s
    JOIN departments d ON s.dept_id = d.dept_id
)
SELECT * 
FROM DeptRanked 
WHERE exam_score_pct > dept_avg_score
ORDER BY dept_name, exam_score_pct DESC;`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", dept: "Computer Science", score: "94.50%", deptAvg: "CS Avg: 91.25%", variance: "Rank #1", status: "Single Pass CTE" },
        { id: "STU-103", name: "Abhronila Saha", dept: "Information Tech", score: "96.20%", deptAvg: "IT Avg: 89.30%", variance: "Rank #1", status: "Single Pass CTE" },
      ],
      explanation:
        "Modern SQL refactors correlated subqueries into `AVG() OVER (PARTITION BY ...)` or `DENSE_RANK()`, avoiding row-by-row re-evaluation and dropping execution time from seconds to milliseconds.",
    },
  };

  const navItems = [
    { id: "correlated-concept", label: "1. Correlated Subquery Concept" },
    { id: "nested-loop", label: "2. Nested Loop Execution" },
    { id: "svg-diagrams", label: "3. Flow & Scoping Trap SVGs" },
    { id: "interactive-sandbox", label: "4. Live Correlated Workbench" },
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
            <span>Topic 4 of 14</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Dependent Subquery Architecture
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Correlated Subqueries: Row-by-Row Execution
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master correlated (dependent) subqueries. Understand the iterative nested loop execution lifecycle, table alias scoping rules, composite index acceleration, and modern refactoring into Window Functions.
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
        <section id="correlated-concept" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. What is a Correlated Subquery?
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              An inner query that references columns of the outer query, creating a parameter dependency evaluated for each outer row.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <span>🔄</span> Outer Row Dependency
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                The inner query references outer columns (e.g. <code className="text-cyan-300 font-mono">i.dept_id = s.dept_id</code>) and cannot run as a standalone query.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span>⚡</span> Iterative Execution
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Conceptually executed once per candidate row in the outer query block, functioning like a parameterized nested for-loop.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <span>🚀</span> Index Acceleration
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                A composite index on <code className="text-amber-300 font-mono">(dept_id, metric_col)</code> transforms slow $O(N \times M)$ scans into fast $O(N \times \log M)$ index seeks.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Nested Loop */}
        <section id="nested-loop" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. The 4-Step Iterative Nested Loop Pipeline
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Step-by-step execution lifecycle of a correlated subquery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-cyan-400 font-bold block text-sm">Step 1: Outer Fetch</span>
              <p className="text-slate-400 font-sans">Fetch candidate row from outer table (e.g. Mamata, Dept #1).</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-emerald-400 font-bold block text-sm">Step 2: Parameter Pass</span>
              <p className="text-slate-400 font-sans">Pass outer column values (dept_id = 1) into inner query parameters.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-indigo-400 font-bold block text-sm">Step 3: Inner Eval</span>
              <p className="text-slate-400 font-sans">Inner query computes AVG(score) for Dept #1 → returns 91.25%.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-amber-400 font-bold block text-sm">Step 4: Filter & Advance</span>
              <p className="text-slate-400 font-sans">Evaluate 94.50 &gt; 91.25 (Pass!) and advance to next row.</p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Iterative Loop & Scoping Hazard
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing correlated nested loop pipelines against column scoping collisions.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Nested Loop */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Correlated Nested Loop Execution Lifecycle
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Outer Loop */}
                  <g>
                    <rect x="30" y="30" width="260" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="160" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">Outer Loop (N Rows)</text>
                    <rect x="45" y="70" width="230" height="40" rx="4" fill="#0f172a" />
                    <text x="160" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">For each Student s:</text>
                    <text x="160" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Pass s.dept_id → Inner Query</text>
                  </g>

                  {/* Inner Query */}
                  <g>
                    <rect x="350" y="30" width="260" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="480" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Inner Query (Runs N Times)</text>
                    <rect x="365" y="70" width="230" height="40" rx="4" fill="#022c22" />
                    <text x="480" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">SELECT AVG(score)</text>
                    <text x="480" y="102" fill="#a7f3d0" fontSize="7 font-mono" textAnchor="middle">WHERE i.dept_id = s.dept_id</text>
                  </g>

                  {/* Result */}
                  <g>
                    <rect x="670" y="30" width="150" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="745" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">Filter Check</text>
                    <rect x="680" y="70" width="130" height="40" rx="4" fill="#0f172a" />
                    <text x="745" y="94" fill="#38bdf8" fontSize="9 font-mono" textAnchor="middle">score &gt; dept_avg</text>
                  </g>

                  {/* Arrows */}
                  <path d="M 290 75 L 350 75" stroke="#818cf8" strokeWidth="2" />
                  <path d="M 610 75 L 670 75" stroke="#10b981" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* SVG 2: Scoping Trap */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-rose-400 font-mono">Diagram B:</span> Scoping Hazard: Missing Outer Alias Breakdown
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Bad Query */}
                  <g>
                    <rect x="30" y="30" width="360" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="210" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">❌ Missing Alias Scoping Bug</text>
                    <rect x="45" y="70" width="330" height="40" rx="4" fill="#0f172a" />
                    <text x="210" y="88" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">WHERE dept_id = dept_id</text>
                    <text x="210" y="102" fill="#fca5a5" fontSize="7 font-mono" textAnchor="middle">Resolves to inner table alone (Always TRUE!)</text>
                  </g>

                  {/* Good Query */}
                  <g>
                    <rect x="450" y="30" width="370" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="635" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">✅ Explicit Table Alias Disambiguation</text>
                    <rect x="465" y="70" width="340" height="40" rx="4" fill="#022c22" />
                    <text x="635" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">WHERE i.dept_id = s.dept_id</text>
                    <text x="635" y="102" fill="#34d399" fontSize="7 font-mono" textAnchor="middle">Explicit correlation between outer 's' and inner 'i'</text>
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
              4. Interactive Correlated Subquery Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Inspect above-department-average filters, department top scorers, relational division counts, and window function refactoring live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(correlatedScenarios).map(([key, item]) => {
              const isActive = selectedCorrelatedScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCorrelatedScenario(key)}
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
                    {isActive ? "● Active Pattern" : "○ Run Pattern"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{correlatedScenarios[selectedCorrelatedScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{correlatedScenarios[selectedCorrelatedScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Correlated Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Query Execution</span>
                <span className="text-emerald-400">Iterative Evaluation</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {correlatedScenarios[selectedCorrelatedScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Student ID</th>
                    <th className="py-3 px-4 text-white">Student Name</th>
                    <th className="py-3 px-4 text-emerald-400">Department</th>
                    <th className="py-3 px-4 text-cyan-400">Exam Score</th>
                    <th className="py-3 px-4 text-indigo-400">Evaluated Dept Metric</th>
                    <th className="py-3 px-4 text-amber-400">Variance / Rank</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {correlatedScenarios[selectedCorrelatedScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.name}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.dept}</td>
                      <td className="py-3 px-4 text-slate-300 font-bold">{row.score}</td>
                      <td className="py-3 px-4 text-indigo-300">{row.deptAvg}</td>
                      <td className="py-3 px-4 text-amber-300 font-sans">{row.variance}</td>
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
              Real-world correlated query optimizations and index acceleration.
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
                  Accelerating Correlated Department Benchmark Lookups with Composite Indexes
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore University</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui profiled a slow student merit query: On a table of 25,000 students, calculating department-level averages via a correlated subquery took 4.2 seconds due to full table scans per row ($25,000 \times 25,000 = 625,000,000$ row evaluations). Adding a composite index on <code className="text-emerald-300 font-mono">students(dept_id, exam_score_pct)</code> reduced latency to 8.4ms!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Composite Index that provides instant B-Tree seeks for correlated lookups:
CREATE INDEX idx_students_dept_score ON students(dept_id, exam_score_pct);`}
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
              Avoid scoping collisions and unindexed nested loop traps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Omitting Outer Table Aliases
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Writing <code className="text-rose-300 font-mono">WHERE dept_id = dept_id</code> inside the inner subquery resolves locally to the inner table, breaking correlation and evaluating to TRUE for all rows!
              </p>
              <div className="text-xs text-slate-400">
                Fix: Always use explicit aliases: <code className="text-emerald-400 font-mono">WHERE i.dept_id = s.dept_id</code>.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Refactor to Window Functions in MySQL 8.0+
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Modern MySQL 8.0+ Window Functions (<code className="text-emerald-400 font-mono">AVG() OVER (PARTITION BY ...)</code>) eliminate nested loops entirely, computing partition aggregates in a single sorting pass.
              </p>
              <div className="text-xs text-slate-400">
                The preferred architecture for large analytical queries.
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
              Key takeaways for correlated subqueries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Correlated Subquery Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Identify the correlation link connecting outer and inner tables.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Always use explicit table aliases (<code className="text-cyan-300 font-mono">s</code> and <code className="text-cyan-300 font-mono">i</code>) to avoid scoping bugs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Create composite indexes on <code className="text-cyan-300 font-mono">(correlation_col, filter_col)</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Inspect <code className="text-cyan-300 font-mono">EXPLAIN</code> for <code className="text-rose-300 font-mono">DEPENDENT SUBQUERY</code> nodes.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe DEPENDENT SUBQUERY in EXPLAIN...”</span>
                  When <code className="text-cyan-300 font-mono">EXPLAIN</code> shows <code className="text-rose-300 font-mono">DEPENDENT SUBQUERY</code>, check the outer table row count: if it's over 10,000 rows, consider refactoring to a Window Function or JOIN!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about index prefix matching...”</span>
                  For a correlated subquery on <code className="text-cyan-300 font-mono">WHERE i.dept_id = s.dept_id AND i.score &gt; s.score</code>, place the equality column <code className="text-cyan-300 font-mono">dept_id</code> FIRST in the composite index!
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
              Comprehensive reference questions covering correlated subqueries, nested loop execution, outer dependency scoping, and window function refactoring.
            </p>
          </div>

          <FAQTemplate
            title="Correlated Subqueries FAQs"
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
            title="Correlated Subqueries: Row-by-Row Execution and Dependency on Outer Query"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic4_note.txt"
          />

          <Teacher
            note="Correlated subqueries are one of the most intellectually rewarding concepts in SQL. Remember that they execute like a parameterized function in a loop. When writing them, always provide explicit table aliases (e.g., 's' for outer and 'i' for inner) so MySQL never confuses column scopes. And remember: if you are using MySQL 8.0+, window functions can often replace correlated subqueries with zero loop overhead!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic4;
