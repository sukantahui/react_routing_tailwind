import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic11_files/topic11_questions";
import noteText from "./topic11_files/topic11_note.txt?raw";

/**
 * Topic11 – InnoDB Locking Details: Record Locks, Gap Locks, and Next-Key Locks
 * Module: 003_005_transactions-and-concurrency
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on InnoDB's row-level locking algorithms: Record Locks (LOCK_REC_NOT_GAP), Gap Locks (LOCK_GAP), Next-Key Locks (LOCK_ORDINARY), Insert Intention Locks, and Supremum pseudo-records.
 */
const Topic11 = () => {
  // Interactive Simulator State
  const [selectedLockDetailScenario, setSelectedLockDetailScenario] = useState("unique_pk_record_lock");

  const lockDetailScenarios = {
    unique_pk_record_lock: {
      title: "1. Record Lock Only: Unique Primary Key Lookup Optimization",
      badge: "Record Lock (LOCK_REC_NOT_GAP)",
      badgeColor: "emerald",
      sqlQuery: `-- ⚡ RECORD LOCK ONLY (LOCK_REC_NOT_GAP):
-- When searching an exact match on a UNIQUE / PRIMARY KEY index:
START TRANSACTION;
SELECT balance FROM student_ledgers WHERE student_id = 101 FOR UPDATE;

-- 🔍 InnoDB Lock Optimization:
-- 1. Because student_id is PRIMARY KEY, uniqueness is mathematically guaranteed!
-- 2. InnoDB acquires ONLY a Record Lock on index record [101]!
-- 3. NO GAP LOCKS are placed on (100, 101) or (101, 102)!

-- Session 2 CONCURRENTLY inserts student 100 or 102:
-- INSERT INTO student_ledgers VALUES (100, 'Rohan', 20000); ⚡ SUCCEEDS INSTANTLY!
COMMIT;`,
      resultRows: [
        { lockAlgorithm: "Record Lock (LOCK_REC_NOT_GAP)", lockedTarget: "Index Record [101]", intervalBounds: "[101]", gapLockActive: "None (Disabled) ⚡", insertionBlocking: "Zero (Adjacent Inserts Allowed)", status: "Optimal Record Lock ✅" },
      ],
      explanation:
        "When querying an exact unique match on a Primary Key, InnoDB acquires only a Record Lock (`LOCK_REC_NOT_GAP`). Because no other matching row can exist, gap locking is bypassed, allowing adjacent insertions without blocking.",
    },
    non_unique_range_next_key: {
      title: "2. Next-Key Lock: Range Scans & Non-Unique Index Phantom Elimination",
      badge: "Next-Key Lock (LOCK_ORDINARY)",
      badgeColor: "cyan",
      sqlQuery: `-- 🛡️ NEXT-KEY LOCK (Record Lock + Gap Lock):
-- Suppose existing student IDs are: 10, 20, 30
START TRANSACTION;

-- Range Query on students with ID BETWEEN 15 AND 25:
SELECT * FROM student_records WHERE student_id BETWEEN 15 AND 25 FOR UPDATE;

-- 🔒 InnoDB deploys Next-Key Locks:
-- 1. Next-Key Lock on 20: Locks Interval (10, 20] (Gap 10-20 + Record 20)
-- 2. Next-Key Lock on 30: Locks Interval (20, 30] (Gap 20-30 + Record 30)

-- Session 2 CONCURRENTLY attempts:
-- INSERT INTO student_records VALUES (15, 'Mamata'); -- 🛑 BLOCKED in (10, 20]!
-- INSERT INTO student_records VALUES (25, 'Susmita'); -- 🛑 BLOCKED in (20, 30]!
COMMIT;`,
      resultRows: [
        { lockAlgorithm: "Next-Key Lock (LOCK_ORDINARY)", lockedTarget: "Record 20 + Preceding Gap", intervalBounds: "(10, 20]", gapLockActive: "Active (10-20)", insertionBlocking: "Blocks Inserts 11-19 🛑", status: "Range Protected 🛡️" },
        { lockAlgorithm: "Next-Key Lock (LOCK_ORDINARY)", lockedTarget: "Record 30 + Preceding Gap", intervalBounds: "(20, 30]", gapLockActive: "Active (20-30)", insertionBlocking: "Blocks Inserts 21-29 🛑", status: "Range Protected 🛡️" },
      ],
      explanation:
        "Next-Key Locks combine a record lock with a gap lock on the preceding space `(prev, current]`. This half-open interval prevents other transactions from inserting phantom rows into the range.",
    },
    non_existent_row_gap_lock: {
      title: "3. Gap Lock: Searching Non-Existent Records Locks Empty Space",
      badge: "Gap Lock (LOCK_GAP)",
      badgeColor: "amber",
      sqlQuery: `-- ⚠️ THE NON-EXISTENT RECORD GAP LOCK TRAP:
-- Existing student IDs in table: 10, 20, 30
START TRANSACTION;

-- Query for student ID 15 (WHICH DOES NOT EXIST!):
SELECT * FROM student_records WHERE student_id = 15 FOR UPDATE;

-- 🔍 InnoDB Behavior:
-- 1. Finds NO record for 15.
-- 2. Scans forward to the next existing record (Record 20).
-- 3. Places a PURE GAP LOCK on the interval (10, 20)!

-- Session 2 CONCURRENTLY attempts to insert student 18:
-- INSERT INTO student_records VALUES (18, 'Debangshu');
-- 🛑 BLOCKED! Session 2 waits because Session 1 holds a Gap Lock on (10, 20)!
COMMIT;`,
      resultRows: [
        { lockAlgorithm: "Pure Gap Lock (LOCK_GAP)", lockedTarget: "Empty Space between 10 & 20", intervalBounds: "(10, 20)", gapLockActive: "Active (10-20)", insertionBlocking: "Blocks ANY insert between 11 & 19", status: "Gap Locked 🔒" },
      ],
      explanation:
        "When querying a non-existent row with `FOR UPDATE`, InnoDB places a Gap Lock on the surrounding interval `(10, 20)` to ensure that no phantom record 15 can be inserted before the transaction completes.",
    },
    supremum_positive_infinity_lock: {
      title: "4. Supremum Lock: Locking the Upper Bound up to Positive Infinity",
      badge: "Supremum Pseudo-Record",
      badgeColor: "rose",
      sqlQuery: `-- 🌌 SUPREMUM LOCK (Locking up to +Infinity):
-- Highest existing student ID in table is 30:
START TRANSACTION;

-- Query targeting all students with ID &gt; 25:
SELECT * FROM student_records WHERE student_id > 25 FOR UPDATE;

-- 🔒 InnoDB Locking:
-- 1. Next-Key Lock on Record 30: Interval (20, 30]
-- 2. Next-Key Lock on SUPREMUM pseudo-record: Interval (30, +infinity)

-- Session 2 CONCURRENTLY attempts to insert student 500:
-- INSERT INTO student_records VALUES (500, 'Abhronila');
-- 🛑 BLOCKED! Supremum lock protects everything above 30 up to +inf!
COMMIT;`,
      resultRows: [
        { lockAlgorithm: "Next-Key on Supremum", lockedTarget: "Supremum Pseudo-Record", intervalBounds: "(30, +inf)", gapLockActive: "Active (30 to +inf)", insertionBlocking: "Blocks ALL IDs > 30 🛑", status: "Supremum Locked 🌌" },
      ],
      explanation:
        "The Supremum pseudo-record represents imaginary positive infinity ($+\\infty$). Placing a Next-Key lock on the Supremum record locks the entire gap above the highest existing key, blocking all subsequent insertions.",
    },
  };

  const navItems = [
    { id: "lock-types-overview", label: "1. The 3 Lock Types" },
    { id: "supremum-infimum", label: "2. Supremum & Infimum" },
    { id: "svg-diagrams", label: "3. Algorithm Intervals & SVGs" },
    { id: "interactive-sandbox", label: "4. Live Lock Workbench" },
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
            <span>Topic 11 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              InnoDB Locking Internals
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Record, Gap &amp; Next-Key Locks
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Deep dive into the 3 fundamental row locking algorithms inside MySQL InnoDB: Record Locks (<code className="text-cyan-300 font-mono">LOCK_REC_NOT_GAP</code>), Gap Locks (<code className="text-cyan-300 font-mono">LOCK_GAP</code>), and Next-Key Locks (<code className="text-cyan-300 font-mono">LOCK_ORDINARY</code>). Learn how interval bounds, Insert Intention Locks, and Supremum pseudo-records prevent phantom anomalies.
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
        {/* SECTION 1: The 3 Lock Types */}
        <section id="lock-types-overview" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Three InnoDB Row Lock Algorithms
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The internal mechanics governing individual index records and the gaps between them.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400 font-mono">1. Record Lock</h3>
              <div className="text-xs font-mono text-slate-400">[record_val]</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Locks only the physical index record. Deployed on exact Unique / Primary Key lookups. Does not lock preceding or succeeding gaps.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-amber-400 font-mono">2. Gap Lock</h3>
              <div className="text-xs font-mono text-slate-400">(prev_val, next_val)</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Locks the empty space between index records. Its sole purpose is to block other transactions from inserting into that gap.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-cyan-400 font-mono">3. Next-Key Lock</h3>
              <div className="text-xs font-mono text-slate-400">(prev_val, current_val]</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Hybrid lock: Record Lock + Gap Lock on preceding gap. Default in REPEATABLE READ to eliminate Phantom Reads.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Supremum & Infimum */}
        <section id="supremum-infimum" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Supremum &amp; Infimum Pseudo-Records
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How InnoDB establishes boundary locks at negative and positive infinity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="text-base font-bold text-cyan-400 font-mono">Infimum Record (-Infinity)</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Fictitious boundary record lower than any real key. Used to lock the gap before the lowest key in the index: <code className="text-cyan-300 font-mono">(-inf, min_key]</code>.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="text-base font-bold text-rose-400 font-mono">Supremum Record (+Infinity)</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Fictitious boundary record higher than any real key. Used to lock the gap after the highest key in the index: <code className="text-rose-300 font-mono">(max_key, +inf)</code>.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Row Lock Intervals &amp; Gap Insertion Conflicts
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Visualizing Record, Gap, and Next-Key interval spans on B+Tree indexes.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Intervals */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Record Lock, Gap Lock, and Next-Key Lock Intervals
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Record Lock */}
                  <g>
                    <rect x="30" y="30" width="220" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="140" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">RECORD LOCK: [20]</text>
                    <rect x="40" y="70" width="200" height="40" rx="4" fill="#022c22" />
                    <text x="140" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Locks Record 20 ONLY</text>
                    <text x="140" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Gaps (10,20) &amp; (20,30) FREE ✅</text>
                  </g>

                  {/* Gap Lock */}
                  <g>
                    <rect x="290" y="30" width="230" height="100" rx="8" fill="#451a03" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="405" y="55" fill="#fcd34d" fontSize="10" fontWeight="bold" textAnchor="middle">GAP LOCK: (10, 20)</text>
                    <rect x="300" y="70" width="210" height="40" rx="4" fill="#1e293b" />
                    <text x="405" y="88" fill="#fbbf24" fontSize="8 font-mono" textAnchor="middle">Locks Empty Space (10, 20)</text>
                    <text x="405" y="102" fill="#fde68a" fontSize="7 font-bold" textAnchor="middle">🛑 Blocks Inserts 11-19</text>
                  </g>

                  {/* Next-Key Lock */}
                  <g>
                    <rect x="560" y="30" width="250" height="100" rx="8" fill="#083344" stroke="#06b6d4" strokeWidth="2" />
                    <text x="685" y="55" fill="#67e8f9" fontSize="10" fontWeight="bold" textAnchor="middle">NEXT-KEY LOCK: (10, 20]</text>
                    <rect x="570" y="70" width="230" height="40" rx="4" fill="#0f172a" />
                    <text x="685" y="88" fill="#38bdf8" fontSize="8 font-mono font-bold" textAnchor="middle">Gap (10, 20) + Record [20]</text>
                    <text x="685" y="102" fill="#bae6fd" fontSize="7 font-bold" textAnchor="middle">🛡️ Full Phantom Protection</text>
                  </g>

                  {/* Arrows */}
                  <path d="M 250 80 L 290 80" stroke="#10b981" strokeWidth="1.5" />
                  <path d="M 520 80 L 560 80" stroke="#f59e0b" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* SVG 2: Gap Conflict */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-rose-400 font-mono">Diagram B:</span> Gap Lock Blocking Insert Intention Lock
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Session 1 */}
                  <g>
                    <rect x="30" y="30" width="370" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="215" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">SESSION 1 (Holds Gap Lock on (10, 20))</text>
                    <rect x="45" y="70" width="340" height="40" rx="4" fill="#0f172a" />
                    <text x="215" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">SELECT * FROM students WHERE id = 15 FOR UPDATE</text>
                    <text x="215" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Locks gap (10, 20) because 15 does not exist</text>
                  </g>

                  {/* Session 2 */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
                    <text x="630" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">SESSION 2 (Attempts INSERT ID 18)</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#1e293b" />
                    <text x="630" y="88" fill="#f87171" fontSize="8 font-mono font-bold" textAnchor="middle">Requests Insert Intention Lock on 18 in (10, 20)</text>
                    <text x="630" y="102" fill="#fca5a5" fontSize="7 font-bold" textAnchor="middle">🛑 CONFLICT! Blocked until Session 1 Commits!</text>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Locking Details Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test unique PK record locks, range next-key locks, non-existent row gap locking, and supremum interval upper bounds live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(lockDetailScenarios).map(([key, item]) => {
              const isActive = selectedLockDetailScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedLockDetailScenario(key)}
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
                        item.badgeColor === "cyan" && "bg-cyan-950 text-cyan-400 border border-cyan-800",
                        item.badgeColor === "amber" && "bg-amber-950 text-amber-400 border border-amber-800",
                        item.badgeColor === "rose" && "bg-rose-950 text-rose-400 border border-rose-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Algorithm" : "○ Run Lock Test"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{lockDetailScenarios[selectedLockDetailScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{lockDetailScenarios[selectedLockDetailScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Lock Algorithm Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Lock Algorithm Trace</span>
                <span className="text-emerald-400">Interval Evaluation</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {lockDetailScenarios[selectedLockDetailScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Lock Algorithm</th>
                    <th className="py-3 px-4 text-white">Locked Target</th>
                    <th className="py-3 px-4 text-emerald-400">Interval Bounds</th>
                    <th className="py-3 px-4 text-amber-400">Gap Lock State</th>
                    <th className="py-3 px-4 text-rose-400">Insertion Blocking</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {lockDetailScenarios[selectedLockDetailScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.lockAlgorithm}</td>
                      <td className="py-3 px-4 font-mono text-white">{row.lockedTarget}</td>
                      <td className="py-3 px-4 text-emerald-300 font-mono font-bold">{row.intervalBounds}</td>
                      <td className="py-3 px-4 text-amber-300 font-mono">{row.gapLockActive}</td>
                      <td className="py-3 px-4 text-slate-300 font-sans">{row.insertionBlocking}</td>
                      <td className="py-3 px-4">
                        <span
                          className={clsx(
                            "px-2 py-0.5 rounded text-[11px] font-sans font-medium border",
                            row.status.includes("Optimal") || row.status.includes("Protected") || row.status.includes("Locked")
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
              Resolving gap lock insertion deadlocks in student ID allocation in Barrackpore.
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
                  Eliminating Gap Lock Deadlocks during Concurrent Student ID Reservations
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Admission Server</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui fixed an architectural deadlock in an online enrollment API: Session 1 checked if student ID 15 was free (`SELECT ... WHERE id = 15 FOR UPDATE`), which placed a gap lock on `(10, 20)`. Session 2 simultaneously checked ID 16, also acquiring a gap lock on `(10, 20)`. When both sessions attempted to `INSERT`, each requested an Insert Intention Lock blocked by the other's Gap Lock, triggering a **Deadlock (Error 1213)**! Switching the table to auto-increment primary keys eliminated gap checks, eliminating deadlocks completely.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Architectural Fix: Rely on Auto-Increment Primary Keys instead of Gap Lookups:
ALTER TABLE students MODIFY student_id INT AUTO_INCREMENT;
-- Direct parallel inserts without pre-checking non-existent IDs with gap locks!`}
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
              Avoid querying non-existent IDs with FOR UPDATE and switch to READ COMMITTED if gap deadlocks occur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Querying Non-Existent Records with FOR UPDATE
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Searching for a non-existent key with `SELECT ... FOR UPDATE` acquires a Gap Lock on the surrounding interval, inadvertently blocking other sessions from inserting into that entire range!
              </p>
              <div className="text-xs text-slate-400">
                Fix: Rely on Unique Constraints and `INSERT ... ON DUPLICATE KEY UPDATE` instead!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Leverage Unique Key Record Lock Optimization
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Ensure lookups use exact primary key equality predicates (`WHERE id = ?`) so InnoDB applies only a Record Lock (`LOCK_REC_NOT_GAP`), allowing adjacent concurrent inserts without gap lock contention.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees zero gap lock overhead for single-record lookups.
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
              Key takeaways for Record, Gap &amp; Next-Key Locks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Lock Algorithms Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-cyan-300">Record Lock</strong> locks index record only (`LOCK_REC_NOT_GAP`).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-300">Gap Lock</strong> locks empty space between records to block inserts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span><strong className="text-cyan-300">Next-Key Lock</strong> = Record Lock + Preceding Gap `(prev, current]`.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span><strong className="text-cyan-300">Supremum Lock</strong> locks the upper interval `(max_key, +inf)`.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe data_locks in MySQL 8.0...”</span>
                  Query `performance_schema.data_locks` to see exactly whether a lock is `X,REC_NOT_GAP` (pure record), `X,GAP` (pure gap), or `X` (next-key lock)!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about gap lock deadlocks...”</span>
                  Remember that two transactions can both hold gap locks on (10, 20) without conflicting, but when both try to insert, both deadlock immediately!
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
              Comprehensive reference questions covering InnoDB's row-level locking algorithms: Record Locks (LOCK_REC_NOT_GAP), Gap Locks (LOCK_GAP), Next-Key Locks (LOCK_ORDINARY), Insert Intention Locks, and Supremum pseudo-records.
            </p>
          </div>

          <FAQTemplate
            title="InnoDB Locking Details FAQs"
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
            title="InnoDB Locking Details: Record Locks, Gap Locks, and Next-Key Locks"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic11_note.txt"
          />

          <Teacher
            note="To master MySQL performance tuning, you must understand the exact mechanics of Record Locks, Gap Locks, and Next-Key Locks. Remember that Next-Key Locks (the half-open interval (prev, current]) are what make REPEATABLE READ phantom-free! But beware: querying non-existent rows with FOR UPDATE creates pure Gap Locks that can cause subtle insertion deadlocks. Use exact Primary Key lookups whenever possible to benefit from the Record-Lock-Only optimization!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic11;
