import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

/**
 * Topic0 – MySQL Server Architecture: Client Layer, Core Server Layer, and Storage Engine API
 * Module: 004_001_storage-engines-and-architecture
 *
 * @component
 * @returns {JSX.Element} Interactive 3-tier MySQL architecture workbench: exploring connection handling, SQL parsing/optimization lifecycle, the C++ Handler Storage Engine API, and the separation of concerns between server components and physical disk storage engines.
 */
const Topic0 = () => {
  // Interactive Architecture Tier State
  const [selectedArchTier, setSelectedArchTier] = useState("tier1_connection");

  const architectureTiers = {
    tier1_connection: {
      tierNumber: "Tier 1: Connection Layer",
      title: "1. Tier 1: Client & Network Connection Layer",
      badge: "Connection & Auth",
      badgeColor: "emerald",
      sqlSnippet: `-- 🔌 TIER 1: INSPECTING CONNECTIONS & THREAD MANAGEMENT:
-- Check active client thread connections:
SHOW GLOBAL STATUS LIKE 'Threads_%';

-- Inspect current client connections and states:
SHOW FULL PROCESSLIST;

-- Check server maximum connection capacity:
SHOW VARIABLES LIKE 'max_connections';      -- Default: 151
SHOW VARIABLES LIKE 'thread_cache_size';    -- Thread pool cache!

-- View active authentication plugin:
SELECT user, host, plugin FROM mysql.user WHERE user = 'root';
-- Result: 'caching_sha2_password' (SHA-256 with memory caching)`,
      componentList: [
        { component: "Network Listener", duty: "Handles TCP/IP sockets, Unix domain sockets, and named pipes", metric: "Port 3306" },
        { component: "Authentication Plugin", duty: "Verifies user credentials via caching_sha2_password / SSL", metric: "Security Gateway" },
        { component: "Thread Pool / Cache", duty: "Allocates dedicated execution threads and caches idle threads", metric: "thread_cache_size" }
      ],
      explanation:
        "The Client / Connection Layer manages network connections, negotiates SSL/TLS encryption, authenticates client sessions via plugins, and allocates execution threads without touching the SQL query parser."
    },
    tier2_server_core: {
      tierNumber: "Tier 2: SQL Server Core",
      title: "2. Tier 2: Core Server Layer (Parser, Preprocessor & Optimizer)",
      badge: "SQL Core Layer",
      badgeColor: "cyan",
      sqlSnippet: `-- ⚙️ TIER 2: SQL QUERY PROCESSING & OPTIMIZER EXECUTION:
-- 1. Parser generates Parse Tree (AST) → Throws Error 1064 on syntax failure.
-- 2. Preprocessor validates tables & columns against Information Schema.
-- 3. Cost-Based Optimizer (CBO) evaluates indexes and access costs.

-- Inspecting execution plan chosen by the Optimizer:
EXPLAIN FORMAT=TREE
SELECT 
    s.student_id, s.full_name, c.course_name, a.initial_deposit_inr
FROM students s
JOIN admissions a ON s.student_id = a.student_id
JOIN courses c ON a.course_id = c.course_id
WHERE s.city = 'Barrackpore';

-- Check SQL Mode & Server Configuration:
SELECT @@sql_mode;
SELECT @@version, @@version_comment;`,
      componentList: [
        { component: "SQL Lexer & Parser", duty: "Validates syntax grammar and constructs the Parse Tree (AST)", metric: "Syntax Verification" },
        { component: "Preprocessor", duty: "Resolves table/column names and verifies user permissions", metric: "Semantic Validation" },
        { component: "Cost-Based Optimizer", duty: "Selects lowest-cost execution paths, join orders, and indexes", metric: "Execution Planning" }
      ],
      explanation:
        "The Core Server Layer houses all universal RDBMS features: query parsing, semantic validation, the Cost-Based Optimizer, stored procedures, triggers, views, and the unified transactional data dictionary."
    },
    tier3_handler_api: {
      tierNumber: "Tier 3: Storage Engine API",
      title: "3. Tier 3: The Pluggable Storage Engine API (Handler Interface)",
      badge: "Handler API",
      badgeColor: "amber",
      sqlSnippet: `-- 🧩 TIER 3: PLUGGABLE HANDLER API ABSTRACTION:
-- The core server communicates with storage engines via the C++ 'handler' base class:
-- 
-- Key Handler Methods:
-- 1. handler::ha_index_read_map() → Reads row via B+ Tree index seek
-- 2. handler::ha_index_next()     → Iterates next entry in index scan
-- 3. handler::ha_rnd_next()       → Full table scan next record
-- 4. handler::ha_write_row()      → Inserts new physical row record
-- 5. handler::ha_delete_row()     → Deletes physical row record

-- Inspecting all active storage engines:
SHOW ENGINES;

-- Verifying storage engine assigned to individual tables:
SELECT table_name, engine, table_rows, data_length, index_length
FROM information_schema.tables
WHERE table_schema = 'college_admissions';`,
      componentList: [
        { component: "handler Base Class", duty: "Abstract C++ interface defining universal storage methods", metric: "API Contract" },
        { component: "ha_index_read_map", duty: "Performs targeted index seeks on engine B+ trees", metric: "Index Probe" },
        { component: "Row Buffer Exchange", duty: "Transfers decoded column buffers between engine and server", metric: "uchar *record" }
      ],
      explanation:
        "The Handler API is the open abstraction interface that decouples SQL processing from physical disk layouts. The server layer has no knowledge of 16KB disk pages or B+ trees—it simply invokes standard handler methods."
    },
    tier4_pluggable_engines: {
      tierNumber: "Tier 4: Storage Engines",
      title: "4. Pluggable Storage Engines Ecosystem (InnoDB, MyISAM, MEMORY)",
      badge: "Engine Ecosystem",
      badgeColor: "rose",
      sqlSnippet: `-- 💾 TIER 4: CHOOSING WORKLOAD-SPECIFIC STORAGE ENGINES:

-- 1. InnoDB: ACID Transactions, Row Locking, MVCC, Crash Recovery (Default!):
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    order_total_inr DECIMAL(10,2)
) ENGINE=InnoDB;

-- 2. MEMORY: Ultra-fast In-Memory Hash Lookup Table (Ephemeral!):
CREATE TABLE active_sessions (
    session_id VARCHAR(64) PRIMARY KEY,
    user_id INT NOT NULL
) ENGINE=MEMORY;

-- 3. CSV: Plaintext CSV Files directly readable by spreadsheets:
CREATE TABLE system_audit_logs (
    log_time VARCHAR(30) NOT NULL,
    action_text VARCHAR(100) NOT NULL
) ENGINE=CSV;`,
      componentList: [
        { component: "InnoDB", duty: "Default transactional engine: B+ Trees, Buffer Pool, Redo/Undo logs, MVCC", metric: "OLTP Workloads" },
        { component: "MEMORY", duty: "In-memory hash tables for ultra-fast transient lookups", metric: "High Speed Cache" },
        { component: "CSV / ARCHIVE", duty: "Compressed append-only raw logging and spreadsheet interop", metric: "Bulk Log Archival" }
      ],
      explanation:
        "Because of MySQL's pluggable architecture, different tables in the exact same database can use different storage engines tailored specifically for transactional OLTP, in-memory caching, or append-only logging."
    }
  };

  const navItems = [
    { id: "arch-overview", label: "1. 3-Tier Architecture" },
    { id: "arch-diagram", label: "2. Visual Server Diagram" },
    { id: "interactive-workbench", label: "3. Architecture Workbench" },
    { id: "case-studies", label: "4. Production Case Studies" },
    { id: "pitfalls-rules", label: "5. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "6. DBA Architecture Checklist" },
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
            <span>Topic 0 of 12</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Segment 4: Enterprise DBA
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            MySQL Server Architecture: Client Layer, Core Server Layer, and Storage Engine API
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Uncover the internal engineering of MySQL: explore the 3-tier logical architecture, client thread pooling, SQL parsing and optimization pipelines, and the open C++ Handler Storage Engine API that powers pluggable storage engines.
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
        {/* SECTION 1: 3-Tier Architecture Overview */}
        <section id="arch-overview" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The 3-Tier MySQL Server Architecture
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              A clean separation of concerns between connection management, SQL processing, and physical disk storage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                Tier 1
              </span>
              <h3 className="font-bold text-white text-base">Client &amp; Connection Layer</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Manages TCP/IP network sockets, SSL/TLS encryption, user authentication via `caching_sha2_password`, and client thread pooling.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                Tier 2
              </span>
              <h3 className="font-bold text-white text-base">Core SQL Server Layer</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Contains the Lexer/Parser, Preprocessor, Cost-Based Optimizer (CBO), Executor, Stored Routines, Views, Triggers, and Data Dictionary.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                Tier 3
              </span>
              <h3 className="font-bold text-white text-base">Storage Engine Handler API</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                The open C++ `handler` abstraction interface connecting the SQL executor to physical engines (InnoDB, MyISAM, MEMORY, CSV).
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Visual Server Diagram */}
        <section id="arch-diagram" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Visual Anatomy: MySQL 3-Tier Logical Architecture
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Tracing how an SQL statement flows through the connection threads, SQL core, and handler API into storage engines.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-cyan-300">
                Figure 0.1: MySQL 3-Tier Architecture &amp; Handler API Pipeline
              </h3>
              <span className="text-xs text-slate-400 font-mono">Server Internals</span>
            </div>

            <div className="w-full overflow-x-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
              <svg
                viewBox="0 0 950 360"
                className="w-full max-w-4xl mx-auto block font-sans"
                style={{ minWidth: "700px" }}
              >
                <defs>
                  <marker id="arrArchCyan" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <polygon points="0 0, 8 4, 0 8" fill="#38bdf8" />
                  </marker>
                </defs>

                {/* Layer 1: Client & Connection */}
                <rect x="20" y="40" width="220" height="280" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                <text x="130" y="70" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">1. CLIENT &amp; CONNECTION</text>
                <line x1="20" y1="85" x2="240" y2="85" stroke="#334155" />
                <rect x="35" y="105" width="190" height="40" rx="4" fill="#1e293b" stroke="#334155" />
                <text x="45" y="125" fill="#bae6fd" fontSize="10" fontWeight="bold">Connection Pool / Threads</text>
                <text x="45" y="138" fill="#94a3b8" fontSize="9">max_connections (151)</text>

                <rect x="35" y="155" width="190" height="40" rx="4" fill="#1e293b" stroke="#334155" />
                <text x="45" y="175" fill="#bae6fd" fontSize="10" fontWeight="bold">Authentication &amp; SSL</text>
                <text x="45" y="188" fill="#94a3b8" fontSize="9">caching_sha2_password</text>

                <rect x="35" y="205" width="190" height="40" rx="4" fill="#1e293b" stroke="#334155" />
                <text x="45" y="225" fill="#bae6fd" fontSize="10" fontWeight="bold">Session State &amp; Memory</text>
                <text x="45" y="238" fill="#94a3b8" fontSize="9">Thread Cache Allocation</text>

                {/* Layer 2: Core Server */}
                <rect x="270" y="40" width="370" height="280" rx="8" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="455" y="70" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">2. CORE SQL SERVER LAYER</text>
                <line x1="270" y1="85" x2="640" y2="85" stroke="#334155" />
                
                <rect x="285" y="105" width="160" height="40" rx="4" fill="#1e293b" stroke="#334155" />
                <text x="295" y="125" fill="#bae6fd" fontSize="10" fontWeight="bold">Parser (AST Tree)</text>
                <text x="295" y="138" fill="#94a3b8" fontSize="9">Syntax &amp; Grammar</text>

                <rect x="465" y="105" width="160" height="40" rx="4" fill="#1e293b" stroke="#334155" />
                <text x="475" y="125" fill="#bae6fd" fontSize="10" fontWeight="bold">Preprocessor</text>
                <text x="475" y="138" fill="#94a3b8" fontSize="9">Semantic Privileges</text>

                <rect x="285" y="160" width="340" height="50" rx="4" fill="#1e293b" stroke="#0284c7" />
                <text x="300" y="182" fill="#38bdf8" fontSize="11" fontWeight="bold">Cost-Based Optimizer (CBO)</text>
                <text x="300" y="198" fill="#94a3b8" fontSize="10">Index selection, join ordering, execution plan generation</text>

                <rect x="285" y="225" width="340" height="45" rx="4" fill="#1e293b" stroke="#334155" />
                <text x="300" y="245" fill="#e2e8f0" fontSize="10" fontWeight="bold">Executor &amp; Data Dictionary</text>
                <text x="300" y="260" fill="#94a3b8" fontSize="9">Stored Routines, Views, Triggers, Information Schema</text>

                {/* Layer 3: Storage Engines */}
                <rect x="670" y="40" width="260" height="280" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="800" y="70" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">3. STORAGE ENGINES (API)</text>
                <line x1="670" y1="85" x2="930" y2="85" stroke="#334155" />
                <rect x="685" y="100" width="230" height="35" rx="4" fill="#1e293b" stroke="#d97706" />
                <text x="695" y="122" fill="#fde68a" fontSize="10" fontWeight="bold">Handler C++ Interface (ha_...)</text>

                <rect x="685" y="145" width="230" height="35" rx="4" fill="#1e293b" stroke="#10b981" />
                <text x="695" y="167" fill="#a7f3d0" fontSize="10" fontWeight="bold">InnoDB (ACID, MVCC, B+ Tree)</text>

                <rect x="685" y="190" width="230" height="35" rx="4" fill="#1e293b" stroke="#334155" />
                <text x="695" y="212" fill="#e2e8f0" fontSize="10">MyISAM (Table Locks, No ACID)</text>

                <rect x="685" y="235" width="230" height="35" rx="4" fill="#1e293b" stroke="#334155" />
                <text x="695" y="257" fill="#e2e8f0" fontSize="10">MEMORY / CSV / ARCHIVE</text>

                {/* Connecting Arrows */}
                <path d="M 240 180 L 270 180" fill="none" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrArchCyan)" />
                <path d="M 640 180 L 670 180" fill="none" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrArchCyan)" />
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 3: Interactive Architecture Workbench */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Interactive Server Architecture Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Select an architectural tier to inspect administrative SQL scripts, component responsibilities, and internal handler API metrics.
            </p>
          </div>

          {/* Tab Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {Object.keys(architectureTiers).map((key) => {
              const tier = architectureTiers[key];
              const isSelected = selectedArchTier === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedArchTier(key)}
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
                      tier.badgeColor === "emerald" && "bg-emerald-400",
                      tier.badgeColor === "cyan" && "bg-cyan-400",
                      tier.badgeColor === "amber" && "bg-amber-400",
                      tier.badgeColor === "rose" && "bg-rose-400"
                    )}
                  />
                  <span>{tier.tierNumber}</span>
                </button>
              );
            })}
          </div>

          {/* Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {architectureTiers[selectedArchTier].title}
              </h3>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-bold self-start sm:self-auto",
                  architectureTiers[selectedArchTier].badgeColor === "emerald" &&
                    "bg-emerald-950 text-emerald-300 border border-emerald-800",
                  architectureTiers[selectedArchTier].badgeColor === "cyan" &&
                    "bg-cyan-950 text-cyan-300 border border-cyan-800",
                  architectureTiers[selectedArchTier].badgeColor === "amber" &&
                    "bg-amber-950 text-amber-300 border border-amber-800",
                  architectureTiers[selectedArchTier].badgeColor === "rose" &&
                    "bg-rose-950 text-rose-300 border border-rose-800"
                )}
              >
                {architectureTiers[selectedArchTier].badge}
              </span>
            </div>

            {/* SQL Script Block */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Administrative Diagnostic Commands:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                {architectureTiers[selectedArchTier].sqlSnippet}
              </pre>
            </div>

            {/* Component Responsibilities Table */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Internal Subsystem Responsibilities:
              </span>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                  <thead className="bg-slate-900/80 text-cyan-400 font-mono uppercase text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4">Subsystem Component</th>
                      <th className="py-2.5 px-4">Architectural Role &amp; Execution Duty</th>
                      <th className="py-2.5 px-4">Configuration / Metric</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-xs">
                    {architectureTiers[selectedArchTier].componentList.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/50">
                        <td className="py-3 px-4 font-bold text-white font-sans">{row.component}</td>
                        <td className="py-3 px-4 text-slate-300 font-sans">{row.duty}</td>
                        <td className="py-3 px-4 text-emerald-400">{row.metric}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Explanation Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                Architecture Deep Dive:
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {architectureTiers[selectedArchTier].explanation}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Real-World Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Real-World Architecture Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Diagnosing production connection bottlenecks and storage engine choices in West Bengal systems.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case 1: Mamata & Susmita's Connection Pool Tuning */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Resolving Error 1040 (Too Many Connections) in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Connection Layer Tuned
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                During college exam registration in Barrackpore, 800 students attempted simultaneous logins, exhausting `max_connections = 151` and crashing backend microservices. Increasing `max_connections = 1000` and implementing HikariCP backend connection pooling resolved the saturation immediately.
              </p>
            </div>

            {/* Case 2: Abhronila & Debangshu's Multi-Engine Architecture */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Hybrid InnoDB + MEMORY Architecture in Kolkata Hub
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  10x Cache Speedup
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, a high-throughput retail checkout application stored active user shopping carts in a transient `ENGINE=MEMORY` table while committing settled payment orders into persistent `ENGINE=InnoDB` tables, delivering sub-millisecond cart updates with crash-safe order settlement.
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
              Avoid critical architectural configuration mistakes in production MySQL deployments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Creating New DB Connections Per Request
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Opening and destroying a new TCP connection on every web request causes high thread churn and CPU thrashing in the Connection Layer.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always use application-level connection pools (e.g. HikariCP, mysql2 pool).
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Using MyISAM for Transactional Data
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                MyISAM lacks ACID transactions, uses table-level locks, and is prone to table corruption on power loss.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always use InnoDB for all transactional and relational tables.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Reserve Admin Connections
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                MySQL automatically reserves 1 connection slot for users with `CONNECTION_ADMIN` privilege when `max_connections` is saturated.
              </p>
              <div className="text-xs text-slate-400">
                Allows DBAs to log in and kill rogue queries during traffic spikes.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Understand the Handler API Boundary
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Remember that Views, Triggers, and Functions execute at the Server Layer, while Locks, MVCC, and Page I/O execute at the Storage Engine layer.
              </p>
              <div className="text-xs text-slate-400">
                Enables accurate performance diagnosis and DBA tuning.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: DBA Architecture Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. DBA Architecture Checklist
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key architecture inspection points for MySQL administrators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Server Inspection Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-emerald-400">Connection Layer</strong> = Monitor `Threads_connected` vs `max_connections`.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-400">Auth Plugins</strong> = Enforce `caching_sha2_password` across all user accounts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold font-mono">03.</span>
                  <span><strong className="text-amber-400">Storage Engines</strong> = Verify active tables use `ENGINE=InnoDB` via `SHOW ENGINES;`.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold font-mono">04.</span>
                  <span><strong className="text-rose-400">Thread Cache</strong> = Tune `thread_cache_size` to minimize thread creation overhead.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe SHOW PROCESSLIST...”</span>
                  If you see dozens of connections stuck in the 'Waiting for table level lock' state, you are likely running MyISAM tables instead of InnoDB!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about the Handler API...”</span>
                  The beauty of MySQL's Handler API is that you can build custom storage engines (like RocksDB or Spider) and plug them directly into MySQL without altering SQL syntax!
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
              Comprehensive reference questions covering MySQL Server Architecture and the Storage Engine API.
            </p>
          </div>

          <FAQTemplate
            title="MySQL Server Architecture & Storage Engine API FAQs"
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
            title="MySQL Server Architecture: Client Layer, Core Server Layer, and Storage Engine API"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic0_note.txt"
          />

          <Teacher
            note="Welcome to Segment 4: Database Administration, Security & Enterprise MySQL! In this opening module, we look under the hood of MySQL to understand how it actually executes queries. Many developers assume MySQL is a monolithic binary, but it is actually a modular 3-tier system. The Connection Layer handles sessions, the Core Server parses and optimizes SQL, and the Storage Engine API interacts with physical disk pages. When you understand this boundary, concepts like InnoDB Buffer Pools, MVCC, redo logs, and replication become intuitive and clear!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic0;
