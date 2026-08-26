import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic11_files/topic11_questions";
import noteText from "./topic11_files/topic11_note.txt?raw";

/**
 * Topic11 – Calculating Critical Health Indicators: Buffer Pool Hit Ratio, Connection Pool Saturation, Query Cache / QPS Rates
 * Module: 004_005_logs-monitoring-and-slow-queries
 *
 * @component
 * @returns {JSX.Element} Interactive derived health formulas workbench: calculating InnoDB Buffer Pool Hit Ratios, evaluating connection pool saturation percentages, deriving real-time interval QPS and TPS, and computing index efficiency ratios in MySQL 8.0.
 */
const Topic10Calculations = () => {
  // Interactive Formula State
  const [selectedFormulaKey, setSelectedFormulaKey] = useState("formula1_hit_ratio");

  const healthFormulas = {
    formula1_hit_ratio: {
      formulaName: "1. Buffer Pool Hit Ratio",
      title: "1. InnoDB Buffer Pool Hit Ratio (&gt;99.0% SLA)",
      badge: "Memory Caching SLA",
      badgeColor: "emerald",
      sqlSnippet: `-- 🧠 INNODB BUFFER POOL HIT RATIO FORMULA:
-- Formula: (1 - (Innodb_buffer_pool_reads / Innodb_buffer_pool_read_requests)) * 100%

SELECT 
  req.VARIABLE_VALUE AS logical_read_requests,
  r.VARIABLE_VALUE AS physical_disk_reads,
  ROUND((1 - (r.VARIABLE_VALUE / req.VARIABLE_VALUE)) * 100, 4) AS buffer_pool_hit_ratio_pct
FROM performance_schema.global_status r
JOIN performance_schema.global_status req 
  ON req.VARIABLE_NAME = 'Innodb_buffer_pool_read_requests'
WHERE r.VARIABLE_NAME = 'Innodb_buffer_pool_reads';

-- 🎯 SLA Targets:
-- > 99.0% : Healthy Production OLTP
-- < 95.0% : Memory Starvation / Table Scan Disk Thrashing!`,
      explanation:
        "The Buffer Pool Hit Ratio measures the percentage of 16KB data page requests satisfied directly from system RAM. In healthy OLTP production systems, this ratio must remain strictly above 99.0%.",
      keyTakeaways: [
        "Compares logical RAM requests against physical disk reads.",
        "Target SLA is >99.0% (Gold standard: &gt;99.9%).",
        "A ratio <95% indicates disk thrashing and memory starvation."
      ]
    },
    formula2_connection_saturation: {
      formulaName: "2. Connection Saturation",
      title: "2. Connection Pool Saturation Percentage (<80% SLA)",
      badge: "Capacity Sizing",
      badgeColor: "cyan",
      sqlSnippet: `-- 🔌 CONNECTION POOL SATURATION FORMULA:
-- Formula: (Threads_connected / max_connections) * 100%

SELECT 
  c.VARIABLE_VALUE AS active_connected_threads,
  m.VARIABLE_VALUE AS max_allowed_connections,
  ROUND((c.VARIABLE_VALUE / m.VARIABLE_VALUE) * 100, 2) AS connection_saturation_pct
FROM performance_schema.global_status c
JOIN performance_schema.global_variables m ON m.VARIABLE_NAME = 'max_connections'
WHERE c.VARIABLE_NAME = 'Threads_connected';

-- 🎯 Alert Thresholds:
-- < 80% : Normal Operating Headroom
-- >= 80% : Warning Alert (Scale Pool!)
-- &ge; 90% : Critical Alert (Outage Imminent &rarr; Error 1040!)`,
      explanation:
        "Connection Pool Saturation tracks how close the database is to exhausting its connection limit. Crossing 80% triggers automated alerts to prevent Error 1040 (Too many connections).",
      keyTakeaways: [
        "Calculates the percentage of available client connection slots used.",
        "Warning alert at 80% saturation; Critical alert at 90%.",
        "Prevents sudden client connection rejections across microservices."
      ]
    },
    formula3_qps_and_tps: {
      formulaName: "3. QPS & TPS Rates",
      title: "3. Real-Time QPS & TPS Workload Rates",
      badge: "Workload Metrics",
      badgeColor: "purple",
      sqlSnippet: `-- ⚡ 1. REAL-TIME INTERVAL QPS (10-SECOND WINDOW):
-- QPS = (Questions(t2) - Questions(t1)) / 10

-- 📝 2. REAL-TIME TRANSACTIONS PER SECOND (TPS):
-- TPS = ((Com_commit(t2) + Com_rollback(t2)) - (Com_commit(t1) + Com_rollback(t1))) / 10

SELECT 
  SUM(VARIABLE_VALUE) AS total_lifetime_transactions 
FROM performance_schema.global_status 
WHERE VARIABLE_NAME IN ('Com_commit', 'Com_rollback');`,
      explanation:
        "Questions measures client query throughput (QPS), while Com_commit and Com_rollback measure transactional write mutations (TPS). Delta math over 10-second intervals captures real-time throughput spikes.",
      keyTakeaways: [
        "QPS measures client query demand; TPS measures write transactions.",
        "Interval delta math captures peak traffic spikes without smoothing.",
        "Crucial for capacity planning and auto-scaling read replicas."
      ]
    },
    formula4_index_and_tmp_ratios: {
      formulaName: "4. Index & Disk Spills",
      title: "4. Index Efficiency (&gt;95%) & Disk Spill (<10%) Ratios",
      badge: "Query Optimization",
      badgeColor: "rose",
      sqlSnippet: `-- 🔍 1. INDEX EFFICIENCY RATIO (>95.0% TARGET):
SELECT 
  k.VARIABLE_VALUE AS indexed_reads,
  s.VARIABLE_VALUE AS scan_reads,
  ROUND((k.VARIABLE_VALUE / (k.VARIABLE_VALUE + s.VARIABLE_VALUE)) * 100, 2) AS index_efficiency_pct
FROM performance_schema.global_status k
JOIN performance_schema.global_status s ON s.VARIABLE_NAME = 'Handler_read_rnd_next'
WHERE k.VARIABLE_NAME = 'Handler_read_key';

-- 💾 2. TEMPORARY DISK TABLE SPILL RATIO (<10.0% TARGET):
SELECT 
  d.VARIABLE_VALUE AS disk_tmp_tables,
  t.VARIABLE_VALUE AS total_tmp_tables,
  ROUND((d.VARIABLE_VALUE / (t.VARIABLE_VALUE + 0.001)) * 100, 2) AS disk_tmp_spill_pct
FROM performance_schema.global_status d
JOIN performance_schema.global_status t ON t.VARIABLE_NAME = 'Created_tmp_tables'
WHERE d.VARIABLE_NAME = 'Created_tmp_disk_tables';`,
      explanation:
        "Index efficiency measures the ratio of B-Tree point lookups vs sequential row scans. The Temporary Disk Spill Ratio reveals whether temporary tables are fitting in RAM or spilling to physical disk.",
      keyTakeaways: [
        "Index Efficiency >95% confirms optimizer is using B-Tree indexes.",
        "Temporary Disk Spill Ratio <10% ensures queries sort in RAM.",
        "High disk spills indicate undersized tmp_table_size or missing indexes."
      ]
    }
  };

  const currentFormula = healthFormulas[selectedFormulaKey];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.5: Server Logs, Slow Queries &amp; Performance Schema
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 11 of 13
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Calculating <span className="text-emerald-400">Health Indicators</span>: Ratios &amp; <span className="text-cyan-400">QPS / TPS</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Mastering mathematical health derivations in MySQL 8.0: calculating the InnoDB Buffer Pool Hit Ratio (&gt;99.0% SLA), evaluating connection pool saturation percentages, deriving real-time QPS and TPS rates, and tracking index efficiency.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: Formula Pillars ─────────────────────────────── */}
        <section id="formula-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Pillars of Derived Health Indicators
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How derived mathematical ratios transform raw counters into actionable capacity and performance intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Formula 1</span>
              <h3 className="font-bold text-white text-base">Hit Ratio &gt; 99%</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                <code>(1 - (reads / requests)) * 100</code> verifies in-memory RAM caching performance.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Formula 2</span>
              <h3 className="font-bold text-white text-base">Saturation &lt; 80%</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                <code>(Threads_connected / max_connections) * 100</code> prevents Error 1040 connection rejections.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Formula 3</span>
              <h3 className="font-bold text-purple-300 text-base">Interval QPS / TPS</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                <code>&Delta;Questions / &Delta;t</code> measures real-time application throughput during traffic surges.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Formula 4</span>
              <h3 className="font-bold text-rose-300 text-base">Index Ratio &gt; 95%</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                <code>Handler_read_key / total reads</code> verifies B-Tree index lookup efficiency.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Health Indicator Formulas Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe buffer pool hit ratios, connection saturation formulas, QPS interval calculations, and index ratios.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(healthFormulas).map((formulaKey) => {
              const item = healthFormulas[formulaKey];
              const isSelected = selectedFormulaKey === formulaKey;
              return (
                <button
                  key={formulaKey}
                  onClick={() => setSelectedFormulaKey(formulaKey)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 border",
                    isSelected
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-950/40"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  )}
                &gt;
                  {item.formulaName}
                </button>
              );
            })}
          </div>

          {/* Dynamic Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                  Health Indicator
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {currentFormula.title}
                </h3>
              </div>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-semibold border w-fit",
                  currentFormula.badgeColor === "emerald" && "bg-emerald-950/80 text-emerald-300 border-emerald-700",
                  currentFormula.badgeColor === "cyan" && "bg-cyan-950/80 text-cyan-300 border-cyan-700",
                  currentFormula.badgeColor === "purple" && "bg-purple-950/80 text-purple-300 border-purple-700",
                  currentFormula.badgeColor === "rose" && "bg-rose-950/80 text-rose-300 border-rose-700"
                )}
              >
                {currentFormula.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentFormula.explanation}
            </p>

            {/* SQL Snippet */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                SQL Formulas &amp; Derived Health Queries:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                {currentFormula.sqlSnippet}
              </pre>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Architectural Takeaways:
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
                {currentFormula.keyTakeaways.map((item, i) => (
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
              Health indicator calculation case studies in Barrackpore and Kolkata demonstrating 88.4% Hit Ratio remediation and 4,200 TPS throughput scaling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Fixing 88.4% Hit Ratio in Barrackpore Retail
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  88.4% &rarr; 99.9%
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, retail store POS checkout slowed during evening rush. Mamata calculated the Buffer Pool Hit Ratio: <code>(1 - (580,000 / 5,000,000)) * 100 = 88.4%</code>, proving that 11.6% of all page requests were reading from physical disk. Increasing <code>innodb_buffer_pool_size</code> from 2GB to 8GB brought the Hit Ratio to 99.9%, restoring sub-millisecond checkout speeds across ₹1.2 Crores in retail inventory.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Measuring 4,200 TPS in Kolkata Bank
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  4,200 TPS Sustained
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, managing core banking transaction ledgers across ₹500 Crores in volume required benchmarking write capacity. Debangshu measured interval deltas of <code>Com_commit</code> and <code>Com_rollback</code> over 60 seconds, recording a sustained 4,200 write transactions per second (TPS) with an Index Efficiency Ratio of 99.4% and zero temporary disk table spills.
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
              Avoid relying on lifetime smoothed averages and ignoring temporary disk spills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Relying on Lifetime Average QPS
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Dividing <code>Questions</code> by <code>Uptime</code> smooths traffic over weeks, concealing 10x traffic spikes during morning login rushes or flash sales.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always calculate interval delta rates (10s window) for capacity planning.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: High Disk Spill Ratio (&gt;15%)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                When <code>Created_tmp_disk_tables</code> exceeds 15% of total temporary tables, queries write intermediate results to disk, choking NVMe I/O.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Keep Temporary Disk Spill Ratio &lt;10% by increasing tmp_table_size and indexing.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Maintain Hit Ratio &gt;99.0%
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Ensure the InnoDB Buffer Pool Hit Ratio stays strictly above 99.0% on OLTP instances to guarantee sub-millisecond RAM query execution.
              </p>
              <div className="text-xs text-slate-400">
                Size innodb_buffer_pool_size to 60-75% of total host RAM on dedicated database servers.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Enforce Index Ratio &gt;95%
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Monitor <code>Handler_read_key / (Handler_read_key + Handler_read_rnd_next)</code> to verify that B-Tree indexes satisfy over 95% of row requests.
              </p>
              <div className="text-xs text-slate-400">
                Prevents unindexed table scans from consuming excessive CPU cycles.
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
            title="Topic 11: Calculating Critical Health Indicators: Buffer Pool Hit Ratio, Connection Pool Saturation, Query Cache / QPS Rates"
            content={noteText}
          />

          <Teacher
            note="Raw numbers without formulas are meaningless! Master these five essential formulas: maintain your Buffer Pool Hit Ratio strictly above 99.0% (ideally >99.9%), keep Connection Saturation below 80% to avoid Error 1040, calculate real-time QPS and TPS over 10-second intervals for accurate capacity planning, and ensure your Index Efficiency Ratio stays above 95% to keep queries blazing fast!"
          /&gt;
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of derived health indicator formulas, buffer pool hit ratios, connection saturation SLAs, interval QPS/TPS math, and index ratios.
            </p>
          </div>

          <FAQTemplate
            title="Health Indicator Formulas &amp; Ratios FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic10Calculations;
