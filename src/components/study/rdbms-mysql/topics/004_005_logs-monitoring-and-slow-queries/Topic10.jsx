import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic10_files/topic10_questions";
import noteText from "./topic10_files/topic10_note.txt?raw";

/**
 * Topic10 – Key Telemetry Metrics: Threads_connected, Threads_running, Questions, Uptime, Innodb_buffer_pool_read_requests, Innodb_buffer_pool_reads
 * Module: 004_005_logs-monitoring-and-slow-queries
 *
 * @component
 * @returns {JSX.Element} Interactive 6-metric telemetry workbench: evaluating the 6 foundational telemetry metrics (Threads_connected, Threads_running, Questions, Uptime, Buffer Pool Read Requests, Buffer Pool Reads), calculating Buffer Pool Hit Ratios, and monitoring CPU concurrency in MySQL 8.0.
 */
const Topic10 = () => {
  // Interactive Telemetry Metric State
  const [selectedMetricGroup, setSelectedMetricGroup] = useState("group1_threads");

  const metricGroups = {
    group1_threads: {
      groupName: "1. Threads Telemetry",
      title: "1. Threads_connected vs Threads_running (CPU Concurrency)",
      badge: "Concurrency Triage",
      badgeColor: "emerald",
      sqlSnippet: `-- 🧵 THREAD CONCURRENCY & CONNECTION SATURATION INSPECTION:
SELECT 
  c.VARIABLE_VALUE AS threads_connected,
  m.VARIABLE_VALUE AS max_allowed_connections,
  ROUND((c.VARIABLE_VALUE / m.VARIABLE_VALUE) * 100, 2) AS pool_saturation_pct,
  r.VARIABLE_VALUE AS threads_running_on_cpu
FROM performance_schema.global_status c
JOIN performance_schema.global_variables m ON m.VARIABLE_NAME = 'max_connections'
JOIN performance_schema.global_status r ON r.VARIABLE_NAME = 'Threads_running'
WHERE c.VARIABLE_NAME = 'Threads_connected';

-- ⚠️ Critical Alert: If Threads_running > (CPU Cores * 2), queries are starving on CPU!`,
      explanation:
        "Threads_connected tracks open client connections, while Threads_running measures how many threads are actively executing queries on CPU cores right now. When Threads_running exceeds CPU core limits, thread queuing occurs.",
      keyTakeaways: [
        "Threads_connected monitors connection pool capacity vs max_connections.",
        "Threads_running measures active CPU threads executing SQL queries.",
        "Alert when Threads_running significantly exceeds physical CPU core count."
      ]
    },
    group2_throughput: {
      groupName: "2. Throughput & QPS",
      title: "2. Questions & Uptime: QPS Calculation Formulas",
      badge: "Throughput Telemetry",
      badgeColor: "cyan",
      sqlSnippet: `-- 🚀 1. LIFETIME AVERAGE QUERIES PER SECOND (QPS):
SELECT 
  q.VARIABLE_VALUE AS total_client_questions,
  u.VARIABLE_VALUE AS uptime_seconds,
  ROUND(q.VARIABLE_VALUE / u.VARIABLE_VALUE, 2) AS lifetime_avg_qps
FROM performance_schema.global_status q 
JOIN performance_schema.global_status u ON u.VARIABLE_NAME = 'Uptime'
WHERE q.VARIABLE_NAME = 'Questions';

-- ⚡ 2. INTERVAL QPS FORMULA:
-- (Questions_t2 - Questions_t1) / (t2 - t1) = Real-time Current QPS!`,
      explanation:
        "Questions counts client SQL statements received, while Uptime measures server runtime in seconds. Dividing Questions by Uptime calculates historical average QPS; delta interval math calculates real-time QPS.",
      keyTakeaways: [
        "Questions counts statements from clients (excluding internal routines).",
        "Uptime normalizes cumulative counters over elapsed seconds.",
        "Interval delta math provides true real-time QPS throughput."
      ]
    },
    group3_buffer_pool: {
      groupName: "3. Buffer Pool Caching",
      title: "3. Buffer Pool I/O: Hit Ratio & Disk Reads",
      badge: "Memory Caching",
      badgeColor: "purple",
      sqlSnippet: `-- 🧠 INNODB BUFFER POOL HIT RATIO CALCULATION (>99.0% TARGET):
SELECT 
  req.VARIABLE_VALUE AS logical_read_requests,
  r.VARIABLE_VALUE AS physical_disk_reads,
  ROUND((1 - (r.VARIABLE_VALUE / req.VARIABLE_VALUE)) * 100, 4) AS buffer_pool_hit_ratio_pct
FROM performance_schema.global_status r
JOIN performance_schema.global_status req 
  ON req.VARIABLE_NAME = 'Innodb_buffer_pool_read_requests'
WHERE r.VARIABLE_NAME = 'Innodb_buffer_pool_reads';

-- 💡 A Hit Ratio <95.0% indicates buffer pool starvation and heavy disk thrashing!`,
      explanation:
        "Innodb_buffer_pool_read_requests measures logical in-memory requests; Innodb_buffer_pool_reads measures physical disk reads. The Buffer Pool Hit Ratio must remain >99.0% for high-speed sub-millisecond OLTP.",
      keyTakeaways: [
        "Read requests represent logical memory demands in RAM.",
        "Reads represent cache misses that had to fetch 16KB pages from disk.",
        "Maintain Hit Ratio >99.0% on enterprise production workloads."
      ]
    },
    group4_handler_efficiency: {
      groupName: "4. Index Efficiency",
      title: "4. Index Scanning: Handler_read_key vs read_rnd_next",
      badge: "Index Efficiency",
      badgeColor: "rose",
      sqlSnippet: `-- 🔍 INDEX EFFICIENCY RATIO (INDEXED LOOKUPS VS FULL SCANS):
SELECT 
  k.VARIABLE_VALUE AS indexed_key_reads,
  s.VARIABLE_VALUE AS full_scan_row_reads,
  ROUND(k.VARIABLE_VALUE / (k.VARIABLE_VALUE + s.VARIABLE_VALUE) * 100, 2) AS index_efficiency_pct
FROM performance_schema.global_status k
JOIN performance_schema.global_status s ON s.VARIABLE_NAME = 'Handler_read_rnd_next'
WHERE k.VARIABLE_NAME = 'Handler_read_key';

-- 🛑 High Handler_read_rnd_next = Frequent unindexed full table scans!`,
      explanation:
        "Handler_read_key measures indexed B-Tree point lookups, while Handler_read_rnd_next counts sequential row steps during full table scans. A high ratio of indexed reads confirms effective schema indexing.",
      keyTakeaways: [
        "Handler_read_key reflects efficient indexed B-Tree traversals.",
        "Handler_read_rnd_next counts row steps during full table scans.",
        "High scan reads signal missing composite indexes."
      ]
    }
  };

  const currentGroup = metricGroups[selectedMetricGroup];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.5: Server Logs, Slow Queries &amp; Performance Schema
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 10 of 13
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Key Telemetry: <span className="text-emerald-400">Threads</span>, <span className="text-cyan-400">QPS</span> &amp; Buffer Pool I/O
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Deep diving into the six cornerstone telemetry metrics in MySQL 8.0: evaluating connection pool saturation, monitoring CPU thread starvation with <code>Threads_running</code>, calculating real-time QPS throughput, determining Buffer Pool Hit Ratios, and measuring Handler index efficiency.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: Telemetry Pillars ───────────────────────────── */}
        <section id="telemetry-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Pillars of Key Metric Observability
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How the six core telemetry variables provide complete visibility into database capacity and memory efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">Threads_running</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Measures active queries executing on CPU cores, alerting on thread starvation when exceeding CPU counts.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">Questions &amp; QPS</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Calculates client query throughput rates normalized over continuous uptime duration.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-purple-300 text-base">Hit Ratio &gt; 99%</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Compares buffer pool read requests vs disk reads to verify in-memory caching performance.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-rose-300 text-base">Handler Efficiency</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Compares <code>Handler_read_key</code> against <code>Handler_read_rnd_next</code> to evaluate indexing.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Telemetry Metrics Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe thread concurrency, QPS calculations, buffer pool hit ratio formulas, and handler index efficiency.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(metricGroups).map((groupKey) => {
              const group = metricGroups[groupKey];
              const isSelected = selectedMetricGroup === groupKey;
              return (
                <button
                  key={groupKey}
                  onClick={() => setSelectedMetricGroup(groupKey)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 border",
                    isSelected
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-950/40"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  )}
                >
                  {group.groupName}
                </button>
              );
            })}
          </div>

          {/* Dynamic Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                  {currentGroup.groupName}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {currentGroup.title}
                </h3>
              </div>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-semibold border w-fit",
                  currentGroup.badgeColor === "emerald" && "bg-emerald-950/80 text-emerald-300 border-emerald-700",
                  currentGroup.badgeColor === "cyan" && "bg-cyan-950/80 text-cyan-300 border-cyan-700",
                  currentGroup.badgeColor === "purple" && "bg-purple-950/80 text-purple-300 border-purple-700",
                  currentGroup.badgeColor === "rose" && "bg-rose-950/80 text-rose-300 border-rose-700"
                )}
              >
                {currentGroup.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentGroup.explanation}
            </p>

            {/* SQL Snippet */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                SQL Formulas &amp; Derived Health Ratios:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                {currentGroup.sqlSnippet}
              </pre>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Architectural Takeaways:
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
                {currentGroup.keyTakeaways.map((item, i) => (
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
              Key telemetry case studies in Barrackpore and Kolkata demonstrating disk read surge triage and automated thread starvation throttling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Catching Disk Read Surge in Barrackpore Retail
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Hit Ratio Restored
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, retail store POS checkout latency surged from 2ms to 450ms. Mamata inspected <code>Innodb_buffer_pool_reads</code> and saw physical disk reads jump from 5/sec to 1,200/sec, dropping the Buffer Pool Hit Ratio to 87%. An unindexed promotion query had evicted active cached product pages. Adding an index restored the hit ratio to 99.9% across ₹1.2 Crores in store inventory.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Automated Thread Starvation Alert in Kolkata Bank
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  5s Auto-Throttled
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, managing ₹500 Crores in core banking volume required preventing CPU queue jams. Debangshu configured an automated alert on <code>Threads_running &gt; 32</code>. When an unindexed reconciliation batch caused active threads to spike to 45 on a 16-core CPU, the system automatically paused non-critical background jobs within 5 seconds, maintaining sub-millisecond execution for customer banking transactions.
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
              Avoid dangerous buffer pool hit ratio degradation and thread queue starvation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Tolerating Buffer Pool Hit Ratios Below 99%
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                A Buffer Pool Hit Ratio dropping below 95% indicates the server is constantly reading from physical disk storage, destroying transaction throughput.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Maintain Buffer Pool Hit Ratio &gt; 99.0% by sizing innodb_buffer_pool_size properly.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: High Handler_read_rnd_next Rates
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                A rising <code>Handler_read_rnd_next</code> rate indicates applications are frequently executing unindexed full table scans across millions of rows.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Maintain Handler_read_key &gt;&gt; Handler_read_rnd_next with composite indexes.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Alert on Threads_running &gt; 2x CPU Cores
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Configure Prometheus and PMM alerts to trigger when <code>Threads_running</code> exceeds double the physical CPU core count for more than 30 seconds.
              </p>
              <div className="text-xs text-slate-400">
                Catches active lock jams and thread queue starvation early.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Monitor Connection Saturation
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Alert when <code>Threads_connected</code> crosses 80% of <code>max_connections</code> to allow resizing connection pools before users receive Error 1040.
              </p>
              <div className="text-xs text-slate-400">
                Prevents sudden connection rejections and application downtime.
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
            title="Topic 10: Key Telemetry Metrics: Threads_connected, Threads_running, Questions, Uptime, Innodb_buffer_pool_read_requests, Innodb_buffer_pool_reads"
            content={noteText}
          />

          <Teacher
            note="These six core telemetry metrics are the vital signs of your MySQL server! Watch Threads_running to prevent CPU starvation when active queries spike, keep your Buffer Pool Hit Ratio above 99.0% by comparing read requests to physical disk reads, track Questions for QPS throughput, and verify that Handler_read_key dominates Handler_read_rnd_next to confirm your indexes are doing their job!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of the six cornerstone telemetry metrics, buffer pool hit ratio formulas, QPS interval math, and handler efficiency ratios.
            </p>
          </div>

          <FAQTemplate
            title="Key Telemetry Metrics &amp; Formulas FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic10;
