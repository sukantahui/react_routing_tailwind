import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

/**
 * Topic3 – Value & Offset Functions: LAG() and LEAD() for Time-Series Comparisons
 * Module: 003_002_advanced-sql-patterns
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on value offset functions, LAG/LEAD lookups, period-over-period growth, inactivity gap tracking, and fallback defaults.
 */
const Topic3 = () => {
  // Interactive Simulator State
  const [selectedOffsetScenario, setSelectedOffsetScenario] = useState("semester_grade_trajectory");

  const offsetScenarios = {
    semester_grade_trajectory: {
      title: "1. Semester Grade Trajectory (Score - LAG(Score))",
      badge: "Semester Trajectory",
      badgeColor: "emerald",
      sqlQuery: `-- Tracking individual student score trajectory across consecutive semesters:
SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    e.semester_name,
    e.exam_score_pct,
    -- Previous semester score (Returns NULL on Sem 1):
    LAG(e.exam_score_pct, 1) OVER (
        PARTITION BY s.student_id 
        ORDER BY e.semester_num ASC
    ) AS prev_semester_score,
    -- Trajectory Delta:
    ROUND(e.exam_score_pct - LAG(e.exam_score_pct, 1) OVER (
        PARTITION BY s.student_id 
        ORDER BY e.semester_num ASC
    ), 2) AS score_improvement_delta
FROM semester_exams e
JOIN students s ON e.student_id = s.student_id
ORDER BY s.student_id, e.semester_num ASC;`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", period: "Semester 1", currentVal: "90.00%", prevVal: "[Baseline]", delta: "Baseline (NULL)", status: "Inception" },
        { id: "STU-101", name: "Mamata Hui", period: "Semester 2", currentVal: "94.50%", prevVal: "90.00%", delta: "+4.50% Improvement", status: "Rising Trend" },
        { id: "STU-103", name: "Abhronila Saha", period: "Semester 1", currentVal: "92.00%", prevVal: "[Baseline]", delta: "Baseline (NULL)", status: "Inception" },
        { id: "STU-103", name: "Abhronila Saha", period: "Semester 2", currentVal: "96.20%", prevVal: "92.00%", delta: "+4.20% Improvement", status: "Rising Trend" },
      ],
      explanation:
        "`LAG(exam_score_pct, 1)` pulls the previous semester's score for the same student. Subtracting previous score from current score instantly reveals whether the student improved (+4.50%) or declined.",
    },
    mom_revenue_growth_rate: {
      title: "2. Month-over-Month (MoM) Fee Collection Growth %",
      badge: "MoM Growth Rate",
      badgeColor: "cyan",
      sqlQuery: `-- Computing Month-over-Month Revenue Growth with LAG() and Custom Fallback:
SELECT 
    payment_month,
    monthly_collection_inr,
    -- Pull prior month revenue (Default fallback to current month on Month 1 to avoid division error):
    LAG(monthly_collection_inr, 1, monthly_collection_inr) OVER (ORDER BY payment_month ASC) AS prior_month_rev,
    -- MoM Growth %:
    ROUND(
        ((monthly_collection_inr - LAG(monthly_collection_inr, 1, monthly_collection_inr) OVER (ORDER BY payment_month ASC)) 
        / LAG(monthly_collection_inr, 1, monthly_collection_inr) OVER (ORDER BY payment_month ASC)) * 100.0, 
        2
    ) AS mom_growth_percentage
FROM monthly_fee_summary
ORDER BY payment_month ASC;`,
      resultRows: [
        { id: "2026-06", name: "June 2026", period: "Month 1", currentVal: "₹45,000.00", prevVal: "₹45,000.00 (Fallback)", delta: "0.00% (Baseline)", status: "Baseline Month" },
        { id: "2026-07", name: "July 2026", period: "Month 2", currentVal: "₹65,000.00", prevVal: "₹45,000.00", delta: "+44.44% Growth", status: "High Expansion" },
        { id: "2026-08", name: "August 2026", period: "Month 3", currentVal: "₹72,000.00", prevVal: "₹65,000.00", delta: "+10.77% Growth", status: "Steady Expansion" },
      ],
      explanation:
        "The third parameter `LAG(rev, 1, rev)` provides a defensive fallback on Month 1, preventing division by NULL errors and computing exact percentage growth rates.",
    },
    inactivity_gap_tracking: {
      title: "3. Student Inactivity Gap Analysis (DATEDIFF with LAG)",
      badge: "Inactivity Gaps",
      badgeColor: "amber",
      sqlQuery: `-- Measuring days of inactivity between consecutive exam attempts:
SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    a.attempt_date,
    -- Date of previous attempt:
    LAG(a.attempt_date, 1) OVER (
        PARTITION BY s.student_id 
        ORDER BY a.attempt_date ASC
    ) AS previous_attempt_date,
    -- Inactivity Gap in Days:
    COALESCE(DATEDIFF(
        a.attempt_date, 
        LAG(a.attempt_date, 1) OVER (PARTITION BY s.student_id ORDER BY a.attempt_date ASC)
    ), 0) AS days_since_last_attempt
FROM student_quiz_attempts a
JOIN students s ON a.student_id = s.student_id
ORDER BY s.student_id, a.attempt_date ASC;`,
      resultRows: [
        { id: "STU-104", name: "Debangshu Roy", period: "Attempt #1 (Jun 01)", currentVal: "2026-06-01", prevVal: "[First Attempt]", delta: "0 Days Gap", status: "Active Start" },
        { id: "STU-104", name: "Debangshu Roy", period: "Attempt #2 (Jun 03)", currentVal: "2026-06-03", prevVal: "2026-06-01", delta: "2 Days Gap", status: "Consistent Pace" },
        { id: "STU-104", name: "Debangshu Roy", period: "Attempt #3 (Jun 25)", currentVal: "2026-06-25", prevVal: "2026-06-03", delta: "⚠️ 22 Days Inactive", status: "Retention Alert" },
      ],
      explanation:
        "`DATEDIFF(curr_date, LAG(curr_date))` measures elapsed time between actions, immediately flagging retention risks when students remain inactive for 22 days.",
    },
    three_point_context_lag_lead: {
      title: "4. 3-Point Chronological Context (LAG + Current + LEAD)",
      badge: "Previous-Current-Next",
      badgeColor: "rose",
      sqlQuery: `-- Displaying Past, Present, and Future context on the exact same row:
SELECT 
    p.payment_id,
    s.first_name AS student_name,
    p.payment_date,
    -- Past: Previous Payment Date (LAG)
    LAG(p.payment_date, 1) OVER (PARTITION BY p.student_id ORDER BY p.payment_date) AS previous_paid_date,
    -- Present: Current Payment Amount
    p.amount_paid_inr AS current_payment_amount,
    -- Future: Next Payment Date (LEAD)
    LEAD(p.payment_date, 1) OVER (PARTITION BY p.student_id ORDER BY p.payment_date) AS next_scheduled_date
FROM fee_payments p
JOIN students s ON p.student_id = s.student_id
ORDER BY p.student_id, p.payment_date;`,
      resultRows: [
        { id: "PAY-101", name: "Mamata Hui", period: "Installment #1", currentVal: "₹10,000.00", prevVal: "Past: [None]", delta: "Future: 2026-07-01", status: "3-Point Context" },
        { id: "PAY-102", name: "Mamata Hui", period: "Installment #2", currentVal: "₹15,000.00", prevVal: "Past: 2026-06-01", delta: "Future: [Completed]", status: "3-Point Context" },
      ],
      explanation:
        "Combining `LAG()` and `LEAD()` allows the application to show past payment dates, current transactions, and upcoming payment dates on a single row without joins.",
    },
  };

  const navItems = [
    { id: "offset-concept", label: "1. Value Offset Mechanics" },
    { id: "analytic-patterns", label: "2. Time-Series Patterns" },
    { id: "svg-diagrams", label: "3. LAG & LEAD Pointer SVGs" },
    { id: "interactive-sandbox", label: "4. Live Offset Workbench" },
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
            <span>Topic 3 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Time-Series Analytics
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            LAG() &amp; LEAD() for Time-Series Comparisons
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Eliminate costly self-joins. Master value offset lookups, compute period-over-period growth rates, measure consecutive event inactivity gaps, and implement defensive fallback defaults in pure SQL.
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
        <section id="offset-concept" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Value Offset Functions &amp; Lookups
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Accessing previous and subsequent rows relative to the current position within a sorted partition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span>⏮️</span> LAG(column, offset)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Pulls value from $N$ rows backward in the partition. Standard for prior-period comparisons and trajectory growth.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <span>⏭️</span> LEAD(column, offset)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Pulls value from $N$ rows forward in the partition. Standard for upcoming schedule lookahead and customer churn detection.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <span>🛡️</span> Custom Fallback Values
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Pass a 3rd argument (`LAG(col, 1, 0.00)`) to gracefully replace `NULL` on boundary edges, avoiding division errors.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Time-Series Patterns */}
        <section id="analytic-patterns" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Core Time-Series Analytics Patterns
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The fundamental business use cases for offset window calculations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="text-base font-bold text-emerald-400">1. Month-over-Month (MoM) Growth</h3>
              <p className="text-xs text-slate-300">
                Formula: <code className="text-emerald-300 font-mono">((curr_rev - LAG(curr_rev)) / LAG(curr_rev)) * 100</code>.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="text-base font-bold text-cyan-400">2. Event Inactivity Gaps</h3>
              <p className="text-xs text-slate-300">
                Formula: <code className="text-cyan-300 font-mono">DATEDIFF(curr_date, LAG(curr_date))</code>.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="text-base font-bold text-amber-400">3. Price &amp; Status Transitions</h3>
              <p className="text-xs text-slate-300">
                Formula: <code className="text-amber-300 font-mono">curr_price - LAG(curr_price)</code>.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="text-base font-bold text-rose-400">4. High-Velocity Fraud Detection</h3>
              <p className="text-xs text-slate-300">
                Formula: <code className="text-rose-300 font-mono">TIMESTAMPDIFF(SECOND, LAG(tx_time), tx_time) &lt;= 60</code>.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: LAG &amp; LEAD Offset Pointers
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing past lookups with future lookahead pointers in partition streams.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: LAG & LEAD Pointers */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> In-Memory Offset Pointer Navigation (LAG -1 vs LEAD +1)
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Past: LAG */}
                  <g>
                    <rect x="30" y="30" width="230" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="145" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">Row k-1 (Past)</text>
                    <rect x="45" y="70" width="200" height="40" rx="4" fill="#0f172a" />
                    <text x="145" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Semester 1: 90.00%</text>
                    <text x="145" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Target of LAG(score, 1)</text>
                  </g>

                  {/* Present: Current */}
                  <g>
                    <rect x="300" y="30" width="250" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="425" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Row k (Current Row)</text>
                    <rect x="315" y="70" width="220" height="40" rx="4" fill="#022c22" />
                    <text x="425" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Semester 2: 94.50%</text>
                    <text x="425" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Delta = 94.5% - 90.0% = +4.5%</text>
                  </g>

                  {/* Future: LEAD */}
                  <g>
                    <rect x="590" y="30" width="230" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="705" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">Row k+1 (Future)</text>
                    <rect x="605" y="70" width="200" height="40" rx="4" fill="#0f172a" />
                    <text x="705" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Semester 3: Scheduled</text>
                    <text x="705" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Target of LEAD(score, 1)</text>
                  </g>

                  {/* Offset Arrows */}
                  <path d="M 300 75 L 260 75" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 550 75 L 590 75" stroke="#818cf8" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            {/* SVG 2: MoM Pipeline */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400 font-mono">Diagram B:</span> Month-over-Month (MoM) Growth Calculation Flow
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* June */}
                  <g>
                    <rect x="30" y="30" width="240" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="150" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">June 2026: ₹45,000</text>
                    <rect x="45" y="70" width="210" height="40" rx="4" fill="#0f172a" />
                    <text x="150" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">LAG(rev) = ₹45,000 (Fallback)</text>
                    <text x="150" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Growth = Baseline 0.00%</text>
                  </g>

                  {/* July */}
                  <g>
                    <rect x="310" y="30" width="250" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="435" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">July 2026: ₹65,000</text>
                    <rect x="325" y="70" width="220" height="40" rx="4" fill="#022c22" />
                    <text x="435" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">LAG(rev) = ₹45,000 (June)</text>
                    <text x="435" y="102" fill="#a7f3d0" fontSize="7 font-mono" textAnchor="middle">((65k - 45k)/45k)*100 = +44.44%</text>
                  </g>

                  {/* August */}
                  <g>
                    <rect x="600" y="30" width="220" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="710" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">August 2026: ₹72,000</text>
                    <rect x="615" y="70" width="190" height="40" rx="4" fill="#0f172a" />
                    <text x="710" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">LAG(rev) = ₹65,000 (July)</text>
                    <text x="710" y="102" fill="#38bdf8" fontSize="7 font-mono" textAnchor="middle">((72k - 65k)/65k)*100 = +10.77%</text>
                  </g>

                  {/* Arrows */}
                  <path d="M 270 80 L 310 80" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 560 80 L 600 80" stroke="#10b981" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive LAG() &amp; LEAD() Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test semester improvement trajectories, MoM growth rates, inactivity gaps, and 3-point context live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(offsetScenarios).map(([key, item]) => {
              const isActive = selectedOffsetScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedOffsetScenario(key)}
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
                    {isActive ? "● Active Offset" : "○ Run Offset"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{offsetScenarios[selectedOffsetScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{offsetScenarios[selectedOffsetScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Offset Pointer Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Offset Statement</span>
                <span className="text-emerald-400">In-Memory Pointer Shift</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {offsetScenarios[selectedOffsetScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Record ID</th>
                    <th className="py-3 px-4 text-white">Student / Entity</th>
                    <th className="py-3 px-4 text-emerald-400">Period / Step</th>
                    <th className="py-3 px-4 text-cyan-400">Current Value</th>
                    <th className="py-3 px-4 text-indigo-400">LAG() Previous Value</th>
                    <th className="py-3 px-4 text-amber-400">Delta / Growth / LEAD()</th>
                    <th className="py-3 px-4 text-emerald-400">Trajectory Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {offsetScenarios[selectedOffsetScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.name}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.period}</td>
                      <td className="py-3 px-4 text-slate-300 font-bold">{row.currentVal}</td>
                      <td className="py-3 px-4 text-indigo-300">{row.prevVal}</td>
                      <td className="py-3 px-4 text-amber-300 font-sans">{row.delta}</td>
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
              Real-world trajectory tracking and fraud velocity alerts.
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
                  Eliminating Self-Joins in Student Academic Trajectory Reporting
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Academy Analytics</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui audited student performance progression reports: The legacy SQL used a quadratic self-join <code className="text-rose-300 font-mono">exams e1 JOIN exams e2 ON e1.student_id = e2.student_id AND e1.sem = e2.sem + 1</code>. Replacing the self-join with <code className="text-emerald-300 font-mono">LAG(score, 1) OVER (PARTITION BY student_id ORDER BY sem)</code> accelerated the query by 45x and eliminated lock contention on large tables!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- ✅ Single-Pass Trajectory Tracking with LAG():
SELECT student_id, sem, score, (score - LAG(score, 1) OVER (PARTITION BY student_id ORDER BY sem)) AS score_diff
FROM exams;`}
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
              Avoid division by zero and unordered offset bugs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Division by NULL/Zero in MoM Growth
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Writing <code className="text-rose-300 font-mono">(curr - LAG(curr)) / LAG(curr)</code> causes division by NULL on row 1 or division by zero if prior revenue was 0.
              </p>
              <div className="text-xs text-slate-400">
                Fix: Use fallback <code className="text-emerald-400 font-mono">LAG(curr, 1, curr)</code> or <code className="text-emerald-400 font-mono">NULLIF(LAG(curr), 0)</code>.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Always Order by Chronological Timestamp
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Always ensure the <code className="text-emerald-400 font-mono">ORDER BY</code> clause inside <code className="text-emerald-400 font-mono">OVER()</code> orders by the exact chronological event timestamp to guarantee deterministic sequence alignment.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees accurate historical delta calculations.
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
              Key takeaways for LAG and LEAD functions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Value Offset Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Use <code className="text-cyan-300 font-mono">LAG()</code> to access prior rows and <code className="text-cyan-300 font-mono">LEAD()</code> for next rows.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Supply a 3rd fallback parameter (<code className="text-cyan-300 font-mono">LAG(col, 1, default)</code>) to handle boundaries.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Combine with <code className="text-cyan-300 font-mono">DATEDIFF()</code> to track inactivity gaps between events.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Always partition by entity ID (<code className="text-cyan-300 font-mono">PARTITION BY student_id</code>) to prevent bleed-through.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe YoY comparisons with offset 4...”</span>
                  In quarterly financial reports, you can calculate Year-over-Year growth simply by using <code className="text-cyan-300 font-mono">LAG(revenue, 4)</code> (looking back 4 quarters = 1 year)!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about Gaps &amp; Islands problems...”</span>
                  `LAG()` is the fundamental building block for detecting consecutive date streaks and session groupings in transaction logs!
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
              Comprehensive reference questions covering LAG, LEAD, time-series growth, inactivity gap tracking, and custom fallback values.
            </p>
          </div>

          <FAQTemplate
            title="LAG &amp; LEAD Functions FAQs"
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
            title="Value & Offset Functions: LAG() and LEAD() for Time-Series Comparisons"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic3_note.txt"
          />

          <Teacher
            note="LAG() and LEAD() eliminate the need for clumsy, expensive self-joins when analyzing chronological event data. Whether you are tracking a student's semester-over-semester score improvement, measuring inactivity gaps between exam attempts, or computing Month-over-Month revenue growth, these functions execute as fast in-memory pointer shifts. Always remember to provide a defensive fallback value to handle partition boundary rows cleanly."
          />
        </section>
      </main>
    </div>
  );
};

export default Topic3;
