import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";

/**
 * Topic7 – Calculating Moving Averages and Rolling Aggregations
 * Module: 003_002_advanced-sql-patterns
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on moving averages, trailing vs centered windows, rolling standard deviation, Bollinger volatility bands, and time-series smoothing.
 */
const Topic7 = () => {
  // Interactive Simulator State
  const [selectedMovingScenario, setSelectedMovingScenario] = useState("trailing_3period_student_scores");

  const movingScenarios = {
    trailing_3period_student_scores: {
      title: "1. Trailing 3-Period Moving Average on Student Exam Scores",
      badge: "Trailing 3-Period",
      badgeColor: "emerald",
      sqlQuery: `-- Smoothing student score volatility across consecutive exams:
SELECT 
    e.exam_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    e.exam_date,
    e.exam_score_pct,
    -- 3-Exam Trailing Moving Average:
    ROUND(AVG(e.exam_score_pct) OVER (
        PARTITION BY s.student_id 
        ORDER BY e.exam_date ASC 
        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
    ), 2) AS trailing_3exam_avg_score,
    -- Number of Exams encompassed in current window:
    COUNT(e.exam_score_pct) OVER (
        PARTITION BY s.student_id 
        ORDER BY e.exam_date ASC 
        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
    ) AS window_sample_size
FROM student_exams e
JOIN students s ON e.student_id = s.student_id
ORDER BY s.student_id, e.exam_date ASC;`,
      resultRows: [
        { id: "EX-01", name: "Mamata Hui", date: "2026-06-01", actualScore: "90.00%", movingAvg: "90.00% (Edge)", sampleSize: "1 of 3 (Inception)", status: "Baseline Step" },
        { id: "EX-02", name: "Mamata Hui", date: "2026-06-05", actualScore: "78.00% (Headache)", movingAvg: "84.00% (Smoothed)", sampleSize: "2 of 3 (Growing)", status: "Volatile Dip Filtered" },
        { id: "EX-03", name: "Mamata Hui", date: "2026-06-10", actualScore: "96.00%", movingAvg: "88.00% (Full Window)", sampleSize: "3 of 3 (Mature)", status: "Full 3-Period" },
        { id: "EX-04", name: "Mamata Hui", date: "2026-06-15", actualScore: "94.50%", movingAvg: "89.50% (Full Window)", sampleSize: "3 of 3 (Mature)", status: "Rising Trend" },
      ],
      explanation:
        "Observe Exam #2: Despite a temporary headache causing a score dip to 78%, the 3-period moving average filters the noise to 84.00%, accurately reflecting Mamata's true underlying academic mastery.",
    },
    trailing_7day_revenue_avg: {
      title: "2. Trailing 7-Day Rolling Revenue Average",
      badge: "7-Day Revenue Avg",
      badgeColor: "cyan",
      sqlQuery: `-- Computing 7-day rolling revenue to eliminate weekend fee payment noise:
SELECT 
    payment_date,
    daily_revenue_inr,
    -- 7-Day Moving Average:
    ROUND(AVG(daily_revenue_inr) OVER (
        ORDER BY payment_date ASC 
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ), 2) AS trailing_7day_avg_revenue
FROM daily_revenue_summary
ORDER BY payment_date ASC;`,
      resultRows: [
        { id: "DAY-01", name: "Monday", date: "2026-06-01", actualScore: "₹25,000.00", movingAvg: "₹25,000.00", sampleSize: "1 of 7 Days", status: "Weekday Start" },
        { id: "DAY-02", name: "Tuesday", date: "2026-06-02", actualScore: "₹18,000.00", movingAvg: "₹21,500.00", sampleSize: "2 of 7 Days", status: "Accumulating" },
        { id: "DAY-06", name: "Saturday", date: "2026-06-06", actualScore: "₹45,000.00 (Spike)", movingAvg: "₹28,600.00", sampleSize: "6 of 7 Days", status: "Weekend Spike Filtered" },
        { id: "DAY-07", name: "Sunday", date: "2026-06-07", actualScore: "₹5,000.00 (Low)", movingAvg: "₹25,285.71", sampleSize: "7 of 7 (Mature)", status: "Full 7-Day Mean" },
      ],
      explanation:
        "The 7-day moving average absorbs high-volume Saturday fee collections and low Sunday collections, projecting a smooth daily revenue baseline of ₹25,285.71.",
    },
    bollinger_volatility_bands: {
      title: "3. Statistical Volatility Bands (Mean ± 2 StdDev)",
      badge: "Bollinger Anomaly Bands",
      badgeColor: "amber",
      sqlQuery: `-- Building statistical anomaly detection bands (Mean ± 2σ) in pure SQL:
WITH RollingStats AS (
    SELECT 
        payment_date,
        daily_revenue_inr,
        -- 30-Day Moving Mean:
        AVG(daily_revenue_inr) OVER w AS moving_mean,
        -- 30-Day Moving Sample Standard Deviation:
        STDDEV_SAMP(daily_revenue_inr) OVER w AS moving_stddev
    FROM daily_revenue_summary
    WINDOW w AS (ORDER BY payment_date ASC ROWS BETWEEN 29 PRECEDING AND CURRENT ROW)
)
SELECT 
    payment_date,
    daily_revenue_inr,
    ROUND(moving_mean, 2) AS rolling_mean,
    ROUND(moving_mean - (2 * moving_stddev), 2) AS lower_band_2sigma,
    ROUND(moving_mean + (2 * moving_stddev), 2) AS upper_band_2sigma,
    CASE 
        WHEN daily_revenue_inr > (moving_mean + 2 * moving_stddev) THEN '🚨 High Anomaly Spike'
        WHEN daily_revenue_inr < (moving_mean - 2 * moving_stddev) THEN '⚠️ Abnormal Revenue Slump'
        ELSE '🟢 Normal Variation'
    END AS anomaly_flag
FROM RollingStats
ORDER BY payment_date ASC;`,
      resultRows: [
        { id: "VOL-01", name: "Regular Tuesday", date: "2026-06-02", actualScore: "₹24,000.00", movingAvg: "Mean: ₹25,000.00", sampleSize: "Lower: ₹15k | Upper: ₹35k", status: "🟢 Normal Variation" },
        { id: "VOL-02", name: "Admission Fair Day", date: "2026-06-15", actualScore: "₹48,000.00", movingAvg: "Mean: ₹25,500.00", sampleSize: "Lower: ₹15k | Upper: ₹36k", status: "🚨 High Anomaly Spike" },
      ],
      explanation:
        "Combining `AVG()` and `STDDEV_SAMP()` inside a 30-row sliding window creates statistical upper and lower bands. When admission fair collections hit ₹48,000 (exceeding Mean $+2\sigma$), the SQL query automatically flags it as a statistical anomaly!",
    },
    centered_smoothing_window: {
      title: "4. Centered Smoothing Window for Retrospective Analysis",
      badge: "Centered Window",
      badgeColor: "rose",
      sqlQuery: `-- Centered 3-Exam Retrospective Smoothing (1 PRECEDING & 1 FOLLOWING):
SELECT 
    exam_num,
    exam_score_pct,
    -- Symmetric Centered Moving Average:
    ROUND(AVG(exam_score_pct) OVER (
        ORDER BY exam_num ASC 
        ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING
    ), 2) AS centered_smoothed_score
FROM exam_history
ORDER BY exam_num ASC;`,
      resultRows: [
        { id: "EX-1", name: "Exam 1 (Inception)", date: "Baseline", actualScore: "90.00%", movingAvg: "92.25% (Edge 2 rows)", sampleSize: "Edge Frame", status: "Edge (Contracted)" },
        { id: "EX-2", name: "Exam 2 (Midterm)", date: "Midterm", actualScore: "94.50%", movingAvg: "90.83% (Centered)", sampleSize: "Symmetric (3 rows)", status: "Centered Smoothing" },
        { id: "EX-3", name: "Exam 3 (Finals)", date: "Finals", actualScore: "88.00%", movingAvg: "92.90% (Centered)", sampleSize: "Symmetric (3 rows)", status: "Centered Smoothing" },
      ],
      explanation:
        "Centered moving windows `ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING` provide symmetric smoothing without lagging behind sudden macro trend shifts, ideal for academic retrospective audits.",
    },
  };

  const navItems = [
    { id: "moving-concept", label: "1. Moving Average Mechanics" },
    { id: "trailing-vs-centered", label: "2. Trailing vs Centered Frames" },
    { id: "svg-diagrams", label: "3. Sliding Frame & Bollinger SVGs" },
    { id: "interactive-sandbox", label: "4. Live Moving Workbench" },
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
            <span>Topic 7 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Time-Series Smoothing
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Moving Averages &amp; Rolling Aggregations
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Filter high-frequency noise and detect statistical macro trends. Master trailing moving averages, symmetric centered smoothing frames, rolling standard deviation, and statistical volatility bands in pure SQL.
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
        <section id="moving-concept" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Anatomy of Moving Averages
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Calculating statistical mean and dispersion across a sliding frame of rows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span>📉</span> Noise Reduction
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Filters random daily noise and short-term volatility to reveal the underlying long-term performance trajectory.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <span>🔄</span> Trailing vs Centered
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Trailing frames look backward for operational alerts; Centered frames balance past and future for historical audits.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <span>📊</span> Volatility Bands (2σ)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Combine `AVG()` and `STDDEV_SAMP()` over a 30-row sliding window to automatically flag statistical anomaly spikes!
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Trailing vs Centered Frames */}
        <section id="trailing-vs-centered" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Trailing vs Centered Moving Window Frames
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing operational lookback frames with retrospective symmetric smoothing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400">1. Trailing Moving Average (Operational)</h3>
              <pre className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-cyan-300 border border-slate-800">
                AVG(rev) OVER (ORDER BY date ROWS 6 PRECEDING)
              </pre>
              <p className="text-xs text-slate-300 leading-relaxed">
                Operates strictly on historical data up to the current row. Essential for real-time dashboards and operational forecasting.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-cyan-400">2. Centered Moving Average (Retrospective)</h3>
              <pre className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-cyan-300 border border-slate-800">
                AVG(score) OVER (ORDER BY date ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING)
              </pre>
              <p className="text-xs text-slate-300 leading-relaxed">
                Balances past and future rows symmetrically around the current row. Eliminates phase lag in historical research audits.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Sliding Window &amp; Bollinger Bands
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing sliding window mechanics with statistical Mean ± 2σ anomaly detection bands.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Sliding Window */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Trailing 3-Row Sliding Window Progression
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1 */}
                  <g>
                    <rect x="30" y="30" width="240" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="150" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">Row 1: 90% (Inception)</text>
                    <rect x="45" y="70" width="210" height="40" rx="4" fill="#0f172a" />
                    <text x="150" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Frame: Row 1 Only</text>
                    <text x="150" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Avg = 90.00%</text>
                  </g>

                  {/* Step 2 */}
                  <g>
                    <rect x="300" y="30" width="250" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="425" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">Row 2: 78% (Dip!)</text>
                    <rect x="315" y="70" width="220" height="40" rx="4" fill="#0f172a" />
                    <text x="425" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Frame: Rows 1 + 2</text>
                    <text x="425" y="102" fill="#a7f3d0" fontSize="7 font-mono" textAnchor="middle">Avg = (90 + 78)/2 = 84.00%</text>
                  </g>

                  {/* Step 3 */}
                  <g>
                    <rect x="580" y="30" width="240" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="700" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Row 3: 96% (Recovery)</text>
                    <rect x="595" y="70" width="210" height="40" rx="4" fill="#022c22" />
                    <text x="700" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Frame: Rows 1 + 2 + 3</text>
                    <text x="700" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Avg = (90 + 78 + 96)/3 = 88.00%</text>
                  </g>

                  {/* Connectors */}
                  <path d="M 270 80 L 300 80" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 550 80 L 580 80" stroke="#10b981" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* SVG 2: Bollinger Bands */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-amber-400 font-mono">Diagram B:</span> Statistical Volatility Bands (Mean ± 2σ) Anomaly Detection
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Upper Band */}
                  <g>
                    <rect x="30" y="25" width="790" height="25" rx="4" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="425" y="42" fill="#fca5a5" fontSize="9 font-mono" textAnchor="middle">Upper Band (Mean + 2σ): ₹36,000.00 (Anomaly Ceiling)</text>
                  </g>

                  {/* Mean Line */}
                  <g>
                    <rect x="30" y="65" width="790" height="30" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="425" y="84" fill="#34d399" fontSize="10 font-bold font-mono" textAnchor="middle">Rolling 30-Day Mean: ₹25,500.00 (Normal Baseline)</text>
                  </g>

                  {/* Lower Band */}
                  <g>
                    <rect x="30" y="110" width="790" height="25" rx="4" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="425" y="127" fill="#c7d2fe" fontSize="9 font-mono" textAnchor="middle">Lower Band (Mean - 2σ): ₹15,000.00 (Anomaly Floor)</text>
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
              4. Interactive Moving Average Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test trailing moving averages, 7-day revenue smoothing, statistical volatility bands (Mean ± 2σ), and centered retrospective frames live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(movingScenarios).map(([key, item]) => {
              const isActive = selectedMovingScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedMovingScenario(key)}
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
                    {isActive ? "● Active Model" : "○ Run Moving Avg"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{movingScenarios[selectedMovingScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{movingScenarios[selectedMovingScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Moving Window Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Moving Window Query</span>
                <span className="text-emerald-400">Sliding Frame Calculation</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {movingScenarios[selectedMovingScenario].sqlQuery}
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
                    <th className="py-3 px-4 text-cyan-400">Actual Value</th>
                    <th className="py-3 px-4 text-indigo-400">Moving Average / Mean</th>
                    <th className="py-3 px-4 text-amber-400">Window Sample Size / Bands</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {movingScenarios[selectedMovingScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.name}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.date}</td>
                      <td className="py-3 px-4 text-slate-300 font-bold">{row.actualScore}</td>
                      <td className="py-3 px-4 text-indigo-300 font-bold">{row.movingAvg}</td>
                      <td className="py-3 px-4 text-amber-300 font-sans">{row.sampleSize}</td>
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
              Real-world statistical anomaly detection and TTM reporting.
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
                  Detecting Sudden Tuition Default Slumps via Bollinger Bands
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Academy Analytics</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui built an automated cash flow risk monitor: Calculating 30-day rolling Mean and Standard Deviation over daily fee collections allowed the finance system to automatically detect when collections dropped below Mean $-2\sigma$, alerting administrators to student default clusters 3 weeks earlier than monthly reports!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- ✅ Automated Cash Flow Anomaly Detector:
WITH Stats AS (
    SELECT payment_date, amount,
           AVG(amount) OVER w AS m, STDDEV_SAMP(amount) OVER w AS s
    FROM fee_payments
    WINDOW w AS (ORDER BY payment_date ROWS 29 PRECEDING)
)
SELECT payment_date, amount, m, (m - 2*s) AS lower_bound
FROM Stats
WHERE amount < (m - 2*s);`}
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
              Avoid premature edge conclusions and large frame memory spikes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Misinterpreting Edge Boundary Averages
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                At row 2 of a 30-day moving average, the sample size is only 2 days. Drawing conclusions before the window matures produces misleading metrics.
              </p>
              <div className="text-xs text-slate-400">
                Fix: Add <code className="text-emerald-400 font-mono">COUNT(*) OVER w &gt;= 30</code> to filter for mature windows.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Named Windows for Multi-Metric Volatility
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                When combining Rolling Avg, Rolling StdDev, Rolling Min, and Rolling Max, declare a single <code className="text-emerald-400 font-mono">WINDOW w AS (ORDER BY date ROWS ...)</code> to keep the query clean and performant.
              </p>
              <div className="text-xs text-slate-400">
                Reduces code clutter and ensures identical framing across metrics.
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
              Key takeaways for moving averages and rolling aggregations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Moving Average Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Use trailing frames (<code className="text-cyan-300 font-mono">ROWS N PRECEDING</code>) for real-time dashboards.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Use centered frames (<code className="text-cyan-300 font-mono">ROWS 1 PRECEDING AND 1 FOLLOWING</code>) for historical audits.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Combine <code className="text-cyan-300 font-mono">AVG()</code> and <code className="text-cyan-300 font-mono">STDDEV_SAMP()</code> for Bollinger bands.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Use <code className="text-cyan-300 font-mono">COUNT(*) OVER w</code> to verify sample size maturity.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe TTM corporate reporting...”</span>
                  To calculate Trailing Twelve Months (TTM) revenue, write <code className="text-cyan-300 font-mono">SUM(monthly_rev) OVER (ORDER BY month_date ROWS 11 PRECEDING)</code> on monthly aggregated data!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about statistical anomaly triggers...”</span>
                  Building Mean $\pm 2\sigma$ bands in pure SQL allows database views to trigger real-time anomaly alerts without relying on external Python analytics jobs!
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
              Comprehensive reference questions covering moving averages, trailing vs centered frames, rolling standard deviation, and statistical anomaly detection bands.
            </p>
          </div>

          <FAQTemplate
            title="Moving Averages &amp; Rolling Aggregations FAQs"
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
            title="Calculating Moving Averages and Rolling Aggregations"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic7_note.txt"
          />

          <Teacher
            note="Moving averages are the premier mathematical tool for cutting through noisy time-series data. Whether you are smoothing student test score volatility or calculating 7-day rolling revenue baselines, sliding window frames execute in linear time. Remember the architectural distinction: use trailing frames (ROWS N PRECEDING) for real-time alerts, and centered frames (ROWS 1 PRECEDING AND 1 FOLLOWING) when performing historical retrospective analysis."
          />
        </section>
      </main>
    </div>
  );
};

export default Topic7;
