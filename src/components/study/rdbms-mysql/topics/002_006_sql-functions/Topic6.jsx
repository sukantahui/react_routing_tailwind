import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

/**
 * Topic6 – Date Extraction & Formatting: EXTRACT, DATE_FORMAT, STR_TO_DATE, YEAR, MONTH, DAY
 * Module: 002_006_sql-functions (Built-in Functions, Grouping & Aggregations)
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Date Formatting Simulator Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic6 = () => {
  const sectionRefs = useRef([]);

  // Interactive Formatting State
  const [selectedFormatMode, setSelectedFormatMode] = useState("mode_executive_formatting"); // "mode_executive_formatting" | "mode_str_to_date" | "mode_calendar_extract" | "mode_weekend_filter"

  const formatScenarios = {
    mode_executive_formatting: {
      title: "1. Executive Presentation Formatting (DATE_FORMAT)",
      sqlQuery: `SELECT 
    student_name,
    admission_timestamp,
    DATE_FORMAT(admission_timestamp, '%d-%b-%Y') AS indian_short_date,
    DATE_FORMAT(admission_timestamp, '%W, %D %M %Y') AS full_executive_date,
    DATE_FORMAT(admission_timestamp, '%h:%i %p') AS clock_time_12hr
FROM student_records;`,
      resultRows: [
        { name: "Mamata Hui", col1: "24-Aug-2026", col2: "Monday, 24th August 2026", col3: "02:30 PM", badgeColor: "emerald" },
        { name: "Debangshu Roy", col1: "15-Jan-2026", col2: "Thursday, 15th January 2026", col3: "11:15 AM", badgeColor: "emerald" },
        { name: "Susmita Sen", col1: "08-Sep-2026", col2: "Tuesday, 8th September 2026", col3: "04:45 PM", badgeColor: "emerald" },
      ],
      verdictText: "✓ POLISHED EXECUTIVE PRESENTATION",
      badgeColor: "emerald",
      explanation: "DATE_FORMAT formats raw database timestamps into human-friendly strings with custom month names, weekday labels, and 12-hour AM/PM clocks.",
    },
    mode_str_to_date: {
      title: "2. Legacy CSV Text Ingestion (STR_TO_DATE)",
      sqlQuery: `-- Parsing legacy Indian (DD/MM/YYYY) and US (MM-DD-YYYY) string formats:
SELECT 
    raw_csv_date,
    STR_TO_DATE(raw_csv_date, '%d/%m/%Y') AS parsed_sql_date,
    DAYNAME(STR_TO_DATE(raw_csv_date, '%d/%m/%Y')) AS verified_day
FROM legacy_excel_import;`,
      resultRows: [
        { name: "Raw: '24/08/2026'", col1: "Parsed: 2026-08-24", col2: "Native SQL DATE", col3: "Day: Monday", badgeColor: "cyan" },
        { name: "Raw: '15/01/2026'", col1: "Parsed: 2026-01-15", col2: "Native SQL DATE", col3: "Day: Thursday", badgeColor: "cyan" },
      ],
      verdictText: "✓ PARSED INTO RELATIONAL DATE",
      badgeColor: "cyan",
      explanation: "STR_TO_DATE parses unstructured text dates from Excel/CSV imports, converting them into standard ISO YYYY-MM-DD relational date columns.",
    },
    mode_calendar_extract: {
      title: "3. Calendar Extraction & Quarterly Buckets (YEAR, MONTH, QUARTER)",
      sqlQuery: `SELECT 
    student_name,
    admission_date,
    YEAR(admission_date) AS admission_year,
    MONTHNAME(admission_date) AS month_name,
    CONCAT('Q', QUARTER(admission_date)) AS fiscal_quarter,
    EXTRACT(WEEK FROM admission_date) AS iso_week_no
FROM students;`,
      resultRows: [
        { name: "Mamata Hui", col1: "Year: 2026", col2: "Month: August", col3: "Quarter: Q3 (Week 34)", badgeColor: "indigo" },
        { name: "Debangshu Roy", col1: "Year: 2026", col2: "Month: January", col3: "Quarter: Q1 (Week 3)", badgeColor: "indigo" },
      ],
      verdictText: "✓ MULTI-DIMENSIONAL EXTRACTION",
      badgeColor: "indigo",
      explanation: "Component extractors isolate years, month names, and quarters to generate multi-dimensional rollup reporting buckets.",
    },
    mode_weekend_filter: {
      title: "4. Weekend Traffic Analytics (DAYNAME & DAYOFWEEK)",
      sqlQuery: `-- Isolating weekend orders (Saturday & Sunday):
SELECT 
    order_id,
    order_date,
    DAYNAME(order_date) AS weekday_name,
    CONCAT('₹', FORMAT(order_amount, 2)) AS amount_inr
FROM customer_orders
WHERE DAYNAME(order_date) IN ('Saturday', 'Sunday')
ORDER BY order_amount DESC;`,
      resultRows: [
        { name: "ORD-7081", col1: "2026-08-22", col2: "Saturday", col3: "₹18,500.00 (Weekend Peak)", badgeColor: "amber" },
        { name: "ORD-7089", col1: "2026-08-23", col2: "Sunday", col3: "₹14,200.00 (Weekend Peak)", badgeColor: "amber" },
      ],
      verdictText: "✓ WEEKEND COMMERCE ISOLATION",
      badgeColor: "amber",
      explanation: "DAYNAME and DAYOFWEEK identify peak commerce shopping days, helping marketing teams schedule weekend promotional campaigns.",
    },
  };

  const currentFormat = formatScenarios[selectedFormatMode];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      sectionRefs.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const addRef = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <>
      {/* ─── Scoped Component Styles & Reveal Keyframes ────────── */}
      <style>{`
        .reveal-section {
          transform: translateY(20px);
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-section.is-visible {
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal-section {
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>

      {/* ─── Main Container ────────────────────────────────────── */}
      <div
        className={clsx(
          "w-full max-w-5xl mx-auto px-4 py-10 md:py-14",
          "bg-slate-950 text-slate-100 font-sans leading-relaxed"
        )}
      >
        {/* ─── Module Breadcrumb & Topic Header ────────────────── */}
        <div ref={addRef} className="reveal-section mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal-400">
            <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
            Module 002_006 · SQL Functions · Topic 6
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Date Extraction &amp; Formatting:{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              DATE_FORMAT, STR_TO_DATE &amp; EXTRACT
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master date formatting and parsing in MySQL: transforming raw timestamps into executive presentation strings with DATE_FORMAT,
            parsing legacy CSV strings with STR_TO_DATE, and isolating quarters, months, and weekdays with EXTRACT.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🎨 DATE_FORMAT('%d-%b-%Y')
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📥 STR_TO_DATE('24/08/2026')
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📊 YEAR(), MONTHNAME(), QUARTER()
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🗓️ DAYNAME() Weekend Analytics
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Formatting & Extraction Mechanics ──────── */}
        <section
          ref={addRef}
          className="reveal-section mb-12 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 shadow-xl shadow-black/40 transition-all duration-300 hover:border-slate-700"
        >
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/20 text-teal-400 font-bold">
              01
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                The Mechanics of Date Formatting Masks &amp; Parsing Pipelines
              </h2>
              <p className="text-xs text-slate-400">
                How format specifiers (%Y, %M, %d, %h) convert binary dates into human strings and parse incoming CSVs
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-teal-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase">1. Presentation Layer Formatting</span>
              <strong className="text-white text-xs block font-mono">DATE_FORMAT(d, '%d-%b-%Y') ➔ '24-Aug-2026'</strong>
              <p className="text-xs text-slate-300">
                Transforms raw timestamps into executive reporting text for web UI dashboards and printable PDF receipts.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-cyan-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">2. Ingestion Parsing Pipeline</span>
              <strong className="text-white text-xs block font-mono">STR_TO_DATE(str, '%d/%m/%Y') ➔ '2026-08-24'</strong>
              <p className="text-xs text-slate-300">
                Parses legacy string inputs (e.g. from bank statements or CSVs) into validated relational <code>DATE</code> data types.
              </p>
            </div>
          </div>

          {/* ── Semantic SVG 1: Formatting & Parsing Pipeline Diagram ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Date Formatting Mask Transformation &amp; CSV String Ingestion
            </h3>
            <svg
              viewBox="0 0 780 130"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Date Formatting and Parsing Diagram"
            >
              {/* DATE_FORMAT Box */}
              <g transform="translate(20, 20)">
                <rect width="350" height="90" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                <rect width="350" height="22" rx="6" fill="#0f172a" stroke="#38bdf8" />
                <text x="175" y="15" fill="#38bdf8" textAnchor="middle" fontWeight="bold" fontSize="10">DATE_FORMAT(date, '%d-%b-%Y')</text>
                <text x="12" y="45" fill="#cbd5e1" fontSize="9">Raw Input: '2026-08-24 14:30:00' (Timestamp)</text>
                <text x="12" y="65" fill="#a7f3d0" fontSize="9" fontWeight="bold">Output: '24-Aug-2026' (Executive String)</text>
                <text x="12" y="82" fill="#38bdf8" fontSize="8">%W (Monday) · %D (24th) · %M (August) · %p (PM)</text>
              </g>

              {/* STR_TO_DATE Box */}
              <g transform="translate(410, 20)">
                <rect width="350" height="90" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                <rect width="350" height="22" rx="6" fill="#0f172a" stroke="#10b981" />
                <text x="175" y="15" fill="#10b981" textAnchor="middle" fontWeight="bold" fontSize="10">STR_TO_DATE(str, '%d/%m/%Y')</text>
                <text x="12" y="45" fill="#fde68a" fontSize="9">Legacy CSV: '24/08/2026' (Unstructured Text)</text>
                <text x="12" y="65" fill="#10b981" fontSize="9" fontWeight="bold">Output: '2026-08-24' (Native SQL DATE)</text>
                <text x="12" y="82" fill="#cbd5e1" fontSize="8">Ensures referential &amp; domain integrity in tables</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Sandbox ────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-12 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 shadow-xl shadow-black/40 transition-all duration-300 hover:border-slate-700"
        >
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400 font-bold">
              02
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Interactive Date Formatting Simulator Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Explore executive presentation formatting, CSV string parsing with STR_TO_DATE, calendar extraction, and weekend analytics
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Scenario Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedFormatMode("mode_executive_formatting")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedFormatMode === "mode_executive_formatting"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                1. Executive Format
              </button>

              <button
                onClick={() => setSelectedFormatMode("mode_str_to_date")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedFormatMode === "mode_str_to_date"
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                2. CSV STR_TO_DATE
              </button>

              <button
                onClick={() => setSelectedFormatMode("mode_calendar_extract")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedFormatMode === "mode_calendar_extract"
                    ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                3. Quarters &amp; Months
              </button>

              <button
                onClick={() => setSelectedFormatMode("mode_weekend_filter")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedFormatMode === "mode_weekend_filter"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                4. Weekend Analytics
              </button>
            </div>

            {/* Sandbox Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Query & Explanation */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white">{currentFormat.title}</span>
                    <span
                      className={clsx(
                        "text-[10px] font-mono px-2 py-0.5 rounded border",
                        currentFormat.badgeColor === "emerald"
                          ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                          : currentFormat.badgeColor === "cyan"
                          ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
                          : currentFormat.badgeColor === "indigo"
                          ? "bg-indigo-500/10 text-indigo-300 border-indigo-500/30"
                          : "bg-amber-500/10 text-amber-300 border-amber-500/30"
                      )}
                    >
                      {currentFormat.verdictText}
                    </span>
                  </div>

                  <pre className="font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap text-[11px] bg-slate-900 p-3 rounded-lg border border-slate-800 max-h-56">
                    {currentFormat.sqlQuery}
                  </pre>

                  <p className="text-[11px] text-slate-300">{currentFormat.explanation}</p>
                </div>
              </div>

              {/* Right: Result Set */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
                  <span className="text-xs font-bold text-slate-200 block border-b border-slate-800 pb-2">
                    Formatted Output Tuples
                  </span>

                  <table className="w-full text-left text-xs font-mono text-slate-300">
                    <thead className="text-[10px] text-teal-400 uppercase border-b border-slate-800 bg-slate-900">
                      <tr>
                        <th className="p-1.5">Entity / Raw Input</th>
                        <th className="p-1.5">Formatted Output 1</th>
                        <th className="p-1.5">Formatted Output 2</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-[11px]">
                      {currentFormat.resultRows.map((r, i) => (
                        <tr key={i} className="bg-slate-950/40">
                          <td className="p-1.5 text-white font-bold">{r.name}</td>
                          <td className="p-1.5 text-cyan-300">{r.col1}</td>
                          <td className="p-1.5 text-emerald-300 font-bold">{r.col2} {r.col3 ? `(${r.col3})` : ""}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: Real-World Case Studies ────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-12 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 shadow-xl shadow-black/40 transition-all duration-300 hover:border-slate-700"
        >
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400 font-bold">
              03
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Real-World Production Scenarios (Classroom Case Studies)
              </h2>
              <p className="text-xs text-slate-400">
                How Barrackpore and Kolkata training institutes format reports and parse external data feeds
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Student Tuition Receipt Printable Formatter
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Generating formal invoice date headers and timestamp lines for student fee payment receipts:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Receipt Date Header Formatter:
SELECT 
    receipt_no,
    student_name,
    CONCAT('₹', FORMAT(amount_paid, 2)) AS amount_paid_inr,
    DATE_FORMAT(payment_time, '%d %M %Y') AS receipt_date,
    DATE_FORMAT(payment_time, 'Generated on %W at %r') AS printable_audit_footer
FROM student_fee_receipts;
-- Output: '24 August 2026' | 'Generated on Monday at 02:30:15 PM'`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Bank Statement CSV Bulk Ingestion ETL
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata Financial Services</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Parsing external bank statement CSV strings into relational transaction tables:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Bank Statement CSV Parsing ETL Pipeline:
INSERT INTO bank_transactions (txn_id, txn_date, description, amount_inr)
SELECT 
    raw_txn_id,
    STR_TO_DATE(raw_date_string, '%d-%m-%Y'), -- Parses '24-08-2026'
    raw_narration,
    CAST(raw_amount_string AS DECIMAL(12,2))
FROM staging_bank_statement_csv;`}
              </pre>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: Common Pitfalls & Best Practices ───────── */}
        <section
          ref={addRef}
          className="reveal-section mb-12 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 shadow-xl shadow-black/40 transition-all duration-300 hover:border-slate-700"
        >
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 font-bold">
              04
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Common Mistakes & Production Best Practices
              </h2>
              <p className="text-xs text-slate-400">
                Guidelines for formatting and parsing date strings safely and performantly
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pitfalls */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
                <span>❌</span> Common Pitfalls
              </h3>
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 space-y-2.5 text-xs text-slate-300">
                <div>
                  <strong className="text-white">1. Non-SARGable DATE_FORMAT in WHERE:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Writing <code>WHERE DATE_FORMAT(order_date, '%Y') = '2026'</code> triggers full table scans; use date ranges instead.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Confusing %m and %M:</strong>
                  <p className="text-slate-400 mt-0.5">
                    <code>%m</code> produces 2-digit numeric month ('08'); <code>%M</code> produces the full month name ('August').
                  </p>
                </div>
              </div>
            </div>

            {/* Best Practices */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>✅</span> Production Best Practices
              </h3>
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-2.5 text-xs text-slate-300">
                <div>
                  <strong className="text-white">1. Format at Presentation Layer:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Store clean ISO <code>DATE</code> types in tables and apply <code>DATE_FORMAT()</code> only in SELECT outputs for display.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Validate CSVs with STR_TO_DATE:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Parse legacy Excel/CSV date text with <code>STR_TO_DATE()</code> during ETL to prevent corrupted date insertions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: Summary Checklist ─────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-12 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 shadow-xl shadow-black/40"
        >
          <h2 className="text-lg md:text-xl font-bold text-white border-b border-slate-800 pb-3">
            Summary Checklist (What You Must Remember)
          </h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm text-slate-300">
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>DATE_FORMAT(d, mask) converts dates into custom presentation strings</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>STR_TO_DATE(str, mask) parses legacy CSV text into native SQL DATE</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>YEAR(), MONTHNAME(), and QUARTER() isolate reporting group dimensions</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>DAYNAME() and DAYOFWEEK() identify weekend and weekday trends</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>%Y is 4-digit year; %y is 2-digit; %M is full month; %b is 3-letter month</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Keep WHERE filters SARGable: avoid wrapping index columns in DATE_FORMAT</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Date Extraction &amp; Formatting – FAQs"
            questions={questions}
            subtitle="Master date formatting masks, DATE_FORMAT presentation strings, legacy CSV parsing with STR_TO_DATE, and component extraction with 30 comprehensive Q&As"
            showPrint
            showExpandAll
            showSearch
            showProgress
          />
        </section>

        {/* ─── SECTION 7: Plain Text Printable Study Note ───────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <PlainTextPrint
            content={noteText}
            title="Date Extraction &amp; Formatting: EXTRACT, DATE_FORMAT, STR_TO_DATE, YEAR, MONTH, DAY"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic6_date_formatting_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Formatting is how raw database facts turn into client-ready executive reports! " +
              "In my classroom at Coder & AccoTax in Barrackpore, I share two essential principles: " +
              "First, never store formatted date strings in your database tables. " +
              "Always store standard `DATE` or `DATETIME` types in `YYYY-MM-DD` format, " +
              "and use `DATE_FORMAT(d, '%d-%b-%Y')` in your queries to produce beautiful printable receipts. " +
              "Second, when importing legacy CSV files from clients with dates like `'24/08/2026'`, " +
              "`STR_TO_DATE(str, '%d/%m/%Y')` is your superpower for converting dirty spreadsheet dates into spotless relational tables!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 6 · Date Formatting · Module 002_006 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic6;
