import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

/**
 * Topic2 – InnoDB Architecture Overview: In-Memory Structures vs On-Disk Structures
 * Module: 004_001_storage-engines-and-architecture
 *
 * @component
 * @returns {JSX.Element} Interactive architectural workbench exploring InnoDB's dual universe: analyzing In-Memory RAM structures (Buffer Pool, Change Buffer, AHI, Log Buffer) and On-Disk structures (.ibd tablespaces, Redo/Undo logs, Doublewrite buffer), asynchronous fuzzy checkpointing, and crash recovery mechanics.
 */
const Topic2 = () => {
  // Interactive Focus Area State
  const [selectedFocusArea, setSelectedFocusArea] = useState("focus1_in_memory");

  const architectureFocusAreas = {
    focus1_in_memory: {
      areaNumber: "Focus 1: In-Memory Structures",
      title: "1. In-Memory Domain: Buffer Pool, Change Buffer, AHI & Log Buffer",
      badge: "RAM Cache Domain",
      badgeColor: "emerald",
      sqlSnippet: `-- 🧠 IN-MEMORY METRICS & STATUS INSPECTION:
-- 1. Check Buffer Pool Allocation & Hit Ratio:
SHOW GLOBAL STATUS LIKE 'Innodb_buffer_pool_%';

-- 2. Inspect Adaptive Hash Index (AHI) Searches:
SHOW GLOBAL STATUS LIKE 'Innodb_adaptive_hash_%';

-- 3. Check Log Buffer Size:
SHOW VARIABLES LIKE 'innodb_log_buffer_size'; -- Default: 16MB or 64MB

-- 4. Calculate Buffer Pool Hit Ratio (Target: > 99.0%):
-- Hit Ratio = 100 * (1 - (Innodb_buffer_pool_reads / Innodb_buffer_pool_read_requests))`,
      componentsTable: [
        { component: "Buffer Pool (16KB Pages)", duty: "Caches table data and index pages using Midpoint LRU list", metric: "50-75% Server RAM" },
        { component: "Change Buffer", duty: "Buffers non-unique secondary index writes to eliminate random I/O", metric: "Merged on read" },
        { component: "Adaptive Hash Index (AHI)", duty: "Dynamically creates in-memory hash index on hot B+ tree pages", metric: "O(1) Exact Lookups" },
        { component: "Log Buffer", duty: "In-memory staging area for redo log records before disk flushing", metric: "innodb_log_buffer_size" }
      ],
      explanation:
        "The In-Memory domain processes queries at nanosecond RAM speeds. Reads are served directly from the Buffer Pool, hot pages are accelerated by the Adaptive Hash Index, and writes are staged in the Log Buffer."
    },
    focus2_on_disk: {
      areaNumber: "Focus 2: On-Disk Structures",
      title: "2. On-Disk Domain: Tablespaces, Redo/Undo Logs & Doublewrite",
      badge: "Disk Persistence",
      badgeColor: "cyan",
      sqlSnippet: `-- 💾 ON-DISK TABLESPACES & LOG CONFIGURATION:
-- 1. Verify File-Per-Table setting (each table gets its own .ibd file):
SHOW VARIABLES LIKE 'innodb_file_per_table'; -- Default: ON

-- 2. Inspect Undo Tablespaces (online truncation enabled):
SHOW VARIABLES LIKE 'innodb_undo_%';

-- 3. Inspect Redo Log Capacity (MySQL 8.0.30+ dynamic sizing):
SHOW VARIABLES LIKE 'innodb_redo_log_capacity'; -- e.g. 100MB to 32GB

-- 4. Verify Doublewrite Buffer Status:
SHOW VARIABLES LIKE 'innodb_doublewrite';       -- Default: ON`,
      componentsTable: [
        { component: "File-Per-Table (.ibd)", duty: "Dedicated tablespaces storing clustered B+ tree pages per table", metric: "16KB Page Slices" },
        { component: "Redo Log (WAL)", duty: "Sequential circular log files (#ib_redo*) for crash recovery", metric: "Write-Ahead Log" },
        { component: "Undo Tablespaces", duty: "Stores historical row versions for rollback and MVCC reads", metric: "Dynamic Truncation" },
        { component: "Doublewrite Buffer", duty: "Contiguous disk buffer preventing half-written torn pages", metric: "Crash Resilience" }
      ],
      explanation:
        "The On-Disk domain guarantees ACID Durability. Dedicated `.ibd` tablespaces store table data, Undo tablespaces provide MVCC snapshots, and sequential Redo Logs ensure crash recovery."
    },
    focus3_flushing_checkpoints: {
      areaNumber: "Focus 3: Flushing & Checkpoints",
      title: "3. Memory-to-Disk Flow: Page Cleaners & Fuzzy Checkpointing",
      badge: "Flush & LSN",
      badgeColor: "amber",
      sqlSnippet: `-- 🔄 FLUSHING & CHECKPOINT METRICS:
-- Inspect Log Sequence Number (LSN) and checkpoint lag:
SHOW ENGINE INNODB STATUS\\G

-- Key Sections to observe in Output:
-- LOG:
--   Log sequence number          34567890123
--   Log flushed up to            34567890100
--   Pages flushed up to          34567885000
--   Last checkpoint at           34567880000
--
-- Checkpoint Age = Log Sequence Number - Last Checkpoint at
-- If Checkpoint Age approaches Redo Log Capacity → Aggressive Flushing triggers!`,
      componentsTable: [
        { component: "Log Sequence Number (LSN)", duty: "Monotonically increasing 64-bit byte counter tracking all changes", metric: "Global LSN Clock" },
        { component: "Page Cleaner Threads", duty: "Asynchronously flushes dirty pages from Buffer Pool to tablespaces", metric: "innodb_page_cleaners" },
        { component: "Fuzzy Checkpointing", duty: "Continuously writes checkpoints without halting active transactions", metric: "Smooth Throughput" }
      ],
      explanation:
        "Asynchronous flushing allows client threads to commit transactions without waiting for slow disk writes. Background Page Cleaner threads flush dirty pages to disk while advancing the Log Sequence Number (LSN) checkpoint."
    },
    focus4_crash_recovery: {
      areaNumber: "Focus 4: Crash Recovery Loop",
      title: "4. High-Availability & Automatic Crash Recovery Loop",
      badge: "Crash Recovery",
      badgeColor: "rose",
      sqlSnippet: `-- 🛡️ INNODB CRASH RECOVERY AUTOMATION:
-- If server power cuts abruptly, MySQL restarts and executes:
-- 1. Doublewrite Verification → Restores torn pages from doublewrite buffer.
-- 2. Redo Log Roll-Forward   → Replays committed LSN changes into Buffer Pool.
-- 3. Undo Log Roll-Back      → Reverts uncommitted in-flight active transactions.
-- 
-- Result: 100% ACID consistency achieved automatically with 0 data corruption!`,
      componentsTable: [
        { component: "Torn Page Restoration", duty: "Replaces partially written 16KB pages from the Doublewrite Buffer", metric: "Zero Corrupt Pages" },
        { component: "Redo Roll-Forward", duty: "Replays committed WAL entries up to the crash point into RAM", metric: "Durability Guarantee" },
        { component: "Undo Roll-Back", duty: "Undoes changes from active uncommitted transactions at crash time", metric: "Atomicity Guarantee" }
      ],
      explanation:
        "During startup after a crash, InnoDB restores torn pages from the Doublewrite buffer, replays committed transactions from the Redo Log, and rolls back uncommitted in-flight transactions using the Undo Log."
    }
  };

  const navItems = [
    { id: "overview-section", label: "1. Dual Architecture Overview" },
    { id: "visual-blueprint", label: "2. Visual Architecture Diagram" },
    { id: "interactive-workbench", label: "3. Dual Architecture Workbench" },
    { id: "case-studies", label: "4. Real-World Case Studies" },
    { id: "pitfalls-rules", label: "5. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "6. Architecture Tuning Checklist" },
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
            <span>Topic 2 of 12</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              InnoDB Internals
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            InnoDB Architecture Overview: In-Memory Structures vs On-Disk Structures
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Explore the internal anatomy of MySQL's default storage engine: discover how In-Memory structures (Buffer Pool, Change Buffer, AHI, Log Buffer) interact with On-Disk structures (.ibd tablespaces, Redo/Undo logs, Doublewrite buffer) through asynchronous fuzzy checkpointing.
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
        {/* SECTION 1: Dual Architecture Overview */}
        <section id="overview-section" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The In-Memory vs On-Disk Dual Architecture
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              InnoDB achieves high transactional throughput by caching pages in RAM and persisting changes asynchronously to disk.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                Domain 1: In-Memory Structures (RAM)
              </span>
              <h3 className="font-bold text-white text-base">High-Speed Transaction Processing</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                <li><strong className="text-emerald-400">Buffer Pool:</strong> Caches 16KB data/index pages in RAM with midpoint LRU eviction.</li>
                <li><strong className="text-cyan-400">Change Buffer:</strong> Buffers secondary index writes to reduce random disk I/O.</li>
                <li><strong className="text-amber-400">Adaptive Hash Index (AHI):</strong> Dynamic in-memory hash index for hot B+ tree pages.</li>
                <li><strong className="text-rose-400">Log Buffer:</strong> In-memory staging buffer for Write-Ahead Redo Log records.</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                Domain 2: On-Disk Structures (SSD / HDD)
              </span>
              <h3 className="font-bold text-white text-base">Crash-Safe Persistence &amp; Durability</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                <li><strong className="text-emerald-400">File-Per-Table (.ibd):</strong> Stores clustered B+ tree data pages for individual tables.</li>
                <li><strong className="text-cyan-400">Redo Log (WAL):</strong> Circular sequential log files for instant crash recovery.</li>
                <li><strong className="text-amber-400">Undo Tablespaces:</strong> Stores historical row versions for MVCC snapshot reads.</li>
                <li><strong className="text-rose-400">Doublewrite Buffer:</strong> Protects against partial torn pages during disk writes.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: Visual Architecture Diagram */}
        <section id="visual-blueprint" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Visual Architecture: InnoDB In-Memory &amp; On-Disk Blueprint
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Detailed blueprint of data flow between the Buffer Pool, background threads, and on-disk tablespaces.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-cyan-300">
                Figure 2.1: Complete InnoDB Dual Architecture Blueprint
              </h3>
              <span className="text-xs text-slate-400 font-mono">Internal Engine Architecture</span>
            </div>

            <div className="w-full overflow-x-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
              <svg
                viewBox="0 0 950 360"
                className="w-full max-w-4xl mx-auto block font-sans"
                style={{ minWidth: "700px" }}
              >
                <defs>
                  <marker id="arrInnoCyan" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <polygon points="0 0, 8 4, 0 8" fill="#38bdf8" />
                  </marker>
                </defs>

                {/* Left: In-Memory Structure Box */}
                <rect x="20" y="40" width="430" height="280" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                <text x="235" y="70" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">INNODB IN-MEMORY STRUCTURES (RAM)</text>
                <line x1="20" y1="85" x2="450" y2="85" stroke="#334155" />

                <rect x="40" y="105" width="220" height="95" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="50" y="125" fill="#a7f3d0" fontSize="11" fontWeight="bold">Buffer Pool (16KB Pages)</text>
                <text x="50" y="145" fill="#94a3b8" fontSize="9">Data &amp; Index Pages (Midpoint LRU)</text>
                <text x="50" y="162" fill="#fbbf24" fontSize="9">Dirty Pages (Modified in RAM)</text>
                <text x="50" y="180" fill="#38bdf8" fontSize="9">Free Pages List</text>

                <rect x="275" y="105" width="160" height="42" rx="4" fill="#1e293b" stroke="#334155" />
                <text x="285" y="125" fill="#bae6fd" fontSize="10" fontWeight="bold">Adaptive Hash Index</text>
                <text x="285" y="138" fill="#94a3b8" fontSize="8">Hot B+ Tree Page Hash</text>

                <rect x="275" y="158" width="160" height="42" rx="4" fill="#1e293b" stroke="#334155" />
                <text x="285" y="178" fill="#bae6fd" fontSize="10" fontWeight="bold">Change Buffer</text>
                <text x="285" y="191" fill="#94a3b8" fontSize="8">Secondary Index Buffering</text>

                <rect x="40" y="215" width="395" height="50" rx="4" fill="#1e293b" stroke="#d97706" />
                <text x="50" y="235" fill="#fde68a" fontSize="11" fontWeight="bold">Log Buffer (Redo Log Cache in RAM)</text>
                <text x="50" y="252" fill="#94a3b8" fontSize="9">Stages WAL redo records before flushing (innodb_log_buffer_size)</text>

                {/* Right: On-Disk Structure Box */}
                <rect x="500" y="40" width="430" height="280" rx="8" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="715" y="70" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">INNODB ON-DISK STRUCTURES (SSD / HDD)</text>
                <line x1="500" y1="85" x2="930" y2="85" stroke="#334155" />

                <rect x="520" y="105" width="190" height="45" rx="4" fill="#1e293b" stroke="#0284c7" />
                <text x="530" y="125" fill="#bae6fd" fontSize="10" fontWeight="bold">File-Per-Table (.ibd)</text>
                <text x="530" y="140" fill="#94a3b8" fontSize="9">Clustered B+ tree data pages</text>

                <rect x="725" y="105" width="190" height="45" rx="4" fill="#1e293b" stroke="#334155" />
                <text x="735" y="125" fill="#e2e8f0" fontSize="10" fontWeight="bold">System Tablespace</text>
                <text x="735" y="140" fill="#94a3b8" fontSize="9">ibdata1 data dictionary</text>

                <rect x="520" y="165" width="190" height="45" rx="4" fill="#1e293b" stroke="#334155" />
                <text x="530" y="185" fill="#e2e8f0" fontSize="10" fontWeight="bold">Undo Tablespaces</text>
                <text x="530" y="200" fill="#94a3b8" fontSize="9">undo_001, undo_002 (MVCC)</text>

                <rect x="725" y="165" width="190" height="45" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="735" y="185" fill="#a7f3d0" fontSize="10" fontWeight="bold">Doublewrite Buffer</text>
                <text x="735" y="200" fill="#94a3b8" fontSize="9">Prevents torn page corruption</text>

                <rect x="520" y="225" width="395" height="45" rx="4" fill="#1e293b" stroke="#be123c" />
                <text x="530" y="245" fill="#fca5a5" fontSize="10" fontWeight="bold">Redo Log (WAL - Write-Ahead Logging)</text>
                <text x="530" y="260" fill="#94a3b8" fontSize="9">#ib_redo* circular log files for crash recovery and LSN checkpoints</text>

                {/* Connecting Arrows */}
                <path d="M 450 150 L 500 150" fill="none" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrInnoCyan)" />
                <path d="M 435 240 L 520 240" fill="none" stroke="#fbbf24" strokeWidth="2.5" markerEnd="url(#arrInnoCyan)" />
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 3: Dual Architecture Workbench */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Interactive Dual Architecture Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Select a focus area to inspect administrative scripts, component execution duties, and internal LSN metrics.
            </p>
          </div>

          {/* Tab Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {Object.keys(architectureFocusAreas).map((key) => {
              const area = architectureFocusAreas[key];
              const isSelected = selectedFocusArea === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedFocusArea(key)}
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
                      area.badgeColor === "emerald" && "bg-emerald-400",
                      area.badgeColor === "cyan" && "bg-cyan-400",
                      area.badgeColor === "amber" && "bg-amber-400",
                      area.badgeColor === "rose" && "bg-rose-400"
                    )}
                  />
                  <span>{area.areaNumber}</span>
                </button>
              );
            })}
          </div>

          {/* Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {architectureFocusAreas[selectedFocusArea].title}
              </h3>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-bold self-start sm:self-auto",
                  architectureFocusAreas[selectedFocusArea].badgeColor === "emerald" &&
                    "bg-emerald-950 text-emerald-300 border border-emerald-800",
                  architectureFocusAreas[selectedFocusArea].badgeColor === "cyan" &&
                    "bg-cyan-950 text-cyan-300 border border-cyan-800",
                  architectureFocusAreas[selectedFocusArea].badgeColor === "amber" &&
                    "bg-amber-950 text-amber-300 border border-amber-800",
                  architectureFocusAreas[selectedFocusArea].badgeColor === "rose" &&
                    "bg-rose-950 text-rose-300 border border-rose-800"
                )}
              >
                {architectureFocusAreas[selectedFocusArea].badge}
              </span>
            </div>

            {/* SQL Script Block */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Administrative Diagnostic Commands:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                {architectureFocusAreas[selectedFocusArea].sqlSnippet}
              </pre>
            </div>

            {/* Components Table */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Internal Component Architecture &amp; Metrics:
              </span>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                  <thead className="bg-slate-900/80 text-cyan-400 font-mono uppercase text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4">Component Structure</th>
                      <th className="py-2.5 px-4">Execution Responsibility</th>
                      <th className="py-2.5 px-4">Tuning / Target Metric</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-xs">
                    {architectureFocusAreas[selectedFocusArea].componentsTable.map((row, idx) => (
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
                Engineering Insight:
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {architectureFocusAreas[selectedFocusArea].explanation}
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
              Production performance diagnosis across West Bengal database clusters.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case 1: Mamata & Susmita's Buffer Pool Tuning */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Boosting Hit Ratio from 82% to 99.4% in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Buffer Pool Expanded
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, a database server with 64 GB RAM was running with default `innodb_buffer_pool_size = 128MB`, causing massive disk I/O thrashing and an 82% hit ratio. Increasing the buffer pool to 48 GB enabled the entire working dataset to reside in RAM, achieving a 99.4% hit ratio and dropping query latency from 180ms to 2.4ms.
              </p>
            </div>

            {/* Case 2: Abhronila & Debangshu's Power Cut Crash Recovery */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – 100% Crash Recovery After Unplanned Power Outage in Kolkata
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Zero Corrupt Tables
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                During a sudden power outage in the Kolkata data center while 400 financial ledger transactions were executing, InnoDB automatically replayed the Redo Log roll-forward and reverted in-flight uncommitted transactions on startup, achieving full recovery in 8 seconds with zero data corruption.
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
              Avoid dangerous InnoDB memory and disk configuration mistakes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Leaving Buffer Pool at 128MB Default
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                The default 128MB Buffer Pool size is intended for small laptops; running it on production servers starves MySQL of RAM and creates heavy disk I/O bottlenecks.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Allocate 50% to 75% of server RAM to `innodb_buffer_pool_size`.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Disabling the Doublewrite Buffer
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Disabling `innodb_doublewrite` to squeeze minor write speed increases risks permanent database corruption from torn 16KB pages during power loss.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Keep innodb_doublewrite = ON on all standard filesystems.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Monitor Buffer Pool Hit Ratio
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Calculate the hit ratio regularly (`1 - reads / read_requests`). A healthy enterprise OLTP server maintains a hit ratio greater than 99.0%.
              </p>
              <div className="text-xs text-slate-400">
                Indicates that virtually all queries are satisfied directly from memory.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Enable File-Per-Table
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Ensure `innodb_file_per_table = ON` so each table gets its own `.ibd` file, allowing disk space reclamation upon table drop or truncate.
              </p>
              <div className="text-xs text-slate-400">
                Prevents monolithic shared ibdata1 tablespace bloat.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Architecture Tuning Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. DBA Architecture Tuning Checklist
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key health indicators to verify on every production MySQL instance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> InnoDB Tuning Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-emerald-400">Buffer Pool Size</strong> = Set `innodb_buffer_pool_size` to 50-75% of server RAM.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-400">Redo Log Capacity</strong> = Tune `innodb_redo_log_capacity` for 1-2 hours of write traffic.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold font-mono">03.</span>
                  <span><strong className="text-amber-400">Hit Ratio Monitored</strong> = Maintain Buffer Pool hit ratio above 99.0%.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold font-mono">04.</span>
                  <span><strong className="text-rose-400">Doublewrite Active</strong> = Confirm `innodb_doublewrite = ON` for crash safety.</span>
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
                  InnoDB places newly read pages at the 5/8ths midpoint mark in the LRU list. If a batch reporting query scans a 100 GB table, it won't evict the hot transactional pages at the top of the young sublist!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about LSN Checkpointing...”</span>
                  The difference between the current Log Sequence Number and the Last Checkpoint LSN is called the 'Checkpoint Age'. If this gap grows too large, InnoDB will throttle client writes to catch up on disk page flushing!
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
              Comprehensive reference questions covering InnoDB In-Memory and On-Disk architecture internals.
            </p>
          </div>

          <FAQTemplate
            title="InnoDB In-Memory vs On-Disk Architecture FAQs"
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
            title="InnoDB Architecture Overview: In-Memory Structures vs On-Disk Structures"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic2_note.txt"
          />

          <Teacher
            note="Understanding InnoDB's dual architecture is the turning point that separates SQL writers from true database engineers. When an application executes an UPDATE, InnoDB doesn't immediately write to random disk sectors—that would grind the server to a halt. Instead, it modifies the 16KB page in the Buffer Pool, records a compact sequential log entry in the Redo Log, and lets background Page Cleaners flush the dirty page asynchronously via fuzzy checkpoints. When you grasp this synergy between RAM speed and crash-safe disk durability, database tuning becomes an exact science!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic2;
