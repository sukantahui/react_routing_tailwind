import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

/**
 * Topic6 – InnoDB Undo Log and MVCC (Multi-Version Concurrency Control) for Non-Blocking Reads
 * Module: 004_001_storage-engines-and-architecture
 *
 * @component
 * @returns {JSX.Element} Interactive MVCC and Undo Log workbench: exploring hidden row columns (DB_TRX_ID, DB_ROLL_PTR), the Undo Version Chain linked list, Read View visibility rules across isolation levels, background Purge Thread cleanup, and identifying long-running transaction undo bloat in MySQL.
 */
const Topic6 = () => {
  // Interactive MVCC State
  const [selectedMvccPhase, setSelectedMvccPhase] = useState("phase1_version_chain");

  const mvccPhases = {
    phase1_version_chain: {
      phaseNumber: "Phase 1: Version Chain",
      title: "1. Hidden Columns & The Undo Version Chain",
      badge: "DB_TRX_ID & DB_ROLL_PTR",
      badgeColor: "emerald",
      sqlSnippet: `-- 🔗 INNODB HIDDEN SYSTEM ROW COLUMNS:
-- Every row in a clustered index contains 3 hidden columns:
-- 1. DB_TRX_ID (6 bytes): ID of the last modifying transaction.
-- 2. DB_ROLL_PTR (7 bytes): Roll pointer to the previous version in Undo Log.
-- 3. DB_ROW_ID (6 bytes): Internal surrogate key if no PK is defined.

-- VERSION CHAIN EVOLUTION:
-- Initial Insert (Trx 100): balance = ₹10,000 → DB_ROLL_PTR = NULL
-- Update 1 (Trx 200): balance = ₹12,000 → Clustered Row points to Undo V1 (₹10,000)
-- Update 2 (Trx 300): balance = ₹15,000 → Clustered Row points to Undo V2 (₹12,000) → Undo V1 (₹10,000)

-- When a query reads from an older snapshot, it follows DB_ROLL_PTR backwards in time!`,
      metricsTable: [
        { metric: "DB_TRX_ID", value: "6 Bytes", role: "Identifies transaction that wrote the row" },
        { metric: "DB_ROLL_PTR", value: "7 Bytes", role: "Points to older row version in Undo Tablespace" },
        { metric: "DB_ROW_ID", value: "6 Bytes", role: "Auto-generated surrogate PK if PK is absent" },
        { metric: "Chain Traversal", value: "Backwards in Time", role: "Finds the version visible to active Read View" }
      ],
      explanation:
        "When a row is updated in place, InnoDB writes the old version to the Undo Log and points the row's `DB_ROLL_PTR` to it, creating a linked list (Version Chain). Queries read historical versions by traversing this chain without locking writers."
    },
    phase2_read_views: {
      phaseNumber: "Phase 2: Read View Rules",
      title: "2. Read View Visibility: READ COMMITTED vs REPEATABLE READ",
      badge: "Read View Rules",
      badgeColor: "cyan",
      sqlSnippet: `-- 👁️ READ VIEW STRUCTURE & VISIBILITY RULES:
-- A Read View captures:
--   m_ids: [201, 205] (List of active uncommitted transaction IDs)
--   min_trx_id: 201   (Oldest active transaction)
--   max_trx_id: 210   (Next transaction ID to be assigned)
--   creator_trx_id: 205 (Current transaction ID)

-- VISIBILITY LOGIC:
-- 1. If row TRX_ID < 201 → VISIBLE (Committed before Read View).
-- 2. If row TRX_ID >= 210 → INVISIBLE (Started after Read View).
-- 3. If row TRX_ID is in [201, 205] → INVISIBLE (Was uncommitted when View opened).
-- 4. If row TRX_ID == creator_trx_id → VISIBLE (Own modification!).

-- ISOLATION DIFFERENCE:
-- READ COMMITTED  → Creates a NEW Read View on EVERY SELECT!
-- REPEATABLE READ → Reuses the FIRST Read View for entire transaction!`,
      metricsTable: [
        { metric: "m_ids List", value: "Active Uncommitted IDs", role: "Determines which transactions were in-flight" },
        { metric: "min_trx_id", value: "Lowest active ID", role: "All transactions < min_trx_id are visible" },
        { metric: "max_trx_id", value: "Next transaction ID", role: "All transactions >= max_trx_id are invisible" },
        { metric: "REPEATABLE READ", value: "Snapshot Consistency", role: "Guarantees repeatable reads across whole session" }
      ],
      explanation:
        "Read Views define mathematical visibility rules. Under `REPEATABLE READ`, a single Read View is maintained throughout the transaction, guaranteeing that repeated queries return the exact same snapshot even if concurrent transactions commit updates."
    },
    phase3_purge_threads: {
      phaseNumber: "Phase 3: Purge Threads & HLL",
      title: "3. Background Purge Threads & History List Length (HLL)",
      badge: "Purge & Reclamation",
      badgeColor: "amber",
      sqlSnippet: `-- 🧹 MONITORING PURGE PROGRESS & HISTORY LIST LENGTH:
-- 1. Inspect History List Length (HLL):
SHOW ENGINE INNODB STATUS\\G
-- Look at TRANSACTIONS section:
--   History list length 12450 (Pages waiting for purge cleanup)

-- 2. Configure Purge Threads on Multi-Core Servers:
SHOW VARIABLES LIKE 'innodb_purge_threads'; -- Default: 4 (Up to 32)
SHOW VARIABLES LIKE 'innodb_max_purge_lag';   -- Throttling threshold

-- 3. What the Purge Thread does:
-- - Traverses undo tablespaces.
-- - Deletes undo records no longer visible to ANY active Read View.
-- - Physically frees space in Undo Tablespaces for automatic truncation!`,
      metricsTable: [
        { metric: "History List Length", value: "Unpurged undo page count", role: "Tracks backlog of undo versions awaiting cleanup" },
        { metric: "Purge Threads", value: "innodb_purge_threads = 4", role: "Asynchronously deletes obsolete undo records" },
        { metric: "Delete-Mark Cleanup", value: "Physically removes rows", role: "Reclaims B+ tree space from deleted records" },
        { metric: "Undo Truncation", value: "Shrinks file back to 16MB", role: "Returns disk space when undo logs exceed 1GB" }
      ],
      explanation:
        "Background Purge Threads continually sweep through undo tablespaces, deleting historical versions once all older Read Views have closed. This prevents History List Length (HLL) backlog and enables online undo tablespace shrinking."
    },
    phase4_undo_bloat: {
      phaseNumber: "Phase 4: Undo Bloat Diagnosis",
      title: "4. Diagnosing Long-Running Transactions & Undo Bloat",
      badge: "DBA Troubleshooting",
      badgeColor: "rose",
      sqlSnippet: `-- 🔍 IDENTIFYING TRANSACTIONS BLOCKING PURGE:
-- Find the oldest running transaction holding open a Read View:
SELECT 
    trx_id,
    trx_state,
    trx_started,
    TIMESTAMPDIFF(SECOND, trx_started, NOW()) AS duration_sec,
    trx_mysql_thread_id AS connection_id,
    trx_query
FROM information_schema.innodb_trx
ORDER BY trx_started ASC
LIMIT 5;

-- If an abandoned session has been running for 4 hours (14400s),
-- it is blocking Purge across the ENTIRE database!
-- Kill the stuck connection:
KILL 142; -- Frees the Read View and allows Purge Threads to sweep!`,
      metricsTable: [
        { metric: "Root Cause", value: "Abandoned open transactions", role: "Holds open oldest Read View indefinitely" },
        { metric: "System Impact", value: "Undo Tablespace growth & slow reads", role: "Queries must traverse massive version chains" },
        { metric: "Diagnostic Tool", value: "information_schema.innodb_trx", role: "Pinpoints connection ID and query duration" },
        { metric: "Remediation", value: "KILL connection_id", role: "Instantly unblocks background Purge Threads" }
      ],
      explanation:
        "A single forgotten open transaction can prevent Purge Threads from cleaning up undo logs across the entire database, causing massive disk inflation and query slowdowns. Querying `information_schema.innodb_trx` allows DBAs to kill offending sessions."
    }
  };

  const navItems = [
    { id: "mvcc-overview", label: "1. MVCC Architecture" },
    { id: "version-diagram", label: "2. Version Chain Diagram" },
    { id: "interactive-workbench", label: "3. MVCC Workbench" },
    { id: "case-studies", label: "4. Real-World Case Studies" },
    { id: "pitfalls-rules", label: "5. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "6. MVCC & Undo Checklist" },
    { id: "faq-section", label: "7. FAQs (30 Deep Questions)" },
    { id: "teacher-notes", label: "8. Printable Note & Teacher's Observation" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-900 pb-20">
      {/* Header Banner */}
      <header className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-2">
            <span>Module 004_001</span>
            <span>•</span>
            <span>Topic 6 of 12</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              MVCC &amp; Undo Logs
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            InnoDB Undo Log and MVCC (Multi-Version Concurrency Control) for Non-Blocking Reads
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Understand how InnoDB achieves non-blocking concurrency: explore hidden row system columns (<code className="text-cyan-400 font-mono">DB_TRX_ID</code>, <code className="text-emerald-400 font-mono">DB_ROLL_PTR</code>), the Undo Version Chain linked list, Read View visibility rules, and background Purge Thread mechanics.
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
        {/* SECTION 1: MVCC Overview */}
        <section id="mvcc-overview" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Multi-Version Concurrency Control (MVCC) Overview
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The fundamental concurrency principle: Readers never block Writers, and Writers never block Readers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                1. Hidden Columns
              </span>
              <h3 className="font-bold text-white text-base">DB_TRX_ID &amp; DB_ROLL_PTR</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Every clustered index row contains invisible system pointers that connect current data to historical versions in the Undo Log.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                2. Read Views
              </span>
              <h3 className="font-bold text-white text-base">Consistent Snapshots</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Read Views record active transaction IDs (`m_ids`) to evaluate whether a row version is visible without placing locks.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                3. Purge Threads
              </span>
              <h3 className="font-bold text-white text-base">Undo Space Reclamation</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Background Purge Threads sweep through undo tablespaces, deleting old row versions no longer visible to any active Read View.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Version Chain Diagram */}
        <section id="version-diagram" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Visual Anatomy: The Undo Version Chain Linked List
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How `DB_ROLL_PTR` links current clustered index rows back in time through historical undo versions.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-cyan-300">
                Figure 6.1: Clustered Index Row &amp; Undo Log Version Chain
              </h3>
              <span className="text-xs text-slate-400 font-mono">MVCC Row Structure</span>
            </div>

            <div className="w-full overflow-x-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
              <svg
                viewBox="0 0 950 360"
                className="w-full max-w-4xl mx-auto block font-sans"
                style={{ minWidth: "700px" }}
              >
                <defs>
                  <marker id="arrMvccCyan" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <polygon points="0 0, 8 4, 0 8" fill="#38bdf8" />
                  </marker>
                </defs>

                {/* Current Clustered Index Row */}
                <rect x="20" y="40" width="280" height="280" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                <text x="160" y="70" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">
                  CURRENT CLUSTERED ROW (RAM)
                </text>
                <line x1="20" y1="85" x2="300" y2="85" stroke="#334155" />

                <rect x="35" y="105" width="250" height="35" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="45" y="127" fill="#a7f3d0" fontSize="10" fontWeight="bold">account_id = 101 | balance = ₹15,000</text>

                <rect x="35" y="150" width="250" height="35" rx="4" fill="#1e293b" stroke="#0284c7" />
                <text x="45" y="172" fill="#bae6fd" fontSize="10" fontWeight="bold">DB_TRX_ID = 300 (Active Update)</text>

                <rect x="35" y="195" width="250" height="35" rx="4" fill="#1e293b" stroke="#d97706" />
                <text x="45" y="217" fill="#fde68a" fontSize="10" fontWeight="bold">DB_ROLL_PTR → Undo V2</text>

                <rect x="35" y="240" width="250" height="55" rx="4" fill="#1e293b" stroke="#334155" />
                <text x="45" y="260" fill="#94a3b8" fontSize="9">Latest version seen by new transactions</text>
                <text x="45" y="278" fill="#34d399" fontSize="9">Current Read target (UPDATE / FOR UPDATE)</text>

                {/* Undo Version 2 */}
                <rect x="340" y="40" width="270" height="280" rx="8" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="475" y="70" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
                  UNDO RECORD V2 (Undo Tablespace)
                </text>
                <line x1="340" y1="85" x2="610" y2="85" stroke="#334155" />

                <rect x="355" y="105" width="240" height="35" rx="4" fill="#1e293b" stroke="#0284c7" />
                <text x="365" y="127" fill="#bae6fd" fontSize="10" fontWeight="bold">balance = ₹12,000</text>

                <rect x="355" y="150" width="240" height="35" rx="4" fill="#1e293b" stroke="#0284c7" />
                <text x="365" y="172" fill="#bae6fd" fontSize="10" fontWeight="bold">DB_TRX_ID = 200</text>

                <rect x="355" y="195" width="240" height="35" rx="4" fill="#1e293b" stroke="#d97706" />
                <text x="365" y="217" fill="#fde68a" fontSize="10" fontWeight="bold">DB_ROLL_PTR → Undo V1</text>

                {/* Undo Version 1 */}
                <rect x="650" y="40" width="280" height="280" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="790" y="70" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">
                  UNDO RECORD V1 (Initial Insert)
                </text>
                <line x1="650" y1="85" x2="930" y2="85" stroke="#334155" />

                <rect x="665" y="105" width="250" height="35" rx="4" fill="#1e293b" stroke="#d97706" />
                <text x="675" y="127" fill="#fde68a" fontSize="10" fontWeight="bold">balance = ₹10,000</text>

                <rect x="665" y="150" width="250" height="35" rx="4" fill="#1e293b" stroke="#d97706" />
                <text x="675" y="172" fill="#fde68a" fontSize="10" fontWeight="bold">DB_TRX_ID = 100</text>

                <rect x="665" y="195" width="250" height="35" rx="4" fill="#1e293b" stroke="#334155" />
                <text x="675" y="217" fill="#94a3b8" fontSize="10" fontWeight="bold">DB_ROLL_PTR = NULL (Chain End)</text>

                {/* Connecting Version Chain Arrows */}
                <path d="M 300 212 L 340 212" fill="none" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrMvccCyan)" />
                <path d="M 610 212 L 650 212" fill="none" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrMvccCyan)" />
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 3: MVCC Workbench */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Interactive MVCC &amp; Undo Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Select an MVCC phase to inspect diagnostic scripts, visibility rules, and DBA troubleshooting runbooks.
            </p>
          </div>

          {/* Tab Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {Object.keys(mvccPhases).map((key) => {
              const ph = mvccPhases[key];
              const isSelected = selectedMvccPhase === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedMvccPhase(key)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 border flex items-center gap-2",
                    isSelected
                      ? "bg-cyan-600/30 text-cyan-300 border-cyan-500 shadow-lg shadow-cyan-950/50"
                      : "bg-slate-900/80 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200"
                  )}
                >
                  <span
                    className={clsx(
                      "w-2.5 h-2.5 rounded-full",
                      ph.badgeColor === "emerald" && "bg-emerald-400",
                      ph.badgeColor === "cyan" && "bg-cyan-400",
                      ph.badgeColor === "amber" && "bg-amber-400",
                      ph.badgeColor === "rose" && "bg-rose-400"
                    )}
                  />
                  <span>{ph.phaseNumber}</span>
                </button>
              );
            })}
          </div>

          {/* Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {mvccPhases[selectedMvccPhase].title}
              </h3>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-bold self-start sm:self-auto",
                  mvccPhases[selectedMvccPhase].badgeColor === "emerald" &&
                    "bg-emerald-950 text-emerald-300 border border-emerald-800",
                  mvccPhases[selectedMvccPhase].badgeColor === "cyan" &&
                    "bg-cyan-950 text-cyan-300 border border-cyan-800",
                  mvccPhases[selectedMvccPhase].badgeColor === "amber" &&
                    "bg-amber-950 text-amber-300 border border-amber-800",
                  mvccPhases[selectedMvccPhase].badgeColor === "rose" &&
                    "bg-rose-950 text-rose-300 border border-rose-800"
                )}
              >
                {mvccPhases[selectedMvccPhase].badge}
              </span>
            </div>

            {/* SQL Script Block */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                MVCC Inspection &amp; Diagnostic Queries:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                {mvccPhases[selectedMvccPhase].sqlSnippet}
              </pre>
            </div>

            {/* Metrics Table */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Technical Execution Properties:
              </span>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                  <thead className="bg-slate-900/80 text-cyan-400 font-mono uppercase text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4">Architecture Component</th>
                      <th className="py-2.5 px-4">Configuration &amp; Value</th>
                      <th className="py-2.5 px-4">Concurrency Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-xs">
                    {mvccPhases[selectedMvccPhase].metricsTable.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/50">
                        <td className="py-3 px-4 font-bold text-white font-sans">{row.metric}</td>
                        <td className="py-3 px-4 text-cyan-300">{row.value}</td>
                        <td className="py-3 px-4 text-slate-300 font-sans">{row.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Explanation Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                Engineering Assessment:
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {mvccPhases[selectedMvccPhase].explanation}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Real-World Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Real-World MVCC &amp; Undo Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Resolving History List Length bloat and non-blocking report concurrency in West Bengal enterprises.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case 1: Mamata & Susmita's Undo Bloat Resolution */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Resolving 3-Million History List Length Bloat in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Undo Bloat Cleared
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, a neglected background analytics session left a transaction open for 18 hours. History List Length ballooned to 3.2 million pages and the Undo Tablespace swelled to 45 GB. Killing the abandoned connection from `information_schema.innodb_trx` allowed 4 Purge Threads to sweep the backlog in 4 minutes, automatically truncating the undo file back to 16MB.
              </p>
            </div>

            {/* Case 2: Abhronila & Debangshu's Non-Blocking Backups */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Non-Blocking Online Backups During Peak Hours in Kolkata Hub
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Zero Lock Contention
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, executing `mysqldump --single-transaction` against a 200 GB banking database took 45 minutes to complete. Thanks to InnoDB's `REPEATABLE READ` MVCC snapshot isolation, over 120,000 live customer deposit transactions executed concurrently during the backup with zero table or row lock waiting.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: Senior Pitfalls & Best Practices */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Senior Pitfalls &amp; Production Best Practices
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Avoid dangerous MVCC and transaction management mistakes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Leaving Open Transactions in Web Apps
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Leaving transactions open across HTTP web requests keeps Read Views active, blocking Purge Threads and causing severe undo tablespace bloat.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Commit or rollback transactions immediately before returning HTTP responses.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Confusing Consistent vs Current Reads
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Assuming `SELECT` sees the newest uncommitted data inside another session; plain `SELECT` always reads from its consistent MVCC snapshot.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Use SELECT ... FOR UPDATE only when locking current row state is required.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Monitor History List Length
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Regularly monitor `History list length` in `SHOW ENGINE INNODB STATUS`. Set alerts if HLL exceeds 100,000 pages.
              </p>
              <div className="text-xs text-slate-400">
                Early warning system against long-running rogue transactions.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Enable Undo Log Truncation
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Keep `innodb_undo_log_truncate = ON` enabled so undo tablespace files automatically shrink back to 16MB when exceeding 1GB.
              </p>
              <div className="text-xs text-slate-400">
                Prevents disk expansion from temporary write bursts.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: MVCC & Undo Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. DBA MVCC &amp; Undo Health Checklist
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key concurrency indicators to audit on high-throughput database servers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> MVCC Audit Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-emerald-400">History List Length</strong> = Ensure HLL is stable below 10,000 pages.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-400">Purge Threads</strong> = Set `innodb_purge_threads = 4` (or 8) on multi-core servers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold font-mono">03.</span>
                  <span><strong className="text-amber-400">Active Transactions</strong> = Audit `information_schema.innodb_trx` for long sessions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold font-mono">04.</span>
                  <span><strong className="text-rose-400">Undo Truncation</strong> = Verify `Innodb_undo_truncations` counter in Global Status.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe READ COMMITTED in Analytics...”</span>
                  If your application runs long reporting queries that don't need point-in-time repeatable snapshots, using `READ COMMITTED` allows Purge Threads to clean up intermediate undo logs continuously while the report runs!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about mysqldump with --single-transaction...”</span>
                  MVCC is why MySQL can back up a 500GB database during peak business hours without locking out a single customer payment!
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              7. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comprehensive reference questions covering InnoDB Undo Logs and MVCC.
            </p>
          </div>

          <FAQTemplate
            title="InnoDB Undo Log & MVCC FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint & Teacher's Note */}
        <section id="teacher-notes" className="space-y-8">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              8. Printable Topic Note &amp; Teacher's Observation
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Download clean text documentation for revision and study Sukanta Hui's direct pedagogical insights.
            </p>
          </div>

          <PlainTextPrint
            content={noteText}
            title="InnoDB Undo Log and MVCC (Multi-Version Concurrency Control) for Non-Blocking Reads"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic6_note.txt"
          />

          <Teacher
            note="Multi-Version Concurrency Control (MVCC) is the secret behind MySQL's ability to handle tens of thousands of concurrent users. In legacy databases, reading a row required locking out concurrent writers, creating massive transaction bottlenecks. In InnoDB, the Undo Log preserves previous versions in a version chain, allowing readers to view consistent point-in-time snapshots while writers update rows concurrently. Understanding how DB_TRX_ID, DB_ROLL_PTR, and Purge Threads interact will make you an expert at tuning high-throughput enterprise systems!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic6;
