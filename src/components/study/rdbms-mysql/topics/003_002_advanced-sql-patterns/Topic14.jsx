import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic14_files/topic14_questions";
import noteText from "./topic14_files/topic14_note.txt?raw";

/**
 * Topic14 – Advanced Data Analytics Practical Query Workshop (Module Capstone)
 * Module: 003_002_advanced-sql-patterns
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive capstone workshop synthesizing window framing, ranking, boundary values, time-series moving averages, period-over-period growth, gaps & islands, conditional pivoting, and sparse data imputation.
 */
const Topic14 = () => {
  // Interactive Simulator State
  const [selectedWorkshopChallenge, setSelectedWorkshopChallenge] = useState("academic_360_scorecard");

  const workshopChallenges = {
    academic_360_scorecard: {
      title: "1. The 360° Student Academic Performance Scorecard",
      badge: "360° Student Telemetry",
      badgeColor: "emerald",
      sqlQuery: `-- Complete 360-Degree Holistic Academic Telemetry in a Single Linear Pass:
WITH HolisticMetrics AS (
    SELECT 
        s.student_id,
        CONCAT(s.first_name, ' ', s.last_name) AS student_name,
        d.dept_name,
        s.exam_score_pct,
        -- 1. Department Rank (DENSE_RANK):
        DENSE_RANK() OVER (
            PARTITION BY s.dept_id ORDER BY s.exam_score_pct DESC
        ) AS dept_rank,
        -- 2. Academy-Wide Percentile Rank (PERCENT_RANK):
        ROUND(PERCENT_RANK() OVER (
            ORDER BY s.exam_score_pct ASC
        ) * 100.0, 1) AS academy_percentile,
        -- 3. Gap to Department Valedictorian (FIRST_VALUE - Score):
        ROUND(FIRST_VALUE(s.exam_score_pct) OVER (
            PARTITION BY s.dept_id ORDER BY s.exam_score_pct DESC
        ) - s.exam_score_pct, 2) AS gap_to_topper,
        -- 4. Trailing 3-Quiz Moving Average (ROWS 2 PRECEDING):
        ROUND(AVG(s.exam_score_pct) OVER (
            PARTITION BY s.student_id ORDER BY s.exam_score_pct ASC ROWS 2 PRECEDING
        ), 2) AS trailing_moving_avg
    FROM students s
    JOIN departments d ON s.dept_id = d.dept_id
)
SELECT 
    student_id,
    student_name,
    dept_name,
    exam_score_pct,
    dept_rank,
    CONCAT(academy_percentile, 'th %tile') AS percentile_label,
    CONCAT('-', gap_to_topper, '%') AS valedictorian_gap,
    trailing_moving_avg,
    CASE 
        WHEN dept_rank = 1 THEN '🥇 Dept Valedictorian'
        WHEN academy_percentile >= 90 THEN '🏆 Gold Honor Scholar'
        ELSE '🟢 Active Scholar'
    END AS academic_honor_status
FROM HolisticMetrics
ORDER BY dept_name, dept_rank, exam_score_pct DESC;`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", dept: "Computer Science", score: "94.50%", rank: "Rank #1", percentile: "66.7th %tile", gap: "-0.00% (Topper)", movingAvg: "94.50%", status: "🥇 Dept Valedictorian" },
        { id: "STU-102", name: "Susmita Sen", dept: "Computer Science", score: "88.00%", rank: "Rank #2", percentile: "33.3rd %tile", gap: "-6.50% Gap", movingAvg: "91.25%", status: "🟢 Active Scholar" },
        { id: "STU-103", name: "Abhronila Saha", dept: "Information Tech", score: "96.20%", rank: "Rank #1", percentile: "100.0th %tile", gap: "-0.00% (Topper)", movingAvg: "96.20%", status: "🥇 Dept Valedictorian" },
        { id: "STU-104", name: "Debangshu Roy", dept: "Information Tech", score: "82.40%", rank: "Rank #2", percentile: "0.0th %tile", gap: "-13.80% Gap", movingAvg: "89.30%", status: "🟢 Active Scholar" },
      ],
      explanation:
        "Synthesizes `DENSE_RANK()`, `PERCENT_RANK()`, `FIRST_VALUE()`, and `AVG() OVER (ROWS 2 PRECEDING)` into a single query to produce a complete student academic report card without multiple table scans.",
    },
    financial_health_telemetry: {
      title: "2. Multi-Branch Financial Health Telemetry & Volatility Radar",
      badge: "Financial Health + 2σ Radar",
      badgeColor: "cyan",
      sqlQuery: `-- Combining YTD Cumulative Sum, MoM Growth, and Bollinger Anomaly Detection:
WITH MonthlyAgg AS (
    SELECT 
        DATE_FORMAT(payment_date, '%Y-%m-01') AS period_month,
        SUM(amount_paid_inr) AS monthly_rev
    FROM fee_payments
    GROUP BY DATE_FORMAT(payment_date, '%Y-%m-01')
),
WindowMetrics AS (
    SELECT 
        period_month,
        monthly_rev,
        -- YTD Cumulative Running Sum:
        SUM(monthly_rev) OVER (
            PARTITION BY LEFT(period_month, 4) 
            ORDER BY period_month ASC
        ) AS ytd_cumulative_revenue,
        -- Prior Month Offset for MoM:
        LAG(monthly_rev, 1) OVER (ORDER BY period_month ASC) AS prior_month_rev,
        -- 3-Month Moving Mean & StdDev:
        AVG(monthly_rev) OVER w AS moving_mean,
        STDDEV_SAMP(monthly_rev) OVER w AS moving_stddev
    FROM MonthlyAgg
    WINDOW w AS (ORDER BY period_month ASC ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)
)
SELECT 
    period_month,
    monthly_rev,
    ytd_cumulative_revenue,
    ROUND(((monthly_rev - prior_month_rev) / NULLIF(prior_month_rev, 0)) * 100.0, 2) AS mom_growth_pct,
    CASE 
        WHEN monthly_rev > (moving_mean + 2 * moving_stddev) THEN '🚨 High Anomaly Surge'
        WHEN monthly_rev < (moving_mean - 2 * moving_stddev) THEN '⚠️ Abnormal Deficit'
        ELSE '🟢 Healthy Variance'
    END AS financial_health_status
FROM WindowMetrics
ORDER BY period_month ASC;`,
      resultRows: [
        { id: "2026-06", name: "June 2026", dept: "All Branches", score: "₹45,000.00", rank: "YTD: ₹45,000", percentile: "Baseline", gap: "Mean: ₹45k", movingAvg: "Normal", status: "🟢 Healthy Variance" },
        { id: "2026-07", name: "July 2026", dept: "All Branches", score: "₹65,000.00", rank: "YTD: ₹1,10,000", percentile: "+44.44% MoM", gap: "Mean: ₹55k", movingAvg: "Normal", status: "🟢 Healthy Variance" },
        { id: "2026-08", name: "August 2026", dept: "All Branches", score: "₹1,20,000.00", rank: "YTD: ₹2,30,000", percentile: "+84.62% MoM", gap: "Mean: ₹76k", movingAvg: "+2σ Breach", status: "🚨 High Anomaly Surge" },
      ],
      explanation:
        "Combines YTD cumulative accounting, Month-over-Month growth percentage with `NULLIF` zero defense, and Mean $+2\sigma$ Bollinger anomaly detection to flag revenue surges live in SQL.",
    },
    attendance_streak_audit: {
      title: "3. Student Attendance Streak Audit & 30-Day Badge Qualification",
      badge: "Gaps & Islands Streak",
      badgeColor: "amber",
      sqlQuery: `-- Auditing unbroken attendance streaks and awarding 30-Day Consistency Badges:
WITH NumberedAttendance AS (
    SELECT 
        s.student_id,
        CONCAT(s.first_name, ' ', s.last_name) AS student_name,
        d.dept_name,
        a.attendance_date,
        -- The Difference Method Constant Anchor:
        DATE_SUB(a.attendance_date, INTERVAL ROW_NUMBER() OVER (
            PARTITION BY a.student_id ORDER BY a.attendance_date ASC
        ) DAY) AS island_anchor
    FROM student_daily_attendance a
    JOIN students s ON a.student_id = s.student_id
    JOIN departments d ON s.dept_id = d.dept_id
    WHERE a.is_present = 1
),
StreakIslands AS (
    SELECT 
        student_id,
        student_name,
        dept_name,
        island_anchor,
        MIN(attendance_date) AS streak_start,
        MAX(attendance_date) AS streak_end,
        COUNT(*) AS streak_days
    FROM NumberedAttendance
    GROUP BY student_id, student_name, dept_name, island_anchor
)
SELECT 
    student_id,
    student_name,
    dept_name,
    MAX(streak_days) AS max_continuous_streak_days,
    CASE 
        WHEN MAX(streak_days) >= 20 THEN '🌟 30-Day Golden Persistence Badge'
        WHEN MAX(streak_days) >= 10 THEN '🟢 Silver Consistency Award'
        ELSE '🟡 Active Learner'
    END AS persistence_award
FROM StreakIslands
GROUP BY student_id, student_name, dept_name
ORDER BY max_continuous_streak_days DESC;`,
      resultRows: [
        { id: "STU-103", name: "Abhronila Saha", dept: "Information Tech", score: "25 Days Unbroken", rank: "Rank #1", percentile: "Top 5%", gap: "0 Absent Days", movingAvg: "100%", status: "🌟 30-Day Golden Persistence Badge" },
        { id: "STU-101", name: "Mamata Hui", dept: "Computer Science", score: "18 Days Unbroken", rank: "Rank #2", percentile: "Top 15%", gap: "1 Absent Day", movingAvg: "96.7%", status: "🟢 Silver Consistency Award" },
        { id: "STU-102", name: "Susmita Sen", dept: "Computer Science", score: "12 Days Unbroken", rank: "Rank #3", percentile: "Top 25%", gap: "2 Absent Days", movingAvg: "93.3%", status: "🟢 Silver Consistency Award" },
      ],
      explanation:
        "The Gaps and Islands Difference Method groups continuous attendance days into islands and computes `MAX(streak_days)` per student to automatically award gamification badges.",
    },
    crosstab_enrollment_rollup: {
      title: "4. Semester Course Enrollment Crosstab with ROLLUP Totals",
      badge: "Crosstab Matrix + ROLLUP",
      badgeColor: "rose",
      sqlQuery: `-- Semester enrollment crosstab matrix with super-aggregate grand totals:
SELECT 
    COALESCE(d.dept_name, '🌟 ACADEMY GRAND TOTAL') AS department_name,
    -- Computer Science Course Column:
    SUM(CASE WHEN sub.subject_code = 'CS101' THEN 1 ELSE 0 END) AS cs_enrolled_count,
    -- Information Technology Course Column:
    SUM(CASE WHEN sub.subject_code = 'IT102' THEN 1 ELSE 0 END) AS it_enrolled_count,
    -- Web Development Course Column:
    SUM(CASE WHEN sub.subject_code = 'WD103' THEN 1 ELSE 0 END) AS web_dev_enrolled_count,
    -- Total Enrolled in Department:
    COUNT(*) AS total_department_enrollments
FROM course_enrollments e
JOIN students s ON e.student_id = s.student_id
JOIN departments d ON s.dept_id = d.dept_id
JOIN subjects sub ON e.subject_id = sub.subject_id
GROUP BY d.dept_name WITH ROLLUP;`,
      resultRows: [
        { id: "DEPT-CS", name: "Computer Science", dept: "CS Department", score: "CS: 45", rank: "IT: 12", percentile: "WD: 38", gap: "95 Total", movingAvg: "Active", status: "Department Matrix" },
        { id: "DEPT-IT", name: "Information Tech", dept: "IT Department", score: "CS: 15", rank: "IT: 50", percentile: "WD: 40", gap: "105 Total", movingAvg: "Active", status: "Department Matrix" },
        { id: "ALL-DEPT", name: "🌟 ACADEMY GRAND TOTAL", dept: "All Departments", score: "CS: 60", rank: "IT: 62", percentile: "WD: 78", gap: "200 Total", movingAvg: "Grand Sum", status: "Super Aggregate" },
      ],
      explanation:
        "Conditional aggregations pivot course enrollment streams across departments, while `WITH ROLLUP` attaches bottom-line grand total summary rows in a single table scan.",
    },
  };

  const navItems = [
    { id: "workshop-overview", label: "1. Capstone Overview" },
    { id: "core-pillars", label: "2. Analytical Pillars" },
    { id: "svg-diagrams", label: "3. Architecture & Telemetry SVGs" },
    { id: "interactive-sandbox", label: "4. Live Workshop Workbench" },
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
            <span>Topic 14 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Capstone Workshop
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Advanced Data Analytics Practical Query Workshop
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            The grand synthesis of Module 003_002. Build multi-metric student scorecards, real-time financial health radar, Gaps &amp; Islands streak audits, and crosstab matrices in pure relational SQL.
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
        <section id="workshop-overview" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Module 003_002 Capstone Synthesis
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Bringing together all analytical patterns into unified production architectures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span>🎯</span> Ranking &amp; Offsets
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                `DENSE_RANK()`, `ROW_NUMBER()`, `LAG()`, and `LEAD()` for category tiers and time-series comparisons.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <span>📊</span> Moving Windows
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Trailing &amp; Centered moving averages, rolling stddev, and Mean $\pm 2\sigma$ anomaly detection bands.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <span>🏝️</span> Gaps &amp; Islands
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Mathematical difference method (`date - INTERVAL rn DAY`) for streak and outage aggregation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <span>🔄</span> Matrix Crosstabs
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Conditional aggregation pivoting with `WITH ROLLUP` and Cartesian coordinate grid zero-filling.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Core Pillars */}
        <section id="core-pillars" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. The 4 Analytical Pillars of Modern SQL
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The essential engineering capabilities mastered in Module 003_002.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400">1. Row Preservation &amp; Explicit Framing</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Window functions compute partition metrics without collapsing rows. Always specify explicit <code className="text-emerald-300 font-mono">ROWS BETWEEN</code> frames to prevent tied-order clumping.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-cyan-400">2. Multi-Stage Modular CTE Pipelines</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Structure complex analytics into clean sequential stages (Group $\to$ Project Offsets $\to$ Calculate Deltas) with defensive <code className="text-cyan-300 font-mono">NULLIF(prior, 0)</code> math.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Analytical Pipeline &amp; 360° Telemetry
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Visualizing the comprehensive analytical query execution flow.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Analytical Architecture */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Module 003_002 Comprehensive Analytical Architecture
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1 */}
                  <g>
                    <rect x="30" y="30" width="180" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="120" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">1. Dense Grid / CTE</text>
                    <rect x="40" y="70" width="160" height="40" rx="4" fill="#0f172a" />
                    <text x="120" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">DateGrid + Cartesian</text>
                    <text x="120" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Zero-Filled Base</text>
                  </g>

                  {/* Step 2 */}
                  <g>
                    <rect x="230" y="30" width="180" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="320" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">2. Window Partitions</text>
                    <rect x="240" y="70" width="160" height="40" rx="4" fill="#022c22" />
                    <text x="320" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">OVER w_dept, w_global</text>
                    <text x="320" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Phase 5 Evaluation</text>
                  </g>

                  {/* Step 3 */}
                  <g>
                    <rect x="430" y="30" width="180" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="520" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">3. Multi-Metric Math</text>
                    <rect x="440" y="70" width="160" height="40" rx="4" fill="#0f172a" />
                    <text x="520" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">MoM %, YoY %, Mean±2σ</text>
                    <text x="520" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Gaps &amp; Islands Streaks</text>
                  </g>

                  {/* Step 4 */}
                  <g>
                    <rect x="630" y="30" width="190" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="725" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">4. Executive Projection</text>
                    <rect x="640" y="70" width="170" height="40" rx="4" fill="#022c22" />
                    <text x="725" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">360° Scorecards &amp; Views</text>
                    <text x="725" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Sub-Millisecond Speed</text>
                  </g>

                  {/* Connectors */}
                  <path d="M 210 80 L 230 80" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 410 80 L 430 80" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 610 80 L 630 80" stroke="#10b981" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* SVG 2: Telemetry Matrix */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-amber-400 font-mono">Diagram B:</span> 360° Holistic Student Academic Telemetry Matrix
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Mamata Card */}
                  <g>
                    <rect x="30" y="30" width="370" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="215" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Mamata Hui (Computer Science)</text>
                    <rect x="45" y="70" width="340" height="40" rx="4" fill="#022c22" />
                    <text x="215" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Score: 94.5% | CS Rank #1 🥇 | 66.7th %tile</text>
                    <text x="215" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Gap to Topper: 0.00% | 3-Quiz Avg: 94.5%</text>
                  </g>

                  {/* Abhronila Card */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="630" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Abhronila Saha (Information Tech)</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#022c22" />
                    <text x="630" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Score: 96.2% | IT Rank #1 🥇 | 100.0th %tile 🏆</text>
                    <text x="630" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Gap to Topper: 0.00% | 3-Quiz Avg: 96.2%</text>
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
              4. Interactive Capstone Workshop Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test all four capstone workshop challenges live: 360° scorecards, financial health telemetry, attendance streak audits, and crosstab rollups.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(workshopChallenges).map(([key, item]) => {
              const isActive = selectedWorkshopChallenge === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedWorkshopChallenge(key)}
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
                    {isActive ? "● Active Challenge" : "○ Run Capstone Query"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{workshopChallenges[selectedWorkshopChallenge].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{workshopChallenges[selectedWorkshopChallenge].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Workshop Capstone Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Capstone Query Pipeline</span>
                <span className="text-emerald-400">Integrated Multi-Window Solution</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {workshopChallenges[selectedWorkshopChallenge].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">ID / Key</th>
                    <th className="py-3 px-4 text-white">Entity / Student / Period</th>
                    <th className="py-3 px-4 text-emerald-400">Scope / Dept</th>
                    <th className="py-3 px-4 text-cyan-400">Score / Revenue</th>
                    <th className="py-3 px-4 text-indigo-400">Rank / YTD Metric</th>
                    <th className="py-3 px-4 text-amber-400">Percentile / MoM %</th>
                    <th className="py-3 px-4 text-slate-300">Gap / Anomaly</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {workshopChallenges[selectedWorkshopChallenge].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.name}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.dept}</td>
                      <td className="py-3 px-4 text-slate-300 font-bold">{row.score}</td>
                      <td className="py-3 px-4 text-indigo-300 font-bold">{row.rank}</td>
                      <td className="py-3 px-4 text-amber-300">{row.percentile}</td>
                      <td className="py-3 px-4 text-slate-400 font-sans">{row.gap}</td>
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
              Real-world enterprise telemetry pipelines and sub-millisecond query indexing.
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
                  Architecting the Barrackpore Academy Analytics Command Center
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Academy Command Center</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui architected the complete reporting layer for the academy: By combining multi-window CTEs (`DENSE_RANK`, `PERCENT_RANK`, `FIRST_VALUE`, and 3-quiz moving averages) into a single virtual view supported by composite indexes on <code className="text-emerald-300 font-mono">(dept_id, exam_score_pct DESC, student_id)</code>, 50,000 student scorecards evaluate in under 22 milliseconds with 0 disk temporary tables!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Covering Index:
CREATE INDEX idx_student_dept_score_covered ON students (dept_id, exam_score_pct DESC, student_id);

-- High-Performance 360 View:
CREATE OR REPLACE VIEW v_student_360_telemetry AS
WITH Scored AS (
    SELECT student_id, first_name, last_name, dept_id, exam_score_pct,
           DENSE_RANK() OVER (PARTITION BY dept_id ORDER BY exam_score_pct DESC) AS dept_rank,
           PERCENT_RANK() OVER (ORDER BY exam_score_pct ASC) * 100.0 AS academy_percentile,
           FIRST_VALUE(exam_score_pct) OVER (PARTITION BY dept_id ORDER BY exam_score_pct DESC) - exam_score_pct AS topper_gap
    FROM students
)
SELECT * FROM Scored;`}
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
              Module 003_002 master architectural takeaways.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> 3 Deadly SQL Analytics Sins
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                <li>• Using Window Functions in `WHERE` directly (Error 3593).</li>
                <li>• Forgetting `NULLIF(prior, 0)` in division formulas (Error 1365).</li>
                <li>• Writing `COUNT(CASE WHEN ... ELSE 0 END)` counting zero rows.</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> 3 Master Golden Rules
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                <li>• Always write explicit <code className="text-emerald-300 font-mono">ROWS BETWEEN</code> frames.</li>
                <li>• Structure complex analytics into modular multi-stage CTEs.</li>
                <li>• Support window partitions with composite covering indexes.</li>
              </ul>
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
              Key takeaways for Module 003_002 Capstone Workshop.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Capstone Workshop Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Combine multi-window metrics using named <code className="text-cyan-300 font-mono">WINDOW</code> clauses.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Use the Difference Method for instant Gaps &amp; Islands streak detection.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Guarantee matrix density with Cartesian coordinate grids (<code className="text-cyan-300 font-mono">CROSS JOIN</code>).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Pivot multi-category summaries with <code className="text-cyan-300 font-mono">WITH ROLLUP</code> super-aggregates.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe the power of pure SQL...”</span>
                  Calculations that previously required thousands of lines of procedural Python or Java code now execute natively in the relational database engine in linear time!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Congratulations on completing Module 003_002...”</span>
                  You are now fully equipped with senior-level mastery of ANSI Window Functions, Analytics, and Advanced Query Patterns in MySQL 8.0!
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
              Comprehensive reference questions covering the Capstone Workshop, multi-window CTEs, Bollinger anomaly detection, Gaps &amp; Islands gamification, and query tuning.
            </p>
          </div>

          <FAQTemplate
            title="Advanced Data Analytics Practical Query Workshop FAQs"
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
            title="Advanced Data Analytics Practical Query Workshop"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic14_note.txt"
          />

          <Teacher
            note="Congratulations on completing Module 003_002: Window Functions, Analytics & Advanced Query Patterns! In this module, we progressed from basic row preservation versus row collapse all the way to complex multi-stage CTE pipelines, moving average volatility bands, Gaps & Islands mathematical streak grouping, and Cartesian sparse matrix imputation. By mastering these patterns, you can solve complex analytical requirements directly inside MySQL with sub-millisecond execution times and zero application-level stitching!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic14;
