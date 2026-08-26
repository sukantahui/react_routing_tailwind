import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic11_files/topic11_questions";
import noteText from "./topic11_files/topic11_note.txt?raw";

/**
 * Topic11 – Configuring Buffer Pool Size (innodb_buffer_pool_size) and Tuning Memory Parameters
 * Module: 004_001_storage-engines-and-architecture
 *
 * @component
 * @returns {JSX.Element} Interactive memory tuning workbench: calculating optimal Buffer Pool sizing with the 50%-75% rule, dynamic online memory resizing and chunk alignment, per-thread memory budgeting to prevent Linux OOM kills, and Buffer Pool warmup dump/load automation in MySQL.
 */
const Topic11 = () => {
  // Interactive Memory Tuning State
  const [selectedMemoryPhase, setSelectedMemoryPhase] = useState("phase1_sizing_rule");

  const memoryPhases = {
    phase1_sizing_rule: {
      phaseNumber: "Phase 1: Sizing Rules",
      title: "1. The 50%-75% Rule: Dedicated vs Shared Server Sizing",
      badge: "RAM Allocation",
      badgeColor: "emerald",
      sqlSnippet: `-- 🧠 BUFFER POOL SIZING & STATUS INSPECTION:
-- 1. Check current Buffer Pool Size in bytes and GB:
SELECT 
    @@innodb_buffer_pool_size AS bytes,
    ROUND(@@innodb_buffer_pool_size / 1024 / 1024 / 1024, 2) AS size_gb;

-- 2. DEDICATED DATABASE SERVER SIZING GUIDELINE:
-- Server RAM = 64 GB &rarr; Set innodb_buffer_pool_size = 48 GB (75%)
-- Server RAM = 128 GB -&gt; Set innodb_buffer_pool_size = 96 GB (75%)
-- Server RAM = 256 GB -> Set innodb_buffer_pool_size = 192 GB (75%)

-- 3. SHARED APPLICATION SERVER (MySQL + Node.js / Redis):
-- Set innodb_buffer_pool_size = 25% - 40% of physical RAM!

-- ⚠️ DANGER: Allocating > 80% RAM risks Linux OOM killer termination!`,
      metricsTable: [
        { hostType: "Dedicated DB Host", allocation: "50% to 75% Total RAM", role: "Maximizes RAM page caching with 25% reserve for OS" },
        { hostType: "Shared Host (Web+DB)", allocation: "25% to 40% Total RAM", role: "Prevents memory contention with Redis / Web servers" },
        { hostType: "Over-Allocation Risk", allocation: "&gt; 80% Total RAM", role: "Triggers Linux Out-of-Memory (OOM) killer crashes ❌" },
        { hostType: "Linux Swappiness", allocation: "vm.swappiness = 1", role: "Prevents OS from swapping database RAM to disk" }
      ],
      explanation:
        "On dedicated database servers, allocating 50% to 75% of physical RAM to `innodb_buffer_pool_size` maximizes query performance while leaving ample memory for operating system buffers, connection threads, and sort operations."
    },
    phase2_online_resizing: {
      phaseNumber: "Phase 2: Online Resizing",
      title: "2. Online Resizing & Chunk Alignment Mechanics",
      badge: "Dynamic Online Resize",
      badgeColor: "cyan",
      sqlSnippet: `-- ⚡ DYNAMIC ONLINE BUFFER POOL RESIZING (Zero Downtime):
-- 1. Resize Buffer Pool dynamically from 16 GB to 32 GB online:
SET GLOBAL innodb_buffer_pool_size = 34359738368; -- 32 GB

-- 2. Inspect real-time resize progress:
SHOW GLOBAL STATUS LIKE 'Innodb_buffer_pool_resize_status';
-- Output: "Resizing buffer pool from 16GB to 32GB (chunk 8/16)..."

-- 3. Chunk Alignment Formula:
-- innodb_buffer_pool_size MUST be an exact multiple of:
-- (innodb_buffer_pool_chunk_size * innodb_buffer_pool_instances)
-- e.g., 128 MB chunk * 8 instances = 1024 MB (1 GB) increment unit!`,
      metricsTable: [
        { parameter: "innodb_buffer_pool_size", value: "SET GLOBAL online", role: "Resizes memory live without server reboot" },
        { parameter: "innodb_buffer_pool_chunk_size", value: "Default: 128 MB", role: "The granular unit of memory chunk allocation" },
        { parameter: "innodb_buffer_pool_instances", value: "Default: 8 (for &gt; 1GB)", role: "Partitions memory to eliminate mutex contention" },
        { parameter: "Alignment Rule", value: "Multiple of (chunk * instances)", role: "MySQL rounds size UP to nearest valid boundary" }
      ],
      explanation:
        "MySQL 8.0 supports online Buffer Pool resizing. Memory is allocated in chunks defined by `innodb_buffer_pool_chunk_size * innodb_buffer_pool_instances`. Executing `SET GLOBAL innodb_buffer_pool_size` expands or shrinks memory with zero downtime."
    },
    phase3_per_thread_budget: {
      phaseNumber: "Phase 3: Per-Thread Memory",
      title: "3. Per-Thread Memory Budgeting & OOM Prevention",
      badge: "OOM Prevention",
      badgeColor: "amber",
      sqlSnippet: `-- 🧮 TOTAL MAXIMUM SERVER MEMORY FORMULA:
-- Total RAM = Global Buffers + (max_connections * Per-Thread Buffers)

-- GLOBAL BUFFERS:
-- - innodb_buffer_pool_size (e.g. 48 GB)
-- - innodb_log_buffer_size (e.g. 64 MB)
-- - temptable_max_ram (e.g. 1 GB)
-- - Performance Schema (e.g. 1 GB)

-- PER-THREAD BUFFERS (Multiplied by active connections!):
-- - sort_buffer_size (e.g. 2 MB)
-- - join_buffer_size (e.g. 2 MB)
-- - read_buffer_size (e.g. 128 KB)
-- - read_rnd_buffer_size (e.g. 256 KB)
-- - binlog_cache_size (e.g. 64 KB)
-- Total Per-Thread = ~4.5 MB

-- Max RAM = 50 GB + (500 connections * 4.5 MB) = 50 GB + 2.25 GB = 52.25 GB! ✅`,
      metricsTable: [
        { buffer: "sort_buffer_size", value: "2 MB - 4 MB", role: "Allocated per-thread for ORDER BY / GROUP BY operations" },
        { buffer: "join_buffer_size", value: "2 MB - 4 MB", role: "Allocated per-thread for table joins without indexes" },
        { buffer: "max_connections", value: "151 - 1000", role: "Multiplier for all per-thread memory allocations" },
        { buffer: "OOM Risk Formula", value: "Global + (max_conn * Per-Thread)", role: "Must stay within 90% of total physical server RAM" }
      ],
      explanation:
        "Total server memory equals Global Buffers plus `max_connections` multiplied by Per-Thread Buffers. Keeping per-thread buffers conservative (2MB-4MB) prevents high-connection traffic spikes from exhausting RAM and triggering OOM kernel kills."
    },
    phase4_warmup_hit_ratio: {
      phaseNumber: "Phase 4: Warmup & Hit Ratio",
      title: "4. Buffer Pool Warmup Persistence & Hit Ratio Monitoring",
      badge: "Warmup & Metrics",
      badgeColor: "rose",
      sqlSnippet: `-- 📈 BUFFER POOL WARMUP & HIT RATIO MONITORING:
-- 1. Enable Fast Startup Warmup Persistence:
SET GLOBAL innodb_buffer_pool_dump_at_shutdown = ON;
SET GLOBAL innodb_buffer_pool_load_at_startup = ON;
SET GLOBAL innodb_buffer_pool_dump_pct = 25; -- Dumps top 25% hottest pages

-- 2. Calculate Real-Time Buffer Pool Hit Ratio:
SELECT 
    ROUND(100 * (1 - (reads.variable_value / reqs.variable_value)), 2) AS hit_ratio_pct
FROM performance_schema.global_status reads
JOIN performance_schema.global_status reqs 
    ON reqs.variable_name = 'Innodb_buffer_pool_read_requests'
WHERE reads.variable_name = 'Innodb_buffer_pool_reads';
-- Target: > 99.0% for high-performance enterprise OLTP! ✅`,
      metricsTable: [
        { metric: "Hit Ratio Target", value: "&gt; 99.0% (Ideal: &gt; 99.5%)", role: "Confirms 99%+ of queries execute at RAM speeds" },
        { metric: "Undersized Indicator", value: "Hit Ratio &lt; 95.0%", role: "Indicates working set exceeds RAM; causes heavy disk I/O" },
        { metric: "Warmup Dump", value: "innodb_buffer_pool_dump_at_shutdown", role: "Saves hot page IDs to ib_buffer_pool file" },
        { metric: "Warmup Load", value: "innodb_buffer_pool_load_at_startup", role: "Preloads hot pages into memory on server boot" }
      ],
      explanation:
        "Enabling Buffer Pool warmup persistence dumps hot page IDs on shutdown and reloads them on boot, eliminating cold-cache degradation. Monitoring the Buffer Pool Hit Ratio ensures queries consistently achieve greater than 99% RAM hit rates."
    }
  };

  const navItems = [
    { id: "sizing-overview", label: "1. Sizing Guidelines" },
    { id: "ram-diagram", label: "2. Server RAM Blueprint" },
    { id: "interactive-workbench", label: "3. Memory Tuning Workbench" },
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
            <span>Topic 11 of 12</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Memory Tuning Guide
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Configuring Buffer Pool Size (innodb_buffer_pool_size) and Tuning Memory Parameters
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master the crowning skill of MySQL database administration: apply the 50%-75% Buffer Pool sizing rule, configure multi-instance concurrency scaling, budget per-thread buffers to prevent Linux OOM kills, and automate instant cache warmup.
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
        {/* SECTION 1: Sizing Overview */}
        <section id="sizing-overview" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The 50% - 75% Buffer Pool Sizing Standard
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The single most impactful configuration parameter governing MySQL throughput and latency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white">50% - 75% Rule</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Allocate 50-75% RAM on dedicated DB hosts, leaving 25% for OS kernel and query buffers.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white">Instances (8 / 16)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Divide memory into independent instances to eliminate mutex lock bottlenecks on multi-core CPUs.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-white">Per-Thread Budget</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Budget sort/join buffers with `max_connections` to prevent Linux OOM killer crashes.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-white">Warmup Dump/Load</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Dump hot page IDs on shutdown and reload on startup for instant 99%+ hit ratio on reboot.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Server RAM Blueprint Diagram */}
        <section id="ram-diagram" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Visual Anatomy: Total Server Physical RAM Allocation Blueprint
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How physical memory is partitioned between the Buffer Pool, Global Shared Buffers, Per-Thread Buffers, and the Operating System.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-cyan-300">
                Figure 11.1: 64 GB Dedicated Server Physical RAM Allocation Model
              </h3>
              <span className="text-xs text-slate-400 font-mono">Memory Architecture</span>
            </div>

            <div className="w-full overflow-x-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
              <svg
                viewBox="0 0 950 360"
                className="w-full max-w-4xl mx-auto block font-sans"
                style={{ minWidth: "700px" }}
              >
                {/* 64 GB Total RAM Container */}
                <rect x="30" y="40" width="890" height="280" rx="8" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="475" y="65" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">
                  64 GB TOTAL SERVER PHYSICAL RAM ALLOCATION MODEL
                </text>
                <line x1="30" y1="80" x2="920" y2="80" stroke="#334155" />

                {/* Block 1: Buffer Pool (48 GB / 75%) */}
                <rect x="50" y="95" width="480" height="205" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                <text x="290" y="125" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">
                  INNODB BUFFER POOL (48 GB - 75% of RAM)
                </text>
                <line x1="50" y1="140" x2="530" y2="140" stroke="#334155" />

                <rect x="65" y="155" width="210" height="40" rx="4" fill="#0f172a" stroke="#047857" />
                <text x="75" y="175" fill="#a7f3d0" fontSize="10" fontWeight="bold">Data &amp; Index Pages</text>
                <text x="75" y="188" fill="#94a3b8" fontSize="8">Midpoint LRU Young (63%)</text>

                <rect x="290" y="155" width="220" height="40" rx="4" fill="#0f172a" stroke="#047857" />
                <text x="300" y="175" fill="#a7f3d0" fontSize="10" fontWeight="bold">Old Sublist (37%)</text>
                <text x="300" y="188" fill="#94a3b8" fontSize="8">Staging area for disk reads</text>

                <rect x="65" y="205" width="210" height="40" rx="4" fill="#0f172a" stroke="#334155" />
                <text x="75" y="225" fill="#bae6fd" fontSize="10" fontWeight="bold">Adaptive Hash Index</text>
                <text x="75" y="238" fill="#94a3b8" fontSize="8">Dynamic O(1) Search Hash</text>

                <rect x="290" y="205" width="220" height="40" rx="4" fill="#0f172a" stroke="#334155" />
                <text x="300" y="225" fill="#bae6fd" fontSize="10" fontWeight="bold">Change Buffer</text>
                <text x="300" y="238" fill="#94a3b8" fontSize="8">Secondary Index Write Buffer</text>

                <rect x="65" y="255" width="445" height="30" rx="4" fill="#0f172a" stroke="#047857" />
                <text x="287" y="275" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">
                  8 Independent Instances (6 GB each) &rarr; Zero Mutex Contention ⚡
                </text>

                {/* Block 2: Global Buffers (4 GB) */}
                <rect x="545" y="95" width="165" height="205" rx="6" fill="#1e293b" stroke="#0284c7" />
                <text x="627" y="125" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                  GLOBAL BUFFERS (4 GB)
                </text>
                <line x1="545" y1="140" x2="710" y2="140" stroke="#334155" />
                <text x="555" y="165" fill="#bae6fd" fontSize="9" fontWeight="bold">• Log Buffer (64 MB)</text>
                <text x="555" y="195" fill="#bae6fd" fontSize="9" fontWeight="bold">• TempTable (1 GB)</text>
                <text x="555" y="225" fill="#bae6fd" fontSize="9" fontWeight="bold">• Performance Schema</text>
                <text x="555" y="255" fill="#bae6fd" fontSize="9" fontWeight="bold">• Data Dictionary RAM</text>

                {/* Block 3: Per-Thread + OS Kernel Reserve (12 GB / 25%) */}
                <rect x="725" y="95" width="180" height="205" rx="6" fill="#1e293b" stroke="#f59e0b" />
                <text x="815" y="125" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">
                  THREADS &amp; OS (12 GB)
                </text>
                <line x1="725" y1="140" x2="905" y2="140" stroke="#334155" />
                <text x="735" y="165" fill="#fde68a" fontSize="9" fontWeight="bold">• sort_buffer (2 MB)</text>
                <text x="735" y="190" fill="#fde68a" fontSize="9" fontWeight="bold">• join_buffer (2 MB)</text>
                <text x="735" y="215" fill="#fde68a" fontSize="9" fontWeight="bold">• read_buffer (128 KB)</text>
                <text x="735" y="245" fill="#a7f3d0" fontSize="9" fontWeight="bold">• Linux Kernel &amp; Page Cache</text>
                <text x="735" y="275" fill="#34d399" fontSize="9" fontWeight="bold">🛡️ Zero OOM Crash Zone!</text>
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 3: Memory Tuning Workbench */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Interactive Memory Tuning Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Select a memory tuning phase to inspect sizing formulas, online dynamic resizing, and OOM prevention calculations.
            </p>
          </div>

          {/* Tab Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {Object.keys(memoryPhases).map((key) => {
              const ph = memoryPhases[key];
              const isSelected = selectedMemoryPhase === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedMemoryPhase(key)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 border flex items-center gap-2",
                    isSelected
                      ? "bg-cyan-600/30 text-cyan-300 border-cyan-500 shadow-lg shadow-cyan-950/50"
                      : "bg-slate-900/80 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200"
                  )}
                &gt;
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
                {memoryPhases[selectedMemoryPhase].title}
              </h3>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-bold self-start sm:self-auto",
                  memoryPhases[selectedMemoryPhase].badgeColor === "emerald" &&
                    "bg-emerald-950 text-emerald-300 border border-emerald-800",
                  memoryPhases[selectedMemoryPhase].badgeColor === "cyan" &&
                    "bg-cyan-950 text-cyan-300 border border-cyan-800",
                  memoryPhases[selectedMemoryPhase].badgeColor === "amber" &&
                    "bg-amber-950 text-amber-300 border border-amber-800",
                  memoryPhases[selectedMemoryPhase].badgeColor === "rose" &&
                    "bg-rose-950 text-rose-300 border border-rose-800"
                )}
              >
                {memoryPhases[selectedMemoryPhase].badge}
              </span>
            </div>

            {/* SQL Script Block */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Configuration &amp; Diagnostic Queries:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                {memoryPhases[selectedMemoryPhase].sqlSnippet}
              </pre>
            </div>

            {/* Metrics Table */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Memory Architecture Properties:
              </span>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                  <thead className="bg-slate-900/80 text-cyan-400 font-mono uppercase text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4">Tuning Property</th>
                      <th className="py-2.5 px-4">Configuration &amp; Value</th>
                      <th className="py-2.5 px-4">Operational Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-xs">
                    {memoryPhases[selectedMemoryPhase].metricsTable.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/50">
                        <td className="py-3 px-4 font-bold text-white font-sans">
                          {row.hostType || row.parameter || row.buffer || row.metric}
                        </td>
                        <td className="py-3 px-4 text-cyan-300">
                          {row.allocation || row.value}
                        </td>
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
                {memoryPhases[selectedMemoryPhase].explanation}
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
              Eliminating OOM killer crashes and cold-cache degradation in West Bengal systems.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case 1: Mamata & Susmita's OOM Prevention */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Eliminating Midnight OOM Killer Crashes in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  OOM Crash Eliminated
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, a 64 GB RAM server running MySQL was configured with `innodb_buffer_pool_size = 58 GB` (91%) and `sort_buffer_size = 64 MB`. During midnight batch reporting when 120 concurrent connections ran queries, the Linux OOM killer abruptly killed `mysqld`. Reducing the Buffer Pool to 44 GB (70%) and setting `sort_buffer_size = 4 MB` permanently eliminated all OOM crashes.
              </p>
            </div>

            {/* Case 2: Abhronila & Debangshu's Online Resize */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Dynamic Online Buffer Pool Expansion in Kolkata Hub
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Zero-Downtime Resize
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, during a massive flash registration surge, database disk I/O began rising as the working set exceeded the 16 GB Buffer Pool. Executing `SET GLOBAL innodb_buffer_pool_size = 68719476736;` expanded the Buffer Pool live to 64 GB across 16 instances in 45 seconds without dropping a single active customer transaction, raising the hit ratio to 99.6%.
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
              Avoid memory over-allocation and cold-cache degradation pitfalls.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Leaving Default 128MB on Production
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Leaving `innodb_buffer_pool_size = 128 MB` on a 64 GB server forces MySQL to read from disk on every query, reducing database throughput by 95%.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always configure Buffer Pool to 50%-75% of RAM on deployment.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Huge Per-Thread Buffers (sort_buffer_size = 500M)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Setting gigantic per-thread buffers multiplies across hundreds of concurrent connections, causing immediate RAM exhaustion and OS kernel panic.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Keep per-thread buffers conservative (2MB - 4MB).
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Partition into 8 or 16 Instances
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Set `innodb_buffer_pool_instances` (typically 8 or 16) on buffer pools &gt; 1 GB to reduce mutex lock contention across multi-core CPU threads.
              </p>
              <div className="text-xs text-slate-400">
                Dramatically improves concurrent thread scalability.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Enable Fast Buffer Pool Warmup
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Always keep `innodb_buffer_pool_dump_at_shutdown = ON` and `innodb_buffer_pool_load_at_startup = ON` enabled in `my.cnf`.
              </p>
              <div className="text-xs text-slate-400">
                Preloads hot pages into memory on boot for immediate 99%+ hit ratio.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Memory Tuning Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. DBA Memory Tuning Checklist
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key memory parameters to verify across production database servers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Memory Audit Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-emerald-400">Buffer Pool Sizing</strong> = 50% to 75% of server RAM allocated to Buffer Pool.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-400">Instances Configured</strong> = Set `innodb_buffer_pool_instances = 8` or `16`.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold font-mono">03.</span>
                  <span><strong className="text-amber-400">Hit Ratio Monitored</strong> = Maintain Buffer Pool hit ratio above 99.0%.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold font-mono">04.</span>
                  <span><strong className="text-rose-400">Warmup Active</strong> = Confirm `dump_at_shutdown` &amp; `load_at_startup` are ON.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe Online Buffer Pool Resizing...”</span>
                  In MySQL 8.0, you can dynamically resize the Buffer Pool on the fly with `SET GLOBAL innodb_buffer_pool_size`. You never need to schedule midnight downtime just to add RAM!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about Total Max Memory...”</span>
                  Always calculate `Global + (max_connections * Per-Thread)`. Knowing your theoretical maximum RAM usage guarantees you will never suffer an unexpected OOM crash during marketing promotions!
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
              Comprehensive reference questions covering Buffer Pool Sizing and Memory Parameter Tuning.
            </p>
          </div>

          <FAQTemplate
            title="InnoDB Buffer Pool Sizing & Memory Tuning FAQs"
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
            title="Configuring Buffer Pool Size (innodb_buffer_pool_size) and Tuning Memory Parameters"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic11_note.txt"
          />

          <Teacher
            note="Congratulations on completing Module 004_001: MySQL Architecture & Storage Engines Deep Dive! Across these 12 comprehensive topics, you have mastered the internal mechanics that make MySQL the world's most popular open-source database. You understand the 3-tier server layer, pluggable storage engines, the dual in-memory and on-disk InnoDB architecture, the Midpoint LRU Buffer Pool, Write-Ahead Redo Logging, MVCC undo version chains, the Doublewrite buffer, 16KB physical B+ tree page anatomy, tablespace defragmentation, table maintenance commands, and expert memory tuning. You now possess the foundational knowledge of a world-class Database Administrator!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic11;
