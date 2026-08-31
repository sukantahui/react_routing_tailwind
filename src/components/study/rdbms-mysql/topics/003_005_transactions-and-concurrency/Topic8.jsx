import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";

/**
 * Topic8 – Setting and Verifying Isolation Levels in MySQL (transaction_isolation)
 * Module: 003_005_transactions-and-concurrency
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on setting and verifying MySQL transaction isolation levels across GLOBAL, SESSION, and NEXT-TRANSACTION scopes, system variable inspection, Error 1568 prevention, and microservice connection pool tuning.
 */
const Topic8 = () => {
  // Interactive Simulator State
  const [selectedScopeScenario, setSelectedScopeScenario] = useState("next_transaction_scope");

  const scopeScenarios = {
    next_transaction_scope: {
      title: "1. Next-Transaction Scope: Temporary Single-Transaction Override",
      badge: "Next-Transaction Scope",
      badgeColor: "emerald",
      sqlQuery: `-- 🛡️ SINGLE NEXT-TRANSACTION OVERRIDE (Auto-Reversion):
-- Session base setting is REPEATABLE READ:
SELECT @@transaction_isolation; -- Returns 'REPEATABLE-READ'

-- 1. Configure isolation for ONLY the single next transaction:
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

-- 2. Open transaction (Executes strictly under SERIALIZABLE):
START TRANSACTION;
SELECT balance FROM student_ledgers WHERE student_id = 101; -- Locks with S-Lock!
COMMIT;

-- 3. Next transaction AUTOMATICALLY reverts to session default:
SELECT @@transaction_isolation; -- Reverted to 'REPEATABLE-READ' ✅`,
      resultRows: [
        { scopeLevel: "Session Baseline", activeVariable: "@@transaction_isolation", configuredLevel: "REPEATABLE-READ", appliesTo: "Default for all queries", duration: "Permanent in Session", status: "Base Setting" },
        { scopeLevel: "SET TRANSACTION", activeVariable: "Next Tx Characteristic", configuredLevel: "SERIALIZABLE", appliesTo: "Single Upcoming Tx Only", duration: "1 Transaction", status: "Active in Tx 1 🔒" },
        { scopeLevel: "Post-COMMIT Reversion", activeVariable: "@@transaction_isolation", configuredLevel: "REPEATABLE-READ", appliesTo: "All Subsequent Queries", duration: "Restored", status: "Auto-Reverted ✅" },
      ],
      explanation:
        "Omitting the scope keyword (`SET TRANSACTION ISOLATION LEVEL ...`) sets the isolation level strictly for the single upcoming transaction. Once committed, the session automatically reverts back to its baseline.",
    },
    session_connection_pool_scope: {
      title: "2. Session Scope: Configuring Microservice Connection Pools",
      badge: "Session Scope",
      badgeColor: "cyan",
      sqlQuery: `-- ⚡ CONFIGURING SESSION SCOPE FOR CONNECTION POOLS:
-- Applied upon acquiring a connection from the pool:
SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;

-- Verification in current connection:
SELECT @@SESSION.transaction_isolation; -- Returns 'READ-COMMITTED'

-- All subsequent transactions in this session inherit READ COMMITTED:
START TRANSACTION;
SELECT * FROM student_ledgers WHERE department_id = 1; -- Fresh statement snapshots!
COMMIT;

-- Transaction 2 also uses READ COMMITTED:
START TRANSACTION;
UPDATE student_ledgers SET balance = balance - 500 WHERE student_id = 101;
COMMIT;`,
      resultRows: [
        { scopeLevel: "SET SESSION", activeVariable: "@@SESSION.transaction_isolation", configuredLevel: "READ-COMMITTED", appliesTo: "Current Connection ONLY", duration: "Until Disconnect", status: "Session Active ⚡" },
        { scopeLevel: "Other Connected Sessions", activeVariable: "@@SESSION.transaction_isolation", configuredLevel: "REPEATABLE-READ", appliesTo: "Other Client Tabs", duration: "Unaffected", status: "Isolated 🛡️" },
      ],
      explanation:
        "`SET SESSION TRANSACTION ISOLATION LEVEL` alters the isolation level for all subsequent transactions executed on that specific client connection without affecting other concurrent connections.",
    },
    global_server_scope_boot: {
      title: "3. Global Scope & my.cnf: Server-Wide Enterprise Defaults",
      badge: "Global Scope",
      badgeColor: "amber",
      sqlQuery: `-- 🌐 GLOBAL SERVER CONFIGURATION & VERIFICATION:
-- 1. Dynamic Runtime Global Update (Admin only):
SET GLOBAL TRANSACTION ISOLATION LEVEL READ COMMITTED;

-- 2. Inspect Global Setting:
SELECT @@GLOBAL.transaction_isolation; -- Returns 'READ-COMMITTED'

-- 3. Permanent Boot Configuration in my.cnf / my.ini:
-- [mysqld]
-- transaction-isolation = READ-COMMITTED
-- binlog_format = ROW

-- 4. MySQL 8.0 Dynamic Persistence:
SET PERSIST transaction_isolation = 'READ-COMMITTED';`,
      resultRows: [
        { scopeLevel: "SET GLOBAL", activeVariable: "@@GLOBAL.transaction_isolation", configuredLevel: "READ-COMMITTED", appliesTo: "All NEW Future Connections", duration: "Until Server Restart", status: "Global Active 🌐" },
        { scopeLevel: "SET PERSIST", activeVariable: "mysqld-auto.cnf", configuredLevel: "READ-COMMITTED", appliesTo: "Survives Server Reboots", duration: "Permanent on Disk", status: "Persisted ✅" },
      ],
      explanation:
        "`SET GLOBAL` updates the default isolation level for all future incoming client connections. Use `SET PERSIST` or edit `my.cnf` to preserve the setting across server reboots.",
    },
    error_1568_mid_transaction_hazard: {
      title: "4. Error 1568: The Mid-Transaction Mutation Trap",
      badge: "Error 1568 Hazard",
      badgeColor: "rose",
      sqlQuery: `-- ❌ THE MID-TRANSACTION MUTATION TRAP:
START TRANSACTION;

-- Transaction is now actively in progress:
SELECT balance FROM student_ledgers WHERE student_id = 101;

-- 🚨 Attempting to change isolation level MID-TRANSACTION:
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
-- 💥 ERROR 1568 (25001): Transaction characteristics can't be changed while a transaction is in progress!

-- 🛡️ CORRECT FIX:
-- Execute SET TRANSACTION BEFORE issuing START TRANSACTION!
COMMIT;
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
START TRANSACTION; -- Succeeds cleanly!`,
      resultRows: [
        { scopeLevel: "Mid-Tx Mutation Attempt", activeVariable: "SET TRANSACTION in active Tx", configuredLevel: "SERIALIZABLE", appliesTo: "Active LUW", duration: "Blocked", status: "💥 ERROR 1568 (25001)" },
        { scopeLevel: "Pre-Tx Configuration (Fix)", activeVariable: "SET TRANSACTION before START", configuredLevel: "SERIALIZABLE", appliesTo: "Next Tx", duration: "1 Transaction", status: "Succeeds Cleanly ✅" },
      ],
      explanation:
        "MySQL strictly prohibits modifying transaction characteristics while a transaction is active. Always execute `SET TRANSACTION ISOLATION LEVEL` *before* issuing `START TRANSACTION;`.",
    },
  };

  const navItems = [
    { id: "scope-overview", label: "1. The 3 Isolation Scopes" },
    { id: "verification-syntax", label: "2. Verifying System Variables" },
    { id: "svg-diagrams", label: "3. Scope Lifecycles & Reversion SVGs" },
    { id: "interactive-sandbox", label: "4. Live Scope Workbench" },
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
            <span>Topic 8 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Isolation Configuration
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Setting &amp; Verifying Isolation Levels
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master the syntax, scoping rules, and system variable inspections for configuring transaction isolation in MySQL 8.0. Learn how to manage <code className="text-cyan-300 font-mono">GLOBAL</code>, <code className="text-cyan-300 font-mono">SESSION</code>, and <code className="text-cyan-300 font-mono">NEXT-TRANSACTION</code> scopes, inspect <code className="text-cyan-300 font-mono">@@transaction_isolation</code>, and prevent Error 1568.
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
        {/* SECTION 1: The 3 Isolation Scopes */}
        <section id="scope-overview" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Three Scopes of Isolation Configuration
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How MySQL governs the lifespan and inheritance of transaction isolation parameters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-cyan-400 font-mono">1. Next-Transaction Scope</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                <code className="text-cyan-300 font-mono">SET TRANSACTION ISOLATION LEVEL ...</code> applies strictly to the single upcoming transaction. Once committed, the session reverts to its baseline.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400 font-mono">2. Session Scope</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                <code className="text-emerald-300 font-mono">SET SESSION TRANSACTION ISOLATION LEVEL ...</code> applies to all future transactions executed on that specific connection session.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-amber-400 font-mono">3. Global Scope</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                <code className="text-amber-300 font-mono">SET GLOBAL TRANSACTION ISOLATION LEVEL ...</code> sets the server-wide default for all NEW incoming client connections.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Verifying System Variables */}
        <section id="verification-syntax" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Inspecting and Verifying Isolation Variables
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Querying system variables in MySQL 8.0 and handling legacy MySQL 5.7 migrations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="font-mono text-cyan-400 font-bold text-xs uppercase">MySQL 8.0 Standard</span>
              <h3 className="font-bold text-white">@@transaction_isolation</h3>
              <pre className="p-3 bg-slate-950 rounded-lg text-cyan-300 font-mono text-xs border border-slate-800">
{`SELECT @@transaction_isolation;
SELECT @@GLOBAL.transaction_isolation;
SHOW VARIABLES LIKE '%isolation%';`}
              </pre>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="font-mono text-rose-400 font-bold text-xs uppercase">MySQL 5.7 Legacy</span>
              <h3 className="font-bold text-white">@@tx_isolation (Deprecated)</h3>
              <pre className="p-3 bg-slate-950 rounded-lg text-rose-300 font-mono text-xs border border-slate-800">
{`-- Deprecated in 5.7.20, Removed in 8.0:
SELECT @@tx_isolation; -- ❌ Fails in MySQL 8.0!
-- Upgrade to @@transaction_isolation!`}
              </pre>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Scope Lifecycles &amp; Next-Tx Reversion
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Visualizing the 3 scoping tiers and the automatic reversion lifecycle of next-transaction overrides.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: The 3 Scopes */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Isolation Scope Hierarchy &amp; Inheritance
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Global */}
                  <g>
                    <rect x="30" y="30" width="230" height="100" rx="8" fill="#451a03" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="145" y="55" fill="#fcd34d" fontSize="10" fontWeight="bold" textAnchor="middle">1. GLOBAL SCOPE</text>
                    <rect x="40" y="70" width="210" height="40" rx="4" fill="#1e293b" />
                    <text x="145" y="88" fill="#fbbf24" fontSize="8 font-mono" textAnchor="middle">SET GLOBAL ...</text>
                    <text x="145" y="102" fill="#fde68a" fontSize="7 font-mono" textAnchor="middle">All NEW Connections</text>
                  </g>

                  {/* Session */}
                  <g>
                    <rect x="290" y="30" width="230" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="405" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">2. SESSION SCOPE</text>
                    <rect x="300" y="70" width="210" height="40" rx="4" fill="#022c22" />
                    <text x="405" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">SET SESSION ...</text>
                    <text x="405" y="102" fill="#34d399" fontSize="7 font-mono" textAnchor="middle">Current Connection Lifetime</text>
                  </g>

                  {/* Next-Tx */}
                  <g>
                    <rect x="550" y="30" width="260" height="100" rx="8" fill="#083344" stroke="#06b6d4" strokeWidth="2" />
                    <text x="680" y="55" fill="#67e8f9" fontSize="10" fontWeight="bold" textAnchor="middle">3. NEXT-TX SCOPE</text>
                    <rect x="560" y="70" width="240" height="40" rx="4" fill="#0f172a" />
                    <text x="680" y="88" fill="#38bdf8" fontSize="8 font-mono font-bold" textAnchor="middle">SET TRANSACTION ...</text>
                    <text x="680" y="102" fill="#bae6fd" fontSize="7 font-bold" textAnchor="middle">Single Next Tx Only (Auto-Reverts)</text>
                  </g>

                  {/* Arrows */}
                  <path d="M 260 80 L 290 80" stroke="#f59e0b" strokeWidth="1.5" />
                  <path d="M 520 80 L 550 80" stroke="#10b981" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* SVG 2: Next-Tx Reversion */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400 font-mono">Diagram B:</span> Next-Transaction Auto-Reversion Lifecycle
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Phase 1 */}
                  <g>
                    <rect x="30" y="30" width="220" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="140" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">1. Base Session</text>
                    <rect x="40" y="70" width="200" height="40" rx="4" fill="#022c22" />
                    <text x="140" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">REPEATABLE READ</text>
                    <text x="140" y="102" fill="#34d399" fontSize="7 font-mono" textAnchor="middle">Default session baseline</text>
                  </g>

                  {/* Phase 2 */}
                  <g>
                    <rect x="290" y="30" width="230" height="100" rx="8" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                    <text x="405" y="55" fill="#fcd34d" fontSize="10" fontWeight="bold" textAnchor="middle">2. Audit Override (Tx 1)</text>
                    <rect x="300" y="70" width="210" height="40" rx="4" fill="#1e293b" />
                    <text x="405" y="88" fill="#fbbf24" fontSize="8 font-mono font-bold" textAnchor="middle">SERIALIZABLE Active</text>
                    <text x="405" y="102" fill="#fde68a" fontSize="7 font-bold" textAnchor="middle">SET TRANSACTION ...</text>
                  </g>

                  {/* Phase 3 */}
                  <g>
                    <rect x="560" y="30" width="240" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="680" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">3. Post-Commit (Tx 2)</text>
                    <rect x="570" y="70" width="220" height="40" rx="4" fill="#022c22" />
                    <text x="680" y="88" fill="#a7f3d0" fontSize="8 font-mono font-bold" textAnchor="middle">REPEATABLE READ ⚡</text>
                    <text x="680" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Automatically Reverted ✅</text>
                  </g>

                  {/* Arrows */}
                  <path d="M 250 80 L 290 80" stroke="#f59e0b" strokeWidth="2" />
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
              4. Interactive Isolation Scope Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test Next-Transaction scoping, Session pool configurations, Global server defaults, and Error 1568 mid-transaction traps live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(scopeScenarios).map(([key, item]) => {
              const isActive = selectedScopeScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedScopeScenario(key)}
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
                        item.badgeColor === "amber" && "bg-amber-950 text-amber-400 border border-amber-800",
                        item.badgeColor === "rose" && "bg-rose-950 text-rose-400 border border-rose-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Scope" : "○ Run Scope Test"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{scopeScenarios[selectedScopeScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{scopeScenarios[selectedScopeScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Scoping Runtime
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Scoping Execution Script</span>
                <span className="text-emerald-400">System Variable Tuning</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {scopeScenarios[selectedScopeScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Scope Level</th>
                    <th className="py-3 px-4 text-white">Active System Variable</th>
                    <th className="py-3 px-4 text-emerald-400">Configured Level</th>
                    <th className="py-3 px-4 text-cyan-400">Applies To</th>
                    <th className="py-3 px-4 text-amber-400">Lifespan / Duration</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {scopeScenarios[selectedScopeScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.scopeLevel}</td>
                      <td className="py-3 px-4 font-mono text-white">{row.activeVariable}</td>
                      <td className="py-3 px-4 text-emerald-300 font-mono font-bold">{row.configuredLevel}</td>
                      <td className="py-3 px-4 text-slate-300 font-sans">{row.appliesTo}</td>
                      <td className="py-3 px-4 text-amber-300 font-mono">{row.duration}</td>
                      <td className="py-3 px-4">
                        <span
                          className={clsx(
                            "px-2 py-0.5 rounded text-[11px] font-sans font-medium border",
                            row.status.includes("Active") || row.status.includes("Reverted") || row.status.includes("Setting") || row.status.includes("Persisted") || row.status.includes("Cleanly") || row.status.includes("Isolated")
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
              Dual connection pool tuning for fast checkout and analytical reporting in Barrackpore.
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
                  Dual-Pool Architecture in Barrackpore Student Management System
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Central Academy Backend</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui architected a high-concurrency Spring Boot backend: Instead of running all operations under a single isolation level, the application maintains two distinct HikariCP connection pools. The <strong>OLTP Write Pool (50 connections)</strong> initializes with <code className="text-emerald-300 font-mono">READ COMMITTED</code> to eliminate gap lock deadlocks during rapid student fee checkouts, while the <strong>Analytics Pool (10 connections)</strong> runs under <code className="text-cyan-300 font-mono">REPEATABLE READ</code> for immutable point-in-time financial audits!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`// Spring Boot application.yml Configuration:
spring:
  datasource:
    oltp:
      hikari:
        connection-init-sql: "SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED"
    analytics:
      hikari:
        connection-init-sql: "SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ"`}
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
              Never execute SET TRANSACTION mid-transaction and verify scope when running audits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Executing SET TRANSACTION After START TRANSACTION
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Executing `SET TRANSACTION ISOLATION LEVEL` after `START TRANSACTION` has already opened the transaction throws Error 1568!
              </p>
              <div className="text-xs text-slate-400">
                Fix: Always execute <code className="text-emerald-400 font-mono">SET TRANSACTION</code> *before* <code className="text-emerald-400 font-mono">START TRANSACTION;</code>!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Query @@transaction_isolation in MySQL 8.0
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Always use <code className="text-emerald-400 font-mono">SELECT @@transaction_isolation;</code> in modern codebases; the legacy <code className="text-rose-300 font-mono">@@tx_isolation</code> variable is completely removed in MySQL 8.0.
              </p>
              <div className="text-xs text-slate-400">
                Ensures cross-version forward compatibility.
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
              Key takeaways for Setting &amp; Verifying Isolation Levels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Configuration Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><code className="text-cyan-300 font-mono">SET GLOBAL</code> affects all new future connections.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span><code className="text-cyan-300 font-mono">SET SESSION</code> affects the current client connection.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span><code className="text-cyan-300 font-mono">SET TRANSACTION</code> affects ONLY the single next transaction.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Query <code className="text-cyan-300 font-mono">@@transaction_isolation</code> to verify the active level.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe next-transaction auto-reversion...”</span>
                  Using `SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;` is the cleanest way to run a single strict audit transaction because it automatically reverts to session defaults upon commit!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about SET PERSIST...”</span>
                  In MySQL 8.0, use `SET PERSIST transaction_isolation = 'READ-COMMITTED';` to change running server defaults and write them directly to disk without manual my.cnf edits!
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
              Comprehensive reference questions covering setting and verifying MySQL transaction isolation levels across GLOBAL, SESSION, and NEXT-TRANSACTION scopes, system variable inspection, Error 1568 prevention, and microservice connection pool tuning.
            </p>
          </div>

          <FAQTemplate
            title="Setting & Verifying Isolation Levels FAQs"
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
            title="Setting and Verifying Isolation Levels in MySQL (transaction_isolation)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic8_note.txt"
          />

          <Teacher
            note="Configuring isolation levels requires precision: Remember that omitting the scope keyword applies strictly to the single next transaction, which is perfect for one-off financial audits. For high-scale web services, configure dual connection pools—allocating READ COMMITTED for rapid write checkouts and REPEATABLE READ for multi-table audit jobs. Always inspect @@transaction_isolation to verify your active environment!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic8;
