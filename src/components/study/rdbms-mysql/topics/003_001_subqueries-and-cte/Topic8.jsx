import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";

/**
 * Topic8 – Introduction to Common Table Expressions (CTE) using WITH Clause
 * Module: 003_001_subqueries-and-cte
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on Common Table Expressions (CTEs), the WITH clause, query modularity, optimizer merging, and multi-reference reuse.
 */
const Topic8 = () => {
  // Interactive Simulator State
  const [selectedCTEScenario, setSelectedCTEScenario] = useState("basic_filtering_cte");

  const cteScenarios = {
    basic_filtering_cte: {
      title: "1. Basic Single CTE (Linear Top-to-Bottom Flow)",
      badge: "Single CTE",
      badgeColor: "emerald",
      sqlQuery: `-- Step 1: Extract & Transform high-performing students in the CTE:
WITH TopScorers AS (
    SELECT 
        s.student_id,
        CONCAT(s.first_name, ' ', s.last_name) AS student_name,
        s.dept_id,
        s.exam_score_pct
    FROM students s
    WHERE s.exam_score_pct &ge; 90.00
)
-- Step 2: Main Query formats and projects from the named CTE:
SELECT 
    ts.student_id,
    ts.student_name,
    d.dept_name,
    ts.exam_score_pct,
    'Gold Academic Honors' AS award_title
FROM TopScorers ts
JOIN departments d ON ts.dept_id = d.dept_id
ORDER BY ts.exam_score_pct DESC;`,
      resultRows: [
        { id: "STU-103", name: "Abhronila Saha", dept: "Information Tech", score: "96.20%", pipelineRole: "TopScorers CTE", reuseCount: "1 Reference", status: "Gold Medalist" },
        { id: "STU-101", name: "Mamata Hui", dept: "Computer Science", score: "94.50%", pipelineRole: "TopScorers CTE", reuseCount: "1 Reference", status: "Gold Medalist" },
      ],
      explanation:
        "The `WITH TopScorers AS (...)` block defines an isolated temporary result set. The main query reads linearly from this named block, eliminating nested derived tables.",
    },
    pre_aggregated_dept_cte: {
      title: "2. Pre-Aggregated Department Summary CTE with JOIN",
      badge: "Pre-Aggregation CTE",
      badgeColor: "cyan",
      sqlQuery: `-- Step 1: Pre-calculate department average scores in the CTE:
WITH DeptPerformance AS (
    SELECT 
        dept_id,
        COUNT(student_id) AS total_enrolled,
        ROUND(AVG(exam_score_pct), 2) AS dept_avg_score,
        MAX(exam_score_pct) AS dept_top_score
    FROM students
    GROUP BY dept_id
)
-- Step 2: Main Query joins students against their department benchmark:
SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    d.dept_name,
    s.exam_score_pct,
    dp.dept_avg_score,
    (s.exam_score_pct - dp.dept_avg_score) AS variance_from_avg
FROM students s
JOIN departments d ON s.dept_id = d.dept_id
JOIN DeptPerformance dp ON s.dept_id = dp.dept_id
WHERE s.exam_score_pct &gt; dp.dept_avg_score
ORDER BY variance_from_avg DESC;`,
      resultRows: [
        { id: "STU-103", name: "Abhronila Saha", dept: "Information Tech", score: "96.20%", pipelineRole: "DeptPerformance CTE", reuseCount: "1 Reference", status: "+6.90% Above Dept" },
        { id: "STU-101", name: "Mamata Hui", dept: "Computer Science", score: "94.50%", pipelineRole: "DeptPerformance CTE", reuseCount: "1 Reference", status: "+3.25% Above Dept" },
      ],
      explanation:
        "Pre-aggregates department metrics in the CTE first, ensuring the subsequent join is a fast 1:1 lookup with zero row multiplication.",
    },
    cte_multi_reference_reuse: {
      title: "3. Reusing the Same CTE Multiple Times in One Query",
      badge: "Multi-Reference DRY",
      badgeColor: "amber",
      sqlQuery: `-- Demonstrating the DRY (Don't Repeat Yourself) principle:
-- The CTE is defined ONCE and referenced TWICE in the main query:
WITH ActiveFeeLedger AS (
    SELECT student_id, SUM(amount_paid_inr) AS total_paid
    FROM fee_payments p
    JOIN enrollments e ON p.enrollment_id = e.enrollment_id
    GROUP BY student_id
)
SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    fl.total_paid AS my_payment,
    (SELECT AVG(total_paid) FROM ActiveFeeLedger) AS academy_avg_payment,
    (fl.total_paid - (SELECT AVG(total_paid) FROM ActiveFeeLedger)) AS diff_from_avg
FROM students s
JOIN ActiveFeeLedger fl ON s.student_id = fl.student_id;`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", dept: "Computer Science", score: "₹25,000.00", pipelineRole: "ActiveFeeLedger", reuseCount: "2 References", status: "+₹3,333.33 Above" },
        { id: "STU-103", name: "Abhronila Saha", dept: "Information Tech", score: "₹22,000.00", pipelineRole: "ActiveFeeLedger", reuseCount: "2 References", status: "+₹333.33 Above" },
      ],
      explanation:
        "`ActiveFeeLedger` is defined once and referenced twice: in the `FROM` join and in the scalar average subquery. Derived tables would require copying and re-evaluating the query twice.",
    },
    cte_with_window_functions: {
      title: "4. CTE with Window Functions (Modern Top-N per Dept)",
      badge: "CTE + Window Frame",
      badgeColor: "rose",
      sqlQuery: `-- The Ultimate Analytical Pattern: Partition Ranking in a CTE:
WITH RankedDepartmentStudents AS (
    SELECT 
        s.student_id,
        CONCAT(s.first_name, ' ', s.last_name) AS student_name,
        d.dept_name,
        s.exam_score_pct,
        DENSE_RANK() OVER (PARTITION BY s.dept_id ORDER BY s.exam_score_pct DESC) AS dept_rank
    FROM students s
    JOIN departments d ON s.dept_id = d.dept_id
)
-- Main Query filters Top 1 student per department cleanly:
SELECT * 
FROM RankedDepartmentStudents 
WHERE dept_rank = 1
ORDER BY dept_name;`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", dept: "Computer Science", score: "94.50%", pipelineRole: "RankedStudents CTE", reuseCount: "Rank Filter", status: "Dept Rank #1" },
        { id: "STU-103", name: "Abhronila Saha", dept: "Information Tech", score: "96.20%", pipelineRole: "RankedStudents CTE", reuseCount: "Rank Filter", status: "Dept Rank #1" },
      ],
      explanation:
        "Combining `DENSE_RANK()` inside a CTE is the gold standard for Top-N per category queries in MySQL 8.0+, executing in a single sorting pass without nested loops.",
    },
  };

  const navItems = [
    { id: "cte-concept", label: "1. What is a CTE?" },
    { id: "cte-vs-derived", label: "2. CTE vs Derived Tables" },
    { id: "svg-diagrams", label: "3. Linear Pipeline & Multi-Reuse SVGs" },
    { id: "interactive-sandbox", label: "4. Live CTE Workbench" },
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
            <span>Topic 8 of 14</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Modern Modular SQL
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Common Table Expressions (CTE) & WITH Clause
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Revolutionize your SQL architecture with MySQL 8.0+ Common Table Expressions. Master linear top-to-bottom pipeline design, multi-reference reuse, optimizer merging vs materialization, and analytical window ranking.
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
        <section id="cte-concept" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. What is a Common Table Expression (CTE)?
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              A temporary named query block defined at the beginning of a SQL statement using the `WITH` keyword.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span>📖</span> Linear Top-to-Bottom Flow
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Transforms nested inside-out SQL into readable modular steps (Extract → Transform → Project & Format).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <span>🔄</span> Multi-Reference Reuse (DRY)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Define the CTE once and reference it multiple times in the main query without duplicating code or re-scanning tables.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <span>⚡</span> Optimizer Merging & Materialization
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                MySQL 8.0 either merges the CTE directly into the main query or materializes it once into an in-memory hash table.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: CTE vs Derived */}
        <section id="cte-vs-derived" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. CTEs vs Derived Tables & Views
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing query modularity constructs in relational databases.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                <tr>
                  <th className="py-3.5 px-4 text-cyan-400">Architectural Feature</th>
                  <th className="py-3.5 px-4 text-emerald-400">Common Table Expression (CTE)</th>
                  <th className="py-3.5 px-4 text-amber-400">Derived Table in FROM</th>
                  <th className="py-3.5 px-4 text-white">Database View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs sm:text-sm font-sans">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white">Scope / Lifespan</td>
                  <td className="py-3 px-4 text-emerald-300 font-mono">Single Query Statement</td>
                  <td className="py-3 px-4 text-slate-300 font-mono">Single Query Clause</td>
                  <td className="py-3 px-4 text-cyan-300 font-mono">Permanent Schema Catalog</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white">Readability Structure</td>
                  <td className="py-3 px-4 text-emerald-300">Linear Top-to-Bottom</td>
                  <td className="py-3 px-4 text-rose-400 font-mono">Nested Inside-Out</td>
                  <td className="py-3 px-4 text-slate-300">Independent Query Object</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white">Multiple Reuse in 1 Query</td>
                  <td className="py-3 px-4 text-emerald-300 font-bold">YES (Write Once, Reuse Anywhere)</td>
                  <td className="py-3 px-4 text-rose-400">NO (Must copy-paste entire subquery)</td>
                  <td className="py-3 px-4 text-emerald-300">YES (Referenced by View Name)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white">Recursive Hierarchy Traversal</td>
                  <td className="py-3 px-4 text-emerald-300 font-bold">YES (WITH RECURSIVE)</td>
                  <td className="py-3 px-4 text-rose-400">NO</td>
                  <td className="py-3 px-4 text-emerald-300">YES (If defined with recursive CTE)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Linear CTE Pipeline & Multi-Reuse
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing linear data pipelines against multiple reference reuse patterns.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Linear Pipeline */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> CTE Linear Top-to-Bottom Execution Pipeline
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1: WITH */}
                  <g>
                    <rect x="30" y="30" width="240" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="150" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">1. WITH TopScorers AS (...)</text>
                    <rect x="45" y="70" width="210" height="40" rx="4" fill="#0f172a" />
                    <text x="150" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Filter score >= 90.00%</text>
                    <text x="150" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Extract &amp; Clean Data</text>
                  </g>

                  {/* Step 2: Named Set in RAM */}
                  <g>
                    <rect x="310" y="30" width="250" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="435" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">2. Named In-Memory Result</text>
                    <rect x="325" y="70" width="220" height="40" rx="4" fill="#022c22" />
                    <text x="435" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Temporary Virtual Set 'TopScorers'</text>
                    <text x="435" y="102" fill="#a7f3d0" fontSize="7 font-mono" textAnchor="middle">Available across query scope</text>
                  </g>

                  {/* Step 3: Main Query */}
                  <g>
                    <rect x="600" y="30" width="220" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="710" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">3. Main Final Query</text>
                    <rect x="615" y="70" width="190" height="40" rx="4" fill="#0f172a" />
                    <text x="710" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">SELECT * FROM TopScorers</text>
                    <text x="710" y="102" fill="#38bdf8" fontSize="7 font-mono" textAnchor="middle">JOIN departments ... ORDER BY</text>
                  </g>

                  {/* Arrows */}
                  <path d="M 270 80 L 310 80" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 560 80 L 600 80" stroke="#10b981" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* SVG 2: Multi-Reuse */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-amber-400 font-mono">Diagram B:</span> Single CTE Definition Reused Across Multiple Branches
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Single CTE */}
                  <g>
                    <rect x="30" y="45" width="260" height="70" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="160" y="75" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">WITH FeeLedger AS (SELECT ...)</text>
                    <text x="160" y="95" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Defined ONCE in Query Header</text>
                  </g>

                  {/* Branch A */}
                  <g>
                    <rect x="420" y="20" width="380" height="50" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="610" y="42" fill="#c7d2fe" fontSize="9 font-mono" textAnchor="middle">Reference #1: JOIN FeeLedger fl ON ...</text>
                    <text x="610" y="56" fill="#38bdf8" fontSize="7 font-bold" textAnchor="middle">Direct Row-Level Attachment</text>
                  </g>

                  {/* Branch B */}
                  <g>
                    <rect x="420" y="90" width="380" height="50" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="610" y="112" fill="#c7d2fe" fontSize="9 font-mono" textAnchor="middle">Reference #2: (SELECT AVG(total) FROM FeeLedger)</text>
                    <text x="610" y="126" fill="#38bdf8" fontSize="7 font-bold" textAnchor="middle">Global Benchmark Aggregate</text>
                  </g>

                  {/* Split Arrows */}
                  <path d="M 290 80 L 420 45" stroke="#10b981" strokeWidth="2" />
                  <path d="M 290 80 L 420 115" stroke="#10b981" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Common Table Expression (CTE) Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test single filtering CTEs, pre-aggregated department joins, multi-reference DRY reuse, and window ranking CTEs live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(cteScenarios).map(([key, item]) => {
              const isActive = selectedCTEScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCTEScenario(key)}
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
                    {isActive ? "● Active CTE" : "○ Inspect CTE"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{cteScenarios[selectedCTEScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{cteScenarios[selectedCTEScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                WITH CTE Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Statement with WITH Clause</span>
                <span className="text-emerald-400">Modular Pipeline</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {cteScenarios[selectedCTEScenario].sqlQuery}
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
                    <th className="py-3 px-4 text-cyan-400">Metric / Score</th>
                    <th className="py-3 px-4 text-indigo-400">CTE Block Source</th>
                    <th className="py-3 px-4 text-amber-400">Reuse Count</th>
                    <th className="py-3 px-4 text-emerald-400">Outcome</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {cteScenarios[selectedCTEScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.name}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.dept}</td>
                      <td className="py-3 px-4 text-slate-300 font-bold">{row.score}</td>
                      <td className="py-3 px-4 text-indigo-300">{row.pipelineRole}</td>
                      <td className="py-3 px-4 text-amber-300 font-sans">{row.reuseCount}</td>
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
              Real-world query modularization with Common Table Expressions.
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
                  Refactoring Nested Inside-Out Subqueries to Modular CTEs
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Academy Analytics</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui refactored a 4-level nested SQL report into a clean 3-stage linear CTE pipeline. The new query is self-documenting, reduced code lines by 40%, and allows individual pipeline stages to be independently verified during peer review!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Linear 3-Stage Pipeline with WITH Clause:
WITH EnrolledCourses AS (
    SELECT student_id, COUNT(*) AS course_count FROM enrollments GROUP BY student_id
),
FeePaymentsTotal AS (
    SELECT student_id, SUM(amount_paid_inr) AS total_paid FROM fee_payments GROUP BY student_id
)
SELECT s.student_name, ec.course_count, fp.total_paid
FROM students s
JOIN EnrolledCourses ec ON s.student_id = ec.student_id
JOIN FeePaymentsTotal fp ON s.student_id = fp.student_id;`}
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
              Avoid CTE syntax crashes and misunderstanding query scope.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Assuming CTEs Persist Across Queries
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                A CTE exists ONLY for the single query statement in which it is defined. Attempting to query the CTE in a second statement throws <code className="text-rose-300 font-mono">Table 'cte_name' doesn't exist</code>.
              </p>
              <div className="text-xs text-slate-400">
                Fix: If you need persistence across queries, create a View or Temporary Table.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Combine CTEs with Window Functions
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Window functions (<code className="text-emerald-400 font-mono">DENSE_RANK()</code>, <code className="text-emerald-400 font-mono">ROW_NUMBER()</code>) cannot appear directly in WHERE clauses; wrap them inside a CTE and filter in the main query!
              </p>
              <div className="text-xs text-slate-400">
                The standard industry design pattern for analytical filtering.
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
              Key takeaways for Common Table Expressions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> CTE Design Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Declare CTEs using <code className="text-cyan-300 font-mono">WITH cte_name AS (SELECT ...)</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Structure multi-stage queries linearly from top to bottom.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Reuse CTE definitions across multiple joins or unions (DRY).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Wrap Window Functions inside CTEs for clean outer WHERE filtering.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe CTE Merging in EXPLAIN...”</span>
                  MySQL 8.0 automatically merges simple CTEs into the outer query block to eliminate temporary table materialization overhead!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about incremental testing...”</span>
                  When debugging complex queries, test each CTE block in isolation with <code className="text-cyan-300 font-mono">SELECT * FROM step1;</code> before writing subsequent stages!
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
              Comprehensive reference questions covering Common Table Expressions (CTEs), WITH clause mechanics, optimizer inlining, and multi-reference reuse.
            </p>
          </div>

          <FAQTemplate
            title="Introduction to CTEs FAQs"
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
            title="Introduction to Common Table Expressions (CTE) using WITH Clause"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic8_note.txt"
          />

          <Teacher
            note="CTEs are the biggest upgrade to SQL code quality in MySQL 8.0. Gone are the days of reading deeply nested derived tables from the inside out. With the WITH clause, you write code that reads like a clean, linear story: Step 1 (Extract), Step 2 (Transform), and Final Query (Project). Adopt CTEs today and your teammates will thank you!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic8;
