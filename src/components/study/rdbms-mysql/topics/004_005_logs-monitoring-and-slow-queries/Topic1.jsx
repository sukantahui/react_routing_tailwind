import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

/**
 * Topic1 – The Error Log: Configuration, Rotation, Diagnostic Messages, and Critical Alerts
 * Module: 004_005_logs-monitoring-and-slow-queries
 *
 * @component
 * @returns {JSX.Element} Interactive Error Log workbench: configuring log verbosity in MySQL 8.0, deploying modular JSON error sinks (log_sink_json), suppressing harmless warnings, managing logrotate pipelines, and interpreting critical engine corruption signatures.
 */
const Topic1 = () => {
  // Interactive Error Log State
  const [selectedErrorPhase, setSelectedErrorPhase] = useState("phase1_verbosity_levels");

  const errorPhases = {
    phase1_verbosity_levels: {
      phaseNumber: "Phase 1: Verbosity Levels",
      title: "1. Error Log Configuration & log_error_verbosity",
      badge: "Diagnostic Tuning",
      badgeColor: "emerald",
      sqlSnippet: `-- ⚙️ CONFIGURING ERROR LOG & VERBOSITY IN MYSQL 8.0:

-- 1. Check current error log path:
SHOW VARIABLES LIKE 'log_error';
-- Output: /var/log/mysql/error.log

-- 2. Configure verbosity level:
-- 1 = Errors only (Suppresses warnings and notes)
-- 2 = Errors + Warnings (Recommended for Production! ✅)
-- 3 = Errors + Warnings + Notes (Verbose connection notices)
SET PERSIST log_error_verbosity = 2;

-- 3. Set timestamp format to system local time:
SET PERSIST log_timestamps = 'SYSTEM';`,
      explanation:
        "log_error_verbosity controls message granularity. Setting verbosity to 2 captures critical engine errors, replication failures, and aborted connection warnings without filling storage with high-volume connection handshakes.",
      keyTakeaways: [
        "log_error specifies the physical error log destination path.",
        "log_error_verbosity = 2 is the enterprise production gold standard.",
        "log_timestamps = 'SYSTEM' provides local timezone correlation."
      ]
    },
    phase2_json_logging_sinks: {
      phaseNumber: "Phase 2: JSON Sinks",
      title: "2. Component-Based JSON Logging (log_sink_json)",
      badge: "Cloud-Native Logging",
      badgeColor: "cyan",
      sqlSnippet: `-- 🌐 ENABLING MODULAR JSON LOGGING IN MYSQL 8.0:

-- 1. Install the JSON log sink component:
INSTALL COMPONENT 'file://component_log_sink_json';

-- 2. Direct error log pipeline to both standard text AND JSON sink:
SET PERSIST log_error_services = 'log_filter_internal; log_sink_internal; log_sink_json';

-- 3. Sample output inside /var/log/mysql/error.log.json:
-- {
--   "prio": "ERROR",
--   "err_code": 11906,
--   "subsystem": "InnoDB",
--   "msg": "Database page corruption on disk in tablespace 45",
--   "time": "2026-08-25T15:00:00.123456Z"
-- }`,
      explanation:
        "MySQL 8.0's component-based error logging allows emitting structured JSON log files (log_sink_json) alongside traditional text files, enabling instant automated ingestion by ELK, Datadog, or Grafana Loki without regex parsing.",
      keyTakeaways: [
        "INSTALL COMPONENT loads the JSON sink dynamically into memory.",
        "log_error_services configures multi-sink routing pipelines.",
        "Standardized JSON keys enable automated cloud SIEM alerting."
      ]
    },
    phase3_suppression_and_rotation: {
      phaseNumber: "Phase 3: Suppression & Rotation",
      title: "3. Error Suppression & Linux logrotate Automation",
      badge: "Log Maintenance",
      badgeColor: "purple",
      sqlSnippet: `-- 🧹 1. SUPPRESS HARMLESS NOISY WARNINGS:
-- Suppress reverse DNS warning (MY-010055) & packet aborts (MY-010008):
SET PERSIST log_error_suppression_list = 'MY-010055,MY-010008';

-- 🔄 2. LINUX LOGROTATE INTEGRATION (/etc/logrotate.d/mysql):
-- /var/log/mysql/error.log {
--   daily
--   rotate 14
--   compress
--   missingok
--   postrotate
--     mysqladmin -u root -pSecurePass flush-logs error
--   endscript
-- }

-- 3. In-Session Flush Command:
FLUSH ERROR LOGS;`,
      explanation:
        "The log_error_suppression_list filters out repetitive benign warnings, preventing disk bloat. Linux logrotate with mysqladmin flush-logs error rotates and compresses historical error logs seamlessly without database downtime.",
      keyTakeaways: [
        "log_error_suppression_list suppresses harmless high-volume warnings.",
        "FLUSH ERROR LOGS closes and reopens log file handles cleanly.",
        "logrotate compresses historical logs to prevent multi-gigabyte files."
      ]
    },
    phase4_critical_signatures: {
      phaseNumber: "Phase 4: Critical Signatures",
      title: "4. Interpreting Fatal Error Log Signatures",
      badge: "Forensics & Diagnostics",
      badgeColor: "rose",
      sqlSnippet: `-- 🔬 CRITICAL ERROR LOG SIGNATURE PATTERNS:

-- 1. 💥 INNODB PHYSICAL PAGE CORRUPTION:
-- [ERROR] [MY-011906] [InnoDB] Database page corruption on disk in tablespace 45
-- Action: Immediate page restoration or physical backup restore required!

-- 2. 🔒 INNODB TRANSACTION DEADLOCK TRACE:
-- [Note] [MY-012543] [InnoDB] *** (1) TRANSACTION: ACTIVE 2 sec starting index read
-- [Note] [MY-012544] [InnoDB] *** (2) TRANSACTION: ACTIVE 1 sec waiting for lock

-- 3. 💾 DISK FULL RUNTIME FREEZE:
-- [ERROR] [MY-010119] [Server] Disk is full writing './ibdata1' (Errcode: 28)
-- Action: Free partition storage immediately to unfreeze transaction commits!`,
      explanation:
        "Understanding error log signatures allows DBAs to rapidly diagnose hardware corruption, transaction deadlocks, and storage exhaustion, responding effectively before outages escalate into business disruptions.",
      keyTakeaways: [
        "MY-011906 flags hardware disk corruption or failed 16KB checksums.",
        "innodb_print_all_deadlocks records full deadlock transaction traces.",
        "MY-010119 warns of disk exhaustion freezing write transactions."
      ]
    }
  };

  const currentPhase = errorPhases[selectedErrorPhase];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.5: Server Logs, Slow Queries &amp; Performance Schema
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 1 of 13
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          The Error Log: <span className="text-emerald-400">Configuration</span>, <span className="text-cyan-400">Rotation</span> &amp; Alerts
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Mastering the primary diagnostic nerve center of MySQL 8.0: configuring <code>log_error_verbosity</code>, deploying cloud-native JSON sinks with <code>log_sink_json</code>, suppressing harmless warnings, setting up <code>logrotate</code> automation, and interpreting critical engine corruption signatures.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: Error Log Pillars ───────────────────────────── */}
        <section id="error-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Pillars of Error Log Engineering
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How MySQL captures, filters, and routes critical diagnostic telemetry across modern infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">Verbosity Level 2</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Captures critical engine errors and warnings while suppressing high-volume connection notes.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-400 font-bold uppercase">Pillar 2</div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">JSON Sink SRE</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                <code>log_sink_json</code> outputs structured JSON for automated ingestion by Datadog and ELK.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-purple-300 text-base">Error Suppression</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                <code>log_error_suppression_list</code> filters out benign repetitive warnings to keep logs clean.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-rose-300 text-base">FLUSH ERROR LOGS</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Coordinates with Linux <code>logrotate</code> to compress and archive logs with zero downtime.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Error Log Diagnostic Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe verbosity tuning, JSON sink pipelines, error suppression lists, and fatal log signature forensic patterns.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(errorPhases).map((phaseKey) => {
              const phase = errorPhases[phaseKey];
              const isSelected = selectedErrorPhase === phaseKey;
              return (
                <button
                  key={phaseKey}
                  onClick={() => setSelectedErrorPhase(phaseKey)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 border",
                    isSelected
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-950/40"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  )}
                &gt;
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
                SQL Configuration &amp; Diagnostic Telemetry:
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
              Error log diagnostic case studies in Barrackpore and Kolkata demonstrating zombie port diagnosis and sub-3-second SIEM alerts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Diagnosing Zombie Port 3306 Lock in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Crash Diagnosed
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, the retail inventory server failed to boot after an unexpected host restart. Mamata inspected <code>/var/log/mysql/error.log</code> and located <code>[ERROR] [MY-010262] Can't start server: Bind on TCP/IP port: Address already in use</code>. An orphaned zombie process was holding port 3306. Terminating the process allowed MySQL to start in under 10 seconds.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – 3-Second Replica Alert via JSON Sinks in Kolkata
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  SIEM Automated
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, managing ₹500 Crores in banking volume required real-time notification of replication anomalies. Debangshu deployed <code>log_sink_json</code> with Datadog log scraper. When an intermittent network drop interrupted the replication I/O thread, Datadog parsed the JSON error record and triggered an automated SRE alert in 3 seconds, resolving the blip before lag occurred.
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
              Avoid dangerous log verbosity exhaustion and unrotated multi-gigabyte log traps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Leaving Verbosity Level 3 in Production
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Setting <code>log_error_verbosity = 3</code> on high-traffic servers writes connection and disconnect notes for every query, consuming gigabytes of storage per day.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Keep log_error_verbosity = 2 in production environments.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Neglecting Error Log Rotation
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Without automated <code>logrotate</code>, error log files can grow to tens of gigabytes over years, making forensic text searching extremely slow.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Configure logrotate with postrotate mysqladmin flush-logs error.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Deploy JSON Error Sinks
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Install <code>component_log_sink_json</code> to stream structured JSON logs to central observability platforms without brittle regex parsing.
              </p>
              <div className="text-xs text-slate-400">
                Enables automated PagerDuty and SIEM alerting on [ERROR] events.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Enable Deadlock Logging
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Configure <code>innodb_print_all_deadlocks = ON</code> so that full transaction lock traces are captured in the error log for forensic tuning.
              </p>
              <div className="text-xs text-slate-400">
                Provides actionable queries and row IDs for resolving application locking bugs.
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
            title="Topic 1: The Error Log: Configuration, Rotation, Diagnostic Messages, and Critical Alerts"
            content={noteText}
          />

          <Teacher
            note="The Error Log is your primary diagnostic weapon when managing MySQL. Always configure log_error_verbosity = 2 to capture warnings without disk bloat, deploy log_sink_json for automated cloud SIEM monitoring, use log_error_suppression_list to filter out noisy connection warnings, and set up daily logrotate with flush-logs error so your log files remain lean and lightning-fast to search!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of MySQL Error Log configuration, verbosity levels, JSON sinks, and engine corruption diagnostics.
            </p>
          </div>

          <FAQTemplate
            title="MySQL Error Log Configuration &amp; Alerts FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic1;
