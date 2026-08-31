import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";

/**
 * Topic9 – Writing Multiple and Chained Non-Recursive CTEs for Clean Modular SQL
 * Module: 003_001_subqueries-and-cte
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on multi-stage chained CTE pipelines, forward reference rules, multi-child synthesis, and MoM growth analytics.
 */
const Topic9 = () => {
  // Interactive Simulator State
  const [selectedPipelineScenario, setSelectedPipelineScenario] = useState("three_stage_academic_pipeline");

  const pipelineScenarios = {
    three_stage_academic_pipeline: {
      title: "1. 3-Stage Academic Analytics Pipeline (Cleanse → Aggregate → Score)",
      badge: "3-Stage Pipeline",
      badgeColor: "emerald",
      sqlQuery: `-- Stage 1: Ingest & Filter active student records:
WITH ActiveStudents AS (
    SELECT student_id, first_name, last_name, dept_id, exam_score_pct 
    FROM students 
    WHERE status = 'ACTIVE'
),
-- Stage 2: Calculate Department Averages (Consumes ActiveStudents):
DeptBenchmarks AS (
    SELECT 
        dept_id, 
        ROUND(AVG(exam_score_pct), 2) AS dept_avg_score
    FROM ActiveStudents
    GROUP BY dept_id
),
-- Stage 3: Synthesize Variances (Joins Stage 1 and Stage 2):
EnrichedScoring AS (
    SELECT 
        a.student_id,
        CONCAT(a.first_name, ' ', a.last_name) AS student_name,
        a.dept_id,
        a.exam_score_pct,
        b.dept_avg_score,
        (a.exam_score_pct - b.dept_avg_score) AS variance_from_dept
    FROM ActiveStudents a
    JOIN DeptBenchmarks b ON a.dept_id = b.dept_id
)
-- Final Presentation: Filter Honors tier:
SELECT * 
FROM EnrichedScoring 
WHERE variance_from_dept > 0
ORDER BY variance_from_dept DESC;`,
      resultRows: [
        { id: "STU-103", name: "Abhronila Saha", stage: "Stage 3 Enriched", metric1: "Score: 96.20%", metric2: "IT Avg: 89.30%", result: "+6.90% Above Dept", status: "Dept Honors" },
        { id: "STU-101", name: "Mamata Hui", stage: "Stage 3 Enriched", metric1: "Score: 94.50%", metric2: "CS Avg: 91.25%", result: "+3.25% Above Dept", status: "Dept Honors" },
      ],
      explanation:
        "`ActiveStudents` feeds `DeptBenchmarks`, which are then joined together in `EnrichedScoring` before final presentation, illustrating a complete linear ETL pipeline.",
    },
    multi_child_synthesis: {
      title: "2. Multi-Child Synthesis (Preventing Cartesian Row Explosion)",
      badge: "Multi-Child Synthesis",
      badgeColor: "cyan",
      sqlQuery: `-- Pre-aggregating independent child tables in parallel CTEs:
WITH EnrollmentMetrics AS (
    SELECT student_id, COUNT(*) AS active_courses
    FROM enrollments 
    WHERE status = 'ACTIVE'
    GROUP BY student_id
),
PaymentMetrics AS (
    SELECT student_id, SUM(amount_paid_inr) AS total_fees_paid
    FROM fee_payments
    GROUP BY student_id
)
-- Join parent table to both pre-aggregated 1:1 summary sets:
SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    COALESCE(em.active_courses, 0) AS total_courses,
    COALESCE(pm.total_fees_paid, 0.00) AS total_paid_inr
FROM students s
LEFT JOIN EnrollmentMetrics em ON s.student_id = em.student_id
LEFT JOIN PaymentMetrics pm ON s.student_id = pm.student_id
ORDER BY total_paid_inr DESC;`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", stage: "Multi-Child Join", metric1: "3 Courses Active", metric2: "₹25,000.00 Paid", result: "1:1 Clean Join", status: "Active Paid" },
        { id: "STU-103", name: "Abhronila Saha", stage: "Multi-Child Join", metric1: "2 Courses Active", metric2: "₹22,000.00 Paid", result: "1:1 Clean Join", status: "Active Paid" },
        { id: "STU-102", name: "Susmita Sen", stage: "Multi-Child Join", metric1: "2 Courses Active", metric2: "₹18,000.00 Paid", result: "1:1 Clean Join", status: "Active Paid" },
      ],
      explanation:
        "Pre-aggregating `enrollments` and `fee_payments` in independent CTEs ensures that joining them with `students` produces exact 1:1 relationships without Cartesian row explosion.",
    },
    mom_revenue_growth_pipeline: {
      title: "3. Month-over-Month (MoM) Revenue Growth Pipeline",
      badge: "MoM Growth Pipeline",
      badgeColor: "amber",
      sqlQuery: `-- Stage 1: Aggregate monthly fee collection:
WITH MonthlyCollections AS (
    SELECT 
        DATE_FORMAT(payment_date, '%Y-%m') AS payment_month,
        SUM(amount_paid_inr) AS monthly_revenue_inr
    FROM fee_payments
    GROUP BY DATE_FORMAT(payment_date, '%Y-%m')
),
-- Stage 2: Pull previous month's revenue with LAG():
LaggedCollections AS (
    SELECT 
        payment_month,
        monthly_revenue_inr,
        LAG(monthly_revenue_inr, 1) OVER (ORDER BY payment_month) AS prev_month_revenue
    FROM MonthlyCollections
)
-- Stage 3: Calculate MoM Growth Percentage:
SELECT 
    payment_month,
    monthly_revenue_inr,
    COALESCE(prev_month_revenue, 0.00) AS prev_month_revenue,
    ROUND(((monthly_revenue_inr - prev_month_revenue) / prev_month_revenue) * 100.0, 2) AS mom_growth_pct
FROM LaggedCollections
ORDER BY payment_month ASC;`,
      resultRows: [
        { id: "2026-06", name: "June 2026", stage: "Stage 3 MoM", metric1: "₹45,000.00", metric2: "Prev: Baseline", result: "Baseline Month", status: "Inception" },
        { id: "2026-07", name: "July 2026", stage: "Stage 3 MoM", metric1: "₹65,000.00", metric2: "Prev: ₹45,000.00", result: "+44.44% Growth", status: "High Growth" },
      ],
      explanation:
        "A 3-stage financial CTE pipeline: `MonthlyCollections` extracts revenue, `LaggedCollections` attaches previous month metrics with `LAG()`, and the final query computes percentage growth.",
    },
    rfm_customer_segmentation: {
      title: "4. Student RFM Value Segmentation Pipeline",
      badge: "RFM Analytics",
      badgeColor: "rose",
      sqlQuery: `-- Stage 1: Calculate Recency, Frequency, Monetary raw metrics:
WITH RawRFM AS (
    SELECT 
        e.student_id,
        DATEDIFF(CURRENT_DATE, MAX(p.payment_date)) AS recency_days,
        COUNT(p.payment_id) AS payment_frequency,
        SUM(p.amount_paid_inr) AS total_monetary_inr
    FROM enrollments e
    JOIN fee_payments p ON e.enrollment_id = p.enrollment_id
    GROUP BY e.student_id
),
-- Stage 2: Segment into Quartiles with NTILE():
ScoredRFM AS (
    SELECT 
        student_id,
        NTILE(4) OVER (ORDER BY recency_days ASC) AS r_score,
        NTILE(4) OVER (ORDER BY payment_frequency DESC) AS f_score,
        NTILE(4) OVER (ORDER BY total_monetary_inr DESC) AS m_score
    FROM RawRFM
)
-- Final Presentation: Combine RFM Segment:
SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    CONCAT(rfm.r_score, rfm.f_score, rfm.m_score) AS rfm_segment,
    'Top Tier Champion' AS student_tier
FROM ScoredRFM rfm
JOIN students s ON rfm.student_id = s.student_id
WHERE rfm.r_score >= 3 AND rfm.m_score >= 3;`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", stage: "RFM Scored", metric1: "R: 4, F: 4, M: 4", metric2: "Segment: 444", result: "Top Champion", status: "VIP Student" },
        { id: "STU-103", name: "Abhronila Saha", stage: "RFM Scored", metric1: "R: 4, F: 3, M: 4", metric2: "Segment: 434", result: "High Value", status: "VIP Student" },
      ],
      explanation:
        "Chains raw metric aggregation with statistical quartile ranking (`NTILE`) to produce enterprise-grade RFM segmentation in a single atomic SQL statement.",
    },
  };

  const navItems = [
    { id: "chained-concept", label: "1. Chained CTE Architecture" },
    { id: "forward-ref-rule", label: "2. Forward Reference Rule" },
    { id: "svg-diagrams", label: "3. Pipeline & Scoping Rule SVGs" },
    { id: "interactive-sandbox", label: "4. Live Chained CTE Workbench" },
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
            <span>Topic 9 of 14</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Multi-Stage SQL Pipelines
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Multiple & Chained Non-Recursive CTEs
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Construct production-grade ETL pipelines directly in declarative SQL. Master comma-separated <code className="text-cyan-300 font-mono">WITH</code> declarations, enforce forward reference dependency rules, and eliminate Cartesian explosion across multi-child joins.
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
        {/* SECTION 1: Concepts */}
        <section id="chained-concept" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Chained CTE Architecture & Pipeline Stages
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Executing multi-stage transformations where each CTE block builds upon the outputs of preceding blocks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span>1. Ingest & Cleanse</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Filters invalid rows, trims whitespaces, and standardizes raw date formats.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <span>2. Entity Aggregation</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Computes department, branch, or customer level sums, averages, and extreme metrics.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <span>3. Feature Ranking</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Calculates period-over-period lags, percentage growths, and quartile ranks with Window Functions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <span>4. Executive Report</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Applies threshold filters, joins lookup labels, and formats the final presentation output.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Forward Reference Rule */}
        <section id="forward-ref-rule" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. The Forward Reference Rule & Syntax Laws
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The fundamental scoping constraints that govern chained CTE execution.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold font-mono">Law 1:</span>
                <span>The <code className="text-emerald-300 font-mono">WITH</code> keyword is written ONCE. Subsequent CTEs are separated with commas (<code className="text-emerald-300 font-mono">,</code>).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold font-mono">Law 2:</span>
                <span>A CTE can reference ANY CTE defined before it in the list (<code className="text-cyan-300 font-mono">CTE_2</code> can query <code className="text-cyan-300 font-mono">CTE_1</code>).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold font-mono">Law 3:</span>
                <span>A CTE CANNOT reference a CTE defined after it (No backward references; causes <code className="text-rose-300 font-mono">Error 1146: Table doesn't exist</code>).</span>
              </li>
            </ul>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Multi-Stage Chaining & Forward Reference Law
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How data cascades forward through chained CTE stages.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Multi-Stage Pipeline */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Chained CTE Multi-Stage Data Pipeline
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Stage 1 */}
                  <g>
                    <rect x="20" y="30" width="180" height="90" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="110" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">Stage 1: Extract</text>
                    <rect x="30" y="70" width="160" height="25" rx="3" fill="#0f172a" />
                    <text x="110" y="86" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">ActiveStudents</text>
                  </g>

                  {/* Stage 2 */}
                  <g>
                    <rect x="230" y="30" width="180" height="90" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="320" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Stage 2: Aggregate</text>
                    <rect x="240" y="70" width="160" height="25" rx="3" fill="#022c22" />
                    <text x="320" y="86" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">DeptBenchmarks</text>
                  </g>

                  {/* Stage 3 */}
                  <g>
                    <rect x="440" y="30" width="180" height="90" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="530" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">Stage 3: Enrich</text>
                    <rect x="450" y="70" width="160" height="25" rx="3" fill="#0f172a" />
                    <text x="530" y="86" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">EnrichedScoring</text>
                  </g>

                  {/* Stage 4 */}
                  <g>
                    <rect x="650" y="30" width="180" height="90" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="740" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Final Presentation</text>
                    <rect x="660" y="70" width="160" height="25" rx="3" fill="#022c22" />
                    <text x="740" y="86" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Honors Ranking</text>
                  </g>

                  {/* Connecting Arrows */}
                  <path d="M 200 75 L 230 75" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 410 75 L 440 75" stroke="#10b981" strokeWidth="1.5" />
                  <path d="M 620 75 L 650 75" stroke="#818cf8" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            {/* SVG 2: Forward Reference Law */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-rose-400 font-mono">Diagram B:</span> The Forward Reference Law & Error 1146
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Legal Forward Call */}
                  <g>
                    <rect x="30" y="30" width="370" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="215" y="55" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">✅ Legal: Forward Reference (CTE_2 → CTE_1)</text>
                    <rect x="45" y="70" width="340" height="40" rx="4" fill="#022c22" />
                    <text x="215" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">WITH CTE_1 AS (...), CTE_2 AS (SELECT * FROM CTE_1)</text>
                    <text x="215" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Topologically Ordered • Resolved Correctly</text>
                  </g>

                  {/* Illegal Backward Call */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="630" y="55" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">💥 Illegal: Backward Reference (CTE_1 → CTE_2)</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#1e293b" />
                    <text x="630" y="88" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">WITH CTE_1 AS (SELECT * FROM CTE_2), CTE_2 AS (...)</text>
                    <text x="630" y="102" fill="#fca5a5" fontSize="7 font-bold" textAnchor="middle">💥 Error 1146: Table 'CTE_2' doesn't exist yet!</text>
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
              4. Interactive Chained CTE Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test 3-stage academic scoring, multi-child Cartesian prevention, MoM revenue growth, and RFM segmentation pipelines live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(pipelineScenarios).map(([key, item]) => {
              const isActive = selectedPipelineScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedPipelineScenario(key)}
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
                    {isActive ? "● Active Pipeline" : "○ Run Pipeline"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{pipelineScenarios[selectedPipelineScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{pipelineScenarios[selectedPipelineScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Chained Pipeline Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Chained CTE Pipeline</span>
                <span className="text-emerald-400">Multi-Stage Transformation</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {pipelineScenarios[selectedPipelineScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Record Key</th>
                    <th className="py-3 px-4 text-white">Student / Month</th>
                    <th className="py-3 px-4 text-emerald-400">Pipeline Stage</th>
                    <th className="py-3 px-4 text-cyan-400">Metric 1</th>
                    <th className="py-3 px-4 text-indigo-400">Metric 2</th>
                    <th className="py-3 px-4 text-amber-400">Calculated Variance / Segment</th>
                    <th className="py-3 px-4 text-emerald-400">Outcome</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {pipelineScenarios[selectedPipelineScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.name}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.stage}</td>
                      <td className="py-3 px-4 text-slate-300 font-bold">{row.metric1}</td>
                      <td className="py-3 px-4 text-indigo-300">{row.metric2}</td>
                      <td className="py-3 px-4 text-amber-300 font-sans">{row.result}</td>
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
              Real-world chained CTE data pipelines in education and enterprise finance.
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
                  Eliminating Cartesian Row Multiplications in Multi-Child Student Reports
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Academy Analytics</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui audited a student billing report that produced inflated fee totals. Joining <code className="text-rose-300 font-mono">students</code> directly to both <code className="text-rose-300 font-mono">enrollments</code> (3 rows) and <code className="text-rose-300 font-mono">fee_payments</code> (4 rows) produced $3 \times 4 = 12$ rows per student, multiplying paid totals by 3x! Isolating both child sets into independent chained CTEs produced exact 1:1 joins with zero inflation!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Chained Independent Pre-Aggregations eliminate Cartesian row explosion:
WITH CourseCount AS (
    SELECT student_id, COUNT(*) AS courses FROM enrollments GROUP BY student_id
),
FeeTotal AS (
    SELECT student_id, SUM(amount_paid_inr) AS paid FROM fee_payments GROUP BY student_id
)
SELECT s.student_name, c.courses, f.paid
FROM students s
LEFT JOIN CourseCount c ON s.student_id = c.student_id
LEFT JOIN FeeTotal f ON s.student_id = f.student_id;`}
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
              Avoid syntax repetition and backward referencing bugs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Repeating the WITH Keyword
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Writing <code className="text-rose-300 font-mono">WITH Step1 AS (...) WITH Step2 AS (...)</code> throws a syntax error.
              </p>
              <div className="text-xs text-slate-400">
                Fix: Write <code className="text-emerald-400 font-mono">WITH</code> once and separate blocks with commas.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Topological Forward Declaration
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Always arrange your CTEs in top-to-bottom dependency order: base extractions first, aggregations second, synthesis third.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees forward reference compliance and clean code review.
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
              Key takeaways for writing multiple and chained CTEs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Chained CTE Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Separate multiple CTE declarations with commas under a single <code className="text-cyan-300 font-mono">WITH</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Adhere to the Forward Reference Rule (downstream consumes upstream).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Pre-aggregate independent child tables in separate CTEs to prevent Cartesian explosions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Assign descriptive, domain-specific names to every pipeline stage.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe MoM Growth Pipelines...”</span>
                  Chained CTEs are the cleanest way to compute period-over-period growth: Monthly totals in Step 1, LAG shift in Step 2, and Growth % in the main query!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about temporary memory sizing...”</span>
                  If your chained CTE processes millions of rows with GROUP BY, ensure `tmp_table_size` is sized adequately to prevent disk spilling!
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
              Comprehensive reference questions covering multiple CTEs, chained dependencies, forward reference rules, and multi-stage ETL pipelines.
            </p>
          </div>

          <FAQTemplate
            title="Multiple & Chained CTEs FAQs"
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
            title="Writing Multiple and Chained Non-Recursive CTEs for Clean Modular SQL"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic9_note.txt"
          />

          <Teacher
            note="Chained CTEs allow you to write complete ETL pipelines inside a single declarative SQL query. When building complex multi-table reports, always remember to pre-aggregate child tables in separate CTE stages before joining them to the parent. This simple habit will save you from Cartesian row explosions and inflated financial sums!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic9;
