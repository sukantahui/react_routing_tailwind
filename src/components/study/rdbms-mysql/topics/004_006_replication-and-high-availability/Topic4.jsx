import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

/**
 * Topic4 – Setting Up Source-Replica (Master-Slave) Replication Step-by-Step
 * Module: 004_006_replication-and-high-availability
 *
 * @component
 * @returns {JSX.Element} Interactive Source-Replica setup runbook workbench: walking through Source configuration, dedicated user provisioning, Clone Plugin data seeding, Replica hardening (super_read_only), connection handshake, and SHOW REPLICA STATUS verification in MySQL 8.0.
 */
const Topic4 = () => {
  // Interactive Step State
  const [selectedStepKey, setSelectedStepKey] = useState("step1_source_setup");

  const setupSteps = {
    step1_source_setup: {
      stepNumber: "Step 1: Source & User Setup",
      title: "1. Source my.cnf & Dedicated Replication User",
      badge: "Source Configuration",
      badgeColor: "emerald",
      sqlSnippet: `-- ⚙️ 1. SOURCE MY.CNF CONFIGURATION (/etc/mysql/my.cnf):
[mysqld]
server_id = 1
log_bin = mysql-bin
binlog_format = ROW
gtid_mode = ON
enforce_gtid_consistency = ON
log_replica_updates = ON

-- 🔒 2. CREATE REPLICATION USER ON SOURCE:
CREATE USER 'repl_user'@'192.168.1.%' IDENTIFIED BY 'ReplSecurePass#2026' REQUIRE SSL;
GRANT REPLICATION SLAVE ON *.* TO 'repl_user'@'192.168.1.%';
FLUSH PRIVILEGES;`,
      explanation:
        "Configures unique server_id = 1, enables row-based binary logging with GTIDs, and provisions a dedicated replication user restricted by IP subnet and mandatory SSL encryption.",
      keyTakeaways: [
        "Unique server_id = 1 identifies the Source node in the cluster.",
        "ROW binlog format guarantees deterministic event execution.",
        "GRANT REPLICATION SLAVE provides least-privilege telemetry access."
      ]
    },
    step2_clone_seeding: {
      stepNumber: "Step 2: Fast Clone Seeding",
      title: "2. Seeding Replica Data with MySQL 8.0 Clone Plugin",
      badge: "Instant Seeding",
      badgeColor: "cyan",
      sqlSnippet: `# ⚡ INSTANT SEEDING VIA CLONE PLUGIN (ZERO DUMP/RESTORE!):

-- On Source:
INSTALL PLUGIN clone SONAME 'mysql_clone.so';
CREATE USER 'clone_user'@'192.168.1.%' IDENTIFIED BY 'ClonePass#2026';
GRANT BACKUP_ADMIN ON *.* TO 'clone_user'@'192.168.1.%';

-- On Replica:
INSTALL PLUGIN clone SONAME 'mysql_clone.so';
CLONE INSTANCE FROM 'clone_user'@'192.168.1.10':3306 IDENTIFIED BY 'ClonePass#2026';
-- (Replica automatically clones physical data, restarts, and syncs GTIDs!)`,
      explanation:
        "The MySQL 8.0 Clone Plugin copies physical InnoDB tablespaces directly across the network at raw NVMe speeds, auto-configuring GTID executed sets in minutes without locking the primary.",
      keyTakeaways: [
        "Transfers multi-gigabyte databases at wire speed without dumping to SQL.",
        "Automatically synchronizes executed and purged GTID sets.",
        "Replaces slow mysqldump export/import pipelines completely."
      ]
    },
    step3_replica_hardening: {
      stepNumber: "Step 3: Replica Hardening",
      title: "3. Replica my.cnf & super_read_only Protection",
      badge: "Replica Hardening",
      badgeColor: "purple",
      sqlSnippet: `-- ⚙️ REPLICA MY.CNF CONFIGURATION (/etc/mysql/my.cnf):
[mysqld]
server_id = 2
gtid_mode = ON
enforce_gtid_consistency = ON
read_only = ON
super_read_only = ON
relay_log_recovery = ON
master_info_repository = TABLE
relay_log_info_repository = TABLE

-- 🛡️ super_read_only blocks everyone (even root) from writing directly!`,
      explanation:
        "Configures unique server_id = 2, enables crash-safe relay log recovery, stores metadata in InnoDB tables, and locks the replica with super_read_only to prevent data divergence.",
      keyTakeaways: [
        "Unique server_id = 2 prevents node identity collision.",
        "super_read_only = ON blocks accidental direct application writes.",
        "relay_log_recovery = ON guarantees automated recovery after power crashes."
      ]
    },
    step4_handshake_verify: {
      stepNumber: "Step 4: Connection & Verify",
      title: "4. Connection Handshake & SHOW REPLICA STATUS",
      badge: "Connection & Verification",
      badgeColor: "rose",
      sqlSnippet: `-- 🌐 1. CONFIGURE REPLICATION CONNECTION ON REPLICA:
CHANGE REPLICATION SOURCE TO 
  SOURCE_HOST = '192.168.1.10',
  SOURCE_PORT = 3306,
  SOURCE_USER = 'repl_user',
  SOURCE_PASSWORD = 'ReplSecurePass#2026',
  SOURCE_AUTO_POSITION = 1,
  SOURCE_SSL = 1;

-- 🚀 2. START AND VERIFY THREADS:
START REPLICA;
SHOW REPLICA STATUS\\G

-- ✅ Healthy Verification Targets:
-- Replica_IO_Running: Yes
-- Replica_SQL_Running: Yes
-- Seconds_Behind_Source: 0`,
      explanation:
        "Connects the replica to the Source using GTID auto-positioning and SSL encryption, starts both replication threads, and verifies that Replica_IO_Running and Replica_SQL_Running show Yes with zero lag.",
      keyTakeaways: [
        "SOURCE_AUTO_POSITION = 1 enables zero-math GTID synchronization.",
        "SOURCE_SSL = 1 encrypts binary log streams in transit.",
        "SHOW REPLICA STATUS confirms dual-thread execution and 0s lag."
      ]
    }
  };

  const currentStep = setupSteps[selectedStepKey];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.6: Replication, High Availability &amp; Failover
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 4 of 14
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Setting Up <span className="text-emerald-400">Source-Replica Replication</span> Step-by-Step
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Mastering the production deployment runbook for MySQL 8.0: configuring the Source, creating dedicated SSL replication users, seeding initial snapshots via the high-speed Clone Plugin, hardening replicas with <code>super_read_only</code>, and verifying dual-thread health.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: Setup Pillars ───────────────────────────────── */}
        <section id="setup-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Pillars of Replication Setup
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              A standardized, reproducible runbook for deploying enterprise-grade MySQL replication clusters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Phase 1</span>
              <h3 className="font-bold text-white text-base">Source Configuration</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Unique <code>server_id = 1</code>, ROW binary logging, and least-privilege SSL replication user.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Phase 2</span>
              <h3 className="font-bold text-white text-base">Clone Seeding</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                High-speed physical data transfer via MySQL Clone Plugin without dumping to SQL files.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Phase 3</span>
              <h3 className="font-bold text-purple-300 text-base">Replica Hardening</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Enforcing <code>super_read_only = ON</code> and <code>relay_log_recovery = ON</code> in my.cnf.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Phase 4</span>
              <h3 className="font-bold text-rose-300 text-base">Auto-Position Verify</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Connecting with <code>SOURCE_AUTO_POSITION = 1</code> and verifying dual-thread status.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Setup Runbook Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe Source configuration, Clone Plugin seeding commands, Replica hardening, and verification checks.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(setupSteps).map((stepKey) => {
              const step = setupSteps[stepKey];
              const isSelected = selectedStepKey === stepKey;
              return (
                <button
                  key={stepKey}
                  onClick={() => setSelectedStepKey(stepKey)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 border",
                    isSelected
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-950/40"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  )}
                &gt;
                  {step.stepNumber}
                </button>
              );
            })}
          </div>

          {/* Dynamic Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                  Setup Step Runbook
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {currentStep.title}
                </h3>
              </div>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-semibold border w-fit",
                  currentStep.badgeColor === "emerald" && "bg-emerald-950/80 text-emerald-300 border-emerald-700",
                  currentStep.badgeColor === "cyan" && "bg-cyan-950/80 text-cyan-300 border-cyan-700",
                  currentStep.badgeColor === "purple" && "bg-purple-950/80 text-purple-300 border-purple-700",
                  currentStep.badgeColor === "rose" && "bg-rose-950/80 text-rose-300 border-rose-700"
                )}
              >
                {currentStep.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentStep.explanation}
            </p>

            {/* SQL Snippet */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Configuration &amp; SQL Runbook Commands:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                {currentStep.sqlSnippet}
              </pre>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Architectural Takeaways:
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
                {currentStep.keyTakeaways.map((item, i) => (
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
              Replication setup case studies in Barrackpore and Kolkata demonstrating 4-minute Clone seeding and zero-lock mysqldump provisioning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – 4-Minute Replica Provisioning in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Clone Plugin
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, retail store POS terminals required adding a secondary read replica for real-time inventory reporting. Susmita installed the MySQL Clone Plugin and ran <code>CLONE INSTANCE FROM</code>, cloning the 50GB database and establishing GTID replication in under 4 minutes with zero manual export/import steps across ₹1.2 Crores in inventory data.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Non-Locking Seeding in Kolkata Bank
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Zero Lock Impact
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, managing core banking across ₹500 Crores in daily volume required provisioning a disaster recovery replica without interrupting customer transactions. Debangshu used <code>mysqldump --single-transaction --set-gtid-purged=ON</code> to capture a non-locking MVCC snapshot, imported it onto the DR node, and connected with <code>SOURCE_AUTO_POSITION = 1</code> in under 15 minutes.
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
              Avoid duplicate server IDs and unencrypted replication data streams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Duplicate server_id Numbers
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Setting identical <code>server_id</code> on Source and Replica causes the Source to terminate the connection or the replica to drop incoming transactions.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Assign unique server_id numbers across all nodes (Source: 1, Replicas: 2, 3...).
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Unencrypted Replication Streams
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Omitting <code>REQUIRE SSL</code> on the replication user allows binary log streams (including user passwords and financial records) to travel in plaintext across the network.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Enforce REQUIRE SSL on user and SOURCE_SSL = 1 on replication connection.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Use the MySQL 8.0 Clone Plugin
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Leverage <code>CLONE INSTANCE FROM</code> to provision multi-gigabyte replicas in minutes with zero manual export and import overhead.
              </p>
              <div className="text-xs text-slate-400">
                Clones physical tablespaces and auto-configures GTID positions.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Enforce super_read_only on Replicas
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Configure <code>super_read_only = ON</code> to protect replicas against accidental direct write queries from application users and DBAs.
              </p>
              <div className="text-xs text-slate-400">
                Prevents data divergence and duplicate key crashes in replication.
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
            title="Topic 4: Setting Up Source-Replica (Master-Slave) Replication Step-by-Step"
            content={noteText}
          />

          <Teacher
            note="Setting up MySQL replication is a core enterprise DBA skill! Follow the standardized 6-step runbook: configure unique server_id and GTID parameters on both nodes, create a dedicated REPLICATION SLAVE user with REQUIRE SSL, seed data fast using the native MySQL Clone Plugin, enforce super_read_only = ON and relay_log_recovery = ON on the replica, connect using SOURCE_AUTO_POSITION = 1, and verify that Replica_IO_Running and Replica_SQL_Running are both Yes with zero lag!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of Source-Replica provisioning, Clone Plugin seeding, super_read_only protection, and SHOW REPLICA STATUS telemetry.
            </p>
          </div>

          <FAQTemplate
            title="Source-Replica Setup Runbook FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic4;
