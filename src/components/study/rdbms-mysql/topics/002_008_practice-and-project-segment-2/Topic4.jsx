import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

/**
 * Topic4 – Complex SQL Query Writing Challenges (Joins + Aggregation + Functions)
 * Module: 002_008_practice-and-project-segment-2
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on advanced SQL synthesis, window functions, CTEs, and hierarchical rollups.
 */
const Topic4 = () => {
  // Interactive Simulator State
  const [selectedChallenge, setSelectedChallenge] = useState("dept_ranking_scholarship");

  const queryChallenges = {
    dept_ranking_scholarship: {
      title: "Challenge 1: Department Academic Ranking & Dynamic Scholarship Tiers",
      badge: "Window Functions & CASE",
      badgeColor: "emerald",
      sqlQuery: `-- Ranking students within academic departments and assigning dynamic tuition scholarships:
SELECT 
    d.dept_name,
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    ROUND(AVG(e.exam_score_pct), 2) AS avg_exam_score,
    DENSE_RANK() OVER (
        PARTITION BY d.dept_id 
        ORDER BY AVG(e.exam_score_pct) DESC
    ) AS rank_in_dept,
    SUM(p.amount_paid_inr) AS total_fee_paid_inr,
    CASE 
        WHEN AVG(e.exam_score_pct) >= 90.00 THEN 'Gold Merit (50% Fee Waiver)'
        WHEN AVG(e.exam_score_pct) >= 80.00 THEN 'Silver Merit (25% Fee Waiver)'
        ELSE 'Standard Tuition'
    END AS scholarship_status
FROM students s
JOIN departments d ON s.dept_id = d.dept_id
JOIN enrollments e ON s.student_id = e.student_id
LEFT JOIN fee_payments p ON e.enrollment_id = p.enrollment_id
GROUP BY d.dept_id, d.dept_name, s.student_id, s.first_name, s.last_name
HAVING avg_exam_score >= 60.00
ORDER BY d.dept_name ASC, rank_in_dept ASC;`,
      resultRows: [
        { col1: "Computer Science", col2: "Mamata Hui", col3: "94.50%", col4: "Rank #1", col5: "₹25,000.00", col6: "Gold Merit (50% Fee Waiver)", status: "Top Performer" },
        { col1: "Computer Science", col2: "Susmita Sen", col3: "88.00%", col4: "Rank #2", col5: "₹25,000.00", col6: "Silver Merit (25% Fee Waiver)", status: "Honor Roll" },
        { col1: "Information Tech", col2: "Abhronila Saha", col3: "96.20%", col4: "Rank #1", col5: "₹22,000.00", col6: "Gold Merit (50% Fee Waiver)", status: "Top Performer" },
        { col1: "Information Tech", col2: "Debangshu Roy", col3: "82.40%", col4: "Rank #2", col5: "₹22,000.00", col6: "Silver Merit (25% Fee Waiver)", status: "Honor Roll" },
      ],
      explanation:
        "Combines 4 relational tables, aggregates scores with `AVG()`, partitions ranks using `DENSE_RANK()`, and applies conditional logic with `CASE WHEN`.",
    },
    mom_revenue_growth_lag: {
      title: "Challenge 2: Month-over-Month (MoM) Tuition Growth with LAG()",
      badge: "CTE & Offset Window",
      badgeColor: "cyan",
      sqlQuery: `-- Month-over-Month Revenue Growth Engine using CTE and LAG():
WITH MonthlyBranchRevenue AS (
    SELECT 
        b.branch_name,
        DATE_FORMAT(p.payment_date, '%Y-%m') AS payment_month,
        SUM(p.amount_paid_inr) AS current_month_rev
    FROM fee_payments p
    JOIN enrollments e ON p.enrollment_id = e.enrollment_id
    JOIN students s ON e.student_id = s.student_id
    JOIN branches b ON s.branch_id = b.branch_id
    GROUP BY b.branch_id, b.branch_name, DATE_FORMAT(p.payment_date, '%Y-%m')
)
SELECT 
    branch_name,
    payment_month,
    current_month_rev,
    LAG(current_month_rev, 1, 0.00) OVER (
        PARTITION BY branch_name ORDER BY payment_month ASC
    ) AS prev_month_rev,
    ROUND(
        ((current_month_rev - LAG(current_month_rev, 1, current_month_rev) OVER (
            PARTITION BY branch_name ORDER BY payment_month ASC
        )) / LAG(current_month_rev, 1, current_month_rev) OVER (
            PARTITION BY branch_name ORDER BY payment_month ASC
        )) * 100.0, 2
    ) AS mom_growth_pct
FROM MonthlyBranchRevenue;`,
      resultRows: [
        { col1: "Barrackpore Hub", col2: "2026-07", col3: "₹4,50,000.00", col4: "₹3,80,000.00", col5: "+₹70,000.00", col6: "+18.42% MoM", status: "Strong Growth" },
        { col1: "Barrackpore Hub", col2: "2026-08", col3: "₹5,20,000.00", col4: "₹4,50,000.00", col5: "+₹70,000.00", col6: "+15.56% MoM", status: "Strong Growth" },
        { col1: "Kolkata Central", col2: "2026-08", col3: "₹8,40,000.00", col4: "₹7,60,000.00", col5: "+₹80,000.00", col6: "+10.53% MoM", status: "Positive Growth" },
      ],
      explanation:
        "Uses a Common Table Expression (CTE) to pre-aggregate monthly sums, then utilizes `LAG()` to reference the prior month and calculate exact growth percentage.",
    },
    hierarchical_rollup_summary: {
      title: "Challenge 3: Hierarchical Multi-Level Revenue with WITH ROLLUP",
      badge: "Super-Aggregations",
      badgeColor: "amber",
      sqlQuery: `-- Generating hierarchical financial reports with branch subtotals and grand totals:
SELECT 
    COALESCE(b.branch_name, '=== ALL BRANCHES (GRAND TOTAL) ===') AS branch_name,
    COALESCE(c.course_name, '--- Branch Subtotal ---') AS course_name,
    COUNT(e.enrollment_id) AS total_enrolled_students,
    SUM(p.amount_paid_inr) AS total_revenue_collected_inr
FROM branches b
JOIN students s ON b.branch_id = s.branch_id
JOIN enrollments e ON s.student_id = e.student_id
JOIN courses c ON e.course_code = c.course_code
JOIN fee_payments p ON e.enrollment_id = p.enrollment_id
GROUP BY b.branch_name, c.course_name WITH ROLLUP;`,
      resultRows: [
        { col1: "Barrackpore Hub", col2: "Full-Stack React", col3: "45 Students", col4: "₹6,75,000.00", col5: "Branch Level", col6: "Direct Sales", status: "Active Course" },
        { col1: "Barrackpore Hub", col2: "--- Branch Subtotal ---", col3: "110 Students", col4: "₹14,50,000.00", col5: "Subtotal Row", col6: "Branch Total", status: "Subtotal" },
        { col1: "=== ALL BRANCHES (GRAND TOTAL) ===", col2: "--- Branch Subtotal ---", col3: "295 Students", col4: "₹42,80,000.00", col5: "Grand Total", col6: "Enterprise Total", status: "Grand Total" },
      ],
      explanation:
        "Generates super-aggregate subtotal and grand total rows in a single query pass using `WITH ROLLUP` and formats NULL markers cleanly with `COALESCE()`.",
    },
  };

  const navItems = [
    { id: "project-overview", label: "1. The Query Toolkit" },
    { id: "query-execution-flow", label: "2. SQL Logical Execution Order" },
    { id: "svg-diagrams", label: "3. Execution & Window Frame SVGs" },
    { id: "interactive-sandbox", label: "4. Live Query Sandbox" },
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
            <span>Module 002_008</span>
            <span>•</span>
            <span>Query Challenge 4 of 8</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Advanced Query Synthesis
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Complex SQL Query Writing Challenges
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master the synthesis of multi-table joins, analytic window functions (<code className="text-cyan-300 font-mono">DENSE_RANK, LAG, LEAD</code>), hierarchical rollups, and Common Table Expressions (CTEs) for enterprise analytical reporting.
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
        {/* SECTION 1: Overview */}
        <section id="project-overview" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Complex Query Engineering Toolkit
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The four pillars of advanced SQL analytical reporting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <span>🔗</span> Relational JOINs
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Seamlessly traversing 4+ normalized tables with INNER and LEFT joins to consolidate business entities.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span>📊</span> Window Functions
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Computing partitions, rankings (<code className="text-emerald-300 font-mono">DENSE_RANK</code>), and historical offsets (<code className="text-emerald-300 font-mono">LAG/LEAD</code>) without collapsing rows.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <span>📈</span> Super-Aggregates
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Generating multi-level hierarchical subtotals and grand totals in a single pass using <code className="text-amber-300 font-mono">WITH ROLLUP</code>.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <span>🧠</span> CTE Modularity
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Structuring complex multi-stage analytical queries into readable, reusable Common Table Expressions.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Execution Pipeline */}
        <section id="query-execution-flow" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. SQL Logical Execution Order Pipeline
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why clauses execute in a specific mathematical sequence, dictating where aliases and window functions can be placed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-9 gap-2 text-center text-xs font-mono">
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-cyan-300">1. FROM / JOIN</div>
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-rose-300">2. WHERE</div>
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-amber-300">3. GROUP BY</div>
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-indigo-300">4. HAVING</div>
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-emerald-300">5. WINDOW</div>
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-cyan-300">6. SELECT</div>
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-slate-300">7. DISTINCT</div>
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-indigo-300">8. ORDER BY</div>
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-emerald-300">9. LIMIT</div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Execution Order & Window Function Partitioning
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Vector visualizations of the SQL execution engine and window frame computation.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: SQL Pipeline */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> SQL Logical Execution Order Flowchart
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1 */}
                  <g>
                    <rect x="20" y="30" width="140" height="90" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="90" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">1. FROM & JOIN</text>
                    <rect x="30" y="70" width="120" height="25" rx="3" fill="#0f172a" />
                    <text x="90" y="86" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Build Virtual Table</text>
                  </g>

                  {/* Step 2 */}
                  <g>
                    <rect x="185" y="30" width="140" height="90" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="255" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">2. WHERE & GROUP</text>
                    <rect x="195" y="70" width="120" height="25" rx="3" fill="#1e293b" />
                    <text x="255" y="86" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">Filter & Aggregate</text>
                  </g>

                  {/* Step 3 */}
                  <g>
                    <rect x="350" y="30" width="150" height="90" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="425" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">3. WINDOW OVER()</text>
                    <rect x="360" y="70" width="130" height="25" rx="3" fill="#022c22" />
                    <text x="425" y="86" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Rank & LAG Offsets</text>
                  </g>

                  {/* Step 4 */}
                  <g>
                    <rect x="525" y="30" width="140" height="90" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="595" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">4. SELECT & CASE</text>
                    <rect x="535" y="70" width="120" height="25" rx="3" fill="#0f172a" />
                    <text x="595" y="86" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Project Columns</text>
                  </g>

                  {/* Step 5 */}
                  <g>
                    <rect x="690" y="30" width="140" height="90" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="760" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">5. ORDER & LIMIT</text>
                    <rect x="700" y="70" width="120" height="25" rx="3" fill="#022c22" />
                    <text x="760" y="86" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Final Output Slice</text>
                  </g>

                  {/* Connecting Arrows */}
                  <path d="M 160 75 L 185 75" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 325 75 L 350 75" stroke="#ef4444" strokeWidth="1.5" />
                  <path d="M 500 75 L 525 75" stroke="#10b981" strokeWidth="1.5" />
                  <path d="M 665 75 L 690 75" stroke="#818cf8" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            {/* SVG 2: LAG / Offset Window Frame */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400 font-mono">Diagram B:</span> LAG() & LEAD() Offset Window Mechanics
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Row N-1 */}
                  <g>
                    <rect x="50" y="40" width="200" height="75" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="150" y="65" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">Row N-1 (July 2026)</text>
                    <text x="150" y="88" fill="#38bdf8" fontSize="9 font-mono" textAnchor="middle">Revenue: ₹4,50,000.00</text>
                  </g>

                  {/* Row N (Current) */}
                  <g>
                    <rect x="325" y="30" width="200" height="95" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="425" y="55" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Row N: Current (August)</text>
                    <text x="425" y="78" fill="#a7f3d0" fontSize="9 font-mono" textAnchor="middle">Revenue: ₹5,20,000.00</text>
                    <text x="425" y="100" fill="#fcd34d" fontSize="8 font-bold" textAnchor="middle">LAG() = ₹4,50,000 (+15.56%)</text>
                  </g>

                  {/* Row N+1 */}
                  <g>
                    <rect x="600" y="40" width="200" height="75" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="700" y="65" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">Row N+1 (September 2026)</text>
                    <text x="700" y="88" fill="#38bdf8" fontSize="9 font-mono" textAnchor="middle">LEAD() Target Row</text>
                  </g>

                  {/* Arrows */}
                  <path d="M 325 75 L 250 75" stroke="#10b981" strokeWidth="2" />
                  <path d="M 525 75 L 600 75" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="4 2" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Complex Query Sandbox
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Run department ranking queries, MoM growth calculations with LAG(), and multi-level hierarchical rollups live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Object.entries(queryChallenges).map(([key, item]) => {
              const isActive = selectedChallenge === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedChallenge(key)}
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
                        item.badgeColor === "amber" && "bg-amber-950 text-amber-400 border border-amber-800"
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
                <h3 className="text-lg font-bold text-white">{queryChallenges[selectedChallenge].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{queryChallenges[selectedChallenge].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Analytical SQL Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Query Execution</span>
                <span className="text-emerald-400">Multi-Stage Transformation</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {queryChallenges[selectedChallenge].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Dept / Branch</th>
                    <th className="py-3 px-4 text-white">Student / Month / Course</th>
                    <th className="py-3 px-4 text-emerald-400">Score / Revenue / Enrolled</th>
                    <th className="py-3 px-4 text-cyan-400">Rank / Prev Rev / Subtotal</th>
                    <th className="py-3 px-4 text-indigo-400">Fee Paid / Diff / Level</th>
                    <th className="py-3 px-4 text-amber-400">Status / Growth / Channel</th>
                    <th className="py-3 px-4 text-emerald-400">Evaluation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {queryChallenges[selectedChallenge].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.col1}</td>
                      <td className="py-3 px-4 text-white font-sans">{row.col2}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.col3}</td>
                      <td className="py-3 px-4 text-slate-300">{row.col4}</td>
                      <td className="py-3 px-4 text-indigo-300">{row.col5}</td>
                      <td className="py-3 px-4 text-amber-300 font-sans">{row.col6}</td>
                      <td className="py-3 px-4">
                        <span
                          className={clsx(
                            "px-2 py-0.5 rounded text-[11px] font-sans font-medium border",
                            row.status.includes("Top") || row.status.includes("Strong") || row.status.includes("Grand")
                              ? "bg-emerald-950 text-emerald-400 border-emerald-800"
                              : "bg-cyan-950 text-cyan-300 border-cyan-800"
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

        {/* SECTION 5: Production Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Production Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Real-world analytical pipelines built for financial auditing and academic merit evaluation.
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
                  Automated Merit Scholarship Pipeline
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Academy</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui executes an automated query at semester end to rank top students in each branch and credit 50% tuition scholarship waivers to Mamata, Susmita, Abhronila, and Debangshu automatically!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`WITH RankedStudents AS (
    SELECT 
        s.student_id,
        s.branch_id,
        AVG(e.exam_score_pct) AS avg_score,
        DENSE_RANK() OVER (PARTITION BY s.branch_id ORDER BY AVG(e.exam_score_pct) DESC) AS rank_in_branch
    FROM students s
    JOIN enrollments e ON s.student_id = e.student_id
    GROUP BY s.student_id, s.branch_id
)
SELECT * FROM RankedStudents WHERE rank_in_branch <= 2;`}
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
              Avoid common SQL execution sequence errors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Using Window Functions in WHERE
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Writing <code className="text-rose-300 font-mono">WHERE DENSE_RANK() OVER (...) &lt;= 3</code> throws a syntax error because <code className="text-rose-300 font-mono">WHERE</code> executes before window functions!
              </p>
              <div className="text-xs text-slate-400">
                Fix: Wrap the window function in a Common Table Expression (CTE) and filter in the outer query.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Always COALESCE with WITH ROLLUP
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Super-aggregate subtotal and grand total rows produced by <code className="text-emerald-400 font-mono">WITH ROLLUP</code> contain NULLs. Always wrap grouping columns in <code className="text-cyan-300 font-mono">COALESCE(col, 'Subtotal')</code>.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees human-readable executive financial reports.
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
              Key takeaways for advanced SQL query interviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Query Writing Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Remember SQL Execution: FROM → WHERE → GROUP BY → HAVING → WINDOW → SELECT.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Use <code className="text-cyan-300 font-mono">DENSE_RANK()</code> for unbroken rank sequences.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Compute MoM growth using <code className="text-cyan-300 font-mono">LAG(col, 1, 0)</code> in a CTE.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Generate hierarchical subtotals with <code className="text-cyan-300 font-mono">GROUP BY ... WITH ROLLUP</code>.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe CTEs for query clarity...”</span>
                  Never write deeply nested derived tables 5 levels deep; break your complex analytical logic into clear, named CTE blocks (<code className="text-cyan-300 font-mono">WITH Step1 AS (...), Step2 AS (...)</code>).
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about Anti-Joins for churn analysis...”</span>
                  To find customers who haven't placed an order in 90 days, use <code className="text-cyan-300 font-mono">LEFT JOIN orders o ON ... WHERE o.order_id IS NULL</code> rather than costly subqueries!
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
              Comprehensive reference questions covering advanced SQL joins, DENSE_RANK, LAG/LEAD offsets, WITH ROLLUP, and CTE optimization.
            </p>
          </div>

          <FAQTemplate
            title="Complex SQL Query Challenges FAQs"
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
            title="Complex SQL Query Writing Challenges (Joins + Aggregation + Functions)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic4_note.txt"
          />

          <Teacher
            note="To become an elite SQL engineer, you must think in sets and understand the logical execution pipeline. When students struggle to filter top 3 ranked rows, remind them: WHERE runs before window functions! Wrap your ranking query in a CTE and filter in the outer SELECT. Once this clicks, you can write any enterprise financial report effortlessly."
          />
        </section>
      </main>
    </div>
  );
};

export default Topic4;
