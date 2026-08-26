import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic12_files/topic12_questions";
import noteText from "./topic12_files/topic12_note.txt?raw";

/**
 * Topic12 – Monitoring Tooling Ecosystem Overview: Prometheus MySQL Exporter, Grafana Dashboards, Percona Monitoring and Management (PMM)
 * Module: 004_005_logs-monitoring-and-slow-queries
 *
 * @component
 * @returns {JSX.Element} Interactive monitoring tooling ecosystem workbench: deploying Prometheus mysqld_exporter with least-privilege security, building production Grafana dashboards, profiling queries with Percona PMM Query Analytics (QAN), and setting up Alertmanager rules in MySQL 8.0.
 */
const Topic12 = () => {
  // Interactive Tooling State
  const [selectedToolKey, setSelectedToolKey] = useState("tool1_mysqld_exporter");

  const monitoringTools = {
    tool1_mysqld_exporter: {
      toolName: "1. Prometheus Exporter",
      title: "1. Prometheus mysqld_exporter (Port 9104)",
      badge: "Metrics Collector",
      badgeColor: "emerald",
      sqlSnippet: `-- 🔒 1. CREATE LEAST-PRIVILEGE MONITORING USER IN MYSQL:
CREATE USER 'exporter'@'127.0.0.1' IDENTIFIED BY 'ExporterSecurePass#2026' 
  WITH MAX_USER_CONNECTIONS 5;

GRANT PROCESS, REPLICATION CLIENT, SELECT ON *.* TO 'exporter'@'127.0.0.1';
GRANT SELECT ON performance_schema.* TO 'exporter'@'127.0.0.1';
GRANT SELECT ON sys.* TO 'exporter'@'127.0.0.1';

# 🚀 2. RUN MYSQLD_EXPORTER SERVICE:
# /usr/local/bin/mysqld_exporter \\
#   --config.my-cnf=/etc/.mysqld_exporter.cnf \\
#   --collect.info_schema.innodb_metrics \\
#   --collect.perf_schema.eventsstatements`,
      explanation:
        "mysqld_exporter is a lightweight Go daemon that scrapes MySQL status counters and Performance Schema tables, exposing Prometheus metrics on HTTP port 9104 with <0.2% CPU overhead.",
      keyTakeaways: [
        "Exposes standardized Prometheus metrics on TCP port 9104.",
        "Restrict monitoring account using WITH MAX_USER_CONNECTIONS 5.",
        "Collects over 200 InnoDB metrics with negligible CPU footprint."
      ]
    },
    tool2_grafana_dashboards: {
      toolName: "2. Grafana Dashboards",
      title: "2. Grafana Visual Dashboards & PromQL Formulas",
      badge: "Visualization UI",
      badgeColor: "cyan",
      sqlSnippet: `# 📊 PRODUCTION PROMQL FORMULAS FOR GRAFANA PANELS:

# 1. Real-Time Queries Per Second (QPS):
rate(mysql_global_status_questions[1m])

# 2. InnoDB Buffer Pool Hit Ratio (%):
(1 - (rate(mysql_global_status_innodb_buffer_pool_reads[5m]) / 
      rate(mysql_global_status_innodb_buffer_pool_read_requests[5m]))) * 100

# 3. Active Threads vs CPU Cores:
mysql_global_status_threads_running

# 💡 Community Dashboard Templates:
# - Dashboard ID 7362: Percona MySQL Overview
# - Dashboard ID 14057: MySQL Exporter Quickstart`,
      explanation:
        "Grafana visualizes time-series telemetry from Prometheus, plotting real-time QPS throughput, replication lag gauges, buffer pool hit ratios, and CPU concurrency curves on unified dashboards.",
      keyTakeaways: [
        "Visualizes real-time QPS, replication lag, and memory caching.",
        "Use Dashboard ID 7362 (Percona Overview) for ready-made production panels.",
        "Alerts directly from visual panels to Slack, PagerDuty, or Email."
      ]
    },
    tool3_percona_pmm_qan: {
      toolName: "3. Percona PMM (QAN)",
      title: "3. Percona PMM: Deep Query Analytics (QAN)",
      badge: "Deep Query Profiling",
      badgeColor: "purple",
      sqlSnippet: `# 🛠️ 1. CONNECT PMM CLIENT TO CENTRAL PMM SERVER:
pmm-admin config --server-insecure-tls --server-url=https://admin:pass@pmm.bank.com

# 🚀 2. ADD MYSQL SERVICE WITH PERFORMANCE SCHEMA PROFILING:
pmm-admin add mysql --username=pmm_user --password=PmmPass#2026 \\
  --query-source=perfschema --service-name=kolkata-core-master

# 🔍 KEY CAPABILITIES:
# - Interactive query latency histograms & 95th-percentile charts.
# - Built-in EXPLAIN plan visualizer.
# - Zero disk I/O when using --query-source=perfschema.`,
      explanation:
        "Percona Monitoring and Management (PMM) provides deep Query Analytics (QAN) that captures normalized query templates, latency distributions, and execution plans with zero disk I/O via Performance Schema.",
      keyTakeaways: [
        "QAN profiles top time-consuming queries and 95th-percentile latencies.",
        "--query-source=perfschema eliminates disk slow log I/O overhead.",
        "Automated advisors check for security flaws and missing indexes."
      ]
    },
    tool4_alertmanager_rules: {
      toolName: "4. Alertmanager Rules",
      title: "4. Prometheus Alertmanager: Multi-Channel Rules",
      badge: "Automated Alerting",
      badgeColor: "rose",
      sqlSnippet: `# 🚨 PRODUCTION PROMETHEUS ALERT RULES:

# 1. Replication Lag Alert (> 30s):
alert: MySQLReplicationLagHigh
expr: mysql_slave_status_seconds_behind_master > 30
for: 1m
labels:
  severity: critical

# 2. Connection Pool Saturation (> 80%):
alert: MySQLConnectionSaturationHigh
expr: (mysql_global_status_threads_connected / mysql_global_variables_max_connections) * 100 > 80
for: 2m
labels:
  severity: warning`,
      explanation:
        "Alertmanager processes alerts from Prometheus, deduplicates alarms, silences alerts during planned maintenance, and routes notifications to PagerDuty, Slack, and email channels.",
      keyTakeaways: [
        "Triggers critical alerts for replication lag > 30 seconds.",
        "Warns on connection pool saturation crossing 80%.",
        "Supports maintenance window silencing and deduplication."
      ]
    }
  };

  const currentTool = monitoringTools[selectedToolKey];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.5: Server Logs, Slow Queries &amp; Performance Schema
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 12 of 13
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Monitoring Ecosystem: <span className="text-emerald-400">Prometheus</span>, <span className="text-cyan-400">Grafana &amp; PMM</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Mastering modern enterprise observability in MySQL 8.0: deploying Prometheus <code>mysqld_exporter</code> on port 9104, building visual Grafana dashboards, deep query profiling with Percona PMM Query Analytics (QAN), and configuring automated Alertmanager rules.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: Tooling Pillars ─────────────────────────────── */}
        <section id="tooling-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Pillars of MySQL Observability Architecture
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How Prometheus, Grafana, Percona PMM, and Alertmanager integrate into a unified monitoring ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Component 1</span>
              <h3 className="font-bold text-white text-base">mysqld_exporter</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Lightweight Go agent scraping MySQL telemetry on port 9104 with &lt;0.2% CPU overhead.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Component 2</span>
              <h3 className="font-bold text-white text-base">Grafana Dashboards</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Visualizes real-time QPS, replication lag, and buffer pool hit ratio curves in real time.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Component 3</span>
              <h3 className="font-bold text-purple-300 text-base">Percona PMM (QAN)</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Interactive query profiling, 95th-percentile latency charts, and automated security advisors.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Component 4</span>
              <h3 className="font-bold text-rose-300 text-base">Alertmanager Rules</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Automated multi-channel alerting for replication lag, thread starvation, and connection saturation.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Monitoring Tooling Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe exporter user setup, PromQL queries, PMM client configuration, and Alertmanager rules.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(monitoringTools).map((toolKey) => {
              const tool = monitoringTools[toolKey];
              const isSelected = selectedToolKey === toolKey;
              return (
                <button
                  key={toolKey}
                  onClick={() => setSelectedToolKey(toolKey)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 border",
                    isSelected
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-950/40"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  )}
                >
                  {tool.toolName}
                </button>
              );
            })}
          </div>

          {/* Dynamic Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                  Monitoring Ecosystem
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {currentTool.title}
                </h3>
              </div>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-semibold border w-fit",
                  currentTool.badgeColor === "emerald" && "bg-emerald-950/80 text-emerald-300 border-emerald-700",
                  currentTool.badgeColor === "cyan" && "bg-cyan-950/80 text-cyan-300 border-cyan-700",
                  currentTool.badgeColor === "purple" && "bg-purple-950/80 text-purple-300 border-purple-700",
                  currentTool.badgeColor === "rose" && "bg-rose-950/80 text-rose-300 border-rose-700"
                )}
              >
                {currentTool.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentTool.explanation}
            </p>

            {/* Code Snippet */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Configuration &amp; PromQL Rules:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                {currentTool.sqlSnippet}
              </pre>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Architectural Takeaways:
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
                {currentTool.keyTakeaways.map((item, i) => (
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
              Observability case studies in Barrackpore and Kolkata demonstrating instant Grafana metric correlation and PMM Query Analytics triage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – 2-Minute Mystery Resolution in Barrackpore Retail
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Grafana Correlation
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, retail store POS checkout slowed intermittently during sales. Mamata opened the Grafana dashboard and visually correlated a spike in physical disk reads with a drop in Buffer Pool Hit Ratio down to 86% whenever an unindexed cashier catalog query ran. Adding a composite index restored the hit ratio to 99.9% across ₹1.2 Crores in store inventory in under 2 minutes.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – PMM QAN Saves Kolkata Bank from Replica Lag
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  PMM QAN Profiling
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, managing core banking across ₹500 Crores in daily volume required resolving replication delay on read replicas. Debangshu opened Percona PMM Query Analytics (QAN), which immediately highlighted an unindexed ledger batch query taking 45 seconds on master and serializing replica SQL appliers. Adding the recommended index eliminated replication lag within 5 minutes.
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
              Avoid unrestricted exporter connection pools and scraping table schemas on large databases.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Unrestricted Exporter Connections
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Creating the exporter user without <code>WITH MAX_USER_CONNECTIONS 5</code> allows a misconfigured scraper to consume dozens of database connections.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always cap monitoring accounts using WITH MAX_USER_CONNECTIONS 5.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Table Metrics on 10,000+ Tables
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Enabling <code>--collect.info_schema.tables</code> on instances with tens of thousands of tables creates severe data dictionary query locking overhead.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Disable table-level metric collection on large multi-tenant database clusters.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Use PMM with Performance Schema
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Configure Percona PMM with <code>--query-source=perfschema</code> to achieve sub-millisecond query latency profiling with zero disk I/O overhead.
              </p>
              <div className="text-xs text-slate-400">
                Collects 100% of query metrics directly from RAM without disk log writes.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Configure Multi-Channel Alertmanager
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Route critical database down and replication lag alerts to PagerDuty on-call engineers, while sending saturation warnings to team Slack channels.
              </p>
              <div className="text-xs text-slate-400">
                Ensures fast incident response while avoiding alert fatigue.
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
            title="Topic 12: Monitoring Tooling Ecosystem Overview: Prometheus MySQL Exporter, Grafana Dashboards, Percona Monitoring and Management (PMM)"
            content={noteText}
          />

          <Teacher
            note="Congratulations on completing Module 004.5! In modern enterprise operations, you cannot manage what you do not measure. Deploy Prometheus mysqld_exporter on port 9104 with a restricted least-privilege user, visualize your vital signs in Grafana with Dashboard ID 7362, use Percona PMM Query Analytics (QAN) for zero-disk-overhead query profiling, and set up automated Alertmanager rules for replication lag and thread starvation to guarantee 99.999% production database uptime!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of Prometheus mysqld_exporter, Grafana dashboards, Percona PMM QAN, PromQL formulas, and Alertmanager rules.
            </p>
          </div>

          <FAQTemplate
            title="Monitoring Ecosystem &amp; Tooling FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic12;
