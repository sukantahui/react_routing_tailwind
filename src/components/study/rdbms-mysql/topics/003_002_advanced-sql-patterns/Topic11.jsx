import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic11_files/topic11_questions";
import noteText from "./topic11_files/topic11_note.txt?raw";

/**
 * Topic11 – Solving Gaps and Islands Problems in Time-Series and Transaction Logs
 * Module: 003_002_advanced-sql-patterns
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on Gaps & Islands problems, the Date-RowNumber difference method, streak grouping, gap interval isolation, and uptime aggregation.
 */
const Topic11 = () => {
  // Interactive Simulator State
  const [selectedIslandScenario, setSelectedIslandScenario] = useState("date_rownum_difference_method");

  const islandScenarios = {
    date_rownum_difference_method: {
      title: "1. The Date - RowNumber Difference Method (Streak Islands)",
      badge: "Difference Method",
      badgeColor: "emerald",
      sqlQuery: `-- Finding uninterrupted consecutive attendance streaks for Mamata Hui:
WITH NumberedAttendance AS (
    SELECT 
        student_id,
        attendance_date,
        ROW_NUMBER() OVER (
            PARTITION BY student_id 
            ORDER BY attendance_date ASC
        ) AS rn,
        -- The Mathematical Anchor: date - interval rn day is identical for consecutive rows!
        DATE_SUB(attendance_date, INTERVAL ROW_NUMBER() OVER (
            PARTITION BY student_id 
            ORDER BY attendance_date ASC
        ) DAY) AS island_group_anchor
    FROM student_daily_attendance
    WHERE student_id = 'STU-101' AND is_present = 1
)
-- Aggregate each unbroken streak island:
SELECT 
    student_id,
    island_group_anchor,
    MIN(attendance_date) AS streak_start_date,
    MAX(attendance_date) AS streak_end_date,
    COUNT(*) AS continuous_streak_days,
    CONCAT(COUNT(*), ' Days Unbroken Streak 🔥') AS streak_badge
FROM NumberedAttendance
GROUP BY student_id, island_group_anchor
ORDER BY streak_start_date ASC;`,
      resultRows: [
        { id: "ISLAND-01", name: "Mamata Hui", anchor: "2026-05-31", start: "2026-06-01", end: "2026-06-03", days: "3 Days", badge: "3 Days Streak 🔥", status: "Active Island 1" },
        { id: "ISLAND-02", name: "Mamata Hui", anchor: "2026-06-01", start: "2026-06-05", end: "2026-06-06", days: "2 Days", badge: "2 Days Streak 🔥", status: "Active Island 2" },
      ],
      explanation:
        "Because both `attendance_date` and `ROW_NUMBER()` advance by 1 on consecutive days, their subtraction `DATE_SUB(date, INTERVAL rn DAY)` produces a CONSTANT anchor date (2026-05-31 for streak 1; 2026-06-01 for streak 2), grouping the unbroken streaks perfectly!",
    },
    gap_detection_inactivity: {
      title: "2. Gap Detection: Identifying Inactive Absence Periods",
      badge: "Gap Isolation",
      badgeColor: "rose",
      sqlQuery: `-- Isolating the exact date gaps and absence durations between attendance streaks:
WITH OrderedAttendance AS (
    SELECT 
        student_id,
        attendance_date,
        -- Date of previous attendance:
        LAG(attendance_date, 1) OVER (
            PARTITION BY student_id 
            ORDER BY attendance_date ASC
        ) AS previous_attendance_date
    FROM student_daily_attendance
    WHERE student_id = 'STU-101' AND is_present = 1
)
SELECT 
    student_id,
    previous_attendance_date AS last_seen_date,
    attendance_date AS returned_date,
    (DATEDIFF(attendance_date, previous_attendance_date) - 1) AS absent_days_gap,
    CONCAT('⚠️ Absent for ', (DATEDIFF(attendance_date, previous_attendance_date) - 1), ' Days') AS gap_alert
FROM OrderedAttendance
WHERE DATEDIFF(attendance_date, previous_attendance_date) > 1
ORDER BY attendance_date ASC;`,
      resultRows: [
        { id: "GAP-01", name: "Mamata Hui", anchor: "June 04 Absence", start: "2026-06-03", end: "2026-06-05", days: "1 Day Gap", badge: "⚠️ Absent for 1 Day", status: "Gap Isolated" },
      ],
      explanation:
        "Filtering `WHERE DATEDIFF(date, LAG(date)) > 1` pinpoints the exact gap period between June 03 and June 05, revealing that Mamata was absent on June 04.",
    },
    longest_streak_leaderboard: {
      title: "3. Academy-Wide Longest Attendance Streak Leaderboard",
      badge: "Streak Leaderboard",
      badgeColor: "cyan",
      sqlQuery: `-- Finding the all-time longest attendance streak for EVERY student in the academy:
WITH AllStudentIslands AS (
    SELECT 
        s.student_id,
        CONCAT(s.first_name, ' ', s.last_name) AS student_name,
        d.dept_name,
        a.attendance_date,
        DATE_SUB(a.attendance_date, INTERVAL ROW_NUMBER() OVER (
            PARTITION BY a.student_id 
            ORDER BY a.attendance_date ASC
        ) DAY) AS island_anchor
    FROM student_daily_attendance a
    JOIN students s ON a.student_id = s.student_id
    JOIN departments d ON s.dept_id = d.dept_id
    WHERE a.is_present = 1
),
StreakAggregates AS (
    SELECT 
        student_id,
        student_name,
        dept_name,
        island_anchor,
        MIN(attendance_date) AS streak_start,
        MAX(attendance_date) AS streak_end,
        COUNT(*) AS streak_length
    FROM AllStudentIslands
    GROUP BY student_id, student_name, dept_name, island_anchor
)
SELECT 
    student_id,
    student_name,
    dept_name,
    MAX(streak_length) AS longest_streak_days,
    DENSE_RANK() OVER (ORDER BY MAX(streak_length) DESC) AS consistency_rank,
    CASE 
        WHEN MAX(streak_length) >= 20 THEN '🌟 Gold Attendance Award'
        WHEN MAX(streak_length) >= 10 THEN '🟢 Silver Consistency'
        ELSE '🟡 Active Learner'
    END AS award_tier
FROM StreakAggregates
GROUP BY student_id, student_name, dept_name
ORDER BY longest_streak_days DESC;`,
      resultRows: [
        { id: "STU-103", name: "Abhronila Saha", anchor: "IT Dept", start: "2026-05-01", end: "2026-06-01", days: "25 Days", badge: "🌟 Gold Award", status: "Consistency Rank #1" },
        { id: "STU-101", name: "Mamata Hui", anchor: "CS Dept", start: "2026-05-15", end: "2026-06-05", days: "18 Days", badge: "🟢 Silver Consistency", status: "Consistency Rank #2" },
        { id: "STU-102", name: "Susmita Sen", anchor: "CS Dept", start: "2026-05-20", end: "2026-06-02", days: "12 Days", badge: "🟢 Silver Consistency", status: "Consistency Rank #3" },
      ],
      explanation:
        "Grouping by `island_anchor` and taking `MAX(streak_length)` per student establishes an academy-wide consistency leaderboard without procedural loops or cursor scans.",
    },
    uptime_incident_aggregation: {
      title: "4. Server Uptime vs Outage Incident Duration Aggregation",
      badge: "Outage Clustering",
      badgeColor: "amber",
      sqlQuery: `-- Clustering consecutive server outage logs into discrete incident episodes:
WITH FlaggedStatus AS (
    SELECT 
        log_id,
        server_name,
        log_time,
        server_status,
        -- Detect status transitions:
        CASE 
            WHEN LAG(server_status) OVER (PARTITION BY server_name ORDER BY log_time) = server_status THEN 0
            ELSE 1
        END AS is_status_change
    FROM server_health_logs
),
IslandNumbered AS (
    SELECT 
        *,
        -- Accumulate island ID:
        SUM(is_status_change) OVER (PARTITION BY server_name ORDER BY log_time) AS incident_id
    FROM FlaggedStatus
)
SELECT 
    server_name,
    server_status,
    MIN(log_time) AS incident_start_time,
    MAX(log_time) AS incident_resolved_time,
    TIMESTAMPDIFF(MINUTE, MIN(log_time), MAX(log_time)) AS incident_duration_minutes,
    COUNT(*) AS consecutive_pings
FROM IslandNumbered
GROUP BY server_name, server_status, incident_id
ORDER BY incident_start_time ASC;`,
      resultRows: [
        { id: "SRV-01", name: "Barrackpore-DB-01", anchor: "ONLINE", start: "10:00 AM", end: "11:30 AM", days: "90 Mins", badge: "🟢 Normal Uptime", status: "Online" },
        { id: "SRV-01", name: "Barrackpore-DB-01", anchor: "OFFLINE (INCIDENT)", start: "11:31 AM", end: "11:45 AM", days: "14 Mins Outage", badge: "🚨 Critical Incident", status: "Outage Resolved" },
        { id: "SRV-01", name: "Barrackpore-DB-01", anchor: "ONLINE", start: "11:46 AM", end: "02:00 PM", days: "134 Mins", badge: "🟢 Normal Uptime", status: "Online" },
      ],
      explanation:
        "The Running Flag Method flags when server status transitions between ONLINE and OFFLINE, accumulating `incident_id` to aggregate outage durations into discrete incident episodes.",
    },
  };

  const navItems = [
    { id: "islands-concept", label: "1. Gaps & Islands Concepts" },
    { id: "difference-method", label: "2. The Mathematical Difference Method" },
    { id: "svg-diagrams", label: "3. Constant Anchor & Timeline SVGs" },
    { id: "interactive-sandbox", label: "4. Live Gaps & Islands Workbench" },
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
            <span>Topic 11 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Sequence Analytics
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Solving Gaps &amp; Islands Problems in SQL
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Solve one of the most famous challenges in database engineering. Master the mathematical Date-RowNumber Difference Method for consecutive streak grouping, isolate inactivity gap intervals, and aggregate outage incidents.
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
        <section id="islands-concept" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Gaps and Islands Relational Paradigm
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Categorizing continuous streaks and missing intervals in time-series logs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span>🏝️</span> Islands (Active Streaks)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Unbroken sequences of consecutive records (e.g. June 01, 02, 03 attendance). Grouped to measure streak duration.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <span>🕳️</span> Gaps (Inactivity Holes)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Missing dates or intervals between streaks (e.g. absent on June 04). Isolated to flag student churn and outage durations.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <span>🔢</span> Mathematical Anchor
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                `date - INTERVAL ROW_NUMBER() DAY` yields an identical constant anchor date across all rows in the same streak!
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Difference Method */}
        <section id="difference-method" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. The Mathematical Difference Method Explained
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why subtracting row number from consecutive dates creates a constant grouping key.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
            <table className="w-full text-left text-sm text-slate-300 font-mono">
              <thead className="bg-slate-950 text-slate-100 font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4 text-cyan-400">Attendance Date</th>
                  <th className="py-3.5 px-4 text-emerald-400">ROW_NUMBER()</th>
                  <th className="py-3.5 px-4 text-amber-400">Date - ROW_NUMBER() [Anchor Key]</th>
                  <th className="py-3.5 px-4 text-white font-sans">Streak Classification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs sm:text-sm font-sans">
                <tr className="hover:bg-slate-800/40 bg-emerald-950/20">
                  <td className="py-3 px-4 text-white font-mono">2026-06-01</td>
                  <td className="py-3 px-4 text-emerald-300 font-mono">1</td>
                  <td className="py-3 px-4 text-amber-300 font-mono font-bold">2026-05-31 (Constant!)</td>
                  <td className="py-3 px-4 text-emerald-400">Island 1 (Day 1)</td>
                </tr>
                <tr className="hover:bg-slate-800/40 bg-emerald-950/20">
                  <td className="py-3 px-4 text-white font-mono">2026-06-02</td>
                  <td className="py-3 px-4 text-emerald-300 font-mono">2</td>
                  <td className="py-3 px-4 text-amber-300 font-mono font-bold">2026-05-31 (Constant!)</td>
                  <td className="py-3 px-4 text-emerald-400">Island 1 (Day 2)</td>
                </tr>
                <tr className="hover:bg-slate-800/40 bg-emerald-950/20">
                  <td className="py-3 px-4 text-white font-mono">2026-06-03</td>
                  <td className="py-3 px-4 text-emerald-300 font-mono">3</td>
                  <td className="py-3 px-4 text-amber-300 font-mono font-bold">2026-05-31 (Constant!)</td>
                  <td className="py-3 px-4 text-emerald-400">Island 1 (Day 3)</td>
                </tr>
                <tr className="hover:bg-rose-950/40 bg-rose-950/30 border-y-2 border-rose-600">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">2026-06-04 (ABSENT!)</td>
                  <td className="py-3 px-4 text-slate-500 font-mono">[No Row]</td>
                  <td className="py-3 px-4 text-rose-400 font-mono font-bold">⚠️ GAP CREATED!</td>
                  <td className="py-3 px-4 text-rose-400 font-bold">Inactivity Gap (1 Day)</td>
                </tr>
                <tr className="hover:bg-slate-800/40 bg-cyan-950/20">
                  <td className="py-3 px-4 text-white font-mono">2026-06-05</td>
                  <td className="py-3 px-4 text-cyan-300 font-mono">4</td>
                  <td className="py-3 px-4 text-cyan-300 font-mono font-bold">2026-06-01 (NEW ANCHOR!)</td>
                  <td className="py-3 px-4 text-cyan-400">Island 2 (Day 1)</td>
                </tr>
                <tr className="hover:bg-slate-800/40 bg-cyan-950/20">
                  <td className="py-3 px-4 text-white font-mono">2026-06-06</td>
                  <td className="py-3 px-4 text-cyan-300 font-mono">5</td>
                  <td className="py-3 px-4 text-cyan-300 font-mono font-bold">2026-06-01 (NEW ANCHOR!)</td>
                  <td className="py-3 px-4 text-cyan-400">Island 2 (Day 2)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Constant Group Anchors &amp; Timeline
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Visualizing how the difference method creates constant grouping keys.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Constant Anchor Math */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Mathematical Cancellation Creating Constant Anchor Date
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Island 1 */}
                  <g>
                    <rect x="30" y="30" width="370" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="215" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Island 1: June 01, 02, 03 (3 Days Streak)</text>
                    <rect x="45" y="70" width="340" height="40" rx="4" fill="#022c22" />
                    <text x="215" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Jun 01 - 1 = May 31 | Jun 02 - 2 = May 31 | Jun 03 - 3 = May 31</text>
                    <text x="215" y="102" fill="#34d399" fontSize="7 font-bold text-mono" textAnchor="middle">Constant Group Key: '2026-05-31'</text>
                  </g>

                  {/* Island 2 */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                    <text x="630" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">Island 2: June 05, 06 (2 Days Streak)</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#0f172a" />
                    <text x="630" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Jun 05 - 4 = Jun 01 | Jun 06 - 5 = Jun 01</text>
                    <text x="630" y="102" fill="#818cf8" fontSize="7 font-bold text-mono" textAnchor="middle">Constant Group Key: '2026-06-01'</text>
                  </g>

                  {/* Gap Barrier */}
                  <path d="M 420 20 L 420 140" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
                </svg>
              </div>
            </div>

            {/* SVG 2: Timeline */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-amber-400 font-mono">Diagram B:</span> Continuous Streak Islands vs Inactivity Gaps Timeline
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Island 1 Box */}
                  <g>
                    <rect x="30" y="30" width="280" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="170" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">🏝️ Island 1 (3 Days Present)</text>
                    <rect x="45" y="70" width="250" height="40" rx="4" fill="#022c22" />
                    <text x="170" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Jun 01 → Jun 02 → Jun 03</text>
                    <text x="170" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Streak: 3 Consecutive Days</text>
                  </g>

                  {/* Gap Box */}
                  <g>
                    <rect x="330" y="30" width="190" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="425" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">🕳️ Inactivity Gap</text>
                    <rect x="345" y="70" width="160" height="40" rx="4" fill="#1e293b" />
                    <text x="425" y="88" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">June 04 (Absent!)</text>
                    <text x="425" y="102" fill="#fca5a5" fontSize="7 font-bold" textAnchor="middle">Duration: 1 Day</text>
                  </g>

                  {/* Island 2 Box */}
                  <g>
                    <rect x="540" y="30" width="280" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="680" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">🏝️ Island 2 (2 Days Present)</text>
                    <rect x="555" y="70" width="250" height="40" rx="4" fill="#022c22" />
                    <text x="680" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Jun 05 → Jun 06</text>
                    <text x="680" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Streak: 2 Consecutive Days</text>
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
              4. Interactive Gaps &amp; Islands Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test the Date-RowNumber difference method, gap isolation, longest streak leaderboards, and uptime incident aggregation live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(islandScenarios).map(([key, item]) => {
              const isActive = selectedIslandScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedIslandScenario(key)}
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
                        item.badgeColor === "rose" && "bg-rose-950 text-rose-400 border border-rose-800",
                        item.badgeColor === "cyan" && "bg-cyan-950 text-cyan-400 border border-cyan-800",
                        item.badgeColor === "amber" && "bg-amber-950 text-amber-400 border border-amber-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Island Model" : "○ Run Streak Algorithm"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{islandScenarios[selectedIslandScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{islandScenarios[selectedIslandScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Gaps &amp; Islands Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Sequence Algorithm</span>
                <span className="text-emerald-400">Date-RowNumber Anchor Math</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {islandScenarios[selectedIslandScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Streak / Incident ID</th>
                    <th className="py-3 px-4 text-white">Student / Entity</th>
                    <th className="py-3 px-4 text-emerald-400">Group Anchor Key / Dept</th>
                    <th className="py-3 px-4 text-cyan-400">Start Date / Time</th>
                    <th className="py-3 px-4 text-indigo-400">End Date / Time</th>
                    <th className="py-3 px-4 text-amber-400">Duration / Length</th>
                    <th className="py-3 px-4 text-emerald-400">Streak Badge / Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {islandScenarios[selectedIslandScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.name}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.anchor}</td>
                      <td className="py-3 px-4 text-slate-300 font-bold">{row.start}</td>
                      <td className="py-3 px-4 text-indigo-300 font-bold">{row.end}</td>
                      <td className="py-3 px-4 text-amber-300 font-sans">{row.days}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[11px] font-sans font-medium border bg-emerald-950 text-emerald-400 border-emerald-800">
                          {row.badge}
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
              Real-world attendance streak badges and critical absence gap alerts.
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
                  Automated 30-Day Attendance Streak Badge Allocation in Barrackpore
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Academy ERP</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui automated the academy's student gamification system: Using the Date-RowNumber Difference Method inside an overnight scheduled event, the database aggregates daily attendance into islands, automatically awarding the "30-Day Golden Persistence Badge" to students whose active streak reaches 30 consecutive days without human intervention!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- ✅ Automated 30-Day Streak Award Trigger:
WITH Islands AS (
    SELECT student_id, DATE_SUB(att_date, INTERVAL ROW_NUMBER() OVER (PARTITION BY student_id ORDER BY att_date) DAY) AS anchor
    FROM daily_attendance WHERE is_present = 1
)
INSERT INTO student_badges (student_id, badge_name)
SELECT student_id, '🌟 30-Day Golden Persistence Badge'
FROM Islands GROUP BY student_id, anchor HAVING COUNT(*) >= 30;`}
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
              Avoid duplicate daily records and multi-student partition bleeds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Duplicate Dates Breaking Row Number Stepping
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                If raw attendance contains 2 records for the same student on the same day, `ROW_NUMBER()` increments by 2 while the date increments by 0, corrupting the constant anchor date.
              </p>
              <div className="text-xs text-slate-400">
                Fix: Always deduplicate with <code className="text-emerald-400 font-mono">DISTINCT</code> or <code className="text-emerald-400 font-mono">GROUP BY</code> first!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Always Partition by Entity ID
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Always specify <code className="text-emerald-400 font-mono">PARTITION BY student_id</code> in the `ROW_NUMBER()` calculation to prevent attendance records of different students from bleeding together.
              </p>
              <div className="text-xs text-slate-400">
                Maintains clean student boundary isolation.
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
              Key takeaways for Gaps and Islands problems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Gaps &amp; Islands Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Use the Difference Method: <code className="text-cyan-300 font-mono">date - INTERVAL ROW_NUMBER() DAY</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Group by <code className="text-cyan-300 font-mono">student_id, island_anchor</code> to aggregate streak start, end, and days.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Use <code className="text-cyan-300 font-mono">LAG()</code> with <code className="text-cyan-300 font-mono">DATEDIFF &gt; 1</code> to isolate inactivity gaps.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Pre-deduplicate raw records to exactly 1 row per student per day.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe consecutive integer IDs...”</span>
                  The difference method also solves missing invoice numbers: <code className="text-cyan-300 font-mono">invoice_num - ROW_NUMBER() OVER (ORDER BY invoice_num)</code> groups uninterrupted invoice sequences!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about sessionization...”</span>
                  You can sessionize web clickstream logs by creating new islands whenever the time between page views exceeds 30 minutes!
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
              Comprehensive reference questions covering Gaps and Islands, the Date-RowNumber difference method, streak grouping, gap interval isolation, and incident aggregation.
            </p>
          </div>

          <FAQTemplate
            title="Gaps &amp; Islands Problems FAQs"
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
            title="Solving Gaps and Islands Problems in Time-Series and Transaction Logs"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic11_note.txt"
          />

          <Teacher
            note="The Gaps and Islands problem is a classic database puzzle with an elegant mathematical solution. The key insight is that when consecutive dates and ROW_NUMBER() increment at the same rate, their subtraction creates a constant anchor key for all rows in the same streak. Grouping by this anchor allows you to compute start dates, end dates, and streak lengths in a single pass without procedural loops!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic11;
