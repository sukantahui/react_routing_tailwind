import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic13_files/topic13_questions";
import noteText from "./topic13_files/topic13_note.txt?raw";

/**
 * Topic13 – Grouping by Multiple Columns and Expressions
 * Module: 002_006_sql-functions (Built-in Functions, Grouping & Aggregations)
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial component for multi-column & expression grouping.
 */
const Topic13 = () => {
  // Interactive Simulator State
  const [selectedScenario, setSelectedScenario] = useState("center_course_matrix"); // "center_course_matrix" | "temporal_breakdown" | "histogram_binning" | "case_tier_grouping"
  const [activeTab, setActiveTab] = useState("theory");

  const scenarios = {
    center_course_matrix: {
      title: "1. Multi-Dimensional Center & Course Matrix",
      badge: "Composite Key (City + Stream)",
      badgeColor: "emerald",
      sqlQuery: `SELECT 
    centre_city,
    course_stream,
    COUNT(*) AS enrolled_students,
    SUM(fee_amount_inr) AS stream_revenue_inr,
    ROUND(AVG(marks_pct), 2) AS stream_avg_score
FROM student_enrollments
WHERE admission_status = 'CONFIRMED'
GROUP BY centre_city, course_stream
HAVING COUNT(*) >= 5
ORDER BY centre_city ASC, stream_revenue_inr DESC;`,
      resultRows: [
        { dim1: "Barrackpore Campus", dim2: "React Fullstack", metric1: "34 Students", metric2: "₹8,50,000", metric3: "88.4%", status: "High Demand", color: "emerald" },
        { dim1: "Barrackpore Campus", dim2: "Python Data Science", metric1: "28 Students", metric2: "₹7,00,000", metric3: "84.2%", status: "Profitable", color: "cyan" },
        { dim1: "Kolkata Central", dim2: "Java Enterprise", metric1: "42 Students", metric2: "₹10,50,000", metric3: "82.6%", status: "High Demand", color: "emerald" },
        { dim1: "Kolkata Central", dim2: "React Fullstack", metric1: "30 Students", metric2: "₹7,50,000", metric3: "86.1%", status: "Profitable", color: "cyan" },
        { dim1: "Ichapur Tech Lab", dim2: "Python Data Science", metric1: "18 Students", metric2: "₹4,50,000", metric3: "79.8%", status: "Moderate", color: "amber" },
        { dim1: "Jadavpur Hub", dim2: "Java Enterprise", metric1: "25 Students", metric2: "₹6,25,000", metric3: "85.0%", status: "Profitable", color: "cyan" },
      ],
      explanation:
        "MySQL generates composite group keys (e.g. ('Barrackpore', 'React Fullstack')). Aggregates (COUNT, SUM, AVG) are computed strictly across records matching BOTH dimensions.",
    },
    temporal_breakdown: {
      title: "2. Multi-Year & Monthly Temporal Trends",
      badge: "Date Function Expressions",
      badgeColor: "cyan",
      sqlQuery: `SELECT 
    YEAR(payment_date) AS fiscal_year,
    MONTH(payment_date) AS fiscal_month_num,
    MONTHNAME(payment_date) AS month_name,
    COUNT(transaction_id) AS total_transactions,
    SUM(amount_inr) AS monthly_revenue_inr
FROM fee_transactions
WHERE transaction_status = 'SUCCESS'
GROUP BY YEAR(payment_date), MONTH(payment_date), MONTHNAME(payment_date)
ORDER BY fiscal_year DESC, fiscal_month_num DESC;`,
      resultRows: [
        { dim1: "2026", dim2: "August", metric1: "142 Payments", metric2: "₹18,40,000", metric3: "₹12,958 Avg", status: "Active Peak", color: "emerald" },
        { dim1: "2026", dim2: "July", metric1: "128 Payments", metric2: "₹16,64,000", metric3: "₹13,000 Avg", status: "Normal", color: "cyan" },
        { dim1: "2026", dim2: "June", metric1: "110 Payments", metric2: "₹14,30,000", metric3: "₹13,000 Avg", status: "Normal", color: "cyan" },
        { dim1: "2025", dim2: "December", metric1: "95 Payments", metric2: "₹11,40,000", metric3: "₹12,000 Avg", status: "Past Cycle", color: "slate" },
      ],
      explanation:
        "Grouping by both YEAR() and MONTH() prevents records from different calendar years (e.g. August 2025 vs August 2026) from being conflated into one month group.",
    },
    histogram_binning: {
      title: "3. Mathematical Fee Bracket Histogram Binning",
      badge: "Arithmetic FLOOR() Binning",
      badgeColor: "indigo",
      sqlQuery: `SELECT 
    FLOOR(fee_amount_inr / 5000) * 5000 AS bracket_start_inr,
    (FLOOR(fee_amount_inr / 5000) * 5000) + 4999 AS bracket_end_inr,
    COUNT(*) AS total_enrolled,
    ROUND(AVG(marks_pct), 2) AS bracket_avg_score
FROM student_enrollments
GROUP BY FLOOR(fee_amount_inr / 5000) * 5000
ORDER BY bracket_start_inr ASC;`,
      resultRows: [
        { dim1: "₹0 - ₹4,999", dim2: "Scholarship Tier", metric1: "15 Students", metric2: "₹45,000", metric3: "89.2%", status: "High Merit", color: "emerald" },
        { dim1: "₹5,000 - ₹9,999", dim2: "Standard Tier", metric1: "48 Students", metric2: "₹3,60,000", metric3: "81.4%", status: "Core Volume", color: "cyan" },
        { dim1: "₹10,000 - ₹14,999", dim2: "Advanced Tier", metric1: "62 Students", metric2: "₹7,75,000", metric3: "84.8%", status: "Top Revenue", color: "indigo" },
        { dim1: "₹15,000 - ₹19,999", dim2: "Mastery Bootcamps", metric1: "35 Students", metric2: "₹6,12,500", metric3: "87.0%", status: "Premium Tier", color: "violet" },
      ],
      explanation:
        "Arithmetic expression FLOOR(fee / 5000) * 5000 dynamically groups continuous fee values into structured ₹5,000 brackets for revenue histogram analytics.",
    },
    case_tier_grouping: {
      title: "4. Conditional Tier Categorization (CASE Expression)",
      badge: "Categorical CASE Grouping",
      badgeColor: "violet",
      sqlQuery: `SELECT 
    CASE 
        WHEN marks_pct >= 85.0 THEN 'Elite Distinction'
        WHEN marks_pct >= 70.0 THEN 'First Division'
        WHEN marks_pct >= 50.0 THEN 'Second Division'
        ELSE 'Needs Remedial Support'
    END AS performance_tier,
    COUNT(*) AS student_count,
    ROUND(AVG(attendance_pct), 1) AS avg_attendance_pct,
    MIN(marks_pct) AS min_score,
    MAX(marks_pct) AS max_score
FROM student_evaluations
GROUP BY 
    CASE 
        WHEN marks_pct >= 85.0 THEN 'Elite Distinction'
        WHEN marks_pct >= 70.0 THEN 'First Division'
        WHEN marks_pct >= 50.0 THEN 'Second Division'
        ELSE 'Needs Remedial Support'
    END
ORDER BY min_score DESC;`,
      resultRows: [
        { dim1: "Elite Distinction (>=85%)", dim2: "Top Performers", metric1: "45 Students", metric2: "96.4% Att.", metric3: "85.0 - 99.5%", status: "Honor Roll", color: "emerald" },
        { dim1: "First Division (70-84%)", dim2: "Strong Pass", metric1: "92 Students", metric2: "89.1% Att.", metric3: "70.0 - 84.5%", status: "Solid Cadre", color: "cyan" },
        { dim1: "Second Division (50-69%)", dim2: "Standard Pass", metric1: "38 Students", metric2: "78.5% Att.", metric3: "50.0 - 69.5%", status: "Average", color: "amber" },
        { dim1: "Needs Remedial Support (<50%)", dim2: "At Risk", metric1: "12 Students", metric2: "62.0% Att.", metric3: "32.0 - 48.0%", status: "Intervention", color: "rose" },
      ],
      explanation:
        "A Searched CASE expression partitions continuous student grades into discrete business tiers directly inside the database query engine without application-level post-processing.",
    },
  };

  const navItems = [
    { id: "theory", label: "1. Core Mechanics" },
    { id: "grouping-types", label: "2. Multi-Column & Expression Flavors" },
    { id: "svg-diagrams", label: "3. Pipeline Visualizers" },
    { id: "interactive-sandbox", label: "4. Interactive Simulator" },
    { id: "case-studies", label: "5. Production Case Studies" },
    { id: "pitfalls-rules", label: "6. ONLY_FULL_GROUP_BY & Pitfalls" },
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
            <span>Module 002_006</span>
            <span>•</span>
            <span>Topic 13 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Advanced Multi-Dimensional Aggregation
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Grouping by Multiple Columns & Expressions
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Uncover deeper analytical insights by segmenting data across multiple dimensions (e.g.,{" "}
            <code className="text-cyan-300 font-mono font-bold">City + Course</code>) and dynamic formulas (
            <code className="text-emerald-300 font-mono font-bold">YEAR() + MONTH()</code>, numeric brackets, and{" "}
            <code className="text-violet-300 font-mono font-bold">CASE</code> expressions).
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
        {/* SECTION 1: Core Mechanics */}
        <section id="theory" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Multi-Column Grouping Mechanics: The Composite Partition Key
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Moving beyond single-attribute grouping to composite multi-dimensional buckets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="p-2 rounded-lg bg-cyan-950/80 text-cyan-400 font-mono text-sm font-bold border border-cyan-800">
                  Tuple Hash Key
                </span>
                <h3 className="text-lg font-semibold text-white">Composite Group Key Formation</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                When you execute <code className="text-cyan-300 font-mono">GROUP BY col1, col2</code>, MySQL constructs a composite hash key for each tuple:{" "}
                <code className="text-emerald-400 font-mono">(value_col1, value_col2)</code>.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
                <li>Rows are combined into the same bucket <strong>only if</strong> both attributes match identically.</li>
                <li>Distinct group count equals the cardinality of the Cartesian pair present in the data.</li>
                <li>Column order does not affect the aggregated mathematical results (SUM, COUNT, AVG).</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/30 transition-all duration-300 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="p-2 rounded-lg bg-emerald-950/80 text-emerald-400 font-mono text-sm font-bold border border-emerald-800">
                  SQL Standard
                </span>
                <h3 className="text-lg font-semibold text-white">Column Projection Determinism</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Under <code className="text-emerald-400 font-mono">ONLY_FULL_GROUP_BY</code>, every non-aggregated column in the <code className="text-cyan-300 font-mono">SELECT</code> list must appear in the <code className="text-cyan-300 font-mono">GROUP BY</code> list.
              </p>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <div><span className="text-emerald-400">SELECT</span> city, stream, <span className="text-cyan-400">COUNT</span>(*)</div>
                <div><span className="text-emerald-400">FROM</span> enrollments</div>
                <div><span className="text-emerald-400">GROUP BY</span> city, stream; <span className="text-slate-500">-- Valid deterministic projection</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Flavors of Grouping */}
        <section id="grouping-types" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Four Flavors of Multi-Column & Expression Grouping
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Relational grouping is not limited to raw table columns. MySQL lets you group on scalar formulas, temporal parts, and conditional logic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Flavor 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                  1. Multi-Column Relational Grouping
                </h3>
                <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 font-mono">
                  col1, col2
                </span>
              </div>
              <p className="text-slate-300 text-sm mb-3">
                Creates high-resolution business matrices (e.g. Branch City + Course Stream + Teacher Name).
              </p>
              <pre className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-cyan-300 overflow-x-auto border border-slate-800">
{`SELECT centre_city, course_stream, COUNT(*)
FROM enrollments
GROUP BY centre_city, course_stream;`}
              </pre>
            </div>

            {/* Flavor 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  2. Temporal Multi-Unit Grouping
                </h3>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 font-mono">
                  YEAR(d), MONTH(d)
                </span>
              </div>
              <p className="text-slate-300 text-sm mb-3">
                Preserves year boundaries while analyzing monthly or quarterly trends across multiple years.
              </p>
              <pre className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-emerald-300 overflow-x-auto border border-slate-800">
{`SELECT YEAR(admit_date) AS yr, MONTH(admit_date) AS mo,
       SUM(fee_inr) AS revenue
FROM admissions
GROUP BY YEAR(admit_date), MONTH(admit_date);`}
              </pre>
            </div>

            {/* Flavor 3 */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-400"></span>
                  3. Mathematical Bracket Binning
                </h3>
                <span className="text-xs px-2 py-0.5 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 font-mono">
                  FLOOR(x / k) * k
                </span>
              </div>
              <p className="text-slate-300 text-sm mb-3">
                Discretizes continuous numerical values (salary, fee amounts, order values) into histogram buckets.
              </p>
              <pre className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-indigo-300 overflow-x-auto border border-slate-800">
{`SELECT FLOOR(fee_inr / 5000) * 5000 AS bracket_min,
       COUNT(*) AS student_count
FROM admissions
GROUP BY FLOOR(fee_inr / 5000) * 5000;`}
              </pre>
            </div>

            {/* Flavor 4 */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-violet-500/40 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-violet-400"></span>
                  4. Conditional CASE Expression Grouping
                </h3>
                <span className="text-xs px-2 py-0.5 rounded bg-violet-950 border border-violet-800 text-violet-300 font-mono">
                  CASE WHEN ... END
                </span>
              </div>
              <p className="text-slate-300 text-sm mb-3">
                Segments continuous metrics into categorical operational tiers (Distinction, Pass, Remedial).
              </p>
              <pre className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-violet-300 overflow-x-auto border border-slate-800">
{`SELECT CASE WHEN marks >= 75 THEN 'Distinction'
            ELSE 'General Pass' END AS grade_tier,
       COUNT(*)
FROM exams
GROUP BY CASE WHEN marks >= 75 THEN 'Distinction'
              ELSE 'General Pass' END;`}
              </pre>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Visualizers */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Partitioning Pipeline & Expression Mapping
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Inspect how the MySQL query engine partitions physical rows into composite multidimensional memory buckets.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Multi-Column Composite Key Partitioning */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Multi-Column Composite Key (City + Stream) Partitioning
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Raw tuples are mapped into distinct 2D composite buckets. Aggregations (SUM, COUNT) operate strictly inside each bucket.
              </p>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 360" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="gBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0284c7" />
                      <stop offset="100%" stopColor="#0369a1" />
                    </linearGradient>
                    <linearGradient id="gGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#059669" />
                      <stop offset="100%" stopColor="#047857" />
                    </linearGradient>
                    <linearGradient id="gPurple" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#7c3aed" />
                      <stop offset="100%" stopColor="#6d28d9" />
                    </linearGradient>
                    <linearGradient id="gAmber" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#d97706" />
                      <stop offset="100%" stopColor="#b45309" />
                    </linearGradient>
                  </defs>

                  {/* Left Column: Raw Input Rows */}
                  <g>
                    <rect x="30" y="20" width="220" height="320" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                    <text x="140" y="45" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">Raw Table Tuples (enrollments)</text>

                    {/* Row 1 */}
                    <rect x="42" y="60" width="196" height="42" rx="6" fill="#1e293b" stroke="#475569" />
                    <text x="50" y="77" fill="#f8fafc" fontSize="11" fontWeight="bold">Mamata</text>
                    <text x="105" y="77" fill="#38bdf8" fontSize="10">Barrackpore</text>
                    <text x="175" y="77" fill="#34d399" fontSize="10">React</text>
                    <text x="50" y="93" fill="#94a3b8" fontSize="9">Fee: ₹25,000 | Marks: 92%</text>

                    {/* Row 2 */}
                    <rect x="42" y="110" width="196" height="42" rx="6" fill="#1e293b" stroke="#475569" />
                    <text x="50" y="127" fill="#f8fafc" fontSize="11" fontWeight="bold">Mahima</text>
                    <text x="105" y="127" fill="#a855f7" fontSize="10">Kolkata</text>
                    <text x="175" y="127" fill="#fbbf24" fontSize="10">Java</text>
                    <text x="50" y="143" fill="#94a3b8" fontSize="9">Fee: ₹25,000 | Marks: 85%</text>

                    {/* Row 3 */}
                    <rect x="42" y="160" width="196" height="42" rx="6" fill="#1e293b" stroke="#475569" />
                    <text x="50" y="177" fill="#f8fafc" fontSize="11" fontWeight="bold">Abhronila</text>
                    <text x="105" y="177" fill="#38bdf8" fontSize="10">Barrackpore</text>
                    <text x="175" y="177" fill="#34d399" fontSize="10">React</text>
                    <text x="50" y="193" fill="#94a3b8" fontSize="9">Fee: ₹25,000 | Marks: 88%</text>

                    {/* Row 4 */}
                    <rect x="42" y="210" width="196" height="42" rx="6" fill="#1e293b" stroke="#475569" />
                    <text x="50" y="227" fill="#f8fafc" fontSize="11" fontWeight="bold">Susmita</text>
                    <text x="105" y="227" fill="#38bdf8" fontSize="10">Barrackpore</text>
                    <text x="175" y="227" fill="#fbbf24" fontSize="10">Java</text>
                    <text x="50" y="243" fill="#94a3b8" fontSize="9">Fee: ₹25,000 | Marks: 90%</text>

                    {/* Row 5 */}
                    <rect x="42" y="260" width="196" height="42" rx="6" fill="#1e293b" stroke="#475569" />
                    <text x="50" y="277" fill="#f8fafc" fontSize="11" fontWeight="bold">Debangshu</text>
                    <text x="105" y="277" fill="#a855f7" fontSize="10">Kolkata</text>
                    <text x="175" y="277" fill="#fbbf24" fontSize="10">Java</text>
                    <text x="50" y="293" fill="#94a3b8" fontSize="9">Fee: ₹25,000 | Marks: 80%</text>
                  </g>

                  {/* Middle: Partition Engine */}
                  <g>
                    <rect x="290" y="110" width="180" height="140" rx="10" fill="#020617" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="4 2" />
                    <text x="380" y="135" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">MySQL Hash Engine</text>
                    <text x="380" y="155" fill="#cbd5e1" fontSize="10" textAnchor="middle">GROUP BY city, stream</text>
                    <text x="380" y="180" fill="#94a3b8" fontSize="9" textAnchor="middle">Evaluates (city, stream)</text>
                    <text x="380" y="195" fill="#94a3b8" fontSize="9" textAnchor="middle">composite hash value</text>
                    <rect x="305" y="210" width="150" height="24" rx="4" fill="#0369a1" />
                    <text x="380" y="226" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Forms 2D Partitions</text>
                  </g>

                  {/* Connecting Arrows */}
                  <path d="M 250 80 L 290 140" stroke="#38bdf8" strokeWidth="1.5" markerEnd="url(#arrow)" />
                  <path d="M 250 130 L 290 160" stroke="#a855f7" strokeWidth="1.5" />
                  <path d="M 250 180 L 290 170" stroke="#38bdf8" strokeWidth="1.5" />
                  <path d="M 250 230 L 290 180" stroke="#fbbf24" strokeWidth="1.5" />
                  <path d="M 250 280 L 290 200" stroke="#a855f7" strokeWidth="1.5" />

                  {/* Right Column: Composite Result Buckets */}
                  <g>
                    <rect x="510" y="20" width="310" height="320" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                    <text x="665" y="45" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">Aggregated Composite Buckets</text>

                    {/* Bucket 1: Barrackpore + React */}
                    <rect x="522" y="60" width="286" height="75" rx="6" fill="#1e293b" stroke="#059669" strokeWidth="1.5" />
                    <text x="532" y="78" fill="#34d399" fontSize="11" fontWeight="bold">Bucket: ('Barrackpore', 'React')</text>
                    <text x="532" y="95" fill="#cbd5e1" fontSize="10">Members: Mamata, Abhronila (2 rows)</text>
                    <text x="532" y="112" fill="#38bdf8" fontSize="10" fontWeight="bold">COUNT: 2 | SUM(Fee): ₹50,000 | AVG(Marks): 90.0%</text>

                    {/* Bucket 2: Barrackpore + Java */}
                    <rect x="522" y="145" width="286" height="75" rx="6" fill="#1e293b" stroke="#d97706" strokeWidth="1.5" />
                    <text x="532" y="163" fill="#fbbf24" fontSize="11" fontWeight="bold">Bucket: ('Barrackpore', 'Java')</text>
                    <text x="532" y="180" fill="#cbd5e1" fontSize="10">Members: Susmita (1 row)</text>
                    <text x="532" y="197" fill="#38bdf8" fontSize="10" fontWeight="bold">COUNT: 1 | SUM(Fee): ₹25,000 | AVG(Marks): 90.0%</text>

                    {/* Bucket 3: Kolkata + Java */}
                    <rect x="522" y="230" width="286" height="75" rx="6" fill="#1e293b" stroke="#7c3aed" strokeWidth="1.5" />
                    <text x="532" y="248" fill="#c084fc" fontSize="11" fontWeight="bold">Bucket: ('Kolkata', 'Java')</text>
                    <text x="532" y="265" fill="#cbd5e1" fontSize="10">Members: Mahima, Debangshu (2 rows)</text>
                    <text x="532" y="282" fill="#38bdf8" fontSize="10" fontWeight="bold">COUNT: 2 | SUM(Fee): ₹50,000 | AVG(Marks): 82.5%</text>
                  </g>

                  {/* Flow Arrows out of Hash Engine */}
                  <path d="M 470 145 L 522 95" stroke="#34d399" strokeWidth="2" strokeDasharray="3 2" />
                  <path d="M 470 175 L 522 175" stroke="#fbbf24" strokeWidth="2" strokeDasharray="3 2" />
                  <path d="M 470 205 L 522 265" stroke="#c084fc" strokeWidth="2" strokeDasharray="3 2" />
                </svg>
              </div>
            </div>

            {/* SVG 2: Expression Grouping & Discretization */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <span className="text-indigo-400 font-mono">Diagram B:</span> Continuous Metric Discretization Pipeline (FLOOR & CASE)
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                How scalar expressions transform infinite/continuous values into finite, ordered categorical buckets for summary reporting.
              </p>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 260" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1: Continuous Data Input */}
                  <g>
                    <rect x="20" y="30" width="220" height="200" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                    <text x="130" y="55" fill="#f1f5f9" fontSize="12" fontWeight="bold" textAnchor="middle">1. Continuous Input Column</text>
                    <text x="130" y="75" fill="#64748b" fontSize="10" textAnchor="middle">marks_pct (Continuous 0.0 - 100.0)</text>

                    <rect x="35" y="90" width="190" height="24" rx="4" fill="#1e293b" />
                    <text x="45" y="106" fill="#e2e8f0" fontSize="10">Mamata: 94.5%</text>

                    <rect x="35" y="120" width="190" height="24" rx="4" fill="#1e293b" />
                    <text x="45" y="136" fill="#e2e8f0" fontSize="10">Susmita: 78.2%</text>

                    <rect x="35" y="150" width="190" height="24" rx="4" fill="#1e293b" />
                    <text x="45" y="166" fill="#e2e8f0" fontSize="10">Debangshu: 63.0%</text>

                    <rect x="35" y="180" width="190" height="24" rx="4" fill="#1e293b" />
                    <text x="45" y="196" fill="#e2e8f0" fontSize="10">Rohan: 42.5%</text>
                  </g>

                  {/* Step 2: Expression Transformation */}
                  <g>
                    <rect x="280" y="30" width="260" height="200" rx="8" fill="#020617" stroke="#6366f1" strokeWidth="2" />
                    <text x="410" y="55" fill="#a5b4fc" fontSize="12" fontWeight="bold" textAnchor="middle">2. Scalar Expression Evaluator</text>

                    <rect x="295" y="75" width="230" height="40" rx="4" fill="#1e1b4b" stroke="#4338ca" />
                    <text x="305" y="92" fill="#c7d2fe" fontSize="9" fontWeight="mono">CASE WHEN marks &gt;= 85 THEN 'Distinction'</text>
                    <text x="305" y="106" fill="#c7d2fe" fontSize="9" fontWeight="mono">     WHEN marks &gt;= 70 THEN 'First Div' ...</text>

                    <rect x="295" y="125" width="230" height="40" rx="4" fill="#1e1b4b" stroke="#4338ca" />
                    <text x="305" y="142" fill="#c7d2fe" fontSize="9" fontWeight="mono">FLOOR(fee_inr / 5000) * 5000</text>
                    <text x="305" y="156" fill="#818cf8" fontSize="8">Discretizes to 0, 5000, 10000, 15000</text>

                    <text x="410" y="200" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">✓ Maps N floats to K discrete buckets</text>
                  </g>

                  {/* Flow Arrow 1 to 2 */}
                  <path d="M 240 130 L 280 130" stroke="#6366f1" strokeWidth="2" />

                  {/* Step 3: Categorized Buckets */}
                  <g>
                    <rect x="580" y="30" width="250" height="200" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                    <text x="705" y="55" fill="#f1f5f9" fontSize="12" fontWeight="bold" textAnchor="middle">3. Grouped Result Buckets</text>

                    <rect x="595" y="75" width="220" height="32" rx="4" fill="#1e293b" stroke="#059669" />
                    <text x="605" y="92" fill="#34d399" fontSize="10" fontWeight="bold">'Distinction' Tier</text>
                    <text x="605" y="103" fill="#94a3b8" fontSize="8">COUNT: 1 | AVG: 94.5%</text>

                    <rect x="595" y="115" width="220" height="32" rx="4" fill="#1e293b" stroke="#0ea5e9" />
                    <text x="605" y="132" fill="#38bdf8" fontSize="10" fontWeight="bold">'First Division' Tier</text>
                    <text x="605" y="143" fill="#94a3b8" fontSize="8">COUNT: 1 | AVG: 78.2%</text>

                    <rect x="595" y="155" width="220" height="32" rx="4" fill="#1e293b" stroke="#f43f5e" />
                    <text x="605" y="172" fill="#fb7185" fontSize="10" fontWeight="bold">'Remedial Support' Tier</text>
                    <text x="605" y="183" fill="#94a3b8" fontSize="8">COUNT: 1 | AVG: 42.5%</text>
                  </g>

                  {/* Flow Arrow 2 to 3 */}
                  <path d="M 540 130 L 580 130" stroke="#34d399" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Interactive Simulator Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Multi-Column & Expression Simulator
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Select an analytical scenario to execute live simulation of multi-column and expression group partitioning.
            </p>
          </div>

          {/* Scenario Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {Object.entries(scenarios).map(([key, item]) => {
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
                        item.badgeColor === "emerald" && "bg-emerald-950 text-emerald-400 border border-emerald-800",
                        item.badgeColor === "cyan" && "bg-cyan-950 text-cyan-400 border border-cyan-800",
                        item.badgeColor === "indigo" && "bg-indigo-950 text-indigo-400 border border-indigo-800",
                        item.badgeColor === "violet" && "bg-violet-950 text-violet-400 border border-violet-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Live" : "○ Run Scenario"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Live Simulator Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{scenarios[selectedScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{scenarios[selectedScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Engine: MySQL 8.0+ Optimizer
              </span>
            </div>

            {/* SQL Query Editor Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Engine Query Input</span>
                <span className="text-emerald-400">Deterministic Projection Safe</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {scenarios[selectedScenario].sqlQuery}
              </pre>
            </div>

            {/* Simulated Result Grid */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Partitioned Multi-Dimensional Result Set</span>
                <span className="text-indigo-400">{scenarios[selectedScenario].resultRows.length} Composite Groups Emitted</span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                  <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4 font-mono text-cyan-400">Primary Dimension (Col 1)</th>
                      <th className="py-3 px-4 font-mono text-cyan-400">Secondary Dimension (Col 2)</th>
                      <th className="py-3 px-4 font-mono text-emerald-400">Volume (COUNT)</th>
                      <th className="py-3 px-4 font-mono text-emerald-400">Financial (SUM INR)</th>
                      <th className="py-3 px-4 font-mono text-indigo-400">Statistical Metric</th>
                      <th className="py-3 px-4 font-mono text-amber-400">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-xs">
                    {scenarios[selectedScenario].resultRows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-4 font-semibold text-white font-sans">{row.dim1}</td>
                        <td className="py-3 px-4 text-cyan-300 font-sans">{row.dim2}</td>
                        <td className="py-3 px-4 text-emerald-300">{row.metric1}</td>
                        <td className="py-3 px-4 text-emerald-400 font-bold">{row.metric2}</td>
                        <td className="py-3 px-4 text-indigo-300">{row.metric3}</td>
                        <td className="py-3 px-4">
                          <span
                            className={clsx(
                              "px-2 py-0.5 rounded text-[11px] font-sans font-medium",
                              row.color === "emerald" && "bg-emerald-950/80 text-emerald-400 border border-emerald-800",
                              row.color === "cyan" && "bg-cyan-950/80 text-cyan-400 border border-cyan-800",
                              row.color === "indigo" && "bg-indigo-950/80 text-indigo-400 border border-indigo-800",
                              row.color === "violet" && "bg-violet-950/80 text-violet-400 border border-violet-800",
                              row.color === "amber" && "bg-amber-950/80 text-amber-400 border border-amber-800",
                              row.color === "rose" && "bg-rose-950/80 text-rose-400 border border-rose-800",
                              row.color === "slate" && "bg-slate-800 text-slate-400 border border-slate-700"
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
          </div>
        </section>

        {/* SECTION 5: Production Industry Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Production Industry Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Real-world architectures showing multi-column and expression grouping in educational, e-commerce, healthcare, and infrastructure analytics.
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
                  Academy Regional Batch & Stream Optimization Matrix
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore & Kolkata Campuses</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui's training academy tracks enrollment volume, aggregate tuition fee collection in Indian Rupees (₹), and academic pass rates sliced across Center Location, Course Stream, and Academic Batch Timing (Morning vs Evening).
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`SELECT 
    centre_city,
    course_stream,
    batch_timing,
    COUNT(*) AS total_enrolled,
    SUM(fee_amount_inr) AS total_revenue_inr,
    ROUND(AVG(marks_pct), 2) AS batch_mean_score,
    GROUP_CONCAT(student_name ORDER BY marks_pct DESC SEPARATOR ', ') AS top_students
FROM academy_enrollments
WHERE academic_session = '2026-2027' AND is_confirmed = 1
GROUP BY centre_city, course_stream, batch_timing
HAVING COUNT(*) >= 10
ORDER BY centre_city ASC, total_revenue_inr DESC;`}
              </pre>
            </div>

            {/* Case Study 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="p-1.5 rounded bg-cyan-950 text-cyan-400 font-mono text-xs border border-cyan-800">
                    CASE 02
                  </span>
                  E-Commerce Quarterly Logistics & Delivery Channel Breakdown
                </h3>
                <span className="text-xs text-slate-400 font-mono">Logistics: West Bengal Delivery Hubs</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Analyzing fulfillment speeds and shipping costs across calendar quarters, delivery partners, and shipping priority tiers (Express vs Standard).
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-cyan-300 border border-slate-800 overflow-x-auto">
{`SELECT 
    YEAR(shipment_date) AS fiscal_year,
    QUARTER(shipment_date) AS fiscal_quarter,
    courier_partner,
    shipping_tier,
    COUNT(order_id) AS total_parcels,
    SUM(freight_cost_inr) AS aggregate_freight_inr,
    ROUND(AVG(DATEDIFF(delivery_date, shipment_date)), 1) AS avg_transit_days
FROM shipment_dispatches
WHERE shipment_status = 'DELIVERED'
GROUP BY YEAR(shipment_date), QUARTER(shipment_date), courier_partner, shipping_tier
ORDER BY fiscal_year DESC, fiscal_quarter DESC, total_parcels DESC;`}
              </pre>
            </div>

            {/* Case Study 3 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-violet-500/40 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="p-1.5 rounded bg-violet-950 text-violet-400 font-mono text-xs border border-violet-800">
                    CASE 03
                  </span>
                  Hospital Ward & Shift Nurse-to-Patient Ratio Analytics
                </h3>
                <span className="text-xs text-slate-400 font-mono">Healthcare: Kolkata Medical Network</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Healthcare monitoring system that groups patient vitals and nursing staff load by Hospital Ward and Duty Shift (Morning, Evening, Night) to ensure regulatory compliance.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-violet-300 border border-slate-800 overflow-x-auto">
{`SELECT 
    hospital_unit,
    ward_name,
    CASE 
        WHEN HOUR(log_time) BETWEEN 6 AND 13 THEN 'Morning Shift (06-14)'
        WHEN HOUR(log_time) BETWEEN 14 AND 21 THEN 'Evening Shift (14-22)'
        ELSE 'Night Shift (22-06)'
    END AS operational_shift,
    COUNT(DISTINCT patient_id) AS active_inpatient_count,
    COUNT(DISTINCT staff_id) AS assigned_nursing_staff,
    ROUND(COUNT(DISTINCT patient_id) / COUNT(DISTINCT staff_id), 2) AS patient_to_nurse_ratio
FROM ward_admissions_log
WHERE log_date = CURDATE()
GROUP BY hospital_unit, ward_name, operational_shift
ORDER BY patient_to_nurse_ratio DESC;`}
              </pre>
            </div>
          </div>
        </section>

        {/* SECTION 6: ONLY_FULL_GROUP_BY, Pitfalls & Indexing */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Senior Pitfalls, Error 1055, and Composite B-Tree Indexing
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Avoid subtle SQL bugs, non-deterministic queries, and severe memory sorting performance bottlenecks.
            </p>
          </div>

          <div className="space-y-6">
            {/* Pitfall 1: Error 1055 ONLY_FULL_GROUP_BY */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded bg-rose-950 text-rose-400 font-mono text-xs font-bold border border-rose-800">
                  CRITICAL ERROR
                </span>
                <h3 className="text-base font-bold text-white">
                  Error 1055 (42000): In 'ONLY_FULL_GROUP_BY' Expression is Not in GROUP BY
                </h3>
              </div>
              <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                If you select a column that is neither part of the multi-column <code className="text-cyan-300 font-mono">GROUP BY</code> list nor enclosed in an aggregate function, MySQL rejects the query to prevent non-deterministic random row projection.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-rose-950/30 border border-rose-900/50 rounded-xl space-y-2">
                  <div className="text-rose-400 font-mono text-xs font-bold">❌ Broken Query (Fails with Error 1055):</div>
                  <pre className="text-xs font-mono text-rose-200 overflow-x-auto">
{`SELECT 
    centre_city,
    course_stream,
    student_name,  -- ❌ NOT in GROUP BY & NOT aggregated!
    COUNT(*)
FROM student_enrollments
GROUP BY centre_city, course_stream;`}
                  </pre>
                  <p className="text-[11px] text-rose-300">
                    Why: Which student's name should MySQL return for a group of 30 students? It is non-deterministic.
                  </p>
                </div>

                <div className="p-4 bg-emerald-950/30 border border-emerald-900/50 rounded-xl space-y-2">
                  <div className="text-emerald-400 font-mono text-xs font-bold">✓ Fixed Production Pattern:</div>
                  <pre className="text-xs font-mono text-emerald-200 overflow-x-auto">
{`SELECT 
    centre_city,
    course_stream,
    GROUP_CONCAT(student_name SEPARATOR ', ') AS student_roster,
    COUNT(*)
FROM student_enrollments
GROUP BY centre_city, course_stream;`}
                  </pre>
                  <p className="text-[11px] text-emerald-300">
                    Solution: Wrap with GROUP_CONCAT(), use MIN()/MAX(), or add student_name to GROUP BY.
                  </p>
                </div>
              </div>
            </div>

            {/* Performance & Indexing */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded bg-amber-950 text-amber-400 font-mono text-xs font-bold border border-amber-800">
                  OPTIMIZATION
                </span>
                <h3 className="text-base font-bold text-white">
                  Composite Index Acceleration (Eliminating Temporary Filesort)
                </h3>
              </div>
              <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                Executing multi-column grouping on unindexed large tables forces MySQL to write temporary disk tables and perform expensive filesort operations (<code className="text-amber-400 font-mono">Using temporary; Using filesort</code>).
              </p>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <div className="text-xs text-cyan-300 font-mono">-- Step 1: Create a composite covering index matching the grouping prefix:</div>
                <pre className="text-xs font-mono text-emerald-300">
{`CREATE INDEX idx_city_stream_fee 
ON student_enrollments(centre_city, course_stream, fee_amount_inr);`}
                </pre>
                <div className="text-xs text-slate-400 leading-relaxed">
                  With this composite index, MySQL performs a <strong>Tight Index Scan</strong>, reading groups directly off the pre-sorted B-Tree leaf pages in <code className="text-emerald-400 font-mono">O(1)</code> memory space without creating any temporary tables.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: Student Checklist & Hints */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              7. Mini Checklist & Senior Developer Hints
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Essential takeaways and mental checks before submitting multi-dimensional SQL aggregation queries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Checklist */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Student Exam & Interview Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Every unaggregated SELECT column is present in the GROUP BY column list.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>For temporal analysis over multiple years, group by BOTH <code className="text-cyan-300 font-mono">YEAR()</code> and <code className="text-cyan-300 font-mono">MONTH()</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Filter individual rows in <code className="text-emerald-300 font-mono">WHERE</code> before grouping; reserve <code className="text-cyan-300 font-mono">HAVING</code> solely for aggregate metrics.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Do not rely on positional aliases like <code className="text-amber-300 font-mono">GROUP BY 1, 2</code> in production scripts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">05.</span>
                  <span>Build composite B-Tree indexes matching the multi-column grouping hierarchy.</span>
                </li>
              </ul>
            </div>

            {/* Hints Box */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Guidance & Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Think about Cartesian explosion...”</span>
                  If column A has 1,000 distinct values and column B has 500 distinct values, grouping by both can yield up to 500,000 rows. Always check result cardinality.
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Observe carefully with NULL values...”</span>
                  MySQL treats <code className="text-cyan-300 font-mono">(valA, NULL)</code> as a distinct composite bucket. If multiple rows have NULLs in both columns, they coalesce into one <code className="text-cyan-300 font-mono">(NULL, NULL)</code> group.
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-violet-400 font-bold block mb-1">“Try changing your indexing strategy...”</span>
                  When grouping by expressions like <code className="text-cyan-300 font-mono">UPPER(city)</code>, standard indexes are ignored. Use MySQL 8.0 functional indexes <code className="text-cyan-300 font-mono">((UPPER(city)))</code>.
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
              Comprehensive reference questions covering basic syntax, edge cases, MySQL 8.0 optimizer behavior, and real-world scenarios.
            </p>
          </div>

          <FAQTemplate
            title="Grouping by Multiple Columns & Expressions FAQs"
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
            title="Grouping by Multiple Columns and Expressions"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic13_note.txt"
          />

          <Teacher
            note="Remember: Single-column grouping answers simple questions (e.g., 'How many students per city?'), but multi-column and expression grouping solves real business intelligence problems (e.g., 'What is our quarterly fee collection across each course stream in Barrackpore vs Kolkata?'). Always verify that your SELECT column list strictly matches your non-aggregated GROUP BY expressions under ONLY_FULL_GROUP_BY to avoid Error 1055, and create composite B-tree indexes matching the exact column order for lightning-fast query execution."
          />
        </section>
      </main>
    </div>
  );
};

export default Topic13;
