import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

/**
 * Topic6 – ANSI SQL Transaction Isolation Levels: READ UNCOMMITTED and READ COMMITTED
 * Module: 003_005_transactions-and-concurrency
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on the lower two ANSI SQL isolation levels (READ UNCOMMITTED, READ COMMITTED), statement-level MVCC snapshot generation, gap lock elimination, semi-consistent reads, and row-based binary replication requirements.
 */
const Topic6 = () => {
  // Interactive Simulator State
  const [selectedIsolationScenario, setSelectedIsolationScenario] = useState("read_committed_statement_snapshot");

  const isolationScenarios = {
    read_committed_statement_snapshot: {
      title: "1. READ COMMITTED: Statement-Level Fresh Snapshot Generation",
      badge: "READ COMMITTED",
      badgeColor: "emerald",
      sqlQuery: `-- 🛡️ READ COMMITTED IN ACTION (Fresh Snapshot Per Query):
SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;
START TRANSACTION;

-- Query 1 (Timestamp T1): Reads Mamata's initial balance:
SELECT balance FROM student_ledgers WHERE student_id = 101; 
-- 📊 Result 1: ₹25,000.00 (Snapshot T1)

-- Session 2 CONCURRENTLY commits a ₹5,000 fee deduction at T2:
-- (Session 2: UPDATE student_ledgers SET balance = 20000.00 WHERE student_id = 101; COMMIT;)

-- Query 2 (Timestamp T3): Re-reads Mamata's balance in the SAME transaction:
SELECT balance FROM student_ledgers WHERE student_id = 101; 
-- 📊 Result 2: ₹20,000.00! (Fresh Snapshot T3 captures newly committed data!)

COMMIT;`,
      resultRows: [
        { queryStep: "Query 1 (At T1)", snapshotTime: "Snapshot T1 Created", observedValue: "₹25,000.00", dirtyReadRisk: "Zero (Committed Only)", nonRepeatableRisk: "Possible", status: "Fresh Snapshot T1" },
        { queryStep: "Session 2 Commits (T2)", snapshotTime: "Committed at T2", observedValue: "₹20,000.00 Stored", dirtyReadRisk: "Zero (Durable)", nonRepeatableRisk: "Occurring", status: "Committed on Disk ✅" },
        { queryStep: "Query 2 (At T3)", snapshotTime: "Snapshot T3 Created ⚡", observedValue: "₹20,000.00 (Updated)", dirtyReadRisk: "Zero (Committed Only)", nonRepeatableRisk: "Reflected", status: "Fresh Snapshot T3 ✅" },
      ],
      explanation:
        "In `READ COMMITTED`, every single `SELECT` statement creates a brand-new MVCC snapshot. Query 2 sees the new ₹20,000 balance committed by Session 2 because its snapshot was generated after Session 2's commit.",
    },
    read_uncommitted_dirty_read: {
      title: "2. READ UNCOMMITTED: Dirty Reads & In-Memory Unstaged Data",
      badge: "READ UNCOMMITTED",
      badgeColor: "rose",
      sqlQuery: `-- ❌ READ UNCOMMITTED (Allowed Dirty Reads):
SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
START TRANSACTION;

-- Session 1 stages uncommitted scholarship for Mamata:
-- (Session 1: UPDATE student_scholarships SET amount = 50000.00 WHERE student_id = 101;)

-- Session 2 reads Mamata's scholarship:
SELECT amount FROM student_scholarships WHERE student_id = 101;
-- 🚨 DIRTY READ: Returns ₹50,000.00 (Direct raw buffer pool read!)

-- Session 1 encounters validation error and rolls back:
-- (Session 1: ROLLBACK;) -- Scholarship returns to ₹0.00!

-- 💥 Result: Session 2 observed phantom uncommitted data that never existed!`,
      resultRows: [
        { queryStep: "Session 1 Uncommitted Update", snapshotTime: "No MVCC Snapshot", observedValue: "₹50,000.00 (In RAM)", dirtyReadRisk: "DIRTY READ 💥", nonRepeatableRisk: "High", status: "Uncommitted RAM" },
        { queryStep: "Session 2 Query Read", snapshotTime: "Raw Buffer Pool Scan", observedValue: "₹50,000.00 Read 🚨", dirtyReadRisk: "DIRTY READ 💥", nonRepeatableRisk: "High", status: "Dirty Read 🚨" },
        { queryStep: "Session 1 ROLLBACK", snapshotTime: "Reverted via Undo Log", observedValue: "₹0.00 (Actual)", dirtyReadRisk: "Zero", nonRepeatableRisk: "High", status: "Rolled Back 🛡️" },
      ],
      explanation:
        "`READ UNCOMMITTED` reads directly from the active in-memory buffer pool page without consulting undo log snapshots, allowing dirty reads of temporary modifications that may be rolled back.",
    },
    gap_lock_elimination_oltp: {
      title: "3. High-Throughput OLTP: Eliminating Gap Lock Deadlocks",
      badge: "Gap Lock Elimination",
      badgeColor: "cyan",
      sqlQuery: `-- ⚡ ELIMINATING GAP LOCKS IN READ COMMITTED:
-- Under REPEATABLE READ (Default):
-- Range queries acquire Next-Key Locks (Record Lock + Gap Lock before record).
-- Multiple concurrent INSERTs into the same gap trigger DEADLOCKS!

-- Under READ COMMITTED:
-- InnoDB DISABLES Gap Locks for standard search and index scans!
-- Concurrent transactions can insert into adjacent gaps simultaneously!

SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;
START TRANSACTION;
-- Locks ONLY the specific updated row (No phantom gap locks):
UPDATE student_ledgers SET balance = balance - 1000 WHERE department_id = 1;
COMMIT;`,
      resultRows: [
        { queryStep: "REPEATABLE READ", snapshotTime: "Single Tx Snapshot", observedValue: "Record Lock + Gap Lock", dirtyReadRisk: "Zero", nonRepeatableRisk: "Zero", status: "Deadlock Prone in OLTP" },
        { queryStep: "READ COMMITTED", snapshotTime: "Fresh Per-Query Snapshot", observedValue: "Record Lock ONLY (No Gap Locks)", dirtyReadRisk: "Zero", nonRepeatableRisk: "Possible", status: "High Throughput ⚡" },
      ],
      explanation:
        "Switching to `READ COMMITTED` disables Gap Locks for regular queries, preventing insertion deadlocks in high-traffic OLTP web applications.",
    },
    fast_undo_purge_reclamation: {
      title: "4. Memory Efficiency: Fast Undo Log Purging & Tablespace Health",
      badge: "Undo Log Purging",
      badgeColor: "amber",
      sqlQuery: `-- 🧹 FASTER UNDO LOG PURGING IN READ COMMITTED:
-- In REPEATABLE READ:
-- A long-running transaction holds its MVCC read view open for hours.
-- InnoDB cannot purge ANY undo log pages created since that transaction started!
-- Result: ibdata1 tablespace bloats by gigabytes!

-- In READ COMMITTED:
-- Read views are closed IMMEDIATELY after each individual SELECT statement.
-- Background InnoDB Purge Threads can reclaim undo log pages instantly!

SELECT @@transaction_isolation; -- READ-COMMITTED`,
      resultRows: [
        { queryStep: "REPEATABLE READ Long Tx", snapshotTime: "Held for hours", observedValue: "Blocks Purge Threads", dirtyReadRisk: "Zero", nonRepeatableRisk: "Zero", status: "Undo Tablespace Bloat 💥" },
        { queryStep: "READ COMMITTED Long Tx", snapshotTime: "Closed per SELECT", observedValue: "Purge Threads Active", dirtyReadRisk: "Zero", nonRepeatableRisk: "Possible", status: "Clean Disk Reclamation 🧹" },
      ],
      explanation:
        "Because `READ COMMITTED` closes read views immediately after each query, background purge threads can deallocate old undo log pages continuously, preventing tablespace disk bloat.",
    },
  };

  const navItems = [
    { id: "isolation-overview", label: "1. The Lower Isolation Levels" },
    { id: "read-committed-deep", label: "2. READ COMMITTED Mechanics" },
    { id: "svg-diagrams", label: "3. Architecture & Snapshots SVGs" },
    { id: "interactive-sandbox", label: "4. Live Isolation Workbench" },
    { id: "case-studies", label: "5. Production Case Studies" },
    { id: "pitfalls-rules", label: "6. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "7. Student Checklist" },
    { id: "faq-section", label: "8. FAQs (30 Questions)" },
    { id: "teacher-notes", label: "9. Teacher's Note & Raw Script" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-900 pb-20">
      {/* Header Banner */}
      <header className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-2">
            <span>Module 003_005</span>
            <span>•</span>
            <span>Topic 6 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Isolation Levels Part 1
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            READ UNCOMMITTED &amp; READ COMMITTED
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Explore the architecture and mechanics of the lower two ANSI SQL isolation levels. Learn how <code className="text-cyan-300 font-mono">READ COMMITTED</code> generates statement-level MVCC snapshots, eliminates gap lock deadlocks, accelerates undo log purging, and why it is the industry standard for high-throughput OLTP systems.
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
        {/* SECTION 1: The Lower Isolation Levels */}
        <section id="isolation-overview" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Understanding the Lower Two Isolation Levels
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing raw uncommitted buffer reads with statement-level committed snapshots.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-rose-400 font-mono">READ UNCOMMITTED (Level 0)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Queries read raw uncommitted in-memory rows directly from the buffer pool without consulting Undo Logs. Permits Dirty Reads. Strictly prohibited in banking, billing, and inventory systems.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400 font-mono">READ COMMITTED (Level 1)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Completely eliminates Dirty Reads. Every individual `SELECT` generates a fresh, new MVCC point-in-time snapshot reflecting the most recent committed data. The standard default in PostgreSQL and Oracle.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: READ COMMITTED Mechanics */}
        <section id="read-committed-deep" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Deep Dive: Key Advantages of READ COMMITTED in OLTP
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why high-concurrency systems frequently switch from REPEATABLE READ to READ COMMITTED.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="font-mono text-cyan-400 font-bold text-xs uppercase">Benefit 1</span>
              <h3 className="font-bold text-white">No Gap Lock Contention</h3>
              <p className="text-slate-300 text-xs">
                Disables Gap Locks for regular queries, allowing multiple concurrent transactions to insert adjacent records without deadlock conflicts.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="font-mono text-emerald-400 font-bold text-xs uppercase">Benefit 2</span>
              <h3 className="font-bold text-white">Fast Undo Log Purging</h3>
              <p className="text-slate-300 text-xs">
                Read views are deallocated immediately after each query, allowing background purge threads to reclaim undo log disk space continuously.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="font-mono text-amber-400 font-bold text-xs uppercase">Benefit 3</span>
              <h3 className="font-bold text-white">Semi-Consistent Reads</h3>
              <p className="text-slate-300 text-xs">
                During `UPDATE` scans, locks on non-matching rows are released immediately after evaluation, preventing whole-table lockouts.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Raw Memory Reads vs Statement-Level Snapshots
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Visualizing the underlying snapshot generation pipeline of READ COMMITTED.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Memory vs Snapshot */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> READ UNCOMMITTED (Raw Memory) vs READ COMMITTED (MVCC Snapshots)
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Left: READ UNCOMMITTED */}
                  <g>
                    <rect x="30" y="30" width="370" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="215" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">READ UNCOMMITTED (Level 0)</text>
                    <rect x="45" y="70" width="340" height="40" rx="4" fill="#1e293b" />
                    <text x="215" y="88" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">Direct Buffer Pool Scan (Bypasses Undo Log)</text>
                    <text x="215" y="102" fill="#fca5a5" fontSize="7 font-bold" textAnchor="middle">💥 Dirty Reads Allowed · Disastrous for Finance</text>
                  </g>

                  {/* Right: READ COMMITTED */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="630" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">READ COMMITTED (Level 1)</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#022c22" />
                    <text x="630" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Reconstructs Snapshot via DB_ROLL_PTR Undo Log</text>
                    <text x="630" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">🛡️ Zero Dirty Reads · Statement-Level Fresh Snapshots</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* SVG 2: Statement Snapshots */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400 font-mono">Diagram B:</span> Statement-Level Snapshot Refresh Lifecycle
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1: Query 1 */}
                  <g>
                    <rect x="30" y="30" width="220" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="140" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">1. Query 1 (At T1)</text>
                    <rect x="40" y="70" width="200" height="40" rx="4" fill="#022c22" />
                    <text x="140" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Generates Snapshot T1</text>
                    <text x="140" y="102" fill="#34d399" fontSize="7 font-mono" textAnchor="middle">Reads Mamata = ₹25,000</text>
                  </g>

                  {/* Step 2: Concurrent Commit */}
                  <g>
                    <rect x="290" y="30" width="230" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="405" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">2. Session 2 Commits (T2)</text>
                    <rect x="300" y="70" width="210" height="40" rx="4" fill="#0f172a" />
                    <text x="405" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">UPDATE balance = 20,000</text>
                    <text x="405" y="102" fill="#94a3b8" fontSize="7 font-bold" textAnchor="middle">COMMIT; Executed</text>
                  </g>

                  {/* Step 3: Query 2 */}
                  <g>
                    <rect x="560" y="30" width="240" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="680" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">3. Query 2 (At T3)</text>
                    <rect x="570" y="70" width="220" height="40" rx="4" fill="#022c22" />
                    <text x="680" y="88" fill="#a7f3d0" fontSize="8 font-mono font-bold" textAnchor="middle">Generates FRESH Snapshot T3 ⚡</text>
                    <text x="680" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Reads Mamata = ₹20,000 (Updated!)</text>
                  </g>

                  {/* Arrows */}
                  <path d="M 250 80 L 290 80" stroke="#10b981" strokeWidth="1.5" />
                  <path d="M 520 80 L 560 80" stroke="#818cf8" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Isolation Simulator Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test statement-level snapshot generation in READ COMMITTED, dirty reads in READ UNCOMMITTED, gap lock elimination, and undo log purging live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(isolationScenarios).map(([key, item]) => {
              const isActive = selectedIsolationScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedIsolationScenario(key)}
                  className={clsx(
                    "p-4 rounded-xl text-left transition-all duration-300 border flex flex-col justify-between cursor-pointer",
                    isActive
                      ? "bg-indigo-950/60 border-cyan-500 shadow-lg shadow-cyan-950/40 scale-[1.02]"
                      : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850"
                  )}
                &gt;
                  <div>
                    <span
                      className={clsx(
                        "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
                        item.badgeColor === "emerald" && "bg-emerald-950 text-emerald-400 border border-emerald-800",
                        item.badgeColor === "rose" && "bg-rose-950 text-rose-400 border border-rose-800",
                        item.badgeColor === "cyan" && "bg-cyan-950 text-cyan-400 border border-cyan-800",
                        item.badgeColor === "amber" && "bg-amber-950 text-amber-400 border border-amber-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Level" : "○ Run Isolation Test"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{isolationScenarios[selectedIsolationScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{isolationScenarios[selectedIsolationScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Isolation Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Isolation Execution Script</span>
                <span className="text-emerald-400">MVCC Snapshot Engine</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {isolationScenarios[selectedIsolationScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Query / Operation</th>
                    <th className="py-3 px-4 text-white">Snapshot State</th>
                    <th className="py-3 px-4 text-emerald-400">Observed Value</th>
                    <th className="py-3 px-4 text-amber-400">Dirty Read Risk</th>
                    <th className="py-3 px-4 text-indigo-400">Non-Repeatable Risk</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {isolationScenarios[selectedIsolationScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.queryStep}</td>
                      <td className="py-3 px-4 font-mono text-white">{row.snapshotTime}</td>
                      <td className="py-3 px-4 text-emerald-300 font-mono font-bold">{row.observedValue}</td>
                      <td className="py-3 px-4 text-amber-300 font-mono">{row.dirtyReadRisk}</td>
                      <td className="py-3 px-4 text-indigo-300 font-mono">{row.nonRepeatableRisk}</td>
                      <td className="py-3 px-4">
                        <span
                          className={clsx(
                            "px-2 py-0.5 rounded text-[11px] font-sans font-medium border",
                            row.status.includes("Fresh") || row.status.includes("Committed") || row.status.includes("Throughput") || row.status.includes("Clean") || row.status.includes("Rolled Back")
                              ? "bg-emerald-950 text-emerald-400 border-emerald-800"
                              : "bg-rose-950 text-rose-400 border-rose-800"
                          )}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 5: Production Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Production Industry Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Real-world elimination of admission deadlocks and undo tablespace bloat.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case Study 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="p-1.5 rounded bg-emerald-950 text-emerald-400 font-mono text-xs border border-emerald-800">
                    CASE 01
                  </span>
                  Eliminating Insertion Deadlocks during Barrackpore Admission Rush
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Central Admission Server</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui resolved a high-concurrency bottleneck where 5,000 concurrent students were registering for courses: Under default `REPEATABLE READ`, range queries inserted gap locks across the `course_enrollments` table, causing 150+ deadlocks per minute! Switching the production database to <code className="text-emerald-300 font-mono">READ COMMITTED</code> with <code className="text-emerald-300 font-mono">binlog_format = ROW</code> disabled gap locks, dropping deadlocks to <strong>ZERO</strong> and increasing throughput by 420%!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Production MySQL 8.0 my.cnf Configuration:
[mysqld]
transaction-isolation = READ-COMMITTED
binlog_format = ROW
innodb_autoinc_lock_mode = 2`}
              </pre>
            </div>
          </div>
        </section>

        {/* SECTION 6: Senior Pitfalls & Best Practices */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Senior Pitfalls & Best Practices
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Avoid statement-based replication with READ COMMITTED and never use READ UNCOMMITTED in billing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> READ COMMITTED with Statement-Based Binlog
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Using `READ COMMITTED` with <code className="text-rose-300 font-mono">binlog_format = STATEMENT</code> causes data divergence on replica servers because statement execution order can differ between master and replica!
              </p>
              <div className="text-xs text-slate-400">
                Fix: Always set <code className="text-emerald-400 font-mono">binlog_format = ROW</code> when using READ COMMITTED!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Choose READ COMMITTED for High-Throughput OLTP
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                For web services with heavy concurrent inserts and updates, `READ COMMITTED` eliminates gap lock deadlocks and keeps undo tablespace lean.
              </p>
              <div className="text-xs text-slate-400">
                Matches the proven default of PostgreSQL and Oracle.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: Student Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              7. Mini Checklist & Senior Developer Hints
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key takeaways for READ UNCOMMITTED and READ COMMITTED.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Isolation Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><code className="text-cyan-300 font-mono">READ UNCOMMITTED</code> reads raw memory; permits Dirty Reads.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span><code className="text-cyan-300 font-mono">READ COMMITTED</code> creates a fresh MVCC snapshot on EVERY <code className="text-cyan-300 font-mono">SELECT</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span><code className="text-cyan-300 font-mono">READ COMMITTED</code> disables Gap Locks, eliminating insertion deadlocks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Must use <code className="text-cyan-300 font-mono">binlog_format = ROW</code> with <code className="text-cyan-300 font-mono">READ COMMITTED</code>.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe the snapshot refresh difference...”</span>
                  In REPEATABLE READ, query 2 sees the same old value as query 1; in READ COMMITTED, query 2 sees the newly committed update immediately!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about undo purge efficiency...”</span>
                  Because READ COMMITTED closes read views immediately, undo logs are purged continuously, keeping database disk usage minimal!
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: FAQ Template */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              8. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comprehensive reference questions covering the lower two ANSI SQL isolation levels (READ UNCOMMITTED, READ COMMITTED), statement-level MVCC snapshot generation, gap lock elimination, semi-consistent reads, and row-based binary replication requirements.
            </p>
          </div>

          <FAQTemplate
            title="READ UNCOMMITTED & READ COMMITTED FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 9: PlainTextPrint & Teacher's Note */}
        <section id="teacher-notes" className="space-y-8">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              9. Printable Topic Note &amp; Teacher's Observation
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Download clean text documentation for revision and study Sukanta Hui's direct pedagogical insights.
            </p>
          </div>

          <PlainTextPrint
            content={noteText}
            title="ANSI SQL Transaction Isolation Levels: READ UNCOMMITTED and READ COMMITTED"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic6_note.txt"
          />

          <Teacher
            note="Understanding the mechanics of READ COMMITTED vs READ UNCOMMITTED is essential for high-throughput database tuning. Never use READ UNCOMMITTED in financial or transactional code! In high-traffic OLTP web applications, switching MySQL to READ COMMITTED (paired with row-based replication) is one of the most effective optimizations available: it disables gap locks, eliminates insertion deadlocks, and allows undo log purge threads to keep your storage footprint minimal!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic6;
