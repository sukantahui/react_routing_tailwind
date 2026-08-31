import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";

/**
 * Topic8 – Locating Binary Log Positions and Restoring to a Specific Timestamp / Position
 * Module: 004_004_backup-restore-and-data-migration
 *
 * @component
 * @returns {JSX.Element} Interactive binary log inspection workbench: decoding binary log event headers, applying the 3-step formula to pinpoint pre-disaster byte offsets, comparing live SQL inspection against offline CLI parsing, and executing position-based roll-forwards in MySQL 8.0.
 */
const Topic8 = () => {
  // Interactive Position State
  const [selectedPositionPhase, setSelectedPositionPhase] = useState("phase1_event_anatomy");

  const positionPhases = {
    phase1_event_anatomy: {
      phaseNumber: "Phase 1: Event Anatomy",
      title: "1. Anatomy of a Binary Log Event Record",
      badge: "Header Structure",
      badgeColor: "emerald",
      sqlSnippet: `-- 🔬 ANATOMY OF A BINARY LOG EVENT RECORD:

# at 928410                                     <-- Starting Byte Position
#260825 14:30:00 server id 1  end_log_pos 928520 CRC32 0x7a81b901
Query   thread_id=452   exec_time=0   error_code=0
use \`kolkata_ecommerce\`/*!*/;
SET TIMESTAMP=1787649000/*!*/;
DROP TABLE orders                               <-- Destructive Disaster Statement!
/*!*/;
# at 928520                                     <-- Ending Byte Position`,
      explanation:
        "Every binary log event begins with # at <pos> (starting byte offset) and documents the server ID, timestamp, end_log_pos, CRC32 checksum, and query payload. Point-in-Time Recovery targets the exact starting byte offset of the destructive statement.",
      keyTakeaways: [
        "# at <pos> is the starting byte offset in the binary log file.",
        "end_log_pos marks the boundary where the next event begins.",
        "CRC32 verifies event data integrity on physical disk."
      ]
    },
    phase2_three_step_formula: {
      phaseNumber: "Phase 2: The 3-Step Formula",
      title: "2. The 3-Step Formula to Pinpoint Stop Coordinates",
      badge: "Coordinate Pinpointing",
      badgeColor: "cyan",
      sqlSnippet: `-- 🎯 THE 3-STEP RECOVERY POSITION FORMULA:

-- Step 1: Search binary log for destructive query text:
mysqlbinlog --base64-output=DECODE-ROWS -v /var/log/mysql/binlog.000045 | \\
  grep -n -C 5 -i "DROP TABLE orders"

-- Step 2: Note the starting '# at <pos>' immediately preceding the DROP:
-- Result found: '# at 928410'

-- Step 3: Execute position-based roll-forward stopping at 928410:
mysqlbinlog --start-position=1582 \\
            --stop-position=928410 \\
            --disable-log-bin \\
            /var/log/mysql/binlog.000045 | mysql -u root -p`,
      explanation:
        "The 3-step formula guarantees that all legitimate transactions committed up to the microsecond before the disaster are replayed, while stopping immediately before the destructive command can execute.",
      keyTakeaways: [
        "Step 1: Grep binary log for the destructive query text.",
        "Step 2: Identify the preceding '# at <pos>' starting byte.",
        "Step 3: Set --stop-position to that byte offset."
      ]
    },
    phase3_sql_vs_cli_inspection: {
      phaseNumber: "Phase 3: SQL vs CLI Inspection",
      title: "3. Live SQL Inspection vs Offline Forensic CLI Parsing",
      badge: "Inspection Tools",
      badgeColor: "purple",
      sqlSnippet: `-- 🔍 1. LIVE SQL INSPECTION (On running database server):
SHOW BINARY LOGS;
SHOW BINLOG EVENTS IN 'binlog.000045' FROM 1582 LIMIT 20;

-- 📜 2. OFFLINE FORENSIC CLI INSPECTION (On binary files):
mysqlbinlog --base64-output=DECODE-ROWS -vv \\
  --start-datetime="2026-08-25 14:00:00" \\
  --stop-datetime="2026-08-25 14:35:00" \\
  /var/log/mysql/binlog.000045 > /tmp/audit_incident.sql`,
      explanation:
        "SHOW BINLOG EVENTS provides fast, live query inspection of active server logs. mysqlbinlog with DECODE-ROWS -vv decodes raw row mutations into human-readable pseudo-SQL with full column data types for forensic analysis.",
      keyTakeaways: [
        "SHOW BINLOG EVENTS queries active log coordinates via SQL.",
        "DECODE-ROWS -vv renders human-readable pseudo-SQL for forensic review.",
        "Allows generating preview SQL scripts before execution."
      ]
    },
    phase4_gtid_vs_position: {
      phaseNumber: "Phase 4: GTID Precision",
      title: "4. GTID Transaction Skipping vs Byte Offsets",
      badge: "GTID Precision",
      badgeColor: "rose",
      sqlSnippet: `-- ⚡ SKIPPING TRANSACTIONS VIA GTID IN MYSQL 8.0:

-- 1. Locate the exact GTID of the destructive transaction:
-- SET @@SESSION.GTID_NEXT= '3e11fa47-71ca-11eb-9876-0242ac120002:58204';
-- DROP TABLE orders;

-- 2. Inject an empty dummy transaction with that GTID on recovery node:
SET GTID_NEXT = '3e11fa47-71ca-11eb-9876-0242ac120002:58204';
BEGIN;
COMMIT;
SET GTID_NEXT = 'AUTOMATIC';

-- Result: MySQL marks GTID 58204 as executed and skips the actual DROP TABLE!`,
      explanation:
        "In GTID-enabled environments, administrators can skip destructive transactions by injecting an empty dummy transaction with the target GTID, instructing MySQL to mark the event as committed without executing the destructive SQL payload.",
      keyTakeaways: [
        "GTIDs uniquely identify transactions across distributed clusters.",
        "Injecting empty transactions skips destructive events cleanly.",
        "Eliminates byte offset calculations across multiple log files."
      ]
    }
  };

  const currentPhase = positionPhases[selectedPositionPhase];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.4: Backup, PITR &amp; Data Migration
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 8 of 13
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
          Locating Binary Log Positions &amp; <span className="text-emerald-400">Target Coordinates</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Mastering binary log forensics in MySQL 8.0: dissecting event headers, applying the 3-step formula to identify pre-disaster byte offsets, inspecting logs with <code>SHOW BINLOG EVENTS</code> and <code>mysqlbinlog</code>, and executing GTID-based transaction skipping.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: Log Forensics Pillars ───────────────────────── */}
        <section id="forensics-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Pillars of Binary Log Forensics
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Core concepts for identifying exact transaction coordinates and executing surgical disaster recovery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">Byte Offsets</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                <code># at &lt;pos&gt;</code> marks the start of each event; <code>end_log_pos</code> marks where the next event begins.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">The 3-Step Formula</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Search query text → note preceding <code># at &lt;pos&gt;</code> → set as <code>--stop-position</code>.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-purple-300 text-base">Xid Commit Points</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                <code>Xid</code> events define durable transaction boundaries where data is committed to disk.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-rose-300 text-base">GTID Skipping</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Inject empty transactions with target GTIDs to skip destructive statements across clusters.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Log Position Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe event record structures, the 3-step formula, live SQL inspection, and GTID transaction skipping.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(positionPhases).map((phaseKey) => {
              const phase = positionPhases[phaseKey];
              const isSelected = selectedPositionPhase === phaseKey;
              return (
                <button
                  key={phaseKey}
                  onClick={() => setSelectedPositionPhase(phaseKey)}
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
                Log Telemetry &amp; Recovery Execution:
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
              Coordinate identification case studies in Barrackpore and Kolkata demonstrating exact byte positioning and GTID skipping.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Pinpointing TRUNCATE at Byte 512000 in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Byte-Exact Recovery
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, an accidental <code>TRUNCATE TABLE active_carts;</code> occurred at 16:15:00. Mamata ran <code>mysqlbinlog -v binlog.000018 | grep -C 5 "TRUNCATE"</code>. The command pinpointed the TRUNCATE starting at <code># at 512000</code>. She set <code>--stop-position=512000</code>, replaying all 1,400 afternoon shopping carts with zero data loss.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – GTID Transaction Injection in Kolkata Bank
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  GTID Skipped
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, a bad migration script executed an unauthorized <code>DROP TABLE account_metadata;</code> under GTID <code>3e11fa47...:58204</code>. Debangshu injected an empty transaction with that GTID into the standby node. When replication replayed the transaction stream, MySQL marked the GTID as completed, cleanly skipping the DROP and keeping ₹500 Crores in banking services operational.
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
              Avoid dangerous stop position offsets and premature log purges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Using end_log_pos Instead of Start Position
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Setting <code>--stop-position</code> to the <code>end_log_pos</code> of the destructive query causes MySQL to EXECUTE the bad query, repeating the disaster!
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always use the starting &apos;# at &lt;pos&gt;&apos; offset of the destructive statement.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Purging Binary Logs Too Aggressively
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Setting <code>binlog_expire_logs_seconds</code> too short (e.g. 24 hours) means you cannot perform Point-in-Time Recovery if an error is discovered 2 days later.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Retain binary logs for at least 7 to 14 days in production.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Preview Filtered Statements
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Always pipe <code>mysqlbinlog</code> to a preview SQL file and grep for the destructive command before applying it to the database.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees that the bad statement is 100% excluded.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Enable CRC32 Checksums
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Set <code>binlog_checksum = CRC32</code> to ensure that every binary log event record on disk is validated cryptographically against disk corruption.
              </p>
              <div className="text-xs text-slate-400">
                Prevents replaying truncated or corrupted log blocks.
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
            title="Topic 8: Locating Binary Log Positions and Restoring to a Specific Timestamp / Position"
            content={noteText}
          />

          <Teacher
            note="Locating binary log positions is all about microsecond precision. Remember the 3-step formula: search for the destructive query text, identify the '# at <pos>' starting byte offset immediately preceding it, and set that value as your --stop-position. Never use end_log_pos as your stop position, or you will execute the bad statement! Always preview your extracted replay file before applying it to the database!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of binary log positions, byte offsets, event anatomy, and GTID transaction skipping.
            </p>
          </div>

          <FAQTemplate
            title="Binary Log Positions &amp; Coordinates FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic8;
