import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

/**
 * Topic0 – Scalar Functions vs Aggregate Functions Overview
 * Module: 002_006_sql-functions (Built-in Functions, Grouping & Aggregations)
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Scalar vs Aggregate Simulator Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic0 = () => {
  const sectionRefs = useRef([]);

  // Interactive Function Transformation State
  const [selectedFuncMode, setSelectedFuncMode] = useState("mode_scalar_transform"); // "mode_scalar_transform" | "mode_aggregate_compress" | "mode_where_vs_having" | "mode_null_handling"

  const functionScenarios = {
    mode_scalar_transform: {
      title: "1. Scalar Functions (1-to-1 Row Transformation)",
      sqlQuery: `-- Scalar functions transform each row independently (1-to-1):
SELECT 
    student_id,
    UPPER(student_name) AS uppercase_name,
    CONCAT(city, ' Campus') AS formatted_location,
    course_fee AS base_fee,
    ROUND(course_fee * 1.18, 2) AS fee_with_18pct_gst
FROM students
LIMIT 4;`,
      transformationType: "1-to-1 Mapping (4 Input Rows ➔ 4 Output Rows)",
      resultRows: [
        { col1: "101", col2: "MAMATA HUI", col3: "Barrackpore Campus", col4: "₹4,500.00", col5: "₹5,310.00", badgeColor: "emerald" },
        { col1: "102", col2: "DEBANGSHU ROY", col3: "Barrackpore Campus", col4: "₹5,500.00", col5: "₹6,490.00", badgeColor: "emerald" },
        { col1: "103", col2: "SUSMITA SEN", col3: "Ichapur Campus", col4: "₹4,000.00", col5: "₹4,720.00", badgeColor: "emerald" },
        { col1: "104", col2: "MAHIMA SHAW", col3: "Jadavpur Campus", col4: "₹6,000.00", col5: "₹7,080.00", badgeColor: "emerald" },
      ],
      verdictText: "✓ 1-TO-1 ROW TRANSFORMATION",
      badgeColor: "emerald",
      explanation: "Scalar functions operate on each row in isolation. 4 students in results in 4 transformed student rows with uppercase names and calculated GST.",
    },
    mode_aggregate_compress: {
      title: "2. Aggregate Functions (N-to-1 Multi-Row Compression)",
      sqlQuery: `-- Aggregate functions compress multiple rows into 1 summary (N-to-1):
SELECT 
    COUNT(student_id) AS total_students,
    CONCAT('₹', FORMAT(SUM(course_fee), 2)) AS total_tuition,
    CONCAT('₹', FORMAT(AVG(course_fee), 2)) AS average_fee,
    CONCAT('₹', FORMAT(MIN(course_fee), 2)) AS min_fee,
    CONCAT('₹', FORMAT(MAX(course_fee), 2)) AS max_fee
FROM students;`,
      transformationType: "N-to-1 Compression (4 Input Rows ➔ 1 Summary Row)",
      resultRows: [
        { col1: "Count: 4 Students", col2: "Total: ₹20,000.00", col3: "Average: ₹5,000.00", col4: "Min: ₹4,000.00", col5: "Max: ₹6,000.00", badgeColor: "cyan" },
      ],
      verdictText: "✓ N-TO-1 SUMMARY COMPRESSION",
      badgeColor: "cyan",
      explanation: "The Big 5 aggregate functions compress the entire table into a single summary tuple with statistical metrics in Indian Rupee (₹).",
    },
    mode_where_vs_having: {
      title: "3. The Execution Order Rule (WHERE vs HAVING)",
      sqlQuery: `-- ❌ ILLEGAL (Throws Error 1111: Invalid use of group function):
-- SELECT city, AVG(course_fee) FROM students WHERE AVG(course_fee) > 4500 GROUP BY city;

-- ✅ CORRECT: Group-level filters belong in the HAVING clause!
SELECT 
    city,
    COUNT(student_id) AS student_count,
    CONCAT('₹', FORMAT(AVG(course_fee), 2)) AS avg_fee
FROM students
GROUP BY city
HAVING AVG(course_fee) >= 5000;`,
      transformationType: "Filter Execution Timeline (WHERE: Pre-Group | HAVING: Post-Group)",
      resultRows: [
        { col1: "Barrackpore", col2: "Count: 2 Students", col3: "Avg: ₹5,000.00", col4: "Filter: Passed (>= ₹5k)", col5: "Retained in Report", badgeColor: "emerald" },
        { col1: "Jadavpur", col2: "Count: 1 Student", col3: "Avg: ₹6,000.00", col4: "Filter: Passed (>= ₹5k)", col5: "Retained in Report", badgeColor: "emerald" },
      ],
      verdictText: "✓ HAVING FILTERS AGGREGATED GROUPS",
      badgeColor: "emerald",
      explanation: "WHERE filters raw rows before grouping; HAVING filters aggregated metric results after GROUP BY evaluation.",
    },
    mode_null_handling: {
      title: "4. NULL Handling in Aggregates (AVG Ignores NULLs)",
      sqlQuery: `-- Demonstrating NULL elimination in AVG():
-- Scores: Mamata (90), Debangshu (80), Susmita (NULL - Absent)
SELECT 
    COUNT(*) AS total_rows,
    COUNT(exam_score) AS scored_students,
    AVG(exam_score) AS avg_score_calculated,
    ROUND((90 + 80) / 2, 1) AS expected_formula
FROM exam_submissions;
-- Notice: AVG is (90 + 80) / 2 = 85.0 (NOT divided by 3)!`,
      transformationType: "NULL Elimination in Aggregates (Nulls Excluded from Denominator)",
      resultRows: [
        { col1: "Rows: 3 (COUNT *)", col2: "Non-Nulls: 2 (COUNT col)", col3: "Calculated AVG: 85.0", col4: "Formula: (90+80)/2", col5: "Zero Skew ✓", badgeColor: "indigo" },
      ],
      verdictText: "✓ NULL VALUES EXCLUDED FROM DENOMINATOR",
      badgeColor: "indigo",
      explanation: "AVG() divides the sum only by the count of non-null values (2), preventing absent students from unfairly depressing class averages.",
    },
  };

  const currentFunc = functionScenarios[selectedFuncMode];

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
            Module 002_006 · SQL Functions · Topic 0
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Scalar Functions vs Aggregate Functions:{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Row Transforms &amp; Data Summaries
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master the foundational taxonomy of SQL functions: 1-to-1 single-row scalar transformations vs N-to-1 multi-row group aggregations,
            execution order rules (WHERE vs HAVING), NULL elimination, and deterministic calculations.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔄 1-to-1 Scalar Row Mapping
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📊 N-to-1 Aggregate Compression
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚖️ WHERE vs HAVING Evaluation Rules
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🚫 NULL Elimination Dynamics
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Scalar vs Aggregate Theory ─────────────── */}
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
                The Mechanics of Row Transformations &amp; Group Compression
              </h2>
              <p className="text-xs text-slate-400">
                Understanding cardinality shifts: Single-row evaluation vs multi-row reduction
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-teal-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase">1. Scalar Functions ($1 \to 1$)</span>
              <strong className="text-white text-xs block font-mono">CONCAT(), UPPER(), ROUND(), NOW()</strong>
              <p className="text-xs text-slate-300">
                Operates on each row independently. Can be evaluated anywhere in SQL (<code>SELECT</code>, <code>WHERE</code>, <code>ORDER BY</code>, <code>ON</code>).
              </p>
            </div>

            <div className="p-4 rounded-xl border border-cyan-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">2. Aggregate Functions ($N \to 1$)</span>
              <strong className="text-white text-xs block font-mono">COUNT(), SUM(), AVG(), MIN(), MAX()</strong>
              <p className="text-xs text-slate-300">
                Compresses multiple rows into a single summary scalar. Illegal in <code>WHERE</code> clauses; must be filtered in <code>HAVING</code>.
              </p>
            </div>
          </div>

          {/* ── Semantic SVG 1: Transformation vs Compression Diagram ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Scalar 1-to-1 Mapping vs Aggregate N-to-1 Compression Architecture
            </h3>
            <svg
              viewBox="0 0 780 140"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Scalar vs Aggregate Functions Diagram"
            >
              {/* Scalar Pipeline (Top Half) */}
              <g transform="translate(20, 15)">
                <rect width="180" height="40" rx="4" fill="#1e293b" stroke="#38bdf8" />
                <text x="90" y="24" fill="#38bdf8" textAnchor="middle" fontSize="9">Input: 100 Student Rows</text>
              </g>

              <g transform="translate(210, 25)">
                <line x1="0" y1="10" x2="30" y2="10" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="30,5 40,10 30,15" fill="#38bdf8" />
                <text x="20" y="0" fill="#38bdf8" textAnchor="middle" fontSize="7">UPPER(name)</text>
              </g>

              <g transform="translate(260, 15)">
                <rect width="180" height="40" rx="4" fill="#0f172a" stroke="#10b981" />
                <text x="90" y="24" fill="#10b981" textAnchor="middle" fontSize="9" fontWeight="bold">Output: 100 Transformed Rows</text>
              </g>

              {/* Aggregate Pipeline (Bottom Half) */}
              <g transform="translate(20, 80)">
                <rect width="180" height="40" rx="4" fill="#1e293b" stroke="#f59e0b" />
                <text x="90" y="24" fill="#f59e0b" textAnchor="middle" fontSize="9">Input: 100 Student Rows</text>
              </g>

              <g transform="translate(210, 90)">
                <line x1="0" y1="10" x2="30" y2="10" stroke="#f59e0b" strokeWidth="2" />
                <polygon points="30,5 40,10 30,15" fill="#f59e0b" />
                <text x="20" y="0" fill="#f59e0b" textAnchor="middle" fontSize="7">AVG(fee)</text>
              </g>

              <g transform="translate(260, 80)">
                <rect width="180" height="40" rx="4" fill="#0f172a" stroke="#818cf8" />
                <text x="90" y="24" fill="#818cf8" textAnchor="middle" fontSize="9" fontWeight="bold">Output: Exactly 1 Summary Value</text>
              </g>

              {/* Right Summary Box */}
              <g transform="translate(480, 20)">
                <rect width="280" height="100" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                <text x="140" y="22" fill="#10b981" textAnchor="middle" fontWeight="bold" fontSize="10">Cardinality Transformation Rules</text>
                <text x="12" y="45" fill="#cbd5e1" fontSize="8">✓ Scalar: Preserves full table row count</text>
                <text x="12" y="65" fill="#fde68a" fontSize="8">✓ Aggregate: Compresses rows down to 1 value</text>
                <text x="12" y="85" fill="#38bdf8" fontSize="8" fontWeight="bold">WHERE filters rows; HAVING filters aggregates</text>
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
                Interactive Scalar vs Aggregate Simulator Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Explore row transformations, multi-row compressions, WHERE vs HAVING execution rules, and NULL dynamics
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Scenario Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedFuncMode("mode_scalar_transform")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedFuncMode === "mode_scalar_transform"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                1. Scalar Transforms
              </button>

              <button
                onClick={() => setSelectedFuncMode("mode_aggregate_compress")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedFuncMode === "mode_aggregate_compress"
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                2. Aggregate Compression
              </button>

              <button
                onClick={() => setSelectedFuncMode("mode_where_vs_having")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedFuncMode === "mode_where_vs_having"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                3. WHERE vs HAVING
              </button>

              <button
                onClick={() => setSelectedFuncMode("mode_null_handling")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedFuncMode === "mode_null_handling"
                    ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                4. NULL Elimination
              </button>
            </div>

            {/* Sandbox Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Query & Explanation */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white">{currentFunc.title}</span>
                    <span
                      className={clsx(
                        "text-[10px] font-mono px-2 py-0.5 rounded border",
                        currentFunc.badgeColor === "emerald"
                          ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                          : currentFunc.badgeColor === "cyan"
                          ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
                          : currentFunc.badgeColor === "indigo"
                          ? "bg-indigo-500/10 text-indigo-300 border-indigo-500/30"
                          : "bg-amber-500/10 text-amber-300 border-amber-500/30"
                      )}
                    >
                      {currentFunc.verdictText}
                    </span>
                  </div>

                  <pre className="font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap text-[11px] bg-slate-900 p-3 rounded-lg border border-slate-800 max-h-56">
                    {currentFunc.sqlQuery}
                  </pre>

                  <div className="text-[11px] text-slate-300">
                    <span className="text-teal-400 font-bold">Transformation Cardinality: </span>
                    <code>{currentFunc.transformationType}</code>
                    <p className="mt-1">{currentFunc.explanation}</p>
                  </div>
                </div>
              </div>

              {/* Right: Result Set */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
                  <span className="text-xs font-bold text-slate-200 block border-b border-slate-800 pb-2">
                    Evaluated Output Tuples
                  </span>

                  <table className="w-full text-left text-xs font-mono text-slate-300">
                    <thead className="text-[10px] text-teal-400 uppercase border-b border-slate-800 bg-slate-900">
                      <tr>
                        <th className="p-1.5">Attribute 1</th>
                        <th className="p-1.5">Attribute 2</th>
                        <th className="p-1.5">Attribute 3</th>
                        <th className="p-1.5">Computed Result</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-[11px]">
                      {currentFunc.resultRows.map((r, i) => (
                        <tr key={i} className="bg-slate-950/40">
                          <td className="p-1.5 text-white font-bold">{r.col1}</td>
                          <td className="p-1.5 text-cyan-300">{r.col2}</td>
                          <td className="p-1.5 text-slate-300">{r.col3}</td>
                          <td className="p-1.5 text-emerald-300 font-bold">{r.col4} {r.col5 ? `(${r.col5})` : ""}</td>
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
                How Barrackpore and Kolkata training institutes combine scalar and aggregate functions in live systems
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Student Admission Revenue &amp; Age Group Analytics
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Combining scalar date extraction (`TIMESTAMPDIFF`) with group aggregations (`SUM`, `AVG`) in Indian Rupee (₹):
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Combining Scalar Age Derivation with Group Revenue Aggregates:
SELECT 
    CASE 
        WHEN TIMESTAMPDIFF(YEAR, dob, CURDATE()) < 22 THEN 'College Students (< 22)'
        ELSE 'Working Professionals (22+)'
    END AS student_demographic,
    COUNT(student_id) AS total_enrolled,
    CONCAT('₹', FORMAT(SUM(course_fee), 2)) AS total_revenue_inr,
    CONCAT('₹', FORMAT(AVG(course_fee), 2)) AS average_ticket_size
FROM students
GROUP BY student_demographic;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's E-Commerce High-Value City Revenue Report
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata E-Commerce</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Applying scalar string transformations with aggregate HAVING filters:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Filtering Aggregated City Revenue with HAVING:
SELECT 
    UPPER(TRIM(c.city)) AS city_name,
    COUNT(DISTINCT c.customer_id) AS total_customers,
    COUNT(o.order_id) AS total_orders,
    CONCAT('₹', FORMAT(SUM(o.total_amount), 2)) AS city_gross_revenue
FROM customers c
INNER JOIN orders o USING (customer_id)
WHERE o.status = 'COMPLETED'
GROUP BY UPPER(TRIM(c.city))
HAVING SUM(o.total_amount) >= 50000.00
ORDER BY SUM(o.total_amount) DESC;`}
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
                Guidelines for writing error-free, performant scalar transformations and group aggregations
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
                  <strong className="text-white">1. Aggregate in WHERE Clause:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Writing <code>WHERE AVG(fee) &gt; 5000</code> throws MySQL Error 1111; aggregate conditions must be placed in <code>HAVING</code>.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Wrapping Index Columns in Scalar Functions:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Writing <code>WHERE YEAR(order_date) = 2026</code> disables B-Tree index seeks, triggering full table scans.
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
                  <strong className="text-white">1. Write SARGable Date Range Predicates:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Use <code>WHERE order_date &gt;= '2026-01-01' AND order_date &lt; '2027-01-01'</code> to preserve fast B-Tree index seek lookups.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Wrap SUM() in COALESCE():</strong>
                  <p className="text-slate-400 mt-0.5">
                    Use <code>COALESCE(SUM(amount), 0)</code> to guarantee numeric zero output on empty datasets rather than NULL.
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
              <span>Scalar functions operate row-by-row (1-to-1 cardinality mapping)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Aggregate functions compress multi-row groups (N-to-1 reduction)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Aggregate functions are illegal in WHERE clauses; use HAVING instead</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Aggregates ignore NULLs during calculation (except COUNT(*))</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Avoid wrapping indexed columns in scalar functions to maintain SARGability</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Wrap aggregate sums in COALESCE(SUM(col), 0) to handle empty tables safely</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Scalar vs Aggregate Functions – FAQs"
            questions={questions}
            subtitle="Master scalar row transformations vs aggregate multi-row compressions, WHERE vs HAVING execution rules, NULL handling dynamics, and SARGable queries with 30 comprehensive Q&As"
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
            title="Scalar Functions vs Aggregate Functions Overview"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic0_scalar_vs_aggregate_functions_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Welcome to Module 002_006: Built-in Functions, Grouping & Aggregations! " +
              "In my classroom at Coder & AccoTax in Barrackpore, I teach students: " +
              "'SQL functions are your toolkit for transforming raw database records into polished executive intelligence.' " +
              "Always maintain crystal-clear separation in your mind between Scalar Functions (which evaluate 1 row at a time) " +
              "and Aggregate Functions (which compress a thousand rows into 1 summary statistic). " +
              "Remember: you can NEVER filter an aggregate in a `WHERE` clause because `WHERE` executes before grouping happens. " +
              "Let `WHERE` filter your raw rows, let `GROUP BY` organize them into buckets, and let `HAVING` filter your final aggregate results!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 0 · Functions Overview · Module 002_006 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic0;
