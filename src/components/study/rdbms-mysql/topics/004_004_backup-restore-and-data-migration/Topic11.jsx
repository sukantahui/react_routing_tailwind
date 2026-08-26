import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic11_files/topic11_questions";
import noteText from "./topic11_files/topic11_note.txt?raw";

/**
 * Topic11 – Database Migration Strategies: Cross-Server, Cross-Version, and Cloud Migration Best Practices
 * Module: 004_004_backup-restore-and-data-migration
 *
 * @component
 * @returns {JSX.Element} Interactive database migration workbench: orchestrating the 4-step near-zero-downtime replication cutover, running MySQL Shell pre-upgrade checks (util.checkForServerUpgrade), configuring reverse replication for instant failback safety, and managing cloud cutovers in MySQL 8.0.
 */
const Topic11 = () => {
  // Interactive Migration State
  const [selectedMigrationPhase, setSelectedMigrationPhase] = useState("phase1_cutover_runbook");

  const migrationPhases = {
    phase1_cutover_runbook: {
      phaseNumber: "Phase 1: 4-Step Cutover Runbook",
      title: "1. The 4-Step Near-Zero-Downtime Cutover Runbook",
      badge: "Sub-30s Cutover",
      badgeColor: "emerald",
      sqlSnippet: `-- 🚀 NEAR-ZERO-DOWNTIME REPLICATION CUTOVER RUNBOOK:

-- Step 1: Capture baseline dump with replication coordinates recorded:
-- mydumper -u root -p -B kolkata_retail --threads=8 -o /backups/seed/

-- Step 2: Seed target database & establish GTID replication:
CHANGE REPLICATION SOURCE TO
  SOURCE_HOST = 'source-db.kolkata.internal',
  SOURCE_USER = 'repl_user',
  SOURCE_PASSWORD = 'ReplPassword#2026',
  SOURCE_AUTO_POSITION = 1;
START REPLICA;

-- Step 3: Application Maintenance Window Cutover:
-- On Source: Lock writes:
SET GLOBAL super_read_only = ON;

-- Step 4: Promote Target & Switch DNS:
-- Wait for Seconds_Behind_Source = 0 on target:
STOP REPLICA;
RESET REPLICA ALL;
SET GLOBAL read_only = OFF;
-- Repoint Route53 / DNS to target database endpoint!`,
      explanation:
        "Replication-based cutover synchronizes data continuously in the background. During the maintenance window, the source database is set to super_read_only, the target replica is promoted once lag reaches 0, and DNS is switched in under 30 seconds.",
      keyTakeaways: [
        "Continuous background replication minimizes active maintenance window.",
        "super_read_only prevents stray writes on source during switchover.",
        "Promoting target replica with RESET REPLICA ALL makes it the new primary."
      ]
    },
    phase2_preupgrade_checker: {
      phaseNumber: "Phase 2: Pre-Upgrade Diagnostic",
      title: "2. MySQL Shell Pre-Upgrade Compatibility Scan",
      badge: "Upgrade Validation",
      badgeColor: "cyan",
      sqlSnippet: `// 🔍 RUN PRE-UPGRADE CHECKER IN MYSQL SHELL (JS Mode):

util.checkForServerUpgrade({
  user: 'root',
  host: '127.0.0.1',
  port: 3306,
  password: 'AdminPassword#2026'
});

// Outputs automated diagnostics:
// 1. Checks reserved keywords (RANK, MEMBER, SYSTEM, LEAD).
// 2. Checks obsolete SQL modes & zero-dates ('0000-00-00').
// 3. Checks legacy MyISAM system tables.
// 4. Verifies utf8mb3 &rarr; utf8mb4 conversion prerequisites.`,
      explanation:
        "MySQL Shell's util.checkForServerUpgrade() is mandatory before upgrading from MySQL 5.7 to 8.0 or 8.4 LTS. It detects reserved keyword collisions, invalid default values, and legacy table formats before migration begins.",
      keyTakeaways: [
        "Identifies breaking reserved keywords (e.g. `rank`, `member`) before upgrade.",
        "Flags obsolete SQL modes and invalid date formatting.",
        "Provides actionable remediation guidance for zero-downtime upgrades."
      ]
    },
    phase3_reverse_replication: {
      phaseNumber: "Phase 3: Reverse Replication",
      title: "3. Reverse Replication for Instant Disaster Failback",
      badge: "Failback Safety",
      badgeColor: "purple",
      sqlSnippet: `-- 🛡️ REVERSE REPLICATION (INSTANT FAILBACK SAFETY):

-- Immediately upon cutover, configure the OLD source as a REPLICA of NEW target:
-- On OLD Source Server:
CHANGE REPLICATION SOURCE TO
  SOURCE_HOST = 'new-cloud-target.internal',
  SOURCE_USER = 'repl_user',
  SOURCE_PASSWORD = 'ReplPassword#2026',
  SOURCE_AUTO_POSITION = 1;
START REPLICA;

-- If a severe application defect occurs within 24 hours:
-- 1. Set New Cloud Target to super_read_only = ON;
-- 2. Promote Old Source: STOP REPLICA; SET GLOBAL read_only = OFF;
-- 3. Switch DNS back to Old Source with ZERO DATA LOSS! ✅`,
      explanation:
        "Reverse replication streams all post-cutover transactions from the new primary back to the old database. If unexpected bugs emerge, DBAs can execute an instant zero-data-loss failback to the legacy environment.",
      keyTakeaways: [
        "Synchronizes new writes back to the old server continuously.",
        "Guarantees a verified zero-data-loss rollback path.",
        "Provides total operational confidence during high-stakes enterprise migrations."
      ]
    },
    phase4_schema_collation_upgrade: {
      phaseNumber: "Phase 4: Collation & Auth Upgrade",
      title: "4. Schema Modernization: utf8mb4_0900_ai_ci & Auth Plugins",
      badge: "Engine Modernization",
      badgeColor: "rose",
      sqlSnippet: `-- 🌐 1. UPGRADE CHARSET & COLLATION TO UTF8MB4_0900_AI_CI:
ALTER TABLE kolkata_retail.customers 
  CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- 🔑 2. AUTHENTICATION PLUGIN COMPATIBILITY:
-- MySQL 8.0 uses caching_sha2_password by default:
ALTER USER 'app_user'@'%' IDENTIFIED WITH caching_sha2_password BY 'SecurePass#2026';

-- For legacy PHP/Java connectors that do not support SHA-256:
-- ALTER USER 'legacy_app'@'%' IDENTIFIED WITH mysql_native_password BY 'LegacyPass#2026';`,
      explanation:
        "Modernizing schemas during migration involves converting tables to utf8mb4_0900_ai_ci for UCA 9.0 multilingual sorting and configuring caching_sha2_password authentication for secure connection handshakes.",
      keyTakeaways: [
        "utf8mb4_0900_ai_ci provides modern Unicode 9.0 compliance and speed.",
        "caching_sha2_password is the default authentication plugin in MySQL 8.0.",
        "Maintains backward compatibility with legacy connectors when needed."
      ]
    }
  };

  const currentPhase = migrationPhases[selectedMigrationPhase];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.4: Backup, PITR &amp; Data Migration
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 11 of 13
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Database Migration Strategies: <span className="text-emerald-400">Cross-Server</span> &amp; <span className="text-cyan-400">Cloud Cutover</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Mastering mission-critical database migrations in MySQL 8.0: executing the 4-step near-zero-downtime replication cutover, running MySQL Shell pre-upgrade diagnostics (<code>util.checkForServerUpgrade</code>), configuring Reverse Replication for instant zero-data-loss rollback, and modernizing collations.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: Migration Pillars ───────────────────────────── */}
        <section id="migration-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Pillars of Zero-Downtime Migration
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How database architects eliminate application downtime during server and cloud transitions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">Replication Sync</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Streams transactions in background to bring target cloud database to 0 seconds of lag.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">Pre-Upgrade Scan</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                <code>util.checkForServerUpgrade()</code> detects reserved keyword conflicts prior to cutover.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-purple-300 text-base">Sub-30s Cutover</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                <code>super_read_only</code> locks source writes while promoting target and switching DNS.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-rose-300 text-base">Reverse Sync</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Replicates back from new primary to old source for instant zero-data-loss failback.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Migration Strategy Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe the 4-step cutover runbook, upgrade compatibility scans, reverse replication, and charset modernizations.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(migrationPhases).map((phaseKey) => {
              const phase = migrationPhases[phaseKey];
              const isSelected = selectedMigrationPhase === phaseKey;
              return (
                <button
                  key={phaseKey}
                  onClick={() => setSelectedMigrationPhase(phaseKey)}
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
                CLI Command &amp; Migration Runbook Execution:
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
              Migration case studies in Barrackpore and Kolkata demonstrating reserved keyword remediation and 26-second cloud cutovers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Fixing 'rank' Keyword Conflict in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  5.7 &rarr; 8.0 Fixed
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, upgrading a 120GB retail store database to MySQL 8.0 failed because table <code>employee_ratings</code> had an unquoted column named <code>rank</code> (conflicting with MySQL 8.0's <code>RANK()</code> window function). Mamata ran <code>util.checkForServerUpgrade()</code> in MySQL Shell, which flagged the issue. She renamed the column to <code>performance_rank</code>, enabling a clean upgrade.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – 2TB Core Banking Cutover in 26 Seconds in Kolkata
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  26-Second Cutover
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, migrating a 2TB core banking database to AWS Aurora had a strict 60-second maintenance window. Debangshu established GTID replication, verified <code>pt-table-checksum</code> parity, locked the on-premises source with <code>super_read_only</code>, and switched Route53 DNS. The entire cutover completed in 26 seconds with zero dropped connections across ₹500 Crores in daily transaction volume.
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
              Avoid dangerous split-brain write traps and missing reverse replication channels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Using read_only Instead of super_read_only
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Setting only <code>read_only = ON</code> allows administrative accounts or root cron jobs to write stray transactions to the source after DNS switchover, causing data divergence.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always execute SET GLOBAL super_read_only = ON during cutover.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Forgetting Reverse Replication
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                If reverse replication is not configured immediately post-cutover, failing back to the old environment requires taking hours of downtime and manually reconciling lost transactions.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always establish reverse replication from target back to source upon cutover.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Lower DNS TTL 48 Hours Prior
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Lower application database DNS TTL to 5 or 10 seconds 48 hours before the maintenance window to guarantee rapid client cache propagation.
              </p>
              <div className="text-xs text-slate-400">
                Ensures application servers reconnect to the new host in seconds.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Run pt-table-checksum
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Execute <code>pt-table-checksum</code> prior to cutover to cryptographically prove that all table rows on the target match the source 100%.
              </p>
              <div className="text-xs text-slate-400">
                Eliminates uncertainty and proves data integrity before switchover.
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
            title="Topic 11: Database Migration Strategies: Cross-Server, Cross-Version, and Cloud Migration Best Practices"
            content={noteText}
          />

          <Teacher
            note="Database migrations don't have to be stressful when you follow proven engineering runbooks. Always run util.checkForServerUpgrade() in MySQL Shell to catch reserved keywords before upgrading, use continuous replication to keep your cloud target at zero lag, lock your source with super_read_only during switchover, and never cutover without configuring reverse replication so you have a guaranteed zero-data-loss rollback path!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of cross-server migrations, MySQL Shell upgrade checking, replication cutovers, and reverse failbacks.
            </p>
          </div>

          <FAQTemplate
            title="Database Migration Strategies FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic11;
