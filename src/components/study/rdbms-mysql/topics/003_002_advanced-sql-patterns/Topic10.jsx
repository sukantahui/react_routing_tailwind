import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic10_files/topic10_questions";
import noteText from "./topic10_files/topic10_note.txt?raw";

/**
 * Topic10 – Calculating Period-over-Period Growth (Month-over-Month, Year-over-Year)
 * Module: 003_002_advanced-sql-patterns
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on period-over-period financial growth, Month-over-Month (MoM), Year-over-Year (YoY), 3-stage CTE pipelines, and defensive division by zero handling.
 */
const Topic10 = () => {
  // Interactive Simulator State
  const [selectedPopScenario, setSelectedPopScenario] = useState("mom_monthly_fee_growth");

  const popScenarios = {
    mom_monthly_fee_growth: {
      title: "1. Month-over-Month (MoM) Fee Collection Growth %",
      badge: "MoM Growth Pipeline",
      badgeColor: "emerald",
      sqlQuery: `-- 3-Stage Modular CTE Pipeline for Month-over-Month Growth:
WITH MonthlySummary AS (
    SELECT 
        DATE_FORMAT(payment_date, '%Y-%m-01') AS period_month,
        SUM(amount_paid_inr) AS monthly_revenue_inr
    FROM fee_payments
    GROUP BY DATE_FORMAT(payment_date, '%Y-%m-01')
),
OffsetProjection AS (
    SELECT 
        period_month,
        monthly_revenue_inr,
        -- Pull prior month revenue (offset = 1):
        LAG(monthly_revenue_inr, 1) OVER (ORDER BY period_month ASC) AS prior_month_revenue_inr
    FROM MonthlySummary
)
SELECT 
    period_month,
    monthly_revenue_inr,
    COALESCE(CONCAT('₹', FORMAT(prior_month_revenue_inr, 2)), '[Baseline Month]') AS prior_month_rev,
    -- MoM Growth %:
    ROUND(
        ((monthly_revenue_inr - prior_month_revenue_inr) 
        / NULLIF(prior_month_revenue_inr, 0)) * 100.0, 
        2
    ) AS mom_growth_percentage,
    CASE 
        WHEN prior_month_revenue_inr IS NULL THEN '⭐ Baseline Month'
        WHEN monthly_revenue_inr &ge; prior_month_revenue_inr THEN '📈 Expansion'
        ELSE '📉 Contraction'
    END AS financial_trend
FROM OffsetProjection
ORDER BY period_month ASC;`,
      resultRows: [
        { id: "2026-06", period: "June 2026", rev: "₹45,000.00", priorRev: "[Baseline Month]", growth: "0.00% (Baseline)", trend: "⭐ Baseline Month", status: "Inception" },
        { id: "2026-07", period: "July 2026", rev: "₹65,000.00", priorRev: "₹45,000.00", growth: "+44.44% Growth", trend: "📈 High Expansion", status: "Accelerating" },
        { id: "2026-08", period: "August 2026", rev: "₹72,000.00", priorRev: "₹65,000.00", growth: "+10.77% Growth", trend: "📈 Steady Expansion", status: "Steady" },
        { id: "2026-09", period: "September 2026", rev: "₹58,000.00", priorRev: "₹72,000.00", growth: "-19.44% Decline", trend: "📉 Contraction", status: "Dip Alert" },
      ],
      explanation:
        "The 3-stage CTE computes clean MoM growth rates. In July, revenue expanded by +44.44% over June; in September, seasonal slowdown resulted in a -19.44% contraction.",
    },
    yoy_quarterly_expansion: {
      title: "2. Year-over-Year (YoY) Quarterly Revenue Growth (Offset = 4)",
      badge: "YoY Quarterly (Offset 4)",
      badgeColor: "cyan",
      sqlQuery: `-- Comparing Quarterly Revenue against the Same Quarter 1 Year Ago (Offset = 4):
WITH QuarterlySummary AS (
    SELECT 
        fiscal_year,
        fiscal_quarter,
        SUM(amount_paid_inr) AS quarterly_rev_inr
    FROM fee_payments
    GROUP BY fiscal_year, fiscal_quarter
),
YoYProjection AS (
    SELECT 
        fiscal_year,
        fiscal_quarter,
        quarterly_rev_inr,
        -- Look back exactly 4 quarters (1 full year):
        LAG(quarterly_rev_inr, 4) OVER (
            ORDER BY fiscal_year, fiscal_quarter
        ) AS same_quarter_prior_year_rev
    FROM QuarterlySummary
)
SELECT 
    CONCAT('FY', fiscal_year, ' Q', fiscal_quarter) AS fiscal_term,
    quarterly_rev_inr,
    COALESCE(CONCAT('₹', FORMAT(same_quarter_prior_year_rev, 2)), '[No Prior Year]') AS prior_year_rev,
    ROUND(
        ((quarterly_rev_inr - same_quarter_prior_year_rev) 
        / NULLIF(same_quarter_prior_year_rev, 0)) * 100.0, 
        2
    ) AS yoy_growth_percentage
FROM YoYProjection
ORDER BY fiscal_year, fiscal_quarter;`,
      resultRows: [
        { id: "2025-Q1", period: "FY2025 Q1", rev: "₹1,20,000.00", priorRev: "[No Prior Year]", growth: "Baseline", trend: "⭐ Inception", status: "FY2025 Base" },
        { id: "2026-Q1", period: "FY2026 Q1", rev: "₹1,65,000.00", priorRev: "₹1,20,000.00", growth: "+37.50% YoY", trend: "📈 Strong Annual Expansion", status: "FY2026 Growth" },
      ],
      explanation:
        "`LAG(quarterly_rev, 4)` looks back exactly 4 quarters, comparing FY2026 Q1 against FY2025 Q1 to compute a healthy +37.50% annual expansion while neutralizing seasonal quarterly swings.",
    },
    defensive_zero_handling: {
      title: "3. Defensive Zero/NULL Division Handling (NULLIF + COALESCE)",
      badge: "Zero Division Defense",
      badgeColor: "amber",
      sqlQuery: `-- Preventing Division by Zero crashes when prior revenue is 0:
SELECT 
    period_month,
    monthly_rev,
    prior_rev,
    -- Defensive Formula using NULLIF(prior_rev, 0):
    COALESCE(
        ROUND(((monthly_rev - prior_rev) / NULLIF(prior_rev, 0)) * 100.0, 2), 
        0.00
    ) AS safe_growth_percentage,
    CASE 
        WHEN prior_rev = 0 AND monthly_rev &gt; 0 THEN '🚀 Zero-to-Revenue Launch'
        WHEN prior_rev = 0 AND monthly_rev = 0 THEN '💤 Inactive Period'
        ELSE '🟢 Standard Calculation'
    END AS calculation_safety_status
FROM monthly_staged_data;`,
      resultRows: [
        { id: "M-01", period: "Launch Month", rev: "₹0.00", priorRev: "₹0.00 (Zero Base)", growth: "0.00% (Protected)", trend: "💤 Inactive Period", status: "Safe Zero" },
        { id: "M-02", period: "First Batch", rev: "₹35,000.00", priorRev: "₹0.00 (Zero Prior)", growth: "0.00% (NULL Handled)", trend: "🚀 Zero-to-Revenue Launch", status: "Zero-to-Rev" },
        { id: "M-03", period: "Second Batch", rev: "₹50,000.00", priorRev: "₹35,000.00", growth: "+42.86%", trend: "🟢 Standard Calculation", status: "Normal Math" },
      ],
      explanation:
        "Without `NULLIF(prior_rev, 0)`, dividing ₹35,000 by ₹0 crashes the query with a fatal Error 1365. `NULLIF` converts 0 into NULL, allowing `COALESCE` to output 0.00% gracefully.",
    },
    branch_segmented_growth: {
      title: "4. Multi-Branch Segmented MoM Growth (PARTITION BY branch)",
      badge: "Segmented Growth",
      badgeColor: "rose",
      sqlQuery: `-- Computing independent MoM growth per branch city:
WITH BranchMonthly AS (
    SELECT 
        branch_city,
        DATE_FORMAT(payment_date, '%Y-%m-01') AS period_month,
        SUM(amount_paid_inr) AS branch_rev
    FROM fee_payments
    GROUP BY branch_city, DATE_FORMAT(payment_date, '%Y-%m-01')
)
SELECT 
    branch_city,
    period_month,
    branch_rev,
    LAG(branch_rev, 1) OVER (
        PARTITION BY branch_city 
        ORDER BY period_month
    ) AS prior_month_rev,
    ROUND(
        ((branch_rev - LAG(branch_rev, 1) OVER (PARTITION BY branch_city ORDER BY period_month)) 
        / NULLIF(LAG(branch_rev, 1) OVER (PARTITION BY branch_city ORDER BY period_month), 0)) * 100.0, 
        2
    ) AS branch_mom_growth_pct
FROM BranchMonthly
ORDER BY branch_city, period_month;`,
      resultRows: [
        { id: "BKP-01", period: "Barrackpore • Jun", rev: "₹30,000.00", priorRev: "[Baseline]", growth: "0.00%", trend: "⭐ Baseline", status: "BKP Base" },
        { id: "BKP-02", period: "Barrackpore • Jul", rev: "₹45,000.00", priorRev: "₹30,000.00", growth: "+50.00% MoM", trend: "📈 High Growth", status: "BKP Lead" },
        { id: "KOL-01", period: "Kolkata • Jun", rev: "₹15,000.00", priorRev: "[Baseline]", growth: "0.00%", trend: "⭐ Baseline", status: "KOL Base" },
        { id: "KOL-02", period: "Kolkata • Jul", rev: "₹20,000.00", priorRev: "₹15,000.00", growth: "+33.33% MoM", trend: "📈 Steady Growth", status: "KOL Expansion" },
      ],
      explanation:
        "`PARTITION BY branch_city` isolates monthly offset calculations per location, comparing Barrackpore July against Barrackpore June independently from Kolkata.",
    },
  };

  const navItems = [
    { id: "pop-concept", label: "1. PoP Analytics Framework" },
    { id: "cte-pipeline", label: "2. 3-Stage CTE Pipeline" },
    { id: "svg-diagrams", label: "3. Pipeline & Offset SVGs" },
    { id: "interactive-sandbox", label: "4. Live PoP Workbench" },
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
            <span>Topic 10 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Financial Velocity
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Period-over-Period (MoM &amp; YoY) Growth
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Measure business acceleration and seasonal trajectory. Master Month-over-Month (MoM), Year-over-Year (YoY), modular 3-stage CTE pipelines, and defensive division by zero math in pure relational SQL.
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
        <section id="pop-concept" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Period-over-Period Analytics Framework
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing current financial velocity against immediate and seasonal historical baselines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span>📅</span> Month-over-Month (MoM)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Uses `LAG(rev, 1)` to compare Month $t$ against Month $t-1$. Measures immediate short-term velocity.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <span>🗓️</span> Year-over-Year (YoY)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Uses `LAG(rev, 12)` (months) or `LAG(rev, 4)` (quarters). Neutralizes seasonal swings by comparing same periods.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <span>🛡️</span> Zero Division Defense
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Always wrap denominators in `NULLIF(prior_rev, 0)` to prevent fatal Error 1365 crashes on zero-revenue months.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: 3-Stage CTE Pipeline */}
        <section id="cte-pipeline" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. The 3-Stage Modular CTE Growth Pipeline
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The professional architecture for computing growth metrics in enterprise SQL.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-cyan-400">Stage 1: Grouping</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Aggregate raw immutable transactions into monthly sums using `GROUP BY DATE_FORMAT(date, '%Y-%m-01')`.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-emerald-400">Stage 2: Window Offsets</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Project prior month `LAG(rev, 1)` and prior year `LAG(rev, 12)` side-by-side on the grouped dataset.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-amber-400">Stage 3: Deltas &amp; Math</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Compute percentage growth using `((curr - prior) / NULLIF(prior, 0)) * 100` and format friendly strings.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: 3-Stage Pipeline &amp; Offset Pointers
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing multi-stage pipeline flow with short-term MoM and seasonal YoY lookback pointers.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: 3-Stage Pipeline */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> The 3-Stage Modular CTE Growth Pipeline
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Stage 1 */}
                  <g>
                    <rect x="30" y="30" width="230" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="145" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">Stage 1: MonthlyAgg (GROUP BY)</text>
                    <rect x="45" y="70" width="200" height="40" rx="4" fill="#0f172a" />
                    <text x="145" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">SUM(amount) GROUP BY Month</text>
                    <text x="145" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Clean Monthly Buckets</text>
                  </g>

                  {/* Stage 2 */}
                  <g>
                    <rect x="300" y="30" width="250" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="425" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Stage 2: OffsetProjection (LAG)</text>
                    <rect x="315" y="70" width="220" height="40" rx="4" fill="#022c22" />
                    <text x="425" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">LAG(rev, 1) &amp; LAG(rev, 12)</text>
                    <text x="425" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Attach Prior Periods</text>
                  </g>

                  {/* Stage 3 */}
                  <g>
                    <rect x="590" y="30" width="230" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="705" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">Stage 3: Main Calculation</text>
                    <rect x="605" y="70" width="200" height="40" rx="4" fill="#0f172a" />
                    <text x="705" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">((curr-prior)/NULLIF(prior,0))*100</text>
                    <text x="705" y="102" fill="#38bdf8" fontSize="7 font-mono" textAnchor="middle">MoM % &amp; YoY % Deltas</text>
                  </g>

                  {/* Arrows */}
                  <path d="M 260 80 L 300 80" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 550 80 L 590 80" stroke="#10b981" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* SVG 2: Lookback Pointers */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-amber-400 font-mono">Diagram B:</span> Short-Term MoM (Offset 1) vs Seasonal YoY (Offset 12 / 4)
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Prior Month */}
                  <g>
                    <rect x="30" y="30" width="230" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="145" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">June 2026 (Month t-1)</text>
                    <rect x="45" y="70" width="200" height="40" rx="4" fill="#0f172a" />
                    <text x="145" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Revenue: ₹45,000</text>
                    <text x="145" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Target of LAG(rev, 1)</text>
                  </g>

                  {/* Current Month */}
                  <g>
                    <rect x="300" y="30" width="250" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="425" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">July 2026 (Current Month t)</text>
                    <rect x="315" y="70" width="220" height="40" rx="4" fill="#022c22" />
                    <text x="425" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Revenue: ₹65,000</text>
                    <text x="425" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">MoM Growth = +44.44%</text>
                  </g>

                  {/* Prior Year */}
                  <g>
                    <rect x="590" y="30" width="230" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="705" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">July 2025 (Month t-12)</text>
                    <rect x="605" y="70" width="200" height="40" rx="4" fill="#0f172a" />
                    <text x="705" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Revenue: ₹40,000</text>
                    <text x="705" y="102" fill="#fcd34d" fontSize="7 font-bold" textAnchor="middle">YoY Growth = +62.50%</text>
                  </g>

                  {/* Offset Lines */}
                  <path d="M 300 75 L 260 75" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 550 75 L 590 75" stroke="#f59e0b" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Period-over-Period Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test Month-over-Month growth, Year-over-Year quarterly expansion, defensive zero-division handling, and segmented branch analytics live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(popScenarios).map(([key, item]) => {
              const isActive = selectedPopScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedPopScenario(key)}
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
                    {isActive ? "● Active Calculation" : "○ Run Growth Model"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{popScenarios[selectedPopScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{popScenarios[selectedPopScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                PoP Growth Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Growth Pipeline</span>
                <span className="text-emerald-400">3-Stage Modular CTE</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {popScenarios[selectedPopScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Period Key</th>
                    <th className="py-3 px-4 text-white">Fiscal Period</th>
                    <th className="py-3 px-4 text-emerald-400">Current Revenue</th>
                    <th className="py-3 px-4 text-indigo-400">Prior Period Revenue</th>
                    <th className="py-3 px-4 text-amber-400">Calculated Growth %</th>
                    <th className="py-3 px-4 text-cyan-400">Trend Status</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {popScenarios[selectedPopScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.period}</td>
                      <td className="py-3 px-4 text-emerald-300 font-bold">{row.rev}</td>
                      <td className="py-3 px-4 text-indigo-300">{row.priorRev}</td>
                      <td className="py-3 px-4 text-amber-300 font-bold">{row.growth}</td>
                      <td className="py-3 px-4 text-slate-300 font-sans">{row.trend}</td>
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
              Real-world fee growth auditing and division by zero protection.
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
                  Auditing Monthly Academy Fee Growth Velocity in Barrackpore
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Academy Analytics</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui developed the executive financial growth dashboard: Structuring the SQL query into a 3-stage CTE pipeline with defensive <code className="text-cyan-300 font-mono">NULLIF(prior_rev, 0)</code> math allowed administrators to track exact MoM growth percentages across 3 campus branches without application-level math or data inconsistencies.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- ✅ High-Reliability MoM Growth CTE:
WITH MonthlySummary AS (
    SELECT DATE_FORMAT(payment_date, '%Y-%m-01') AS m, SUM(amount_paid_inr) AS rev
    FROM fee_payments GROUP BY DATE_FORMAT(payment_date, '%Y-%m-01')
),
Offsets AS (
    SELECT m, rev, LAG(rev, 1) OVER (ORDER BY m) AS prior_rev FROM MonthlySummary
)
SELECT m, rev, ROUND(((rev - prior_rev)/NULLIF(prior_rev, 0))*100.0, 2) AS mom_pct
FROM Offsets;`}
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
              Avoid division by zero crashes and multi-year month collisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Unprotected Division by Zero
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Writing <code className="text-rose-300 font-mono">(curr - prior) / prior</code> crashes with Error 1365 if prior revenue is 0.
              </p>
              <div className="text-xs text-slate-400">
                Fix: Always write <code className="text-emerald-400 font-mono">NULLIF(prior, 0)</code>!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Group by `DATE_FORMAT('%Y-%m-01')`
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Never group by <code className="text-rose-300 font-mono">MONTH(date)</code> alone; always include year (<code className="text-emerald-400 font-mono">DATE_FORMAT('%Y-%m-01')</code>) to prevent collisions between January 2025 and January 2026.
              </p>
              <div className="text-xs text-slate-400">
                Maintains multi-year chronological uniqueness.
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
              Key takeaways for period-over-period growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> PoP Growth Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Use <code className="text-cyan-300 font-mono">LAG(rev, 1)</code> for Month-over-Month (MoM) growth.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Use <code className="text-cyan-300 font-mono">LAG(rev, 12)</code> or <code className="text-cyan-300 font-mono">LAG(rev, 4)</code> for Year-over-Year (YoY).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Always use <code className="text-cyan-300 font-mono">NULLIF(prior_rev, 0)</code> to prevent division crashes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Partition by branch city (<code className="text-cyan-300 font-mono">PARTITION BY branch_city</code>) for localized growth.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe calendar gap filling...”</span>
                  If certain months have 0 sales, join against a recursive CTE date grid before calculating LAG to prevent skipping months!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about multi-metric projections...”</span>
                  You can project both absolute difference (₹) and percentage difference (%) on the same row for executive reporting!
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
              Comprehensive reference questions covering Month-over-Month (MoM), Year-over-Year (YoY), 3-stage CTE pipelines, and defensive division by zero handling.
            </p>
          </div>

          <FAQTemplate
            title="Period-over-Period Growth FAQs"
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
            title="Calculating Period-over-Period Growth (Month-over-Month, Year-over-Year)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic10_note.txt"
          />

          <Teacher
            note="Period-over-Period growth analytics is the primary KPI requested by executive leadership. Always structure your SQL queries using the 3-stage modular CTE pipeline: Stage 1 groups transactions by month/quarter, Stage 2 projects window offsets with LAG(), and Stage 3 computes percentage deltas. Always use NULLIF(prior_rev, 0) to defend against division by zero errors!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic10;
