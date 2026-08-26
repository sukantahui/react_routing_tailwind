import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";

/**
 * Topic7 – Multi-Table Joins: Connecting 3, 4, or More Tables in a Single Query
 * Module: 002_005_sql-joins (Mastering SQL Joins & Multi-Table Queries)
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Multi-Table Join Simulator Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic7 = () => {
  const sectionRefs = useRef([]);

  // Interactive Multi-Table Join State
  const [selectedPipelineKey, setSelectedPipelineKey] = useState("pipe_academy_4table"); // "pipe_academy_4table" | "pipe_ecommerce_5table" | "pipe_mixed_danger" | "pipe_safe_outer_chain"

  const pipelineScenarios = {
    pipe_academy_4table: {
      title: "1. 4-Table Academy Pipeline (Students ➔ Enrollments ➔ Courses ➔ Instructors)",
      sqlQuery: `SELECT 
    s.student_name,
    s.city,
    c.course_title,
    i.instructor_name,
    e.enrollment_date,
    c.course_fee
FROM students s
INNER JOIN enrollments e ON s.student_id = e.student_id
INNER JOIN courses c ON e.course_id = c.course_id
INNER JOIN instructors i ON c.instructor_id = i.instructor_id
WHERE s.city = 'Barrackpore';`,
      resultRows: [
        { col1: "Mamata Hui", col2: "Barrackpore", col3: "MySQL Master", col4: "Sukanta Hui", col5: "₹4,500", badgeColor: "emerald" },
        { col1: "Debangshu Roy", col2: "Barrackpore", col3: "React Architect", col4: "Mamata Hui", col5: "₹5,500", badgeColor: "emerald" },
      ],
      verdictText: "✓ 4-TIER RELATIONAL REDUCTION",
      badgeColor: "emerald",
      explanation: "MySQL executes pairwise binary joins across the 4 tables, returning complete student, course, and instructor metadata in a single query.",
    },
    pipe_ecommerce_5table: {
      title: "2. 5-Table E-Commerce Analytics (Customers ➔ Orders ➔ Items ➔ Products ➔ Categories)",
      sqlQuery: `SELECT 
    c.customer_name,
    o.order_id,
    p.product_name,
    cat.category_name,
    oi.quantity,
    oi.unit_price,
    (oi.quantity * oi.unit_price) AS line_total
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id
INNER JOIN order_items oi ON o.order_id = oi.order_id
INNER JOIN products p ON oi.product_id = p.product_id
INNER JOIN categories cat ON p.category_id = cat.category_id
WHERE c.city = 'Kolkata';`,
      resultRows: [
        { col1: "Abhronila Das", col2: "ORD-9021", col3: "SQL Tuning Guide", col4: "Books & Media", col5: "₹1,200 (Qty: 2)", badgeColor: "cyan" },
        { col1: "Susmita Sen", col2: "ORD-9022", col3: "React Dev Kit", col4: "Software", col5: "₹3,400 (Qty: 1)", badgeColor: "cyan" },
      ],
      verdictText: "✓ 5-TABLE ENTERPRISE ANALYTICS",
      badgeColor: "cyan",
      explanation: "Standard enterprise reporting query linking customer demographics to order line items and product catalog categories.",
    },
    pipe_mixed_danger: {
      title: "3. The Mixed Join Trap (INNER JOIN after LEFT JOIN Cancellation)",
      sqlQuery: `-- ❌ DANGEROUS: INNER JOIN cancels earlier LEFT JOIN!
SELECT 
    s.student_name,
    e.enrollment_date,
    p.amount_paid
FROM students s
LEFT JOIN enrollments e ON s.student_id = e.student_id
INNER JOIN payments p ON e.enrollment_id = p.enrollment_id;
-- Discards students without enrollments because p.id cannot match NULL!`,
      resultRows: [
        { col1: "Mamata Hui", col2: "2026-08-01", col3: "Paid: ₹4,500", col4: "Retained", col5: "Valid Match", badgeColor: "amber" },
        { col1: "Debangshu Roy", col2: "2026-08-05", col3: "Paid: ₹5,500", col4: "Retained", col5: "Valid Match", badgeColor: "amber" },
      ],
      verdictText: "❌ SILENT ROW LOSS (UNENROLLED ERASED)",
      badgeColor: "rose",
      explanation: "Because payments is joined with INNER JOIN on e.enrollment_id, all NULL enrollment rows are filtered out, destroying the LEFT JOIN's preservation!",
    },
    pipe_safe_outer_chain: {
      title: "4. Safe Consistent Outer Join Chain (Preserves All Students)",
      sqlQuery: `-- ✅ SAFE: Consistent LEFT JOINs across entire pipeline!
SELECT 
    s.student_name,
    COALESCE(c.course_title, 'Not Enrolled') AS course,
    COALESCE(p.amount_paid, '₹0.00') AS fee_paid
FROM students s
LEFT JOIN enrollments e ON s.student_id = e.student_id
LEFT JOIN courses c ON e.course_id = c.course_id
LEFT JOIN payments p ON e.enrollment_id = p.enrollment_id;`,
      resultRows: [
        { col1: "Mamata Hui", col2: "Barrackpore", col3: "MySQL Master", col4: "Paid: ₹4,500", col5: "Enrolled", badgeColor: "emerald" },
        { col1: "Debangshu Roy", col2: "Kolkata", col3: "React Architect", col4: "Paid: ₹5,500", col5: "Enrolled", badgeColor: "emerald" },
        { col1: "Susmita Sen", col2: "Ichapur", col3: "Not Enrolled", col4: "₹0.00", col5: "Unassigned", badgeColor: "indigo" },
        { col1: "Mahima Shaw", col2: "Jadavpur", col3: "Not Enrolled", col4: "₹0.00", col5: "Unassigned", badgeColor: "indigo" },
      ],
      verdictText: "✓ 100% STUDENTS PRESERVED",
      badgeColor: "emerald",
      explanation: "Using consistent LEFT JOINs throughout the entire chain guarantees that unenrolled students remain in the report with clean fallback defaults.",
    },
  };

  const currentPipeline = pipelineScenarios[selectedPipelineKey];

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
            Module 002_005 · SQL Joins · Topic 7
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Multi-Table Joins:{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Connecting 3, 4, or More Tables
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master chaining normalized relational tables into enterprise analytics queries: pairwise binary join execution,
            avoiding the dangerous INNER-after-LEFT join cancellation trap, foreign key index coverage, and optimizer search depth.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔗 Pairwise Binary Join Chains
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🛒 5-Table E-Commerce Analytics
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚠️ Mixed Join Precedence Trap
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ Foreign Key Index Optimization
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Multi-Table Join Theory & Pipeline ─────── */}
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
                The Pairwise Binary Execution Pipeline &amp; Join Order
              </h2>
              <p className="text-xs text-slate-400">
                How MySQL systematically resolves multi-table joins as sequential binary operations
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-teal-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase">1. Binary Reduction Sequence</span>
              <strong className="text-white text-xs block font-mono">{"((Table1 ⋈ Table2) ⋈ Table3) ⋈ Table4"}</strong>
              <p className="text-xs text-slate-300">
                MySQL joins Table 1 and Table 2 into an intermediate set $I_1$, then joins $I_1$ with Table 3 to form $I_2$, continuing until the final table is resolved.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-rose-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase">2. The Mixed Join Trap</span>
              <strong className="text-white text-xs block font-mono">LEFT JOIN B ➔ INNER JOIN C (KILLS NULLS!)</strong>
              <p className="text-xs text-slate-300">
                If an INNER JOIN follows a LEFT JOIN on the same child branch, the inner condition discards NULL rows, silently destroying the outer join.
              </p>
            </div>
          </div>

          {/* ── Semantic SVG 1: Pairwise Pipeline Graph ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Multi-Table 4-Tier Pairwise Join Reduction Pipeline
            </h3>
            <svg
              viewBox="0 0 780 130"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Multi-Table Join Pipeline Diagram"
            >
              {/* Table 1: Students */}
              <g transform="translate(10, 20)">
                <rect width="120" height="90" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="60" y="25" fill="#38bdf8" textAnchor="middle" fontWeight="bold">Students</text>
                <text x="10" y="55" fill="#cbd5e1" fontSize="9">student_id (PK)</text>
                <text x="10" y="75" fill="#cbd5e1" fontSize="9">student_name</text>
              </g>

              <text x="145" y="65" fill="#10b981" textAnchor="middle" fontWeight="bold" fontSize="16">⋈</text>

              {/* Table 2: Enrollments */}
              <g transform="translate(160, 20)">
                <rect width="130" height="90" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="65" y="25" fill="#38bdf8" textAnchor="middle" fontWeight="bold">Enrollments</text>
                <text x="10" y="55" fill="#cbd5e1" fontSize="9">student_id (FK)</text>
                <text x="10" y="75" fill="#cbd5e1" fontSize="9">course_id (FK)</text>
              </g>

              <text x="305" y="65" fill="#10b981" textAnchor="middle" fontWeight="bold" fontSize="16">⋈</text>

              {/* Table 3: Courses */}
              <g transform="translate(320, 20)">
                <rect width="120" height="90" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="60" y="25" fill="#38bdf8" textAnchor="middle" fontWeight="bold">Courses</text>
                <text x="10" y="55" fill="#cbd5e1" fontSize="9">course_id (PK)</text>
                <text x="10" y="75" fill="#cbd5e1" fontSize="9">instructor_id</text>
              </g>

              <text x="455" y="65" fill="#10b981" textAnchor="middle" fontWeight="bold" fontSize="16">⋈</text>

              {/* Table 4: Instructors */}
              <g transform="translate(470, 20)">
                <rect width="120" height="90" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="60" y="25" fill="#38bdf8" textAnchor="middle" fontWeight="bold">Instructors</text>
                <text x="10" y="55" fill="#cbd5e1" fontSize="9">instructor_id</text>
                <text x="10" y="75" fill="#cbd5e1" fontSize="9">name</text>
              </g>

              {/* Equals Arrow */}
              <g transform="translate(605, 55)">
                <line x1="0" y1="10" x2="30" y2="10" stroke="#10b981" strokeWidth="3" />
                <polygon points="30,5 42,10 30,15" fill="#10b981" />
              </g>

              {/* Final Output */}
              <g transform="translate(655, 20)">
                <rect width="115" height="90" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                <text x="57" y="25" fill="#10b981" textAnchor="middle" fontWeight="bold" fontSize="9">Final Dataset</text>
                <text x="10" y="52" fill="#cbd5e1" fontSize="8">Full Roster</text>
                <text x="10" y="70" fill="#38bdf8" fontSize="8">Single Query</text>
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
                Interactive Multi-Table Join Pipeline Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Test 4-table and 5-table join queries, examine the mixed join cancellation trap, and inspect safe outer chains
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Scenario Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedPipelineKey("pipe_academy_4table")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedPipelineKey === "pipe_academy_4table"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                1. 4-Table Academy
              </button>

              <button
                onClick={() => setSelectedPipelineKey("pipe_ecommerce_5table")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedPipelineKey === "pipe_ecommerce_5table"
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                2. 5-Table E-Commerce
              </button>

              <button
                onClick={() => setSelectedPipelineKey("pipe_mixed_danger")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedPipelineKey === "pipe_mixed_danger"
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                3. Mixed Join Trap ❌
              </button>

              <button
                onClick={() => setSelectedPipelineKey("pipe_safe_outer_chain")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedPipelineKey === "pipe_safe_outer_chain"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                4. Safe Outer Chain ✓
              </button>
            </div>

            {/* Sandbox Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Query & Explanation */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white">{currentPipeline.title}</span>
                    <span
                      className={clsx(
                        "text-[10px] font-mono px-2 py-0.5 rounded border",
                        currentPipeline.badgeColor === "emerald"
                          ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                          : currentPipeline.badgeColor === "cyan"
                          ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
                          : "bg-rose-500/10 text-rose-300 border-rose-500/30"
                      )}
                    >
                      {currentPipeline.verdictText}
                    </span>
                  </div>

                  <pre className="font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap text-[11px] bg-slate-900 p-3 rounded-lg border border-slate-800 max-h-56">
                    {currentPipeline.sqlQuery}
                  </pre>

                  <p className="text-[11px] text-slate-300">{currentPipeline.explanation}</p>
                </div>
              </div>

              {/* Right: Result Set */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
                  <span className="text-xs font-bold text-slate-200 block border-b border-slate-800 pb-2">
                    Multi-Table Query Result Set
                  </span>

                  <table className="w-full text-left text-xs font-mono text-slate-300">
                    <thead className="text-[10px] text-teal-400 uppercase border-b border-slate-800 bg-slate-900">
                      <tr>
                        <th className="p-1.5">Entity / Name</th>
                        <th className="p-1.5">Context</th>
                        <th className="p-1.5">Related Info</th>
                        <th className="p-1.5">Instructor / Fee</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-[11px]">
                      {currentPipeline.resultRows.map((r, i) => (
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
                How Barrackpore and Kolkata training institutes structure complex multi-table queries
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Student Tuition Revenue &amp; Instructor Share Report
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Connecting 4 tables to compute total fees collected per instructor in Indian Rupee (₹):
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- 4-Table Revenue Aggregation Query:
SELECT 
    i.instructor_id,
    i.instructor_name,
    COUNT(DISTINCT s.student_id) AS total_active_students,
    CONCAT('₹', FORMAT(SUM(p.amount_paid), 2)) AS total_tuition_collected
FROM instructors i
INNER JOIN courses c ON i.instructor_id = c.instructor_id
INNER JOIN enrollments e ON c.course_id = e.course_id
INNER JOIN students s ON e.student_id = s.student_id
INNER JOIN payments p ON e.enrollment_id = p.enrollment_id
WHERE s.city = 'Barrackpore'
GROUP BY i.instructor_id, i.instructor_name;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Order Shipping &amp; Warehouse Dispatch Analytics
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata E-Commerce</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Joining 5 normalized tables across order management, carrier logistics, and warehouse docks:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Complex 5-Table Logistics Pipeline:
SELECT 
    o.order_id,
    c.customer_name,
    p.product_name,
    w.warehouse_name,
    shp.tracking_number,
    shp.status AS shipment_status
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
JOIN order_items oi ON o.order_id = oi.order_id
JOIN products p ON oi.product_id = p.product_id
JOIN shipments shp ON o.order_id = shp.order_id
JOIN warehouses w ON shp.warehouse_id = w.warehouse_id
WHERE o.order_date &ge; CURDATE() - INTERVAL 7 DAY;`}
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
                Guidelines for writing maintainable, high-performance multi-table join queries
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
                  <strong className="text-white">1. INNER After LEFT Join Trap:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Placing an INNER JOIN downstream of a LEFT JOIN filters out NULL rows, silently destroying outer preservation.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Selecting * Across Wide Tables:</strong>
                  <p className="text-slate-400 mt-0.5">
                    <code>SELECT *</code> pulls all redundant foreign keys and wide text fields, thrashing buffer pool RAM.
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
                  <strong className="text-white">1. Index All Foreign Keys in Join Paths:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Ensure every join column has a B-Tree index to allow $O(1)$ Nested-Loop index probes.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Filter Rows Early in WHERE:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Apply selective date and status filters early to prune intermediate row sets before joining catalog tables.
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
              <span>Multi-table joins chain pairwise binary joins in sequence</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Always qualify columns with unique table aliases to prevent ambiguity</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Mixing INNER JOIN after a LEFT JOIN accidentally cancels outer row preservation</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Ensure every foreign key column in the join chain has a B-Tree index</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use EXPLAIN to verify optimizer join order and driving table selection</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Encapsulate complex multi-table joins inside database SQL Views for reusability</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Multi-Table Joins &amp; Complex Queries – FAQs"
            questions={questions}
            subtitle="Master multi-table joins (3, 4, 5+ tables), pairwise binary join execution, avoiding the mixed join cancellation trap, foreign key index coverage, and optimizer search depth with 30 comprehensive Q&As"
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
            title="Multi-Table Joins: Connecting 3, 4, or More Tables in a Single Query"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic7_multi_table_joins_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Multi-table joins are where your relational database normalization truly pays off! " +
              "In my classroom at Coder & AccoTax in Barrackpore, I teach students: " +
              "'You normalized your tables into 3NF so each table stores exactly one theme. " +
              "Now, when the management needs a single comprehensive analytics report, you connect those themes like Lego blocks using multi-table joins!' " +
              "Always be vigilant about the 'INNER-after-LEFT' trap: " +
              "If you start with `Students LEFT JOIN Enrollments` and follow it with `INNER JOIN Payments`, " +
              "the inner join will silently erase all unenrolled students. " +
              "Maintain consistent `LEFT JOIN`s throughout your outer pipeline, and always index your foreign keys!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 7 · Multi-Table Joins · Module 002_005 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic7;
