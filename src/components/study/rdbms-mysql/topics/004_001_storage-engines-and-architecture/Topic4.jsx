import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

/**
 * Topic4 – InnoDB On-Disk Components: System Tablespace, File-Per-Table Tablespaces (.ibd), General Tablespaces, Undo Tablespaces, Temporary Tablespaces
 * Module: 004_001_storage-engines-and-architecture
 *
 * @component
 * @returns {JSX.Element} Interactive tablespace architecture workbench: comparing File-Per-Table .ibd storage, monolithic System ibdata1 behavior, General tablespace creation and NVMe SSD hardware tiering, Undo tablespace online truncation, and Temporary tablespace lifecycle.
 */
const Topic4 = () => {
  // Interactive Focus Area State
  const [selectedTablespace, setSelectedTablespace] = useState("ts_file_per_table");

  const tablespaceCategories = {
    ts_file_per_table: {
      tsNumber: "1. File-Per-Table (.ibd)",
      title: "1. File-Per-Table Tablespaces: Dedicated .ibd Storage & Reclamation",
      badge: "Default Standard",
      badgeColor: "emerald",
      sqlSnippet: `-- 📁 FILE-PER-TABLE CONFIGURATION & DISK RECLAMATION:
-- 1. Verify File-Per-Table is enabled:
SHOW VARIABLES LIKE 'innodb_file_per_table'; -- Default: ON

-- 2. Each table gets its own .ibd file in schema directory:
CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    gpa DECIMAL(3,2)
) ENGINE=InnoDB;
-- On Disk: /data_dir/college_admissions/students.ibd

-- 3. Immediate Disk Space Reclamation:
-- Executing DROP TABLE or TRUNCATE TABLE deletes/truncates students.ibd,
-- immediately freeing OS disk space!`,
      metricsTable: [
        { feature: "Storage Unit", value: "Dedicated <table_name>.ibd per table", role: "Isolates clustered B+ tree data on disk" },
        { feature: "Space Reclamation", value: "Immediate on DROP / TRUNCATE", role: "Returns disk space directly to operating system" },
        { feature: "Encryption & Compression", value: "Per-table TDE & ROW_FORMAT=COMPRESSED", role: "Allows table-level security and compression" },
        { feature: "Transportability", value: "DISCARD / IMPORT TABLESPACE", role: "Enables fast cross-server table migration" }
      ],
      explanation:
        "File-Per-Table is the enterprise standard for MySQL. Storing each table in its own `.ibd` file allows immediate disk space reclamation upon `DROP TABLE` or `TRUNCATE TABLE` and enables independent table compression and transportability."
    },
    ts_system_ibdata: {
      tsNumber: "2. System Tablespace (ibdata1)",
      title: "2. System Tablespace: Doublewrite Storage & Autoextend Mechanics",
      badge: "Shared System File",
      badgeColor: "rose",
      sqlSnippet: `-- 🏢 SYSTEM TABLESPACE CONFIGURATION & GROW-ONLY TRAP:
-- 1. Inspect System Data File Path:
SHOW VARIABLES LIKE 'innodb_data_file_path';
-- Output: ibdata1:12M:autoextend

-- 2. What it stores in MySQL 8.0:
-- - Doublewrite buffer storage blocks
-- - Change buffer
-- - Legacy rollback segments

-- ⚠️ THE GROW-ONLY TRAP:
-- If ibdata1 grows to 100 GB due to rogue data surges, it CANNOT be shrunk on disk!
-- The file stays 100 GB forever unless you dump, wipe, and reload the database!`,
      metricsTable: [
        { feature: "File Name", value: "ibdata1 (MySQL Data Directory)", role: "Houses core engine system metadata & buffers" },
        { feature: "Shrink Capability", value: "CANNOT SHRINK ON DISK ❌", role: "Allocated file size never decreases" },
        { feature: "Doublewrite Blocks", value: "Persistent storage blocks", role: "Protects against torn pages during disk writes" },
        { feature: "Recommendation", value: "Keep minimal (12MB - 100MB)", role: "Keep all user tables in File-Per-Table .ibd files" }
      ],
      explanation:
        "The System Tablespace (`ibdata1`) holds internal engine buffers. Crucially, `ibdata1` can never shrink on disk once it expands. Keeping `innodb_file_per_table = ON` prevents user data from permanently trapping storage inside `ibdata1`."
    },
    ts_general: {
      tsNumber: "3. General Tablespaces",
      title: "3. General Tablespaces: Multi-Table Grouping & NVMe Hardware Tiering",
      badge: "Custom Placement",
      badgeColor: "cyan",
      sqlSnippet: `-- ⚡ GENERAL TABLESPACES: CREATION & HARDWARE TIERING:
-- 1. Create a General Tablespace on fast NVMe SSD storage:
CREATE TABLESPACE fast_nvme_ts 
ADD DATAFILE '/mnt/nvme_ssd/fast_nvme_ts.ibd' 
ENGINE=InnoDB;

-- 2. Assign high-frequency transactional tables to the general tablespace:
CREATE TABLE checkout_payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    amount_inr DECIMAL(10,2) NOT NULL
) TABLESPACE fast_nvme_ts;

-- 3. Move an existing table into the tablespace:
ALTER TABLE customer_orders TABLESPACE fast_nvme_ts;

-- 4. Move table back to individual file-per-table:
ALTER TABLE customer_orders TABLESPACE = innodb_file_per_table;`,
      metricsTable: [
        { feature: "Multi-Table Consolidation", value: "Multiple tables in 1 shared .ibd file", role: "Reduces open file descriptor overhead" },
        { feature: "Hardware Placement", value: "Custom absolute directory paths", role: "Maps hot tables to fast NVMe SSD storage" },
        { feature: "Buffer Pool Locality", value: "Shared memory pages", role: "Improves cache locality for related entities" },
        { feature: "Drop Semantics", value: "Tablespace droppable when empty", role: "DROP TABLESPACE fast_nvme_ts;" }
      ],
      explanation:
        "General Tablespaces allow DBAs to group related tables into a shared `.ibd` file and specify absolute file paths, enabling hardware tiering (e.g. placing financial tables on ultra-fast NVMe drives and archive tables on HDDs)."
    },
    ts_undo_temp: {
      tsNumber: "4. Undo & Temp Tablespaces",
      title: "4. Undo & Temporary Tablespaces: MVCC Snapshots & Query Isolation",
      badge: "Undo & Temp Isolation",
      badgeColor: "amber",
      sqlSnippet: `-- 🔄 UNDO & TEMPORARY TABLESPACE MANAGEMENT:
-- 1. Inspect Undo Tablespaces & Online Truncation:
SHOW VARIABLES LIKE 'innodb_undo_%';
-- innodb_undo_tablespaces = 2 (undo_001, undo_002)
-- innodb_undo_log_truncate = ON (Auto-shrinks files back to 16MB)
-- innodb_max_undo_log_size = 1073741824 (1 GB threshold)

-- 2. Dynamic Undo Tablespace Management:
CREATE UNDO TABLESPACE undo_003 ADD DATAFILE 'undo_003.ibu';
ALTER UNDO TABLESPACE undo_003 SET INACTIVE;
DROP UNDO TABLESPACE undo_003;

-- 3. Temporary Tablespace (ibtmp1):
SHOW VARIABLES LIKE 'innodb_temp_data_file_path';
-- ibtmp1:12M:autoextend:max:20G (Capped to prevent disk fill!)`,
      metricsTable: [
        { feature: "Undo Purpose", value: "Stores MVCC row versions & rollback logs", role: "Enables non-blocking read snapshots" },
        { feature: "Online Truncation", value: "innodb_undo_log_truncate = ON", role: "Shrinks undo files automatically back to 16MB" },
        { feature: "Temp Purpose (ibtmp1)", value: "Stores query sort & group-by temp tables", role: "Recreated fresh on every MySQL reboot" },
        { feature: "Temp Max Cap", value: "max:20G configuration", role: "Prevents runaway queries from filling entire disk" }
      ],
      explanation:
        "Undo Tablespaces store historical row versions for MVCC and automatically truncate back to 16MB when exceeding 1GB. Temporary Tablespaces isolate query sort and grouping operations, recreating fresh on restart."
    }
  };

  const navItems = [
    { id: "tablespace-overview", label: "1. Tablespaces Overview" },
    { id: "taxonomy-diagram", label: "2. Visual Taxonomy Diagram" },
    { id: "interactive-workbench", label: "3. Tablespaces Workbench" },
    { id: "case-studies", label: "4. Real-World Case Studies" },
    { id: "pitfalls-rules", label: "5. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "6. Tablespace Storage Checklist" },
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
            <span>Topic 4 of 12</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              On-Disk Tablespaces
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            InnoDB On-Disk Components: System Tablespace, File-Per-Table Tablespaces (.ibd), General Tablespaces, Undo Tablespaces, Temporary Tablespaces
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master the complete physical layout of MySQL storage: explore File-Per-Table disk reclamation, the System Tablespace grow-only trap, General Tablespaces with NVMe hardware tiering, Undo Tablespace online truncation, and Temporary Tablespace lifecycles.
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
        {/* SECTION 1: Tablespaces Overview */}
        <section id="tablespace-overview" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The 5 On-Disk Tablespace Categories
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              InnoDB partitions physical disk storage into five purpose-built tablespace formats.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">1. File-Per-Table</span>
              <h3 className="font-bold text-white text-sm">Individual .ibd</h3>
              <p className="text-xs text-slate-300">Dedicated file per table; immediate disk reclamation.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">2. System Tablespace</span>
              <h3 className="font-bold text-white text-sm">ibdata1 File</h3>
              <p className="text-xs text-slate-300">Holds doublewrite buffer; cannot shrink once grown.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">3. General</span>
              <h3 className="font-bold text-white text-sm">Shared Custom .ibd</h3>
              <p className="text-xs text-slate-300">Groups tables together; custom NVMe SSD paths.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">4. Undo Tablespaces</span>
              <h3 className="font-bold text-white text-sm">undo_001 / undo_002</h3>
              <p className="text-xs text-slate-300">MVCC row versions; auto-truncates online to 16MB.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-indigo-400 font-bold uppercase">5. Temporary</span>
              <h3 className="font-bold text-white text-sm">ibtmp1 File</h3>
              <p className="text-xs text-slate-300">Query sorting/grouping; deleted on restart.</p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Visual Taxonomy Diagram */}
        <section id="taxonomy-diagram" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Visual Anatomy: InnoDB Physical Disk Layout
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing File-Per-Table reclamation against the monolithic System Tablespace.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-cyan-300">
                Figure 4.1: Tablespace Allocation &amp; Disk Reclamation Mechanics
              </h3>
              <span className="text-xs text-slate-400 font-mono">Storage Architecture</span>
            </div>

            <div className="w-full overflow-x-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
              <svg
                viewBox="0 0 950 360"
                className="w-full max-w-4xl mx-auto block font-sans"
                style={{ minWidth: "700px" }}
              >
                <defs>
                  <marker id="arrTsCyan" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <polygon points="0 0, 8 4, 0 8" fill="#38bdf8" />
                  </marker>
                </defs>

                {/* Box 1: File-Per-Table */}
                <rect x="20" y="40" width="280" height="280" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                <text x="160" y="70" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">1. FILE-PER-TABLE (.ibd)</text>
                <line x1="20" y1="85" x2="300" y2="85" stroke="#334155" />
                
                <rect x="35" y="105" width="250" height="40" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="45" y="125" fill="#a7f3d0" fontSize="10" fontWeight="bold">students.ibd (10 GB)</text>
                <text x="45" y="138" fill="#94a3b8" fontSize="9">Primary Key B+ Tree Data Pages</text>

                <rect x="35" y="155" width="250" height="40" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="45" y="175" fill="#a7f3d0" fontSize="10" fontWeight="bold">admissions.ibd (25 GB)</text>

                <rect x="35" y="210" width="250" height="60" rx="4" fill="#1e293b" stroke="#10b981" />
                <text x="45" y="230" fill="#34d399" fontSize="10" fontWeight="bold">DROP TABLE students;</text>
                <text x="45" y="246" fill="#bae6fd" fontSize="9">students.ibd is unlinked &rarr; 10 GB freed to OS! ✅</text>

                {/* Box 2: System Tablespace ibdata1 */}
                <rect x="335" y="40" width="280" height="280" rx="8" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" />
                <text x="475" y="70" fill="#fb7185" fontSize="12" fontWeight="bold" textAnchor="middle">2. SYSTEM TABLESPACE (ibdata1)</text>
                <line x1="335" y1="85" x2="615" y2="85" stroke="#334155" />
                
                <rect x="350" y="105" width="250" height="40" rx="4" fill="#1e293b" stroke="#be123c" />
                <text x="360" y="125" fill="#fca5a5" fontSize="10" fontWeight="bold">ibdata1:12M:autoextend</text>
                <text x="360" y="138" fill="#94a3b8" fontSize="9">Doublewrite blocks &amp; change buffer</text>

                <rect x="350" y="155" width="250" height="40" rx="4" fill="#1e293b" stroke="#be123c" />
                <text x="360" y="175" fill="#fca5a5" fontSize="10" fontWeight="bold">Grows to 100 GB on heavy load</text>

                <rect x="350" y="210" width="250" height="60" rx="4" fill="#1e293b" stroke="#f43f5e" />
                <text x="360" y="230" fill="#fb7185" fontSize="10" fontWeight="bold">DELETE FROM all_tables;</text>
                <text x="360" y="246" fill="#fca5a5" fontSize="9">ibdata1 stays 100 GB forever! (Cannot Shrink ❌)</text>

                {/* Box 3: Undo & General */}
                <rect x="650" y="40" width="280" height="280" rx="8" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="790" y="70" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">3. UNDO &amp; GENERAL TABLESPACES</text>
                <line x1="650" y1="85" x2="930" y2="85" stroke="#334155" />
                
                <rect x="665" y="105" width="250" height="45" rx="4" fill="#1e293b" stroke="#0284c7" />
                <text x="675" y="125" fill="#bae6fd" fontSize="10" fontWeight="bold">undo_001 / undo_002</text>
                <text x="675" y="140" fill="#a7f3d0" fontSize="9">Auto-truncates online back to 16MB! ⚡</text>

                <rect x="665" y="160" width="250" height="45" rx="4" fill="#1e293b" stroke="#334155" />
                <text x="675" y="180" fill="#e2e8f0" fontSize="10" fontWeight="bold">fast_nvme_ts.ibd (General)</text>
                <text x="675" y="195" fill="#94a3b8" fontSize="9">Mounted on /mnt/nvme_ssd/ storage</text>

                <rect x="665" y="215" width="250" height="45" rx="4" fill="#1e293b" stroke="#334155" />
                <text x="675" y="235" fill="#e2e8f0" fontSize="10" fontWeight="bold">ibtmp1 (Temporary Tablespace)</text>
                <text x="675" y="250" fill="#94a3b8" fontSize="9">Recreated fresh on every restart</text>
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 3: Interactive Tablespaces Workbench */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Interactive Tablespaces Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Select a tablespace type to inspect administrative SQL commands, storage characteristics, and DBA runbook best practices.
            </p>
          </div>

          {/* Tab Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {Object.keys(tablespaceCategories).map((key) => {
              const cat = tablespaceCategories[key];
              const isSelected = selectedTablespace === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedTablespace(key)}
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
                      cat.badgeColor === "emerald" && "bg-emerald-400",
                      cat.badgeColor === "rose" && "bg-rose-400",
                      cat.badgeColor === "cyan" && "bg-cyan-400",
                      cat.badgeColor === "amber" && "bg-amber-400"
                    )}
                  />
                  <span>{cat.tsNumber}</span>
                </button>
              );
            })}
          </div>

          {/* Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {tablespaceCategories[selectedTablespace].title}
              </h3>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-bold self-start sm:self-auto",
                  tablespaceCategories[selectedTablespace].badgeColor === "emerald" &&
                    "bg-emerald-950 text-emerald-300 border border-emerald-800",
                  tablespaceCategories[selectedTablespace].badgeColor === "rose" &&
                    "bg-rose-950 text-rose-300 border border-rose-800",
                  tablespaceCategories[selectedTablespace].badgeColor === "cyan" &&
                    "bg-cyan-950 text-cyan-300 border border-cyan-800",
                  tablespaceCategories[selectedTablespace].badgeColor === "amber" &&
                    "bg-amber-950 text-amber-300 border border-amber-800"
                )}
              >
                {tablespaceCategories[selectedTablespace].badge}
              </span>
            </div>

            {/* SQL Script Block */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Tablespace Management &amp; DDL Commands:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                {tablespaceCategories[selectedTablespace].sqlSnippet}
              </pre>
            </div>

            {/* Metrics Table */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Physical Storage Characteristics:
              </span>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                  <thead className="bg-slate-900/80 text-cyan-400 font-mono uppercase text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4">Tablespace Property</th>
                      <th className="py-2.5 px-4">Configuration &amp; Value</th>
                      <th className="py-2.5 px-4">Storage Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-xs">
                    {tablespaceCategories[selectedTablespace].metricsTable.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/50">
                        <td className="py-3 px-4 font-bold text-white font-sans">{row.feature}</td>
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
                Architecture Deep Dive:
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {tablespaceCategories[selectedTablespace].explanation}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Real-World Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Real-World Tablespace Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Overcoming storage bloat and hardware tiering in Barrackpore and Kolkata enterprises.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case 1: Mamata & Susmita's Tablespace Reclaim */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Reclaiming 120 GB of OS Disk Space in Barrackpore Hub
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  120 GB OS Space Freed
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, dropping 8 temporary exam staging tables under `innodb_file_per_table = ON` immediately deleted the corresponding `.ibd` files from the filesystem, returning 120 GB of SSD storage to the Linux operating system in under 2 seconds.
              </p>
            </div>

            {/* Case 2: Abhronila & Debangshu's NVMe Hardware Tiering */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – General Tablespace NVMe Hardware Tiering in Kolkata Data Center
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  NVMe Hardware Tiering
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, creating a general tablespace (`fast_nvme_ts`) mapped to an ultra-fast PCIe NVMe SSD mount point allowed all core banking ledger tables to achieve 0.8ms write latency while cold archive tables remained on economical standard SSDs.
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
              Avoid catastrophic storage bloat and tablespace configuration mistakes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Turning innodb_file_per_table OFF
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Turning file-per-table OFF causes all new tables to be written inside `ibdata1`, permanently preventing disk space reclamation when tables are dropped.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Keep innodb_file_per_table = ON enabled at all times.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Uncapped Temporary Tablespace (ibtmp1)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Leaving `ibtmp1` without a maximum size cap allows runaway Cartesian join queries to fill the entire server disk and crash the operating system.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Configure `ibtmp1:12M:autoextend:max:20G` in my.cnf.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Enable Automatic Undo Truncation
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Ensure `innodb_undo_log_truncate = ON` so undo tablespaces automatically shrink back to 16MB when exceeding 1GB.
              </p>
              <div className="text-xs text-slate-400">
                Prevents historical undo log bloat from long-running transactions.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Run OPTIMIZE TABLE on Fragmented Files
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Check `data_free` in `information_schema.tables` and run `OPTIMIZE TABLE` to rebuild fragmented tables and shrink `.ibd` file sizes.
              </p>
              <div className="text-xs text-slate-400">
                Reclaims internal unused pages left behind by bulk deletes.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Tablespace Storage Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. DBA Tablespace Audit Checklist
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key on-disk storage parameters to verify across production database servers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Tablespace Audit Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-emerald-400">File-Per-Table</strong> = Confirm `innodb_file_per_table = ON` is active.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-400">Undo Truncate</strong> = Verify `innodb_undo_log_truncate = ON` for automatic shrinking.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold font-mono">03.</span>
                  <span><strong className="text-amber-400">Temp Cap Sized</strong> = Ensure `ibtmp1` has an explicit `max:20G` ceiling.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold font-mono">04.</span>
                  <span><strong className="text-rose-400">Fragmentation Monitored</strong> = Check `data_free` in Information Schema periodically.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe Transportable Tablespaces...”</span>
                  If you need to copy a 500GB table across servers, running `DISCARD TABLESPACE` and copying the raw `.ibd` file takes minutes instead of the 10 hours required by mysqldump!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about Hardware Tiering...”</span>
                  Using General Tablespaces to place hot tables on NVMe drives while keeping historical tables on cheaper storage delivers maximum cost-performance efficiency!
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
              Comprehensive reference questions covering InnoDB On-Disk Tablespaces.
            </p>
          </div>

          <FAQTemplate
            title="InnoDB On-Disk Tablespaces FAQs"
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
            title="InnoDB On-Disk Components: System Tablespace, File-Per-Table Tablespaces (.ibd), General Tablespaces, Undo Tablespaces, Temporary Tablespaces"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic4_note.txt"
          />

          <Teacher
            note="Disk space management is one of the most critical responsibilities of a database administrator. Years ago, all MySQL tables lived inside a single monolithic ibdata1 file. If a batch query accidentally inflated it to 500GB, that disk space was permanently lost to the operating system! Today, with File-Per-Table (.ibd), General Tablespaces with NVMe hardware tiering, and automatically truncating Undo Tablespaces, we have complete, granular control over our physical storage layer. Treat your tablespaces with care and precision!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic4;
