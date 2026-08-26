import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

/**
 * Topic2 – The General Query Log: Enabling, Inspection, Performance Overhead, and Debugging Use Cases
 * Module: 004_005_logs-monitoring-and-slow-queries
 *
 * @component
 * @returns {JSX.Element} Interactive General Query Log workbench: understanding 100% full query auditing, evaluating the 15-30% QPS disk I/O performance penalty, analyzing plaintext credential security risks, and executing surgical 5-minute ramdisk debugging protocols in MySQL 8.0.
 */
const Topic2 = () => {
  // Interactive General Log State
  const [selectedGeneralPhase, setSelectedGeneralPhase] = useState("phase1_event_stream");

  const generalPhases = {
    phase1_event_stream: {
      phaseNumber: "Phase 1: Full Audit Stream",
      title: "1. The 100% Chronological Query Stream",
      badge: "Full Query Audit",
      badgeColor: "emerald",
      sqlSnippet: `-- 📜 THE GENERAL QUERY LOG EVENT STREAM:

-- Records EVERY connection and EVERY query received in chronological order:
-- 2026-08-25T15:00:00.123456Z   14 Connect   app_user@192.168.1.50 on kolkata_retail
-- 2026-08-25T15:00:00.124102Z   14 Query     SELECT * FROM orders WHERE status = 'PENDING'
-- 2026-08-25T15:00:00.125890Z   14 Query     UPDATE orders SET status = 'PROCESSING' WHERE id = 101
-- 2026-08-25T15:00:00.128410Z   14 Quit

-- Dynamic Toggle:
SET GLOBAL general_log = 'ON';
SET GLOBAL general_log_file = '/var/log/mysql/general.log';`,
      explanation:
        "The General Query Log captures 100% of client activity: connection handshakes, schema selections, and every SQL statement in exact chronological order BEFORE execution. It captures even failed or aborted queries.",
      keyTakeaways: [
        "Captures every connection, disconnection, and SQL statement received.",
        "Logs statements prior to execution, capturing failed or syntax-error queries.",
        "Can be toggled dynamically at runtime without restarting mysqld."
      ]
    },
    phase2_performance_and_security: {
      phaseNumber: "Phase 2: Hazards & Security",
      title: "2. Performance Penalties (15-30% QPS Drop) & Password Risks",
      badge: "Production Hazard",
      badgeColor: "rose",
      sqlSnippet: `-- ⚠️ 1. DISK I/O SATURATION HAZARD (15-30% QPS DROP):
-- At 15,000 QPS, general log writes 900,000 disk lines/min, choking NVMe I/O!

-- 🚨 2. PLAINTEXT PASSWORD SECURITY LEAK (PCI-DSS VIOLATION):
-- Unprepared administrative queries log credentials in cleartext on disk:
-- 2026-08-25T15:00:00Z  14 Query  CREATE USER 'mamata'@'%' IDENTIFIED BY 'SecretPassword#2026';
-- Plaintext credentials are stored unencrypted in /var/log/mysql/general.log!

-- ✅ RULE: Keep general_log = 'OFF' permanently in production!`,
      explanation:
        "Writing every query to disk causes severe disk write saturation, dropping throughput by 15% to 30%. Furthermore, statements containing passwords or sensitive PII are recorded in unencrypted cleartext on disk.",
      keyTakeaways: [
        "Saturates storage write bandwidth, causing severe 15-30% throughput drops.",
        "Writes database user passwords and sensitive customer PII in cleartext.",
        "Violates PCI-DSS and GDPR data security compliance standards."
      ]
    },
    phase3_debugging_use_cases: {
      phaseNumber: "Phase 3: Debugging Use Cases",
      title: "3. Legitimate Forensic Scenarios (ORM N+1 & Leaks)",
      badge: "Forensic Diagnosis",
      badgeColor: "cyan",
      sqlSnippet: `-- 🔍 SCENARIO A: DETECTING ORM N+1 QUERY STORMS (Prisma / Hibernate):
-- General log exposes 1,000 sequential single-row queries during 1 page load:
-- Query  SELECT * FROM balances WHERE account_id = 101;
-- Query  SELECT * FROM balances WHERE account_id = 102;
-- Query  SELECT * FROM balances WHERE account_id = 103;

-- 🔌 SCENARIO B: UNPOOLED CONNECTION LEAKS:
-- Detects rogue application loop opening 500 TCP connections/sec:
-- Connect  app_user@192.168.1.45 on kolkata_retail (Repeated 500x/sec!)`,
      explanation:
        "The General Query Log is invaluable for short forensic investigations: exposing ORM N+1 query storms, identifying connection pool leaks, and capturing attacker payloads during active security incident response.",
      keyTakeaways: [
        "Exposes hidden ORM N+1 single-row query storms in exact sequence.",
        "Identifies leaky microservices creating unpooled TCP connections.",
        "Provides exact payload capture during security incident forensics."
      ]
    },
    phase4_ramdisk_protocol: {
      phaseNumber: "Phase 4: Safe Ramdisk Protocol",
      title: "4. Safe 5-Minute Ramdisk Protocol (/dev/shm)",
      badge: "Zero-Wear Protocol",
      badgeColor: "purple",
      sqlSnippet: `-- ⚡ THE ZERO-WEAR 5-MINUTE RAMDISK DEBUGGING RUNBOOK:

-- Step 1: Direct general log to RAM (/dev/shm) to eliminate SSD write wear:
SET GLOBAL general_log_file = '/dev/shm/temp_debug_trace.log';
SET GLOBAL general_log = 'ON';

-- Step 2: Tail and inspect active query traffic during diagnostic test:
-- tail -f /dev/shm/temp_debug_trace.log

-- Step 3: Disable immediately after 5 minutes:
SET GLOBAL general_log = 'OFF';

-- Step 4: Remove temporary log file from RAM:
-- rm /dev/shm/temp_debug_trace.log`,
      explanation:
        "Directing the general log to Linux system memory (/dev/shm) eliminates SSD physical write wear and cuts logging performance overhead from 30% down to under 6% during controlled 5-minute diagnostic windows.",
      keyTakeaways: [
        "Directing output to /dev/shm buffers all log writes in system RAM.",
        "Eliminates SSD write endurance degradation.",
        "Strict 5-minute timer ensures logging is disabled promptly."
      ]
    }
  };

  const currentPhase = generalPhases[selectedGeneralPhase];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.5: Server Logs, Slow Queries &amp; Performance Schema
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 2 of 13
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          The General Query Log: <span className="text-emerald-400">Overhead</span> &amp; <span className="text-cyan-400">Forensics</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Mastering the full-audit logging engine in MySQL 8.0: understanding 100% chronological query capture, evaluating the 15-30% QPS disk I/O performance drop, auditing plaintext credential security risks, and executing surgical 5-minute ramdisk debugging protocols.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: General Log Pillars ─────────────────────────── */}
        <section id="general-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Pillars of General Query Log Architecture
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why full query auditing is a powerful forensic tool but a hazardous production configuration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">Full Event Capture</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Records all connection handshakes, schema switches, and SQL statements in order before execution.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">15-30% QPS Drop</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Writing every single query to disk saturates storage I/O bandwidth on busy production servers.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-purple-300 text-base">Plaintext Passwords</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Unprepared user creation and authentication queries store sensitive credentials in cleartext.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-700/60 bg-cyan-950/20 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-cyan-300 text-base">Ramdisk Debugging</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Writing to <code>/dev/shm</code> eliminates SSD write wear during surgical 5-minute forensic tests.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive General Query Log Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe event streams, performance overhead warnings, ORM N+1 debugging, and ramdisk staging.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(generalPhases).map((phaseKey) => {
              const phase = generalPhases[phaseKey];
              const isSelected = selectedGeneralPhase === phaseKey;
              return (
                <button
                  key={phaseKey}
                  onClick={() => setSelectedGeneralPhase(phaseKey)}
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
                SQL Commands &amp; Audit Trace Telemetry:
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
              General Query Log case studies in Barrackpore and Kolkata demonstrating unpooled connection leak detection and ORM N+1 refactoring.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Catching 500 Connection/Sec Leak in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Leak Caught
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, a new billing service was crashing database connections during high volume. Mamata enabled <code>general_log = ON</code> on a staging replica for 60 seconds. The log revealed that an unhandled loop was opening 500 new unpooled TCP database connections per second. Reconfiguring the service with a shared connection pool resolved the issue completely.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Exposing ORM N+1 Storms in Kolkata Bank
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Refactored to Batch
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, loading an account balance dashboard for ₹500 Crores in client portfolios was taking 3.8 seconds. Debangshu captured a 30-second general log trace to a ramdisk, uncovering that the backend ORM was executing 1,000 individual queries for 1,000 accounts. Refactoring the query with <code>WHERE account_id IN (...)</code> cut execution time from 3.8s down to 18ms.
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
              Avoid dangerous cleartext credential leaks and unmanaged disk exhaustion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Leaving General Log ON in Production
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Leaving the general log enabled reduces database throughput by 15-30% and rapidly fills disk storage with millions of text lines.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Keep general_log permanently OFF in production my.cnf.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Storing Passwords in Plaintext Logs
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Administrative commands containing cleartext passwords are written unmasked to disk, creating severe data breach vulnerabilities.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Use MySQL Enterprise Audit plugin with data masking for compliance.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Log to Ramdisk (/dev/shm)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Direct temporary debugging logs to <code>/dev/shm</code> to eliminate SSD write endurance wear and minimize I/O write latency.
              </p>
              <div className="text-xs text-slate-400">
                Reduces performance penalty from 30% down to under 6%.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Use Performance Schema Instead
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Leverage <code>performance_schema.events_statements_history</code> for continuous statement auditing with zero disk I/O and &lt;1% CPU impact.
              </p>
              <div className="text-xs text-slate-400">
                Non-blocking memory ring buffers replace disk logging.
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
            title="Topic 2: The General Query Log: Enabling, Inspection, Performance Overhead, and Debugging Use Cases"
            content={noteText}
          />

          <Teacher
            note="The General Query Log is like a high-speed security camera that records every single frame. Because it writes every query to disk, it causes a severe 15-30% drop in throughput and leaks plaintext passwords into log files! Never leave it enabled in production! Use it only for surgical 5-minute debugging sessions on a ramdisk (/dev/shm) to catch ORM N+1 query storms or connection leaks, and prefer the Performance Schema for continuous low-overhead monitoring!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of General Query Log performance overhead, plaintext security hazards, ramdisk staging, and ORM forensics.
            </p>
          </div>

          <FAQTemplate
            title="General Query Log &amp; Forensics FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic2;
