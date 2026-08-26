import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic13_files/topic13_questions";
import noteText from "./topic13_files/topic13_note.txt?raw";

/**
 * Topic13 – Database Auditing: Connection Logging, Audit Plugins, and Activity Monitoring
 * Module: 004_003_user-security-and-privilege-management
 *
 * @component
 * @returns {JSX.Element} Interactive database auditing workbench: exploring native logging systems (General, Slow, JSON Error logs), installing enterprise & open-source audit plugins, defining rule-based JSON audit filters, and streaming non-repudiable audit logs to external SIEM pipelines in MySQL 8.0.
 */
const Topic13 = () => {
  // Interactive Audit State
  const [selectedAuditLogPhase, setSelectedAuditLogPhase] = useState("phase1_native_logs");

  const auditLogPhases = {
    phase1_native_logs: {
      phaseNumber: "Phase 1: Native Logging Mechanisms",
      title: "1. Native MySQL Logs & JSON Error Logging",
      badge: "Core Engine Logs",
      badgeColor: "emerald",
      sqlSnippet: `-- 📝 NATIVE MYSQL ENGINE LOGGING CONFIGURATION:

-- 1. Enhanced JSON Error Logging (MySQL 8.0 Component Architecture):
SET PERSIST log_error_services = 'log_filter_internal; log_sink_internal; log_sink_json';
SET PERSIST log_error_verbosity = 3; -- Captures connection handshakes & warnings

-- 2. Slow Query Log (Performance & DoS query spam detection):
SET PERSIST slow_query_log = ON;
SET PERSIST long_query_time = 1.0; -- in seconds
SET PERSIST log_queries_not_using_indexes = ON;

-- 3. General Query Log (Temporary debugging only; avoid in production):
SET GLOBAL general_log = OFF; -- Keep OFF in production to prevent disk exhaustion!`,
      explanation:
        "MySQL provides built-in logging systems. MySQL 8.0 modernizes error logging with the log_sink_json component, enabling structured JSON event output for containerized SIEM pipelines like Elastic Filebeat, Fluentd, and Datadog.",
      keyTakeaways: [
        "log_sink_json outputs machine-readable JSON logs for automated SIEM parsing.",
        "slow_query_log detects resource exhaustion and unindexed query spam.",
        "general_log should remain disabled in production to prevent disk I/O bottlenecks."
      ]
    },
    phase2_audit_plugins: {
      phaseNumber: "Phase 2: Enterprise Audit Plugins",
      title: "2. Audit Plugin Installation & JSON Stream Formatting",
      badge: "Structured Auditing",
      badgeColor: "cyan",
      sqlSnippet: `-- 🛡️ AUDIT PLUGIN DEPLOYMENT & ASYNCHRONOUS I/O:

-- 1. Install Audit Component (or Plugin):
INSTALL COMPONENT 'file://component_audit_log';
-- Or Open-Source Alternative: INSTALL PLUGIN server_audit SONAME 'server_audit.so';

-- 2. Configure structured JSON output:
SET PERSIST audit_log_format = JSON;

-- 3. Configure Asynchronous I/O to eliminate client query latency:
SET PERSIST audit_log_strategy = ASYNCHRONOUS;
SET PERSIST audit_log_buffer_size = 16777216; -- 16MB RAM buffer

-- 4. Enable automatic log rotation threshold:
SET PERSIST audit_log_rotate_on_size = 52428800; -- 50MB rotation`,
      explanation:
        "Audit plugins intercept database operations at the engine layer, producing structured JSON/XML records containing timestamps, user identities, client IPs, executed query text, and execution outcome codes with sub-microsecond precision.",
      keyTakeaways: [
        "audit_log_format = JSON enables direct SIEM ingestion.",
        "audit_log_strategy = ASYNCHRONOUS buffers records in RAM to eliminate latency.",
        "audit_log_rotate_on_size automatically rotates logs to protect storage."
      ]
    },
    phase3_rule_based_filtering: {
      phaseNumber: "Phase 3: Rule-Based JSON Filtering",
      title: "3. Granular Event Filtering & Noise Reduction",
      badge: "95% Noise Reduction",
      badgeColor: "purple",
      sqlSnippet: `-- 🎯 RULE-BASED JSON AUDIT FILTERING (MYSQL 8.0):

-- 1. Create a filter rule: Audit ONLY connections and DDL/DCL queries:
SELECT audit_log_filter_set_filter('ddl_and_logins', '{
  "filter": {
    "class": [
      { "name": "connection" },
      { "name": "general", "event": { "name": "status", "data": { "query": { "prefix": ["CREATE", "ALTER", "DROP", "GRANT", "REVOKE"] } } } }
    ]
  }
}');

-- 2. Assign filter rule to application user accounts:
SELECT audit_log_filter_set_user('app_microservice@%', 'ddl_and_logins');

-- 3. High-frequency routine SELECTs are safely ignored, eliminating 95% log noise!`,
      explanation:
        "High-volume web applications execute millions of routine SELECT queries per hour. Rule-based audit filters eliminate log bloat by ignoring trusted read queries while strictly capturing all user logins, failed attempts, and administrative DDL/DCL commands.",
      keyTakeaways: [
        "audit_log_filter_set_filter defines custom JSON interception rules.",
        "Filters out high-frequency read queries to save disk space and SIEM license costs.",
        "Guarantees that 100% of administrative mutations and failed attempts are recorded."
      ]
    },
    phase4_forensics_and_siem: {
      phaseNumber: "Phase 4: Forensics & SIEM Pipelines",
      title: "4. Forensic Timeline Reconstruction & SIEM Alerting",
      badge: "Incident Response",
      badgeColor: "rose",
      sqlSnippet: `-- 🚨 FORENSIC JSON AUDIT EVENT RECORD:

{
  "timestamp": "2026-08-25T11:42:01.102Z",
  "id": 41829,
  "class": "general",
  "event": "status",
  "connection_id": 842,
  "account": { "user": "contractor_temp", "host": "192.168.1.88" },
  "ip": "192.168.1.88",
  "status": 1142,
  "status_code": "ER_TABLEACCESS_DENIED_ERROR",
  "query": "DROP TABLE kolkata_finance.orders"
}

-- SIEM Alert Rule: (status == 1142 AND query =~ "^DROP") &rarr; PagerDuty Critical Alert!`,
      explanation:
        "Forensic incident response relies on immutable audit streams to reconstruct security incidents. By shipping JSON logs to external SIEM platforms (Splunk, Elastic, Datadog), security teams detect intrusion attempts in real time and maintain non-repudiation.",
      keyTakeaways: [
        "Audit records capture connection ID, user, host, IP, status code, and SQL text.",
        "Non-zero status codes highlight blocked attacks (e.g. Error 1142, Error 1064).",
        "Off-host SIEM streaming guarantees that compromised servers cannot alter logs."
      ]
    }
  };

  const currentPhase = auditLogPhases[selectedAuditLogPhase];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.3: User Security &amp; Privilege Management
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 13 of 13
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Database Auditing: <span className="text-emerald-400">Connection Logging</span>, <span className="text-cyan-400">Audit Plugins</span> &amp; Activity Monitoring
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Mastering enterprise database observability in MySQL 8.0: deploying structured JSON audit plugins, configuring asynchronous logging to eliminate transaction latency, writing rule-based JSON event filters, and integrating immutable audit streams into SIEM pipelines (Splunk, Elastic, Datadog).
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: Auditing Architecture Matrix ────────────────── */}
        <section id="auditing-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Pillars of Database Auditing
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How modern database auditing establishes comprehensive visibility and forensic accountability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">Non-Repudiation</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Provides unalterable proof of which user account executed a specific query at an exact microsecond timestamp.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">Noise Filtering</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Rule-based JSON filtering eliminates 95% of log volume by ignoring routine SELECTs to focus on DDL and logins.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-purple-300 text-base">Asynchronous I/O</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Buffers audit records in memory to ensure zero latency overhead on high-throughput OLTP transactions.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-rose-300 text-base">SIEM Integration</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Streams structured JSON logs into Splunk, Elastic, or Datadog for automated threat detection and compliance.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Database Auditing Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe native logging configs, enterprise audit plugin setup, rule-based filtering, and forensic telemetry.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(auditLogPhases).map((phaseKey) => {
              const phase = auditLogPhases[phaseKey];
              const isSelected = selectedAuditLogPhase === phaseKey;
              return (
                <button
                  key={phaseKey}
                  onClick={() => setSelectedAuditLogPhase(phaseKey)}
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
                Configuration &amp; Audit Event Telemetry:
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
              Auditing case studies in Barrackpore and Kolkata demonstrating unauthorized DDL forensic tracking and real-time SIEM alerting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Forensic Reconstruction of a Midnight DROP Attempt in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Forensics Solved
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, an alert fired at 2:14 AM reporting a failed attempt to drop the retail store's <code>orders</code> table. Mamata queried the JSON audit stream using <code>jq</code>. Within 3 minutes, the audit log revealed the exact source IP (<code>192.168.1.88</code>), client account (<code>contractor_temp</code>), and error code 1142. The compromised contractor machine was isolated before any business damage occurred.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Real-Time Splunk SIEM Ingestion in Kolkata Bank
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  ₹500 Crore Audit Trail
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, a banking cluster handling ₹500 Crores across 120 microservices required immutable audit streaming for SOC 2 Type II compliance. Debangshu configured <code>audit_log_format = JSON</code> with asynchronous file rotation and streamed logs into Splunk. Because logs were indexed off-host in real time, the bank established tamper-proof non-repudiation across all administrative ledger updates.
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
              Avoid dangerous log storage exhaustion and audit performance bottlenecks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Leaving General Query Log Enabled in Production
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Running <code>general_log = ON</code> under production OLTP workloads creates severe disk I/O contention and rapidly fills server storage, crashing the database.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Use structured audit plugins with rule-based filtering instead of general_log.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Storing Audit Logs Locally Without Remote Forwarding
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                If an attacker gains root access to the database server, they can delete local audit log files to erase evidence of unauthorized data access.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always forward JSON audit streams in real time to an external SIEM.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Use Asynchronous Audit Strategy
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Configure <code>audit_log_strategy = ASYNCHRONOUS</code> with a 16MB buffer to ensure that auditing does not introduce latency into database transactions.
              </p>
              <div className="text-xs text-slate-400">
                Delivers enterprise audit compliance with zero transaction throughput penalty.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Configure Automated File Rotation
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Configure <code>audit_log_rotate_on_size = 52428800</code> (50MB) and <code>audit_log_rotations = 10</code> to prevent audit files from exhausting disk partitions.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees predictable disk consumption and automated log lifecycle management.
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
            title="Topic 13: Database Auditing: Connection Logging, Audit Plugins, and Activity Monitoring"
            content={noteText}
          />

          <Teacher
            note="Database auditing transforms your security from passive protection into active observability. Deploy modern JSON audit plugins, configure asynchronous logging to eliminate transactional latency, and write rule-based filters to eliminate 95% of routine read noise while capturing all logins, failed attempts, and administrative DDL commands. Stream your logs to an external SIEM in real time to establish non-repudiable audit compliance!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of database auditing, rule-based JSON filtering, and SIEM pipeline integration.
            </p>
          </div>

          <FAQTemplate
            title="Database Auditing &amp; Monitoring FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic13;
