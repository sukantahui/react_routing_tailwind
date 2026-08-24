import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic12_files/topic12_questions";
import noteText from "./topic12_files/topic12_note.txt?raw";

/**
 * Topic12 – Pessimistic Locking with SELECT ... FOR UPDATE and SELECT ... FOR SHARE
 * Module: 003_005_transactions-and-concurrency
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on Pessimistic Locking in MySQL 8.0: SELECT ... FOR UPDATE, SELECT ... FOR SHARE, NOWAIT fast-failure, SKIP LOCKED non-blocking queues, OF table_name join locking, and avoiding HTTP-lock holding anti-patterns.
 */
const Topic12 = () => {
  // Interactive Simulator State
  const [selectedPessimisticScenario, setSelectedPessimisticScenario] = useState("balance_debit_for_update");

  const pessimisticScenarios = {
    balance_debit_for_update: {
      title: "1. Exclusive Locking (FOR UPDATE): Bank Balance Debit Guard",
      badge: "SELECT ... FOR UPDATE",
      badgeColor: "rose",
      sqlQuery: `-- 🛡️ PESSIMISTIC EXCLUSIVE LOCKING (Bank Balance Guard):
START TRANSACTION;

-- 1. Read balance and ACQUIRE EXCLUSIVE LOCK (X-Lock) on Mamata's row:
SELECT balance INTO @current_bal 
FROM student_ledgers 
WHERE student_id = 101 FOR UPDATE;

-- 2. Verify balance in application logic:
-- (Assume @current_bal is ₹25,000; deducting ₹5,000 is valid)

-- 3. Perform deduction:
UPDATE student_ledgers 
SET balance = balance - 5000.00 
WHERE student_id = 101;

-- 4. Commit and release lock:
COMMIT; -- Mamata's balance is now ₹20,000.00! Double-spending PREVENTED!`,
      resultRows: [
        { operation: "SELECT ... FOR UPDATE", lockMode: "Exclusive (X-Lock)", concurrentSReads: "Blocked 🛑", concurrentXWrites: "Blocked 🛑", plainMvccReads: "Allowed (Non-blocking) ✅", status: "Row Exclusively Locked 🔒" },
        { operation: "UPDATE student_ledgers", lockMode: "Held X-Lock", concurrentSReads: "Blocked 🛑", concurrentXWrites: "Blocked 🛑", plainMvccReads: "Allowed (Non-blocking) ✅", status: "Mutated Safely" },
        { operation: "COMMIT", lockMode: "Zero (Released)", concurrentSReads: "Unblocked", concurrentXWrites: "Unblocked", plainMvccReads: "Allowed ✅", status: "Committed & Freed ✅" },
      ],
      explanation:
        "`SELECT ... FOR UPDATE` acquires an Exclusive Lock during the initial read, ensuring that no other concurrent transaction can read with `FOR SHARE` or modify the row with `UPDATE` until the transaction commits.",
    },
    parent_record_for_share: {
      title: "2. Shared Locking (FOR SHARE): Parent Record Integrity Protection",
      badge: "SELECT ... FOR SHARE",
      badgeColor: "emerald",
      sqlQuery: `-- 🛡️ PESSIMISTIC SHARED LOCKING (Parent Integrity Guard):
START TRANSACTION;

-- 1. Verify Department exists and ACQUIRE SHARED LOCK (S-Lock):
SELECT department_id, name 
FROM departments 
WHERE department_id = 1 FOR SHARE;

-- 🔍 Benefit:
-- 1. Other concurrent student admissions CAN ALSO read Department 1 with FOR SHARE!
-- 2. But NO DBA can DELETE or RENAME Department 1 while enrollment is in progress!

-- 2. Enroll Mamata into Department 1:
INSERT INTO student_enrollments (student_id, department_id) VALUES (101, 1);

COMMIT; -- Releases S-Lock on Department 1!`,
      resultRows: [
        { operation: "SELECT ... FOR SHARE", lockMode: "Shared (S-Lock)", concurrentSReads: "Allowed (Compatible) ✅", concurrentXWrites: "Blocked 🛑", plainMvccReads: "Allowed ✅", status: "Shared S-Lock Active 📖" },
        { operation: "INSERT student_enrollments", lockMode: "Held S + Insert X", concurrentSReads: "Allowed ✅", concurrentXWrites: "Parent Deletion Blocked", plainMvccReads: "Allowed ✅", status: "Enrolled Safely" },
        { operation: "COMMIT", lockMode: "Zero (Released)", concurrentSReads: "Allowed", concurrentXWrites: "Unblocked", plainMvccReads: "Allowed ✅", status: "Committed & Freed ✅" },
      ],
      explanation:
        "`SELECT ... FOR SHARE` acquires a Shared Lock, allowing multiple transactions to read and reference the parent row simultaneously while preventing concurrent transactions from updating or deleting it.",
    },
    fast_failure_nowait: {
      title: "3. Fast-Failure (NOWAIT): Instant Overbooking Rejection",
      badge: "NOWAIT Clause",
      badgeColor: "amber",
      sqlQuery: `-- ⚡ FAST-FAILURE WITH NOWAIT (Zero Latency Lock Check):
-- Session 1 is currently processing seat booking for Room 101:
-- (Holds X-Lock on room_id = 101)

-- Session 2 attempts to book the SAME seat with NOWAIT:
START TRANSACTION;
SELECT room_id, available_seats 
FROM exam_rooms 
WHERE room_id = 101 FOR UPDATE NOWAIT;

-- 💥 INSTANT RESULT:
-- ERROR 3572 (HY000): Statement aborted because lock(s) could not be acquired immediately and NOWAIT was set!
-- ⚡ Zero lock wait latency! Application catches Error 3572 and instantly shows 'Seat currently in checkout by another student!'`,
      resultRows: [
        { operation: "Session 2: FOR UPDATE NOWAIT", lockMode: "Immediate X-Lock Attempt", concurrentSReads: "N/A", concurrentXWrites: "N/A", plainMvccReads: "N/A", status: "💥 ERROR 3572 (HY000)" },
      ],
      explanation:
        "`NOWAIT` eliminates lock wait delays. If any requested row is currently locked, MySQL aborts the query immediately with Error 3572, allowing web applications to return instant user feedback.",
    },
    skip_locked_task_queue: {
      title: "4. Non-Blocking Task Queue (SKIP LOCKED): High-Throughput Workers",
      badge: "SKIP LOCKED Clause",
      badgeColor: "cyan",
      sqlQuery: `-- ⚡ NON-BLOCKING TASK QUEUE WORKER (SKIP LOCKED):
-- Worker 1 claims first available pending scholarship application:
START TRANSACTION;
SELECT application_id, student_id, amount 
FROM scholarship_applications 
WHERE status = 'PENDING' 
ORDER BY application_id ASC 
LIMIT 1 FOR UPDATE SKIP LOCKED;
-- 🔒 Worker 1 locks application_id = 1!

-- Worker 2 CONCURRENTLY runs the EXACT SAME query:
START TRANSACTION;
SELECT application_id, student_id, amount 
FROM scholarship_applications 
WHERE status = 'PENDING' 
ORDER BY application_id ASC 
LIMIT 1 FOR UPDATE SKIP LOCKED;
-- ⚡ GRANTED IMMEDIATELY! Skips application_id = 1 and claims application_id = 2!
-- ZERO LOCK WAITING! ZERO DEADLOCKS!`,
      resultRows: [
        { operation: "Worker 1: FOR UPDATE SKIP LOCKED", lockMode: "X-Lock on Application 1", concurrentSReads: "Bypassed", concurrentXWrites: "Claimed 1", plainMvccReads: "Allowed", status: "Claimed App 1 ⚡" },
        { operation: "Worker 2: FOR UPDATE SKIP LOCKED", lockMode: "X-Lock on Application 2", concurrentSReads: "Bypassed", concurrentXWrites: "Claimed 2", plainMvccReads: "Allowed", status: "Claimed App 2 ⚡" },
      ],
      explanation:
        "`SKIP LOCKED` skips all locked rows and returns available unlocked rows immediately, enabling horizontal scalability for concurrent worker queues without lock contention.",
    },
  };

  const navItems = [
    { id: "pessimistic-overview", label: "1. What is Pessimistic Locking?" },
    { id: "modifiers-nowait-skip", label: "2. NOWAIT & SKIP LOCKED" },
    { id: "svg-diagrams", label: "3. Locking & Modifier SVGs" },
    { id: "interactive-sandbox", label: "4. Live Pessimistic Workbench" },
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
            <span>Topic 12 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Pessimistic Concurrency
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Pessimistic Locking: FOR UPDATE &amp; FOR SHARE
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master explicit pessimistic locking in MySQL 8.0: <code className="text-cyan-300 font-mono">SELECT ... FOR UPDATE</code>, <code className="text-cyan-300 font-mono">SELECT ... FOR SHARE</code>, fast-failure with <code className="text-cyan-300 font-mono">NOWAIT</code>, non-blocking task queues with <code className="text-cyan-300 font-mono">SKIP LOCKED</code>, and table-scoped locking with <code className="text-cyan-300 font-mono">OF table_name</code>.
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
        {/* SECTION 1: What is Pessimistic Locking? */}
        <section id="pessimistic-overview" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. What is Pessimistic Locking?
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The strategy of locking records immediately upon reading to guarantee mutual exclusion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-rose-400 font-mono">SELECT ... FOR UPDATE</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Acquires an Exclusive Lock (X-Lock) on matched index records. Used before modifying records (e.g. balance debits, inventory deductions) to prevent lost updates and race conditions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400 font-mono">SELECT ... FOR SHARE</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Acquires a Shared Lock (S-Lock) on matched index records. Used to verify and protect parent records from deletion while allowing other concurrent readers to read simultaneously.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: NOWAIT & SKIP LOCKED */}
        <section id="modifiers-nowait-skip" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. MySQL 8.0 Non-Blocking Modifiers
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Advanced locking clauses that eliminate indefinite thread queuing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="font-mono text-cyan-400 font-bold text-xs uppercase">Modifier 1</span>
              <h3 className="font-bold text-white">NOWAIT</h3>
              <p className="text-slate-300 text-xs">
                Fails immediately with Error 3572 if any requested row is locked, avoiding waiting in queue.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="font-mono text-emerald-400 font-bold text-xs uppercase">Modifier 2</span>
              <h3 className="font-bold text-white">SKIP LOCKED</h3>
              <p className="text-slate-300 text-xs">
                Bypasses locked rows and returns available unlocked rows immediately. Ideal for job queue tables.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="font-mono text-amber-400 font-bold text-xs uppercase">Modifier 3</span>
              <h3 className="font-bold text-white">OF table_name</h3>
              <p className="text-slate-300 text-xs">
                Restricts row locking to specific tables in multi-table `JOIN` queries, leaving others unlocked.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Read-Modify-Write Pipeline &amp; Modifiers
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Visualizing pessimistic transaction boundaries and NOWAIT / SKIP LOCKED execution flows.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Pipeline */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Pessimistic Read-Modify-Write Execution Boundary
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1: START */}
                  <g>
                    <rect x="20" y="30" width="160" height="100" rx="8" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="100" y="55" fill="#67e8f9" fontSize="10" fontWeight="bold" textAnchor="middle">1. START TRANSACTION</text>
                    <rect x="30" y="70" width="140" height="40" rx="4" fill="#0f172a" />
                    <text x="100" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Suspends Autocommit</text>
                    <text x="100" y="102" fill="#bae6fd" fontSize="7 font-mono" textAnchor="middle">Opens Boundary</text>
                  </g>

                  {/* Step 2: FOR UPDATE */}
                  <g>
                    <rect x="210" y="30" width="220" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
                    <text x="320" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">2. SELECT ... FOR UPDATE</text>
                    <rect x="220" y="70" width="200" height="40" rx="4" fill="#1e293b" />
                    <text x="320" y="88" fill="#f87171" fontSize="8 font-mono font-bold" textAnchor="middle">🔒 Acquires Exclusive X-Lock</text>
                    <text x="320" y="102" fill="#fca5a5" fontSize="7 font-mono" textAnchor="middle">Blocks Concurrent Writers</text>
                  </g>

                  {/* Step 3: UPDATE & COMMIT */}
                  <g>
                    <rect x="460" y="30" width="360" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="640" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">3. UPDATE balance + COMMIT</text>
                    <rect x="475" y="70" width="330" height="40" rx="4" fill="#022c22" />
                    <text x="640" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Mutates Balance &amp; Flushes Redo Log (fsync)</text>
                    <text x="640" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">⚡ Releases X-Lock · Race Condition Prevented ✅</text>
                  </g>

                  {/* Arrows */}
                  <path d="M 180 80 L 210 80" stroke="#06b6d4" strokeWidth="1.5" />
                  <path d="M 430 80 L 460 80" stroke="#ef4444" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* SVG 2: NOWAIT vs SKIP LOCKED */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram B:</span> NOWAIT (Instant Error) vs SKIP LOCKED (Instant Bypass)
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Left: NOWAIT */}
                  <g>
                    <rect x="30" y="30" width="370" height="100" rx="8" fill="#451a03" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="215" y="55" fill="#fcd34d" fontSize="10" fontWeight="bold" textAnchor="middle">FOR UPDATE NOWAIT</text>
                    <rect x="45" y="70" width="340" height="40" rx="4" fill="#1e293b" />
                    <text x="215" y="88" fill="#fbbf24" fontSize="8 font-mono" textAnchor="middle">If Row is Locked → FAILS IMMEDIATELY 💥</text>
                    <text x="215" y="102" fill="#fde68a" fontSize="7 font-bold" textAnchor="middle">⚡ Throws Error 3572 · Zero Lock Waiting Latency</text>
                  </g>

                  {/* Right: SKIP LOCKED */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="630" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">FOR UPDATE SKIP LOCKED</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#022c22" />
                    <text x="630" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">If Row 1 is Locked → Bypasses Row 1 → Claims Row 2 ⚡</text>
                    <text x="630" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">🛡️ Zero Blocking · Parallel Task Queue Workers</text>
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
              4. Interactive Pessimistic Locking Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test exclusive FOR UPDATE debit guards, FOR SHARE parent protections, NOWAIT fast failures, and SKIP LOCKED job queue workers live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(pessimisticScenarios).map(([key, item]) => {
              const isActive = selectedPessimisticScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedPessimisticScenario(key)}
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
                        item.badgeColor === "rose" && "bg-rose-950 text-rose-400 border border-rose-800",
                        item.badgeColor === "emerald" && "bg-emerald-950 text-emerald-400 border border-emerald-800",
                        item.badgeColor === "amber" && "bg-amber-950 text-amber-400 border border-amber-800",
                        item.badgeColor === "cyan" && "bg-cyan-950 text-cyan-400 border border-cyan-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Pattern" : "○ Run Pessimistic Test"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{pessimisticScenarios[selectedPessimisticScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{pessimisticScenarios[selectedPessimisticScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Pessimistic Lock Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Pessimistic Execution Script</span>
                <span className="text-emerald-400">Locking Read Evaluation</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {pessimisticScenarios[selectedPessimisticScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Operation / Step</th>
                    <th className="py-3 px-4 text-white">Acquired Lock Mode</th>
                    <th className="py-3 px-4 text-amber-400">Concurrent S-Reads</th>
                    <th className="py-3 px-4 text-rose-400">Concurrent X-Writes</th>
                    <th className="py-3 px-4 text-emerald-400">Plain MVCC Reads</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {pessimisticScenarios[selectedPessimisticScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.operation}</td>
                      <td className="py-3 px-4 font-mono text-white">{row.lockMode}</td>
                      <td className="py-3 px-4 text-amber-300 font-mono">{row.concurrentSReads}</td>
                      <td className="py-3 px-4 text-rose-300 font-mono">{row.concurrentXWrites}</td>
                      <td className="py-3 px-4 text-emerald-300 font-mono">{row.plainMvccReads}</td>
                      <td className="py-3 px-4">
                        <span
                          className={clsx(
                            "px-2 py-0.5 rounded text-[11px] font-sans font-medium border",
                            row.status.includes("Locked") || row.status.includes("Active") || row.status.includes("Committed") || row.status.includes("Claimed") || row.status.includes("Safely")
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
              Real-world elimination of ATM double-withdrawals in Barrackpore student accounts.
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
                  Preventing Double-Spending in Barrackpore Student Smart Card Wallets
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Canteen &amp; Bookshop Terminal</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui resolved a race condition where a student with ₹500 balance tapped their smart card at the canteen terminal and bookshop terminal within 20 milliseconds: Both terminals read ₹500 simultaneously and approved two ₹500 purchases, causing a ₹500 overdraft! Refactoring the read to execute <code className="text-emerald-300 font-mono">SELECT balance FROM student_wallets WHERE student_id = 101 FOR UPDATE;</code> serialized the terminals, allowing the first purchase to complete and rejecting the second purchase with 'Insufficient Balance'!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Production Pessimistic Balance Debit Procedure:
START TRANSACTION;
SELECT balance INTO v_bal FROM student_wallets WHERE student_id = p_id FOR UPDATE;
IF v_bal >= p_amount THEN
    UPDATE student_wallets SET balance = balance - p_amount WHERE student_id = p_id;
    INSERT INTO wallet_transactions (student_id, amount) VALUES (p_id, p_amount);
    COMMIT;
ELSE
    ROLLBACK;
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Insufficient wallet balance.';
END IF;`}
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
              Never hold database locks across external HTTP calls and always use explicit transaction blocks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Holding Locks Across External HTTP/API Calls
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Acquiring a `SELECT ... FOR UPDATE` lock and then calling an external payment gateway API over HTTP holds the database row lock for seconds, rapidly exhausting all database connection pool threads!
              </p>
              <div className="text-xs text-slate-400">
                Fix: Stage intent, commit, execute HTTP call outside transaction, then update!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Always Enclose in START TRANSACTION ... COMMIT
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                If autocommit is enabled, executing `SELECT ... FOR UPDATE` releases the lock immediately upon statement completion! Always wrap locking reads in explicit transaction boundaries.
              </p>
              <div className="text-xs text-slate-400">
                Ensures locks are held throughout the entire read-modify-write sequence.
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
              Key takeaways for Pessimistic Locking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Pessimistic Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><code className="text-cyan-300 font-mono">FOR UPDATE</code> acquires an Exclusive X-Lock for mutations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span><code className="text-cyan-300 font-mono">FOR SHARE</code> acquires a Shared S-Lock to protect parent data.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span><code className="text-cyan-300 font-mono">NOWAIT</code> fails immediately with Error 3572 if locked.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span><code className="text-cyan-300 font-mono">SKIP LOCKED</code> bypasses locked rows for parallel task queues.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe the OF clause in JOINs...”</span>
                  In multi-table joins, writing `SELECT * FROM orders o JOIN customers c ON ... FOR UPDATE OF o;` locks ONLY the orders table, leaving customers unlocked!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about queue throughput...”</span>
                  Using `SKIP LOCKED` on batch queue tables allows dozens of microservice worker threads to pull jobs simultaneously with zero lock wait latency!
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
              Comprehensive reference questions covering Pessimistic Locking in MySQL 8.0: SELECT ... FOR UPDATE, SELECT ... FOR SHARE, NOWAIT fast-failure, SKIP LOCKED non-blocking queues, OF table_name join locking, and avoiding HTTP-lock holding anti-patterns.
            </p>
          </div>

          <FAQTemplate
            title="Pessimistic Locking FAQs"
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
            title="Pessimistic Locking with SELECT ... FOR UPDATE and SELECT ... FOR SHARE"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic12_note.txt"
          />

          <Teacher
            note="Pessimistic locking is your frontline defense against double-spending and inventory race conditions. Remember the cardinal rules: Always enclose SELECT ... FOR UPDATE in explicit START TRANSACTION ... COMMIT blocks so the lock is held across the modification; ensure the WHERE predicate uses a selective index; leverage NOWAIT and SKIP LOCKED in MySQL 8.0 for zero-latency architectures; and never hold database locks across external network or HTTP API calls!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic12;
