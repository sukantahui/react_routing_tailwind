import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic13_files/topic13_questions";
import noteText from "./topic13_files/topic13_note.txt?raw";

/**
 * Topic13 – Handling Missing Data and Sparse Matrix Filling
 * Module: 003_002_advanced-sql-patterns
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on handling missing data, sparse matrix filling, Cartesian coordinate grids (CROSS JOIN + LEFT JOIN), recursive date generators, and forward-filling (LOCF) imputation.
 */
const Topic13 = () => {
  // Interactive Simulator State
  const [selectedSparseScenario, setSelectedSparseScenario] = useState("zero_filled_daily_fees");

  const sparseScenarios = {
    zero_filled_daily_fees: {
      title: "1. Zero-Filling Missing Daily Student Fee Collection Dates",
      badge: "Cartesian Zero-Fill",
      badgeColor: "emerald",
      sqlQuery: `-- Generating a dense 7-day fee matrix with zero missing dates:
WITH RECURSIVE DateGrid AS (
    SELECT DATE('2026-06-01') AS calendar_date
    UNION ALL
    SELECT DATE_ADD(calendar_date, INTERVAL 1 DAY)
    FROM DateGrid
    WHERE calendar_date < '2026-06-05'
),
StudentDateCoordinates AS (
    SELECT s.student_id, CONCAT(s.first_name, ' ', s.last_name) AS student_name, d.calendar_date
    FROM students s
    CROSS JOIN DateGrid d
    WHERE s.student_id = 'STU-101'
)
SELECT 
    c.student_id,
    c.student_name,
    c.calendar_date,
    -- Impute missing payments with zero:
    COALESCE(p.amount_paid_inr, 0.00) AS fee_paid_inr,
    CASE 
        WHEN p.payment_id IS NULL THEN '🟡 Imputed Missing Day (₹0.00)'
        ELSE '🟢 Actual Transaction'
    END AS data_provenance
FROM StudentDateCoordinates c
LEFT JOIN fee_payments p 
    ON c.student_id = p.student_id AND c.calendar_date = p.payment_date
ORDER BY c.calendar_date ASC;`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", date: "2026-06-01", fee: "₹15,000.00", origin: "🟢 Actual Transaction", status: "Actual Data" },
        { id: "STU-101", name: "Mamata Hui", date: "2026-06-02", fee: "₹0.00", origin: "🟡 Imputed Missing Day", status: "Zero-Filled" },
        { id: "STU-101", name: "Mamata Hui", date: "2026-06-03", fee: "₹0.00", origin: "🟡 Imputed Missing Day", status: "Zero-Filled" },
        { id: "STU-101", name: "Mamata Hui", date: "2026-06-04", fee: "₹0.00", origin: "🟡 Imputed Missing Day", status: "Zero-Filled" },
        { id: "STU-101", name: "Mamata Hui", date: "2026-06-05", fee: "₹20,000.00", origin: "🟢 Actual Transaction", status: "Actual Data" },
      ],
      explanation:
        "The Cartesian grid `(students CROSS JOIN DateGrid)` creates coordinate rows for June 02, 03, and 04, zero-filling missing gaps with `COALESCE(p.amount, 0.00)` to ensure continuous charts.",
    },
    complete_subject_score_grid: {
      title: "2. Complete Student Subject Score Grid (Covering Skipped Exams)",
      badge: "Subject Grid Matrix",
      badgeColor: "cyan",
      sqlQuery: `-- Creating a dense student-subject matrix including unattempted exams:
WITH StudentSubjectGrid AS (
    SELECT 
        s.student_id, 
        CONCAT(s.first_name, ' ', s.last_name) AS student_name,
        sub.subject_id,
        sub.subject_code,
        sub.subject_name
    FROM students s
    CROSS JOIN subjects sub
)
SELECT 
    g.student_id,
    g.student_name,
    g.subject_code,
    g.subject_name,
    COALESCE(m.exam_score_pct, 0.00) AS evaluated_score,
    CASE 
        WHEN m.mark_id IS NULL THEN '❌ Absent / Unattempted (0.00%)'
        ELSE '✅ Exam Submitted'
    END AS submission_status
FROM StudentSubjectGrid g
LEFT JOIN exam_marks m 
    ON g.student_id = m.student_id AND g.subject_id = m.subject_id
ORDER BY g.student_name, g.subject_code;`,
      resultRows: [
        { id: "STU-104", name: "Debangshu Roy", date: "CS101", fee: "Computer Science", origin: "82.40%", status: "✅ Exam Submitted" },
        { id: "STU-104", name: "Debangshu Roy", date: "IT102", fee: "Information Tech", origin: "80.00%", status: "✅ Exam Submitted" },
        { id: "STU-104", name: "Debangshu Roy", date: "WD103", fee: "Web Development", origin: "0.00% (Imputed)", status: "❌ Absent / Unattempted" },
      ],
      explanation:
        "Cross joining students with subjects ensures that even if Debangshu skipped Web Development (WD103), a row is explicitly generated and scored as 0.00% rather than vanishing.",
    },
    forward_fill_locf_scores: {
      title: "3. Forward-Filling (LOCF) Last Known Examination Score",
      badge: "LOCF Forward-Fill",
      badgeColor: "amber",
      sqlQuery: `-- Forward-filling the last known score across months with missing tests:
WITH DenseMonthly AS (
    SELECT c.student_id, c.month_date, m.quiz_score
    FROM student_month_grid c
    LEFT JOIN monthly_quizzes m 
        ON c.student_id = m.student_id AND c.month_date = m.quiz_month
),
GroupedPartitions AS (
    SELECT 
        student_id,
        month_date,
        quiz_score,
        -- Group ID increments only on non-null values:
        COUNT(quiz_score) OVER (PARTITION BY student_id ORDER BY month_date ASC) AS val_group_id
    FROM DenseMonthly
)
SELECT 
    student_id,
    month_date,
    quiz_score AS raw_recorded_score,
    -- Propagate the last non-null score forward:
    MAX(quiz_score) OVER (PARTITION BY student_id, val_group_id) AS forward_filled_score
FROM GroupedPartitions
ORDER BY month_date ASC;`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", date: "2026-06 (Month 1)", fee: "92.00%", origin: "92.00% (Recorded)", status: "Initial Benchmark" },
        { id: "STU-101", name: "Mamata Hui", date: "2026-07 (Month 2)", fee: "NULL (No Test)", origin: "92.00% (Forward-Filled)", status: "LOCF Propagated" },
        { id: "STU-101", name: "Mamata Hui", date: "2026-08 (Month 3)", fee: "NULL (No Test)", origin: "92.00% (Forward-Filled)", status: "LOCF Propagated" },
        { id: "STU-101", name: "Mamata Hui", date: "2026-09 (Month 4)", fee: "96.50%", origin: "96.50% (New Test)", status: "Updated Benchmark" },
      ],
      explanation:
        "Using `COUNT(quiz_score)` creates identical partition groups across NULL rows, allowing `MAX(quiz_score)` to forward-fill the last known 92.00% score until September's new test appears!",
    },
    recursive_calendar_generator: {
      title: "4. Recursive Calendar Date Generator (Continuous DateGrid)",
      badge: "DateGrid Generator",
      badgeColor: "rose",
      sqlQuery: `-- Pure SQL calendar dimension generator from June 01 to June 07:
WITH RECURSIVE DateGrid AS (
    SELECT 
        DATE('2026-06-01') AS calendar_date,
        DAYNAME('2026-06-01') AS day_name,
        1 AS day_of_week_num
    UNION ALL
    SELECT 
        DATE_ADD(calendar_date, INTERVAL 1 DAY),
        DAYNAME(DATE_ADD(calendar_date, INTERVAL 1 DAY)),
        day_of_week_num + 1
    FROM DateGrid
    WHERE calendar_date < '2026-06-07'
)
SELECT calendar_date, day_name, day_of_week_num, '📅 Generated Calendar Node' AS node_type
FROM DateGrid;`,
      resultRows: [
        { id: "DATE-01", name: "Monday", date: "2026-06-01", fee: "Day 1", origin: "📅 Generated Calendar Node", status: "Weekday Start" },
        { id: "DATE-02", name: "Tuesday", date: "2026-06-02", fee: "Day 2", origin: "📅 Generated Calendar Node", status: "Weekday" },
        { id: "DATE-06", name: "Saturday", date: "2026-06-06", fee: "Day 6", origin: "📅 Generated Calendar Node", status: "Weekend" },
        { id: "DATE-07", name: "Sunday", date: "2026-06-07", fee: "Day 7", origin: "📅 Generated Calendar Node", status: "Weekend End" },
      ],
      explanation:
        "A Recursive CTE builds a continuous sequence of dates on demand in pure SQL without needing an external physical calendar table or Python date loop.",
    },
  };

  const navItems = [
    { id: "sparse-concept", label: "1. The Sparse Matrix Problem" },
    { id: "cartesian-pattern", label: "2. Cartesian Grid + LEFT JOIN" },
    { id: "svg-diagrams", label: "3. Cartesian Grid & Forward-Fill SVGs" },
    { id: "interactive-sandbox", label: "4. Live Sparse Workbench" },
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
            <span>Topic 13 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Data Imputation
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Handling Missing Data &amp; Sparse Matrix Filling
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Eliminate gaps and missing coordinates in time-series analytics. Master Cartesian coordinate grids (<code className="text-cyan-300 font-mono">CROSS JOIN</code> + <code className="text-cyan-300 font-mono">LEFT JOIN</code>), recursive calendar date generators, and forward-filling (LOCF) data imputation in pure SQL.
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
        <section id="sparse-concept" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Sparse Matrix Problem in Relational Analytics
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why inactive dates and missing combinations cause time-series calculation bugs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <span>🕳️</span> Missing Data Holes
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Days with zero transactions do not exist as rows in tables, breaking moving average windows and BI time-series line charts.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span>🌐</span> Cartesian Coordinate Grid
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                `CROSS JOIN` entities with continuous calendar dates, then `LEFT JOIN` transactions to guarantee 100% complete matrix density.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <span>⏩</span> Forward-Filling (LOCF)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Propagate the last known non-null observation forward across missing dates using `COUNT(val)` grouping partitions.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Cartesian Grid + LEFT JOIN */}
        <section id="cartesian-pattern" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. The Cartesian Grid + LEFT JOIN Blueprint
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The 3-stage architecture for generating complete dense datasets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-cyan-400">Step 1: DateGrid Generator</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Generate continuous chronological dates via `WITH RECURSIVE DateGrid AS (...)`.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-emerald-400">Step 2: CROSS JOIN Coordinates</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Form the complete coordinate space: `FROM students CROSS JOIN DateGrid`.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-amber-400">Step 3: LEFT JOIN + COALESCE</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Attach sparse transactions and zero-fill missing values with `COALESCE(val, 0)`.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Cartesian Grid &amp; Forward-Filling
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing Cartesian coordinate generation with LOCF forward-fill propagation.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Cartesian Grid */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Cartesian Coordinate Grid (CROSS JOIN) + LEFT JOIN Dense Imputation
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1 */}
                  <g>
                    <rect x="30" y="30" width="230" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="145" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">1. Continuous DateGrid</text>
                    <rect x="45" y="70" width="200" height="40" rx="4" fill="#0f172a" />
                    <text x="145" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Jun 01, Jun 02, Jun 03 ...</text>
                    <text x="145" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Recursive CTE Generation</text>
                  </g>

                  {/* Step 2 */}
                  <g>
                    <rect x="300" y="30" width="250" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="425" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">2. CROSS JOIN Coordinates</text>
                    <rect x="315" y="70" width="220" height="40" rx="4" fill="#022c22" />
                    <text x="425" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Students × Calendar Dates</text>
                    <text x="425" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">100% Dense Coordinate Space</text>
                  </g>

                  {/* Step 3 */}
                  <g>
                    <rect x="590" y="30" width="230" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="705" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">3. LEFT JOIN + COALESCE</text>
                    <rect x="605" y="70" width="200" height="40" rx="4" fill="#0f172a" />
                    <text x="705" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">COALESCE(amount, 0.00)</text>
                    <text x="705" y="102" fill="#fcd34d" fontSize="7 font-bold" textAnchor="middle">Zero-Filled Complete Matrix</text>
                  </g>

                  {/* Connectors */}
                  <path d="M 260 80 L 300 80" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 550 80 L 590 80" stroke="#10b981" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* SVG 2: LOCF Forward-Filling */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-amber-400 font-mono">Diagram B:</span> Forward-Filling (LOCF) Propagation Across Missing Intervals
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Month 1 */}
                  <g>
                    <rect x="30" y="30" width="180" height="100" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="120" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">June (Month 1)</text>
                    <rect x="40" y="70" width="160" height="40" rx="4" fill="#022c22" />
                    <text x="120" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Score: 92.00% (Test)</text>
                    <text x="120" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Group ID: 1</text>
                  </g>

                  {/* Month 2 */}
                  <g>
                    <rect x="230" y="30" width="180" height="100" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="320" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">July (Month 2 - NULL)</text>
                    <rect x="240" y="70" width="160" height="40" rx="4" fill="#0f172a" />
                    <text x="320" y="88" fill="#fcd34d" fontSize="8 font-mono" textAnchor="middle">LOCF: 92.00% (Filled)</text>
                    <text x="320" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Group ID: 1 (Same)</text>
                  </g>

                  {/* Month 3 */}
                  <g>
                    <rect x="440" y="30" width="180" height="100" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="530" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">August (Month 3 - NULL)</text>
                    <rect x="450" y="70" width="160" height="40" rx="4" fill="#0f172a" />
                    <text x="530" y="88" fill="#fcd34d" fontSize="8 font-mono" textAnchor="middle">LOCF: 92.00% (Filled)</text>
                    <text x="530" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Group ID: 1 (Same)</text>
                  </g>

                  {/* Month 4 */}
                  <g>
                    <rect x="650" y="30" width="180" height="100" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="740" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">September (Month 4)</text>
                    <rect x="660" y="70" width="160" height="40" rx="4" fill="#022c22" />
                    <text x="740" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Score: 96.50% (New Test)</text>
                    <text x="740" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Group ID: 2 (New!)</text>
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
              4. Interactive Sparse Matrix Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test Cartesian zero-filling, complete subject evaluation grids, LOCF forward-fill imputation, and recursive calendar date generators live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(sparseScenarios).map(([key, item]) => {
              const isActive = selectedSparseScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedSparseScenario(key)}
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
                    {isActive ? "● Active Imputation" : "○ Run Sparse Filler"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{sparseScenarios[selectedSparseScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{sparseScenarios[selectedSparseScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Sparse Matrix Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Imputation Query</span>
                <span className="text-emerald-400">Cartesian Coordinate Mapping</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {sparseScenarios[selectedSparseScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Record ID</th>
                    <th className="py-3 px-4 text-white">Entity / Student / Day</th>
                    <th className="py-3 px-4 text-emerald-400">Calendar Date / Code</th>
                    <th className="py-3 px-4 text-indigo-400">Value / Metric</th>
                    <th className="py-3 px-4 text-amber-400">Data Origin / Provenance</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {sparseScenarios[selectedSparseScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.name}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.date}</td>
                      <td className="py-3 px-4 text-indigo-300 font-bold">{row.fee}</td>
                      <td className="py-3 px-4 text-amber-300 font-sans">{row.origin}</td>
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
              Real-world zero-filled PowerBI telemetry and LOCF score propagation.
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
                  Eliminating Broken PowerBI Heatmaps in Barrackpore ERP
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Academy Analytics</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui resolved a major reporting glitch: PowerBI charts were rendering broken fragmented lines because days with 0 fee collections had no rows in MySQL. Structuring the query with a Recursive DateGrid and <code className="text-cyan-300 font-mono">CROSS JOIN students</code> zero-filled inactive dates, producing silky-smooth unbroken line charts for senior management!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- ✅ Continuous Date Grid CTE:
WITH RECURSIVE Grid AS (
    SELECT DATE('2026-01-01') AS dt UNION ALL SELECT DATE_ADD(dt, INTERVAL 1 DAY) FROM Grid WHERE dt < '2026-12-31'
),
Coords AS (SELECT s.student_id, g.dt FROM students s CROSS JOIN Grid g)
SELECT c.student_id, c.dt, COALESCE(p.amount, 0.00) AS daily_rev
FROM Coords c LEFT JOIN fee_payments p ON c.student_id = p.student_id AND c.dt = p.payment_date;`}
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
              Avoid Cartesian explosion risks and recursion limit crashes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Unbounded Cartesian Product Explosion
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Cross joining 100,000 students with 1,000 dates produces 100 million coordinate rows ($10^8$), which can exhaust database memory and disk temp storage.
              </p>
              <div className="text-xs text-slate-400">
                Fix: Always apply strict date and department filters in the <code className="text-emerald-400 font-mono">WHERE</code> clause!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Build a Physical `dim_calendar` Table
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                In production data warehouses, maintain a pre-populated, indexed physical <code className="text-emerald-400 font-mono">dim_calendar</code> table rather than running recursive CTE date generators on every query.
              </p>
              <div className="text-xs text-slate-400">
                Improves query execution speed and eliminates recursion limits.
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
              Key takeaways for handling missing data and sparse matrix filling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Sparse Matrix Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Generate continuous dates using <code className="text-cyan-300 font-mono">WITH RECURSIVE DateGrid</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Use <code className="text-cyan-300 font-mono">CROSS JOIN</code> to create the complete coordinate space.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Attach sparse data via <code className="text-cyan-300 font-mono">LEFT JOIN</code> and wrap in <code className="text-cyan-300 font-mono">COALESCE(val, 0)</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Forward-fill telemetry with <code className="text-cyan-300 font-mono">COUNT(val)</code> grouping partitions.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe data provenance...”</span>
                  Check `CASE WHEN p.id IS NULL THEN 'Imputed' ELSE 'Actual' END` to maintain transparent audit logs between real and synthetic data!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about composite index speed...”</span>
                  Indexing `(student_id, payment_date)` turns the Cartesian `LEFT JOIN` into a series of microsecond index lookups!
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
              Comprehensive reference questions covering sparse matrix filling, Cartesian coordinate grids, recursive date generators, and forward-filling (LOCF) data imputation.
            </p>
          </div>

          <FAQTemplate
            title="Sparse Matrix Filling FAQs"
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
            title="Handling Missing Data and Sparse Matrix Filling"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic13_note.txt"
          />

          <Teacher
            note="Relational databases are sparse by nature—if no transaction occurred on a given day, no row exists. But modern analytics, machine learning pipelines, and BI dashboards require complete, dense coordinate matrices. Master the 3-step Cartesian Grid pattern: generate continuous dates with a Recursive CTE, CROSS JOIN with entities, and LEFT JOIN sparse data with COALESCE(val, 0). This ensures your moving averages and trend charts never suffer from missing date distortions!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic13;
