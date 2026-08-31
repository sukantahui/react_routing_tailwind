import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";

/**
 * Topic7 – ANSI SQL Transaction Isolation Levels: REPEATABLE READ (MySQL Default) and SERIALIZABLE
 * Module: 003_005_transactions-and-concurrency
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on the upper two ANSI SQL isolation levels (REPEATABLE READ, SERIALIZABLE), transaction-level MVCC snapshots, Next-Key lock phantom prevention, current read DML mechanics, and 2-Phase Locking serialization.
 */
const Topic7 = () => {
  // Interactive Simulator State
  const [selectedIsolationScenario, setSelectedIsolationScenario] = useState("repeatable_read_snapshot");

  const isolationScenarios = {
    repeatable_read_snapshot: {
      title: "1. REPEATABLE READ: Immutable Point-in-Time Transaction Snapshot",
      badge: "REPEATABLE READ",
      badgeColor: "emerald",
      sqlQuery: `-- 🛡️ REPEATABLE READ (MySQL Server Default):
-- Session 1 (Audit Officer):
START TRANSACTION;

-- Query 1 (Timestamp T1): Reads Mamata's balance:
SELECT balance FROM student_ledgers WHERE student_id = 101; 
-- 📊 Result 1: ₹25,000.00 (Snapshot View T1 established!)

-- Session 2 CONCURRENTLY updates & commits Mamata's balance to ₹50,000 at T2:
-- (Session 2: UPDATE student_ledgers SET balance = 50000.00 WHERE student_id = 101; COMMIT;)

-- Query 2 (Timestamp T3): Re-reads Mamata's balance in the SAME transaction:
SELECT balance FROM student_ledgers WHERE student_id = 101; 
-- 🛡️ Result 2: STILL ₹25,000.00! (Immutable Snapshot T1 is preserved!)
-- Non-Repeatable Read is COMPLETELY ELIMINATED!

COMMIT;`,
      resultRows: [
        { queryStep: "Query 1 (At T1)", snapshotView: "Snapshot T1 Established", observedValue: "₹25,000.00", lockType: "Lock-Free MVCC Read", anomalyOutcome: "Zero Drift", status: "Snapshot T1 Locked" },
        { queryStep: "Session 2 Commits (T2)", snapshotView: "External Commit", observedValue: "₹50,000.00 Stored", lockType: "X-Lock Released", anomalyOutcome: "Ignored by Session 1", status: "Durable on Disk ✅" },
        { queryStep: "Query 2 (At T3)", snapshotView: "SAME Snapshot T1 Preserved", observedValue: "₹25,000.00 (Repeatable!)", lockType: "Lock-Free MVCC Read", anomalyOutcome: "Zero Drift ✅", status: "Repeatable Read ✅" },
      ],
      explanation:
        "In `REPEATABLE READ`, the very first `SELECT` statement establishes a single, immutable MVCC snapshot. Query 2 continues reading from that exact same snapshot, completely ignoring Session 2's subsequent commit.",
    },
    next_key_phantom_prevention: {
      title: "2. Next-Key Locking: Eliminating Phantom Reads in Range Queries",
      badge: "Next-Key Locks",
      badgeColor: "cyan",
      sqlQuery: `-- 🛡️ NEXT-KEY LOCK PHANTOM PREVENTION (Range Queries):
-- Session 1 (Audit with Locking Read):
START TRANSACTION;

-- Locking Range Query on students with GPA >= 3.8:
SELECT * FROM student_records WHERE gpa >= 3.8 FOR UPDATE;
-- 🔒 InnoDB deploys Next-Key Locks:
-- 1. Record Locks on matching rows (Mamata, Susmita)
-- 2. GAP LOCKS on the preceding gaps in the index!

-- Session 2 CONCURRENTLY attempts to insert a new student with GPA 3.9:
-- INSERT INTO student_records VALUES (105, 'Rohan', 3.9);
-- 🛑 BLOCKED! Session 2 waits because Session 1 holds a Gap Lock on the (3.8, +inf) range!

-- Session 1 re-reads: Exactly 2 rows returned! Zero Phantom Rows!
COMMIT; -- Session 1 commits, freeing gap locks and unblocking Session 2.`,
      resultRows: [
        { queryStep: "Session 1 FOR UPDATE", snapshotView: "Current Range Read", observedValue: "2 Matching Rows", lockType: "Next-Key Lock (Record + Gap)", anomalyOutcome: "Range Gap Protected", status: "Gap Locked 🔒" },
        { queryStep: "Session 2 INSERT Attempt", snapshotView: "Blocked by Gap Lock", observedValue: "Waiting...", lockType: "Insert Intention Lock", anomalyOutcome: "Phantom Blocked", status: "Blocked 🛑" },
        { queryStep: "Session 1 Re-Read", snapshotView: "Current Range Read", observedValue: "Exact 2 Rows", lockType: "Next-Key Lock Held", anomalyOutcome: "Zero Phantoms ✅", status: "Phantom-Free 🛡️" },
      ],
      explanation:
        "InnoDB eliminates Phantom Reads in `REPEATABLE READ` by deploying Next-Key Locks (Record Lock + Gap Lock). Session 2 is blocked from inserting into the locked gap until Session 1 completes.",
    },
    serializable_shared_lock_queue: {
      title: "3. SERIALIZABLE: Auto-Shared Locking & Sequential Execution",
      badge: "SERIALIZABLE",
      badgeColor: "rose",
      sqlQuery: `-- 🔒 SERIALIZABLE (Level 3 - Strict 2-Phase Locking):
SET SESSION TRANSACTION ISOLATION LEVEL SERIALIZABLE;
START TRANSACTION;

-- Plain SELECT is IMPLICITLY CONVERTED into SELECT ... FOR SHARE:
SELECT balance FROM student_ledgers WHERE student_id = 101;
-- 🔒 Acquires a Shared Lock (S-Lock) on Mamata's row!

-- Session 2 CONCURRENTLY attempts to update Mamata's balance:
-- UPDATE student_ledgers SET balance = 30000.00 WHERE student_id = 101;
-- 🛑 BLOCKED! Session 2 requires an Exclusive Lock (X-Lock), which is INCOMPATIBLE with Session 1's S-Lock!

-- Session 1 commits:
COMMIT; -- S-Lock released, unblocking Session 2.`,
      resultRows: [
        { queryStep: "Session 1 Plain SELECT", snapshotView: "2PL Locking Read", observedValue: "₹25,000.00", lockType: "Implicit S-Lock Acquired", anomalyOutcome: "Zero Anomalies", status: "S-Lock Active 🔒" },
        { queryStep: "Session 2 UPDATE Attempt", snapshotView: "Blocked by S-Lock", observedValue: "Waiting for X-Lock...", lockType: "X-Lock Request", anomalyOutcome: "Strict Serialization", status: "Blocked 🛑" },
        { queryStep: "Session 1 COMMIT", snapshotView: "Tx Finished", observedValue: "All Locks Released", lockType: "Zero Locks Held", anomalyOutcome: "Session 2 Unblocks", status: "Serialized ✅" },
      ],
      explanation:
        "Under `SERIALIZABLE`, MySQL converts all plain `SELECT`s into locking `FOR SHARE` reads, blocking concurrent writers and forcing transactions into a strict, single-threaded execution queue.",
    },
    current_read_dml_behavior: {
      title: "4. Current Read DML: The Update Surprise in REPEATABLE READ",
      badge: "Current Read DML",
      badgeColor: "amber",
      sqlQuery: `-- ⚠️ THE CURRENT READ SURPRISE IN REPEATABLE READ:
-- Session 1 starts transaction:
START TRANSACTION;
SELECT * FROM student_records WHERE student_id = 105; -- Returns 0 rows (Snapshot View)

-- Session 2 CONCURRENTLY inserts student 105 (Rohan) and COMMITS:
-- (Session 2: INSERT INTO student_records VALUES (105, 'Rohan', 3.9); COMMIT;)

-- Session 1 still sees 0 rows in snapshot:
SELECT * FROM student_records WHERE student_id = 105; -- Returns 0 rows!

-- BUT Session 1 executes a DML UPDATE (Current Read on physical disk):
UPDATE student_records SET gpa = 4.0 WHERE student_id = 105; -- ⚡ Affects 1 row!

-- 🚨 NOW Session 1 re-reads: Rohan is SUDDENLY VISIBLE because Session 1 modified him!
SELECT * FROM student_records WHERE student_id = 105; -- Returns 1 row (Rohan, 4.0)!

COMMIT;`,
      resultRows: [
        { queryStep: "Query 1 (Snapshot)", snapshotView: "Initial Snapshot", observedValue: "0 Rows", lockType: "Lock-Free MVCC", anomalyOutcome: "Hidden by Snapshot", status: "Snapshot Empty" },
        { queryStep: "UPDATE DML (Current Read)", snapshotView: "Physical Disk Scan", observedValue: "Affects 1 Row ⚡", lockType: "X-Lock Acquired", anomalyOutcome: "Touches New Row", status: "Modified Row" },
        { queryStep: "Query 2 (Post-UPDATE)", snapshotView: "Snapshot + Own DML", observedValue: "1 Row (Rohan) 🚨", lockType: "Lock-Free MVCC", anomalyOutcome: "Visible (Own Edit)", status: "Row Visible ⚠️" },
      ],
      explanation:
        "In `REPEATABLE READ`, DML statements execute as 'Current Reads' against physical disk data. Updating a row inserted by another transaction creates an undo record in the current transaction, making that row visible in subsequent snapshot queries.",
    },
  };

  const navItems = [
    { id: "isolation-overview", label: "1. The Upper Isolation Levels" },
    { id: "next-key-locking", label: "2. Next-Key Locks" },
    { id: "svg-diagrams", label: "3. Snapshot & Next-Key SVGs" },
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
            <span>Topic 7 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Isolation Levels Part 2
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            REPEATABLE READ &amp; SERIALIZABLE
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master the mechanics of MySQL's default isolation level, <code className="text-cyan-300 font-mono">REPEATABLE READ</code>, and the strict <code className="text-cyan-300 font-mono">SERIALIZABLE</code> level. Understand immutable transaction-level MVCC snapshots, Next-Key locking phantom prevention, current read DML semantics, and 2-Phase Locking serialization.
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
        {/* SECTION 1: The Upper Isolation Levels */}
        <section id="isolation-overview" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Understanding the Upper Two Isolation Levels
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing transaction-level MVCC snapshots with strict 2-Phase shared locking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400 font-mono">REPEATABLE READ (Level 2 - MySQL Default)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                The first `SELECT` statement establishes a single immutable snapshot preserved across the entire transaction. Eliminates Dirty Reads and Non-Repeatable Reads, while Next-Key locks eliminate Phantom Reads.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-indigo-400 font-mono">SERIALIZABLE (Level 3)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Converts all plain `SELECT` statements into locking `FOR SHARE` reads. Transactions execute sequentially as if in a single-threaded queue, eliminating all concurrency anomalies at the cost of high lock contention.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Next-Key Locking */}
        <section id="next-key-locking" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. How Next-Key Locks Eliminate Phantom Reads
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              InnoDB's proprietary hybrid locking mechanism combining record locks and gap locks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="font-mono text-cyan-400 font-bold text-xs uppercase">Component 1</span>
              <h3 className="font-bold text-white">Record Lock</h3>
              <p className="text-slate-300 text-xs">
                Locks the actual index record to prevent concurrent updates or deletions of existing rows.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="font-mono text-emerald-400 font-bold text-xs uppercase">Component 2</span>
              <h3 className="font-bold text-white">Gap Lock</h3>
              <p className="text-slate-300 text-xs">
                Locks the empty gap immediately preceding the index record, blocking concurrent inserts into that range.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="font-mono text-amber-400 font-bold text-xs uppercase">Combined</span>
              <h3 className="font-bold text-white">Next-Key Lock</h3>
              <p className="text-slate-300 text-xs">
                Record Lock + Gap Lock = Total range protection against both row mutations and phantom insertions!
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Immutable Snapshots &amp; Next-Key Lock Ranges
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Visualizing transaction-level MVCC snapshots and index gap locking bounds.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Immutable Snapshot */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Transaction-Level Snapshot Retention in REPEATABLE READ
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Query 1 */}
                  <g>
                    <rect x="30" y="30" width="220" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="140" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">1. Query 1 (At T1)</text>
                    <rect x="40" y="70" width="200" height="40" rx="4" fill="#022c22" />
                    <text x="140" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Creates Immutable Snapshot T1</text>
                    <text x="140" y="102" fill="#34d399" fontSize="7 font-mono" textAnchor="middle">Reads Mamata = ₹25,000</text>
                  </g>

                  {/* External Commit */}
                  <g>
                    <rect x="290" y="30" width="230" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="405" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">2. Session 2 Commits (T2)</text>
                    <rect x="300" y="70" width="210" height="40" rx="4" fill="#0f172a" />
                    <text x="405" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">UPDATE balance = 50,000</text>
                    <text x="405" y="102" fill="#94a3b8" fontSize="7 font-bold" textAnchor="middle">COMMIT; Durable on Disk</text>
                  </g>

                  {/* Query 2 */}
                  <g>
                    <rect x="560" y="30" width="240" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="680" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">3. Query 2 (At T3)</text>
                    <rect x="570" y="70" width="220" height="40" rx="4" fill="#022c22" />
                    <text x="680" y="88" fill="#a7f3d0" fontSize="8 font-mono font-bold" textAnchor="middle">RETAINS SAME Snapshot T1 🛡️</text>
                    <text x="680" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">STILL Reads ₹25,000 (Repeatable!)</text>
                  </g>

                  {/* Arrows */}
                  <path d="M 250 80 L 290 80" stroke="#10b981" strokeWidth="1.5" />
                  <path d="M 520 80 L 560 80" stroke="#818cf8" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* SVG 2: Next-Key Locks */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram B:</span> Next-Key Lock (Record Lock + Gap Lock Range)
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Gap 1 */}
                  <g>
                    <rect x="30" y="30" width="230" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="145" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">GAP LOCK: (3.5, 3.8)</text>
                    <rect x="40" y="70" width="210" height="40" rx="4" fill="#0f172a" />
                    <text x="145" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Locks empty space before 3.8</text>
                    <text x="145" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Blocks INSERT in (3.5, 3.8)</text>
                  </g>

                  {/* Record Lock */}
                  <g>
                    <rect x="290" y="30" width="230" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="405" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">RECORD LOCK: [3.8]</text>
                    <rect x="300" y="70" width="210" height="40" rx="4" fill="#022c22" />
                    <text x="405" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Locks Index Record 3.8</text>
                    <text x="405" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Blocks UPDATE / DELETE on 3.8</text>
                  </g>

                  {/* Next-Key Lock Total */}
                  <g>
                    <rect x="550" y="30" width="260" height="100" rx="8" fill="#083344" stroke="#06b6d4" strokeWidth="2" />
                    <text x="680" y="55" fill="#67e8f9" fontSize="10" fontWeight="bold" textAnchor="middle">NEXT-KEY LOCK: (3.5, 3.8]</text>
                    <rect x="560" y="70" width="240" height="40" rx="4" fill="#0f172a" />
                    <text x="680" y="88" fill="#38bdf8" fontSize="8 font-mono font-bold" textAnchor="middle">Gap Lock + Record Lock Combined</text>
                    <text x="680" y="102" fill="#bae6fd" fontSize="7 font-bold" textAnchor="middle">🛡️ Zero Phantom Reads Guaranteed</text>
                  </g>

                  {/* Arrows */}
                  <path d="M 260 80 L 290 80" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 520 80 L 550 80" stroke="#06b6d4" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Upper Isolation Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test immutable snapshot retention in REPEATABLE READ, Next-Key lock phantom prevention, SERIALIZABLE lock queues, and Current Read DML behavior live.
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
                >
                  <div>
                    <span
                      className={clsx(
                        "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
                        item.badgeColor === "emerald" && "bg-emerald-950 text-emerald-400 border border-emerald-800",
                        item.badgeColor === "cyan" && "bg-cyan-950 text-cyan-400 border border-cyan-800",
                        item.badgeColor === "rose" && "bg-rose-950 text-rose-400 border border-rose-800",
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
                Upper Isolation Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Upper Isolation Execution Script</span>
                <span className="text-emerald-400">Next-Key &amp; MVCC Engine</span>
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
                    <th className="py-3 px-4 text-cyan-400">Query / Step</th>
                    <th className="py-3 px-4 text-white">Snapshot View</th>
                    <th className="py-3 px-4 text-emerald-400">Observed Value</th>
                    <th className="py-3 px-4 text-cyan-400">Locking Mechanism</th>
                    <th className="py-3 px-4 text-amber-400">Anomaly Outcome</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {isolationScenarios[selectedIsolationScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.queryStep}</td>
                      <td className="py-3 px-4 font-mono text-white">{row.snapshotView}</td>
                      <td className="py-3 px-4 text-emerald-300 font-mono font-bold">{row.observedValue}</td>
                      <td className="py-3 px-4 text-slate-300 font-mono">{row.lockType}</td>
                      <td className="py-3 px-4 text-indigo-300 font-mono">{row.anomalyOutcome}</td>
                      <td className="py-3 px-4">
                        <span
                          className={clsx(
                            "px-2 py-0.5 rounded text-[11px] font-sans font-medium border",
                            row.status.includes("Repeatable") || row.status.includes("Phantom-Free") || row.status.includes("Serialized") || row.status.includes("Committed") || row.status.includes("Locked")
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
              Real-world accounting balance sheet generation across 10 tables in Barrackpore.
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
                  Generating 100% Consistent Balance Sheets Across 10 Ledger Tables in Barrackpore
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Central Finance Hub</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui architected a monthly financial reconciliation job: Querying 10 different tables under `READ COMMITTED` resulted in ₹12,000 accounting drift because active transfers committed halfway through the 3-minute reporting run. Opening the audit with <code className="text-emerald-300 font-mono">START TRANSACTION WITH CONSISTENT SNAPSHOT, READ ONLY;</code> locked in a single, unified point-in-time view across all 10 tables, producing a <strong>100% mathematically balanced audit with ₹0.00 drift</strong> without locking a single row!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Enterprise Multi-Table Consistent Snapshot Audit:
START TRANSACTION WITH CONSISTENT SNAPSHOT, READ ONLY;

-- All 10 queries evaluate against the EXACT same timestamp T0:
SELECT SUM(balance) FROM student_wallets;
SELECT SUM(collected_fees) FROM revenue_ledger;
SELECT SUM(hostel_dues) FROM hostel_ledger;
-- (Even if 1,000 transactions commit concurrently, results balance perfectly!)
COMMIT;`}
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
              Avoid long-running transactions under REPEATABLE READ and avoid SERIALIZABLE in high-traffic APIs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Long-Running REPEATABLE READ Transactions
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Leaving a `REPEATABLE READ` transaction open for hours forces InnoDB to retain all undo log pages created across the entire database since that transaction began, causing massive storage bloat.
              </p>
              <div className="text-xs text-slate-400">
                Fix: Always keep transactions short, and commit read-only audit transactions promptly!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Use REPEATABLE READ for Point-in-Time Auditing
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                When generating multi-query financial reports, `REPEATABLE READ` ensures that all queries see the exact same consistent snapshot timestamp without blocking concurrent writers.
              </p>
              <div className="text-xs text-slate-400">
                Provides lock-free consistent reporting across multiple tables.
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
              Key takeaways for REPEATABLE READ and SERIALIZABLE.
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
                  <span><code className="text-cyan-300 font-mono">REPEATABLE READ</code> is MySQL's default; first <code className="text-cyan-300 font-mono">SELECT</code> locks snapshot.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>InnoDB eliminates Phantoms via Undo Logs &amp; Next-Key Locks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>DML statements perform a <strong className="text-cyan-300">Current Read</strong> on physical disk data.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span><code className="text-cyan-300 font-mono">SERIALIZABLE</code> converts all <code className="text-cyan-300 font-mono">SELECT</code>s into locking <code className="text-cyan-300 font-mono">FOR SHARE</code> reads.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe Current Read DML...”</span>
                  Remember that UPDATE operates on current disk state, not snapshots! If you update a row inserted by another transaction, it becomes visible in subsequent snapshot queries!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about SERIALIZABLE latency...”</span>
                  SERIALIZABLE forces all queries to acquire shared locks, which can bring high-traffic web applications to a crawl due to lock wait queuing!
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
              Comprehensive reference questions covering the upper two ANSI SQL isolation levels (REPEATABLE READ, SERIALIZABLE), transaction-level MVCC snapshots, Next-Key lock phantom prevention, current read DML mechanics, and 2-Phase Locking serialization.
            </p>
          </div>

          <FAQTemplate
            title="REPEATABLE READ & SERIALIZABLE FAQs"
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
            title="ANSI SQL Transaction Isolation Levels: REPEATABLE READ (MySQL Default) and SERIALIZABLE"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic7_note.txt"
          />

          <Teacher
            note="MySQL's REPEATABLE READ is one of the most sophisticated storage engine implementations in modern computing: it uses MVCC snapshots for lock-free point-in-time reads and Next-Key locking to eliminate phantom reads entirely! Keep in mind that DML statements execute current reads on physical rows, and reserve SERIALIZABLE strictly for scenarios requiring strict sequential serialization where locking wait latency is acceptable."
          />
        </section>
      </main>
    </div>
  );
};

export default Topic7;
