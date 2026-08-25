import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

/**
 * Topic2 – Asynchronous Replication vs Semi-Synchronous Replication (Lossless Semi-Sync)
 * Module: 004_006_replication-and-high-availability
 *
 * @component
 * @returns {JSX.Element} Interactive Asynchronous vs Semi-Synchronous workbench: contrasting Async replication with Lossless Semi-Sync (AFTER_SYNC), evaluating commit wait-point flows, exploring automatic async fallback, and monitoring semi-sync telemetry in MySQL 8.0.
 */
const Topic2 = () => {
  // Interactive Replication Mode State
  const [selectedModeKey, setSelectedModeKey] = useState("mode1_after_sync");

  const replicationModes = {
    mode1_after_sync: {
      modeName: "1. Lossless Semi-Sync (AFTER_SYNC)",
      title: "1. Lossless Semi-Sync: AFTER_SYNC (MySQL 8.0 Default)",
      badge: "RPO = 0 Guaranteed",
      badgeColor: "emerald",
      sqlSnippet: `-- 🛡️ LOSSLESS SEMI-SYNCHRONOUS FLOW (AFTER_SYNC):
-- 1. Client sends COMMIT
-- 2. Source prepares in InnoDB & flushes to Binary Log
-- 3. Source sends binlog event to Replica over TCP
-- 4. Replica writes event to Relay Log & sends ACK
-- 5. Source commits in InnoDB & returns OK to Client!

-- ⚡ Source Configuration:
SET GLOBAL rpl_semi_sync_master_enabled = 1;
SET GLOBAL rpl_semi_sync_master_wait_point = 'AFTER_SYNC';
SET GLOBAL rpl_semi_sync_master_timeout = 10000; -- 10s fallback`,
      explanation:
        "AFTER_SYNC guarantees zero data loss (RPO = 0) and eliminates phantom reads because the Source delays committing the transaction in InnoDB until at least one replica confirms saving the event into its local Relay Log.",
      keyTakeaways: [
        "Guarantees RPO = 0 with zero data loss on primary crash.",
        "Eliminates phantom reads by holding local InnoDB commit until ACK.",
        "Adds only network RTT latency (~1ms in LAN) to write transactions."
      ]
    },
    mode2_async_replication: {
      modeName: "2. Asynchronous Replication",
      title: "2. Asynchronous Replication (Zero Commit Latency)",
      badge: "RPO > 0 (Risk)",
      badgeColor: "rose",
      sqlSnippet: `-- ⚡ ASYNCHRONOUS REPLICATION FLOW:
-- 1. Client sends COMMIT
-- 2. Source writes to Binary Log & commits immediately in InnoDB
-- 3. Source returns OK to Client (0ms replication wait!)
-- 4. Binlog Dump thread streams events to Replica in background

-- ⚠️ Risk: If Source crashes at step 3, un-streamed transactions are LOST!`,
      explanation:
        "Asynchronous replication provides maximum write performance with 0ms commit latency overhead, but risks losing committed transactions (RPO > 0) if the primary server crashes before transmitting events over the network.",
      keyTakeaways: [
        "Zero replication latency overhead added to write transactions.",
        "RPO > 0: Committed data can be lost if the primary crashes.",
        "Best suited for read-replica scaling where minor lag is acceptable."
      ]
    },
    mode3_legacy_after_commit: {
      modeName: "3. Legacy Semi-Sync (AFTER_COMMIT)",
      title: "3. Legacy Semi-Sync: AFTER_COMMIT (Phantom Read Flaw)",
      badge: "Legacy Flawed",
      badgeColor: "purple",
      sqlSnippet: `-- 🛑 LEGACY SEMI-SYNC FLOW (AFTER_COMMIT):
-- 1. Source prepares & COMMITS in InnoDB immediately!
-- 2. Concurrent sessions can now SEE the new un-replicated data!
-- 3. Source sends event to Replica & waits for ACK
-- 4. 💥 CRASH SCENARIO: Source crashes before ACK!
-- -> Failover promotes Replica, but transaction is GONE (Phantom Read)!`,
      explanation:
        "In legacy AFTER_COMMIT, the Source commits to storage engine before waiting for replica acknowledgment. If the Source crashes during the wait, concurrent sessions saw phantom data that disappears upon replica promotion.",
      keyTakeaways: [
        "Commits locally in InnoDB before waiting for replica ACK.",
        "Allows concurrent sessions to see un-replicated data (Phantom Reads).",
        "Obsolete in MySQL 8.0; always use AFTER_SYNC instead."
      ]
    },
    mode4_fallback_and_telemetry: {
      modeName: "4. Dynamic Fallback & Telemetry",
      title: "4. Automated Async Fallback & Telemetry Monitoring",
      badge: "Fail-Safe Telemetry",
      badgeColor: "cyan",
      sqlSnippet: `-- 📊 MONITORING SEMI-SYNC STATUS ON SOURCE:
SHOW GLOBAL STATUS LIKE 'Rpl_semi_sync_master_%';

-- Key Telemetry Metrics:
-- Rpl_semi_sync_master_status: ON (Actively operating in semi-sync)
-- Rpl_semi_sync_master_yes_tx: 145829 (ACKed transactions)
-- Rpl_semi_sync_master_no_tx: 0 (Un-ACKed async fallback transactions)
-- Rpl_semi_sync_master_clients: 2 (Connected semi-sync replicas)`,
      explanation:
        "If all replicas fail to acknowledge within rpl_semi_sync_master_timeout, the Source automatically degrades to Asynchronous mode to prevent blocking writes, and seamlessly resumes Semi-Sync when replicas reconnect.",
      keyTakeaways: [
        "Automatically falls back to async mode on timeout to preserve availability.",
        "Seamlessly restores semi-sync mode when replicas reconnect.",
        "Monitor Rpl_semi_sync_master_no_tx to detect degraded async operation."
      ]
    }
  };

  const currentMode = replicationModes[selectedModeKey];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.6: Replication, High Availability &amp; Failover
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 2 of 14
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          <span className="text-emerald-400">Asynchronous</span> vs <span className="text-cyan-400">Lossless Semi-Sync</span> Replication
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Mastering replication synchronicity in MySQL 8.0: contrasting Asynchronous replication with Lossless Semi-Synchronous replication (<code>AFTER_SYNC</code>), evaluating commit wait-point flows, preventing phantom reads, and monitoring automatic fallback telemetry.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: Replication Modes Pillars ───────────────────── */}
        <section id="modes-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Pillars of Replication Synchronicity
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How MySQL balances client write latency against transaction durability and RPO = 0 guarantees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Mode 1</span>
              <h3 className="font-bold text-white text-base">AFTER_SYNC</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Waits for replica ACK before committing in InnoDB; guarantees RPO = 0 and eliminates phantom reads.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Mode 2</span>
              <h3 className="font-bold text-white text-base">Asynchronous</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Zero commit wait; maximum write throughput with potential data loss on unexpected primary crash.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Mode 3</span>
              <h3 className="font-bold text-purple-300 text-base">AFTER_COMMIT</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Legacy flawed semi-sync mode where un-replicated data was visible locally before failover.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Mode 4</span>
              <h3 className="font-bold text-rose-300 text-base">Dynamic Fallback</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Source automatically degrades to async upon timeout and restores semi-sync when replicas catch up.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Synchronicity Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe AFTER_SYNC lossless flows, asynchronous throughput, phantom read flaws, and telemetry status variables.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(replicationModes).map((modeKey) => {
              const mode = replicationModes[modeKey];
              const isSelected = selectedModeKey === modeKey;
              return (
                <button
                  key={modeKey}
                  onClick={() => setSelectedModeKey(modeKey)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 border",
                    isSelected
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-950/40"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  )}
                >
                  {mode.modeName}
                </button>
              );
            })}
          </div>

          {/* Dynamic Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                  Replication Synchronicity
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {currentMode.title}
                </h3>
              </div>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-semibold border w-fit",
                  currentMode.badgeColor === "emerald" && "bg-emerald-950/80 text-emerald-300 border-emerald-700",
                  currentMode.badgeColor === "cyan" && "bg-cyan-950/80 text-cyan-300 border-cyan-700",
                  currentMode.badgeColor === "purple" && "bg-purple-950/80 text-purple-300 border-purple-700",
                  currentMode.badgeColor === "rose" && "bg-rose-950/80 text-rose-300 border-rose-700"
                )}
              >
                {currentMode.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentMode.explanation}
            </p>

            {/* SQL Snippet */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                SQL Commands &amp; Architecture Flow:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                {currentMode.sqlSnippet}
              </pre>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Architectural Takeaways:
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
                {currentMode.keyTakeaways.map((item, i) => (
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
              Synchronous replication case studies in Barrackpore and Kolkata demonstrating zero invoice data loss and multi-replica banking compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Zero Invoice Loss in Barrackpore Retail Crash
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  RPO = 0 Protected
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, a primary server crashed during a lightning storm. Because Susmita had enabled Lossless Semi-Sync with <code>AFTER_SYNC</code>, the last batch of 12 invoice transactions had been confirmed in the standby replica&apos;s relay log before the crash. Promoting the standby replica restored ₹45,000 in customer transactions with zero data loss across ₹1.2 Crores in store inventory.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Multi-Slave Semi-Sync in Kolkata Bank
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  2-Slave Consensus
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, managing core banking across ₹500 Crores in daily volume required surviving dual-node failures. Debangshu configured <code>rpl_semi_sync_master_wait_for_num_slaves = 2</code>, guaranteeing that every financial transaction was durable across at least two standby replicas before client commits completed, maintaining full RBI regulatory compliance.
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
              Avoid dangerous legacy AFTER_COMMIT configurations and unmonitored async degradations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Using Legacy AFTER_COMMIT
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Setting <code>rpl_semi_sync_master_wait_point = AFTER_COMMIT</code> allows concurrent sessions to see un-replicated data locally before Source crashes, triggering phantom read data loss.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always configure rpl_semi_sync_master_wait_point = 'AFTER_SYNC'.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Silent Async Degradation
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                When replicas disconnect, the Source silently degrades to asynchronous mode; without alerts, DBAs assume they have RPO = 0 protection when they do not.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Alert when Rpl_semi_sync_master_status drops to OFF or no_tx increments.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Size Semi-Sync Timeouts Properly
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Set <code>rpl_semi_sync_master_timeout = 10000</code> (10 seconds) to prevent transient network jitter from causing premature fallback while avoiding permanent write freezes.
              </p>
              <div className="text-xs text-slate-400">
                Balances data loss prevention with database write availability.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Co-locate Semi-Sync in Same LAN
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Keep the semi-synchronous standby replica in the same datacenter or cloud Availability Zone to keep commit latency overhead under 1ms.
              </p>
              <div className="text-xs text-slate-400">
                Use asynchronous replication for distant cross-region disaster recovery nodes.
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
            title="Topic 2: Asynchronous Replication vs Semi-Synchronous Replication (Lossless Semi-Sync)"
            content={noteText}
          />

          <Teacher
            note="Lossless Semi-Synchronous Replication is the gold standard for enterprise MySQL reliability! Always use rpl_semi_sync_master_wait_point = AFTER_SYNC to guarantee RPO = 0 and eliminate phantom reads on primary crashes. Keep your semi-sync standbys in the same low-latency LAN for sub-millisecond commits, and monitor Rpl_semi_sync_master_status with automated alerts so you know immediately if the cluster degrades to asynchronous mode!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of Asynchronous vs Lossless Semi-Sync replication, AFTER_SYNC vs AFTER_COMMIT wait points, fallback timeouts, and telemetry metrics.
            </p>
          </div>

          <FAQTemplate
            title="Asynchronous vs Semi-Sync Replication FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic2;
