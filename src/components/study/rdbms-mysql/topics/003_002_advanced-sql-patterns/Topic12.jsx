import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic12_files/topic12_questions";
import noteText from "./topic12_files/topic12_note.txt?raw";

/**
 * Topic12 – Conditional Aggregations and Pivoting Data (Crosstab Queries)
 * Module: 003_002_advanced-sql-patterns
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on conditional aggregations, crosstab queries, row-to-column pivoting with SUM/MAX(CASE), unpivoting with UNION ALL, and ROLLUP matrix summaries.
 */
const Topic12 = () => {
  // Interactive Simulator State
  const [selectedPivotScenario, setSelectedPivotScenario] = useState("student_subject_score_matrix");

  const pivotScenarios = {
    student_subject_score_matrix: {
      title: "1. Student Subject Score Matrix (Pivoting Marks)",
      badge: "Grade Report Matrix",
      badgeColor: "emerald",
      sqlQuery: `-- Rotating vertical subject marks into a horizontal student report card:
SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    -- Computer Science Column:
    COALESCE(MAX(CASE WHEN sub.subject_code = 'CS101' THEN m.exam_score_pct END), 0.00) AS cs_score_pct,
    -- Information Technology Column:
    COALESCE(MAX(CASE WHEN sub.subject_code = 'IT102' THEN m.exam_score_pct END), 0.00) AS it_score_pct,
    -- Web Development Column:
    COALESCE(MAX(CASE WHEN sub.subject_code = 'WD103' THEN m.exam_score_pct END), 0.00) AS web_dev_score_pct,
    -- Overall Average Score:
    ROUND(AVG(m.exam_score_pct), 2) AS student_overall_average
FROM students s
LEFT JOIN exam_marks m ON s.student_id = m.student_id
LEFT JOIN subjects sub ON m.subject_id = sub.subject_id
GROUP BY s.student_id, s.first_name, s.last_name
ORDER BY student_overall_average DESC;`,
      resultRows: [
        { id: "STU-103", name: "Abhronila Saha", col1: "96.20%", col2: "94.50%", col3: "98.00%", summary: "96.23% (Overall Avg)", status: "Topper 🥇" },
        { id: "STU-101", name: "Mamata Hui", col1: "94.50%", col2: "90.00%", col3: "95.50%", summary: "93.33% (Overall Avg)", status: "Honors 🥈" },
        { id: "STU-102", name: "Susmita Sen", col1: "88.00%", col2: "86.50%", col3: "91.00%", summary: "88.50% (Overall Avg)", status: "Distinction 🥉" },
        { id: "STU-104", name: "Debangshu Roy", col1: "82.40%", col2: "80.00%", col3: "85.00%", summary: "82.47% (Overall Avg)", status: "First Class" },
      ],
      explanation:
        "Using `MAX(CASE WHEN sub = 'CS101' THEN score END)` consolidates multiple subject rows into a single horizontal report card row with subject columns and row-level average.",
    },
    branch_quarterly_crosstab: {
      title: "2. Branch Quarterly Revenue Crosstab Grid (with ROLLUP Totals)",
      badge: "Revenue Crosstab + ROLLUP",
      badgeColor: "cyan",
      sqlQuery: `-- Pivoting quarterly revenue by branch with bottom and right-side grand totals:
SELECT 
    COALESCE(branch_city, '🌟 ALL BRANCHES TOTAL') AS campus_branch,
    -- Q1 Revenue:
    SUM(CASE WHEN QUARTER(payment_date) = 1 THEN amount_paid_inr ELSE 0 END) AS q1_revenue_inr,
    -- Q2 Revenue:
    SUM(CASE WHEN QUARTER(payment_date) = 2 THEN amount_paid_inr ELSE 0 END) AS q2_revenue_inr,
    -- Q3 Revenue:
    SUM(CASE WHEN QUARTER(payment_date) = 3 THEN amount_paid_inr ELSE 0 END) AS q3_revenue_inr,
    -- Q4 Revenue:
    SUM(CASE WHEN QUARTER(payment_date) = 4 THEN amount_paid_inr ELSE 0 END) AS q4_revenue_inr,
    -- Row-Level Annual Total:
    SUM(amount_paid_inr) AS annual_total_inr
FROM fee_payments
GROUP BY branch_city WITH ROLLUP;`,
      resultRows: [
        { id: "BKP", name: "Barrackpore Campus", col1: "₹1,20,000", col2: "₹1,45,000", col3: "₹1,60,000", col4: "₹1,80,000", summary: "₹6,05,000 (Annual)", status: "Branch Leader" },
        { id: "KOL", name: "Kolkata Campus", col1: "₹85,000", col2: "₹95,000", col3: "₹1,10,000", col4: "₹1,25,000", summary: "₹4,15,000 (Annual)", status: "Branch Steady" },
        { id: "ICH", name: "Ichapur Campus", col1: "₹50,000", col2: "₹60,000", col3: "₹70,000", col4: "₹80,000", summary: "₹2,60,000 (Annual)", status: "Branch Growing" },
        { id: "ALL", name: "🌟 ALL BRANCHES TOTAL", col1: "₹2,55,000", col2: "₹3,00,000", col3: "₹3,40,000", col4: "₹3,85,000", summary: "₹12,80,000 (Grand Total)", status: "Super Aggregate" },
      ],
      explanation:
        "Combining conditional `SUM(CASE WHEN QUARTER = X ...)` with `WITH ROLLUP` generates a complete two-dimensional matrix containing both quarterly totals per branch and grand aggregate totals across all branches!",
    },
    attendance_status_matrix: {
      title: "3. Attendance Status Distribution Matrix (Present, Absent, Late)",
      badge: "Status Breakdown",
      badgeColor: "amber",
      sqlQuery: `-- Computing attendance status distribution counts per student:
SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    -- Correct COUNT using CASE (returning 1 or NULL):
    COUNT(CASE WHEN a.status = 'Present' THEN 1 END) AS total_present_days,
    COUNT(CASE WHEN a.status = 'Late' THEN 1 END) AS total_late_days,
    COUNT(CASE WHEN a.status = 'Absent' THEN 1 END) AS total_absent_days,
    -- Attendance Percentage:
    ROUND(
        (COUNT(CASE WHEN a.status IN ('Present', 'Late') THEN 1 END) / COUNT(*)) * 100.0, 
        1
    ) AS attendance_percentage
FROM students s
JOIN student_daily_attendance a ON s.student_id = a.student_id
GROUP BY s.student_id, s.first_name, s.last_name
ORDER BY attendance_percentage DESC;`,
      resultRows: [
        { id: "STU-103", name: "Abhronila Saha", col1: "28 Days", col2: "2 Days", col3: "0 Days", summary: "100.0% Attendance", status: "Perfect Record" },
        { id: "STU-101", name: "Mamata Hui", col1: "26 Days", col2: "3 Days", col3: "1 Day", summary: "96.7% Attendance", status: "Excellent Record" },
        { id: "STU-102", name: "Susmita Sen", col1: "24 Days", col2: "4 Days", col3: "2 Days", summary: "93.3% Attendance", status: "Good Record" },
        { id: "STU-104", name: "Debangshu Roy", col1: "20 Days", col2: "5 Days", col3: "5 Days", summary: "83.3% Attendance", status: "Remediation Alert" },
      ],
      explanation:
        "`COUNT(CASE WHEN status = 'Present' THEN 1 END)` safely ignores `NULL`s for non-matching rows, providing an accurate count of each attendance status category.",
    },
    unpivoting_matrix_to_rows: {
      title: "4. Unpivoting Columns back into Normalized Rows (UNION ALL)",
      badge: "Unpivoting Pattern",
      badgeColor: "rose",
      sqlQuery: `-- Unpivoting a wide multi-column table back into normalized relational rows:
SELECT student_id, 'CS101' AS subject_code, 'Computer Science' AS subject_name, cs_score_pct AS score_pct FROM student_matrix_view
UNION ALL
SELECT student_id, 'IT102' AS subject_code, 'Information Tech' AS subject_name, it_score_pct AS score_pct FROM student_matrix_view
UNION ALL
SELECT student_id, 'WD103' AS subject_code, 'Web Development' AS subject_name, web_dev_score_pct AS score_pct FROM student_matrix_view
ORDER BY student_id, subject_code;`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", col1: "CS101", col2: "Computer Science", col3: "94.50%", summary: "Normalized Row 1", status: "Unpivoted" },
        { id: "STU-101", name: "Mamata Hui", col1: "IT102", col2: "Information Tech", col3: "90.00%", summary: "Normalized Row 2", status: "Unpivoted" },
        { id: "STU-101", name: "Mamata Hui", col1: "WD103", col2: "Web Development", col3: "95.50%", summary: "Normalized Row 3", status: "Unpivoted" },
      ],
      explanation:
        "`UNION ALL` is the ANSI SQL standard for unpivoting wide spreadsheets back into normalized Entity-Attribute-Value (EAV) rows for relational storage and pipeline ingestion.",
    },
  };

  const navItems = [
    { id: "pivot-concept", label: "1. Pivoting & Crosstabs" },
    { id: "conditional-agg", label: "2. Conditional Aggregation Pattern" },
    { id: "svg-diagrams", label: "3. Pivot & Unpivot SVGs" },
    { id: "interactive-sandbox", label: "4. Live Pivot Workbench" },
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
            <span>Topic 12 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Matrix Transformation
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Conditional Aggregations &amp; Pivoting (Crosstabs)
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Transform row-level transactional records into column-oriented summary matrices. Master conditional aggregation with <code className="text-cyan-300 font-mono">SUM(CASE)</code> and <code className="text-cyan-300 font-mono">MAX(CASE)</code>, <code className="text-cyan-300 font-mono">WITH ROLLUP</code> super-aggregates, and unpivoting with <code className="text-cyan-300 font-mono">UNION ALL</code>.
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
        <section id="pivot-concept" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Pivoting &amp; Crosstab Paradigm
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Rotating row-oriented entity events into column-oriented executive spreadsheets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span>🔄</span> Pivoting (Rows to Columns)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Transforms discrete category row values (e.g. Subject codes) into dedicated columns for matrix reporting.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <span>⚡</span> Single-Pass Performance
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Scans the underlying dataset ONCE using conditional `CASE` inside `GROUP BY` rather than joining $N$ subqueries.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <span>📊</span> WITH ROLLUP Totals
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Automatically attaches super-aggregate grand total summary rows at the bottom of the crosstab matrix.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Conditional Aggregation Pattern */}
        <section id="conditional-agg" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. The Conditional Aggregation Blueprint
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How `MAX(CASE WHEN ...)` and `SUM(CASE WHEN ...)` simulate pivot tables in MySQL.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400">1. Pivoting Numeric / Text Values (MAX)</h3>
              <pre className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-cyan-300 border border-slate-800">
                MAX(CASE WHEN sub = 'CS101' THEN score END) AS cs_score
              </pre>
              <p className="text-xs text-slate-300 leading-relaxed">
                Extracts the single non-NULL matching score for that subject while safely ignoring `NULL`s from non-matching rows.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-cyan-400">2. Pivoting Monetary Totals (SUM)</h3>
              <pre className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-cyan-300 border border-slate-800">
                SUM(CASE WHEN Q = 1 THEN amount ELSE 0 END) AS q1_rev
              </pre>
              <p className="text-xs text-slate-300 leading-relaxed">
                Sums revenue for matching transactions while contributing `0` for non-matching quarters to compute clean column totals.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Pivot &amp; Unpivot Transformations
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing row-to-column pivoting with column-to-row unpivoting workflows.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Pivot Flow */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Pivoting: Rotating Row Records into Column Matrix
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Left: Row stream */}
                  <g>
                    <rect x="30" y="30" width="280" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="170" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">Row Stream (Normalized)</text>
                    <rect x="45" y="70" width="250" height="40" rx="4" fill="#0f172a" />
                    <text x="170" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">(Mamata, CS, 94%) | (Mamata, IT, 90%)</text>
                    <text x="170" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">2 Separate Physical Rows</text>
                  </g>

                  {/* Right: Pivoted Matrix */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="630" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Pivoted Matrix (Crosstab)</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#022c22" />
                    <text x="630" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Mamata | CS_Score: 94% | IT_Score: 90% | Avg: 92%</text>
                    <text x="630" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">1 Consolidated Matrix Row</text>
                  </g>

                  {/* Arrow */}
                  <path d="M 320 80 L 430 80" stroke="#10b981" strokeWidth="2" />
                  <polygon points="430,80 420,75 420,85" fill="#10b981" />
                </svg>
              </div>
            </div>

            {/* SVG 2: Unpivot Flow */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-amber-400 font-mono">Diagram B:</span> Unpivoting: Flattening Column Matrix with UNION ALL
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Left: Wide Table */}
                  <g>
                    <rect x="30" y="30" width="340" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="200" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">Wide Matrix Table (Col1, Col2, Col3)</text>
                    <rect x="45" y="70" width="310" height="40" rx="4" fill="#0f172a" />
                    <text x="200" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Mamata | CS: 94.5% | IT: 90.0% | WD: 95.5%</text>
                    <text x="200" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">1 Row with 3 Score Columns</text>
                  </g>

                  {/* Right: Unpivoted Rows */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="630" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Unpivoted Rows (UNION ALL)</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#022c22" />
                    <text x="630" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Row 1: (Mamata, CS, 94.5%) | Row 2: (Mamata, IT, 90.0%)</text>
                    <text x="630" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">3 Normalized Relational Rows</text>
                  </g>

                  {/* Arrow */}
                  <path d="M 380 80 L 430 80" stroke="#f59e0b" strokeWidth="2" />
                  <polygon points="430,80 420,75 420,85" fill="#f59e0b" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Pivoting &amp; Crosstab Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test subject score matrices, quarterly branch revenue crosstabs with ROLLUP, attendance status breakdowns, and unpivoting live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(pivotScenarios).map(([key, item]) => {
              const isActive = selectedPivotScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedPivotScenario(key)}
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
                    {isActive ? "● Active Matrix" : "○ Run Pivot Query"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{pivotScenarios[selectedPivotScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{pivotScenarios[selectedPivotScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Crosstab Matrix Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Conditional Aggregation Statement</span>
                <span className="text-emerald-400">Single Pass Matrix Scan</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {pivotScenarios[selectedPivotScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Record ID</th>
                    <th className="py-3 px-4 text-white">Entity / Student / Branch</th>
                    <th className="py-3 px-4 text-emerald-400">Category Col 1</th>
                    <th className="py-3 px-4 text-cyan-400">Category Col 2</th>
                    <th className="py-3 px-4 text-indigo-400">Category Col 3 / Col 4</th>
                    <th className="py-3 px-4 text-amber-400">Row Total / Summary</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {pivotScenarios[selectedPivotScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.name}</td>
                      <td className="py-3 px-4 text-emerald-300 font-bold">{row.col1}</td>
                      <td className="py-3 px-4 text-cyan-300">{row.col2}</td>
                      <td className="py-3 px-4 text-indigo-300 font-bold">{row.col3}</td>
                      <td className="py-3 px-4 text-amber-300 font-sans">{row.summary}</td>
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
              Real-world grade report card matrices and monthly branch fee crosstabs.
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
                  Automating Semester Student Grade Cards in Barrackpore ERP
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Academy Analytics</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui replaced 5 separate application-level queries with a single conditional aggregation crosstab query: By projecting <code className="text-cyan-300 font-mono">MAX(CASE WHEN subject = 'CS' THEN score END)</code> across all academic subjects in one SQL query with <code className="text-emerald-400 font-mono">GROUP BY student_id</code>, semester report cards are generated 85x faster with zero frontend stitching!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- ✅ High-Speed Report Card Crosstab View:
CREATE OR REPLACE VIEW v_semester_report_cards AS
SELECT 
    s.student_id, s.first_name, s.last_name,
    MAX(CASE WHEN sub.subject_code = 'CS101' THEN m.score END) AS cs_score,
    MAX(CASE WHEN sub.subject_code = 'IT102' THEN m.score END) AS it_score,
    MAX(CASE WHEN sub.subject_code = 'WD103' THEN m.score END) AS wd_score,
    ROUND(AVG(m.score), 2) AS overall_gpa
FROM students s
LEFT JOIN exam_marks m ON s.student_id = m.student_id
LEFT JOIN subjects sub ON m.subject_id = sub.subject_id
GROUP BY s.student_id, s.first_name, s.last_name;`}
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
              Avoid the COUNT(CASE ... ELSE 0) trap and handle empty matrix cells.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> The `COUNT(CASE ... ELSE 0)` Trap
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                `COUNT()` counts all non-NULL values. If you write `COUNT(CASE WHEN status='Present' THEN 1 ELSE 0 END)`, the `0`s are counted, returning the total row count rather than the present count!
              </p>
              <div className="text-xs text-slate-400">
                Fix: Write <code className="text-emerald-400 font-mono">COUNT(CASE WHEN status='Present' THEN 1 END)</code> (without ELSE 0) or <code className="text-emerald-400 font-mono">SUM(CASE WHEN status='Present' THEN 1 ELSE 0 END)</code>!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Add `WITH ROLLUP` for Matrix Totals
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Append <code className="text-emerald-400 font-mono">WITH ROLLUP</code> to the `GROUP BY` clause to automatically compute grand totals across all rows and columns in the same query.
              </p>
              <div className="text-xs text-slate-400">
                Eliminates the need for separate footer total queries.
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
              Key takeaways for pivoting and conditional aggregations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Pivoting Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Use <code className="text-cyan-300 font-mono">MAX(CASE WHEN ...)</code> to pivot text or single values.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Use <code className="text-cyan-300 font-mono">SUM(CASE WHEN ...)</code> to pivot numeric currency totals.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Use <code className="text-cyan-300 font-mono">UNION ALL</code> to unpivot wide tables back to rows.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Wrap columns in <code className="text-cyan-300 font-mono">COALESCE(..., 0)</code> to format empty cells.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe dynamic pivoting...”</span>
                  If subject columns change dynamically, build the SQL string in a stored procedure using `GROUP_CONCAT` and execute with `PREPARE/EXECUTE`!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about covering indexes...”</span>
                  A composite index on `(student_id, subject_id, exam_score_pct)` allows the pivot query to execute directly in memory with zero table lookups!
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
              Comprehensive reference questions covering conditional aggregations, crosstab queries, row-to-column pivoting with SUM/MAX(CASE), unpivoting with UNION ALL, and ROLLUP matrix summaries.
            </p>
          </div>

          <FAQTemplate
            title="Conditional Aggregations &amp; Pivoting FAQs"
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
            title="Conditional Aggregations and Pivoting Data (Crosstab Queries)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic12_note.txt"
          />

          <Teacher
            note="Pivoting data using conditional aggregations is one of the most practical skills for producing executive reports and student grade cards directly in SQL. By wrapping CASE expressions inside SUM() or MAX(), you can rotate rows into columns in a single table scan. Beware of the infamous COUNT(CASE ... ELSE 0) trap—always use SUM with 1/0 or COUNT with 1/NULL to ensure accurate counts!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic12;
