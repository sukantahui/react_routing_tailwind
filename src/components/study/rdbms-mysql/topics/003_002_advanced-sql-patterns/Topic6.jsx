import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

/**
 * Topic6 – Calculating Running Totals and Cumulative Sums
 * Module: 003_002_advanced-sql-patterns
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on running totals, student fee ledgers, Year-to-Date (YTD) resets, and Pareto 80/20 cumulative revenue analysis.
 */
const Topic6 = () => {
  // Interactive Simulator State
  const [selectedRunningScenario, setSelectedRunningScenario] = useState("student_ledger_balance");

  const runningScenarios = {
    student_ledger_balance: {
      title: "1. Student Fee Ledger Balance (Paid vs Outstanding Balance)",
      badge: "Ledger Accounting",
      badgeColor: "emerald",
      sqlQuery: `-- Computing real-time student ledger balances from immutable payment records:
SELECT 
    p.payment_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    p.payment_date,
    p.amount_paid_inr,
    -- 1. Cumulative Paid Amount:
    SUM(p.amount_paid_inr) OVER (
        PARTITION BY p.student_id 
        ORDER BY p.payment_date, p.payment_id 
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS total_paid_so_far,
    -- 2. Outstanding Balance remaining against ₹25,000 course fee:
    (25000.00 - SUM(p.amount_paid_inr) OVER (
        PARTITION BY p.student_id 
        ORDER BY p.payment_date, p.payment_id 
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    )) AS remaining_outstanding_balance
FROM fee_payments p
JOIN students s ON p.student_id = s.student_id
ORDER BY s.student_id, p.payment_date;`,
      resultRows: [
        { id: "PAY-101", name: "Mamata Hui", date: "2026-06-01", amount: "₹10,000.00", runningPaid: "₹10,000.00", balance: "₹15,000.00 Outstanding", status: "Installment #1" },
        { id: "PAY-102", name: "Mamata Hui", date: "2026-07-01", amount: "₹15,000.00", runningPaid: "₹25,000.00", balance: "₹0.00 (Fully Settled! 🎉)", status: "Settled" },
        { id: "PAY-103", name: "Susmita Sen", date: "2026-06-05", amount: "₹12,000.00", runningPaid: "₹12,000.00", balance: "₹13,000.00 Outstanding", status: "Installment #1" },
        { id: "PAY-104", name: "Susmita Sen", date: "2026-07-05", amount: "₹8,000.00", runningPaid: "₹20,000.00", balance: "₹5,000.00 Outstanding", status: "Installment #2" },
      ],
      explanation:
        "The cumulative running total `SUM(amount) OVER (PARTITION BY student_id ...)` dynamically tracks total money paid, subtracting from the total fee to calculate real-time ledger balances without storing mutable balance state!",
    },
    academy_global_revenue: {
      title: "2. Academy-Wide Cumulative Lifetime Revenue Progression",
      badge: "Global Revenue",
      badgeColor: "cyan",
      sqlQuery: `-- Tracking academy-wide revenue accumulation over time:
SELECT 
    p.payment_id,
    s.first_name AS student_name,
    p.payment_date,
    p.amount_paid_inr,
    -- Global Cumulative Lifetime Sum:
    SUM(p.amount_paid_inr) OVER (
        ORDER BY p.payment_date, p.payment_id 
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS academy_lifetime_revenue_inr
FROM fee_payments p
JOIN students s ON p.student_id = s.student_id
ORDER BY p.payment_date ASC;`,
      resultRows: [
        { id: "PAY-01", name: "Mamata Hui", date: "2026-06-01", amount: "₹25,000.00", runningPaid: "₹25,000.00", balance: "Milestone: Inception", status: "Step 1" },
        { id: "PAY-02", name: "Susmita Sen", date: "2026-06-05", amount: "₹18,000.00", runningPaid: "₹43,000.00", balance: "Accumulating", status: "Step 2" },
        { id: "PAY-03", name: "Abhronila Saha", date: "2026-06-10", amount: "₹22,000.00", runningPaid: "₹65,000.00", balance: "Milestone: ₹50k Crossed!", status: "Step 3" },
        { id: "PAY-04", name: "Debangshu Roy", date: "2026-06-15", amount: "₹20,000.00", runningPaid: "₹85,000.00", balance: "Approaching ₹1 Lakh", status: "Step 4" },
      ],
      explanation:
        "Omission of `PARTITION BY` calculates a continuous global running total across all students and branches, enabling milestone threshold monitoring.",
    },
    ytd_annual_reset: {
      title: "3. Year-to-Date (YTD) Revenue Accumulation (Resets Annually)",
      badge: "YTD Reset",
      badgeColor: "amber",
      sqlQuery: `-- Year-to-Date (YTD) revenue accumulation that resets on Jan 01:
SELECT 
    payment_date,
    amount_paid_inr,
    YEAR(payment_date) AS fiscal_year,
    -- Resets automatically when calendar year transitions:
    SUM(amount_paid_inr) OVER (
        PARTITION BY YEAR(payment_date) 
        ORDER BY payment_date, payment_id 
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS ytd_cumulative_revenue
FROM fee_payments
ORDER BY payment_date ASC;`,
      resultRows: [
        { id: "PAY-80", name: "December Batch", date: "2025-12-28", amount: "₹50,000.00", runningPaid: "₹1,85,000.00", balance: "2025 YTD Final", status: "2025 Close" },
        { id: "PAY-81", name: "New Year Batch", date: "2026-01-02", amount: "₹30,000.00", runningPaid: "₹30,000.00 (RESET!)", balance: "2026 YTD Inception", status: "2026 Reset 🎉" },
        { id: "PAY-82", name: "January Batch", date: "2026-01-15", amount: "₹45,000.00", runningPaid: "₹75,000.00", balance: "2026 YTD Accumulating", status: "2026 Growth" },
      ],
      explanation:
        "`PARTITION BY YEAR(payment_date)` resets the accumulator at the start of each new fiscal year, providing clean Year-to-Date metrics without writing procedural loops.",
    },
    pareto_80_20_cumulative: {
      title: "4. Pareto 80/20 Cumulative Revenue Contribution",
      badge: "Pareto 80/20",
      badgeColor: "rose",
      sqlQuery: `-- Identifying top revenue-generating courses using Pareto 80/20 cumulative %:
WITH CourseTotals AS (
    SELECT 
        c.course_name,
        SUM(e.amount_paid_inr) AS course_total_rev
    FROM enrollments e
    JOIN courses c ON e.course_id = c.course_id
    GROUP BY c.course_name
)
SELECT 
    course_name,
    course_total_rev,
    -- Cumulative % of Total Revenue:
    ROUND(
        (SUM(course_total_rev) OVER (ORDER BY course_total_rev DESC) 
        / SUM(course_total_rev) OVER ()) * 100.0, 
        2
    ) AS cumulative_rev_percentage,
    CASE 
        WHEN (SUM(course_total_rev) OVER (ORDER BY course_total_rev DESC) / SUM(course_total_rev) OVER ()) * 100.0 <= 80.00 
        THEN '🌟 Core Driver (Top 80%)'
        ELSE '🟢 Long Tail (Remaining 20%)'
    END AS pareto_classification
FROM CourseTotals
ORDER BY course_total_rev DESC;`,
      resultRows: [
        { id: "CRS-01", name: "MySQL Master Architect", date: "₹1,20,000.00", amount: "48.00%", runningPaid: "48.00% (Core)", balance: "🌟 Core Driver (Top 80%)", status: "Pareto 80" },
        { id: "CRS-02", name: "Fullstack React & Node", date: "₹80,000.00", amount: "32.00%", runningPaid: "80.00% (Threshold!)", balance: "🌟 Core Driver (Top 80%)", status: "Pareto 80" },
        { id: "CRS-03", name: "Basic Web Design", date: "₹50,000.00", amount: "20.00%", runningPaid: "100.00% (Complete)", balance: "🟢 Long Tail (Remaining 20%)", status: "Long Tail" },
      ],
      explanation:
        "By dividing the running sum of course revenue by the grand total sum `SUM() OVER ()`, Pareto analysis reveals that the top 2 courses generate exactly 80.00% of academy revenue!",
    },
  };

  const navItems = [
    { id: "running-concept", label: "1. Running Totals Mechanics" },
    { id: "ledger-accounting", label: "2. Event-Sourced Ledgers" },
    { id: "svg-diagrams", label: "3. Ledger Pipeline & Pareto SVGs" },
    { id: "interactive-sandbox", label: "4. Live Running Workbench" },
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
            <span>Topic 6 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Cumulative Analytics
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Calculating Running Totals &amp; Cumulative Sums
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Build enterprise financial ledgers, dynamic outstanding fee balances, Year-to-Date (YTD) accumulators, and Pareto 80/20 revenue contribution curves in high-speed pure SQL.
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
        <section id="running-concept" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Anatomy of Cumulative Sums
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Progressively accumulating values from partition inception to the current row.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span>💰</span> Dynamic Balance Ledgers
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Compute student fee balances on-the-fly from immutable payment streams, eliminating dangerous mutable balance columns.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <span>🔄</span> YTD Resetting Totals
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Using `PARTITION BY YEAR(date)` automatically resets cumulative accumulation at each fiscal year boundary.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <span>📈</span> Pareto 80/20 Analysis
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Divide running sum by grand total sum (`SUM() OVER ()`) to pinpoint the vital 20% of products driving 80% of revenue.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Ledger Accounting */}
        <section id="ledger-accounting" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Event-Sourced Accounting vs Mutable State
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why senior database architects compute running balances dynamically in read queries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-rose-400">❌ Anti-Pattern: Mutable `current_balance` Column</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Updating a mutable `balance` column on every transaction causes concurrency race conditions, deadlocks, and silent reconciliation discrepancies when adjustments or refunds occur.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400">✅ Modern Pattern: Dynamic Running Balance</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Store transactions in an append-only immutable ledger. Compute current balances dynamically with <code className="text-emerald-300 font-mono">SUM(paid) OVER (PARTITION BY student_id ORDER BY date)</code> in sub-millisecond linear time!
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Ledger Accumulation &amp; Pareto Curve
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing step-by-step balance resolution with Pareto 80/20 cumulative percentages.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Ledger Pipeline */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Student Fee Ledger Balance Accumulation Pipeline
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Total Fee Header */}
                  <rect x="30" y="20" width="790" height="25" rx="4" fill="#0f172a" stroke="#334155" />
                  <text x="425" y="37" fill="#38bdf8" fontSize="9 font-mono" textAnchor="middle">Course Total Fee: ₹25,000.00 (Fixed Target)</text>

                  {/* Installment 1 */}
                  <g>
                    <rect x="30" y="55" width="370" height="85" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="215" y="75" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">Payment 1: June 01 (₹10,000)</text>
                    <rect x="45" y="85" width="340" height="45" rx="4" fill="#0f172a" />
                    <text x="215" y="103" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Running Paid: ₹10,000.00</text>
                    <text x="215" y="120" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">Remaining Balance: ₹15,000.00 Outstanding</text>
                  </g>

                  {/* Installment 2 */}
                  <g>
                    <rect x="440" y="55" width="380" height="85" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="630" y="75" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Payment 2: July 01 (+₹15,000)</text>
                    <rect x="455" y="85" width="350" height="45" rx="4" fill="#022c22" />
                    <text x="630" y="103" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Running Paid: ₹25,000.00 (100% Paid)</text>
                    <text x="630" y="120" fill="#34d399" fontSize="8 font-bold font-mono" textAnchor="middle">Remaining Balance: ₹0.00 (Fully Settled! 🎉)</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* SVG 2: Pareto Curve */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-amber-400 font-mono">Diagram B:</span> Pareto 80/20 Cumulative Revenue Threshold
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Course 1 */}
                  <g>
                    <rect x="30" y="30" width="240" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="150" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">1. MySQL Master (₹1.2L)</text>
                    <rect x="45" y="70" width="210" height="40" rx="4" fill="#022c22" />
                    <text x="150" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Individual Share: 48.0%</text>
                    <text x="150" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Cumulative: 48.0%</text>
                  </g>

                  {/* Course 2 */}
                  <g>
                    <rect x="300" y="30" width="250" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="425" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">2. React Fullstack (₹80k)</text>
                    <rect x="315" y="70" width="220" height="40" rx="4" fill="#022c22" />
                    <text x="425" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Individual Share: 32.0%</text>
                    <text x="425" y="102" fill="#fcd34d" fontSize="7 font-bold" textAnchor="middle">Cumulative: 80.0% (PARETO CUTOFF!)</text>
                  </g>

                  {/* Course 3 */}
                  <g>
                    <rect x="580" y="30" width="240" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="700" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">3. Web Design (₹50k)</text>
                    <rect x="595" y="70" width="210" height="40" rx="4" fill="#0f172a" />
                    <text x="700" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Individual Share: 20.0%</text>
                    <text x="700" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Cumulative: 100.0% (Long Tail)</text>
                  </g>

                  {/* Connectors */}
                  <path d="M 270 80 L 300 80" stroke="#10b981" strokeWidth="2" />
                  <path d="M 550 80 L 580 80" stroke="#818cf8" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Running Totals Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test student fee balance ledgers, lifetime revenue accumulation, YTD annual resets, and Pareto 80/20 contribution live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(runningScenarios).map(([key, item]) => {
              const isActive = selectedRunningScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedRunningScenario(key)}
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
                    {isActive ? "● Active Calculation" : "○ Run Cumulative Total"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{runningScenarios[selectedRunningScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{runningScenarios[selectedRunningScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Cumulative Sum Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Running Total Query</span>
                <span className="text-emerald-400">Deterministic ROWS Frame</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {runningScenarios[selectedRunningScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Record ID</th>
                    <th className="py-3 px-4 text-white">Student / Course</th>
                    <th className="py-3 px-4 text-emerald-400">Date / Metric</th>
                    <th className="py-3 px-4 text-cyan-400">Transaction Amount</th>
                    <th className="py-3 px-4 text-indigo-400">Cumulative Running Sum</th>
                    <th className="py-3 px-4 text-amber-400">Balance / Contribution</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {runningScenarios[selectedRunningScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.name}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.date}</td>
                      <td className="py-3 px-4 text-slate-300 font-bold">{row.amount}</td>
                      <td className="py-3 px-4 text-indigo-300 font-bold">{row.runningPaid}</td>
                      <td className="py-3 px-4 text-amber-300 font-sans">{row.balance}</td>
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
              Real-world financial ledgers and Pareto 80/20 optimization.
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
                  Eliminating Mutable Balance Columns in Student ERP Accounting
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Academy Ledgers</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui refactored the student tuition ledger: The legacy schema stored a mutable <code className="text-rose-300 font-mono">students.current_balance</code> column updated by application code. Concurrent payment webhooks caused frequent balance corruption. Replacing the mutable column with a dynamic window function running total over immutable <code className="text-emerald-300 font-mono">fee_payments</code> eliminated all race conditions and achieved 100% mathematical audit perfection!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- ✅ Dynamically computing outstanding student balances from immutable payments:
SELECT student_id, payment_date, amount_paid_inr,
       (25000.00 - SUM(amount_paid_inr) OVER (
           PARTITION BY student_id 
           ORDER BY payment_date, payment_id 
           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
       )) AS dynamic_outstanding_balance
FROM fee_payments;`}
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
              Avoid tied date lump sums and unpartitioned student bleeds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Forgetting `PARTITION BY student_id`
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Omitting <code className="text-rose-300 font-mono">PARTITION BY student_id</code> causes payments from all students to bleed together into a single academy-wide sum, corrupting individual balances.
              </p>
              <div className="text-xs text-slate-400">
                Fix: Always partition by entity ID when calculating entity-specific ledgers!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Always Add PK Tie-Breaker
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Always specify <code className="text-emerald-400 font-mono">ORDER BY payment_date, payment_id</code> to guarantee 100% deterministic accumulation even when multiple transactions share the exact timestamp.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees reproducible audit trails.
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
              Key takeaways for running totals and cumulative sums.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Running Total Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Explicitly write <code className="text-cyan-300 font-mono">ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Use <code className="text-cyan-300 font-mono">PARTITION BY student_id</code> to isolate entity ledgers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Use <code className="text-cyan-300 font-mono">PARTITION BY YEAR(date)</code> for Year-to-Date (YTD) resets.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Divide running sum by <code className="text-cyan-300 font-mono">SUM() OVER ()</code> for Pareto 80/20 analysis.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe constant memory execution...”</span>
                  Running totals execute with $O(1)$ constant scalar memory accumulation during partition scans, making them blazingly fast even on million-row tables!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about covering index design...”</span>
                  A composite index on `(student_id, payment_date, amount_paid_inr)` satisfies the running total directly from index memory with 0 filesort!
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
              Comprehensive reference questions covering running totals, cumulative sums, student fee ledgers, YTD resets, and Pareto 80/20 analysis.
            </p>
          </div>

          <FAQTemplate
            title="Running Totals &amp; Cumulative Sums FAQs"
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
            title="Calculating Running Totals and Cumulative Sums"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic6_note.txt"
          />

          <Teacher
            note="Running totals are the bedrock of financial ledger engineering. By calculating cumulative balances dynamically using SUM() OVER (PARTITION BY student_id ORDER BY payment_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW), you eliminate mutable balance columns and prevent concurrency race conditions completely. Always remember to add secondary primary key tie-breakers in ORDER BY to ensure deterministic audit trails."
          />
        </section>
      </main>
    </div>
  );
};

export default Topic6;
