import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

/**
 * Topic1 – The ACID Properties Deep Dive: Atomicity, Consistency, Isolation, Durability
 * Module: 003_005_transactions-and-concurrency
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and architectural workbench on the 4 ACID pillars, InnoDB internal subsystems (Undo Logs, Redo Logs, MVCC Snapshots, Doublewrite Buffer), crash recovery mechanics, and schema integrity guards.
 */
const Topic1 = () => {
  // Interactive Simulator State
  const [selectedAcidPillar, setSelectedAcidPillar] = useState("atomicity_undo_log");

  const acidScenarios = {
    atomicity_undo_log: {
      title: "1. Atomicity: 'All-or-Nothing' Guaranteed by InnoDB Undo Logs",
      badge: "Atomicity",
      badgeColor: "cyan",
      sqlQuery: `-- 🛡️ ATOMICITY IN ACTION (InnoDB Undo Log Rollback):
START TRANSACTION;

-- Operation 1: Deduct Mamata's Tuition Fee (Staged in Undo Log):
UPDATE student_bank_accounts SET balance = balance - 5000.00 WHERE student_id = 101;

-- Operation 2: Fails due to network disconnect / crash:
-- UPDATE student_bank_accounts SET balance = balance + 5000.00 WHERE student_id = 102; 💥 FAILS!

-- InnoDB triggers automatic ROLLBACK using DB_ROLL_PTR:
ROLLBACK; 
-- Result: Mamata's ₹5,000 deduction is completely reversed via Undo Log!`,
      resultRows: [
        { pillar: "Atomicity (A)", engineComponent: "InnoDB Undo Logs", failureTrigger: "Network Timeout / Disconnect", recoveryAction: "Follows DB_ROLL_PTR to restore prior row", finalState: "100% Reverted (Mamata = ₹25,000)", status: "All-or-Nothing Verified ✅" },
      ],
      explanation:
        "Atomicity guarantees that multi-statement transactions are indivisible. If any statement fails or the connection crashes, InnoDB uses the Undo Log to reverse all partial modifications.",
    },
    consistency_invariants: {
      title: "2. Consistency: 'Invariants Preserved' via Schema Constraints & Business Rules",
      badge: "Consistency",
      badgeColor: "emerald",
      sqlQuery: `-- 🛡️ CONSISTENCY GUARDS (Schema Constraints & Ledger Invariants):
-- Table Definition with Balance CHECK Constraint:
-- CREATE TABLE student_bank_accounts (
--     student_id INT PRIMARY KEY,
--     balance DECIMAL(10,2) NOT NULL CHECK (balance >= 0.00)
-- );

START TRANSACTION;

-- Attempting illegal transfer exceeding current balance (₹25,000 - ₹30,000 = -₹5,000):
UPDATE student_bank_accounts 
SET balance = balance - 30000.00 
WHERE student_id = 101;
-- 💥 ERROR 3819 (HY000): Check constraint 'student_bank_accounts_chk_1' is violated!

ROLLBACK; -- Preserves invariant: Balances can NEVER be negative!`,
      resultRows: [
        { pillar: "Consistency (C)", engineComponent: "PK, FK & CHECK Constraints", failureTrigger: "Overdraft Attempt (Bal < 0)", recoveryAction: "Throws Error 3819 & aborts statement", finalState: "Valid State Preserved (Bal = ₹25,000)", status: "Invariants Enforced 🛡️" },
      ],
      explanation:
        "Consistency ensures that the database transitions strictly between valid states, rejecting any transaction that violates relational constraints or business invariants.",
    },
    isolation_mvcc: {
      title: "3. Isolation: 'Independent Execution' via MVCC Point-in-Time Snapshots",
      badge: "Isolation",
      badgeColor: "indigo",
      sqlQuery: `-- 🛡️ ISOLATION (Multi-Version Concurrency Control / MVCC):
-- Session 1 (Mamata's Transfer):
START TRANSACTION;
UPDATE student_bank_accounts SET balance = 20000.00 WHERE student_id = 101; -- Uncommitted!

-- Session 2 (Susmita's Concurrent Analytical Query):
-- Susmita queries Mamata's balance concurrently:
SELECT balance FROM student_bank_accounts WHERE student_id = 101;
-- 🛡️ MVCC Result: Susmita reads the COMMITTED snapshot (₹25,000.00), NOT the dirty ₹20,000.00!
-- Readers do NOT lock writers, and writers do NOT block readers!`,
      resultRows: [
        { pillar: "Isolation (I)", engineComponent: "MVCC Read Views & Row Locks", failureTrigger: "Concurrent Dirty Read Attempt", recoveryAction: "Reconstructs snapshot from Undo Log", finalState: "Reads Clean Snapshot (₹25,000)", status: "Zero Interference ✅" },
      ],
      explanation:
        "Isolation ensures concurrent transactions execute as if running sequentially. InnoDB's MVCC provides lock-free consistent snapshot reads reconstructed from the Undo Log.",
    },
    durability_wal: {
      title: "4. Durability: 'Survives Power Outages' via Redo Logs (WAL) & Doublewrite Buffer",
      badge: "Durability",
      badgeColor: "amber",
      sqlQuery: `-- 🛡️ DURABILITY (Write-Ahead Logging / WAL Crash Recovery):
START TRANSACTION;
UPDATE student_bank_accounts SET balance = 20000.00 WHERE student_id = 101;
COMMIT; -- Redo Log Buffer is flushed to physical disk (fsync)!

-- 💥 HARD POWER PULL / OPERATING SYSTEM CRASH OCCURS! 💥

-- 🔄 SERVER REBOOTS -> InnoDB Crash Recovery executes:
-- 1. Redo Phase: Replays committed Redo Logs (Rolls forward changes to disk pages).
-- 2. Doublewrite Buffer: Repaired torn pages if power failed mid-write.
-- Result: Mamata's ₹20,000 balance is 100% intact on disk!`,
      resultRows: [
        { pillar: "Durability (D)", engineComponent: "Redo Log (WAL) + Doublewrite Buffer", failureTrigger: "Sudden Power Outage Post-Commit", recoveryAction: "Replays Redo Log to roll forward state", finalState: "Committed State Fully Preserved", status: "Zero Data Loss 🛡️" },
      ],
      explanation:
        "Durability guarantees that once `COMMIT` succeeds, changes survive power outages. InnoDB's Redo Log (WAL) replays all committed modifications during crash recovery.",
    },
  };

  const navItems = [
    { id: "acid-overview", label: "1. The 4 ACID Pillars" },
    { id: "engine-subsystems", label: "2. InnoDB Subsystems" },
    { id: "svg-diagrams", label: "3. Pillars & Recovery SVGs" },
    { id: "interactive-sandbox", label: "4. Live ACID Workbench" },
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
            <span>Topic 1 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              ACID Deep Dive
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            The ACID Properties Deep Dive
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master the 4 foundational pillars of transactional reliability: Atomicity, Consistency, Isolation, and Durability. Explore how InnoDB enforces ACID using Undo Logs, Redo Logs (WAL), Multi-Version Concurrency Control (MVCC), and the Doublewrite Buffer.
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
        {/* SECTION 1: The 4 ACID Pillars */}
        <section id="acid-overview" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Pillars of Transactional Reliability
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The fundamental guarantees every production RDBMS must provide.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs font-mono font-bold text-cyan-400 uppercase">A · Atomicity</div>
              <h3 className="text-sm font-bold text-white">All-or-Nothing</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Transactions are indivisible. All modifications succeed together or are completely undone via Undo Logs.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs font-mono font-bold text-emerald-400 uppercase">C · Consistency</div>
              <h3 className="text-sm font-bold text-white">Invariants Preserved</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Transactions transition the DB between valid states, enforcing all PK, FK, and CHECK constraints.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs font-mono font-bold text-indigo-400 uppercase">I · Isolation</div>
              <h3 className="text-sm font-bold text-white">Independent Execution</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Concurrent transactions operate without seeing dirty uncommitted state using MVCC snapshot views.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs font-mono font-bold text-amber-400 uppercase">D · Durability</div>
              <h3 className="text-sm font-bold text-white">Survives Crashes</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Committed transactions survive power outages and crashes via Write-Ahead Redo Logs and Doublewrite Buffers.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: InnoDB Subsystems */}
        <section id="engine-subsystems" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. InnoDB Subsystems Mapping to ACID
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How the MySQL storage engine hardware components map directly to ACID guarantees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-cyan-400 flex items-center gap-2">
                <span>🔄</span> Undo Logs &amp; Rollback Segments (Atomicity + MVCC)
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Stores before-images of modified rows. If a transaction aborts, InnoDB follows <code className="text-cyan-300 font-mono">DB_ROLL_PTR</code> to restore original values. Also provides point-in-time consistent reads for concurrent queries.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
                <span>⚡</span> Redo Logs (WAL) &amp; Doublewrite Buffer (Durability)
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Sequential write-ahead logging records physical page changes before writing to disk. The Doublewrite Buffer writes pages to a contiguous disk area first to eliminate torn pages during sudden power loss.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: ACID Engine Mapping &amp; 2-Phase Crash Recovery
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Visualizing the mapping of ACID to storage engine internals and the crash recovery pipeline.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: ACID Mapping */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> The 4 ACID Pillars &amp; InnoDB Engine Subsystems
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Pillar A */}
                  <g>
                    <rect x="20" y="30" width="180" height="100" rx="8" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="110" y="55" fill="#67e8f9" fontSize="10" fontWeight="bold" textAnchor="middle">ATOMICITY</text>
                    <rect x="30" y="70" width="160" height="40" rx="4" fill="#0f172a" />
                    <text x="110" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">InnoDB Undo Logs</text>
                    <text x="110" y="102" fill="#bae6fd" fontSize="7 font-mono" textAnchor="middle">Rollback Segments</text>
                  </g>

                  {/* Pillar C */}
                  <g>
                    <rect x="230" y="30" width="180" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="320" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">CONSISTENCY</text>
                    <rect x="240" y="70" width="160" height="40" rx="4" fill="#022c22" />
                    <text x="320" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">PK, FK &amp; CHECK</text>
                    <text x="320" y="102" fill="#34d399" fontSize="7 font-mono" textAnchor="middle">Business Invariants</text>
                  </g>

                  {/* Pillar I */}
                  <g>
                    <rect x="440" y="30" width="180" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="530" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">ISOLATION</text>
                    <rect x="450" y="70" width="160" height="40" rx="4" fill="#0f172a" />
                    <text x="530" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">MVCC Snapshots</text>
                    <text x="530" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Row / Next-Key Locks</text>
                  </g>

                  {/* Pillar D */}
                  <g>
                    <rect x="650" y="30" width="180" height="100" rx="8" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                    <text x="740" y="55" fill="#fcd34d" fontSize="10" fontWeight="bold" textAnchor="middle">DURABILITY</text>
                    <rect x="660" y="70" width="160" height="40" rx="4" fill="#1e293b" />
                    <text x="740" y="88" fill="#fbbf24" fontSize="8 font-mono" textAnchor="middle">Redo Log (WAL)</text>
                    <text x="740" y="102" fill="#fde68a" fontSize="7 font-mono" textAnchor="middle">Doublewrite Buffer</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* SVG 2: Crash Recovery */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-amber-400 font-mono">Diagram B:</span> InnoDB 2-Phase Crash Recovery Pipeline
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1: Crash */}
                  <g>
                    <rect x="20" y="30" width="180" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="110" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">1. CRASH / POWER OFF</text>
                    <rect x="30" y="70" width="160" height="40" rx="4" fill="#1e293b" />
                    <text x="110" y="88" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">Server Halts Instantly</text>
                    <text x="110" y="102" fill="#fca5a5" fontSize="7 font-mono" textAnchor="middle">RAM Buffer Flushed Out</text>
                  </g>

                  {/* Step 2: Redo Phase */}
                  <g>
                    <rect x="240" y="30" width="250" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="365" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">2. REDO PHASE (Roll Forward)</text>
                    <rect x="255" y="70" width="220" height="40" rx="4" fill="#022c22" />
                    <text x="365" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Replays Committed Redo Logs</text>
                    <text x="365" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Guarantees DURABILITY ✅</text>
                  </g>

                  {/* Step 3: Undo Phase */}
                  <g>
                    <rect x="530" y="30" width="290" height="100" rx="8" fill="#083344" stroke="#06b6d4" strokeWidth="2" />
                    <text x="675" y="55" fill="#67e8f9" fontSize="10" fontWeight="bold" textAnchor="middle">3. UNDO PHASE (Roll Back)</text>
                    <rect x="545" y="70" width="260" height="40" rx="4" fill="#0f172a" />
                    <text x="675" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Rolls Back Uncommitted Active Tx</text>
                    <text x="675" y="102" fill="#bae6fd" fontSize="7 font-bold" textAnchor="middle">Guarantees ATOMICITY ✅</text>
                  </g>

                  {/* Arrows */}
                  <path d="M 200 80 L 240 80" stroke="#ef4444" strokeWidth="1.5" />
                  <path d="M 490 80 L 530 80" stroke="#10b981" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive ACID Simulator Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test Undo Log rollback atomicity, schema consistency constraints, MVCC snapshot isolation, and Write-Ahead Log durability live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(acidScenarios).map(([key, item]) => {
              const isActive = selectedAcidPillar === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedAcidPillar(key)}
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
                        item.badgeColor === "cyan" && "bg-cyan-950 text-cyan-400 border border-cyan-800",
                        item.badgeColor === "emerald" && "bg-emerald-950 text-emerald-400 border border-emerald-800",
                        item.badgeColor === "indigo" && "bg-indigo-950 text-indigo-400 border border-indigo-800",
                        item.badgeColor === "amber" && "bg-amber-950 text-amber-400 border border-amber-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Pillar" : "○ Run ACID Test"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{acidScenarios[selectedAcidPillar].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{acidScenarios[selectedAcidPillar].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                ACID Core Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL ACID Verification Script</span>
                <span className="text-emerald-400">InnoDB Subsystem Integration</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {acidScenarios[selectedAcidPillar].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">ACID Pillar</th>
                    <th className="py-3 px-4 text-white">InnoDB Subsystem</th>
                    <th className="py-3 px-4 text-rose-400">Failure Trigger</th>
                    <th className="py-3 px-4 text-amber-400">Engine Recovery Action</th>
                    <th className="py-3 px-4 text-indigo-400">Final Data State</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {acidScenarios[selectedAcidPillar].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.pillar}</td>
                      <td className="py-3 px-4 font-mono text-white">{row.engineComponent}</td>
                      <td className="py-3 px-4 text-rose-300 font-mono">{row.failureTrigger}</td>
                      <td className="py-3 px-4 text-slate-300 font-sans">{row.recoveryAction}</td>
                      <td className="py-3 px-4 text-indigo-300 font-mono">{row.finalState}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[11px] font-sans font-medium border bg-emerald-950 text-emerald-400 border-emerald-800">
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
              Real-world preservation of student fee invariants during heavy admission rush.
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
                  Zero Financial Drift across ₹50 Lakhs in Barrackpore Online Admissions
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Central Portal</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui audited an online admission system processing 10,000 concurrent student fee deposits totaling ₹50 Lakhs. By relying on strict ACID compliance—InnoDB Undo Logs for atomic failure rollback, Foreign Key &amp; CHECK constraints for consistency, MVCC for lock-free dashboard analytics, and Redo Logs for crash durability—the system completed the admission drive with <strong>₹0.00 accounting drift</strong>!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Production ACID Verification Audit:
SELECT 
    (SELECT SUM(balance) FROM student_wallets) +
    (SELECT SUM(collected_fees) FROM academy_accounts) AS total_invariant_checksum;
-- Evaluates to EXACT expected ₹50,00,000.00 across all 10,000 transactions!`}
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
              Avoid relaxing flush settings in financial systems and keep transactions short.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Setting flush_log_at_trx_commit = 0 in Finance
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Setting <code className="text-rose-300 font-mono">innodb_flush_log_at_trx_commit = 0</code> flushes redo logs to disk only once per second. A power failure can permanently erase the last 1 second of committed financial transactions!
              </p>
              <div className="text-xs text-slate-400">
                Fix: Always keep <code className="text-emerald-400 font-mono">innodb_flush_log_at_trx_commit = 1</code> for full ACID Durability!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Enforce Consistency at the Schema Layer
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Never rely solely on application backend validation; always declare database-level <code className="text-emerald-400 font-mono">CHECK (balance &gt;= 0)</code>, <code className="text-emerald-400 font-mono">FOREIGN KEY</code>, and <code className="text-emerald-400 font-mono">NOT NULL</code> constraints.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees consistency even if buggy application scripts bypass backend logic.
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
              Key takeaways for the ACID Properties.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> ACID Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-cyan-300">Atomicity</strong> is enforced by InnoDB <strong className="text-cyan-300">Undo Logs</strong>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-300">Consistency</strong> is enforced by schema <strong className="text-cyan-300">Constraints &amp; Invariants</strong>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span><strong className="text-cyan-300">Isolation</strong> is enforced by <strong className="text-cyan-300">MVCC &amp; Row Locks</strong>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span><strong className="text-cyan-300">Durability</strong> is enforced by <strong className="text-cyan-300">Redo Logs (WAL)</strong>.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe the 2-phase crash recovery...”</span>
                  During reboot, InnoDB first replays the Redo Log (roll forward committed data) and then uses the Undo Log (roll back active uncommitted transactions)!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about MVCC performance...”</span>
                  Because MVCC reads from Undo Log snapshots, readers never block writers and writers never block readers, achieving immense concurrent read throughput!
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
              Comprehensive reference questions covering the 4 ACID pillars, InnoDB internal subsystems (Undo Logs, Redo Logs, MVCC Snapshots, Doublewrite Buffer), crash recovery mechanics, and schema integrity guards.
            </p>
          </div>

          <FAQTemplate
            title="ACID Properties FAQs"
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
            title="The ACID Properties Deep Dive: Atomicity, Consistency, Isolation, Durability"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic1_note.txt"
          />

          <Teacher
            note="To master database architecture, you must understand how InnoDB implements each letter of ACID under the hood: Undo Logs provide Atomicity by reversing partial failures; Schema Constraints (PK, FK, CHECK) enforce Consistency; MVCC Snapshot Read Views provide lock-free Isolation; and Write-Ahead Redo Logs guarantee Durability across sudden power outages. When designing production systems, never compromise on ACID integrity!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic1;
