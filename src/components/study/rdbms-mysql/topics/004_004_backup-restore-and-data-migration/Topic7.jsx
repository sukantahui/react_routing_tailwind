import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";

/**
 * Topic7 – Point-in-Time Recovery (PITR): Restoring Full Backup + Replaying Binary Logs with mysqlbinlog
 * Module: 004_004_backup-restore-and-data-migration
 *
 * @component
 * @returns {JSX.Element} Interactive Point-in-Time Recovery workbench: understanding the 2-step baseline+replay architecture, evaluating position-based vs timestamp-based precision, executing surgical transaction skipping to excise accidental DROPs, and applying --disable-log-bin safety flags in MySQL 8.0.
 */
const Topic7 = () => {
  // Interactive PITR State
  const [selectedPitrPhase, setSelectedPitrPhase] = useState("phase1_pitr_workflow");

  const pitrPhases = {
    phase1_pitr_workflow: {
      phaseNumber: "Phase 1: The 2-Step Workflow",
      title: "1. Baseline Restore + Binary Log Replay Architecture",
      badge: "Core PITR Flow",
      badgeColor: "emerald",
      sqlSnippet: `-- 🔄 THE 2-STEP POINT-IN-TIME RECOVERY WORKFLOW:

-- Step 1: Restore the latest Full Base Backup captured before the disaster:
mysql -u root -p < /backups/midnight_full_base.sql

-- Step 2: Roll forward binary logs to the exact microsecond before the crash:
mysqlbinlog --start-datetime="2026-08-25 00:00:00" \\
            --stop-datetime="2026-08-25 14:29:59" \\
            --disable-log-bin \\
            /var/log/mysql/binlog.000045 /var/log/mysql/binlog.000046 | mysql -u root -p`,
      explanation:
        "Point-in-Time Recovery restores the historical base backup as an anchor, then replays subsequent transactional mutations from the binary logs, bridging the gap between nightly snapshots and achieving near-zero RPO data recovery.",
      keyTakeaways: [
        "Step 1 restores table schemas and initial row baseline state.",
        "Step 2 rolls forward committed transactions using mysqlbinlog.",
        "--disable-log-bin prevents duplicate binary logs on the recovery server."
      ]
    },
    phase2_position_precision: {
      phaseNumber: "Phase 2: Position Precision",
      title: "2. Position-Based Precision vs Timestamp Ambiguity",
      badge: "Byte Precision",
      badgeColor: "cyan",
      sqlSnippet: `-- 📍 POSITION-BASED RECOVERY (100% UNAMBIGUOUS PRECISION):

-- 1. Locate starting position from backup metadata (e.g. 1582):
-- 2. Locate exact position immediately before the destructive DROP (e.g. 928410):

mysqlbinlog --start-position=1582 \\
            --stop-position=928410 \\
            --disable-log-bin \\
            /var/log/mysql/binlog.000045 | mysql -u root -p

-- Why positions beat timestamps:
-- Byte positions pinpoint exact microsecond commits without timezone confusion!`,
      explanation:
        "Timestamps can be ambiguous when multiple transactions commit in the same second. Binary log byte positions (end_log_pos) are strictly sequential and unique, guaranteeing that valid transactions are preserved while destructive commands are excluded.",
      keyTakeaways: [
        "Byte positions eliminate second-level concurrency collision issues.",
        "Immune to system clock skew, daylight saving, and timezone offsets.",
        "Standard best practice for mission-critical financial recovery."
      ]
    },
    phase3_surgical_skipping: {
      phaseNumber: "Phase 3: Surgical Skipping",
      title: "3. Surgically Excising & Skipping Destructive Commands",
      badge: "Transaction Surgery",
      badgeColor: "purple",
      sqlSnippet: `-- ✂️ SURGICALLY REMOVING AN ACCIDENTAL DROP TABLE AT POS 842100:

-- Segment 1: Replay transactions from start up to pre-DROP position (842100):
mysqlbinlog --start-position=1582 --stop-position=842100 --disable-log-bin \\
  /var/log/mysql/binlog.000045 | mysql -u root -p

-- [SKIP THE ACCIDENTAL DROP OCCURRING BETWEEN POS 842100 AND 842350] 🚫

-- Segment 2: Replay transactions from post-DROP position (842350) onwards:
mysqlbinlog --start-position=842350 --disable-log-bin \\
  /var/log/mysql/binlog.000045 /var/log/mysql/binlog.000046 | mysql -u root -p`,
      explanation:
        "When an accidental DROP TABLE or unindexed UPDATE occurs midway through a binary log, surgical two-segment replay applies all valid transactions before AND after the incident, completely excising the single destructive command.",
      keyTakeaways: [
        "Segment 1 replays valid transactions up to the pre-disaster position.",
        "Destructive DDL/DML event is completely bypassed.",
        "Segment 2 replays subsequent valid transactions to current time."
      ]
    },
    phase4_multi_file_streaming: {
      phaseNumber: "Phase 4: Multi-File Safety",
      title: "4. Multi-File Atomic Replay & Decoding Row Events",
      badge: "Multi-File Atomic",
      badgeColor: "rose",
      sqlSnippet: `-- 🛡️ MULTI-FILE REPLAY & ROW EVENT FORENSIC DECODING:

-- 1. Pass all sequential logs in ONE command (Preserves temporary tables):
mysqlbinlog --disable-log-bin \\
  /var/log/mysql/binlog.000045 \\
  /var/log/mysql/binlog.000046 \\
  /var/log/mysql/binlog.000047 | mysql -u root -p

-- 2. Decode ROW-based binary events into readable pseudo-SQL:
mysqlbinlog --base64-output=DECODE-ROWS -v /var/log/mysql/binlog.000045 | \\
  grep -A 8 -B 2 "DROP TABLE"`,
      explanation:
        "Passing multiple binary log files to a single mysqlbinlog command processes them as a continuous session, preserving temporary tables and cross-file transactions. The --base64-output=DECODE-ROWS -v flag decodes binary row streams for forensic inspection.",
      keyTakeaways: [
        "Passing all files to one command maintains session-level state.",
        "DECODE-ROWS -v displays human-readable pseudo-SQL for forensics.",
        "Eliminates session disconnects across binary log boundaries."
      ]
    }
  };

  const currentPhase = pitrPhases[selectedPitrPhase];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.4: Backup, PITR &amp; Data Migration
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 7 of 13
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Point-in-Time Recovery: <span className="text-emerald-400">Full Backup</span> + <span className="text-cyan-400">mysqlbinlog</span> Replay
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Mastering surgical time-travel recovery in MySQL 8.0: executing the 2-step baseline + roll-forward architecture, comparing position-based vs timestamp-based precision, excising destructive transactions without losing subsequent valid data, and ensuring multi-file session safety.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: PITR Architecture Pillars ───────────────────── */}
        <section id="pitr-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Pillars of Point-in-Time Recovery
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How database administrators roll back accidental disasters to the exact microsecond.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">Baseline Anchor</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Restores the latest full physical or logical backup captured prior to the incident.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">Byte Positions</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Pinpoints exact transaction boundaries using byte positions rather than ambiguous timestamps.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-purple-300 text-base">Surgical Skipping</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Skips the single destructive DROP while replaying all valid transactions before and after.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-rose-300 text-base">Session Safety</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                <code>--disable-log-bin</code> prevents duplicate log generation and replication loops.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Point-in-Time Recovery Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe baseline restores, position coordinates, surgical transaction skipping, and forensic decoding.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(pitrPhases).map((phaseKey) => {
              const phase = pitrPhases[phaseKey];
              const isSelected = selectedPitrPhase === phaseKey;
              return (
                <button
                  key={phaseKey}
                  onClick={() => setSelectedPitrPhase(phaseKey)}
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
                CLI Command &amp; Replay Pipeline:
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
              PITR case studies in Barrackpore and Kolkata demonstrating price corruption rollback and surgical DROP excision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Rolling Back Corrupted Price UPDATE in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Zero Data Lost
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, an unindexed script set all retail product prices to ₹0 at 11:42:15 AM. Mamata restored the midnight backup into a temporary sandbox and replayed binary logs up to position 419200 (1 millisecond before the script ran). She exported the pristine product catalog back to production in 4 minutes without disrupting active cashier billing.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Surgical DROP Excision in Kolkata Bank
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  ₹500 Crore Restored
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, a developer accidentally dropped <code>account_balances</code> at position 842100. Debangshu executed a surgical 2-segment binary log replay: Segment 1 recovered all morning ledger transactions up to position 842100; skipping the DROP, Segment 2 recovered all afternoon transactions. All ₹500 Crores in daily deposits were preserved flawlessly.
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
              Avoid dangerous timestamp ambiguity and separate binlog connection traps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Piping Separate mysqlbinlog Commands
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Running <code>mysqlbinlog log1 | mysql; mysqlbinlog log2 | mysql</code> spawns separate sessions, causing temporary tables and cross-file transactions to be lost.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always pass all binary log files in a single mysqlbinlog command.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Forgetting --disable-log-bin on Replay
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Replaying logs without <code>--disable-log-bin</code> generates duplicate binary logs on the target server, filling disk partitions and triggering replication loops.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always include --disable-log-bin when replaying with mysqlbinlog.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Prefer Position-Based Coordinates
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Use <code>--start-position</code> and <code>--stop-position</code> to guarantee microsecond transaction boundaries without timezone ambiguity.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees exact transaction commit precision.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Stream Binary Logs Continuously
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Configure <code>sync_binlog = 1</code> and stream binary logs offsite in real time to guarantee near-zero RPO during hardware destruction.
              </p>
              <div className="text-xs text-slate-400">
                Enables point-in-time recovery up to the exact transaction before failure.
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
            title="Topic 7: Point-in-Time Recovery (PITR): Restoring Full Backup + Replaying Binary Logs with mysqlbinlog"
            content={noteText}
          />

          <Teacher
            note="Point-in-Time Recovery is the ultimate safety net for database administrators. Always remember the 2-step sequence: first restore your full base backup to establish table state, then roll forward binary logs to the exact transaction before the disaster. Use byte positions (--start-position/--stop-position) rather than timestamps for 100% precision, and never forget --disable-log-bin to prevent duplicate replication traffic!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of Point-in-Time Recovery, mysqlbinlog flags, position coordinates, and surgical transaction excision.
            </p>
          </div>

          <FAQTemplate
            title="Point-in-Time Recovery (PITR) FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic7;
