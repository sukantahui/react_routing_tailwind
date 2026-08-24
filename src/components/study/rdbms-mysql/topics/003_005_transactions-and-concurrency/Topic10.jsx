import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic10_files/topic10_questions";
import noteText from "./topic10_files/topic10_note.txt?raw";

/**
 * Topic10 – Lock Granularity: Table-Level Locks vs Row-Level Locks in InnoDB
 * Module: 003_005_transactions-and-concurrency
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on lock granularity: Table-Level Locks vs InnoDB Row-Level Index Locks, Intention Locks (IS/IX), avoiding un-indexed full-table lock degradation, and Metadata Lock (MDL) coordination.
 */
const Topic10 = () => {
  // Interactive Simulator State
  const [selectedGranularityScenario, setSelectedGranularityScenario] = useState("row_level_concurrency");

  const granularityScenarios = {
    row_level_concurrency: {
      title: "1. Row-Level Concurrency: Independent Parallel Mutations",
      badge: "Row-Level Locking (InnoDB)",
      badgeColor: "emerald",
      sqlQuery: `-- ⚡ INNODB ROW-LEVEL LOCKING IN ACTION:
-- Session 1 (Mamata paying tuition fee):
START TRANSACTION;
UPDATE student_ledgers SET balance = balance - 5000 WHERE student_id = 101;
-- 🔒 Acquires X-Lock ONLY on Clustered Index Record (student_id = 101)!

-- Session 2 CONCURRENTLY (Susmita paying hostel fee):
START TRANSACTION;
UPDATE student_ledgers SET balance = balance - 3000 WHERE student_id = 102;
-- ⚡ GRANTED IMMEDIATELY! Clustered Index Record 102 is independent!
-- ZERO LOCK WAITING! ZERO BLOCKING! BOTH PROCEED IN PARALLEL!

COMMIT; -- Session 1
COMMIT; -- Session 2`,
      resultRows: [
        { transaction: "Session 1 (Mamata ID 101)", lockGranularity: "Row-Level (Index Record 101)", lockMode: "Exclusive (X-Lock)", concurrencyImpact: "Zero Interference", latency: "0.002s ⚡", status: "Executed in Parallel ✅" },
        { transaction: "Session 2 (Susmita ID 102)", lockGranularity: "Row-Level (Index Record 102)", lockMode: "Exclusive (X-Lock)", concurrencyImpact: "Zero Interference", latency: "0.002s ⚡", status: "Executed in Parallel ✅" },
      ],
      explanation:
        "InnoDB applies row locks to specific B+Tree index records. Because Mamata (101) and Susmita (102) occupy different index records, both transactions execute concurrently with zero lock wait latency.",
    },
    table_level_lock_bottleneck: {
      title: "2. Table-Level Lock Bottleneck: Single Writer Halts Entire System",
      badge: "Table-Level Locking (MyISAM)",
      badgeColor: "rose",
      sqlQuery: `-- 🛑 TABLE-LEVEL LOCK BOTTLENECK (LOCK TABLES WRITE):
-- Session 1 (Batch Admin):
LOCK TABLES student_ledgers WRITE;
-- 🔒 Entire 'student_ledgers' table is locked exclusively!

-- Session 2 CONCURRENTLY (Susmita trying to read balance):
-- SELECT balance FROM student_ledgers WHERE student_id = 102;
-- 🛑 BLOCKED! Cannot read because Session 1 holds Table Write Lock!

-- Session 3 CONCURRENTLY (Mamata trying to update balance):
-- UPDATE student_ledgers SET balance = 20000 WHERE student_id = 101;
-- 🛑 BLOCKED! Cannot write! Entire table is locked!

UNLOCK TABLES; -- Session 1 unblocks Sessions 2 & 3!`,
      resultRows: [
        { transaction: "Session 1 (Table Lock)", lockGranularity: "Table-Level (Whole Table)", lockMode: "Table Write Lock", concurrencyImpact: "Blocks ALL Other Sessions", latency: "Holds Lock", status: "Exclusive Table Lock 🔒" },
        { transaction: "Session 2 (Susmita Read)", lockGranularity: "Table-Level Wait", lockMode: "Waiting for Read Access", concurrencyImpact: "100% Blocked", latency: "Blocked ⏳", status: "Blocked 🛑" },
        { transaction: "Session 3 (Mamata Write)", lockGranularity: "Table-Level Wait", lockMode: "Waiting for Write Access", concurrencyImpact: "100% Blocked", latency: "Blocked ⏳", status: "Blocked 🛑" },
      ],
      explanation:
        "Table-Level Locking locks the entire table structure. A single write lock halts all concurrent readers and writers across the entire application until the lock is released.",
    },
    unindexed_scan_lock_degradation: {
      title: "3. Accidental Table Lockout: Un-Indexed UPDATE Scan Degradation",
      badge: "Un-Indexed Scan Hazard",
      badgeColor: "amber",
      sqlQuery: `-- ⚠️ ACCIDENTAL FULL-TABLE ROW LOCK DEGRADATION:
-- Suppose 'notes' column is NOT indexed:
START TRANSACTION;

-- Session 1 updates student with specific note:
UPDATE student_ledgers SET balance = balance - 100 
WHERE notes = 'Scholarship Pending'; 
-- 🚨 Because 'notes' has NO index, InnoDB scans EVERY record in the table!
-- 💥 InnoDB places an X-Lock on EVERY SINGLE ROW in the entire table!

-- Session 2 CONCURRENTLY (Updating unrelated student 102 by PK):
-- UPDATE student_ledgers SET balance = 30000 WHERE student_id = 102;
-- 🛑 BLOCKED! Even though student 102 is unrelated, its row was locked during Session 1's full table scan!`,
      resultRows: [
        { transaction: "Session 1 (Un-indexed DML)", lockGranularity: "Full-Table Index Scan", lockMode: "X-Locks on ALL Rows 💥", concurrencyImpact: "Accidental Table-Wide Lock", latency: "Heavy I/O", status: "Degraded to Table Lock ⚠️" },
        { transaction: "Session 2 (PK Update 102)", lockGranularity: "Row-Level (Index Record 102)", lockMode: "Waiting for X-Lock", concurrencyImpact: "Blocked by Scan", latency: "Blocked ⏳", status: "Blocked 🛑" },
      ],
      explanation:
        "Because InnoDB row locks are attached to index records, executing an `UPDATE` without an index forces InnoDB to scan and lock every record in the table, degrading row locking to a full table lockout.",
    },
    intention_lock_ddl_bridge: {
      title: "4. Intention Locks (IS / IX): Fast O(1) DDL Conflict Checks",
      badge: "Intention Locks (IS / IX)",
      badgeColor: "cyan",
      sqlQuery: `-- 🌉 INTENTION LOCK COORDINATION:
-- Session 1 (Mamata updating balance):
START TRANSACTION;
UPDATE student_ledgers SET balance = 20000 WHERE student_id = 101;
-- 1. Sets Table-Level Intention Exclusive Lock (IX) on 'student_ledgers'
-- 2. Sets Row-Level Exclusive Lock (X-Lock) on Row 101

-- Session 2 (DBA attempting DDL Schema Alteration):
-- ALTER TABLE student_ledgers ADD COLUMN discount DECIMAL(5,2);
-- ⚡ DBA query checks Table-Level IX flag in O(1) instant time!
-- Sees IX flag active -> Knows rows are actively locked without scanning millions of rows!
-- 🛑 ALTER TABLE waits until Session 1 COMMITs!`,
      resultRows: [
        { transaction: "Session 1 (DML Update)", lockGranularity: "Table IX + Row X-Lock", lockMode: "Intention Exclusive (IX)", concurrencyImpact: "Allows Concurrent DMLs", latency: "0.002s ⚡", status: "IX Active 🌉" },
        { transaction: "Session 2 (ALTER TABLE DDL)", lockGranularity: "Table-Level Metadata Lock", lockMode: "Exclusive Table DDL", concurrencyImpact: "O(1) Conflict Detection", latency: "Waits for IX", status: "Blocked Cleanly 🛑" },
      ],
      explanation:
        "Table-level Intention Locks (IS/IX) act as a bridge, allowing DDL commands (like `ALTER TABLE`) to verify if any rows are locked in $O(1)$ time without scanning individual row locks.",
    },
  };

  const navItems = [
    { id: "granularity-overview", label: "1. Table vs Row Locks" },
    { id: "intention-locks", label: "2. Intention Locks (IS/IX)" },
    { id: "svg-diagrams", label: "3. Granularity & Bridge SVGs" },
    { id: "interactive-sandbox", label: "4. Live Granularity Workbench" },
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
            <span>Topic 10 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Lock Granularity
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Lock Granularity: Table vs Row Locks
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Understand the architectural differences between coarse Table-Level Locks and fine-grained InnoDB Row-Level Index Locks. Learn how Intention Locks (<code className="text-cyan-300 font-mono">IS</code> / <code className="text-cyan-300 font-mono">IX</code>) coordinate between table and row locking, and how to avoid accidental full-table lock degradation on un-indexed scans.
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
        {/* SECTION 1: Table vs Row Locks */}
        <section id="granularity-overview" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Coarse vs Fine Lock Granularity
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing whole-table locks with index record-level locks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-rose-400 font-mono">Table-Level Locking (Coarse)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Locks the entire table structure. Low memory overhead for lock managers, but eliminates concurrency: 1 active write lock blocks all other reading and writing connections. Default in MyISAM.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400 font-mono">Row-Level Locking (Fine, InnoDB Standard)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Locks individual B+Tree index records. Maximizes multi-user concurrency by allowing hundreds of transactions to modify different rows in the same table simultaneously.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Intention Locks */}
        <section id="intention-locks" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Intention Locks (IS / IX) as the Coordination Bridge
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How InnoDB coordinates between table-level DDL locks and row-level DML locks in O(1) time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="text-base font-bold text-cyan-400 flex items-center gap-2">
                <span>📖</span> Intention Shared Lock (IS)
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Acquired at the table level before acquiring S-Locks on individual rows. Indicates that one or more transactions are actively reading rows with shared locks.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
                <span>✏️</span> Intention Exclusive Lock (IX)
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Acquired at the table level before acquiring X-Locks on individual rows. Allows DDL operations (`ALTER TABLE`) to instantly detect row lock contention in $O(1)$ time without scanning individual rows.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Granularity Comparison &amp; Intention Bridge
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Visualizing Table-Level vs Row-Level locking footprints and Intention lock coordination.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Granularity */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Table-Level vs Row-Level Locking Granularity
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Left: Table Lock */}
                  <g>
                    <rect x="30" y="30" width="370" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="215" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">TABLE-LEVEL LOCKING (Coarse)</text>
                    <rect x="45" y="70" width="340" height="40" rx="4" fill="#1e293b" />
                    <text x="215" y="88" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">Locks ENTIRE Table: [Row 1, Row 2, ..., Row 1000]</text>
                    <text x="215" y="102" fill="#fca5a5" fontSize="7 font-bold" textAnchor="middle">🛑 1 Writer Blocks ALL 1,000 Rows · Zero Concurrency</text>
                  </g>

                  {/* Right: Row Lock */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="630" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">ROW-LEVEL LOCKING (Fine, InnoDB)</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#022c22" />
                    <text x="630" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Locks ONLY Row 101 · Rows 102-1000 Remain FREE!</text>
                    <text x="630" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">⚡ Hundreds of Parallel Mutations · High Throughput</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* SVG 2: Intention Bridge */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram B:</span> The Intention Lock (IS / IX) Coordination Bridge
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Table Layer */}
                  <g>
                    <rect x="30" y="30" width="220" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="140" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">1. Table-Level IX Flag</text>
                    <rect x="40" y="70" width="200" height="40" rx="4" fill="#0f172a" />
                    <text x="140" y="88" fill="#38bdf8" fontSize="8 font-mono font-bold" textAnchor="middle">Table IX Set: student_ledgers</text>
                    <text x="140" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Declares row-level intent</text>
                  </g>

                  {/* Row Layer */}
                  <g>
                    <rect x="290" y="30" width="230" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="405" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">2. Row-Level X-Lock</text>
                    <rect x="300" y="70" width="210" height="40" rx="4" fill="#022c22" />
                    <text x="405" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Row 101 Clustered Index</text>
                    <text x="405" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">X-Lock Active on Mamata</text>
                  </g>

                  {/* DDL Verification */}
                  <g>
                    <rect x="560" y="30" width="250" height="100" rx="8" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                    <text x="685" y="55" fill="#fcd34d" fontSize="10" fontWeight="bold" textAnchor="middle">3. DDL ALTER TABLE Check</text>
                    <rect x="570" y="70" width="230" height="40" rx="4" fill="#1e293b" />
                    <text x="685" y="88" fill="#fbbf24" fontSize="8 font-mono font-bold" textAnchor="middle">Inspects Table IX Flag (O(1))</text>
                    <text x="685" y="102" fill="#fde68a" fontSize="7 font-bold" textAnchor="middle">⚡ Instant Conflict Detection</text>
                  </g>

                  {/* Arrows */}
                  <path d="M 250 80 L 290 80" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 520 80 L 560 80" stroke="#10b981" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Lock Granularity Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test row-level parallel mutations, whole-table lock bottlenecks, un-indexed scan degradation, and intention lock DDL coordination live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(granularityScenarios).map(([key, item]) => {
              const isActive = selectedGranularityScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedGranularityScenario(key)}
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
                        item.badgeColor === "amber" && "bg-amber-950 text-amber-400 border border-amber-800",
                        item.badgeColor === "cyan" && "bg-cyan-950 text-cyan-400 border border-cyan-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Model" : "○ Run Granularity Test"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{granularityScenarios[selectedGranularityScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{granularityScenarios[selectedGranularityScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Granularity Runtime
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Granularity Execution Trace</span>
                <span className="text-emerald-400">Index Record Locking</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {granularityScenarios[selectedGranularityScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Transaction / Actor</th>
                    <th className="py-3 px-4 text-white">Lock Granularity</th>
                    <th className="py-3 px-4 text-emerald-400">Lock Mode</th>
                    <th className="py-3 px-4 text-amber-400">Concurrency Impact</th>
                    <th className="py-3 px-4 text-cyan-400">Latency</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {granularityScenarios[selectedGranularityScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.transaction}</td>
                      <td className="py-3 px-4 font-mono text-white">{row.lockGranularity}</td>
                      <td className="py-3 px-4 text-emerald-300 font-mono">{row.lockMode}</td>
                      <td className="py-3 px-4 text-slate-300 font-sans">{row.concurrencyImpact}</td>
                      <td className="py-3 px-4 text-amber-300 font-mono">{row.latency}</td>
                      <td className="py-3 px-4">
                        <span
                          className={clsx(
                            "px-2 py-0.5 rounded text-[11px] font-sans font-medium border",
                            row.status.includes("Parallel") || row.status.includes("Active") || row.status.includes("Lock")
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
              Real-world resolution of full-table lockouts on un-indexed student attendance queries in Barrackpore.
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
                  Eliminating Accidental Full-Table Lockouts in Barrackpore Attendance Portal
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Biometric Attendance System</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui resolved a severe morning attendance bottleneck where 2,000 students marked biometric attendance simultaneously: An update query `UPDATE attendance SET status = 'PRESENT' WHERE device_mac = ?` was executed on an un-indexed `device_mac` column. Because there was no index, InnoDB executed a full table scan, locking every row in the attendance table and freezing all biometric gates! Adding an index on `device_mac` restored granular row-level locking, reducing gate latency from <strong>15.4 seconds to 0.003 seconds</strong>!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- The Performance Fix:
ALTER TABLE attendance ADD INDEX idx_device_mac (device_mac);

-- Now UPDATE locks ONLY the matched biometric device records!
UPDATE attendance SET status = 'PRESENT' WHERE device_mac = '00:1B:44:11:3A:B7';`}
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
              Always ensure DML queries use indexes and avoid LOCK TABLES with InnoDB.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Un-Indexed DML Scan Lock Degradation
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Executing `UPDATE` or `DELETE` without an index forces InnoDB to lock every single index record in the table, degrading fine row-level concurrency into a whole-table lockout!
              </p>
              <div className="text-xs text-slate-400">
                Fix: Always verify queries with <code className="text-emerald-400 font-mono">EXPLAIN</code> to ensure an index is used!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Set innodb_autoinc_lock_mode = 2
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Ensure <code className="text-emerald-400 font-mono">innodb_autoinc_lock_mode = 2</code> (Interleaved mode) in MySQL 8.0 to eliminate table-level auto-increment locks during high-speed batch inserts.
              </p>
              <div className="text-xs text-slate-400">
                Maximizes parallel insertion throughput across multiple worker threads.
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
              Key takeaways for Lock Granularity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Granularity Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-cyan-300">Row-Level Locks</strong> are placed on B+Tree index records.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Un-indexed DML updates scan and lock <strong className="text-rose-400">every row</strong> in the table!</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span><strong className="text-cyan-300">Intention Locks (IS/IX)</strong> allow $O(1)$ table-level DDL checks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Never use <code className="text-rose-300 font-mono">LOCK TABLES</code> with InnoDB in web apps.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe index record locking...”</span>
                  InnoDB never locks a row directly; it locks the index entry in the B+Tree! If your query lacks an index, InnoDB locks every entry in the clustered index!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about Metadata Locks...”</span>
                  Running an ALTER TABLE while a slow transaction is open will queue all subsequent SELECT queries behind it, exhausting the connection pool in seconds!
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
              Comprehensive reference questions covering lock granularity: Table-Level Locks vs InnoDB Row-Level Index Locks, Intention Locks (IS/IX), avoiding un-indexed full-table lock degradation, and Metadata Lock (MDL) coordination.
            </p>
          </div>

          <FAQTemplate
            title="Lock Granularity FAQs"
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
            title="Lock Granularity: Table-Level Locks vs Row-Level Locks in InnoDB"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic10_note.txt"
          />

          <Teacher
            note="Lock granularity is the foundation of high-concurrency database design. Always remember the Golden Rule of InnoDB Locking: InnoDB locks INDEX RECORDS, not physical heap rows! If your UPDATE or DELETE statement does not use a selective index, InnoDB is forced to scan and lock every record in the table, accidentally turning a fine-grained row lock into a devastating full-table lockout. Always index your predicates!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic10;
