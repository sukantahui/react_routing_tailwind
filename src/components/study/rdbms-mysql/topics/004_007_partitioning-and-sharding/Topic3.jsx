import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

/**
 * Topic3 – RANGE Partitioning: Partitioning by Date Ranges, Years, and ID Intervals
 * Module: 004_007_partitioning-and-sharding
 *
 * @component
 * @returns {JSX.Element} Interactive RANGE partitioning workbench: comparing RANGE vs RANGE COLUMNS syntax, verifying VALUES LESS THAN boundary non-inclusivity, configuring MAXVALUE safety catch-all partitions, and testing REORGANIZE PARTITION forward additions in MySQL 8.0.
 */
const Topic3 = () => {
  // Interactive Range Configuration State
  const [selectedRangeKey, setSelectedRangeKey] = useState("range1_columns_vs_standard");

  const rangeConfigurations = {
    range1_columns_vs_standard: {
      configName: "1. RANGE vs RANGE COLUMNS",
      title: "1. Standard RANGE (expr) vs Modern RANGE COLUMNS",
      badge: "Syntax Comparison",
      badgeColor: "emerald",
      sqlSnippet: `-- 📜 1. LEGACY RANGE (Requires Integer Expression / TO_DAYS):
CREATE TABLE legacy_sales (
  order_id INT NOT NULL,
  order_date DATE NOT NULL,
  PRIMARY KEY (order_id, order_date)
) PARTITION BY RANGE (TO_DAYS(order_date)) (
  PARTITION p2025_01 VALUES LESS THAN (TO_DAYS('2025-02-01'))
);

-- ⚡ 2. MODERN RANGE COLUMNS (Direct Native DATE Literals):
CREATE TABLE modern_sales (
  order_id INT NOT NULL,
  order_date DATE NOT NULL,
  PRIMARY KEY (order_id, order_date)
) PARTITION BY RANGE COLUMNS (order_date) (
  PARTITION p2025_01 VALUES LESS THAN ('2025-02-01'),
  PARTITION p2025_02 VALUES LESS THAN ('2025-03-01'),
  PARTITION p_future  VALUES LESS THAN MAXVALUE
);`,
      explanation:
        "RANGE COLUMNS is the modern standard for date and multi-column partitioning. It eliminates wrapping functions like TO_DAYS() and allows direct comparison against native DATE, DATETIME, and string literals.",
      keyTakeaways: [
        "RANGE COLUMNS supports direct DATE, DATETIME, and VARCHAR literals.",
        "Eliminates function overhead during row insertion and pruning.",
        "Enables multi-column composite range partitioning."
      ]
    },
    range2_boundary_rules: {
      configName: "2. Boundary Rules",
      title: "2. Non-Inclusive Upper Bounds (VALUES LESS THAN)",
      badge: "Boundary Math",
      badgeColor: "cyan",
      sqlSnippet: `-- 🧮 HOW BOUNDARY VALUES WORK:
-- PARTITION p2024 VALUES LESS THAN (2025)
-- → Stores values where order_year < 2025 (e.g. 2024, 2023, 2022).
-- → Row with order_year = 2025 routes to p2025!

-- 📦 NULL HANDLING IN RANGE PARTITIONING:
-- NULL is treated as less than any integer or date value.
-- Rows with order_date = NULL are always stored in the lowest partition (p0)!`,
      explanation:
        "VALUES LESS THAN defines a strictly non-inclusive upper threshold. A record equal to the boundary value moves to the next higher partition. NULL values are treated as smaller than any value and route to the lowest partition.",
      keyTakeaways: [
        "VALUES LESS THAN (N) accepts values strictly less than N.",
        "A value equal to N routes into the next higher partition.",
        "NULL values are stored in the lowest-valued partition (p0)."
      ]
    },
    range3_maxvalue_reorganize: {
      configName: "3. MAXVALUE & Reorganize",
      title: "3. MAXVALUE Catch-All & REORGANIZE PARTITION Runbook",
      badge: "Dynamic Lifecycle",
      badgeColor: "purple",
      sqlSnippet: `-- 🛡️ 1. ALWAYS INCLUDE A MAXVALUE CATCH-ALL PARTITION:
-- Prevents runtime INSERT crashes (Error 1526) when future dates arrive!
PARTITION p_future VALUES LESS THAN MAXVALUE

-- 🔄 2. ADDING NEW MONTHLY PARTITIONS DYNAMICALLY ONLINE:
ALTER TABLE modern_sales REORGANIZE PARTITION p_future INTO (
  PARTITION p2025_03 VALUES LESS THAN ('2025-04-01'),
  PARTITION p2025_04 VALUES LESS THAN ('2025-05-01'),
  PARTITION p_future  VALUES LESS THAN MAXVALUE
);`,
      explanation:
        "Including a MAXVALUE catch-all partition prevents insert failures for future dates. When new ranges are needed, REORGANIZE PARTITION splits p_future into the new monthly partitions without locking active operations.",
      keyTakeaways: [
        "MAXVALUE safety partition prevents Error 1526 insert crashes.",
        "REORGANIZE PARTITION adds upcoming monthly partitions online.",
        "Can be automated via MySQL Event Scheduler or monthly cron jobs."
      ]
    },
    range4_timeseries_sizing: {
      configName: "4. Time-Series Sizing",
      title: "4. Time-Series Sizing: Yearly vs Monthly vs Daily",
      badge: "Sizing Strategy",
      badgeColor: "rose",
      sqlSnippet: `-- 📊 PRODUCTION SIZING GUIDELINES:
-- Volume: < 10M rows/year   → Yearly Partitioning (p2024, p2025)
-- Volume: 10M-100M rows/yr → Monthly Partitioning (p2025_01, p2025_02)
-- Volume: > 1M rows/day     → Daily Partitioning (p20250825, p20250826)

-- 🎯 Target: Size each partition between 2GB and 10GB for optimal RAM caching!`,
      explanation:
        "Sizing individual partitions between 2GB and 10GB ensures that the active partition B-Tree fits entirely inside the InnoDB buffer pool RAM, maintaining ultra-fast query execution and rapid sliding-window data drops.",
      keyTakeaways: [
        "High-volume ledger tables benefit from monthly or daily partitions.",
        "Keeps individual partition file sizes between 2GB and 10GB.",
        "Enables fine-grained historical data drops via ALTER TABLE DROP PARTITION."
      ]
    }
  };

  const currentRange = rangeConfigurations[selectedRangeKey];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.7: Partitioning &amp; Horizontal Sharding
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 3 of 12
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
          <span className="text-emerald-400">RANGE Partitioning</span>: Date Ranges, <span className="text-cyan-400">Years</span> &amp; ID Intervals
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Mastering RANGE partitioning in MySQL 8.0: understanding <code>RANGE COLUMNS</code> vs legacy <code>RANGE (expr)</code>, evaluating non-inclusive <code>VALUES LESS THAN</code> boundaries, configuring <code>MAXVALUE</code> safety catch-alls, and managing partition lifecycles.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: RANGE Pillars ───────────────────────────────── */}
        <section id="range-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Pillars of RANGE Partitioning
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Core principles governing interval-based physical data division and time-series table design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">RANGE COLUMNS</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Direct partitioning on <code>DATE</code>, <code>DATETIME</code>, and <code>VARCHAR</code> without helper function wrapping.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">Non-Inclusive Bounds</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                <code>VALUES LESS THAN (X)</code> accepts values &lt; X; values equal to X route to the next partition.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-purple-300 text-base">MAXVALUE Catch-All</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Prevents runtime insert crashes (Error 1526) for records exceeding current defined ranges.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-rose-300 text-base">Dynamic Reorganize</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                <code>REORGANIZE PARTITION</code> splits the MAXVALUE partition into upcoming months online.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive RANGE Partitioning Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe RANGE vs RANGE COLUMNS syntax, boundary evaluation rules, MAXVALUE reorganization, and time-series sizing patterns.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(rangeConfigurations).map((rangeKey) => {
              const config = rangeConfigurations[rangeKey];
              const isSelected = selectedRangeKey === rangeKey;
              return (
                <button
                  key={rangeKey}
                  onClick={() => setSelectedRangeKey(rangeKey)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 border",
                    isSelected
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-950/40"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  )}
                >
                  {config.configName}
                </button>
              );
            })}
          </div>

          {/* Dynamic Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                  RANGE Partitioning Architecture
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {currentRange.title}
                </h3>
              </div>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-semibold border w-fit",
                  currentRange.badgeColor === "emerald" && "bg-emerald-950/80 text-emerald-300 border-emerald-700",
                  currentRange.badgeColor === "cyan" && "bg-cyan-950/80 text-cyan-300 border-cyan-700",
                  currentRange.badgeColor === "purple" && "bg-purple-950/80 text-purple-300 border-purple-700",
                  currentRange.badgeColor === "rose" && "bg-rose-950/80 text-rose-300 border-rose-700"
                )}
              >
                {currentRange.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentRange.explanation}
            </p>

            {/* SQL Snippet */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Partitioning DDL &amp; Maintenance Snippets:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                {currentRange.sqlSnippet}
              </pre>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Architectural Takeaways:
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
                {currentRange.keyTakeaways.map((item, i) => (
                  <li key={i} className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/60 flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: Real-World Case Studies ─────────────────────── */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-purple-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Real-World Engineering Scenarios in Bengal
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              RANGE partitioning case studies in Barrackpore and Kolkata demonstrating MAXVALUE error fixes and high-precision monthly ledger partitioning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Fixing Error 1526 in Barrackpore Retail
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  MAXVALUE Fix
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, POS sales reached ₹1.2 Crores in inventory. When entering advanced orders for 2027, cashier billing crashed with <code>ERROR 1526: Table has no partition for value 2027</code> because the table only had partitions up to 2026. Susmita added <code>PARTITION p_future VALUES LESS THAN MAXVALUE</code>, providing an instant safety catch-all and eliminating cashier billing crashes.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Monthly Partitioning in Kolkata Bank
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Monthly Ledger
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, core ledgers tracked 250,000,000 transactions across ₹500 Crores in volume. Yearly partitions were too large (~60M rows) to fit in RAM. Debangshu configured <code>PARTITION BY RANGE COLUMNS (txn_date)</code> into monthly buckets (~5M rows each), keeping active monthly B-Trees cached 100% in the InnoDB buffer pool and enabling instant monthly regulatory archival via <code>DROP PARTITION</code>.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: Senior Pitfalls & Best Practices ────────────── */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Senior Pitfalls &amp; Production Best Practices
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Avoid omitting MAXVALUE catch-all partitions and defining out-of-order range values.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Omitting MAXVALUE Catch-All
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Omitting <code>VALUES LESS THAN MAXVALUE</code> causes client <code>INSERT</code> statements to fail with Error 1526 when unexpected future dates arrive.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always append PARTITION p_future VALUES LESS THAN MAXVALUE.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Non-Ascending Range Bounds
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Defining range boundaries out of ascending order causes MySQL to reject table creation with Error 1493.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Ensure range boundary thresholds strictly increase (V0 &lt; V1 &lt; V2).
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Use RANGE COLUMNS for Dates
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Standardize on <code>PARTITION BY RANGE COLUMNS (date_col)</code> to eliminate <code>TO_DAYS()</code> helper function wrapping.
              </p>
              <div className="text-xs text-slate-400">
                Simplifies DDL and enables direct date literal comparisons.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Automate Monthly Reorganization
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Schedule a monthly cron job to execute <code>ALTER TABLE ... REORGANIZE PARTITION p_future</code> to create upcoming monthly partitions online.
              </p>
              <div className="text-xs text-slate-400">
                Maintains a continuous forward buffer of monthly partitions automatically.
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: Printable Note & Teacher Advice ──────────────── */}
        <section id="printable-note" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Printable Study Note &amp; Teacher Advice
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Download complete printable notes and review key takeaways from Sir Sukanta Hui.
            </p>
          </div>

          <PlainTextPrint
            title="Topic 3: RANGE Partitioning: Partitioning by Date Ranges, Years, and ID Intervals"
            content={noteText}
          />

          <Teacher
            note="RANGE Partitioning is the foundation of modern time-series and financial database architecture! Always use RANGE COLUMNS for date and datetime columns so you can write clean date strings without TO_DAYS() function wrapping. Remember that VALUES LESS THAN defines non-inclusive upper boundaries, always define a MAXVALUE catch-all partition to avoid insert crashes, and use REORGANIZE PARTITION to add upcoming monthly partitions online!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of RANGE vs RANGE COLUMNS, non-inclusive upper bounds, MAXVALUE safety, NULL routing, and REORGANIZE PARTITION maintenance.
            </p>
          </div>

          <FAQTemplate
            title="RANGE Partitioning &amp; Time-Series FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic3;
