import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";

/**
 * Topic9 – Finding Top N Records Per Category / Department without Correlated Subqueries
 * Module: 003_002_advanced-sql-patterns
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on finding Top N records per category, DENSE_RANK tier preservation vs ROW_NUMBER exact counts, CTE design patterns, and index tuning.
 */
const Topic9 = () => {
  // Interactive Simulator State
  const [selectedTopNScenario, setSelectedTopNScenario] = useState("top1_valedictorian_per_dept");

  const topNScenarios = {
    top1_valedictorian_per_dept: {
      title: "1. Top 1 Valedictorian in EACH Department (DENSE_RANK = 1)",
      badge: "Top 1 per Dept",
      badgeColor: "emerald",
      sqlQuery: `-- Extracting the top-scoring student in EACH department (Single-Pass Window CTE):
WITH DepartmentRanked AS (
    SELECT 
        s.student_id,
        CONCAT(s.first_name, ' ', s.last_name) AS student_name,
        d.dept_name,
        s.exam_score_pct,
        DENSE_RANK() OVER (
            PARTITION BY s.dept_id 
            ORDER BY s.exam_score_pct DESC
        ) AS dept_rank
    FROM students s
    JOIN departments d ON s.dept_id = d.dept_id
)
SELECT student_id, student_name, dept_name, exam_score_pct, dept_rank
FROM DepartmentRanked
WHERE dept_rank = 1
ORDER BY dept_name;`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", dept: "Computer Science", score: "94.50%", rank: "Rank #1", method: "DENSE_RANK = 1", status: "CS Valedictorian 🥇" },
        { id: "STU-103", name: "Abhronila Saha", dept: "Information Tech", score: "96.20%", rank: "Rank #1", method: "DENSE_RANK = 1", status: "IT Valedictorian 🥇" },
      ],
      explanation:
        "The CTE computes department ranks in a single sorted stream. Filtering `WHERE dept_rank = 1` immediately returns the valedictorian for every department without nested loops!",
    },
    top2_distinct_score_tiers: {
      title: "2. Top 2 Distinct Score Tiers with DENSE_RANK() <= 2 (Preserves Ties)",
      badge: "Top 2 Tiers (Ties)",
      badgeColor: "cyan",
      sqlQuery: `-- Top 2 Score Tiers per Department (Preserving tied students):
WITH RankedTiers AS (
    SELECT 
        s.student_id,
        CONCAT(s.first_name, ' ', s.last_name) AS student_name,
        d.dept_name,
        s.exam_score_pct,
        DENSE_RANK() OVER (
            PARTITION BY s.dept_id 
            ORDER BY s.exam_score_pct DESC
        ) AS score_tier
    FROM students s
    JOIN departments d ON s.dept_id = d.dept_id
)
SELECT student_id, student_name, dept_name, exam_score_pct, score_tier
FROM RankedTiers
WHERE score_tier <= 2
ORDER BY dept_name, score_tier, exam_score_pct DESC;`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", dept: "Computer Science", score: "94.50%", rank: "Tier #1", method: "DENSE_RANK <= 2", status: "CS Gold" },
        { id: "STU-102", name: "Susmita Sen", dept: "Computer Science", score: "88.00%", rank: "Tier #2", method: "DENSE_RANK <= 2", status: "CS Silver" },
        { id: "STU-103", name: "Abhronila Saha", dept: "Information Tech", score: "96.20%", rank: "Tier #1", method: "DENSE_RANK <= 2", status: "IT Gold" },
        { id: "STU-104", name: "Debangshu Roy", dept: "Information Tech", score: "82.40%", rank: "Tier #2", method: "DENSE_RANK <= 2", status: "IT Silver" },
      ],
      explanation:
        "`DENSE_RANK() <= 2` returns the Top 2 score tiers. If two students tie for 2nd place, both are included because both share `score_tier = 2`.",
    },
    exact_top2_rows_row_number: {
      title: "3. Exact Top 2 Physical Rows per Department (ROW_NUMBER <= 2)",
      badge: "Exact Row Count",
      badgeColor: "amber",
      sqlQuery: `-- Guaranteeing EXACTLY 2 physical rows per department (with deterministic PK tie-breaker):
WITH NumberedStudents AS (
    SELECT 
        s.student_id,
        CONCAT(s.first_name, ' ', s.last_name) AS student_name,
        d.dept_name,
        s.exam_score_pct,
        ROW_NUMBER() OVER (
            PARTITION BY s.dept_id 
            ORDER BY s.exam_score_pct DESC, s.student_id ASC
        ) AS row_num
    FROM students s
    JOIN departments d ON s.dept_id = d.dept_id
)
SELECT student_id, student_name, dept_name, exam_score_pct, row_num
FROM NumberedStudents
WHERE row_num <= 2
ORDER BY dept_name, row_num;`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", dept: "Computer Science", score: "94.50%", rank: "Row #1", method: "ROW_NUMBER <= 2", status: "Exact Slot 1" },
        { id: "STU-102", name: "Susmita Sen", dept: "Computer Science", score: "88.00%", rank: "Row #2", method: "ROW_NUMBER <= 2", status: "Exact Slot 2" },
        { id: "STU-103", name: "Abhronila Saha", dept: "Information Tech", score: "96.20%", rank: "Row #1", method: "ROW_NUMBER <= 2", status: "Exact Slot 1" },
        { id: "STU-104", name: "Debangshu Roy", dept: "Information Tech", score: "82.40%", rank: "Row #2", method: "ROW_NUMBER <= 2", status: "Exact Slot 2" },
      ],
      explanation:
        "`ROW_NUMBER() <= 2` with `student_id ASC` tie-breaker guarantees that exactly 2 physical rows are returned per department, ideal for UI grids and fixed card layouts.",
    },
    performance_window_vs_correlated: {
      title: "4. Architectural Benchmark: Window CTE vs Legacy Correlated Subquery",
      badge: "Performance Comparison",
      badgeColor: "rose",
      sqlQuery: `-- ⚠️ Legacy Correlated Subquery (O(N^2) Quadratic Scan):
SELECT s1.* 
FROM students s1
WHERE (
    SELECT COUNT(*) 
    FROM students s2 
    WHERE s2.dept_id = s1.dept_id AND s2.exam_score_pct > s1.exam_score_pct
) < 2;

-- ✅ Modern Window CTE (O(N log N) Single Pass Stream):
WITH Ranked AS (
    SELECT *, DENSE_RANK() OVER (PARTITION BY dept_id ORDER BY exam_score_pct DESC) AS rnk 
    FROM students
)
SELECT * FROM Ranked WHERE rnk <= 2;`,
      resultRows: [
        { id: "Legacy Subquery", name: "O(N^2) Quadratic Loops", dept: "50,000 Rows", score: "2,500,000,000 Sub-scans", rank: "4,250 ms", method: "⚠️ Very Slow", status: "Legacy Anti-Pattern" },
        { id: "Window CTE", name: "O(N log N) Stream", dept: "50,000 Rows", score: "1 Single Pass", rank: "18 ms (236x Faster!)", method: "✅ High Speed", status: "Modern Standard" },
      ],
      explanation:
        "On 50,000 rows, the legacy correlated subquery executes 2.5 billion comparisons taking 4.2 seconds; the Window CTE executes in a single pass taking only 18 milliseconds (236x faster)!",
    },
  };

  const navItems = [
    { id: "topn-concept", label: "1. The Top-N Problem" },
    { id: "dense-vs-row", label: "2. DENSE_RANK vs ROW_NUMBER" },
    { id: "svg-diagrams", label: "3. Execution Flow & Tier SVGs" },
    { id: "interactive-sandbox", label: "4. Live Top-N Workbench" },
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
            <span>Module 003_002</span>
            <span>•</span>
            <span>Topic 9 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Category Analytics
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Top N Records Per Category Without Correlated Subqueries
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Eliminate slow quadratic nested loops. Master the modern ANSI SQL Window CTE pattern to extract the Top N highest scores, highest salaries, or newest transactions per category in single-pass linear time.
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
        <section id="topn-concept" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Classic Top-N Per Category Challenge
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why Window CTEs replaced slow correlated subqueries and deprecated session variables.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <span>❌</span> Legacy Correlated Subqueries
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Executes $N$ nested subquery scans ($O(N^2)$). Extremely slow and locks tables under high traffic.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span>⚡</span> Modern Window CTE Pattern
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Partitions and ranks rows in a single in-memory pass ($O(N \log N)$), filtering `WHERE rank &lt;= N` cleanly.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <span>🎯</span> Composite Index Support
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                An index on `(dept_id, score DESC)` allows the engine to stream Top N rows with zero temporary filesort!
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: DENSE_RANK vs ROW_NUMBER */}
        <section id="dense-vs-row" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. DENSE_RANK() vs ROW_NUMBER() in Top-N Queries
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Deciding between returning distinct value tiers or strict physical row counts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400">1. DENSE_RANK() &lt;= N (Distinct Value Tiers)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Guarantees that Top $N$ distinct score/salary *tiers* are returned. If two students tie for 2nd place, both are included (returning 3 rows total). Ideal for academic honors and salary compensation benchmarks.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-cyan-400">2. ROW_NUMBER() &lt;= N (Exact Physical Row Count)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Guarantees that *exactly* $N$ physical rows are returned per department. Requires an explicit secondary tie-breaker (e.g. `student_id ASC`) to ensure deterministic results. Ideal for fixed UI grid layouts.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Execution Flow &amp; Tier Preservation
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing quadratic nested scans with single-pass partition ranking.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Execution Flow */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Legacy Subquery (Quadratic Nested Scans) vs Window CTE (Single Stream)
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Legacy */}
                  <g>
                    <rect x="30" y="30" width="370" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="215" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">❌ Legacy Correlated Subquery (O(N^2) Loops)</text>
                    <rect x="45" y="70" width="340" height="40" rx="4" fill="#1e293b" />
                    <text x="215" y="88" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">50,000 Outer Rows × 50,000 Inner Scans</text>
                    <text x="215" y="102" fill="#fca5a5" fontSize="7 font-bold" textAnchor="middle">2.5 Billion Scans (4,250 ms) ⚠️</text>
                  </g>

                  {/* Window CTE */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="630" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">✅ Modern Window CTE (O(N log N) Single Pass)</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#022c22" />
                    <text x="630" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">1 Single Stream + In-Memory Partition Sort</text>
                    <text x="630" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">50,000 Rows Evaluated in 18 ms (236x Faster!)</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* SVG 2: Tier Preservation */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-amber-400 font-mono">Diagram B:</span> Top-2 Tier Preservation on Tied Scores
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* DENSE_RANK */}
                  <g>
                    <rect x="30" y="30" width="370" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="215" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">DENSE_RANK() &lt;= 2 (Preserves Tied Tiers)</text>
                    <rect x="45" y="70" width="340" height="40" rx="4" fill="#022c22" />
                    <text x="215" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Tier 1: Abhronila (96%) | Tier 2: Mamata &amp; Susmita (94%)</text>
                    <text x="215" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Returns 3 Students (Both Tied 2nd Place Winners Included!)</text>
                  </g>

                  {/* ROW_NUMBER */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="630" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">ROW_NUMBER() &lt;= 2 (Strict Physical Count)</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#0f172a" />
                    <text x="630" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Slot 1: Abhronila (96%) | Slot 2: Mamata (94%, ID #101)</text>
                    <text x="630" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Returns Exactly 2 Students (Susmita Excluded by Tie-Breaker)</text>
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
              4. Interactive Top-N Records Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test Top 1 per Department, Top 2 distinct tiers, exact physical row counts, and architectural speed benchmarks live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(topNScenarios).map(([key, item]) => {
              const isActive = selectedTopNScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedTopNScenario(key)}
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
                    {isActive ? "● Active Model" : "○ Run Top-N Query"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{topNScenarios[selectedTopNScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{topNScenarios[selectedTopNScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Top-N CTE Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Top-N CTE Statement</span>
                <span className="text-emerald-400">Single Pass Linear Execution</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {topNScenarios[selectedTopNScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Record ID</th>
                    <th className="py-3 px-4 text-white">Student / Category</th>
                    <th className="py-3 px-4 text-emerald-400">Department / Scope</th>
                    <th className="py-3 px-4 text-cyan-400">Score / Execution</th>
                    <th className="py-3 px-4 text-indigo-400">Computed Rank / Time</th>
                    <th className="py-3 px-4 text-amber-400">Selection Method</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {topNScenarios[selectedTopNScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.name}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.dept}</td>
                      <td className="py-3 px-4 text-slate-300 font-bold">{row.score}</td>
                      <td className="py-3 px-4 text-indigo-300 font-bold">{row.rank}</td>
                      <td className="py-3 px-4 text-amber-300 font-sans">{row.method}</td>
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
              Real-world department ranking optimizations and index tuning.
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
                  Refactoring Top 3 Students Per Branch in Barrackpore ERP
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Academy Analytics</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui audited an academy leaderboard query: The legacy SQL used a quadratic subquery taking 3.8 seconds on 40,000 student records. Replacing the subquery with <code className="text-emerald-300 font-mono">DENSE_RANK() OVER (PARTITION BY branch_id ORDER BY score DESC)</code> inside a CTE and indexing <code className="text-cyan-300 font-mono">students(branch_id, score DESC)</code> brought execution down to 12 milliseconds (a 316x speedup)!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Composite Index:
CREATE INDEX idx_student_branch_score ON students (branch_id, exam_score_pct DESC);

-- High-Speed Top 3 CTE:
WITH RankedBranchStudents AS (
    SELECT student_id, student_name, branch_id, exam_score_pct,
           DENSE_RANK() OVER (PARTITION BY branch_id ORDER BY exam_score_pct DESC) AS rnk
    FROM students
)
SELECT * FROM RankedBranchStudents WHERE rnk <= 3;`}
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
              Avoid illegal WHERE clause usage and non-deterministic row selection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Using Window Function in WHERE (Error 3593)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Writing <code className="text-rose-300 font-mono">WHERE DENSE_RANK() OVER (...) &lt;= 2</code> throws Error 3593 because WHERE evaluates at Phase 2 before window ranks exist.
              </p>
              <div className="text-xs text-slate-400">
                Fix: Always compute the rank in a CTE or derived table first!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Always Add PK Tie-Breaker
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                When using <code className="text-emerald-400 font-mono">ROW_NUMBER() &lt;= N</code>, always include <code className="text-emerald-400 font-mono">student_id ASC</code> in ORDER BY to ensure deterministic, reproducible row selection across queries.
              </p>
              <div className="text-xs text-slate-400">
                Prevents arbitrary flip-flopping of tied records.
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
              Key takeaways for Top-N per category queries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Top-N Query Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Use the <code className="text-cyan-300 font-mono">WITH Ranked AS (...) SELECT * FROM Ranked WHERE rnk &lt;= N</code> pattern.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Use <code className="text-cyan-300 font-mono">DENSE_RANK() &lt;= N</code> to preserve tied value tiers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Use <code className="text-cyan-300 font-mono">ROW_NUMBER() &lt;= N</code> for exact physical row counts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Index <code className="text-cyan-300 font-mono">(category_id, score DESC)</code> for linear streaming with zero filesort.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe the 2nd place pattern...”</span>
                  To find strictly the 2nd place runner-up per department without the 1st place, write <code className="text-cyan-300 font-mono">WHERE dept_rank = 2</code> in the outer query!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about multi-table DELETEs...”</span>
                  You can purge old transaction logs by ranking them in a CTE and deleting rows where <code className="text-cyan-300 font-mono">rn &gt; 5</code> (keeping only the 5 newest logs per user)!
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
              Comprehensive reference questions covering Top N per category, DENSE_RANK vs ROW_NUMBER, CTE design patterns, and index tuning.
            </p>
          </div>

          <FAQTemplate
            title="Top N Records Per Category FAQs"
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
            title="Finding Top N Records Per Category / Department without Correlated Subqueries"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic9_note.txt"
          />

          <Teacher
            note="Finding the Top N records per category is one of the most common requirements in backend database engineering. Before MySQL 8.0, developers were forced to write slow quadratic correlated subqueries or brittle session variable hacks. Today, the Window CTE pattern with DENSE_RANK() <= N or ROW_NUMBER() <= N is the universal gold standard. Always remember to support it with a composite index on (category_col, sort_col DESC) for sub-millisecond execution!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic9;
