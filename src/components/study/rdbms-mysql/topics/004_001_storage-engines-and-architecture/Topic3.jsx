import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

/**
 * Topic3 – InnoDB In-Memory Components: Buffer Pool, Change Buffer, Adaptive Hash Index, Log Buffer
 * Module: 004_001_storage-engines-and-architecture
 *
 * @component
 * @returns {JSX.Element} Interactive in-memory subsystems workbench: exploring Buffer Pool Midpoint LRU eviction lists, non-unique secondary index Change Buffering, Adaptive Hash Index (AHI) lookups, and Log Buffer commit flushing policies in MySQL.
 */
const Topic3 = () => {
  // Interactive Subsystem State
  const [selectedSubsystem, setSelectedSubsystem] = useState("subsystem_buffer_pool");

  const inMemorySubsystems = {
    subsystem_buffer_pool: {
      subsystemNumber: "1. Buffer Pool & Midpoint LRU",
      title: "1. Buffer Pool: Midpoint Insertion LRU & Page Eviction",
      badge: "Buffer Pool LRU",
      badgeColor: "emerald",
      sqlSnippet: `-- 🧠 BUFFER POOL ALLOCATION & MIDPOINT LRU CONFIGURATION:
-- 1. Check Buffer Pool Total Pages, Free Pages & Dirty Pages:
SHOW GLOBAL STATUS LIKE 'Innodb_buffer_pool_pages_%';

-- 2. Configure Midpoint LRU Insertion Ratio (Default: 37% Old Sublist):
SHOW VARIABLES LIKE 'innodb_old_blocks_pct';  -- Default: 37 (3/8ths)
SHOW VARIABLES LIKE 'innodb_old_blocks_time'; -- Default: 1000 ms delay before promotion

-- 3. Dynamic Online Resizing of Buffer Pool in MySQL 8.0:
SET GLOBAL innodb_buffer_pool_size = 34359738368; -- 32 GB RAM

-- 4. Enable Fast Warmup Dump & Load:
SET GLOBAL innodb_buffer_pool_dump_at_shutdown = ON;
SET GLOBAL innodb_buffer_pool_load_at_startup = ON;`,
      metricsTable: [
        { metric: "Young Sublist (Hot)", value: "5/8ths (~63%) of LRU list", role: "Caches frequently accessed hot data pages" },
        { metric: "Old Sublist (Cold)", value: "3/8ths (~37%) of LRU list", role: "Staging area for newly read pages from disk" },
        { metric: "Promotion Delay", value: "innodb_old_blocks_time = 1000ms", role: "Protects hot pages against full table scan pollution" },
        { metric: "Instances", value: "innodb_buffer_pool_instances", role: "Partitions memory to eliminate mutex lock bottlenecks" }
      ],
      explanation:
        "The Midpoint Insertion LRU algorithm divides memory into Young (hot) and Old (cold) sublists. New pages are inserted at the 3/8ths midpoint. If read only once during a batch scan, they are evicted from the Old list without polluting the Young list."
    },
    subsystem_change_buffer: {
      subsystemNumber: "2. Change Buffer",
      title: "2. Change Buffer: Non-Unique Secondary Index Write Buffering",
      badge: "Change Buffer",
      badgeColor: "cyan",
      sqlSnippet: `-- 🧩 CHANGE BUFFER CONFIGURATION & METRICS:
-- 1. Inspect Change Buffer Operations (Inserts, Deletes, Purges):
SHOW ENGINE INNODB STATUS\\G
-- Look for 'INSERT BUFFER AND ADAPTIVE HASH INDEX' section!

-- 2. Configure Change Buffer Maximum Allocation:
SHOW VARIABLES LIKE 'innodb_change_buffer_max_size'; -- Default: 25% of Buffer Pool
SHOW VARIABLES LIKE 'innodb_change_buffering';       -- Default: 'all' (inserts, deletes, purges)

-- 3. Why it applies only to NON-UNIQUE secondary indexes:
-- Unique indexes require immediate disk reads to verify uniqueness constraints;
-- Non-unique indexes can safely defer random I/O until the page is naturally accessed!`,
      metricsTable: [
        { metric: "Supported Operations", value: "all (inserts, delete-marks, purges)", role: "Buffers secondary index modifications" },
        { metric: "Index Requirement", value: "Non-Unique Secondary Indexes ONLY", role: "Unique indexes bypass change buffering" },
        { metric: "Merge Trigger", value: "Page Read / Idle Master Thread / Shutdown", role: "Merges buffered updates when page is in RAM" },
        { metric: "Memory Cap", value: "Up to 25% - 50% of Buffer Pool", role: "Prevents change buffer from crowding data pages" }
      ],
      explanation:
        "The Change Buffer eliminates expensive random disk I/O by caching modifications to non-unique secondary indexes whose pages are not in RAM. When a query later reads the page, all buffered updates are merged in memory."
    },
    subsystem_ahi: {
      subsystemNumber: "3. Adaptive Hash Index",
      title: "3. Adaptive Hash Index (AHI): Dynamic O(1) Search Acceleration",
      badge: "AHI Hash Index",
      badgeColor: "amber",
      sqlSnippet: `-- ⚡ ADAPTIVE HASH INDEX (AHI) METRICS & TUNING:
-- 1. Check AHI Search Efficiency (Hits vs B+ Tree Traversal):
SHOW GLOBAL STATUS LIKE 'Innodb_adaptive_hash_%';
-- Compare: Innodb_adaptive_hash_searches (AHI Hits)
--     vs:  Innodb_adaptive_hash_searches_btree (B+ Tree Seeks)

-- 2. Partitioning AHI to Reduce Mutex Lock Contention:
SHOW VARIABLES LIKE 'innodb_adaptive_hash_index_parts'; -- Default: 8

-- 3. Enabling or Disabling AHI for Write-Heavy Workloads:
SET GLOBAL innodb_adaptive_hash_index = ON; -- Default: ON (Disable if AHI locks show contention)`,
      metricsTable: [
        { metric: "Search Complexity", value: "O(1) Constant Time Lookup", role: "Bypasses B+ tree root-to-leaf index traversal" },
        { metric: "Construction", value: "100% Dynamic & Automatic", role: "InnoDB monitors query patterns and builds hash keys" },
        { metric: "Partitioning", value: "innodb_adaptive_hash_index_parts = 8", role: "Reduces rw-lock contention across CPU cores" },
        { metric: "Best Workload", value: "Repetitive exact-match equality lookups", role: "Maximizes point query throughput in RAM" }
      ],
      explanation:
        "InnoDB dynamically monitors index search patterns. If it observes repeated queries on specific index prefixes, it automatically constructs an in-memory hash table, converting $O(\\log N)$ B+ tree seeks into $O(1)$ instant lookups."
    },
    subsystem_log_buffer: {
      subsystemNumber: "4. Log Buffer & Commits",
      title: "4. Log Buffer: Write-Ahead Redo Staging & Commit Policies",
      badge: "Log Buffer & WAL",
      badgeColor: "rose",
      sqlSnippet: `-- 📝 LOG BUFFER & COMMIT FLUSHING POLICIES:
-- 1. Inspect Log Buffer Size:
SHOW VARIABLES LIKE 'innodb_log_buffer_size'; -- Default: 16MB or 64MB

-- 2. Inspect Commit Durability Policy:
SHOW VARIABLES LIKE 'innodb_flush_log_at_trx_commit';
-- Value 1 (Default): Flushed to disk on EVERY commit (100% ACID Durability)
-- Value 2: Written to OS cache on commit; fsynced to disk once per second (High Speed)
-- Value 0: Written and fsynced once per second (Fastest, up to 1s data loss risk)

-- 3. Monitoring Redo Log Flush Frequency:
SHOW GLOBAL STATUS LIKE 'Innodb_os_log_%';`,
      metricsTable: [
        { metric: "Log Buffer Size", value: "innodb_log_buffer_size = 16M / 64M", role: "Stages WAL redo records before disk sync" },
        { metric: "Commit Policy 1 (ACID)", value: "Sync on every COMMIT", role: "Guarantees 100% crash durability" },
        { metric: "Commit Policy 2 (Fast)", value: "Write to OS cache on commit", role: "Survives MySQL crash; 1s risk on OS power cut" },
        { metric: "Commit Policy 0 (Max)", value: "Flush once per second in background", role: "Maximum write throughput for non-critical logs" }
      ],
      explanation:
        "The Log Buffer holds transaction changes before writing them to on-disk Redo Log files. The `innodb_flush_log_at_trx_commit` setting allows architects to balance absolute ACID durability against high-throughput write performance."
    }
  };

  const navItems = [
    { id: "subsystems-overview", label: "1. In-Memory Overview" },
    { id: "lru-diagram", label: "2. Midpoint LRU Diagram" },
    { id: "interactive-workbench", label: "3. Subsystems Workbench" },
    { id: "case-studies", label: "4. Real-World Case Studies" },
    { id: "pitfalls-rules", label: "5. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "6. Memory Tuning Checklist" },
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
            <span>Topic 3 of 12</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              In-Memory Components
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            InnoDB In-Memory Components: Buffer Pool, Change Buffer, Adaptive Hash Index, Log Buffer
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Deep dive into the memory subsystems that make InnoDB lightning fast: master the Midpoint Insertion LRU eviction algorithm, non-unique secondary index Change Buffering, Adaptive Hash Indexing (<code className="text-emerald-400 font-mono">O(1)</code> lookups), and Log Buffer commit flushing policies.
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
        {/* SECTION 1: In-Memory Overview */}
        <section id="subsystems-overview" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four In-Memory Engine Subsystems
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How InnoDB coordinates RAM caching to shield physical disk storage from random I/O bottlenecks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Subsystem 1</span>
              <h3 className="font-bold text-white">Buffer Pool (LRU)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Caches 16KB data and index pages using a midpoint young/old split to resist scan pollution.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Subsystem 2</span>
              <h3 className="font-bold text-white">Change Buffer</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Buffers inserts/deletes to non-unique secondary indexes, merging on subsequent page read.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">Subsystem 3</span>
              <h3 className="font-bold text-white">Adaptive Hash Index</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Dynamically builds in-memory hash pointers for hot pages, providing O(1) search speeds.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Subsystem 4</span>
              <h3 className="font-bold text-white">Log Buffer</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Stages sequential Redo Log records in RAM, flushing on transaction commits and checkpoints.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Midpoint LRU Diagram */}
        <section id="lru-diagram" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Visual Anatomy: Buffer Pool Midpoint Insertion LRU
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How the 5/8ths Young Sublist and 3/8ths Old Sublist protect hot pages from table scan evictions.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-cyan-300">
                Figure 3.1: Midpoint Insertion LRU List &amp; Promotion Delay
              </h3>
              <span className="text-xs text-slate-400 font-mono">Memory Eviction Algorithm</span>
            </div>

            <div className="w-full overflow-x-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
              <svg
                viewBox="0 0 950 360"
                className="w-full max-w-4xl mx-auto block font-sans"
                style={{ minWidth: "700px" }}
              >
                <defs>
                  <marker id="arrMemCyan" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <polygon points="0 0, 8 4, 0 8" fill="#38bdf8" />
                  </marker>
                </defs>

                {/* Young Sublist Box */}
                <rect x="30" y="40" width="460" height="280" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                <text x="260" y="70" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">
                  YOUNG SUBLIST (Hot Pages - Top 5/8ths ~63%)
                </text>
                <line x1="30" y1="85" x2="490" y2="85" stroke="#334155" />

                <rect x="50" y="105" width="420" height="45" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="65" y="127" fill="#a7f3d0" fontSize="11" fontWeight="bold">Head of LRU List (Most Recently Accessed)</text>
                <text x="65" y="142" fill="#94a3b8" fontSize="9">Hot transactional user records &amp; root index pages</text>

                <rect x="50" y="165" width="420" height="50" rx="4" fill="#1e293b" stroke="#334155" />
                <text x="65" y="187" fill="#e2e8f0" fontSize="10" fontWeight="bold">Active Working Set Cached in RAM</text>
                <text x="65" y="202" fill="#94a3b8" fontSize="9">Pages accessed repeatedly stay in Young sublist indefinitely</text>

                <rect x="50" y="230" width="420" height="40" rx="4" fill="#1e293b" stroke="#334155" />
                <text x="65" y="252" fill="#94a3b8" fontSize="10">Tail of Young Sublist → Transitions to Midpoint</text>

                {/* Midpoint Boundary Marker */}
                <line x1="510" y1="40" x2="510" y2="320" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" />
                <text x="510" y="30" fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle">MIDPOINT (3/8ths)</text>

                {/* Old Sublist Box */}
                <rect x="530" y="40" width="390" height="280" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="725" y="70" fill="#fbbf24" fontSize="13" fontWeight="bold" textAnchor="middle">
                  OLD SUBLIST (Cold Pages - Bottom 3/8ths ~37%)
                </text>
                <line x1="530" y1="85" x2="920" y2="85" stroke="#334155" />

                <rect x="550" y="105" width="350" height="55" rx="4" fill="#1e293b" stroke="#d97706" />
                <text x="565" y="127" fill="#fde68a" fontSize="11" fontWeight="bold">📥 Midpoint Insertion Point</text>
                <text x="565" y="145" fill="#94a3b8" fontSize="9">ALL newly read disk pages enter here first!</text>

                {/* Promotion Arrow */}
                <path d="M 550 130 C 490 130, 480 180, 470 180" fill="none" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrMemCyan)" />
                <text x="510" y="170" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">Promotion (if re-accessed after &gt;1000ms)</text>

                <rect x="550" y="215" width="350" height="55" rx="4" fill="#1e293b" stroke="#be123c" />
                <text x="565" y="237" fill="#fca5a5" fontSize="11" fontWeight="bold">🗑️ Tail of LRU (Eviction Target)</text>
                <text x="565" y="255" fill="#94a3b8" fontSize="9">Cold pages evicted when Free List is empty</text>
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 3: Interactive Subsystems Workbench */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Interactive Subsystems Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Select an in-memory component to inspect tuning variables, operational metrics, and internal execution rules.
            </p>
          </div>

          {/* Tab Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {Object.keys(inMemorySubsystems).map((key) => {
              const sys = inMemorySubsystems[key];
              const isSelected = selectedSubsystem === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedSubsystem(key)}
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
                      sys.badgeColor === "emerald" && "bg-emerald-400",
                      sys.badgeColor === "cyan" && "bg-cyan-400",
                      sys.badgeColor === "amber" && "bg-amber-400",
                      sys.badgeColor === "rose" && "bg-rose-400"
                    )}
                  />
                  <span>{sys.subsystemNumber}</span>
                </button>
              );
            })}
          </div>

          {/* Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {inMemorySubsystems[selectedSubsystem].title}
              </h3>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-bold self-start sm:self-auto",
                  inMemorySubsystems[selectedSubsystem].badgeColor === "emerald" &&
                    "bg-emerald-950 text-emerald-300 border border-emerald-800",
                  inMemorySubsystems[selectedSubsystem].badgeColor === "cyan" &&
                    "bg-cyan-950 text-cyan-300 border border-cyan-800",
                  inMemorySubsystems[selectedSubsystem].badgeColor === "amber" &&
                    "bg-amber-950 text-amber-300 border border-amber-800",
                  inMemorySubsystems[selectedSubsystem].badgeColor === "rose" &&
                    "bg-rose-950 text-rose-300 border border-rose-800"
                )}
              >
                {inMemorySubsystems[selectedSubsystem].badge}
              </span>
            </div>

            {/* SQL Script Block */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Subsystem Configuration &amp; Diagnostic Queries:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                {inMemorySubsystems[selectedSubsystem].sqlSnippet}
              </pre>
            </div>

            {/* Metrics Table */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Operational Metrics &amp; Engineering Roles:
              </span>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                  <thead className="bg-slate-900/80 text-cyan-400 font-mono uppercase text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4">Architecture Metric</th>
                      <th className="py-2.5 px-4">Configuration / Target Value</th>
                      <th className="py-2.5 px-4">Engineering Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-xs">
                    {inMemorySubsystems[selectedSubsystem].metricsTable.map((row, idx) => (
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
                Subsystem Deep Dive:
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {inMemorySubsystems[selectedSubsystem].explanation}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Real-World Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Real-World Memory Tuning Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Performance tuning scenarios solved in Barrackpore and Kolkata enterprises.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case 1: Mamata & Susmita's Change Buffer Optimization */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Eliminating Random Disk I/O During Batch Ledger Ingestion
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Change Buffer Active
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, inserting 50,000 student admission fee records caused severe disk write spikes due to updates on 4 secondary indexes. Configuring `innodb_change_buffer_max_size = 40%` allowed all non-unique index modifications to be buffered in RAM, reducing total disk I/O operations by 72% and cutting batch ingestion time from 4 minutes to 38 seconds.
              </p>
            </div>

            {/* Case 2: Abhronila & Debangshu's Buffer Pool Dump */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Instant 99% Warm Cache on Reboot in Kolkata Data Center
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Buffer Pool Warmup
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, server reboots previously caused 30 minutes of slow "cold-cache" query response times while pages were loaded on demand from SSDs. Enabling `innodb_buffer_pool_dump_at_shutdown` and `innodb_buffer_pool_load_at_startup` preloaded the 64 GB working set in 20 seconds during boot, giving users an immediate 99.2% hit ratio.
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
              Avoid dangerous in-memory configuration mistakes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Over-Allocating Buffer Pool Size
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Setting `innodb_buffer_pool_size` to 90%+ of total server RAM leaves no memory for OS kernel buffers, connection threads, and sort buffers, causing OS OOM (Out of Memory) kills.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Keep Buffer Pool between 50% and 75% of server RAM.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Using innodb_flush_log_at_trx_commit = 0 in Banking
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Setting flush policy to 0 in financial or payment systems risks losing up to 1 second of committed monetary transactions during a power outage.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always use innodb_flush_log_at_trx_commit = 1 for financial OLTP.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Partition Buffer Pool Instances
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                On multi-core servers with Buffer Pools &gt; 1GB, set `innodb_buffer_pool_instances` (typically 8 or 16) to reduce mutex lock contention.
              </p>
              <div className="text-xs text-slate-400">
                Dramatically improves concurrent thread scalability.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Enable Buffer Pool Warmup
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Always keep `innodb_buffer_pool_dump_at_shutdown = ON` and `innodb_buffer_pool_load_at_startup = ON` enabled in `my.cnf`.
              </p>
              <div className="text-xs text-slate-400">
                Ensures instant high performance after server reboots.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Memory Tuning Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. DBA In-Memory Tuning Checklist
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key parameters to audit on high-throughput database servers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> In-Memory Audit Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-emerald-400">Midpoint LRU</strong> = Confirm `innodb_old_blocks_pct = 37` and `old_blocks_time = 1000ms`.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-400">Change Buffer</strong> = Verify `innodb_change_buffering = all` for write acceleration.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold font-mono">03.</span>
                  <span><strong className="text-amber-400">AHI Monitored</strong> = Check `Innodb_adaptive_hash_searches` efficiency ratio.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold font-mono">04.</span>
                  <span><strong className="text-rose-400">Log Buffer</strong> = Ensure `innodb_log_buffer_size` is sized adequately (16M-64M).</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe Midpoint Insertion LRU...”</span>
                  If you run a batch reporting script that reads a 50GB table, notice that the hit ratio on transactional tables does not drop. That is the magic of the 1000ms midpoint promotion delay in action!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about AHI Partitioning...”</span>
                  On 32-core and 64-core servers, setting `innodb_adaptive_hash_index_parts = 16` prevents the global AHI mutex from becoming a CPU bottleneck under high concurrent read loads!
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
              Comprehensive reference questions covering InnoDB In-Memory Subsystems.
            </p>
          </div>

          <FAQTemplate
            title="InnoDB In-Memory Components FAQs"
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
            title="InnoDB In-Memory Components: Buffer Pool, Change Buffer, Adaptive Hash Index, Log Buffer"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic3_note.txt"
          />

          <Teacher
            note="The internal memory architecture of InnoDB is a masterpiece of systems engineering. Without the Midpoint Insertion LRU policy, a single full table scan could wipe out all your hot transactional cache. Without the Change Buffer, every secondary index update would force a random disk read. And without the Adaptive Hash Index, high-frequency queries would spend CPU cycles repeatedly traversing B+ tree levels. When you master these memory subsystems, you can tune MySQL to handle hundreds of thousands of queries per second effortlessly!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic3;
