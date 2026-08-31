import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";

/**
 * Topic9 – Tablespace Management: File-per-table (innodb_file_per_table), Shrinking and Defragmenting Tablespaces
 * Module: 004_001_storage-engines-and-architecture
 *
 * @component
 * @returns {JSX.Element} Interactive tablespace management workbench: exploring why DELETE fails to shrink .ibd files on disk, monitoring data_free fragmentation, executing online table rebuilds with OPTIMIZE TABLE and ALGORITHM=INPLACE, and zero-downtime Transportable Tablespace migrations.
 */
const Topic9 = () => {
  // Interactive Defragmentation State
  const [selectedDefragPhase, setSelectedDefragPhase] = useState("phase1_high_water_mark");

  const defragPhases = {
    phase1_high_water_mark: {
      phaseNumber: "Phase 1: High-Water Mark",
      title: "1. Tablespace Bloat & The High-Water Mark Trap",
      badge: "High-Water Mark",
      badgeColor: "rose",
      sqlSnippet: `-- ⚠️ WHY DELETE DOES NOT SHRINK .IBD FILES:
-- 1. Insert 10 million rows → .ibd file expands to 50 GB.
-- 2. Execute massive delete:
DELETE FROM customer_orders WHERE order_date < '2025-01-01';

-- 3. Check physical file size on Linux/Windows filesystem:
--    customer_orders.ibd STAYS 50 GB! (High-Water Mark remains fixed!)

-- 4. Check internal unused space via SQL:
SELECT 
    table_name,
    ROUND((data_length + index_length) / 1024 / 1024, 2) AS used_mb,
    ROUND(data_free / 1024 / 1024, 2) AS free_mb,
    ROUND(100 * (data_free / (data_length + index_length + data_free)), 2) AS frag_pct
FROM information_schema.tables
WHERE table_schema = 'college_admissions'
ORDER BY free_mb DESC;`,
      metricsTable: [
        { metric: "Physical File Size", value: "Fixed at High-Water Mark", role: "Does not shrink on row deletion" },
        { metric: "Internal Space (data_free)", value: "Available for inserts", role: "Reused by future INSERT statements" },
        { metric: "Fragmentation %", value: "data_free / total_space", role: "Indicates candidate tables for OPTIMIZE TABLE" },
        { metric: "Remediation", value: "Online Table Rebuild", role: "Creates new compact .ibd file and unlinks old bloated file" }
      ],
      explanation:
        "When rows are deleted, InnoDB marks their space free on internal page lists for future reuse. The physical file size remains at its historical High-Water Mark. Reclaiming this disk space back to the operating system requires an online table rebuild."
    },
    phase2_online_rebuild: {
      phaseNumber: "Phase 2: Online Rebuild",
      title: "2. Online Table Rebuild (OPTIMIZE TABLE & ALGORITHM=INPLACE)",
      badge: "Online DDL Rebuild",
      badgeColor: "emerald",
      sqlSnippet: `-- ⚡ ONLINE TABLE REBUILD & DISK RECLAMATION:
-- Method A: Standard OPTIMIZE TABLE command:
OPTIMIZE TABLE customer_orders;

-- Method B: Equivalent Declarative Online DDL:
ALTER TABLE customer_orders 
ENGINE = InnoDB, 
ALGORITHM = INPLACE, 
LOCK = NONE;

-- UNDER THE HOOD:
-- 1. Creates a temporary .ibd file in the schema directory.
-- 2. Reads active rows and builds a clean, 93% compact B+ tree.
-- 3. Applies concurrent write modifications from the Online Alter Log.
-- 4. Atomically replaces old 50 GB file with new 20 GB file.
-- 5. 30 GB of storage is immediately freed to the OS! ✅`,
      metricsTable: [
        { metric: "ALGORITHM", value: "INPLACE (Zero Downtime)", role: "Executes rebuild inside InnoDB storage engine" },
        { metric: "LOCK Mode", value: "NONE (Full Concurrent DML)", role: "Allows uninterrupted live INSERT/UPDATE/DELETE traffic" },
        { metric: "Disk Requirement", value: "Equal to active table size", role: "Requires temporary free space for the new .ibd copy" },
        { metric: "Index Density", value: "~93% Compact Fill Factor", role: "Rebuilds all secondary indexes in sorted key order" }
      ],
      explanation:
        "`OPTIMIZE TABLE` builds a brand new `.ibd` file containing only active rows packed into 93% full pages. It atomically swaps the new file for the old bloated file and unlinks the old file, returning gigabytes of disk space to the OS."
    },
    phase3_online_alter_log: {
      phaseNumber: "Phase 3: Online Alter Log",
      title: "3. Online Alter Log: Staging Concurrent Live Writes",
      badge: "Write Staging",
      badgeColor: "cyan",
      sqlSnippet: `-- 📝 ONLINE ALTER LOG SIZING & MONITORING:
-- Sizing the in-memory/on-disk buffer for live modifications:
SHOW VARIABLES LIKE 'innodb_online_alter_log_max_size';
-- Default: 134217728 bytes (128 MB)

-- Increase buffer for high-write tables before rebuilding:
SET GLOBAL innodb_online_alter_log_max_size = 1073741824; -- 1 GB!

-- Monitor real-time rebuild progress in MySQL 8.0:
SELECT 
    event_name,
    work_completed,
    work_estimated,
    ROUND(work_completed / work_estimated * 100, 2) AS pct_done
FROM performance_schema.events_stages_current
WHERE event_name LIKE '%alter%';`,
      metricsTable: [
        { metric: "Log Buffer Size", value: "innodb_online_alter_log_max_size", role: "Buffers concurrent inserts during rebuild" },
        { metric: "Failure Mode", value: "Error 1799 if buffer overflows", role: "Increase size on write-heavy production tables" },
        { metric: "Final Merge Phase", value: "Microsecond Metadata Lock", role: "Brief lock to swap tablespace file pointers" },
        { metric: "Progress Stage", value: "events_stages_current", role: "Tracks percentage completion of rebuild" }
      ],
      explanation:
        "During an online rebuild, concurrent application writes are recorded in the `innodb_online_alter_log`. Increasing this variable prevents Error 1799 on write-heavy tables while ensuring live queries experience zero lock contention."
    },
    phase4_transportable_ts: {
      phaseNumber: "Phase 4: Transportable Tablespace",
      title: "4. Transportable Tablespaces: Zero-Downtime Migration & Defrag",
      badge: "File Migration",
      badgeColor: "amber",
      sqlSnippet: `-- 🚀 TRANSPORTABLE TABLESPACE 4-STEP MIGRATION:
-- Step 1 (Source Server): Flush table and generate metadata file:
FLUSH TABLES customer_orders FOR EXPORT;
-- Generates: customer_orders.cfg in schema folder!

-- Step 2 (OS Filesystem): Copy customer_orders.ibd and .cfg to destination host:
-- scp customer_orders.ibd customer_orders.cfg dest_server:/var/lib/mysql/orders/

-- Step 3 (Source Server): Release export lock:
UNLOCK TABLES;

-- Step 4 (Destination Server): Discard existing empty tablespace and import raw file:
ALTER TABLE customer_orders DISCARD TABLESPACE;
-- Copy files into destination directory...
ALTER TABLE customer_orders IMPORT TABLESPACE;
-- Result: 500 GB table migrated in 4 minutes at raw disk speeds! ✅`,
      metricsTable: [
        { metric: "FLUSH FOR EXPORT", value: "Generates .cfg metadata", role: "Synchronizes schema definition and page IDs" },
        { metric: "DISCARD TABLESPACE", value: "Unlinks empty .ibd", role: "Prepares table entity for incoming data file" },
        { metric: "IMPORT TABLESPACE", value: "Attaches raw .ibd file", role: "Validates page checksums and activates table" },
        { metric: "Speed Advantage", value: "Raw OS Copy Speed", role: "100x faster than logical mysqldump reload" }
      ],
      explanation:
        "Transportable Tablespaces bypass SQL parsing entirely by copying raw `.ibd` files directly between servers or disk mounts. Executing `DISCARD` and `IMPORT TABLESPACE` enables instant multi-hundred gigabyte table relocations."
    }
  };

  const navItems = [
    { id: "bloat-overview", label: "1. High-Water Mark" },
    { id: "rebuild-diagram", label: "2. Online Rebuild Diagram" },
    { id: "interactive-workbench", label: "3. Tablespace Defrag Workbench" },
    { id: "case-studies", label: "4. Real-World Case Studies" },
    { id: "pitfalls-rules", label: "5. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "6. Defragmentation Checklist" },
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
            <span>Topic 9 of 12</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Tablespace Defragmentation
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Tablespace Management: File-per-table (innodb_file_per_table), Shrinking and Defragmenting Tablespaces
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Reclaim wasted disk space and eliminate B+ tree fragmentation: discover why <code className="text-rose-400 font-mono">DELETE</code> never shrinks <code className="text-cyan-400 font-mono">.ibd</code> files, master online table rebuilding with <code className="text-emerald-400 font-mono">OPTIMIZE TABLE</code>, and execute zero-downtime Transportable Tablespace migrations.
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
        {/* SECTION 1: High-Water Mark Overview */}
        <section id="bloat-overview" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Tablespace Bloat &amp; The High-Water Mark
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why deleting rows leaves disk file sizes fixed and how online rebuilds reclaim physical storage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase tracking-wider">
                The Dilemma
              </span>
              <h3 className="font-bold text-white text-base">The High-Water Mark</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                `DELETE` only marks page slots as free internally. The `.ibd` file on disk remains at its historical peak allocation size.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                The Diagnosis
              </span>
              <h3 className="font-bold text-white text-base">data_free in Catalog</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                `information_schema.tables` reports unused reclaimable bytes in `data_free`. High values indicate fragmented tablespaces.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                The Solution
              </span>
              <h3 className="font-bold text-white text-base">OPTIMIZE TABLE</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Rebuilds the table online into a new, compact `.ibd` file and unlinks the bloated file, returning disk space to the OS.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Online Rebuild Diagram */}
        <section id="rebuild-diagram" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Visual Anatomy: Online Table Rebuild &amp; File Swap
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How InnoDB packs active rows into clean pages while staging live concurrent writes in the Online Alter Log.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-cyan-300">
                Figure 9.1: Online Table Rebuild &amp; Disk Reclamation Pipeline
              </h3>
              <span className="text-xs text-slate-400 font-mono">Defragmentation Pipeline</span>
            </div>

            <div className="w-full overflow-x-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
              <svg
                viewBox="0 0 950 360"
                className="w-full max-w-4xl mx-auto block font-sans"
                style={{ minWidth: "700px" }}
              >
                <defs>
                  <marker id="arrDefragCyan" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <polygon points="0 0, 8 4, 0 8" fill="#38bdf8" />
                  </marker>
                </defs>

                {/* Left: Bloated Original .ibd File */}
                <rect x="20" y="40" width="270" height="280" rx="8" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" />
                <text x="155" y="70" fill="#fb7185" fontSize="12" fontWeight="bold" textAnchor="middle">
                  1. BLOATED ORIGINAL TABLE (.ibd)
                </text>
                <line x1="20" y1="85" x2="290" y2="85" stroke="#334155" />

                <rect x="35" y="105" width="240" height="50" rx="4" fill="#1e293b" stroke="#be123c" />
                <text x="45" y="127" fill="#fca5a5" fontSize="10" fontWeight="bold">Active Data Rows (20 GB)</text>
                <text x="45" y="142" fill="#94a3b8" fontSize="9">Active customer records in use</text>

                <rect x="35" y="165" width="240" height="60" rx="4" fill="#1e293b" stroke="#f43f5e" strokeDasharray="4 4" />
                <text x="45" y="187" fill="#f87171" fontSize="10" fontWeight="bold">Fragmented Dead Space (30 GB)</text>
                <text x="45" y="202" fill="#94a3b8" fontSize="9">data_free = 30GB (Deleted rows / holes)</text>
                <text x="45" y="217" fill="#fca5a5" fontSize="9">Total File Size on Disk = 50 GB ❌</text>

                {/* Middle: Online Alter Log Staging */}
                <rect x="330" y="40" width="290" height="280" rx="8" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="475" y="70" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
                  2. ONLINE REBUILD ENGINE
                </text>
                <line x1="330" y1="85" x2="620" y2="85" stroke="#334155" />

                <rect x="345" y="105" width="260" height="70" rx="4" fill="#1e293b" stroke="#0284c7" />
                <text x="355" y="127" fill="#bae6fd" fontSize="10" fontWeight="bold">Sorted Index Build</text>
                <text x="355" y="145" fill="#94a3b8" fontSize="9">Reads active rows and packs them into</text>
                <text x="355" y="162" fill="#a7f3d0" fontSize="9">clean ~93% full B+ tree pages</text>

                <rect x="345" y="190" width="260" height="70" rx="4" fill="#1e293b" stroke="#d97706" />
                <text x="355" y="212" fill="#fde68a" fontSize="10" fontWeight="bold">Online Alter Log (Concurrent DML)</text>
                <text x="355" y="230" fill="#94a3b8" fontSize="9">Stages live application INSERT/UPDATEs</text>
                <text x="355" y="247" fill="#bae6fd" fontSize="9">Zero lock contention on live users! ⚡</text>

                {/* Right: New Compact .ibd File */}
                <rect x="660" y="40" width="270" height="280" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                <text x="795" y="70" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">
                  3. COMPACT REBUILT TABLE (.ibd)
                </text>
                <line x1="660" y1="85" x2="930" y2="85" stroke="#334155" />

                <rect x="675" y="105" width="240" height="75" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="685" y="127" fill="#a7f3d0" fontSize="10" fontWeight="bold">New .ibd File Size = 20 GB ✅</text>
                <text x="685" y="145" fill="#94a3b8" fontSize="9">0% Dead Space / 0 Fragmentation</text>
                <text x="685" y="162" fill="#34d399" fontSize="9">All pages 93% compact</text>

                <rect x="675" y="195" width="240" height="65" rx="4" fill="#1e293b" stroke="#10b981" />
                <text x="685" y="217" fill="#34d399" fontSize="10" fontWeight="bold">🗑️ Old File Unlinked!</text>
                <text x="685" y="235" fill="#bae6fd" fontSize="9">30 GB returned to Linux/Windows OS!</text>

                {/* Connecting Arrows */}
                <path d="M 290 140 L 330 140" fill="none" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrDefragCyan)" />
                <path d="M 620 140 L 660 140" fill="none" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrDefragCyan)" />
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 3: Tablespace Defrag Workbench */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Interactive Tablespace Defrag Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Select a defragmentation phase to inspect diagnostic queries, online alter logs, and transportable tablespace scripts.
            </p>
          </div>

          {/* Tab Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {Object.keys(defragPhases).map((key) => {
              const ph = defragPhases[key];
              const isSelected = selectedDefragPhase === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedDefragPhase(key)}
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
                {defragPhases[selectedDefragPhase].title}
              </h3>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-bold self-start sm:self-auto",
                  defragPhases[selectedDefragPhase].badgeColor === "emerald" &&
                    "bg-emerald-950 text-emerald-300 border border-emerald-800",
                  defragPhases[selectedDefragPhase].badgeColor === "cyan" &&
                    "bg-cyan-950 text-cyan-300 border border-cyan-800",
                  defragPhases[selectedDefragPhase].badgeColor === "amber" &&
                    "bg-amber-950 text-amber-300 border border-amber-800",
                  defragPhases[selectedDefragPhase].badgeColor === "rose" &&
                    "bg-rose-950 text-rose-300 border border-rose-800"
                )}
              >
                {defragPhases[selectedDefragPhase].badge}
              </span>
            </div>

            {/* SQL Script Block */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Defragmentation &amp; Management Scripts:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                {defragPhases[selectedDefragPhase].sqlSnippet}
              </pre>
            </div>

            {/* Metrics Table */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Execution Characteristics &amp; Metrics:
              </span>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                  <thead className="bg-slate-900/80 text-cyan-400 font-mono uppercase text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4">Management Parameter</th>
                      <th className="py-2.5 px-4">Configuration &amp; Value</th>
                      <th className="py-2.5 px-4">Operational Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-xs">
                    {defragPhases[selectedDefragPhase].metricsTable.map((row, idx) => (
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
                {defragPhases[selectedDefragPhase].explanation}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Real-World Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Real-World Tablespace Defragmentation Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Reclaiming storage bloat and zero-downtime table migration in West Bengal enterprises.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case 1: Mamata & Susmita's Online Rebuild */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Reclaiming 80 GB of Storage with Zero Downtime in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  80 GB Freed Online
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, purging 15 million archived student audit records left `audit_logs.ibd` at 120 GB on disk with 80 GB of `data_free` dead space. Executing `ALTER TABLE audit_logs ENGINE=InnoDB, ALGORITHM=INPLACE, LOCK=NONE;` rebuilt the table in 14 minutes, shrinking the file to 40 GB and returning 80 GB to the operating system while live admission writes continued without interruption.
              </p>
            </div>

            {/* Case 2: Abhronila & Debangshu's Transportable Tablespace Migration */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Migrating 300 GB Table in 3 Minutes in Kolkata Hub
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  100x Speedup
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, moving a 300 GB financial transactions table across database servers previously took 8 hours using `mysqldump`. Using Transportable Tablespaces (`FLUSH FOR EXPORT`, raw 10Gbps SCP copy, and `IMPORT TABLESPACE`) completed the entire 300 GB migration in 3 minutes and 40 seconds at raw disk write speeds.
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
              Avoid dangerous tablespace defragmentation and capacity planning mistakes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Rebuilding on Disks with Insufficient Space
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Executing `OPTIMIZE TABLE` on a 200 GB table when the server only has 40 GB of free disk space will fill the disk to 100% and abort the operation.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Verify free disk space &gt;= active table size before rebuilding.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Running OPTIMIZE TABLE on Daily Cron
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Rebuilding tables daily causes excessive SSD write amplification and cache invalidation while normal inserts naturally reuse free internal page space.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Run OPTIMIZE TABLE only when data_free &gt; 20% and &gt; 5 GB.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Size innodb_online_alter_log_max_size
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Increase `innodb_online_alter_log_max_size` to 512MB or 1GB before rebuilding write-heavy tables to prevent Error 1799.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees smooth online write staging during rebuilds.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Use Transportable Tablespaces for Large Migrations
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Leverage `DISCARD` and `IMPORT TABLESPACE` to migrate multi-hundred gigabyte tables across drives or servers at raw storage speeds.
              </p>
              <div className="text-xs text-slate-400">
                Eliminates slow SQL dump and reload bottlenecks.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Defragmentation Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. DBA Defragmentation Checklist
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key steps to follow when planning tablespace maintenance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Defragmentation Runbook
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-emerald-400">Audit data_free</strong> = Query Information Schema to calculate fragmentation %.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-400">Check Free Disk</strong> = Confirm OS free disk space is greater than table size.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold font-mono">03.</span>
                  <span><strong className="text-amber-400">Online DDL</strong> = Execute `ALTER TABLE tbl ENGINE=InnoDB, ALGORITHM=INPLACE`.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold font-mono">04.</span>
                  <span><strong className="text-rose-400">Monitor Progress</strong> = Track completion in `events_stages_current`.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe data_free in Information Schema...”</span>
                  If `data_free` is 40GB on a 50GB table, running `OPTIMIZE TABLE` will shrink that file to 10GB, instantly reclaiming 40GB of NVMe SSD capacity!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about TRUNCATE vs DELETE...”</span>
                  If you need to wipe an entire table, never run `DELETE FROM table;`—always run `TRUNCATE TABLE;`. TRUNCATE unlinks the `.ibd` file immediately and frees all space in 1 millisecond!
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
              Comprehensive reference questions covering Tablespace Management, Shrinking, and Defragmentation.
            </p>
          </div>

          <FAQTemplate
            title="InnoDB Tablespace Management & Defragmentation FAQs"
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
            title="Tablespace Management: File-per-table (innodb_file_per_table), Shrinking and Defragmenting Tablespaces"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic9_note.txt"
          />

          <Teacher
            note="One of the most frequent surprises for junior database administrators is running a massive DELETE command and finding that the operating system disk space did not increase by a single megabyte! Understanding the High-Water Mark and data_free in InnoDB is essential. By executing online table rebuilds with OPTIMIZE TABLE or ALGORITHM=INPLACE, you can reclaim tens of gigabytes of disk space and restore your B+ tree pages to 93% compact density without disrupting live production traffic!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic9;
