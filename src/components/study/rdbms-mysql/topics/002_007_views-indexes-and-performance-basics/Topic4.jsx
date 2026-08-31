import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

/**
 * Topic4 – Complex Views with Joins, Grouping, and Derived Columns
 * Module: 002_007_views-indexes-and-performance-basics
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial on creating complex database views with multi-table joins, aggregations, and derived expressions.
 */
const Topic4 = () => {
  // Interactive Simulator State
  const [selectedScenario, setSelectedScenario] = useState("student_360_dimension");

  const complexScenarios = {
    student_360_dimension: {
      title: "1. Multi-Table Student 360 Academic & Financial Dimension",
      badge: "5-Table Join + Aggregations",
      badgeColor: "emerald",
      sqlQuery: `-- 5-table joined complex view with dynamic derived financial formulas:
CREATE OR REPLACE VIEW view_student_academic_360 AS
SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    c.course_title,
    s.centre_city,
    en.course_fee_inr,
    COALESCE(SUM(p.amount_inr), 0.00) AS total_paid_inr,
    (en.course_fee_inr - COALESCE(SUM(p.amount_inr), 0.00)) AS balance_due_inr,
    CASE 
        WHEN (en.course_fee_inr - COALESCE(SUM(p.amount_inr), 0.00)) <= 0 THEN 'CLEARED'
        WHEN COALESCE(SUM(p.amount_inr), 0.00) > 0 THEN 'PARTIAL'
        ELSE 'UNPAID'
    END AS clearance_status,
    ROUND(AVG(sc.exam_score_pct), 1) AS avg_score_pct
FROM students s
JOIN enrollments en ON s.student_id = en.student_id
JOIN courses c ON en.course_id = c.course_id
JOIN batches b ON en.batch_id = b.batch_id
LEFT JOIN fee_payments p ON en.enrollment_id = p.enrollment_id AND p.status = 'SUCCESS'
LEFT JOIN student_exam_scores sc ON en.enrollment_id = sc.enrollment_id
GROUP BY 
    s.student_id, s.first_name, s.last_name, c.course_title, 
    s.centre_city, en.course_fee_inr;`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", stream: "React Fullstack", city: "Barrackpore", fee: "₹25,000.00", paid: "₹25,000.00", due: "₹0.00", status: "CLEARED", score: "92.5%" },
        { id: "STU-102", name: "Susmita Sen", stream: "Java Enterprise", city: "Barrackpore", fee: "₹25,000.00", paid: "₹25,000.00", due: "₹0.00", status: "CLEARED", score: "88.4%" },
        { id: "STU-103", name: "Abhronila Saha", stream: "Python Data Science", city: "Kolkata Central", fee: "₹25,000.00", paid: "₹15,000.00", due: "₹10,000.00", status: "PARTIAL", score: "86.0%" },
        { id: "STU-104", name: "Debangshu Roy", stream: "React Fullstack", city: "Ichapur Tech Hub", fee: "₹25,000.00", paid: "₹0.00", due: "₹25,000.00", status: "UNPAID", score: "79.5%" },
      ],
      explanation:
        "Encapsulates 5 normalized tables into a unified dimensional model. Derives financial balances, conditional clearance tags, and academic exam score averages dynamically.",
    },
    course_profitability_kpis: {
      title: "2. Course Stream Profitability & Recovery Ratio KPI View",
      badge: "Grouped Summary + Safe Division",
      badgeColor: "cyan",
      sqlQuery: `-- Course stream KPI view with NULLIF division protection:
CREATE OR REPLACE VIEW view_course_stream_kpis AS
SELECT 
    c.course_title,
    COUNT(DISTINCT en.student_id) AS enrolled_students,
    SUM(en.course_fee_inr) AS projected_tuition_inr,
    COALESCE(SUM(p.amount_inr), 0.00) AS actual_collected_inr,
    -- Safe division guard using NULLIF:
    ROUND((COALESCE(SUM(p.amount_inr), 0.00) / NULLIF(SUM(en.course_fee_inr), 0)) * 100, 2) AS recovery_ratio_pct
FROM courses c
LEFT JOIN enrollments en ON c.course_id = en.course_id
LEFT JOIN fee_payments p ON en.enrollment_id = p.enrollment_id AND p.status = 'SUCCESS'
GROUP BY c.course_id, c.course_title;`,
      resultRows: [
        { id: "CRS-101", name: "React & Node Fullstack", stream: "65 Students", city: "Barrackpore & Kol", fee: "₹16,25,000.00", paid: "₹15,50,000.00", due: "₹75,000.00", status: "95.38%", score: "High Profit" },
        { id: "CRS-102", name: "Java Enterprise Pro", stream: "48 Students", city: "Barrackpore Hub", fee: "₹12,00,000.00", paid: "₹11,00,000.00", due: "₹1,00,000.00", status: "91.67%", score: "High Profit" },
        { id: "CRS-103", name: "Python Data Science & ML", stream: "50 Students", city: "Kolkata Central", fee: "₹12,50,000.00", paid: "₹11,75,000.00", due: "₹75,000.00", status: "94.00%", score: "High Profit" },
      ],
      explanation:
        "Groups by course and calculates enterprise KPIs. Employs NULLIF(SUM(course_fee), 0) to guarantee total immunity against SQL Error 1365 (Division by zero).",
    },
    mom_cte_growth_view: {
      title: "3. Time-Series Month-over-Month Growth View (CTE + Window Functions)",
      badge: "CTE + LAG() Function",
      badgeColor: "indigo",
      sqlQuery: `-- View utilizing Common Table Expression and LAG() analytic function:
CREATE OR REPLACE VIEW view_branch_monthly_mom_growth AS
WITH MonthlyBranchTurnover AS (
    SELECT 
        s.centre_city AS branch_city,
        DATE_FORMAT(p.payment_date, '%Y-%m') AS billing_month,
        SUM(p.amount_inr) AS monthly_revenue_inr
    FROM fee_payments p
    JOIN enrollments en ON p.enrollment_id = en.enrollment_id
    JOIN students s ON en.student_id = s.student_id
    WHERE p.status = 'SUCCESS'
    GROUP BY s.centre_city, DATE_FORMAT(p.payment_date, '%Y-%m')
)
SELECT 
    branch_city,
    billing_month,
    monthly_revenue_inr,
    COALESCE(LAG(monthly_revenue_inr, 1) OVER (
        PARTITION BY branch_city ORDER BY billing_month
    ), 0.00) AS previous_month_revenue_inr,
    (monthly_revenue_inr - COALESCE(LAG(monthly_revenue_inr, 1) OVER (
        PARTITION BY branch_city ORDER BY billing_month
    ), monthly_revenue_inr)) AS mom_revenue_growth_inr
FROM MonthlyBranchTurnover;`,
      resultRows: [
        { id: "Barrackpore", name: "2026-06", stream: "₹4,50,000.00", city: "₹4,00,000.00", fee: "+₹50,000.00", paid: "Expansion", due: "MoM +12.5%", status: "POSITIVE", score: "Growth" },
        { id: "Barrackpore", name: "2026-07", stream: "₹5,20,000.00", city: "₹4,50,000.00", fee: "+₹70,000.00", paid: "Expansion", due: "MoM +15.5%", status: "POSITIVE", score: "Growth" },
        { id: "Kolkata Central", name: "2026-07", stream: "₹6,10,000.00", city: "₹5,80,000.00", fee: "+₹30,000.00", paid: "Expansion", due: "MoM +5.1%", status: "POSITIVE", score: "Growth" },
      ],
      explanation:
        "Leverages a modular CTE and the LAG() window function within the view definition to calculate time-series Month-over-Month growth across regional campuses.",
    },
  };

  const navItems = [
    { id: "theory", label: "1. Complex Views Overview" },
    { id: "derived-columns", label: "2. Derived Formulas & Safe Logic" },
    { id: "svg-diagrams", label: "3. Architecture & Transformation SVGs" },
    { id: "interactive-sandbox", label: "4. Live Complex View Workbench" },
    { id: "case-studies", label: "5. Production Case Studies" },
    { id: "pitfalls-rules", label: "6. Senior Pitfalls & ONLY_FULL_GROUP_BY" },
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
            <span>Module 002_007</span>
            <span>•</span>
            <span>Topic 4 of 14</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Complex Virtual Dimensions
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Complex Views with Joins, Grouping & Derived Columns
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Construct enterprise-grade analytical dimensions in SQL. Combine multi-table joins, aggregate grouping, conditional{" "}
            <code className="text-cyan-300 font-mono font-bold">CASE</code> expressions, and division-safe formulas with{" "}
            <code className="text-emerald-300 font-mono font-bold">NULLIF()</code> into reusable virtual tables.
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
        {/* SECTION 1: Complex Views Overview */}
        <section id="theory" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. What Makes a Database View "Complex"?
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Moving beyond simple row filters into fully encapsulated reporting dimensions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300">
              <div className="text-emerald-400 font-mono text-xs font-bold uppercase mb-2">01. Relational Joins</div>
              <h3 className="text-base font-bold text-white mb-2">Multi-Table Assembly</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connects 4 to 6 normalized base tables (students, enrollments, courses, batches, payments) into one denormalized view.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300">
              <div className="text-cyan-400 font-mono text-xs font-bold uppercase mb-2">02. Data Reduction</div>
              <h3 className="text-base font-bold text-white mb-2">GROUP BY Aggregations</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Computes cohort totals, grade point averages, and branch collection sums dynamically using <code className="text-cyan-300 font-mono">SUM, AVG, COUNT</code>.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300">
              <div className="text-indigo-400 font-mono text-xs font-bold uppercase mb-2">03. Logic & Formulas</div>
              <h3 className="text-base font-bold text-white mb-2">Derived Expressions</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Calculates financial balances, recovery ratios, and conditional status tags using <code className="text-indigo-300 font-mono">CASE, COALESCE, NULLIF</code>.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-violet-500/40 transition-all duration-300">
              <div className="text-violet-400 font-mono text-xs font-bold uppercase mb-2">04. Modern SQL</div>
              <h3 className="text-base font-bold text-white mb-2">CTEs & Window Functions</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Integrates modular Common Table Expressions and window ranking / offset calculations (<code className="text-violet-300 font-mono">LAG, RANK</code>).
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Derived Formulas & Safe Calculations */}
        <section id="derived-columns" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Defensive Formulas: Null Safety & Division Protection
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How senior engineers prevent arithmetic errors and NULL pollution in complex views.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-cyan-400 flex items-center gap-2">
                <span>🛡️</span> Division by Zero Guard: NULLIF()
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                When computing recovery rates or fee percentages, if the total fee denominator is 0, MySQL in strict mode throws Error 1365. Wrapping the denominator with <code className="text-cyan-300 font-mono">NULLIF(denominator, 0)</code> safely returns <code className="text-slate-400 font-mono">NULL</code>.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300">
                ROUND((SUM(paid) / NULLIF(SUM(total_fee), 0)) * 100, 2) AS recovery_pct
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                <span>🛡️</span> Nullable Join Protection: COALESCE()
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                When using <code className="text-emerald-300 font-mono">LEFT JOIN fee_payments</code>, students with 0 payments produce <code className="text-rose-400 font-mono">NULL</code>. Subtracting NULL from total fees yields NULL! <code className="text-emerald-300 font-mono">COALESCE(SUM(amount), 0.00)</code> guarantees clean numeric arithmetic.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-emerald-300">
                (course_fee_inr - COALESCE(SUM(p.amount_inr), 0.00)) AS balance_due_inr
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Multi-Table Reduction & Transformation Pipeline
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              See how a complex view compresses normalized tables into a unified dimensional matrix.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-cyan-400 font-mono">Diagram A:</span> Multi-Table Join & Grouping Reduction Pipeline
            </h3>

            <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
              <svg viewBox="0 0 850 260" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                {/* Left: 4 Base Tables */}
                <g>
                  <rect x="20" y="20" width="180" height="40" rx="4" fill="#0f172a" stroke="#334155" />
                  <text x="110" y="44" fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="middle">students (id, name, city)</text>

                  <rect x="20" y="70" width="180" height="40" rx="4" fill="#0f172a" stroke="#334155" />
                  <text x="110" y="94" fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="middle">enrollments (fee, dates)</text>

                  <rect x="20" y="120" width="180" height="40" rx="4" fill="#0f172a" stroke="#334155" />
                  <text x="110" y="144" fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="middle">courses (title, stream)</text>

                  <rect x="20" y="170" width="180" height="40" rx="4" fill="#0f172a" stroke="#334155" />
                  <text x="110" y="194" fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="middle">fee_payments (amount, status)</text>
                </g>

                {/* Middle: Join & Grouping Pipeline Engine */}
                <g>
                  <rect x="260" y="30" width="270" height="170" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                  <text x="395" y="55" fill="#c7d2fe" fontSize="12" fontWeight="bold" textAnchor="middle">⚡ Complex View Pipeline</text>
                  <text x="395" y="75" fill="#a5b4fc" fontSize="9" textAnchor="middle font-mono">1. Multi-Table INNER / LEFT JOIN</text>
                  <text x="395" y="95" fill="#a5b4fc" fontSize="9" textAnchor="middle font-mono">2. GROUP BY s.student_id, c.course</text>
                  <text x="395" y="115" fill="#34d399" fontSize="9" textAnchor="middle font-mono">3. COALESCE(SUM(amount), 0.00)</text>
                  <text x="395" y="135" fill="#34d399" fontSize="9" textAnchor="middle font-mono">4. CASE clearance status</text>
                  <text x="395" y="155" fill="#34d399" fontSize="9" textAnchor="middle font-mono">5. NULLIF division guard</text>
                  <rect x="280" y="165" width="230" height="22" rx="4" fill="#020617" />
                  <text x="395" y="180" fill="#38bdf8" fontSize="8" textAnchor="middle font-bold">ALGORITHM = TEMPTABLE</text>
                </g>

                {/* Right: Clean Unified View Output */}
                <g>
                  <rect x="590" y="30" width="240" height="170" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                  <text x="710" y="55" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">📊 view_student_academic_360</text>
                  <rect x="605" y="70" width="210" height="22" rx="4" fill="#022c22" />
                  <text x="615" y="85" fill="#a7f3d0" fontSize="8 font-mono">student_name: 'Mamata Hui'</text>
                  <rect x="605" y="96" width="210" height="22" rx="4" fill="#022c22" />
                  <text x="615" y="111" fill="#a7f3d0" fontSize="8 font-mono">total_paid: ₹25,000.00</text>
                  <rect x="605" y="122" width="210" height="22" rx="4" fill="#022c22" />
                  <text x="615" y="137" fill="#a7f3d0" fontSize="8 font-mono">clearance_status: 'CLEARED'</text>
                  <rect x="605" y="148" width="210" height="22" rx="4" fill="#022c22" />
                  <text x="615" y="163" fill="#a7f3d0" fontSize="8 font-mono">avg_score_pct: 92.5%</text>
                </g>

                {/* Connecting Arrows */}
                <path d="M 200 115 L 260 115" stroke="#818cf8" strokeWidth="2" />
                <path d="M 530 115 L 590 115" stroke="#10b981" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Complex View Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Explore live multi-table dimensional schemas, grouped cohort summaries, and time-series CTE views.
            </p>
          </div>

          {/* Scenario Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Object.entries(complexScenarios).map(([key, item]) => {
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
                        item.badgeColor === "indigo" && "bg-indigo-950 text-indigo-400 border border-indigo-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active View Dimension" : "○ Inspect Schema"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{complexScenarios[selectedScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{complexScenarios[selectedScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                ALGORITHM: TEMPTABLE
              </span>
            </div>

            {/* SQL Query Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Complex View DDL Query</span>
                <span className="text-emerald-400">Declarative Dimension Model</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {complexScenarios[selectedScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4 font-mono text-cyan-400">student_id / code</th>
                    <th className="py-3 px-4 font-mono text-white">student_name / title</th>
                    <th className="py-3 px-4 font-mono text-emerald-400">stream / revenue</th>
                    <th className="py-3 px-4 font-mono text-cyan-400">campus / prev_rev</th>
                    <th className="py-3 px-4 font-mono text-indigo-400">fee / growth</th>
                    <th className="py-3 px-4 font-mono text-amber-400">derived_status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {complexScenarios[selectedScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.name}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.stream}</td>
                      <td className="py-3 px-4 text-slate-300">{row.city}</td>
                      <td className="py-3 px-4 text-indigo-300 font-bold">{row.fee}</td>
                      <td className="py-3 px-4">
                        <span
                          className={clsx(
                            "px-2 py-0.5 rounded text-[11px] font-sans font-medium border",
                            row.status === "CLEARED" || row.status === "POSITIVE"
                              ? "bg-emerald-950 text-emerald-400 border-emerald-800"
                              : row.status === "PARTIAL"
                              ? "bg-amber-950 text-amber-400 border-amber-800"
                              : "bg-cyan-950 text-cyan-400 border-cyan-800"
                          )}
                        >
                          {row.status} ({row.score})
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
              Real-world implementations of multi-table analytical views in educational management and hospital networks.
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
                  Academy Executive Dashboard Master Dimension
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore, Kolkata</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui builds an executive reporting view that aggregates student cohort enrollments (Mamata, Susmita, Abhronila, Debangshu), tracking tuition collection recovery and faculty mentor KPI benchmarks in a single query.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`CREATE OR REPLACE VIEW view_executive_academy_kpis AS
SELECT 
    b.batch_code,
    b.instructor_name,
    c.course_title,
    s.centre_city AS campus_location,
    COUNT(DISTINCT en.student_id) AS enrolled_candidate_count,
    SUM(en.course_fee_inr) AS projected_batch_revenue_inr,
    COALESCE(SUM(p.amount_inr), 0.00) AS realized_revenue_inr,
    ROUND((COALESCE(SUM(p.amount_inr), 0.00) / NULLIF(SUM(en.course_fee_inr), 0)) * 100, 2) AS realization_rate_pct
FROM batches b
JOIN courses c ON b.course_id = c.course_id
JOIN enrollments en ON b.batch_id = en.batch_id
JOIN students s ON en.student_id = s.student_id
LEFT JOIN fee_payments p ON en.enrollment_id = p.enrollment_id AND p.status = 'SUCCESS'
GROUP BY b.batch_code, b.instructor_name, c.course_title, s.centre_city;`}
              </pre>
            </div>

            {/* Case Study 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="p-1.5 rounded bg-cyan-950 text-cyan-400 font-mono text-xs border border-cyan-800">
                    CASE 02
                  </span>
                  Hospital Bed Occupancy & Insurance Billing View
                </h3>
                <span className="text-xs text-slate-400 font-mono">Healthcare Management</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Joining inpatient admissions, attending medical staff, and insurance claim approvals to monitor real-time hospital bed occupancy and pending insurance claims.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-cyan-300 border border-slate-800 overflow-x-auto">
{`CREATE OR REPLACE VIEW view_hospital_bed_occupancy_kpis AS
SELECT 
    w.ward_name,
    w.ward_type,
    COUNT(b.bed_id) AS total_capacity,
    COUNT(a.admission_id) AS occupied_beds,
    ROUND((COUNT(a.admission_id) / NULLIF(COUNT(b.bed_id), 0)) * 100, 1) AS occupancy_pct,
    COALESCE(SUM(c.claim_amount_inr), 0.00) AS pending_insurance_claims_inr
FROM hospital_wards w
JOIN hospital_beds b ON w.ward_id = b.ward_id
LEFT JOIN patient_admissions a ON b.bed_id = a.bed_id AND a.discharge_date IS NULL
LEFT JOIN insurance_claims c ON a.admission_id = c.admission_id AND c.status = 'PENDING'
GROUP BY w.ward_id, w.ward_name, w.ward_type;`}
              </pre>
            </div>
          </div>
        </section>

        {/* SECTION 6: Senior Pitfalls & Best Practices */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Senior Pitfalls, ONLY_FULL_GROUP_BY & Best Practices
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Avoid SQL mode failures and memory degradation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Error 1055: ONLY_FULL_GROUP_BY Violation
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                In MySQL 8.0+, selecting a non-aggregated column (like <code className="text-rose-300 font-mono">s.first_name</code>) without putting it in the <code className="text-rose-300 font-mono">GROUP BY</code> clause triggers Error 1055.
              </p>
              <div className="text-xs text-slate-400">
                Fix: Always list every non-aggregated SELECT column explicitly in the GROUP BY clause.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Always Guard Derived Divisions with NULLIF
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Never write raw division <code className="text-rose-300 font-mono">(a / b)</code> in a view definition. Always wrap with <code className="text-emerald-400 font-mono">NULLIF(b, 0)</code> to guarantee zero-crash execution.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees continuous uptime for BI reporting dashboards and automated query pipelines.
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
              Key takeaways for exams and technical interviews.
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
                  <span>Complex views combine joins, GROUP BY, aggregations, and CASE statements.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Grouped and aggregated views are strictly read-only (not updatable).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Always guard nullable join sums with <code className="text-cyan-300 font-mono">COALESCE()</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Always guard percentage divisions with <code className="text-cyan-300 font-mono">NULLIF(denominator, 0)</code>.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe ALGORITHM = TEMPTABLE...”</span>
                  Views with <code className="text-cyan-300 font-mono">GROUP BY</code> always materialize in RAM as temporary tables. Keep the number of columns compact to minimize memory overhead.
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about CTE modularity...”</span>
                  In MySQL 8.0+, use <code className="text-cyan-300 font-mono">WITH cte AS (...) SELECT ... FROM cte</code> inside views to break down complex multi-stage analytical queries cleanly!
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
              Comprehensive reference questions covering complex views, joins, GROUP BY, derived columns, CTEs, and window functions.
            </p>
          </div>

          <FAQTemplate
            title="Complex Views with Joins & Grouping FAQs"
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
            title="Complex Views with Joins, Grouping, and Derived Columns"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic4_note.txt"
          />

          <Teacher
            note="Complex views are the crowning glory of database abstraction. When you bundle a 5-table join with GROUP BY, CASE statements, and COALESCE logic into a single virtual relation, you transform an intimidating database schema into an intuitive, elegant API for application developers. Always remember the two defensive shields: COALESCE for null sums and NULLIF for division protection."
          />
        </section>
      </main>
    </div>
  );
};

export default Topic4;
