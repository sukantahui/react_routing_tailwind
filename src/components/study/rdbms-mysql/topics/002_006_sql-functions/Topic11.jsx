import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic11_files/topic11_questions";
import noteText from "./topic11_files/topic11_note.txt?raw";

/**
 * Topic11 – The GROUP BY Clause: Mechanics of Grouping and Column Selection Rules
 * Module: 002_006_sql-functions (Built-in Functions, Grouping & Aggregations)
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive GROUP BY Simulator Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic11 = () => {
  const sectionRefs = useRef([]);

  // Interactive Simulator State
  const [selectedGroupMode, setSelectedGroupMode] = useState("mode_city_summary"); // "mode_city_summary" | "mode_date_cohort" | "mode_payment_gateway" | "mode_case_tier"

  const groupScenarios = {
    mode_city_summary: {
      title: "1. City-Wise Student Enrollment & Revenue (GROUP BY city)",
      sqlQuery: `SELECT 
    centre_city,
    COUNT(*) AS total_enrolled_students,
    SUM(fee_amount_inr) AS total_revenue_collected_inr,
    ROUND(AVG(fee_amount_inr), 2) AS average_fee_per_student_inr,
    MIN(fee_amount_inr) AS min_fee_inr,
    MAX(fee_amount_inr) AS max_fee_inr
FROM student_admissions
WHERE registration_status = 'CONFIRMED'
GROUP BY centre_city
ORDER BY total_revenue_collected_inr DESC;`,
      resultRows: [
        { group: "Kolkata Central", count: "120 Students", revenue: "₹6,60,000.00", avg: "₹5,500.00", range: "₹4,000 - ₹8,000", badgeColor: "emerald" },
        { group: "Barrackpore Campus", count: "85 Students", revenue: "₹4,25,000.00", avg: "₹5,000.00", range: "₹3,500 - ₹7,000", badgeColor: "emerald" },
        { group: "Jadavpur Tech Hub", count: "60 Students", revenue: "₹3,60,000.00", avg: "₹6,000.00", range: "₹5,000 - ₹8,500", badgeColor: "cyan" },
        { group: "Ichapur Learning Center", count: "45 Students", revenue: "₹2,02,500.00", avg: "₹4,500.00", range: "₹3,000 - ₹6,000", badgeColor: "cyan" },
      ],
      verdictText: "✓ BUCKETED & AGGREGATED",
      badgeColor: "emerald",
      explanation: "Rows are partitioned into distinct buckets based on centre_city. Each group computes independent counts, sums, and averages.",
    },
    mode_date_cohort: {
      title: "2. Admission Cohorts by Year & Quarter (GROUP BY Expressions)",
      sqlQuery: `SELECT 
    YEAR(admission_date) AS cohort_year,
    CONCAT('Q', QUARTER(admission_date)) AS cohort_quarter,
    COUNT(*) AS new_admissions_count,
    SUM(fee_amount_inr) AS quarterly_revenue_inr
FROM student_admissions
GROUP BY YEAR(admission_date), QUARTER(admission_date)
ORDER BY cohort_year DESC, QUARTER(admission_date) DESC;`,
      resultRows: [
        { group: "2026 - Q3 (Jul-Sep)", count: "110 Admissions", revenue: "₹5,75,000.00", avg: "Current Active Quarter", range: "Peak Season", badgeColor: "cyan" },
        { group: "2026 - Q2 (Apr-Jun)", count: "95 Admissions", revenue: "₹4,90,000.00", avg: "Summer Intake", range: "Strong Growth", badgeColor: "cyan" },
        { group: "2026 - Q1 (Jan-Mar)", count: "70 Admissions", revenue: "₹3,50,000.00", avg: "Spring Intake", range: "Baseline", badgeColor: "indigo" },
        { group: "2025 - Q4 (Oct-Dec)", count: "65 Admissions", revenue: "₹3,10,000.00", avg: "Winter Intake", range: "Historical", badgeColor: "indigo" },
      ],
      verdictText: "✓ TEMPORAL EXPRESSIONS GROUPED",
      badgeColor: "cyan",
      explanation: "GROUP BY evaluates scalar date functions (YEAR and QUARTER) per row, grouping student admissions into quarterly analytical cohorts.",
    },
    mode_payment_gateway: {
      title: "3. Payment Gateway Channel Breakdown",
      sqlQuery: `SELECT 
    payment_mode,
    COUNT(*) AS total_transactions,
    SUM(amount_paid_inr) AS total_settlement_inr,
    ROUND(AVG(amount_paid_inr), 2) AS average_ticket_size_inr,
    GROUP_CONCAT(DISTINCT issuing_bank SEPARATOR ', ') AS supported_banks
FROM payment_transactions
GROUP BY payment_mode
ORDER BY total_settlement_inr DESC;`,
      resultRows: [
        { group: "UPI (GPay / PhonePe)", count: "210 Txns", revenue: "₹10,50,000.00", avg: "₹5,000.00", range: "SBI, HDFC, ICICI, Axis", badgeColor: "indigo" },
        { group: "Net Banking", count: "65 Txns", revenue: "₹4,55,000.00", avg: "₹7,000.00", range: "HDFC, PNB, SBI", badgeColor: "indigo" },
        { group: "Credit / Debit Card", count: "35 Txns", revenue: "₹2,80,000.00", avg: "₹8,000.00", range: "Visa, Mastercard, RuPay", badgeColor: "amber" },
      ],
      verdictText: "✓ SETTLEMENT AUDITED",
      badgeColor: "indigo",
      explanation: "Partitions payment records by payment_mode, calculating transaction counts, settlement totals, and comma-separated banking channels.",
    },
    mode_case_tier: {
      title: "4. Student Performance Tier Bucketing (GROUP BY CASE)",
      sqlQuery: `SELECT 
    CASE 
        WHEN marks_pct &ge; 85 THEN 'Distinction (85%+)'
        WHEN marks_pct >= 60 THEN 'First Class (60%-84%)'
        WHEN marks_pct >= 40 THEN 'Pass Tier (40%-59%)'
        ELSE 'Needs Re-assessment (<40%)'
    END AS academic_tier,
    COUNT(*) AS students_count,
    ROUND(AVG(marks_pct), 2) AS tier_average_pct
FROM semester_exam_results
GROUP BY academic_tier
ORDER BY tier_average_pct DESC;`,
      resultRows: [
        { group: "Distinction (85%+)", count: "38 Students", revenue: "92.40% Mean", avg: "Top Performers", range: "Eligible for Scholarship", badgeColor: "emerald" },
        { group: "First Class (60%-84%)", count: "82 Students", revenue: "71.60% Mean", avg: "Core Standard", range: "Standard Placement", badgeColor: "cyan" },
        { group: "Pass Tier (40%-59%)", count: "24 Students", revenue: "48.20% Mean", avg: "Remedial Coaching", range: "Basic Clearance", badgeColor: "amber" },
        { group: "Needs Re-assessment (<40%)", count: "6 Students", revenue: "31.50% Mean", avg: "Critical Attention", range: "Re-exam Scheduled", badgeColor: "rose" },
      ],
      verdictText: "✓ CONDITIONAL BUCKETS FORMED",
      badgeColor: "amber",
      explanation: "Groups records by dynamic calculated CASE expression ranges, creating categorical statistical buckets on continuous numerical scores.",
    },
  };

  const navItems = [
    { id: "theory", label: "1. Core GROUP BY Mechanics" },
    { id: "execution-order", label: "2. Logical Execution Order" },
    { id: "only-full-group-by", label: "3. ONLY_FULL_GROUP_BY Rules" },
    { id: "svg-diagram", label: "4. Grouping Pipeline SVG" },
    { id: "interactive-sandbox", label: "5. Interactive GROUP BY Sandbox" },
    { id: "case-studies", label: "6. Production Industry Case Studies" },
    { id: "pitfalls-checklist", label: "7. Senior Pitfalls & Best Practices" },
    { id: "faq-section", label: "8. Q&A / FAQs (30 Questions)" },
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
            <span>Topic 11 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Relational Grouping & Aggregations
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            The GROUP BY Clause: Mechanics & Column Selection Rules
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master relational row partitioning, SQL execution order, the strict{" "}
            <code className="text-cyan-300 font-mono font-bold">ONLY_FULL_GROUP_BY</code> standard (Error 1055), primary key functional dependency rules, and high-performance B-Tree index grouping.
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
              className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-cyan-600/30 hover:text-cyan-300 text-slate-300 transition-all border border-slate-700/50 hover:border-cyan-500/40"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        {/* SECTION 1: Core Theory */}
        <section id="theory" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Core GROUP BY Mechanics & Partitioning Logic
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The GROUP BY clause partitions unstructured relational tuples into discrete buckets sharing identical group keys, producing exactly one summary row per unique key.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/30 transition-all shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="p-2 rounded-lg bg-cyan-950/80 text-cyan-400 font-mono text-sm font-bold border border-cyan-800">
                  Partitioning
                </span>
                <h3 className="text-lg font-semibold text-white">Row Bucketing</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                MySQL scans table rows and collates records with matching group key values into separate internal hash or sorted buckets.
              </p>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <div><span className="text-cyan-400">GROUP BY</span> centre_city;</div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/30 transition-all shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="p-2 rounded-lg bg-emerald-950/80 text-emerald-400 font-mono text-sm font-bold border border-emerald-800">
                  NULL Grouping
                </span>
                <h3 className="text-lg font-semibold text-white">Single NULL Bucket</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                All rows containing <code className="text-emerald-300">NULL</code> in the grouping column are treated as identical and grouped together into a single summary group.
              </p>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <div><span className="text-slate-500">-- NULLs form 1 group:</span></div>
                <div><span className="text-emerald-400">GROUP BY</span> referral_code;</div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/30 transition-all shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="p-2 rounded-lg bg-indigo-950/80 text-indigo-400 font-mono text-sm font-bold border border-indigo-800">
                  Expressions
                </span>
                <h3 className="text-lg font-semibold text-white">Dynamic Group Keys</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                You can group by date extract expressions (<code className="text-indigo-300">YEAR(date)</code>), string functions, or conditional <code className="text-indigo-300">CASE</code> expressions.
              </p>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <div><span className="text-indigo-400">GROUP BY YEAR</span>(admission_date);</div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Logical Execution Order */}
        <section id="execution-order" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Logical SQL Execution Lifecycle & Clause Pipeline
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The RDBMS executes query clauses in a strict sequence that explains why WHERE runs before GROUP BY and HAVING runs after.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-slate-100 font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4 font-mono text-cyan-400">Step #</th>
                  <th className="py-3.5 px-4 font-mono text-cyan-400">Clause</th>
                  <th className="py-3.5 px-4">Pipeline Responsibility</th>
                  <th className="py-3.5 px-4">Can Access Aggregates?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-sans">
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono text-cyan-400 font-bold">1</td>
                  <td className="py-3 px-4 font-mono text-cyan-300 font-bold">FROM & JOIN</td>
                  <td className="py-3 px-4 text-slate-300">Identifies tables and merges related rows</td>
                  <td className="py-3 px-4 text-rose-400">No</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono text-cyan-400 font-bold">2</td>
                  <td className="py-3 px-4 font-mono text-emerald-300 font-bold">WHERE</td>
                  <td className="py-3 px-4 text-slate-300">Filters individual rows BEFORE grouping begins</td>
                  <td className="py-3 px-4 text-rose-400 font-bold">No (Error 1111)</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors bg-cyan-950/20">
                  <td className="py-3 px-4 font-mono text-cyan-400 font-bold">3</td>
                  <td className="py-3 px-4 font-mono text-cyan-300 font-bold">GROUP BY</td>
                  <td className="py-3 px-4 text-white font-bold">Partitions filtered rows into distinct groups</td>
                  <td className="py-3 px-4 text-rose-400">No (Creates groups)</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono text-cyan-400 font-bold">4</td>
                  <td className="py-3 px-4 font-mono text-amber-300 font-bold">HAVING</td>
                  <td className="py-3 px-4 text-slate-300">Filters grouped summary rows AFTER aggregation</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">Yes (e.g. HAVING COUNT(*) &gt; 5)</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono text-cyan-400 font-bold">5</td>
                  <td className="py-3 px-4 font-mono text-indigo-300 font-bold">SELECT</td>
                  <td className="py-3 px-4 text-slate-300">Computes aggregate expressions and projects columns</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">Yes (SUM, AVG, MIN, MAX)</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono text-cyan-400 font-bold">6</td>
                  <td className="py-3 px-4 font-mono text-slate-300 font-bold">ORDER BY</td>
                  <td className="py-3 px-4 text-slate-300">Sorts the final aggregated summary rows</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">Yes (ORDER BY SUM(fee) DESC)</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono text-cyan-400 font-bold">7</td>
                  <td className="py-3 px-4 font-mono text-slate-300 font-bold">LIMIT / OFFSET</td>
                  <td className="py-3 px-4 text-slate-300">Restricts number of returned rows for pagination</td>
                  <td className="py-3 px-4 text-slate-400">N/A</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: ONLY_FULL_GROUP_BY & Column Selection Rules */}
        <section id="only-full-group-by" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Column Selection Rules & The ONLY_FULL_GROUP_BY Standard (Error 1055)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why MySQL rejects ambiguous unaggregated columns, and the functional dependency exception.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-rose-900/40 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold">
                <span>❌ Invalid Query (Causes Error 1055)</span>
              </div>
              <p className="text-xs text-slate-300">
                Selecting unaggregated columns (<code className="text-rose-300">student_name</code>) when grouping by a non-unique column (<code className="text-rose-300">centre_city</code>) is ambiguous because a city has multiple students.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-rose-900/30 font-mono text-xs text-rose-300 overflow-x-auto">
                <pre>{`-- FAILS under ONLY_FULL_GROUP_BY:
SELECT 
    centre_city, 
    student_name,   -- AMBIGUOUS! Which student to pick?
    AVG(marks) 
FROM students 
GROUP BY centre_city;`}</pre>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-emerald-900/40 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <span>✓ Valid Query (Production Standards)</span>
              </div>
              <p className="text-xs text-slate-300">
                Wrap the column in <code className="text-emerald-300">GROUP_CONCAT()</code>, or group by the table's <code className="text-emerald-300">PRIMARY KEY</code> where functional dependency guarantees 1:1 uniqueness.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-emerald-900/30 font-mono text-xs text-emerald-300 overflow-x-auto">
                <pre>{`-- VALID: Explicit aggregation & PK grouping:
SELECT 
    centre_city, 
    GROUP_CONCAT(student_name SEPARATOR ', ') AS roster,
    AVG(marks) 
FROM students 
GROUP BY centre_city;`}</pre>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: SVG Grouping Pipeline */}
        <section id="svg-diagram" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. GROUP BY Row Partitioning & Aggregation Engine SVG
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Visualizing how MySQL ingests raw rows, partitions them into distinct city buckets, and computes aggregate metrics per bucket.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl flex flex-col items-center">
            <svg
              viewBox="0 0 900 380"
              className="w-full h-auto max-w-4xl select-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="gradGbCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0891b2" stopOpacity="0.9" />
                </linearGradient>
                <linearGradient id="gradGbEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#047857" stopOpacity="0.9" />
                </linearGradient>
                <linearGradient id="gradGbIndigo" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#4338ca" stopOpacity="0.9" />
                </linearGradient>
                <filter id="shadowGb" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.5" />
                </filter>
              </defs>

              {/* Background Plate */}
              <rect width="900" height="380" rx="16" fill="#020617" stroke="#1e293b" strokeWidth="2" />

              {/* Title */}
              <text x="450" y="34" fill="#f8fafc" fontSize="16" fontWeight="bold" textAnchor="middle" letterSpacing="0.5">
                MYSQL GROUP BY BUCKETING & AGGREGATION ARCHITECTURE
              </text>

              {/* Stage 1: Filtered Input Stream */}
              <g transform="translate(30, 65)">
                <rect width="220" height="280" rx="12" fill="#0f172a" stroke="#06b6d4" strokeWidth="1.5" />
                <rect x="0" y="0" width="220" height="32" rx="12" fill="url(#gradGbCyan)" />
                <text x="110" y="21" fill="#ffffff" fontSize="11.5" fontWeight="bold" textAnchor="middle">1. Filtered Rows (FROM/WHERE)</text>

                <rect x="15" y="45" width="190" height="32" rx="6" fill="#1e293b" stroke="#334155" />
                <text x="25" y="66" fill="#e2e8f0" fontSize="10">Mamata | Kolkata | ₹5000</text>

                <rect x="15" y="85" width="190" height="32" rx="6" fill="#1e293b" stroke="#334155" />
                <text x="25" y="106" fill="#e2e8f0" fontSize="10">Susmita | Barrackpore | ₹5000</text>

                <rect x="15" y="125" width="190" height="32" rx="6" fill="#1e293b" stroke="#334155" />
                <text x="25" y="146" fill="#e2e8f0" fontSize="10">Debangshu | Kolkata | ₹6000</text>

                <rect x="15" y="165" width="190" height="32" rx="6" fill="#1e293b" stroke="#334155" />
                <text x="25" y="186" fill="#e2e8f0" fontSize="10">Mahima | Barrackpore | ₹4500</text>

                <rect x="15" y="205" width="190" height="32" rx="6" fill="#1e293b" stroke="#334155" />
                <text x="25" y="226" fill="#e2e8f0" fontSize="10">Abhronila | Kolkata | ₹7000</text>
              </g>

              {/* Arrow 1 */}
              <path d="M 250 205 L 310 205" fill="none" stroke="#06b6d4" strokeWidth="2.5" />
              <polygon points="310,205 302,199 302,211" fill="#06b6d4" />

              {/* Stage 2: Partitioning Buckets */}
              <g transform="translate(310, 65)">
                <rect width="260" height="280" rx="12" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                <rect x="0" y="0" width="260" height="32" rx="12" fill="url(#gradGbEmerald)" />
                <text x="130" y="21" fill="#ffffff" fontSize="11.5" fontWeight="bold" textAnchor="middle">2. GROUP BY centre_city Buckets</text>

                {/* Bucket A: Kolkata */}
                <rect x="15" y="45" width="230" height="95" rx="8" fill="#1e1b4b" stroke="#6366f1" />
                <text x="25" y="65" fill="#a5b4fc" fontSize="11" fontWeight="bold">Bucket A: 'Kolkata' (3 Rows)</text>
                <text x="25" y="82" fill="#cbd5e1" fontSize="9.5">• Mamata (₹5000)</text>
                <text x="25" y="98" fill="#cbd5e1" fontSize="9.5">• Debangshu (₹6000)</text>
                <text x="25" y="114" fill="#cbd5e1" fontSize="9.5">• Abhronila (₹7000)</text>
                <text x="25" y="130" fill="#34d399" fontSize="9.5" fontWeight="bold">SUM: ₹18,000 | AVG: ₹6,000</text>

                {/* Bucket B: Barrackpore */}
                <rect x="15" y="150" width="230" height="85" rx="8" fill="#064e3b" stroke="#10b981" />
                <text x="25" y="170" fill="#a7f3d0" fontSize="11" fontWeight="bold">Bucket B: 'Barrackpore' (2 Rows)</text>
                <text x="25" y="187" fill="#cbd5e1" fontSize="9.5">• Susmita (₹5000)</text>
                <text x="25" y="203" fill="#cbd5e1" fontSize="9.5">• Mahima (₹4500)</text>
                <text x="25" y="222" fill="#34d399" fontSize="9.5" fontWeight="bold">SUM: ₹9,500 | AVG: ₹4,750</text>
              </g>

              {/* Arrow 2 */}
              <path d="M 570 205 L 630 205" fill="none" stroke="#10b981" strokeWidth="2.5" />
              <polygon points="630,205 622,199 622,211" fill="#10b981" />

              {/* Stage 3: Summary Output Rows */}
              <g transform="translate(630, 65)">
                <rect width="240" height="280" rx="12" fill="#0f172a" stroke="#6366f1" strokeWidth="1.5" filter="url(#shadowGb)" />
                <rect x="0" y="0" width="240" height="32" rx="12" fill="url(#gradGbIndigo)" />
                <text x="120" y="21" fill="#ffffff" fontSize="11.5" fontWeight="bold" textAnchor="middle">3. Final Projected Result Set</text>

                <rect x="15" y="45" width="210" height="80" rx="8" fill="#1e1b4b" stroke="#4338ca" />
                <text x="25" y="70" fill="#38bdf8" fontSize="11" fontWeight="bold">centre_city: Kolkata</text>
                <text x="25" y="90" fill="#a5b4fc" fontSize="10.5">total_students: 3</text>
                <text x="25" y="110" fill="#34d399" fontSize="10.5" fontWeight="bold">revenue: ₹18,000.00</text>

                <rect x="15" y="140" width="210" height="80" rx="8" fill="#064e3b" stroke="#10b981" />
                <text x="25" y="165" fill="#38bdf8" fontSize="11" fontWeight="bold">centre_city: Barrackpore</text>
                <text x="25" y="185" fill="#a7f3d0" fontSize="10.5">total_students: 2</text>
                <text x="25" y="205" fill="#34d399" fontSize="10.5" fontWeight="bold">revenue: ₹9,500.00</text>

                <text x="120" y="260" fill="#94a3b8" fontSize="10" textAnchor="middle">2 Summary Rows Generated</text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 5: Interactive Simulator Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Interactive GROUP BY Simulator Sandbox
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test dynamic grouping scenarios across locations, temporal cohorts, payment methods, and CASE expressions.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl p-6 space-y-6">
            {/* Scenario Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {Object.keys(groupScenarios).map((key) => {
                const item = groupScenarios[key];
                const isActive = selectedGroupMode === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedGroupMode(key)}
                    className={clsx(
                      "p-3 rounded-xl text-left transition-all border text-xs sm:text-sm font-medium",
                      isActive
                        ? "bg-cyan-950/80 border-cyan-500 text-cyan-200 shadow-lg shadow-cyan-950/50"
                        : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                    )}
                  &gt;
                    <div className="font-semibold">{item.title}</div>
                  </button>
                );
              })}
            </div>

            {/* Active Simulation View */}
            {(() => {
              const active = groupScenarios[selectedGroupMode];
              return (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-200">{active.title}</span>
                    <span
                      className={clsx(
                        "px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wide border",
                        active.badgeColor === "emerald" && "bg-emerald-950 text-emerald-300 border-emerald-700",
                        active.badgeColor === "cyan" && "bg-cyan-950 text-cyan-300 border-cyan-700",
                        active.badgeColor === "indigo" && "bg-indigo-950 text-indigo-300 border-indigo-700",
                        active.badgeColor === "amber" && "bg-amber-950 text-amber-300 border-amber-700"
                      )}
                    >
                      {active.verdictText}
                    </span>
                  </div>

                  {/* SQL Preview */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto shadow-inner">
                    <pre>{active.sqlQuery}</pre>
                  </div>

                  {/* Dynamic Table Output */}
                  <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                    <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                      <thead className="bg-slate-900 text-slate-400 font-semibold border-b border-slate-800">
                        <tr>
                          <th className="py-2.5 px-4">Group Partition Identifier</th>
                          <th className="py-2.5 px-4">Count</th>
                          <th className="py-2.5 px-4 font-bold text-emerald-400">Total Revenue / Mean</th>
                          <th className="py-2.5 px-4">Statistical Range / Context</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 font-mono">
                        {active.resultRows.map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-900/60">
                            <td className="py-2.5 px-4 font-sans font-medium text-white">{row.group}</td>
                            <td className="py-2.5 px-4 text-cyan-300">{row.count}</td>
                            <td className="py-2.5 px-4 text-emerald-300 font-bold">{row.revenue}</td>
                            <td className="py-2.5 px-4 text-slate-400 font-sans text-xs">{row.range}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Architectural Note */}
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    <span className="font-bold text-cyan-400">Engineering Insight: </span>
                    {active.explanation}
                  </div>
                </div>
              );
            })()}
          </div>
        </section>

        {/* SECTION 6: Real-World Industry Scenarios */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Production Case Studies (West Bengal Academy & E-Commerce)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Four industrial-grade production implementations using the GROUP BY clause.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case Study 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/30 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wide">Case Study 1</span>
                <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">Barrackpore EduTech</span>
              </div>
              <h3 className="text-lg font-bold text-white">City-Wise Revenue & Enrollment Distribution</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Aggregates registered student counts and fee collections across regional centers in Indian Rupee (₹).
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto">
                <pre>{`SELECT 
    centre_city,
    COUNT(*) AS enrolled_count,
    SUM(fee_paid_inr) AS total_collections_inr,
    ROUND(AVG(fee_paid_inr), 2) AS average_fee_inr
FROM student_enrollments
WHERE admission_status = 'CONFIRMED'
GROUP BY centre_city
ORDER BY total_collections_inr DESC;`}</pre>
              </div>
            </div>

            {/* Case Study 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/30 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wide">Case Study 2</span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">Kolkata Retail Hub</span>
              </div>
              <h3 className="text-lg font-bold text-white">Payment Gateway Settlement & Merchant Fee Audit</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Groups daily e-commerce checkouts by payment channel to reconcile settlement volume in Indian Rupee (₹).
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto">
                <pre>{`SELECT 
    gateway_channel,
    COUNT(order_id) AS total_orders,
    SUM(final_price_inr) AS gross_settlement_inr,
    ROUND(AVG(final_price_inr), 2) AS avg_basket_size_inr
FROM customer_transactions
WHERE DATE(created_at) = CURDATE()
GROUP BY gateway_channel;`}</pre>
              </div>
            </div>

            {/* Case Study 3 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/30 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wide">Case Study 3</span>
                <span className="text-xs px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">Ichapur Student Portal</span>
              </div>
              <h3 className="text-lg font-bold text-white">Admission Cohorts by Year and Semester</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Groups historical student registrations by admission year and intake cycle for longitudinal retention analytics.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300 overflow-x-auto">
                <pre>{`SELECT 
    YEAR(admission_date) AS intake_year,
    MONTHNAME(admission_date) AS intake_month,
    COUNT(*) AS new_students_registered,
    SUM(tuition_fee_inr) AS cohort_revenue_inr
FROM admissions_master
GROUP BY YEAR(admission_date), MONTH(admission_date), MONTHNAME(admission_date)
ORDER BY intake_year DESC, MONTH(admission_date) DESC;`}</pre>
              </div>
            </div>

            {/* Case Study 4 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/30 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wide">Case Study 4</span>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">Jadavpur Tech Center</span>
              </div>
              <h3 className="text-lg font-bold text-white">Student Academic Merit Tier Distribution</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Uses a CASE expression inside GROUP BY to group continuous examination scores into standard institutional tiers.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-amber-300 overflow-x-auto">
                <pre>{`SELECT 
    CASE 
        WHEN marks_pct &ge; 75 THEN 'DISTINCTION'
        WHEN marks_pct >= 60 THEN 'FIRST_CLASS'
        WHEN marks_pct >= 40 THEN 'PASS'
        ELSE 'FAIL'
    END AS merit_tier,
    COUNT(*) AS total_students,
    ROUND(AVG(marks_pct), 2) AS tier_mean_score
FROM exam_marks
GROUP BY merit_tier;`}</pre>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: Pitfalls & Best Practice Checklist */}
        <section id="pitfalls-checklist" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Common Pitfalls & Senior Engineer Checklist
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Avoid Error 1055, non-SARGable WHERE filters, and unindexed full-table groupings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pitfalls */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-rose-900/30 space-y-4">
              <h3 className="text-lg font-bold text-rose-400 flex items-center gap-2">
                <span>⚠️ Common Pitfalls to Avoid</span>
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">1.</span>
                  <div>
                    <strong className="text-white">Disabling ONLY_FULL_GROUP_BY:</strong>{" "}
                    Turning off the SQL mode masks bugs and returns arbitrary, non-deterministic values for unaggregated columns. Always write valid SQL.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">2.</span>
                  <div>
                    <strong className="text-white">Filtering Row Conditions in HAVING:</strong>{" "}
                    Writing <code className="text-rose-300">HAVING status = 'CONFIRMED'</code> groups all rows first before filtering. Use <code className="text-emerald-300">WHERE status = 'CONFIRMED'</code> to filter early.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">3.</span>
                  <div>
                    <strong className="text-white">Positional Grouping (GROUP BY 1, 2):</strong>{" "}
                    Grouping by column numbers is fragile; if SELECT column order changes during refactoring, the grouping silently breaks.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">4.</span>
                  <div>
                    <strong className="text-white">Using GROUP BY col DESC (Deprecated):</strong>{" "}
                    Specifying DESC inside GROUP BY is deprecated in MySQL 8.0. Always add an explicit <code className="text-emerald-300">ORDER BY col DESC</code>.
                  </div>
                </li>
              </ul>
            </div>

            {/* Checklist */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-emerald-900/30 space-y-4">
              <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
                <span>✓ Production Best Practices Checklist</span>
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <div>
                    <strong className="text-white">Filter early with WHERE:</strong> Reduce row volume before the grouping engine creates memory buckets.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <div>
                    <strong className="text-white">Group by Primary Key for Entities:</strong> Take advantage of functional dependency to project entity attributes safely.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <div>
                    <strong className="text-white">Index Grouping Columns:</strong> Create composite B-Tree indexes on <code className="text-emerald-300">(filter_col, group_col, agg_col)</code> for Loose Index Scans.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <div>
                    <strong className="text-white">Always specify explicit ORDER BY:</strong> Ensure deterministic presentation order for UI paginated tables.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 8: Q&A / FAQs (30 Questions) */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              7. Comprehensive Q&A & Interview Practice (30 Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test your mastery of MySQL GROUP BY mechanics, ONLY_FULL_GROUP_BY error debugging, execution order, and indexing.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl">
            <FAQTemplate questions={questions} defaultCategory="Topic 11: The GROUP BY Clause" />
          </div>
        </section>

        {/* SECTION 9: Teacher Note & Printable Text */}
        <section id="teacher-notes" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              8. Teacher's Note & Raw Printable Reference
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Instructor summary by Sukanta Hui with printable raw text reference for classroom handouts and offline study.
            </p>
          </div>

          {/* Teacher Sukanta Hui Component */}
          <Teacher
            note={`Dear Students (Mamata, Susmita, Mahima, Abhronila, Debangshu),

The GROUP BY clause is the cornerstone of SQL business intelligence and reporting. Remember these critical principles:

1. Lifecycle Order: WHERE filters rows first, GROUP BY creates buckets, HAVING filters groups, and SELECT projects values.
2. The Golden Rule: Every column in SELECT must be in GROUP BY or inside an aggregate function.
3. If you see Error 1055 (ONLY_FULL_GROUP_BY), do NOT disable sql_mode! Instead, wrap extra columns in GROUP_CONCAT(), MAX(), or group by the PRIMARY KEY.
4. Filter out unwanted rows in WHERE before grouping so MySQL doesn't waste CPU cycles grouping rows you will eventually discard.

Explore the interactive sandbox scenarios above and solve all 30 interview questions below.`}
          />

          {/* Printable Plain Text Component */}
          <div className="mt-8">
            <PlainTextPrint
              content={noteText}
              title="Topic 11 – The GROUP BY Clause (Printable Reference)"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Topic11;
