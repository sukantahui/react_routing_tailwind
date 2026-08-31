import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

/**
 * Topic3 – Global Transaction Identifier (GTID) Based Replication: Architecture and Advantages over Binary Log Coordinates
 * Module: 004_006_replication-and-high-availability
 *
 * @component
 * @returns {JSX.Element} Interactive GTID-based replication workbench: exploring the UUID:Transaction_ID format, contrasting positional coordinates with SOURCE_AUTO_POSITION = 1, executing empty GTID commit skips, and inspecting gtid_executed and gtid_purged sets in MySQL 8.0.
 */
const Topic3 = () => {
  // Interactive GTID Phase State
  const [selectedGtidPhase, setSelectedGtidPhase] = useState("phase1_gtid_structure");

  const gtidPhases = {
    phase1_gtid_structure: {
      phaseNumber: "Phase 1: GTID Structure & Format",
      title: "1. Global Transaction Identifier (GTID) Format",
      badge: "Unique Identity",
      badgeColor: "emerald",
      sqlSnippet: `-- 🆔 GTID FORMAT: <server_uuid>:<transaction_id>
-- Example: 3E11FA47-71CA-11E1-9E33-C80AA9429562:1042

-- 📜 Multi-Transaction GTID Set:
-- '3E11FA47-71CA-11E1-9E33-C80AA9429562:1-1042'

-- 🔍 Inspecting Local GTID Execution State:
SELECT @@GLOBAL.gtid_executed;
SELECT @@GLOBAL.gtid_purged;`,
      explanation:
        "Every transaction committed in MySQL is assigned a globally unique GTID composed of the originating server's 128-bit UUID and a monotonically increasing transaction sequence number, eliminating file and offset coordinate confusion.",
      keyTakeaways: [
        "Unique identity format: <server_uuid>:<transaction_id>.",
        "Guarantees that every committed transaction has a globally unique ID.",
        "Stored persistently in the InnoDB table mysql.gtid_executed."
      ]
    },
    phase2_auto_positioning: {
      phaseNumber: "Phase 2: SOURCE_AUTO_POSITION = 1",
      title: "2. Automated Failover: SOURCE_AUTO_POSITION = 1",
      badge: "Zero-Math Failover",
      badgeColor: "cyan",
      sqlSnippet: `-- 🚀 ZERO-COORDINATE REPLICATION SETUP ON REPLICA:
CHANGE REPLICATION SOURCE TO 
  SOURCE_HOST = '192.168.1.10',
  SOURCE_USER = 'repl_user',
  SOURCE_PASSWORD = 'ReplPass#2026',
  SOURCE_AUTO_POSITION = 1;

START REPLICA;

-- 💡 Mathematical Set Difference Protocol:
-- Missing = Source.gtid_executed \\ Replica.gtid_executed
-- Source streams ONLY the missing transactions automatically!`,
      explanation:
        "Under SOURCE_AUTO_POSITION = 1, the replica simply provides its executed GTID set to the Source. The Source calculates the mathematical set difference and streams all missing transactions with zero manual coordinate math.",
      keyTakeaways: [
        "Eliminates manual SOURCE_LOG_FILE and SOURCE_LOG_POS calculations.",
        "Source streams missing transactions based on GTID set difference math.",
        "Enables instant 5-second replica re-pointing during primary failovers."
      ]
    },
    phase3_empty_commits: {
      phaseNumber: "Phase 3: Skipping Broken Transactions",
      title: "3. Skipping Transactions via GTID Empty Commits",
      badge: "Error Remediation",
      badgeColor: "purple",
      sqlSnippet: `-- 🛑 FIXING A FAILING REPLICATION TRANSACTION (e.g. uuid:105):
-- (Note: sql_slave_skip_counter is NOT supported in GTID mode!)

STOP REPLICA;
SET GTID_NEXT = '3E11FA47-71CA-11E1-9E33-C80AA9429562:105';
BEGIN; COMMIT;  -- Injects empty transaction with target GTID!
SET GTID_NEXT = 'AUTOMATIC';
START REPLICA;

-- 💡 The replica records GTID 105 as executed and skips the broken query!`,
      explanation:
        "Because legacy sql_slave_skip_counter is disabled in GTID mode to prevent sequence gaps, DBAs skip broken queries by injecting an empty transaction with the target GTID, recording it as completed in gtid_executed.",
      keyTakeaways: [
        "sql_slave_skip_counter is unsupported in GTID mode.",
        "Injecting an empty commit marks the failing GTID as executed.",
        "Always reset SET GTID_NEXT = 'AUTOMATIC' after empty commits."
      ]
    },
    phase4_system_tables: {
      phaseNumber: "Phase 4: GTID State & Variables",
      title: "4. GTID System Tables & Configuration Settings",
      badge: "Crash-Safe Engine",
      badgeColor: "rose",
      sqlSnippet: `-- ⚙️ MANDATORY MY.CNF SETTINGS FOR GTID REPLICATION:
-- [mysqld]
-- gtid_mode = ON
-- enforce_gtid_consistency = ON
-- log_replica_updates = ON

-- 🗄️ INSPECTING INNODB GTID TABLE:
SELECT * FROM mysql.gtid_executed LIMIT 5;

-- 🔍 CHECKING SUBSETS & DIFFERENCES VIA SQL FUNCTIONS:
SELECT GTID_SUBSET('uuid:1-100', @@GLOBAL.gtid_executed);
SELECT GTID_SUBTRACT('uuid:1-100', 'uuid:1-80'); -- Returns 'uuid:81-100'`,
      explanation:
        "MySQL 8.0 stores executed GTIDs in the crash-safe InnoDB table mysql.gtid_executed. Built-in functions like GTID_SUBSET and GTID_SUBTRACT allow programmatic validation of replication consistency.",
      keyTakeaways: [
        "enforce_gtid_consistency = ON rejects non-deterministic statements.",
        "mysql.gtid_executed provides crash-safe transaction tracking.",
        "GTID_SUBSET and GTID_SUBTRACT enable automated orchestration logic."
      ]
    }
  };

  const currentPhase = gtidPhases[selectedGtidPhase];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.6: Replication, High Availability &amp; Failover
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 3 of 14
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
          <span className="text-emerald-400">GTID-Based</span> Replication &amp; <span className="text-cyan-400">Auto-Positioning</span> Architecture
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Mastering Global Transaction Identifiers in MySQL 8.0: understanding the <code>server_uuid:transaction_id</code> structure, eliminating log coordinate calculations with <code>SOURCE_AUTO_POSITION = 1</code>, skipping transactions using empty commits, and utilizing GTID set math.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: GTID Pillars ────────────────────────────────── */}
        <section id="gtid-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Pillars of GTID Replication
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How GTIDs eliminate human error and coordinate calculation complexity in MySQL replication topologies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">Global Uniqueness</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Every transaction receives a unique <code>server_uuid:transaction_id</code> across the cluster.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">AUTO_POSITION = 1</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Automated handshake streams missing transactions via mathematical set difference.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-purple-300 text-base">Empty Commit Skips</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Safely skip broken queries by injecting empty GTID transactions without breaking sequence sets.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-rose-300 text-base">Crash-Safe InnoDB</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                <code>mysql.gtid_executed</code> stores executed transaction history atomically in InnoDB tables.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive GTID Replication Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe GTID formats, auto-positioning set difference math, empty commit skips, and GTID SQL functions.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(gtidPhases).map((phaseKey) => {
              const phase = gtidPhases[phaseKey];
              const isSelected = selectedGtidPhase === phaseKey;
              return (
                <button
                  key={phaseKey}
                  onClick={() => setSelectedGtidPhase(phaseKey)}
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
                  GTID Replication Mechanism
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
                SQL Commands &amp; GTID Set Math:
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
              GTID replication case studies in Barrackpore and Kolkata demonstrating 5-second replica re-pointing and empty commit schema repair.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – 5-Second Replica Re-pointing in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Auto-Positioned
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, a primary database hardware fault required promoting a standby node. Because Susmita had enabled GTID replication with <code>SOURCE_AUTO_POSITION = 1</code>, she pointed three edge cashier read replicas to the new primary in 5 seconds without calculating matching binary log byte offsets, keeping ₹1.2 Crores in retail transactions synchronized seamlessly.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Empty Commit Skips in Kolkata Bank
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  GTID Injected
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, managing core banking across ₹500 Crores in daily volume, an accidental manual DDL on a read replica caused replication to stop with <code>ERROR 1050 (Table already exists)</code> at GTID <code>3E11FA47-...:104</code>. Debangshu injected an empty transaction with that exact GTID, allowing the replica to mark it completed and resume replication instantly without resetting data.
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
              Avoid duplicate server UUIDs from VM cloning and attempting to use sql_slave_skip_counter in GTID mode.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Cloned VM Duplicate server_uuid
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Cloning database VMs without deleting <code>/var/lib/mysql/auto.cnf</code> causes duplicate <code>server_uuid</code> collisions, breaking replication handshakes.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always delete auto.cnf on template base images so MySQL generates a fresh UUID.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Using sql_slave_skip_counter with GTIDs
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Executing <code>SET GLOBAL sql_slave_skip_counter = 1</code> in GTID mode results in <code>ERROR 1858</code> because MySQL prevents creating unrecorded GTID sequence gaps.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Use the SET GTID_NEXT empty transaction injection technique to skip transactions.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Always Enforce GTID Consistency
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Configure <code>enforce_gtid_consistency = ON</code> to reject non-deterministic SQL statements that cannot be assigned clean atomic GTIDs.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees 100% deterministic GTID generation across all nodes.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Use SOURCE_AUTO_POSITION = 1
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Connect all replicas using <code>SOURCE_AUTO_POSITION = 1</code> to allow the replication protocol to automatically negotiate missing transaction sets.
              </p>
              <div className="text-xs text-slate-400">
                Enables automated failover orchestrators to re-point nodes seamlessly.
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
            title="Topic 3: Global Transaction Identifier (GTID) Based Replication: Architecture and Advantages over Binary Log Coordinates"
            content={noteText}
          />

          <Teacher
            note="GTID-based replication is one of the greatest innovations in MySQL 8.0! Forget about manually tracking binary log filenames and byte offsets like binlog.000004:452 — with GTIDs, every transaction receives a unique server_uuid:sequence ID, and replicas use SOURCE_AUTO_POSITION = 1 to automatically stream missing transactions. Always enable gtid_mode = ON and enforce_gtid_consistency = ON on every single production node!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of GTID replication, auto-positioning set difference math, empty commit transaction skipping, and UUID cloning safety.
            </p>
          </div>

          <FAQTemplate
            title="GTID Replication &amp; Auto-Positioning FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic3;
