import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

/**
 * Topic5 – Window Frame Specification: ROWS BETWEEN and RANGE BETWEEN
 * Module: 003_002_advanced-sql-patterns
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on window frame specifications, ROWS physical offsets, RANGE logical intervals, centered smoothing windows, date range intervals, and tied peer clumping resolution.
 */
const Topic5 = () => {
  // Interactive Simulator State
  const [selectedFrameScenario, setSelectedFrameScenario] = useState("rows_vs_range_tied_dates");

  const frameScenarios = {
    rows_vs_range_tied_dates: {
      title: "1. Physical ROWS vs Logical RANGE on Tied Dates",
      badge: "Tied Dates Clumping",
      badgeColor: "emerald",
      sqlQuery: `-- Comparing ROWS vs RANGE on duplicate payment timestamps (Mamata & Susmita paid on 2026-06-01):
SELECT 
    p.payment_id,
    s.first_name AS student_name,
    p.payment_date,
    p.amount_paid_inr,
    -- 1. ROWS: Strict Physical Row Progression (Step-by-Step):
    SUM(p.amount_paid_inr) OVER (
        ORDER BY p.payment_date 
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS rows_running_total,
    -- 2. RANGE: Logical Value Clumping (Sums tied peers together into a lump sum!):
    SUM(p.amount_paid_inr) OVER (
        ORDER BY p.payment_date 
        RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS range_clumped_running_total
FROM fee_payments p
JOIN students s ON p.student_id = s.student_id
ORDER BY p.payment_date, p.payment_id;`,
      resultRows: [
        { id: "PAY-101", name: "Mamata Hui", date: "2026-06-01 (TIE)", amount: "₹25,000.00", rowsTotal: "₹25,000.00 (Step 1)", rangeTotal: "⚠️ ₹43,000.00 (Lump Sum)", status: "ROWS Step" },
        { id: "PAY-102", name: "Susmita Sen", date: "2026-06-01 (TIE)", amount: "₹18,000.00", rowsTotal: "₹43,000.00 (Step 2)", rangeTotal: "⚠️ ₹43,000.00 (Lump Sum)", status: "RANGE Clumped" },
        { id: "PAY-103", name: "Abhronila Saha", date: "2026-06-10", amount: "₹22,000.00", rowsTotal: "₹65,000.00 (Step 3)", rangeTotal: "₹65,000.00", status: "Full Accumulated" },
      ],
      explanation:
        "On 2026-06-01, Mamata (₹25k) and Susmita (₹18k) tie. `ROWS` increments step-by-step (₹25k → ₹43k). `RANGE` treats them as peers and assigns the combined lump sum of ₹43k to both rows!",
    },
    trailing_3row_moving_avg: {
      title: "2. Trailing 3-Row Moving Average (ROWS 2 PRECEDING)",
      badge: "3-Row Trailing Avg",
      badgeColor: "cyan",
      sqlQuery: `-- Computing a 3-row moving average (current row and previous 2 rows):
SELECT 
    exam_id,
    student_name,
    exam_date,
    exam_score_pct,
    -- 3-Row Moving Average Window:
    ROUND(AVG(exam_score_pct) OVER (
        ORDER BY exam_date ASC 
        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
    ), 2) AS trailing_3row_avg_score
FROM exam_submissions
ORDER BY exam_date ASC;`,
      resultRows: [
        { id: "EXM-01", name: "Mamata Hui", date: "2026-06-01", amount: "90.00%", rowsTotal: "Frame: 1 Row", rangeTotal: "90.00%", status: "Initial Row" },
        { id: "EXM-02", name: "Susmita Sen", date: "2026-06-05", amount: "88.00%", rowsTotal: "Frame: 2 Rows (90+88)/2", rangeTotal: "89.00%", status: "2-Row Avg" },
        { id: "EXM-03", name: "Abhronila Saha", date: "2026-06-10", amount: "96.20%", rowsTotal: "Frame: 3 Rows (90+88+96.2)/3", rangeTotal: "91.40%", status: "Full 3-Row Avg" },
        { id: "EXM-04", name: "Debangshu Roy", date: "2026-06-15", amount: "82.40%", rowsTotal: "Frame: 3 Rows (88+96.2+82.4)/3", rangeTotal: "88.87%", status: "Sliding Window" },
      ],
      explanation:
        "`ROWS BETWEEN 2 PRECEDING AND CURRENT ROW` encapsulates exactly 3 physical rows, dynamically sliding forward across exam submissions.",
    },
    centered_3row_smoothing: {
      title: "3. Centered 3-Row Smoothing Window (1 PRECEDING & 1 FOLLOWING)",
      badge: "Centered Window",
      badgeColor: "amber",
      sqlQuery: `-- Symmetric centered moving average for smoothing noisy score fluctuations:
SELECT 
    semester_num,
    exam_score_pct,
    -- Centered Window: 1 previous row + current row + 1 next row:
    ROUND(AVG(exam_score_pct) OVER (
        ORDER BY semester_num ASC 
        ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING
    ), 2) AS centered_smoothed_score
FROM semester_records
ORDER BY semester_num ASC;`,
      resultRows: [
        { id: "SEM-1", name: "Semester 1", date: "Baseline", amount: "90.00%", rowsTotal: "Frame: Sem 1 + Sem 2", rangeTotal: "92.25%", status: "Edge (2 rows)" },
        { id: "SEM-2", name: "Semester 2", date: "Midterm", amount: "94.50%", rowsTotal: "Frame: Sem 1 + 2 + 3", rangeTotal: "90.83%", status: "Centered (3 rows)" },
        { id: "SEM-3", name: "Semester 3", date: "Finals", amount: "88.00%", rowsTotal: "Frame: Sem 2 + 3 + 4", rangeTotal: "92.90%", status: "Centered (3 rows)" },
        { id: "SEM-4", name: "Semester 4", date: "Capstone", amount: "96.20%", rowsTotal: "Frame: Sem 3 + Sem 4", rangeTotal: "92.10%", status: "Edge (2 rows)" },
      ],
      explanation:
        "`ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING` computes a centered symmetric average (1 before, current, 1 after) to smooth out short-term fluctuations.",
    },
    calendar_7day_rolling_range: {
      title: "4. True Calendar 7-Day Rolling Revenue Window (RANGE INTERVAL)",
      badge: "Calendar 7-Day RANGE",
      badgeColor: "rose",
      sqlQuery: `-- Calculating rolling 7-day revenue in MySQL 8.0 with calendar intervals:
SELECT 
    payment_date,
    amount_paid_inr,
    -- Rolling 7-Calendar-Day Sum (Respects date gaps!):
    SUM(amount_paid_inr) OVER (
        ORDER BY payment_date ASC 
        RANGE BETWEEN INTERVAL 7 DAY PRECEDING AND CURRENT ROW
    ) AS rolling_7day_revenue_inr
FROM daily_fee_collections
ORDER BY payment_date ASC;`,
      resultRows: [
        { id: "DAY-01", name: "June 01", date: "2026-06-01", amount: "₹25,000.00", rowsTotal: "Window: May 25 - Jun 01", rangeTotal: "₹25,000.00", status: "Active Window" },
        { id: "DAY-02", name: "June 05", date: "2026-06-05", amount: "₹18,000.00", rowsTotal: "Window: May 29 - Jun 05 (Includes Jun 01)", rangeTotal: "₹43,000.00", status: "Active Window" },
        { id: "DAY-03", name: "June 25", date: "2026-06-25 (Gap!)", amount: "₹22,000.00", rowsTotal: "Window: Jun 18 - Jun 25 (Excludes Jun 05!)", rangeTotal: "₹22,000.00", status: "Gap Handled!" },
      ],
      explanation:
        "`RANGE BETWEEN INTERVAL 7 DAY PRECEDING AND CURRENT ROW` uses true calendar time. On June 25, the June 05 transaction is automatically excluded because it falls outside the 7-day interval!",
    },
  };

  const navItems = [
    { id: "frame-concept", label: "1. Window Frame Mechanics" },
    { id: "rows-vs-range", label: "2. ROWS vs RANGE Comparison" },
    { id: "svg-diagrams", label: "3. Frame Boundary & Sliding SVGs" },
    { id: "interactive-sandbox", label: "4. Live Frame Workbench" },
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
            <span>Topic 5 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Frame Engineering
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Window Frame Specification: ROWS &amp; RANGE
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master sliding, centered, and expanding window frames. Understand the crucial differences between physical <code className="text-cyan-300 font-mono">ROWS</code> offsets and logical <code className="text-cyan-300 font-mono">RANGE</code> intervals, resolve tied peer clumping, and build calendar rolling windows.
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
        <section id="frame-concept" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Anatomy of Window Frame Specifications
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Defining sliding calculation boundaries relative to the current row.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span>1. ROWS (Physical Offsets)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Operates on exact physical row counts ($1, 2, 3$). Treats every row independently regardless of tied values.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <span>2. RANGE (Logical Intervals)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Operates on value intervals. Treats duplicate `ORDER BY` values as peers, grouping tied rows together.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <span>3. Date Intervals</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Supports `RANGE BETWEEN INTERVAL N DAY PRECEDING` for true calendar time-series smoothing.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: ROWS vs RANGE Comparison */}
        <section id="rows-vs-range" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. ROWS vs RANGE Behavior on Tied Values
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why default RANGE causes lump-sum clumping on tied timestamps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400">✅ ROWS: Deterministic Row-by-Row Stepping</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                <code className="text-emerald-300 font-mono">ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</code> processes each row individually. Even if 10 students pay on the exact same date, the running total advances progressively row by row!
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-rose-400">⚠️ RANGE: Peer Lump-Sum Clumping</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                <code className="text-rose-300 font-mono">RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</code> groups all tied timestamps into a single peer set, projecting the total accumulated lump sum across all tied rows simultaneously.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: ROWS vs RANGE &amp; Centered Frames
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing physical row counts with logical value peer grouping and centered windows.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: ROWS vs RANGE */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Physical ROWS (Individual Steps) vs RANGE (Tied Clumping)
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* ROWS */}
                  <g>
                    <rect x="30" y="30" width="370" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="215" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">✅ ROWS Framing (Step-by-Step Accumulation)</text>
                    <rect x="45" y="70" width="340" height="40" rx="4" fill="#022c22" />
                    <text x="215" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Row 1: ₹25,000 → Row 2: ₹43,000</text>
                    <text x="215" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Evaluates Each Physical Row Independently</text>
                  </g>

                  {/* RANGE */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="630" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">⚠️ RANGE Framing (Tied Peer Lump Sum)</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#1e293b" />
                    <text x="630" y="88" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">Row 1: ₹43,000 | Row 2: ₹43,000 (Tied!)</text>
                    <text x="630" y="102" fill="#fca5a5" fontSize="7 font-bold" textAnchor="middle">Both Rows Receive Combined Peer Total</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* SVG 2: Centered Window */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-amber-400 font-mono">Diagram B:</span> Centered 3-Row Smoothing Window (1 PRECEDING &amp; 1 FOLLOWING)
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* 1 PRECEDING */}
                  <g>
                    <rect x="30" y="30" width="230" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="145" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">1 PRECEDING (Row k-1)</text>
                    <rect x="45" y="70" width="200" height="40" rx="4" fill="#0f172a" />
                    <text x="145" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Semester 1: 90.00%</text>
                    <text x="145" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Preceding Member</text>
                  </g>

                  {/* CURRENT ROW */}
                  <g>
                    <rect x="300" y="30" width="250" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="425" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">CURRENT ROW (Row k)</text>
                    <rect x="315" y="70" width="220" height="40" rx="4" fill="#022c22" />
                    <text x="425" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Semester 2: 94.50%</text>
                    <text x="425" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Target of Averaging</text>
                  </g>

                  {/* 1 FOLLOWING */}
                  <g>
                    <rect x="590" y="30" width="230" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="705" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">1 FOLLOWING (Row k+1)</text>
                    <rect x="605" y="70" width="200" height="40" rx="4" fill="#0f172a" />
                    <text x="705" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Semester 3: 88.00%</text>
                    <text x="705" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Succeeding Member</text>
                  </g>

                  {/* Span Bracket */}
                  <path d="M 145 140 L 705 140" stroke="#f59e0b" strokeWidth="2" />
                  <text x="425" y="155" fill="#fcd34d" fontSize="8 font-bold font-mono" textAnchor="middle">Centered 3-Row Frame Average = (90 + 94.5 + 88)/3 = 90.83%</text>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Window Frame Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test physical ROWS stepping, logical RANGE clumping, trailing moving averages, and calendar INTERVAL windows live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(frameScenarios).map(([key, item]) => {
              const isActive = selectedFrameScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedFrameScenario(key)}
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
                    {isActive ? "● Active Frame" : "○ Run Frame Spec"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{frameScenarios[selectedFrameScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{frameScenarios[selectedFrameScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Frame Execution Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Frame Query</span>
                <span className="text-emerald-400">Sliding Boundary Definition</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {frameScenarios[selectedFrameScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Record ID</th>
                    <th className="py-3 px-4 text-white">Student / Event</th>
                    <th className="py-3 px-4 text-emerald-400">Timestamp / Period</th>
                    <th className="py-3 px-4 text-cyan-400">Current Amount / Score</th>
                    <th className="py-3 px-4 text-indigo-400">Physical ROWS Total</th>
                    <th className="py-3 px-4 text-amber-400">Logical RANGE / Avg Total</th>
                    <th className="py-3 px-4 text-emerald-400">Frame Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {frameScenarios[selectedFrameScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.name}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.date}</td>
                      <td className="py-3 px-4 text-slate-300 font-bold">{row.amount}</td>
                      <td className="py-3 px-4 text-indigo-300">{row.rowsTotal}</td>
                      <td className="py-3 px-4 text-amber-300 font-bold">{row.rangeTotal}</td>
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
              Real-world running total fixes and calendar date smoothing.
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
                  Eliminating Tied Timestamp Clumping in Daily Fee Collection Ledgers
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Academy Ledgers</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui audited accounting ledgers: When multiple students paid tuition fees on the same date, the default <code className="text-rose-300 font-mono">SUM() OVER (ORDER BY payment_date)</code> query assigned the exact same lump sum total to all students on that date, confusing the auditing software! Explicitly writing <code className="text-emerald-300 font-mono">ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</code> forced strict line-by-line financial accumulation.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- ✅ Line-by-Line Deterministic Ledger Running Total:
SELECT payment_id, payment_date, amount_paid_inr,
       SUM(amount_paid_inr) OVER (
           ORDER BY payment_date, payment_id 
           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
       ) AS line_by_line_running_balance
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
              Avoid tied timestamp clumping and calendar gap holes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Assuming ROWS Handles Calendar Gaps
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Writing <code className="text-rose-300 font-mono">ROWS BETWEEN 6 PRECEDING AND CURRENT ROW</code> grabs the previous 6 records, which could span 6 months if data is sparse!
              </p>
              <div className="text-xs text-slate-400">
                Fix: Use <code className="text-emerald-400 font-mono">RANGE BETWEEN INTERVAL 6 DAY PRECEDING</code> for true calendar smoothing.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Explicit ROWS for CPU Performance
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Always explicitly specify <code className="text-emerald-400 font-mono">ROWS BETWEEN ...</code> instead of default RANGE for running sums to prevent peer value comparison overhead in the engine.
              </p>
              <div className="text-xs text-slate-400">
                Significantly reduces CPU cycles on high-volume partition scans.
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
              Key takeaways for window frame specifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Window Frame Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Use <code className="text-cyan-300 font-mono">ROWS</code> for physical row counts and step-by-step running totals.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Use <code className="text-cyan-300 font-mono">RANGE BETWEEN INTERVAL N DAY</code> for true calendar time-series smoothing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Use <code className="text-cyan-300 font-mono">ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING</code> for centered 3-row smoothing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Remember that ranking functions do NOT support frame clauses.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe the running total default...”</span>
                  Without an explicit frame, `ORDER BY` defaults to `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`. Always write `ROWS` explicitly to guarantee row-level step accumulation!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about future lookaheads...”</span>
                  You can look ahead exclusively into the future using <code className="text-cyan-300 font-mono">ROWS BETWEEN 1 FOLLOWING AND 3 FOLLOWING</code> to calculate forward pipeline projections!
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
              Comprehensive reference questions covering ROWS vs RANGE, frame boundary anchors, centered smoothing windows, and calendar interval framing.
            </p>
          </div>

          <FAQTemplate
            title="Window Frame Specification FAQs"
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
            title="Window Frame Specification: ROWS BETWEEN and RANGE BETWEEN"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic5_note.txt"
          />

          <Teacher
            note="Understanding window frames is what separates amateur SQL writers from database architects. Always remember the tied timestamp pitfall: if two events share the same timestamp, default RANGE framing groups them into a lump sum. To get true step-by-step running totals, always specify ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW explicitly. And when smoothing time-series data, RANGE with INTERVAL is your best friend."
          />
        </section>
      </main>
    </div>
  );
};

export default Topic5;
