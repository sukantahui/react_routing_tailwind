import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic15_files/topic15_questions";
import noteText from "./topic15_files/topic15_note.txt?raw";

/**
 * Topic15 – Denormalization: When, Why, and How to Use It in High-Throughput Systems
 * Module: 002_004_normalization (Functional Dependencies & Database Normalization)
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Denormalization Strategy Simulator Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic15 = () => {
  const sectionRefs = useRef([]);

  // Interactive Denormalization State
  const [selectedPatternKey, setSelectedPatternKey] = useState("pattern_aggregates"); // "pattern_aggregates" | "pattern_duplicate_parent" | "pattern_snapshot" | "pattern_comparison"

  const denormPatterns = {
    pattern_aggregates: {
      title: "1. Pre-Computed Derived Aggregates",
      concept: "Storing running totals and item counts directly on parent records (e.g. orders.total_amount).",
      readBenefit: "Instant O(1) single-row read instead of executing slow SELECT SUM(price * qty) over millions of order_items.",
      writeOverhead: "Must update parent total on every child item insert/update/delete via MySQL Trigger or ACID transaction.",
      statusBadge: "HIGH-VALUE READ OPTIMIZATION",
      badgeColor: "emerald",
      sqlImplementation: `-- Pre-Computed Aggregate Pattern with Automated Sync Trigger:
ALTER TABLE orders ADD COLUMN total_amount DECIMAL(10,2) DEFAULT 0.00;
ALTER TABLE orders ADD COLUMN item_count INT DEFAULT 0;

DELIMITER $$
CREATE TRIGGER after_order_item_insert
AFTER INSERT ON order_items
FOR EACH ROW
BEGIN
    UPDATE orders
    SET total_amount = total_amount + (NEW.unit_price * NEW.quantity),
        item_count = item_count + NEW.quantity
    WHERE order_id = NEW.order_id;
END$$
DELIMITER ;`,
    },
    pattern_duplicate_parent: {
      title: "2. Replicating Parent Text in Child Tables",
      concept: "Copying frequently read parent strings (e.g. product_name) directly into order_items.",
      readBenefit: "Renders user order history and receipts with 1 fast query without joining the products catalog.",
      writeOverhead: "Updating product_name requires modifying multiple historical rows or accepting decoupled naming.",
      statusBadge: "JOIN-ELIMINATING PATTERN",
      badgeColor: "cyan",
      sqlImplementation: `-- Duplicating Parent Product Name for Fast Receipt Querying:
CREATE TABLE order_items (
    order_id VARCHAR(10) NOT NULL,
    product_id VARCHAR(10) NOT NULL,
    product_name VARCHAR(100) NOT NULL, -- Denormalized parent text
    unit_price DECIMAL(10,2) NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY (order_id, product_id)
);

-- Ultra-Fast Zero-JOIN Receipt Query:
SELECT product_name, unit_price, quantity, (unit_price * quantity) AS line_total
FROM order_items
WHERE order_id = 'ORD9021';`,
    },
    pattern_snapshot: {
      title: "3. Historical Snapshot Immutability",
      concept: "Freezing shipping address and unit price at the exact moment of purchase for legal compliance.",
      readBenefit: "Guarantees 100% legal accounting and tax compliance; invoice never mutates when customers move or prices change.",
      writeOverhead: "Zero sync overhead! Historical snapshots are immutable and MUST NOT update when parent changes.",
      statusBadge: "MANDATORY AUDIT COMPLIANCE",
      badgeColor: "emerald",
      sqlImplementation: `-- Immutable Historical Snapshot Pattern:
CREATE TABLE invoices (
    invoice_id VARCHAR(15) PRIMARY KEY,
    order_id VARCHAR(10) NOT NULL,
    customer_id VARCHAR(10) NOT NULL,
    customer_name_snapshot VARCHAR(100) NOT NULL,
    shipping_address_snapshot TEXT NOT NULL, -- Frozen address at purchase
    tax_amount DECIMAL(10,2) NOT NULL,
    grand_total DECIMAL(10,2) NOT NULL,
    issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`,
    },
    pattern_comparison: {
      title: "4. Normalized 3NF vs Denormalized Performance Matrix",
      concept: "Evaluating the trade-offs between pure 3NF relational purity and denormalized scale architecture.",
      readBenefit: "Denormalized: Sub-millisecond reads, zero table joins, high scalability for read-heavy workloads (100:1 read ratio).",
      writeOverhead: "3NF: Pure write throughput, zero duplicate storage. Denormalized: Requires sync triggers and data reconciliation.",
      statusBadge: "SYSTEM ARCHITECTURE DECISION",
      badgeColor: "amber",
      sqlImplementation: `-- CQRS Read-Model Strategy:
-- Master Write DB: Strict 3NF (Zero Redundancy, ACID Transactions)
-- Read Replica / Cache: Denormalized Pre-Joined Models (Redis / Elasticsearch)
-- Synchronized asynchronously via Kafka Change-Data-Capture (CDC).`,
    },
  };

  const currentPattern = denormPatterns[selectedPatternKey];

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
            Module 002_004 · Database Normalization · Topic 15 (Module Capstone)
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Denormalization:{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              High-Throughput Read Strategies
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master the strategic art of controlled data redundancy: the Read vs Write performance trade-off, pre-computed aggregates,
            immutable historical snapshots, and automated trigger synchronization in high-scale production systems.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ "Normalize until it hurts, Denormalize until it works!"
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📊 Pre-Computed Derived Aggregates
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📜 Immutable Historical Snapshots
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🛡️ ACID Transactions &amp; MySQL Triggers
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: The Denormalization Philosophy ─────────── */}
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
                The Philosophy &amp; Engineering Rules of Denormalization
              </h2>
              <p className="text-xs text-slate-400">
                Why denormalization is a calculated scaling optimization, NEVER an excuse for sloppy design
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-teal-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase">Normalized 3NF (Write-Optimized)</span>
              <strong className="text-white text-xs block font-mono">Zero Redundancy · Pure ACID Writes</strong>
              <p className="text-xs text-slate-300">
                Updates touch exactly one row. Best for transactional OLTP systems where data modifications are frequent and read loads are moderate.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-amber-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">Denormalized (Read-Optimized)</span>
              <strong className="text-white text-xs block font-mono">Controlled Redundancy · Zero-JOIN Reads</strong>
              <p className="text-xs text-slate-300">
                Pre-joins parent data and stores pre-computed sums. Best for read-heavy portals (100:1 read ratio) where multi-table joins create latency spikes.
              </p>
            </div>
          </div>

          {/* ── Semantic SVG 1: Normalized vs Denormalized Architecture Diagram ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Normalized Multi-Table Join Overhead vs Denormalized Zero-Join Read Path
            </h3>
            <svg
              viewBox="0 0 780 140"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Denormalization Architecture Diagram"
            >
              {/* Normalized Side */}
              <g transform="translate(20, 20)">
                <rect width="320" height="100" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <rect width="320" height="24" rx="8" fill="#0f172a" stroke="#38bdf8" />
                <text x="160" y="16" fill="#38bdf8" textAnchor="middle" fontWeight="bold">Normalized 3NF (Multi-Table JOINs)</text>
                <text x="15" y="45" fill="#cbd5e1" fontSize="10">Orders ⋈ Order_Items ⋈ Products ⋈ Customers</text>
                <text x="15" y="65" fill="#fca5a5" fontSize="10">Requires 4-Table JOIN on every page view</text>
                <text x="15" y="85" fill="#94a3b8" fontSize="9">High CPU &amp; Disk IO under 100k req/sec</text>
              </g>

              {/* Arrow */}
              <g transform="translate(355, 60)">
                <line x1="0" y1="10" x2="60" y2="10" stroke="#10b981" strokeWidth="3" />
                <polygon points="60,5 75,10 60,15" fill="#10b981" />
                <text x="35" y="-5" fill="#10b981" textAnchor="middle" fontSize="9" fontWeight="bold">OPTIMIZE</text>
              </g>

              {/* Denormalized Side */}
              <g transform="translate(440, 20)">
                <rect width="320" height="100" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <rect width="320" height="24" rx="8" fill="#0f172a" stroke="#10b981" />
                <text x="160" y="16" fill="#10b981" textAnchor="middle" fontWeight="bold">Denormalized Read Model (Zero-JOIN)</text>
                <text x="15" y="45" fill="#cbd5e1" fontSize="10">Single Query: SELECT * FROM order_receipts</text>
                <text x="15" y="65" fill="#a7f3d0" fontSize="10">Sub-millisecond latency · Pre-computed total</text>
                <text x="15" y="85" fill="#10b981" fontSize="9" fontWeight="bold">✓ High-Throughput Scale Ready</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Strategy Simulator Sandbox ─── */}
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
                Interactive Denormalization Pattern &amp; Trade-off Simulator
              </h2>
              <p className="text-xs text-slate-400">
                Explore the 4 core denormalization patterns, compare read gains vs write overhead, and view production SQL schemas
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Scenario Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedPatternKey("pattern_aggregates")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedPatternKey === "pattern_aggregates"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                1. Derived Aggregates
              </button>

              <button
                onClick={() => setSelectedPatternKey("pattern_duplicate_parent")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedPatternKey === "pattern_duplicate_parent"
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                2. Replicate Parent Text
              </button>

              <button
                onClick={() => setSelectedPatternKey("pattern_snapshot")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedPatternKey === "pattern_snapshot"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                3. Immutable Snapshot
              </button>

              <button
                onClick={() => setSelectedPatternKey("pattern_comparison")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedPatternKey === "pattern_comparison"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                4. 3NF vs Denorm Matrix
              </button>
            </div>

            {/* Sandbox Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Trade-off Details */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white">{currentPattern.title}</span>
                    <span
                      className={clsx(
                        "text-[10px] font-mono px-2 py-0.5 rounded border",
                        currentPattern.badgeColor === "emerald"
                          ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                          : currentPattern.badgeColor === "cyan"
                          ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
                          : "bg-amber-500/10 text-amber-300 border-amber-500/30"
                      )}
                    >
                      {currentPattern.statusBadge}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px] uppercase font-bold">Pattern Architecture:</span>
                      <p className="text-slate-300 mt-0.5">{currentPattern.concept}</p>
                    </div>

                    <div>
                      <span className="text-emerald-400 block text-[11px] uppercase font-bold">Read Performance Gain:</span>
                      <p className="text-emerald-300 mt-0.5 font-bold">{currentPattern.readBenefit}</p>
                    </div>

                    <div>
                      <span className="text-rose-400 block text-[11px] uppercase font-bold">Write / Sync Overhead:</span>
                      <p className="text-slate-400 mt-0.5">{currentPattern.writeOverhead}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Production SQL Implementation */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
                  <span className="text-xs font-bold text-slate-200 block border-b border-slate-800 pb-2">
                    Production SQL Trigger &amp; DDL Implementation
                  </span>

                  <pre className="font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap text-[11px] bg-slate-900 p-3 rounded-lg border border-slate-800">
                    {currentPattern.sqlImplementation}
                  </pre>
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
                How Barrackpore and Kolkata training institutes safely apply denormalization
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's E-Commerce Checkout Invoice Snapshot
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Preserving historical price and tax snapshots in Indian Rupee (₹) without mutating past records:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Freezing order prices at transaction time:
INSERT INTO order_items (order_id, product_id, product_name, unit_price, quantity)
VALUES ('ORD1001', 'P101', 'React Masterclass', 4500.00, 1);
-- If course fee increases to ₹5,500 tomorrow, this invoice remains legally ₹4,500.`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Student Portal Enrollment Count Accelerator
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata University</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Denormalizing total enrolled students on the <code>courses</code> table for instant dashboard rendering:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Auto-incrementing course student count via Trigger:
CREATE TRIGGER after_student_enroll
AFTER INSERT ON enrollments
FOR EACH ROW
BEGIN
    UPDATE courses
    SET total_students_enrolled = total_students_enrolled + 1
    WHERE course_id = NEW.course_id;
END;`}
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
                Guidelines for maintaining data consistency across denormalized database architectures
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
                  <strong className="text-white">1. Premature Denormalization:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Denormalizing before exhausting composite B-Tree indexes and query tuning adds needless sync complexity.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Uncoordinated Application Writes:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Updating duplicated columns across multiple tables without ACID transactions causes silent data drift.
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
                  <strong className="text-white">1. Always Design 3NF/BCNF First:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Start with a pristine normalized schema; introduce denormalization only for verified read hotspots.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Run Scheduled Reconciliation Audits:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Execute background cron jobs to recalculate sums and automatically fix any desynchronized denormalized fields.
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
              <span>Always design a pristine normalized 3NF/BCNF schema first</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Denormalize ONLY when verified query profiling proves JOIN bottlenecks under high read load</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use pre-computed aggregates (total_amount, item_count) to avoid full-table scans</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use snapshot historical duplication for immutable audit trails (invoices, receipts)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Guard duplicate data using ACID transactions, MySQL triggers, or event pipelines</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>"Normalize until it hurts, Denormalize until it works!"</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Denormalization Strategies – FAQs"
            questions={questions}
            subtitle="Master Denormalization, the Read vs Write performance trade-off, pre-computed derived aggregates, immutable historical snapshots, and ACID sync safeguards with 30 comprehensive Q&As"
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
            title="Denormalization: When, Why, and How to Use It in High-Throughput Systems"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic15_denormalization_strategies_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Denormalization is the ultimate badge of seniority for a database engineer! " +
              "In my classroom at Coder & AccoTax in Barrackpore, I always tell students: " +
              "'Junior developers denormalize out of laziness; Senior architects denormalize out of mathematical precision!' " +
              "Never denormalize a database because you didn't feel like creating a child table in 1NF or 2NF. " +
              "First, build your schema to pristine 3NF or BCNF so your data model is mathematically pure. " +
              "Then, when your production metrics show that a 6-table join is taking 200 milliseconds under 50,000 requests per second, " +
              "strategically introduce pre-computed aggregates and snapshot historical columns guarded by database triggers. " +
              "That is how modern high-scale architectures like Amazon, Swiggy, and Flipkart achieve blistering sub-millisecond read throughput!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 15 (Capstone) · Denormalization Strategies · Module 002_004 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic15;
