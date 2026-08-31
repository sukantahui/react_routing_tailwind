import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic13_files/topic13_questions";
import noteText from "./topic13_files/topic13_note.txt?raw";

/**
 * Topic13 – Complex Join Lab: Customer Orders, Shipments, and Payments Analytics
 * Module: 002_005_sql-joins (Mastering SQL Joins & Multi-Table Queries)
 *
 * @component
 * @returns {JSX.Element} Capstone hands-on lab tutorial component with interactive Enterprise Analytics Simulator,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic13 = () => {
  const sectionRefs = useRef([]);

  // Interactive Lab State
  const [selectedLabMode, setSelectedLabMode] = useState("lab_customer_360"); // "lab_customer_360" | "lab_fulfillment_gap" | "lab_loyalty_rebate" | "lab_category_profit"

  const labScenarios = {
    lab_customer_360: {
      title: "1. 360-Degree Customer Financial & Fulfillment Ledger",
      sqlQuery: `WITH customer_order_summary AS (
    SELECT customer_id, COUNT(DISTINCT order_id) AS total_orders, SUM(total_amount) AS gross_orders
    FROM orders WHERE status != 'CANCELLED' GROUP BY customer_id
),
customer_payment_summary AS (
    SELECT customer_id, SUM(amount_paid) AS settled_payments
    FROM payments WHERE payment_status = 'SETTLED' GROUP BY customer_id
),
customer_shipment_summary AS (
    SELECT o.customer_id, COUNT(CASE WHEN s.delivery_status = 'DELIVERED' THEN 1 END) AS delivered
    FROM orders o LEFT JOIN shipments s USING (order_id) GROUP BY o.customer_id
)
SELECT 
    c.customer_id,
    c.customer_name,
    c.city,
    COALESCE(ord.total_orders, 0) AS total_orders,
    CONCAT('₹', FORMAT(COALESCE(ord.gross_orders, 0), 2)) AS gross_orders,
    CONCAT('₹', FORMAT(COALESCE(pay.settled_payments, 0), 2)) AS settled_payments,
    CONCAT('₹', FORMAT(COALESCE(ord.gross_orders, 0) - COALESCE(pay.settled_payments, 0), 2)) AS net_outstanding,
    COALESCE(shp.delivered, 0) AS delivered_shipments
FROM customers c
LEFT JOIN customer_order_summary ord USING (customer_id)
LEFT JOIN customer_payment_summary pay USING (customer_id)
LEFT JOIN customer_shipment_summary shp USING (customer_id);`,
      resultRows: [
        { name: "Mamata Hui (Barrackpore)", col1: "3 Orders", col2: "Gross: ₹12,500.00", col3: "Paid: ₹12,500.00", net: "Net: ₹0.00 (Fully Settled)", badgeColor: "emerald" },
        { name: "Debangshu Roy (Kolkata)", col1: "2 Orders", col2: "Gross: ₹8,000.00", col3: "Paid: ₹5,000.00", net: "Net: ₹3,000.00 (Due)", badgeColor: "amber" },
        { name: "Susmita Sen (Ichapur)", col1: "0 Orders", col2: "Gross: ₹0.00", col3: "Paid: ₹0.00", net: "Net: ₹0.00 (Lead)", badgeColor: "cyan" },
      ],
      verdictText: "✓ 100% RECONCILED (ZERO FAN-OUT)",
      badgeColor: "emerald",
      explanation: "Using separate pre-aggregating CTEs guarantees that orders, payments, and shipments are summarized independently before joining, ensuring zero row multiplication!",
    },
    lab_fulfillment_gap: {
      title: "2. Warehouse Fulfillment Gap Audit (Anti-Join)",
      sqlQuery: `-- Finding paid orders waiting > 48 hours for dispatch:
SELECT 
    o.order_id,
    c.customer_name,
    o.order_date,
    CONCAT('₹', FORMAT(p.amount_paid, 2)) AS amount_paid,
    TIMESTAMPDIFF(HOUR, o.order_date, NOW()) AS hours_delayed
FROM orders o
INNER JOIN customers c USING (customer_id)
INNER JOIN payments p USING (order_id)
LEFT JOIN shipments s USING (order_id)
WHERE p.payment_status = 'SETTLED'
  AND s.shipment_id IS NULL -- Anti-join isolating unfulfilled orders!
  AND TIMESTAMPDIFF(HOUR, o.order_date, NOW()) > 48;`,
      resultRows: [
        { name: "Debangshu Roy", col1: "ORD-8041", col2: "Paid: ₹5,000.00", col3: "Delayed: 54 Hours", net: "Warehouse Alert ⚠️", badgeColor: "rose" },
      ],
      verdictText: "⚠️ 1 FULFILLMENT BOTTLENECK DETECTED",
      badgeColor: "rose",
      explanation: "The anti-join pattern (LEFT JOIN shipments WHERE shipment_id IS NULL) identifies orders that customers have paid for but warehouse logistics has not dispatched.",
    },
    lab_loyalty_rebate: {
      title: "3. Dynamic Loyalty Tier Rebates (Non-Equi Join)",
      sqlQuery: `SELECT 
    c.customer_name,
    c.city,
    CONCAT('₹', FORMAT(SUM(o.total_amount), 2)) AS annual_spend,
    lt.tier_name,
    CONCAT(lt.cashback_pct, '%') AS rebate_rate,
    CONCAT('₹', FORMAT(SUM(o.total_amount) * (lt.cashback_pct / 100), 2)) AS earned_cashback
FROM customers c
INNER JOIN orders o USING (customer_id)
INNER JOIN loyalty_tiers lt 
    ON SUM(o.total_amount) >= lt.min_spend 
   AND (SUM(o.total_amount) < lt.max_spend OR lt.max_spend IS NULL)
WHERE YEAR(o.order_date) = 2026
GROUP BY c.customer_id, c.customer_name, c.city, lt.tier_name, lt.cashback_pct;`,
      resultRows: [
        { name: "Mamata Hui", col1: "Spend: ₹12,500.00", col2: "Gold Tier (₹10k–₹25k)", col3: "5% Cashback Rate", net: "Cashback: ₹625.00", badgeColor: "emerald" },
        { name: "Debangshu Roy", col1: "Spend: ₹8,000.00", col2: "Silver Tier (₹5k–₹10k)", col3: "2% Cashback Rate", net: "Cashback: ₹160.00", badgeColor: "cyan" },
      ],
      verdictText: "✓ DYNAMIC REBATE MAPPING",
      badgeColor: "cyan",
      explanation: "Non-Equi join binds total annual customer expenditure to tiered reward brackets without any hardcoded CASE statements.",
    },
    lab_category_profit: {
      title: "4. Multi-Table Category Gross Revenue Synthesis",
      sqlQuery: `SELECT 
    cat.category_name,
    COUNT(DISTINCT p.product_id) AS active_products,
    COUNT(oi.item_id) AS total_items_sold,
    CONCAT('₹', FORMAT(SUM(oi.quantity * oi.unit_price), 2)) AS category_revenue
FROM categories cat
INNER JOIN products p USING (category_id)
INNER JOIN order_items oi USING (product_id)
INNER JOIN orders o USING (order_id)
WHERE o.status = 'COMPLETED'
GROUP BY cat.category_id, cat.category_name;`,
      resultRows: [
        { name: "Database & Backend", col1: "12 Products", col2: "340 Units Sold", col3: "Completed Orders", net: "Revenue: ₹1,53,000.00", badgeColor: "emerald" },
        { name: "Full-Stack Web", col1: "8 Products", col2: "210 Units Sold", col3: "Completed Orders", net: "Revenue: ₹1,15,500.00", badgeColor: "emerald" },
      ],
      verdictText: "✓ 4-TABLE ENTERPRISE REVENUE",
      badgeColor: "emerald",
      explanation: "Synthesizes data across categories, products, order line items, and parent orders to compute total gross revenue per product line in Indian Rupee (₹).",
    },
  };

  const currentLab = labScenarios[selectedLabMode];

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
            Module 002_005 · SQL Joins · Topic 13 (Capstone Lab)
          </div>

          <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Complex Join Lab:{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Customer Orders, Shipments &amp; Payments
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Synthesize all join techniques into an enterprise analytics pipeline: customer 360-degree financial reconciliations,
            warehouse fulfillment anti-join gap tracking, dynamic non-equi loyalty rebates, and multi-table category profit matrixes.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🏆 Module Capstone Hands-On Lab
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🌐 Customer 360-Degree Financial Ledger
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📦 Warehouse Dispatch Anti-Join Audits
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              💰 Non-Equi Dynamic Loyalty Rebates (₹)
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Capstone Architecture ──────────────────── */}
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
                Enterprise 7-Table Schema Architecture &amp; CTE Pipeline
              </h2>
              <p className="text-xs text-slate-400">
                How Common Table Expressions (CTEs) synthesize orders, payments, shipments, and customer tiers cleanly
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-teal-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase">1. Triple CTE Pre-Aggregation</span>
              <strong className="text-white text-xs block font-mono">Orders CTE + Payments CTE + Shipments CTE</strong>
              <p className="text-xs text-slate-300">
                Pre-aggregating each domain separately eliminates Cartesian row proliferation, ensuring every customer record joins with exactly 1 summary row per child domain.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-cyan-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">2. Anti-Join Fulfillment Detection</span>
              <strong className="text-white text-xs block font-mono">Paid Orders LEFT JOIN Shipments (IS NULL)</strong>
              <p className="text-xs text-slate-300">
                Isolates orders that customers have settled but warehouse packing has neglected to dispatch after SLA thresholds.
              </p>
            </div>
          </div>

          {/* ── Semantic SVG 1: Enterprise Pipeline Diagram ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Customer 360 Pipeline (Triple CTE Pre-Aggregation Integration)
            </h3>
            <svg
              viewBox="0 0 780 140"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Enterprise Pipeline Diagram"
            >
              {/* CTE 1: Orders */}
              <g transform="translate(20, 15)">
                <rect width="180" height="32" rx="4" fill="#1e293b" stroke="#38bdf8" />
                <text x="90" y="20" fill="#38bdf8" textAnchor="middle" fontSize="9">CTE 1: Orders Summary (Gross ₹)</text>
              </g>

              {/* CTE 2: Payments */}
              <g transform="translate(20, 55)">
                <rect width="180" height="32" rx="4" fill="#1e293b" stroke="#10b981" />
                <text x="90" y="20" fill="#10b981" textAnchor="middle" fontSize="9">CTE 2: Payments Summary (Settled ₹)</text>
              </g>

              {/* CTE 3: Shipments */}
              <g transform="translate(20, 95)">
                <rect width="180" height="32" rx="4" fill="#1e293b" stroke="#818cf8" />
                <text x="90" y="20" fill="#818cf8" textAnchor="middle" fontSize="9">CTE 3: Shipments Summary (Status)</text>
              </g>

              {/* Connecting Join Arrows */}
              <line x1="200" y1="31" x2="270" y2="70" stroke="#38bdf8" strokeWidth="1.5" />
              <line x1="200" y1="71" x2="270" y2="70" stroke="#10b981" strokeWidth="1.5" />
              <line x1="200" y1="111" x2="270" y2="70" stroke="#818cf8" strokeWidth="1.5" />

              {/* Central Customers Master Table */}
              <g transform="translate(270, 30)">
                <rect width="200" height="80" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                <text x="100" y="25" fill="#10b981" textAnchor="middle" fontWeight="bold">Customers Master</text>
                <text x="10" y="48" fill="#cbd5e1" fontSize="9">JOIN USING (customer_id)</text>
                <text x="10" y="66" fill="#a7f3d0" fontSize="8">Preserves 100% Customer Base</text>
              </g>

              {/* Final Output Arrow */}
              <g transform="translate(480, 60)">
                <line x1="0" y1="10" x2="35" y2="10" stroke="#10b981" strokeWidth="3" />
                <polygon points="35,5 48,10 35,15" fill="#10b981" />
              </g>

              {/* Final Executive Dashboard Output */}
              <g transform="translate(540, 20)">
                <rect width="220" height="100" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="110" y="22" fill="#38bdf8" textAnchor="middle" fontWeight="bold" fontSize="10">Executive 360 Dashboard</text>
                <text x="10" y="45" fill="#cbd5e1" fontSize="8">Gross Orders · Paid Amounts</text>
                <text x="10" y="65" fill="#fde68a" fontSize="8">Net Outstanding Balance (₹)</text>
                <text x="10" y="85" fill="#a7f3d0" fontSize="8" fontWeight="bold">Zero Fan-Out Data Integrity</text>
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
                Interactive Capstone Join Lab Simulator Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Test customer 360 balance sheets, warehouse fulfillment anti-joins, dynamic loyalty rebates, and category revenue
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Scenario Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedLabMode("lab_customer_360")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedLabMode === "lab_customer_360"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                1. Customer 360 Ledger
              </button>

              <button
                onClick={() => setSelectedLabMode("lab_fulfillment_gap")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedLabMode === "lab_fulfillment_gap"
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                2. Fulfillment Gap Audit
              </button>

              <button
                onClick={() => setSelectedLabMode("lab_loyalty_rebate")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedLabMode === "lab_loyalty_rebate"
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                3. Loyalty Rebates (₹)
              </button>

              <button
                onClick={() => setSelectedLabMode("lab_category_profit")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedLabMode === "lab_category_profit"
                    ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                4. Category Revenue
              </button>
            </div>

            {/* Sandbox Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Query & Explanation */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white">{currentLab.title}</span>
                    <span
                      className={clsx(
                        "text-[10px] font-mono px-2 py-0.5 rounded border",
                        currentLab.badgeColor === "emerald"
                          ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                          : currentLab.badgeColor === "cyan"
                          ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
                          : currentLab.badgeColor === "indigo"
                          ? "bg-indigo-500/10 text-indigo-300 border-indigo-500/30"
                          : "bg-rose-500/10 text-rose-300 border-rose-500/30"
                      )}
                    >
                      {currentLab.verdictText}
                    </span>
                  </div>

                  <pre className="font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap text-[11px] bg-slate-900 p-3 rounded-lg border border-slate-800 max-h-56">
                    {currentLab.sqlQuery}
                  </pre>

                  <p className="text-[11px] text-slate-300">{currentLab.explanation}</p>
                </div>
              </div>

              {/* Right: Result Set */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
                  <span className="text-xs font-bold text-slate-200 block border-b border-slate-800 pb-2">
                    Pipeline Execution Results
                  </span>

                  <table className="w-full text-left text-xs font-mono text-slate-300">
                    <thead className="text-[10px] text-teal-400 uppercase border-b border-slate-800 bg-slate-900">
                      <tr>
                        <th className="p-1.5">Entity / Customer</th>
                        <th className="p-1.5">Metrics</th>
                        <th className="p-1.5">Payments / Details</th>
                        <th className="p-1.5">Audit Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-[11px]">
                      {currentLab.resultRows.map((r, i) => (
                        <tr key={i} className="bg-slate-950/40">
                          <td className="p-1.5 text-white font-bold">{r.name}</td>
                          <td className="p-1.5 text-cyan-300">{r.col1} ({r.col2})</td>
                          <td className="p-1.5 text-slate-300">{r.col3}</td>
                          <td className="p-1.5 text-emerald-300 font-bold">{r.net}</td>
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
                How Barrackpore and Kolkata training institutes deploy capstone analytics in live production
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Automated Student Fee Clearance View
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Creating a database SQL view for exam hall ticket clearance:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Production Clearance View:
CREATE OR REPLACE VIEW view_exam_clearance AS
WITH fee_totals AS (
    SELECT student_id, SUM(course_fee) AS total_fee
    FROM student_courses JOIN courses USING (course_id) GROUP BY student_id
),
payment_totals AS (
    SELECT student_id, SUM(amount_paid) AS total_paid
    FROM payments GROUP BY student_id
)
SELECT 
    s.student_id,
    s.student_name,
    s.city,
    CASE 
        WHEN COALESCE(f.total_fee, 0) <= COALESCE(p.total_paid, 0) THEN 'CLEAR (Admit Card Issued)'
        ELSE CONCAT('HOLD (Dues: ₹', FORMAT(f.total_fee - COALESCE(p.total_paid, 0), 2), ')')
    END AS clearance_status
FROM students s
LEFT JOIN fee_totals f USING (student_id)
LEFT JOIN payment_totals p USING (student_id);`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Real-Time Logistics Carrier SLA Monitoring
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata E-Commerce</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Joining shipments, carriers, and routes to monitor SLA breaches in real time:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Carrier SLA Real-Time Performance Monitor:
SELECT 
    c.carrier_name,
    COUNT(s.shipment_id) AS total_dispatched,
    SUM(CASE WHEN s.delivery_status = 'DELIVERED' AND s.delivered_date <= s.promised_date THEN 1 ELSE 0 END) AS on_time_deliveries,
    ROUND((SUM(CASE WHEN s.delivery_status = 'DELIVERED' AND s.delivered_date <= s.promised_date THEN 1 ELSE 0 END) / COUNT(s.shipment_id)) * 100, 2) AS on_time_sla_pct
FROM carriers c
INNER JOIN shipments s USING (carrier_id)
WHERE s.dispatch_date >= CURDATE() - INTERVAL 30 DAY
GROUP BY c.carrier_id, c.carrier_name
HAVING on_time_sla_pct < 95.00;`}
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
                Guidelines for designing enterprise join architectures that scale efficiently
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
                  <strong className="text-white">1. Multi-Child Join Without CTEs:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Directly joining multiple 1:N tables causes severe aggregate inflation and corrupted balance sheets.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Forgetting COALESCE on Outer Aggregates:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Omitting COALESCE causes balances to evaluate to NULL whenever any single child table has 0 rows.
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
                  <strong className="text-white">1. Structure Queries with CTE Pre-Aggregation:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Use modular Common Table Expressions to summarize each domain independently before joining.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Check EXPLAIN FORMAT=TREE:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Verify that MySQL utilizes Hash Joins or Index Lookups rather than nested block scans.
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
            Summary Checklist (Module 002_005 Capstone Takeaways)
          </h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm text-slate-300">
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Synthesized INNER, LEFT, RIGHT, FULL outer simulation, SELF, and NON-EQUI joins</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Mastered Customer 360 ledger reconciliation without row multiplication</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Automated shipping fulfillment gap detection using Anti-Join techniques</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Applied Non-Equi joins for dynamic loyalty tier rewards calculation</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Ensured index coverage across all foreign key join paths</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Encapsulated complex multi-table SQL in reusable database Views</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Complex Join Lab &amp; Multi-Table Analytics – FAQs"
            questions={questions}
            subtitle="Master complex multi-table joins, customer 360 ledger reconciliation, CTE pre-aggregation patterns, warehouse anti-join fulfillment audits, and performance tuning with 30 comprehensive Q&As"
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
            title="Complex Join Lab: Customer Orders, Shipments, and Payments Analytics"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic13_complex_join_lab_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Congratulations on completing Module 002_005: Mastering SQL Joins & Multi-Table Queries! " +
              "In my classroom at Coder & AccoTax in Barrackpore, I share with my students: " +
              "'You have evolved from writing simple 2-table queries to architecting complete enterprise data pipelines. " +
              "You know how to prevent aggregate fan-out inflation using CTE pre-aggregation, " +
              "how to uncover unfulfilled shipments using Anti-Joins, " +
              "and how to bind customer spending dynamically to loyalty tiers using Non-Equi Joins!' " +
              "These techniques represent the gold standard of real-world database engineering. " +
              "Always remember: write explicit ANSI joins, index your foreign keys, and let the mathematics of relational algebra work for you!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 13 · Capstone Join Lab · Module 002_005 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic13;
