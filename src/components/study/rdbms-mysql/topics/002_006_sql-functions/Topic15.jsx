import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic15_files/topic15_questions";
import noteText from "./topic15_files/topic15_note.txt?raw";

/**
 * Topic15 – Handling NULLs in Aggregations and GROUP BY
 * Module: 002_006_sql-functions (Built-in Functions, Grouping & Aggregations)
 *
 * @component
 * @returns {JSX.Element} Comprehensive educational component for NULL handling in SQL aggregations.
 */
const Topic15 = () => {
  // Interactive Simulator State
  const [selectedScenario, setSelectedScenario] = useState("average_distortion_simulator");

  const scenarios = {
    average_distortion_simulator: {
      title: "1. The Average Distortion Sandbox: AVG() vs AVG(COALESCE())",
      badge: "Statistical Mean Semantics",
      badgeColor: "rose",
      sqlQuery: `-- Calculating mean score across 4 candidates (Mamata: 100%, Susmita: 80%, Abhronila: 60%, Debangshu: NULL [Absent])

-- Query A: Standard AVG() &rarr; Ignores Debangshu (Divisor = 3)
SELECT 
    ROUND(AVG(marks_pct), 2) AS attendee_mean_score
FROM exam_submissions; -- Result: (100+80+60)/3 = 80.00%

-- Query B: COALESCE(marks, 0) -&gt; Penalizes absence as 0 (Divisor = 4)
SELECT 
    ROUND(AVG(COALESCE(marks_pct, 0.0)), 2) AS cohort_mean_score
FROM exam_submissions; -- Result: (100+80+60+0)/4 = 60.00%`,
      resultRows: [
        { student: "Mamata Hui", scoreRaw: "100.0%", scoreCoalesced: "100.0%", note: "Present & Examined", status: "Included (Both)" },
        { student: "Susmita Sen", scoreRaw: "80.0%", scoreCoalesced: "80.0%", note: "Present & Examined", status: "Included (Both)" },
        { student: "Abhronila Saha", scoreRaw: "60.0%", scoreCoalesced: "60.0%", note: "Present & Examined", status: "Included (Both)" },
        { student: "Debangshu Roy", scoreRaw: "NULL (Absent)", scoreCoalesced: "0.0% (Defaulted)", note: "Medical Leave / Absent", status: "Excluded in A, 0 in B" },
      ],
      metricA: "80.00% (Divisor: 3 students)",
      metricB: "60.00% (Divisor: 4 students)",
      explanation:
        "Standard AVG(col) skips NULL rows, calculating the average among attendees only (80%). AVG(COALESCE(col, 0)) converts NULLs into 0, computing the full institutional cohort mean (60%).",
    },
    count_semantics_sandbox: {
      title: "2. COUNT(*) vs COUNT(col) vs COUNT(DISTINCT col)",
      badge: "Row Counting Rules",
      badgeColor: "cyan",
      sqlQuery: `SELECT 
    centre_city,
    COUNT(*) AS total_registered_rows,
    COUNT(fee_amount_inr) AS fee_paying_students,
    COUNT(*) - COUNT(fee_amount_inr) AS scholarship_null_count,
    COUNT(DISTINCT course_stream) AS distinct_active_streams
FROM student_enrollments
GROUP BY centre_city;`,
      resultRows: [
        { student: "Barrackpore Campus", scoreRaw: "50 Registered", scoreCoalesced: "42 Paid Fees", note: "8 Scholarship (NULL fees)", status: "4 Distinct Streams" },
        { student: "Kolkata Central", scoreRaw: "65 Registered", scoreCoalesced: "60 Paid Fees", note: "5 Scholarship (NULL fees)", status: "5 Distinct Streams" },
        { student: "Ichapur Tech Hub", scoreRaw: "30 Registered", scoreCoalesced: "24 Paid Fees", note: "6 Scholarship (NULL fees)", status: "3 Distinct Streams" },
        { student: "Unassigned City (NULL)", scoreRaw: "5 Registered", scoreCoalesced: "0 Paid Fees", note: "5 Scholarship (NULL fees)", status: "1 Distinct Stream" },
      ],
      metricA: "COUNT(*) counts ALL physical rows",
      metricB: "COUNT(col) counts ONLY non-NULL values",
      explanation:
        "COUNT(*) counts all physical tuples including rows with NULLs. COUNT(fee_amount_inr) strictly counts non-NULL rows. Subtracting the two gives the exact number of scholarship students!",
    },
    nullable_addition_pitfall: {
      title: "3. The Nullable Addition Trap: SUM(fee + lab_fee)",
      badge: "Arithmetic Nullification",
      badgeColor: "amber",
      sqlQuery: `-- ❌ BROKEN: If lab_fee is NULL, (fee + NULL) becomes NULL, discarding the entire student fee!
SELECT SUM(tuition_fee_inr + lab_fee_inr) AS dangerous_total
FROM student_fees;

-- ✓ SAFE PRODUCTION FIX: Coalesce each column individually before adding:
SELECT SUM(COALESCE(tuition_fee_inr, 0) + COALESCE(lab_fee_inr, 0)) AS safe_total_inr
FROM student_fees;`,
      resultRows: [
        { student: "Mamata (Tuition: ₹20k, Lab: ₹5k)", scoreRaw: "₹25,000", scoreCoalesced: "₹25,000", note: "Both known", status: "Safe" },
        { student: "Susmita (Tuition: ₹20k, Lab: NULL)", scoreRaw: "NULL (Discarded!)", scoreCoalesced: "₹20,000", note: "No lab required", status: "Saved by COALESCE" },
        { student: "Abhronila (Tuition: ₹15k, Lab: ₹3k)", scoreRaw: "₹18,000", scoreCoalesced: "₹18,000", note: "Both known", status: "Safe" },
        { student: "Debangshu (Tuition: NULL, Lab: ₹5k)", scoreRaw: "NULL (Discarded!)", scoreCoalesced: "₹5,000", note: "Full tuition waiver", status: "Saved by COALESCE" },
      ],
      metricA: "Broken SUM: ₹43,000 (Lost ₹25k!)",
      metricB: "Coalesced SUM: ₹68,000 (100% Accurate)",
      explanation:
        "In SQL arithmetic, 20000 + NULL = NULL. Wrapping columns in COALESCE(col, 0) before addition ensures no student fees are accidentally lost from institutional financial statements.",
    },
    division_by_zero_nullif: {
      title: "4. Preventing Crash on Division by Zero with NULLIF()",
      badge: "Defensive Math Functions",
      badgeColor: "emerald",
      sqlQuery: `SELECT 
    centre_city,
    SUM(fee_amount_inr) AS total_revenue_inr,
    COUNT(student_id) AS student_headcount,
    -- NULLIF returns NULL if headcount = 0, avoiding a runtime divide-by-zero crash:
    ROUND(SUM(fee_amount_inr) / NULLIF(COUNT(student_id), 0), 2) AS avg_revenue_per_student
FROM campus_branches
GROUP BY centre_city;`,
      resultRows: [
        { student: "Barrackpore Campus", scoreRaw: "₹15,50,000", scoreCoalesced: "62 Students", note: "Healthy branch", status: "₹25,000.00 / student" },
        { student: "Kolkata Central", scoreRaw: "₹18,00,000", scoreCoalesced: "72 Students", note: "Healthy branch", status: "₹25,000.00 / student" },
        { student: "New Town Hub (Under Setup)", scoreRaw: "₹0", scoreCoalesced: "0 Students", note: "Headcount is 0", status: "Safely returns NULL" },
      ],
      metricA: "Without NULLIF: Error 1365 (Division by zero)",
      metricB: "With NULLIF: Gracefully yields NULL",
      explanation:
        "Using NULLIF(count, 0) converts a zero denominator into NULL, causing SQL division to return NULL cleanly instead of throwing a fatal execution error.",
    },
  };

  const navItems = [
    { id: "theory", label: "1. Three-Valued Logic & NULL Rules" },
    { id: "aggregate-behavior", label: "2. NULLs in Aggregate Functions" },
    { id: "svg-diagrams", label: "3. Visual NULL Pipelines" },
    { id: "interactive-sandbox", label: "4. Live NULL Simulator" },
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
            <span>Module 002_006</span>
            <span>•</span>
            <span>Topic 15 of 15 (Module Finale)</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Robust Data Quality & NULL Semantics
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Handling NULLs in Aggregations & GROUP BY
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master SQL's Three-Valued Logic in analytical queries. Learn how{" "}
            <code className="text-cyan-300 font-mono font-bold">COUNT(*)</code> vs{" "}
            <code className="text-cyan-300 font-mono font-bold">COUNT(col)</code> differ, avoid the insidious{" "}
            <code className="text-rose-400 font-mono font-bold">Average Distortion Bug</code>, and guard arithmetic calculations with{" "}
            <code className="text-emerald-300 font-mono font-bold">COALESCE()</code> and{" "}
            <code className="text-emerald-300 font-mono font-bold">NULLIF()</code>.
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
        {/* SECTION 1: Three-Valued Logic Foundation */}
        <section id="theory" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Three-Valued Logic (3VL) & Relational NULL Semantics
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              NULL represents the absence of a value. It behaves fundamentally differently from 0, false, or blank text.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="text-cyan-400 font-mono text-xs font-bold uppercase mb-2">Rule 01: Comparisons</div>
              <h3 className="text-base font-bold text-white mb-2">Equality Yields UNKNOWN</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Writing <code className="text-rose-400 font-mono">col = NULL</code> or <code className="text-rose-400 font-mono">col &lt;&gt; NULL</code> evaluates to <strong>UNKNOWN</strong>. You must always use <code className="text-emerald-400 font-mono">IS NULL</code> or <code className="text-emerald-400 font-mono">IS NOT NULL</code>.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/30 transition-all duration-300 shadow-xl">
              <div className="text-emerald-400 font-mono text-xs font-bold uppercase mb-2">Rule 02: Arithmetic</div>
              <h3 className="text-base font-bold text-white mb-2">NULL Contagion / Poisoning</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Any standard arithmetic operation involving NULL yields NULL (<code className="text-amber-300 font-mono">100 + NULL = NULL</code>). Individual nullable columns must be wrapped in <code className="text-emerald-400 font-mono">COALESCE()</code> before math.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/30 transition-all duration-300 shadow-xl">
              <div className="text-indigo-400 font-mono text-xs font-bold uppercase mb-2">Rule 03: Grouping</div>
              <h3 className="text-base font-bold text-white mb-2">NULL Equality in GROUP BY</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                For the specific purpose of <code className="text-cyan-300 font-mono">GROUP BY</code>, all NULL values are considered equal and collapse into a single unified <code className="text-cyan-300 font-mono">[NULL]</code> group bucket.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: NULL Behavior in Aggregates */}
        <section id="aggregate-behavior" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. NULL Behavior Across Core Aggregate Functions
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing how COUNT, SUM, AVG, MIN, and MAX treat missing values.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-slate-100 font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4 font-mono text-cyan-400">Aggregate Function</th>
                  <th className="py-3.5 px-4 font-mono text-emerald-400">Treatment of NULLs</th>
                  <th className="py-3.5 px-4 font-mono text-amber-400">Result When Entire Set is NULL</th>
                  <th className="py-3.5 px-4 font-mono text-indigo-400">Production Defense Pattern</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs sm:text-sm font-mono">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white">COUNT(*)</td>
                  <td className="py-3 px-4 text-emerald-400 font-sans">Counts ALL physical rows (never ignores NULLs)</td>
                  <td className="py-3 px-4 text-cyan-300">Row count of group (e.g. 5)</td>
                  <td className="py-3 px-4 text-slate-400">None needed</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white">COUNT(column)</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Counts ONLY rows where column is NOT NULL</td>
                  <td className="py-3 px-4 text-emerald-400">0</td>
                  <td className="py-3 px-4 text-slate-400">COUNT(*) - COUNT(col) for null count</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white">SUM(column)</td>
                  <td className="py-3 px-4 text-cyan-300 font-sans">Ignores (skips) all NULL values</td>
                  <td className="py-3 px-4 text-rose-400 font-bold">NULL</td>
                  <td className="py-3 px-4 text-emerald-400">COALESCE(SUM(col), 0.00)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white">AVG(column)</td>
                  <td className="py-3 px-4 text-rose-300 font-sans">Ignores NULLs from both sum and divisor</td>
                  <td className="py-3 px-4 text-rose-400 font-bold">NULL</td>
                  <td className="py-3 px-4 text-emerald-400">AVG(COALESCE(col, 0)) if penalized</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white">MIN() / MAX()</td>
                  <td className="py-3 px-4 text-cyan-300 font-sans">Ignores NULLs entirely</td>
                  <td className="py-3 px-4 text-rose-400 font-bold">NULL</td>
                  <td className="py-3 px-4 text-emerald-400">COALESCE(MIN(col), 0)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: SVG Visual Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: The Average Distortion Dilemma
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing how SQL evaluates standard AVG() versus COALESCE-based cohort averaging.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-cyan-400 font-mono">Diagram A:</span> Denominator Inclusion vs Exclusion in Mean Scores
            </h3>
            <p className="text-xs text-slate-400">
              Exam marks: Mamata (100%), Susmita (80%), Abhronila (60%), Debangshu (NULL - Absent).
            </p>

            <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
              <svg viewBox="0 0 850 280" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                {/* Left Box: Standard AVG(marks) */}
                <g>
                  <rect x="30" y="20" width="370" height="230" rx="10" fill="#0f172a" stroke="#0ea5e9" strokeWidth="2" />
                  <text x="215" y="48" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">Method A: Standard AVG(marks_pct)</text>
                  <text x="215" y="68" fill="#94a3b8" fontSize="10" textAnchor="middle">Calculates Attendee Average (Excludes Absentees)</text>

                  {/* Student Rows */}
                  <rect x="50" y="85" width="330" height="26" rx="4" fill="#1e293b" stroke="#059669" />
                  <text x="60" y="102" fill="#e2e8f0" fontSize="10">Mamata: 100% (Included)</text>

                  <rect x="50" y="115" width="330" height="26" rx="4" fill="#1e293b" stroke="#059669" />
                  <text x="60" y="132" fill="#e2e8f0" fontSize="10">Susmita: 80% (Included)</text>

                  <rect x="50" y="145" width="330" height="26" rx="4" fill="#1e293b" stroke="#059669" />
                  <text x="60" y="162" fill="#e2e8f0" fontSize="10">Abhronila: 60% (Included)</text>

                  <rect x="50" y="175" width="330" height="26" rx="4" fill="#334155" stroke="#f43f5e" strokeDasharray="3 2" />
                  <text x="60" y="192" fill="#fb7185" fontSize="10">Debangshu: NULL (Ignored from count!)</text>

                  <rect x="50" y="210" width="330" height="30" rx="4" fill="#0369a1" />
                  <text x="215" y="229" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Formula: (100 + 80 + 60) / 3 = 80.00%</text>
                </g>

                {/* Right Box: AVG(COALESCE(marks, 0)) */}
                <g>
                  <rect x="450" y="20" width="370" height="230" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                  <text x="635" y="48" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">Method B: AVG(COALESCE(marks_pct, 0))</text>
                  <text x="635" y="68" fill="#94a3b8" fontSize="10" textAnchor="middle">Calculates Full Cohort Mean (Penalizes Absence as 0)</text>

                  {/* Student Rows */}
                  <rect x="470" y="85" width="330" height="26" rx="4" fill="#1e293b" stroke="#059669" />
                  <text x="480" y="102" fill="#e2e8f0" fontSize="10">Mamata: 100% (Included)</text>

                  <rect x="470" y="115" width="330" height="26" rx="4" fill="#1e293b" stroke="#059669" />
                  <text x="480" y="132" fill="#e2e8f0" fontSize="10">Susmita: 80% (Included)</text>

                  <rect x="470" y="145" width="330" height="26" rx="4" fill="#1e293b" stroke="#059669" />
                  <text x="480" y="162" fill="#e2e8f0" fontSize="10">Abhronila: 60% (Included)</text>

                  <rect x="470" y="175" width="330" height="26" rx="4" fill="#1e293b" stroke="#fbbf24" />
                  <text x="480" y="192" fill="#fde047" fontSize="10">Debangshu: 0% (Coalesced to 0)</text>

                  <rect x="470" y="210" width="330" height="30" rx="4" fill="#047857" />
                  <text x="635" y="229" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Formula: (100 + 80 + 60 + 0) / 4 = 60.00%</text>
                </g>
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Simulator */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive NULL Aggregation Sandbox
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Select an edge-case scenario to observe SQL NULL arithmetic and aggregate execution live.
            </p>
          </div>

          {/* Scenario Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {Object.entries(scenarios).map(([key, item]) => {
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
                &gt;
                  <div>
                    <span
                      className={clsx(
                        "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
                        item.badgeColor === "rose" && "bg-rose-950 text-rose-400 border border-rose-800",
                        item.badgeColor === "cyan" && "bg-cyan-950 text-cyan-400 border border-cyan-800",
                        item.badgeColor === "amber" && "bg-amber-950 text-amber-400 border border-amber-800",
                        item.badgeColor === "emerald" && "bg-emerald-950 text-emerald-400 border border-emerald-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Live" : "○ Run Simulator"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{scenarios[selectedScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{scenarios[selectedScenario].explanation}</p>
              </div>
            </div>

            {/* SQL Query Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Engine Query Input</span>
                <span className="text-emerald-400">ANSI 3VL Compliant</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {scenarios[selectedScenario].sqlQuery}
              </pre>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-400 font-mono">Computed Metric A</span>
                <div className="text-base sm:text-lg font-bold text-cyan-300 mt-1">
                  {scenarios[selectedScenario].metricA}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-400 font-mono">Computed Metric B</span>
                <div className="text-base sm:text-lg font-bold text-emerald-400 mt-1">
                  {scenarios[selectedScenario].metricB}
                </div>
              </div>
            </div>

            {/* Breakdown Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4 font-mono text-cyan-400">Entity / Candidate</th>
                    <th className="py-3 px-4 font-mono text-amber-400">Raw Attribute</th>
                    <th className="py-3 px-4 font-mono text-emerald-400">Coalesced / Treated</th>
                    <th className="py-3 px-4 font-mono text-indigo-400">Audit Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {scenarios[selectedScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-semibold text-white font-sans">{row.student}</td>
                      <td className="py-3 px-4 text-amber-300">{row.scoreRaw}</td>
                      <td className="py-3 px-4 text-emerald-300 font-bold">{row.scoreCoalesced}</td>
                      <td className="py-3 px-4 text-indigo-300">{row.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 5: Production Industry Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Production Industry Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Real-world patterns handling incomplete profiles, scholarship fee waivers, and telemetry data.
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
                  Academy Scholarship & Fee Waiver Reporting
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore, Kolkata</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui generates the scholarship audit breakdown showing fee-paying candidates (Mamata, Susmita, Abhronila) vs 100% merit-waived candidates (Debangshu, Mahima) where tuition fees are NULL in the database.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`SELECT 
    COALESCE(centre_city, 'General Campus') AS campus,
    COUNT(*) AS total_registered_candidates,
    COUNT(fee_amount_inr) AS paying_students_count,
    COUNT(*) - COUNT(fee_amount_inr) AS scholarship_waived_count,
    COALESCE(SUM(fee_amount_inr), 0.00) AS total_collected_revenue_inr,
    ROUND(COALESCE(AVG(fee_amount_inr), 0.00), 2) AS avg_fee_per_paying_student,
    ROUND(AVG(COALESCE(fee_amount_inr, 0.00)), 2) AS cohort_wide_per_capita_inr
FROM student_admissions
GROUP BY centre_city;`}
              </pre>
            </div>

            {/* Case Study 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="p-1.5 rounded bg-cyan-950 text-cyan-400 font-mono text-xs border border-cyan-800">
                    CASE 02
                  </span>
                  E-Commerce Discount & Tax Multi-Component Aggregation
                </h3>
                <span className="text-xs text-slate-400 font-mono">Sector: Billing Engine</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Safely calculating net order values when coupons, shipping fees, or gift vouchers are nullable.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-cyan-300 border border-slate-800 overflow-x-auto">
{`SELECT 
    customer_id,
    COUNT(order_id) AS total_orders,
    SUM(
        COALESCE(item_subtotal_inr, 0)
        + COALESCE(shipping_fee_inr, 0)
        + COALESCE(gst_tax_inr, 0)
        - COALESCE(promo_discount_inr, 0)
    ) AS total_net_spend_inr
FROM customer_orders
WHERE payment_status = 'COMPLETED'
GROUP BY customer_id;`}
              </pre>
            </div>
          </div>
        </section>

        {/* SECTION 6: Senior Pitfalls & Best Practices */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Senior Pitfalls & Schema Design Best Practices
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Eliminate NULL bugs before they reach production applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Defensive Aggregate Null Wrapping
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                In microservice architectures, an API expecting a numeric JSON value like <code className="text-cyan-300 font-mono">"revenue": 0</code> will throw a JSON parser error if the database returns <code className="text-rose-400 font-mono">"revenue": null</code> on an empty table partition.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-emerald-300">
                SELECT COALESCE(SUM(fee_amount_inr), 0.00) AS safe_revenue ...
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Schema-Level NOT NULL Enforcement
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Whenever possible, declare numeric metric columns as <code className="text-emerald-400 font-mono">NOT NULL DEFAULT 0</code>. This completely removes the risk of arithmetic null poisoning at the storage engine level.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-emerald-300">
                fee_amount_inr DECIMAL(10,2) NOT NULL DEFAULT 0.00
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
                  <span><code className="text-cyan-300 font-mono">COUNT(*)</code> counts all rows; <code className="text-cyan-300 font-mono">COUNT(col)</code> ignores NULLs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span><code className="text-cyan-300 font-mono">SUM()</code> and <code className="text-cyan-300 font-mono">AVG()</code> ignore NULLs; if all rows are NULL, they return NULL.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Use <code className="text-cyan-300 font-mono">AVG(COALESCE(col, 0))</code> when missing entries should be counted as zero in the denominator.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Use <code className="text-emerald-300 font-mono">NULLIF(denominator, 0)</code> to prevent fatal division by zero errors.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe GROUP BY grouping of NULLs...”</span>
                  Even though <code className="text-rose-300 font-mono">NULL = NULL</code> is UNKNOWN in WHERE, in GROUP BY all NULLs are gathered into a single shared group bucket.
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about multi-column additions...”</span>
                  Never write <code className="text-rose-300 font-mono">SUM(colA + colB)</code> without coalescing both columns first; a single NULL will zero out the whole sum for that row!
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
              Comprehensive reference questions covering 3VL, aggregate NULL behavior, sorting, and edge cases.
            </p>
          </div>

          <FAQTemplate
            title="Handling NULLs in Aggregations & GROUP BY FAQs"
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
            title="Handling NULLs in Aggregations and GROUP BY"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic15_note.txt"
          />

          <Teacher
            note="NULL handling is where even experienced developers make silent statistical errors. Always remember the Average Distortion Bug: if 10 students enroll in a course and 2 miss the test, AVG(marks) computes the average of only the 8 test takers. If your institutional policy requires absentees to be penalized as 0, you MUST use AVG(COALESCE(marks, 0)). Also, always protect your division queries with NULLIF(divisor, 0) to ensure zero-downtime database reliability."
          />
        </section>
      </main>
    </div>
  );
};

export default Topic15;
