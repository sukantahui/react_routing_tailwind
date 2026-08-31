import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

/**
 * Topic5 – InnoDB Redo Log (WAL - Write-Ahead Logging) and Crash Recovery Mechanics
 * Module: 004_001_storage-engines-and-architecture
 *
 * @component
 * @returns {JSX.Element} Interactive WAL and Crash Recovery workbench: exploring the circular Redo Log ring buffer, Log Sequence Number (LSN) checkpoints, Checkpoint Age write stalls, the 3-step crash recovery replay pipeline, and online dynamic redo log capacity sizing in MySQL 8.0.
 */
const Topic5 = () => {
  // Interactive Phase State
  const [selectedRecoveryPhase, setSelectedRecoveryPhase] = useState("phase1_wal_pipeline");

  const recoveryPhases = {
    phase1_wal_pipeline: {
      phaseNumber: "Phase 1: WAL Pipeline",
      title: "1. Write-Ahead Logging (WAL): Fast Sequential Logging Pipeline",
      badge: "WAL Sequential I/O",
      badgeColor: "emerald",
      sqlSnippet: `-- ⚡ WRITE-AHEAD LOGGING (WAL) TRANSACTION PIPELINE:
-- When a transaction updates a row:
START TRANSACTION;
UPDATE accounts SET balance_inr = balance_inr - 5000.00 WHERE account_id = 101;

-- 1. 16KB Data page in Buffer Pool is modified in RAM (becomes a Dirty Page).
-- 2. Physiological redo log record is staged in the Log Buffer (RAM).
-- 3. On COMMIT: Redo record is sequentially flushed to #ib_redo* on disk.
COMMIT; -- Acknowledged immediately! No random disk page write needed!

-- 4. Page Cleaner background thread flushes the dirty 16KB page to disk LATER.`,
      metricsTable: [
        { metric: "Log Format", value: "Physiological (Page ID + Row Delta)", role: "Compact physical byte records for exact replay" },
        { metric: "I/O Pattern", value: "Pure Sequential Append", role: "Orders of magnitude faster than random disk page writes" },
        { metric: "Durability Trigger", value: "innodb_flush_log_at_trx_commit = 1", role: "Synchronously fsynced on transaction commit" },
        { metric: "LSN Increment", value: "Byte length of redo entry", role: "Advances global Log Sequence Number" }
      ],
      explanation:
        "Write-Ahead Logging (WAL) guarantees transaction durability with maximum throughput. Instead of performing slow random 16KB writes across tablespaces, InnoDB writes small sequential redo records to disk, acknowledging commits in microseconds."
    },
    phase2_circular_ring: {
      phaseNumber: "Phase 2: Circular Log Ring",
      title: "2. Circular Redo Log Ring & Checkpoint Age Management",
      badge: "Circular Ring & LSN",
      badgeColor: "cyan",
      sqlSnippet: `-- 🔄 MONITORING CHECKPOINT AGE & REDO CAPACITY:
-- 1. Inspect LSN Milestones:
SHOW ENGINE INNODB STATUS\\G
-- Look at LOG section:
--   Log sequence number          10500000000 (Current LSN in RAM)
--   Log flushed up to            10500000000 (Flushed to disk redo log)
--   Pages flushed up to          10450000000 (Oldest dirty page LSN flushed)
--   Last checkpoint at           10400000000 (Checkpoint LSN)

-- 2. Calculate Checkpoint Age:
-- Checkpoint Age = Log sequence number - Last checkpoint at
-- Checkpoint Age = 10500000000 - 10400000000 = 100,000,000 bytes (~95.3 MB)

-- 3. Dynamic Redo Capacity Sizing (MySQL 8.0.30+):
SET GLOBAL innodb_redo_log_capacity = 8589934592; -- 8 GB Capacity!`,
      metricsTable: [
        { metric: "Log Sequence Number", value: "Monotonically increasing LSN", role: "Global counter of cumulative redo bytes" },
        { metric: "Checkpoint LSN", value: "Safe flushed boundary", role: "Older redo log records can be safely overwritten" },
        { metric: "Checkpoint Age", value: "Current LSN - Checkpoint LSN", role: "Measures uncheckpointed redo volume" },
        { metric: "Sync Flush Stall", value: "Triggers if Age &gt; 75% Capacity", role: "Throttles client writes to prevent log overwrite" }
      ],
      explanation:
        "The Redo Log operates as a circular ring buffer. As long as Checkpoint Age stays well below total Redo Log Capacity, transactions write at full speed. Sizing `innodb_redo_log_capacity` for 1-2 hours of peak traffic prevents synchronous write stalls."
    },
    phase3_crash_recovery: {
      phaseNumber: "Phase 3: 3-Step Crash Recovery",
      title: "3. The 3-Step Automatic Crash Recovery Pipeline",
      badge: "Automatic Recovery",
      badgeColor: "amber",
      sqlSnippet: `-- 🛡️ INNODB 3-STEP CRASH RECOVERY WORKFLOW:
-- Executed automatically when MySQL starts up after a power cut:

-- STEP 1: DOUBLEWRITE VALIDATION
--   Checks 16KB page checksums; if a torn page is found,
--   restores the pristine page copy from the Doublewrite Buffer.

-- STEP 2: REDO LOG ROLL-FORWARD (Durability)
--   Scans #ib_redo* from Last Checkpoint LSN forward to crash point.
--   Reapplies all committed physical changes to 16KB Buffer Pool pages.

-- STEP 3: UNDO LOG ROLL-BACK (Atomicity)
--   Scans active transactions from Undo rollback segments.
--   Reverses modifications for all uncommitted in-flight transactions.

-- Result: 100% ACID consistency achieved with zero data loss!`,
      metricsTable: [
        { metric: "Step 1: Torn Page Fix", value: "Doublewrite Buffer check", role: "Eliminates partial page write corruption" },
        { metric: "Step 2: Redo Roll-Forward", value: "Replays committed WAL entries", role: "Restores committed state up to crash point" },
        { metric: "Step 3: Undo Roll-Back", value: "Reverts uncommitted transactions", role: "Enforces all-or-nothing Atomicity" },
        { metric: "Recovery Duration", value: "Proportional to Checkpoint Age", role: "Typically takes 2 to 30 seconds" }
      ],
      explanation:
        "InnoDB's crash recovery pipeline ensures 100% database integrity without manual intervention: torn pages are repaired, committed changes are rolled forward from the Redo Log, and uncommitted changes are rolled back using the Undo Log."
    },
    phase4_disaster_recovery: {
      phaseNumber: "Phase 4: Disaster Recovery",
      title: "4. Emergency Disaster Recovery (innodb_force_recovery)",
      badge: "Emergency Runbook",
      badgeColor: "rose",
      sqlSnippet: `-- 🚨 EMERGENCY DISASTER RECOVERY (Hardware / Disk Corruption):
-- If severe hardware failure prevents normal startup, configure in my.cnf:
-- [mysqld]
-- innodb_force_recovery = 1 -- (Levels 1 to 6)

-- Level 1: Ignores corrupt 16KB pages and continues startup.
-- Level 2: Disables Master Thread background purge.
-- Level 3: Bypasses Undo transaction rollback.
-- Level 4: Bypasses Change Buffer merges and AHI.
-- Level 5: Disables Undo Log inspection; treats all transactions as committed.
-- Level 6: Disables Redo Log roll-forward completely.

-- ⚠️ EMERGENCY PROTOCOL:
-- Start server in read-only mode → Export full mysqldump → Re-init database!`,
      metricsTable: [
        { metric: "Level 1-3", value: "Skips corrupt pages & undo rollback", role: "Allows read-only export of healthy tables" },
        { metric: "Level 4-6", value: "Bypasses all logs & redo replay", role: "Last resort for severely damaged filesystems" },
        { metric: "Operational Mode", value: "READ-ONLY Degradation", role: "Blocks all write transactions (INSERT/UPDATE)" },
        { metric: "Post-Recovery Action", value: "mysqldump & clean rebuild", role: "Never run production on forced recovery mode" }
      ],
      explanation:
        "`innodb_force_recovery` (values 1-6) is the ultimate emergency tool for DBAs to start InnoDB in degraded read-only mode after severe hardware corruption, allowing data extraction via `mysqldump`."
    }
  };

  const navItems = [
    { id: "wal-overview", label: "1. WAL Pipeline Overview" },
    { id: "circular-diagram", label: "2. Circular Redo Ring Diagram" },
    { id: "interactive-workbench", label: "3. WAL & Recovery Workbench" },
    { id: "case-studies", label: "4. Real-World Case Studies" },
    { id: "pitfalls-rules", label: "5. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "6. Redo Log Tuning Checklist" },
    { id: "faq-section", label: "7. FAQs (30 Deep Questions)" },
    { id: "teacher-notes", label: "8. Printable Note & Teacher's Observation" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-900 pb-20">
      {/* Header Banner */}
      <header className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-2">
            <span>Module 004_001</span>
            <span>•</span>
            <span>Topic 5 of 12</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              WAL &amp; Crash Recovery
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            InnoDB Redo Log (WAL - Write-Ahead Logging) and Crash Recovery Mechanics
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master the engine of MySQL durability: explore Write-Ahead Logging (WAL), circular Redo Log ring buffers, Log Sequence Number (LSN) checkpoints, and the 3-step crash recovery pipeline (Doublewrite check → Redo roll-forward → Undo roll-back).
          </p>
        </div>
      </header>

      {/* Navigation Quick Links */}
      <nav className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2 overflow-x-auto text-xs sm:text-sm font-medium scrollbar-thin scrollbar-thumb-slate-700">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-cyan-600/30 hover:text-cyan-300 text-slate-300 transition-all duration-300 border border-slate-700/50 hover:border-cyan-500/40"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        {/* SECTION 1: WAL Overview */}
        <section id="wal-overview" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Write-Ahead Logging (WAL) Architecture
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Transforming slow random disk page writes into ultra-fast sequential log appends.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                Step 1: RAM Mutation
              </span>
              <h3 className="font-bold text-white text-base">Buffer Pool Dirty Page</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                The 16KB data page is modified in RAM instantly. A compact physiological change record is created in the Log Buffer.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                Step 2: Sequential WAL
              </span>
              <h3 className="font-bold text-white text-base">Redo Log Append</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                On transaction commit, the redo record is sequentially written and synced to disk, guaranteeing ACID Durability before client response.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                Step 3: Background Flush
              </span>
              <h3 className="font-bold text-white text-base">Page Cleaner Flush</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Background Page Cleaner threads flush dirty 16KB pages to disk tablespaces asynchronously, advancing the Checkpoint LSN.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Circular Redo Ring Diagram */}
        <section id="circular-diagram" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Visual Anatomy: Circular Redo Ring &amp; Checkpoint Age
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Tracing Log Sequence Numbers (LSN) and how Checkpoint Age determines write throughput.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-cyan-300">
                Figure 5.1: Circular Redo Log Ring &amp; Checkpoint Progress
              </h3>
              <span className="text-xs text-slate-400 font-mono">Redo Log Ring Buffer</span>
            </div>

            <div className="w-full overflow-x-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
              <svg
                viewBox="0 0 950 360"
                className="w-full max-w-4xl mx-auto block font-sans"
                style={{ minWidth: "700px" }}
              >
                <defs>
                  <marker id="arrWalCyan" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <polygon points="0 0, 8 4, 0 8" fill="#38bdf8" />
                  </marker>
                </defs>

                {/* Left: Circular Ring Visualization */}
                <rect x="30" y="40" width="420" height="280" rx="8" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="240" y="70" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">
                  CIRCULAR REDO LOG RING (innodb_redo_log_capacity)
                </text>
                <line x1="30" y1="85" x2="450" y2="85" stroke="#334155" />

                <circle cx="240" cy="190" r="85" fill="#1e293b" stroke="#334155" strokeWidth="12" />
                <circle cx="240" cy="190" r="85" fill="none" stroke="#10b981" strokeWidth="12" strokeDasharray="250 500" />
                <circle cx="240" cy="190" r="85" fill="none" stroke="#f59e0b" strokeWidth="12" strokeDasharray="120 500" strokeDashoffset="-250" />

                <text x="240" y="180" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">CHECKPOINT AGE</text>
                <text x="240" y="198" fill="#bae6fd" fontSize="10" textAnchor="middle">Uncheckpointed WAL</text>
                <text x="240" y="215" fill="#94a3b8" fontSize="9" textAnchor="middle">Free Capacity: 65%</text>

                {/* Right: LSN Milestone Breakdown */}
                <rect x="490" y="40" width="430" height="280" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                <text x="705" y="70" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">
                  LSN MILESTONES (SHOW ENGINE INNODB STATUS)
                </text>
                <line x1="490" y1="85" x2="920" y2="85" stroke="#334155" />

                <rect x="510" y="100" width="390" height="42" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="525" y="120" fill="#a7f3d0" fontSize="10" fontWeight="bold">1. Log Sequence Number (Current LSN)</text>
                <text x="525" y="134" fill="#94a3b8" fontSize="9">Highest byte offset written to memory in RAM</text>

                <rect x="510" y="150" width="390" height="42" rx="4" fill="#1e293b" stroke="#0284c7" />
                <text x="525" y="170" fill="#bae6fd" fontSize="10" fontWeight="bold">2. Log Flushed Up To (Durable LSN)</text>
                <text x="525" y="184" fill="#94a3b8" fontSize="9">Highest LSN flushed and fsynced to on-disk redo files</text>

                <rect x="510" y="200" width="390" height="42" rx="4" fill="#1e293b" stroke="#d97706" />
                <text x="525" y="220" fill="#fde68a" fontSize="10" fontWeight="bold">3. Pages Flushed Up To</text>
                <text x="525" y="234" fill="#94a3b8" fontSize="9">Oldest dirty page in Flush List awaiting tablespace write</text>

                <rect x="510" y="250" width="390" height="45" rx="4" fill="#1e293b" stroke="#10b981" />
                <text x="525" y="270" fill="#34d399" fontSize="10" fontWeight="bold">4. Last Checkpoint At (Safe Overwrite Boundary)</text>
                <text x="525" y="284" fill="#bae6fd" fontSize="9">All dirty pages up to this LSN are safe on disk tablespaces</text>
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 3: WAL & Recovery Workbench */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Interactive WAL &amp; Recovery Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Select a recovery phase to inspect operational scripts, LSN metrics, and crash recovery runbooks.
            </p>
          </div>

          {/* Tab Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {Object.keys(recoveryPhases).map((key) => {
              const phase = recoveryPhases[key];
              const isSelected = selectedRecoveryPhase === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedRecoveryPhase(key)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 border flex items-center gap-2",
                    isSelected
                      ? "bg-cyan-600/30 text-cyan-300 border-cyan-500 shadow-lg shadow-cyan-950/50"
                      : "bg-slate-900/80 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200"
                  )}
                >
                  <span
                    className={clsx(
                      "w-2.5 h-2.5 rounded-full",
                      phase.badgeColor === "emerald" && "bg-emerald-400",
                      phase.badgeColor === "cyan" && "bg-cyan-400",
                      phase.badgeColor === "amber" && "bg-amber-400",
                      phase.badgeColor === "rose" && "bg-rose-400"
                    )}
                  />
                  <span>{phase.phaseNumber}</span>
                </button>
              );
            })}
          </div>

          {/* Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {recoveryPhases[selectedRecoveryPhase].title}
              </h3>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-bold self-start sm:self-auto",
                  recoveryPhases[selectedRecoveryPhase].badgeColor === "emerald" &&
                    "bg-emerald-950 text-emerald-300 border border-emerald-800",
                  recoveryPhases[selectedRecoveryPhase].badgeColor === "cyan" &&
                    "bg-cyan-950 text-cyan-300 border border-cyan-800",
                  recoveryPhases[selectedRecoveryPhase].badgeColor === "amber" &&
                    "bg-amber-950 text-amber-300 border border-amber-800",
                  recoveryPhases[selectedRecoveryPhase].badgeColor === "rose" &&
                    "bg-rose-950 text-rose-300 border border-rose-800"
                )}
              >
                {recoveryPhases[selectedRecoveryPhase].badge}
              </span>
            </div>

            {/* SQL Script Block */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                WAL &amp; Crash Recovery Diagnostic Commands:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                {recoveryPhases[selectedRecoveryPhase].sqlSnippet}
              </pre>
            </div>

            {/* Metrics Table */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Technical Execution Properties:
              </span>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                  <thead className="bg-slate-900/80 text-cyan-400 font-mono uppercase text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4">Architecture Property</th>
                      <th className="py-2.5 px-4">Configuration &amp; Value</th>
                      <th className="py-2.5 px-4">Engineering Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-xs">
                    {recoveryPhases[selectedRecoveryPhase].metricsTable.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/50">
                        <td className="py-3 px-4 font-bold text-white font-sans">{row.metric}</td>
                        <td className="py-3 px-4 text-cyan-300">{row.value}</td>
                        <td className="py-3 px-4 text-slate-300 font-sans">{row.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Explanation Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                Engineering Assessment:
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {recoveryPhases[selectedRecoveryPhase].explanation}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Real-World Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Real-World Crash Recovery Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Overcoming write stalls and power outages in Barrackpore and Kolkata enterprises.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case 1: Mamata & Susmita's Redo Capacity Tuning */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Eliminating Redo Write Stalls During Flash Sale in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Write Stalls Eliminated
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                During a high-concurrency admission rush in Barrackpore, MySQL suffered from periodic 5-second query freezes because default redo log capacity (100MB) was filling up every 40 seconds, triggering aggressive synchronous page flushing. Increasing `innodb_redo_log_capacity = 8GB` expanded the circular ring, allowing write bursts to proceed without any synchronous stalls.
              </p>
            </div>

            {/* Case 2: Abhronila & Debangshu's Crash Recovery Verification */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – 100% Recovery of 500 Uncommitted Transactions in Kolkata Hub
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  100% ACID Integrity
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                When a UPS battery bank failed during peak banking hours in Kolkata, 500 active transactions were mid-execution. Upon server reboot, InnoDB replayed the Redo Log roll-forward to restore all committed transactions, then rolled back the 500 uncommitted in-flight transactions using the Undo Log in 12 seconds, resulting in zero balance discrepancies.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: Senior Pitfalls & Best Practices */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Senior Pitfalls &amp; Production Best Practices
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Avoid dangerous Redo Log and crash recovery pitfalls.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Leaving Redo Capacity Undersized
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                An undersized Redo Log capacity causes frequent synchronous flush freezes where all application write queries stall while InnoDB forces dirty pages to disk.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Size `innodb_redo_log_capacity` for 1-2 hours of peak writes.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Deleting #innodb_redo Files After a Crash
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Deleting redo log files from the OS filesystem after an unexpected crash permanently destroys uncheckpointed committed data, corrupting the database.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Never delete redo logs manually; let InnoDB replay recovery automatically.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Monitor Checkpoint Age
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Track `Checkpoint Age` in `SHOW ENGINE INNODB STATUS`. Ensure Checkpoint Age remains below 70% of total Redo Log capacity under heavy load.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees smooth asynchronous background page flushing.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Leverage Dynamic Sizing
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                In MySQL 8.0.30+, resize redo log capacity online via `SET GLOBAL innodb_redo_log_capacity` without any server restarts or scheduled maintenance windows.
              </p>
              <div className="text-xs text-slate-400">
                Provides instant zero-downtime scalability for festive traffic surges.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Redo Log Tuning Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. DBA Redo Log Tuning Checklist
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key recovery parameters to verify on high-throughput database servers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Redo Log Audit Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-emerald-400">Capacity Sized</strong> = `innodb_redo_log_capacity` set to 1-2 hours of peak write volume.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-400">Flush Policy</strong> = `innodb_flush_log_at_trx_commit = 1` for 100% ACID durability.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold font-mono">03.</span>
                  <span><strong className="text-amber-400">Checkpoint Age</strong> = Monitored regularly to prevent write flush stalls.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold font-mono">04.</span>
                  <span><strong className="text-rose-400">Log Buffer</strong> = Sized at 16M-64M to buffer batch transactions before disk sync.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe LSN rate of change...”</span>
                  By measuring the difference in `Log sequence number` over a 1-minute window, you can determine the exact write throughput of your application in megabytes per second!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about Crash Recovery as a safety net...”</span>
                  WAL allows you to configure aggressive in-memory caching because the Redo Log guarantees that not a single byte of committed data will be lost even if the physical server plug is pulled!
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              7. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comprehensive reference questions covering the InnoDB Redo Log and Crash Recovery Mechanics.
            </p>
          </div>

          <FAQTemplate
            title="InnoDB Redo Log & Crash Recovery FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint & Teacher's Note */}
        <section id="teacher-notes" className="space-y-8">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              8. Printable Topic Note &amp; Teacher's Observation
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Download clean text documentation for revision and study Sukanta Hui's direct pedagogical insights.
            </p>
          </div>

          <PlainTextPrint
            content={noteText}
            title="InnoDB Redo Log (WAL - Write-Ahead Logging) and Crash Recovery Mechanics"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic5_note.txt"
          />

          <Teacher
            note="Write-Ahead Logging (WAL) is the cornerstone of modern database durability. If MySQL had to write every 16KB data page to random disk locations synchronously on every COMMIT, enterprise databases could barely handle 100 transactions per second. With WAL, InnoDB writes small, sequential redo records in microseconds, deferring disk page flushing to background Page Cleaners. And if a power failure occurs, the 3-step crash recovery pipeline brings everything back to 100% ACID consistency in seconds. That is the true elegance of database architecture!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic5;
