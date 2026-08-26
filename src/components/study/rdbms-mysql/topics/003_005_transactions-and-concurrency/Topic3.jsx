import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

/**
 * Topic3 – Autocommit Mode in MySQL: Checking, Disabling, and Best Practices
 * Module: 003_005_transactions-and-concurrency
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on MySQL autocommit mechanics, checking and toggling autocommit at session and global scopes, bulk insert fsync performance benchmarks, avoiding dangling transaction lock leaks, and enterprise architecture standards.
 */
const Topic3 = () => {
  // Interactive Simulator State
  const [selectedAutocommitScenario, setSelectedAutocommitScenario] = useState("bulk_insert_benchmark");

  const autocommitScenarios = {
    bulk_insert_benchmark: {
      title: "1. 300x Speedup: 1,000 Bulk Inserts (Autocommit ON vs Single Transaction)",
      badge: "Performance Benchmark",
      badgeColor: "emerald",
      sqlQuery: `-- ❌ SLOW: 1,000 Inserts with autocommit = 1 (1,000 Disk fsyncs -> 12.50s):
-- INSERT INTO student_attendance VALUES (101, 'PRESENT'); -- fsync 1
-- INSERT INTO student_attendance VALUES (102, 'PRESENT'); -- fsync 2
-- ... (1,000 physical disk writes!)

-- ✅ FAST: 1,000 Inserts in Single Transaction (1 Disk fsync -> 0.04s):
START TRANSACTION;
INSERT INTO student_attendance VALUES (101, 'PRESENT');
INSERT INTO student_attendance VALUES (102, 'PRESENT');
-- ... (1,000 inserts staged in memory)
COMMIT; -- ⚡ 1 Single Physical Disk Write (312x Faster!)`,
      resultRows: [
        { mode: "Explicit START TRANSACTION ... COMMIT", totalRecords: "1,000 Rows", fsyncCount: "1 Disk fsync ⚡", executionTime: "0.040s", cpuDiskLoad: "Minimal I/O", speedupFactor: "⚡ 312x Faster (Optimal)" },
        { mode: "Default autocommit = 1 (Standalone)", totalRecords: "1,000 Rows", fsyncCount: "1,000 Disk fsyncs 🐢", executionTime: "12.500s", cpuDiskLoad: "Heavy Disk Thrashing", speedupFactor: "🐢 1x Baseline (Slow)" },
      ],
      explanation:
        "With `autocommit = 1`, each individual insert forces a synchronous disk fsync. Wrapping 1,000 inserts in `START TRANSACTION ... COMMIT` batches all operations into a single disk fsync, executing 312x faster.",
    },
    checking_toggling_scope: {
      title: "2. Session vs Global Scope: Checking & Toggling Autocommit",
      badge: "Syntax & Scope",
      badgeColor: "cyan",
      sqlQuery: `-- Checking and Toggling Autocommit Scope:
-- 1. Inspect current session setting:
SELECT @@autocommit; -- Returns 1 (ON) or 0 (OFF)

-- 2. Inspect global server default:
SELECT @@GLOBAL.autocommit;

-- 3. Toggle for CURRENT session only:
SET autocommit = 0; -- Disables autocommit (Transactions start implicitly)
-- Staged DML...
COMMIT; -- Must commit explicitly!
SET autocommit = 1; -- Re-enables autocommit

-- 4. Toggle globally for all new connections (Admin only):
SET GLOBAL autocommit = 1;`,
      resultRows: [
        { mode: "SELECT @@autocommit", totalRecords: "N/A", fsyncCount: "Zero", executionTime: "<1 ms", cpuDiskLoad: "Metadata Read", speedupFactor: "Returns 1 (ON)" },
        { mode: "SET autocommit = 0", totalRecords: "N/A", fsyncCount: "1 Implicit Commit", executionTime: "<1 ms", cpuDiskLoad: "Fsyncs Active Tx", speedupFactor: "Session Disabled ✅" },
        { mode: "SET autocommit = 1", totalRecords: "N/A", fsyncCount: "1 Implicit Commit", executionTime: "<1 ms", cpuDiskLoad: "Fsyncs Active Tx", speedupFactor: "Session Enabled ✅" },
      ],
      explanation:
        "`SELECT @@autocommit` queries the session setting. Changing `autocommit` executes an implicit `COMMIT` of any currently pending transaction before applying the new mode.",
    },
    dangling_transaction_danger: {
      title: "3. The Danger of autocommit = 0: Forgotten Commits & Lock Leaks",
      badge: "Dangling Lock Hazard",
      badgeColor: "rose",
      sqlQuery: `-- ❌ THE HAZARD: Setting autocommit = 0 and forgetting COMMIT:
SET autocommit = 0;

-- Developer updates a student balance in MySQL Workbench:
UPDATE student_ledgers SET balance = balance - 5000 WHERE student_id = 101;
-- 🚨 Developer forgets to run COMMIT and goes on a 1-hour lunch break!

-- 💥 CONSEQUENCES:
-- 1. Mamata's row is locked with an Exclusive Lock (X-Lock) for 1 hour!
-- 2. All other student payment queries for Mamata are BLOCKED (Lock Wait Timeout)!
-- 3. InnoDB cannot purge Undo Logs, causing ibdata1 tablespace to BLOAT!`,
      resultRows: [
        { mode: "Forgotten COMMIT (autocommit = 0)", totalRecords: "1 Row", fsyncCount: "Zero", executionTime: "1 Hour Held", cpuDiskLoad: "Undo Log Bloat", speedupFactor: "💥 System Contention" },
      ],
      explanation:
        "When `autocommit = 0`, forgetting to issue `COMMIT;` leaves transactions open indefinitely, locking rows, causing lock wait timeouts, and preventing InnoDB undo log purge threads from running.",
    },
    recommended_enterprise_pattern: {
      title: "4. Recommended Architecture: Global Autocommit ON + Explicit Transactions",
      badge: "Enterprise Standard",
      badgeColor: "amber",
      sqlQuery: `-- 🛡️ THE AUTHORITATIVE ENTERPRISE ARCHITECTURE:
-- 1. Keep autocommit = 1 globally:
--    Allows single-row lookups (SELECT) and quick single writes to complete safely.

-- 2. Open EXPLICIT transactions for multi-statement business workflows:
DELIMITER //

CREATE PROCEDURE sp_execute_tuition_settlement(
    IN p_from_id INT,
    IN p_to_id INT,
    IN p_amt DECIMAL(10,2)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN ROLLBACK; RESIGNAL; END;

    -- Explicitly start transaction (Temporarily suspends autocommit):
    START TRANSACTION;
    
    UPDATE student_ledgers SET balance = balance - p_amt WHERE student_id = p_from_id;
    UPDATE student_ledgers SET balance = balance + p_amt WHERE student_id = p_to_id;
    
    COMMIT; -- Commits and automatically restores autocommit = 1!
END //

DELIMITER ;`,
      resultRows: [
        { mode: "Global autocommit = 1", totalRecords: "General Traffic", fsyncCount: "Per-statement", executionTime: "Instant", cpuDiskLoad: "Zero Dangling Locks", speedupFactor: "Safe Standard ✅" },
        { mode: "Explicit START TRANSACTION", totalRecords: "Multi-step Flow", fsyncCount: "1 Batch fsync", executionTime: "0.02s", cpuDiskLoad: "Optimal Throughput", speedupFactor: "Enterprise Approved 🛡️" },
      ],
      explanation:
        "The gold standard in database architecture is to keep `autocommit = 1` globally and open explicit `START TRANSACTION ... COMMIT` blocks for multi-statement operations. This prevents dangling lock leaks while ensuring full ACID speed.",
    },
  };

  const navItems = [
    { id: "autocommit-concept", label: "1. What is Autocommit?" },
    { id: "fsync-benchmark", label: "2. Bulk Fsync Benchmark" },
    { id: "svg-diagrams", label: "3. Fsync & Danger SVGs" },
    { id: "interactive-sandbox", label: "4. Live Autocommit Workbench" },
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
            <span>Topic 3 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Autocommit Architecture
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Autocommit Mode: Checking, Disabling &amp; Best Practices
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Understand how MySQL's <code className="text-cyan-300 font-mono">autocommit</code> mode controls transaction boundaries and physical disk fsyncs. Learn how wrapping bulk inserts in explicit transactions delivers a 300x speedup, how to prevent dangling lock leaks, and the authoritative enterprise configuration rules.
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
        {/* SECTION 1: What is Autocommit? */}
        <section id="autocommit-concept" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. What is Autocommit Mode?
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The fundamental switch between automatic per-statement commits and continuous explicit transactions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-cyan-400 font-mono">autocommit = 1 (ON, Default)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Every standalone DML query (<code className="text-cyan-300 font-mono">INSERT</code>, <code className="text-cyan-300 font-mono">UPDATE</code>, <code className="text-cyan-300 font-mono">DELETE</code>) is treated as an independent single-statement transaction and committed to disk immediately.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-indigo-400 font-mono">autocommit = 0 (OFF, Disabled)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                A transaction starts implicitly on the first DML statement and remains open indefinitely until you explicitly execute <code className="text-emerald-300 font-mono">COMMIT;</code> or <code className="text-rose-300 font-mono">ROLLBACK;</code>.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Bulk Fsync Benchmark */}
        <section id="fsync-benchmark" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. The Physical Disk fsync Bottleneck
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why running bulk operations with autocommit enabled causes severe storage thrashing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
                <span>🐢</span> 1,000 Inserts with autocommit = 1
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Requires 1,000 separate synchronous physical disk fsyncs to the redo log. On typical NVMe/SSD storage, this takes ~12.5 seconds due to mechanical I/O limits.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> 1,000 Inserts in Single Transaction
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Stages all 1,000 rows in memory and requires only <strong>1 single physical disk fsync</strong> upon <code className="text-emerald-300 font-mono">COMMIT</code>, taking just ~0.04 seconds (a 312x speedup!).
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Disk Fsync Comparison &amp; Dangling Lock Hazard
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Visualizing physical disk flush operations and undo log bloat hazards.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Fsync Comparison */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Autocommit Disk Fsyncs vs Explicit Transaction Batching
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Left: Autocommit ON */}
                  <g>
                    <rect x="30" y="30" width="370" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="215" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">AUTOCOMMIT = 1 (1,000 Statements)</text>
                    <rect x="45" y="70" width="340" height="40" rx="4" fill="#1e293b" />
                    <text x="215" y="88" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">Stmt 1 (fsync) → Stmt 2 (fsync) → ... → Stmt 1000 (fsync)</text>
                    <text x="215" y="102" fill="#fca5a5" fontSize="7 font-bold" textAnchor="middle">🐢 1,000 Physical Disk Writes · 12.50s (Slow I/O)</text>
                  </g>

                  {/* Right: Explicit Transaction Batch */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="630" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">EXPLICIT TRANSACTION (1,000 Statements)</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#022c22" />
                    <text x="630" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">START TX → 1,000 Staged Memory Inserts → COMMIT (1 fsync)</text>
                    <text x="630" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">⚡ 1 Single Physical Disk Write · 0.04s (312x Faster!)</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* SVG 2: Dangling Lock Hazard */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-rose-400 font-mono">Diagram B:</span> The Danger of Global autocommit = 0 (Dangling Lock Leaks)
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1 */}
                  <g>
                    <rect x="20" y="30" width="220" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="130" y="55" fill="#c7d2fe" fontSize="9" fontWeight="bold" textAnchor="middle">1. UPDATE without COMMIT</text>
                    <rect x="30" y="70" width="200" height="40" rx="4" fill="#0f172a" />
                    <text x="130" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">SET autocommit = 0;</text>
                    <text x="130" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">UPDATE student_ledgers ...</text>
                  </g>

                  {/* Step 2 */}
                  <g>
                    <rect x="270" y="30" width="250" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
                    <text x="395" y="55" fill="#fca5a5" fontSize="9" fontWeight="bold" textAnchor="middle">2. IDLE CONNECTION / LUNCH</text>
                    <rect x="280" y="70" width="230" height="40" rx="4" fill="#1e293b" />
                    <text x="395" y="88" fill="#f87171" fontSize="8 font-mono font-bold" textAnchor="middle">🚨 Transaction remains OPEN</text>
                    <text x="395" y="102" fill="#fca5a5" fontSize="7 font-mono" textAnchor="middle">Row locks held for 60+ minutes!</text>
                  </g>

                  {/* Step 3 */}
                  <g>
                    <rect x="550" y="30" width="270" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
                    <text x="685" y="55" fill="#fca5a5" fontSize="9" fontWeight="bold" textAnchor="middle">3. SYSTEM CONTROLS COLLAPSE</text>
                    <rect x="560" y="70" width="250" height="40" rx="4" fill="#1e293b" />
                    <text x="685" y="88" fill="#f87171" fontSize="8 font-mono font-bold" textAnchor="middle">💥 Lock Wait Timeouts for others</text>
                    <text x="685" y="102" fill="#fca5a5" fontSize="7 font-mono" textAnchor="middle">Undo log purge BLOCKED (Disk bloats)</text>
                  </g>

                  {/* Arrows */}
                  <path d="M 240 80 L 270 80" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 520 80 L 550 80" stroke="#ef4444" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Autocommit Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test bulk insert disk fsync benchmarks, session vs global scoping, forgotten commit lock leaks, and enterprise architecture standards live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(autocommitScenarios).map(([key, item]) => {
              const isActive = selectedAutocommitScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedAutocommitScenario(key)}
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
                    {isActive ? "● Active Benchmark" : "○ Run Autocommit Test"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{autocommitScenarios[selectedAutocommitScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{autocommitScenarios[selectedAutocommitScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Autocommit Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Autocommit Execution Script</span>
                <span className="text-emerald-400">Disk Fsync Optimization</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {autocommitScenarios[selectedAutocommitScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Execution Mode</th>
                    <th className="py-3 px-4 text-white">Records Processed</th>
                    <th className="py-3 px-4 text-emerald-400">Disk fsync Count</th>
                    <th className="py-3 px-4 text-cyan-400">Execution Time</th>
                    <th className="py-3 px-4 text-amber-400">CPU &amp; Disk Load</th>
                    <th className="py-3 px-4 text-emerald-400">Performance Metric</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {autocommitScenarios[selectedAutocommitScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.mode}</td>
                      <td className="py-3 px-4 font-mono text-white">{row.totalRecords}</td>
                      <td className="py-3 px-4 text-emerald-300 font-mono">{row.fsyncCount}</td>
                      <td className="py-3 px-4 text-slate-300 font-mono">{row.executionTime}</td>
                      <td className="py-3 px-4 text-amber-300 font-sans">{row.cpuDiskLoad}</td>
                      <td className="py-3 px-4">
                        <span
                          className={clsx(
                            "px-2 py-0.5 rounded text-[11px] font-sans font-medium border",
                            row.speedupFactor.includes("Faster") || row.speedupFactor.includes("Approved") || row.speedupFactor.includes("Enabled") || row.speedupFactor.includes("Returns")
                              ? "bg-emerald-950 text-emerald-400 border-emerald-800"
                              : "bg-rose-950 text-rose-400 border-rose-800"
                          )}
                        >
                          {row.speedupFactor}
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
              Real-world elimination of 20-minute bulk CSV import latency in Barrackpore admissions.
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
                  Slashing a 20-Minute CSV Import to 4 Seconds in Barrackpore Admissions
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Data Administration Center</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui optimized an automated Python script importing 50,000 applicant rows: It executed 50,000 separate `INSERT` statements with `autocommit = 1`, forcing 50,000 disk fsyncs and taking 20 minutes! Refactoring the script to batch 5,000 rows per transaction reduced execution time from 20 minutes (1,200s) to just <strong>4.2 seconds—a 285x speedup</strong>!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Optimized Batch Transaction Loading Idiom:
START TRANSACTION;
INSERT INTO applicants VALUES (...), (...), (...); -- Staged in memory
-- 5,000 rows...
COMMIT; -- 1 Single Disk fsync per 5,000 rows!`}
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
              Never set autocommit = 0 globally and avoid disk thrashing during bulk data loads.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Setting autocommit = 0 Globally
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Setting <code className="text-rose-300 font-mono">SET GLOBAL autocommit = 0;</code> causes every connected application and developer session to start transactions implicitly, leaving hundreds of idle connections holding locks for hours!
              </p>
              <div className="text-xs text-slate-400">
                Fix: Always keep <code className="text-emerald-400 font-mono">autocommit = 1</code> globally!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Explicit Transaction Boundaries for Bulk Operations
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Whenever executing more than 10 `INSERT` or `UPDATE` statements, always enclose them in an explicit <code className="text-emerald-400 font-mono">START TRANSACTION ... COMMIT</code> block to minimize disk fsync overhead.
              </p>
              <div className="text-xs text-slate-400">
                Provides a 100x to 300x performance multiplier.
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
              Key takeaways for Autocommit Mode.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Autocommit Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><code className="text-cyan-300 font-mono">autocommit = 1</code> commits each individual DML statement immediately.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span><code className="text-cyan-300 font-mono">START TRANSACTION</code> temporarily suspends autocommit until <code className="text-cyan-300 font-mono">COMMIT</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Batching bulk inserts in transactions is <strong className="text-emerald-300">300x faster</strong> by reducing disk fsyncs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Keep <code className="text-cyan-300 font-mono">autocommit = 1</code> globally to avoid dangling lock leaks.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe client driver conventions...”</span>
                  Node.js drivers keep autocommit enabled by default, while Python PEP-249 drivers disable it by default! Always verify driver transaction settings!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about implicit commits...”</span>
                  Remember that executing `SET autocommit = 0;` causes an implicit commit of any currently pending transaction!
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
              Comprehensive reference questions covering MySQL autocommit mechanics, checking and toggling autocommit at session and global scopes, bulk insert fsync performance benchmarks, avoiding dangling transaction lock leaks, and enterprise architecture standards.
            </p>
          </div>

          <FAQTemplate
            title="Autocommit Mode FAQs"
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
            title="Autocommit Mode in MySQL: Checking, Disabling, and Best Practices"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic3_note.txt"
          />

          <Teacher
            note="Autocommit is one of the most misunderstood settings in MySQL. Remember the Enterprise Rule: Never disable autocommit globally! Keep autocommit = 1 globally so standard single-statement operations execute cleanly. Whenever you need multi-statement atomicity or are inserting thousands of rows, open an explicit START TRANSACTION ... COMMIT block. This reduces physical disk fsyncs from thousands to one, boosting throughput by over 300x while preventing dangling lock leaks!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic3;
