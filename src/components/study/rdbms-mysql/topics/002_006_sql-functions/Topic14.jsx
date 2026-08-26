import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic14_files/topic14_questions";
import noteText from "./topic14_files/topic14_note.txt?raw";

/**
 * Topic14 – Hierarchical Summaries and Subtotals with WITH ROLLUP
 * Module: 002_006_sql-functions (Built-in Functions, Grouping & Aggregations)
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial component for WITH ROLLUP and GROUPING().
 */
const Topic14 = () => {
  // Interactive Simulator State
  const [selectedScenario, setSelectedScenario] = useState("academy_revenue_rollup");
  const [showGroupingFlags, setShowGroupingFlags] = useState(true);

  const scenarios = {
    academy_revenue_rollup: {
      title: "1. Institutional Campus & Stream Multi-Level Rollup",
      badge: "2-Tier Hierarchy (Center + Stream)",
      badgeColor: "emerald",
      sqlQuery: `SELECT 
    IF(GROUPING(centre_city) = 1, '&gt;> ALL CAMPUSES (GRAND TOTAL) <<', centre_city) AS campus_location,
    IF(GROUPING(course_stream) = 1, '>&gt; ALL STREAMS (CAMPUS TOTAL) <<', course_stream) AS stream_name,
    GROUPING(centre_city) AS grp_city,
    GROUPING(course_stream) AS grp_stream,
    COUNT(*) AS total_students,
    SUM(fee_amount_inr) AS collected_revenue_inr,
    ROUND(AVG(marks_pct), 2) AS average_score_pct
FROM student_enrollments
WHERE admission_status = 'CONFIRMED'
GROUP BY centre_city, course_stream WITH ROLLUP;`,
      resultRows: [
        { dim1: "Barrackpore Campus", dim2: "React Fullstack", gCity: 0, gStream: 0, metric1: "34 Students", metric2: "₹8,50,000", metric3: "88.4%", rowType: "leaf", color: "cyan" },
        { dim1: "Barrackpore Campus", dim2: "Python Data Science", gCity: 0, gStream: 0, metric1: "28 Students", metric2: "₹7,00,000", metric3: "84.2%", rowType: "leaf", color: "cyan" },
        { dim1: "Barrackpore Campus", dim2: ">&gt; ALL STREAMS (CAMPUS TOTAL) <<", gCity: 0, gStream: 1, metric1: "62 Students", metric2: "₹15,50,000", metric3: "86.5%", rowType: "subtotal", color: "indigo" },
        { dim1: "Kolkata Central", dim2: "Java Enterprise", gCity: 0, gStream: 0, metric1: "42 Students", metric2: "₹10,50,000", metric3: "82.6%", rowType: "leaf", color: "cyan" },
        { dim1: "Kolkata Central", dim2: "React Fullstack", gCity: 0, gStream: 0, metric1: "30 Students", metric2: "₹7,50,000", metric3: "86.1%", rowType: "leaf", color: "cyan" },
        { dim1: "Kolkata Central", dim2: ">&gt; ALL STREAMS (CAMPUS TOTAL) <<", gCity: 0, gStream: 1, metric1: "72 Students", metric2: "₹18,00,000", metric3: "84.1%", rowType: "subtotal", color: "indigo" },
        { dim1: ">&gt; ALL CAMPUSES (GRAND TOTAL) <<", dim2: ">&gt; ALL STREAMS (CAMPUS TOTAL) <<", gCity: 1, gStream: 1, metric1: "134 Students", metric2: "₹33,50,000", metric3: "85.2%", rowType: "grandtotal", color: "emerald" },
      ],
      explanation:
        "MySQL calculates fine-grained stream metrics, emits an intermediate subtotal for each center location, and generates a single grand total at the bottom in one relational pass.",
    },
    temporal_quarter_rollup: {
      title: "2. Annual & Quarterly Financial Turnover Rollup",
      badge: "Date Hierarchy (Year + Quarter)",
      badgeColor: "cyan",
      sqlQuery: `SELECT 
    IF(GROUPING(fiscal_year) = 1, '>&gt; LIFETIME GRAND TOTAL <<', fiscal_year) AS year_label,
    IF(GROUPING(fiscal_quarter) = 1, '>&gt; ANNUAL TOTAL <<', CONCAT('Q', fiscal_quarter)) AS quarter_label,
    GROUPING(fiscal_year) AS grp_year,
    GROUPING(fiscal_quarter) AS grp_quarter,
    COUNT(order_id) AS total_orders,
    SUM(turnover_inr) AS quarterly_turnover_inr
FROM corporate_financials
GROUP BY fiscal_year, fiscal_quarter WITH ROLLUP;`,
      resultRows: [
        { dim1: "2025", dim2: "Q3", gCity: 0, gStream: 0, metric1: "450 Orders", metric2: "₹45,00,000", metric3: "100%", rowType: "leaf", color: "cyan" },
        { dim1: "2025", dim2: "Q4", gCity: 0, gStream: 0, metric1: "520 Orders", metric2: "₹58,00,000", metric3: "100%", rowType: "leaf", color: "cyan" },
        { dim1: "2025", dim2: ">&gt; ANNUAL TOTAL <<", gCity: 0, gStream: 1, metric1: "970 Orders", metric2: "₹1,03,00,000", metric3: "100%", rowType: "subtotal", color: "indigo" },
        { dim1: "2026", dim2: "Q1", gCity: 0, gStream: 0, metric1: "580 Orders", metric2: "₹64,00,000", metric3: "100%", rowType: "leaf", color: "cyan" },
        { dim1: "2026", dim2: "Q2", gCity: 0, gStream: 0, metric1: "630 Orders", metric2: "₹72,50,000", metric3: "100%", rowType: "leaf", color: "cyan" },
        { dim1: "2026", dim2: ">&gt; ANNUAL TOTAL <<", gCity: 0, gStream: 1, metric1: "1210 Orders", metric2: "₹1,36,50,000", metric3: "100%", rowType: "subtotal", color: "indigo" },
        { dim1: ">&gt; LIFETIME GRAND TOTAL <<", dim2: ">&gt; ANNUAL TOTAL <<", gCity: 1, gStream: 1, metric1: "2180 Orders", metric2: "₹2,39,50,000", metric3: "100%", rowType: "grandtotal", color: "emerald" },
      ],
      explanation:
        "ROLLUP hierarchically produces quarterly breakdown rows, annual subtotal sums, and a multi-year global turnover total.",
    },
    natural_null_disambiguation: {
      title: "3. Disambiguating Natural NULLs with GROUPING()",
      badge: "Data NULL vs ROLLUP NULL",
      badgeColor: "violet",
      sqlQuery: `SELECT 
    IF(GROUPING(department_name) = 1, '>&gt; COMPANY TOTAL <<', 
       COALESCE(department_name, '[Unassigned Dept]')) AS dept,
    IF(GROUPING(job_role) = 1, '>&gt; DEPT TOTAL <<', 
       COALESCE(job_role, '[Unassigned Role]')) AS role,
    GROUPING(department_name) AS is_rollup_dept,
    GROUPING(job_role) AS is_rollup_role,
    COUNT(*) AS headcount,
    SUM(salary_inr) AS monthly_payroll_inr
FROM employee_roster
GROUP BY department_name, job_role WITH ROLLUP;`,
      resultRows: [
        { dim1: "Engineering", dim2: "Lead Architect", gCity: 0, gStream: 0, metric1: "4 Staff", metric2: "₹6,00,000", metric3: "Standard", rowType: "leaf", color: "cyan" },
        { dim1: "Engineering", dim2: "[Unassigned Role] (Natural NULL)", gCity: 0, gStream: 0, metric1: "2 Staff", metric2: "₹1,80,000", metric3: "Natural NULL", rowType: "leaf", color: "amber" },
        { dim1: "Engineering", dim2: ">&gt; DEPT TOTAL <<", gCity: 0, gStream: 1, metric1: "6 Staff", metric2: "₹7,80,000", metric3: "Subtotal", rowType: "subtotal", color: "indigo" },
        { dim1: ">&gt; COMPANY TOTAL <<", dim2: ">&gt; DEPT TOTAL <<", gCity: 1, gStream: 1, metric1: "6 Staff", metric2: "₹7,80,000", metric3: "Grand Total", rowType: "grandtotal", color: "emerald" },
      ],
      explanation:
        "GROUPING() returns 0 for a naturally missing job_role in the source data, but returns 1 for a ROLLUP-created summary row. This completely prevents mislabeling!",
    },
  };

  const navItems = [
    { id: "theory", label: "1. WITH ROLLUP Core Architecture" },
    { id: "grouping-function", label: "2. The GROUPING() Disambiguator" },
    { id: "svg-diagrams", label: "3. Hierarchical Super-Aggregate SVGs" },
    { id: "interactive-sandbox", label: "4. Interactive ROLLUP Simulator" },
    { id: "case-studies", label: "5. Production Case Studies" },
    { id: "order-by-sorting", label: "6. Sorting with Derived CTEs" },
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
            <span>Topic 14 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Super-Aggregate Hierarchies
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Hierarchical Summaries & Subtotals with WITH ROLLUP
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Generate executive subtotals and grand totals in a single high-performance query. Learn how{" "}
            <code className="text-cyan-300 font-mono font-bold">WITH ROLLUP</code> cascades through dimensions and how MySQL 8.0's{" "}
            <code className="text-emerald-300 font-mono font-bold">GROUPING()</code> eliminates the natural NULL trap.
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
              1. The Super-Aggregate Multiplier: How WITH ROLLUP Works
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Say goodbye to repetitive UNION ALL queries. Understand the N + 1 hierarchy mechanics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="p-2 rounded-lg bg-cyan-950/80 text-cyan-400 font-mono text-sm font-bold border border-cyan-800">
                  N + 1 Tiers
                </span>
                <h3 className="text-lg font-semibold text-white">Hierarchical Dimension Collapse</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                For a query with <code className="text-cyan-300 font-mono">GROUP BY col1, col2, col3 WITH ROLLUP</code>, MySQL aggregates right-to-left across 4 levels:
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-mono bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                <li className="text-cyan-300">Level 0: (col1, col2, col3) → Finest Detail</li>
                <li className="text-indigo-300">Level 1: (col1, col2, NULL) → Subtotal over col3</li>
                <li className="text-violet-300">Level 2: (col1, NULL, NULL) → Subtotal over col2 & col3</li>
                <li className="text-emerald-400 font-bold">Level 3: (NULL, NULL, NULL) → Grand Total</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/30 transition-all duration-300 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="p-2 rounded-lg bg-emerald-950/80 text-emerald-400 font-mono text-sm font-bold border border-emerald-800">
                  Efficiency
                </span>
                <h3 className="text-lg font-semibold text-white">Single-Pass Execution Pipeline</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Unlike writing 3 separate queries combined with <code className="text-rose-400 font-mono">UNION ALL</code> (which scans the table 3 times), <code className="text-emerald-400 font-mono">WITH ROLLUP</code> computes subtotals in a single forward scan.
              </p>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <div><span className="text-emerald-400">SELECT</span> city, stream, <span className="text-cyan-400">SUM</span>(fee)</div>
                <div><span className="text-emerald-400">FROM</span> student_enrollments</div>
                <div><span className="text-emerald-400">GROUP BY</span> city, stream <span className="text-emerald-400 font-bold">WITH ROLLUP</span>;</div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: The GROUPING() Function */}
        <section id="grouping-function" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Disambiguating NULLs: MySQL 8.0+ GROUPING() Function
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why <code className="text-amber-400 font-mono">COALESCE()</code> is unsafe when tables contain missing data, and how <code className="text-emerald-400 font-mono">GROUPING()</code> guarantees exact labeling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> The Natural NULL Trap with COALESCE
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                If a column in your database has <code className="text-amber-300 font-mono">NULL</code> values (e.g., a student with an unassigned course stream), <code className="text-rose-400 font-mono">COALESCE(stream, 'ALL STREAMS')</code> will erroneously replace the real student's unassigned stream with 'ALL STREAMS', corrupting your report.
              </p>
              <div className="p-3 bg-rose-950/20 border border-rose-900/40 rounded-xl text-xs font-mono text-rose-300">
                Data row: ('Kolkata', NULL) → Labeled as 'ALL STREAMS' ❌ WRONG
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> The Definite GROUPING() Solution
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                <code className="text-cyan-300 font-mono">GROUPING(col)</code> inspects the internal rollup state: it outputs <code className="text-emerald-400 font-mono font-bold">1</code> ONLY if the row is an engine-generated subtotal, and <code className="text-cyan-300 font-mono font-bold">0</code> for regular data (even if that data happens to be NULL).
              </p>
              <div className="p-3 bg-emerald-950/20 border border-emerald-900/40 rounded-xl text-xs font-mono text-emerald-300">
                IF(GROUPING(stream) = 1, 'ALL STREAMS', COALESCE(stream, 'Unassigned')) ✓ SAFE
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Hierarchical Rollup Cascade & Bitwise State
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Inspect how MySQL aggregates up the hierarchical tree to emit intermediate subtotals and top-level grand totals.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Hierarchical Rollup Tree */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Hierarchical 3-Tier Rollup Tree
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                From base leaves (Barrackpore/React, Barrackpore/Java) up through Center Subtotals to the Executive Institutional Grand Total.
              </p>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 320" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Top Level: Grand Total */}
                  <g>
                    <rect x="300" y="20" width="250" height="55" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                    <text x="425" y="42" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">★ LEVEL 2: GRAND TOTAL</text>
                    <text x="425" y="60" fill="#a7f3d0" fontSize="10" textAnchor="middle">GROUPING: (City=1, Stream=1) | 134 Students | ₹33,50,000</text>
                  </g>

                  {/* Level 1 Subtotals */}
                  <g>
                    {/* Barrackpore Subtotal */}
                    <rect x="80" y="115" width="310" height="50" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="235" y="135" fill="#a5b4fc" fontSize="11" fontWeight="bold" textAnchor="middle">◆ LEVEL 1: Barrackpore Campus Subtotal</text>
                    <text x="235" y="152" fill="#c7d2fe" fontSize="10" textAnchor="middle">GROUPING: (City=0, Stream=1) | 62 Students | ₹15,50,000</text>

                    {/* Kolkata Subtotal */}
                    <rect x="460" y="115" width="310" height="50" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="615" y="135" fill="#a5b4fc" fontSize="11" fontWeight="bold" textAnchor="middle">◆ LEVEL 1: Kolkata Central Subtotal</text>
                    <text x="615" y="152" fill="#c7d2fe" fontSize="10" textAnchor="middle">GROUPING: (City=0, Stream=1) | 72 Students | ₹18,00,000</text>
                  </g>

                  {/* Connecting Lines Grand Total &rarr; Subtotals */}
                  <path d="M 370 75 L 235 115" stroke="#34d399" strokeWidth="1.5" strokeDasharray="3 2" />
                  <path d="M 480 75 L 615 115" stroke="#34d399" strokeWidth="1.5" strokeDasharray="3 2" />

                  {/* Level 0 Leaf Detail Groups */}
                  <g>
                    {/* Barrackpore Leaves */}
                    <rect x="30" y="210" width="180" height="50" rx="6" fill="#0f172a" stroke="#38bdf8" />
                    <text x="120" y="230" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Barrackpore + React</text>
                    <text x="120" y="247" fill="#94a3b8" fontSize="9" textAnchor="middle">34 Students | ₹8.5L</text>

                    <rect x="230" y="210" width="180" height="50" rx="6" fill="#0f172a" stroke="#38bdf8" />
                    <text x="320" y="230" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Barrackpore + Python</text>
                    <text x="320" y="247" fill="#94a3b8" fontSize="9" textAnchor="middle">28 Students | ₹7.0L</text>

                    {/* Kolkata Leaves */}
                    <rect x="440" y="210" width="180" height="50" rx="6" fill="#0f172a" stroke="#38bdf8" />
                    <text x="530" y="230" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Kolkata + Java</text>
                    <text x="530" y="247" fill="#94a3b8" fontSize="9" textAnchor="middle">42 Students | ₹10.5L</text>

                    <rect x="640" y="210" width="180" height="50" rx="6" fill="#0f172a" stroke="#38bdf8" />
                    <text x="730" y="230" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Kolkata + React</text>
                    <text x="730" y="247" fill="#94a3b8" fontSize="9" textAnchor="middle">30 Students | ₹7.5L</text>
                  </g>

                  {/* Connecting Lines Subtotals &rarr; Leaves */}
                  <path d="M 170 165 L 120 210" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 300 165 L 320 210" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 550 165 L 530 210" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 680 165 L 730 210" stroke="#818cf8" strokeWidth="1.5" />

                  {/* Bottom Annotation */}
                  <text x="425" y="300" fill="#64748b" fontSize="11" textAnchor="middle">
                    Execution scans leaves once and rolls upward; no repeated disk scans are performed.
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Interactive Simulator */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive WITH ROLLUP Execution Simulator
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test multi-tier rollups, toggle GROUPING() bit flags, and observe how summary rows populate dynamically.
            </p>
          </div>

          {/* Scenario Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                &gt;
                  <div>
                    <span
                      className={clsx(
                        "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
                        item.badgeColor === "emerald" && "bg-emerald-950 text-emerald-400 border border-emerald-800",
                        item.badgeColor === "cyan" && "bg-cyan-950 text-cyan-400 border border-cyan-800",
                        item.badgeColor === "violet" && "bg-violet-950 text-violet-400 border border-violet-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Live" : "○ Run Simulator"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Simulator Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{scenarios[selectedScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{scenarios[selectedScenario].explanation}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowGroupingFlags(!showGroupingFlags)}
                  className={clsx(
                    "px-3 py-1.5 rounded-lg text-xs font-mono border transition-all cursor-pointer",
                    showGroupingFlags
                      ? "bg-cyan-950 text-cyan-300 border-cyan-700/50"
                      : "bg-slate-800 text-slate-400 border-slate-700"
                  )}
                &gt;
                  {showGroupingFlags ? "✓ Hide GROUPING() Bits" : "Show GROUPING() Bits"}
                </button>
              </div>
            </div>

            {/* SQL Query Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Engine Query Input</span>
                <span className="text-emerald-400">WITH ROLLUP Enabled</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {scenarios[selectedScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Set Table with Visual Row-Type Highlighting */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Hierarchical ROLLUP Result Set</span>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-cyan-400"></span> Detail Row</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-indigo-400"></span> Subtotal</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> Grand Total</span>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                  <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4 font-mono text-cyan-400">Primary Level (Col 1)</th>
                      <th className="py-3 px-4 font-mono text-cyan-400">Secondary Level (Col 2)</th>
                      {showGroupingFlags && (
                        <>
                          <th className="py-3 px-3 font-mono text-indigo-400">grp_1</th>
                          <th className="py-3 px-3 font-mono text-indigo-400">grp_2</th>
                        </>
                      )}
                      <th className="py-3 px-4 font-mono text-emerald-400">Volume</th>
                      <th className="py-3 px-4 font-mono text-emerald-400">Total Revenue (INR)</th>
                      <th className="py-3 px-4 font-mono text-amber-400">Row Tier</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-xs">
                    {scenarios[selectedScenario].resultRows.map((row, idx) => (
                      <tr
                        key={idx}
                        className={clsx(
                          "transition-colors",
                          row.rowType === "grandtotal" && "bg-emerald-950/30 font-bold border-t-2 border-emerald-500",
                          row.rowType === "subtotal" && "bg-indigo-950/20 font-semibold border-t border-indigo-800/60",
                          row.rowType === "leaf" && "hover:bg-slate-800/40"
                        )}
                      >
                        <td
                          className={clsx(
                            "py-3 px-4 font-sans",
                            row.rowType === "grandtotal" ? "text-emerald-300 font-bold" : "text-white"
                          )}
                        >
                          {row.dim1}
                        </td>
                        <td
                          className={clsx(
                            "py-3 px-4 font-sans",
                            row.rowType === "subtotal" ? "text-indigo-300 font-semibold" : "text-cyan-300"
                          )}
                        >
                          {row.dim2}
                        </td>
                        {showGroupingFlags && (
                          <>
                            <td className="py-3 px-3 text-indigo-400">{row.gCity}</td>
                            <td className="py-3 px-3 text-indigo-400">{row.gStream}</td>
                          </>
                        )}
                        <td className="py-3 px-4 text-emerald-300">{row.metric1}</td>
                        <td className="py-3 px-4 text-emerald-400 font-bold">{row.metric2}</td>
                        <td className="py-3 px-4">
                          <span
                            className={clsx(
                              "px-2 py-0.5 rounded text-[11px] font-sans font-medium",
                              row.rowType === "grandtotal" && "bg-emerald-950 text-emerald-400 border border-emerald-800",
                              row.rowType === "subtotal" && "bg-indigo-950 text-indigo-400 border border-indigo-800",
                              row.rowType === "leaf" && "bg-slate-800 text-slate-400 border border-slate-700"
                            )}
                          >
                            {row.rowType.toUpperCase()}
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

        {/* SECTION 5: Production Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Production Industry Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Real-world implementations from West Bengal training centers and enterprise e-commerce platforms.
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
                  Executive Academy Tuition & Student Roster Rollup
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore, Kolkata, Ichapur</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui generates the monthly executive board report summarizing student headcount (including Mamata, Mahima, Abhronila, Susmita, Debangshu), revenue collected in INR (₹), and batch performance metrics across all branches.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`SELECT 
    IF(GROUPING(centre_city) = 1, '&gt;> GRAND INSTITUTIONAL TOTAL <<', centre_city) AS campus,
    IF(GROUPING(course_stream) = 1, '>&gt; ALL STREAM SUB-TOTAL <<', course_stream) AS stream,
    COUNT(*) AS total_students_enrolled,
    SUM(fee_amount_inr) AS collected_tuition_inr,
    ROUND(AVG(marks_pct), 2) AS institutional_mean_marks
FROM academy_enrollments
WHERE admission_status = 'CONFIRMED'
GROUP BY centre_city, course_stream WITH ROLLUP;`}
              </pre>
            </div>

            {/* Case Study 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="p-1.5 rounded bg-cyan-950 text-cyan-400 font-mono text-xs border border-cyan-800">
                    CASE 02
                  </span>
                  E-Commerce Department & Category Sales Rollup
                </h3>
                <span className="text-xs text-slate-400 font-mono">Sector: Online Retail Logistics</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Multi-tier revenue rollup tracking sales across Department (Electronics, Apparel) and Subcategories (Laptops, Smart Phones) with automated grand totals.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-cyan-300 border border-slate-800 overflow-x-auto">
{`SELECT 
    IF(GROUPING(department) = 1, 'ALL DEPARTMENTS', department) AS dept_name,
    IF(GROUPING(category) = 1, 'ALL CATEGORIES', category) AS category_name,
    COUNT(order_id) AS total_orders,
    SUM(sale_amount_inr) AS gross_merchandise_value_inr
FROM customer_orders
WHERE order_date BETWEEN '2026-01-01' AND '2026-12-31'
GROUP BY department, category WITH ROLLUP;`}
              </pre>
            </div>
          </div>
        </section>

        {/* SECTION 6: Sorting with Derived CTEs */}
        <section id="order-by-sorting" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Senior Mastery: Sorting ROLLUP Reports with CTEs & Derived Tables
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Overcome the restriction where ORDER BY cannot be placed inside the same query block as WITH ROLLUP.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <p className="text-sm text-slate-300 leading-relaxed">
              If you want to sort fine-grained groups by revenue descending while keeping the Subtotal rows right beneath their respective categories and the Grand Total row pinned at the very bottom, wrap the query in a Common Table Expression (CTE) and sort on the grouping flags:
            </p>

            <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-indigo-300 border border-slate-800 overflow-x-auto">
{`WITH RollupSummary AS (
    SELECT 
        centre_city,
        course_stream,
        GROUPING(centre_city) AS grp_city,
        GROUPING(course_stream) AS grp_stream,
        COUNT(*) AS student_count,
        SUM(fee_amount_inr) AS total_revenue_inr
    FROM student_enrollments
    GROUP BY centre_city, course_stream WITH ROLLUP
)
SELECT 
    IF(grp_city = 1, '&gt;> GRAND TOTAL <<', centre_city) AS campus,
    IF(grp_stream = 1, '>&gt; SUB-TOTAL <<', course_stream) AS stream,
    student_count,
    total_revenue_inr
FROM RollupSummary
ORDER BY 
    grp_city ASC,              -- Keeps Grand Total (grp_city = 1) at the very bottom
    centre_city ASC,           -- Alphabetical campus order
    grp_stream ASC,            -- Keeps Subtotal (grp_stream = 1) right after detail streams
    total_revenue_inr DESC;    -- Highest revenue streams first within each campus`}
            </pre>
          </div>
        </section>

        {/* SECTION 7: Student Checklist & Hints */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              7. Mini Checklist & Senior Developer Hints
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key mental models for flawless hierarchical report creation.
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
                  <span>Order columns from broadest category on left to finest detail on right.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Always use <code className="text-cyan-300 font-mono">GROUPING()</code> instead of naked <code className="text-rose-300 font-mono">COALESCE()</code> for labeling.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Remember that N grouping columns generate exactly N + 1 aggregation levels.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>To sort ROLLUP results, wrap in a CTE/derived table and sort externally.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe true grand averages...”</span>
                  The Grand Total row from <code className="text-cyan-300 font-mono">AVG(marks_pct)</code> is the genuine global student mean, completely avoiding unweighted spreadsheet average errors!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about index hierarchy...”</span>
                  A composite index on <code className="text-emerald-400 font-mono">(city, stream, fee)</code> allows MySQL to emit subtotals on index page boundaries with zero disk filesort overhead.
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
              Comprehensive reference questions covering syntax, performance, NULL handling, and MySQL 8.0 optimizer behavior.
            </p>
          </div>

          <FAQTemplate
            title="Hierarchical Summaries & Subtotals with WITH ROLLUP FAQs"
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
            title="Hierarchical Summaries and Subtotals with WITH ROLLUP"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic14_note.txt"
          />

          <Teacher
            note="When teaching relational aggregation, students often try to generate subtotals by writing multiple queries and joining them with UNION ALL. Show them how WITH ROLLUP accomplishes this in a single forward pass through the data. Pay special attention to the GROUPING() function in MySQL 8.0—it is the single best way to distinguish between a natural NULL in your table and an engine-generated super-aggregate total row."
          />
        </section>
      </main>
    </div>
  );
};

export default Topic14;
