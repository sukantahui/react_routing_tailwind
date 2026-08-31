import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";

/**
 * Topic9 – Inspecting Real-Time Server Health using SHOW GLOBAL STATUS and SHOW GLOBAL VARIABLES
 * Module: 004_005_logs-monitoring-and-slow-queries
 *
 * @component
 * @returns {JSX.Element} Interactive server health workbench: distinguishing operational status telemetry from system configuration variables, querying performance_schema.global_status with SQL, streaming live second-by-second rate deltas via mysqladmin -r -i 1, and calculating connection pool saturation percentages in MySQL 8.0.
 */
const Topic9 = () => {
  // Interactive Health Inspection State
  const [selectedHealthPhase, setSelectedHealthPhase] = useState("phase1_status_vs_variables");

  const healthPhases = {
    phase1_status_vs_variables: {
      phaseNumber: "Phase 1: STATUS vs VARIABLES",
      title: "1. Operational Telemetry (STATUS) vs Configuration (VARIABLES)",
      badge: "Core Telemetry",
      badgeColor: "emerald",
      sqlSnippet: `-- 📊 1. OPERATIONAL TELEMETRY COUNTERS (WHAT MYSQL IS DOING):
SHOW GLOBAL STATUS WHERE Variable_name IN (
  'Uptime', 'Threads_connected', 'Threads_running', 'Questions', 'Innodb_buffer_pool_reads'
);

-- ⚙️ 2. CONFIGURATION SETTINGS (HOW MYSQL IS CONFIGURED):
SHOW GLOBAL VARIABLES WHERE Variable_name IN (
  'max_connections', 'innodb_buffer_pool_size', 'wait_timeout', 'long_query_time'
);`,
      explanation:
        "SHOW GLOBAL STATUS reports live operational counters (active connections, queries executed, disk reads), while SHOW GLOBAL VARIABLES reports system configuration settings governing server limits and memory sizes.",
      keyTakeaways: [
        "STATUS reports real-time metrics and cumulative event counters.",
        "VARIABLES reports active configuration parameters and limits.",
        "GLOBAL scope aggregates across all client connections since startup."
      ]
    },
    phase2_relational_sql_querying: {
      phaseNumber: "Phase 2: Relational Queries",
      title: "2. Querying Status via performance_schema.global_status",
      badge: "SQL Telemetry",
      badgeColor: "cyan",
      sqlSnippet: `-- 🔍 RELATIONAL STATUS INSPECTION WITH MATHEMATICAL DERIVATIONS:
SELECT 
  c.VARIABLE_VALUE AS threads_connected,
  m.VARIABLE_VALUE AS max_allowed_connections,
  ROUND((c.VARIABLE_VALUE / m.VARIABLE_VALUE) * 100, 2) AS pool_saturation_pct,
  r.VARIABLE_VALUE AS threads_running_on_cpu
FROM performance_schema.global_status c
JOIN performance_schema.global_variables m ON m.VARIABLE_NAME = 'max_connections'
JOIN performance_schema.global_status r ON r.VARIABLE_NAME = 'Threads_running'
WHERE c.VARIABLE_NAME = 'Threads_connected';`,
      explanation:
        "Accessing status variables via performance_schema.global_status allows joining status counters with configuration variables to calculate critical derived metrics like connection pool saturation percentage.",
      keyTakeaways: [
        "performance_schema.global_status enables SQL joins and filtering.",
        "Calculates connection pool saturation percentage dynamically.",
        "Monitors Threads_running directly alongside max_connections."
      ]
    },
    phase3_streaming_delta_rates: {
      phaseNumber: "Phase 3: Live Delta Rates",
      title: "3. Live Per-Second Delta Rate Streaming (mysqladmin -r -i 1)",
      badge: "Live Streaming",
      badgeColor: "purple",
      sqlSnippet: `# ⚡ LIVE SECOND-BY-SECOND RATE STREAMING (-r = rate, -i 1 = 1 sec):
mysqladmin -u root -p -i 1 -r extended-status | grep -E "Queries|Threads_running|Innodb_buffer_pool_reads"

# 📊 SAMPLE STREAMING OUTPUT:
# | Innodb_buffer_pool_reads      | 45       |  <- 45 disk reads/sec
# | Queries                       | 4850     |  <- 4,850 QPS
# | Threads_running               | 4        |  <- 4 active CPU threads
# | Innodb_buffer_pool_reads      | 12       |
# | Queries                       | 5200     |  <- 5,200 QPS`,
      explanation:
        "The -r flag in mysqladmin calculates the rate of change between consecutive 1-second intervals (-i 1), displaying live per-second rates of queries, disk reads, and active threads in real-time.",
      keyTakeaways: [
        "mysqladmin -r calculates mathematical deltas between intervals.",
        "-i 1 streams fresh per-second metrics continuously.",
        "Essential for catching instantaneous traffic spikes and query storms."
      ]
    },
    phase4_health_saturation_metrics: {
      phaseNumber: "Phase 4: Health Metrics",
      title: "4. Key Health Indicators: Threads_running & QPS Calculation",
      badge: "Health Triage",
      badgeColor: "rose",
      sqlSnippet: `-- 🔬 1. HISTORICAL AVERAGE QPS CALCULATION:
SELECT 
  q.VARIABLE_VALUE AS total_questions,
  u.VARIABLE_VALUE AS uptime_secs,
  ROUND(q.VARIABLE_VALUE / u.VARIABLE_VALUE, 2) AS lifetime_avg_qps
FROM performance_schema.global_status q 
JOIN performance_schema.global_status u ON u.VARIABLE_NAME = 'Uptime'
WHERE q.VARIABLE_NAME = 'Questions';

-- ⚠️ 2. CPU THREAD STARVATION ALERT:
-- If Threads_running > (Physical CPU Cores * 2), queries are queuing on CPU!`,
      explanation:
        "Dividing Questions by Uptime calculates historical average QPS. Comparing Threads_running against physical CPU cores identifies query queuing and CPU thread starvation during heavy transaction bursts.",
      keyTakeaways: [
        "Questions divided by Uptime yields historical lifetime average QPS.",
        "Threads_running exceeding CPU core counts signals query queuing.",
        "Questions counts client queries; Queries includes internal routines."
      ]
    }
  };

  const currentPhase = healthPhases[selectedHealthPhase];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.5: Server Logs, Slow Queries &amp; Performance Schema
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 9 of 13
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
          Real-Time Health: <span className="text-emerald-400">SHOW GLOBAL STATUS</span> &amp; <span className="text-cyan-400">VARIABLES</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Mastering operational telemetry inspection in MySQL 8.0: distinguishing status counters from system variables, querying <code>performance_schema.global_status</code>, streaming live per-second delta rates with <code>mysqladmin -r -i 1</code>, and evaluating connection pool saturation.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: Telemetry Pillars ───────────────────────────── */}
        <section id="health-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Pillars of Runtime Health Inspection
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How MySQL exposes operational counters, configuration settings, and live delta streaming.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">STATUS Telemetry</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Live counters measuring active connections, executed queries, and buffer pool disk reads.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">VARIABLES Limits</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                System parameters defining memory buffer sizes, connection limits, and query timeouts.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-purple-300 text-base">Live Delta Rates</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                <code>mysqladmin -r -i 1</code> streams per-second mathematical rates of queries and threads.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-rose-300 text-base">Threads_running</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Active CPU thread count comparing executing queries against physical CPU core limits.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Health Inspection Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe status counters vs variables, relational SQL joins, per-second rate streaming, and saturation metrics.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(healthPhases).map((phaseKey) => {
              const phase = healthPhases[phaseKey];
              const isSelected = selectedHealthPhase === phaseKey;
              return (
                <button
                  key={phaseKey}
                  onClick={() => setSelectedHealthPhase(phaseKey)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 border",
                    isSelected
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-950/40"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  )}
                >
                  {phase.phaseNumber}
                </button>
              );
            })}
          </div>

          {/* Dynamic Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                  {currentPhase.phaseNumber}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {currentPhase.title}
                </h3>
              </div>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-semibold border w-fit",
                  currentPhase.badgeColor === "emerald" && "bg-emerald-950/80 text-emerald-300 border-emerald-700",
                  currentPhase.badgeColor === "cyan" && "bg-cyan-950/80 text-cyan-300 border-cyan-700",
                  currentPhase.badgeColor === "purple" && "bg-purple-950/80 text-purple-300 border-purple-700",
                  currentPhase.badgeColor === "rose" && "bg-rose-950/80 text-rose-300 border-rose-700"
                )}
              >
                {currentPhase.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentPhase.explanation}
            </p>

            {/* SQL Snippet */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                SQL Commands &amp; CLI Telemetry Streaming:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                {currentPhase.sqlSnippet}
              </pre>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Architectural Takeaways:
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
                {currentPhase.keyTakeaways.map((item, i) => (
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
              Real-time health inspection case studies in Barrackpore and Kolkata demonstrating connection pool saturation triage and 18,000 QPS burst detection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Fixing 100% Connection Saturation in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Pool Resized
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, retail store POS terminals threw <code>ERROR 1040: Too many connections</code>. Mamata compared <code>Threads_connected</code> (500) against <code>max_connections</code> (500), proving the connection pool was 100% saturated due to an unclosed microservice connection leak. Temporarily setting <code>max_connections = 1000</code> restored billing across ₹1.2 Crores in daily inventory while developers patched the connection pool.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Catching 18,000 QPS Spike in Kolkata Bank
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Live Delta Triage
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, managing ₹500 Crores in banking assets required investigating a sudden latency spike. Debangshu streamed live delta rates using <code>mysqladmin -i 1 -r extended-status</code>, observing query throughput jump from 2,000 QPS to 18,000 QPS with <code>Threads_running</code> hitting 48 on a 16-core CPU. Terminating a runaway unindexed reconciliation batch job restored normal sub-millisecond banking response times.
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
              Avoid confusing Questions with Queries and relying on cumulative numbers instead of per-second rates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Relying on Raw Cumulative Counters
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Viewing cumulative counters without dividing by elapsed time hides active spikes. <code>Questions: 10,000,000</code> over 30 days is normal, but 10,000,000 in 5 minutes is a massive outage.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always calculate delta rates (delta / elapsed seconds) for active triage.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: High Threads_running Starvation
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                When <code>Threads_running</code> exceeds physical CPU core count significantly, threads spend more time in OS context switches than executing SQL queries.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Keep Threads_running close to or below physical CPU core counts.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Stream Delta Rates with mysqladmin
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Use <code>mysqladmin -i 1 -r extended-status</code> during incidents to observe real-time rate of change without writing custom scripts.
              </p>
              <div className="text-xs text-slate-400">
                Streams second-by-second QPS, thread, and disk read deltas.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Track Connection Pool Saturation
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Monitor <code>(Threads_connected / max_connections) * 100</code> with automated alerts when saturation crosses 80%.
              </p>
              <div className="text-xs text-slate-400">
                Prevents sudden connection rejection errors for end users.
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
            title="Topic 9: Inspecting Real-Time Server Health using SHOW GLOBAL STATUS and SHOW GLOBAL VARIABLES"
            content={noteText}
          />

          <Teacher
            note="SHOW GLOBAL STATUS and SHOW GLOBAL VARIABLES are the foundational diagnostic commands in MySQL! Remember the key distinction: STATUS tells you what MySQL is doing right now (counters, active threads, disk reads), while VARIABLES tells you how MySQL is configured (buffer sizes, limits). When troubleshooting latency, check Threads_running against CPU cores, monitor connection saturation percentage, and stream live per-second rates using mysqladmin -r -i 1!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of SHOW GLOBAL STATUS counters, global variables, mysqladmin delta streaming, and thread saturation metrics.
            </p>
          </div>

          <FAQTemplate
            title="SHOW GLOBAL STATUS &amp; VARIABLES Health FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic9;
