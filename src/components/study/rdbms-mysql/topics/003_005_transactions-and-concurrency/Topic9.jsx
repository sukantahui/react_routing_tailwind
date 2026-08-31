import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";

/**
 * Topic9 – Locking Mechanics: Shared Locks (S-Locks) vs Exclusive Locks (X-Locks)
 * Module: 003_005_transactions-and-concurrency
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on InnoDB locking mechanics: Shared Locks (S-Locks), Exclusive Locks (X-Locks), 2x2 lock compatibility matrix, lock wait queues, SKIP LOCKED / NOWAIT modifiers, and lock conversion deadlocks.
 */
const Topic9 = () => {
  // Interactive Simulator State
  const [selectedLockScenario, setSelectedLockScenario] = useState("multi_reader_shared_locks");

  const lockScenarios = {
    multi_reader_shared_locks: {
      title: "1. Shared Locks (S-Locks): Multi-Reader Compatibility",
      badge: "S-Lock (Read Lock)",
      badgeColor: "emerald",
      sqlQuery: `-- 🛡️ MULTI-READER CONCURRENT SHARED LOCKS:
-- Session 1 (Susmita verifying transcript):
START TRANSACTION;
SELECT * FROM student_records WHERE student_id = 101 FOR SHARE;
-- 🔒 Acquires Shared Lock (S-Lock) on Mamata's row!

-- Session 2 CONCURRENTLY (Debangshu verifying transcript):
START TRANSACTION;
SELECT * FROM student_records WHERE student_id = 101 FOR SHARE;
-- ⚡ GRANTED IMMEDIATELY! S-Locks are COMPATIBLE with other S-Locks!

-- Session 3 CONCURRENTLY (Admin attempting to update fee):
-- UPDATE student_records SET fee = 30000 WHERE student_id = 101;
-- 🛑 BLOCKED! X-Lock request waits until Sessions 1 & 2 commit!`,
      resultRows: [
        { session: "Session 1 (Susmita)", requestedLock: "S-Lock (FOR SHARE)", heldLockState: "S-Lock Granted 🔒", lockCompatibility: "Compatible with S", outcome: "Reading Active", status: "Granted ✅" },
        { session: "Session 2 (Debangshu)", requestedLock: "S-Lock (FOR SHARE)", heldLockState: "S-Lock Granted 🔒", lockCompatibility: "Compatible with S", outcome: "Reading Active", status: "Granted ✅" },
        { session: "Session 3 (Admin Update)", requestedLock: "X-Lock (UPDATE)", heldLockState: "Waiting in Queue...", lockCompatibility: "INCOMPATIBLE 💥", outcome: "Blocked by S-Locks", status: "Blocked 🛑" },
      ],
      explanation:
        "Multiple transactions can hold Shared Locks (S-Locks) on the same row concurrently. S-Locks prevent concurrent writers from modifying the row until all readers finish and commit.",
    },
    exclusive_lock_write_conflict: {
      title: "2. Exclusive Locks (X-Locks): Total Write & Read Lockout",
      badge: "X-Lock (Write Lock)",
      badgeColor: "rose",
      sqlQuery: `-- 🔒 EXCLUSIVE LOCK (X-LOCK) IN ACTION:
-- Session 1 (Mamata paying tuition fee):
START TRANSACTION;
SELECT balance FROM student_ledgers WHERE student_id = 101 FOR UPDATE;
-- 🔒 Acquires Exclusive Lock (X-Lock) on Mamata's row!

-- Session 2 CONCURRENTLY (Officer trying to read with S-Lock):
-- SELECT * FROM student_ledgers WHERE student_id = 101 FOR SHARE;
-- 🛑 BLOCKED! S-Lock request is incompatible with active X-Lock!

-- Session 3 CONCURRENTLY (Online portal trying to update balance):
-- UPDATE student_ledgers SET balance = balance + 1000 WHERE student_id = 101;
-- 🛑 BLOCKED! X-Lock request is incompatible with active X-Lock!

COMMIT; -- Session 1 commits, releasing X-Lock and unblocking Sessions 2 & 3!`,
      resultRows: [
        { session: "Session 1 (Mamata Payment)", requestedLock: "X-Lock (FOR UPDATE)", heldLockState: "X-Lock Granted 🔒", lockCompatibility: "Exclusive Access", outcome: "Modifying Balance", status: "Granted ✅" },
        { session: "Session 2 (Officer Audit)", requestedLock: "S-Lock (FOR SHARE)", heldLockState: "Waiting in Queue...", lockCompatibility: "INCOMPATIBLE 💥", outcome: "Blocked by X-Lock", status: "Blocked 🛑" },
        { session: "Session 3 (Online Portal)", requestedLock: "X-Lock (UPDATE)", heldLockState: "Waiting in Queue...", lockCompatibility: "INCOMPATIBLE 💥", outcome: "Blocked by X-Lock", status: "Blocked 🛑" },
      ],
      explanation:
        "An Exclusive Lock (X-Lock) grants exclusive access to a single transaction, blocking all other sessions from acquiring either Shared or Exclusive locks on that row.",
    },
    skip_locked_queue_worker: {
      title: "3. Non-Blocking Job Queues: SELECT ... FOR UPDATE SKIP LOCKED",
      badge: "SKIP LOCKED",
      badgeColor: "cyan",
      sqlQuery: `-- ⚡ HIGH-THROUGHPUT QUEUE WORKERS (SKIP LOCKED):
-- Worker 1 pulls 2 available pending admission emails:
START TRANSACTION;
SELECT email_id, student_id FROM admission_emails 
WHERE status = 'PENDING' 
LIMIT 2 FOR UPDATE SKIP LOCKED;
-- 🔒 Locks email_ids 1 & 2!

-- Worker 2 CONCURRENTLY pulls next 2 available pending emails:
START TRANSACTION;
SELECT email_id, student_id FROM admission_emails 
WHERE status = 'PENDING' 
LIMIT 2 FOR UPDATE SKIP LOCKED;
-- ⚡ GRANTED IMMEDIATELY! Skips locked emails 1 & 2 and claims emails 3 & 4!
-- ZERO LOCK WAITING! ZERO TIMEOUTS!`,
      resultRows: [
        { session: "Worker Thread 1", requestedLock: "X-Lock + SKIP LOCKED", heldLockState: "Locks Rows 1 & 2", lockCompatibility: "Direct Claim", outcome: "Processes Rows 1 & 2", status: "Working ⚡" },
        { session: "Worker Thread 2", requestedLock: "X-Lock + SKIP LOCKED", heldLockState: "Locks Rows 3 & 4", lockCompatibility: "Bypasses Locked Rows", outcome: "Processes Rows 3 & 4", status: "Working ⚡" },
      ],
      explanation:
        "`SELECT ... FOR UPDATE SKIP LOCKED` allows concurrent worker threads to pull distinct available jobs from a single table simultaneously without blocking each other.",
    },
    lock_upgrade_deadlock_hazard: {
      title: "4. Lock Upgrade Deadlock: Concurrent S-Lock to X-Lock Conversions",
      badge: "Upgrade Deadlock",
      badgeColor: "amber",
      sqlQuery: `-- 💥 THE LOCK UPGRADE DEADLOCK TRAP:
-- Session 1 reads Mamata with S-Lock:
START TRANSACTION;
SELECT balance FROM student_ledgers WHERE student_id = 101 FOR SHARE; -- Holds S-Lock

-- Session 2 CONCURRENTLY reads Mamata with S-Lock:
START TRANSACTION;
SELECT balance FROM student_ledgers WHERE student_id = 101 FOR SHARE; -- Holds S-Lock

-- Session 1 attempts to UPGRADE to X-Lock:
UPDATE student_ledgers SET balance = balance - 100 WHERE student_id = 101;
-- ⏳ Session 1 waits for Session 2 to release its S-Lock...

-- Session 2 ALSO attempts to UPGRADE to X-Lock:
UPDATE student_ledgers SET balance = balance - 200 WHERE student_id = 101;
-- 💥 DEADLOCK! Both sessions wait for each other! InnoDB kills Session 2!`,
      resultRows: [
        { session: "Session 1 (Upgrade)", requestedLock: "X-Lock (UPDATE)", heldLockState: "Holds S, Waits for Session 2", lockCompatibility: "Cyclic Dependency", outcome: "Deadlock Detected", status: "Waits ⏳" },
        { session: "Session 2 (Upgrade)", requestedLock: "X-Lock (UPDATE)", heldLockState: "Holds S, Waits for Session 1", lockCompatibility: "Cyclic Dependency", outcome: "Victim Chosen & Killed", status: "💥 Deadlock Abort" },
      ],
      explanation:
        "When two sessions both hold S-Locks on the same row and both try to upgrade to X-Locks, they create a mutual wait dependency, triggering an immediate Deadlock.",
    },
  };

  const navItems = [
    { id: "lock-modes-overview", label: "1. S-Locks vs X-Locks" },
    { id: "compatibility-matrix", label: "2. Lock Compatibility" },
    { id: "svg-diagrams", label: "3. Matrix & Wait Queue SVGs" },
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
            <span>Topic 9 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Locking Mechanics
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Locking Mechanics: S-Locks vs X-Locks
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master the core locking primitives of MySQL InnoDB: Shared Locks (<code className="text-cyan-300 font-mono">S-Locks</code>) and Exclusive Locks (<code className="text-cyan-300 font-mono">X-Locks</code>). Understand the 2x2 lock compatibility matrix, lock wait queues, <code className="text-cyan-300 font-mono">SKIP LOCKED</code> job queues, and avoiding lock conversion deadlocks.
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
        {/* SECTION 1: S-Locks vs X-Locks */}
        <section id="lock-modes-overview" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Two Fundamental Lock Modes
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The building blocks of concurrency control in MySQL InnoDB.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400 font-mono">Shared Lock (S-Lock / Read Lock)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Acquired via <code className="text-emerald-300 font-mono">SELECT ... FOR SHARE</code>. Multiple transactions can hold S-Locks on the same row concurrently. Blocks any incoming transaction requesting an Exclusive Lock (X-Lock).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-rose-400 font-mono">Exclusive Lock (X-Lock / Write Lock)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Acquired via <code className="text-rose-300 font-mono">INSERT</code>, <code className="text-rose-300 font-mono">UPDATE</code>, <code className="text-rose-300 font-mono">DELETE</code>, or <code className="text-rose-300 font-mono">SELECT ... FOR UPDATE</code>. Only ONE transaction can hold an X-Lock, blocking all other readers and writers.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Lock Compatibility */}
        <section id="compatibility-matrix" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. The 2x2 Lock Compatibility Matrix
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Determining whether an incoming lock request is granted immediately or placed into a wait queue.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300">
              <thead className="bg-slate-950 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                <tr>
                  <th className="py-3 px-4 text-white">Currently Held Lock Mode</th>
                  <th className="py-3 px-4 text-emerald-400">Incoming Shared Request (S)</th>
                  <th className="py-3 px-4 text-rose-400">Incoming Exclusive Request (X)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono text-xs">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-emerald-300">Shared Lock (S-Lock)</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">COMPATIBLE (Granted Immediately) ✅</td>
                  <td className="py-3 px-4 text-rose-400 font-bold">CONFLICT (Waits in Queue) 🛑</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-rose-300">Exclusive Lock (X-Lock)</td>
                  <td className="py-3 px-4 text-rose-400 font-bold">CONFLICT (Waits in Queue) 🛑</td>
                  <td className="py-3 px-4 text-rose-400 font-bold">CONFLICT (Waits in Queue) 🛑</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Compatibility Matrix &amp; Lock Wait Queues
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Visualizing lock coexistence and FIFO lock wait queue queuing.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Compatibility */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> InnoDB Lock Compatibility Coexistence
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* S + S */}
                  <g>
                    <rect x="30" y="30" width="370" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="215" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">SHARED + SHARED (S + S)</text>
                    <rect x="45" y="70" width="340" height="40" rx="4" fill="#022c22" />
                    <text x="215" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Reader 1 (S-Lock) + Reader 2 (S-Lock)</text>
                    <text x="215" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">⚡ 100% COMPATIBLE · Granted Immediately</text>
                  </g>

                  {/* S + X or X + X */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
                    <text x="630" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">SHARED + EXCLUSIVE (S + X or X + X)</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#1e293b" />
                    <text x="630" y="88" fill="#f87171" fontSize="8 font-mono font-bold" textAnchor="middle">Reader (S-Lock) vs Writer (X-Lock)</text>
                    <text x="630" y="102" fill="#fca5a5" fontSize="7 font-bold" textAnchor="middle">🛑 CONFLICT · Writer Waits in Lock Queue</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* SVG 2: Wait Queue */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-rose-400 font-mono">Diagram B:</span> FIFO Lock Wait Dependency Pipeline
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Session 1 */}
                  <g>
                    <rect x="30" y="30" width="220" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="140" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">1. Session 1 (Active)</text>
                    <rect x="40" y="70" width="200" height="40" rx="4" fill="#022c22" />
                    <text x="140" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Holds X-Lock on Row 101</text>
                    <text x="140" y="102" fill="#34d399" fontSize="7 font-mono" textAnchor="middle">Modifying Student Ledger</text>
                  </g>

                  {/* Session 2 */}
                  <g>
                    <rect x="290" y="30" width="230" height="100" rx="8" fill="#451a03" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="405" y="55" fill="#fcd34d" fontSize="10" fontWeight="bold" textAnchor="middle">2. Session 2 (Wait Queue #1)</text>
                    <rect x="300" y="70" width="210" height="40" rx="4" fill="#1e293b" />
                    <text x="405" y="88" fill="#fbbf24" fontSize="8 font-mono font-bold" textAnchor="middle">Waiting for S-Lock</text>
                    <text x="405" y="102" fill="#fde68a" fontSize="7 font-mono" textAnchor="middle">Blocked by Session 1</text>
                  </g>

                  {/* Session 3 */}
                  <g>
                    <rect x="560" y="30" width="240" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
                    <text x="680" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">3. Session 3 (Wait Queue #2)</text>
                    <rect x="570" y="70" width="220" height="40" rx="4" fill="#1e293b" />
                    <text x="680" y="88" fill="#f87171" fontSize="8 font-mono font-bold" textAnchor="middle">Waiting for X-Lock</text>
                    <text x="680" y="102" fill="#fca5a5" fontSize="7 font-bold" textAnchor="middle">FIFO Lock Wait Queue</text>
                  </g>

                  {/* Arrows */}
                  <path d="M 250 80 L 290 80" stroke="#f59e0b" strokeWidth="1.5" />
                  <path d="M 520 80 L 560 80" stroke="#ef4444" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Lock Mechanics Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test multi-reader S-Lock compatibility, exclusive X-Lock conflicts, non-blocking SKIP LOCKED queues, and lock conversion deadlocks live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(lockScenarios).map(([key, item]) => {
              const isActive = selectedLockScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedLockScenario(key)}
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
                    {isActive ? "● Active Model" : "○ Run Lock Test"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{lockScenarios[selectedLockScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{lockScenarios[selectedLockScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                InnoDB Lock Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Lock Execution Trace</span>
                <span className="text-emerald-400">Lock Compatibility Evaluation</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {lockScenarios[selectedLockScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Session / Worker</th>
                    <th className="py-3 px-4 text-white">Requested Lock</th>
                    <th className="py-3 px-4 text-emerald-400">Held Lock State</th>
                    <th className="py-3 px-4 text-amber-400">Lock Compatibility</th>
                    <th className="py-3 px-4 text-indigo-400">Runtime Outcome</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {lockScenarios[selectedLockScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.session}</td>
                      <td className="py-3 px-4 font-mono text-white">{row.requestedLock}</td>
                      <td className="py-3 px-4 text-emerald-300 font-mono">{row.heldLockState}</td>
                      <td className="py-3 px-4 text-amber-300 font-mono">{row.lockCompatibility}</td>
                      <td className="py-3 px-4 text-slate-300 font-sans">{row.outcome}</td>
                      <td className="py-3 px-4">
                        <span
                          className={clsx(
                            "px-2 py-0.5 rounded text-[11px] font-sans font-medium border",
                            row.status.includes("Granted") || row.status.includes("Working")
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
              Real-world multi-worker email queue processing with SKIP LOCKED in Barrackpore.
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
                  Processing 50,000 Admission Emails with Zero Deadlocks in Barrackpore
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Notification Daemon</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui optimized a background email notification service running 16 concurrent worker threads: Previously, workers ran `SELECT ... FOR UPDATE LIMIT 10`, causing workers to block each other and encounter Lock Wait Timeouts (Error 1205). Adding <code className="text-emerald-300 font-mono">SKIP LOCKED</code> allowed all 16 workers to instantly claim distinct unreserved email batches simultaneously, processing 50,000 emails in <strong>2.4 minutes with ZERO deadlocks and ZERO lock wait latency</strong>!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- High-Speed Concurrent Queue Claiming Pattern:
START TRANSACTION;
SELECT email_id, recipient, message_body 
FROM outbox_queue 
WHERE status = 'PENDING' 
ORDER BY priority DESC, email_id ASC 
LIMIT 20 
FOR UPDATE SKIP LOCKED;

-- Mark claimed rows as 'PROCESSING' & Commit:
UPDATE outbox_queue SET status = 'PROCESSING' WHERE email_id IN (...);
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
              Avoid un-indexed locking reads and never perform external HTTP API calls while holding locks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Un-Indexed Column in SELECT FOR UPDATE
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                If the `WHERE` condition in `SELECT ... FOR UPDATE` does not use an index, InnoDB performs a full table scan and acquires Exclusive Locks on <strong>every row in the table</strong>, completely locking out the system!
              </p>
              <div className="text-xs text-slate-400">
                Fix: Always ensure locking reads use an indexed or Primary Key column!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Leverage SKIP LOCKED for Queue Tables
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                When building database-backed message queues or batch job tables, always use <code className="text-emerald-400 font-mono">FOR UPDATE SKIP LOCKED</code> to allow concurrent consumer workers to process jobs in parallel without lock contention.
              </p>
              <div className="text-xs text-slate-400">
                Eliminates lock wait timeouts in multi-threaded workers.
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
              Key takeaways for S-Locks vs X-Locks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Locking Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-cyan-300">S-Locks</strong> allow multiple readers; block writers (<code className="text-cyan-300 font-mono">FOR SHARE</code>).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-300">X-Locks</strong> grant exclusive access; block all others (<code className="text-cyan-300 font-mono">FOR UPDATE</code>).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Plain <code className="text-cyan-300 font-mono">SELECT</code>s are completely lock-free under MVCC.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Use <code className="text-cyan-300 font-mono">SKIP LOCKED</code> for non-blocking multi-threaded job queues.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe lock upgrades...”</span>
                  Never read with `FOR SHARE` if you intend to `UPDATE` the row later! Read directly with `FOR UPDATE` to avoid lock upgrade deadlocks!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about foreign keys...”</span>
                  Remember that inserting a child row automatically places a Shared S-Lock on the referenced parent row!
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
              Comprehensive reference questions covering InnoDB locking mechanics: Shared Locks (S-Locks), Exclusive Locks (X-Locks), 2x2 lock compatibility matrix, lock wait queues, SKIP LOCKED / NOWAIT modifiers, and lock conversion deadlocks.
            </p>
          </div>

          <FAQTemplate
            title="Shared vs Exclusive Locks FAQs"
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
            title="Locking Mechanics: Shared Locks (S-Locks) vs Exclusive Locks (X-Locks)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic9_note.txt"
          />

          <Teacher
            note="Locking mechanics are the ultimate arbiter of database concurrency. Remember the fundamental distinction: Shared S-Locks allow concurrent readers but block writers; Exclusive X-Locks grant exclusive access and block everyone. Never acquire an S-Lock with the intent of updating the row later—always read directly with FOR UPDATE to prevent lock conversion deadlocks! And for background workers, SKIP LOCKED is your secret weapon for infinite horizontal scalability."
          />
        </section>
      </main>
    </div>
  );
};

export default Topic9;
