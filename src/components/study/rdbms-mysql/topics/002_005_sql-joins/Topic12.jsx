import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic12_files/topic12_questions";
import noteText from "./topic12_files/topic12_note.txt?raw";

/**
 * Topic12 – Common Join Pitfalls: Cartesian Explosions, Accidental Row Multiplication, NULL Bugs
 * Module: 002_005_sql-joins (Mastering SQL Joins & Multi-Table Queries)
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Join Pitfall Simulator Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic12 = () => {
  const sectionRefs = useRef([]);

  // Interactive Pitfall State
  const [selectedPitfallKey, setSelectedPitfallKey] = useState("pitfall_fan_out"); // "pitfall_fan_out" | "pitfall_cte_remedy" | "pitfall_not_in_null" | "pitfall_cartesian_freeze"

  const pitfallScenarios = {
    pitfall_fan_out: {
      title: "1. The Aggregate Fan-Out Bug (Naive Multi-Child Join)",
      sqlQuery: `-- ❌ BUG: Joining 2 independent 1:N tables simultaneously!
-- Customer Mamata has 2 Orders (₹2,000 + ₹3,000 = ₹5,000)
-- and 2 Payments (₹1,000 + ₹4,000 = ₹5,000).
SELECT 
    c.customer_name,
    SUM(o.order_amount) AS total_orders,
    SUM(p.payment_amount) AS total_payments
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
LEFT JOIN payments p ON c.customer_id = p.customer_id
GROUP BY c.customer_id, c.customer_name;
-- 2 Orders × 2 Payments = 4 intermediate rows!`,
      resultRows: [
        { customer: "Mamata Hui", calculated: "Orders: ₹10,000", actual: "Actual: ₹5,000", status: "100% INFLATED! ❌", badgeColor: "rose" },
        { customer: "Mamata Hui", calculated: "Payments: ₹10,000", actual: "Actual: ₹5,000", status: "100% INFLATED! ❌", badgeColor: "rose" },
      ],
      verdictText: "❌ 100% DATA CORRUPTION (FAN-OUT)",
      badgeColor: "rose",
      explanation: "Joining two 1:N child tables simultaneously creates a 2×2 Cartesian intermediate matrix, duplicating every order amount and payment amount!",
    },
    pitfall_cte_remedy: {
      title: "2. The Architectural Remedy (CTE Pre-Aggregation)",
      sqlQuery: `-- ✅ FIXED: Pre-aggregate child tables in independent CTEs!
WITH aggregated_orders AS (
    SELECT customer_id, SUM(order_amount) AS total_orders
    FROM orders GROUP BY customer_id
),
aggregated_payments AS (
    SELECT customer_id, SUM(payment_amount) AS total_payments
    FROM payments GROUP BY customer_id
)
SELECT 
    c.customer_name,
    COALESCE(ord.total_orders, 0) AS total_orders,
    COALESCE(pay.total_payments, 0) AS total_payments
FROM customers c
LEFT JOIN aggregated_orders ord ON c.customer_id = ord.customer_id
LEFT JOIN aggregated_payments pay ON c.customer_id = pay.customer_id;`,
      resultRows: [
        { customer: "Mamata Hui", calculated: "Orders: ₹5,000", actual: "Actual: ₹5,000", status: "100% Accurate ✓", badgeColor: "emerald" },
        { customer: "Mamata Hui", calculated: "Payments: ₹5,000", actual: "Actual: ₹5,000", status: "100% Accurate ✓", badgeColor: "emerald" },
      ],
      verdictText: "✓ 100% ACCURATE AUDIT BALANCE",
      badgeColor: "emerald",
      explanation: "Pre-aggregating each child table in separate CTEs ensures the main query joins exactly 1 pre-calculated row per customer.",
    },
    pitfall_not_in_null: {
      title: "3. The NOT IN with NULL Disaster vs NOT EXISTS",
      sqlQuery: `-- ❌ BUG: NOT IN with even ONE NULL in subquery returns 0 rows!
SELECT * 
FROM students 
WHERE student_id NOT IN (SELECT student_id FROM enrollments);
-- If enrollments has a single row with student_id IS NULL:
-- 'x NOT IN (1, 2, NULL)' evaluates to UNKNOWN ➔ 0 ROWS!

-- ✅ FIXED: Use NOT EXISTS or Anti-Join!
SELECT s.* 
FROM students s
WHERE NOT EXISTS (
    SELECT 1 FROM enrollments e WHERE e.student_id = s.student_id
);`,
      resultRows: [
        { customer: "NOT IN (with NULL)", calculated: "0 Rows Returned", actual: "Expected: 2 Students", status: "Silent Outage ❌", badgeColor: "rose" },
        { customer: "NOT EXISTS (Remedy)", calculated: "2 Students Returned", actual: "Expected: 2 Students", status: "Accurate Isolation ✓", badgeColor: "emerald" },
      ],
      verdictText: "⚠️ THREE-VALUED LOGIC TRAP",
      badgeColor: "amber",
      explanation: "In SQL three-valued logic, x != NULL is UNKNOWN. This collapses the entire NOT IN chain to UNKNOWN, returning 0 rows.",
    },
    pitfall_cartesian_freeze: {
      title: "4. Multi-Table Cartesian Explosion (Missing Join Keys)",
      sqlQuery: `-- ❌ DISASTER: Comma join with missing join conditions:
SELECT * 
FROM students s, enrollments e, courses c, payments p;

-- Multiplied Cardinality:
-- 1,000 Students × 5,000 Enrollments × 200 Courses × 10,000 Payments
-- = 10,000,000,000,000 Rows (10 Trillion Rows!)
-- Server freezes, buffer pool crashes, temporary disk space exhausted!`,
      resultRows: [
        { customer: "4-Table Comma Join", calculated: "10 Trillion Rows", actual: "Missing ON Keys", status: "Server Freeze / Crash ⚠️", badgeColor: "rose" },
      ],
      verdictText: "💥 SERVER CRASH HAZARD",
      badgeColor: "rose",
      explanation: "Omitting join conditions across 4 normalized tables triggers exponential multiplication, thrashing server CPU and exhausting temporary disk storage.",
    },
  };

  const currentPitfall = pitfallScenarios[selectedPitfallKey];

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
            Module 002_005 · SQL Joins · Topic 12
          </div>

          <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Common Join Pitfalls:{" "}
            <span className="bg-gradient-to-r from-rose-400 via-amber-400 to-teal-400 bg-clip-text text-transparent">
              Fan-Outs, Explosions &amp; NULL Traps
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master identifying and eliminating the triple relational hazards: aggregate fan-out inflation bugs,
            billion-row Cartesian server lockups, and three-valued logic NULL traps with CTE pre-aggregation and anti-joins.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚠️ Aggregate Fan-Out Bug
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🧱 CTE Pre-Aggregation Remedy
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🚫 NOT IN with NULL Disaster
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🚀 Null-Safe Equality (&lt;=&gt;)
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Pitfalls Theory & Mechanics ────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-12 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 shadow-xl shadow-black/40 transition-all duration-300 hover:border-slate-700"
        >
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/20 text-rose-400 font-bold">
              01
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                The Mechanics of Join Fan-Out &amp; Three-Valued Logic
              </h2>
              <p className="text-xs text-slate-400">
                How multi-table joins multiply rows into Cartesian matrices and distort aggregate metrics
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-rose-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase">1. Multi-Child Fan-Out</span>
              <strong className="text-white text-xs block font-mono">Parent ⋈ Child1 (M rows) ⋈ Child2 (N rows)</strong>
              <p className="text-xs text-slate-300">
                Generates $M \times N$ intermediate rows per parent. Summing amounts on both child tables results in massive multiplication and inflated accounting reports.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-emerald-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">2. CTE Pre-Aggregation</span>
              <strong className="text-white text-xs block font-mono">WITH agg AS (SELECT id, SUM(val) ... )</strong>
              <p className="text-xs text-slate-300">
                Aggregates each child table down to 1 row per parent ID before joining, guaranteeing 100% mathematically exact calculations.
              </p>
            </div>
          </div>

          {/* ── Semantic SVG 1: Fan-Out Multiplication Diagram ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Aggregate Fan-Out Inflation (2 Orders × 2 Payments = 4 Rows)
            </h3>
            <svg
              viewBox="0 0 780 130"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Join Fan-Out Breakdown Diagram"
            >
              {/* Parent */}
              <g transform="translate(10, 20)">
                <rect width="130" height="90" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="65" y="22" fill="#38bdf8" textAnchor="middle" fontWeight="bold" fontSize="10">Customer (1 Row)</text>
                <text x="10" y="50" fill="#cbd5e1" fontSize="9">Mamata Hui</text>
                <text x="10" y="70" fill="#a7f3d0" fontSize="9">ID: #101</text>
              </g>

              {/* Multiplication Branch */}
              <text x="160" y="65" fill="#f43f5e" textAnchor="middle" fontWeight="bold" fontSize="20">×</text>

              {/* Child 1: Orders */}
              <g transform="translate(180, 20)">
                <rect width="160" height="90" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="80" y="22" fill="#f59e0b" textAnchor="middle" fontWeight="bold" fontSize="10">2 Orders (₹5,000)</text>
                <text x="10" y="48" fill="#cbd5e1" fontSize="8">Ord 1: ₹2,000</text>
                <text x="10" y="68" fill="#cbd5e1" fontSize="8">Ord 2: ₹3,000</text>
              </g>

              {/* Multiplication Branch */}
              <text x="360" y="65" fill="#f43f5e" textAnchor="middle" fontWeight="bold" fontSize="20">×</text>

              {/* Child 2: Payments */}
              <g transform="translate(380, 20)">
                <rect width="160" height="90" rx="6" fill="#1e293b" stroke="#818cf8" strokeWidth="1.5" />
                <text x="80" y="22" fill="#818cf8" textAnchor="middle" fontWeight="bold" fontSize="10">2 Payments (₹5,000)</text>
                <text x="10" y="48" fill="#cbd5e1" fontSize="8">Pay 1: ₹1,000</text>
                <text x="10" y="68" fill="#cbd5e1" fontSize="8">Pay 2: ₹4,000</text>
              </g>

              {/* Equals Arrow */}
              <g transform="translate(555, 55)">
                <line x1="0" y1="10" x2="30" y2="10" stroke="#f43f5e" strokeWidth="2" />
                <polygon points="30,5 40,10 30,15" fill="#f43f5e" />
              </g>

              {/* Flawed Output (4 Rows) */}
              <g transform="translate(605, 20)">
                <rect width="165" height="90" rx="6" fill="#0f172a" stroke="#f43f5e" strokeWidth="2" />
                <text x="82" y="22" fill="#f43f5e" textAnchor="middle" fontWeight="bold" fontSize="9">4 Intermediate Rows</text>
                <text x="10" y="48" fill="#fca5a5" fontSize="8">SUM(orders) = ₹10,000</text>
                <text x="10" y="66" fill="#fca5a5" fontSize="8">SUM(payments) = ₹10,000</text>
                <text x="10" y="82" fill="#fda4af" fontSize="8" fontWeight="bold">100% INFLATED ❌</text>
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
                Interactive Join Pitfall Failure Simulator Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Explore the aggregate fan-out bug, CTE pre-aggregation remedy, NOT IN with NULL collapses, and Cartesian crashes
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Scenario Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedPitfallKey("pitfall_fan_out")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedPitfallKey === "pitfall_fan_out"
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                1. Fan-Out Bug ❌
              </button>

              <button
                onClick={() => setSelectedPitfallKey("pitfall_cte_remedy")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedPitfallKey === "pitfall_cte_remedy"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                2. CTE Remedy ✓
              </button>

              <button
                onClick={() => setSelectedPitfallKey("pitfall_not_in_null")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedPitfallKey === "pitfall_not_in_null"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                3. NOT IN with NULL
              </button>

              <button
                onClick={() => setSelectedPitfallKey("pitfall_cartesian_freeze")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedPitfallKey === "pitfall_cartesian_freeze"
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                4. Cartesian Crash ⚠️
              </button>
            </div>

            {/* Sandbox Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Query & Explanation */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white">{currentPitfall.title}</span>
                    <span
                      className={clsx(
                        "text-[10px] font-mono px-2 py-0.5 rounded border",
                        currentPitfall.badgeColor === "emerald"
                          ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                          : currentPitfall.badgeColor === "amber"
                          ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                          : "bg-rose-500/10 text-rose-300 border-rose-500/30"
                      )}
                    >
                      {currentPitfall.verdictText}
                    </span>
                  </div>

                  <pre className="font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap text-[11px] bg-slate-900 p-3 rounded-lg border border-slate-800 max-h-56">
                    {currentPitfall.sqlQuery}
                  </pre>

                  <p className="text-[11px] text-slate-300">{currentPitfall.explanation}</p>
                </div>
              </div>

              {/* Right: Result Set */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
                  <span className="text-xs font-bold text-slate-200 block border-b border-slate-800 pb-2">
                    Query Calculated Output vs Expected Ground Truth
                  </span>

                  <table className="w-full text-left text-xs font-mono text-slate-300">
                    <thead className="text-[10px] text-teal-400 uppercase border-b border-slate-800 bg-slate-900">
                      <tr>
                        <th className="p-1.5">Target Entity</th>
                        <th className="p-1.5">Calculated Metric</th>
                        <th className="p-1.5">Ground Truth</th>
                        <th className="p-1.5">Audit Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-[11px]">
                      {currentPitfall.resultRows.map((r, i) => (
                        <tr key={i} className="bg-slate-950/40">
                          <td className="p-1.5 text-white font-bold">{r.customer}</td>
                          <td className="p-1.5 text-rose-400 font-bold">{r.calculated}</td>
                          <td className="p-1.5 text-emerald-300">{r.actual}</td>
                          <td className="p-1.5">
                            <span
                              className={clsx(
                                "text-[10px] font-mono px-2 py-0.5 rounded border",
                                r.badgeColor === "emerald"
                                  ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                                  : "bg-rose-500/10 text-rose-300 border-rose-500/30"
                              )}
                            >
                              {r.status}
                            </span>
                          </td>
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
                How Barrackpore and Kolkata training institutes prevent accounting fan-out errors in production
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Student Tuition Balance &amp; Scholarship Calculation
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Calculating net student balance (Total Course Fees - Total Payments - Scholarships) using CTE pre-aggregation:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Accurate Net Balance Calculation with CTEs:
WITH student_fees AS (
    SELECT student_id, SUM(course_fee) AS gross_fees
    FROM student_courses JOIN courses USING (course_id)
    GROUP BY student_id
),
student_payments AS (
    SELECT student_id, SUM(amount_paid) AS total_paid
    FROM payments GROUP BY student_id
),
student_scholarships AS (
    SELECT student_id, SUM(grant_amount) AS total_grants
    FROM scholarships GROUP BY student_id
)
SELECT 
    s.student_id,
    s.student_name,
    COALESCE(f.gross_fees, 0) AS gross_fees,
    COALESCE(p.total_paid, 0) AS total_paid,
    COALESCE(sc.total_grants, 0) AS total_grants,
    (COALESCE(f.gross_fees, 0) - COALESCE(p.total_paid, 0) - COALESCE(sc.total_grants, 0)) AS outstanding_balance
FROM students s
LEFT JOIN student_fees f USING (student_id)
LEFT JOIN student_payments p USING (student_id)
LEFT JOIN student_scholarships sc USING (student_id)
WHERE s.city = 'Barrackpore';`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's E-Commerce Customer Refund &amp; Credit Ledger
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata E-Commerce</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Preventing refund line items from multiplying against customer wallet credits in Indian Rupee (₹):
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Safe Multi-Ledger Reconciliation:
WITH customer_refunds AS (
    SELECT customer_id, SUM(refund_amount) AS total_refunded
    FROM refunds GROUP BY customer_id
),
customer_wallet_credits AS (
    SELECT customer_id, SUM(credit_amount) AS total_wallet_credit
    FROM wallet_transactions WHERE transaction_type = 'CREDIT'
    GROUP BY customer_id
)
SELECT 
    c.customer_id,
    c.customer_name,
    COALESCE(r.total_refunded, 0) AS total_refunded,
    COALESCE(w.total_wallet_credit, 0) AS total_wallet_credit
FROM customers c
LEFT JOIN customer_refunds r USING (customer_id)
LEFT JOIN customer_wallet_credits w USING (customer_id);`}
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
                Guidelines for preventing data corruption, server freezes, and subtle logic failures
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
                  <strong className="text-white">1. Using DISTINCT as a Fan-Out Band-Aid:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Writing <code>SUM(DISTINCT amount)</code> deletes legitimate duplicate transactions (e.g. two separate ₹500 orders).
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. NOT IN with Nullable Subqueries:</strong>
                  <p className="text-slate-400 mt-0.5">
                    If the subquery contains even one NULL, NOT IN returns 0 rows due to three-valued logic.
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
                  <strong className="text-white">1. Pre-Aggregate Child Tables in CTEs:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Always reduce 1:N child tables to 1 row per parent ID before joining to prevent row multiplication.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Use NOT EXISTS or Anti-Joins:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Replace <code>NOT IN</code> with <code>NOT EXISTS</code> or <code>LEFT JOIN ... WHERE right.id IS NULL</code>.
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
              <span>Never join multiple 1:N child tables simultaneously without pre-aggregating in CTEs</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Watch out for aggregate fan-out (SUM/AVG inflating across Cartesian child sets)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Never use DISTINCT as a quick patch for aggregate fan-out bugs</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Remember that NULL = NULL evaluates to UNKNOWN; use &lt;=&gt; for NULL matches</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Avoid NOT IN on nullable subqueries; use NOT EXISTS or Anti-Joins instead</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Always enforce ANSI-92 explicit JOIN ... ON syntax over legacy comma joins</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="SQL Join Pitfalls &amp; Traps – FAQs"
            questions={questions}
            subtitle="Master join pitfalls, aggregate fan-out row multiplication, CTE pre-aggregation remedies, three-valued logic NULL traps, and avoiding Cartesian crashes with 30 comprehensive Q&As"
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
            title="Common Join Pitfalls: Cartesian Explosions, Accidental Row Multiplication, NULL Bugs"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic12_join_pitfalls_traps_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "The Aggregate Fan-Out bug is the #1 cause of accounting errors in financial software! " +
              "In my classroom at Coder & AccoTax in Barrackpore, I warn students: " +
              "'If a customer has 2 orders and 2 payments, and you join both tables in one query, " +
              "MySQL multiplies them into 4 rows—and suddenly your total revenue report is doubled!' " +
              "Never use `DISTINCT` as a sloppy bandage, because `SUM(DISTINCT amount)` will delete legitimate duplicate ₹500 transactions. " +
              "The professional architecture is always: pre-aggregate each child table inside independent Common Table Expressions (`WITH ... AS ()`), " +
              "and then join the clean pre-calculated summaries to your parent table. Your balance sheets will balance to the exact paisa!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 12 · SQL Join Pitfalls · Module 002_005 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic12;
