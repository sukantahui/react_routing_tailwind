import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

/**
 * Topic0 – Backup Strategies: Recovery Time Objective (RTO) and Recovery Point Objective (RPO)
 * Module: 004_004_backup-restore-and-data-migration
 *
 * @component
 * @returns {JSX.Element} Interactive disaster recovery workbench: calculating RTO and RPO SLAs, contrasting High Availability (HA) against Disaster Recovery (DR), enforcing the 3-2-1 backup rule, and establishing automated restore verification pipelines in MySQL 8.0.
 */
const Topic0 = () => {
  // Interactive DR Strategy State
  const [selectedStrategyPhase, setSelectedStrategyPhase] = useState("phase1_rto_rpo_metrics");

  const strategyPhases = {
    phase1_rto_rpo_metrics: {
      phaseNumber: "Phase 1: RTO & RPO Metrics",
      title: "1. Recovery Time Objective (RTO) vs Recovery Point Objective (RPO)",
      badge: "Core DR Metrics",
      badgeColor: "emerald",
      sqlSnippet: `-- ⏱️ MEASURING RTO & RPO IN DATABASE ARCHITECTURE:

-- 1. Recovery Point Objective (RPO): Maximum acceptable data loss window:
-- Target: RPO < 1 minute
-- Strategy: Nightly Full Base Backup + Continuous Binary Log Streaming:
SET PERSIST sync_binlog = 1;
SET PERSIST binlog_format = 'ROW';

-- 2. Recovery Time Objective (RTO): Maximum acceptable downtime duration:
-- Target: RTO < 15 minutes
-- Strategy: Physical Hot Backups (Percona XtraBackup) instead of Logical SQL Dumps:
-- Restores 2TB database in 12 minutes vs 8 hours for mysqldump!`,
      explanation:
        "RPO defines the maximum tolerable data loss window measured in time prior to failure. RTO defines the maximum allowable service downtime required to restore operations. Pairing nightly backups with continuous binary logs enables near-zero RPO, while physical backups deliver ultra-low RTO.",
      keyTakeaways: [
        "RPO = Maximum acceptable data loss window (e.g. 1 minute).",
        "RTO = Maximum acceptable downtime duration (e.g. 15 minutes).",
        "Continuous binary logging achieves near-zero RPO (< 1 sec)."
      ]
    },
    phase2_ha_vs_dr: {
      phaseNumber: "Phase 2: HA vs DR Distinction",
      title: "2. Why High Availability (HA) is NOT a Substitute for DR",
      badge: "HA vs DR",
      badgeColor: "cyan",
      sqlSnippet: `-- ⚠️ THE DANGEROUS HA REPLICATION TRAP:

-- Scenario: Developer accidentally executes destructive command on Primary:
DROP DATABASE kolkata_ecommerce; -- 💥 DISASTER!

-- 1. What happens in High Availability (HA) Replication:
-- Replication immediately streams the DROP event to all replicas!
-- Replicas execute DROP in < 50ms → All HA nodes lose data simultaneously!

-- 2. What saves the business (Disaster Recovery):
-- Independent, immutable Point-in-Time backups and binary logs:
-- mysqlbinlog --stop-datetime="2026-08-25 14:14:59" binlog.000010 | mysql`,
      explanation:
        "High Availability (clustering, replication) protects against server hardware failures by providing instant failover. However, HA replicates data corruption and accidental DROP commands instantly. Only independent point-in-time backups protect against human error and ransomware.",
      keyTakeaways: [
        "Replication propagates human error and malicious DROPs in milliseconds.",
        "HA protects server uptime; DR protects historical data state.",
        "Point-in-Time Recovery (PITR) is mandatory for true disaster resilience."
      ]
    },
    phase3_three_two_one: {
      phaseNumber: "Phase 3: The 3-2-1 Rule",
      title: "3. The 3-2-1 Backup Rule & Immutable Storage",
      badge: "Enterprise Standard",
      badgeColor: "purple",
      sqlSnippet: `-- 🛡️ IMPLEMENTING THE 3-2-1 BACKUP RULE:

-- 1. Copy 1: Production Active Storage (Local NVMe)
-- 2. Copy 2: Local Fast-Restore Backup Appliance (NFS/SAN - Low RTO)
-- 3. Copy 3: Immutable Cloud Object Storage (AWS S3 with Object Lock):

-- AWS S3 Immutable Storage (WORM - Write Once, Read Many):
-- aws s3 cp /backups/full_base.xbstream s3://kolkata-bank-backups/ \\
--   --object-lock-mode COMPLIANCE \\
--   --object-lock-retain-until-date "2026-09-25"

-- Result: Even compromised root accounts cannot delete or encrypt the backup!`,
      explanation:
        "The 3-2-1 Rule mandates 3 copies of data, across 2 different media types, with 1 copy stored in an offsite, immutable location. Immutable object locks prevent ransomware attackers from deleting or corrupting historical backup archives.",
      keyTakeaways: [
        "3 copies: 1 production + 2 independent backup archives.",
        "2 media: Local NVMe/SAN storage + Cloud Object Storage (S3/GCS).",
        "1 immutable offsite: WORM-locked storage protects against ransomware."
      ]
    },
    phase4_restore_verification: {
      phaseNumber: "Phase 4: Automated Verification",
      title: "4. Automated Nightly Restore Verification Pipelines",
      badge: "Verification Testing",
      badgeColor: "rose",
      sqlSnippet: `-- 🧪 AUTOMATED NIGHTLY RESTORE VERIFICATION WORKFLOW:

-- Step 1: Download latest nightly backup to isolated test sandbox container
-- Step 2: Prepare and restore physical/logical backup
-- Step 3: Run automated consistency and data sanity queries:

SELECT COUNT(*) AS total_orders FROM kolkata_ecommerce.orders;
CHECK TABLE kolkata_ecommerce.orders EXTENDED;
CHECK TABLE kolkata_finance.ledgers EXTENDED;

-- Step 4: Verify latest transaction timestamp:
SELECT MAX(created_at) AS latest_record FROM kolkata_ecommerce.orders;

-- Step 5: Emit heartbeat ping to monitoring system (Dead Man's Snitch) ✅`,
      explanation:
        "An untested backup is merely an assumption. Enterprise operations mandate automated nightly restore testing in isolated sandbox containers to verify file integrity, checksum validity, and successful database boot.",
      keyTakeaways: [
        "Automated restore testing detects corrupted or truncated backups immediately.",
        "CHECK TABLE EXTENDED verifies physical B-tree and data page integrity.",
        "Heartbeat monitoring eliminates silent backup cron job failures."
      ]
    }
  };

  const currentPhase = strategyPhases[selectedStrategyPhase];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.4: Backup, PITR &amp; Data Migration
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 0 of 13
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
          Backup Strategies: <span className="text-emerald-400">RTO</span> &amp; <span className="text-cyan-400">RPO</span> Engineering
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Establishing enterprise disaster recovery architecture: defining Recovery Time Objective (RTO) and Recovery Point Objective (RPO) SLAs, understanding why High Availability is not a substitute for backups, enforcing the 3-2-1 rule, and designing automated restore testing pipelines.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: DR Fundamentals Overview ────────────────────── */}
        <section id="dr-fundamentals" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Fundamentals of Database Disaster Recovery
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key operational metrics and architectural rules defining modern enterprise database resilience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Metric 1</span>
              <h3 className="font-bold text-white text-base">Recovery Point (RPO)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Maximum allowable data loss window. Achieved via full base backups + continuous binary log streaming.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Metric 2</span>
              <h3 className="font-bold text-white text-base">Recovery Time (RTO)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Maximum allowable downtime duration. Physical block-level backups reduce restore times from hours to minutes.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Rule</span>
              <h3 className="font-bold text-purple-300 text-base">The 3-2-1 Rule</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                3 data copies, 2 media types, 1 immutable offsite copy protected by WORM compliance locks against ransomware.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Principle</span>
              <h3 className="font-bold text-rose-300 text-base">Automated Verification</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Automated nightly sandbox restore testing guarantees that backup archives are valid and uncorrupted.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Disaster Recovery Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Explore RTO/RPO calculation models, HA vs DR threat scenarios, the 3-2-1 rule, and automated verification pipelines.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(strategyPhases).map((phaseKey) => {
              const phase = strategyPhases[phaseKey];
              const isSelected = selectedStrategyPhase === phaseKey;
              return (
                <button
                  key={phaseKey}
                  onClick={() => setSelectedStrategyPhase(phaseKey)}
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
                Architecture &amp; Command Implementation:
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
              Disaster recovery case studies in Barrackpore and Kolkata demonstrating near-zero RPO binlog recovery and low-RTO physical restore.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Midday POS Crash Recovered in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  RPO &lt; 30 Seconds
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, a retail database host experienced hardware failure at 4:30 PM. The last full backup was taken at midnight. Because Mamata had configured real-time binary log replication to an offsite cloud bucket, she restored the midnight base backup and replayed binary logs up to 4:29:35 PM. The retail store recovered ₹12 Lakhs in daily sales with less than 25 seconds of lost transactions.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Meeting 15-Minute RTO on 4TB Banking Ledger in Kolkata
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  11-Minute Recovery
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, managing a 4TB financial transaction ledger processing ₹500 Crores per month required a strict 15-minute RTO SLA. Restoring a logical <code>mysqldump</code> took over 9 hours (violating SLA). Debangshu deployed Percona XtraBackup physical hot backups. When an SAN controller failed, the database was restored and recovered in 11 minutes, saving the bank over ₹1.5 Crores in downtime penalties.
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
              Avoid catastrophic disaster recovery misconceptions and silent failure traps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Assuming HA Replicas are Backups
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                If someone runs <code>DROP TABLE orders;</code>, replication executes the drop across all replicas in milliseconds. Replicas protect hardware uptime, not data state.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always maintain independent point-in-time backup archives.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Silent Backup Cron Job Failures
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Backup scripts that fail silently due to disk space or expired credentials leave organizations without valid backups for weeks without anyone noticing.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Implement heartbeat monitoring (Dead Man's Snitch / Prometheus alerts).
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Automate Nightly Sandbox Restores
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Schedule an automated test pipeline that restores the latest backup to a temporary container daily and runs <code>CHECK TABLE</code> sanity queries.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees that backup files are uncorrupted and recoverable before emergencies.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Enable Continuous Binary Logging
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Set <code>sync_binlog = 1</code> and stream binary logs offsite continuously to achieve near-zero RPO across all production clusters.
              </p>
              <div className="text-xs text-slate-400">
                Enables point-in-time recovery up to the second before failure.
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
            title="Topic 0: Backup Strategies: Recovery Time Objective (RTO) and Recovery Point Objective (RPO)"
            content={noteText}
          />

          <Teacher
            note="Disaster recovery engineering begins with two non-negotiable metrics: RTO and RPO. Always remember: replication is NOT a backup—if you drop a table, your replicas drop it instantly! Follow the 3-2-1 rule with immutable cloud storage, stream binary logs continuously for near-zero RPO, and test your backups with automated sandbox restores. An untested backup is merely a wish!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of RTO, RPO, disaster recovery runbooks, and immutable storage.
            </p>
          </div>

          <FAQTemplate
            title="Backup Strategies (RTO &amp; RPO) FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic0;
