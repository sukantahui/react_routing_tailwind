import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic14_files/topic14_questions";
import noteText from "./topic14_files/topic14_note.txt?raw";

/**
 * Topic14 – Deadlocks: How Deadlocks Occur, InnoDB Deadlock Detection, and Resolution Strategies
 * Module: 003_005_transactions-and-concurrency
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on database deadlocks: Wait-For graph cycle detection, victim selection heuristics, Error 1213 analysis, SHOW ENGINE INNODB STATUS forensics, deterministic lock ordering, and exponential retry strategies.
 */
const Topic14 = () => {
  // Interactive Simulator State
  const [selectedDeadlockScenario, setSelectedDeadlockScenario] = useState("inverse_order_deadlock");

  const deadlockScenarios = {
    inverse_order_deadlock: {
      title: "1. Inverse Order Deadlock: Circular Wait Dependency & Victim Rollback",
      badge: "Inverse Order Deadlock",
      badgeColor: "rose",
      sqlQuery: `-- 💥 INVERSE ORDER DEADLOCK REPRODUCTION:
-- Session 1 (Transfers from Mamata to Susmita):
START TRANSACTION;
UPDATE student_ledgers SET balance = balance - 1000 WHERE student_id = 101; -- Locks Mamata (Row 101)

-- Session 2 CONCURRENTLY (Transfers from Susmita to Mamata):
START TRANSACTION;
UPDATE student_ledgers SET balance = balance - 1000 WHERE student_id = 102; -- Locks Susmita (Row 102)

-- Session 1 NOW requests Susmita:
UPDATE student_ledgers SET balance = balance + 1000 WHERE student_id = 102;
-- ⏳ Session 1 waits on Session 2...

-- Session 2 NOW requests Mamata:
UPDATE student_ledgers SET balance = balance + 1000 WHERE student_id = 101;
-- 💥 DEADLOCK DETECTED!
-- InnoDB traverses Wait-For Graph: Session 1 &rarr; Session 2 -&gt; Session 1 (CYCLE!)
-- InnoDB selects Session 2 as Victim (fewer undo logs):
-- 🚨 Session 2 receives: ERROR 1213 (40001): Deadlock found; try restarting transaction!
-- ⚡ Session 1 unblocks and commits successfully!`,
      resultRows: [
        { session: "Session 1 (Winner)", holdsLockOn: "Row 101 (Mamata)", waitsForLockOn: "Row 102 (Susmita)", engineDecision: "Winner (Maintained)", finalAction: "Unblocks & Commits ✅", status: "Succeeded ✅" },
        { session: "Session 2 (Victim)", holdsLockOn: "Row 102 (Susmita)", waitsForLockOn: "Row 101 (Mamata)", engineDecision: "Victim Selected (Least Undo)", finalAction: "Rolled Back (Error 1213) 🚨", status: "💥 Deadlock Abort" },
      ],
      explanation:
        "Session 1 holds Row 101 and waits for Row 102, while Session 2 holds Row 102 and waits for Row 101. InnoDB's deadlock detector instantly detects the cycle, selects Session 2 as the victim, rolls it back, and allows Session 1 to proceed.",
    },
    lock_upgrade_deadlock: {
      title: "2. Lock Upgrade Deadlock: Mutual S-Lock to X-Lock Conversions",
      badge: "Lock Upgrade Deadlock",
      badgeColor: "amber",
      sqlQuery: `-- 💥 LOCK UPGRADE DEADLOCK:
-- Both sessions read Mamata with Shared S-Locks:
-- Session 1:
START TRANSACTION;
SELECT balance FROM student_ledgers WHERE student_id = 101 FOR SHARE; -- Holds S-Lock

-- Session 2:
START TRANSACTION;
SELECT balance FROM student_ledgers WHERE student_id = 101 FOR SHARE; -- Holds S-Lock

-- Session 1 attempts to upgrade to Exclusive X-Lock:
UPDATE student_ledgers SET balance = balance - 500 WHERE student_id = 101;
-- ⏳ Session 1 waits for Session 2 to release S-Lock...

-- Session 2 ALSO attempts to upgrade to Exclusive X-Lock:
UPDATE student_ledgers SET balance = balance - 200 WHERE student_id = 101;
-- 💥 DEADLOCK! Mutual upgrade conflict!
-- InnoDB aborts Session 2 with Error 1213!`,
      resultRows: [
        { session: "Session 1 (Winner)", holdsLockOn: "S-Lock on 101", waitsForLockOn: "Upgrade to X-Lock", engineDecision: "Winner", finalAction: "Acquires X-Lock & Commits", status: "Succeeded ✅" },
        { session: "Session 2 (Victim)", holdsLockOn: "S-Lock on 101", waitsForLockOn: "Upgrade to X-Lock", engineDecision: "Victim Selected", finalAction: "Rolled Back (Error 1213) 🚨", status: "💥 Deadlock Abort" },
      ],
      explanation:
        "When two sessions both hold S-Locks on the same row and both attempt to upgrade to an X-Lock, each waits for the other to release its S-Lock, causing an immediate deadlock.",
    },
    innodb_status_forensics: {
      title: "3. Deadlock Forensics: Inspecting SHOW ENGINE INNODB STATUS",
      badge: "InnoDB Status Forensics",
      badgeColor: "cyan",
      sqlQuery: `-- 🔍 DEADLOCK FORENSICS INSPECTION:
SHOW ENGINE INNODB STATUS;

-- =====================================
-- 🚨 LATEST DETECTED DEADLOCK SECTION:
-- -------------------------------------
-- (1) TRANSACTION:
-- ACTIVE 2 sec starting index read, query id 842 updating
-- UPDATE student_ledgers SET balance = balance + 1000 WHERE student_id = 102
-- WAITING FOR THIS LOCK TO BE GRANTED:
-- RECORD LOCKS space id 42 page no 3 n bits 72 index PRIMARY of table student_ledgers trx id 1005 lock_mode X locks rec but not gap waiting
--
-- (2) TRANSACTION:
-- ACTIVE 1 sec starting index read, query id 843 updating
-- UPDATE student_ledgers SET balance = balance + 1000 WHERE student_id = 101
-- HOLDS THE LOCK(S): RECORD LOCKS index PRIMARY ... lock_mode X
-- WAITING FOR THIS LOCK TO BE GRANTED: ... lock_mode X waiting
-- *** WE ROLL BACK TRANSACTION (2) ***`,
      resultRows: [
        { session: "Transaction (1)", holdsLockOn: "Lock on Row 101", waitsForLockOn: "X-Lock on Row 102", engineDecision: "Active Transaction", finalAction: "Granted Lock after (2) killed", status: "Winner ✅" },
        { session: "Transaction (2)", holdsLockOn: "Lock on Row 102", waitsForLockOn: "X-Lock on Row 101", engineDecision: "Rolled Back by Engine", finalAction: "Abort & Undo Flushed", status: "Victim 🚨" },
      ],
      explanation:
        "`SHOW ENGINE INNODB STATUS` outputs the complete forensic trace of the latest detected deadlock, showing the exact SQL statements, thread IDs, held locks, and victim selection decisions.",
    },
    deterministic_ordering_retry: {
      title: "4. Prevention & Resolution: Sorted Lock Ordering & Retry Loop",
      badge: "Sorted Ordering + Retry",
      badgeColor: "emerald",
      sqlQuery: `-- 🛡️ DEADLOCK PREVENTION: DETERMINISTIC LOCK ORDERING:
-- ALWAYS sort IDs in ascending order before locking:
-- If transferring between ID 101 and ID 102, BOTH sessions lock 101 FIRST, then 102!

DELIMITER //

CREATE PROCEDURE sp_transfer_with_deterministic_lock(
    IN p_from_id INT,
    IN p_to_id INT,
    IN p_amount DECIMAL(10,2)
)
BEGIN
    DECLARE v_first_id INT;
    DECLARE v_second_id INT;

    -- Sort IDs in ascending numerical order:
    IF p_from_id < p_to_id THEN
        SET v_first_id = p_from_id;
        SET v_second_id = p_to_id;
    ELSE
        SET v_first_id = p_to_id;
        SET v_second_id = p_from_id;
    END IF;

    START TRANSACTION;
    -- Lock in deterministic order (Circular Wait becomes IMPOSSIBLE!):
    SELECT balance FROM student_ledgers WHERE student_id = v_first_id FOR UPDATE;
    SELECT balance FROM student_ledgers WHERE student_id = v_second_id FOR UPDATE;

    UPDATE student_ledgers SET balance = balance - p_amount WHERE student_id = p_from_id;
    UPDATE student_ledgers SET balance = balance + p_amount WHERE student_id = p_to_id;
    COMMIT;
END //

DELIMITER ;`,
      resultRows: [
        { session: "Session 1 (Transfer 101 -> 102)", holdsLockOn: "Locks 101 then 102", waitsForLockOn: "Zero Cycle", engineDecision: "Deterministic Queue", finalAction: "Executes in Order", status: "Zero Deadlocks 🛡️" },
        { session: "Session 2 (Transfer 102 &rarr; 101)", holdsLockOn: "Locks 101 then 102", waitsForLockOn: "Waits on 101 cleanly", engineDecision: "Linear Lock Queue", finalAction: "Executes in Order", status: "Zero Deadlocks 🛡️" },
      ],
      explanation:
        "Sorting row locks in ascending primary key order guarantees that all concurrent transactions request locks in the exact same sequence, making circular wait deadlocks mathematically impossible.",
    },
  };

  const navItems = [
    { id: "deadlock-overview", label: "1. What is a Deadlock?" },
    { id: "detection-heuristics", label: "2. Detection & Victim Selection" },
    { id: "svg-diagrams", label: "3. Wait-For Graphs & Sorting SVGs" },
    { id: "interactive-sandbox", label: "4. Live Deadlock Workbench" },
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
            <span>Topic 14 of 15 (Final Topic)</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Deadlock Engineering
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Deadlocks: Detection &amp; Resolution Strategies
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master the anatomy of database deadlocks in MySQL InnoDB. Understand Wait-For graph cycle detection, victim selection heuristics (Error 1213), <code className="text-cyan-300 font-mono">SHOW ENGINE INNODB STATUS</code> forensics, deterministic lock ordering, and automated retry architectures with exponential backoff.
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
        {/* SECTION 1: What is a Deadlock? */}
        <section id="deadlock-overview" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. What is a Database Deadlock?
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The circular lock dependency condition in multi-threaded transaction execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-rose-400 font-mono">The Circular Wait Condition</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Occurs when Transaction 1 holds Lock A and requests Lock B, while Transaction 2 holds Lock B and requests Lock A. Neither transaction can proceed, forming an intractable circular dependency cycle.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400 font-mono">Automatic InnoDB Intervention</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                InnoDB's real-time Deadlock Detector traverses the wait-for graph, detects the cycle within milliseconds, selects the smallest transaction as the victim, rolls it back with Error 1213, and allows the winner to complete.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Detection & Victim Selection */}
        <section id="detection-heuristics" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Deadlock Detection &amp; Victim Selection Heuristics
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How the storage engine chooses which transaction to abort.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="font-mono text-cyan-400 font-bold text-xs uppercase">Heuristic 1</span>
              <h3 className="font-bold text-white">Smallest Undo Volume</h3>
              <p className="text-slate-300 text-xs">
                InnoDB picks the transaction that modified the fewest rows (least undo log generated) to minimize rollback overhead.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="font-mono text-rose-400 font-bold text-xs uppercase">Heuristic 2</span>
              <h3 className="font-bold text-white">Error Code 1213</h3>
              <p className="text-slate-300 text-xs">
                The victim transaction receives `ERROR 1213 (40001): Deadlock found; try restarting transaction`.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="font-mono text-emerald-400 font-bold text-xs uppercase">Heuristic 3</span>
              <h3 className="font-bold text-white">Winner Unblocks Instantly</h3>
              <p className="text-slate-300 text-xs">
                The winning transaction receives its requested lock immediately and proceeds to execution with zero data loss.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Circular Wait Graph &amp; Sorted Lock Ordering
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Visualizing the deadlock cycle graph and deterministic lock ordering prevention.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Wait-For Cycle */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-rose-400 font-mono">Diagram A:</span> The Circular Wait-For Deadlock Cycle
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Tx 1 */}
                  <g>
                    <rect x="30" y="30" width="370" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="215" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">TRANSACTION 1 (Holds Row 101)</text>
                    <rect x="45" y="70" width="340" height="40" rx="4" fill="#0f172a" />
                    <text x="215" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Holds X-Lock on 101 → Requests X-Lock on 102</text>
                    <text x="215" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">⏳ WAITING on Transaction 2...</text>
                  </g>

                  {/* Tx 2 */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
                    <text x="630" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">TRANSACTION 2 (Holds Row 102)</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#1e293b" />
                    <text x="630" y="88" fill="#f87171" fontSize="8 font-mono font-bold" textAnchor="middle">Holds X-Lock on 102 → Requests X-Lock on 101</text>
                    <text x="630" y="102" fill="#fca5a5" fontSize="7 font-bold" textAnchor="middle">💥 CIRCULAR CYCLE → Selected as Victim &amp; Killed!</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* SVG 2: Deterministic Ordering */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400 font-mono">Diagram B:</span> Deterministic Ascending Primary Key Ordering (Zero Deadlocks)
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Tx 1 Sorted */}
                  <g>
                    <rect x="30" y="30" width="370" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="215" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">TRANSACTION 1 (Sorted: 101 → 102)</text>
                    <rect x="45" y="70" width="340" height="40" rx="4" fill="#022c22" />
                    <text x="215" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Locks Row 101 FIRST → Then locks Row 102</text>
                    <text x="215" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">⚡ Acquires Locks in Linear Order</text>
                  </g>

                  {/* Tx 2 Sorted */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="630" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">TRANSACTION 2 (Sorted: 101 → 102)</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#022c22" />
                    <text x="630" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Attempts to lock Row 101 FIRST (Queues cleanly)</text>
                    <text x="630" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">🛡️ Circular Dependency is Mathematically IMPOSSIBLE!</text>
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
              4. Interactive Deadlock Simulator Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test circular wait reproduction, lock upgrade deadlocks, SHOW ENGINE INNODB STATUS forensic traces, and deterministic lock ordering live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(deadlockScenarios).map(([key, item]) => {
              const isActive = selectedDeadlockScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedDeadlockScenario(key)}
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
                        item.badgeColor === "rose" && "bg-rose-950 text-rose-400 border border-rose-800",
                        item.badgeColor === "amber" && "bg-amber-950 text-amber-400 border border-amber-800",
                        item.badgeColor === "cyan" && "bg-cyan-950 text-cyan-400 border border-cyan-800",
                        item.badgeColor === "emerald" && "bg-emerald-950 text-emerald-400 border border-emerald-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Deadlock" : "○ Run Deadlock Test"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{deadlockScenarios[selectedDeadlockScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{deadlockScenarios[selectedDeadlockScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Deadlock Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Deadlock Execution Trace</span>
                <span className="text-emerald-400">Wait-For Graph Analysis</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {deadlockScenarios[selectedDeadlockScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Session / Actor</th>
                    <th className="py-3 px-4 text-white">Holds Lock On</th>
                    <th className="py-3 px-4 text-amber-400">Waits For Lock On</th>
                    <th className="py-3 px-4 text-rose-400">Engine Decision</th>
                    <th className="py-3 px-4 text-emerald-400">Final Action</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {deadlockScenarios[selectedDeadlockScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.session}</td>
                      <td className="py-3 px-4 font-mono text-white">{row.holdsLockOn}</td>
                      <td className="py-3 px-4 text-amber-300 font-mono">{row.waitsForLockOn}</td>
                      <td className="py-3 px-4 text-rose-300 font-sans">{row.engineDecision}</td>
                      <td className="py-3 px-4 text-slate-300 font-mono">{row.finalAction}</td>
                      <td className="py-3 px-4">
                        <span
                          className={clsx(
                            "px-2 py-0.5 rounded text-[11px] font-sans font-medium border",
                            row.status.includes("Succeeded") || row.status.includes("Zero")
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
              Real-world elimination of 200 deadlocks/minute in Barrackpore online exam seat booking.
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
                  Eliminating 200 Deadlocks/Minute in Barrackpore Exam Seat Booking
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Online Exam Portal</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui audited an exam booking service processing 5,000 concurrent seat swaps: Workers swapped student lab allocations by updating Student A then Student B in one worker, and Student B then Student A in another worker, generating over 200 deadlocks per minute! Refactoring the service to always sort student IDs in ascending numerical order (`WHERE student_id IN (101, 102) ORDER BY student_id ASC`) eliminated circular dependencies, reducing deadlocks to <strong>ZERO</strong>!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Java Spring Data JPA Deterministic Lock Ordering:
List<Long> sortedIds = Arrays.asList(studentAId, studentBId);
Collections.sort(sortedIds); // Always sort ascending!

// Lock both rows in deterministic sequence:
for (Long id : sortedIds) {
    studentRepository.findByIdForUpdate(id);
}`}
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
              Always sort lock acquisition orders and add randomized jitter to deadlock retry loops.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Retrying Deadlocks Without Randomized Jitter
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                If two colliding transactions catch Error 1213 and both retry at the exact same 100ms interval, they will collide and deadlock repeatedly (Thundering Herd retry storm)!
              </p>
              <div className="text-xs text-slate-400">
                Fix: Always add randomized jitter (e.g. `backoff = 100ms + rand(0, 50ms)`)!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Enforce Global Deterministic Lock Ordering
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Ensure that all services, batch jobs, and APIs always acquire multi-row locks in the exact same ascending Primary Key order.
              </p>
              <div className="text-xs text-slate-400">
                Mathematically guarantees zero circular wait cycles.
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
              Key takeaways for Deadlocks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Deadlocks Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-cyan-300">Deadlocks</strong> are circular lock wait dependencies broken by InnoDB.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>InnoDB selects the smallest transaction as victim (<strong className="text-rose-400">Error 1213</strong>).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Inspect <code className="text-cyan-300 font-mono">SHOW ENGINE INNODB STATUS</code> for latest deadlock trace.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Eliminate deadlocks via <strong className="text-emerald-300">Ascending Key Ordering</strong> and retry loops.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe innodb_print_all_deadlocks...”</span>
                  Enable `SET GLOBAL innodb_print_all_deadlocks = ON;` in staging and production to capture every single deadlock event in the MySQL server error log for root-cause analysis!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about application resilience...”</span>
                  Never treat deadlocks as fatal system crashes! In high-concurrency systems, deadlocks are normal—build automated retry handlers with exponential backoff!
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
              Comprehensive reference questions covering database deadlocks: Wait-For graph cycle detection, victim selection heuristics, Error 1213 analysis, SHOW ENGINE INNODB STATUS forensics, deterministic lock ordering, and exponential retry strategies.
            </p>
          </div>

          <FAQTemplate
            title="Deadlocks FAQs"
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
            title="Deadlocks: How Deadlocks Occur, InnoDB Deadlock Detection, and Resolution Strategies"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic14_note.txt"
          />

          <Teacher
            note="Deadlocks are the hallmark of concurrent relational systems. Senior database engineers know that deadlocks cannot be eliminated 100%—they are a natural byproduct of multi-user pessimistic locking. The two foundational architectural solutions are: 1) Enforce consistent, ascending Primary Key lock ordering across all applications to eliminate circular dependencies; and 2) Build robust, automated application retry loops with exponential backoff and jitter to catch Error 1213 seamlessly. You have now completed Module 003_005—congratulations!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic14;
