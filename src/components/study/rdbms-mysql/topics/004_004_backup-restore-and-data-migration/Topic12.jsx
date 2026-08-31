import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic12_files/topic12_questions";
import noteText from "./topic12_files/topic12_note.txt?raw";

/**
 * Topic12 – Hands-on Disaster Recovery Simulation: Recovering from an Accidental DROP DATABASE
 * Module: 004_004_backup-restore-and-data-migration
 *
 * @component
 * @returns {JSX.Element} Interactive disaster recovery simulation workbench: executing the 6-step emergency incident runbook, rotating active logs with FLUSH BINARY LOGS, restoring base snapshots onto isolated staging, executing position-based PITR to pre-DROP coordinates, and executing zero-data-loss cutovers in MySQL 8.0.
 */
const Topic12 = () => {
  // Interactive DR Simulation State
  const [selectedDrPhase, setSelectedDrPhase] = useState("phase1_emergency_triage");

  const drPhases = {
    phase1_emergency_triage: {
      phaseNumber: "Step 1: Emergency Triage",
      title: "1. Incident Discovery, Isolation & FLUSH BINARY LOGS",
      badge: "T + 2 Mins",
      badgeColor: "emerald",
      sqlSnippet: `-- 🚨 INCIDENT DETECTED: Accidental 'DROP DATABASE kolkata_retail;' at 15:45:22!

-- 1. Rotate binary log immediately (Closes file containing DROP to prevent corruption):
mysqladmin -u root -p flush-binary-logs

-- 2. Display maintenance banner on application frontends:
-- 3. Lock write traffic on live node:
SET GLOBAL super_read_only = ON;`,
      explanation:
        "When disaster strikes, the immediate first action is rotating the binary log with flush-binary-logs. This closes the active file containing the DROP statement and isolates it from subsequent writes.",
      keyTakeaways: [
        "flush-binary-logs closes and preserves the active incident log file.",
        "super_read_only blocks all rogue incoming writes.",
        "Halts application frontends to avoid write conflicts during recovery."
      ]
    },
    phase2_staging_base_restore: {
      phaseNumber: "Step 2 & 3: Base Restore",
      title: "2. Staging Host Setup & Physical Base Restore",
      badge: "T + 10 Mins",
      badgeColor: "cyan",
      sqlSnippet: `-- 📦 RESTORE SUNDAY BASE SNAPSHOT ON ISOLATED STAGING HOST:

-- 1. Unpack compressed xbstream backup:
zstd -dc /backups/base_sunday.xbstream.zst | xbstream -x -C /backups/restore_stage/

-- 2. Execute InnoDB crash recovery prepare:
xtrabackup --prepare --use-memory=8G --target-dir=/backups/restore_stage/

-- 3. Copy files to staging data directory & boot MySQL:
rm -rf /var/lib/mysql/*
xtrabackup --copy-back --target-dir=/backups/restore_stage/
chown -R mysql:mysql /var/lib/mysql
systemctl start mysqld`,
      explanation:
        "Recovery is executed on an isolated staging server to prevent application connection collisions. The physical base snapshot is prepared with 8GB RAM and booted in under 10 minutes.",
      keyTakeaways: [
        "Unpack and prepare base backup on a clean staging host.",
        "--use-memory=8G accelerates crash recovery replay to under 2 minutes.",
        "MySQL is booted cleanly on the isolated recovery instance."
      ]
    },
    phase3_pinpoint_and_replay: {
      phaseNumber: "Step 4 & 5: PITR Replay",
      title: "3. Pinpoint Pre-DROP Position & Replay Logs",
      badge: "T + 20 Mins",
      badgeColor: "purple",
      sqlSnippet: `-- 🔍 STEP 4: FIND EXACT PRE-DROP STARTING BYTE:
mysqlbinlog --base64-output=DECODE-ROWS -v binlog.000105 | \\
  grep -n -C 5 -i "DROP DATABASE \`kolkata_retail\`"
-- Output: '# at 849201' is the byte offset immediately BEFORE the DROP begins!

-- ⚡ STEP 5: REPLAY CONTINUOUS BINARY LOG CHAIN TO BYTE 849201:
mysqlbinlog --start-position=1582 --disable-log-bin \\
  binlog.000100 binlog.000101 binlog.000102 binlog.000103 binlog.000104 \\
  --stop-position=849201 binlog.000105 | mysql -u root -p`,
      explanation:
        "Forensic inspection identifies that the DROP DATABASE statement began at byte 849201. mysqlbinlog replays all transactions from Sunday through Tuesday, stopping at byte 849201 right before the DROP.",
      keyTakeaways: [
        "Grep locates exact pre-disaster byte offset (# at 849201).",
        "Replays continuous multi-day log stream in a single command.",
        "--disable-log-bin prevents duplicate binary logs on staging."
      ]
    },
    phase4_verification_and_cutover: {
      phaseNumber: "Step 6: Parity & Cutover",
      title: "4. Data Parity Validation & Route53 DNS Cutover",
      badge: "T + 26 Mins (RPO=0s)",
      badgeColor: "rose",
      sqlSnippet: `-- ✅ STEP 6: VERIFY ROW PARITY & PROMOTE STAGING TO PRIMARY:

-- 1. Validate table row counts and maximum transaction timestamps:
SELECT 'orders', COUNT(*), MAX(order_date) FROM kolkata_retail.orders
UNION ALL
SELECT 'customers', COUNT(*), MAX(created_at) FROM kolkata_retail.customers;

-- 2. Promote Staging Instance to Primary Master:
RESET REPLICA ALL;
SET GLOBAL read_only = OFF;

-- 3. Repoint Route53 DNS / ProxySQL:
-- CNAME 'db.kolkata-retail.internal' → staging-primary.internal!

-- RESULT: Total Outage = 26 Mins (RTO), Data Loss = 0 Seconds (RPO)! ⚡`,
      explanation:
        "Sanity checks verify row counts and foreign keys. The staging server is promoted to primary master, and DNS is repointed to complete the cutover in 26 minutes with zero data loss.",
      keyTakeaways: [
        "Row count validation proves 100% data integrity before cutover.",
        "RESET REPLICA ALL promotes the staging instance to primary master.",
        "Achieves 26-minute RTO and 0-second RPO across ₹100 Crores in volume."
      ]
    }
  };

  const currentPhase = drPhases[selectedDrPhase];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.4: Backup, PITR &amp; Data Migration
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 12 of 13
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
          Disaster Recovery Simulation: <span className="text-rose-400">Accidental DROP DATABASE</span> Recovery
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Hands-on end-to-end disaster recovery simulation in MySQL 8.0: executing the 6-step emergency triage runbook, rotating active logs with <code>flush-binary-logs</code>, restoring base snapshots onto isolated staging, executing position-based PITR to pre-DROP coordinates, and executing zero-data-loss cutovers.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: DR Runbook Pillars ──────────────────────────── */}
        <section id="dr-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Pillars of Disaster Recovery Mastery
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How database engineers rescue production databases under high-pressure catastrophic failure scenarios.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">Rapid Triage</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                <code>flush-binary-logs</code> immediately closes and preserves the incident log file.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">Isolated Staging</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Restores base backup on a dedicated staging host to avoid live application write collisions.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-purple-300 text-base">Pre-DROP Offset</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Pinpoints the exact byte position (<code># at 849201</code>) before the DROP began.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-rose-300 text-base">Zero RPO Cutover</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Verifies parity and executes DNS switchover in 26 minutes with zero data loss.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Disaster Recovery Simulation Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe the chronological 6-step recovery runbook, log rotation, staging preparation, and DNS cutover.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(drPhases).map((phaseKey) => {
              const phase = drPhases[phaseKey];
              const isSelected = selectedDrPhase === phaseKey;
              return (
                <button
                  key={phaseKey}
                  onClick={() => setSelectedDrPhase(phaseKey)}
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
                CLI Command &amp; Runbook Pipeline:
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
              Disaster recovery simulations in Barrackpore and Kolkata demonstrating 20-minute retail recovery and ProxySQL query firewall protection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – 20-Minute Storefront Recovery in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  RTO: 20m, RPO: 0s
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, a flawed CI/CD pipeline dropped database <code>barrackpore_store</code> at 15:45:00 on Tuesday. Mamata rotated binary logs, restored Sunday's XtraBackup on a standby node, and replayed binary logs up to position 849201. The entire store database was restored and back online in 20 minutes with zero lost customer purchases across ₹1.2 Crores in sales.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – ProxySQL Query Firewall Protection in Kolkata
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Attack Blocked
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, an unauthorized script attempted to execute <code>DROP DATABASE kolkata_bank;</code> through an application connection. Debangshu's pre-configured ProxySQL query firewall rule intercepted the statement regex and returned an immediate error, protecting ₹500 Crores in banking records from being deleted without requiring any disaster recovery invocation.
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
              Avoid dangerous in-place live restores and stop-position offset mistakes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Attempting In-Place Recovery on Live Primary
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Restoring directly onto the live production host while background application jobs are attempting writes causes fatal primary key collisions and data corruption.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always perform disaster recovery on an isolated staging server.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Setting Stop Position After the DROP Query
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Specifying the <code>end_log_pos</code> of the DROP query instructs mysqlbinlog to execute the DROP, re-deleting the restored database on staging!
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always stop at the &apos;# at &lt;pos&gt;&apos; offset immediately preceding the DROP statement.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Deploy Delayed Replicas
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Configure a dedicated replica with <code>SOURCE_DELAY = 14400</code> (4 hours) to maintain a live, rolling 4-hour safety buffer against human errors.
              </p>
              <div className="text-xs text-slate-400">
                Allows stopping replication before destructive DDL queries execute.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Conduct Quarterly Fire Drills
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Simulate accidental <code>DROP DATABASE</code> recovery scenarios in staging environments quarterly to validate backup archives and keep engineers prepared.
              </p>
              <div className="text-xs text-slate-400">
                Eliminates panic and guarantees sub-30 minute recovery in production outages.
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
            title="Topic 12: Hands-on Disaster Recovery Simulation: Recovering from an Accidental DROP DATABASE"
            content={noteText}
          />

          <Teacher
            note="Disaster recovery is the ultimate test of a database professional's skill. When an accidental DROP DATABASE occurs, stay calm and follow the 6-step runbook: immediately rotate binary logs with flush-binary-logs to freeze the incident log, restore your base backup onto an isolated staging server, locate the pre-DROP byte offset (# at <pos>), replay the continuous binary log chain with --disable-log-bin, verify row counts, and execute DNS cutover to achieve 100% data recovery with zero lost transactions!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of disaster recovery simulations, log rotation, staging restores, position pinpointing, and proxy cutovers.
            </p>
          </div>

          <FAQTemplate
            title="Disaster Recovery Simulation FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic12;
