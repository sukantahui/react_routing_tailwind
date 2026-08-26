import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";

/**
 * Topic9 – Aggregate Functions: COUNT(*), COUNT(col), SUM(), AVG(), MIN(), MAX()
 * Module: 002_006_sql-functions (Built-in Functions, Grouping & Aggregations)
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Aggregate Functions Simulator Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic9 = () => {
  const sectionRefs = useRef([]);

  // Interactive Simulator State
  const [selectedAggMode, setSelectedAggMode] = useState("mode_financial_summary"); // "mode_financial_summary" | "mode_count_variations" | "mode_avg_null_treatment" | "mode_inventory_valuation"

  const aggScenarios = {
    mode_financial_summary: {
      title: "1. Academic Revenue & Fee Analytics (SUM, AVG, MIN, MAX)",
      sqlQuery: `SELECT 
    COUNT(*) AS total_enrolled_students,
    SUM(tuition_fee_inr) AS gross_tuition_revenue_inr,
    COALESCE(SUM(scholarship_amount_inr), 0) AS total_scholarships_granted_inr,
    ROUND(AVG(tuition_fee_inr), 2) AS avg_fee_per_student_inr,
    MIN(tuition_fee_inr) AS minimum_fee_inr,
    MAX(tuition_fee_inr) AS maximum_fee_inr
FROM student_fee_ledger;`,
      resultRows: [
        { metric: "Total Enrolled Students", value: "150 Students", type: "COUNT(*)", badgeColor: "cyan" },
        { metric: "Gross Tuition Revenue", value: "₹7,50,000.00", type: "SUM(tuition_fee_inr)", badgeColor: "emerald" },
        { metric: "Total Scholarships Granted", value: "₹85,000.00", type: "SUM(scholarship)", badgeColor: "emerald" },
        { metric: "Average Fee per Student", value: "₹5,000.00", type: "AVG(tuition_fee_inr)", badgeColor: "indigo" },
        { metric: "Fee Range (Min - Max)", value: "₹3,500.00 - ₹8,000.00", type: "MIN / MAX", badgeColor: "amber" },
      ],
      verdictText: "✓ N → 1 COMPRESSION EXECUTED",
      badgeColor: "emerald",
      explanation: "Aggregates compress 150 rows into a single executive financial summary row, calculating gross receipts, subsidies, and statistical averages.",
    },
    mode_count_variations: {
      title: "2. Row Counts vs Completeness Audit (COUNT Variations)",
      sqlQuery: `SELECT 
    COUNT(*) AS total_records_in_table,
    COUNT(phone_number) AS students_with_phone,
    COUNT(scholarship_amount_inr) AS students_with_scholarship,
    COUNT(DISTINCT city) AS unique_cities_represented
FROM student_directory;`,
      resultRows: [
        { metric: "COUNT(*)", value: "200 Total Rows", type: "Includes all rows & NULLs", badgeColor: "cyan" },
        { metric: "COUNT(phone_number)", value: "192 Non-Null Entries", type: "8 Students missing phone", badgeColor: "emerald" },
        { metric: "COUNT(scholarship_amount_inr)", value: "35 Scholarship Holders", type: "165 Students have NULL", badgeColor: "amber" },
        { metric: "COUNT(DISTINCT city)", value: "4 Unique Cities", type: "Barrackpore, Kolkata, Ichapur, Jadavpur", badgeColor: "indigo" },
      ],
      verdictText: "✓ DATA QUALITY AUDITED",
      badgeColor: "cyan",
      explanation: "COUNT(*) counts total physical rows. COUNT(col) ignores NULLs, revealing missing data. COUNT(DISTINCT col) counts unique non-null values.",
    },
    mode_avg_null_treatment: {
      title: "3. NULL Impact on Averages (AVG vs AVG(COALESCE))",
      sqlQuery: `-- Calculating class average with and without absentees:
SELECT 
    COUNT(*) AS total_registered,
    COUNT(marks_obtained) AS attended_exam,
    ROUND(AVG(marks_obtained), 2) AS avg_of_attendees_only,
    ROUND(AVG(COALESCE(marks_obtained, 0)), 2) AS true_class_avg_with_zeros
FROM semester_exam_scores;`,
      resultRows: [
        { metric: "Total Registered", value: "100 Students", type: "Total roster", badgeColor: "cyan" },
        { metric: "Attended Exam", value: "80 Students", type: "20 Absentees (NULL marks)", badgeColor: "amber" },
        { metric: "AVG(marks_obtained)", value: "75.00 / 100", type: "Sum / 80 (Excludes NULLs!)", badgeColor: "rose" },
        { metric: "AVG(COALESCE(marks, 0))", value: "60.00 / 100", type: "Sum / 100 (Includes 0 for absent)", badgeColor: "emerald" },
      ],
      verdictText: "✓ NULL SKEW PREVENTED",
      badgeColor: "amber",
      explanation: "By default, AVG() divides only by non-null rows (80), producing 75.00. Using AVG(COALESCE(marks, 0)) divides by all 100 students, yielding 60.00.",
    },
    mode_inventory_valuation: {
      title: "4. Row Expression Aggregation & Value Bounds",
      sqlQuery: `SELECT 
    COUNT(*) AS total_sku_items,
    SUM(stock_quantity) AS total_units_in_warehouse,
    SUM(unit_price_inr * stock_quantity) AS total_inventory_valuation_inr,
    MIN(unit_price_inr) AS cheapest_item_inr,
    MAX(unit_price_inr) AS most_expensive_item_inr
FROM warehouse_inventory;`,
      resultRows: [
        { metric: "Total Unique SKUs", value: "45 Items", type: "Catalog count", badgeColor: "cyan" },
        { metric: "Total Units in Stock", value: "1,250 Units", type: "SUM(stock_quantity)", badgeColor: "emerald" },
        { metric: "Total Valuation", value: "₹18,75,000.00", type: "SUM(unit_price * qty)", badgeColor: "indigo" },
        { metric: "Price Floor (Min)", value: "₹150.00", type: "MIN(unit_price_inr)", badgeColor: "emerald" },
        { metric: "Price Ceiling (Max)", value: "₹12,500.00", type: "MAX(unit_price_inr)", badgeColor: "rose" },
      ],
      verdictText: "✓ ROW EXPRESSIONS SUMMED",
      badgeColor: "indigo",
      explanation: "SUM() can aggregate complex arithmetic expressions like (unit_price * stock_quantity) calculated across all matching inventory rows.",
    },
  };

  const navItems = [
    { id: "theory", label: "1. Aggregation Theory & Mechanics" },
    { id: "comparison-matrix", label: "2. Functions Reference Matrix" },
    { id: "svg-diagram", label: "3. N → 1 Compression Pipeline SVG" },
    { id: "interactive-sandbox", label: "4. Interactive Aggregates Sandbox" },
    { id: "case-studies", label: "5. Production Industry Case Studies" },
    { id: "pitfalls-checklist", label: "6. Senior Pitfalls & Best Practices" },
    { id: "faq-section", label: "7. Q&A / FAQs (30 Questions)" },
    { id: "teacher-notes", label: "8. Teacher's Note & Raw Script" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-900 pb-20">
      {/* Header Banner */}
      <header className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-2">
            <span>Module 002_006</span>
            <span>•</span>
            <span>Topic 9 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Statistical & Summary Functions
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Aggregate Functions: COUNT, SUM, AVG, MIN, MAX
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master the mathematics and mechanics of multi-row data summarization in MySQL. Learn NULL exclusion dynamics, non-numeric extremes, precision monetary rounding, and clause execution lifecycles.
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
              1. Core Aggregation Theory & Multi-Row Compression ($N \to 1$)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Aggregate functions compress sets of values across multiple rows into a single scalar value. Understanding how NULL values interact with calculations is critical for database integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/30 transition-all shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="p-2 rounded-lg bg-cyan-950/80 text-cyan-400 font-mono text-sm font-bold border border-cyan-800">
                  COUNT()
                </span>
                <h3 className="text-lg font-semibold text-white">Cardinality & Completeness</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                <code className="text-cyan-300">COUNT(*)</code> counts all rows. <code className="text-cyan-300">COUNT(col)</code> counts only non-null values. <code className="text-cyan-300">COUNT(DISTINCT col)</code> eliminates duplicates before counting.
              </p>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <div><span className="text-slate-500">-- Counting rows vs non-null entries:</span></div>
                <div><span className="text-cyan-400">SELECT COUNT</span>(*), <span className="text-cyan-400">COUNT</span>(email);</div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/30 transition-all shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="p-2 rounded-lg bg-emerald-950/80 text-emerald-400 font-mono text-sm font-bold border border-emerald-800">
                  SUM() & AVG()
                </span>
                <h3 className="text-lg font-semibold text-white">Financial & Mean Metrics</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                <code className="text-emerald-300">SUM()</code> calculates total sums. <code className="text-emerald-300">AVG()</code> calculates <code className="text-emerald-300">SUM(col) / COUNT(col)</code>. Both ignore NULL values automatically.
              </p>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <div><span className="text-slate-500">-- Revenue and mean calculation:</span></div>
                <div><span className="text-emerald-400">SELECT SUM</span>(fee), <span className="text-emerald-400">AVG</span>(fee);</div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/30 transition-all shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="p-2 rounded-lg bg-indigo-950/80 text-indigo-400 font-mono text-sm font-bold border border-indigo-800">
                  MIN() & MAX()
                </span>
                <h3 className="text-lg font-semibold text-white">Extremes & Bounds</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Finds minimum/maximum values across numeric numbers, alphabetical text strings (A-Z), and chronological dates (earliest to latest).
              </p>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <div><span className="text-slate-500">-- Finding chronological date bounds:</span></div>
                <div><span className="text-indigo-400">SELECT MIN</span>(adm_date), <span className="text-indigo-400">MAX</span>(adm_date);</div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Comparison Matrix */}
        <section id="comparison-matrix" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Aggregate Functions Technical Reference Matrix
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing input data types, NULL handling policies, output on empty datasets, and typical enterprise use cases.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-slate-100 font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4 font-mono text-cyan-400">Function</th>
                  <th className="py-3.5 px-4">Applicable Data Types</th>
                  <th className="py-3.5 px-4">NULL Handling Policy</th>
                  <th className="py-3.5 px-4 font-bold text-amber-400">Empty Table Output</th>
                  <th className="py-3.5 px-4">Primary Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-sans">
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-bold">COUNT(*)</td>
                  <td className="py-3 px-4">All rows / Wildcard</td>
                  <td className="py-3 px-4 text-emerald-400">Counts ALL rows (including NULLs)</td>
                  <td className="py-3 px-4 font-mono text-xs text-emerald-400 font-bold">0</td>
                  <td className="py-3 px-4 text-slate-300">Total physical row count</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-bold">COUNT(col)</td>
                  <td className="py-3 px-4">Any column type</td>
                  <td className="py-3 px-4 text-amber-400">Ignores NULLs (non-null only)</td>
                  <td className="py-3 px-4 font-mono text-xs text-emerald-400 font-bold">0</td>
                  <td className="py-3 px-4 text-slate-300">Data completeness verification</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono text-emerald-300 font-bold">SUM(col)</td>
                  <td className="py-3 px-4">Numeric only (INT, DECIMAL, FLOAT)</td>
                  <td className="py-3 px-4 text-amber-400">Skips NULLs in summation</td>
                  <td className="py-3 px-4 font-mono text-xs text-rose-400 font-bold">NULL</td>
                  <td className="py-3 px-4 text-slate-300">Gross revenue, totals, quantities</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono text-indigo-300 font-bold">AVG(col)</td>
                  <td className="py-3 px-4">Numeric only</td>
                  <td className="py-3 px-4 text-amber-400">Excludes NULL rows from divisor</td>
                  <td className="py-3 px-4 font-mono text-xs text-rose-400 font-bold">NULL</td>
                  <td className="py-3 px-4 text-slate-300">Mean calculations, averages</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono text-amber-300 font-bold">MIN(col) / MAX(col)</td>
                  <td className="py-3 px-4">Numeric, String, Date/Time</td>
                  <td className="py-3 px-4 text-amber-400">Ignores NULLs</td>
                  <td className="py-3 px-4 font-mono text-xs text-rose-400 font-bold">NULL</td>
                  <td className="py-3 px-4 text-slate-300">Price ranges, earliest/latest dates</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: SVG Multi-Row Aggregation Compression Pipeline */}
        <section id="svg-diagram" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Multi-Row Aggregation Compression Pipeline ($N \to 1$)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Visualizing how MySQL ingests raw tabular rows, applies NULL filter gates, and calculates scalar summaries.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl flex flex-col items-center">
            <svg
              viewBox="0 0 900 380"
              className="w-full h-auto max-w-4xl select-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="gradAggCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0891b2" stopOpacity="0.9" />
                </linearGradient>
                <linearGradient id="gradAggEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#047857" stopOpacity="0.9" />
                </linearGradient>
                <linearGradient id="gradAggIndigo" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#4338ca" stopOpacity="0.9" />
                </linearGradient>
                <filter id="shadowAgg" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.5" />
                </filter>
              </defs>

              {/* Background Plate */}
              <rect width="900" height="380" rx="16" fill="#020617" stroke="#1e293b" strokeWidth="2" />

              {/* Title */}
              <text x="450" y="34" fill="#f8fafc" fontSize="16" fontWeight="bold" textAnchor="middle" letterSpacing="0.5">
                MYSQL AGGREGATE FUNCTION PIPELINE: N ROWS COMPRESSION (N &rarr; 1)
              </text>

              {/* Input Stream: N Rows */}
              <g transform="translate(40, 65)">
                <rect width="210" height="280" rx="12" fill="#0f172a" stroke="#06b6d4" strokeWidth="1.5" />
                <rect x="0" y="0" width="210" height="32" rx="12" fill="url(#gradAggCyan)" />
                <text x="105" y="21" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">Input Stream (N Rows)</text>

                {/* Rows */}
                <rect x="15" y="45" width="180" height="36" rx="6" fill="#1e293b" stroke="#334155" />
                <text x="25" y="68" fill="#e2e8f0" fontSize="10.5">Row 1: Mamata (Fee: ₹5000)</text>

                <rect x="15" y="90" width="180" height="36" rx="6" fill="#1e293b" stroke="#334155" />
                <text x="25" y="113" fill="#e2e8f0" fontSize="10.5">Row 2: Susmita (Fee: ₹6000)</text>

                <rect x="15" y="135" width="180" height="36" rx="6" fill="#451a03" stroke="#f59e0b" />
                <text x="25" y="158" fill="#fef3c7" fontSize="10.5" fontWeight="bold">Row 3: Mahima (Fee: NULL)</text>

                <rect x="15" y="180" width="180" height="36" rx="6" fill="#1e293b" stroke="#334155" />
                <text x="25" y="203" fill="#e2e8f0" fontSize="10.5">Row 4: Abhronila (Fee: ₹4000)</text>

                <rect x="15" y="225" width="180" height="36" rx="6" fill="#1e293b" stroke="#334155" />
                <text x="25" y="248" fill="#e2e8f0" fontSize="10.5">Row 5: Debangshu (Fee: ₹5000)</text>
              </g>

              {/* Arrow 1 */}
              <path d="M 250 205 L 320 205" fill="none" stroke="#06b6d4" strokeWidth="2.5" />
              <polygon points="320,205 312,199 312,211" fill="#06b6d4" />

              {/* Aggregation Engine & NULL Gate */}
              <g transform="translate(320, 65)">
                <rect width="250" height="280" rx="12" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                <rect x="0" y="0" width="250" height="32" rx="12" fill="url(#gradAggEmerald)" />
                <text x="125" y="21" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">Aggregate Processing Engine</text>

                <rect x="20" y="45" width="210" height="42" rx="6" fill="#1e293b" stroke="#334155" />
                <text x="125" y="65" fill="#38bdf8" fontSize="10.5" fontWeight="bold" textAnchor="middle">COUNT(*) &rarr; All 5 Rows</text>
                <text x="125" y="78" fill="#94a3b8" fontSize="9" textAnchor="middle">(Includes row with NULL)</text>

                <rect x="20" y="95" width="210" height="42" rx="6" fill="#1e293b" stroke="#334155" />
                <text x="125" y="115" fill="#34d399" fontSize="10.5" fontWeight="bold" textAnchor="middle">COUNT(fee) &rarr; 4 Non-Nulls</text>
                <text x="125" y="128" fill="#94a3b8" fontSize="9" textAnchor="middle">(Filters out Mahima NULL)</text>

                <rect x="20" y="145" width="210" height="42" rx="6" fill="#1e293b" stroke="#334155" />
                <text x="125" y="165" fill="#a7f3d0" fontSize="10.5" fontWeight="bold" textAnchor="middle">SUM(fee) &rarr; 5000+6000+4000+5000</text>
                <text x="125" y="178" fill="#94a3b8" fontSize="9" textAnchor="middle">Sum = ₹20,000</text>

                <rect x="20" y="195" width="210" height="65" rx="6" fill="#1e293b" stroke="#334155" />
                <text x="125" y="215" fill="#c7d2fe" fontSize="10.5" fontWeight="bold" textAnchor="middle">AVG(fee) &rarr; 20,000 / 4 = ₹5,000</text>
                <text x="125" y="232" fill="#f59e0b" fontSize="9.5" textAnchor="middle">Note: Divided by 4 (NOT 5!)</text>
                <text x="125" y="247" fill="#64748b" fontSize="8.5" textAnchor="middle">MIN=₹4,000 | MAX=₹6,000</text>
              </g>

              {/* Arrow 2 */}
              <path d="M 570 205 L 640 205" fill="none" stroke="#10b981" strokeWidth="2.5" />
              <polygon points="640,205 632,199 632,211" fill="#10b981" />

              {/* Result Summary Output */}
              <g transform="translate(640, 65)">
                <rect width="220" height="280" rx="12" fill="#0f172a" stroke="#6366f1" strokeWidth="1.5" filter="url(#shadowAgg)" />
                <rect x="0" y="0" width="220" height="32" rx="12" fill="url(#gradAggIndigo)" />
                <text x="110" y="21" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">Scalar Summary (1 Row)</text>

                <rect x="15" y="50" width="190" height="200" rx="8" fill="#1e1b4b" stroke="#4338ca" />
                <text x="25" y="80" fill="#a5b4fc" fontSize="11" fontWeight="bold">total_rows: 5</text>
                <text x="25" y="110" fill="#a5b4fc" fontSize="11" fontWeight="bold">valid_fees: 4</text>
                <text x="25" y="140" fill="#34d399" fontSize="11" fontWeight="bold">sum_fee: ₹20,000</text>
                <text x="25" y="170" fill="#38bdf8" fontSize="11" fontWeight="bold">avg_fee: ₹5,000</text>
                <text x="25" y="200" fill="#fde68a" fontSize="11" fontWeight="bold">min_fee: ₹4,000</text>
                <text x="25" y="230" fill="#f43f5e" fontSize="11" fontWeight="bold">max_fee: ₹6,000</text>

                <text x="110" y="268" fill="#94a3b8" fontSize="9.5" textAnchor="middle">Single Row Generated</text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 4: Interactive Aggregates Simulator Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Aggregate Functions Simulator Sandbox
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test dynamic SQL aggregations, observe NULL exclusion dynamics, and explore multi-metric reporting outputs.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl p-6 space-y-6">
            {/* Scenario Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {Object.keys(aggScenarios).map((key) => {
                const item = aggScenarios[key];
                const isActive = selectedAggMode === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedAggMode(key)}
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
              const active = aggScenarios[selectedAggMode];
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

                  {/* Dynamic Metric Output Table */}
                  <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                    <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                      <thead className="bg-slate-900 text-slate-400 font-semibold border-b border-slate-800">
                        <tr>
                          <th className="py-2.5 px-4">Summary Metric Description</th>
                          <th className="py-2.5 px-4 font-bold text-emerald-400">Calculated Scalar Value</th>
                          <th className="py-2.5 px-4">Function Expression / Logic</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 font-mono">
                        {active.resultRows.map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-900/60">
                            <td className="py-2.5 px-4 font-sans font-medium text-white">{row.metric}</td>
                            <td className="py-2.5 px-4 font-bold text-cyan-300">{row.value}</td>
                            <td className="py-2.5 px-4 text-slate-400 font-mono text-xs">{row.type}</td>
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

        {/* SECTION 5: Real-World Industry Scenarios */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Production Case Studies (West Bengal Academy & E-Commerce)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Four industrial-grade production implementations using SQL aggregate functions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case Study 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/30 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wide">Case Study 1</span>
                <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">Barrackpore EduTech</span>
              </div>
              <h3 className="text-lg font-bold text-white">Student Enrollment & Scholarship Audit</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Calculates total roster strength, grants awarded, and overall fee receipts across all batches in Indian Rupee (₹).
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto">
                <pre>{`SELECT 
    COUNT(*) AS total_admissions,
    COUNT(scholarship_amount_inr) AS scholarship_count,
    SUM(tuition_fee_inr) AS gross_tuition_inr,
    COALESCE(SUM(scholarship_amount_inr), 0) AS total_discounts_inr,
    (SUM(tuition_fee_inr) - COALESCE(SUM(scholarship_amount_inr), 0)) AS net_receivables_inr
FROM admissions_master;`}</pre>
              </div>
            </div>

            {/* Case Study 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/30 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wide">Case Study 2</span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">Kolkata Retail Hub</span>
              </div>
              <h3 className="text-lg font-bold text-white">E-Commerce Daily Sales & Order Basket Metrics</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Computes daily sales volume, average order value (AOV), and customer order extremes in Indian Rupee (₹).
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto">
                <pre>{`SELECT 
    COUNT(order_id) AS total_orders_placed,
    COUNT(DISTINCT customer_id) AS unique_active_buyers,
    SUM(final_amount_inr) AS total_sales_volume_inr,
    ROUND(AVG(final_amount_inr), 2) AS average_order_value_inr,
    MIN(final_amount_inr) AS smallest_order_inr,
    MAX(final_amount_inr) AS largest_order_inr
FROM order_transactions
WHERE DATE(order_timestamp) = CURDATE();`}</pre>
              </div>
            </div>

            {/* Case Study 3 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/30 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wide">Case Study 3</span>
                <span className="text-xs px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">Ichapur Attendance Portal</span>
              </div>
              <h3 className="text-lg font-bold text-white">Session Engagement & True Class Average</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Audits examination marks with proper NULL handling, computing both attendee averages and whole-roster true mean.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300 overflow-x-auto">
                <pre>{`SELECT 
    COUNT(*) AS total_registered,
    COUNT(score) AS present_count,
    (COUNT(*) - COUNT(score)) AS absent_count,
    ROUND(AVG(score), 2) AS attendee_mean_score,
    ROUND(AVG(COALESCE(score, 0)), 2) AS roster_true_mean_score
FROM exam_marks_ledger;`}</pre>
              </div>
            </div>

            {/* Case Study 4 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/30 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wide">Case Study 4</span>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">Jadavpur Tech Center</span>
              </div>
              <h3 className="text-lg font-bold text-white">Warehouse Valuation & Stock Extreme Bounds</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Aggregates arithmetic row expressions across products to report total warehouse capital asset value in Indian Rupee (₹).
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-amber-300 overflow-x-auto">
                <pre>{`SELECT 
    COUNT(*) AS total_product_lines,
    SUM(quantity_in_stock) AS total_physical_units,
    SUM(unit_cost_inr * quantity_in_stock) AS total_inventory_valuation_inr,
    MIN(unit_cost_inr) AS cheapest_item_unit_cost,
    MAX(unit_cost_inr) AS costliest_item_unit_cost
FROM warehouse_catalog;`}</pre>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Pitfalls & Best Practice Checklist */}
        <section id="pitfalls-checklist" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Common Pitfalls & Senior Engineer Checklist
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Avoid Error 1111, silent NULL skew, unaggregated column mismatches, and empty SUM errors.
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
                    <strong className="text-white">Aggregate in WHERE Clause (Error 1111):</strong>{" "}
                    Writing <code className="text-rose-300">WHERE marks &gt; AVG(marks)</code> fails because WHERE runs before aggregation. Use a scalar subquery: <code className="text-emerald-300">WHERE marks &gt; (SELECT AVG(marks) FROM ...)</code>.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">2.</span>
                  <div>
                    <strong className="text-white">Assuming SUM() returns 0 on empty sets:</strong>{" "}
                    If zero rows match a WHERE filter, <code className="text-rose-300">SUM()</code> returns <code className="text-rose-300">NULL</code>! Wrap with <code className="text-emerald-300">COALESCE(SUM(amount), 0)</code>.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">3.</span>
                  <div>
                    <strong className="text-white">Misunderstanding AVG() with NULLs:</strong>{" "}
                    <code className="text-rose-300">AVG()</code> ignores NULL rows in both numerator and denominator. If unrecorded values should count as 0, use <code className="text-emerald-300">AVG(COALESCE(col, 0))</code>.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">4.</span>
                  <div>
                    <strong className="text-white">Selecting unaggregated columns without GROUP BY:</strong>{" "}
                    <code className="text-rose-300">SELECT city, AVG(score) FROM students</code> violates <code className="text-cyan-300">ONLY_FULL_GROUP_BY</code>. Add <code className="text-emerald-300">GROUP BY city</code>.
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
                    <strong className="text-white">Use COUNT(*) for physical rows:</strong> In MySQL InnoDB, <code className="text-emerald-300">COUNT(*)</code> is optimized to pick the smallest secondary index.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <div>
                    <strong className="text-white">Always wrap financial SUMs:</strong> Protect monetary totals from returning NULL by writing <code className="text-emerald-300">COALESCE(SUM(inr), 0.00)</code>.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <div>
                    <strong className="text-white">Round statistical metrics:</strong> Keep UI feeds polished by applying <code className="text-emerald-300">ROUND(AVG(col), 2)</code> to avoid infinite recurring decimals.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <div>
                    <strong className="text-white">Leverage MIN/MAX on dates:</strong> Use <code className="text-cyan-300">MIN(created_at)</code> and <code className="text-cyan-300">MAX(created_at)</code> to find audit range bounds efficiently.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 7: Q&A / FAQs (30 Questions) */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              7. Comprehensive Q&A & Interview Practice (30 Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test your understanding of SQL aggregate functions, NULL exclusion rules, subqueries, and InnoDB execution optimization.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl">
            <FAQTemplate questions={questions} defaultCategory="Topic 9: Aggregate Functions" />
          </div>
        </section>

        {/* SECTION 8: Teacher Note & Printable Text */}
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

Aggregate functions are the statistical engine of SQL. When writing analytical queries, keep these key points in mind:

1. COUNT(*) counts all rows; COUNT(col) counts only non-null values. Use COUNT(col) to check completeness.
2. AVG() completely ignores NULL rows. If absent students should count as 0, use AVG(COALESCE(score, 0)).
3. SUM() on an empty filtered dataset returns NULL, not 0! Always write COALESCE(SUM(fee), 0.00).
4. Never put aggregate functions in WHERE (Error 1111). Filter individual rows with WHERE, and filter aggregate results with HAVING.

Explore the interactive sandbox scenarios above and solve all 30 interview questions below.`}
          />

          {/* Printable Plain Text Component */}
          <div className="mt-8">
            <PlainTextPrint
              content={noteText}
              title="Topic 9 – SQL Aggregate Functions (Printable Reference)"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Topic9;
