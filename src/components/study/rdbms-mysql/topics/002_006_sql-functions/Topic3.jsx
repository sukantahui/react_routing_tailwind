import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

/**
 * Topic3 – Numeric & Math Functions: ROUND, TRUNCATE, CEIL, FLOOR, ABS, MOD, POWER, SQRT
 * Module: 002_006_sql-functions (Built-in Functions, Grouping & Aggregations)
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Math Function Simulator Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic3 = () => {
  const sectionRefs = useRef([]);

  // Interactive Math Function State
  const [selectedMathMode, setSelectedMathMode] = useState("mode_round_vs_truncate"); // "mode_round_vs_truncate" | "mode_ceil_floor_paging" | "mode_abs_variance" | "mode_mod_partition"

  const mathScenarios = {
    mode_round_vs_truncate: {
      title: "1. GST Precision: ROUND() vs TRUNCATE()",
      sqlQuery: `SELECT 
    course_title,
    course_fee AS base_fee,
    ROUND(course_fee * 1.18, 2) AS rounded_fee_with_gst,
    TRUNCATE(course_fee / 3, 2) AS truncated_installment,
    ROUND(course_fee / 3, 2) AS rounded_installment
FROM courses
LIMIT 3;`,
      resultRows: [
        { item: "MySQL Master (₹4,500)", col1: "GST: ₹5,310.00", col2: "Truncated: ₹1,500.00", col3: "Rounded: ₹1,500.00", badgeColor: "emerald" },
        { item: "React Architect (₹5,500)", col1: "GST: ₹6,490.00", col2: "Truncated: ₹1,833.33", col3: "Rounded: ₹1,833.33", badgeColor: "emerald" },
        { item: "Python AI (₹4,999.99)", col1: "GST: ₹5,899.99", col2: "Truncated: ₹1,666.66", col3: "Rounded: ₹1,666.66", badgeColor: "emerald" },
      ],
      verdictText: "✓ EXACT DECIMAL PRECISION",
      badgeColor: "emerald",
      explanation: "ROUND() uses half-up mathematical rounding, while TRUNCATE() chops off decimal places without rounding. Always use DECIMAL data types for financial currency!",
    },
    mode_ceil_floor_paging: {
      title: "2. Web App Pagination & Packaging (CEIL vs FLOOR)",
      sqlQuery: `-- Calculating pagination page count and full package boxes:
SELECT 
    total_enrolled_students,
    10 AS page_size,
    CEIL(total_enrolled_students / 10) AS total_pages_required,
    FLOOR(total_enrolled_students / 10) AS full_study_groups
FROM batch_metrics;`,
      resultRows: [
        { item: "105 Students", col1: "Page Size: 10", col2: "CEIL: 11 Pages Required", col3: "FLOOR: 10 Full Groups (5 Leftover)", badgeColor: "cyan" },
        { item: "42 Students", col1: "Page Size: 10", col2: "CEIL: 5 Pages Required", col3: "FLOOR: 4 Full Groups (2 Leftover)", badgeColor: "cyan" },
        { item: "80 Students", col1: "Page Size: 10", col2: "CEIL: 8 Pages Required", col3: "FLOOR: 8 Full Groups (0 Leftover)", badgeColor: "cyan" },
      ],
      verdictText: "✓ PAGINATION PAGE MATH",
      badgeColor: "cyan",
      explanation: "CEIL(total / size) guarantees that any remainder records receive their own dedicated page, eliminating pagination cut-off bugs.",
    },
    mode_abs_variance: {
      title: "3. Budget vs Actual Variance Magnitude (ABS)",
      sqlQuery: `-- Calculating absolute variance in Indian Rupee (₹):
SELECT 
    department_name,
    budget_allocated,
    actual_expense,
    (actual_expense - budget_allocated) AS signed_variance,
    ABS(actual_expense - budget_allocated) AS absolute_variance_magnitude
FROM departmental_ledgers;`,
      resultRows: [
        { item: "Lab Infrastructure", col1: "Budget: ₹1,00,000", col2: "Actual: ₹1,12,000 (+₹12k)", col3: "ABS Magnitude: ₹12,000.00", badgeColor: "indigo" },
        { item: "Library Books", col1: "Budget: ₹50,000", col2: "Actual: ₹43,500 (-₹6.5k)", col3: "ABS Magnitude: ₹6,500.00", badgeColor: "indigo" },
      ],
      verdictText: "✓ SIGN-INDEPENDENT MAGNITUDE",
      badgeColor: "indigo",
      explanation: "ABS() returns the positive magnitude of difference, essential for sorting audit ledgers by the severity of the financial variance.",
    },
    mode_mod_partition: {
      title: "4. Round-Robin Lab Partitioning (MOD & %)",
      sqlQuery: `-- Assigning students into 3 lab rooms (Lab 1, Lab 2, Lab 3):
SELECT 
    student_id,
    student_name,
    MOD(student_id, 3) AS zero_based_mod,
    (MOD(student_id, 3) + 1) AS assigned_lab_room,
    CASE WHEN MOD(student_id, 2) = 0 THEN 'Even Roll' ELSE 'Odd Roll' END AS roll_parity
FROM students;`,
      resultRows: [
        { item: "101 - Mamata Hui", col1: "Mod 3: 2", col2: "Assigned: Lab Room 3", col3: "Roll: Odd (101)", badgeColor: "amber" },
        { item: "102 - Debangshu Roy", col1: "Mod 3: 0", col2: "Assigned: Lab Room 1", col3: "Roll: Even (102)", badgeColor: "amber" },
        { item: "103 - Susmita Sen", col1: "Mod 3: 1", col2: "Assigned: Lab Room 2", col3: "Roll: Odd (103)", badgeColor: "amber" },
      ],
      verdictText: "✓ ROUND-ROBIN PARTITIONING",
      badgeColor: "amber",
      explanation: "MOD(id, N) + 1 distributes students evenly across N resources (e.g. 3 labs or 4 server shards) in balanced round-robin sequence.",
    },
  };

  const currentMath = mathScenarios[selectedMathMode];

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
            Module 002_006 · SQL Functions · Topic 3
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Numeric &amp; Math Functions:{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              ROUND, TRUNCATE, CEIL &amp; MOD
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master numeric scalar calculations in MySQL: precision rounding with ROUND and TRUNCATE, pagination page counts with CEIL,
            financial variance magnitudes with ABS, and round-robin load distribution with MOD.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🎯 ROUND(x, d) vs TRUNCATE(x, d)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📄 CEIL(total / size) for Pagination
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚖️ ABS() for Audit Variances
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔄 MOD(n, m) Round-Robin Partitions
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Numeric Math Theory & Mechanics ────────── */}
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
                The Mechanics of SQL Mathematical Precision
              </h2>
              <p className="text-xs text-slate-400">
                Understanding rounding vs truncation, ceiling/floor integer boundaries, and modulus arithmetic
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-teal-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase">1. Rounding vs Truncation</span>
              <strong className="text-white text-xs block font-mono">ROUND(125.768, 2) = 125.77 | TRUNCATE = 125.76</strong>
              <p className="text-xs text-slate-300">
                <code>ROUND()</code> evaluates the (d+1)th digit for half-up rounding, while <code>TRUNCATE()</code> discards digits past d without rounding.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-cyan-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">2. Ceiling vs Floor</span>
              <strong className="text-white text-xs block font-mono">CEIL(4.1) = 5 | FLOOR(4.9) = 4</strong>
              <p className="text-xs text-slate-300">
                <code>CEIL()</code> always rounds up to the next integer (essential for page counts), while <code>FLOOR()</code> rounds down.
              </p>
            </div>
          </div>

          {/* ── Semantic SVG 1: Round vs Truncate & CEIL Diagram ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Decimal Rounding Precision vs Pagination CEIL Architecture
            </h3>
            <svg
              viewBox="0 0 780 130"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Numeric Math Functions Diagram"
            >
              {/* Decimal Precision Box */}
              <g transform="translate(20, 20)">
                <rect width="350" height="90" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                <rect width="350" height="22" rx="6" fill="#0f172a" stroke="#38bdf8" />
                <text x="175" y="15" fill="#38bdf8" textAnchor="middle" fontWeight="bold" fontSize="10">Decimal Precision: Input 125.768</text>
                <text x="12" y="45" fill="#a7f3d0" fontSize="9">ROUND(125.768, 2) ➔ 125.77 (Half-Up)</text>
                <text x="12" y="65" fill="#fde68a" fontSize="9">TRUNCATE(125.768, 2) ➔ 125.76 (Chop Digits)</text>
                <text x="12" y="82" fill="#94a3b8" fontSize="8">Negative: ROUND(1560, -2) ➔ 1600 (Hundreds)</text>
              </g>

              {/* Pagination CEIL Box */}
              <g transform="translate(410, 20)">
                <rect width="350" height="90" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                <rect width="350" height="22" rx="6" fill="#0f172a" stroke="#10b981" />
                <text x="175" y="15" fill="#10b981" textAnchor="middle" fontWeight="bold" fontSize="10">Web Pagination Math: 105 Items / 10 Page</text>
                <text x="12" y="45" fill="#10b981" fontSize="9" fontWeight="bold">CEIL(105 / 10) ➔ 11 Pages (Zero Cutoff)</text>
                <text x="12" y="65" fill="#fca5a5" fontSize="9">FLOOR(105 / 10) ➔ 10 Pages (5 Items Lost!)</text>
                <text x="12" y="82" fill="#38bdf8" fontSize="8">ABS(budget - actual) ➔ Positive Variance</text>
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
                Interactive Math Function Simulator Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Explore GST rounding vs truncation, pagination page math, variance calculations with ABS, and round-robin partitioning with MOD
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Scenario Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedMathMode("mode_round_vs_truncate")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedMathMode === "mode_round_vs_truncate"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                1. ROUND vs TRUNCATE
              </button>

              <button
                onClick={() => setSelectedMathMode("mode_ceil_floor_paging")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedMathMode === "mode_ceil_floor_paging"
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                2. CEIL Pagination
              </button>

              <button
                onClick={() => setSelectedMathMode("mode_abs_variance")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedMathMode === "mode_abs_variance"
                    ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                3. ABS Variance (₹)
              </button>

              <button
                onClick={() => setSelectedMathMode("mode_mod_partition")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedMathMode === "mode_mod_partition"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                4. MOD Partitioning
              </button>
            </div>

            {/* Sandbox Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Query & Explanation */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white">{currentMath.title}</span>
                    <span
                      className={clsx(
                        "text-[10px] font-mono px-2 py-0.5 rounded border",
                        currentMath.badgeColor === "emerald"
                          ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                          : currentMath.badgeColor === "cyan"
                          ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
                          : currentMath.badgeColor === "indigo"
                          ? "bg-indigo-500/10 text-indigo-300 border-indigo-500/30"
                          : "bg-amber-500/10 text-amber-300 border-amber-500/30"
                      )}
                    >
                      {currentMath.verdictText}
                    </span>
                  </div>

                  <pre className="font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap text-[11px] bg-slate-900 p-3 rounded-lg border border-slate-800 max-h-56">
                    {currentMath.sqlQuery}
                  </pre>

                  <p className="text-[11px] text-slate-300">{currentMath.explanation}</p>
                </div>
              </div>

              {/* Right: Result Set */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
                  <span className="text-xs font-bold text-slate-200 block border-b border-slate-800 pb-2">
                    Calculated Numeric Output
                  </span>

                  <table className="w-full text-left text-xs font-mono text-slate-300">
                    <thead className="text-[10px] text-teal-400 uppercase border-b border-slate-800 bg-slate-900">
                      <tr>
                        <th className="p-1.5">Input / Entity</th>
                        <th className="p-1.5">Computed Metric 1</th>
                        <th className="p-1.5">Computed Metric 2</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-[11px]">
                      {currentMath.resultRows.map((r, i) => (
                        <tr key={i} className="bg-slate-950/40">
                          <td className="p-1.5 text-white font-bold">{r.item}</td>
                          <td className="p-1.5 text-cyan-300">{r.col1} ({r.col2})</td>
                          <td className="p-1.5 text-emerald-300 font-bold">{r.col3}</td>
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
                How Barrackpore and Kolkata training institutes apply numeric math functions in finance and reporting
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Student EMI Installment &amp; GST Tax Billing
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Splitting course fees into 3 monthly installments with exact GST in Indian Rupee (₹):
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- 3-Month EMI Installment Calculation:
SELECT 
    course_id,
    course_title,
    course_fee AS base_fee_inr,
    ROUND(course_fee * 0.18, 2) AS gst_18pct,
    ROUND(course_fee * 1.18, 2) AS total_payable_inr,
    ROUND((course_fee * 1.18) / 3, 2) AS monthly_emi_installment
FROM courses;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Warehouse Packing Box Optimization
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata E-Commerce</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Calculating required master carton boxes and loose residual units:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Warehouse Packaging Math:
SELECT 
    product_name,
    stock_quantity,
    12 AS units_per_master_box,
    FLOOR(stock_quantity / 12) AS full_master_cartons,
    MOD(stock_quantity, 12) AS loose_individual_units,
    CEIL(stock_quantity / 12) AS total_boxes_to_reserve
FROM inventory_stock;`}
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
                Guidelines for avoiding precision loss and calculation bugs in database applications
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
                  <strong className="text-white">1. Using FLOAT for Financial Math:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Binary floating point causes rounding errors (e.g. <code>0.1 + 0.2 != 0.3</code>); always use <code>DECIMAL(12, 2)</code>.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Calling TRUNCATE Without Decimals:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Unlike <code>ROUND(x)</code>, <code>TRUNCATE(x)</code> throws a syntax error if the second argument is omitted.
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
                  <strong className="text-white">1. Use CEIL for Pagination:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Calculate page counts with <code>CEIL(total / page_size)</code> to ensure remainder rows have a page.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Use ABS for Audit Variances:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Wrap budget-vs-actual variances in <code>ABS()</code> to sort reports by the magnitude of discrepancy.
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
              <span>ROUND(x, d) rounds half-up; TRUNCATE(x, d) chops off decimal places</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Negative decimal parameters (d &lt; 0) round to tens, hundreds, thousands</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>CEIL() rounds up to next integer; FLOOR() rounds down</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Always use CEIL(total / page_size) to calculate web pagination pages</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>ABS() returns absolute positive magnitude for variance tracking</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>MOD(id, N) + 1 distributes workloads in balanced round-robin sequence</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Numeric &amp; Math Functions – FAQs"
            questions={questions}
            subtitle="Master mathematical functions, ROUND vs TRUNCATE precision, CEIL pagination formulas, ABS variance calculations, and MOD round-robin distribution with 30 comprehensive Q&As"
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
            title="Numeric &amp; Math Functions: ROUND, TRUNCATE, CEIL, FLOOR, ABS, MOD, POWER, SQRT"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic3_numeric_math_functions_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Mathematical precision in MySQL is what keeps balance sheets balanced and web apps bug-free! " +
              "In my classroom at Coder & AccoTax in Barrackpore, I remind students: " +
              "'If you calculate pagination using integer division `105 / 10`, you get 10 pages—and 5 students on page 11 vanish from the user interface!' " +
              "Always use `CEIL(total / page_size)` so remainder records always get their page. " +
              "And when dealing with currency in Indian Rupee (₹), always store prices as `DECIMAL(12, 2)` and round with `ROUND(amount, 2)` " +
              "so you never suffer from binary floating-point round-off errors!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 3 · Math Functions · Module 002_006 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic3;
